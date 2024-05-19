import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
import { SolicitudEquipo } from "./solicitudEquipo.model.js";
import { SolicitudReactivo } from "./solicitudreactivo.model.js";

export const Solicitudes = sequelize.define("solicitudes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  solicitanteid: {
    type: DataTypes.INTEGER,
  },
  solicitante: {
    type: DataTypes.STRING,
  },
  tutorId: {
    type: DataTypes.INTEGER,
  },
  administradorId: {
    type: DataTypes.INTEGER,
  },
  materia: {
    type: DataTypes.STRING,
  },
  carrera: {
    type: DataTypes.STRING,
  },
  fieldId: {
    type: DataTypes.STRING,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  hora: {
    type: DataTypes.TIME,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
  aprobadoTutor: {
    type: DataTypes.BOOLEAN,
  },
  aprobadoAdministrador: {
    type: DataTypes.BOOLEAN,
  },
  comentario: {
    type: DataTypes.STRING,
  },
  entregadoAdmi: {
    type: DataTypes.BOOLEAN,
  },
  entregadoIdAdmin: {
    type: DataTypes.INTEGER,
  },
  entregadoInvestigador: {
    type: DataTypes.BOOLEAN,
  },
  CreadoBy: {
    type: DataTypes.STRING,
  },
});

Solicitudes.hasMany(SolicitudEquipo, {
  foreinkey: "solicitudID",
  sourceKey: "id",
});
SolicitudEquipo.belongsTo(Solicitudes, {
  foreinkey: "solicitudID",
  targetId: "id",
});

Solicitudes.hasMany(SolicitudReactivo, {
  foreinkey: "solicitudID",
  sourceKey: "id",
});
SolicitudReactivo.belongsTo(Solicitudes, {
  foreinkey: "solicitudID",
  targetId: "id",
});
