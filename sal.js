(function (window) {
    'use strict';

    var sal = (function () {
        function StemAndLeaf(value) {
            var sign = value < 0 ? '-' : '',
                absValue = Math.abs(value);
            this.stem = parseInt(sign + Math.floor(absValue), 10);
            this.leaves = [Math.round(absValue % 1 * 10)];
        }

        StemAndLeaf.prototype.pushLeaf = function(newStem) {
            this.leaves.push(newStem);
            this.leaves.sort(function (a, b) {
                return a - b;
            });
        };

        function processCollection(collection) {
            var sortedCollection = collection.splice(0).sort(function (a, b) {
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
