'use strict';

var passport = require('passport');
var bearer = require('./strategies/bearer');
var User = require('../../models/user');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, function (err, user) {
            done(err, user);
        });
    });

    passport.use(bearer.strategy());
};