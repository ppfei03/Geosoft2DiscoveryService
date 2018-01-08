//This file contains the logic to bild the cache for the metadata
//The basic concept is, to iterate over all metadata files (JSON) and store the information in an array, so it can be easily iterated.

const fs = require('fs-extra');
const config = require('../config/config').config;


let urlToDataFolder = config.urlToDataFolder;


// This array containst for each image folder on object.
// Queries run over this array.
let localCache = [];

function getCache() {
    return localCache;
}


/**
 * Function for coordinating the loading process.
 * @param pathToScenes url to the folder which contains the scenes
 * @returns {Promise<any>}
 */
function loadCache(pathToScenes) {
    console.log('loadCache');
    return new Promise((resolve, reject) => {
        try {
            getContentOfFolderAsArray(urlToDataFolder).then(iterateOverEachScene);
        } catch (error) {
            reject(error)
        }
    });
};

/**
 * Get all filenames for an folder in an array
 * @param pathToFolder The folder of which I want the containing files by name in an array
 * @returns {Promise<any>}
 */
function getContentOfFolderAsArray(pathToFolder) {
    console.log('getContentOfFolderAsArray');
    return new Promise((resolve, reject) => {
        try {
            let filesInFolderAsArray = fs.readdirSync(pathToFolder);

            let promObj = {
                pathToFolder: pathToFolder,
                filesInFolderAsArray: filesInFolderAsArray
            };

            resolve(promObj)
        } catch (error) {
            reject(error);
        }
    });
};


function iterateOverEachScene(pathANDFiles) {
    return new Promise((resolve, reject) => {
        try {

            for (var i in pathANDFiles.filesInFolderAsArray) {
                var currentFilePath = pathANDFiles.pathToFolder + '/' + pathANDFiles.filesInFolderAsArray[i];
                var stats = fs.statSync(currentFilePath);
                if (stats.isFile()) {
                    //  console.log(currentFile);
                } else if (stats.isDirectory()) {

                    // Object which will be stored in the cache - array
                    let cacheObj = {
                        sceneName: pathANDFiles.filesInFolderAsArray[i],
                        currentFilePath: currentFilePath
                    }

                    addMTDjsonTocacheObj(cacheObj).then(addBandsForScene).then(cacheObj => {
                        // console.log(JSON.stringify(cacheObj));
                        localCache.push((cacheObj));
                        console.log('***************************************************');
                        console.log(getCache());
                        console.log('***************************************************');
                    }).catch(err => {
                        console.log(err)
                    });
                }
            }
        } catch (error) {
            reject(error)
        }
    });
};


/**
 * Adding metadata to initially created Object which will be stores in the cache - array
 * @param cacheObj The Object which will be stored in the cache - array
 * @returns {Promise<any>}
 */
function addMTDjsonTocacheObj(cacheObj) {
    return new Promise((resolve, reject) => {
        try {

            fs.readJson(cacheObj.currentFilePath + '/' + 'MTD.json')
                .then(packageObj => {
                    // cacheObj['MTD'] = JSON.stringify(packageObj);
                    cacheObj['MTD'] = packageObj;
                    resolve(cacheObj)
                })
                .catch(err => {
                    throw err
                })
        } catch (error) {
            reject(error)
        }
    });
};

/**
 * Adds the availabile bands for a scene as an enhancement of the meta information
 * @param cacheObj  The Object which will be stored in the cache - array
 * @returns {Promise<any>}
 */
function addBandsForScene(cacheObj) {
    return new Promise((resolve, reject) => {
        try {

            if (isMSIL1C(cacheObj)) {
                addImgBands(cacheObj).then(addingUrlsForSIL1C).then(cacheObj => {
                    resolve(cacheObj)
                })
            }

            if (isMSIL2A(cacheObj)) {
                getBandsPerResolution(cacheObj).then(addingUrlsForMSIL2A).then(cacheObj => {
                    resolve(cacheObj)
                })
            }

        } catch (error) {
            reject(error)
        }
    });
};

/**
 * Tells if the current scene is of type MSIL1C
 * @param cacheObj The Object which will be stored in the cache - array
 * @returns {true | false}
 */
function isMSIL1C(cacheObj) {
    let sceneName = '' + cacheObj.sceneName
    return sceneName.match(/.*MSIL1C.*/);
};

/**
 * Tells if the current scene is of type MSIL2A
 * @param cacheObj The Object which will be stored in the cache - array
 * @returns {true | false}
 */
function isMSIL2A(cacheObj) {
    let sceneName = '' + cacheObj.sceneName
    return sceneName.match(/.*MSIL2A.*/);
};

/**
 * Adds path to bands
 * @param cacheObj The Object which will be stored in the cache - array
 * @returns {Promise<any>}
 */
function addingUrlsForMSIL2A(cacheObj) {
    return new Promise((resolve, reject) => {
        try {
            let urls = {};

            for (var property in cacheObj.availableResolutionsWithBands) {
                if (cacheObj.availableResolutionsWithBands.hasOwnProperty(property)) {
                    urls[property] = {};
                    console.log('********************');
                    console.log(cacheObj.availableResolutionsWithBands);
                    console.log('property');
                    console.log(property);
                    cacheObj.availableResolutionsWithBands[property].bands.forEach(band => {
                        urls[property][band] = 'http://gis-bigdata:11016' + '/' + 'img/' + cacheObj.sceneName + '/' + 'IMG_DATA' + '/' + property + '/' + band;
                    })

                }
            }

            console.log(JSON.stringify(urls));
            cacheObj['tmsUrls'] = urls;

            resolve(cacheObj)

        } catch (error) {
            reject(error)
        }
    });
};


/**
 * Adds path to bands
 * @param cacheObj The Object which will be stored in the cache - array
 * @returns {Promise<any>}
 */

function addingUrlsForSIL1C(cacheObj) {
    return new Promise((resolve, reject) => {
        try {
            let urls = {};
            console.log('********************');
            cacheObj.availableBands.forEach(band => {
                urls[band] = config.urlOfThisService + '/' + 'img/' + cacheObj.sceneName + '/' + 'IMG_DATA' + '/' + band;
            })

            // console.log(JSON.stringify(urls));
            cacheObj['tmsUrls'] = urls;
            resolve(cacheObj)
        } catch (error) {
            reject(error)
        }
    });
};


/**
 * Adding band of images
 * @param cacheObj The Object which will be stored in the cache - array
 * @returns {Promise<any>}
 */
function addImgBands(cacheObj) {
    return new Promise((resolve, reject) => {

        try {
            getContentOfFolderAsArray(cacheObj.currentFilePath + '/' + 'IMG_DATA').then(getAvailableBandsAsArray).then(bands => {
                cacheObj['availableBands'] = bands;
                resolve(cacheObj)
            })

        } catch (error) {
            reject(error);
        }

    });
};

/**
 * Returns all available bands of a scene
 * @param pathANDFiles Object containing the path to a scene and its files in an array
 * @returns {Promise<any>}
 */
function getAvailableBandsAsArray(pathANDFiles) {
    return new Promise((resolve, reject) => {
        try {

            let availableBands = [];

            for (let i = 0; i <= pathANDFiles.filesInFolderAsArray.length; i++) {
                if (i == pathANDFiles.filesInFolderAsArray.length) {
                    resolve(availableBands);
                }
                else {
                    var currentFilePath = pathANDFiles.pathToFolder + '/' + pathANDFiles.filesInFolderAsArray[i];
                    var stats = fs.statSync(currentFilePath);
                    if (stats.isFile()) {
                    } else if (stats.isDirectory()) {
                        availableBands.push(pathANDFiles.filesInFolderAsArray[i]);
                    }
                }
            }

        } catch (error) {
            reject(error)
        }
    });
};

/**
 * Iterate over Resolutions and adds available band per resolution
 * @param cacheObj The Object which will be stored in the cache - array
 * @returns {Promise<any>}
 */
function getBandsPerResolution(cacheObj) {
    return new Promise((resolve, reject) => {
        try {
            getContentOfFolderAsArray(cacheObj.currentFilePath + '/' + 'IMG_DATA').then(getAvailableResolutionsWithBands).then(availableResolutionsWithBands => {
                cacheObj['availableResolutionsWithBands'] = availableResolutionsWithBands;
                resolve(cacheObj)
            })

        } catch (error) {
            reject(error);
        }
    });
};


/**
 * Combines available Resolutions with bands
 * @param pathANDFiles Object containing the path to a scene and its files in an array
 * @returns {Promise<any>}
 */
function getAvailableResolutionsWithBands(pathANDFiles) {
    console.log('getAvailableResolutionsWithBands');
    return new Promise((resolve, reject) => {
        try {

            let availableResolutions = {};

            for(let i = 0; i <= pathANDFiles.filesInFolderAsArray.length; i++) {
                if(i == pathANDFiles.filesInFolderAsArray.length) {
                    resolve(availableResolutions);
                }else {
                    var currentFilePath = pathANDFiles.pathToFolder + '/' + pathANDFiles.filesInFolderAsArray[i];
                    var stats = fs.statSync(currentFilePath);
                    if (stats.isFile()) {
                    } else if (stats.isDirectory()) {
                        availableResolutions[pathANDFiles.filesInFolderAsArray[i]] = {
                            'bands': []
                        }

                        let bandFilesInFolderAsArray = fs.readdirSync(currentFilePath);

                        for (var j in bandFilesInFolderAsArray) {
                            var tempPath = currentFilePath + '/' + bandFilesInFolderAsArray[j];
                            var stats = fs.statSync(tempPath);
                            if (stats.isFile()) {
                                //  console.log(currentFile);
                            } else if (stats.isDirectory()) {
                                availableResolutions[pathANDFiles.filesInFolderAsArray[i]].bands.push(bandFilesInFolderAsArray[j])
                            }
                        }

                    }
                }
            }

        } catch (error) {
            reject(error)
        }
    });
};


module.exports = {
    loadCache: loadCache,
    getCache: getCache
}
