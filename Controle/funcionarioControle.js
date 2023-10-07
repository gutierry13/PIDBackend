import Funcionario from "../Modelo/funcionario.js";

export default class FuncionarioControle {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const {
        cpf,
        nome,
        dataNascimento,
        funcao,
        setor,
        email,
        telefone,
        ocupacao,
        estadoCivil,
        cep,
        dataContratacao,
        sexo,
      } = req.body;
      if (
        cpf &&
        nome &&
        dataNascimento &&
        funcao &&
        setor &&
        email &&
        telefone &&
        ocupacao &&
        estadoCivil &&
        cep &&
        dataContratacao &&
        sexo
      ) {
        const funcionario = new Funcionario(
          cpf,
          nome,
          dataNascimento,
          funcao,
          setor,
          email,
          telefone,
          ocupacao,
          estadoCivil,
          cep,
          dataContratacao,
          sexo
        );
        funcionario
          .gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Funcionário gravado com sucesso!",
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
          mensagem: "Informe adequadamente os dados do funcionário",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou funcionário fora do formato JSON",
      });
    }
  }
  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const {
        cpf,
        nome,
        dataNascimento,
        funcao,
        setor,
        email,
        telefone,
        ocupacao,
        estadoCivil,
        cep,
        dataContratacao,
        sexo,
      } = req.body;
      if (
        cpf &&
        nome &&
        dataNascimento &&
        funcao &&
        setor &&
        email &&
        telefone &&
        ocupacao &&
        estadoCivil &&
        cep &&
        dataContratacao &&
        sexo
      ) {
        const funcionario = new Funcionario(
          cpf,
          nome,
          dataNascimento,
          funcao,
          setor,
          email,
          telefone,
          ocupacao,
          estadoCivil,
          cep,
          dataContratacao,
          sexo
        );
        funcionario
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Funcionário atualizado com sucesso!",
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
          mensagem: "Informe adequadamente os dados do funcionário",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou funcionário fora do formato JSON",
      });
    }
  }

  remover(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const cpf = req.body.cpf;
      if (cpf) {
        const funcionario = new Funcionario(cpf);
        funcionario
          .remover()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Funcionário removido com sucesso!",
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
          mensagem: "Informe o CPF do funcionário",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou funcionário fora do formato JSON",
      });
    }
  }

  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const funcionario = new Funcionario(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      );
      funcionario
        .consultar("")
        .then((funcionarios) => {
          res.status(200).json(funcionarios);
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

  consultarPeloCPF(req, res) {
    res.type("application/json");
    const cpf = req.params["cpf"];
    if (req.method === "GET") {
      const funcionario = new Funcionario(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      );
      funcionario
        .consultarCPF(cpf)
        .then((funcionario) => {
          res.status(200).json(funcionario);
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
