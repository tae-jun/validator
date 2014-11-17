/// <reference path="main/index.ts" />
/// <reference path="log/index.ts" />

var modules = [
    'main',
    'log'
];

angular.module('app', modules)
    .run(($window, logService: log.LogService, errLogService: log.ErrLogService) => {
        $window.logService = logService;
        $window.errService = errLogService;

        logService.fetch();
    });