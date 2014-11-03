/// <reference path="controller/logctrl.ts" />
/// <reference path="directive/logdrt.ts" />
/// <reference path="service/logservice.ts" />
/// <reference path="directive/logboxdrt.ts" />
/// <reference path="controller/errctrl.ts" />
/// <reference path="service/errlogservice.ts" />

module log {
    angular.module('log', [])
        .controller('logCtrl', LogCtrl)
        .controller('errCtrl', ErrCtrl)
        .factory('logService', ($http) => new LogService($http))
        .factory('errLogService', ($http) => new ErrLogService($http))
        .directive('logBox', logBoxDrt)
        .directive('log', logDrt);
}