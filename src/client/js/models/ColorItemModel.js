var ColorUtil = require("../utils/ColorUtil");

/**
 * ColorItemModel
 * @class ColorItemModel
 */
function ColorItemModel(key, defaultValue, value) {
	this.key = key;

	this.setDefaultValue(defaultValue);
	this.setValue(value);
}

/**
 * Get key.
 * @method getKey
 */
ColorItemModel.prototype.getKey = function() {
	return this.key;
}

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

module.exports = ColorItemModel;