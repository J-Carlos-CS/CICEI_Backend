import { Manuales } from "../models/manual.model.js";
import { Equipos } from "../models/equipo.model.js";

export const ManualService = {
  getAllManuales: async () => {
    const manuales = await Manuales.findAll({
      include: [
        {
          model: Equipos,
        },
      ],
    });
    return manuales;
  },
  registerManual: async (manual) => {
    try {
      if (manual.nombre) {
        manual.estado = true;
        const manualInDB = await Manuales.create(manual);
        return manualInDB;
      } else {
        throw new Error("Información Básica del Manual incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getManualByID: async (id) => {
    const manualInDB = await Manuales.findOne({
      where: { id },
      include: [
        {
          model: Equipos,
        },
      ],
    });
    return manualInDB;
  },
  putManual: async (id, manual) => {
    try {
      let manualInDB = await Manuales.findOne({
        where: { id },
      });
      if (!manualInDB) {
        throw new Error("Manual no disponible");
      }
      manualInDB.nombre = manual.nombre;
      manualInDB.marca = manual.marca;
      manualInDB.num_manuales = manual.num_manuales;
      manualInDB.tipo = manual.tipo;
      manualInDB.observaciones = manual.observaciones;
      manualInDB.digital = manual.digital;
      manualInDB.link_manual = manual.link_manual;
      manualInDB.ModificadoBy = manual.CreadoBy;
      return await manualInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
  deleteManualbyID: async (id) => {
    try {
      let manualInDB = await Manuales.findOne({
        where: { id },
      });
      if (!manualInDB) {
        throw new Error("Manual no disponible");
      }
      manualInDB.estado = false;
      return await manualInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
};
