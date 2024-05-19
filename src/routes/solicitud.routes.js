import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import multer from "multer";
import { SolicitudService } from "../services/solicitud.service.js";
import { SolicitudEquipo } from "../models/solicitudEquipo.model.js";
import { SolicitudEquipoService } from "../services/solicitudEquipo.service.js";
import { SolicitudReactivoService } from "../services/solicitudReactivo.service.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", async function (req, res) {
  try {
    const solicitud = req.body;
    const response = await SolicitudService.registerSolicitud(solicitud);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/equipo", async function (req, res) {
  try {
    const solicitud = req.body;
    const response = await SolicitudEquipoService.registerSolicitudequipo(solicitud);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/reactivo", async function (req, res) {
  try {
    const solicitud = req.body;
    const response = await SolicitudReactivoService.registerSolicitudReactivo(solicitud);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/solicitud/:id/:rol", async function (req, res) {
  try {
    const id = req.params.id;
    const rol = req.params.rol;
    console.log(rol);
    if (rol === "Administrador") {
      const response = await SolicitudService.getAllSolicitudes();
      res.status(200).send(MessageSuccess(response));
    }
    if (rol === "Investigador") {
      const response = await SolicitudService.getInvestigadorSolicitudes(id);
      res.status(200).send(MessageSuccess(response));
    }
    if (rol === "Tutor") {
      const response = await SolicitudService.getTutorSolicitudes(id);
      res.status(200).send(MessageSuccess(response));
    }
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/solicitud-view/equipos/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const response = await SolicitudEquipoService.getAllSolicitudesEquipo(id);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/solicitud-view/reactivos/:id", async function (req, res) {
  try {
    console.log("hola" + req.params.id);
    const id = req.params.id;
    const response = await SolicitudReactivoService.getAllSolicitudesReactivo(id);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/aprobar/solicitud", async function (req, res) {
  try {
    const solicitud = req.body;
    if (solicitud.rol === "Tutor") {
      const response = await SolicitudService.aprobarSolicitud(solicitud);
      res.status(200).send(MessageSuccess(response));
    }
    if (solicitud.rol === "Administrador") {
      const response = await SolicitudService.aprobarAdministradorSolicitud(solicitud);
      res.status(200).send(MessageSuccess(response));
    }
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/getAllSolicitudes/:id/:rol", async function (req, res) {
  try {
    const id = req.params.id;
    const rol = req.params.rol;
    if (rol === "Administrador") {
      const response = await SolicitudService.getAllSolicitudesApproved();
      res.status(200).send(MessageSuccess(response));
    }
    if (rol === "Investigador") {
      const response = await SolicitudService.getInvestigadorSolicitudesApproved(id);
      res.status(200).send(MessageSuccess(response));
    }
    if (rol === "Tutor") {
      const response = await SolicitudService.getTutorSolicitudesApproved(id);
      res.status(200).send(MessageSuccess(response));
    }
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/recharzarSolicitud", async function (req, res) {
  try {
    const solicitud = req.body;
    if (solicitud.rol === "Tutor") {
      const response = await SolicitudService.recharzarSolicitud(solicitud);
      res.status(200).send(MessageSuccess(response));
    }
    if (solicitud.rol === "Administrador") {
      const response = await SolicitudService.recharzarAdministradorSolicitud(solicitud);
      res.status(200).send(MessageSuccess(response));
    }
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/getAllSolicitudesRecharzadas/:id/:rol", async function (req, res) {
  try {
    const id = req.params.id;
    const rol = req.params.rol;
    if (rol === "Administrador") {
      const response = await SolicitudService.getAllSolicitudesRechazadas();
      res.status(200).send(MessageSuccess(response));
    }
    if (rol === "Investigador") {
      const response = await SolicitudService.getInvestigadorSolicitudesRechazadas(id);
      res.status(200).send(MessageSuccess(response));
    }
    if (rol === "Tutor") {
      const response = await SolicitudService.getTutorSolicitudesRechazadas(id);
      res.status(200).send(MessageSuccess(response));
    }
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/entregar/solicitud", async function (req, res) {
  try {
    const solicitud = req.body;
    const response = await SolicitudService.entregarSolicitud(solicitud);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/entregar/investigador", async function (req, res) {
  try {
    console.log("hola");
    const solicitud = req.body;
    const response = await SolicitudService.entregarSolicitudInvestigador(solicitud);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/materiales/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const response = await SolicitudService.obtenerListaMateriales(id);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/materialesDevueltos", async function (req, res) {
  try {
    const solicitud = req.body;
    const response = await SolicitudService.devolverMateriales(solicitud);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
export default router;
