const puppeteer = require ("puppeteer");

const URL = "https://www.kabum.com.br/"
const searchFor = "RX 9070 xt"

async function kabumScraping() {
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

    const productName = await page.$$eval('.nameCard', el => el.textContent);
    console.log(productName);
    const productPrice = await page.$$eval('.priceCard', el => el.textContent);
    console.log(productPrice);
    const productCondition = await page.$$eval('.priceTextCard', el => el.textContent);
    console.log(productCondition);

    
};


kabumScraping();