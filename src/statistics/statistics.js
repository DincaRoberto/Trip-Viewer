/**
 * Created by r.dinca on 12/03/17.
 */


(function () {
    'use strict';

    angular.module("Statistics", [])
        .service("statisticsService", statisticsService);

    function statisticsService() {
        var service;

        service = {
            max: max,
            min: min,
            mean: mean,
            irq: irq,
            median: median
        };

        return service;

        //////////////

        function max(arr) {
            return Math.max.apply(null, arr)
        }

        function min(arr) {
            return Math.min.apply(null, arr)
        }

        function mean(arr) {
            var total = 0;
            for(var i = 0; i < arr.length; i++) {
                total += (arr[i])*1;
            }
            return (total / arr.length);
        }

        function irq(arr) {
            var temp = arr.slice();
            temp.sort(function(a, b){return a-b});
            //var median = getMedianFromSortedArray(temp);

            var tempL = temp.slice(0, Math.floor(temp.length/2));
            var tempR = temp.slice(Math.ceil(temp.length/2), temp.length);

            var medianL = getMedianFromSortedArray(tempL);
            var medianR = getMedianFromSortedArray(tempR);

            return (medianR - medianL);
        }

        function median(arr) {
            var temp = arr.slice();
            temp.sort(function(a, b){return a-b});
            return (getMedianFromSortedArray(temp));
        }

        function getMedianFromSortedArray(arr){
            if (arr.length % 2 === 0){
                return (arr[Math.floor(arr.length/2)] + arr[(Math.floor(arr.length/2) - 1)])/2;
            }

            return arr[Math.floor(arr.length/2)];
        }
    }
})();