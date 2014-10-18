import mongodb = require('mongodb');
import extend = require('extend');
import mongo = require('../mongo');

var db: mongodb.Db;
var log: mongodb.Collection;

// Testing usage only. Store callback functions
var callbacks: Function[] = [];
var isConnected: boolean = false;

export class Record implements IRecord {
    _id: string;        // ISO
    state: string;
    isError: boolean;    // if true, error
    isChecked: boolean;

    constructor() {
        this._id = new Date().toISOString();
    }
}

export interface IRecord {
    isError: boolean;        // if true, error
    state?: string;         // addtional state description
}

/**
 * Insert one record into log collection
 */
export function insert(data: IRecord, callback?: (result: any) => void) {
    if (data.state == undefined)
        data.state = 'state undefined';

    var record = new Record();
    extend(record, data);

    if (record.isError)
        record.isChecked = false;

    log.insert(record, (err, result) => {
        if (err) return console.dir(err);

        if (callback)
            callback(result);
    });
}

export function fetchLog(): void;

export function fetchLog(): void {

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
