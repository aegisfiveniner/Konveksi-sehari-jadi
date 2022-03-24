'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order)
      this.belongsTo(models.City)
      this.belongsTo(models.Profile)
      this.belongsTo(models.Motive)
      this.belongsToMany(
        models.Profile, {
          through: models.Order
        }
      )
    }
  }
  Motive.init({
    pictureUrl: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Motive',
  });
  return Motive;
};