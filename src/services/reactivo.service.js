import { Categorias } from "../models/categoria.model.js";
import { Proyectos } from "../models/proyectos.model.js";
import { Reactivos } from "../models/reactivo.model.js";
import { google } from "googleapis";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const KEYFILEPATH = path.normalize(__dirname + "/../../database/apikeys.json");

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const driveService = google.drive({ version: "v3", auth });

export const ReactivoService = {
  getAllReactivo: async () => {
    const allReactivos = await Reactivos.findAll({
      where: { estado: true },
      include: [
        {
          model: Proyectos,
        },
        {
          model: Categorias,
        },
      ],
    });
    return allReactivos;
  },
  registerReactivo: async (reactivo) => {
    try {
      if (reactivo.nombre && reactivo.cantidad && reactivo.unidades && reactivo.marca) {
        reactivo.estado = true;
        const reactivoInDB = await Reactivos.create(reactivo);
        return reactivoInDB;
      } else {
        throw new Error("Información Básica del Reactivo incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getReactivobyID: async (id) => {
    const reactivo = await Reactivos.findAll({
      where: { id },
      include: [
        {
          model: Proyectos,
        },
        {
          model: Categorias,
        },
      ],
    });
    return reactivo;
  },
  putReactivo: async (id, putReactivo) => {
    try {
      let reactivo = await Reactivos.findOne({
        where: { id },
      });
      if (!reactivo) {
        throw new Error("Reactivo no disponible");
      }
      reactivo.nombre = putReactivo.nombre;
      reactivo.cantidad = putReactivo.cantidad;
      reactivo.clasificacion = putReactivo.clasificacion;
      reactivo.estado = putReactivo.estado;
      reactivo.proyectoId = putReactivo.proyectoId;
      reactivo.categoriaId = putReactivo.categoriaId;
      reactivo.fecha_vencimiento = putReactivo.fecha_vencimiento;
      reactivo.unidades = putReactivo.unidades;
      reactivo.codigo = putReactivo.codigo;
      reactivo.observaciones = putReactivo.observaciones;
      reactivo.marca = putReactivo.marca;
      reactivo.ModificadoBy = putReactivo.CreadoBy;
      return await reactivo.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
  deleteReactivobyID: async (id) => {
    try {
      let reactivoInDB = await Reactivos.findOne({
        where: { id },
      });
      if (!reactivoInDB) {
        throw new Error("Reactivo no disponible");
      }
      reactivoInDB.estado = false;
      return await reactivoInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
  createAndUploadFiles: async (MetaData, currentId, parentID) => {
    try {
      let fileMetaData = {
        name: MetaData.name,
        mimetype: MetaData.mimetype,
        parents: [parentID],
      };
      let media = {
        mimeType: MetaData.mimetype,
        body: fs.createReadStream(path.normalize(MetaData.tempFilePath)),
      };
      let response = await driveService.files.create({
        resource: fileMetaData,
        media: media,
        fields: "id",
      });
      let reactivoInDB = await Reactivos.findOne({
        where: { id: currentId },
      });
      if (!reactivoInDB) {
        throw new Error("Reactivo no disponible");
      }
      reactivoInDB.ficha_tecnica = response.data.id;
      await reactivoInDB.save();
      console.log(response.data.id);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
