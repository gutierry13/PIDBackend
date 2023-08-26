import { Router } from 'express';
import AdocaoControle from '../Controle/adocaoControle.js';

const adocaoRota = new Router();
const adocaoControle = new AdocaoControle();

adocaoRota
  .post('/', adocaoControle.gravar)
  .put('/', adocaoControle.atualizar)
  .delete('/', adocaoControle.remover)
  .get('/', adocaoControle.consultar)
  .get('/:codigo', adocaoControle.consultarPeloCodigo);

export default adocaoRota;
