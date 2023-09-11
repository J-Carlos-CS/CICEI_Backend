import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { ReactivoService } from "../services/reactivo.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const response = await ReactivoService.getAllReactivo();
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/", async function (req, res) {
  try {
    const reactivo = req.body;
    const response = await ReactivoService.registerReactivo(reactivo);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const reactivoId = req.params.id;
    const response = await ReactivoService.getReactivobyID(reactivoId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
router.put("/:id", async function (req, res) {
  try {
    const newReactivo = req.body;
    const reactivoId = req.params.id;
    const response = await ReactivoService.putReactivo(reactivoId, newReactivo);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    await logGenerator(error.message);
    res.status(200).send(MessageFail(error.message));
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const reactivoId = req.params.id;
    const response = await ReactivoService.deleteReactivobyID(reactivoId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});

export default router;
