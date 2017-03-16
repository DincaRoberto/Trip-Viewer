/**
 * Created by r.dinca on 12/03/17.
 */


(function () {
    'use strict';

    angular.module("TripViewer")
        .directive("expandableDetailsList", expandableDetailsList);

    function expandableDetailsList() {
        return {
            restrict: 'E',
            scope: {
                'details': '=',
                'units': '@',
                'title': '@'
            },
            templateUrl: '/src/tripDetails/expandable-details-list/expandable-details-list.html'
        }
    }
})();