var inherits = require("inherits");
var xnode = require("xnode");
var EventDispatcher = require("yaed");

/**
 * The value view for a string.
 * @class ResourceStringValueView
 */
function ResourceStringValueView() {
	xnode.Div.call(this);

	this.defaultValueView = new xnode.Div();
	this.defaultValueView.style.position = "absolute";
	this.defaultValueView.style.width = "50%";
	this.defaultValueView.style.top = "15px";

	this.appendChild(this.defaultValueView);

	this.valueDiv = new xnode.Div();
	this.valueDiv.style.position = "absolute";
	this.valueDiv.style.right = "10px";
	this.valueDiv.style.top = "10px";
	this.valueDiv.style.width = "50%";

	this.valueDiv.className = "ui input fluid mini";
	this.appendChild(this.valueDiv);

	this.valueInput = new xnode.Input();
	this.valueInput.type = "text";
	this.valueDiv.appendChild(this.valueInput);

	this.valueInput.addEventListener("change", this.onValueInputChange.bind(this));
}

inherits(ResourceStringValueView, xnode.Div);
EventDispatcher.init(ResourceStringValueView);

/**
 * Set position value for default.
 * @method setDefaultValue
 */
ResourceStringValueView.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValueView.innerHTML = defaultValue;
}

/**
 * Set position value for current.
 * @method setValue
 */
ResourceStringValueView.prototype.setValue = function(value) {
	this.valueInput.value = value;
}

/**
 * Set position value for current.
 * @method setValue
 */
ResourceStringValueView.prototype.onValueInputChange = function() {
	this.trigger("valueChange");
}

/**
 * Get value.
 * @method getValue
 */
ResourceStringValueView.prototype.getValue = function() {
	return this.valueInput.value;
}

module.exports = ResourceStringValueView;