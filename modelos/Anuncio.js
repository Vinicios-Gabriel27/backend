import mongoose from "mongoose";

const anuncioSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    categoria: { type: String, required: true },
    preco: { type: Number, required: true },
    doacao: { type: Boolean, default: false },
    imagem: { type: String, required: true },
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuario", 
        required: true 
    } 
}, { timestamps: true });

const Anuncio = mongoose.model("Anuncio", anuncioSchema);
export default Anuncio;