import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    // Aqui está passando pra esse método um unix timestamp
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date!' });
    }

    // Pode usar as duas formas
    // const searchDate = Number(date);
    const searchDate = Number(date);
    const appointments = await Appointment.findAll({
      where: {
        // Essa informação de 'providerId' vem da URL
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const available = schedule.map(time => {
      // Os colchetes pegam as duas partes do split nesse caso
      const [hour, minute] = time.split(':');

      // Criando datas nesse formato dd/MM/yyyy HH:mm:ss
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      return {
        time,
        // Retornará nesse formato: "2020-04-25T08:00:00-03:00"
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          // Formatos que podem estar disponíveis na agenda
          !appointments.find(a => format(a.date, 'HH:mm')) === time,
      };
    });

    return res.json(available);
  }
}
export default new AvailableController();
