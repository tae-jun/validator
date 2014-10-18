import log = require('../../src/mongo/validator/log');
import warn = require('../../src/mongo/validator/warn');

var testDoc: log.IRecord = {
    isError: true,
    state: 'test'
};

warn.waitConn(() => {
    log.insert(testDoc);
    console.log('One warn record inserted');
    console.log('Exit test');
    process.exit(0);
});