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
    });
    return users;
  },
  getInvestigadorUser: async () => {
    const user = await User.findAll({
      where: { rol: "Investigador" },
    });
    console.log(user);
    return user;
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
              subject: "Bienvenido a la plataforma del Laboratorio del CIEI",
              html: `Hola <strong>${user.firstName} ${user.lastName}</strong> <br/>Has sido invitado a la plataforma de Reservas del Laboratorio del CICEI. <br/> Tu contraseña es: <strong>${password}</strong>`,
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
  putUser: async (id, user) => {
    try {
      let userInDB = await User.findOne({
        where: { id },
      });
      if (!userInDB) {
        throw new Error("Usuario no disponible");
      }
      userInDB.status = user.status;
      userInDB.rol = user.rol;
      return await userInDB.save();
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
