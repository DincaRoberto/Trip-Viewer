/**
 * Created by r.dinca on 09/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer", [])
        .controller("mapController", mapController);

    function mapController(pathService, mapService, pathDetailsService) {

        GoogleMapsLoader.onLoad(function () {

            mapService.setElementId('map-canvas');

            pathService.loadPath().then(function(){
                pathDetailsService.computeStatistics();
            });


        });
    }
})();