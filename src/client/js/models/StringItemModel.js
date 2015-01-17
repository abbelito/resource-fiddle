var ResourceItemModel = require("./ResourceItemModel");
var inherits = require("inherits");

/**
 * StringItemModel
 * @class StringItemModel
 */
function StringItemModel(key) {
	ResourceItemModel.call(this, key);

	this.defaultValue = null;
	this.value = null;
}

inherits(StringItemModel, ResourceItemModel);

/**
 * Get default value.
 * @method getDefaultValue
 */
StringItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Get customized value.
 * @method getValue
 */
StringItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
StringItemModel.prototype.setValue = function(value) {
	this.value = value;
	this.notifyChange();
}

/**
 * Set default value.
 * @method setDefaultValue
 */
StringItemModel.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}

/**
 * Get item type.
 * @method getItemType
 */
StringItemModel.prototype.getItemType = function() {
	return "string";
}

/**
 * Parse default data.
 */
StringItemModel.prototype.parseDefaultData = function(data) {
	this.defaultValue = data;
}

/**
 * Parse incoming data.
 */
StringItemModel.prototype.parseData = function(data) {
	this.value = data;

	if (this.value == this.defaultValue)
		this.value = null;
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
StringItemModel.prototype.prepareSaveData = function(jsonData) {
	var cand = this.value;

	if (!cand)
		cand = this.defaultValue;

	jsonData.values[this.key] = cand;
}

module.exports = StringItemModel;