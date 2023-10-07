import ConsultaBD from "../Persistencia/consultaBD.js";

export default class Consulta {
  #codigo;
  #animalID;
  #clienteCPF;
  #funcionarioCPF;
  #data;
  #motivo;
  #diagnostico;
  #medicamento;
  #tratamento;
  #observacao;

  constructor(
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
  ) {
    this.#codigo = codigo;
    this.#animalID = animalID;
    this.#clienteCPF = clienteCPF;
    this.#funcionarioCPF = funcionarioCPF;
    this.#data = data;
    this.#motivo = motivo;
    this.#diagnostico = diagnostico;
    this.#medicamento = medicamento;
    this.#tratamento = tratamento;
    this.#observacao = observacao;
  }

  get codigo() {
    return this.#codigo;
  }
  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get animalID() {
    return this.#animalID;
  }
  set animalID(novoAnimalID) {
    this.#animalID = novoAnimalID;
  }

  get clienteCPF() {
    return this.#clienteCPF;
  }
  set clienteCPF(novoConsultaCPF) {
    this.#clienteCPF = novoConsultaCPF;
  }

  get funcionarioCPF() {
    return this.#funcionarioCPF;
  }
  set funcionarioCPF(novoFuncionarioCPF) {
    this.#funcionarioCPF = novoFuncionarioCPF;
  }

  get data() {
    return this.#data;
  }
  set data(novaData) {
    this.#data = novaData;
  }

  get motivo() {
    return this.#motivo;
  }
  set motivo(novoMotivo) {
    this.#motivo = novoMotivo;
  }

  get diagnostico() {
    return this.#diagnostico;
  }
  set diagnostico(novoDiagnostico) {
    this.#diagnostico = novoDiagnostico;
  }

  get medicamento() {
    return this.#medicamento;
  }
  set medicamento(novoMedicamento) {
    this.#medicamento = novoMedicamento;
  }

  get tratamento() {
    return this.#tratamento;
  }
  set tratamento(novoTratamento) {
    this.#tratamento = novoTratamento;
  }

  get observacao() {
    return this.#observacao;
  }
  set observacao(novaObservacao) {
    this.#observacao = novaObservacao;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      animalID: this.#animalID,
      clienteCPF: this.#clienteCPF,
      funcionarioCPF: this.#funcionarioCPF,
      data: this.#data,
      motivo: this.#motivo,
      diagnostico: this.#diagnostico,
      medicamento: this.#medicamento,
      tratamento: this.#tratamento,
      observacao: this.#observacao,
    };
  }

  async gravar() {
    const consultaBD = new ConsultaBD();
    await consultaBD.incluir(this);
  }

  async atualizar() {
    const consultaBD = new ConsultaBD();
    await consultaBD.alterar(this);
  }

  async remover() {
    const consultaBD = new ConsultaBD();
    await consultaBD.excluir(this);
  }

  async consultar(termo) {
    const consultaBD = new ConsultaBD();
    const consultas = await consultaBD.consultar(termo);
    return consultas;
  }

  async consultarCodigo(codigo) {
    const consultaBD = new ConsultaBD();
    const consulta = await consultaBD.consultarPorCodigo(codigo);
    return consulta;
  }
}
