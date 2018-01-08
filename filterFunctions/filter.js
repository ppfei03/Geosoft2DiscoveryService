// Main file. Aggregates the filter functionalities
// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}

const minDateFilter = require('./minDateFilter.js').minDateFilter;
const maxDateFilter = require('./maxDateFilter.js').maxDateFilter;
const fileNameFilter = require('./fileNameFilter.js').fileNameFilter;
const polygoneIntersectionFilter = require('./polygonIntersectionFilter.js').polygoneIntersectionFilter;
const metadataCache = require('../cache/metadataCache');

/**
 * Wrapping the filters of this service.
 * A copy of the cache runs through the filters. If a filtercondition does not match, the element is removed from the array
 * @param req Contains the filter conditions
 * @returns {Promise<any>}
 */
function filter(req) {
  return new Promise((resolve, reject) => {
    try {

      let promObj = {filterResult: null, query: null};

      promObj.filterResult = JSON.parse( JSON.stringify(metadataCache.getCache())  );
      promObj.query = req.query;
      minDateFilter(promObj).then(maxDateFilter).then(fileNameFilter).then(polygoneIntersectionFilter).then(res => {resolve(res)});
    }
    catch(error) {
      resolve(error)
    }
  });
};

module.exports = {
  filter: filter
}
