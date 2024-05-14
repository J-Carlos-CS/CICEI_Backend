import { SolicitudReactivo } from "../models/solicitudreactivo.model.js";

export const SolicitudReactivoService = {
  registerSolicitudReactivo: async (solicitudEquipo) => {
    try {
      console.log(solicitudEquipo);
      const solicitudInDB = await SolicitudReactivo.create(
        { reactivoId: solicitudEquipo.id, nombre: solicitudEquipo.nombre, cantidad: solicitudEquipo.cantidad, solicitudeId: solicitudEquipo.solicitudId, CreadoBy: solicitudEquipo.CreadoBy, unidades: solicitudEquipo.unidades },
        { fields: ["equipoId", "nombre", "cantidad", "solicitudeId", "CreadoBy", "unidades"] }
      );
      console.log(solicitudInDB);

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
