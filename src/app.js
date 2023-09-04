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

const app = express();
const ROUTE_URL = "/laboratorio/api";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(ROUTE_URL + "/user", User);
app.use(ROUTE_URL + "/categoria", Categoria);
app.use(ROUTE_URL + "/proyecto", Proyecto);
app.use(ROUTE_URL + "/reactivo", Reactivo);

export default app;
