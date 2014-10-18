import express = require('express');
import config = require('../../config');
import log = require('../../mongo/validator/log');

var router = express.Router();

router
    .get('/', (req, res, next) => {
        var id = req.params['id'];      // requested id

    })
    .get('/:start/:end', (req, res, next) => {
        var start = req.params['start'];
        var end = req.params['end'];

        log.f
    });

export = router;