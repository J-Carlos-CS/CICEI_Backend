import { Categorias } from "../models/categoria.model.js";
import { Proyectos } from "../models/proyectos.model.js";
import { Reactivos } from "../models/reactivo.model.js";
import { google } from "googleapis";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Guias } from "../models/guias.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const KEYFILEPATH = path.normalize(__dirname + "/../../database/apikeys.json");

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const driveService = google.drive({ version: "v3", auth });

export const GuiasService = {
  AddGuia: async (MetaData, currentId, parentID, creadoBy) => {
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
      let guia = {
        userId: currentId,
        CreadoBy: creadoBy,
        estado: true,
        titulo: MetaData.name,
        file: response.data.id,
      };
      const GuiasInDB = await Guias.create(guia);
      GuiasInDB.status = 200;
      return GuiasInDB;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getGuiaByID: async (id) => {
    const guia = await Guias.findAll({
      where: { userId: id },
    });
    return guia;
  },
};
