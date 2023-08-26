import Adocao from "../Modelo/adocao.js";
import { v4 as uuidV4 } from "uuid";

export default class AdocaoControle {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const { cpfCliente, codigoAnimal, data, termos, status, documentos } =
        req.body;
      if (
        cpfCliente &&
        codigoAnimal &&
        data &&
        termos &&
        status 
        
      ) {
        const codigo = uuidV4().slice(0, 16);
        const adocao = new Adocao(
          codigo,
          cpfCliente,
          codigoAnimal,
          data,
          termos,
          status,
          documentos
        );
        adocao
          .gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Adoção gravada com sucesso!",
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
          mensagem: "Informe adequadamente os dados da adoção",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou adoção fora do formato JSON",
      });
    }
  }
  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const {codigo, cpfCliente, codigoAnimal, data, termos, status, documentos } =
        req.body;
      if (
        codigo &&
        cpfCliente &&
        codigoAnimal &&
        data &&
        termos &&
        status &&
        documentos
      ) {
        const adocao = new Adocao(
          codigo,
          cpfCliente,
          codigoAnimal,
          data,
          termos,
          status,
          documentos
        );
        adocao
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Adoção atualizada com sucesso!",
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
          mensagem: "Informe adequadamente os dados da adoção",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou adoção fora do formato JSON",
      });
    }
  }

  remover(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const codigo = req.body.codigo;
      if (codigo) {
        const adocao = new Adocao(codigo);
        adocao
          .remover()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Adoção removida com sucesso!",
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
          mensagem: "Informe o código da adoção",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou adoção fora do formato JSON",
      });
    }
  }

  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const adocao = new Adocao("", "", "", "", "", ""); // Preencha com valores vazios equivalentes aos atributos do seu modelo
      adocao
        .consultar("")
        .then((adocoes) => {
          res.status(200).json(adocoes);
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
      const adocao = new Adocao("", "", "", "", "", ""); // Preencha com valores vazios equivalentes aos atributos do seu modelo
      adocao
        .consultarCodigo(codigo)
        .then((adocao) => {
          res.status(200).json(adocao);
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
