import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";

const Ruc = sequelize.define('Ruc', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    generatedRuc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rucPeriod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    leads: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cendeu: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    processedRows: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    leadsPeriod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cendeuPeriod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    downloadLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
})
export default Ruc;