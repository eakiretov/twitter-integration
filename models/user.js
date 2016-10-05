'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    userId: String,
    userName: String,
    accessToken: String,
    oauth_token: String,
    oauth_token_secret: String
});

module.exports = mongoose.model('User', User);