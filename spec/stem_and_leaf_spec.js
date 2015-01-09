var sal = require('../stem_and_leaf');

describe('stem and leaf instance', function () {
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

describe('stem and leaf collection function', function () {
    it('should be defined', function () {
        expect(sal.collection).toBeDefined();
    });

    it('should return an object', function() {
        expect(sal.collection()).toEqual(jasmine.any(Object));
    });
})