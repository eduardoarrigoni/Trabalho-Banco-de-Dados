import connectDataBase from "../config/db.js";
class ClienteController{
    
    static cadastroCliente = async (req, res) => {
        try{
        const client = await connectDataBase();
        const conteudo = req.body;
        
        const resultado = await client.query("SELECT COUNT(idcliente) FROM cliente;");
        let idCliente = parseInt(resultado.rows[0].count, 10);
        idCliente += 1;

        const consultaDataCadastro = await client.query("SELECT NOW()")
        let dataCadastro = consultaDataCadastro.rows[0].now;
        
        let idEndereco = await ClienteController.encontrarEndereco(conteudo.endereco);
        
        if(!idEndereco){          
            const retorno = await ClienteController.novoEndereco(conteudo.endereco);
            if(retorno != 0) idEndereco = retorno;
        }

        
        const sql = `INSERT INTO Cliente VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                    )`;

        const valores = [
        idCliente,
        conteudo.cpf,
        conteudo.nome,
        conteudo.password,
        conteudo.dataNascimento,
        conteudo.email,
        conteudo.celular,
        dataCadastro,
        idEndereco,
        null
        ];
        await client.query(sql, valores);
        
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

    static loginCliente = async (req, res) => {

        try{
            const client = await connectDataBase();
            const acesso = req.body;
            console.log(acesso);
            const idCliente = await client.query(`SELECT idCliente
                                                FROM cliente
                                                WHERE email = '${acesso.email}' AND senha = '${acesso.password}'`);
            
            
            if(idCliente.rows[0].idcliente > 0){

                res.status(200).json({message: "login realizado com sucesso",
                    idCliente: idCliente.rows[0].idcliente
                });
            }else{
                res.status(400).json({ message: "Erro ao cadastrar" });
            }
        }catch(erro){   
            res.status(400).json({ message: "Erro ao cadastrar" });
        }

    }
    static async encontrarEndereco(endereco) {
        
        try{

            const client = await connectDataBase();
            const sql = `SELECT idendereco
                        FROM endereco
                        WHERE estado = '${endereco.estado}' AND numero = ${endereco.numero} AND rua = '${endereco.rua}' 
                        AND cidade = '${endereco.cidade}' AND complemento = '${endereco.complemento}'`;
            
            
            let enderecoEncontrado = await client.query(sql);
            
            return parseInt(enderecoEncontrado.rows[0], 10);
        }catch(erro){
            throw erro;
        }
        
    }
    static async novoEndereco(endereco){

        try{
            const client = await connectDataBase();
            const resultadoId = await client.query("SELECT COUNT(idendereco) FROM endereco;");
            let idEndereco = parseInt(resultadoId.rows[0].count, 10);
            
            const retorno = await client.query(
                            `INSERT INTO endereco VALUES (
                                ${idEndereco + 1},
                                '${endereco.estado}',
                                ${endereco.numero},
                                '${endereco.rua}',
                                '${endereco.cidade}',
                                '${endereco.complemento}',
                                NULL,
                                NULL
                            )`
                            );
            
                            
            
            if(parseInt(retorno.rowCount, 10) === 1) return (idEndereco + 1);
        
            return 0;
        }catch(erro){
            throw erro;
        }

    }
    
}
export default ClienteController;