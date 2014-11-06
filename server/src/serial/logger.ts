import serialport = require('serialport');
import SerialPort = serialport.SerialPort;

var ports: SerialPort[] = [];

var isValidating: boolean;

/**
 * Start logging.
 */
export function start() {
    // Search every ports available
    serialport.list((err, portInfos) => {
        if (err) return console.error(err);

        console.log(portInfos.length + ' ports detected');

        // Start validating
        isValidating = true;

        portInfos.forEach((portInfo) => {
            // Create new serial port. Doesn't open immediately.
            var port = new SerialPort(portInfo.comName, {/*options*/}, false);
            // Open port
            port.open((err) => {
                if (err) return console.error(err);
                // Allocates a new buffer using an array of octets.
                // octet is (8bit) byte
                var validateMsg = new Buffer([0, 0, 0]);
                // Send validate message
                port.write(validateMsg);
            });
            // On data
            port.on('data', (data) => onData(data));
            // This port is not validated
            port['isValidated'] = false;
            // Push port into ports array
            ports.push(port);
        });
    });
}

function onData(data) {
    if (isValidating)
        validate(data);
    else {

    }
}

function validate(data) {


    // Check every ports is validated or not
    ports.forEach((v) => {
        v
    });
}