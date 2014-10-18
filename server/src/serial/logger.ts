import serialport = require('serialport');
import SerialPort = serialport.SerialPort;

var ports: SerialPort[] = [];

export function start() {
    serialport.list((err, portInfos) => {
        if (err) return console.dir(err);

        console.log(portInfos.length + ' ports detected');

        portInfos.forEach((portInfo) => {
            //new SerialPort(portInfo.comName);
            
        });
        
        onOpen();
    });

    function onOpen() {
        ports.forEach((port) => {
            port.on('data', (data) => {
                console.log(new Date().toDateString() + ': ' + data);
            });
        });
    }
}