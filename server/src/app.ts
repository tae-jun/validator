/// <reference path="../scripts/typings/express/express.d.ts" />
/// <reference path="../scripts/typings/node/node.d.ts" />

// node modules
import express = require('express');
import path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// my modules
import configAll = require('./config');
import config = configAll.web;
import mongo = require('./mongo/mongo');
import logger = require('./serial/logger');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/bower_components', express.static(path.join(__dirname, '../../client/bower_components')));

// routes
app.use('/', require('./routes/index'));

// start server after connect mongodb
mongo.connect(() => {
    app.listen(config.port, () => {
        console.log('Web server started at port ' + config.port);
    });

    logger.start();
});

export = app;