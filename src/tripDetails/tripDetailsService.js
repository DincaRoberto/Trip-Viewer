
(function () {
    'use strict';

    angular.module("TripViewer")
        .service("pathDetailsService", pathDetailsService);

    function pathDetailsService(pathService) {
        var service = {
            computeStatistics : computeStatistics
        };

        function computeStatistics() {
            var dist = google.maps.geometry.spherical.computeLength([pathService.coords[0], pathService.coords[pathService.coords.length-1]]);
            console.log(dist);
            console.log(pathService.elevation);
            console.log(Math.max.apply(null, pathService.elevation));
            console.log(Math.min.apply(null, pathService.elevation));

            var total = 0;
            for(var i = 0; i < pathService.elevation.length; i++) {
                total += (pathService.elevation[i])*1;
            }
            var avg = total / pathService.elevation.length;
            console.log(avg);
        }

        return service;
    }
})();