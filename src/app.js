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

const app = express();
const ROUTE_URL = "/laboratorio/api";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use(ROUTE_URL + "/user", User);
app.use(ROUTE_URL + "/categorias", Categoria);
app.use(ROUTE_URL + "/proyectos", Proyecto);
app.use(ROUTE_URL + "/reactivos", Reactivo);
app.use(ROUTE_URL + "/manuales", Manual);
app.use(ROUTE_URL + "/equipos", Equipo);
app.use(ROUTE_URL + "/detalle", DetalleEquipo);
export default app;
