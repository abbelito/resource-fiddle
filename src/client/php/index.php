<?php

session_start();


header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past


include_once("Controllers/Routes.php");
include_once("Models/Image.php");


$textureFiles = "./textureFiles/";

function sortOnSize($a, $b) {
	$aSize = $a->width * $a->height;
	$bSize = $b->width * $b->height;
	if($aSize > $bSize) {
		return -1;
	}
	if($aSize < $bSize) {
		return 1;
	}
	if($a->width > $b->width) {
		return -1;
	}
	if($a->width > $b->width) {
		return 1;
	}
	return 0;
}


function mergeIntoTexture($textureFilename, $imageFolder, $url) {
	$json = "{\"textures\":[{\"id\": \"texture\",\"file\": \"$url$textureFilename\"}]";

	$folder = "$imageFolder/";
	$filetype = '*';
	$files = glob($folder . $filetype);
	$count = count($files);

	$images = array();

	for($i = 0; $i < $count; $i++) {

		$ext = pathinfo($files[$i], PATHINFO_EXTENSION);
		if($ext == "png") {
			$imageResource = @imagecreatefrompng($files[$i]);
		}
		else if(($ext == "jpg") || ($ext == "jpeg")) {
			$imageResource = @imagecreatefromjpeg($files[$i]);
		}
		$image = new Image($files[$i], $imageResource);
		array_push($images, $image);
	}

	usort($images, sortOnSize);

	$textureWidth = 1024;
	$textureHeight = 1024;
	$texture  = imagecreatetruecolor($textureWidth, $textureHeight);
	imagealphablending($texture, false);
	$col = imagecolorallocatealpha($texture, 255, 255, 255, 125);
	imagefilledrectangle($texture, 0, 0, $textureWidth, $textureHeight, $col);
	imagealphablending($texture, true);

	$x = 0;
	$y = 0;
	$nextY = 0;
	$margin = 2;
	
	$originalImages = array();


	/**
	 * New positionimg
	 */
	// while(count($images) > 0)
	// 
	/**
	 * End of new positioning
	 */

	while(count($images) > 0) {
		for($i = 0; $i < count($images); $i++) {
			$image = $images[$i];
			
			if(($x + $image->width) <= $textureWidth) {
				$image->x = $x;
				$image->y = $y;

				$ext = pathinfo($files[$i], PATHINFO_EXTENSION);
				if($ext == "png") {
					$background = imagecolorallocate($image->image, 255, 255, 255);
					// removing the black from the placeholder
					imagecolortransparent($image->image, $background);

					imagealphablending($image->image, true);
				}
				imagecopyresampled($texture, $image->image, $image->x , $image->y, 0 , 0, $image->width, $image->height, $image->width, $image->height);
				//imagecopymerge($texture, $image->image, $image->x , $image->y, 0 , 0, $image->width, $image->height, 100);

				if(($image->y + $image->height) > $nextY) {
					$nextY = $image->y + $image->height;
				}
				$x += $image->width + $margin;

				array_push($originalImages, $image);
				array_splice($images, $i, 1);
				$i--;
			}
			
			
		}

		if(($x + $image->width) > $textureWidth) {
			$x = 0;
			$y = $nextY + $margin;
		}
	}
	
	

	imagealphablending($texture, false);
	imagesavealpha($texture, true);
	imagepng($texture, "../$textureFilename");
	imagedestroy($texture);


	for($i = 0; $i < count($originalImages); $i++) {
		$image = $originalImages[$i];
		$json .= ",\"" . preg_replace('/.[^.]*$/', '', implode('', explode("$imageFolder/", $image->filename)))  . "\":";
		$json .= "{";
		$json .= "\"texture\": \"texture\",";
		$json .= "\"coords\": [";
		$json .= $image->x . "," . $image->y . "," . $image->width . "," . $image->height;

		$json .= "]";
		$json .= "}";
	}

	$json .= "}";

	return $json;
}


function jsonResponse($param)
{
	if (is_array($param)) {
		$out = array(
		'success' => true
		);

		$out['data'] = $param;

	} else if (is_bool($param)) {
		$out = array(
		'success' => $param
		);
	} else {
		$out = array(
		             'success' => false,
		             'errors' => array('reason' => $param)
		            );
	}

	$out = json_encode($out);

	header('Content-type: application/json');

	return $out;
}


/**
 * Routes 
 */
function getSession() {
	
}

function saveJson() {

	$session = isset($_POST['session']) ? $_POST['session'] : $_GET['session'];
	$jsonString = isset($_POST['json']) ? $_POST['json'] : $_GET['json'];

	$path = "../textureFiles/$session";

	if (!file_exists($path)) {
		mkdir($path, 0777, true);
	}
	$fileid = fopen("$path/texture.json", "w") or die("{'success':false, 'errors': 'Unable to open file!'}");
	
	fwrite($fileid, stripcslashes($jsonString));
	fclose($fileid);
	
	echo jsonResponse(true);
}

function uploadImage() {
	$session = isset($_POST['session']) ? $_POST['session'] : $_GET['session'];
	$filename = isset($_POST['Filename']) ? $_POST['Filename'] : $_GET['Filename'];
	$url = isset($_POST['url']) ? $_POST['url'] : $_GET['url'];

	$path = "textureFiles/$session";
	$fullpath = "../$path/tmp";
	if (!file_exists($fullpath)) {
		mkdir($fullpath, 0777, true);
	}

	// Check for errors
	if($_FILES['SelectedFile']['error'] > 0){
	    echo jsonResponse('An error ocurred when uploading.');
	    return;
	}

	if(!getimagesize($_FILES['SelectedFile']['tmp_name'])){
	    echo jsonResponse('Please ensure you are uploading an image.');
	    return;
	}

	// Check filetype
	if(($_FILES['SelectedFile']['type'] != 'image/png') && ($_FILES['SelectedFile']['type'] != 'image/jpeg')) {
	    echo jsonResponse('Unsupported filetype uploaded.');
	    return;
	}

	// Check filesize
	if($_FILES['SelectedFile']['size'] > 500000){
	    echo jsonResponse('File uploaded exceeds maximum upload size.');
	    return;
	}

/*
	// Check if the file exists
	if(file_exists('upload/' . $_FILES['SelectedFile']['name'])){
	    jsonResponse('File with that name already exists.');
	}
*/
	$ext = pathinfo($_FILES["SelectedFile"]["name"], PATHINFO_EXTENSION);

	$filepath = "$fullpath/" . $filename . "." . $ext;//$_FILES["SelectedFile"]["name"];
	// Upload file
	if(!move_uploaded_file($_FILES['SelectedFile']['tmp_name'], $filepath)) {
	    jsonResponse('Error uploading file - check destination is writeable.');
	}


	echo mergeIntoTexture("$path/texture.png", $fullpath, $url);
}


function getImages() {

	$session = isset($_POST['session']) ? $_POST['session'] : $_GET['session'];
	$path = "../textureFiles/$session";
	$folder = "$path/tmp/";
	$filetype = "*";
	$images = glob($folder . $filetype);

	echo jsonResponse($images);
}

function getTexture() {

	$session = $_POST['session'];
	$path = "../textureFiles/$session";
	$folder = "$path/";
	$filetype = "texture.json";

	if (!file_exists($folder.$filetype)) {
		echo "{\"graphics\":{}, \"positions\":{}}";
		return;
	}
	$file = fopen($folder.$filetype, 'r');
	$json = "";
	while(!feof($file))
	{
		$json .= fread($file,1024*8);
	}

	echo $json;
}

function merge() {
	$session = isset($_POST['session']) ? $_POST['session'] : $_GET['session'];
	$filename = isset($_POST['filename']) ? $_POST['filename'] : $_GET['filename'];

	$path = "../textureFiles/$session";
	$fullpath = "$path/tmp";
	

	echo mergeIntoTexture("$path/texture.png", $fullpath);
}

$routes = new Routes("__route__");
$routes->addRoute("/save", "saveJson");
$routes->addRoute("/upload", "uploadImage");
$routes->addRoute("/getImages", "getImages");
$routes->addRoute("/getTexture", "getTexture");
$routes->addRoute("/merge", "merge");

$routes->run();


?>