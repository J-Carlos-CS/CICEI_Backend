import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { authenticateToken } from "../../auth/auth.js";
import { CategoriaService } from "../services/categoria.service.js";
import { DetalleEquiposervice } from "../services/detalleEquipo.service.js";

const router = express.Router();

router.get("/:id", async function (req, res) {
  try {
    const detalleEquipoId = req.params.id;
    const response = await DetalleEquiposervice.getAllDetalleEquipo(detalleEquipoId);
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/detalleEquipo/:id", async function (req, res) {
  try {
    const detalleEquipoId = req.params.id;
    const response = await DetalleEquiposervice.getEquipobyID(detalleEquipoId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});

router.put("/:id", async function (req, res) {
  try {
    const detalleEquipoId = req.params.id;
    const putDetalleEquipo = req.body;
    console.log(putDetalleEquipo);
    const response = await DetalleEquiposervice.putDetalleEquipo(detalleEquipoId, putDetalleEquipo);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
export default router;
