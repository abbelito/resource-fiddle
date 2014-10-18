var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function EditorView() {
	View.call(this, View.Div, "EditorView");
};
ClassUtils.extends(EditorView, View);



module.exports = EditorView;
