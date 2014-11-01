module log {
    export class LogCtrl {

        constructor($scope: ILogScope, logService: LogService) {
            $scope.data = logService.fetch();
        }
    }



    export interface ILogScope extends ng.IScope {
        data: any[];
    }
}