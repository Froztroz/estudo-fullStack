const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Usa o plugin Stealth
puppeteer.use(StealthPlugin());

const URL = "https://www.google.com/"
const searchFor = "RX 90"
const searchFor2 = "70 xt"

async function scraping() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log('Iniciei e abri o browser.');
    
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    console.log('Fui para a pagina.');

    function delay(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
    }      

    await delay(3750); // espera 3 segundos


    // Aguarda o textarea do Google estar pronto
    await page.waitForSelector('textarea');
    await page.click('textarea', {delay: 1200});
    await page.click('textarea', {clickCount: 2, delay: 2730});
    await page.type('textarea', searchFor, { delay: 1500 });
    await page.type('textarea', searchFor2, { delay: 3500 });
    await delay(2000);
    await page.keyboard.press('Enter', { delay: 3000 });

    // DICA: Espere a navegação antes de tentar ler resultados!
    await delay (4210);

    // Seu scraping de resultados viria aqui!

      // Execute código dentro da página para procurar as divs que contêm "shopping"
  const divsComShopping = await page.evaluate(() => {
    const divs = Array.from(document.querySelectorAll('div'));
    return divs
      .filter(div => div.innerText && div.innerText.toLowerCase().includes('shopping'))
      .map(div => ({
        text: div.innerText,
        html: div.outerHTML
      }));
  });

  // Exibe o resultado no terminal
  console.log('Divs que contém "shopping":', divsComShopping);

}

scraping();