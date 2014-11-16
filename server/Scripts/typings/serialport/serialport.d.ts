//https://github.com/voodootikigod/node-serialport

declare module 'serialport' {
    import events = require('events');
    import EventEmitter = events.EventEmitter;
    /**
     * List the ports along with some metadata as well.
     */
    function list(callback: (err: Error, ports: IPort[]) => void): void;

    /**
     * Create a new serial port on path
     */
    class SerialPort extends EventEmitter {
        path: string;

        constructor(path: string, options?: ISerialPortOption, openImmediately?: boolean, callback?: (err) => void);
        /**
         * Opens a connection to the given serial port.
         */
        open(callback?: (err: Error) => void): void;
        /**
         * Closes an open connection.
         */
        close(callback?: (err: Error) => void): void;
        /**
         * Writes data to the given serial port.
         */
        write(buffer: Buffer, callback?: (err: Error) => void): void;
        /**
         * set event listener
         */
        on(evnetName: 'open', listener: Function): EventEmitter;
        on(evnetName: 'data', listener: Function): EventEmitter;
        on(evnetName: 'close', listener: Function): EventEmitter;
        on(evnetName: 'error', listener: Function): EventEmitter;
        on(evnetName: string, listener: Function): EventEmitter;
    }

    var parsers: { raw; readline: (delimiter: string) => void; byteLength: Function };

    interface ISerialPortOption {
        baudRate?: number;
        dataBits?: number;
        stopBits?: number;
        parity?: string;
        rtscts?: any;
        xon?: any;
        xoff?: any;
        xany?: any;
        flowControl?: any;
        bufferSize?: number;
        parser?: any;
        encoding?: any;
        dataCallback?: any;
        disconnectedCallback?: any;
    }

    interface IPort {
        comName: string;
        pnpId: string;
        manufacturer: string;
    }
}