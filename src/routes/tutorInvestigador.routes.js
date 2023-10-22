import express from "express";
import { MessageFail, MessageSuccess } from "../../messages/messageSuccess.js";
import { TutorInvestigadorService } from "../services/tutorInvestigador.service.js";

const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const newTutorInvestigador = req.body;
    const response = await TutorInvestigadorService.registerRegisterTutorInvestigador(newTutorInvestigador);
    res.status(200).send(MessageSuccess(response));
  } catch (e) {
    res.status(200).send(MessageFail(e.message));
  }
});
router.get("/:id", async function (req, res) {
  try {
    const tutorID = req.params.id;
    const response = await TutorInvestigadorService.getTutorInvestigador(tutorID);
    res.status(200).send(MessageSuccess(response));
  } catch (error) {
    res.status(200).send(MessageFail(error.message));
  }
});
export default router;
