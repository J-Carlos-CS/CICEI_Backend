import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import generator from "generate-password";
import { User } from "../models/user.model.js";

export const UserService = {
  registerUser: async (user) => {
    try {
      if (user.email && user.password && user.lastName && user.firstName && user.rol && user.cellPhone) {
        const password = await bcrypt.hash(user.password, 10);
        user.email = user.email.toLowerCase();
        user.password = password;
        user.state = true;
        user.status = true;
        const userEmailInDB = await User.findOne({
          where: { status: true, email: user.email },
        });
        let userInDB = null;
        if (!userEmailInDB) {
          userInDB = await User.create(user);
        } else {
          throw new Error("Ya existe un usuario con ese correo electrónico.");
        }
        return userInDB;
      } else {
        throw new Error("Información Básica del Usuario incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAllUsers: async () => {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      where: { status: true },
    });
    return users;
  },
  getOneUserEmail: async (email) => {
    const user = await User.findOne({
      where: { email: email },
      attributes: { include: "password" },
    });
    return user;
  },
  getTutorUser: async () => {
    const user = await User.findAll({
      where: { rol: "Tutor" },
    });
    return user;
  },
  getOneUser: async (id) => {
    const user = await User.findOne({
      where: { id: id },
      attributes: { include: "password" },
    });
    return user;
  },
  invitarUsuario: async (user) => {
    try {
      if (user.email && user.lastName && user.firstName && user.rol) {
        const password = generator.generate({ length: 10, numbers: true });
        console.log(password);
        const key = await bcrypt.hash(password, 10);
        console.log(key);
        user.email = user.email.toLowerCase();
        user.password = key;
        user.state = true;
        user.status = true;
        const userEmailInDB = await User.findOne({
          where: { status: true, email: user.email },
        });
        let userInDB = null;
        if (!userEmailInDB) {
          userInDB = await User.create(user);
          if (userInDB) {
            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
              },
              tls: { rejectUnauthorized: false },
            });
            const mailOptions = {
              from: "Invitar Usuario :)",
              to: user.email,
              subject: "Bienvenido a la plataforma de tutores",
              text: `Hola ${user.firstName} ${user.lastName},bienvenido a la plataforma de tutores. Tu contraseña es: ${password}`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        } else {
          throw new Error("Ya existe un usuario con ese correo electrónico.");
        }
        return userInDB;
      } else {
        throw new Error("Información Básica del Usuario incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
