// This file contains test for testing the file for min. date. Run npm test for tests

// promObj is passed through the filters. It is: {filterResult: copyOfCache, query: req.query}

const queryPolygoneIntersectOrIsContained = require('../filterFunctions/polygonIntersectionFilter.js').queryPolygoneIntersectOrIsContained;



describe('queryPolygoneIntersectOrIsContained', () => {
  it('returns true, if point in polygone', done => {
        var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ] ];
        var point = [[ 1.5, 1.5 ]];
        let res = queryPolygoneIntersectOrIsContained(point, polygon)
        console.log(res);
        expect(res).toEqual(true);
        done();
  });
    it('returns true, if point in polygone', done => {
        var polygon = [ [ -180, -90 ] ,
             [ 180, -90 ] ,
             [ 180, 90 ] ,
            [ -180, 90 ] ]

        ;
        var point = [[ -91.04181910203256 , 23.498246176850945]];
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
