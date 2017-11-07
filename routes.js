const express = require("express");
const router = express.Router();
const logger = require('logops');
const filter = require('./filterFunctions/filter.js').filter;
const pixelValue = require('./pixelValue/pixelValue.js').pixelValue;
const getTile = require('./tmsAccess/TMS.js').getTile;

// For development:
const metadataCache = require('./cache/metadataCache');



/**
 * Endpoint for searching
 * Processed query parameters are:
 * ?searchString: Commaseperated String of elements that will be used for matching (matching what?)
 * ?bbox: Spatial extent as bbox in WGS84: minx, miny, maxx, maxy
 * ?minDateTime: how old the younges image is allowd to be (inclusive)
 * ?maxDateTime: how old the oldes image is allowed to be (inclusive)
 * @type {JSON}
 */
// router.get("/search", (req, res, next) => {
//   console.log('info', 'Request at route /search', req.query);
//
//   res.send('/search')
// });


/**
 * Endpoint for searching
 * Processed query parameters are:
 * ?identifiers: Whitespace seperated String of elements that will be used for matching (matching what?)
 * ?bbox: Spatial extent as bbox in WGS84: minx, miny, maxx, maxy
 * ?minDateTime: how old the younges image is allowd to be (inclusive)
 * ?maxDateTime: how old the oldes image is allowed to be (inclusive)
 * @type {JSON}
 */
// Endpoint for development, returning the whole cache
router.get("/datasets", (req, res, next) => {

    logger.info(req.query);

      filter(req).then(filteredCache => {res.send(filteredCache.filterResult)}).catch(err => {res.send({status: 'error', error: err})})
      // console.log('info', 'Request at route /getCache', req.query);
      // res.send(metadataCache.getCache());

});

// /img?identifier=&resolution=&band=&z=&x&y
router.get("/img", (req, res, next) => {

    logger.info(req.query);
    let promObj = {req: req};

    getTile(promObj).then(promObj => {res.sendFile(promObj.path)}).catch(error => {res.send({status: 'error', error: error})});

});

//Endpoint for MSIL1C
//expect query parameters identifier and band
router.get("/pixelValue", (req, res, next) => {
    const reqObj = {req: req};
    pixelValue(reqObj).then(resp => {res.send(resp)}).catch(error => {res.send({status: 'error', error: error})});
});

module.exports = router;
