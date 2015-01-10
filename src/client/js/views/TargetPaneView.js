var inherits = require("inherits");
var xnode = require("xnode");
var xnodec = require("xnodecollection");

/**
 * Target pane.
 * @class TargetPaneView
 */
function TargetPaneView() {
	xnode.Div.call(this);

	this.style.position = "absolute";
	this.style.top = "60px";
	this.style.right = "10px";
	this.style.width = "calc(50% - 15px)";
	this.style.bottom = "10px";

	this.tabHeaders = new xnode.Div();
	this.tabHeaders.className = "ui top attached tabular menu";
	this.appendChild(this.tabHeaders);

	this.inner = new xnode.Div();
	this.inner.className = "ui bottom attached active tab segment";
	this.inner.style.position = "relative";
	this.inner.style.height = "calc(100% - 35px)";
	this.inner.style.padding = "1px";
	this.inner.style.overflowY = "scroll";
	this.appendChild(this.inner);

	this.iframe = new xnode.Iframe();
	this.iframe.style.position = "absolute";
	this.iframe.style.top = "5px";
	this.iframe.style.left = "5px";
	this.iframe.style.width = "calc(100% - 10px)";
	this.iframe.style.height = "calc(100% - 10px)";
	this.iframe.style.border = "1px solid #808080"
	this.inner.appendChild(this.iframe);
}

inherits(TargetPaneView, xnode.Div);

/**
 * Get holder for the tab headers.
 * @method getTabHeaderHolder
 */
TargetPaneView.prototype.getTabHeaderHolder = function() {
	return this.tabHeaders;
}

/**
 *
 */
TargetPaneView.prototype.setUrl = function(url) {
	this.iframe.src = url;
}

module.exports = TargetPaneView;