import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.poolConexoes) {
    return await global.poolConexoes.getConnection();
  }
  const poolConexoes = mysql.createPool({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "backend",
    // port: 3306,
    //-- Production
    host: "localhost",
    user: "aluno3-pfsii",
    password: "njTMBR4Y01wcxju01OxV",
    database: "backend",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    maxIdle: 10,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  global.poolConexoes = poolConexoes;
  return await poolConexoes.getConnection();
}
