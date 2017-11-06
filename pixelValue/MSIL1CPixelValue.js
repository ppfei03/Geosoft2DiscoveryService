var cmd = require('node-cmd');
const dir = require('node-dir');

cmd.get(
  'pwd',
  function(err, data, stderr) {
    console.log('the current working dir is : ', data)
  }
);

// promObj = {lat, lon, identifier, band}
// EXAMPLE
// gdallocationinfo -wgs84 -xml T30PTB_20171010T104021_TCI.jp2 -5.5 15.0
function getPixelValueForMSIL1CP(promObj) {
  return new Promise((resolve, reject) => {
    try {
      getFolderUrl(promObj).then(addImageName).then(res => {
        resolve(res);

        //then(getPixelValueAsXML).then(xmlToJson)
      })
    } catch (error) {
      reject(error);
    }
  });
};

function getFolderUrl(promObj) {
  return new Promise((resolve, reject) => {
    try {
      let scene = promObj.identifier;
      let band = promObj.band;

      let urlToRequestedImage = '/../../sentinel2' + '/' + scene + '/' + 'IMG_DATA' + '/';

      promObj['url'] = urlToRequestedImage;
      resolve(promObj);
    } catch (error) {
      reject(error);
    }
  });
};


// Funktion noch nicht fertig. Hier weiter arbeiten.
function addImageName(promObj) {
  return new Promise((resolve, reject) => {
    try {
      dir.promiseFiles(promObj.url)
      .then((files)=>{
          console.log(files);
          resolve(files) // for testing in browser
      })
      .catch(e=>console.error(e))

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getPixelValueForMSIL1CP: getPixelValueForMSIL1CP
}
