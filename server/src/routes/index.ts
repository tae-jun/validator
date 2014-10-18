import express = require('express');
import config = require('../config');

var router = express.Router();

router
    // GET /
    .get('/', (req, res, next) => {
        res.sendFile('index.html', { root: config.distFolder });
    })
    // set public folder /static
    .use('/static', require('./static/index'))
    // GET /record
    .use('/log', require('./log/index'));

export = router;