import { EquipoUsado } from "../models/EquipoUsado.js";
import { Categorias } from "../models/categoria.model.js";
import { Detalle_Equipo } from "../models/detalle_equipo.model.js";
import { Equipos } from "../models/equipo.model.js";
import { Fechas_adquisiciones } from "../models/fechas_adquisiciones.model.js";
import { Manuales } from "../models/manual.model.js";
import { Proyectos } from "../models/proyectos.model.js";

export const EquipoService = {
  registerEquipo: async (equipo) => {
    const { nombre, categoriaId, proyectoId, cantidad, unidad, estado, marca, modelo, fecha_adquisicion, CreadoBy } = equipo;
    try {
      let newEquipos = await Equipos.create(
        {
          nombre,
          categoriaId,
          proyectoId,
          cantidad,
          unidad,
          estado,
          marca,
          modelo,
          CreadoBy,
        },
        {
          fields: ["nombre", "categoriaId", "proyectoId", "cantidad", "unidad", "estado", "marca", "modelo", "CreadoBy"],
        }
      );
      await EquipoUsado.create(
        {
          nombre,
          cantidad: 0,
        },
        { fields: ["nombre", "cantidad"] }
      );
      if (newEquipos) {
        let newManual = await Manuales.create(
          {
            estado,
            equipoId: newEquipos.id,
            CreadoBy,
          },
          {
            fields: ["estado", "equipoId", "CreadoBy"],
          }
        );
        if (newManual != undefined) {
          try {
            for (let i = 0; i < cantidad; i++) {
              let newDetalle_Equipo = await Detalle_Equipo.create(
                {
                  equipoId: newEquipos.id,
                  num_ucb: "UCB_" + newEquipos.id + newManual.id + (i + 1),
                  estado,
                  CreadoBy,
                },
                {
                  fields: ["equipoId", "manualeId", "num_ucb", "estado", "CreadoBy"],
                }
              );
              let newFecha = await Fechas_adquisiciones.create(
                {
                  detalleEquipoId: newDetalle_Equipo.id,
                  fecha_adquisicion,
                  CreadoBy,
                },
                {
                  fields: ["detalleEquipoId", "fecha_adquisicion", "CreadoBy"],
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
      equipo.marca = putEquipo.marca;
      equipo.modelo = putEquipo.modelo;
      equipo.ModificadoBy = putEquipo.CreadoBy;
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
  getEquiposDisponibles: async () => {
    const equiposDisponibles = await Equipos.findAll({
      attributes: ["id", "nombre", "cantidad"],
      where: { estado: true },
    });
    const equipoUsado = await EquipoUsado.findAll();
    for (let i = 0; i < equiposDisponibles.length; i++) {
      if (equiposDisponibles[i].nombre == equipoUsado[i].nombre && equiposDisponibles[i].id == equipoUsado[i].id) {
        equiposDisponibles[i].cantidad = equiposDisponibles[i].cantidad - equipoUsado[i].cantidad;
      }
    }
    return equiposDisponibles;
  },
};
