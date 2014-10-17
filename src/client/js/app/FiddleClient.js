var JsonEditor = require("../controllers/JsonEditor");
var IFrame = require("../controllers/IFrame");
var ImageEditor = require("../controllers/ImageEditor");

function FiddleClient() {
	this.editor = new JsonEditor();
	this.iframe = new IFrame();
	this.imageEditor = new ImageEditor();


	this.editor.on("saved", this.onSaved, this);
	this.editor.on("loaded", this.onTexture, this);
	this.imageEditor.on("uploaded", this.onUploaded, this);
};

FiddleClient.prototype.constructor = FiddleClient;

FiddleClient.prototype.init = function(targetURL, resources, editorContainer, targetContainer) {
	this.editor.init(editorContainer);
	this.iframe.init(targetContainer, targetURL);
	this.imageEditor.init(editorContainer);

};

FiddleClient.prototype.onTexture = function() {
	this.imageEditor.clearTextures();
	var json = this.editor.getJson();
	if(json.graphics && json.graphics.textures) {
		for(var i = 0; i < json.graphics.textures.length; i++) {
			this.imageEditor.addTexture(json.graphics.textures[i]);
		}
	}
	this.iframe.setResourceURL("http://127.0.0.1:8080/php/textureFiles/bajs/texture.json");
	//this.iframe.reload();
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