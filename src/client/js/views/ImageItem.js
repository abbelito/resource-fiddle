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

	this.image.y = this.header.height;

	this.button = new SelectButton("Upload new image");
	this.addChild(this.button);

	this.button.on(SelectButton.Change, this.onFilesSelected, this);
	
};
ClassUtils.extends(ImageItem, ListItem);
EventDispatcher.init(ImageItem);

ImageItem.Selected = "Selected";


ImageItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);

	this.image.updateLayout(width * 0.5, height - this.header.height);
	this.image.y = this.header.height;
	
	this.button.y = this.header.height + ((height - this.header.height) - this.button.height)*0.5;
	this.button.x = width * 0.5;
};


ImageItem.prototype.onFilesSelected = function(files) {
	
	this.trigger(ImageItem.Selected, {files: files, name: this.name})
};


module.exports = ImageItem;