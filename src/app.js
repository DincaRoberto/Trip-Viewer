/**
 * Created by r.dinca on 09/03/17.
 */


var appInstance = angular.module("TripViewer",[]);

appInstance.controller("mapController", mapController);

function mapController(pathService, mapService) {

    GoogleMapsLoader.onLoad(function() {

        mapService.setElementId('map-canvas');

        pathService.loadPath();
    });
}