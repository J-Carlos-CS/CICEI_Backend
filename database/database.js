import dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

export const sequelize = new Sequelize("CICEIDEV", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});
