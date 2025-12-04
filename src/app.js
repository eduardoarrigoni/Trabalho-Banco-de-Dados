import express from "express";
import connectDataBase from "./config/db.js";
import rotas from "./rotas/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'public')));

rotas(app);




export default app;