/**
 * Created by r.dinca on 12/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer")
        .controller("tripDetailsController", tripDetailsController);

    function tripDetailsController($scope, tripDetailsService) {

        var vm = this;

        $scope.$on("PATH_LOADED", function () {
            vm.pathDetails = tripDetailsService.computeStatistics();

            vm.elevationDetails = tripDetailsService.computeElevationStatistics();

            console.log(vm.elevationDetails)
        });
    }
})();