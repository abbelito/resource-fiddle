var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function RootView(domContainer) {
	View.call(this, View.div, "RootView");

	this.isRoot = true;
	
	domContainer.appendChild(this.getElement());
};
ClassUtils.extends(RootView, View);


module.exports = RootView;
