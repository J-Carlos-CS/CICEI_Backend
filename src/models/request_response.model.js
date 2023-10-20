import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

export const RequestResponse = sequelize.define("request_responses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: DataTypes.STRING,
  approved: DataTypes.BOOLEAN,
  requestId: DataTypes.INTEGER,
  responseDate: DataTypes.DATE
});
