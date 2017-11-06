const cmd = require('node-cmd');
const dir = require('node-dir');
const parser = require('xml2json');

cmd.get(
  'pwd',
  function(err, data, stderr) {
    console.log('the current working dir is : ', data)
  }
);


function getPixelValueForMSIL1CP(promObj) {
  return new Promise((resolve, reject) => {
    try {
      getFolderUrl(promObj).then(getAllFilesInFolder)
                            .then(getNameOfMathchingFile)
                            .then(addFilenameToPath)
                            .then(getGdallocationinfoAsXML)
                            .then(parseXMLToJSON)
                            .then(promObj => {resolve(promObj)})
                            .catch(error => {throw error});
    } catch (error) {
      reject(error);
    }
  });
};

function getFolderUrl(promObj) {
  return new Promise((resolve, reject) => {
    try {
      const scene = promObj.req.query.identifier;

      let urlToRequestedImage = '/../../sentinel2' + '/' + scene + '/' + 'IMG_DATA' + '/';

      promObj['url'] = urlToRequestedImage;
      resolve(promObj);
    } catch (error) {
      reject(error);
    }
  });
};


function getAllFilesInFolder(promObj) {
  return new Promise((resolve, reject) => {
    try {
      dir.promiseFiles(promObj.url)
      .then((files)=>{
          promObj["files"] = files;
          resolve(promObj);
      })
      .catch(e=>console.error(e))

    } catch (error) {
      reject(error);
    }
  });
};

function getNameOfMathchingFile(promObj) {
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
  return new Promise((resolve, reject) => {
      try {
          promObj.url = promObj.url + promObj.filename;
          resolve(promObj);
      }
      catch(error) {
        reject(error);
      }
  });
};

function getGdallocationinfoAsXML(promObj) {
  return new Promise((resolve, reject) => {
    try {

// EXAMPLE
// gdallocationinfo -wgs84 -xml T30PTB_20171010T104021_TCI.jp2 -5.5 15.0
        cmd.get(
            'gdallocationinfo -wgs84 -xml ' + promObj.url + ' ' + prom.req.query.long + ' ' + prom.req.query.lat,
            function(error, data, stderr) {
                console.log('the current working dir is : ', data)
                if(error) {
                  throw error;
                }
                else if(data) {
                  promObj['locationinfoAsXML'] = data;
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


function parseXMLToJSON(promObj) {
  return new Promise((resolve, reject) => {
    try {
        const locationInfoAsJSON = parser.toJson(promObj.locationinfoAsXML);
        promObj['locationInfoAsJSON'] = locationInfoAsJSON;
        resolve(promObj);
    }
    catch(error) {
      reject(error);
    }
  });
};


module.exports = {
    getPixelValueForMSIL1CP: getPixelValueForMSIL1CP
}
