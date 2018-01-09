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


            // Dummy response due to problems (see below),
            resolve({
                "Report":{
                    "pixel":"8496",
                    "line":"4074",
                    "BandReport":[
                        {
                            "band":"1",
                            "Value":"161"
                        },
                        {
                            "band":"2",
                            "Value":"129"
                        },
                        {
                            "band":"3",
                            "Value":"115"
                        }
                    ]
                }
            });


            /*
For unknown reasons, this function stopped working properly, all of the sudden.
It was detected on the 08.01.2017.

Some (not all - it is not predictable) requests are processed correctly. Then the main process is blocked

**********
error
{ Error: Command failed: gdallocationinfo -wgs84 -xml ../sentinel2/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/T30PTB_20171010T104021_TCI.jp2 -5 15

    at ChildProcess.exithandler (child_process.js:272:12)
    at ChildProcess.emit (events.js:159:13)
    at maybeClose (internal/child_process.js:943:16)
    at Socket.stream.socket.on (internal/child_process.js:363:11)
    at Socket.emit (events.js:159:13)
    at Socket.ReaddirReadable.destroy (/home/n_trza01/Geosoft2DiscoveryService/node_modules/fs-readdir/index.js:159:8)
    at Socket.onSocketFinish (net.js:279:17)
    at Socket.emit (events.js:164:20)
    at finishMaybe (_stream_writable.js:605:14)
    at endWritable (_stream_writable.js:613:3)
  killed: false,
  code: null,
  signal: null,
  cmd: 'gdallocationinfo -wgs84 -xml ../sentinel2/S2A_MSIL1C_20171010T104021_N0205_R008_T30PTB_20171010T104947.SAFE/IMG_DATA/T30PTB_20171010T104021_TCI.jp2 -5 15' }
**********
data
<Report pixel="8496" line="4074">
  <BandReport band="1">
    <Value>161</Value>
  </BandReport>
  <BandReport band="2">
    <Value>129</Value>
  </BandReport>
  <BandReport band="3">
    <Value>115</Value>
  </BandReport>
</Report>

**********

But as one can see, the data is still there, but the server crashed.

Other solutions with native child processes in node, and with shelljs as an alternative to node-cmd has been tested, but the results were similar or the
needed functionality was not supported.


 */

   /*         const command = 'gdallocationinfo -wgs84 -xml ' + promObj.url + ' ' + promObj.req.query.long + ' ' + promObj.req.query.lat;
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
            );*/

        }
        catch (error) {
            reject(error);
        }
    });
};


module.exports = {
    pixelValue: pixelValue
}
