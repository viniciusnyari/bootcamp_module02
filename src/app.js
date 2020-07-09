import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';
import './database';

class App {
  constructor() {
    // Inicializando o express
    this.server = express();

    // Inicializando o tratamento de erros/exceções do sistema
    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());

    /*
    Define o cors que vai permitir que outros locais acessem o backend
    Como não temos parâmetros no construtor, permitirá qualquer acesso
    pois estamos em ambiente de desenvolvimento, mas em produção,
    precisamos informar o 'origin:http://seuendereco.com.br',
    que aí somente será permitido acesso a partir dessa origem
    */
    this.server.use(cors());

    this.server.use(express.json());

    // Servir arquivos estáticos - que podem ser acessados pelo navegador
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        // Internal server error
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
