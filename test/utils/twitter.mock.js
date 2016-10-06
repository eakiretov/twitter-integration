'use strict';

var Promise = require('bluebird');

function Service() {

    this.getTwitterRequestToken = function () {
        return Promise.resolve({});
    };

    this.getTwitterAccessToken = function (oauth_token, oauth_verifier) {
        return Promise.resolve({
            user_id: '123',
            screen_name: 'name'
        });
    };

    this.getTweetsFromTwitter = function (user) {
        return Promise.resolve([]);
    };

    this.postToTwitter = function (tweet, user) {
        return Promise.resolve(tweet);
    };
}

module.exports = new Service();