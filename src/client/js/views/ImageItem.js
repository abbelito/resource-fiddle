var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var SelectButton = require("./SelectButton");
var ImageView = require("./ImageView");
var Resources = require("../../../lib/Resources");

function ImageItem(basePath, name, texture) {
	ListItem.call(this, name);

	this.name = name;

	this.image = new ImageView(basePath, texture);
	this.addChild(this.image);

	this.image.y = this.header.height;

	this.button = new SelectButton("Upload new image");
	this.addChild(this.button);

	this.button.on(SelectButton.Change, this.onFilesSelected, this);
	
};
ClassUtils.extends(ImageItem, ListItem);
EventDispatcher.init(ImageItem);

ImageItem.Selected = "Selected";

ImageItem.prototype.setTexture = function(texture) {
	this.image.setTexture(texture);
};

ImageItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);

	this.image.updateLayout(width * 0.5, height - this.header.height);
	this.image.y = this.header.height;
	
	this.button.y = this.header.height + ((height - this.header.height) - this.button.height)*0.5;
	this.button.x = width * 0.5;
};


ImageItem.prototype.onFilesSelected = function(files) {
	this.files = files;
	
	this.trigger(ImageItem.Selected, this);
};

ImageItem.prototype.getValues = function() {
	return this.files;
};


module.exports = ImageItem;