var EventDispatcher = require("yaed");
var inherits = require("inherits");

/**
 * Testcase.
 * @class Testcase
 */
function Testcase(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;

	this.active = false;
	this.fiddleClientModel = null;
};

inherits(Testcase, EventDispatcher);

/**
 * Set reference to app.
 * @method setFiddleClientModel
 */
Testcase.prototype.setFiddleClientModel = function(value) {
	this.fiddleClientModel = value;
}

/**
 * Set active state.
 * @method setActive
 */
Testcase.prototype.setActive = function(value) {
	if (value == this.active)
		return;

	var siblings = this.fiddleClientModel.getTestcaseCollection();

	for (var i = 0; i < siblings.getLength(); i++)
		if (siblings.getItemAt(i) != this)
			siblings.getItemAt(i).setActive(false);

	this.active = value;
	this.trigger("change");
}

/**
 * Is this category the active one?
 * @method isActive
 */
Testcase.prototype.isActive = function() {
	return this.active;
}

/**
 * Get label.
 * @method getLabel
 */
Testcase.prototype.getLabel = function() {
	return this.name;
}

module.exports = Testcase;