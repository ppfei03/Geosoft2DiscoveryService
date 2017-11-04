// Main file. Aggregates the filter functionalities
// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}

const minDateFilter = require('./minDateFilter.js').minDateFilter;
const metadataCache = require('../cache/metadataCache');


function filter(req) {
  return new Promise((resolve, reject) => {
    try {

      let promObj = {filterResult: null, query: null};

      promObj.filterResult = JSON.parse( JSON.stringify(metadataCache.getCache())  );
      promObj.query = req.query;
      minDateFilter(promObj).then(res => {resolve(res)});
    }
    catch(error) {
      resolve(error)
    }
  });
};

module.exports = {
  filter: filter
}
