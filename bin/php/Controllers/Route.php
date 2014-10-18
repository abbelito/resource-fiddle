<?php

/**
* 
*/
class Route {
	private $path;
	private $functionName;

	function __construct($path, $functionName) {
		$this->path = $path;
		$this->functionName = $functionName;
	}

	public function compare($path) {
		if(strcmp($this->path, $path) == 0) {
			return true;
		}
		return false;
	}

	public function run() {
		return call_user_func_array($this->functionName, array());
	}
}

?>