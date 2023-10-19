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
    const sql = `SELECT
    con.*, 
    cli.nome AS nome_cliente,
    cli.cep AS cep,
    cli.cpf AS cpf,
    cli.dtNascimento AS dtNascimento,
    cli.email AS email,
    cli.telefone AS telefone,
    cli.ocupacao AS ocupacao,
    cli.sexo AS sexo_cliente, 
    cli.estadoCivil AS estadoCivil, 
    ani.codigo AS codigo_animal, 
    ani.nome AS nome_animal, 
    ani.raca AS raca, 
    ani.especie AS especie, 
    ani.sexo AS sexo_animal, 
    ani.peso AS peso, 
    ani.idade AS idade, 
    ani.cor AS cor, 
    ani.porte AS porte, 
    ani.saude AS saude, 
    esp.nome AS nome_especie,
    esp.codigo AS especie_codigo
FROM consultas AS con 
INNER JOIN clientes AS cli 
INNER JOIN animais AS ani 
INNER JOIN especie AS esp ON ani.especie = esp.codigo and con.clienteCPF = cli.cpf and con.animalID = ani.codigo
   `;
    //  SELECT *,
    //                 cli.nome AS nome_cliente,
    //                 cli.sexo AS sexo_cliente,
    //                 ani.nome AS nome_animal,
    //                 ani.sexo AS sexo_animal,
    //                 esp.nome AS nome_especie
    //             FROM consultas AS con
    //             INNER JOIN clientes AS cli ON con.clienteCPF = cli.cpf
    //             INNER JOIN animais AS ani ON con.animalID = ani.codigo
    //             INNER JOIN especie AS esp ON ani.especie = esp.codigo;
    //   const sql = `SELECT * FROM consultas as con inner join clientes as cli inner join animais as ani inner join especie as esp on ani.especie = esp.codigo and cli.cpf = con.clienteCPF ;;
    //  `;
    // const sqlAnimal =
    //   "select * from animais as ani inner join especie as esp on ani.especie = esp.codigo";
    const listaConsultas = [];
    const [rows] = await conexao.query(sql);
    for (const consu of rows) {
      let listaFuncionarios = [];
      const cliente = new Cliente(
        consu["cpf"],
        consu["nome_cliente"],
        consu["dtNascimento"],
        consu["email"],
        consu["telefone"],
        consu["ocupacao"],
        consu["sexo_cliente"],
        consu["estadoCivil"],
        consu["cep"]
      );
      const especie = new Especie(consu["codigo"], consu["nome_especie"]);
      const animal = new Animal(
        consu["animalID"],
        consu["nome_animal"],
        consu["raca"],
        especie,
        consu["sexo_animal"],
        consu["peso"],
        consu["idade"],
        consu["cor"],
        consu["porte"],
        consu["saude"]
      );
      const consulta = new Consulta(
        consu["codigo"],
        animal,
        cliente,
        listaFuncionarios,
        consu["data"],
        consu["motivo"],
        consu["diagnostico"],
        consu["medicamento"],
        consu["tratamento"],
        consu["observacao"],
        []
      );
      const sqlItems = `SELECT *, con.codigo as consulta_codigo from consultas as con inner join funcionarios as fun inner join funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = funcon.funcionarioCpf where funcon.consultaCodgio = ?;
    `;
      //   const sqlItems = `SELECT * FROM consultas as con INNER JOIN funcionarios as fun INNER JOIN funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = funcon.funcionarioCpf
      //   where con.codigo = ?
      // `;
      //
      const parametros = [consu["codigo"]];
      const [funcForCons] = await conexao.query(sqlItems, parametros);
      for (const funci in funcForCons) {
        const newFunc = new Funcionario(
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
        );
        listaFuncionarios.push(newFunc);
      }
      // consulta.funcionarioCPF = listaFuncionarios;
      listaConsultas.push(consulta);
    }
    global.poolConexoes.releaseConnection(conexao);
    return listaConsultas;
  }
  async consultarPorCodigo(codigo) {
    const conexao = await conectar();
    const sql = `SELECT DISTINCT
    con.*, 
    cli.nome AS nome_cliente,
    cli.cep AS cep,
    cli.cpf AS cpf,
    cli.dtNascimento AS dtNascimento,
    cli.email AS email,
    cli.telefone AS telefone,
    cli.ocupacao AS ocupacao,
    cli.sexo AS sexo_cliente, 
    cli.estadoCivil AS estadoCivil, 
    ani.codigo AS codigo_animal, 
    ani.nome AS nome_animal, 
    ani.raca AS raca, 
    ani.especie AS especie, 
    ani.sexo AS sexo_animal, 
    ani.peso AS peso, 
    ani.idade AS idade, 
    ani.cor AS cor, 
    ani.porte AS porte, 
    ani.saude AS saude, 
    esp.nome AS nome_especie,
    esp.codigo AS especie_codigo
FROM consultas AS con 
INNER JOIN clientes AS cli 
INNER JOIN animais AS ani 
INNER JOIN funcionario_consulta AS funcon
INNER JOIN especie AS esp 
INNER JOIN funcionarios AS fun ON
con.codigo = funcon.consultaCodgio and 
con.animalID = ani.codigo and 
ani.especie = esp.codigo and 
con.clienteCPF = cli.cpf and 
fun.cpf = funcon.funcionarioCpf 
where funcon.consultaCodgio  like '%${codigo}%'  or con.animalID like '%${codigo}%' or con.clienteCPF like '%${codigo}%' or funcon.funcionarioCpf like '%${codigo}%'
`;
    //   const sql = `SELECT * FROM consultas as con inner join clientes as cli on cli.cpf = con.clienteCPF inner join funcionario_consulta as funcon inner join especie as esp where con.codigo like '%${codigo}%'  or con.animalID like '%${codigo}%' or con.clienteCPF like '%${codigo}%' or funcon.funcionarioCpf like '%${codigo}%';
    //  `;
    //   const sql = `SELECT * FROM consultas as con inner join clientes as cli on cli.cpf = con.clienteCPF where con.codigo = ?;
    //  `;
    const listaConsultas = [];
    const [rows] = await conexao.query(sql, [codigo]);
    for (const consu of rows) {
      let listaFuncionarios = [];
      const cliente = new Cliente(
        consu["cpf"],
        consu["nome"],
        consu["dtNascimento"],
        consu["email"],
        consu["telefone"],
        consu["ocupacao"],
        consu["sexo"],
        consu["estadoCivil"],
        consu["cep"]
      );
      const especie = new Especie(consu["codigo"], consu["nome_especie"]);
      const animal = new Animal(
        consu["animalID"],
        consu["nome_animal"],
        consu["raca"],
        especie,
        consu["sexo_animal"],
        consu["peso"],
        consu["idade"],
        consu["cor"],
        consu["porte"],
        consu["saude"]
      );
      const consulta = new Consulta(
        consu["codigo"],
        animal,
        cliente,
        listaFuncionarios,
        consu["data"],
        consu["motivo"],
        consu["diagnostico"],
        consu["medicamento"],
        consu["tratamento"],
        consu["observacao"],
        []
      );
      const sqlItems = `SELECT *, con.codigo as consulta_codigo from consultas as con inner join funcionarios as fun inner join funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = funcon.funcionarioCpf where funcon.consultaCodgio = ?;`;
      //   const sqlItems = `SELECT * FROM consultas as con INNER JOIN animais as ani INNER JOIN funcionarios as fun INNER JOIN funcionario_consulta as funcon on con.codigo = funcon.consultaCodgio and fun.cpf = con.funcionarioCPF and ani.codigo = con.animalID
      //   where con.codigo = ?
      // `;
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
      consulta.funcionarioCPF = listaFuncionarios;
      listaConsultas.push(consulta);
    }
    global.poolConexoes.releaseConnection(conexao);
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
  // async consultarComFuncionario(codigoConsulta) {
  //   const conexao = await conectar();
  //   const sql = `
  //     SELECT
  //       c.codigo,
  //       c.animalID,
  //       c.clienteCPF,
  //       c.data,
  //       c.motivo,
  //       c.medicamento,
  //       c.diagnostico,
  //       c.tratamento,
  //       c.observacao,
  //       f.nome AS funcionario_nome,
  //       f.cpf AS funcionario_cpf,
  //       f.funcao AS funcionario_funcao,
  //       f.setor AS funcionario_setor,
  //       f.ocupacao AS funcionario_ocupacao
  //     FROM consultas c
  //     INNER JOIN funcionario f ON c.funcionarioCPF = f.cpf
  //     WHERE c.codigo = ?`;

  //   const valores = [codigoConsulta];
  //   const [rows] = await conexao.query(sql, valores);
  //   global.poolConexoes.releaseConnection(conexao);

  //   if (rows.length > 0) {
  //     // Crie o objeto JSON personalizado
  //     const row = rows[0];
  //     const consulta = {
  //       codigo: row["codigo"],
  //       animalID: row["animalID"],
  //       clienteCPF: row["clienteCPF"],
  //       data: row["data"],
  //       motivo: row["motivo"],
  //       medicamento: row["medicamento"],
  //       diagnostico: row["diagnostico"],
  //       tratamento: row["tratamento"],
  //       observacao: row["observacao"],
  //       funcionario: {
  //         nome: row["funcionario_nome"],
  //         cpf: row["funcionario_cpf"],
  //         funcao: row["funcionario_funcao"],
  //         setor: row["funcionario_setor"],
  //         ocupacao: row["funcionario_ocupacao"],
  //       },
  //     };
  //     return consulta;
  //   } else {
  //     return null; // Consulta não encontrada
  //   }
  // }
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

  async excluir(consulta) {
    const conexao = await conectar();
    const { codigo } = consulta;
    // console.log(codigo);
    const sql = "DELETE FROM funcionario_consulta WHERE consultaCodgio=?";
    const valores = [codigo];
    await conexao.query(sql, valores);
    const sql2 = "DELETE FROM consultas WHERE codigo=?";
    const val = [codigo];
    await conexao.query(sql2, val);
    global.poolConexoes.releaseConnection(conexao);
  }
}
