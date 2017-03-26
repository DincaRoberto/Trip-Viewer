/**
 * Created by r.dinca on 16/03/17.
 */


(function () {
    'use strict';

    angular.module("api")
        .service("photosLoader", photosLoader);

    function photosLoader($q) {
        var service = {
            load: load
        };

        function load(path) {
            var deferred = $q.defer();

            $.ajax({
                url: path,
                crossOrigin: true,
                dataType: "json",
                success: function (data) {
                    deferred.resolve(data)
                },
                error: function (error) {
                    console.log(error);
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        }

        return service;

    }
})();