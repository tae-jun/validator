﻿/// <reference path="../../config.ts" />
/// <reference path="../service/logservice.ts" />

module log {
    import config = configuration.log;

    /**
     * <Usage>
     * <log data="[scope's property name which is log data array]"
     */
    export function logDrt(logService: LogService): ng.IDirective {
        var drt: ng.IDirective = {
            replace: true,
            restrict: 'E',
            // Isolate scope
            scope: {
                data: '=',
                closeable: '=',
                moreLog: '&'
            },
            templateUrl: config.templateUrl.logContainer,
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attr: ng.IAttributes) => {
                // You must define what data is
                if (attr['data'] == undefined)
                    throw new Error('Log directive: Define data attr');
            }
        };

        return drt;
    }
} 