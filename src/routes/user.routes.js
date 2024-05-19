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
import { UserService } from "../services/user.service.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const response = await UserService.getAllUsers();
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const response = await UserService.getOneUser(id);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(response));
  }
});
router.get("/investigador/all", async function (req, res) {
  try {
    const response = await UserService.getInvestigadorUser();
    console.log(response);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/", async function (req, res) {
  try {
    const user = req.body;
    user.email = user.email.toLowerCase();
    const response = await UserService.registerUser(user);
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/tutor", async function (req, res) {
  try {
    const response = await UserService.test();
    res.status(200).send(response);
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.post("/login", async function (req, res) {
  const user = req.body;
  try {
    const userInDB = await UserService.getOneUserEmail(user.email);
    if (userInDB && userInDB.status) {
      const match = await bcrypt.compare(user?.password, userInDB?.password);
      if (match) {
        const userForToken = {
          id: userInDB.id,
          firstName: userInDB.firstName,
          lastName: userInDB.lastName,
          email: userInDB.email,
          rol: userInDB.rol,
          picture: userInDB.picture,
          career: userInDB.career,
        };
        const token = await jwt.sign(userForToken, process.env.TOKEN_SECRET);
        res.status(200).send(MessageSuccess(token));
      } else {
        res.status(200).send(MessageFail("Las credenciales son incorrectas."));
      }
    } else {
      res.status(200).send(MessageFail("Las credenciales son incorrectas."));
    }
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});

router.post("/crearUser", async function (req, res) {
  try {
    const user = req.body;
    user.email = user.email.toLowerCase();
    const response = await UserService.invitarUsuario(user);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const user = req.body;
    const response = await UserService.putUser(id, user);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
export default router;
