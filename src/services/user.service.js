import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
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
};
