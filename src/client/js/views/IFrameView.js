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
	//this.url = targetURL;

	//this.getElement().setAttribute("src", this.url);
};

IFrameView.prototype.setUrl = function(targetURL) {
	this.url = targetURL;
	this.reload();
	// body...
};


IFrameView.prototype.reload = function() {
	this.getElement().setAttribute("src", this.url + "&____timestamp="+Date.now());
	/*
	console.log("IFrame.prototype.reload");
	var u = this.url + "?resources="+this.resourceURL+"&____timestamp="+Date.now();
	this.htmlElement.setAttribute("src", u);
	//this.htmlElement.contentWindow.location.reload();
	*/
};

module.exports = IFrameView;