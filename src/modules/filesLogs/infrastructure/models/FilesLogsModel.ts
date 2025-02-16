import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";

const FilesLogs = sequelize.define("FilesLogs", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("LEAD", "CENDEU"),
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  processed_rows: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fail_rows: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  error_file_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  process_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});
export default FilesLogs;
