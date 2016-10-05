'use strict';

var router = require('express').Router();
var auth = require('../controllers/auth.controller');

router.post('/twitter', auth.twitter);

module.exports = router;