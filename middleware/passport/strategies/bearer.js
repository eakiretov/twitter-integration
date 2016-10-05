'use strict';

var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../../../models/user');

exports.strategy = function () {
    return new BearerStrategy(
        function (token, callback) {
            User.findOne({accessToken: token})
                .then(function (user) {
                    if (!user) {
                        var err = new Error('Unknown token');
                        err.status = 401;
                        return callback(err, false);
                    }

                    return callback(null, user);
                });
        }
    );
};