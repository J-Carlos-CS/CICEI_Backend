import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
export const PendientesMaterial = sequelize.define("pendientesmaterial", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solicitudeId: {
    type: DataTypes.INTEGER,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  materialId: {
    type: DataTypes.INTEGER,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  comentario: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
  creadoBy: {
    type: DataTypes.STRING,
  },
});
