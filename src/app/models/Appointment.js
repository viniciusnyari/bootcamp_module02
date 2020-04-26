import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

/* Essa estrutura de dados não reflete totalmente a entidade do banco
   por isso ela pode conter mais campos que não necessariamente estão
   na base de dados */

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        // campos que pertencem a tabela
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            // subHours subtrai horas - aqui retira 2h
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // Quando uma tabela é usada mais de uma vez na referência, preciso usar o alias
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}
export default Appointment;
