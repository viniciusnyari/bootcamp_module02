import Sequelize, { Model } from 'sequelize';

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
