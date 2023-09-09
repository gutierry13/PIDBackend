import Especie from "../Modelo/especie.js";
import { v4 as uuidV4 } from "uuid";
export default class EspecieControle {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      let { nome } = req.body;
      if (nome) {
        const codigo = uuidV4().slice(0, 8);
        const especie = new Especie(codigo, nome);
        especie
          .gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Especie gravado com sucesso!",
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
          mensagem: "Informe adequadamente os dados do especie",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou especie fora do formato JSON",
      });
    }
  }

  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const { codigo, nome } = req.body;
      if (codigo && nome) {
        const especie = new Especie(codigo, nome);
        especie
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Especie atualizado com sucesso!",
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
          mensagem: "Informe adequadamente os dados do especie",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou especie fora do formato JSON",
      });
    }
  }

  remover(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const codigo = req.body.codigo;
      if (codigo) {
        const especie = new Especie(codigo);
        especie
          .remover()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Especie removido com sucesso!",
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
          mensagem: "Informe o código do especie",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou especie fora do formato JSON",
      });
    }
  }

  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const especie = new Especie("", "");
      especie
        .consultar("")
        .then((especies) => {
          res.status(200).json(especies);
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

  consultarPeloCodigo(req, res) {
    res.type("application/json");
    const codigo = req.params["codigo"];
    if (req.method === "GET") {
      const especie = new Especie("", "");
      especie
        .consultarCodigo(codigo)
        .then((especie) => {
          res.status(200).json(especie);
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
