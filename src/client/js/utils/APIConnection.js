var EventDispatcher = require("./EventDispatcher");

function APIConnection(session) {
	this.url = "php/?__route__=/";
	this.session = session;
};
EventDispatcher.init(APIConnection);

APIConnection.prototype.load = function(route, paramObject) {
	var xmlhttp = null;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = this.onReadyStateChange.bind(this, xmlhttp);

	var url = this.url + route;//"getImages";
	var params = "";
	var first = true;
	for(var o in paramObject) {
		if(!first) {
			params += "&";
		}
		else {
			first = false;
		}
		params += o + "=" + paramObject[o];
	}
	params += "&session=" + this.session;
	params += "&___timestamp____=" + Date.now();

	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
};

APIConnection.prototype.upload = function(route, paramObject) {
	var xmlhttp = null;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = this.onReadyStateChange.bind(this, xmlhttp);

	var url = this.url + route + "&session=" + this.session;//"getImages";
	
	xmlhttp.open("POST", url, true);
	//xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(paramObject);
};

APIConnection.prototype.onReadyStateChange = function(xmlhttp) {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200 || window.location.href.indexOf("http") == -1) {
			var json = JSON.parse(xmlhttp.response);
			this.trigger("loaded", {connection: this, json: json});
		}
		else{
			console.log("An error has occured making the request")
		}
	}
};


module.exports = APIConnection;