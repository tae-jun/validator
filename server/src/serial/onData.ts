import logger = require('./logger');

function onData(data) {

} 

//logger.start((ports) => {
//    console.log(ports);
//});

var a = [7, 6, 58, 3];
a['name'] = 'aaaa';
for (var k in a) {
    console.log(a[k]);
}