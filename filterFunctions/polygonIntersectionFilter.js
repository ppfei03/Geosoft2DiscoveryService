// This file contains the logic to filter scenes which do not intersect with given points
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

/**
 * Removes all elements from array in promObj, which do not intersect with given points
 * @param promObj
 * @returns {Promise<any>}
 */
function polygoneIntersectionFilter(promObj) {
    console.log('polygoneIntersectionFilter');
    return new Promise((resolve, reject) => {
        try {
            let tempFilterResult = [];
            console.log("promObj.query.bbox"); console.log(promObj.query.bbox);
            console.log("numberOfElements(promObj.query.bbox)"); console.log(numberOfElements(promObj.query.bbox))
            if (promObj.query.bbox && bboxConsistsOfNumbers(promObj.query.bbox) && (numberOfElements(promObj.query.bbox) === 4)) {
                const queryPolygone = getSexyQueryBbox(promObj.query.bbox);

                for (let i = 0; i <= promObj.filterResult.length; i++) {
                    if (i === promObj.filterResult.length) {
                        promObj.filterResult = tempFilterResult;
                        resolve(promObj);
                        break;
                    } else {
                        console.log("promObj.filterResult.length"); console.log(promObj.filterResult.length);
                        console.log("i"); console.log(i)
                        let sentinelFootprintPolygone = getSexySentinelPOLYGON(promObj.filterResult[i].MTD.metadata[""].FOOTPRINT)

                        if (queryPolygoneIntersectOrIsContained(queryPolygone, sentinelFootprintPolygone) || queryPolygoneIntersectOrIsContained(sentinelFootprintPolygone, queryPolygone)) {
                            console.log("PushingPolygoneToFilterResult");
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

/**
 * Checks if a point is inside of a polygone
 * @param queryPolygone
 * @param sentinelFootprintPolygone
 * @returns {boolean}
 */
function queryPolygoneIntersectOrIsContained(queryPolygone, sentinelFootprintPolygone) {
    console.log("queryPolygoneIntersectOrIsContained");
    console.log(sentinelFootprintPolygone)
    for (let i = 0; i < queryPolygone.length; i++) {
        console.log("Check point " +queryPolygone[i])
        if (inside(queryPolygone[i], sentinelFootprintPolygone)) {
            return true;
        }
    }
    console.log("return fals polygone intersect")
    return false;
};

/**
 * Transforms a string, which represents a boundingbox in a more processable format
 * @param bboxString
 * @returns {*[]}
 */
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
        [[
            parseFloat(bboxArray[0]),// minx
            parseFloat(bboxArray[1]) // miny
        ]],
        [[
            parseFloat(bboxArray[2]), //maxx
            parseFloat(bboxArray[1]) //miny
        ]],
        [[
            parseFloat(bboxArray[2]), //maxx
            parseFloat(bboxArray[3]) //maxy
        ]],
        [[
            parseFloat(bboxArray[0]), //minx
            parseFloat(bboxArray[3]) //maxy
        ]]
    ];

    console.log("sexyPolygonBbox"); console.log(polygoneArray)

    return polygoneArray;
};

/**
 * Transforms a string, which represents a boundingbox in a more processable format
 * @param bboxString
 * @returns {*[]}
 */
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
                coordinate.push(parseFloat(element));
            }
        });
        xyPairs[i] = coordinate;
    }
    ;

    xyPairs.forEach(coordinate => {
        let coordObj = [];
        coordObj.push(coordinate[0]);
        coordObj.push(coordinate[1]);
        polygoneArray.push(coordObj);
    });
    return polygoneArray;
};

/**
 * Checks if the the given boundinbox consists of numbers
 * @param bboxString
 * @returns {boolean}
 */
function bboxConsistsOfNumbers(bboxString) {
    let bboxArray = bboxString.split(',');
    console.log('bboxArray.length');
    console.log(bboxArray.length);
    for (let i = 0; i < bboxArray.length; i++) {
        if (isNumeric(bboxArray[i])) {
        } else {
            return false;
        }
    }
    return true;
}


/**
 * Checks whether something is a number.
 * From: https://stackoverflow.com/questions/9716468/is-there-any-function-like-isnumeric-in-javascript-to-validate-numbers
 * @param n
 * @returns {boolean}
 */
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


/**
 * Returns the number of elements in a comma separated sting
 * @param bboxString
 * @returns {number}
 */
function numberOfElements(bboxString) {
    let stringClean = bboxString.replace(' ', '');
    stringClean = stringClean.split(',');
    return stringClean.length;
}


module.exports = {
    getSexySentinelPOLYGON: getSexySentinelPOLYGON,
    getSexyQueryBbox: getSexyQueryBbox,
    polygoneIntersectionFilter: polygoneIntersectionFilter,
    queryPolygoneIntersectOrIsContained: queryPolygoneIntersectOrIsContained
}
