import connectDataBase from "../config/db.js";
class VendaController{

    static listarProdutos = async (req, res) => {

        try{
            const client = await connectDataBase();
            const produtos = await client.query('SELECT * FROM produto');
            
            res.status(200).json(produtos.rows);
        }catch(erro){
            res.status(400).json({message: "Erro ao carregar produtos"});
        }
    }

    static registrarVenda = async (req, res) => {

        try{
            const client = await connectDataBase();
            const conteudoVenda = req.body;

            const idNovaVenda = await client.query("SELECT COUNT(idvenda) FROM venda;");
            let idVenda = parseInt(idNovaVenda.rows[0].count, 10);
            idVenda += 1;

            const valorTotal = conteudoVenda.total;

            const consultaDataVenda = await client.query("SELECT NOW()")
            let dataVenda = consultaDataVenda.rows[0].now;

            const idCliente = conteudoVenda.idCliente;


            const sql = `INSERT INTO venda VALUES (
                    $1, $2, $3, $4
                    )`;

            const valores = [
            idVenda,
            valorTotal,
            dataVenda,
            idCliente
            ];
            const registroProdutos = VendaController.registrarProdutosVendidos(conteudoVenda.items, idVenda);
            
            let vendaConcluida = await client.query(sql, valores);
            
            res.status(200).json({ message: "Venda finalizada com sucesso"});

        }catch(erro){
            res.status(400).json({message: "Erro ao finalizar venda"});
        }
    }
    static registrarProdutosVendidos = async (itens, idvenda) => {

        const client = await connectDataBase();

        let objetoItens;

        let idProdutosVendidosConsulta = await client.query("SELECT COUNT(idprodutosvendidos) FROM produtos_vendidos;");
        let idProdutosVendidos = parseInt(idProdutosVendidosConsulta.rows[0].count, 10);
        idProdutosVendidos += 1;
        let contador = 0;
        
        for(let i = 0; i < itens.length; i++){
            objetoItens = itens[i];
            let insert = await client.query(`INSERT INTO produtos_vendidos VALUES (
                        ${idProdutosVendidos + i}, ${objetoItens.id}, ${idvenda}, ${objetoItens.quantidade}
                        )`)
            if(parseInt(insert.rowCount, 10) === 1){
                
                contador +=1;
            }
        }
        
        if(contador === 1){
            return true;
        }else{
            return false;
        }

    
    }
}
export default VendaController;