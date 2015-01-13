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
 * Parse default data.
 */
PositionItemModel.prototype.parseDefaultData = function(data) {
	this.defaultValue = data[0] + ", " + data[1];
}

/**
 * Parse incoming data.
 */
PositionItemModel.prototype.parseData = function(data) {
	this.value = data[0] + ", " + data[1];

	if (this.value == this.defaultValue)
		this.value = null;
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
PositionItemModel.prototype.prepareSaveData = function(jsonData) {
	var cand = this.getDataCand(this.value);

	if (!cand)
		cand = this.getDataCand(this.defaultValue);

	jsonData.positions[this.key] = cand;
}

/**
 * Get cadidate data.
 * @method getDataCand
 */
PositionItemModel.prototype.getDataCand = function(v) {
	if (!v)
		return null;

	var data = v.split(",");
	var x = parseFloat(data[0]);
	var y = parseFloat(data[1]);

	if (!isNaN(x) && !isNaN(y))
		return [x, y];

	return null;
}

module.exports = PositionItemModel;