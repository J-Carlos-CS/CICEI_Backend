import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { RequestService } from "../services/request.service.js";

const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const request = req.body;
    const response = await RequestService.createRequest(request);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(400).send(MessageFail(e.message));
  }
});
router.get("/", async function (req, res) {
    try {
        const response = await RequestService.getAllRequests();
        res.status(200).send(response);
      } catch (e) {
        res.status(200).send(MessageFail(e.message));
      }
  });
  router.get("/:id", async function (req, res) {
    try {
        const response = await RequestService.getAllRequests();
        res.status(200).send(response);
      } catch (e) {
        res.status(200).send(MessageFail(e.message));
      }
  });
export default router;