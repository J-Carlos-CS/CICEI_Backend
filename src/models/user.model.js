import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

import bcrypt from 'bcrypt'
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
  systemRolId: DataTypes.INTEGER,//int
  state: DataTypes.BOOLEAN,
  status: DataTypes.BOOLEAN,
});


