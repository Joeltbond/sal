var sal = require('../stem_and_leaf');

describe('The stem and leaf instance function', function () {
    it('should be defined', function () {
        expect(sal.instance).toBeDefined ();
    });

    it('should return an array of two numbers', function () {
        var stemAndLeafArray = sal.instance(23.4);

        expect(Array.isArray(stemAndLeafArray)).toBe(true);
        expect(stemAndLeafArray.length).toEqual(2);
        expect(typeof stemAndLeafArray[0] === 'number'
                && typeof stemAndLeafArray[1] === 'number').toBe(true);
    });

    it('should return the stem as the first element of the array', function () {
        expect(sal.instance(23.4)[0]).toEqual(23);
        expect(sal.instance(10.6)[0]).toEqual(10);
    });

    it('should return the stem as the first element of the array', function () {
        expect(sal.instance(23.4)[1]).toEqual(4);
        expect(sal.instance(10.6)[1]).toEqual(6);
    });
});

describe('The stem and leaf collection function', function () {
    var single, mulptiple;

    beforeEach(function () {
        single = sal.collection([133.49]);
        mulptiple = sal.collection([33.4, 97.888, 43.9, 33]);
    });

    it('should be defined', function () {
        expect(sal.collection).toBeDefined();
    });

    it('should return an array of objects', function () {
        expect(single).toEqual(jasmine.any(Array));
    });

    it('should return the stem for a single element', function () {
        expect(single[0].stem).toEqual(133);
    });

    it('should return the leaf for a single element', function () {
        expect(single[0].leaf).toEqual(5);
    });
})