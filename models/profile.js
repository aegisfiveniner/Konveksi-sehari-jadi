'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order)
      this.hasOne(models.User)
      this.belongsToMany(
        models.Motive, {
          through: models.Order
        }
      )
    }
  }
  Profile.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : { 
          msg : `masukkan username`
        }
      }
    },
    phone: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : { 
          msg : `masukkan username`
        }
      }
    },
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};