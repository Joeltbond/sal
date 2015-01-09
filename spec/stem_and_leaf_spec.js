var stemAndLeaf = require('../stem_and_leaf');

describe('stem and leaf', function () {
    it('should be defined', function () {
        expect(stemAndLeaf).toBeDefined ();
    });

    it('should return an array of two numbers', function () {
        var stemAndLeafArray = stemAndLeaf(23.4, 10);

        expect(Array.isArray(stemAndLeafArray)).toBe(true);
        expect(stemAndLeafArray.length).toEqual(2);
        expect(typeof stemAndLeafArray[0] === 'number'
                && typeof stemAndLeafArray[1] === 'number').toBe(true);
    });
});