<?php

$filenameArray = [];
$exifData = [];

function getGps($exifCoord, $hemi) {

    $degrees = count($exifCoord) > 0 ? gps2Num($exifCoord[0]) : 0;
    $minutes = count($exifCoord) > 1 ? gps2Num($exifCoord[1]) : 0;
    $seconds = count($exifCoord) > 2 ? gps2Num($exifCoord[2]) : 0;

    $flip = ($hemi == 'W' or $hemi == 'S') ? -1 : 1;

    return $flip * ($degrees + $minutes / 60 + $seconds / 3600);

}

function gps2Num($coordPart) {

    $parts = explode('/', $coordPart);

    if (count($parts) <= 0)
        return 0;

    if (count($parts) == 1)
        return $parts[0];

    return floatval($parts[0]) / floatval($parts[1]);
}


$handle = opendir('./images/');

        while($file = readdir($handle)){
            if($file !== '.' && $file !== '..' && $file!=='Thumbs.db' && $file!=='.DS_Store'){
                $d = [];
                array_push($filenameArray, "images/$file");

                try {
                    $exif = exif_read_data("images/$file", 0, true);

                    //echo(var_dump($exif));

                    //$lon = getGps($exif["GPSLongitude"], $exif['GPSLongitudeRef']);
                    //$lat = getGps($exif["GPSLatitude"], $exif['GPSLatitudeRef']);

                    foreach ($exif as $key => $section) {
                        foreach ($section as $name => $val) {
                            if ( $key.$name!=='EXIFUserComment' && $key.$name!=='EXIFMakerNote' && $key.$name!=='EXIFComponentsConfiguration'){
                                $d[$key.$name] = $val;
                            }
                        }
                    }

                    //echo(var_dump($d));

                } catch(\Exception $e) {
                    // echo($e->getMessage());
                } finally {

                }

                $exifData[$file] = $d;
                
            }
        }

    echo json_encode($exifData);

?>