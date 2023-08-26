import ClienteBD from '../Persistencia/clienteBD.js'

export default class Cliente {
  #cpf
  #nome
  #dtNascimento
  #email
  #telefone
  #ocupacao
  #sexo
  #estadoCivil
  #cep
  constructor(
    cpf,
    nome,
    dtNascimento,
    email,
    telefone,
    ocupacao,
    sexo,
    estadoCivil,
    cep
  ) {
    this.#cpf = cpf
    this.#nome = nome
    this.#dtNascimento = dtNascimento
    this.#email = email
    this.#telefone = telefone
    this.#ocupacao = ocupacao
    this.#sexo = sexo
    this.#estadoCivil = estadoCivil
    this.#cep = cep
  }
  get cpf() {
    return this.#cpf
  }
  set cpf(novoCpf) {
    this.#cpf = novoCpf
  }
  get nome() {
    return this.#nome
  }
  set nome(novoNome) {
    this.#nome = novoNome
  }
  get dtNascimento() {
    return this.#dtNascimento
  }
  set dtNascimento(novoDtNascimento) {
    this.#dtNascimento = novoDtNascimento
  }
  get email() {
    return this.#email
  }
  set email(novoEmail) {
    this.#email = novoEmail
  }
  get telefone() {
    return this.#telefone
  }
  set telefone(novoTelefone) {
    this.#telefone = novoTelefone
  }
  get ocupacao() {
    return this.#ocupacao
  }
  set ocupacao(novaOcupacao) {
    this.#ocupacao = novaOcupacao
  }
  get sexo() {
    return this.#sexo
  }
  set sexo(novoSexo) {
    this.#sexo = novoSexo
  }
  get estadoCivil() {
    return this.#estadoCivil
  }
  set estadoCivil(novoEstadoCivil) {
    this.#estadoCivil = novoEstadoCivil
  }
  get cep() {
    return this.#cep
  }
  set cep(novoCep) {
    this.#cep = novoCep
  }
  toJSON() {
    return {
      cpf: this.#cpf,
      nome: this.#nome,
      dtNascimento: this.#dtNascimento,
      email: this.#email,
      telefone: this.#telefone,
      ocupacao: this.#ocupacao,
      sexo: this.#sexo,
      estadoCivil: this.#estadoCivil,
      cep: this.#cep
    }
  }
  async gravar() {
    const clienteBD = new ClienteBD()
    await clienteBD.incluir(this)
  }
  async atualizar() {
    const clienteBD = new ClienteBD()
    await clienteBD.alterar(this)
  }
  async remover() {
    const clienteBD = new ClienteBD()
    await clienteBD.excluir(this)
  }
  async consultar(termo) {
    const clienteBD = new ClienteBD()
    const clientes = await clienteBD.consultar(termo)
    return clientes
  }
  async consultarCPF(cpf) {
    const clienteBD = new ClienteBD()
    const clientes = await clienteBD.consultarCPF(cpf)
    return clientes
  }
}
