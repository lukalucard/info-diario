// ============================================
// ROUTES DE NOTÍCIAS
// Responsabilidade: Definir os endpoints da API
// ============================================

// Importar o Router do Express
const router = require('express').Router();

// Importar o Controller (as funções que processam as requisições)
const newsController = require('../controllers/newsController');

// ============================================
// DEFINIÇÃO DAS ROTAS
// ============================================

// 1. Rota para listar todas as notícias
// GET /api/news
router.get('/', newsController.listar);

// 2. Rota para buscar uma notícia por ID
// GET /api/news/:id
router.get('/:id', newsController.buscarPorId);

// 3. Rota para criar uma notícia
// POST /api/news
router.post('/', newsController.criar);

// 4. Rota para atualizar uma notícia
// PUT /api/news/:id
router.put('/:id', newsController.atualizar);

// 5. Rota para deletar uma notícia
// DELETE /api/news/:id
router.delete('/:id', newsController.deletar);

// 6. Rota para buscar notícias por categoria
// GET /api/news/category/:categoria
router.get('/category/:categoria', newsController.buscarPorCategoria);

// ============================================
// EXPORTAR AS ROTAS
// ============================================

module.exports = router;