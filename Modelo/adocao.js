import AdocaoBD from '../Persistencia/adocaoBD.js';

export default class Adocao {
  #cpfCliente;
  #codigoAnimal;
  #data;
  #termos;
  #status;
  #documentos;

  constructor(cpfCliente, codigoAnimal, data, termos, status, documentos) {
    this.#cpfCliente = cpfCliente;
    this.#codigoAnimal = codigoAnimal;
    this.#data = data;
    this.#termos = termos;
    this.#status = status;
    this.#documentos = documentos;
  }

  get cpfCliente() {
    return this.#cpfCliente;
  }
  set cpfCliente(novoCPF) {
    this.#cpfCliente = novoCPF;
  }

  get codigoAnimal() {
    return this.#codigoAnimal;
  }
  set codigoAnimal(novoCodigo) {
    this.#codigoAnimal = novoCodigo;
  }

  get data() {
    return this.#data;
  }
  set data(novaData) {
    this.#data = novaData;
  }

  get termos() {
    return this.#termos;
  }
  set termos(novosTermos) {
    this.#termos = novosTermos;
  }

  get status() {
    return this.#status;
  }
  set status(novoStatus) {
    this.#status = novoStatus;
  }

  get documentos() {
    return this.#documentos;
  }
  set documentos(novosDocumentos) {
    this.#documentos = novosDocumentos;
  }

  toJSON() {
    return {
      cpfCliente: this.#cpfCliente,
      codigoAnimal: this.#codigoAnimal,
      data: this.#data,
      termos: this.#termos,
      status: this.#status,
      documentos: this.#documentos,
    };
  }

  async gravar() {
    const adocaoBD = new AdocaoBD();
    await adocaoBD.incluir(this);
  }

  async atualizar() {
    const adocaoBD = new AdocaoBD();
    await adocaoBD.alterar(this);
  }

  async remover() {
    const adocaoBD = new AdocaoBD();
    await adocaoBD.excluir(this);
  }

  async consultar(termo) {
    const adocaoBD = new AdocaoBD();
    const adocoes = await adocaoBD.consultar(termo);
    return adocoes;
  }

  async consultarCodigo(codigo) {
    const adocaoBD = new AdocaoBD();
    const adocoes = await adocaoBD.consultarCodigo(codigo);
    return adocoes;
  }
}
