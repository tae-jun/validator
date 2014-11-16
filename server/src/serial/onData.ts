import logger = require('./logger');
import configAll = require('../config');
import config = configAll.serial;

logger.start((ports) => {
    console.log(ports);

    ports.forEach((port) => {
        port.on('data', (data: Buffer) => {
            console.log(data.toJSON());
            if (data.toJSON() == config.successMsg.toString())
                console.log('success');
            else if (data.toJSON() == config.errorMsg.toString())
                console.log('error');
        });
    });
});
