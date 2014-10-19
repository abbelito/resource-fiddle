var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function Text(text) {
	View.call(this, View.Span, "Text");

	this.getElement().innerHTML = text;
	this.getElement().style.textAlign = "center";
	
};
ClassUtils.extends(Text, View);

module.exports = Text;
