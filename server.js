import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rotasAnuncio from "./rotas/rotasAnuncios.js";
import rotasUsuarios from "./rotas/rotasUsuarios.js"; // <-- NOVO

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch((erro) => console.log("Erro ao conectar MongoDB:", erro));

app.get("/", (req, res) => {
    res.json({ mensagem: "API do Marketplace Vortex funcionando!" });
});

// Nossas rotas
app.use("/anuncios", rotasAnuncio);
app.use("/usuarios", rotasUsuarios); // <-- NOVO

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));s