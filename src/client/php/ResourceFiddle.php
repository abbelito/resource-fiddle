<?php
	
	include_once("Controllers/API.php");
	include_once("Controllers/Routes.php");
	include_once("Models/Resource.php");
	include_once("Models/Testcase.php");

	/**
	* 
	*/
	class ResourceFiddle
	{
		private $graphics;
		private $colors;
		private $positions;
		private $strings;

		private $testcases;
		private $texturePath;

		private $groups;
		private $targetURL;

		private $path;

		public static $GRAPHICS = 0;
		public static $POSITIONS = 1;
		public static $COLORS = 2;
		public static $STRINGS = 3;

		/**
		 *
		 */
		function __construct()
		{
			$this->graphics = array();
			$this->colors = array();
			$this->positions = array();
			$this->strings = array();

			$this->testcases = array();
			$this->path  = "";
			$this->texturePath = "textureFiles";
		}

		/**
		 *
		 */
		public function addResource($type, $name, $value = NULL)
		{
			switch($type) {
				case ResourceFiddle::$GRAPHICS: {
					array_push($this->graphics, new Resource($name, $value));
					break;
				}
				case ResourceFiddle::$POSITIONS: {
					array_push($this->positions, new Resource($name, $value));
					break;
				}
				case ResourceFiddle::$COLORS: {
					array_push($this->colors, new Resource($name, $value));
					break;
				}
				case ResourceFiddle::$STRINGS: {
					array_push($this->strings, new Resource($name, $value));
					break;
				}
			}
		}

		/**
		 *
		 */
		public function setTarget($targetURL)
		{
			$this->targetURL  = $targetURL;
		}

		/**
		 *
		 */
		public function setBasePath($path)
		{
			$this->path  = $path;
		}

		/**
		 *
		 */
		public function setSession($sessionId)
		{
			$this->session = $sessionId;
		}

		/**
		 *
		 */
		public function addTestcase($id, $name, $url)
		{
			array_push($this->testcases, new Testcase($id, $name, $url));
		}

		/**
		 *
		 */
		public function setTexturePath($texturePath)
		{
			$this->texturePath=$texturePath;
		}

		/**
		 *
		 */
		private function showIndex() {
			?>
			<html>
				<head>
					<link rel="stylesheet" type="text/css" href="<?= $this->path; ?>css/client.min.css">
					<script type="text/javascript" src="<?= $this->path; ?>js/resource-fiddle.bundle.js"></script>

					
					<script type="text/javascript">

						
						function run() {

							var resources = new Resources();
							resources.addSource({
								graphics: {
									<?php 
									$count = count($this->graphics);
									for($i = 0; $i < $count; $i++) {
										echo $this->graphics[$i]->name . ": ";

										if($this->graphics[$i]->value != NULL) {
											echo $this->graphics[$i]->value;
										}
										else {
											echo "\"\"";
										}
										if($i < ($count - 1)) {
											echo ",";
										}
										?>
										
										<?php
									}
									?>

								},
								positions: {
									<?php 
									$count = count($this->positions);
									for($i = 0; $i < $count; $i++) {
										echo $this->positions[$i]->name . ": ";

										if($this->positions[$i]->value != NULL) {
											echo $this->positions[$i]->value;
										}
										else {
											echo "\"\"";
										}
										if($i < ($count - 1)) {
											echo ",";
										}
										?>
										
										<?php
									}
									?>

								},
								colors: {
									<?php 
									$count = count($this->colors);
									for($i = 0; $i < $count; $i++) {
										echo $this->colors[$i]->name . ": ";

										if($this->colors[$i]->value != NULL) {
											echo $this->colors[$i]->value;
										}
										else {
											echo "\"\"";
										}
										if($i < ($count - 1)) {
											echo ",";
										}
										?>
										
										<?php
									}
									?>

								},
								strings: {
									<?php 
									$count = count($this->strings);
									for($i = 0; $i < $count; $i++) {
										echo $this->strings[$i]->name . ": ";

										if($this->strings[$i]->value != NULL) {
											echo $this->strings[$i]->value;
										}
										else {
											echo "\"\"";
										}
										if($i < ($count - 1)) {
											echo ",";
										}
										?>
										
										<?php
									}
									?>

								}
							});

							var jsonUrl = document.location + "<?= $this->texturePath; ?>/<?= $this->session; ?>/texture.json";
							resources.addSource(jsonUrl, true);


							var domContainer = document.getElementById("container");

							var client = new FiddleClient(domContainer, "<?= $this->session; ?>", "<?= $this->path; ?>");
							<?php 
							$count = count($this->testcases);
							for($i = 0; $i < $count; $i++) {
								$testcaseUrl1 = $this->targetURL . "?resources=";
								$testcaseUrl2 = "&" . $this->testcases[$i]->url;
								?>
								client.addTestcase("<?= $this->testcases[$i]->id ?>", "<?= $this->testcases[$i]->name ?>", "<?= $testcaseUrl1; ?>" + encodeURIComponent(jsonUrl) + "<?= $testcaseUrl2; ?>");
								<?php
							}
							?>

							client.init(resources);
						}

					</script>
				</head>
				<body onload="run();">
					<div id="container"></div>
				</body>
			</html>
			<?php
		}

		/**
		 *
		 */
		private function initTexturePath()
		{
			$pathinfo=pathinfo($_SERVER["SCRIPT_FILENAME"]);
			$dirname=$pathinfo["dirname"];			

			$localTexturePath=$dirname."/".$this->texturePath;

			if (!is_dir($localTexturePath)) {
				$res=mkdir($localTexturePath);

				if (!$res)
					throw new Exception("Unable to create ".$localTexturePath);
			}

			$sessionPath=$localTexturePath."/".$this->session;

			if (!is_dir($sessionPath)) {
				$res=mkdir($sessionPath);

				if (!$res)
					throw new Exception("Unable to create ".$sessionPath);
			}
		}

		/**
		 *
		 */
		public function dispatch()
		{
			$this->initTexturePath();

			$path=ResourceFiddle::getPath();

			if ($path=="/") {
				$this->showIndex();
				return;
			}


			$api = new API();
			$api->setTexturePath($this->texturePath);
			$api->setSession($this->session);

			$routes = new Routes();
			$routes->addRoute("/save", $api, "saveJson");
			$routes->addRoute("/upload", $api, "uploadImage");
			$routes->addRoute("/getImages", $api, "getImages");
			$routes->addRoute("/getTexture", $api, "getTexture");
			$routes->addRoute("/merge", $api, "merge");
			if($routes->run($path) != false) {
				return;
			}
			$contents = file_get_contents(__DIR__."/..".$path);
			echo $contents;
		}

		public static function getPath()
		{
			$pathinfo=pathinfo($_SERVER["SCRIPT_NAME"]);
			$dirname=$pathinfo["dirname"];
			$url=$_SERVER["REQUEST_URI"];

			if (strpos($url,"?")!==FALSE)
				$url=substr($url,0,strpos($url,"?"));

			if (substr($url,0,strlen($dirname))!=$dirname)
				throw new Exception("Somthing is malformed.");

			return substr($url,strlen($dirname));
		}
	}

?>