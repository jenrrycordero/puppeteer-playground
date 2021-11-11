const puppeteer = require('puppeteer');
const utils = require('../helpers');

module.exports = async (page_url = 'https://www.frbsf.org/', file_name = 'logs') => {
    const fs = require('fs/promises');

    const start = Date.now();

    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    
    try {
        await page.goto(page_url);

        // Creating public dir if doesn't exist
        const path = './public/logs';
        utils.makeDir(path);

        // getting file name with the given string 
        const fileName = utils.getFileName(file_name, 'txt');

        // Getting page info
        const pageInfo = {
            title: await page.title(),
            url: await page.url(),
            description: await page.evaluate( () => {
                return document.querySelectorAll("head > meta[name='description']")[0].content;
            }),
            links: await page.$$eval('a', as => as.map(a => a.href)),
            images: await page.$$eval('img', as => as.map(img => img.src)),
            h2s: await page.$$eval('h2', (h2s) => {
                return h2s.map(x => x.textContent);
            }),
        }

        //getting time of execution
        const scrappingTimeMs = Date.now() - start;
        pageInfo['renderTime'] = scrappingTimeMs;

        const content = createTemplate(pageInfo);
        
        await fs.writeFile(`${path}/${fileName}`, content);

    } catch(err) {
        console.error(err);
        throw new Error('Fatal!');
    }

    await browser.close();
}

function createTemplate(pageInfo) {
    const br = "\r\n";
    const links = pageInfo.links.join(br);
    const c_links = pageInfo.links.length;
    const images = pageInfo.images.join(br);
    const c_images = pageInfo.images.length;
    const h2s = pageInfo.h2s.join(br);
    const c_h2s = pageInfo.h2s.length;

    const str = `Web Scraping made by FED team
Reporter: Jenrry Coredero
Report Date -> ${utils.getDateTimeStr()}

METADATA:
Page Title: ${pageInfo.title}
Page URL: ${pageInfo.url}
Page Description: ${pageInfo.description}

LINKS (<a>) total ${c_links} :
${links}

IMAGES (<img>) total ${c_images} :
${images}

HEADINGS (only <h2>) total ${c_h2s} :
${h2s}

Time Spent: ${pageInfo.renderTime} MS
${br} `;

    return str;
}