var xnode = require("xnode");
var inherits = require("inherits");

/**
 * The tab header.
 * @class TargetTabHeaderView
 */
function TargetTabHeaderView() {
	xnode.A.call(this);
	this.className = "item";
}

inherits(TargetTabHeaderView, xnode.A);

/**
 * Set label.
 * @class setLabel
 */
TargetTabHeaderView.prototype.setLabel = function(label) {
	this.innerHTML = label;
}

/**
 * Set active state.
 * @class setActive
 */
TargetTabHeaderView.prototype.setActive = function(active) {
	if (active)
		this.className = "active item";

	else
		this.className = "item";
}

module.exports = TargetTabHeaderView;