'use strict';

var router = require('express').Router();
var home = require('../controllers/home.controller');

router.get('/', home.index);

module.exports = router;