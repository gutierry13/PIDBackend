import EspecieBD from '../Persistencia/especieBD.js'

export default class Especie {
  #codigo
  #nome

  constructor(
    codigo,
    nome,
  ) {
    this.#codigo = codigo
    this.#nome = nome
  }

  get codigo() {
    return this.#codigo
  }
  set codigo(novoCodigo) {
    this.#codigo = novoCodigo
  }

  get nome() {
    return this.#nome
  }
  set nome(novoNome) {
    this.#nome = novoNome
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      nome: this.#nome,
    }
  }

  async gravar() {
    const especieBD = new EspecieBD()
    await especieBD.incluir(this)
  }

  async atualizar() {
    const especieBD = new EspecieBD()
    await especieBD.alterar(this)
  }

  async remover() {
    const especieBD = new EspecieBD()
    await especieBD.excluir(this)
  }

  async consultar(termo) {
    const especieBD = new EspecieBD()
    const especies = await especieBD.consultar(termo)
    return especies
  }

  async consultarCodigo(codigo) {
    const especieBD = new EspecieBD()
    const especies = await especieBD.consultarCodigo(codigo)
    return especies
  }
}
