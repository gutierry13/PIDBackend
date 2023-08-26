import express from 'express'
import clienteRota from './Rotas/clienteRota.js'
import cors from 'cors'
import animalRota from './Rotas/animalRota.js'
import adocaoRota from './Rotas/adocaoRota.js'
const server = express()

server.use(cors())
server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use('/clientes', clienteRota)
server.use('/animais', animalRota)
server.use('/adocoes', adocaoRota)
server.listen(4003, 'localhost', () => {
  console.log('Backend rodando em http://localhost:4003')
})
