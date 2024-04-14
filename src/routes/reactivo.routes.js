import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { ReactivoService } from "../services/reactivo.service.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

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
router.post("/informe", upload.single("file"), async function (req, res) {
  try {
    let myfile = req.file;
    let currentId = req.body.id;
    let fileMetaData = {
      name: myfile.originalname,
      size: myfile.size,
      tempFilePath: myfile.path,
      mimetype: myfile.mimetype,
    };
    console.log(fileMetaData);
    console.log(currentId);
    let parentID = process.env.USERPARENT;
    let response = await ReactivoService.createAndUploadFiles(fileMetaData, currentId, parentID);
    if (response.status === 200) {
      res.status(200).send(MessageSuccess(response.data));
    } else {
      res.status(200).send(MessageFail(response.message));
    }
  } catch (error) {
    res.status(200).send(MessageFail("Hubo un error en el servidor. " + e.message));
  }
});
export default router;
