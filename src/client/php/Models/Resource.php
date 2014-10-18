<?php

/**
* 
*/
class Resource
{
	public $value;
	public $name;

	function __construct($name, $value = NULL)
	{
		$this->name = $name;
		$this->value = $value;
	}
}

?>