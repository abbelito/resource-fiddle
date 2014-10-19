var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function EditorView() {
	View.call(this, View.Div, "EditorView");

	this.hide();
};
ClassUtils.extends(EditorView, View);



module.exports = EditorView;
