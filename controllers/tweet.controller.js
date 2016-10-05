'use strict';

var twitter = require('../services/twitter');
var response = require('../middleware/response');
var Tweet = require('../models/tweet');
var Image = require('../models/image');

module.exports.list = function (req, res) {
    var client = twitter.getTwitterClient(req.user);
    return twitter.getTweetsFromTwitter(req.user.userName, client)
        .then(response.list(res), response.error(res));
};

module.exports.create = function (req, res) {
    return Tweet.create({
        text: req.body.text,
        media: req.body.media ? req.body.media.id : undefined
    }).then(function (t) {
        var client = twitter.getTwitterClient(req.user);
        return twitter.postToTwitter(t, client);
    }).then(response.item(res), response.error(res));
};