# Visualização Web do Banco SQL

🚀 Guia de Início Rápido: Rodando o Projeto Localmente
Este guia passo a passo ajudará você a configurar e iniciar o projeto em sua máquina local para fins de desenvolvimento ou teste.

🎯 Pré-Requisitos (O que você precisa baixar)
Antes de começar, você precisa ter duas ferramentas essenciais instaladas em seu sistema.

1. Node.js e npm
O Node.js é o ambiente de execução que permite que o JavaScript seja executado fora do navegador. O npm (Node Package Manager) é a ferramenta que gerencia as bibliotecas e dependências do projeto.

Verificação: Abra seu Terminal (ou Prompt de Comando) e digite:

Bash

node -v
npm -v
Se aparecerem números de versão, você já tem o Node.js e o npm instalados.

Se precisar baixar: Baixe e instale a versão LTS (Long-Term Support) do instalador oficial.

2. Git

Verificação: No Terminal, digite:

Bash

git --version
Se precisar baixar: Baixe e instale a versão compatível com seu sistema operacional.

⚙️ Passo a Passo para Rodar o Programa
Siga estes passos para colocar o servidor em funcionamento:

Passo 1: Obter o Código-Fonte
Use o Git para clonar (baixar) o projeto para uma pasta em sua máquina.

Abra o Terminal (ou Prompt de Comando).

Navegue até a pasta onde deseja salvar o projeto (ex: sua pasta Documentos ou Projetos). Você pode usar o comando cd (change directory):

Bash

cd ~/Documentos/Projetos
Clone o repositório (use o link real do seu repositório aqui):

Bash

git clone git@github.com:eduardoarrigoni/Trabalho-Banco-de-Dados.git

Passo 2: Acessar a Pasta do Projeto
Entre no diretório do projeto que acabou de ser baixado.

Bash

cd [NOME_DA_PASTA_DO_PROJETO]
(O nome da pasta é geralmente o mesmo nome do repositório.)

Passo 3: Instalar as Dependências
O projeto depende de várias bibliotecas de terceiros (as "dependências") para funcionar. Você deve instalá-las usando o npm.

Execute o seguinte comando no Terminal:

Bash

npm install
Aguarde a conclusão. Este processo pode levar alguns minutos, dependendo da sua conexão e do tamanho do projeto.

Passo 4: Iniciar o Servidor Local
Com as dependências instaladas, você pode iniciar o servidor de desenvolvimento local.

Execute o comando de inicialização fornecido:

Bash

npm run dev
Passo 5: Acessar o Programa
Após executar o comando npm run dev:

O Terminal deve mostrar uma mensagem indicando que o servidor está em execução(http://localhost:3000).

Abra seu navegador (Chrome, Firefox, etc.).

Digite o endereço fornecido pelo terminal na barra de endereço do navegador.

Parabéns! Seu programa deve estar rodando e visível em seu navegador.

🛑 Como Parar o Programa
Para interromper a execução do servidor local, volte ao Terminal onde o comando npm run dev está rodando e pressione:

Ctrl + C (no Windows ou Linux)

⌘ + C (no macOS)
