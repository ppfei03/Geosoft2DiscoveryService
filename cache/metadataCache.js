const fs = require('fs-extra');
const config = require('../config/config').config;


let urlToDataFolder = config.urlToDataFolder;



// This array containst for each image folder on object.
// Queries run over this array.
let localCache = [];

function getCache() {
  return localCache;
}




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


function getContentOfFolderAsArray(pathToFolder) {
  console.log('getContentOfFolderAsArray');
  return new Promise((resolve, reject) => {
    try {
      let filesInFolderAsArray = fs.readdirSync(pathToFolder);

      let promObj = {
        pathToFolder: pathToFolder,
        filesInFolderAsArray: filesInFolderAsArray
      }
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
          //  traverseFileSystem(cacheObj);
        }
      }
    } catch (error) {
      reject(error)
    }
  });
};



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

function isMSIL1C(cacheObj) {
  let sceneName = '' + cacheObj.sceneName
  return sceneName.match(/.*MSIL1C.*/);
};

function isMSIL2A(cacheObj) {
  let sceneName = '' + cacheObj.sceneName
  return sceneName.match(/.*MSIL2A.*/);
};

function addingUrlsForMSIL2A(cacheObj) {
  return new Promise((resolve, reject) => {
    try {
      let urls = {};

      for (var property in cacheObj.availableResolutionsWithBands) {
        if (cacheObj.availableResolutionsWithBands.hasOwnProperty(property)) {
          urls[property] = {};
          console.log('********************'); console.log(cacheObj.availableResolutionsWithBands); console.log('property'); console.log(property);
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




function addingUrlsForSIL1C(cacheObj) {
  return new Promise((resolve, reject) => {
    try {
      let urls = {};

          console.log('********************');
          cacheObj.availableBands.forEach(band => {
            urls[band]  =  'http://gis-bigdata:11016' + '/' + 'img/' + cacheObj.sceneName + '/' + 'IMG_DATA' + '/' + band;
          })


      console.log(JSON.stringify(urls));
      cacheObj['tmsUrls'] = urls;

      resolve(cacheObj)

    } catch (error) {
      reject(error)
    }
  });
};



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


function getAvailableBandsAsArray(pathANDFiles) {
  return new Promise((resolve, reject) => {
    try {

      let availableBands = [];

      for (var i in pathANDFiles.filesInFolderAsArray) {
        var currentFilePath = pathANDFiles.pathToFolder + '/' + pathANDFiles.filesInFolderAsArray[i];
        var stats = fs.statSync(currentFilePath);
        if (stats.isFile()) {} else if (stats.isDirectory()) {
          availableBands.push(pathANDFiles.filesInFolderAsArray[i]);
        }
      }
      resolve(availableBands);
    } catch (error) {
      reject(error)
    }
  });
};


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


function getAvailableResolutionsWithBands(pathANDFiles) {
  console.log('getAvailableResolutionsWithBands');
  return new Promise((resolve, reject) => {

    try {

      let availableResolutions = {};

      for (var i in pathANDFiles.filesInFolderAsArray) {
        var currentFilePath = pathANDFiles.pathToFolder + '/' + pathANDFiles.filesInFolderAsArray[i];
        var stats = fs.statSync(currentFilePath);
        if (stats.isFile()) {} else if (stats.isDirectory()) {
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
      resolve(availableResolutions);
    } catch (error) {
      reject(error)
    }

  });
};






module.exports = {
  loadCache: loadCache,
  getCache: getCache
}
