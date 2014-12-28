module googleMaps {
    export class GoogleMapsCtrl {

        constructor($scope: IGoogleMapsScope, $log: ng.ILogService, $location: ng.ILocationService) {
            var initCoords = {
                latitude: 40.1451,
                longitude: -99.6680
            };

            $scope.map = { center: initCoords, zoom: 8 };

            $scope.marker = {
                id: 0,
                coords: {
                    latitude: initCoords.latitude,
                    longitude: initCoords.longitude
                },
                options: { draggable: false },
                events: {
                    click: (marker, eventName, args) => {
                        $location.path('/log');
                    }
                }
            };
        }
    }

    export interface IGoogleMapsScope extends ng.IScope {
        map;
        marker;
    }
} 