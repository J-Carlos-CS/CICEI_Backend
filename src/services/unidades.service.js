import { Unidades } from "../models/unidades.model.js";

export const UnidadesService = {
  getAllUnidades: async () => {
    const unidades = await Unidades.findAll({});
    return unidades;
  },
  registerUnidades: async (unidades) => {
    try {
      if (unidades.unidades) {
        unidades.estado = true;
        const unidadesInDB = await Unidades.create(unidades);
        return unidadesInDB;
      } else {
        throw new Error("Información Básica de la Unidades incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getUnidadesbyID: async (id) => {
    const unidadesInDB = await Unidades.findOne({
      where: { id },
    });
    return unidadesInDB;
  },
  putUnidades: async (id, unidades) => {
    try {
      let unidadesInDB = await Unidades.findOne({
        where: { id },
      });
      if (!unidadesInDB) {
        throw new Error("Unidades no disponible");
      }
      unidadesInDB.unidades = unidades.unidades;
      unidadesInDB.estado = unidades.estado;
      return await unidadesInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
  deleteUnidadesbyID: async (id) => {
    try {
      let unidadesInDB = await Unidades.findOne({
        where: { id },
      });
      if (!unidadesInDB) {
        throw new Error("Unidades no disponible");
      }
      unidadesInDB.estado = false;
      return await unidadesInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
};
