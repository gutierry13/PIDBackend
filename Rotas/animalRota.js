import { Router } from 'express'
import AnimalControle from '../Controle/animalControle.js'
const animalRota = new Router()
const animalControle = new AnimalControle()
animalRota
  .post('/', animalControle.gravar)
  .put('/', animalControle.atualizar)
  .delete('/', animalControle.remover)
  .get('/', animalControle.consultar)
  .get('/:codigo', animalControle.consultarPeloCodigo)
export default animalRota
