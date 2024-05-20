import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

export const TutorInvestigador = sequelize.define("tutorinvestigadors", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
  CreadoBy: {
    type: DataTypes.STRING,
  },
  ModificadoBy: {
    type: DataTypes.STRING,
  },
});
