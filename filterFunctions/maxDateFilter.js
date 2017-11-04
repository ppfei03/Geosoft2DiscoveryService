// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}


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
            console.log('objDateTime');
            console.log(objDateTime);
            console.log('queryDate');
            console.log(queryDate);
            console.log('queryDate < objDateTime');
            console.log(queryDate < objDateTime);
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
