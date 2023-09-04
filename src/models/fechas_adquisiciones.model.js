import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
export const Fechas_adquisiciones = sequelize.define("fechas_adquisiciones", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_adquisicion: {
    type: DataTypes.DATE,
  },
  fecha_preventivo: {
    type: DataTypes.DATE,
  },
  fecha_Correccion: {
    type: DataTypes.DATE,
  },
});
