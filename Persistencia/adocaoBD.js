import Adocao from '../Modelo/adocao.js';
import conectar from './conexao.js';

export default class AdocaoBD {
  async consultar(termo) {
    const conexao = await conectar();
    const sql = 'SELECT * FROM adocoes WHERE cpfCliente LIKE ? ORDER BY data ASC';
    const valores = ['%' + termo + '%'];
    const [rows] = await conexao.query(sql, valores);
    const listaAdocoes = [];
    for (let row of rows) {
      const adocao = new Adocao(
        row['cpfCliente'],
        row['codigoAnimal'],
        row['data'],
        row['termos'],
        row['status'],
        row['documentos']
      );
      listaAdocoes.push(adocao);
    }
    return listaAdocoes;
  }

  async consultarCodigo(value) {
    const conexao = await conectar();
    const sql =
      'SELECT * FROM adocoes WHERE cpfCliente LIKE "%' +
      value +
      '%" OR codigoAnimal LIKE "%' +
      value +
      '%"';

    const valores = [value];
    const [rows] = await conexao.query(sql, valores);
    const listaAdocoes = [];
    for (let row of rows) {
      const adocao = new Adocao(
        row['cpfCliente'],
        row['codigoAnimal'],
        row['data'],
        row['termos'],
        row['status'],
        row['documentos']
      );
      listaAdocoes.push(adocao);
    }
    return listaAdocoes;
  }

  async incluir(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectar();
      const sql =
        'INSERT INTO adocoes(cpfCliente, codigoAnimal, data, termos, status, documentos) VALUES (?, ?, ?, ?, ?, ?)';
      const valores = [
        adocao.cpfCliente,
        adocao.codigoAnimal,
        adocao.data,
        adocao.termos,
        adocao.status,
        adocao.documentos
      ];
      await conexao.query(sql, valores);
    }
  }

  async alterar(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectar();
      const sql =
        'UPDATE adocoes SET data = ?, termos = ?, status = ?, documentos = ? WHERE cpfCliente = ? AND codigoAnimal = ?';

      const valores = [
        adocao.data,
        adocao.termos,
        adocao.status,
        adocao.documentos,
        adocao.cpfCliente,
        adocao.codigoAnimal
      ];
      await conexao.query(sql, valores);
    }
  }

  async excluir(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectar();
      const sql = 'DELETE FROM adocoes WHERE cpfCliente = ? AND codigoAnimal = ?';
      const valores = [adocao.cpfCliente, adocao.codigoAnimal];
      await conexao.query(sql, valores);
    }
  }
}
