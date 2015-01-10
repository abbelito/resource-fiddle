/**
 * ImageItemModel
 * @class ImageItemModel
 */
function ImageItemModel(key) {
	this.key = key;

	this.defaultValue = null;
	this.value = null;
}

/**
 * Get key.
 * @method getKey
 */
ImageItemModel.prototype.getKey = function() {
	return this.key;
}

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
}

/**
 * Get item type.
 * @method getItemType
 */
ImageItemModel.prototype.getItemType = function() {
	return "image";
}

module.exports = ImageItemModel;