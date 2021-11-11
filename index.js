//const openFRBSF = require("./src/examples/basic");
//const takeScreenshot = require("./src/examples/screenshots");
//const createLogs = require("./src/examples/gLogs");
//const getImages = require("./src/examples/images");
const doActions = require("./src/examples/actions");


// Anonymous function used as an IIFE
(async () => {
    // Here we can call our modules...

    /* Exp. #1 Basic */
    //await openFRBSF();

    /* Exp. #2 Screenshots (Go to public/screenshots folder to see results) */

    // 1st Default
    //await takeScreenshot();

    // 2nd Specific URL
    //await takeScreenshot('myfile', 'https://www.frbsf.org/our-district/');

    // 3rd Print full page
    //await takeScreenshot('myphoto', 'https://www.frbsf.org/our-district/', true);

    // 4th Specific portion
    /* const coordinates = {
        x: 265, 
        y: 1477, 
        width: 550, 
        height: 700
    }; */
    //await takeScreenshot('frb_screenshot_3', 'https://www.frbsf.org/', false, coordinates );

    /* Exp. #3 Generate log with page information */
    //await createLogs("https://www.frbsf.org/our-district/");

    /* Exp. #4 Saving all the images of a given page */
    //await getImages("https://www.frbsf.org/our-district/about/climate-risk/");

    /* Exp. #5 */
    await doActions('https://www.frbsf.org/banking/data/institution-specific-data/');

})();