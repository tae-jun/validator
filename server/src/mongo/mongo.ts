﻿/// <reference path="../../scripts/typings/mongodb/mongodb.d.ts" />

import mongodb = require('mongodb');
import configAll = require('../config');
import config = configAll.mongo;

var MongoClient = mongodb.MongoClient;
var callbacks: Function[] = [];     // after connect
var dbs: Object = {};               // store dbs. key is db name
var isConnected: boolean = false;   // is it connected?
var isConnecting: boolean = false;  // is it connecting?
var dbList = config.dbList;         // db name list

// connect mongodb
export function connect(callback: Function) {
    if (callback == undefined)
        callback = function () { };

    if (isConnected) {
        console.log('already connected');
        callback();
    }
    // connect
    else {
        callbacks.push(callback);
        // if it is not connecting, connect
        if (!isConnecting) {
            isConnecting = true;

            // validate every db is connected
            var validateCount = 0;

            function validate() {
                validateCount++;

                if (validateCount >= dbList.length) {
                    // connected
                    isConnected = true;
                    isConnecting = false;
                    // call callback functions
                    while (callbacks.length)
                        callbacks.shift()();
                }
            }

            dbList.forEach((dbName) => {
                MongoClient.connect(config.mongodbUrl + dbName, (err, db) => {
                    if (err) return console.dir(err);
                    // store db
                    dbs[dbName] = db;
                    // is every dbs connected?
                    validate();
                });
            });

            // if it is still not connected after timeout, throw error
            setTimeout(() => {
                if (!isConnected)
                    throw new Error('db connection timeout');
            }, config.dbConnectTimeout);
        }
    }
}

export function getDb(name: string, callback: (db: mongodb.Db) => void) {
    if (isConnected) {
        callback(dbs[name]);
    }
    else {
        // if it is connecting, push callback function into array.
        if (isConnecting)
            callbacks.push(() => {
                callback(dbs[name]);
            });
        // else, connect and pass callback function
        else
            connect(() => {
                callback(dbs[name]);
            });
    }
}