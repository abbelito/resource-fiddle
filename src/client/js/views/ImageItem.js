var ClassUtils = require("../utils/ClassUtils");
var ListItem = require("./ListItem");

function ImageItem(model) {
	this.name = model.name;
	this.image = null;
	this.uploadButton = null;
	
};
ClassUtils.extend(ImageItem, ListItem);


module.exports = ImageItem;