var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var SelectButton = require("./SelectButton");
var ImageView = require("./ImageView");
var Resources = require("../../../lib/Resources");

function ImageItem(name, texture) {
	ListItem.call(this, name);

	this.name = name;

	this.image = new ImageView(texture);
	this.addChild(this.image);
	this.image.width = 100;
	this.image.height = 100;

	this.image.y = this.header.height;

	this.button = new SelectButton("Upload new image");
	this.addChild(this.button);

	this.button.on(SelectButton.Change, this.onFilesSelected, this);
	
};
ClassUtils.extends(ImageItem, ListItem);
EventDispatcher.init(ImageItem);

ImageItem.Selected = "Selected";

ImageItem.prototype.addedToStage = function() {
	this.image.width = 100;
	this.image.height = 100;
	ListItem.prototype.addedToStage.call(this);

	this.button.y = this.image.y + (this.image.height - this.button.height)*0.5;
	this.button.x = this.image.x + this.image.width;
};


ImageItem.prototype.onFilesSelected = function(files) {
	
	this.trigger(ImageItem.Selected, {files: files, name: this.name})
};


module.exports = ImageItem;