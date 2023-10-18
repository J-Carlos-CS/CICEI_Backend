import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
import { TutorInvestigador } from "./tutorInvestigador.model.js";
import bcrypt from 'bcrypt'
export const RequestResponse = sequelize.define("requestResponse", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: DataTypes.STRING,
  state: DataTypes.BOOLEAN,
  requestId: DataTypes.INTEGER,//int
  responseDate: DataTypes.DATE
});
