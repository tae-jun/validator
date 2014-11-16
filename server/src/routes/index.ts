import express = require('express');
import configAll = require('../config');
import config = configAll.web;

var router = express.Router();

router
    // GET /
    .get('/', (req, res, next) => {
        res.sendFile('index.html', { root: config.distFolder });
    })
    // set public folder /static
    .use('/static', require('./static/index'))
    .use('/log', require('./log/index'))
    .use('/err', require('./err/index'));

export = router;