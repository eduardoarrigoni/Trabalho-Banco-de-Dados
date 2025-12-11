import express from "express";
import ClienteController from "../controllers/ClienteController.js";

const rotas = express.Router();

rotas.post("/cadastro", ClienteController.cadastroCliente);
rotas.post("/login", ClienteController.loginCliente);
rotas.get("/cliente/:id", ClienteController.localizarClienteId);
rotas.post("/login/adm", ClienteController.loginAdm);

export default rotas;