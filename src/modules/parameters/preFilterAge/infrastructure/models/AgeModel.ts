import { sequelize } from "../../../../../server/DbConnection";
import { DataTypes } from "sequelize";

const Ages = sequelize.define('Ages', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    segment: {
        allowNull: false,
        type: DataTypes.STRING
    },
    gender: {
        allowNull: false,
        type: DataTypes.STRING
    },
    maxAge: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    minAge: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    agePermanence: {
        allowNull: false,
        type: DataTypes.INTEGER
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
export default Ages;