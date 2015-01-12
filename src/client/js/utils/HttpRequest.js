var Thenable = require("tinp");

/**
 * Http request abstraction.
 * @class HttpRequest
 */
function HttpRequest(url) {
	this.url = url;
	this.formData = new FormData();
	this.thenable = null;
	this.decodeResponse = "json";
}

/**
 * Set url.
 * @method setUrl
 */
HttpRequest.prototype.setUrl = function(url) {
	this.url = url;
}

/**
 * Set a file to upload.
 * @method setUploadFile
 */
HttpRequest.prototype.setParameter = function(name, value) {
	this.formData.append(name, value);
}

/**
 * Perform request.
 * @method perform
 */
HttpRequest.prototype.perform = function() {
	this.thenable = new Thenable();

	this.xmlXMLHttpRequest = new XMLHttpRequest();
	this.xmlXMLHttpRequest.onreadystatechange = this.onReadyStateChange.bind(this);

	this.xmlXMLHttpRequest.open("POST", this.url, true);
	this.xmlXMLHttpRequest.send(this.formData);

	return this.thenable;
}

/**
 * Ready state change.
 * @onReadyStateChange
 */
HttpRequest.prototype.onReadyStateChange = function() {
	console.log("ready state change: " + this.xmlXMLHttpRequest.readyState);

	if (this.xmlXMLHttpRequest.readyState != 4)
		return;

	if (this.xmlXMLHttpRequest.status != 200) {
		this.thenable.reject("Error!");
		return;
	}

	var result = this.xmlXMLHttpRequest.response;

	switch (this.decodeResponse) {
		case "json":
			try {
				result = JSON.parse(result);
			} catch (e) {
				this.thenable.reject("Unable to parse response: " + this.xmlXMLHttpRequest.response);
				return;
			}
			break;
	}

	this.thenable.resolve(result);
}

module.exports = HttpRequest;