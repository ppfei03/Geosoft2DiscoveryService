var inside = require('point-in-polygon');


// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}
//
// Granule_Footprint
// Geolocation of the four
// corners of the Granule
// envelope (Lat, Lon, H
// coordinates with
// horizontal CRS as
// WGS84 and altitude
// given over  EGM96).
//
//
// Product_Footprint
// Consistency
// of Granule
// footprint wrt the expected
// geometry
//
// Note:  the  polygon  is  def ined  as
// five points given counter -
// clockwise oriented
// w ith the f irst
// and  last  vertices identical
//
// https://sentinel.esa.int/documents/247904/349490/S2_MSI_Product_Specification.pdf

function polygoneIntersectionFilter(promObj) {
  console.log('polygoneIntersectionFilter');
  return new Promise((resolve, reject) => {
    try {
      let tempFilterResult = [];
      if (promObj.query.bbox && bboxConsistsOfNumbers(promObj.query.bbox) && (numberOfElements(promObj.query.bbox) === 4)) {
        const queryPolygone = getSexyQueryBbox(promObj.query.bbox);

        for (let i = 0; i <= promObj.filterResult.length; i++) {
          if (i === promObj.filterResult.length) {
            promObj.filterResult = tempFilterResult;
            resolve(promObj);
            break;
          } else {
            let sentinelFootprintPolygone = getSexySentinelPOLYGON(promObj.filterResult[i].MTD.metadata[""].FOOTPRINT)

            if (queryPolygoneIntersectOrIsContained(queryPolygone, sentinelFootprintPolygone)) {
              tempFilterResult.push(promObj.filterResult[i]);
            }
          }
        }
      } else {
        console.log('No filtering of bbox');
        resolve(promObj) // No filter or no valid one: No Filter applied
      }
    } catch (error) {
      reject(error);
    }
  });
};

function queryPolygoneIntersectOrIsContained(queryPolygone, sentinelFootprintPolygone) {
  for(let i = 0; i < queryPolygone.length; i++) {
    if(inside(queryPolygone[i], sentinelFootprintPolygone)) {
      return true;
    }
  }
  return false;
};

function getSexyQueryBbox(bboxString) {
  console.log('************');
  console.log('getSexyQueryBbox');
  console.log('***************');
  bboxString = bboxString.replace(' ', '');
  let bboxArray = bboxString.split(',');
  if (bboxArray.length != 4) {
    throw {
      state: 'error',
      message: 'I need 4 coordinates: minx,miny,maxx,maxy'
    }
  }
  let polygoneArray = [
    [
      bboxArray[0], // minx
      bboxArray[1] // miny
    ],
    [
      bboxArray[2], //maxx
      bboxArray[1] //miny
    ],
    [
      bboxArray[2], //maxx
      bboxArray[3] //maxy
    ],
    [
      bboxArray[0], //minx
      bboxArray[3] //maxy
    ]
  ];

  return polygoneArray;
};


function getSexySentinelPOLYGON(FootprintString) {
  console.log('************');
  console.log('getSexySentinelPOLYGON');
  console.log('***************');
  let polygoneArray = [];
  FootprintString = FootprintString.replace('POLYGON((', '');

  FootprintString = FootprintString.replace('))', '');

  let xyPairs = FootprintString.split(',');


  for (let i = 0; i < xyPairs.length; i++) {
    let crazySplitWithEmptyArray = xyPairs[i].split(" ");
    let coordinate = [];
    crazySplitWithEmptyArray.forEach(element => {
      if (isNumeric(element)) {
        coordinate.push(element)
      }
    });
    xyPairs[i] = coordinate;
  };

  xyPairs.forEach(coordinate => {
    let coordObj = [];
    coordObj.push(coordinate[0]);
    coordObj.push(coordinate[1]);
    polygoneArray.push(coordObj);
  });
  return polygoneArray;
};


function bboxConsistsOfNumbers(bboxString) {
  let bboxArray = bboxString.split(',');
  console.log('bboxArray.length'); console.log(bboxArray.length);
  for (let i = 0; i < bboxArray.length; i++) {
    if (isNumeric(bboxArray[i])) {} else {
      return false;
    }
  }

  return true;
}

// From: https://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function numberOfElements(bboxString) {
  let stringClean = bboxString.replace(' ', '');
  stringClean = stringClean.split(',');
  console.log('stringClean.length'); console.log(stringClean.length);
  return stringClean.length;
}


module.exports = {
  getSexySentinelPOLYGON: getSexySentinelPOLYGON,
  getSexyQueryBbox: getSexyQueryBbox,
  polygoneIntersectionFilter: polygoneIntersectionFilter,
  queryPolygoneIntersectOrIsContained: queryPolygoneIntersectOrIsContained
}
