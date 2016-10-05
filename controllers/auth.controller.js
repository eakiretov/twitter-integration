'use strict';

var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/user');
var response = require('../middleware/response');
var twitter = require('../services/twitter');

module.exports.twitter = function (req, res) {
    if (!req.body.oauth_token && !req.body.oauth_verifier) {
        return twitter.getTwitterRequestToken()
            .then(function (data) {
                res.send(data);
            }, response.error(res));
    } else {
        return twitter.getTwitterAccessToken(req.body.oauth_token, req.body.oauth_verifier)
            .then(function (perm_data) {
                return User.findOne({userId: perm_data.user_id}).then(function (user) {
                    if (user) {
                        user.oauth_token = perm_data.oauth_token;
                        user.oauth_token_secret = perm_data.oauth_token_secret;
                        return user.save();
                    } else {
                        return User.create({
                            userId: perm_data.user_id,
                            userName: perm_data.screen_name,
                            oauth_token: perm_data.oauth_token,
                            oauth_token_secret: perm_data.oauth_token_secret
                        });
                    }
                });
            })
            .then(function (user) {
                var accessToken = jwt.sign({userId: user.userId, userName: user.userName}, config.BASE_URI);
                return User.update({accessToken: accessToken}).then(function () {
                    return response.raw(res, 200, {
                        token: accessToken
                    });
                });
            })
            .then(null, response.error(res));
    }
};