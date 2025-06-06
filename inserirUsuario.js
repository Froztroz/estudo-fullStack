// inserirUsuario.js
const pool = require('./db');

async function inserirUsuario(nome, email) {
  const query = 'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *';
  const values = [nome, email];

  try {
    const res = await pool.query(query, values);
    console.log('Usuário inserido:', res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error('Erro ao inserir usuário:', err);
    throw err;
  }
}

module.exports = inserirUsuario;