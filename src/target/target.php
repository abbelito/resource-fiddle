<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/target.bundle.css">
		<script type="text/javascript" src="js/resourceapp.bundle.js"></script>

		<script type="text/javascript">
			function getQueryStringParams() {
				var params = {};
				(function() {

					var match,
						pl = /\+/g, // Regex for replacing addition symbol with a space
						search = /([^&=]+)=?([^&]*)/g,
						decode = function(s) {
							return decodeURIComponent(s.replace(pl, " "));
						},
						query = window.location.search.substring(1).replace(/amp;/g, "");

					while (match = search.exec(query))
						params[decode(match[1])] = decode(match[2]);
				})();

				return params;
			};

			function run() {
				var params = getQueryStringParams();
				var resourceURL = params["resources"];
				var testcase = params["testcase"];
				console.log("resourceURL = ", resourceURL);
				console.log("params = ", params);
				var resourceApp = new ResourceApp(resourceURL, testcase);
			//	resourceApp.loadTextures(params['textures']);
			};
			

		</script>
		
	</head>
	<body onload="run();">
	</body>
</html>