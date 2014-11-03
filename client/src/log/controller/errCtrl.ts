/// <reference path="../service/logservice.ts" />
module log {
    export class ErrCtrl {

        constructor($scope: ILogScope, errLogService: ErrLogService) {
            $scope.data = errLogService.fetch();

            $scope.moreLog = () => {
                //logService.fetch();
            };
        }
    }
} 