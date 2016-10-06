var mongoose = require('mongoose');
var config = require('../config');
var User = require('../models/user');
var Image = require('../models/image');
var Promise = require('bluebird');
var controller = require('../controllers/media.controller');
var sinon = require('sinon');
var assert = require('chai').assert;
var Request = require('./utils/request');
var Response = require('./utils/response');
var res = new Response();
var req = new Request();
var path = require('path');
var json = sinon.spy(res, 'json');
var status = sinon.spy(res, 'status');

describe('MediaController', function () {

    var imageId = null;

    before(function (done) {
        mongoose.Promise = Promise;
        mongoose.connect(config.TESTS.MONGO_DB_URI, function () {
            done();
        });
    });

    after(function (done) {
        mongoose.connection.db.dropDatabase();
        mongoose.disconnect(done);
    });

    describe('creating media', function () {
        before(function (done) {
            json.reset();

            var request = req.extend({
                files: {
                    file: {
                        path: path.join(__dirname, 'resources', 'i.jpeg'),
                        type: 'image/png',
                        size: 123123,
                        originalFilename: 'i.jpeg'
                    }
                }
            });

            controller.create(request, res).then(function () {
                done();
            });
        });

        it('should have image', function (done) {
            var result = json.getCall(0).args[0];
            assert.equal(result.status, 201);
            assert.equal(result.data.size, 123123);
            assert.equal(result.data.type, 'image/png');
            assert.equal(result.data.name, 'i.jpeg');
            imageId = result.data._id;
            done();
        });

        after(function (done) {
            Image.findById(imageId).then(function (image) {
                assert(image);
                done();
            });
        });
    });

    describe('getting media', function () {

        before(function (done) {
            status.reset();

            var request = req.extend({
                params: {
                    id: imageId
                }
            });

            controller.get(request, res).then(function () {
                done();
            });
        });

        it('should return 200', function (done) {
            var st = status.getCall(0).args[0];
            assert.equal(st, 200);
            done();
        });

    });

});