import User from '../models/Users';

class UserController {
  async store(req, res) {
    /* Verifica se usuário existe */
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
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
    /* Esse método faz a leitura do userId que foi passado dentro do res */
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default new UserController();
