export default (sequelize, DataTypes) => {
  const Coins = sequelize.define('coin', {
    symbol: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    last_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    high_24h: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    low_24h: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  return Coins;
};
