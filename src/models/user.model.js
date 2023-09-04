import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  birthDate: DataTypes.DATEONLY,
  picture: DataTypes.STRING,
  resume: DataTypes.TEXT,
  systemRol: DataTypes.STRING,
  career: DataTypes.STRING,
  state: DataTypes.BOOLEAN,
  status: DataTypes.BOOLEAN,
  cellPhone: DataTypes.INTEGER,
});
