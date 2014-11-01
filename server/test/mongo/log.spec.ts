import log = require('../../src/mongo/log');

var testDoc: log.IRecord = {
    isError: false,
    state: 'test'
};

log.waitConn(() => {
    log.insert(testDoc);
    console.log('One record inserted');
    console.log('Exit test');
    process.exit(0);
});