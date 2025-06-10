// index.js
const inserirUsuario = require('./JS/inserirUsuario');
const kabumScraping = require ('./JS/kabumScraping');

// Insere um usuário no banco de dados (TESTE de BD)
(async () => {
  await inserirUsuario('Maria Capivara', 'maria@capivaralovers.com');
})();

// Defina a URL e o termo de busca que você quer usar
const URL = "https://www.kabum.com.br/";
const searchFor = "RX 9070 xt";

kabumScraping(URL, searchFor);
