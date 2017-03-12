/**
 * Created by r.dinca on 11/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer")
        .service("xmlHandlerService", xmlHandlerService);

    function xmlHandlerService($q) {
        var service = {
            load: load
        };

        function load() {
            var deferred = $q.defer();

            $.get('../history-04-30-2015.xml', function (xml) {
                var kml = $.xml2json(xml);
                var track = kml['Document']['Placemark']['Track'];

                var result = transformXmlToGoogle(track['coord'], track['when']);

                deferred.resolve(result);
            });

            return deferred.promise;
        }

        function transformXmlToGoogle(coords, whens) {
            var result = {
                googleCoords: [],
                googleWhens: []
            };

            for (var i = 0; i < coords.length; i++) {
                var point = coords[i].split(" ");

                var when = whens[i].split("T")[1].split(".")[0];

                result.googleWhens.push(when);
                result.googleCoords.push(new google.maps.LatLng(point[1], point[0]));

                //var l1 = when.split(":");

                //var ll1 = (l1[0] * 3600) + (l1[1] * 60) + (l1[2] * 1);

                //service.whens.push(ll1);

                //var distance = google.maps.geometry.spherical.computeLength(googleCoords);

                //distance = (distance / 1000).toFixed(2);

                //console.log(distance);


                //var marker = mapService.drawMarker(googleCoords[i]);

                //service.markers.push(marker);
            }

            return result;
        }

        return service;
    }
})();