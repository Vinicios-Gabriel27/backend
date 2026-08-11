import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vortex_super_secreto_2026";

export const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: "Acesso negado. Token não fornecido." });
    }

    try {
        const usuarioVerificado = jwt.verify(token, JWT_SECRET);
        req.usuarioId = usuarioVerificado.id;
        next();
    } catch (erro) {
        return res.status(403).json({ mensagem: "Token inválido ou expirado." });
    }
};