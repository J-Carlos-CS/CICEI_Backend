import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";
import { Fechas_adquisiciones } from "./fechas_adquisiciones.model.js";

export const Detalle_Equipo = sequelize.define("detalle_equipos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  num_ucb: {
    type: DataTypes.STRING,
  },
  observaciones: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
});

Detalle_Equipo.hasMany(Fechas_adquisiciones, {
  foreinkey: "detalleEquipoId",
  sourceKey: "id",
});
Fechas_adquisiciones.belongsTo(Detalle_Equipo, {
  foreinkey: "detalleEquipoId",
  targetId: "id",
});
