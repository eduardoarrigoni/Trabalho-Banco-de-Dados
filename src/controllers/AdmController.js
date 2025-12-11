import connectDataBase from "../config/db.js";
class AdmController{
    
    static acessosClientes = async (req, res) => {
        try{
        const client = await connectDataBase();
        const conteudo = req.body;
        const sql = `SELECT a.idAcesso, a.dataEHora, c.nome AS cliente 
                    FROM Acesso a 
                    LEFT JOIN Cliente c ON a.idCliente = c.idCliente 
                    ORDER BY a.dataEHora`
        const resultado = await client.query(sql);
        let idCliente = parseInt(resultado.rows[0].count, 10);
        idCliente += 1;

        const consultaDataCadastro = await client.query("SELECT NOW()")
        let dataCadastro = consultaDataCadastro.rows[0].now;
        
        let idEndereco = await ClienteController.encontrarEndereco(conteudo.endereco);
        
        if(!idEndereco){          
            const retorno = await ClienteController.novoEndereco(conteudo.endereco);
            if(retorno != 0) idEndereco = retorno;
        }

        
        
        
        res.status(200).json({message: "Cliente cadastrado com sucesso"});
        }catch(erro){

            res.status(400).json({ message: "Erro ao cadastrar" });
        }
    }
    
    
}
export default AdmController;