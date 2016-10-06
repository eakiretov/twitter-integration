'use strict';

var services = require('../services');
var response = require('../middleware/response');
var Tweet = require('../models/tweet');
var Image = require('../models/image');

module.exports.list = function (req, res) {
    var twitter = services.resolve('twitter');
    return twitter.getTweetsFromTwitter(req.user)
        .then(response.list(res), response.error(res));
};

module.exports.create = function (req, res) {
    var twitter = services.resolve('twitter');
    return Tweet.create({
        user: req.user,
        text: req.body.text,
        media: req.body.media ? req.body.media.id : undefined
    }).then(function (t) {
        return twitter.postToTwitter(t, req.user);
    }).then(response.created(res), response.error(res));
};