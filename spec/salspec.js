var sal = require('../sal');

describe('sal', function () {
    'use strict';

    it('should be defined', function () {
        expect(sal).toBeDefined();
    });

    describe('The stem and leaf constructor method', function () {
        var instance;
        beforeEach(function () {
            instance = new sal.StemAndLeaf(33.4);
        });

        it('should be defined', function () {
            expect(sal.StemAndLeaf).toBeDefined();
        });

        it('should return an object that has the stem as a property', function () {
            expect(instance.stem).toEqual(33);
        });

        it('should return an object that has an array as a leaves property', function () {
            expect(instance.leaves).toEqual([4]);
        });

        it('should have a zero stem for a value of zero', function () {
            var zeroInstance = new sal.StemAndLeaf(0);
            expect(zeroInstance.stem).toEqual(0);
        });

        it('should have a zero leaf for a value of zero', function () {
            var zeroInstance = new sal.StemAndLeaf(0);
            expect(zeroInstance.leaves).toEqual([0]);
        });

        it('should work for negative numbers', function () {
            var negativeInstance = new sal.StemAndLeaf(-31.7);
            expect(negativeInstance.stem).toEqual(-31);
            expect(negativeInstance.leaves).toEqual([7]);
        });

        it('should round repeating decimals to the nearest tenth', function () {
            var repeatingInstance = new sal.StemAndLeaf(200 / 3);
            expect(repeatingInstance.stem).toEqual(66);
            expect(repeatingInstance.leaves).toEqual([7]);
        });

        it('should return a stem leaf of zero for whole numbers', function () {
            var wholeInstance = new sal.StemAndLeaf(49);
            expect(wholeInstance.leaves).toEqual([0]);
        });

        it('should not return a leaf of 10', function () {
            var highLeafInstance = new sal.StemAndLeaf(9.99);
            expect(highLeafInstance.leaves).not.toEqual([10]);
        });

        it('should increment the stem if the leaf is 10 and set the leaf to 0', function () {
            var highLeafInstance = new sal.StemAndLeaf(9.99);
            expect(highLeafInstance.leaves).toEqual([0]);
            expect(highLeafInstance.stem).toEqual(10);
        });

        describe('#pushLeaf()', function () {
            beforeEach(function () {
                instance = new sal.StemAndLeaf(26.2);
            });

            it('should be defined', function () {
                expect(instance.pushLeaf).toBeDefined();
            });

            it('should add an element to the leaves array', function () {
                instance.pushLeaf(4);
                expect(instance.leaves.length).toEqual(2);
            });

            it('should sort the leaves in ascending order', function () {
                instance.pushLeaf(1);
                instance.pushLeaf(6);
                expect(instance.leaves).toEqual([1, 2, 6]);
            });

            it('should not affect the stem', function () {
                instance.pushLeaf(1);
                instance.pushLeaf(6);
                expect(instance.stem).toEqual(26);
            });
        });
    });

    describe('the processCollection method', function () {
        it('should be defined', function () {
            expect(sal.processCollection).toBeDefined();
        });

        it('should return an array of stem and leaf objects', function () {
            expect(sal.processCollection([22.7])[0].constructor).toEqual(sal.StemAndLeaf);
        });

        it('should add a new object for each unique stem', function () {
            var processedCollection = sal.processCollection([22.7, 22.2222, 22.726]);
            expect(processedCollection.length).toEqual(1);
        });

        it('should fill in the gaps between to cases with leafless stems', function () {
            var collectionWithGap = sal.processCollection([21.2, 23.3]);
            expect(collectionWithGap.length).toEqual(3);
            expect(collectionWithGap[1].leaves.length).toEqual(0);
        });

    });

});
