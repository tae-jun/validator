import serialport = require('serialport');
import SerialPort = serialport.SerialPort;
import configAll = require('../config');
import config = configAll.serial;

var ports: SerialPort[] = [];

/**
 * Get ports. Only returns qualified ports
 */
function getPorts(callback: (ports: SerialPort[]) => void): void {
    // Search every ports available
    serialport.list((err, portInfos) => {
        if (err) return console.error(err);

        console.log(portInfos.length + ' ports detected');

        var count = 0;
        portInfos.forEach((portInfo) => {
            var port = new Port(portInfo.comName, (isCorrect) => {
                if (isCorrect) {
                    // Push port into ports array
                    ports.push(port);
                }

                count++;
                if (count >= portInfos.length)
                    callback(ports);
            }, {
                    parser: serialport.parsers.byteLength(config.msgByteLength)
                });
        });
    });
}

class Port extends SerialPort {
    /**
     * Open and validate port. After validation, call callback
     */
    constructor(path: string, callback: (isCorrect: boolean) => void, options?: serialport.ISerialPortOption) {
        // Not open immediately.
        super(path, options, false);

        this.open((err) => {
            if (err) return console.error(err);

            this.validate(callback);
        });
    }

    private validate(callback: (isCorrect: boolean) => void) {
        // If can not get return message in time, close this port
        var isGetRtnMsg = false;

        setTimeout(() => {
            if (!isGetRtnMsg) {
                console.log('Validating timeout. Close "' + this.path + '"');
                this.close();
                callback(false);
            }
        }, config.validateTimeout);

        // Check return message is correct
        this.once('data', (data: Buffer) => {
            // Got message
            isGetRtnMsg = true;
            // This is correct port
            if (data.slice(0, 2).toJSON() == config.validateMsg.toString()) {
                callback(true);
            }
            // If this is not correct port, close this
            else {
                console.log('Got incorrect message. Close "' + this.path + '"');
                this.close();
                callback(false);
            }
        });
    }
}

export = getPorts;