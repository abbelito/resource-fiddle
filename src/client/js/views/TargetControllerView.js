var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function TargetControllerView() {
	View.call(this, View.Div, "TargetControllerView");

	this.menuView = null;
	this.targetView = null;
};
ClassUtils.extends(TargetControllerView, View);

TargetControllerView.prototype.setMenuView = function(menuView) {
	this.menuView = menuView;
	this.addChild(this.menuView);
};

TargetControllerView.prototype.setTargetView = function(targetView) {
	this.targetView = targetView;
	this.addChild(targetView);
};

TargetControllerView.prototype.updateLayout = function(width, height) {

	this.menuView.updateLayout(width, this.menuView.height);

	this.targetView.x = 0;
	this.targetView.y = this.menuView.height;
	this.targetView.updateLayout(width, height - this.menuView.height);
};

module.exports = TargetControllerView;
