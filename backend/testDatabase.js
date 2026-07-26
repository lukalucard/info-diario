// ============================================
// TESTE DE CONEXÃO COM O BANCO
// ============================================

// Importar as funções do database.js
const { testConnection, query } = require('./src/config/database');

// ============================================
// FUNÇÃO PRINCIPAL DE TESTE
// ============================================

async function runTest() {
    console.log('=================================');
    console.log('🧪 TESTANDO CONEXÃO COM O BANCO');
    console.log('=================================');

    // 1. Testar a conexão
    console.log('📡 Conectando ao Neon...');
    const connected = await testConnection();

    if (!connected) {
        console.log('❌ Falha na conexão. Verifique sua DATABASE_URL no .env');
        process.exit(1); // Para o programa aqui
    }

    // 2. Testar uma consulta simples
    console.log('📝 Executando consulta de teste...');

    try {
        const result = await query('SELECT 1 as teste, NOW() as hora_atual');
        
        console.log('✅ Consulta bem-sucedida!');
        console.log(`   Resultado: ${result.rows[0].teste}`);
        console.log(`   Hora do banco: ${result.rows[0].hora_atual}`);
        
    } catch (error) {
        console.error('❌ Erro na consulta:', error.message);
        process.exit(1);
    }

    console.log('=================================');
    console.log('✅ Teste concluído com sucesso!');
    console.log('🎉 Banco de dados está pronto para uso!');
    console.log('=================================');
}

// ============================================
// EXECUTAR O TESTE
// ============================================

runTest();