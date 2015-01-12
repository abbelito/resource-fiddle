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
				if ($v["filename"] && file_exists($path."/".$v["filename"]))
					$texturePacker->addImage($path."/".$v["filename"]);

				else if ($v["filename"] && file_exists($v["filename"]))
					$texturePacker->addImage($v["filename"]);

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


	/**
	 * Save the texture.json file. This will also rebuild the sprite sheet texture.
	 */
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

	/**
	 * Handle an image upload. This will just save the image on the server,
	 * it is up to the client to actually save a reference to the file in
	 * the texture.json resource definition.
	 */
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

	/**
	 * Get current texture specification file.
	 * If it does not exist it will be created based on default values specified in
	 * the ResourceFiddle property definition, and saved to disk. In the case where
	 * it does not exist, the texture sprite sheed will also be built.
	 */
	public function getTexture() {
		$path = $this->texturePath . "/" . $this->session;
		$textureJsonFileName="$path/texture.json";

		if (!file_exists($textureJsonFileName)) {
			$json=$this->resourceFiddle->getDefaultJson();
			file_put_contents($textureJsonFileName, json_encode($json));
			$this->buildTexture();
		}

		echo file_get_contents($textureJsonFileName);
	}

	/**
	 * Prepare a json response to send to the browser.
	 */
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