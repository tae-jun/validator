/// <reference path="logservice.ts" />
/// <reference path="../../config.ts" />

module log {
    import config = configuration.log;

    export class ErrLogService {

        // log data
        errLogs: ErrLog[];
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
            this.errLogs = [];
            this.lastUpdate = new Date(1994, 2, 4);
            this.updateDuration = config.updateDuration;
            this.isFetching = false;
            this.callbacks = [];
        }

        get(): Log[] {
            return this.errLogs;
        }

        /**
         * Fetch log records from server.
         * You can get specific number of records.
         * If you don't specify number, default is 10
         */
        fetch(callback?: Function): ErrLog[] {
            if (callback == undefined)
                callback = function () { };

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
                    if (this.errLogs.length == 0)
                        from = new Date().toISOString();
                    else
                        from = this.errLogs[this.errLogs.length - 1]._id;
                    // request to server
                    this.$http.get(config.errHttpUrl)
                        .success((data: ILog[]) => {
                            // Clean error log array
                            this.errLogs.splice(0, this.errLogs.length);
                            // Process each log
                            data.forEach((v) => {
                                var log = new ErrLog(v._id, this.$http);
                                $.extend(log, v);
                                this.errLogs.push(log);
                            });

                            while (this.callbacks.length)
                                this.callbacks.pop()(this.errLogs);

                            this.lastUpdate = new Date();

                            console.log('error log fetched at ' + this.lastUpdate);
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
                        this.callbacks.pop()(this.errLogs);
                }
            }

            return this.errLogs;
        }

        removeErrLog(errLog: ErrLog) {
            var index = this.errLogs.indexOf(errLog);
            this.errLogs.splice(index, 1);
        }
    }

    export class ErrLog extends Log {

        $http: ng.IHttpService;

        constructor(ISOstring, $http) {
            super(ISOstring);

            this.$http = $http;
        }

        setChecked() {
            this.$http.post(config.errHttpUrl + '/' + this._id, {})
                .success((res) => {
                    errLogService.removeErrLog(this);
                })
                .error((err) => {
                    console.error('Http action error');
                    console.error(err);
                });
        }
    }
} 