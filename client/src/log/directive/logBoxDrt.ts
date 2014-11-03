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
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attr: ng.IAttributes) => {
                if (scope['data'].isError) {
                    elem.addClass('alert-danger');
                    scope['data'].msg = msgErr;
                }
                else {
                    elem.addClass('alert-success');
                    scope['data'].msg = msgSuccess;
                }

                scope['onClose'] = (id) => {
                    console.log(id);
                };
            }
        };
        return drt;
    }
}  