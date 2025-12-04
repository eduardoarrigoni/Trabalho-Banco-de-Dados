import connectDataBase from "../config/db.js";
class ClienteController{
    
    static cadastroCliente = async (req, res) => {
        try{
        const client = await connectDataBase();
        const conteudo = req.body;
        console.log(conteudo);
        const idCliente = await client.query("SELECT COUNT(idcliente) FROM cliente;");
        idCliente += 1;
        console.log(idCliente);
        const dataCadastro = await client.query("SELECT NOW()");
        const idEndereco = await encontrarEndereco(conteudo.endereco);
        console.log(idEndereco);
        if(!idEndereco){
            idEndereco = await novoEndereco(conteudo.endereco);
            console.log(idEndereco);
        }

        const sql = `INSERT INTO Cliente VALUES 
                    (${idCliente}, ${conteudo.cpf}, 
                    ${conteudo.nome}), ${conteudo.senha}), ${conteudo.dataNascimento}),
                    ${conteudo.email}), ${conteudo.numeroCelular}), ${dataCadastro}, 
                    ${idEndereco}, NULL)` 
        //const jsonIdCartao = conteudo.cartao;
        
        const clienteCadastrado = await client.query(sql);
        //INSERT INTO Cliente VALUES 
        //(1, '111.111.111-11', 'João', '123', '2000-01-01', 'joao@email.com', '27999990001', '2025-01-01', NULL, 1)
        res.status(200).json({message: "Cliente cadastrado com sucesso"});
        }catch(erro){

            res.status(400).json({ message: "Erro ao cadastrar" });
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
    static novoEndereco = async (endereco) => {

        try{
            const client = await connectDataBase();
            const idEndereco = await client.query("SELECT COUNT(idendereco) FROM endereco;");
            await client.query(`INSERT INTO endereco VALUES 
                (${idEndereco + 1}, ${endereco.estado}, ${endereco.numero}), ${endereco.rua},
                ${endereco.cidade}, ${endereco.complemento}, NULL, NULL`);
    
            return idEndereco + 1;

        }catch(erro){
            throw erro;
        }

    }
    static encontrarEndereco = async (endereco) => {

        try{

            const client = await connectDataBase();
            const sql = `SELECT idendereco
                        FROM endereco
                        WHERE estado = '${endereco.estado}' AND numero = ${endereco.numero} AND rua = '${endereco.rua}' 
                        AND cidade = '${endereco.cidade}' AND complemento = '${endereco.complemento}'`;
            
            
            const enderecoEncontrado = await client.query(sql);
            
            return enderecoEncontrado;
        }catch(erro){
            throw erro;
        }
    } 
}
export default ClienteController;