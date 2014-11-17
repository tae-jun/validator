import getPorts = require('./getPorts');
import configAll = require('../config');
import config = configAll.serial;
import db = require('../mongo/log');

/**
 * Start logging.
 */
export function start(): void {
    console.log('Start logger');
    // Get ports
    getPorts((ports) => {
        ports.forEach((port) => {
            console.log(port.path);
            // Set on data listener
            port.on('data', (data: Buffer) => {
                // Print received message
                console.log('Device: ' + data.toJSON());
                // Insert into db
                if (data.toJSON() == config.successMsg.toString()) {
                    db.insert(false);
                }
                else if (data.toJSON() == config.errorMsg.toString())
                    db.insert(true);
            });
        });
    });
}