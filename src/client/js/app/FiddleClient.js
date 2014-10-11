var JsonEditor = require("../controllers/JsonEditor");
var IFrame = require("../controllers/IFrame");
var ImageEditor = require("../controllers/ImageEditor");

function FiddleClient() {
	this.editor = new JsonEditor();
	this.iframe = new IFrame();
	this.imageEditor = new ImageEditor();

	this.editor.on("saved", this.onSaved, this);
	this.imageEditor.on("uploaded", this.onUploaded, this);
};

FiddleClient.prototype.constructor = FiddleClient;

FiddleClient.prototype.init = function(targetURL, editorContainer, targetContainer) {
	this.editor.init(editorContainer);
	this.iframe.init(targetContainer, targetURL);
	this.imageEditor.init(editorContainer);

};

FiddleClient.prototype.onSaved = function() {
	console.log("FiddleClient.prototype.onSaved");
	this.iframe.reload();
};

FiddleClient.prototype.onUploaded = function(textureJson) {
	this.editor.setTextureJson(textureJson);
	this.iframe.reload();
};

module.exports = FiddleClient;