import { sequelize } from "../../../../../server/DbConnection";
import { DataTypes } from "sequelize";

const TypesAgreements = sequelize.define('TypesAgreements', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    type_of_employer: {
        allowNull: false,
        type: DataTypes.STRING
    },
    decision: {
        allowNull: false,
        type: DataTypes.STRING
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
export default TypesAgreements;