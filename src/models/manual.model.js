import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Manuales = sequelize.define("manuales", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },

  num_manuales: {
    type: DataTypes.INTEGER,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
  digital: {
    type: DataTypes.BOOLEAN,
  },
  link_manual: {
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
