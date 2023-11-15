import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { authenticateToken } from "../../auth/auth.js";
import { UnidadesService } from "../services/unidades.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const response = await UnidadesService.getAllUnidades();
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const unidadesId = req.params.id;
    const response = await UnidadesService.getUnidadesbyID(unidadesId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
router.post("/", async function (req, res) {
  try {
    const unidades = req.body;
    const response = await UnidadesService.registerUnidades(unidades);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.put("/:id", async function (req, res) {
  try {
    const newUnidades = req.body;
    const unidadesId = req.params.id;
    const response = await UnidadesService.putUnidades(unidadesId, newUnidades);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    await logGenerator(error.message);
    res.status(200).send(MessageFail(error.message));
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const unidadesId = req.params.id;
    const response = await UnidadesService.deleteUnidadesbyID(unidadesId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});

export default router;
