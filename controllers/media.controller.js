'use strict';

var fs = require('fs');
var Image = require('../models/image');
var response = require('../middleware/response');

module.exports.create = function (req, res) {
    var file = req.files.file;
    return Image.create({
        data: fs.readFileSync(file.path),
        type: file.type,
        size: file.size,
        name: file.originalFilename
    }).then(response.item(res), response.error(res));
};

module.exports.get = function (req, res) {
    return Image.findById(req.params.id)
        .then(function (image) {
            res.contentType(image.type);
            res.end(image.data, 'binary');
        }, response.error(res));
};