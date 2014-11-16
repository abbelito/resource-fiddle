<?php

/**
* 
*/
class Route {
	private $path;
	private $object;
	private $functionName;

	function __construct($path, $object, $functionName) {
		$this->path = $path;
		$this->object = $object;
		$this->functionName = $functionName;
	}

	public function compare($path) {
		if(strcmp($this->path, $path) == 0) {
			return true;
		}
		return false;
	}

	public function run() {
		call_user_func_array(array($this->object, $this->functionName), array());
		return true;
	}
}

?>