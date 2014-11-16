<?php

session_start();


header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past


include_once(__DIR__ . "/Controllers/API.php");

$textureFiles = "textureFiles";

$api = new API();
$api->setTexturePath($textureFiles);
$api->setSession("bajs");

$routes = new Routes("__route__");
$routes->addRoute("/save", $api, "saveJson");
$routes->addRoute("/upload", $api, "uploadImage");
$routes->addRoute("/getImages", $api, "getImages");
$routes->addRoute("/getTexture", $api, "getTexture");
$routes->addRoute("/merge", $api, "merge");

$routes->run();


?>