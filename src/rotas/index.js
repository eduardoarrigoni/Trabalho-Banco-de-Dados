import express from "express";
import cliente from "./clienteRotas.js";
import venda from "./vendaRotas.js";
import adm from "./admRotas.js";
const rotas = (app) => {

    
    app.use(express.json(), cliente, venda, adm);
};

export default rotas;