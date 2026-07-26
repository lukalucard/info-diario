// ============================================
// INFO DIÁRIO - JavaScript do Blog
// Responsabilidade: Buscar e exibir notícias
// ============================================

// ============================================
// 1. CONFIGURAÇÕES
// ============================================

// URL da API que criamos no backend
const API_URL = 'https://info-diario.onrender.com/api/news';

// Referência para a div onde as notícias vão aparecer
const container = document.getElementById('noticias');

// ============================================
// 2. FUNÇÃO PARA CARREGAR NOTÍCIAS
// ============================================

async function carregarNoticias() {
    try {
        // Mostra mensagem de carregamento
        container.innerHTML = '🔄 Carregando notícias...';

        // Faz a requisição para a API
        const resposta = await fetch(API_URL);

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Verifica se deu certo
        if (dados.success && dados.data.length > 0) {
            // Se tem notícias, exibe elas
            exibirNoticias(dados.data);
        } else {
            // Se não tem notícias
            container.innerHTML = '📭 Nenhuma notícia encontrada.';
        }

    } catch (erro) {
        // Se deu erro na requisição
        console.error('❌ Erro ao carregar notícias:', erro);
        container.innerHTML = '⚠️ Erro ao carregar notícias. Tente novamente.';
    }
}

// ============================================
// 3. FUNÇÃO PARA EXIBIR NOTÍCIAS
// ============================================

function exibirNoticias(noticias) {
    // Limpa o container
    container.innerHTML = '';

    // Percorre cada notícia
    noticias.forEach(noticia => {
        // Cria um elemento <div> para cada notícia
        const card = document.createElement('div');
        card.className = 'card-noticia';

        // Formata a data
        const data = new Date(noticia.published_at);
        const dataFormatada = data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Monta o HTML da notícia
        card.innerHTML = `
            <h2>${noticia.title}</h2>
            <div class="meta">
                <span>📰 ${noticia.source || 'Info Diário'}</span>
                <span>🕐 ${dataFormatada}</span>
                ${noticia.category ? `<span class="categoria">${noticia.category}</span>` : ''}
            </div>
            ${noticia.description ? `<p>${noticia.description}</p>` : ''}
        `;

        // Adiciona o card no container
        container.appendChild(card);
    });
}

// ============================================
// 4. EXECUTAR QUANDO A PÁGINA CARREGAR
// ============================================

// Quando a página terminar de carregar, busca as notícias
document.addEventListener('DOMContentLoaded', carregarNoticias);