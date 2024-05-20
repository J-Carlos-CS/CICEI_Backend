import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";
import { Equipos } from "./equipo.model.js";
import { Reactivos } from "./reactivo.model.js";

export const Categorias = sequelize.define("categorias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoria: {
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

Categorias.hasMany(Equipos, {
  foreinkey: "categoriaId",
  sourceKey: "id",
});
Equipos.belongsTo(Categorias, { foreinkey: "categoriaId", targetId: "id" });

Categorias.hasMany(Reactivos, {
  foreinkey: "reactivosId",
  sourceKey: "id",
});
Reactivos.belongsTo(Categorias, { foreinkey: "reactivosId", targetId: "id" });
