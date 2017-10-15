const express = require("express");
const router = express.Router();
const logger = require('winston')


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
  logger.log('info', 'Request at route /search', req.query);
  res.send('/search')
});


module.exports = router;
