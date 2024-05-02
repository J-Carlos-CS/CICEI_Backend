import { where } from "sequelize";
import { TutorInvestigador } from "../models/tutorInvestigador.model.js";
import { User } from "../models/user.model.js";

export const TutorInvestigadorService = {
  registerRegisterTutorInvestigador: async (newTutorInvestigador) => {
    try {
      if (newTutorInvestigador.tutorId && newTutorInvestigador.investigadorId) {
        const result = await TutorInvestigador.findOne({
          where: { tutorId: newTutorInvestigador.tutorId, investigadorId: newTutorInvestigador.investigadorId },
        });
        if (result) {
          throw new Error("Ya se Registro a este Investigador.");
        } else {
          newTutorInvestigador.estado = true;
          newTutorInvestigador.userId = newTutorInvestigador.investigadorId;
          const tutorInvestigadorInDB = await TutorInvestigador.create(newTutorInvestigador);
          return tutorInvestigadorInDB;
        }
      } else {
        throw new Error("Información Básica del Tutor investigador incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getTutorInvestigador: async (tutorID) => {
    try {
      const tutorInvestigador = await TutorInvestigador.findAll({ where: { tutorId: tutorID } });
      if (tutorInvestigador) {
        const investigadorIds = tutorInvestigador.map((t) => t.investigadorId);
        const usuarios = await User.findAll({ where: { id: investigadorIds } });
        return usuarios;
      } else {
        throw new Error("No se encontró el tutor investigador.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getTutorInvestigadorByInvestigadorId: async (investigadorId) => {
    try {
      const tutorInvestigador = await TutorInvestigador.findAll({ where: { investigadorId: investigadorId } });
      if (tutorInvestigador) {
        const investigadorIds = tutorInvestigador.map((t) => t.tutorId);
        const usuarios = await User.findAll({ where: { id: investigadorIds } });
        return usuarios;
      } else {
        throw new Error("No se encontró el tutor investigador.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
