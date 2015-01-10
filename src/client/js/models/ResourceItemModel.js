var EventDispatcher = require("yaed");
var inherits = require("inherits");

/**
 * ResourceItemModel
 * @class ResourceItemModel
 */
function ResourceItemModel(key) {
	this.key = key;
}

inherits(ResourceItemModel, EventDispatcher);
ResourceItemModel.ITEM_CHANGE = "itemChange";

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
	throw new Error("Abstract");
}

/**
 * Get customized value.
 * @method getValue
 */
ResourceItemModel.prototype.getValue = function() {
	throw new Error("Abstract");
}

/**
 * Set value.
 * @method setValue
 */
ResourceItemModel.prototype.setValue = function(value) {
	throw new Error("Abstract");
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
ResourceItemModel.prototype.prepareSaveData = function(jsonData) {
	throw new Error("Abstract");
}

/**
 * Notify change.
 * @method notifyChange
 * @protected
 */
ResourceItemModel.prototype.notifyChange = function() {
	this.trigger(ResourceItemModel.ITEM_CHANGE);
}

/**
 * Get item type.
 * @method getItemType
 */
ResourceItemModel.prototype.getItemType = function() {
	throw new Error("Abstract");
}

module.exports = ResourceItemModel;