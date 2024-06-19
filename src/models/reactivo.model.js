import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Reactivos = sequelize.define("reactivos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.FLOAT,
  },
  unidades: {
    type: DataTypes.STRING,
  },
  clasificacion: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  ficha_tecnica: {
    type: DataTypes.STRING,
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
  marca: {
    type: DataTypes.STRING,
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
  },
  CreadoBy: {
    type: DataTypes.STRING,
  },
  ModificadoBy: {
    type: DataTypes.STRING,
  },
});
