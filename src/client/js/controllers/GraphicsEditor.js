var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var APIConnection = require("../utils/APIConnection");
var Editor = require("./Editor");
var ImageItem = require("../views/ImageItem");
var SelectButton = require("../views/SelectButton");
var Resources = require("../../../lib/Resources");


function GraphicsEditor(basePath, session, view) {
	Editor.call(this, basePath, session, view);

	this.currentItem = null;
};
ClassUtils.extends(GraphicsEditor, Editor);

EventDispatcher.init(GraphicsEditor);

GraphicsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var graphics = this.resources.getResourceObject().graphics;

	console.log("graphics: ", graphics);

	for(var key in graphics) {
		if(key != "textures") {
			console.log("create ImageItem: ", key, graphics[key]);
			var imageItem = new ImageItem(this.basePath, key, this.resources.getDOMTexture(key));
			this.view.addItem(imageItem);
			imageItem.on(ImageItem.Selected, this.onUpload, this);
		}
	}
};

GraphicsEditor.prototype.onUpload = function(item) {
	
	if(item.getValues().length > 0) {
		var data = new FormData();
		data.append('SelectedFile', item.getValues()[0]);
		data.append("Filename", item.name);
		data.append("url", document.location);
		this.currentItem = item;
		var connection = new APIConnection(this.basePath, this.session);
		connection.on("loaded", this.onUploaded, this);
		connection.upload("upload", data);
	}
	else {
		console.warn("No files selected: event:", item);
	}
};

GraphicsEditor.prototype.onUploaded = function(data) {
	var connection = data.connection;
	var json = data.json;
	console.log("GraphicsEditor.prototype.onUploaded: json = ", JSON.stringify(json));

	this.resources.addSource({graphics: json});
	this.save();
	this.currentItem.setTexture(this.resources.getDOMTexture(this.currentItem.name));
	//this.loadImages();
	this.trigger("uploaded", json);
};

module.exports = GraphicsEditor;