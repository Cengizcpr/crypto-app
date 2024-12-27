import { Sequelize } from 'sequelize';

const dbConfig = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: '1997',
  DB: 'cryptodb',
  dialect: 'postgres',
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = (await import('./user.model.js')).default(sequelize, Sequelize);
db.Coin = (await import('./coin.model.js')).default(sequelize, Sequelize);
db.Subscription = (await import('./subscription.model.js')).default(
  sequelize,
  Sequelize
);

db.Subscription.belongsTo(db.Coin, { foreignKey: 'coin_id' });
db.Subscription.belongsTo(db.User, { foreignKey: 'user_id' });

export default db;
