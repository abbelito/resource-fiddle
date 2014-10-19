var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function Text(text) {
	View.call(this, View.Span, "Text");

	this.getElement().innerHTML = text;
	this.getElement().style.textAlign = "center";
	
};
ClassUtils.extends(Text, View);


Text.prototype.updateLayout = function(width, height) {
	this.width = width;
	this.height = height;
};


module.exports = Text;
