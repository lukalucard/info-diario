// ============================================
// MODEL DE NOTÍCIAS
// Responsabilidade: Operações no banco de dados
// ============================================

// Importar a função query do database.js
const { query } = require('../config/database');

// ============================================
// 1. BUSCAR TODAS AS NOTÍCIAS
// ============================================

const findAll = async () => {
    try {
        // Buscar todas as notícias, ordenadas pelas mais recentes
        const result = await query(
            `SELECT * FROM news 
             ORDER BY published_at DESC 
             LIMIT 100`
        );
        return result.rows;
    } catch (error) {
        console.error('❌ Erro ao buscar notícias:', error.message);
        throw error;
    }
};

// ============================================
// 2. BUSCAR NOTÍCIA POR ID
// ============================================

const findById = async (id) => {
    try {
        const result = await query(
            `SELECT * FROM news WHERE id = $1`,
            [id]
        );
        return result.rows[0] || null; // Retorna null se não encontrar
    } catch (error) {
        console.error(`❌ Erro ao buscar notícia ${id}:`, error.message);
        throw error;
    }
};

// ============================================
// 3. CRIAR UMA NOTÍCIA
// ============================================

const create = async (data) => {
    try {
        const { title, description, content, image_url, source, author, category, api_source } = data;

        const result = await query(
            `INSERT INTO news 
             (title, description, content, image_url, source, author, category, api_source) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
            [title, description, content, image_url, source, author, category, api_source]
        );
        return result.rows[0];
    } catch (error) {
        console.error('❌ Erro ao criar notícia:', error.message);
        throw error;
    }
};

// ============================================
// 4. ATUALIZAR UMA NOTÍCIA
// ============================================

const update = async (id, data) => {
    try {
        const { title, description, content, image_url, source, author, category } = data;

        const result = await query(
            `UPDATE news 
             SET title = $1, 
                 description = $2, 
                 content = $3, 
                 image_url = $4, 
                 source = $5, 
                 author = $6, 
                 category = $7,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $8 
             RETURNING *`,
            [title, description, content, image_url, source, author, category, id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Erro ao atualizar notícia ${id}:`, error.message);
        throw error;
    }
};

// ============================================
// 5. DELETAR UMA NOTÍCIA
// ============================================

const remove = async (id) => {
    try {
        const result = await query(
            `DELETE FROM news WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error(`❌ Erro ao deletar notícia ${id}:`, error.message);
        throw error;
    }
};

// ============================================
// 6. BUSCAR POR CATEGORIA
// ============================================

const findByCategory = async (category) => {
    try {
        const result = await query(
            `SELECT * FROM news 
             WHERE category = $1 
             ORDER BY published_at DESC 
             LIMIT 50`,
            [category]
        );
        return result.rows;
    } catch (error) {
        console.error(`❌ Erro ao buscar notícias da categoria ${category}:`, error.message);
        throw error;
    }
};

// ============================================
// EXPORTAR AS FUNÇÕES
// ============================================

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findByCategory
};