/**
 * ResourceItemModel
 * @class ResourceItemModel
 */
function ResourceItemModel(type, key, defaultValue, value) {
	this.key = key;

	if (!defaultValue)
		defaultValue="";

	if (!value)
		value="";

	this.defaultValue = defaultValue;
	this.value = value;

	this.itemType = type;

	if (!this.itemType)
		this.itemType = "position";
}

/**
 * Get key.
 * @method getKey
 */
ResourceItemModel.prototype.getKey = function() {
	return this.key;
}

/**
 * Get default value.
 * @method getDefaultValue
 */
ResourceItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Set default value.
 * @method getDefaultValue
 */
ResourceItemModel.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}

/**
 * Get customized value.
 * @method getValue
 */
ResourceItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
ResourceItemModel.prototype.setValue = function(value) {
	this.value = value;
}

/**
 * Get item type.
 * @method getItemType
 */
ResourceItemModel.prototype.getItemType = function() {
	return this.itemType;
}

module.exports = ResourceItemModel;