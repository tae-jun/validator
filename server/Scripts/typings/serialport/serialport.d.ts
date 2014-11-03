//https://github.com/voodootikigod/node-serialport

declare module 'serialport' {
    /**
     * List the ports along with some metadata as well.
     */
    function list(callback: (err: Error, ports: IPort[]) => void): void;

    /**
     * Create a new serial port on path
     */
    class SerialPort {
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
        on(evnetName: 'open', listener: (data: any) => void): void;
        on(evnetName: 'data', listener: (data: any) => void): void;
        on(evnetName: 'close', listener: (data: any) => void): void;
        on(evnetName: 'error', listener: (data: any) => void): void;
        on(evnetName: string, listener: (data: any) => void): void;
    }

    interface ISerialPortOption {
        baudRate?: number;
        dataBits?: number;
        stopBits?: number;
        parity?: string;
        //rtscts
        //xon
        //xoff
        //xany
        //flowControl
        bufferSize?: number;
        //parser
        //encoding
        //dataCallback
        //disconnectedCallback
    }

    interface IPort {
        comName: string;
        pnpId: string;
        manufacturer: string;
    }
}