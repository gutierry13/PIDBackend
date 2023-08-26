import Cliente from '../Modelo/cliente.js'
import conectar from './conexao.js'

export default class ClienteBD {
  async consultar(termo) {
    const conexao = await conectar()
    const sql = 'SELECT * FROM clientes WHERE nome LIKE ? order by nome asc'
    const valores = ['%' + termo + '%']
    const [rows] = await conexao.query(sql, valores)
    const listaCliente = []
    for (let row of rows) {
      const cliente = new Cliente(
        row['cpf'],
        row['nome'],
        row['dtNascimento'],
        row['email'],
        row['telefone'],
        row['ocupacao'],
        row['sexo'],
        row['estadoCivil'],
        row['cep']
      )
      listaCliente.push(cliente)
    }
    return listaCliente
  }
  async consultarCPF(value) {
    const conexao = await conectar()
    const sql =
      'SELECT * FROM clientes WHERE cpf like "%' +
      value +
      '%" or nome like "%' +
      value +
      '%" or email like "%' +
      value +
      '%" or telefone like "%' +
      value +
      '%" or cep like "%' +
      value +
      '%"'

    const valores = [value]
    const [rows] = await conexao.query(sql, valores)
    const listaCliente = []
    for (let row of rows) {
      const cliente = new Cliente(
        row['cpf'],
        row['nome'],
        row['dtNascimento'],
        row['email'],
        row['telefone'],
        row['ocupacao'],
        row['sexo'],
        row['estadoCivil'],
        row['cep']
      )
      listaCliente.push(cliente)
    }
    return listaCliente
  }
  async incluir(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar()
      const sql =
        'INSERT INTO clientes(cpf,nome,dtNascimento,email,telefone,ocupacao,sexo,estadoCivil,cep) VALUES(?,?,?,?,?,?,?,?,?)'
      const valores = [
        cliente.cpf,
        cliente.nome,
        cliente.dtNascimento,
        cliente.email,
        cliente.telefone,
        cliente.ocupacao,
        cliente.sexo,
        cliente.estadoCivil,
        cliente.cep
      ]
      await conexao.query(sql, valores)
    }
  }
  async alterar(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar()
      const sql =
        'UPDATE clientes SET nome=?,dtNascimento=?,email=?,telefone=?,ocupacao=?,sexo=?,estadoCivil=?,cep=? WHERE cpf=? '

      const valores = [
        cliente.nome,
        cliente.dtNascimento,
        cliente.email,
        cliente.telefone,
        cliente.ocupacao,
        cliente.sexo,
        cliente.estadoCivil,
        cliente.cep,
        cliente.cpf
      ]
      await conexao.query(sql, valores)
    }
  }
  async excluir(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar()
      const sql = 'DELETE FROM clientes WHERE cpf =?'
      const valores = [cliente.cpf]
      await conexao.query(sql, valores)
    }
  }
}
