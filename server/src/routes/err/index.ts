import express = require('express');
import log = require('../../mongo/log');

var router = express.Router();

router
    .get('/', (req, res, next) => {
        log.fetchErrLog((logs) => {
            res.json(logs);
        });
    })
    .post('/:id', (req, res, next) => {
        var _id = req.params['id'];

        log.setChecked(_id, (numUpdated) => {
            res.json(numUpdated);
        });
    });

export = router;