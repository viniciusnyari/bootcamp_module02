import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

// Fila de tipos
const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  // Inicializa a fila
  init() {
    // Desestruturação que permite acessar métodos e propriedades
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Adiciona novo job a fila (pode ser um envio de e-mail)
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Processa os jobs
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      // on permite ouvir o evento de falha
      // bee-queue tem vários tipos de eventos que podem ser ouvidos
      // https://github.com/bee-queue/bee-queue
      bee.on('failed', this.HandleFailure).process(handle);
    });
  }

  // Tratamento do erro
  HandleFailure(job, err) {
    console.log(`Queue: ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
