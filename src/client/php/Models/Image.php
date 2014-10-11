<?php

/**
* 
*/
class Image
{
	public $filename;
	public $image;
	public $x;
	public $y;
	public $width;
	public $height;

	function __construct($filename, $imageResources)
	{
		$this->filename = $filename;
		$this->image = $imageResources;
		$this->x = 0;
		$this->y = 0;
		$this->width = imagesx($imageResources);
		$this->height = imagesy($imageResources);
	}
}

?>