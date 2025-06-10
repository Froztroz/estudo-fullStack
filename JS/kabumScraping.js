const puppeteer = require ("puppeteer");


async function kabumScraping(URL, searchFor) {

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    console.log('Iniciei e abri o browser.');

    await page.goto(URL);
    console.log('Fui para a pagina.');

    await page.waitForSelector('input');
    console.log('Aguardou carregar o seletor.');
    await page.type('input', searchFor, {delay: 100});
    console.log('Escrevi na barra de busca.');

    await Promise.all([
        page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: 'networkidle0'})
    ]);

    // Extrai os dados dos produtos
    const produtos = await page.evaluate(() => {
        // Coleta todos os nomes de produtos
        const nomes = Array.from(document.querySelectorAll('.nameCard')).map(el => el.innerText.trim());
        // Coleta todos os preços dos produtos
        const precos = Array.from(document.querySelectorAll('.priceCard')).map(el => el.innerText.trim());
        // Coleta todas as condições de pagamento
        const condicoes = Array.from(document.querySelectorAll('.priceTextCard')).map(el => el.innerText.trim());

        // Junta tudo em um array de objetos
        return nomes.map((nome, i) => ({
            nome,
            preco: precos[i] || '',
            condicao: condicoes[i] || ''
        }));
    });


    console.log(produtos);
    await browser.close();
    return produtos;

};

module.exports = kabumScraping;