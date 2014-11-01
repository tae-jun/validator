/// <reference path="../../config.ts" />

module log {
    import config = configuration.log;

    /**
     * <Usage>
     * <log-box data="[data obj]">
     */
    export function logBoxDrt(): ng.IDirective {
        var drt: ng.IDirective = {
            replace: true,
            restrict: 'E',
            scope: {
                data: '=data'
            },
            templateUrl: config.templateUrl.logBox,
            link: (scope: ng.IScope, elem: ng.IAugmentedJQuery, attr: ng.IAttributes) => {
                
            }
        };
        return drt;
    }
}  