var ResourceItemModel = require("./ResourceItemModel");
var inherits = require("inherits");

/**
 * ImageItemModel
 * @class ImageItemModel
 */
function ImageItemModel(key) {
	ResourceItemModel.call(this, key);

	this.defaultValue = null;
	this.value = null;
}

inherits(ImageItemModel, ResourceItemModel);

/**
 * Get default value.
 * @method getDefaultValue
 */
ImageItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Get customized value.
 * @method getValue
 */
ImageItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
ImageItemModel.prototype.setValue = function(value) {
	this.value = value;
	this.notifyChange();
}

/**
 * Get item type.
 * @method getItemType
 */
ImageItemModel.prototype.getItemType = function() {
	return "image";
}

/**
 * @method parseDefaultData
 */
ImageItemModel.prototype.parseDefaultData = function(data) {
	console.log("parsing: " + JSON.stringify(data));

	this.defaultValue = data.filename;
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
ImageItemModel.prototype.prepareSaveData = function(jsonData) {
	/*	jsonData.graphics[this.key] = {
			filename: 
		};*/
}

module.exports = ImageItemModel;