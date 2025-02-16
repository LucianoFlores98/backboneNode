'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableName = 'FilesLogs';

    const tableExists = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_name = '${tableName}'`
    );

    if (tableExists[0][0]?.count > 0) {
      await queryInterface.addColumn(tableName, 'process_id', {
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
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        period: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        processed_rows: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        process_id: {
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
    const tableName = 'FilesLogs';
    const tableExists = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_name = '${tableName}'`
    );

    if (tableExists[0][0]?.count > 0) {
      await queryInterface.removeColumn(tableName, 'process_id');
    }
  },
};
