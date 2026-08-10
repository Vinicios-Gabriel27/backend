import express from "express";
import { registrar, login } from "../controles/controleUsuarios.js";

const rotas = express.Router();

rotas.post("/registrar", registrar);
rotas.post("/login", login);

export default rotas;