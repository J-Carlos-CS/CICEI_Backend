import { SolicitudReactivo } from "../models/solicitudReactivo.model.js";

export const SolicitudReactivoService = {
  registerSolicitudReactivo: async (solicitudEquipo) => {
    try {
      const solicitudInDB = await SolicitudReactivo.create(
        { reactivoId: solicitudEquipo.id, nombre: solicitudEquipo.nombre, cantidad: solicitudEquipo.cantidad, solicitudeId: solicitudEquipo.solicitudId, CreadoBy: solicitudEquipo.CreadoBy, unidades: solicitudEquipo.unidades },
        { fields: ["reactivoId", "nombre", "cantidad", "solicitudeId", "CreadoBy", "unidades"] }
      );

      return solicitudInDB;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAllSolicitudesReactivo: async (id) => {
    try {
      const solicitudesReactivo = await SolicitudReactivo.findAll({ where: { solicitudeId: id } });
      return solicitudesReactivo;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
