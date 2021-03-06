var inherits = require("inherits");
var xnode = require("xnode");
var ResourcePositionValueView = require("./ResourcePositionValueView");
var ResourceImageValueView = require("./ResourceImageValueView");
var ResourceColorValueView = require("./ResourceColorValueView");
var ResourceStringValueView = require("./ResourceStringValueView");
var EventDispatcher = require("yaed");

/**
 * Show a table row for each resource item.
 * @class ResourceItemView
 */
function ResourceItemView() {
	xnode.Tr.call(this);

	this.style.height = "50px";

	this.keyTd = new xnode.Td();
	this.keyTd.style.width = "50%";
	this.appendChild(this.keyTd);

	this.valueTd = new xnode.Td();
	this.valueTd.style.position = "relative";
	this.valueTd.style.width = "50%";
	this.appendChild(this.valueTd);

	this.valueView = null;
	this.itemType = null;
	this.value = null;
	this.defaultValue = null;
}

inherits(ResourceItemView, xnode.Tr);
EventDispatcher.init(ResourceItemView);

/**
 * Set key. Will appear in the left column.
 */
ResourceItemView.prototype.setKey = function(value) {
	this.keyTd.innerHTML = value;
}

/**
 * Set abstract value to appear as default value.
 * @method setDefaultValue
 */
ResourceItemView.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;

	if (this.valueView)
		this.valueView.setDefaultValue(this.defaultValue);
}

/**
 * Set abstract value to appear in the value column.
 * @method setValue
 */
ResourceItemView.prototype.setValue = function(value) {
	this.value = value;

	if (this.valueView)
		this.valueView.setValue(this.value);
}

/**
 * Get current value.
 * @method setValue
 */
ResourceItemView.prototype.getValue = function(value) {
	return this.value;
}

/**
 * Set the type of the item. This will create a value
 * view and populate the right side of the table.
 * @method setItemType
 */
ResourceItemView.prototype.setItemType = function(itemType) {
	if (itemType == this.itemType)
		return;

	if (this.valueView) {
		this.valueTd.removeChild(this.valueView);
		this.valueView.off("valueChange", this.onValueViewChange, this);
		this.valueView.off("fileSelect", this.onValueViewChange, this);
	}

	this.valueView = null;
	this.itemType = itemType;

	switch (this.itemType) {
		case "position":
			this.valueView = new ResourcePositionValueView();
			break;

		case "image":
			this.valueView = new ResourceImageValueView();
			break;

		case "color":
			this.valueView = new ResourceColorValueView();
			break;

		case "string":
			this.valueView = new ResourceStringValueView();
			break;
	}

	if (this.valueView) {
		this.valueTd.appendChild(this.valueView);
		this.valueView.setDefaultValue(this.defaultValue);
		this.valueView.setValue(this.value);
		this.valueView.on("valueChange", this.onValueViewChange, this);
		this.valueView.on("fileSelect", this.onValueViewFileSelect, this);
	}
}

/**
 * Item change
 * @method onValueViewChange
 */
ResourceItemView.prototype.onValueViewChange = function() {
	this.value = this.valueView.getValue();
	this.trigger("change");
}

/**
 * Get selected file.
 * Only available for images.
 * @method getSelectedFile
 */
ResourceItemView.prototype.getSelectedFile = function() {
	if (this.itemType != "image" || !this.valueView)
		throw new Error("not available...");

	return this.valueView.getSelectedFile();
}

/**
 * File select.
 * @method onValueViewFileSelect
 */
ResourceItemView.prototype.onValueViewFileSelect = function() {
	this.trigger("fileSelect");
}

module.exports = ResourceItemView;