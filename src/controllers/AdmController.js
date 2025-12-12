import connectDataBase from "../config/db.js";
class AdmController{
    
    static acessosClientes = async (req, res) => {
        try{
        const client = await connectDataBase();
        const sql = `SELECT a.idAcesso, a.dataEHora, c.nome AS cliente 
                    FROM Acesso a 
                    LEFT JOIN Cliente c ON a.idCliente = c.idCliente 
                    ORDER BY a.dataEHora`
        const resultado = await client.query(sql);
        const resposta  = resultado.rows;
        
        res.status(200).json(resposta);
        }catch(erro){

            res.status(400).json({ message: "Erro interno" });
        }
    }

    static produtosEstoqueBaixo = async (req, res) =>{
        try{
        const client = await connectDataBase();
        const sql = `SELECT 
                    p.nome AS produto,
                    p.quantidadeAtual,
                    p.estoqueMinimo
                    FROM Produto p
                    WHERE p.quantidadeAtual < p.estoqueMinimo;`
        const resultado = await client.query(sql);
        const resposta  = resultado.rows;
        
        res.status(200).json(resposta);
        }catch(erro){

            res.status(400).json({ message: "Erro interno" });
        }
    }

    static totalVendasPorCliente = async (req, res) =>{
        try{
        const client = await connectDataBase();
        const sql = `SELECT 
                    c.nome AS cliente,
                    COUNT(v.idVenda) AS total_vendas,
                    SUM(v.valorTotal) AS soma_total
                    FROM Cliente c
                    JOIN Venda v ON v.idCliente = c.idCliente
                    GROUP BY c.idCliente, c.nome;`
        const resultado = await client.query(sql);
        const resposta  = resultado.rows;
        
        res.status(200).json(resposta);
        }catch(erro){

            res.status(400).json({ message: "Erro interno" });
        }
    }

}
export default AdmController;