import { Categorias } from "../models/categoria.model.js";

export const CategoriaService = {
  getAllCategoria: async () => {
    const categoria = await Categorias.findAll({});
    return categoria;
  },
  registerCategoria: async (categoria) => {
    try {
      if (categoria.categoria) {
        categoria.estado = true;
        const categoriaInDB = await Categorias.create(categoria);
        return categoriaInDB;
      } else {
        throw new Error("Información Básica de la Categoria incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getCategoriabyID: async (id) => {
    const categoriaInDB = await Categorias.findOne({
      where: { id },
    });
    return categoriaInDB;
  },
  putCategoria: async (id, categoria) => {
    try {
      let categoriaInDB = await Categorias.findOne({
        where: { id },
      });
      if (!categoriaInDB) {
        throw new Error("Categoria no disponible");
      }
      categoriaInDB.categoria = categoria.categoria;
      categoriaInDB.estado = categoria.estado;
      return await categoriaInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
  deleteCategoriabyID: async (id) => {
    try {
      let categoriaInDB = await Categorias.findOne({
        where: { id },
      });
      if (!categoriaInDB) {
        throw new Error("Categoria no disponible");
      }
      categoriaInDB.estado = false;
      return await categoriaInDB.save();
    } catch (error) {
      throw new Error(e.message);
    }
  },
};
