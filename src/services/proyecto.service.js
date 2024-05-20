import { Proyectos } from "../models/proyectos.model.js";

export const ProyectoService = {
  getAllProyecto: async () => {
    const proyecto = await Proyectos.findAll({});
    return proyecto;
  },
  registerProyecto: async (proyecto) => {
    try {
      if (proyecto.proyecto) {
        proyecto.estado = true;
        const proyectoInDB = await Proyectos.create(proyecto);
        return proyectoInDB;
      } else {
        throw new Error("Información Básica del Proyecto incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getProyectobyID: async (id) => {
    const proyectoInDB = await Proyectos.findOne({
      where: { id },
    });
    return proyectoInDB;
  },
  putProyecto: async (id, proyecto) => {
    try {
      let proyectoInDB = await Proyectos.findOne({
        where: { id },
      });
      if (!proyectoInDB) {
        throw new Error("Proyecto no disponible");
      }
      proyectoInDB.proyecto = proyecto.proyecto;
      proyectoInDB.estado = proyecto.estado;
      proyectoInDB.ModificadoBy = proyecto.CreadoBy;
      return await proyectoInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
  deleteProyectobyID: async (id) => {
    try {
      let proyectoInDB = await Proyectos.findOne({
        where: { id },
      });
      if (!proyectoInDB) {
        throw new Error("Proyecto no disponible");
      }
      proyectoInDB.estado = false;
      return await proyectoInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
};
