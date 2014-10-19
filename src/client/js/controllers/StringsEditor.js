var ClassUtils = require("../utils/ClassUtils");
var Editor = require("./Editor");
var StringItem = require("../views/StringItem");

function StringsEditor(view) {
	Editor.call(this, view);
};
ClassUtils.extends(StringsEditor, Editor);

StringsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var strings = this.resources.getResourceObject().strings;

	var y = 0;
	for(var key in strings) {
		var item = new StringItem(key, strings[key]);
		item.y = y;
		this.view.addChild(item);
		item.on(StringItem.Changed, this.onChanged, this);
		y += imageItem.height;
	}
};

StringsEditor.prototype.onChanged = function(item) {
	this.resources.strings[item.id] = item.getValue();
};

module.exports = StringsEditor;