'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = 'Segments';

    const tableExists = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_name = '${tableName}'`
    );

    if (tableExists[0][0].count > 0) {
      await queryInterface.addColumn(tableName, 'global_max_amount', {
        type: Sequelize.INTEGER,
      });

      await queryInterface.addColumn(tableName, 'max_transaction_amount', {
        type: Sequelize.INTEGER,
      });

      await queryInterface.addColumn(tableName, 'affectation', {
        type: Sequelize.INTEGER,
      });

      await queryInterface.addColumn(tableName, 'global_indebtedness', {
        type: Sequelize.INTEGER,
      });

    } else {
      await queryInterface.createTable(tableName, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        segment: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        days_late_tc: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        days_late_pp: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        global_max_amount: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        max_transaction_amount: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        affectation: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        global_indebtedness: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    }
  },

  async down(queryInterface) {
    const tableName = 'Segments';
    const tableExists = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_name = '${tableName}'`
    );

    if (tableExists[0][0].count > 0) {
      await queryInterface.removeColumn(tableName, 'global_max_amount');
      await queryInterface.removeColumn(tableName, 'max_transaction_amount');
      await queryInterface.removeColumn(tableName, 'affectation');
      await queryInterface.removeColumn(tableName, 'global_indebtedness');
    }
  },
};
