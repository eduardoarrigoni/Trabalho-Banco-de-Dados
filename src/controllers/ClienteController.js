import connectDataBase from "../config/db.js";
class ClienteController{
    
    static cadastroCliente = async (req, res) => {
        try{
        const client = await connectDataBase();
        const conteudo = req.query;

        const idCliente = await client.query("SELECT COUNT(idcliente) FROM cliente;");
        const cpf = conteudo.cpf;
        const nome = conteudo.nome;
        const senha = conteudo.senha;
        const dataNascimento = conteudo.datanascimento;
        const email = conteudo.email;
        const numeroCelular = conteudo.numerocelular;
        const dataCadastro = await client.query("SELECT NOW()");
        const jsonIdEndereco = conteudo.endereco;
        const jsonIdCartao = conteudo.cartao;
        
        const clienteCadastrado = await client.query(`INSERT INTO Cliente VALUES (${idCliente}, ${cpf}), ${nome}), ${senha}), ${dataNascimento}),
            ${email}), ${numeroCelular}), ${dataCadastro}, ${idEndereco}, ${idCartao}))` );
        //INSERT INTO Cliente VALUES 
        //(1, '111.111.111-11', 'João', '123', '2000-01-01', 'joao@email.com', '27999990001', '2025-01-01', NULL, 1)
        res.status(200).send("Cliente cadastrado com sucesso");
        }catch(erro){

            throw erro;
        }
    }
    static localizarClienteId = async (req, res) => {

        try{

            const client = await connectDataBase();
            const idCliente = req.params.id;
            const clienteEncontrado = await client.query(`SELECT * FROM cliente WHERE idcliente = ${idCliente}`);
            res.status(200).json(clienteEncontrado.rows);

        }catch(erro){

            throw erro;



        }
    }
    static listarClientes = async (req, res) => {

        try{
            const client = await connectDataBase();
            const listaCliente = await client.query("SELECT * FROM cliente");

            res.status(200).json(listaCliente);

        }catch(erro){

            throw erro;

        }
    }
    static loginCliente = async (req, res) => {

        try{
            const client = await connectDataBase();

        }catch(erro){
            throw erro;
        }

    }
    static async function(endereco){

        

    } 
}
export default ClienteController;