'use strict';

var _ = require('underscore');

function Request() {

    var options = {
        headers: []
    };

    return {
        extend: function (data) {
            return _.extend({
                query: {}
            }, options, data);
        }
    }
}

module.exports = Request;