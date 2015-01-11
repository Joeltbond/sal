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
            //TODO - integrate this into above.
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
        function processBatch(batch) {
            var sortedBatch = batch.slice(0).sort(function (a, b) {
                    return b - a;
                }),

                firstStem = new StemAndLeaf(sortedBatch[0]).stem,
                lastStem = new StemAndLeaf(sortedBatch[sortedBatch.length - 1]).stem,

                createdStems = [],
                processedBatch = [],

                i,
                j;

            function pushLeaflessStem(i) {
                var instance = new StemAndLeaf(i);
                instance.leaves = [];
                createdStems.push(instance.stem);
                processedBatch.push(instance);
            }

            function addCaseToPlot(value) {
                var instance = new StemAndLeaf(value);
                processedBatch[createdStems.indexOf(instance.stem)].pushLeaf(instance.leaves[0]);
            }

            // First initialize the plot with empty stems so that there are no gaps
            for (i = firstStem; i >= lastStem; i -= 1) {
                pushLeaflessStem(i);
            }

            // Then add the real data
            for (j = 0; j < sortedBatch.length; j += 1) {
                addCaseToPlot(sortedBatch[j]);
            }

            return processedBatch;
        }

        return {
            StemAndLeaf: StemAndLeaf,
            processBatch: processBatch
        };

    }());

    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = sal;
    } else {
        window.sal = sal;
    }

}(this));
