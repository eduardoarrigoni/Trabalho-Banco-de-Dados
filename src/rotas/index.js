import express from "express";
import cliente from "./clienteRotas.js";
const rotas = (app) => {

    app.route("/").get((req, res) => res.status(200).send("Loja virtual"));
    app.use(express.json(), cliente);
};

export default rotas;