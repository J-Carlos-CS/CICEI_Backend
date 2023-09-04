import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
import { Equipos } from "./equipo.model.js";
import { Reactivos } from "./reactivo.model.js";
export const Proyectos = sequelize.define("proyectos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  proyecto: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
});

Proyectos.hasMany(Reactivos, {
  foreinkey: "projectoId",
  sourceKey: "id",
});
Reactivos.belongsTo(Proyectos, { foreinkey: "projectoId", targetId: "id" });

Proyectos.hasMany(Equipos, {
  foreinkey: "projectoId",
  sourceKey: "id",
});
Equipos.belongsTo(Proyectos, { foreinkey: "projectoId", targetId: "id" });
