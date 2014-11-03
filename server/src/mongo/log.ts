import mongodb = require('mongodb');
import extend = require('extend');
import mongo = require('./mongo');

var db: mongodb.Db;
var log: mongodb.Collection;

// Testing usage only. Store callback functions
var callbacks: Function[] = [];
var isConnected: boolean = false;

export class Log implements ILog {
    _id: string;        // ISO
    state: string;
    isError: boolean;    // if true, error
    isChecked: boolean;

    constructor() {
        this._id = new Date().toISOString();
    }
}

export interface ILog {
    _id: string;            //ISO date string
    isError?: boolean;      // if true, error
    isChecked?: boolean;
    state?: string;
}

/**
 * Insert one record into log collection
 */
export function insert(data: ILog, callback?: (result: any) => void) {
    if (data.state == undefined)
        data.state = 'state undefined';

    var record = new Log();
    extend(record, data);

    if (record.isError)
        record.isChecked = false;

    log.insert(record, (err, result) => {
        if (err) return console.dir(err);

        if (callback)
            callback(result);
    });
}

/**
 * Fetch log from mongodb.
 * Parameter from is ISO date string
 */
export function fetchLog(from: string, num: number, callback: (logs: Log[]) => void): void {
    log.find({ _id: { $lt: from } }, { limit: num, sort: [['_id', 'desc']] }).toArray((err, results) => {
        if (err) return console.error(err);
        callback(results);
    });
}

/**
 * Fetch error log
 */
export function fetchErrLog(callback: (logs: Log[]) => void): void {
    log.find({
        $and: [
            { isError: true },
            { isChecked: false }]
    },
        { sort: [['_id', 'desc']] }).toArray((err, results) => {
            if (err) return console.error(err);
            callback(results);
        });
}

export function getLogCount(callback: (count: number) => void): void {
    log.count((err, result: number) => {
        if (err) console.error(err);
        callback(result);
    });
}

export function setChecked(_id: string, callback: (numUpdated: any) => void): void {
    log.update(
        { _id: _id },
        { $set: { isChecked: true } },
        { w: 1 },
        (err, numUpdated) => {
            if (err) return console.error(err);
            callback(numUpdated);
        });
}

/**
 * Testing usage only. Wait until app connected to mongodb
 */
export function waitConn(callback: Function) {
    if (isConnected)
        callback();
    else
        callbacks.push(callback);
}

// connect to validator db
mongo.getDb('validator', (_db) => {
    db = _db;
    db.collection('log', (err, coll) => {
        if (err) return console.dir(err);
        // get collection log
        log = coll;
        // connected
        isConnected = true;
        console.log('Ready to use collection LOG');
        // call callback functions
        while (callbacks.length)
            callbacks.shift()();
    });
});
