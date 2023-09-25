import Sequelize from "sequelize";

export const sequelize = new Sequelize("CICEIDEV", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
