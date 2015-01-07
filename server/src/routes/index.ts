import express = require('express');
import configAll = require('../config');
import config = configAll.web;
import path = require('path');

var router = express.Router();

router
// GET /
    .get('/', (req, res, next) => {
        res.sendFile('index.html', { root: config.distFolder });
    })
// set public folder /static
    .use('/', express.static(path.resolve(__dirname, '../../../client/dist')))
    .use('/tpl', require('./tpl/index'))
    .use('/log', require('./log/index'))
    .use('/err', require('./err/index'));

export = router;