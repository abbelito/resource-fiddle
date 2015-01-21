<?php
	
	include_once("Controllers/API.php");
	include_once("Controllers/Routes.php");
	include_once("Models/Resource.php");
	include_once("Models/Testcase.php");
	include_once("Models/Category.php");

	/**
	* 
	*/
	class ResourceFiddle extends Category
	{
		private $path;
		private $testcases;
		private $texturePath;
		private $sourcePath;

		const GRAPHICS = Resource::GRAPHICS;
		const POSITIONS = Resource::POSITIONS;
		const COLORS = Resource::COLORS;
		const STRINGS = Resource::STRINGS;

		/**
		 *
		 */
		function __construct()
		{
			parent::__construct();
			$this->testcases = array();
			$this->path  = "";
			$this->texturePath = "textureFiles";
			$this->session="custom";
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
		public function addTestcase($id, $name, $url=NULL)
		{
			if (!$url) {
				$url=$name;
				$name=$id;
			}

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
					<link rel="stylesheet" href="semantic-ui/semantic.min.css">
					<script src="<?= $this->path; ?>js/jquery.min.js"></script>
					<script src="<?= $this->path; ?>semantic-ui/semantic.min.js"></script>
					<script src="<?= $this->path; ?>js/resource-fiddle.bundle.js"></script>
					<script type="text/javascript">
						function run() {
							var initData=<?php echo json_encode($this->getDefinitionData()); ?>;
							var jsonUrl = document.location+"getTexture";

							var resources = new Resources();
							resources.addSource(jsonUrl, true);

							var domContainer = document.getElementById("container");

							var client = new FiddleClient(domContainer, "<?= $this->session; ?>", "<?= $this->path; ?>");

							<?php 
							$count = count($this->testcases);
							for($i = 0; $i < $count; $i++) {
								$testcaseUrl = $this->testcases[$i]->url . "&resources=";
								?>
								client.addTestcase("<?= $this->testcases[$i]->id ?>", "<?= $this->testcases[$i]->name ?>", "<?= $testcaseUrl; ?>" + encodeURIComponent(jsonUrl));
								<?php
							}
							?>

							client.init(initData, resources);
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

			$textureFile=$sessionPath."/texture.json";

		}

		public function getFullSessionPath() {
			$pathinfo=pathinfo($_SERVER["SCRIPT_FILENAME"]);
			$dirname=$pathinfo["dirname"];			

			$localTexturePath=$dirname."/".$this->texturePath;
			$sessionPath=$localTexturePath."/".$this->session;

			return $sessionPath;
		}

		public function getDefaultJson() {
			$o=array();
			$o["graphics"]=array();
			$o["positions"]=array();
			$o["colors"]=array();
			$o["values"]=array();

			$o["graphics"]["textures"]=array();

			foreach ($this->getAllResources() as $item) {
				switch ($item->type) {
					case Resource::GRAPHICS:
						$o["graphics"][$item->name]=array(
							"filename"=>$item->value
						);
						break;

					case Resource::POSITIONS:
						$o["positions"][$item->name]=$item->value;
						break;

					case Resource::COLORS:
						$o["colors"][$item->name]=$item->value;
						break;

					case Resource::STRINGS:
						$o["values"][$item->name]=$item->value;
						break;
				}
			}

			return $o;
		}

		/**
		 * Load xml definition.
		 */
		public function load($filename) {
			$this->sourcePath=pathinfo($filename,PATHINFO_DIRNAME);
			$xml=new SimpleXMLElement(file_get_contents($filename));
			$this->parseXml($xml);
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
			$api->setResourceFiddle($this);

			$routes = new Routes();
			$routes->addRoute("/save", $api, "saveJson");
			$routes->addRoute("/upload", $api, "uploadImage");
			$routes->addRoute("/getTexture", $api, "getTexture");
			if($routes->run($path) != false) {
				return;
			}

			if (file_exists(__DIR__."/..".$path))
				$contents = file_get_contents(__DIR__."/..".$path);

			else if (file_exists($this->getFullSessionPath()."/".$path))
				$contents = file_get_contents($this->getFullSessionPath()."/".$path);

			else if (file_exists($this->sourcePath."/".$path))
				$contents = file_get_contents($this->getSourcePath()."/".$path);

			else {
				header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
				return;
			}

			switch (pathinfo($path,PATHINFO_EXTENSION)) {
				case "js":
					header("Content-type: text/javascript");
					break;

				case "css":
					header("Content-type: text/css");
					break;

				case "woff":
					header("Content-type: font/woff");
					break;

				case "jpg":
				case "jpeg":
					header("Content-type: image/jpeg");
					break;

				case "png":
					header("Content-type: image/png");
					break;
			}

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