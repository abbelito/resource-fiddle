<?php

/**
 * A resource image.
 */
class ResourceImage {

	private $id;
	private $filename;

	/**
	 * Construct.
	 */
	public function __construct($id) {
		$this->id=$id;
	}

	/**
	 * Get id.
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * Load.
	 */
	public function load($filename) {
		$ext=pathinfo($filename,PATHINFO_EXTENSION);

		switch($ext) {
			case "png":
				$this->image = imagecreatefrompng($filename);
				break;

			case "jpg":
			case "jpeg":
				$this->image = imagecreatefromjpeg($filename);

			default:
				throw new Exception("unknonw file format.");
		}
	}

	/**
	 * Get part of the image.
	 */
	public function getImagePart($x, $y, $w, $h) {
		$image = imagecreatetruecolor($w, $h);
		imagealphablending($image, false);
		$col = imagecolorallocatealpha($image, 255, 255, 255, 127);
		imagefilledrectangle($image, 0, 0, $w, $h, $col);
		imagealphablending($image, true);

		imagecopyresampled($image, $this->image, 0, 0, $x, $y, $w, $h, $w, $h);
		return $image;
	}

	/**
	 * Set image.
	 */
	public function setImage($image) {
		$this->image=$image;
	}

	/**
	 * Set filename.
	 */
	public function setFilename($name) {
		$this->filename=$name;
	}

	/**
	 * Get canonical filename
	 */
	public function getCanonicalFileName() {
		if ($this->filename)
			return $this->filename;

		return $this->key.".png";
	}

	/**
	 * Save the image.
	 */
	public function save($filename) {
		imagealphablending($this->image, false);
		imagesavealpha($this->image, true);
		imagepng($this->image,$filename);
	}
}

/**
 * Handles decompilation of a resource manifest.
 */
class ResourceManifest {

	private $texturesById;
	private $images;

	/**
	 * Construct.
	 */
	public function __construct() {
		$this->texturesById=array();
		$this->images;
	}

	/**
	 * Load.
	 */
	public function load($filename) {
		$sourceDir=pathinfo($filename,PATHINFO_DIRNAME);
		$json=json_decode(file_get_contents($filename),TRUE);

		foreach ($json["graphics"]["textures"] as $textureDef) {
			$texture=new ResourceImage($textureDef["id"]);
			$texture->load($sourceDir."/".$textureDef["file"]);
			$this->texturesById[$texture->getId()]=$texture;
		}

		foreach ($json["graphics"] as $k=>$imageDef) {
			if ($k!="textures") {
				$image=new ResourceImage($k);
				$image->setFilename($imageDef["filename"]);
				$texture=$this->texturesById[$imageDef["texture"]];
				$image->setImage($texture->getImagePart(
					$imageDef["coords"][0],
					$imageDef["coords"][1],
					$imageDef["coords"][2],
					$imageDef["coords"][3]
				));

				$this->images[]=$image;
			}
		}
	}

	/**
	 * Decompile.
	 */
	public function decompile($filename) {
		$destDir=pathinfo($filename,PATHINFO_DIRNAME);

		$json=array();
		$json["graphics"]=array();

		foreach ($this->images as $image) {
			$image->save($destDir."/".$image->getCanonicalFileName());
			$json["graphics"][$image->getId()]=array(
				"filename"=>$image->getCanonicalFileName()
			);
		}

		file_put_contents($filename,json_encode($json,JSON_PRETTY_PRINT));
	}
}
