module log {
    export class LogCtrl {

        constructor($scope: ILogScope) {
            $scope.data = [
                '1 log', '2 log', '3 log'
            ];
        }

    }



    export interface ILogScope extends ng.IScope {
        data: any[];
    }
}