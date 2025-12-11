document.addEventListener('DOMContentLoaded', () => {
    // Referências atualizadas
    const apiResultContainer = document.getElementById('api-result-container');
    const apiResultPlaceholder = document.getElementById('api-result-placeholder');
    const apiMessageElement = document.getElementById('api-message');
    const logoutBtn = document.getElementById('logout-btn');

    // Função para criar a tabela HTML a partir dos dados JSON
    function displayDataAsTable(data) {
        if (!data || Object.keys(data).length === 0) {
            return "<p>A consulta retornou dados vazios.</p>";
        }

        // Se o dado for um array de objetos (ex: Lista de Acessos)
        if (Array.isArray(data) && data.length > 0) {
            const columns = Object.keys(data[0]); // Pega as chaves do primeiro objeto para cabeçalhos

            let tableHTML = '<table><thead><tr>';
            columns.forEach(col => {
                tableHTML += `<th>${col.toUpperCase().replace(/_/g, ' ')}</th>`; // Formatação simples do cabeçalho
            });
            tableHTML += '</tr></thead><tbody>';

            data.forEach(item => {
                tableHTML += '<tr>';
                columns.forEach(col => {
                    // Trata valores complexos (objetos/arrays dentro da célula)
                    let cellValue = item[col];
                    if (typeof cellValue === 'object' && cellValue !== null) {
                        cellValue = JSON.stringify(cellValue); // Exibe como JSON stringificado
                    }
                    tableHTML += `<td>${cellValue}</td>`;
                });
                tableHTML += '</tr>';
            });
            tableHTML += '</tbody></table>';
            return tableHTML;
        } 
        
        // Se o dado for um único objeto (ex: Total de Vendas)
        else if (typeof data === 'object' && data !== null) {
            let tableHTML = '<table><thead><tr><th>Campo</th><th>Valor</th></tr></thead><tbody>';
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    let value = data[key];
                    if (typeof value === 'object' && value !== null) {
                        value = JSON.stringify(value); 
                    }
                    tableHTML += `<tr><td>${key.toUpperCase().replace(/_/g, ' ')}</td><td>${value}</td></tr>`;
                }
            }
            tableHTML += '</tbody></table>';
            return tableHTML;
        }

        // Caso o dado seja uma string ou número simples (não estruturado)
        return `<p>${data}</p>`;
    }
    
    // Aplicação dos estilos de tabela dinamicamente (para evitar mudar o CSS original)
    function applyTableStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #api-result-container table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
                font-size: 0.9em;
            }
            #api-result-container th, #api-result-container td {
                border: 1px solid #ddd;
                padding: 10px 8px;
                text-align: left;
            }
            #api-result-container th {
                background-color: #f4f4f4;
                color: var(--text-color);
            }
            #api-result-container tr:nth-child(even) {
                background-color: #f9f9f9;
            }
        `;
        document.head.appendChild(style);
    }
    applyTableStyles();


    // Função genérica para chamar a API (APENAS ESTA PARTE MUDA)
    async function callApi(endpoint) {
        apiResultContainer.innerHTML = 'Carregando...'; // Limpa e mostra carregando
        apiMessageElement.textContent = '';
        apiMessageElement.className = 'message';

        try {
            const options = {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
            };

            const url = `http://localhost:3000${endpoint}`;
            const res = await fetch(url, options);
            
            // Tenta obter os dados como JSON
            const data = await res.json();

            if (res.ok) {
                // EXIBE OS DADOS EM TABELA
                apiResultContainer.innerHTML = displayDataAsTable(data);
                
                apiMessageElement.textContent = `Sucesso na consulta`;
                apiMessageElement.classList.add('success');
            } else {
                // Em caso de erro, exibe a mensagem (seja no formato tabela simples ou em texto)
                apiResultContainer.innerHTML = displayDataAsTable(data);
                apiMessageElement.textContent = data.message || `ERRO na consulta para ${endpoint} (${res.status} ${res.statusText}).`;
                apiMessageElement.classList.add('error');
            }

        } catch (error) {
            apiResultContainer.innerHTML = `<p>Nenhuma resposta do servidor.</p>`;
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
        
        callApi("/produtos/estoque-baixo");
    });

    // Ação 3: Total de Vendas por Cliente
    document.getElementById('btn-acao-3').addEventListener('click', () => {
        
        callApi(`/clientes/vendas/total`);
    });

    // Ação do Botão Sair
    logoutBtn.addEventListener('click', () => {
        window.location.href = "index.html"; 
    });
});