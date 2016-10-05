'use strict';

var http = require('http');
var app = require('../app');
var mongoose = require('mongoose');
var config = require('../config');
var logger = require('../middleware/logger');
var Promise = require('bluebird');

mongoose.Promise = Promise;

mongoose.connect(config.MONGO_DB_URI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + config.MONGO_DB_URI);
});

mongoose.connection.on('reconnect', function () {
    logger.info('Mongoose default connection reconnect');
});

mongoose.connection.on('timeout', function () {
    logger.info('Db timeout event');
});

mongoose.connection.on('reconnected', function () {
    logger.info('Mongoose default connection reconnected');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

var httpServer = http.createServer(app);

httpServer.listen(config.PORT, function (err) {
    if (err){
        return logger.error(err);
    }

    logger.info('Listening on port ' + config.PORT);
});