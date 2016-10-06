'use strict';

function Response() {
    return {
        status: function () {
            return this;
        },
        json: function () {
            return this;
        },
        contentType: function () {
            return this;
        },
        end: function () {
            return this;
        }
    };
}

module.exports = Response;