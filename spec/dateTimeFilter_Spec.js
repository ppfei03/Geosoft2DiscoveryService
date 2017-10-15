const validateDateTimeString = require('../filterFunctions/dateTimeFilter.js').validateDateTimeString;
const minDateFilter = require('../filterFunctions/dateTimeFilter.js').minDateTimeFilter;
const maxDateFilter = require('../filterFunctions/dateTimeFilter.js').maxDateTimeFilter;
const loadTestCache = require('../cache/metadataCache').loadCache;


describe('validateDateTimeString', () => {
  it('resolves a valid DateTimeString', done => {
    const validDateTimeString = "2017-10-07T10:30:21.026Z";
    const testObj = {
      filterObject: {
        minDateTime: validDateTimeString
      }
    };
    validateDateTimeString(testObj).then(result => {
      expect(result).toEqual(testObj); done();
    })
  });
  it('should throw an error, for invalid DateTimeString', done => {
    const inValidDateTimeString = "201-10-07T10:30:21.026Z";
    const testObj = {
      filterObject: {
        minDateTime: inValidDateTimeString
      }
    };
    validateDateTimeString(testObj).then(res => {expect(2).toEqual(3); done();}).catch(result => { // Using solly solution to test if it is rejected..
      expect(result).toEqual("minDateTime does not match expected format."); done();
    });
  });
});



describe('minDateFilter', () => {
  it('should not change the cache if the query is correct as currently only one Object is in the Cache', done => {
    loadTestCache().then(constructMatchingMinDateTimeRequest).then(minDateFilter).then(result => {expect(result.length).toEqual(1); done();});
  });
  it('should should Return an empty array, if given ', done => {
    loadTestCache().then(constructNotMatchingMinDateTimeRequest).then(minDateFilter).then(result => {expect(result.length).toEqual(0); done();});
  });
});

describe('maxDateFilter', () => {
  it('should not change the cache if the query is correct as currently only one Object is in the Cache', done => {
    loadTestCache().then(constructMatchingMaxDateTimeRequest).then(maxDateFilter).then(result => {expect(result.length).toEqual(1); done();});
  });
  it('should should Return an empty array, if given ', done => {
    loadTestCache().then(constructNotMatchingMaxDateTimeRequest).then(maxDateFilter).then(result => {expect(result.length).toEqual(0); done();});
  });
});

function constructMatchingMinDateTimeRequest(cache) {
  return new Promise((resolve, reject) => {
    try {
      let input = {
        arrayOfObjects: cache,
        filterObject: {
          minDateTime: "2017-10-07T10:30:21.026Z"
        }
      }
      resolve(input);
    } catch (error) {
      console.log(error);
      reject(error)
    }
  });
};

function constructNotMatchingMinDateTimeRequest(cache) {
  return new Promise((resolve, reject) => {
    try {
      let input = {
        arrayOfObjects: cache,
        filterObject: {
          minDateTime: "2018-10-07T10:30:21.026Z"
        }
      }
      resolve(input);
    } catch (error) {
      console.log(error);
      reject(error)
    }
  });
};

function constructMatchingMaxDateTimeRequest(cache) {
  return new Promise((resolve, reject) => {
    try {
      let input = {
        arrayOfObjects: cache,
        filterObject: {
          maxDateTime: "2017-10-07T10:30:21.026Z"
        }
      }
      resolve(input);
    } catch (error) {
      console.log(error);
      reject(error)
    }
  });
};

function constructNotMatchingMaxDateTimeRequest(cache) {
  return new Promise((resolve, reject) => {
    try {
      let input = {
        arrayOfObjects: cache,
        filterObject: {
          maxDateTime: "2016-10-07T10:30:21.026Z"
        }
      }
      resolve(input);
    } catch (error) {
      console.log(error);
      reject(error)
    }
  });
};
