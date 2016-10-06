var mongoose = require('mongoose');
var config = require('../config');
var User = require('../models/user');
var Tweet = require('../models/tweet');
var Promise = require('bluebird');
var controller = require('../controllers/tweet.controller');
var sinon = require('sinon');
var assert = require('chai').assert;
var Request = require('./utils/request');
var Response = require('./utils/response');
var services = require('../services');
var res = new Response();
var req = new Request();
var json = sinon.spy(res, 'json');
var status = sinon.spy(res, 'status');

var user = {
    _id: '000000000000000000000010',
    userName: 'user name',
    userId: '123'
};

describe('TweetController', function () {

    services.inject('twitter', require('./utils/twitter.mock'));

    var tweetId = null;

    before(function (done) {
        mongoose.Promise = Promise;
        mongoose.connect(config.TESTS.MONGO_DB_URI, function () {
            Promise.all([
                User.create(user)
            ]).then(function () {
                done();
            });
        });
    });

    after(function (done) {
        mongoose.connection.db.dropDatabase();
        mongoose.disconnect(done);
    });

    describe('creating tweet', function () {
        before(function (done) {
            json.reset();

            var request = req.extend({
                user: user,
                body: {
                    text: 'test'
                }
            });

            controller.create(request, res).then(function () {
                done();
            });
        });

        it('should have tweet', function (done) {
            var result = json.getCall(0).args[0];
            assert.equal(result.status, 201);
            tweetId = result.data._id;
            done();
        });

        after(function (done) {
            Tweet.findById(tweetId).then(function (tweet) {
                assert(tweet);
                done();
            });
        });
    });

});