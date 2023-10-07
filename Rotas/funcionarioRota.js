import { Router } from "express";
import FuncionarioControle from "../Controle/funcionarioControle.js";
const funcionarioRota = new Router();
const funcionarioControle = new FuncionarioControle();
funcionarioRota
  .post("/", funcionarioControle.gravar)
  .put("/", funcionarioControle.atualizar)
  .delete("/", funcionarioControle.remover)
  .get("/", funcionarioControle.consultar)
  .get("/:cpf", funcionarioControle.consultarPeloCPF);
export default funcionarioRota;
