/**
 * Created by r.dinca on 09/03/17.
 */

appInstance.service("pathService", pathService);

function pathService(mapService, xmlHandlerService)
{
    var service = {

        loadPath: loadPath

    };

    service.markers = [];
    service.paths = [];
    service.whens = [];

    service.m = 0;

    function loadPath()
    {
        xmlHandlerService.load().then(function(tracks){
            mapService.setCenter(tracks.googleCoords[Math.round(tracks.googleCoords.length / 2)]);
            drawPath(tracks.googleCoords, tracks.googleWhens);
        })
    }

    function drawPath(googleCoords, googleWhens){
        for(var i=0; i<googleCoords.length-1;i++)
        {
            var c = [];

            c.push(googleCoords[i]);
            c.push(googleCoords[i+1]);


            var v = getSpeed(googleWhens[i], googleWhens[i+1], googleCoords[i], googleCoords[i+1]);
            var color = "rgba(0,0,0,1)";

            console.log(v);

            if (v < 2000)
            {
                color = "hsl("+Math.round(v/6)+",100%,50%)"
            }

            var flightPath = mapService.drawLine(googleCoords[i], googleCoords[i+1], color);

            service.paths.push(flightPath);
        }
    }

    function getSpeed(time_1, time_2, p1,p2){
        var d = google.maps.geometry.spherical.computeLength([p1,p2]);

        var l1 = time_1.split(":");

        var ll1 = (l1[0] * 3600) + (l1[1]*60) + (l1[2]*1);

        var l2 = time_2.split(":");

        var ll2 = (l2[0] * 3600) + (l2[1]*60) + (l2[2]*1);

        var t = (ll2-ll1);

        var v = d/t;

        v = Math.round(v*1000);

        return v
    }

    return service;
}