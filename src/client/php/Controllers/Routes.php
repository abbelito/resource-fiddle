<?php

include_once("Route.php");
/**
* 
*/
class Routes {
	
	private $routes;
	private $routeId;

	function __construct($routeId) {
		$this->routeId = $routeId;
		$this->routes = array();
	}

	public function addRoute($routePath, $functionName)  {
		$route = new Route($routePath, $functionName);
		array_push($this->routes, $route);
	}

	public function run() {
		$routeString = $_GET[$this->routeId];
		for($i = 0; $i < count($this->routes); $i++) {
			if($this->routes[$i]->compare($routeString)) {
				return $this->routes[$i]->run();
			}
		}
	}
}

?>