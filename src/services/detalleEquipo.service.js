import { Categorias } from "../models/categoria.model.js";
import { Detalle_Equipo } from "../models/detalle_equipo.model.js";
import { Equipos } from "../models/equipo.model.js";
import { Fechas_adquisiciones } from "../models/fechas_adquisiciones.model.js";
import { Proyectos } from "../models/proyectos.model.js";

export const DetalleEquiposervice = {
  getAllDetalleEquipo: async (id) => {
    var allEquipos = await Detalle_Equipo.findAll({
      where: { equipoId: id },
      include: [
        {
          model: Fechas_adquisiciones,
          limit: 1,
        },
        {
          model: Equipos,
          include: [
            {
              model: Categorias,
            },
            {
              model: Proyectos,
            },
          ],
        },
      ],
    });
    return allEquipos;
  },
  getEquipobyID: async (id) => {
    const equipo = await Detalle_Equipo.findAll({
      where: { id },
      include: [
        {
          model: Fechas_adquisiciones,
        },
        {
          model: Equipos,
        },
      ],
    });
    return equipo;
  },
  putDetalleEquipo: async (id, putDetalleEquipo) => {
    try {
      const equipo = await Detalle_Equipo.findOne({
        where: { id },
      });
      const fecha = await Fechas_adquisiciones.findOne({
        where: { detalleEquipoId: id },
      });
      console.log(equipo);
      console.log(fecha);
      equipo.num_ucb = putDetalleEquipo.num_ucb;
      equipo.observaciones = putDetalleEquipo.observaciones;
      equipo.estado = putDetalleEquipo.estado;
      equipo.ModificadoBy = putDetalleEquipo.CreadoBy;
      fecha.fecha_adquisicion = putDetalleEquipo.fecha_adquisicion;
      fecha.fecha_preventivo = putDetalleEquipo.fecha_preventivo;
      fecha.fecha_Correccion = putDetalleEquipo.fecha_Correccion;
      fecha.ModificadoBy = putDetalleEquipo.CreadoBy;
      await fecha.save();
      return await equipo.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
