/**
 * Created by r.dinca on 11/03/17.
 */

(function () {
    'use strict';

    angular.module("TripViewer")
        .service("photosService", photosService);

    function photosService(pathService, mapService) {

        var service = {};

        service.load = load;

        function load() {
            $.ajax({
                url: "http://localhost:3000/getImages.php",
                crossOrigin: true,
                dataType: "json",
                success: function (data) {
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

                            var lat = mapService.ConvertDMSToDD(
                                (value['GPSGPSLatitude'][0].split('/')[0]*1)/(value['GPSGPSLatitude'][0].split('/')[1]*1),
                                (value['GPSGPSLatitude'][1].split('/')[0]*1)/(value['GPSGPSLatitude'][1].split('/')[1]*1),
                                (value['GPSGPSLatitude'][2].split('/')[0]*1)/(value['GPSGPSLatitude'][2].split('/')[1]*1),
                                value['GPSGPSLatitudeRef']
                            );

                            var lng = mapService.ConvertDMSToDD(
                                (value['GPSGPSLongitude'][0].split('/')[0]*1)/(value['GPSGPSLongitude'][0].split('/')[1]*1),
                                (value['GPSGPSLongitude'][1].split('/')[0]*1)/(value['GPSGPSLongitude'][1].split('/')[1]*1),
                                (value['GPSGPSLongitude'][2].split('/')[0]*1)/(value['GPSGPSLongitude'][2].split('/')[1]*1),
                                value['GPSGPSLongitudeRef']
                            );

                            position = mapService.createPosition(lat, lng);
                        }

                        var image = {
                            url: '../images/' + key,
                            // This marker is 20 pixels wide by 32 pixels tall.
                            size: new google.maps.Size(50, 50),

                            scaledSize: new google.maps.Size(100, 100),
                            // The origin for this image is 0,0.
                            origin: new google.maps.Point(25, 25),
                            // The anchor for this image is the base of the flagpole at 0,32.
                            anchor: new google.maps.Point(0, 32)
                        };

                        mapService.drawImage(image, position);
                    }
                },
                error: function (data) {
                    console.log(data)
                }
            });
        }

        return service;

    }
})();