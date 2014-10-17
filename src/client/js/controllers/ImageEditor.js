var EventDispatcher = require("../utils/EventDispatcher");
var APIConnection = require("../utils/APIConnection");
var ImageItem = require("../views/ImageItem");


function ImageEditor() {
	this.container = null;
	this.images = new Array();
	this.imageContainer = null;
	this.uploadButton = null;
	this.container = null;

};
ImageEditor.prototype.constructor = ImageEditor;
EventDispatcher.init(ImageEditor);

ImageEditor.prototype.init = function(resource) {
	for(var i = 0; i < resource.)

	this.uploadButton = document.createElement("input");
	this.uploadButton.setAttribute("type", "file");
	this.uploadButton.setAttribute("value", "Upload new image");
	this.uploadButton.addEventListener("change", this.onUpload.bind(this));
	this.container.appendChild(this.uploadButton);

	this.imageContainer = document.createElement("div");
	//this.imageContainer.style.width = "100%";
	this.imageContainer.style.background = "#FFFFFF";
	this.imageContainer.style.width = "512px";
	this.container.appendChild(this.imageContainer);

	//this.loadImages();
};

ImageEditor.prototype.clearTextures = function(texture) {
	this.imageContainer.innerHTML = "";
}

ImageEditor.prototype.addTexture = function(texture) {
	this.imageContainer.innerHTML = "";
	var div = document.createElement("div");
	div.innerHTML = "textureId: " + texture.id;
	this.imageContainer.appendChild(div);
	var img = document.createElement("img");
	img.style.width = "512px";
	img.style.height = "512px";
	img.setAttribute("src", texture.file + "?__timestamp___=" + Date.now());
	this.imageContainer.appendChild(img);
};

ImageEditor.prototype.loadImages = function() {
	var connection = new APIConnection();
	connection.on("loaded", this.onImages, this);
	connection.load("getImages", {session:"bajs"});
};

ImageEditor.prototype.onUpload = function() {
	
	if(this.uploadButton.files.length > 0) {
		var data = new FormData();
		data.append('SelectedFile', this.uploadButton.files[0]);

		var connection = new APIConnection();
		connection.on("loaded", this.onUploaded, this);
		connection.upload("upload", data);
	}
	else {
		console.warn("No files selected: this.uploadButton:", this.uploadButton);
	}
};

ImageEditor.prototype.onImages = function(object) {
	object.connection.off("loaded", this.onImages, this);
	this.images = object.json.data;
	this.imageContainer.innerHTML = "";
	for(var i = 0; i < this.images.length; i++) {
		var li = document.createElement("li");
		var img = document.createElement("img");
		img.setAttribute("src", "php/" + this.images[i]);
		li.appendChild(img);
		this.imageContainer.appendChild(li);
	}
};

ImageEditor.prototype.onUploaded = function(data) {
	var connection = data.connection;
	var json = data.json;
	console.log("json = ", JSON.stringify(json));

	//this.loadImages();
	this.trigger("uploaded", json);
};

module.exports = ImageEditor;