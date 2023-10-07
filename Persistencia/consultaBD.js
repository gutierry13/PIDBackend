import Consulta from "../Modelo/consulta.js";
import conectar from "./conexao.js";
import Cliente from "../Modelo/cliente.js";
import Funcionario from "../Modelo/funcionario.js";
export default class ConsultaBD {
  // async consultar(termo) {
  //   const conexao = await conectar();
  //   const sql = `SELECT * FROM consultas as con INNER JOIN animais as ani INNER JOIN clientes as cli INNER JOIN funcionarios as fun INNER JOIN funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = funcon.funcionarioCpf and cli.cpf = con.clienteCPF and ani.codigo = con.animalID;

  //    `;
  //   const valores = ["%" + termo + "%"];
  //   const [rows] = await conexao.query(sql, valores);
  //   global.poolConexoes.releaseConnection(conexao);
  //   const listaConsultas = [];
  //   for (let row of rows) {
  //     const consulta = new Consulta(
  //       row["codigo"],
  //       row["animalID"],
  //       row["clienteCPF"],
  //       row["funcionarioCPF"],
  //       row["data"],
  //       row["motivo"],
  //       row["diagnostico"],
  //       row["medicamento"],
  //       row["tratamento"],
  //       row["observacao"]
  //     );
  //     listaConsultas.push(consulta);
  //   }
  //   return listaConsultas;
  // }
  async consultar() {
    const conexao = await conectar();
    const sql = `SELECT * FROM consultas as con inner join clientes as cli on cli.cpf = con.clienteCPF;
   `;
    const listaConsultas = [];
    const [rows] = await conexao.query(sql);
    for (const consu of rows) {
      const cliente = new Cliente(
        rows[0]["cpf"],
        rows[0]["nome"],
        rows[0]["dtNascimento"],
        rows[0]["email"],
        rows[0]["telefone"],
        rows[0]["ocupacao"],
        rows[0]["sexo"],
        rows[0]["estadoCivil"],
        rows[0]["cep"]
      );
      const consulta = new Consulta(
        rows[0]["codigo"],
        rows[0]["animalID"],
        cliente,
        rows[0]["funcionarioCPF"],
        rows[0]["data"],
        rows[0]["motivo"],
        rows[0]["diagnostico"],
        rows[0]["medicamento"],
        rows[0]["tratamento"],
        rows[0]["observacao"],
        []
      );
      const sqlItems = `SELECT * FROM consultas as con INNER JOIN animais as ani INNER JOIN funcionarios as fun INNER JOIN funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = con.funcionarioCPF and ani.codigo = con.animalID
      where con.codigo = ?
    `;
      const parametros = [consu["codigo"]];
      let listaFuncionarios = [];
      const [funcForCons] = await conexao.query(sqlItems, parametros);
      for (const funci of funcForCons) {
        listaFuncionarios.push(
          new Funcionario(
            funcForCons[0]["cpf"],
            funcForCons[0]["nome"],
            funcForCons[0]["dataNascimento"],
            funcForCons[0]["funcao"],
            funcForCons[0]["setor"],
            funcForCons[0]["email"],
            funcForCons[0]["telefone"],
            funcForCons[0]["ocupacao"],
            funcForCons[0]["estadoCivil"],
            funcForCons[0]["cep"],
            funcForCons[0]["dataContratacao"],
            funcForCons[0]["sexo"]
          )
        );
      }
      consulta.funcionarioCPF = listaFuncionarios;
      listaConsultas.push(consulta);
    }
    return listaConsultas;
  }
  async consultarPorCodigo(codigo) {
    const conexao = await conectar();
    const sql = `SELECT * FROM consultas as con inner join clientes as cli on cli.cpf = con.clienteCPF where con.codigo = ?;
   `;
    const listaConsultas = [];
    const [rows] = await conexao.query(sql, [codigo]);
    for (const consu of rows) {
      const cliente = new Cliente(
        rows[0]["cpf"],
        rows[0]["nome"],
        rows[0]["dtNascimento"],
        rows[0]["email"],
        rows[0]["telefone"],
        rows[0]["ocupacao"],
        rows[0]["sexo"],
        rows[0]["estadoCivil"],
        rows[0]["cep"]
      );
      const consulta = new Consulta(
        rows[0]["codigo"],
        rows[0]["animalID"],
        cliente,
        rows[0]["funcionarioCPF"],
        rows[0]["data"],
        rows[0]["motivo"],
        rows[0]["diagnostico"],
        rows[0]["medicamento"],
        rows[0]["tratamento"],
        rows[0]["observacao"],
        []
      );
      const sqlItems = `SELECT * FROM consultas as con INNER JOIN animais as ani INNER JOIN funcionarios as fun INNER JOIN funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = con.funcionarioCPF and ani.codigo = con.animalID
      where con.codigo = ?
    `;
      const parametros = [consu["codigo"]];
      let listaFuncionarios = [];
      const [funcForCons] = await conexao.query(sqlItems, parametros);
      for (const funci of funcForCons) {
        listaFuncionarios.push(
          new Funcionario(
            funcForCons[0]["cpf"],
            funcForCons[0]["nome"],
            funcForCons[0]["dataNascimento"],
            funcForCons[0]["funcao"],
            funcForCons[0]["setor"],
            funcForCons[0]["email"],
            funcForCons[0]["telefone"],
            funcForCons[0]["ocupacao"],
            funcForCons[0]["estadoCivil"],
            funcForCons[0]["cep"],
            funcForCons[0]["dataContratacao"],
            funcForCons[0]["sexo"]
          )
        );
      }
      consulta.funcionarioCPF = listaFuncionarios;
      listaConsultas.push(consulta);
    }
    return listaConsultas;
  }
  // async consultarPorCodigo(codigo) {
  //   const conexao = await conectar();
  //   const sql = "SELECT * FROM consultas WHERE codigo = ?";
  //   const valores = [codigo];
  //   const [rows] = await conexao.query(sql, valores);
  //   global.poolConexoes.releaseConnection(conexao);
  //   if (rows.length > 0) {
  //     const row = rows[0];
  //     const consulta = new Consulta(
  //       row["codigo"],
  //       row["animalID"],
  //       row["clienteCPF"],
  //       row["funcionarioCPF"],
  //       row["data"],
  //       row["motivo"],
  //       row["diagnostico"],
  //       row["medicamento"],
  //       row["tratamento"],
  //       row["observacao"]
  //     );
  //     return consulta;
  //   } else {
  //     return null; // Consulta não encontrada
  //   }
  // }

  async incluir(consulta) {
    if (consulta instanceof Consulta) {
      const conexao = await conectar();
      try {
        await conexao.beginTransaction();
        const sql =
          "INSERT INTO consultas(codigo,animalID,clienteCPF,funcionarioCPF,data,motivo,diagnostico,medicamento,tratamento,observacao) VALUES(?,?,?,?,?,?,?,?,?,?)";
        const valores = [
          consulta.codigo,
          consulta.animalID,
          consulta.clienteCPF,
          consulta.funcionarioCPF,
          consulta.data,
          consulta.motivo,
          consulta.diagnostico,
          consulta.medicamento,
          consulta.tratamento,
          consulta.observacao,
        ];
        await conexao.query(sql, valores);
        for (const funcionario of consulta.funcionarioCPF) {
          const sql2 =
            "insert into funcionario_consulta(funcionarioCpf,consultaCodigo) values(?,?)";
          const parametros = [funcionario.cpf, consulta.codigo];
          await conexao.query(sql2, parametros);
        }
      } catch (e) {
        await conexao.rollback();
        throw e;
      }
      await conexao.commit();
      global.poolConexoes.releaseConnection(conexao);
    }
  }
  async consultarComFuncionario(codigoConsulta) {
    const conexao = await conectar();
    const sql = `
      SELECT
        c.codigo,
        c.animalID,
        c.clienteCPF,
        c.data,
        c.motivo,
        c.medicamento,
        c.diagnostico,
        c.tratamento,
        c.observacao,
        f.nome AS funcionario_nome,
        f.cpf AS funcionario_cpf,
        f.funcao AS funcionario_funcao,
        f.setor AS funcionario_setor,
        f.ocupacao AS funcionario_ocupacao
      FROM consultas c
      INNER JOIN funcionario f ON c.funcionarioCPF = f.cpf
      WHERE c.codigo = ?`;

    const valores = [codigoConsulta];
    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);

    if (rows.length > 0) {
      // Crie o objeto JSON personalizado
      const row = rows[0];
      const consulta = {
        codigo: row["codigo"],
        animalID: row["animalID"],
        clienteCPF: row["clienteCPF"],
        data: row["data"],
        motivo: row["motivo"],
        medicamento: row["medicamento"],
        diagnostico: row["diagnostico"],
        tratamento: row["tratamento"],
        observacao: row["observacao"],
        funcionario: {
          nome: row["funcionario_nome"],
          cpf: row["funcionario_cpf"],
          funcao: row["funcionario_funcao"],
          setor: row["funcionario_setor"],
          ocupacao: row["funcionario_ocupacao"],
        },
      };
      return consulta;
    } else {
      return null; // Consulta não encontrada
    }
  }
  async atualizar(consulta) {
    if (consulta instanceof Consulta) {
      const conexao = await conectar();
      const sql =
        "UPDATE consultas SET animalID=?,clienteCPF=?,funcionarioCPF=?,data=?,motivo=?,diagnostico=?,medicamento=?,tratamento=?,observacao=? WHERE codigo=?";
      const valores = [
        consulta.animalID,
        consulta.clienteCPF,
        consulta.funcionarioCPF,
        consulta.data,
        consulta.motivo,
        consulta.diagnostico,
        consulta.medicamento,
        consulta.tratamento,
        consulta.observacao,
        consulta.codigo,
      ];
      await conexao.query(sql, valores);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(codigo) {
    const conexao = await conectar();
    const sql = "DELETE FROM consultas WHERE codigo=?";
    const valores = [codigo];
    await conexao.query(sql, valores);
    global.poolConexoes.releaseConnection(conexao);
  }
}