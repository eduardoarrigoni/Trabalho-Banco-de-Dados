import express from "express";
import AdmController from "../controllers/AdmController.js";

const rotas = express.Router();

rotas.get("/clientes/acessos", AdmController.acessosClientes);
rotas.get("/produtos/estoque-baixo", AdmController.produtosEstoqueBaixo);
rotas.get("/clientes/vendas/total", AdmController.totalVendasPorCliente);


export default rotas;