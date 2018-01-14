const express = require("express");
const router = express.Router();
const filter = require('./filterFunctions/filter.js').filter;
const pixelValue = require('./pixelValue/pixelValue.js').pixelValue;


/**
 * Endpoint for searching
 * Processed query parameters are:
 * ?identifiers: Whitespace seperated String of elements that will be used for matching (matching what?)
 * ?bbox: Spatial extent as bbox in WGS84: minx, miny, maxx, maxy
 * ?minDateTime: how old the younges image is allowd to be (inclusive)
 * ?maxDateTime: how old the oldes image is allowed to be (inclusive)
 * @type {JSON}
 */
router.get("/datasets", (req, res, next) => {
    filter(req).then(filteredCache => {
        res.send(filteredCache.filterResult).catch(err => {res.send(err)});
    }).catch(err => {
        res.send({status: 'error', error: err})
    })
});


/**
 *Returns the original pixel value of a requested image.
 * Needed reques parameters are:
 * ?identifier
 * ?lat
 * ?long
 */
router.get("/pixelValue", (req, res, next) => {
    const reqObj = {req: req};
    pixelValue(reqObj).then(resp => {
        res.send(resp)
    }).catch(error => {
        res.send({status: 'error', error: error})
    });
});

module.exports = router;
