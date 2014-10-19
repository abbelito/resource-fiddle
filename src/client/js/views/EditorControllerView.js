var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function EditorControllerView() {
	View.call(this, View.Div, "EditorControllerView");

	this.menuView = null;
	this.editors = new Array();
};
ClassUtils.extends(EditorControllerView, View);

EditorControllerView.prototype.setMenuView = function(menuView) {
	this.menuView = menuView;
	this.addChild(this.menuView);
};

EditorControllerView.prototype.addEditor = function(editor) {
	this.editors.push(editor);
	this.addChild(editor);
};

EditorControllerView.prototype.updateLayout = function(width, height) {

	this.menuView.updateLayout(width, this.menuView.height);

	for(var i = 0; i < this.editors.length; i++) {
		this.editors[i].x = 0;
		this.editors[i].y = this.menuView.height;
		this.editors[i].updateLayout(width, height - this.menuView.height);
	}
	this.width = width;
	this.height = height;
};

module.exports = EditorControllerView;
