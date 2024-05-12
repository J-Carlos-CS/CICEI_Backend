import { where } from "sequelize";
import { TutorInvestigador } from "../models/tutorInvestigador.model.js";
import { User } from "../models/user.model.js";
import { Solicitudes } from "../models/solicitud.model.js";
import { SolicitudEquipo } from "../models/solicitudEquipo.model.js";
import { EquipoUsado } from "../models/EquipoUsado.js";

export const SolicitudEquipoService = {
  registerSolicitudequipo: async (solicitudEquipo) => {
    try {
      console.log(solicitudEquipo);
      const solicitudInDB = await SolicitudEquipo.create(
        { equipoId: solicitudEquipo.id, nombre: solicitudEquipo.nombre, cantidad: solicitudEquipo.cantidad, solicitudeId: solicitudEquipo.solicitudId, CreadoBy: solicitudEquipo.CreadoBy },
        { fields: ["equipoId", "nombre", "cantidad", "solicitudeId", "CreadoBy"] }
      );
      let equipousado = await EquipoUsado.findOne({
        where: { id: solicitudEquipo.id },
      });
      if (!equipousado) {
        throw new Error("Unidades no disponible");
      }
      equipousado.cantidad = equipousado.unidades + solicitudEquipo.cantidad;
      await equipousado.save();
      return solicitudInDB;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAllSolicitudesEquipo: async (id) => {
    try {
      const solicitudesEquipo = await SolicitudEquipo.findAll({ where: { solicitudeId: id } });
      return solicitudesEquipo;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
