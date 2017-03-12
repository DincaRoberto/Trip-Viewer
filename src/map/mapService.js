/**
 * Created by r.dinca on 11/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer").service("mapService", mapService);

    function mapService() {
        var service = {
            setElementId: setElementId,
            setCenter: setCenter,
            drawLine: drawLine,
            drawMarker: drawMarker,
            map: null
        };

        function setElementId(id) {
            var mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(45, 21),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            };

            service.map = new google.maps.Map(document.getElementById(id), mapOptions);
        }

        function setCenter(center) {
            service.map.setCenter(center)
        }

        function drawLine(p1, p2, color) {
            var flightPath = new google.maps.Polyline({
                path: [p1, p2],
                geodesic: true,
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 3
            });

            flightPath.setMap(service.map);

            return flightPath
        }

        function drawMarker(position) {
            return (new google.maps.Marker({
                position: position,
                map: service.map,
                title: "Title"
            }));
        }

        return service;
    }
})();