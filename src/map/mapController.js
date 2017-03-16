/**
 * Created by r.dinca on 16/03/17.
 */


(function () {
    'use strict';

    angular.module("TripViewer")
        .controller("mapController", mapController);

    function mapController($scope, pathService, mapService, photosService) {

        GoogleMapsLoader.onLoad(function () {

            mapService.setElementId('map-canvas');

            pathService.loadPath().then(function(){
                $scope.$broadcast("PATH_LOADED");

                photosService.load();
            });


        });
    }
})();