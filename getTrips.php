<?php

    $directories = glob('./trips' . '/*' , GLOB_ONLYDIR);

    echo json_encode($directories);
?>