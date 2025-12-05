import express from "express";
import VendaController from "../controllers/VendaController.js";

const rotas = express.Router();

rotas.get("/produtos", VendaController.listarProdutos);
rotas.post("/venda", VendaController.registrarVenda);


export default rotas;