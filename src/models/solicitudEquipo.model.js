import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

export const SolicitudEquipo = sequelize.define("solicitudEquipo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  equipoId: {
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  cantidadAprobada: {
    type: DataTypes.INTEGER,
  },
  CreadoBy: {
    type: DataTypes.STRING,
  },
});
