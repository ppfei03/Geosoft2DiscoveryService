// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}


function minDateFilter(promObj) {
  return new Promise((resolve, reject) => {
    try {
      let filterResult = [];
      if(promObj.query.minDate && dateIsValid(promObj.query.minDate)) {


        function minDateFilter(obj) {
          console.log("I am filtering");
          try {
            let objDateTime = new Date(obj.MTD.metadata[""].DATATAKE_1_DATATAKE_SENSING_START);
            let queryDate = new Date(promObj.query.minDate);
            console.log('objDateTime');
            console.log(objDateTime);
            console.log('queryDate');
            console.log(queryDate);
            console.log('objDateTime > queryDate');
            console.log(objDateTime > queryDate);
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
