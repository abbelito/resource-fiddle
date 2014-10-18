<?php

/**
* 
*/
class Testcase 
{
	public $id;
	public $name;
	public $url;

	function __construct($id, $name, $url)
	{
		$this->id = $id;
		$this->name = $name;
		$this->url = $url;
	}
}

?>