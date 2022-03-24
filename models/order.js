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

    static getTotal (orderList, ongkir) {
      let total = ongkir[0]
      orderList.forEach(x => {
        total += x.Motive.price
      });
      return total
    }
  }
  Order.init({
    size: DataTypes.STRING,
    model: DataTypes.STRING,
    MotiveId: DataTypes.INTEGER,
    ProfileId: DataTypes.INTEGER,
    CityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};