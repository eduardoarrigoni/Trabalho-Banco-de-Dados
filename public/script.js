document.getElementById("loginForm").onsubmit = async function(e) {
    e.preventDefault();

    const email = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email: email, password })
    });

    const data = await res.json();
    const msg = document.getElementById("message");

    if (res.ok && data.idAdministrador > 0) {
        msg.style.color = "green";
        msg.textContent = "Bem Vindo, minha lenda";
        // Redirecionar
        window.location.href = "paineladm.html";
    }else{
        if (res.ok) {
            msg.style.color = "green";
            msg.textContent = "Login realizado com sucesso!";
            // Redirecionar
            window.location.href = "venda.html";
        } else {
            msg.style.color = "#d60000";
            msg.textContent = data.message || "Erro no login.";
        }
    }

};

document.getElementById("registerForm").onsubmit = async function(e) {
    e.preventDefault();

    const nome = document.getElementById("register-nome").value;
    const cpf = document.getElementById("register-cpf").value;
    const password = document.getElementById("register-password").value;
    const dataNascimento = document.getElementById("register-nascimento").value;
    const email = document.getElementById("register-email").value;
    const celular = document.getElementById("register-celular").value;
    const estado = document.getElementById("register-estado").value;
    const cidade = document.getElementById("register-cidade").value;
    const rua = document.getElementById("register-rua").value;
    const numero = document.getElementById("register-numero").value;
    const complemento = document.getElementById("register-complemento").value;
    const endereco = {
        estado: estado,
        cidade: cidade,
        rua: rua,
        numero: numero,
        complemento: complemento
    }
    const res = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nome, cpf, password, dataNascimento, email, celular, endereco})
    });

    const data = await res.json();
    const msg = document.getElementById("message");

    if (res.ok) {
        msg.style.color = "green";
        msg.textContent = "Usuário cadastrado com sucesso!";
    } else {
        msg.style.color = "#d60000";
        msg.textContent = data.message || "Erro no cadastro.";
    }
};