import Anuncio from "../modelos/Anuncio.js";

export const criarAnuncio = async (req, res) => {
    try {
        
        const novoAnuncio = await Anuncio.create({
            ...req.body,
            usuario: req.usuarioId 
        });

        res.status(201).json(novoAnuncio);
    } catch (erro) {
        res.status(400).json({
            mensagem: "Erro ao criar anúncio",
            erro: erro.message
        });
    }
};

export const listarAnuncios = async (req, res) => {
    try {
        const { categoria, usuario } = req.query;
        let filtro = {};

        if (categoria) filtro.categoria = categoria;
        if (usuario) filtro.usuario = usuario; // Permite filtrar por usuário no Perfil

        const anuncios = await Anuncio.find(filtro).sort({ createdAt: -1 });
        res.json(anuncios);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar anúncios",
            erro: erro.message
        });
    }
};

export const buscarAnuncio = async (req, res) => {
    try {
        const anuncio = await Anuncio.findById(req.params.id);
        if (!anuncio) {
            return res.status(404).json({ mensagem: "Anúncio não encontrado" });
        }
        res.json(anuncio);
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao buscar anúncio", erro: erro.message });
    }
};

export const atualizarAnuncio = async (req, res) => {
    try {
        const anuncio = await Anuncio.findById(req.params.id);
        if (!anuncio) {
            return res.status(404).json({ mensagem: "Anúncio não encontrado" });
        }

        // Garante que só o dono pode atualizar
        if (anuncio.usuario.toString() !== req.usuarioId) {
            return res.status(403).json({ mensagem: "Sem permissão para alterar este anúncio" });
        }

        const anuncioAtualizado = await Anuncio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(anuncioAtualizado);
    } catch (erro) {
        res.status(400).json({ mensagem: "Erro ao atualizar anúncio", erro: erro.message });
    }
};

export const excluirAnuncio = async (req, res) => {
    try {
        const anuncio = await Anuncio.findById(req.params.id);
        if (!anuncio) {
            return res.status(404).json({ mensagem: "Anúncio não encontrado" });
        }

        // Garante que só o dono pode excluir
        if (anuncio.usuario.toString() !== req.usuarioId) {
            return res.status(403).json({ mensagem: "Sem permissão para excluir este anúncio" });
        }

        await Anuncio.findByIdAndDelete(req.params.id);
        res.json({ mensagem: "Anúncio excluído com sucesso" });
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao excluir anúncio", erro: erro.message });
    }
};