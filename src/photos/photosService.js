/**
 * Created by r.dinca on 11/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer")
        .service("photosService", photosService);

    function photosService(GET_IMAGES, IMAGES_MD_PATH, pathService, mapService, photosLoader) {

        var service = {};

        service.load = load;

        function load(tripName) {

            photosLoader.load(GET_IMAGES).then(function (data) {
                console.log(data);
                for (var key in data) {
                    var value = data[key];
                    //console.log(value.EXIFDateTimeOriginal.split(" ")[1].split(":"));

                    var photoTimeArray = value.EXIFDateTimeOriginal.split(" ")[1].split(":");

                    var photoTime = ((photoTimeArray[0] * 1) - 10) * 3600 + (photoTimeArray[1] * 60) + photoTimeArray[2] * 1;

                    //console.log(photoTimeArray);

                    var i = 0;

                    while (pathService.whens[i] < photoTime) {
                        i++;
                    }

                    var position = pathService.coords[i];

                    if (value['GPSGPSLatitude'] && value['GPSGPSLongitude']){

                        var dmstLat = mapService.ConvertStringGPSToDMST(value['GPSGPSLatitude']);
                        var lat = mapService.ConvertDMSToDD(
                            dmstLat[0],
                            dmstLat[1],
                            dmstLat[2],
                            value['GPSGPSLatitudeRef']
                        );

                        var dmstLng = mapService.ConvertStringGPSToDMST(value['GPSGPSLongitude']);
                        var lng = mapService.ConvertDMSToDD(
                            dmstLng[0],
                            dmstLng[1],
                            dmstLng[2],
                            value['GPSGPSLongitudeRef']
                        );

                        position = mapService.createPosition(lat, lng);
                    }

                    var marker = {
                        photoMdUrl: key.split('.')[0] + '-md.' + key.split('.')[1],
                        photoUrl: key,
                        mapMarker: null
                    };

                    var image = {
                        url:  IMAGES_MD_PATH  + tripName + "/Photos/" + marker.photoMdUrl ,
                        size: new google.maps.Size(50, 50),
                        //scaledSize: new google.maps.Size(50, 50),
                        origin: new google.maps.Point(25, 25),
                        anchor: new google.maps.Point(0, 32)
                    };

                    marker.mapMarker = mapService.drawImage(image, position);

                    marker.mapMarker.addListener('click', function() {
                        console.log(this);
                    }.bind(marker));
                }
            });
        }

        return service;

    }
})();