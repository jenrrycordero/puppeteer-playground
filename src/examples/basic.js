const puppeteer = require('puppeteer');

module.exports = async () => {
    // Creating an instance of a browser with headless parameter 
    // set to false to open Chromium browser
    const browser = await puppeteer.launch({headless : false});

    // Opening specific URL in a new tab
    const page = await browser.newPage();
    await page.goto('https://www.frbsf.org/');

    // Actions...
    const title = await page.title();
    const url = await page.url();
    
    console.log(`Title:  ${title}, URL: ${url}`);

    await browser.close();
}