/**
 * Create a directory if it doesn't exist
 * 
 * @param {string} path Exp: ./public/screenshot
 * @returns {void}
 */
const makeDir = (path) => {
    try {
        const fs = require('fs');

        //check if the directory is nested
        const nested = (path.split("/").length-1 > 1);
        
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: nested });
        }
    } catch(err) {
        throw new Error(`Something happened and the directory creation failed! (Error: ${err})`);
    } 

}


/**
 * File name to be used for the screenshots
 * 
 * @param {string} default_str The string to be included at the beginning of the file name
 * @return {string}            The possible name for the png file
 */
const getFileName = (default_str = 'screenshot', extension = 'png') => {
    const date_time_str = getDateTimeStr();

    return default_str ? `${default_str}_${date_time_str}.${extension}` : `default_${date_time_str}.${extension}`;
}

/**
 * Random string generator
 * 
 * @param {number} length To be able to change the length of the output (default 6 characters)
 * @returns {string}      The generated random string     
 */
const generateRandomString = (length = 6) => {
    return Math.random().toString(20).substr(2, length);
}


const getDateTimeStr = () => {
    const current_date_time = new Date();

    return current_date_time.getFullYear()   + "-"
        + (current_date_time.getMonth() + 1) + "-"
        + current_date_time.getDate()        + "_"
        + current_date_time.getHours()       + ":"  
        + current_date_time.getMinutes()     + ":" 
        + current_date_time.getSeconds();
}

module.exports = { makeDir, getFileName, generateRandomString, getDateTimeStr };