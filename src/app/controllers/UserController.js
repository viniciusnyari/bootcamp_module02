import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório!'),
      email: Yup.string()
        .email('O e-mail é válido!')
        .required('O e-mail é obrigatório!'),
      password: Yup.string()
        .required('A senha é obrigatória!')
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Verifique o preenchimento dos campos nome, e-mail e senha!',
      });
    }

    /* Verifica se usuário existe */
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'Esse usuário já existe!' });
    }

    /* Retornando somente algumas informações do usuários */
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('O e-mail é inválido!'),
      oldPassword: Yup.string()
        .required('A senha atual é obrigatória!')
        .min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('A nova senha é obrigatória!') : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('A confirmação da nova senha é obrigatória!')
              .oneOf([Yup.ref('password')])
          : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error:
          'Verifique o preenchimento dos campos nome, e-mail, senha antiga, senha atual e confirmação da senha!',
      });
    }

    /* Esse método faz a leitura do userId que foi passado dentro do res */
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha atual inválida!' });
    }

    await user.update(req.body);

    const { id, name } = await User.findByPk(req.userId);
    const { path, url } = await File.findByPk(req.body.avatar_id);

    const avatar = { path, url };

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
