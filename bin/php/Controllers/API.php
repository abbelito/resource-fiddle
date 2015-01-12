<?php
include_once(__DIR__ . "/Routes.php");

require_once __DIR__."/../Utils/TexturePacker.php";

class API {
	private $texturePath;
	private $session;
	private $resourceFiddle;

	function __construct() {
	}

	public function setTexturePath($texturePath) {
		$this->texturePath = $texturePath;
	}

	public function setSession($session) {
		$this->session = $session;
	}

	public function setResourceFiddle($value) {
		$this->resourceFiddle=$value;
	}


	/*public function mergeIntoTexture($textureFolder, $imageFolder, $url) {
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
			$col = imagecolorallocatealpha($texture, 255, 255, 255, 127);
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
	}*/

	/**
	 * Build texture and update texture.json with image coordinates.
	 */
	private function buildTexture() {
		$path = $this->texturePath . "/" . $this->session;
		$textureJsonFileName="$path/texture.json";

		$json=json_decode(file_get_contents($textureJsonFileName),TRUE);
		$texturePacker=new TexturePacker();
		$texturePacker->setTextureFolder($path);

		foreach ($json["graphics"] as $k=>$v) {
			if ($k!="textures") {
				if ($v["filename"])
					$texturePacker->addImage($path."/".$v["filename"]);

				else
					$texturePacker->addImage(__DIR__."/../../img/no_image.jpeg");
			}
		}

		$texturePacker->pack();
		$json["graphics"]["textures"]=$texturePacker->getTexturesDefinition();

		foreach ($json["graphics"] as $k=>$v) {
			if ($k!="textures") {
				if ($v["filename"])
					$frame=$texturePacker->getFrameByFilename($v["filename"]);

				else
					$frame=$texturePacker->getFrameByFilename("no_image.jpeg");

				$json["graphics"][$k]["texture"]=$frame["texture"];
				$json["graphics"][$k]["coords"]=$frame["coords"];
			}
		}

		file_put_contents($textureJsonFileName, json_encode($json,JSON_PRETTY_PRINT));
	}


	public function saveJson() {

		$session = $this->session;
		$jsonString = isset($_POST['json']) ? $_POST['json'] : $_GET['json'];

		$path = $this->texturePath . "/$session";

		if (!file_exists($path)) {
			mkdir($path, 0777, true);
		}

		$res=file_put_contents("$path/texture.json", stripcslashes($jsonString));

		if (!$res)
			throw new Exception("Unable to open file...");

		$this->buildTexture();

		echo $this->jsonResponse(true);
	}

	public function uploadImage() {
		$session = $this->session;
		$filename = $_FILES["SelectedFile"]["name"];
		//$url = isset($_POST['url']) ? $_POST['url'] : $_GET['url'];

		$path = $this->texturePath . "/$session";
//		$fullpath = "$path/tmp";
		$fullpath = $path;

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

		//$filepath = "$fullpath/" . $filename . "." . $ext;//$_FILES["SelectedFile"]["name"];
		$filepath = "$fullpath/" . $filename;
		// Upload file
		if(!move_uploaded_file($_FILES['SelectedFile']['tmp_name'], $filepath)) {
		    $this->jsonResponse('Error uploading file - check destination is writeable.');
		}

		//echo $this->mergeIntoTexture("$path", $fullpath, $url);
		echo $this->jsonResponse(TRUE);
	}


	public function getTexture() {

		$session = $this->session;
		$path = $this->texturePath . "/$session";
		$folder = "$path/";
		$filetype = "texture.json";

		if (!file_exists($folder.$filetype)) {
			echo json_encode($this->resourceFiddle->getDefaultJson());
//			echo "{\"graphics\":{}, \"positions\":{}}";
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
};

?>