import Usuario from "../modelos/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vortex_super_secreto_2026";

export const registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: "E-mail já está em uso." });
        }

        const novoUsuario = await Usuario.create({ nome, email, senha });

        const token = jwt.sign({ id: novoUsuario._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ 
            mensagem: "Usuário registrado com sucesso!",
            usuario: { id: novoUsuario._id, nome: novoUsuario.nome, email: novoUsuario.email },
            token 
        });
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao registrar usuário", erro: erro.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha inválida." });
        }

        const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ 
            mensagem: "Login realizado com sucesso!",
            usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
            token 
        });
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao fazer login", erro: erro.message });
    }
};