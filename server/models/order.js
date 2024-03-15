'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Menu)
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    MenuId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    price: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'waiting for payment'
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};