'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Profile)
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        instance.role = 'user'
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)
        
        instance.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};