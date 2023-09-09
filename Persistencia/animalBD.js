import Animal from "../Modelo/animal.js";
import Especie from "../Modelo/especie.js";
import conectar from "./conexao.js";

export default class AnimalBD {
  async consultar(termo) {
    const conexao = await conectar();
    const sql =
      "SELECT animais.*, especie.codigo AS especie_codigo, especie.nome AS especie_nome FROM animais INNER JOIN especie ON animais.especie = especie.codigo WHERE animais.nome LIKE ? ORDER BY animais.nome ASC";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);
    const listaAnimais = [];
    for (let row of rows) {
      const especie = new Especie(row["especie_codigo"], row["especie_nome"]);
      const animal = new Animal(
        row["codigo"],
        row["nome"],
        row["raca"],
        especie,
        row["sexo"],
        row["peso"],
        row["idade"],
        row["cor"],
        row["porte"],
        row["saude"]
      );
      listaAnimais.push(animal);
    }
    return listaAnimais;
  }

  async consultarCodigo(value) {
    const conexao = await conectar();
    const sql =
      'SELECT * FROM animais WHERE codigo LIKE "%' +
      value +
      '%" OR nome LIKE "%' +
      value +
      '%" OR especie LIKE "%' +
      value +
      '%" OR raca LIKE "%' +
      value +
      '%"';

    const valores = [value];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);

    const listaAnimais = [];
    for (let row of rows) {
      const animal = new Animal(
        row["codigo"],
        row["nome"],
        row["raca"],
        row["especie"],
        row["sexo"],
        row["peso"],
        row["idade"],
        row["cor"],
        row["porte"],
        row["saude"]
      );
      listaAnimais.push(animal);
    }
    return listaAnimais;
  }

  async incluir(animal) {
    if (animal instanceof Animal) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO animais(codigo, nome, raca, especie, sexo, peso, idade, cor, porte,saude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
      const valores = [
        animal.codigo,
        animal.nome,
        animal.raca,
        animal.especie.codigo,
        animal.sexo,
        animal.peso,
        animal.idade,
        animal.cor,
        animal.porte,
        animal.saude,
      ];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async alterar(animal) {
    if (animal instanceof Animal) {
      const conexao = await conectar();
      const sql =
        "UPDATE animais SET nome = ?, raca = ?, especie = ?, sexo = ?, peso = ?, idade = ?, cor = ?, porte = ?, saude = ? WHERE codigo = ?";

      const valores = [
        animal.nome,
        animal.raca,
        animal.especie.codigo,
        animal.sexo,
        animal.peso,
        animal.idade,
        animal.cor,
        animal.porte,
        animal.saude,
        animal.codigo,
      ];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(animal) {
    if (animal instanceof Animal) {
      const conexao = await conectar();
      const sql = "DELETE FROM animais WHERE codigo = ?";
      const valores = [animal.codigo];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
