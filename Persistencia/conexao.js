import mysql from 'mysql2/promise'

export default async function conectar() {
  if (global.conexao && global.conexao.status != 'disconnected') {
    return global.conexao
  }
  const conexao = await mysql.createConnection({
    host: 'localhost',
    user: 'aluno3-pfsii',
    port: 3306,
    password: 'njTMBR4Y01wcxju01OxV',
    database: 'backend'
  })
  global.conexao = conexao
  return conexao
}
