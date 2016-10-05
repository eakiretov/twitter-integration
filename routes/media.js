'use strict';

var auth = require('../middleware/auth');
var router = require('express').Router();
var media = require('../controllers/media.controller');
var multipartMiddleware = require('connect-multiparty')();

router.get('/:id', media.get);
router.post('/', auth.authenticate, multipartMiddleware, media.create);

module.exports = router;