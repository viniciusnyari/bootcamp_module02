import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/* Essa estrutura de dados não reflete totalmente a entidade do banco
   por isso ela pode conter mais campos que não necessariamente estão
   na base de dados */

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /* São eventos que podem ser disparados antes das ações do model */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        /* força da criptografia */
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
