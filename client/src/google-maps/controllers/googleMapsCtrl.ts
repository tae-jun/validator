module googleMaps {
    export class GoogleMapsCtrl {

        constructor($scope: IGoogleMapsScope, $log: ng.ILogService) {
            var initCoords = {
                latitude: 40.1451,
                longitude: -99.6680
            };

            $scope.map = { center: initCoords, zoom: 8 };

            $scope.marker = {
                id: 0,
                coords: initCoords,
                options: { draggable: true },
                events: {
                    dragend: function (marker, eventName, args) {
                        $log.log('marker dragend');
                        var lat = marker.getPosition().lat();
                        var lon = marker.getPosition().lng();
                        $log.log(lat);
                        $log.log(lon);

                        $scope.marker.options = {
                            draggable: true,
                            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                            labelAnchor: "100 0",
                            labelClass: "marker-labels"
                        };
                    },
                    click: (marker, eventName, args) => {
                        alert(marker);
                    }
                }
            };

            $scope.$watchCollection('marker.coords', (nv, ov) => {
                $scope.map.center.latitude = nv.latitude;
                $scope.map.center.longitude = nv.longitude;
            });
        }
    }

    export interface IGoogleMapsScope extends ng.IScope {
        map;
        marker;
    }
} 