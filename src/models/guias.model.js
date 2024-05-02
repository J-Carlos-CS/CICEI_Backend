import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
export const Guias = sequelize.define("guias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  file: {
    type: DataTypes.STRING,
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
