import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const Unidades = sequelize.define("unidades", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  unidades: {
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
