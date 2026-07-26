// ============================================
// 1. IMPORTAR AS DEPENDÊNCIAS
// ============================================

// Pool = gerenciador de conexões do PostgreSQL
const { Pool } = require('pg');

// dotenv = carrega as variáveis do arquivo .env
const dotenv = require('dotenv');

// Carregar as variáveis do .env
dotenv.config();

// ============================================
// 2. CRIAR O POOL DE CONEXÕES
// ============================================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Neon exige SSL
    }
});

// ============================================
// 3. FUNÇÃO PARA TESTAR A CONEXÃO
// ============================================

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Conectado ao PostgreSQL com sucesso!');
        client.release();
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco:', error.message);
        return false;
    }
};

// ============================================
// 4. FUNÇÃO PARA EXECUTAR CONSULTAS
// ============================================

const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error('❌ Erro na query:', error.message);
        throw error;
    }
};

// ============================================
// 5. EXPORTAR AS FUNÇÕES
// ============================================

module.exports = {
    pool,
    query,
    testConnection
};