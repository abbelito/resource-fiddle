<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<script type="text/javascript" src="js/IFrame.js"></script>
		<script type="text/javascript" src="js/JsonEditor.js"></script>
		<script type="text/javascript" src="js/fiddle.js"></script>

		
	</head>
	<body>
		<script type="text/javascript">

		var targetURL = decodeURIComponent("<?= $_GET['url']; ?>");

		console.log("targetURL: ", targetURL);

		(function() {
			var client = new FiddleClient();
			client.init(targetURL);
		})();

		</script>
	</body>
</html>