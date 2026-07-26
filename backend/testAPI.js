// ============================================
// TESTE DE INTEGRAÇÃO COM CURRENTS API
// ============================================

// Importar o serviço da API
const { fetchAndFormatNews } = require('./src/services/apiService');

// ============================================
// FUNÇÃO PRINCIPAL DE TESTE
// ============================================

async function testAPI() {
    console.log('=================================');
    console.log('🧪 TESTANDO CURRENTS API');
    console.log('=================================');

    try {
        // 1. Buscar e formatar notícias
        console.log('📡 Buscando notícias da Currents API...');
        const noticias = await fetchAndFormatNews();

        // 2. Verificar se encontrou notícias
        if (noticias.length === 0) {
            console.log('⚠️ Nenhuma notícia encontrada');
            console.log('=================================');
            return;
        }

        // 3. Mostrar quantas notícias foram encontradas
        console.log(`✅ ${noticias.length} notícias encontradas!`);
        console.log('');

        // 4. Mostrar as 5 primeiras notícias
        console.log('📰 PRIMEIRAS 5 NOTÍCIAS:');
        console.log('---------------------------------');
        
        noticias.slice(0, 5).forEach((noticia, index) => {
            console.log(`${index + 1}. Título: ${noticia.title}`);
            console.log(`   Fonte: ${noticia.source}`);
            console.log(`   Categoria: ${noticia.category || 'Sem categoria'}`);
            console.log(`   Descrição: ${noticia.description.substring(0, 100)}...`);
            console.log('---------------------------------');
        });

        console.log('=================================');
        console.log('✅ Teste concluído com sucesso!');
        console.log(`📊 Total de notícias: ${noticias.length}`);
        console.log('=================================');

    } catch (error) {
        console.error('❌ Erro ao testar API:', error.message);
        
        // Mensagens específicas para cada tipo de erro
        if (error.response) {
            console.error(`📡 Status da API: ${error.response.status}`);
            console.error(`📝 Mensagem: ${error.response.data.message || 'Erro desconhecido'}`);
        }
        
        if (error.code === 'ECONNABORTED') {
            console.error('⏱️ Timeout: A API demorou muito para responder');
        }
        
        console.log('=================================');
        console.log('❌ Teste falhou!');
        console.log('=================================');
    }
}

// ============================================
// EXECUTAR O TESTE
// ============================================

testAPI();