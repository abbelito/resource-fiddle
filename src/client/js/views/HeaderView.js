var inherits = require("inherits");
var xnode = require("xnode");

/**
 * Header view.
 * @class HeaderView
 */
function HeaderView() {
	xnode.Div.call(this);

	this.style.position = "absolute";
	this.style.top = "0";
	this.style.left = "0";
	this.style.right = "0";
	this.style.height = "50px";
	this.style.background = "#e8e8e8";
	this.style.borderBottom = "1px solid #e0e0e0"
	this.style.padding = "10px";

	this.header = new xnode.H1();
	this.header.className = "ui header";
	this.appendChild(this.header);

	this.header.innerHTML = "Resource Fiddle";
}

inherits(HeaderView, xnode.Div);

module.exports = HeaderView;