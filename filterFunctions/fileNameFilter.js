
// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}

function fileNameFilter(promObj) {
  return new Promise((resolve, reject) => {
    try {
      let filterResult = [];
      if(promObj.query.identifiers) {

        let searchElements = promObj.query.identifiers.split(',')


        for(let i = 0; i <= promObj.filterResult.length; i++) {
          if(i == promObj.filterResult.length) {
            promObj.filterResult = filterResult;
            resolve(promObj);
            break;
          }
          else {
            let sceneName = promObj.filterResult[i].sceneName;
            if(oneSeachElementInSceneName(sceneName, searchElements)){
              filterResult.push(promObj.filterResult[i])
            }
          }
        }

      }
      else {
        console.log('No filtering of identifiers');
        resolve(promObj) // No filter or no valid one: No Filter applied
      }
    }
    catch(error) {
      reject(error);
    }
  });
};


/**
 *
 * @param  {String} sceneName      In this string it will be searchend
 * @param  {Array} searchElements Array of Elements to seach for.
 * @return {Boolean}              If one element of the array mathes, ture. Else false
 */
function oneSeachElementInSceneName(sceneName, searchElements) {
  for(let i = 0; i < searchElements.length; i++) {
    let reg = new RegExp('.*' + searchElements[i] + '.*');
    if(reg.test(sceneName)){
      return true;
    }
  }
  return false;
}


module.exports = {
  testSceneName: oneSeachElementInSceneName,
  fileNameFilter: fileNameFilter
}
