import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  /* Obtém do cabeçalho o token */
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  /* Desestruturação - descartando a primeira posição */
  const [, token] = authHeader.split(' ');

  try {
    /* Faz a verificação do token e devolve as informações do mesmo */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    /* Coloca no req o id do usuário que será passado adiante */
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
