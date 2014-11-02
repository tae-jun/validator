/// <reference path="../../config.ts" />

module log {
    import config = configuration.log;

    export class LogService {

        // log data
        logs: Log[];
        // last updated time
        lastUpdate: Date;
        // latest update time
        updateDuration: number;
        // Is it fetching data from server?
        isFetching: boolean;
        // Store callback functions
        callbacks: Function[];

        $http: ng.IHttpService;

        constructor($http) {
            this.$http = $http;

            // set last updated time to long ago, because this needs update
            this.logs = [];
            this.lastUpdate = new Date(1994, 2, 4);
            this.updateDuration = config.updateDuration;
            this.isFetching = false;
            this.callbacks = [];
        }

        get(): Log[] {
            return this.logs;
        }

        /**
         * Fetch log records from server.
         * You can get specific number of records.
         * If you don't specify number, default is 10
         */
        fetch(num?: number)
        fetch(callback?: Function)
        fetch(num: number, callback?: Function)
        fetch(num_callback: any, _callback?: Function): Log[] {
            var num: number = 10;
            var callback: Function = function () { };

            // recognize parameters
            if (typeof num_callback == 'number') {
                if (num_callback > 0)
                    num = num_callback;
            }
            else if (typeof num_callback == 'function') {
                callback = num_callback;
            }

            if (typeof _callback == 'function')
                callback = _callback;

            // Push callback function into callbacks
            this.callbacks.push(callback);

            // If it is not fetching, fetch.
            if (!this.isFetching) {
                // If last updated time passed update duration, fetch.
                var lastUpdatedTime = new Date().getTime() - this.lastUpdate.getTime();
                if (lastUpdatedTime > this.updateDuration) {
                    // It is fetching
                    this.isFetching = true;

                    // set from ISO string
                    var from: string;
                    if (this.logs.length == 0)
                        from = new Date().toISOString();
                    else
                        from = this.logs[this.logs.length - 1]._id;
                    // request to server
                    this.$http.get(config.httpUrl + '/' + from + '/' + num)
                        .success((data: ILog[]) => {
                            // Process each log
                            data.forEach((v) => {
                                var log = new Log(v._id);
                                $.extend(log, v);
                                this.logs.push(log);
                            });

                            while (this.callbacks.length)
                                this.callbacks.pop()(this.logs);

                            this.lastUpdate = new Date();

                            console.log('log fetched at ' + this.lastUpdate);
                        })
                        .error((err) => {
                            console.error('http action error');
                            console.error(err);
                        })
                        .finally(() => {
                            this.isFetching = false;
                        });
                }
                // Data is latest data, so just call callback functions
                else {
                    while (this.callbacks.length)
                        this.callbacks.pop()(this.logs);
                }
            }

            return this.logs;
        }
    }

    export class Log implements ILog{
        _id: string;
        isError: boolean;
        isChecked: boolean;

        date: Date;

        constructor(ISOstring: string) {
            this.date = new Date(ISOstring);
        }
    }

    export interface ILog {
        _id?: string;
        isError?: boolean;
        isChecked?: boolean;
    }
} 