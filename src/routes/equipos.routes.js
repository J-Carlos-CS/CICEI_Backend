import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { EquipoService } from "../services/equipo.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const response = await EquipoService.getAllEquipo();
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/", async function (req, res) {
  try {
    const equipo = req.body;
    const response = await EquipoService.registerEquipo(equipo);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const equipoId = req.params.id;
    const response = await EquipoService.getEquipobyID(equipoId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
router.put("/:id", async function (req, res) {
  try {
    const newEquipo = req.body;
    const equipoId = req.params.id;
    const response = await EquipoService.putEquipo(equipoId, newEquipo);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    await logGenerator(error.message);
    res.status(200).send(MessageFail(error.message));
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const equipoId = req.params.id;
    const response = await EquipoService.deleteEquipobyID(equipoId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
router.get("/equipo/disponible", async function (req, res) {
  try {
    console.log("entro");
    const response = await EquipoService.getEquiposDisponibles();
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
export default router;
