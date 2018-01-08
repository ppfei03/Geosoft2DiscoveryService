// This file contains the logic to filter by max. Date
// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}

/**
 * Removes all elements from array in promObj, which do not math the given max date with queryDate < objDateTime
 * @param promObj
 * @returns {Promise<any>}
 */
function maxDateFilter(promObj) {
    console.log('maxDateFilter');
  return new Promise((resolve, reject) => {
    try {
      let filterResult = [];
      if(promObj.query.maxDate && dateIsValid(promObj.query.maxDate)) {

        function maxDateFilter(obj) {
          console.log("I am filtering maxDate");
          try {
            let objDateTime = new Date(obj.MTD.metadata[""].DATATAKE_1_DATATAKE_SENSING_START);
            let queryDate = new Date(promObj.query.maxDate);
            return  queryDate < objDateTime;
          }
          catch(error) {
            console.log(error);
            return false;
          }
        }

        filterResult = promObj.filterResult.filter(maxDateFilter);
        promObj.filterResult = filterResult;

        resolve(promObj)

      }
      else {
        console.log('No filtering of max Date');
        resolve(promObj) // No filter or no valid one: No Filter applied
      }
    }
    catch(error) {
      reject(error);
    }
  });
};

/**
 * Checks if the given date as an query argument is valid
 * @param date
 * @returns {boolean}
 */
function dateIsValid(date) {
  let dateResult = new Date(date);
  if(dateResult == 'Invalid Date') {
    return false
  }
  else {
    return true;
  }
}


module.exports = {
  maxDateFilter: maxDateFilter
}
