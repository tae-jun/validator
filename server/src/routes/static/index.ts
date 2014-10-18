import express = require('express');
import config = require('../../config');

var router = express.Router();

router
    .get('/:file', (req, res, next) => {
        var file = req.params['file'];      // requested file's name
        res.sendFile(file, { root: config.distFolder });
    });

export = router;