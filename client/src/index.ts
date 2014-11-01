/// <reference path="main/index.ts" />
/// <reference path="log/index.ts" />

var modules = [
    'main',
    'log'
];

angular.module('app', modules)
    .run(($window: ng.IWindowService, logService: log.LogService) => {
        $window['logService'] = logService;
        logService.fetch();
    });