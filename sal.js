(function (window) {
    'use strict';

    var sal = (function () {

        /**
         * Creates a new stem and leaf object
         * @param {Number}
         * @class
         */
        function StemAndLeaf(value) {
            var sign = value < 0 ? '-' : '',
                absValue = Math.abs(value);
            this.stem = parseInt(sign + Math.floor(absValue), 10);
            this.leaves = [Math.round(absValue % 1 * 10)];

            //round up stem if leaf is 10
            //TODO!
            if (this.leaves[0] === 10) {
                this.stem += 1;
                this.leaves[0] = 0;
            }
        }

        /**
         * add a leaf to a stem and leaf object. Leaves will be sorted.
         * @param  {Number}
         */
        StemAndLeaf.prototype.pushLeaf = function (newStem) {
            this.leaves.push(newStem);
            this.leaves.sort(function (a, b) {
                return a - b;
            });
        };

        /**
         * Take an array of numbers and return a sorted array of stem and leaf objects
         * @param  {Number[]}
         * @return {Object[]}
         */
        function processCollection(collection) {
            var sortedCollection = collection.slice(0).sort(function (a, b) {
                    return b - a;
                }),

                firstStem = new StemAndLeaf(sortedCollection[0]).stem,
                lastStem = new StemAndLeaf(sortedCollection[sortedCollection.length - 1]).stem,

                createdStems = [],
                processedCollection = [],

                i,
                j;

            function pushLeaflessStem(i) {
                var instance = new StemAndLeaf(i);
                instance.leaves = [];
                createdStems.push(instance.stem);
                processedCollection.push(instance);
            }

            function addDataToPlot(value) {
                var instance = new StemAndLeaf(value);
                processedCollection[createdStems.indexOf(instance.stem)].pushLeaf(instance.leaves[0]);
            }

            // First initialize the plot with empty stems so that there are no gaps
            for (i = firstStem; i >= lastStem; i -= 1) {
                pushLeaflessStem(i);
            }

            // Then add the real data
            for (j = 0; j < sortedCollection.length; j += 1) {
                addDataToPlot(sortedCollection[j]);
            }

            return processedCollection;
        }

        return {
            StemAndLeaf: StemAndLeaf,
            processCollection: processCollection
        };

    }());

    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = sal;
    } else {
        window.sal = sal;
    }

}(this));
