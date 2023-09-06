import express from "express";
import clienteRota from "./Rotas/clienteRota.js";
import cors from "cors";
import animalRota from "./Rotas/animalRota.js";
import adocaoRota from "./Rotas/adocaoRota.js";
const server = new express();
const hostname = "0.0.0.0";
const port = 4003;
server.use(cors({ origin: "*" }));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use("/clientes", clienteRota);
server.use("/animais", animalRota);
server.use("/adocoes", adocaoRota);
server.listen(port, hostname, () => {
  console.log(`Backend rodando em http://${hostname}:${port}`);
});
