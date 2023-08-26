import { Router } from 'express'
import ClienteControle from '../Controle/clienteControle.js'
const clienteRota = new Router()
const clienteControle = new ClienteControle()
clienteRota
  .post('/', clienteControle.gravar)
  .put('/', clienteControle.atualizar)
  .delete('/', clienteControle.remover)
  .get('/', clienteControle.consultar)
  .get('/:cpf', clienteControle.consultarPeloCPF)
export default clienteRota
