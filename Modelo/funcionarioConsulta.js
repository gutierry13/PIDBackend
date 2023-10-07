export default class funcionarioConsulta {
  #funcionarioCpf;
  #consultaCodigo;
  constructor(funcionarioCpf, consultaCodigo) {
    this.#funcionarioCpf = funcionarioCpf;
    this.#consultaCodigo = consultaCodigo;
  }
  get funcionarioCpf() {
    return this.#funcionarioCpf;
  }
  set funcionarioCpf(novoFuncionarioCpf) {
    this.#funcionarioCpf = novoFuncionarioCpf;
  }
  get consultaCodigo() {
    return this.#consultaCodigo;
  }

  set consultaCodigo(novaConsultaCodigo) {
    this.#consultaCodigo = novaConsultaCodigo;
  }
  toJSON() {
    return {
      funcionarioCpf: this.#funcionarioCpf,
      consultaCodigo: this.#consultaCodigo,
    };
  }
}
