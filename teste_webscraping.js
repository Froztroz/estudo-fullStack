const pup = require ("puppeteer");

const URL = "https://www.kabum.com.br/busca/rx-7900-xtx";
const searchFor = "RX 7900 XTX";

let c = 1;

(async () => {
    const browser =await pup.launch({headless: true});
    const page = await browser.newPage();
    console.log("Iniciei");

    await page.goto(URL);
    console.log("Fui para a URL");

    const links = await page.$$eval('.sc-27518a44-3.hLEhJe.productCard > a', el => el.map(link => link.href));

    for(const link of links){
        console.log('Pagina ', c);
        await page.goto(link);
        await page.waitForSelector('.sc-58b2114e-6.brTtKt');

        const title = await page.$eval('.sc-58b2114e-6.brTtKt', element => element.innerText);
        const price = await page.$eval('.sc-5492faee-2.ipHrwP.finalPrice', element => element.innerText);

        const obj = {title, price};
        console.log(obj);
        

        c++
    }    

    await browser.close;

})();