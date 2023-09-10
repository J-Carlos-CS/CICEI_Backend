import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { ProyectoService } from "../services/proyecto.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const response = await ProyectoService.getAllProyecto();
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/", async function (req, res) {
  try {
    const proyecto = req.body;
    const response = await ProyectoService.registerProyecto(proyecto);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const proyectoId = req.params.id;
    const response = await ProyectoService.getProyectobyID(proyectoId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
router.put("/:id", async function (req, res) {
  try {
    const newProyecto = req.body;
    const proyectoId = req.params.id;
    const response = await ProyectoService.putProyecto(proyectoId, newProyecto);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    await logGenerator(error.message);
    res.status(200).send(MessageFail(error.message));
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const proyectoId = req.params.id;
    const response = await ProyectoService.deleteProyectobyID(proyectoId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});

export default router;
