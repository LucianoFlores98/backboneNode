import { sequelize } from "../../../../../server/DbConnection";
import { DataTypes } from "sequelize";

const Segments = sequelize.define('Segments', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    segment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    days_late_tc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    days_late_pp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    global_max_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_transaction_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    affectation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    global_indebtedness: {
        type: DataTypes.INTEGER,
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
export default Segments;