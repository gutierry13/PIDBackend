import { Router } from "express";
import EspecieControle from "../Controle/especieControle.js";
const especieRota = new Router();
const especieControle = new EspecieControle();
especieRota
  .post("/", especieControle.gravar)
  .put("/", especieControle.atualizar)
  .delete("/", especieControle.remover)
  .get("/", especieControle.consultar)
  .get("/:codigo", especieControle.consultarPeloCodigo);
export default especieRota;
