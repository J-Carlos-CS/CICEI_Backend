import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Request } from "../models/request.model.js";
export const RequestService = {
    createRequest: async (r) => {
      try {
        if (r.proyectName) {
            const request = await Request.create(r)
            return request;
        } else {
          throw new Error("Error Solicitud vacia");
        }
      } catch (e) {
        throw new Error(e.message);
      }
    },

  };