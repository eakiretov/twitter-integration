'use strict';

var express = require('express');
var path = require('path');
var router = require('./routes');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config');
var morgan = require('morgan');
var logger = require('./middleware/logger');
var passport = require('passport');
var passportLocal = require('./middleware/passport');

passportLocal();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {stream: logger.stream}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

router(app);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: err
    });
});


module.exports = app;
