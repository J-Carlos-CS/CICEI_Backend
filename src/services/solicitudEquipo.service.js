import { where } from "sequelize";
import { TutorInvestigador } from "../models/tutorInvestigador.model.js";
import { User } from "../models/user.model.js";
import { Solicitudes } from "../models/solicitud.model.js";
import { SolicitudEquipo } from "../models/solicitudEquipo.model.js";
import { EquipoUsado } from "../models/EquipoUsado.js";

export const SolicitudEquipoService = {
  registerSolicitudequipo: async (solicitudEquipo) => {
    try {
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
      equipousado.cantidad = Number(equipousado.cantidad) + Number(solicitudEquipo.cantidad);
      await equipousado.save();
      return solicitudInDB;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteSolicitudEquipo: async (id) => {
    try {
      const solicitudesEquipo = await SolicitudEquipo.findAll({ where: { solicitudeId: id } });
      for (let i = 0; i < solicitudesEquipo.length; i++) {
        let equipousado = await EquipoUsado.findOne({
          where: { id: solicitudesEquipo[i].equipoId },
        });
        if (!equipousado) {
          throw new Error("Unidades no disponible");
        }
        equipousado.cantidad = Number(equipousado.cantidad) - Number(solicitudesEquipo[i].cantidad);
        await equipousado.save();
      }
      if (!solicitudesEquipo) {
        throw new Error("No se encontró la solicitud de equipo.");
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
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
