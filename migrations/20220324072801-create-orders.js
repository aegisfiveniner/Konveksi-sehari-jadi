'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING
      },
      MotiveId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'Motives'},
          key: 'id'
        }
      },
      ProfileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'Profiles'},
          key: 'id'
        }
      },
      CityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {tableName: 'Cities'},
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};