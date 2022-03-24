'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    return queryInterface.renameColumn('Users', 'UserId', 'ProfileId');
  },

  down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
     return queryInterface.renameColumn('Users', 'ProfileId', 'UserId');
  }
};
