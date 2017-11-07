const cmd = require('node-cmd');
const dir = require('node-dir');
const parser = require('xml2json');
const logger = require('logops');
const fs = require('fs-extra')





function getPixelValueForMSIL1CP(promObj) {
  return new Promise((resolve, reject) => {
    try {
        checkRequest(promObj).then(getFolderUrl)
                            .then(getAllFilesInFolder)
                            .then(getNameOfMathchingFile)
                            .then(addFilenameToPath)
                            .then(getGdallocationinfoAsJson)
                            .then(re => {resolve(re)})
                            .catch(error => {reject(error)});
    } catch (error) {
      reject(error);
    }
  });
};

function checkRequest(promObj) {
    logger.info('checkRequest');
  return new Promise((resolve, reject) => {
    try {
      if(!promObj.req.query) {
        throw "No query given";
      }
      else if(!promObj.req.query.identifier) {
        throw 'No identifier in query';
      }
      else if(!promObj.req.query.band) {
          throw 'No band in query';
      }
      else if(!promObj.req.query.lat) {
        throw 'No lat given';
      }
      else if(!promObj.req.query.long) {
        throw 'No long given';
      }
      else {
        resolve(promObj);
      }
  }
  catch(error) {
      reject(error)
  }
  });
};

function getFolderUrl(promObj) {
    logger.info('getFolderUrl');
  return new Promise((resolve, reject) => {
    try {
      const scene = promObj.req.query.identifier;

      // let urlToRequestedImage = path.join(__dirname, '/../sentinel2' + '/' + scene + '/' + 'IMG_DATA' + '/');
        let urlToRequestedImage = '../sentinel2' + '/' + scene + '/' + 'IMG_DATA' + '/'
        if(promObj.req.query.resolution){
            urlToRequestedImage += promObj.req.query.resolution + '/'
        }

      promObj['url'] = urlToRequestedImage;
      resolve(promObj);
    } catch (error) {
      reject(error);
    }
  });
};


function getAllFilesInFolder(promObj) {
    logger.info('getAllFilesInFolder');
  return new Promise((resolve, reject) => {
    try {


        fs.pathExists(promObj.url)
            .then(exists => {

                dir.promiseFiles(promObj.url)
                    .then((files)=>{
                        promObj["files"] = files;
                        resolve(promObj);
                    })
                    .catch(e=> {reject(e)});

            }).catch(e => {reject(e)});

    } catch (error) {
      reject(error);
    }
  });
};

function getNameOfMathchingFile(promObj) {
    logger.info('getNameOfMathchingFile')
  return new Promise((resolve, reject) => {
    try {
      const band = promObj.req.query.band;
      const testExpression = new RegExp('.*' + band + '\\.jp2');
      for(let i = 0; i < promObj.files.length; i++) {
        if(promObj.files[i].match(testExpression)){
          promObj['filename'] = promObj.files[i];
          resolve(promObj);
          break;
        }
      }

      // If no matching element is found, the following code is excecuted:
        throw 'No matching file for given scene and band found.'

    }
    catch(error) {
      reject(error);
    }
  });
};


function addFilenameToPath(promObj) {
    logger.info('addFilenameToPath')
  return new Promise((resolve, reject) => {
      try {
          promObj.url = promObj.filename;
          resolve(promObj);
      }
      catch(error) {
        reject(error);
      }
  });
};

function getGdallocationinfoAsJson(promObj) {
    logger.info('getGdallocationinfoAsXML')
  return new Promise((resolve, reject) => {
    try {

        const command = 'gdallocationinfo -wgs84 -xml ' + promObj.url + ' ' + promObj.req.query.long + ' ' + promObj.req.query.lat;
        // 'gdallocationinfo -wgs84 -xml T30PTB_20171010T104021_TCI.jp2 -5 15',
        cmd.get(
            command,
            function(error, data, stderr) {

                if(error) {
                    logger.error(error)
                  reject(error);
                }
                else if(data) {
                    let i = data;
                    // console.log(typeof i)
                    // console.log(i)
                    let j =  parser.toJson(data);
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
    catch(error) {
      reject(error);
    }
  });
};


module.exports = {
    getPixelValueForMSIL1CP: getPixelValueForMSIL1CP
}
