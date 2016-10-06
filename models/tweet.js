'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tweet = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'Image'
    },
    text: String,
    media: {
        type: Schema.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Tweet', Tweet);