var ResourceItemModel = require("./ResourceItemModel");
var inherits = require("inherits");
var ColorUtil = require("../utils/ColorUtil");

/**
 * ColorItemModel
 * @class ColorItemModel
 */
function ColorItemModel(key, defaultValue, value) {
	ResourceItemModel.call(this, key);

	this.setDefaultValue(null);
	this.setValue(null);
}

inherits(ColorItemModel, ResourceItemModel);

/**
 * Get default value.
 * @method getDefaultValue
 */
ColorItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Set default value.
 * @method getDefaultValue
 */
ColorItemModel.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = ColorItemModel.processValue(defaultValue);
}

/**
 * Get customized value.
 * @method getValue
 */
ColorItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
ColorItemModel.prototype.setValue = function(value) {
	this.value = ColorItemModel.processValue(value);
	this.notifyChange();
}

/**
 * Get item type.
 * @method getItemType
 */
ColorItemModel.prototype.getItemType = function() {
	return "color"
}

/**
 * @static
 * @private
 */
ColorItemModel.processValue = function(v) {
	if (!v)
		return null;

	if (typeof v == "number")
		return ColorUtil.hexToHTML(v);

	return v;
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
ColorItemModel.prototype.prepareSaveData = function(jsonData) {
	var saveData=0;

	if (this.value && this.value[0]=="#")
		saveData=ColorUtil.htmlToHex(this.value)

	else if (this.defaultValue && this.defaultValue[0]=="#")
		saveData=ColorUtil.htmlToHex(this.defaultValue)

	jsonData.colors[this.key]=saveData;
}

module.exports = ColorItemModel;