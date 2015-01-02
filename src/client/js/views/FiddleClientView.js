var xnode = require("xnode");
var inherits = require("inherits");
var TargetPaneView = require("./TargetPaneView");
var HeaderView = require("./HeaderView");

/**
 * Main client view.
 * @class FiddleClientView
 */
function FiddleClientView() {
	xnode.Div.call(this);

	this.innerHTML = "hello";

	this.targetPaneView = new TargetPaneView();
	this.appendChild(this.targetPaneView);

	this.headerView = new HeaderView();
	this.appendChild(this.headerView);
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

module.exports = FiddleClientView;