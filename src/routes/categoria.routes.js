import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { authenticateToken } from "../../auth/auth.js";
import { CategoriaService } from "../services/categoria.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const response = await CategoriaService.getAllCategoria();
    res.status(200).send((response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const categoriaId = req.params.id;
    const response = await CategoriaService.getCategoriabyID(categoriaId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
router.post("/", async function (req, res) {
  try {
    const categoria = req.body;
    const response = await CategoriaService.registerCategoria(categoria);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.put("/:id", async function (req, res) {
  try {
    const newCategoria = req.body;
    const categoriaId = req.params.id;
    const response = await CategoriaService.putCategoria(categoriaId, newCategoria);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    await logGenerator(error.message);
    res.status(200).send(MessageFail(error.message));
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const categoriaId = req.params.id;
    const response = await CategoriaService.deleteCategoriabyID(categoriaId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});

export default router;
