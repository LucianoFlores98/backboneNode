import configs from "../configs";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  configs.db.database || "",
  configs.db.username || "",
  configs.db.password,
  {
    host: configs.db.url,
    logging: (msg) => console.log(msg),
    dialect: "postgres",
    port: 5432,
  }
);

const ConnectToDatabase = () => {
  sequelize
    .authenticate()
    .then(() =>
      console.info("Database connection has been established successfully!")
    )
    .catch((err) => {
      sequelize.close();
      console.log("Unable to connect to the database:", err);
    });
};

export default ConnectToDatabase;
