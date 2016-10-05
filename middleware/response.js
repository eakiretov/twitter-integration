'use strict';
var Promise = require('bluebird');
var logger = require('./logger');

exports.item = function (res) {
    return function (item) {
        res.status(200);
        res.json({
            status: 200,
            statusText: 'OK',
            data: item
        });

        return Promise.resolve(item);
    }
};

exports.created = function (res) {
    return function (item) {
        res.status(201);
        res.json({
            status: 201,
            statusText: 'Created',
            data: item
        });
        return Promise.resolve(item);
    }
};

exports.error = function (res) {
    return function (err) {
        if (err instanceof Array) {
            err = err[0];
        }

        if (err.message) {
            logger.error(err.message);
        }

        if (err.stack) {
            logger.error(err.stack);
        }

        res.status(500);
        res.json({
            status: 500,
            statusText: err.message
        });
    }
};

exports.raw = function (res, status, data) {
    res.status(status);
    res.json(data);
    return Promise.resolve(data);
};

exports.list = function (res) {
    return function (items) {
        res.status(200);
        res.json({
            status: 200,
            statusText: 'OK',
            data: items
        });

        return Promise.resolve(items);
    }
};
