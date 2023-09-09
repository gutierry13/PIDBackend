import Especie from "../Modelo/especie.js";
import conectar from "./conexao.js";

export default class EspecieBD {
  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM especie WHERE nome LIKE ? ORDER BY nome ASC";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    await global.poolConexoes.releaseConnection(conexao);
    const listaAnimais = [];
    for (let row of rows) {
      const especie = new Especie(row["codigo"], row["nome"]);
      listaAnimais.push(especie);
    }
    return listaAnimais;
  }

  async consultarCodigo(value) {
    const conexao = await conectar();
    const sql =
      'SELECT * FROM especie WHERE codigo LIKE "%' +
      value +
      '%" OR nome LIKE "%' +
      value +
      '%"';

    const valores = [value];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);
    const listaAnimais = [];
    for (let row of rows) {
      const especie = new Especie(row["codigo"], row["nome"]);
      listaAnimais.push(especie);
    }
    return listaAnimais;
  }

  async incluir(especie) {
    if (especie instanceof Especie) {
      const conexao = await conectar();
      const sql = "INSERT INTO especie(codigo, nome) VALUES (?, ?)";
      const valores = [especie.codigo, especie.nome];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async alterar(especie) {
    if (especie instanceof Especie) {
      const conexao = await conectar();
      const sql = "UPDATE especie SET nome = ? WHERE codigo = ?";
      const valores = [especie.nome, especie.codigo];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(especie) {
    if (especie instanceof Especie) {
      const conexao = await conectar();
      const sql = "DELETE FROM especie WHERE codigo = ?";
      const valores = [especie.codigo];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
