/**
 * Created by r.dinca on 09/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer", ["Statistics"])
        .config(config);

    function config($provide) {
        $provide.value('GET_IMAGES', "http://localhost:3000/getImages.php");
        $provide.value('IMAGES_MD_PATH', "../md/trips/Berlin1/Photos/");
        $provide.value('XML_PATH', "../trips/Berlin1/path.kml");

    }
})();