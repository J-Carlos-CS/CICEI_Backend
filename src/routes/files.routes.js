import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { FileService } from "../services/file.service.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/informe", upload.single("informe"), async function (req, res) {
  try {
    let myfile = req.file;
    let currentId = req.body.id;
    let fileMetaData = {
      name: myfile.originalname,
      size: myfile.size,
      tempFilePath: myfile.path,
      mimetype: myfile.mimetype,
    };
    let parentID = process.env.USERPARENT;
    let response = await FileService.createAndUploadFiles(fileMetaData, currentId, parentID);
    if (response.status === 200) {
      res.status(200).send(MessageSuccess(response.data));
    } else {
      res.status(200).send(MessageFail(response.message));
    }
  } catch (error) {}
});

export default router;
