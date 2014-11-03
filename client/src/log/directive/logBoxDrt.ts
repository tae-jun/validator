/// <reference path="../../config.ts" />

module log {
    import config = configuration.log;

    var msgSuccess = '정상 :)';
    var msgErr = '오류 :(';

    /**
     * <Usage>
     * <log-box data="[data obj]">
     */
    export function logBoxDrt(): ng.IDirective {
        var drt: ng.IDirective = {
            replace: true,
            restrict: 'E',
            scope: {
                data: '=',
                closeable: '='
            },
            templateUrl: config.templateUrl.logBox,
            link: (scope: ILogBoxDrtScope, elem: ng.IAugmentedJQuery, attr: ng.IAttributes) => {
                if (scope.data.isChecked && scope.data.isError) {
                    elem.addClass('alert-warning');
                    scope.msg = msgErr;
                }
                else if (scope.data.isError) {
                    elem.addClass('alert-danger');
                    scope.msg = msgErr;
                }
                else {
                    elem.addClass('alert-success');
                    scope.msg = msgSuccess;
                }

                scope.onClose = (_id) => {
                    scope.data.setChecked();
                };
            }
        };
        return drt;
    }

    export interface ILogBoxDrtScope extends ng.IScope {
        msg: string;
        data: ErrLog;
        onClose(_id: string): void;
    }
}  