import express from "express";
import {
    criarAnuncio,
    listarAnuncios,
    buscarAnuncio,
    atualizarAnuncio,
    excluirAnuncio
} from "../controles/controleAnuncios.js";
import { autenticarToken } from "../middleware/autenticar.js";

const rotas = express.Router();

rotas.get("/", listarAnuncios);
rotas.get("/:id", buscarAnuncio);
rotas.post("/", autenticarToken, criarAnuncio);
rotas.put("/:id", autenticarToken, atualizarAnuncio);
rotas.delete("/:id", autenticarToken, excluirAnuncio);

export default rotas;