'use strict';

var auth = require('../middleware/auth');
var router = require('express').Router();
var tweet = require('../controllers/tweet.controller');

router.get('/', auth.authenticate, tweet.list);
router.post('/', auth.authenticate, tweet.create);

module.exports = router;