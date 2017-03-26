/**
 * Created by r.dinca on 26/03/17.
 */


(function () {
    'use strict';

    angular.module("TripViewer")
        .service("tripsService", tripsService);

    function tripsService($q, GET_TRIPS ) {
        var service = {
            loadTrips: loadTrips
        };

        function loadTrips() {

            var deferred = $q.defer();

            $.get(GET_TRIPS, function (res) {

                var trips = JSON.parse(res);

                trips.forEach(function(el, index, array){
                    var r = new RegExp(/(?:[^\.\/trips\/]).*$/i);
                    array[index] = r.exec(el)[0];
                });


                deferred.resolve(trips);
            });

            return deferred.promise;

        }

        return service;
    }

})();