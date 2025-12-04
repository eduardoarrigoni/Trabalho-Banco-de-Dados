import express from "express";
import cliente from "./clienteRotas.js";
const rotas = (app) => {

    
    app.use(express.json(), cliente);
};

export default rotas;