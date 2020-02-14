import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* Definindo como rota global  - só irá passar se for válido */
routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
