import Consulta from "../Modelo/consulta.js";
import { v4 as uuidV4 } from "uuid";
import Funcionario from "../Modelo/funcionario.js";
import Cliente from "../Modelo/cliente.js";
import funcionarioConsulta from "../Modelo/funcionarioConsulta.js";
export default class ConsultaControle {
  // gravar(req, res) {
  //   res.type("application/json");
  //   if (req.method === "POST" && req.is("application/json")) {
  //     const {
  //       animalID,
  //       clienteCPF,
  //       funcionarioCPF,
  //       data,
  //       motivo,
  //       diagnostico,
  //       medicamento,
  //       tratamento,
  //       observacao,
  //     } = req.body;
  //     if (
  //       codigo &&
  //       animalID &&
  //       clienteCPF &&
  //       funcionarioCPF &&
  //       data &&
  //       motivo &&
  //       diagnostico &&
  //       medicamento &&
  //       tratamento &&
  //       observacao
  //     ) {
  //       const codigoUUID = uuidV4().slice(0, 16);
  //       const consulta = new Consulta(
  //         codigoUUID,
  //         animalID,
  //         clienteCPF,
  //         funcionarioCPF,
  //         data,
  //         motivo,
  //         diagnostico,
  //         medicamento,
  //         tratamento,
  //         observacao
  //       );
  //       consulta
  //         .gravar()
  //         .then(() => {
  //           res.status(200).json({
  //             status: true,
  //             mensagem: "Consulta gravada com sucesso!",
  //           });
  //         })
  //         .catch((erro) => {
  //           res.status(500).json({
  //             status: false,
  //             mensagem: erro.message,
  //           });
  //         });
  //     } else {
  //       res.status(400).json({
  //         status: false,
  //         mensagem: "Informe adequadamente os dados da consulta",
  //       });
  //     }
  //   } else {
  //     res.status(400).json({
  //       status: false,
  //       mensagem: "Método não permitido ou consulta fora do formato JSON",
  //     });
  //   }
  // }
  gravar(req, res) {
    if (req.method === "POST" && req.is("application/json")) {
      res.type("application/json");
      const dados = req.body;
      const consultaCod = uuidV4().slice(0, 16);
      // const funcionario = new Funcionario(dados.funcionarioCPF.cpf);
      // const cliente = new Cliente(dados.clienteCPF.cpf);
      const funcionarios = dados.funcionarioCPF;
      let listaFuncionarios = [];
      for (const func in funcionarios) {
        // const cliente = new Cliente(
        //   dados.clienteCPF.cpf,
        //   dados.clienteCPF.nome,
        //   dados.clienteCPF.dtNascimento,
        //   dados.clienteCPF.email,
        //   dados.clienteCPF.telefone,
        //   dados.clienteCPF.ocupacao,
        //   dados.clienteCPF.sexo,
        //   dados.clienteCPF.estadoCivil,
        //   dados.clienteCPF.cep
        // );
        // const funcionario = new Funcionario(
        //   dados.funcionarioCPF.cpf,
        //   dados.funcionarioCPF.nome,
        //   dados.funcionarioCPF.dataNascimento,
        //   dados.funcionarioCPF.funcao,
        //   dados.funcionarioCPF.setor,
        //   dados.funcionarioCPF.email,
        //   dados.funcionarioCPF.telefone,
        //   dados.funcionarioCPF.ocupacao,
        //   dados.funcionarioCPF.estadoCivil,
        //   dados.funcionarioCPF.cep,
        //   dados.funcionarioCPF.dataContratacao,
        //   dados.funcionarioCPF.sexo
        // );
        const funcConsulta = new funcionarioConsulta(
          dados.funcionarioCPF,
          consultaCod
        );
        listaFuncionarios.push(funcionario);
      }
      const consulta = new Consulta(consultaCod, cliente, listaFuncionarios);
      consulta
        .gravar()
        .then(() => {
          res.status(200).json({
            status: true,
            mensagem: "Consulta gravada com sucesso!",
          });
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou consulta fora do formato JSON",
      });
    }
  }
  remover(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const codigo = req.body.codigo;
      if (codigo) {
        const consulta = new Consulta(codigo);
        consulta
          .remover()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Consulta removida com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Informe o código da consulta",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou consulta fora do formato JSON",
      });
    }
  }
  // consultar(req, res) {
  // res.type("application/json");
  //   if (req.method === "GET") {
  //     const codigo = req.body.codigo;
  //     const consulta = new Consulta(codigo);
  //     if (codigo) {
  //       consulta
  //         .consultarCodigo(codigo)
  //         .then((consultas) => {
  //           res.status(200).json(consultas);
  //         })
  //         .catch((erro) => {
  //           res.status(500).json({
  //             status: false,
  //             mensagem: erro.message,
  //           });
  //         });
  //     } else {
  //       res.status(400).json({
  //         status: false,
  //         mensagem: "Informe o código da consulta",
  //       });
  //     }
  //   } else {
  //     res.status(400).json({
  //       status: false,
  //       mensagem: "Método não permitido ou consulta fora do formato JSON",
  //     });
  //   }
  // }
  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const consulta = new Consulta("", "", "", "", "", "", "", "", "", "");
      consulta
        .consultar("")
        .then((consultas) => {
          res.status(200).json(consultas);
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido",
      });
    }
  }
  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const {
        codigo,
        animalID,
        clienteCPF,
        funcionarioCPF,
        data,
        motivo,
        diagnostico,
        medicamento,
        tratamento,
        observacao,
      } = req.body;
      if (
        codigo &&
        animalID &&
        clienteCPF &&
        funcionarioCPF &&
        data &&
        motivo &&
        diagnostico &&
        medicamento &&
        tratamento &&
        observacao
      ) {
        const consulta = new Consulta(
          codigo,
          animalID,
          clienteCPF,
          funcionarioCPF,
          data,
          motivo,
          diagnostico,
          medicamento,
          tratamento,
          observacao
        );
        consulta
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Consulta atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Informe adequadamente os dados da consulta",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou consulta fora do formato JSON",
      });
    }
  }
  consultarPorCodigo(req, res) {
    res.type("application/json");
    const codigo = req.params["codigo"];
    if (req.method === "GET") {
      const consulta = new Consulta("", "", "", "", "", "", "", "", "", "");
      consulta
        .consultarCodigo(codigo)
        .then((consulta) => {
          res.status(200).json(consulta);
        })
        .catch((erro) => {
          res.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido",
      });
    }
  }
}
