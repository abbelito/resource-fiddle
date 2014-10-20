<?php
	
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

		private $groups;
		private $targetURL;

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
		public function dispatch()
		{
			?>
			<html>
				<head>
					<link rel="stylesheet" type="text/css" href="css/client.bundle.css">
					<script type="text/javascript" src="js/fiddleclient.bundle.js"></script>

					
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

							var jsonUrl = document.location + "textureFiles/<?= $this->session; ?>/texture.json";
							
							resources.addSource(jsonUrl);


							var domContainer = document.getElementById("container");

							var client = new FiddleClient(domContainer);
							<?php 
							$count = count($this->testcases);
							for($i = 0; $i < $count; $i++) {
								$testcaseUrl1 = $this->targetURL . "?resources=";
								$testcaseUrl2 = "&" . $this->testcases[$i]->url;
								?>
								client.addTestcase("<?= $this->testcases[$i]->id ?>", "<?= $this->testcases[$i]->name ?>", "<?= $testcaseUrl1; ?>" + jsonUrl + "<?= $testcaseUrl2; ?>");
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
	}

?>