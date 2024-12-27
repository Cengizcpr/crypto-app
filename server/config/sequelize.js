import { Sequelize } from 'sequelize';

const dbConfig = {
  HOST: 'postgres',
  USER: 'postgres',
  PASSWORD: 'example',
  DB: 'postgres',
  dialect: 'postgres',
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'postgres',
});

export default sequelize;
