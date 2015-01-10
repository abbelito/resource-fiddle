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

	this.fiddleClientModel.trigger("activeTestcaseChange");
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

/**
 * Get url.
 * @method getUrl
 */
Testcase.prototype.getUrl = function() {
	return this.url;
}

/**
 * Get url with cache prevention
 * @method getCachePreventionUrl
 */
Testcase.prototype.getCachePreventionUrl = function() {
	var timestamp = new Date().getTime();

	if (this.url.indexOf("?") >= 0)
		return this.url + "&__prevent_cache=" + timestamp;

	else
		return this.url + "?__prevent_cache=" + timestamp;
}

module.exports = Testcase;