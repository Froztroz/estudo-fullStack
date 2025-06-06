// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: '192.168.1.10',
  database: 'banco_teste',
  password: 'senha123',
  port: 5432, // porta padrão do PostgreSQL
});

module.exports = pool;
