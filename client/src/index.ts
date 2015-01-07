/// <reference path="main/index.ts" />
/// <reference path="log/index.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />

var modules = [
    'ngRoute',
    'main',
    'log',
    'uiGmapgoogle-maps',
    'googleMaps'
];

angular.module('app', modules)

    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/maps', {
                templateUrl: 'tpl/googleMaps.tpl.html',
                controller: 'googleMapsCtrl'
            })

            .when('/log', {
                templateUrl: 'tpl/log.tpl.html'
            })

            .otherwise({
                redirectTo: '/maps'
            });
    })

    .run(($window, logService: log.LogService, errLogService: log.ErrLogService) => {
        $window.logService = logService;
        $window.errService = errLogService;

        logService.fetch();
    });