var inherits = require("inherits");
var xnode = require("xnode");
var xnodec = require("xnodecollection");

/**
 * The left part of the app, showing the resources.
 * @class ResourcePaneView
 */
function ResourcePaneView() {
	xnode.Div.call(this);

	this.style.position = "absolute";
	this.style.top = "60px";
	this.style.left = "10px";
	this.style.width = "calc(50% - 15px)";
	this.style.bottom = "10px";

	this.tabHeaders = new xnode.Div();
	this.tabHeaders.className = "ui top attached tabular menu";
	this.appendChild(this.tabHeaders);
}

inherits(ResourcePaneView, xnode.Div);

/**
 * Get holder for the tab headers.
 * @method getTabHeaderHolder
 */
ResourcePaneView.prototype.getTabHeaderHolder = function() {
	return this.tabHeaders;
}

/**
 * Get tab holder.
 * @method getTabHolder
 */
ResourcePaneView.prototype.getTabHolder = function() {
	return this;
}

module.exports = ResourcePaneView;