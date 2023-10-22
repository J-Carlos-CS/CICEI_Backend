import { TutorInvestigador } from "../models/tutorInvestigador.model.js";
import { User } from "../models/user.model.js";

export const TutorInvestigadorService = {
  registerRegisterTutorInvestigador: async (newTutorInvestigador) => {
    try {
      if (newTutorInvestigador.tutorId && newTutorInvestigador.investigadorId) {
        newTutorInvestigador.estado = true;
        newTutorInvestigador.userId = newTutorInvestigador.investigadorId;
        const tutorInvestigadorInDB = await TutorInvestigador.create(newTutorInvestigador);
        return tutorInvestigadorInDB;
      } else {
        throw new Error("Información Básica del Tutor investigador incompleta.");
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  getTutorInvestigador: async (tutorID) => {
    try {
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
