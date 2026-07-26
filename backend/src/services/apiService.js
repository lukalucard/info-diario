// ============================================
// SERVIÇO DE INTEGRAÇÃO COM API EXTERNA
// Responsabilidade: Buscar notícias da Currents API
// ============================================

// Importar o axios para fazer requisições HTTP
const axios = require('axios');

// Importar o dotenv para ler variáveis de ambiente
const dotenv = require('dotenv');
dotenv.config();

// ============================================
// 1. FUNÇÃO PARA BUSCAR NOTÍCIAS
// ============================================

const fetchNews = async () => {
    try {
        const apiKey = process.env.API_NEWS_KEY;
        const apiUrl = process.env.API_NEWS_URL;

        if (!apiKey) {
            throw new Error('API_NEWS_KEY não encontrada no arquivo .env');
        }

        if (!apiUrl) {
            throw new Error('API_NEWS_URL não encontrada no arquivo .env');
        }

        console.log('📡 Buscando notícias da Currents API...');
        console.log('🔑 Chave:', apiKey.substring(0, 10) + '...');

        // 🔥 FORMA CORRETA: Chave vai no PARÂMETRO "apiKey" 
        // OU no header "Authorization: Bearer"
        // Vamos testar ambas
        
        const response = await axios.get(apiUrl, {
            params: {
                apiKey: apiKey,        // ← NOME CORRETO: apiKey
                language: 'pt',
                country: 'br'
            },
            timeout: 10000
        });

        console.log(`✅ Status: ${response.status}`);

        let newsData = [];

        if (response.data && response.data.news) {
            newsData = response.data.news;
            console.log(`✅ ${newsData.length} notícias encontradas`);
            return newsData;
        } else {
            console.log('⚠️ Nenhuma notícia encontrada');
            console.log('📝 Resposta:', JSON.stringify(response.data).substring(0, 200));
            return [];
        }

    } catch (error) {
        console.error('❌ Erro ao buscar notícias da API:', error.message);
        
        if (error.response) {
            console.error(`📡 Status: ${error.response.status}`);
            console.error(`📝 Dados do erro:`, JSON.stringify(error.response.data, null, 2));
        }
        
        if (error.code === 'ECONNABORTED') {
            console.error('⏱️ Timeout na requisição');
        }

        throw error;
    }
};

// ============================================
// 2. FUNÇÃO PARA FORMATAR OS DADOS
// ============================================

const formatNewsData = (apiNews) => {
    // Mapear os dados da API para o formato do nosso banco
    return apiNews.map(item => ({
        title: item.title || 'Sem título',
        description: item.description || '',
        content: item.content || item.description || '',
        image_url: item.image || item.urlToImage || null,
        source: item.source || item.source_name || 'Fonte desconhecida',
        author: item.author || null,
        category: item.category || null,
        api_source: 'currents'
    }));
};

// ============================================
// 3. FUNÇÃO PARA BUSCAR E FORMATAR
// ============================================

const fetchAndFormatNews = async () => {
    try {
        // Buscar notícias da API
        const rawNews = await fetchNews();
        
        // Se não tiver notícias, retorna array vazio
        if (!rawNews || rawNews.length === 0) {
            return [];
        }
        
        // Formatar os dados
        const formattedNews = formatNewsData(rawNews);
        
        console.log(`📝 ${formattedNews.length} notícias formatadas para salvar`);
        return formattedNews;
        
    } catch (error) {
        console.error('❌ Erro ao buscar e formatar notícias:', error.message);
        throw error;
    }
};

// ============================================
// EXPORTAR AS FUNÇÕES
// ============================================

module.exports = {
    fetchNews,
    formatNewsData,
    fetchAndFormatNews
};