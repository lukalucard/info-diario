// ============================================
// CONTROLLER DE NOTÍCIAS
// Responsabilidade: Processar requisições e respostas
// ============================================

// Importar o Model (operações com banco)
const newsModel = require('../models/newsModel');

// ============================================
// 1. LISTAR TODAS AS NOTÍCIAS
// ============================================

/**
 * GET /api/news
 * Lista todas as notícias
 */
const listar = async (req, res) => {
    try {
        // Buscar todas as notícias do banco
        const noticias = await newsModel.findAll();
        
        // Verificar se há notícias
        if (noticias.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Nenhuma notícia encontrada',
                data: [],
                total: 0
            });
        }

        // Retornar as notícias
        return res.status(200).json({
            success: true,
            message: 'Notícias listadas com sucesso',
            data: noticias,
            total: noticias.length
        });
    } catch (error) {
        console.error('❌ Erro ao listar notícias:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao listar notícias',
            error: error.message
        });
    }
};

// ============================================
// 2. BUSCAR NOTÍCIA POR ID
// ============================================

/**
 * GET /api/news/:id
 * Busca uma notícia específica
 */
const buscarPorId = async (req, res) => {
    try {
        // Pegar o ID da URL
        const { id } = req.params;

        // Validar se o ID é um número
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido. Informe um número válido.'
            });
        }

        // Buscar a notícia no banco
        const noticia = await newsModel.findById(parseInt(id));

        // Verificar se encontrou
        if (!noticia) {
            return res.status(404).json({
                success: false,
                message: `Notícia com ID ${id} não encontrada`
            });
        }

        // Retornar a notícia
        return res.status(200).json({
            success: true,
            message: 'Notícia encontrada com sucesso',
            data: noticia
        });
    } catch (error) {
        console.error(`❌ Erro ao buscar notícia ${req.params.id}:`, error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao buscar notícia',
            error: error.message
        });
    }
};

// ============================================
// 3. CRIAR UMA NOTÍCIA
// ============================================

/**
 * POST /api/news
 * Cria uma nova notícia
 */
const criar = async (req, res) => {
    try {
        // Pegar os dados do corpo da requisição
        const { title, description, content, image_url, source, author, category } = req.body;

        // ========== VALIDAÇÕES ==========
        // Título é obrigatório
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Título é obrigatório'
            });
        }

        // Descrição é obrigatória
        if (!description || description.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Descrição é obrigatória'
            });
        }

        // Fonte é obrigatória (para saber de onde veio)
        if (!source || source.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Fonte é obrigatória'
            });
        }

        // ========== PREPARAR DADOS ==========
        const dadosNoticia = {
            title: title.trim(),
            description: description.trim(),
            content: content ? content.trim() : null,
            image_url: image_url ? image_url.trim() : null,
            source: source.trim(),
            author: author ? author.trim() : null,
            category: category ? category.trim() : null,
            api_source: 'manual' // Indica que foi criada manualmente
        };

        // ========== INSERIR NO BANCO ==========
        const novaNoticia = await newsModel.create(dadosNoticia);

        // ========== RETORNAR RESPOSTA ==========
        return res.status(201).json({
            success: true,
            message: 'Notícia criada com sucesso',
            data: novaNoticia
        });
    } catch (error) {
        console.error('❌ Erro ao criar notícia:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao criar notícia',
            error: error.message
        });
    }
};

// ============================================
// 4. ATUALIZAR UMA NOTÍCIA
// ============================================

/**
 * PUT /api/news/:id
 * Atualiza uma notícia existente
 */
const atualizar = async (req, res) => {
    try {
        // Pegar o ID da URL
        const { id } = req.params;

        // Pegar os dados do corpo da requisição
        const { title, description, content, image_url, source, author, category } = req.body;

        // ========== VALIDAR ID ==========
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido. Informe um número válido.'
            });
        }

        // ========== VALIDAR DADOS ==========
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Título é obrigatório'
            });
        }

        if (!description || description.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Descrição é obrigatória'
            });
        }

        // ========== VERIFICAR SE NOTÍCIA EXISTE ==========
        const noticiaExistente = await newsModel.findById(parseInt(id));
        if (!noticiaExistente) {
            return res.status(404).json({
                success: false,
                message: `Notícia com ID ${id} não encontrada`
            });
        }

        // ========== PREPARAR DADOS ==========
        const dadosAtualizados = {
            title: title.trim(),
            description: description.trim(),
            content: content ? content.trim() : null,
            image_url: image_url ? image_url.trim() : null,
            source: source ? source.trim() : noticiaExistente.source,
            author: author ? author.trim() : noticiaExistente.author,
            category: category ? category.trim() : noticiaExistente.category
        };

        // ========== ATUALIZAR NO BANCO ==========
        const noticiaAtualizada = await newsModel.update(parseInt(id), dadosAtualizados);

        // ========== RETORNAR RESPOSTA ==========
        return res.status(200).json({
            success: true,
            message: 'Notícia atualizada com sucesso',
            data: noticiaAtualizada
        });
    } catch (error) {
        console.error(`❌ Erro ao atualizar notícia ${req.params.id}:`, error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao atualizar notícia',
            error: error.message
        });
    }
};

// ============================================
// 5. DELETAR UMA NOTÍCIA
// ============================================

/**
 * DELETE /api/news/:id
 * Deleta uma notícia
 */
const deletar = async (req, res) => {
    try {
        // Pegar o ID da URL
        const { id } = req.params;

        // ========== VALIDAR ID ==========
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido. Informe um número válido.'
            });
        }

        // ========== VERIFICAR SE NOTÍCIA EXISTE ==========
        const noticiaExistente = await newsModel.findById(parseInt(id));
        if (!noticiaExistente) {
            return res.status(404).json({
                success: false,
                message: `Notícia com ID ${id} não encontrada`
            });
        }

        // ========== DELETAR DO BANCO ==========
        const noticiaDeletada = await newsModel.remove(parseInt(id));

        // ========== RETORNAR RESPOSTA ==========
        return res.status(200).json({
            success: true,
            message: 'Notícia deletada com sucesso',
            data: noticiaDeletada
        });
    } catch (error) {
        console.error(`❌ Erro ao deletar notícia ${req.params.id}:`, error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao deletar notícia',
            error: error.message
        });
    }
};

// ============================================
// 6. BUSCAR POR CATEGORIA
// ============================================

/**
 * GET /api/news/category/:categoria
 * Busca notícias por categoria
 */
const buscarPorCategoria = async (req, res) => {
    try {
        // Pegar a categoria da URL
        const { categoria } = req.params;

        // ========== VALIDAR CATEGORIA ==========
        if (!categoria || categoria.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Categoria é obrigatória'
            });
        }

        // ========== BUSCAR NO BANCO ==========
        const noticias = await newsModel.findByCategory(categoria.trim());

        // ========== RETORNAR RESPOSTA ==========
        if (noticias.length === 0) {
            return res.status(200).json({
                success: true,
                message: `Nenhuma notícia encontrada na categoria "${categoria}"`,
                data: [],
                total: 0
            });
        }

        return res.status(200).json({
            success: true,
            message: `Notícias da categoria "${categoria}" encontradas`,
            data: noticias,
            total: noticias.length
        });
    } catch (error) {
        console.error(`❌ Erro ao buscar notícias da categoria ${req.params.categoria}:`, error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro interno ao buscar notícias por categoria',
            error: error.message
        });
    }
};

// ============================================
// EXPORTAR AS FUNÇÕES
// ============================================

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar,
    buscarPorCategoria
};