export default (sequelize, DataTypes) => {

const Subscription = sequelize.define('subscription', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
return Subscription;
};
