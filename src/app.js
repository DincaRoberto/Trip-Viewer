/**
 * Created by r.dinca on 09/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer", ["Statistics"])
        .controller("mapController", mapController);

    function mapController($scope, pathService, mapService) {

        GoogleMapsLoader.onLoad(function () {

            mapService.setElementId('map-canvas');

            pathService.loadPath().then(function(){
                $scope.$broadcast("PATH_LOADED");
            });


        });
    }
})();