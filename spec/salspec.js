var sal = require('../sal');

describe('sal', function () {
    it('should be defined', function () {
        expect(sal).toBeDefined();
    });

    describe('The stem and leaf constructor method', function () {
        var instance;
        beforeEach(function () {
            instance = new sal.StemAndLeaf(33.4);
        });

        it('should be defined', function() {
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
            var repeatingInstance = new sal.StemAndLeaf(200/3);
            expect(repeatingInstance.stem).toEqual(66);
            expect(repeatingInstance.leaves).toEqual([7]);
        });

        it('should return a stem leaf of zero for whole numbers', function () {
            var wholeInstance = new sal.StemAndLeaf(49);
            expect(wholeInstance.leaves).toEqual([0]);
        });


        describe('#pushLeaf()', function () {
            beforeEach(function() {
                instance = new sal.StemAndLeaf(26.2);
            });

            it('should be defined', function () {
                expect(instance.pushLeaf).toBeDefined();
            });

            it('should add an element to the leaves array', function () {
                instance.pushLeaf(4);
                expect(instance.leaves.length).toEqual(2);
            });

            it('should sort the leaves in ascending order', function() {
                instance.pushLeaf(1);
                instance.pushLeaf(6);
                expect(instance.leaves).toEqual([1,2,6]);
            });

            it('should not affect the stem', function() {
                instance.pushLeaf(1);
                instance.pushLeaf(6);
                expect(instance.stem).toEqual(26);
            });
        });
    });

    describe('the processCollection method', function() {
        it('should be defined', function () {
            expect(sal.processCollection).toBeDefined();
        });

        it('should return an array of stem and leaf objects', function () {
            expect(sal.processCollection([22.7])[0].constructor).toEqual(sal.StemAndLeaf);
        });

        it('should add a new object for each unique stem', function () {
            var processedCollection = sal.processCollection([22.7, 33.4, -23, 22.2222]);
            expect(processedCollection.length).toEqual(3);
        });

        var myTest = sal.processCollection([22.7, 33.4, -23, 22.2222, 22.1, 22.5, 22, 22, 22, 22])
        console.log(myTest)

    });

});
