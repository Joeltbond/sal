var sal = (function () {
    'use strict';
    return {
        instance: function (instance) {
            var stem = Math.floor(instance),
                leaf = Math.round(instance % 1 * 10);
            return [stem, leaf];
        },
        collection: function () {
            return {};
        }
    };
}());

module.exports = sal;