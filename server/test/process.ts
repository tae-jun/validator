import mongo = require('../src/mongo/mongo');

process.on('uncaughtException', (err: Error) => {
    console.log(err);
    var mongo = require('../src/mongo/mongo');
    mongo.getDb('serverLog', (db) => {
        console.log('got db');
        db.collection('log', (collErr, coll) => {
            console.log('got collection');
            coll.insert(
                {
                    _id: new Date().toISOString(),
                    log: err
                },
                { w: 1 },
                (err, result) => {
                    if (err) return console.error(err);
                    console.log(result);
                    process.exit(1);
                });
        });
    });
});

mongo.getDb('serverLog', (db) => {
    throw new Error('unexpected error occured');
});