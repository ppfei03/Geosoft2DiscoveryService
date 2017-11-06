

/**
 * This filter works on the name of the scene.
 * Scenes, which do not contain all search elements in their name, are removed.
 * @param promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}
 * @returns {Promise}
 */
function fileNameFilter(promObj) {
  return new Promise((resolve, reject) => {
    try {
      let filterResult = [];
      if(promObj.query.identifiers) {

        let searchElements = promObj.query.identifiers.split(' ');


        for(let i = 0; i <= promObj.filterResult.length; i++) {
          if(i == promObj.filterResult.length) {
            promObj.filterResult = filterResult;
            resolve(promObj);
            break;
          }
          else {
            let sceneName = promObj.filterResult[i].sceneName;
            if(allSeachElementInSceneName(sceneName, searchElements)){
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
 * Checks if every element in the searchArray (seachElements) or in the sceneName
 * @param sceneName The string to be searched by
 * @param searchElements
 * @returns {boolean}
 */
function allSeachElementInSceneName(sceneName, searchElements) {
  let numberOfMatches = 0;
    for(let i = 0; i < searchElements.length; i++) {
        let reg = new RegExp('.*' + searchElements[i] + '.*');
        if(reg.test(sceneName)){
            numberOfMatches += 1;
        }
    }
    return (numberOfMatches == searchElements.length);
}


// /**
//  * OR Filter
//  * @param sceneName
//  * @param searchElements
//  * @returns {boolean}
//  */
// function oneSeachElementInSceneName(sceneName, searchElements) {
//     for(let i = 0; i < searchElements.length; i++) {
//         let reg = new RegExp('.*' + searchElements[i] + '.*');
//         if(reg.test(sceneName)){
//             return true;
//         }
//     }
//     return false;
// }

module.exports = {
  testSceneName: oneSeachElementInSceneName,
  fileNameFilter: fileNameFilter
}
