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
        row['codigo'],
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
      'SELECT * FROM adocoes WHERE codigo LIKE "%' +
      value +
      '%" OR codigoAnimal LIKE "%' +
      value +
      '%"';

    const valores = [value];
    const [rows] = await conexao.query(sql, valores);
    const listaAdocoes = [];
    for (let row of rows) {
      const adocao = new Adocao(
        row['codigo'],
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
        'INSERT INTO adocoes(codigo,cpfCliente, codigoAnimal, data, termos, status, documentos) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const valores = [
        adocao.codigo,
        adocao.cpfCliente,
        adocao.codigoAnimal,
        adocao.data,
        adocao.termos,
        adocao.status,
        adocao.documentos
      ];
      console.log('Valores:', valores);
      console.log('SQL:', sql);
      await conexao.query(sql, valores);
    }
  }

  async alterar(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectar();
      const sql =
        'UPDATE adocoes SET data = ?, termos = ?, status = ?, documentos = ? , cpfCliente = ?, codigoAnimal = ? WHERE codigo = ?';

      const valores = [
        adocao.data,
        adocao.termos,
        adocao.status,
        adocao.documentos,
        adocao.cpfCliente,
        adocao.codigoAnimal,
        adocao.codigo
      ];
      console.log('Valores:', valores);
      console.log('SQL:', sql);
      await conexao.query(sql, valores);
    }
  }

  async excluir(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectar();
      const sql = 'DELETE FROM adocoes WHERE codigo = ?';
      const valores = [adocao.codigo];
      await conexao.query(sql, valores);
    }
  }
}
