'use strict';

var homeRouter = require('./home');
var tweetRouter = require('./tweet');
var mediaRouter = require('./media');
var authRouter = require('./auth');

module.exports = function (app) {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
    app.use('/tweet', tweetRouter);
    app.use('/media', mediaRouter);
};