// This file contains the logic to get original pixel values
const cmd = require('node-cmd');
const dir = require('node-dir');
const parser = require('xml2json');
const fs = require('fs-extra')
const config = require('../config/config').config;



/**
 * Wrapper for getting pixel value
 * @param promObj
 * @returns {Promise<any>}
 */
function pixelValue(promObj) {
    return new Promise((resolve, reject) => {
        try {
            checkRequest(promObj).then(getFolderUrl)
                .then(getAllFilesInFolder)
                .then(getNameOfMathchingFile)
                .then(addFilenameToPath)
                .then(getGdallocationinfoAsJson)
                .then(re => {
                    resolve(re)
                })
                .catch(error => {
                    reject(error)
                });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Checks a request whether it is valid
 * @param promObj
 * @returns {Promise<any>}
 */
function checkRequest(promObj) {
    return new Promise((resolve, reject) => {
        try {
            if (!promObj.req.query) {
                throw "No query given";
            }
            else if (!promObj.req.query.identifier) {
                throw 'No identifier in query';
            }
            else if (!promObj.req.query.band) {
                throw 'No band in query';
            }
            else if (!promObj.req.query.lat) {
                throw 'No lat given';
            }
            else if (!promObj.req.query.long) {
                throw 'No long given';
            }
            else {
                resolve(promObj);
            }
        }
        catch (error) {
            reject(error)
        }
    });
};

/**
 *
 * @param promObj
 * @returns {Promise<any>}
 */
function getFolderUrl(promObj) {
    return new Promise((resolve, reject) => {
        try {
            const scene = promObj.req.query.identifier;

            let urlToRequestedImage = config.urlToDataFolder + '/' + scene + '/' + 'IMG_DATA' + '/';

            if (promObj.req.query.resolution) {
                urlToRequestedImage += promObj.req.query.resolution + '/'
            }

            promObj['url'] = urlToRequestedImage;
            resolve(promObj);
        } catch (error) {
            reject(error);
        }
    });
};


/**
 * Adding all filesnames in a folder to the promObj
 * @param promObj passed from one promies to another and collects data
 * @returns {Promise<any>}
 */
function getAllFilesInFolder(promObj) {
    return new Promise((resolve, reject) => {
        try {
            fs.pathExists(promObj.url)
                .then(exists => {

                    dir.promiseFiles(promObj.url)
                        .then((files) => {
                            promObj["files"] = files;
                            resolve(promObj);
                        })
                        .catch(e => {
                            reject(e)
                        });

                }).catch(e => {
                reject(e)
            });

        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Get the file with matches with a string, given in the query (url)
 * @param promObj
 * @returns {Promise<any>}
 */
function getNameOfMathchingFile(promObj) {
    return new Promise((resolve, reject) => {
        try {
            const band = promObj.req.query.band;
            const testExpression = new RegExp('.*' + band + '\\.jp2');
            for (let i = 0; i <= promObj.files.length; i++) {
                if(i == promObj.files.length) {
                    reject('No matching file for given scene and band found.');
                }
                else if (promObj.files[i].match(testExpression)) {
                    promObj['filename'] = promObj.files[i];
                    resolve(promObj);
                    break;
                }
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

/**
 * Adds the filename to a path which leads to the file
 * @param promObj
 * @returns {Promise<any>}
 */
function addFilenameToPath(promObj) {
    return new Promise((resolve, reject) => {
        try {
            promObj.url = promObj.filename;
            resolve(promObj);
        }
        catch (error) {
            reject(error);
        }
    });
};

/**
 * Requests the original pixel value from file with GDAL
 * @param promObj
 * @returns {Promise<any>}
 */
function getGdallocationinfoAsJson(promObj) {
    return new Promise((resolve, reject) => {
        try {

            const command = 'gdallocationinfo -wgs84 -xml ' + promObj.url + ' ' + promObj.req.query.long + ' ' + promObj.req.query.lat;
            // 'gdallocationinfo -wgs84 -xml T30PTB_20171010T104021_TCI.jp2 -5 15',
            cmd.get(
                command,
                function (error, data, stderr) {

                    if (error) {
                        reject(error);
                    }
                    else if (data) {
                        let i = data;
                        // console.log(typeof i)
                        // console.log(i)
                        let j = parser.toJson(data);
                        // console.log(j);
                        promObj['locationinfo']
                        resolve(j);
                    }
                    else {
                        throw 'No error and no data as response of gdallocationinfo';
                    }
                }
            );

        }
        catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    pixelValue: pixelValue
}
