var ClassUtils = require("../utils/ClassUtils");
var Editor = require("./Editor");

function PositionsEditor(view) {
	Editor.call(this, view);
};
ClassUtils.extends(PositionsEditor, Editor);



module.exports = PositionsEditor;