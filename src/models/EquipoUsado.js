import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";

export const EquipoUsado = sequelize.define("equipousado", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
});
