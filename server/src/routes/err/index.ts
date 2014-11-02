import express = require('express');
import log = require('../../mongo/log');

var router = express.Router();

router
    .get('/', (req, res, next) => {
        log.fetchErrLog((logs) => {
            res.json(logs);
        });
    });

export = router;