declare module 'serialport' {

    function list(callback: (err: Error, ports: any[]) => void): void;

    /**
     * Create a new serial port on path
     */
    class SerialPort {
        constructor(path: string, options?: ISerialPortOption, openImmediately?: boolean, callback?: (err) => void);

        /**
         * set event listener
         */
        on(evnetName: "open", listener: (data: any) => void): void;
        on(evnetName: "data", listener: (data: any) => void): void;
        on(evnetName: "close", listener: (data: any) => void): void;
        on(evnetName: "error", listener: (data: any) => void): void;
        on(evnetName: string, listener: (data: any) => void): void;

        write(buffer: Buffer, callback?: (err: Error) => void): void;

        close(callback: (err: Error) => void): void;
    }

    interface ISerialPortOption {
        baudRate: number;
        dataBits: number;
        stopBits: number;
        parity: string;
        //rtscts
        //xon
        //xoff
        //xany
        //flowControl
        bufferSize: number;
        //parser
        //encoding
        //dataCallback
        //disconnectedCallback
    }
}