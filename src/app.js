import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import fileupload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";

import User from "./routes/user.routes.js";
import Categoria from "./routes/categoria.routes.js";
import Proyecto from "./routes/proyecto.routes.js";
import Reactivo from "./routes/reactivo.routes.js";
import Manual from "./routes/manual.routes.js";
import Equipo from "./routes/equipos.routes.js";
import DetalleEquipo from "./routes/detalleEquipo.routes.js";
import TutorInvestigador from "./routes/tutorInvestigador.routes.js";
import Unidades from "./routes/unidades.routes.js";
import Files from "./routes/files.routes.js";
import Guias from "./routes/guias.routes.js";
import Solicitud from "./routes/solicitud.routes.js";

const app = express();
const ROUTE_URL = "/laboratorio/api";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(ROUTE_URL + "/user", User);
app.use(ROUTE_URL + "/categorias", Categoria);
app.use(ROUTE_URL + "/proyectos", Proyecto);
app.use(ROUTE_URL + "/reactivos", Reactivo);
app.use(ROUTE_URL + "/manuales", Manual);
app.use(ROUTE_URL + "/equipos", Equipo);
app.use(ROUTE_URL + "/detalle", DetalleEquipo);
app.use(ROUTE_URL + "/tutorinvestigador", TutorInvestigador);
app.use(ROUTE_URL + "/unidades", Unidades);
app.use(ROUTE_URL + "/file", Files);
app.use(ROUTE_URL + "/guias", Guias);
app.use(ROUTE_URL + "/solicitud", Solicitud);
export default app;
