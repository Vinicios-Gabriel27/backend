import express from "express";

import {
    criarAnuncio,
    listarAnuncios,
    buscarAnuncio,
    atualizarAnuncio,
    excluirAnuncio
} from "../controles/controleAnuncios.js";

const rotas = express.Router();

rotas.post("/", criarAnuncio);

rotas.get("/", listarAnuncios);

rotas.get("/:id", buscarAnuncio);

rotas.put("/:id", atualizarAnuncio);

rotas.delete("/:id", excluirAnuncio);

export default rotas;