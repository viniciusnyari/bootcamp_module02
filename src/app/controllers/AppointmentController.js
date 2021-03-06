import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    /**
     * Devo informar a paginação no query, senão, ele considera que está na
     * mesma página
     * limit representa o limite de registros por página
     * offset indica quantos registros estou pulando
     */

    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required('O prestador é obrigatório!'),
      date: Yup.date().required('A data é obrigatória!'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique o preenchimento dos campos provedor e data!' });
    }

    const { provider_id, date } = req.body;

    /*
     * Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Somente prestadores poderão realizar agendamentos!' });
    }

    if (provider_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'O usuário não pode realizar agendamentos para ele mesmo!' });
    }

    /**
     * Check for past dates
     * Pega somente a hora (sem minutos) de date - ParseIso retorna um Date
     * */
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Não é permitido realizar um agendamento para o passado!' });
    }

    /**
     * Check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Esse horário não está mais disponível!' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * Após gerar o agendamento iremos notificar o usuário
     * Notify appointment provider
     */

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'Você não tem permissão para cancelar esse agendamento!',
      });
    }

    // Desconta 2h
    const dateWithSub = subHours(appointment.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'Você pode realizar cancelamentos somente para agendamentos nas próximas 2 horas!',
      });
    }

    // Se tudo der certo, vai cancelar agendamento
    appointment.canceled_at = new Date();
    await appointment.save();

    // Enviando pra fila
    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  }
}

export default new AppointmentController();
