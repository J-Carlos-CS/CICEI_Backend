import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { ManualService } from "../services/manual.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const response = await ManualService.getAllManuales();
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/", async function (req, res) {
  try {
    const manual = req.body;
    const response = await ManualService.registerManual(manual);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const manualId = req.params.id;
    const response = await ManualService.getManualByID(manualId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
router.put("/:id", async function (req, res) {
  try {
    const manual = req.body;
    const manualId = req.params.id;
    const response = await ManualService.putManual(manualId, manual);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    await logGenerator(error.message);
    res.status(200).send(MessageFail(error.message));
  }
});
router.delete("/:id", async function (req, res) {
  try {
    const manualId = req.params.id;
    const response = await ManualService.deleteManualbyID(manualId);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});

export default router;
