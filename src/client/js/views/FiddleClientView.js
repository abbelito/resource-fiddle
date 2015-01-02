var xnode = require("xnode");
var inherits = require("inherits");
var TargetPaneView = require("./TargetPaneView");
var HeaderView = require("./HeaderView");
var ResourcePaneView = require("./ResourcePaneView");

/**
 * Main client view.
 * @class FiddleClientView
 */
function FiddleClientView() {
	xnode.Div.call(this);

	this.targetPaneView = new TargetPaneView();
	this.appendChild(this.targetPaneView);

	this.headerView = new HeaderView();
	this.appendChild(this.headerView);

	this.resourcePaneView = new ResourcePaneView();
	this.appendChild(this.resourcePaneView);
}

inherits(FiddleClientView, xnode.Div);

/**
 * Get target pane view.
 * @method getTargetPaneView
 */
FiddleClientView.prototype.getTargetPaneView = function() {
	return this.targetPaneView;
}

/**
 * Get header view.
 * @method getHeaderView
 */
FiddleClientView.prototype.getHeaderView = function() {
	return this.haderView;
}

/**
 * Get resource pane view.
 * @method getResourcePaneView
 */
FiddleClientView.prototype.getResourcePaneView = function() {
	return this.resourcePaneView;
}

module.exports = FiddleClientView;