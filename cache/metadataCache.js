const fs = require('fs');
const parser = require('xml2js').parseString;


const URLFORDUMYMTEST = '/home/zeus/ownCloud/Geosoft2/development/Geosoft2DiscoveryService/localTestData/S2A_MSIL2A_20171007T103021_N0205_R108_T32UMC_20171007T103241.SAFE/MTD_MSIL2A.xml'

// This array containst for each image folder on object.
// Queries run over this array.
let metadataCache = [];

function loadCache() {
  console.log('info', 'loadCache()');
    metadataCache = [];
  return new Promise((resolve, reject) => {
    try {

      fs.readFile(URLFORDUMYMTEST, function(error, data) {
        if(error) {
          throw error;
        }
        xml2json(data).then(addObjectToCache).then(() => {console.log('info', 'loadCache()', 'resolve');  resolve(metadataCache)}).catch(error => {throw error});
      });
    } catch (error) {
      console.log('error', 'loadCache()', error)
      reject(error)
    }
  });
};


function addObjectToCache(object) {
  console.log('info', 'addObjectToCache(object)');
  return new Promise((resolve, reject) => {
    try {
      metadataCache.push(object);
      console.log('info', 'addObjectToCache(object)', 'resolve');
      resolve(object);
    }
    catch(error) {
      console.log('error', 'addObjectToCache(object)', error);
      reject(error);
    }
  });
};

function xml2json(xml) {
  console.log('info', 'Start xml2json(xml)');
  return new Promise((resolve, reject) => {
    try {
      parser(xml, function(error, result) {
        if (error) {
          throw error
        }
        console.log('info', 'Start xml2json(xml)', 'resolve');
        resolve(result);
      });
    } catch (error) {
      console.log('error', 'Start xml2json(xml)', error)
      reject(error)
    }
  });
};


module.exports = {
  xml2json: xml2json,
  loadCache: loadCache,
  metadataCache: metadataCache
}
