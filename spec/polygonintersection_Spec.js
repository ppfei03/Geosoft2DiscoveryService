// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}

const queryPolygoneIntersectOrIsContained = require('../filterFunctions/polygonIntersectionFilter.js').queryPolygoneIntersectOrIsContained;
const polygoneIntersectionFilter = require('../filterFunctions/polygonIntersectionFilter.js').polygoneIntersectionFilter;


// describe('polygoneIntersectionFilter', () => {
//   it('returns polygones which intersect with a given bbox', done => {
//       let testObj = {
//         filterResult: testArray, query: {bbox: '7.508721662869659, 45.95294906157136, 7.468260721947195, 46.07045453324583'}
//       }
//
//         polygoneIntersectionFilter(testObj).then(res => {
//         expect(res.filterResult.length).toEqual(4);
//         done();
//       });
//   });
// });



describe('queryPolygoneIntersectOrIsContained', () => {
  it('returns true, if point in polygone', done => {
        var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ] ];
        var point = [[ 1.5, 1.5 ]];
        let res = queryPolygoneIntersectOrIsContained(point, polygon)
        console.log(res);
        expect(res).toEqual(true);
        done();
  });
  it('returns false, if point not in polygone', done => {
        var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
        var point = [[ 0, 1.5 ]];
        let res = queryPolygoneIntersectOrIsContained(point, polygon)
        console.log(res);
        expect(res).toEqual(false);
        done();
  });
});
