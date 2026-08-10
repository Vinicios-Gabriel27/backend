import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Não permite e-mails repetidos
    },
    senha: {
        type: String,
        required: true
    }
});

// Hook para criptografar a senha antes de salvar no banco
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;