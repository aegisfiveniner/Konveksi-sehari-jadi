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
      this.belongsTo(models.City)
      this.belongsTo(models.Profile)
      this.belongsTo(models.Motive)
    }
  }
  Order.init({
    size: DataTypes.STRING,
    model: DataTypes.STRING,
    MotiveId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};