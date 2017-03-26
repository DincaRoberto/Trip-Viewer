/**
 * Created by r.dinca on 16/03/17.
 */


(function () {
    'use strict';

    angular.module("api")
        .service("xmlLoader", xmlLoader);

    function xmlLoader($q) {
        var service = {
            load: load
        };

        function load(path) {
            var deferred = $q.defer();

            $.get(path, function (xml) {
                deferred.resolve($.xml2json(xml));
            });

            return deferred.promise;
        }

        return service;

    }
})();