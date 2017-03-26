/**
 * Created by r.dinca on 09/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer", ["Statistics", "api"])
        .config(config).controller('appController', appController);

    function config($provide) {
        $provide.value('GET_IMAGES', "http://localhost:3000/getImages.php");
        $provide.value('IMAGES_MD_PATH', "../md/trips/");
        $provide.value('XML_PATH', "../trips/");
    }

    function appController($scope, pathService, mapService, photosService) {
        GoogleMapsLoader.onLoad(function () {

            mapService.setElementId('map-canvas');

            $scope.tripName = "Berlin1";

            pathService.loadPath($scope.tripName).then(function(){
                $scope.$broadcast("PATH_LOADED");
                photosService.load($scope.tripName);
            });
        });
    }
})();