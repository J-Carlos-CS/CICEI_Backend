import { Manuales } from "../models/manual.model.js";

export const ManualService = {
  getAllManuales: async () => {
    const manuales = await Manuales.findAll({
      where: { estado: true },
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
      categoriaInDB.nombre = manual.nombre;
      categoriaInDB.marca = manual.marca;
      categoriaInDB.num_manuales = manual.num_manuales;
      categoriaInDB.tipo = manual.tipo;
      categoriaInDB.observaciones = manual.observaciones;
      categoriaInDB.digital = manual.digital;
      categoriaInDB.link_manual = manual.link_manual;
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
