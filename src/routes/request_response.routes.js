import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import mime from "mime-types";
import prom from "fs/promises";
import nodemailer from "nodemailer";
import path from "path";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { authenticateToken } from "../../auth/auth.js";
import { RequestResponseService } from "../services/request_response.service.js";

const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const request = req.body;
    const response = await RequestResponseService.createRequestResponse(request);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(400).send(MessageFail(e.message));
  }
});
router.get("/", async function (req, res) {
    try {
        const response = await RequestResponseService.getAllRequestsResponses();
        res.status(200).send(response);
      } catch (e) {
        res.status(200).send(MessageFail(e.message));
      }
  });
export default router;