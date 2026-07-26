const { syncNews } = require('./src/services/syncNewsService');

async function testSync() {
    console.log('=================================');
    console.log('🧪 TESTANDO SINCRONIZAÇÃO');
    console.log('=================================');

    const resultado = await syncNews();

    console.log('=================================');
    console.log('📊 Resultado:');
    console.log(`   Sucesso: ${resultado.success}`);
    console.log(`   Mensagem: ${resultado.message}`);
    console.log(`   Salvas: ${resultado.saved}`);
    console.log('=================================');
}

testSync();