document.addEventListener('DOMContentLoaded', () => {
    const apiResultElement = document.getElementById('api-result');
    const apiMessageElement = document.getElementById('api-message');
    const logoutBtn = document.getElementById('logout-btn');

    // Função genérica para chamar a API
    async function callApi(endpoint) {
        apiResultElement.textContent = 'Carregando...';
        apiMessageElement.textContent = '';
        apiMessageElement.className = 'message';

        try {
            const options = {
                method: 'GET', // Método fixo como GET para todas as consultas
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const url = `http://localhost:3000${endpoint}`;
            const res = await fetch(url, options);
            const data = await res.json().catch(() => ({ message: res.statusText }));

            apiResultElement.textContent = JSON.stringify(data, null, 2); 

            if (res.ok) {
                apiMessageElement.textContent = `Sucesso na consulta para ${endpoint} (${res.status} ${res.statusText}).`;
                apiMessageElement.classList.add('success');
            } else {
                apiMessageElement.textContent = data.message || `ERRO na consulta para ${endpoint} (${res.status} ${res.statusText}).`;
                apiMessageElement.classList.add('error');
            }

        } catch (error) {
            apiResultElement.textContent = 'Nenhuma resposta do servidor.';
            apiMessageElement.textContent = `Erro de Conexão: Não foi possível alcançar http://localhost:3000. Verifique se a API está rodando.`;
            apiMessageElement.classList.add('error');
            console.error('Erro de Conexão:', error);
        }
    }

    // --- Ações dos Botões de Consulta ---

    // Ação 1: Histórico de Acessos (Exige ID do Cliente)
    document.getElementById('btn-acao-1').addEventListener('click', () => {
        
        callApi(`/clientes/acessos`);
    });

    // Ação 2: Produtos com Estoque Baixo (Parâmetro opcional de Limite)
    document.getElementById('btn-acao-2').addEventListener('click', () => {
        const limite = document.getElementById('input-acao-2').value;
        let endpoint = '/produtos/estoque-baixo';
        
        // Se o limite for fornecido, adiciona como query parameter
        if (limite && parseInt(limite) > 0) {
            endpoint += `?limite=${limite}`;
        }
        // Endpoint: /produtos/estoque-baixo ou /produtos/estoque-baixo?limite=10
        callApi(endpoint);
    });

    // Ação 3: Total de Vendas por Cliente (Exige ID do Cliente)
    document.getElementById('btn-acao-3').addEventListener('click', () => {
        const idCliente = document.getElementById('input-acao-3').value;
        if (!idCliente) {
            alert("Por favor, insira o ID do Cliente.");
            return;
        }
        // Endpoint: /clientes/123/vendas/total
        callApi(`/clientes/${idCliente}/vendas/total`);
    });

    // Ação do Botão Sair
    logoutBtn.addEventListener('click', () => {
        window.location.href = "index.html"; 
    });
});