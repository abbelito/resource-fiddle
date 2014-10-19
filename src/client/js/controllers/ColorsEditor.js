var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var Editor = require("./Editor");
var ColorItem = require("../views/ColorItem");

function ColorsEditor(view) {
	Editor.call(this, view);
};
ClassUtils.extends(ColorsEditor, Editor);
EventDispatcher.init(ColorsEditor);

ColorsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var colors = this.resources.getResourceObject().colors;

	var y = 0;
	for(var key in colors) {
		console.log("create ColorItem: ", key, colors[key]);
		var item = new ColorItem(key, colors[key]);
		console.log("after create");
		item.y = y;
		this.view.addChild(item);
		item.on(ColorItem.Changed, this.onChanged, this);
		y += item.height;
	}
};

ColorsEditor.prototype.onChanged = function(item) {
	this.resources.getResourceObject().colors[item.id] = item.getValue();
	this.save();
};

module.exports = ColorsEditor;