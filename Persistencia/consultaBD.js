import Consulta from "../Modelo/consulta.js";
import conectar from "./conexao.js";
import Cliente from "../Modelo/cliente.js";
import Funcionario from "../Modelo/funcionario.js";
import Animal from "../Modelo/animal.js";
import Especie from "../Modelo/especie.js";
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
    const sql = `SELECT *, 
                  cli.nome AS nome_cliente,
                  cli.sexo AS sexo_cliente, 
                  ani.nome AS nome_animal, 
                  ani.sexo AS sexo_animal, 
                  esp.nome AS nome_especie

              FROM consultas AS con 
              INNER JOIN clientes AS cli ON con.clienteCPF = cli.cpf
              INNER JOIN animais AS ani ON con.animalID = ani.codigo
              INNER JOIN especie AS esp ON ani.especie = esp.codigo;
   `;
    //   const sql = `SELECT * FROM consultas as con inner join clientes as cli inner join animais as ani inner join especie as esp on ani.especie = esp.codigo and cli.cpf = con.clienteCPF ;;
    //  `;
    // const sqlAnimal =
    //   "select * from animais as ani inner join especie as esp on ani.especie = esp.codigo";
    const listaConsultas = [];
    let listaFuncionarios = [];
    const [rows] = await conexao.query(sql);
    for (const consu of rows) {
      const cliente = new Cliente(
        rows[0]["cpf"],
        rows[0]["nome_cliente"],
        rows[0]["dtNascimento"],
        rows[0]["email"],
        rows[0]["telefone"],
        rows[0]["ocupacao"],
        rows[0]["sexo_cliente"],
        rows[0]["estadoCivil"],
        rows[0]["cep"]
      );
      const especie = new Especie(rows[0]["codigo"], rows[0]["nome_especie"]);
      const animal = new Animal(
        rows[0]["animalID"],
        rows[0]["nome_animal"],
        rows[0]["raca"],
        especie,
        rows[0]["sexo_animal"],
        rows[0]["peso"],
        rows[0]["idade"],
        rows[0]["cor"],
        rows[0]["porte"],
        rows[0]["saude"]
      );
      const consulta = new Consulta(
        rows[0]["codigo"],
        animal,
        cliente,
        listaFuncionarios,
        rows[0]["data"],
        rows[0]["motivo"],
        rows[0]["diagnostico"],
        rows[0]["medicamento"],
        rows[0]["tratamento"],
        rows[0]["observacao"],
        []
      );
      const sqlItems = `SELECT *,
      con.codigo as consulta_codigo
      from consultas as con
      inner join funcionarios as fun
      inner join funcionario_consulta as funcon
      on con.codigo = funcon.consultaCodgio and fun.cpf = funcon.funcionarioCpf 
    `;
      //   const sqlItems = `SELECT * FROM consultas as con INNER JOIN funcionarios as fun INNER JOIN funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = funcon.funcionarioCpf
      //   where con.codigo = ?
      // `;
      //
      const parametros = [consu["codigo"]];
      const [funcForCons] = await conexao.query(sqlItems, parametros);
      for (const funci in funcForCons) {
        listaFuncionarios.push(
          new Funcionario(
            funcForCons[funci]["cpf"],
            funcForCons[funci]["nome"],
            funcForCons[funci]["dataNascimento"],
            funcForCons[funci]["funcao"],
            funcForCons[funci]["setor"],
            funcForCons[funci]["email"],
            funcForCons[funci]["telefone"],
            funcForCons[funci]["ocupacao"],
            funcForCons[funci]["estadoCivil"],
            funcForCons[funci]["cep"],
            funcForCons[funci]["dataContratacao"],
            funcForCons[funci]["sexo"]
          )
        );
      }
      console.log(listaFuncionarios);
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
          consulta.clienteCPF.cpf,
          consulta.funcionarioCPF[0].cpf,
          consulta.data,
          consulta.motivo,
          consulta.diagnostico,
          consulta.medicamento,
          consulta.tratamento,
          consulta.observacao,
        ];
        await conexao.query(sql, valores);

        for (let funcionario of consulta.funcionarioCPF) {
          const sql2 =
            "insert into funcionario_consulta(funcionarioCpf,consultaCodgio) values(?,?)";
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
  async alterar(consulta) {
    const conexao = await conectar();
    if (consulta instanceof Consulta) {
      for (let funcionario of consulta.funcionarioCPF) {
        const sql2 =
          "insert into funcionario_consulta(funcionarioCpf,consultaCodgio) values(?,?)";
        const parametros = [funcionario.cpf, consulta.codigo];
        await conexao.query(sql2, parametros);
      }

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
