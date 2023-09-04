import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";
import { Detalle_Equipo } from "./detalle_equipo.model.js";

export const Equipos = sequelize.define("equipos", {
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
  estado: {
    type: DataTypes.BOOLEAN,
  },
  unidad: {
    type: DataTypes.STRING,
  },
});

Equipos.hasMany(Detalle_Equipo, {
  foreinkey: "equiposId",
  sourceKey: "id",
});
Detalle_Equipo.belongsTo(Equipos, {
  foreinkey: "equiposId",
  targetId: "id",
});
