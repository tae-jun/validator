module main {
    export class LogService {
        $http: ng.IHttpService;

        constructor($http) {
            this.$http = $http;
        }
    }
} 