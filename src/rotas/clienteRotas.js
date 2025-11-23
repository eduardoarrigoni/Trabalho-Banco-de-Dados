import express from "express";
import ClienteController from "../controllers/clienteController.js";

const rotas = express.Router();

rotas.get("/departamentos", ClienteController.listarDepartamento);


export default rotas;