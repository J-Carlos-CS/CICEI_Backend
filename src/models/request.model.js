import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

import bcrypt from 'bcrypt'
export const Request = sequelize.define("request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  proyectName: DataTypes.STRING,
  materials: DataTypes.STRING,
  userId: DataTypes.INTEGER,//int
 
});
