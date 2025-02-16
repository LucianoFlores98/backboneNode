import { sequelize } from "../../../../../server/DbConnection";
import { DataTypes } from "sequelize";

const Agreements = sequelize.define('Agreements', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
export default Agreements;