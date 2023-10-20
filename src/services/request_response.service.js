import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { RequestResponse } from "../models/request_response.model.js";

export const RequestResponseService  = {
    createRequestResponse: async (r) => {
      try {
        if (r.message) {
            const request = await RequestResponse.create(r)
            return request;
        } else {
          throw new Error("Error Solicitud vacia");
        }
      } catch (e) {
        throw new Error(e.message);
      }
    },
    getAllRequestsResponses: async () => {
        const requests = await RequestResponse.findAll();
        return requests;
      },
  };