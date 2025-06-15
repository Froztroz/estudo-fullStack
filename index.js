const kabumScraping = require ('./JS/kabumScraping');
const { inserirProdutos } = require('./JS/pg');
const filtrarProdutos = require ('./JS/filtrarProdutos');


(async () => {
    const URL = "https://www.kabum.com.br/";
    const searchFor = "RX 9060 XT";

    // função para coletar os dados
    const produtos = await kabumScraping(URL, searchFor);

    // função para enviar info para o banco
    const produtosFiltrados = await filtrarProdutos(produtos,searchFor);
    if(produtosFiltrados.length>0){
        console.log(produtosFiltrados);
        await inserirProdutos(produtosFiltrados);
    }else{
        console.log("Não achou nenhum produto referente a ", searchFor);
        console.log(produtosFiltrados);
    }

    
})();