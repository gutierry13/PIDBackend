import Animal from "../Modelo/animal.js";
import { v4 as uuidV4 } from "uuid";
import Especie from "../Modelo/especie.js";
export default class AnimalControle {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      let { nome, raca, especie, sexo, peso, idade, cor, porte, saude } =
        req.body;
      const { codigo } = especie;
      const especieConstrutor = new Especie("", "").consultarCodigo(codigo);
      console.log(especieConstrutor);
      if (
        nome &&
        raca &&
        especie &&
        sexo &&
        peso &&
        idade &&
        cor &&
        porte &&
        saude
      ) {
        const codigoUUID = uuidV4().slice(0, 16);
        const animal = new Animal(
          codigoUUID,
          nome,
          raca,
          especie,
          sexo,
          peso,
          idade,
          cor,
          porte,
          saude
        );
        animal
          .gravar()
          .then(() => {
            if (especieConstrutor) {
              res.status(200).json({
                status: true,
                mensagem: "Animal gravado com sucesso!",
              });
            } else {
              res.json({
                status: false,
                mensagem: "Especie inexistente",
              });
            }
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
          mensagem: "Informe adequadamente os dados do animal",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou animal fora do formato JSON",
      });
    }
  }

  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const {
        codigo,
        nome,
        raca,
        especie,
        sexo,
        peso,
        idade,
        cor,
        porte,
        saude,
      } = req.body;
      const codigoEspecie = especie.codigo;
      const especieConstrutor = new Especie("", "").consultarCodigo(
        codigoEspecie
      );
      if (
        codigo &&
        nome &&
        raca &&
        especie &&
        sexo &&
        peso &&
        idade &&
        cor &&
        porte &&
        saude
      ) {
        const animal = new Animal(
          codigo,
          nome,
          raca,
          especie,
          sexo,
          peso,
          idade,
          cor,
          porte,
          saude
        );
        animal
          .atualizar()
          .then(() => {
            if (especieConstrutor) {
              res.status(200).json({
                status: true,
                mensagem: "Animal atualizado com sucesso!",
              });
            } else {
              res.json({
                status: false,
                mensagem: "Especie inexistente",
              });
            }
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
          mensagem: "Informe adequadamente os dados do animal",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou animal fora do formato JSON",
      });
    }
  }

  remover(req, res) {
    res.type("application/json");
    if (req.method === "DELETE" && req.is("application/json")) {
      const codigo = req.body.codigo;
      if (codigo) {
        const animal = new Animal(codigo);
        animal
          .remover()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Animal removido com sucesso!",
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
          mensagem: "Informe o código do animal",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Método não permitido ou animal fora do formato JSON",
      });
    }
  }

  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const animal = new Animal("", "", "", "", "", "", "", "", "", "");
      animal
        .consultar("")
        .then((animais) => {
          res.status(200).json(animais);
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
      const animal = new Animal("", "", "", "", "", "", "", "", "", "");
      animal
        .consultarCodigo(codigo)
        .then((animal) => {
          res.status(200).json(animal);
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
