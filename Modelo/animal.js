import AnimalBD from "../Persistencia/animalBD.js";

export default class Animal {
  #codigo;
  #nome;
  #raca;
  #especie;
  #sexo;
  #peso;
  #idade;
  #cor;
  #porte;
  #saude;

  constructor(
    codigo,
    nome,
    raca,
    especie = {},
    sexo,
    peso,
    idade,
    cor,
    porte,
    saude
  ) {
    this.#codigo = codigo;
    this.#nome = nome;
    this.#raca = raca;
    this.#especie = especie;
    this.#sexo = sexo;
    this.#peso = peso;
    this.#idade = idade;
    this.#cor = cor;
    this.#porte = porte;
    this.#saude = saude;
  }

  get codigo() {
    return this.#codigo;
  }
  set codigo(novoCodigo) {
    this.#codigo = novoCodigo;
  }

  get nome() {
    return this.#nome;
  }
  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get raca() {
    return this.#raca;
  }
  set raca(novaRaca) {
    this.#raca = novaRaca;
  }

  get especie() {
    return this.#especie;
  }
  set especie(novaEspecie) {
    this.#especie = novaEspecie;
  }

  get sexo() {
    return this.#sexo;
  }
  set sexo(novoSexo) {
    this.#sexo = novoSexo;
  }

  get peso() {
    return this.#peso;
  }
  set peso(novoPeso) {
    this.#peso = novoPeso;
  }

  get idade() {
    return this.#idade;
  }
  set idade(novaIdade) {
    this.#idade = novaIdade;
  }

  get cor() {
    return this.#cor;
  }
  set cor(novaCor) {
    this.#cor = novaCor;
  }

  get porte() {
    return this.#porte;
  }
  set porte(novoPorte) {
    this.#porte = novoPorte;
  }
  get saude() {
    return this.#saude;
  }
  set saude(novaSaude) {
    this.#saude = novaSaude;
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      nome: this.#nome,
      raca: this.#raca,
      especie: this.#especie,
      sexo: this.#sexo,
      peso: this.#peso,
      idade: this.#idade,
      cor: this.#cor,
      porte: this.#porte,
      saude: this.#saude,
    };
  }

  async gravar() {
    const animalBD = new AnimalBD();
    await animalBD.incluir(this);
  }

  async atualizar() {
    const animalBD = new AnimalBD();
    await animalBD.alterar(this);
  }

  async remover() {
    const animalBD = new AnimalBD();
    await animalBD.excluir(this);
  }

  async consultar(termo) {
    const animalBD = new AnimalBD();
    const animais = await animalBD.consultar(termo);
    return animais;
  }

  async consultarCodigo(codigo) {
    const animalBD = new AnimalBD();
    const animais = await animalBD.consultarCodigo(codigo);
    return animais;
  }
}
