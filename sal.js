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
        }

        /**
         * add a leaf to a stem and leaf object. Leaves will be sorted.
         * @param  {Number}
         */
        StemAndLeaf.prototype.pushLeaf = function(newStem) {
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

                createdStems = [],
                processedCollection = [];

            sortedCollection.forEach(function (value) {
                var instance = new StemAndLeaf(value);

                if (createdStems.indexOf(instance.stem) === -1) {
                    processedCollection.push(instance);
                    createdStems.push(instance.stem);
                } else {
                    processedCollection[createdStems.indexOf(instance.stem)].pushLeaf(instance.leaves[0]);
                }
            });

            return processedCollection;
        }

        return {
            StemAndLeaf: StemAndLeaf,
            processCollection: processCollection
        };

    }());

    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = sal;
    } else {
        window.sal = sal;
    }

}(this));
