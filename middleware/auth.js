'use strict';

var passport = require('passport');

exports.authenticate = function (req, res, next) {
    var auth = passport.authenticate('bearer', {session: false});
    auth(req, res, function (err) {
        next(err);
    });
};