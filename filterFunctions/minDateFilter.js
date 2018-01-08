// // This file contains the logic to filter by min. Date
// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}

/**
 * Removes all elements from array in promObj, which do not math the given max date with objDateTime > queryDate
 * @param promObj
 * @returns {Promise<any>}
 */
function minDateFilter(promObj) {
  console.log('minDateFilter');
  return new Promise((resolve, reject) => {
    try {
      let filterResult = [];
      if(promObj.query.minDate && dateIsValid(promObj.query.minDate)) {


        function minDateFilter(obj) {
          console.log("I am filtering");
          try {
            let objDateTime = new Date(obj.MTD.metadata[""].DATATAKE_1_DATATAKE_SENSING_START);
            let queryDate = new Date(promObj.query.minDate);
            return objDateTime > queryDate;
          }
          catch(error) {
            console.log(error);
            return false;
          }
        }


        filterResult = promObj.filterResult.filter(minDateFilter);
        promObj.filterResult = filterResult;

        resolve(promObj)

      }
      else {
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
  minDateFilter: minDateFilter
}
