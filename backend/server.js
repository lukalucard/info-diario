// ============================================
// 1. IMPORTAÇÃO DAS DEPENDÊNCIAS
// ============================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// ============================================
// 2. CARREGAR VARIÁVEIS DE AMBIENTE
// ============================================

dotenv.config();

// ============================================
// 3. CRIAR INSTÂNCIA DO EXPRESS
// ============================================

const app = express();
const PORT = process.env.PORT || 3006; // Usando a porta 3006

// ============================================
// 4. MIDDLEWARES
// ============================================

// CORS - Permite requisições de outros domínios
app.use(cors());

// JSON - Parseia o corpo das requisições em JSON
app.use(express.json());

// URL-encoded - Parseia dados de formulário
app.use(express.urlencoded({ extended: true }));

// ============================================
// 5. ROTAS
// ============================================

// 🟢 NOVO: Importar as rotas de notícias
const newsRoutes = require('./src/routes/newsRoutes');

// 🟢 NOVO: Usar as rotas com o prefixo /api/news
app.use('/api/news', newsRoutes);

// ============================================
// 6. ROTA PRINCIPAL (teste)
// ============================================

app.get('/', (req, res) => {
    res.json({
        message: '🚀 API Info Diário está funcionando!',
        status: 'online',
        timestamp: new Date().toISOString(),
        endpoints: {
            news: '/api/news',
            health: '/health'
        }
    });
});

// ============================================
// 7. HEALTH CHECK (para monitoramento)
// ============================================

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ============================================
// 8. INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`📰 Info Diário`);
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`📰 API: http://localhost:${PORT}/api/news`);
    console.log(`=================================`);
});

// ============================================
// 9. TRATAMENTO DE ERROS (segurança)
// ============================================

process.on('uncaughtException', (error) => {
    console.error('❌ Erro não tratado:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Promessa rejeitada sem tratamento:', error);
});