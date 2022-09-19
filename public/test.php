<?php
# we want text output for debugging. Either this works or you need to look into
# source in your browser (or even better, debug with the `curl` commandline client.)
// header('Content-Type: text/plain');

# For quick and dirty debugging - start to tell about if something is worth
# to warn or notice about. (do logging in production)
error_reporting(~0); ini_set('display_errors', 1);

$eq = '\left( {x + 7} \right)\left( {x - 3} \right) = - 7';
$eq = urlencode($eq);

$url = "https://math.now.sh?from={$eq}";
$results = file_get_contents($url);
// var_dump($http_response_header, $results);
$image = file_put_contents('somesvg.svg', $results);

echo $image;
echo "<img src='{$url}' />";

# hard exit, flush all (potential) buffers.
die();