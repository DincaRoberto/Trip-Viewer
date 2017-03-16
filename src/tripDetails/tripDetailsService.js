
(function () {
    'use strict';

    angular.module("TripViewer")
        .service("tripDetailsService", tripDetailsService);

    function tripDetailsService(pathService, statisticsService) {
        var service = {
            computeStatistics : computeStatistics,
            computeElevationStatistics: computeElevationStatistics,
            computeSpeedStatistics: computeSpeedStatistics
        };

        function computeStatistics() {
            var dist = Math.floor(google.maps.geometry.spherical.computeLength([pathService.coords[0], pathService.coords[pathService.coords.length-1]]));
            //console.log(dist);
            //console.log(pathService.elevation);

            return {
                startEndDist: dist
            }
        }

        function computeElevationStatistics() {
            return {
                max: Math.floor(statisticsService.max(pathService.elevation)),
                min: Math.floor(statisticsService.min(pathService.elevation)),
                mean: Math.floor(statisticsService.mean(pathService.elevation)),
                median: Math.floor(statisticsService.median(pathService.elevation)),
                irq: Math.floor(statisticsService.irq(pathService.elevation))
            }
        }

        function computeSpeedStatistics() {
            return {
                max: roundTo2Decimal(Math.floor(statisticsService.max(pathService.speed))/1000),
                min: roundTo2Decimal(Math.floor(statisticsService.min(pathService.speed))/1000),
                mean: roundTo2Decimal(Math.floor(statisticsService.mean(pathService.speed))/1000),
                median: roundTo2Decimal(Math.floor(statisticsService.median(pathService.speed))/1000),
                irq: roundTo2Decimal(Math.floor(statisticsService.irq(pathService.speed))/1000)
            }
        }

        function roundTo2Decimal(num) {
            return Math.round(num * 100) / 100
        }

        return service;
    }

})();