import Funcionario from "../Modelo/funcionario.js";
import conectar from "./conexao.js";

export default class FuncionarioBD {
  async consultar(termo) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM funcionarios WHERE nome LIKE ? order by nome asc";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);
    const listaFuncionarios = [];
    for (let row of rows) {
      const funcionario = new Funcionario(
        row["cpf"],
        row["nome"],
        row["dataNascimento"],
        row["funcao"],
        row["setor"],
        row["email"],
        row["telefone"],
        row["ocupacao"],
        row["estadoCivil"],
        row["cep"],
        row["dataContratacao"],
        row["sexo"]
      );
      listaFuncionarios.push(funcionario);
    }
    return listaFuncionarios;
  }

  async consultarCPF(value) {
    const conexao = await conectar();
    const sql =
      'SELECT * FROM funcionarios WHERE cpf like "%' +
      value +
      '%" or nome like "%' +
      value +
      '%" or email like "%' +
      value +
      '%" or telefone like "%' +
      value +
      '%" or cep like "%' +
      value +
      '%"';

    const valores = [value];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);
    const listaFuncionarios = [];
    for (let row of rows) {
      const funcionario = new Funcionario(
        row["cpf"],
        row["nome"],
        row["dataNascimento"],
        row["funcao"],
        row["setor"],
        row["email"],
        row["telefone"],
        row["ocupacao"],
        row["estadoCivil"],
        row["cep"],
        row["dataContratacao"],
        row["sexo"]
      );
      listaFuncionarios.push(funcionario);
    }
    return listaFuncionarios;
  }

  async incluir(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO funcionarios(cpf,nome,dataNascimento,funcao,setor,email,telefone,ocupacao,estadoCivil,cep,dataContratacao,sexo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
      const valores = [
        funcionario.cpf,
        funcionario.nome,
        funcionario.dataNascimento,
        funcionario.funcao,
        funcionario.setor,
        funcionario.email,
        funcionario.telefone,
        funcionario.ocupacao,
        funcionario.estadoCivil,
        funcionario.cep,
        funcionario.dataContratacao,
        funcionario.sexo,
      ];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async alterar(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      const sql =
        "UPDATE funcionarios SET nome=?,dataNascimento=?,funcao=?,setor=?,email=?,telefone=?,ocupacao=?,estadoCivil=?,cep=?,dataContratacao=?,sexo=? WHERE cpf=?";

      const valores = [
        funcionario.nome,
        funcionario.dataNascimento,
        funcionario.funcao,
        funcionario.setor,
        funcionario.email,
        funcionario.telefone,
        funcionario.ocupacao,
        funcionario.estadoCivil,
        funcionario.cep,
        funcionario.dataContratacao,
        funcionario.sexo,
        funcionario.cpf,
      ];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(funcionario) {
    if (funcionario instanceof Funcionario) {
      const conexao = await conectar();
      const sql = "DELETE FROM funcionarios WHERE cpf=?";
      const valores = [funcionario.cpf];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
