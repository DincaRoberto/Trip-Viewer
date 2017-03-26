/**
 * Created by r.dinca on 09/03/17.
 */


(function () {
    'use strict';

    angular.module("TripViewer")
        .service("pathService", pathService);

    function pathService($q, XML_PATH, mapService, xmlHandlerService) {
        var service = {
            loadPath: loadPath
        };

        service.markers = [];
        service.paths = [];
        service.whens = [];
        service.coords = [];
        service.elevation = [];
        service.speed = [];

        service.m = 0;

        function loadPath(tripName) {

            while (service.paths.length > 0){
                service.paths.pop().setMap(null);
            }

            service.whens = [];
            service.coords = [];
            service.elevation = [];
            service.speed = [];

            service.m = 0;

            var deferred = $q.defer();

            xmlHandlerService.load(XML_PATH + tripName + "/path.kml").then(function (tracks) {
                mapService.setCenter(tracks.googleCoords[Math.round(tracks.googleCoords.length / 2)]);
                drawPath(tracks.googleCoords, tracks.googleWhens, tracks.elevation);
                deferred.resolve();
            });

            return deferred.promise;
        }

        function drawPath(googleCoords, googleWhens, elevation) {
            for (var i = 0; i < googleCoords.length - 1; i++) {
                var c = [];

                c.push(googleCoords[i]);
                c.push(googleCoords[i + 1]);

                service.coords.push(googleCoords[i]);
                service.elevation.push(elevation[i]);

                var l1 = googleWhens[i].split(":");
                var ll1 = (l1[0] * 3600) + (l1[1] * 60) + (l1[2] * 1);
                service.whens.push(ll1);

                var v = getSpeed(googleWhens[i], googleWhens[i + 1], googleCoords[i], googleCoords[i + 1]);
                service.speed.push(v);

                var color = "rgba(0,0,0,1)";

                //console.log(v);

                if (v < 2000) {
                    color = "hsl(" + Math.round(v / 6) + ",100%,50%)"
                }

                var flightPath = mapService.drawLine(googleCoords[i], googleCoords[i + 1], color);

                service.paths.push(flightPath);
            }
        }

        function getSpeed(time_1, time_2, p1, p2) {
            var d = google.maps.geometry.spherical.computeLength([p1, p2]);

            var l1 = time_1.split(":");

            var ll1 = (l1[0] * 3600) + (l1[1] * 60) + (l1[2] * 1);

            var l2 = time_2.split(":");

            var ll2 = (l2[0] * 3600) + (l2[1] * 60) + (l2[2] * 1);

            var t = (ll2 - ll1);

            var v = d / t;

            v = Math.round(v * 1000);

            return v
        }

        return service;
    }
})();