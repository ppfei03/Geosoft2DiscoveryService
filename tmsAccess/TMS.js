const logger = require('logops');
const fs = require('fs-extra')

function getTile(promObj) {
    return new Promise((resolve, reject) => {
        try {
            checkQuery(promObj).then(getTilePath).then(checkPath).then(promObj => {resolve(promObj)}).catch(error => {reject(error)});
        }
        catch(error) {
            logger.error(error);
            reject(error);
        }
    });
};


function checkQuery(promObj) {
    return new Promise((resolve, reject) => {
        try {
            if(!promObj.req.query.identifier) {
                reject('query parameter "identifier" is missing');
            }
            else if(!promObj.req.query.band) {
                reject('query parameter "band" is missing');
            }
            else if(!promObj.req.query.z) {
                reject('query parameter "z" is missing');
            }
            else if(!promObj.req.query.x) {
                reject('query parameter "x" is missing');
            }
            else if(!promObj.req.query.y) {
                reject('query parameter "y" is missing');
            } else {
                resolve(promObj);
            }
        }
        catch(error) {
            logger.error(error);
            reject(error);
        }
    });
};



function getTilePath(promObj) {
    return new Promise((resolve, reject) => {
    try {
        if(promObj.req.query.resolution){
            resolve(getMSIL2APath(promObj));
        }
        else {
            resolve(getMSIL1CPath(promObj));
        }
    }
    catch(error) {
        logger.error(error);
        reject(error);
    }
    });
};




function getMSIL2APath(promObj) {
    let query = promObj.req.query;
    let path = '../sentinel2/' + query.identifier + '/IMG_DATA' + '/' + query.resolution + '/' + query.band + '/' + '/' + query.z + '/' + query.x + '/' + query.y + '.png'
    promObj['path'] = path;
    return path;
};

function getMSIL1CPath(promObj) {
    let query = promObj.req.query;
    let path = '../sentinel2/' + query.identifier + '/IMG_DATA' + '/' + query.band + '/' + '/' + query.z + '/' + query.x + '/' + query.y + '.png'
    promObj['path'] = path;
    return path;
};


function checkPath(promObj) {
    return new Promise((resolve, reject) => {
        fs.pathExists(promObj.path)
            .then(exists => {
                logger.info('********* Resolving Path **********************')
                resolve(promObj);
            }).catch(e => {reject(e)});
    });
};


module.exports = {
    getTile: getTile
}