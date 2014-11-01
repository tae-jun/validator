import express = require('express');
import config = require('../../config');
import log = require('../../mongo/log');

var router = express.Router();

router
    .get('/', (req, res, next) => {
        var id = req.params['id'];      // requested id

    })
    .get('/:from/:num', (req, res, next) => {
        var from = req.params['from'];
        var num = req.params['num'];

        log.fetchLog(from, num, (logs) => {
            res.json(logs);
        });
    });

export = router;