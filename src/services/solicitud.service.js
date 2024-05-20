import { where } from "sequelize";
import { User } from "../models/user.model.js";
import { Solicitudes } from "../models/solicitud.model.js";
import { Guias } from "../models/guias.model.js";
import nodemailer from "nodemailer";
import { SolicitudEquipoService } from "./solicitudEquipo.service.js";
import { SolicitudReactivo } from "../models/solicitudreactivo.model.js";
import { SolicitudEquipo } from "../models/solicitudEquipo.model.js";
import { EquipoUsado } from "../models/EquipoUsado.js";
import { PendientesMaterial } from "../models/PendientesMaterial.model.js";
import { Detalle_Equipo } from "../models/detalle_equipo.model.js";
import { Reactivos } from "../models/reactivo.model.js";

export const SolicitudService = {
  registerSolicitud: async (solicitud) => {
    try {
      solicitud.estado = true;
      solicitud.aprobadoTutor = false;
      solicitud.aprobadoAdministrador = false;
      const solicitudInDB = await Solicitudes.create(solicitud);
      if (solicitudInDB) {
        let tutorNombre = await User.findOne({ where: { id: solicitud.tutorId } });
        console.log(tutorNombre);
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
  getAllSolicitudesApproved: async () => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { estado: true, aprobadoTutor: true, aprobadoAdministrador: true } });
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
  getInvestigadorSolicitudesApproved: async (id) => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { solicitanteid: id, estado: true, aprobadoTutor: true, aprobadoAdministrador: true } });
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
  getTutorSolicitudesApproved: async (id) => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { tutorId: id, estado: true, aprobadoTutor: true, aprobadoAdministrador: true } });
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
  recharzarSolicitud: async (_solicitud) => {
    try {
      const solicitud = await Solicitudes.findOne({ where: { id: _solicitud.id } });
      if (solicitud && solicitud.tutorId == _solicitud.userid) {
        solicitud.estado = false;
        solicitud.comentario = _solicitud.comentario;
        solicitud.aprobadoTutor = false;
        await solicitud.save();
        await SolicitudEquipoService.deleteSolicitudEquipo(solicitud.id);
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
          subject: `Solicitud de Reserva del Laboratorio del CICEI ha sido Rechazada`,
          html: `Tu solicitud de reserva con numero de reserva ${solicitud.id} en el laboratorio del CICEI ha sido rechazada por el Tutor ${_solicitud.tutorNombre}. Por favor, revisa la solicitud en la plataforma.`,
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
        throw new Error("No se encontró la solicitud.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  recharzarAdministradorSolicitud: async (_solicitud) => {
    try {
      const solicitud = await Solicitudes.findOne({ where: { id: _solicitud.id } });
      if (solicitud && _solicitud.rol == "Administrador") {
        solicitud.estado = false;
        solicitud.comentario = _solicitud.comentario;
        solicitud.administradorId = _solicitud.userid;
        solicitud.aprobadoAdministrador = false;
        await solicitud.save();
        await SolicitudEquipoService.deleteSolicitudEquipo(solicitud.id);
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
          subject: `Solicitud de Reserva del Laboratorio del CICEI ha sido Rechazada`,
          html: `Tu solicitud de reserva con numero de reserva ${solicitud.id} en el laboratorio del CICEI ha sido rechazada por el Administrador ${_solicitud.creadoBy}. Por favor, revisa la solicitud en la plataforma.`,
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
  getAllSolicitudesRechazadas: async () => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { estado: false } });
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
  getInvestigadorSolicitudesRechazadas: async (id) => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { solicitanteid: id, estado: false } });
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
  getTutorSolicitudesRechazadas: async (id) => {
    try {
      const solicitudes = await Solicitudes.findAll({ where: { tutorId: id, estado: false } });
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
  entregarSolicitud: async (_solicitud) => {
    try {
      const solicitud = await Solicitudes.findOne({ where: { id: _solicitud.id } });
      if (solicitud) {
        solicitud.entregadoAdmi = true;
        solicitud.entregadoIdAdmin = _solicitud.userid;
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
          subject: `Solicitud de Reserva del Laboratorio del CICEI ha sido Entregada`,
          html: `Tu solicitud de reserva con numero de reserva ${solicitud.id} en el laboratorio del CICEI ha sido entregada por el Administrador ${_solicitud.creadoBy}. Estas de acuardo con la entrega?.
          <br/>
          <h4>Para donfirmar da click al siguiente enlace</h4>
          <br/>
          <a href="${process.env.URLFRONT}/solicitud/entregada?solicitud=${solicitud.id}">Confirma la entrega</a>`,
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
        throw new Error("No se encontró la solicitud.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  entregarSolicitudInvestigador: async (_solicitud) => {
    try {
      console.log(_solicitud);
      const solicitud = await Solicitudes.findOne({ where: { id: _solicitud.solicitud, entregadoAdmi: true } });
      solicitud.entregadoInvestigador = true;
      await solicitud.save();
      return solicitud;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  obtenerListaMateriales: async (id) => {
    try {
      const material = [];
      const ReactivosInDB = await SolicitudReactivo.findAll({ where: { solicitudeId: id } });
      const EquiposInDB = await SolicitudEquipo.findAll({ where: { solicitudeId: id } });
      for (let i = 0; i < ReactivosInDB.length; i++) {
        ReactivosInDB[i].dataValues.tipo = "Reactivo";
        ReactivosInDB[i].dataValues.codigo = "";
        material.push(Object.assign({}, ReactivosInDB[i].dataValues));
      }
      for (let i = 0; i < EquiposInDB.length; i++) {
        EquiposInDB[i].dataValues.tipo = "Equipo";
        EquiposInDB[i].dataValues.codigo = "";
        for (let j = 0; j < EquiposInDB[i].cantidad; j++) {
          material.push(Object.assign({}, EquiposInDB[i].dataValues));
        }
      }
      for (let i = 0; i < material.length; i++) {
        material[i]._id = i + 1;
        console.log(material[i]);
      }
      return material;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  devolverMateriales: async (_solicitud) => {
    try {
      const equipo = await Detalle_Equipo.findOne({ where: { num_ucb: _solicitud.codigo } });
      const reactivo = await Reactivos.findOne({ where: { codigo: _solicitud.codigo } });
      if (equipo || reactivo) {
        if (_solicitud.estado === "OK") {
          if (_solicitud.tipo === "Equipo") {
            const equipoUsado = await EquipoUsado.findOne({ where: { id: _solicitud.equipoId } });
            equipoUsado.cantidad = Number(equipoUsado.cantidad) - 1;
            await equipoUsado.save();
            const solicitudEquipo = await SolicitudEquipo.findOne({ where: { equipoId: _solicitud.equipoId, solicitudeId: _solicitud.solicitudeId } });
            solicitudEquipo.cantidadAprobada = Number(solicitudEquipo.cantidadAprobada) + 1;
            solicitudEquipo.save();
            return equipoUsado;
          }
          if (_solicitud.tipo === "Reactivo") {
            console.log("reactivo");
            const solicitudReactivo = await SolicitudReactivo.findOne({ where: { reactivoId: _solicitud.reactivoId, solicitudeId: _solicitud.solicitudeId } });
            solicitudReactivo.cantidadAprobada = Number(_solicitud.cantidad);
            solicitudReactivo.save();
            return solicitudReactivo;
          }
        }
        if (_solicitud.estado === "Reservado" || _solicitud.estado === "Estropeado") {
          if (_solicitud.tipo === "Reactivo") {
            const pendientesInDB = await PendientesMaterial.create(
              {
                solicitudeId: _solicitud.solicitudeId,
                tipo: _solicitud.tipo,
                materialId: _solicitud.reactivoId,
                codigo: _solicitud.codigo,
                comentario: _solicitud.comentario,
                estado: _solicitud.estado,
                creadoBy: _solicitud.CreadoBy,
              },
              { fields: ["solicitudeId", "tipo", "materialId", "codigo", "comentario", "estado", "creadoBy"] }
            );
            const solicitudReactivo = await SolicitudReactivo.findOne({ where: { reactivoId: _solicitud.reactivoId, solicitudeId: _solicitud.solicitudeId } });
            solicitudReactivo.cantidadAprobada = Number(_solicitud.cantidad);
            solicitudReactivo.save();
            return pendientesInDB;
          }
          if (_solicitud.tipo === "Equipo") {
            console.log("equipo");
            let pendientesInDB = await PendientesMaterial.create(
              {
                solicitudeId: _solicitud.solicitudeId,
                tipo: _solicitud.tipo,
                materialId: _solicitud.equipoId,
                codigo: _solicitud.codigo,
                comentario: _solicitud.comentario,
                estado: _solicitud.estado,
                creadoBy: _solicitud.CreadoBy,
              },
              { fields: ["solicitudeId", "tipo", "materialId", "codigo", "comentario", "estado", "creadoBy"] }
            );
            console.log(pendientesInDB);
            const equipo = await Detalle_Equipo.findOne({ where: { equipoId: _solicitud.equipoId, num_ucb: _solicitud.codigo } });
            if (!equipo) {
              throw new Error("Equipo no disponible");
            }
            equipo.estado = false;
            equipo.observaciones = _solicitud.comentario;
            await equipo.save();
            const solicitudEquipo = await SolicitudEquipo.findOne({ where: { equipoId: _solicitud.equipoId, solicitudeId: _solicitud.solicitudeId } });
            solicitudEquipo.cantidadAprobada = Number(solicitudEquipo.cantidadAprobada) + 1;
            solicitudEquipo.save();
            return pendientesInDB;
          }
        }
      } else {
        throw new Error("El codigo no existe");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  obtenerListaMaterialesDevueltos: async (id) => {
    let alldevuelto = false;
    const equipo = await SolicitudEquipo.findAll({ where: { solicitudeId: id } });
    const reactivo = await SolicitudReactivo.findAll({ where: { solicitudeId: id } });
    for (let i = 0; i < equipo.length; i++) {
      if (equipo[i].cantidadAprobada === equipo[i].cantidad) {
        alldevuelto = true;
      } else {
        alldevuelto = false;
        const solicitudEquipo = await SolicitudEquipo.findOne({ where: { solicitudeId: id } });
        solicitudEquipo.cantidadAprobada = 0;
        solicitudEquipo.save();
        const solicitudReactivo = await SolicitudReactivo.findOne({ where: { solicitudeId: id } });
        solicitudReactivo.cantidadAprobada = 0;
        solicitudReactivo.save();
        throw new Error("No se registraron todos los Materiales, Por favor ingrese todos los materiales Devueltos");
      }
    }
    for (let i = 0; i < reactivo.length; i++) {
      if (reactivo[i].cantidadAprobada === reactivo[i].cantidad) {
        alldevuelto = true;
      } else {
        alldevuelto = false;
        const solicitudEquipo = await SolicitudEquipo.findOne({ where: { solicitudeId: id } });
        solicitudEquipo.cantidadAprobada = 0;
        solicitudEquipo.save();
        const solicitudReactivo = await SolicitudReactivo.findOne({ where: { solicitudeId: id } });
        solicitudReactivo.cantidadAprobada = 0;
        solicitudReactivo.save();
        throw new Error("No se registraron todos los Materiales, Por favor ingrese todos los materiales Devueltos");
      }
    }
    if (alldevuelto) {
      const solicitud = await Solicitudes.findOne({ where: { id } });
      solicitud.devuelto = true;
      await solicitud.save();
      return solicitud;
    }
  },
};
