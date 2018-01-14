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
    it('returns true, if point in polygone', done => {
        var polygon = [ [-5.792574778325615, 15.21306525473414],
            [-5.77238811748588, 15.30284082872241],
            [-5.759542476122597, 15.35996672719849],
            [-4.772206157911985, 15.37008837747189],
            [-4.764121373097517, 14.377826199225611],
            [-5.781720811443401, 14.368052294534657],
            [-5.792574778325615, 15.21306525473414] ];
        var point = [[ -5.231, 14.9295]];
        //var point = [[14.9295, -5.231]];
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


