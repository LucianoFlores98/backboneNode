'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Agreements', 'order', 'number');
    await queryInterface.renameColumn('Agreements', 'key', 'name');

    await queryInterface.changeColumn('Agreements', 'number', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('Agreements', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Agreements', 'typeId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.removeColumn('Agreements', 'value');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Agreements', 'value', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Agreements', 'number', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('Agreements', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.renameColumn('Agreements', 'number', 'order');
    await queryInterface.renameColumn('Agreements', 'name', 'key');
    await queryInterface.removeColumn('Agreements', 'typeId');
  },
};
