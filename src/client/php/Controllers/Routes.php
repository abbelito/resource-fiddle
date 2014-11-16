<?php

include_once("Route.php");
/**
* 
*/
class Routes {
	
	private $routes;
	private $routeId;

	function __construct() {
		$this->routes = array();
	}

	public function addRoute($routePath, $object, $functionName)  {
		$route = new Route($routePath, $object, $functionName);
		array_push($this->routes, $route);
	}

	public function run($routeString) {
		for($i = 0; $i < count($this->routes); $i++) {
			if($this->routes[$i]->compare($routeString)) {
				return $this->routes[$i]->run();
			}
		}
		return false;
	}
}

?>