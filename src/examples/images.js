const puppeteer = require('puppeteer');
const utils = require('../helpers');

module.exports = async (page_url = 'https://www.frbsf.org/') => {
    const fs = require('fs/promises');

    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();
    
    try {
        await page.goto(page_url);

        // Creating public dir if doesn't exist
        const path = './public/images';
        utils.makeDir(path);

        // Getting all the images from provided URL
        const photos = await page.$$eval('img', imgs => imgs.map(img => img.src));
        
        // Saving the images to ./public/images/
        for (const photo of photos) {
            const image_page = await page.goto(photo);

            //TODO - Filter the images by extension
            await fs.writeFile( `${path}/${photo.split("/").pop()}`, await image_page.buffer() );
        }

    } catch(err) {
        console.error(err);
        throw new Error('Fatal, NO image has been created!');
    }

    await browser.close();
}