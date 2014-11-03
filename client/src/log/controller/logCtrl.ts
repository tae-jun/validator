module log {
    export class LogCtrl {

        constructor($scope: ILogScope, logService: LogService) {
            $scope.data = logService.fetch();

            $scope.moreLog = () => {
                logService.fetch();
            };
            var i = 0;
            $scope.onClose = (id) => {
                i++;
                console.log('close ' + i + ': ' + id);
            };
        }
    }



    export interface ILogScope extends ng.IScope {
        data: any[];
        onClose(id: string): void;
        moreLog(): void;
    }
}