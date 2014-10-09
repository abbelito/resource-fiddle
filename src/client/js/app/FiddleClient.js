var JsonEditor = require("./JsonEditor");
var IFrame = require("./IFrame");

function FiddleClient() {
	this.editor = new JsonEditor();
	this.iframe = new IFrame();
};

FiddleClient.prototype.constructor = FiddleClient;

FiddleClient.prototype.init = function(targetURL, editorContainer, targetContainer) {
	this.editor.init(editorContainer);
	this.iframe.init(targetContainer, targetURL);
};

module.exports = FiddleClient;