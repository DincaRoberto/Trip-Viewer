/**
 * Created by r.dinca on 09/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer", ["Statistics", "api"])
        .config(config).controller('appController', appController);

    function config($provide) {
        $provide.value('GET_TRIPS', "http://localhost:3000/getTrips.php");
        $provide.value('GET_IMAGES', "http://localhost:3000/getImages.php");
        $provide.value('IMAGES_MD_PATH', "../md/trips/");
        $provide.value('XML_PATH', "../trips/");
    }

    function appController($scope, tripsService, pathService, mapService, photosService) {
        GoogleMapsLoader.onLoad(function () {

            mapService.setElementId('map-canvas');

            //$scope.tripName = "Berlin1";

            tripsService.loadTrips().then(function(res){
                $scope.trips = res;
            });

            $scope.onNewTripSelected = function onNewTripSelected(){
                console.log($scope.trip);

                 pathService.loadPath($scope.trip).then(function(){
                     $scope.$broadcast("PATH_LOADED");
                     photosService.load($scope.trip);
                 });
            }
        });


    }
})();