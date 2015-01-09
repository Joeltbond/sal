var sal = (function () {
    'use strict';

    return {

        instance: function (instance) {
            var stem = Math.floor(instance),
                leaf = Math.round(instance % 1 * 10);
            return [stem, leaf];
        },

        collection: function (batch) {
            var that = this,

                collection = batch.map(function (theCase) {
                    var instance = that.instance(theCase);

                    return {
                        stem: instance[0],
                        leaf: instance[1]
                    };
                });

            return collection;

        }

    };

}());

module.exports = sal;