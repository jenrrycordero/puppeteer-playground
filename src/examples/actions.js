const puppeteer = require('puppeteer');
const utils = require('../helpers');

module.exports = async (uri = 'https://www.frbsf.org/') => {
    const browser = await puppeteer.launch({headless : false});
    const page = await browser.newPage();

    try {
        await page.goto(uri);

        // 1. Check if element exist and wait for 5 seconds
        await page.waitForSelector('.offsite_link', {timeout: 5000});

        // 2. Simulate Click event on eny external link
        await page.click('a.offsite_link');

        // 3. Checking if the Offsite Notice appears
        await page.waitForSelector('.offsiteNotice', { visible: true, timeout: 5000 });

        // 4. Check the Offsite Notice Copy
        const noticeStr = await page.$eval('.offsiteNotice > p:nth-child(2)', elm => elm.textContent);

        // 5. Comparing content
        if( noticeStr === 'You are about to leave FRBSF.org. By clicking this link, you will be taken to a website that is independent from FRBSF.org. The site you are linking to is not managed by FRBSF.org and FRBSF.org is not responsible for the content provided on that site.') {
            // 5.1. Close the notice
            //await page.click('a.offsite_link');
            console.log('Here we are');
        } {
            // 5.2 throw error in case of wrong text.
            throw new Error("Please check the Notice copy!");
        }
        
    } catch (err) {
        let error_str = err;
        if (err instanceof puppeteer.errors.TimeoutError) {
            error_str = 'Offsite Notice is not presented in this page or external links does not have the proper structure.';
        }
        throw new Error(error_str);
    }

    await browser.close();
}