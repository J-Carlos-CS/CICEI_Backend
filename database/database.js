import Sequelize from "sequelize";

export const sequelize = new Sequelize("CICEIDEV", "root", "mysql0000", {
  host: "localhost",
  dialect: "mysql",
});
