import FuncionarioBD from "../Persistencia/funcionarioBD.js";

export default class Funcionario {
  #cpf;
  #nome;
  #dataNascimento;
  #funcao;
  #setor;
  #email;
  #telefone;
  #ocupacao;
  #estadoCivil;
  #cep;
  #dataContratacao;
  #sexo;

  constructor(
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
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#dataNascimento = dataNascimento;
    this.#funcao = funcao;
    this.#setor = setor;
    this.#email = email;
    this.#telefone = telefone;
    this.#ocupacao = ocupacao;
    this.#estadoCivil = estadoCivil;
    this.#cep = cep;
    this.#dataContratacao = dataContratacao;
    this.#sexo = sexo;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }

  set dataNascimento(novaDataNascimento) {
    this.#dataNascimento = novaDataNascimento;
  }

  get funcao() {
    return this.#funcao;
  }

  set funcao(novaFuncao) {
    this.#funcao = novaFuncao;
  }

  get setor() {
    return this.#setor;
  }

  set setor(novoSetor) {
    this.#setor = novoSetor;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  get ocupacao() {
    return this.#ocupacao;
  }

  set ocupacao(novaOcupacao) {
    this.#ocupacao = novaOcupacao;
  }

  get estadoCivil() {
    return this.#estadoCivil;
  }

  set estadoCivil(novoEstadoCivil) {
    this.#estadoCivil = novoEstadoCivil;
  }

  get cep() {
    return this.#cep;
  }

  set cep(novoCep) {
    this.#cep = novoCep;
  }

  get dataContratacao() {
    return this.#dataContratacao;
  }

  set dataContratacao(novaDataContratacao) {
    this.#dataContratacao = novaDataContratacao;
  }

  get sexo() {
    return this.#sexo;
  }

  set sexo(novoSexo) {
    this.#sexo = novoSexo;
  }

  toJSON() {
    return {
      cpf: this.#cpf,
      nome: this.#nome,
      dataNascimento: this.#dataNascimento,
      funcao: this.#funcao,
      setor: this.#setor,
      email: this.#email,
      telefone: this.#telefone,
      ocupacao: this.#ocupacao,
      estadoCivil: this.#estadoCivil,
      cep: this.#cep,
      dataContratacao: this.#dataContratacao,
      sexo: this.#sexo,
    };
  }

  async gravar() {
    const funcionarioBD = new FuncionarioBD();
    await funcionarioBD.incluir(this);
  }

  async atualizar() {
    const funcionarioBD = new FuncionarioBD();
    await funcionarioBD.alterar(this);
  }

  async remover() {
    const funcionarioBD = new FuncionarioBD();
    await funcionarioBD.excluir(this);
  }

  async consultar(termo) {
    const funcionarioBD = new FuncionarioBD();
    const funcionarios = await funcionarioBD.consultar(termo);
    return funcionarios;
  }

  async consultarCPF(cpf) {
    const funcionarioBD = new FuncionarioBD();
    const funcionarios = await funcionarioBD.consultarCPF(cpf);
    return funcionarios;
  }
}
