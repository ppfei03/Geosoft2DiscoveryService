const express = require("express");
const router = express.Router();

const filter = require('./filterFunctions/filter.js').filter;


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
router.get("/search", (req, res, next) => {
  console.log('info', 'Request at route /search', req.query);

  res.send('/search')
});


// Endpoint for development, returning the whole cache
router.get("/datasets", (req, res, next) => {


      filter(req).then(filteredCache => {res.send(filteredCache.filterResult)}).catch(err => {res.send({status: 'errir', error: err})})
      // console.log('info', 'Request at route /getCache', req.query);
      // res.send(metadataCache.getCache());


});

module.exports = router;
