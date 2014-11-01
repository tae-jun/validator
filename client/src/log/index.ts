/// <reference path="controller/logctrl.ts" />
/// <reference path="directive/logdrt.ts" />
/// <reference path="service/logservice.ts" />
/// <reference path="directive/logboxdrt.ts" />

module log {
    angular.module('log', [])
        .controller('logCtrl', LogCtrl)
        .factory('logService', ($http) => new LogService($http))
        .directive('logBox', logBoxDrt)
        .directive('log', logDrt);
}