import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import multer from "multer";
import { GuiasService } from "../services/guias.service.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async function (req, res) {
  try {
    let myfile = req.file;
    let currentId = req.body.id;
    let creadoBy = req.body.user;
    let fileMetaData = {
      name: myfile.originalname,
      size: myfile.size,
      tempFilePath: myfile.path,
      mimetype: myfile.mimetype,
    };
    let parentID = process.env.USERPARENT;
    let response = await GuiasService.AddGuia(fileMetaData, currentId, parentID, creadoBy);
    console.log(response.status);
    if (response.data !== "") {
      res.status(200).send(MessageSuccess(response));
    } else {
      res.status(200).send(MessageFail(response));
    }
  } catch (error) {
    res.status(200).send(MessageFail("Hubo un error en el servidor. " + e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const guiaId = req.params.id;
    const response = await GuiasService.getGuiaByID(guiaId);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
export default router;
