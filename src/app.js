import express from "express";
import connectDataBase from "./config/db.js";
import rotas from "./rotas/index.js";


const app = express();
rotas(app);




export default app;