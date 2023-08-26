import Cliente from '../Modelo/cliente.js'
export default class ClienteControle {
  gravar(req, res) {
    res.type('application/json')
    if (req.method === 'POST' && req.is('application/json')) {
      const {
        cpf,
        nome,
        dtNascimento,
        email,
        telefone,
        ocupacao,
        sexo,
        estadoCivil,
        cep
      } = req.body
      if (
        cpf &&
        nome &&
        dtNascimento &&
        email &&
        telefone &&
        ocupacao &&
        sexo &&
        estadoCivil &&
        cep
      ) {
        const cliente = new Cliente(
          cpf,
          nome,
          dtNascimento,
          email,
          telefone,
          ocupacao,
          sexo,
          estadoCivil,
          cep
        )
        cliente
          .gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: 'Cliente gravado com sucesso!'
            })
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: erro.message
            })
          })
      } else {
        res.status(400).json({
          status: false,
          mensagem: 'Informe adequadamente os dados do cliente'
        })
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: 'Método não permitido ou cliente fora do formato JSON'
      })
    }
  }
  atualizar(req, res) {
    res.type('application/json')
    if (req.method === 'PUT' && req.is('application/json')) {
      const {
        cpf,
        nome,
        dtNascimento,
        email,
        telefone,
        ocupacao,
        sexo,
        estadoCivil,
        cep
      } = req.body
      if (
        cpf &&
        nome &&
        dtNascimento &&
        email &&
        telefone &&
        ocupacao &&
        sexo &&
        estadoCivil &&
        cep
      ) {
        const cliente = new Cliente(
          cpf,
          nome,
          dtNascimento,
          email,
          telefone,
          ocupacao,
          sexo,
          estadoCivil,
          cep
        )
        cliente
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: 'Cliente atualizado com sucesso!'
            })
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: erro.message
            })
          })
      } else {
        res.status(400).json({
          status: false,
          mensagem: 'Informe adequadamente os dados do cliente'
        })
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: 'Método não permitido ou cliente fora do formato JSON'
      })
    }
  }
  remover(req, res) {
    res.type('application/json')
    if (req.method === 'DELETE' && req.is('application/json')) {
      const cpf = req.body.cpf
      if (cpf) {
        const cliente = new Cliente(cpf)
        cliente
          .remover()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: 'Cliente removido com sucesso!'
            })
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: erro.message
            })
          })
      } else {
        res.status(400).json({
          status: false,
          mensagem: 'Informe cpf do cliente'
        })
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: 'Método não permitido ou cliente fora do formato JSON'
      })
    }
  }
  consultar(req, res) {
    res.type('application/json')
    if (req.method === 'GET') {
      const cliente = new Cliente('', '', '', '', '', '', '', '', '')
      cliente
        .consultar('')
        .then((clientes) => {
          res.status(200).json(clientes)
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            mensagem: erro.message
          })
        })
    } else {
      res.status(400).json({
        status: false,
        mensagem: 'Método não permitido'
      })
    }
  }
  consultarPeloCPF(req, res) {
    res.type('application/json')
    const cpf = req.params['cpf']
    if (req.method === 'GET') {
      const cliente = new Cliente('', '', '', '', '', '', '', '', '')
      cliente
        .consultarCPF(cpf)
        .then((cliente) => {
          res.status(200).json(cliente)
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            mensagem: erro.message
          })
        })
    } else {
      res.status(400).json({
        status: false,
        mensagem: 'Método não permitido'
      })
    }
  }
}
