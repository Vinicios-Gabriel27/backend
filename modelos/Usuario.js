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
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
});


usuarioSchema.pre('save', async function () {
    if (!this.isModified('senha')) return;
    this.senha = await bcrypt.hash(this.senha, 10);
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;