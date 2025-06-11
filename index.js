const kabumScraping = require ('./JS/kabumScraping');
const { inserirProdutos } = require('./JS/pg');


(async () => {
    const URL = "https://www.kabum.com.br/";
    const searchFor = "RX 9070 xt";

    const produtos = await kabumScraping(URL, searchFor);
    await inserirProdutos(produtos);
})();