<?php

/**
 * Holds information about one image.
 */
class Image {
	public $filename;
	public $image;
	public $x;
	public $y;
	public $width;
	public $height;

	function __construct($filename) {
		$ext = pathinfo($filename, PATHINFO_EXTENSION);

		if($ext == "png") {
			$imageResource = imagecreatefrompng($filename);
		}
		else if(($ext == "jpg") || ($ext == "jpeg")) {
			$imageResource = imagecreatefromjpeg($filename);
		}
		else {
			throw new Exception("not an image: ".$filename);
		}

		$this->filename = $filename;
		$this->image = $imageResource;
		$this->x = 0;
		$this->y = 0;
		$this->width = imagesx($imageResource);
		$this->height = imagesy($imageResource);
	}

	function getBaseName() {
		return pathinfo($this->filename,PATHINFO_BASENAME);
	}
}

/**
 * Pack textures.
 */
class TexturePacker {

	private $imageFileNames;
	private $textureFolder;
	private $json;

	/**
	 * Constructor.
	 */
	public function TexturePacker() {
		$this->imageFileNames=array();
		$this->images=array();
	}

	/**
	 * Add an image to be packed.
	 */
	public function addImage($fn) {
		$this->imageFileNames[]=$fn;
	}

	/**
	 * Add all images in directory.
	 */
	public function addImagesInDirectory($dir) {
		$files = glob($dir."/*");

		foreach ($files as $f)
			$this->imageFileNames[]=$f;
	}

	/**
	 * Set target directory.
	 */
	public function setTextureFolder($dir) {
		$this->textureFolder=$dir;
	}

	/**
	 * Do the packing and write resulting images.
	 */
	public function pack() {
		$images=array();

		foreach ($this->imageFileNames as $fn)
			$images[]=new Image($fn);

		usort($images, array($this,"sortOnSize"));

		$originalImages = array();
		$first = true;
		$index = 0;

		$json=array();
		$json["textures"]=array();

		$framesjson = "";

		while(count($images) > 0)
		{
			$textureName = "texture$index";

			$json["textures"][]=array(
				"id"=>$textureName,
				"file"=>"$textureName.png"
			);

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
			imagepng($texture, $this->textureFolder."/$textureName.png");
			imagedestroy($texture);


			while(count($originalImages) > 0) {
				$image = $originalImages[0];
				array_shift($originalImages);

//				$key=preg_replace('/.[^.]*$/', '', implode('', explode("$imageFolder/", $image->filename)));
				$key=$image->getBaseName();
				$json[$key]=array(
					"texture"=> $textureName,
					"coords"=> array($image->x,$image->y,$image->width,$image->height)
				);
			}

			$index++;
		}

		$this->json=$json;
	}

	/**
	 * Get full json.
	 */
	public function getJson() {
		return $this->json;
	}

	/**
	 * Get texture definition part.
	 */
	public function getTexturesDefinition() {
		return $this->json["textures"];
	}

	/**
	 * Get frame definition by filename.
	 */
	public function getFrameByFilename($filename) {
		foreach ($this->json as $k=>$v) {
			if (pathinfo($k,PATHINFO_BASENAME)==pathinfo($filename,PATHINFO_BASENAME))
				return $v;
		}

		return NULL;
	}

	/**
	 * Sort on image size.
	 */
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
}