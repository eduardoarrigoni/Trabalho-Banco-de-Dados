// venda.js
// Fluxo:
// 1) Login: POST /login (mesmo endpoint que seu sistema já usa).
//    Espera-se que o backend retorne { token?, user? } ou pelo menos res.ok.
// 2) Se login ok, GET /produtos para listar produtos.
// 3) Selecionar produtos -> atualiza carrinho local e total.
// 4) Finalizar -> POST /venda com payload { items: [{ id, quantidade }], total }.
//    Se tiver token, envia Authorization: Bearer <token>.

// ---------- Helpers ----------
const qs = (s) => document.querySelector(s);
const money = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// ---------- Estado ----------
let token = null;
let currentUser = null;
const products = []; // carregados do backend
const cart = new Map(); // key: productId, value: { product, quantidade }

// ---------- Elements ----------
const loginSection = qs('#login-section');
const salesSection = qs('#sales-section');
const loginForm = qs('#saleLoginForm');
const loginMessage = qs('#login-message');
const userInfo = qs('#user-info');
const logoutBtn = qs('#logout-btn');

const productsContainer = qs('#products');
const cartItemsEl = qs('#cart-items');
const totalValueEl = qs('#total-value');
const finalizeBtn = qs('#finalize-btn');
const saleMessage = qs('#sale-message');

// ---------- Login ----------
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMessage.textContent = '';
    const email = qs('#sale-username').value.trim();
    const password = qs('#sale-password').value;

    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        const idCliente = data.idCliente; 
        window.idClienteVenda = idCliente;

        if (!res.ok) {
            loginMessage.textContent = data.message || 'Erro no login.';
            loginMessage.className = 'message error';
            return;
        }


        loginMessage.textContent = 'Login realizado com sucesso!';
        loginMessage.className = 'message success';

        // mostrar tela de vendas
        showSalesSection();
        await loadProducts();
    } catch (err) {
        console.error('Erro de rede no login:', err);
        loginMessage.textContent = 'Erro de conexão com o servidor.';
        loginMessage.className = 'message error';
    }
});

logoutBtn.addEventListener('click', () => {
    token = null;
    currentUser = null;
    cart.clear();
    products.length = 0;
    productsContainer.innerHTML = '';
    updateCartUI();
    salesSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// ---------- UI / Produtos ----------
function showSalesSection(){
    loginSection.classList.add('hidden');
    salesSection.classList.remove('hidden');
    userInfo.textContent = `Usuário logado`;
}

async function loadProducts(){
    
    productsContainer.innerHTML = 'Carregando produtos...';
    try {
        const res = await fetch('http://localhost:3000/produtos');
        if (!res.ok) {
            const err = await res.json();
            productsContainer.innerHTML = `Erro carregando produtos: ${err.message || res.statusText}`;
            return;
        }
        const data = await res.json();
        // espera array de produtos [{ id, nome, preco, estoque, descricao }]
        products.length = 0;
        Array.prototype.push.apply(products, data);
        renderProducts();
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        productsContainer.innerHTML = 'Erro de conexão ao carregar produtos.';
    }
}

function renderProducts(){
    productsContainer.innerHTML = '';
    if (!products.length) {
        productsContainer.innerHTML = '<p>Nenhum produto disponível.</p>';
        return;
    }

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h4>${escapeHtml(p.nome)}</h4>
            <div class="product-meta">${escapeHtml(p.descricao || '')}</div>
            <div class="product-meta">Preço: <strong>${money(Number(p.precounitario||0))}</strong></div>
            <div class="product-meta">Estoque: ${p.quantidadeatual ?? '—'}</div>
            <div class="product-actions">
                <input type="number" class="qty-input" min="1" value="1" />
                <button class="add-btn">Adicionar</button>
            </div>
        `;
        const qtyInput = card.querySelector('.qty-input');
        const addBtn = card.querySelector('.add-btn');

        addBtn.addEventListener('click', () => {
            const qtd = Math.max(1, Number(qtyInput.value) || 1);
            addToCart(p, qtd);
        });

        productsContainer.appendChild(card);
    });
}

// ---------- Carrinho ----------
function addToCart(product, quantidade = 1){
    const key = String(product.idproduto);
    if (cart.has(key)) {
        const item = cart.get(key);
        item.quantidade += quantidade;
    } else {
        cart.set(key, { idProduto: key, product, quantidade });
    }
    updateCartUI();
}

function removeFromCart(productId){
    cart.delete(String(productId));
    updateCartUI();
}

function updateCartUI(){
    cartItemsEl.innerHTML = '';
    let total = 0;
    if (cart.size === 0) {
        cartItemsEl.innerHTML = '<li><em>Carrinho vazio</em></li>';
    } else {
        for (const [id, { product, quantidade }] of cart.entries()) {
            const li = document.createElement('li');
            const subtotal = Number(product.precounitario || 0) * quantidade;
            li.innerHTML = `
                <span>${escapeHtml(product.nome)} x ${quantidade}</span>
                <span>
                    ${money(subtotal)}
                    <button class="small remove-btn" data-id="${escapeHtml(id)}">Remover</button>
                </span>
            `;
            cartItemsEl.appendChild(li);
            total += subtotal;
        }
    }
    totalValueEl.textContent = money(total);
    finalizeBtn.disabled = cart.size === 0;
    saleMessage.textContent = '';
}

// Delegation para remover item
cartItemsEl.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.remove-btn');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    removeFromCart(id);
});

// ---------- Finalizar venda ----------
finalizeBtn.addEventListener('click', async () => {
    saleMessage.textContent = '';
    if (cart.size === 0) return;

    const items = [];
    let total = 0;
    for (const [id, { product, quantidade }] of cart.entries()) {
        items.push({ id: product.idproduto, quantidade });
        total += Number(product.precounitario || 0) * quantidade;
    }

    try {
        const idCliente = window.idClienteVenda;
        const res = await fetch('http://localhost:3000/venda', {
            method: 'POST',
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, token ? { 'Authorization': 'Bearer ' + token } : {}),
            body: JSON.stringify({ items, total, idCliente })
        });

        const data = await res.json().catch(()=>({}));

        if (!res.ok) {
            saleMessage.textContent = data.message || 'Erro ao finalizar venda.';
            saleMessage.className = 'message error';
            return;
        }

        saleMessage.textContent = data.message || 'Venda concluída com sucesso!';
        saleMessage.className = 'message success';
        // limpa carrinho
        cart.clear();
        updateCartUI();
    } catch (err) {
        console.error('Erro ao finalizar venda:', err);
        saleMessage.textContent = 'Erro de conexão ao finalizar venda.';
        saleMessage.className = 'message error';
    }
});

// ---------- Util ----------
function escapeHtml(text) {
    if (!text && text !== 0) return '';
    return String(text).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}