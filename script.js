// SIMULAÇÃO DE LOGIN (pode integrar com o BD depois)
const clientes = [
    { cpf: "111.111.111-11", senha: "123" },
    { cpf: "222.222.222-22", senha: "456" },
    { cpf: "333.333.333-33", senha: "789" }
];

// PRODUTOS DO BANCO COM IMAGENS
const produtos = [
    { id: 1, nome: "Arroz 5kg", preco: 22.90, img: "https://i.imgur.com/qQ0p9fE.jpg" },
    { id: 2, nome: "Feijão 1kg", preco: 8.50, img: "https://i.imgur.com/DqBbiq4.jpg" },
    { id: 3, nome: "Açúcar 2kg", preco: 6.20, img: "https://i.imgur.com/6roFkAG.jpg" },
    { id: 4, nome: "Leite 1L", preco: 4.99, img: "https://i.imgur.com/VS3pQd8.jpg" },
    { id: 5, nome: "Café 500g", preco: 12.00, img: "https://i.imgur.com/xn5uZ6T.jpg" },
];

let total = 0;

// -------- LOGIN --------
function login() {
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    const cliente = clientes.find(c => c.cpf === cpf && c.senha === senha);

    if (!cliente) {
        alert("CPF ou senha incorretos!");
        return;
    }

    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("venda-container").classList.remove("hidden");

    carregarProdutos();
}

// -------- CARREGA PRODUTOS NA TELA --------
function carregarProdutos() {
    const lista = document.getElementById("produtos-list");
    lista.innerHTML = "";

    produtos.forEach(p => {
        lista.innerHTML += `
            <div class="produto-card">
                <img src="${p.img}" alt="${p.nome}">
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco.toFixed(2)}</p>
                <button onclick="addProduto(${p.preco})">Adicionar</button>
            </div>
        `;
    });
}

// -------- ADICIONAR PRODUTO AO TOTAL --------
function addProduto(valor) {
    total += valor;
    document.getElementById("total").innerText = total.toFixed(2);
}

// -------- FINALIZAR VENDA --------
function finalizarCompra() {
    if (total === 0) {
        alert("Nenhum produto selecionado!");
        return;
    }

    alert("Compra finalizada! Total: R$ " + total.toFixed(2));
    total = 0;
    document.getElementById("total").innerText = "0.00";
}
