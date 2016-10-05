'use strict';

var request = require('request');
var qs = require('querystring');
var User = require('../models/user');
var Twitter = require('twitter');
var config = require('../config');
var Image = require('../models/image');
var Promise = require('bluebird');

module.exports.getTwitterRequestToken = function () {
    return new Promise(function (resolve, reject) {
        var oauth_request_token = {
                callback: config.BASE_URI,
                consumer_key: config.TWITTER_CONSUMER_KEY,
                consumer_secret: config.TWITTER_CONSUMER_SECRET
            },
            request_token_url = config.TWITTER_REQUEST_TOKEN_URL;

        request.post({url: request_token_url, oauth: oauth_request_token}, function (err, r, body) {
            if (err) {
                return reject(err);
            }

            resolve(qs.parse(body));
        });
    });
};

module.exports.getTwitterAccessToken = function (oauth_token, oauth_verifier) {
    return new Promise(function (resolve, reject) {
        var oauth_access_token = {
                consumer_key: config.TWITTER_CONSUMER_KEY,
                consumer_secret: config.TWITTER_CONSUMER_SECRET,
                token: oauth_token,
                verifier: oauth_verifier
            },
            access_token_url = config.TWITTER_ACCESS_TOKEN_URL;

        request.post({url: access_token_url, oauth: oauth_access_token}, function (e, r, body) {
            if (e) {
                return reject(e);
            }

            var perm_data = qs.parse(body);
            resolve(perm_data);
        });
    })
};

module.exports.getTweetsFromTwitter = function (screenName, client) {
    return new Promise(function (resolve, reject) {
        client.get('statuses/user_timeline', {screen_name: screenName}, function (error, tweets, response) {
            if (error) {
                return reject(error);
            }

            resolve(tweets);
        });
    });
};

module.exports.postToTwitter = function (tweet, client) {
    return Image.findById(tweet.media)
        .then(function (image) {
            return new Promise(function (resolve, reject) {
                if (image) {
                    client.post('media/upload', {media: image.data}, function (error, media, response) {
                        if (error) {
                            return reject(error);
                        }

                        resolve(media);
                    });
                } else {
                    resolve(null);
                }
            });
        })
        .then(function (media) {
            return new Promise(function (resolve, reject) {
                var status = {
                    status: tweet.text
                };

                if (media) {
                    status.media_ids = media.media_id_string
                }

                client.post('statuses/update', status, function (error, tweet, response) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(tweet);
                });
            });
        });
};

module.exports.getTwitterClient = function getTwitterClient(user) {
    return new Twitter({
        consumer_key: config.TWITTER_CONSUMER_KEY,
        consumer_secret: config.TWITTER_CONSUMER_SECRET,
        access_token_key: user.oauth_token,
        access_token_secret: user.oauth_token_secret
    });
};