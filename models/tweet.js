'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tweet = new Schema({
    text: String,
    media: {
        type: Schema.ObjectId,
        ref: 'Image'
    }
});

module.exports = mongoose.model('Tweet', Tweet);