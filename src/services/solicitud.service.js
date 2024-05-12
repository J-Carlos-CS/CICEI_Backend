import { where } from "sequelize";
import { User } from "../models/user.model.js";
import { Solicitudes } from "../models/solicitud.model.js";
import { Guias } from "../models/guias.model.js";
import nodemailer from "nodemailer";

export const SolicitudService = {
  registerSolicitud: async (solicitud) => {
    try {
      console.log(solicitud);
      solicitud.estado = true;
      solicitud.aprobadoTutor = false;
      solicitud.aprobadoAdministrador = false;
      const solicitudInDB = await Solicitudes.create(solicitud);
      if (solicitudInDB) {
        let tutorNombre = await User.findOne({ where: { id: solicitudes.tutorId } });
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
          from: "Solicitud de Reserva del Laboratorio del CICEI",
          to: tutorNombre.email,
          subject: `El Investigador ${solicitud.solicitante} ha solicitado una reserva del Laboratorio del CICEI`,
          html: `El Investigador ${solicitud.solicitante} hizo una reserva con numero de reserva ${solicitudInDB.id} en el laboratorio del CICEI. Por favor, revisa la solicitud en la plataforma.`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
      return solicitudInDB;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getAllSolicitudes: async () => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { estado: true, aprobadoTutor: true, aprobadoAdministrador: false } });
      const newsolicitudes = [];
      for (let i = 0; i < solicitudes.length; i++) {
        let tutorNombre = await User.findOne({ where: { id: solicitudes[i].tutorId } });
        let AdminNombre = await User.findOne({ where: { id: solicitudes[i].administradorId } });
        let guia = await Guias.findOne({ where: { id: solicitudes[i].fieldId } });
        newsolicitudes.push(solicitudes[i].dataValues);
        newsolicitudes[i].tutorNombre = tutorNombre.firstName + " " + tutorNombre.lastName;
        newsolicitudes[i].adminNombre = AdminNombre == null ? "" : AdminNombre.firstName + " " + AdminNombre.lastName;
        newsolicitudes[i].titulo = guia == null ? "" : guia.titulo;
        newsolicitudes[i].guiaKey = guia == null ? "" : guia.file;
      }
      return newsolicitudes;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getInvestigadorSolicitudes: async (id) => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { solicitanteid: id, estado: true, aprobadoTutor: false, aprobadoAdministrador: false } });
      const newsolicitudes = [];
      for (let i = 0; i < solicitudes.length; i++) {
        let tutorNombre = await User.findOne({ where: { id: solicitudes[i].tutorId } });
        let AdminNombre = await User.findOne({ where: { id: solicitudes[i].administradorId } });
        let guia = await Guias.findOne({ where: { id: solicitudes[i].fieldId } });
        newsolicitudes.push(solicitudes[i].dataValues);
        newsolicitudes[i].tutorNombre = tutorNombre.firstName + " " + tutorNombre.lastName;
        newsolicitudes[i].adminNombre = AdminNombre == null ? "" : AdminNombre.firstName + " " + AdminNombre.lastName;
        newsolicitudes[i].titulo = guia == null ? "" : guia.titulo;
        newsolicitudes[i].guiaKey = guia == null ? "" : guia.file;
      }
      return newsolicitudes;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getTutorSolicitudes: async (id) => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { tutorId: id, estado: true, aprobadoTutor: false, aprobadoAdministrador: false } });
      const newsolicitudes = [];
      for (let i = 0; i < solicitudes.length; i++) {
        let tutorNombre = await User.findOne({ where: { id: solicitudes[i].tutorId } });
        let AdminNombre = await User.findOne({ where: { id: solicitudes[i].administradorId } });
        let guia = await Guias.findOne({ where: { id: solicitudes[i].fieldId } });
        newsolicitudes.push(solicitudes[i].dataValues);
        newsolicitudes[i].tutorNombre = tutorNombre.firstName + " " + tutorNombre.lastName;
        newsolicitudes[i].adminNombre = AdminNombre == null ? "" : AdminNombre.firstName + " " + AdminNombre.lastName;
        newsolicitudes[i].titulo = guia == null ? "" : guia.titulo;
        newsolicitudes[i].guiaKey = guia == null ? "" : guia.file;
      }
      return newsolicitudes;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  aprobarSolicitud: async (_solicitud) => {
    try {
      const solicitud = await Solicitudes.findOne({ where: { id: _solicitud.id } });
      if (solicitud && solicitud.tutorId == _solicitud.userid) {
        solicitud.aprobadoTutor = true;
        solicitud.comentario = "Aprobado por el tutor";
        await solicitud.save();
        const admi = await User.findAll({ where: { rol: "Administrador" } });
        for (let i = 0; i < admi.length; i++) {
          console.log(admi[i].email);
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
            from: "Solicitud de Reserva del Laboratorio del CICEI",
            to: admi[i].email,
            subject: `El Investigador ${solicitud.solicitante} ha solicitado una reserva del Laboratorio del CICEI`,
            html: `El Investigador ${solicitud.solicitante} hizo una reserva con numero de reserva ${solicitud.id} en el laboratorio del CICEI el Tutor ${_solicitud.tutorNombre} Aprobo la Solicitud. Por favor, revisa la solicitud en la plataforma.`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
        return solicitud;
      } else {
        throw new Error("No se encontró la solicitud.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  aprobarAdministradorSolicitud: async (_solicitud) => {
    try {
      const solicitud = await Solicitudes.findOne({ where: { id: _solicitud.id } });
      if (solicitud && _solicitud.rol == "Administrador" && solicitud.aprobadoTutor == true) {
        solicitud.aprobadoAdministrador = true;
        solicitud.administradorId = _solicitud.userid;
        solicitud.comentario = "Aprobado por el administrador";
        await solicitud.save();
        const solicitante = await User.findOne({ where: { id: solicitud.solicitanteid } });
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
          from: "Solicitud de Reserva del Laboratorio del CICEI",
          to: solicitante.email,
          subject: `Solicitud de Reserva del Laboratorio del CICEI Aprobada`,
          html: `Tu solicitud de reserva con numero de reserva ${solicitud.id} en el laboratorio del CICEI ha sido aprobada por el Administrador ${_solicitud.creadoBy} y el Tutor ${_solicitud.tutorNombre}. Por favor, revisa la solicitud en la plataforma.`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return solicitud;
      } else {
        throw new Error("No eres Administrador.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
