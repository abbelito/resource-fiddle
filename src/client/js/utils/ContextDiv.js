var xnode = require("xnode");
var inherits = require("inherits");

/**
 * Removes itself on click outside.
 * @class ContextDiv
 */
function ContextDiv() {
	xnode.Div.call(this);
}

inherits(ContextDiv, xnode.Div);

/**
 * Show.
 */
ContextDiv.prototype.show = function() {
	this.bodyMouseDownListener = this.onBodyMouseDown.bind(this);
	this.mouseDownListener = this.onMouseDown.bind(this);
	this.clickListener = this.onClick.bind(this);

	this.addEventListener("mousedown", this.mouseDownListener);
	this.addEventListener("click", this.clickListener);
	document.body.addEventListener("mousedown", this.bodyMouseDownListener);

	document.body.appendChild(this);
}

/**
 * Hide.
 */
ContextDiv.prototype.hide = function() {
	this.removeEventListener("mousedown", this.mouseDownListener);
	this.removeEventListener("click", this.clickListener);
	document.body.removeEventListener("mousedown", this.bodyMouseDownListener);

	document.body.removeChild(this);
}

/**
 * Mouse down outside, hide.
 */
ContextDiv.prototype.onBodyMouseDown = function() {
	this.hide();
}

/**
 * Mouse down inside, don't do anything.
 */
ContextDiv.prototype.onMouseDown = function(ev) {
	ev.stopPropagation();
}

/**
 * Click. Hide.
 */
ContextDiv.prototype.onClick = function() {
	this.hide();
}


module.exports = ContextDiv;