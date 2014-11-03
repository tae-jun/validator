import serialport = require('serialport');
import SerialPort = serialport.SerialPort;

var ports: SerialPort[] = [];

/**
 * Start logging.
 */
export function start() {

    function onOpen() {
        ports.forEach((port) => {
            port.on('data', (data) => {
                console.log(new Date().toDateString() + ': ' + data);
            });
        });
    }

    // Search every ports available
    serialport.list((err, portInfos) => {
        if (err) return console.dir(err);

        console.log(portInfos.length + ' ports detected');

        portInfos.forEach((portInfo) => {
            // Create new serial port. Doesn't open immediately.
            var port = new SerialPort(portInfo.comName, {/*options*/}, false);
            // Open port
            port.open((err) => {
                if (err) return console.dir(err);
                // Allocates a new buffer using an array of octets.
                // octet is (8bit) byte
                var buffer = new Buffer([0, 0, 0]);

                port.write(buffer);
                port.on('data', (data) => {
                    var correctRes = '';
                    if (data == correctRes)
                        ports.push(port);
                });
            });
        });

        onOpen();
    });
}