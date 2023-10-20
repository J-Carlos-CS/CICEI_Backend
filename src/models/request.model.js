import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Request = sequelize.define("requests", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: DataTypes.STRING,
  materials: DataTypes.STRING,
  userId: DataTypes.INTEGER,
});
