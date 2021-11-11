const puppeteer = require('puppeteer');
const utils = require('../helpers');

module.exports = async (file_name='screenshot', uri = 'https://www.frbsf.org/', fullPage = false, region = null) => {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();

    try {
        await page.goto(uri);

        // check if public/screenshots directory exists, if not, create it
        const path = './public/screenshots';
        utils.makeDir(path);

        // getting file name with the given string (a .png isd created by default)
        const fileName = utils.getFileName(file_name);

        if( region ) {
            await page.screenshot({ path: `${path}/${fileName}`, clip: region });
        } else {
            await page.screenshot({ path: `${path}/${fileName}`, fullPage });
        }

    } catch (err) {
        let error_str = `page.goto or page.screenshot failed because: ${err}`;
        if (err instanceof puppeteer.errors.TimeoutError) {
            error_str = 'Timeout when trying to take a screenshot';
        }
        throw new Error(error_str);
    }

    await browser.close();
}