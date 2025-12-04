import express from "express";
import ClienteController from "../controllers/clienteController.js";

const rotas = express.Router();

rotas.post("/cadastro", ClienteController.cadastroCliente);
rotas.get("/cliente", ClienteController.listarClientes);
rotas.get("/cliente/:id", ClienteController.localizarClienteId);


export default rotas;