'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
    data: Buffer,
    type: String,
    size: Number,
    name: String
});

Image.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.data;
    }
});

module.exports = mongoose.model('Image', Image);