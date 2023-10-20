import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Request = sequelize.define("request", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  proyectName: DataTypes.STRING,
  materials: DataTypes.STRING,
  userId: DataTypes.INTEGER,
});
