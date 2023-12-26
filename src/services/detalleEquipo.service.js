import { Categorias } from "../models/categoria.model.js";
import { Detalle_Equipo } from "../models/detalle_equipo.model.js";
import { Equipos } from "../models/equipo.model.js";
import { Fechas_adquisiciones } from "../models/fechas_adquisiciones.model.js";
import { Manuales } from "../models/manual.model.js";
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
        {
          model: Manuales,
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
};
