var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function IFrameView() {
	View.call(this, View.IFrame, "IFrameView");

	this.getElement().style.width = "100%";
	this.getElement().style.height = "100%";
	this.url = "";
};
ClassUtils.extends(IFrameView, View);

IFrameView.prototype.init = function() {
};

IFrameView.prototype.setUrl = function(targetURL) {
	this.url = targetURL;
	this.reload();
};


IFrameView.prototype.reload = function() {
	this.getElement().setAttribute("src", this.url + "&____timestamp="+Date.now());
};

IFrameView.prototype.updateLayout = function(width, height) {
	
	this.width = width;
	this.height = height;
};

module.exports = IFrameView;