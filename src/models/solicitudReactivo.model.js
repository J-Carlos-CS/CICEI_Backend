import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";

export const SolicitudReactivo = sequelize.define("solicitudReactivo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reactivoId: {
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
  unidades: {
    type: DataTypes.STRING,
  },
  CreadoBy: {
    type: DataTypes.STRING,
  },
});
