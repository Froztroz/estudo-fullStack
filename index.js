const kabumScraping = require ('./JS/kabumScraping');
const { inserirProdutos } = require('./JS/pg');


(async () => {
    const URL = "https://www.kabum.com.br/";
    const searchFor = "RX 9070 xt";

    // função para coletar os dados
    const produtos = await kabumScraping(URL, searchFor);

    // função para enviar info para o banco
    await inserirProdutos(produtos);

    
})();