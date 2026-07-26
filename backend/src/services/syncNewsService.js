// ============================================
// SERVIÇO DE SINCRONIZAÇÃO DE NOTÍCIAS
// Responsabilidade: Buscar da API e salvar no banco
// ============================================

const { fetchAndFormatNews } = require('./apiService');
const newsModel = require('../models/newsModel');

const syncNews = async () => {
    try {
        console.log('🔄 Iniciando sincronização de notícias...');

        // 1. Buscar notícias da API
        const noticias = await fetchAndFormatNews();

        if (!noticias || noticias.length === 0) {
            console.log('⚠️ Nenhuma notícia para sincronizar');
            return { success: true, message: 'Nenhuma notícia encontrada', saved: 0 };
        }

        // 2. Salvar cada notícia no banco
        let savedCount = 0;

        for (const noticia of noticias) {
            // Verificar se já existe pelo título (evitar duplicatas)
            const existentes = await newsModel.findAll();
            const existe = existentes.some(n => n.title === noticia.title);

            if (!existe) {
                await newsModel.create(noticia);
                savedCount++;
            }
        }

        console.log(`✅ ${savedCount} novas notícias salvas no banco`);
        return { success: true, message: 'Sincronização concluída', saved: savedCount };

    } catch (error) {
        console.error('❌ Erro ao sincronizar notícias:', error.message);
        return { success: false, message: error.message, saved: 0 };
    }
};

module.exports = { syncNews };