import connectDataBase from "../config/db.js";
class ClienteController{
    
    static listarDepartamento = async (req, res) => {
        try{
        const client = await connectDataBase();
        const departamentos = await client.query("SELECT * FROM departamento");
        
        res.status(200).json(departamentos);
        }catch(erro){

            throw erro;
        }
    }
}
export default ClienteController;