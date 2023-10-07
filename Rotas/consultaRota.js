import { Router } from "express";
import ConsultaControle from "../Controle/consultaControle.js";
const consultaRota = new Router();
const consultaControle = new ConsultaControle();
consultaRota
  .post("/", consultaControle.gravar)
  .put("/", consultaControle.atualizar)
  .delete("/", consultaControle.remover)
  .get("/", consultaControle.consultar)
  .get("/:codigo", consultaControle.consultarPorCodigo);
export default consultaRota;
