import Anuncio from "../modelos/Anuncio.js";

export const criarAnuncio = async (req, res) => {
    try {
        const novoAnuncio = await Anuncio.create(req.body);

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
        const { categoria } = req.query;

        let anuncios;

        if (categoria) {
            anuncios = await Anuncio.find({
                categoria: categoria
            });
        } else {
            anuncios = await Anuncio.find();
        }

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
            return res.status(404).json({
                mensagem: "Anúncio não encontrado"
            });
        }

        res.json(anuncio);

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar anúncio",
            erro: erro.message
        });
    }
};


export const atualizarAnuncio = async (req, res) => {
    try {
        const anuncioAtualizado = await Anuncio.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!anuncioAtualizado) {
            return res.status(404).json({
                mensagem: "Anúncio não encontrado"
            });
        }

        res.json(anuncioAtualizado);

    } catch (erro) {
        res.status(400).json({
            mensagem: "Erro ao atualizar anúncio",
            erro: erro.message
        });
    }
};


export const excluirAnuncio = async (req, res) => {
    try {
        const anuncio = await Anuncio.findByIdAndDelete(req.params.id);

        if (!anuncio) {
            return res.status(404).json({
                mensagem: "Anúncio não encontrado"
            });
        }

        res.json({
            mensagem: "Anúncio excluído com sucesso",
            anuncio: anuncio
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao excluir anúncio",
            erro: erro.message
        });
    }
};