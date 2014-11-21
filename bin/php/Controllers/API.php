<?php
include_once(__DIR__ . "/Routes.php");
include_once(__DIR__ . "/../Models/Image.php");

class API {
	private $texturePath;
	private $session;

	function __construct() {
	}

	public function setTexturePath($texturePath) {
		$this->texturePath = $texturePath;
	}

	public function setSession($session) {
		$this->session = $session;
	}



	public function mergeIntoTexture($textureFolder, $imageFolder, $url) {
		$json = "{\"textures\":["; 

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

		usort($images, array($this,"sortOnSize"));

		$originalImages = array();
		$first = true;
		$index = 0;

		$framesjson = "";

		while(count($images) > 0)
		{

			if($first == true) {
				$first = false;
			}
			else {
				$json .= ",";
			}
			$textureName = "texture$index";


			$json .= "{\"id\": \"$textureName\",\"file\": \"$url$textureFolder/$textureName.png\"}";
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
			

			$fits = true;
			$prevCount = count($images);
			while((count($images) > 0) && ($fits)) {
				for($i = 0; $i < count($images); $i++) {
					$image = $images[$i];
					
					if((($x + $image->width) <= $textureWidth) && (($y + $image->height) <= $textureHeight)) {
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

				if($prevCount == count($images)) {
					$fits = false;
				}
				$prevCount = count($images);
			}
			
			

			imagealphablending($texture, false);
			imagesavealpha($texture, true);
			imagepng($texture, "$textureFolder/$textureName.png");
			imagedestroy($texture);


			while(count($originalImages) > 0) {
				$image = $originalImages[0];
				array_shift($originalImages);
				$framesjson .= ",\"" . preg_replace('/.[^.]*$/', '', implode('', explode("$imageFolder/", $image->filename)))  . "\":";
				$framesjson .= "{";
				$framesjson .= "\"texture\": \"$textureName\",";
				$framesjson .= "\"coords\": [";
				$framesjson .= $image->x . "," . $image->y . "," . $image->width . "," . $image->height;

				$framesjson .= "]";
				$framesjson .= "}";
			}

			$index++;
		}

		$json .= "]";

		$json .= $framesjson;
		




		$json .= "}";

		return $json;
	}


	public function saveJson() {

		$session = $this->session;
		$jsonString = isset($_POST['json']) ? $_POST['json'] : $_GET['json'];

		$path = $this->texturePath . "/$session";

		if (!file_exists($path)) {
			mkdir($path, 0777, true);
		}
		$fileid = fopen("$path/texture.json", "w") or die("{'success':false, 'errors': 'Unable to open file!'}");
		
		fwrite($fileid, stripcslashes($jsonString));
		fclose($fileid);
		
		echo $this->jsonResponse(true);
	}

	public function uploadImage() {
		$session = $this->session;
		$filename = isset($_POST['Filename']) ? $_POST['Filename'] : $_GET['Filename'];
		$url = isset($_POST['url']) ? $_POST['url'] : $_GET['url'];

		$path = $this->texturePath . "/$session";
		$fullpath = "$path/tmp";
		if (!file_exists($fullpath)) {
			mkdir($fullpath, 0777, true);
		}

		// Check for errors
		if($_FILES['SelectedFile']['error'] > 0){
		    echo $this->jsonResponse('An error ocurred when uploading.');
		    return;
		}

		if(!getimagesize($_FILES['SelectedFile']['tmp_name'])){
		    echo $this->jsonResponse('Please ensure you are uploading an image.');
		    return;
		}

		// Check filetype
		if(($_FILES['SelectedFile']['type'] != 'image/png') && ($_FILES['SelectedFile']['type'] != 'image/jpeg')) {
		    echo $this->jsonResponse('Unsupported filetype uploaded.');
		    return;
		}

		// Check filesize
		if($_FILES['SelectedFile']['size'] > 500000){
		    echo $this->jsonResponse('File uploaded exceeds maximum upload size.');
		    return;
		}

		$ext = pathinfo($_FILES["SelectedFile"]["name"], PATHINFO_EXTENSION);

		$filepath = "$fullpath/" . $filename . "." . $ext;//$_FILES["SelectedFile"]["name"];
		// Upload file
		if(!move_uploaded_file($_FILES['SelectedFile']['tmp_name'], $filepath)) {
		    $this->jsonResponse('Error uploading file - check destination is writeable.');
		}


		echo $this->mergeIntoTexture("$path", $fullpath, $url);
	}


	public function getImages() {

		$session = $this->session;
		$path = $this->texturePath . "/$session";
		$folder = "$path/tmp/";
		$filetype = "*";
		$images = glob($folder . $filetype);

		echo $this->jsonResponse($images);
	}

	public function getTexture() {

		$session = $this->session;
		$path = $this->texturePath . "/$session";
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

	public function merge() {
		$session = $this->session;
		$filename = isset($_POST['filename']) ? $_POST['filename'] : $_GET['filename'];
		$url = isset($_POST['url']) ? $_POST['url'] : $_GET['url'];

		$path = $this->texturePath . "/$session";
		$fullpath = "$path/tmp";
		

		echo $this->mergeIntoTexture("textureFiles/$session", $fullpath, $url);
	}

	private function jsonResponse($param)
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

	private function sortOnSize($a, $b) {
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

};

?>