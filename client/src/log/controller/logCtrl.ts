/// <reference path="../service/logservice.ts" />
module log {
    export class LogCtrl {

        constructor($scope: ILogScope, logService: LogService) {
            $scope.data = logService.fetch();

            $scope.moreLog = () => {
                logService.fetch();
            };
        }
    }



    export interface ILogScope extends ng.IScope {
        data: any[];
        onClose(id: string): void;
        moreLog(): void;
    }
}