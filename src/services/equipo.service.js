import { Categorias } from "../models/categoria.model.js";
import { Detalle_Equipo } from "../models/detalle_equipo.model.js";
import { Equipos } from "../models/equipo.model.js";
import { Fechas_adquisiciones } from "../models/fechas_adquisiciones.model.js";
import { Manuales } from "../models/manual.model.js";
import { Proyectos } from "../models/proyectos.model.js";

export const EquipoService = {
  registerEquipo: async (equipo) => {
    const { nombre, categoriaId, proyectoId, cantidad, unidad, estado, marca, modelo, fecha_adquisicion } = equipo;
    try {
      let newEquipos = await Equipos.create(
        {
          nombre,
          categoriaId,
          proyectoId,
          cantidad,
          unidad,
          estado,
        },
        {
          fields: ["nombre", "categoriaId", "proyectoId", "cantidad", "unidad", "estado"],
        }
      );
      if (newEquipos != undefined) {
        let newManual = await Manuales.create(
          {
            marca,
            modelo,
            estado,
          },
          {
            fields: ["marca", "modelo", "estado"],
          }
        );
        if (newManual != undefined) {
          try {
            for (let i = 0; i < cantidad; i++) {
              let newDetalle_Equipo = await Detalle_Equipo.create(
                {
                  equipoId: newEquipos.id,
                  manualeId: newManual.id,
                  estado,
                },
                {
                  fields: ["equipoId", "manualeId", "estado"],
                }
              );
              let newFecha = await Fechas_adquisiciones.create(
                {
                  detalleEquipoId: newDetalle_Equipo.id,
                  fecha_adquisicion,
                },
                {
                  fields: ["detalleEquipoId", "fecha_adquisicion"],
                }
              );
            }
          } catch (e) {
            throw new Error(e.message);
          }
        }
      }
      return newEquipos;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAllEquipo: async () => {
    const allEquipos = await Equipos.findAll({
      where: { estado: true },
      include: [
        {
          model: Proyectos,
        },
        {
          model: Categorias,
        },
      ],
    });
    return allEquipos;
  },
  getEquipobyID: async (id) => {
    const equipo = await Equipos.findAll({
      where: { id },
      include: [
        {
          model: Proyectos,
        },
        {
          model: Categorias,
        },
      ],
    });
    return equipo;
  },
  putEquipo: async (id, putEquipo) => {
    try {
      let equipo = await Equipos.findOne({
        where: { id },
      });
      if (!equipo) {
        throw new Error("Equipo no disponible");
      }
      equipo.nombre = putEquipo.nombre;
      equipo.cantidad = putEquipo.cantidad;
      equipo.unidad = putEquipo.unidad;
      equipo.estado = putEquipo.estado;
      equipo.proyectoId = putEquipo.proyectoId;
      equipo.categoriaId = putEquipo.categoriaId;
      return await equipo.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
  deleteEquipobyID: async (id) => {
    try {
      let equipoInDB = await Equipos.findOne({
        where: { id },
      });
      if (!equipoInDB) {
        throw new Error("Equipo no disponible");
      }
      equipoInDB.estado = false;
      return await equipoInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
};
