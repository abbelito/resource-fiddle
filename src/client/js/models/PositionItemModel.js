var ResourceItemModel = require("./ResourceItemModel");
var inherits = require("inherits");

/**
 * PositionItemModel
 * @class PositionItemModel
 */
function PositionItemModel(key) {
	ResourceItemModel.call(this, key);

	this.defaultValue = null;
	this.value = null;
}

inherits(PositionItemModel, ResourceItemModel);

/**
 * Get default value.
 * @method getDefaultValue
 */
PositionItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Get customized value.
 * @method getValue
 */
PositionItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
PositionItemModel.prototype.setValue = function(value) {
	this.value = value;
	this.notifyChange();
}

/**
 * Set default value.
 * @method setDefaultValue
 */
PositionItemModel.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}

/**
 * Get item type.
 * @method getItemType
 */
PositionItemModel.prototype.getItemType = function() {
	return "position";
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
PositionItemModel.prototype.prepareSaveData = function(jsonData) {
}

module.exports = PositionItemModel;