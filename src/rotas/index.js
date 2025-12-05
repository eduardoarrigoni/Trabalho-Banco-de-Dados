import express from "express";
import cliente from "./clienteRotas.js";
import venda from "./vendaRotas.js";
const rotas = (app) => {

    
    app.use(express.json(), cliente, venda);
};

export default rotas;