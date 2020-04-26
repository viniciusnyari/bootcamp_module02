import Sequelize, { Model } from 'sequelize';

/* Essa estrutura de dados não reflete totalmente a entidade do banco
   por isso ela pode conter mais campos que não necessariamente estão
   na base de dados */

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        // campos que pertencem a tabela
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        // campo que não pertence a tabela e que exibirá o endereço da imagem
        // no app.js deverá ser incluída a permissão para acessar conteúdo
        // estático
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default File;
