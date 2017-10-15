
// Expected Input
// {
//   arrayOfObjects: []
//   filterObject: {}
// }
function minDateTimeFilter(input) {
  console.log('minDateFilter(input)');
  return new Promise((resolve, reject) => {
    try {
      if(input.filterObject.minDateTime && input.arrayOfObjects.length > 0) {
        validateDateTimeString(input)
        .then(filteringMinDate)
        .then(result => {resolve(result)})
        .catch(error => {throw error});

      }
      else {
        resolve(input) // No filter for minDate was given
      }
    }
    catch(error) {
      console.log(error);
      reject(error);
    }
  });
};

function maxDateTimeFilter(input) {
  console.log('maxDateFilter(input)');
  return new Promise((resolve, reject) => {
    try {
      if(input.filterObject.maxDateTime && input.arrayOfObjects.length > 0) {
        validateMaxDateTimeString(input)
        .then(filteringMaxDate)
        .then(result => {resolve(result)})
        .catch(error => {throw error});

      }
      else {
        resolve(input) // No filter for minDate was given
      }
    }
    catch(error) {
      console.log(error);
      reject(error);
    }
  });
};


function validateDateTimeString(input) {
  console.log('validateDateTimeString(dateTimeString)');
  return new Promise((resolve, reject) => {
    try {
      const dateTimeValidator = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
      const givenDateTime = input.filterObject.minDateTime;
      if(givenDateTime.match(dateTimeValidator)){
        resolve(input)
      }
      else {
        throw "minDateTime does not match expected format."
      }
    }
    catch(error) {
      console.log(error);
      reject(error)
    }
  });
};

function validateMaxDateTimeString(input) {
  console.log('validateDateTimeString(dateTimeString)');
  return new Promise((resolve, reject) => {
    try {
      const dateTimeValidator = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
      const givenDateTime = input.filterObject.maxDateTime;
      if(givenDateTime.match(dateTimeValidator)){
        resolve(input)
      }
      else {
        throw "minDateTime does not match expected format."
      }
    }
    catch(error) {
      console.log(error);
      reject(error)
    }
  });
};


function filteringMinDate(input) {
  console.log('filteringMinDate(input)');
  return new Promise((resolve, reject) => {
    try {
      const filterResults = input.arrayOfObjects.filter(object => {
        let givenDateTimeString = object['n1:Level-2A_User_Product']['n1:General_Info'][0]['L2A_Product_Info'][0]['PRODUCT_START_TIME']
        let  givenDateTime = new Date(givenDateTimeString);
        let filterDateTime = new Date(input.filterObject.minDateTime)
        return givenDateTime >= filterDateTime;
      });
      resolve(filterResults)
    }
    catch(error) {
      console.log(error);
      reject(error);
    }
  });
};

function filteringMaxDate(input) {
  console.log('filteringMaxDate(input)');
  return new Promise((resolve, reject) => {
    try {
      const filterResults = input.arrayOfObjects.filter(object => {
        let givenDateTimeString = object['n1:Level-2A_User_Product']['n1:General_Info'][0]['L2A_Product_Info'][0]['PRODUCT_START_TIME']
        let  givenDateTime = new Date(givenDateTimeString);
        let filterDateTime = new Date(input.filterObject.maxDateTime)
        return filterDateTime >= givenDateTime;
      });
      resolve(filterResults)
    }
    catch(error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  minDateTimeFilter: minDateTimeFilter,
  maxDateTimeFilter: maxDateTimeFilter,
  validateDateTimeString: validateDateTimeString,
  filteringMinDate: filteringMinDate
}
