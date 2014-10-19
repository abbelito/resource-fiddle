var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var Editor = require("./Editor");
var PositionItem = require("../views/PositionItem");

function PositionsEditor(view) {
	Editor.call(this, view);
};
ClassUtils.extends(PositionsEditor, Editor);
EventDispatcher.init(PositionsEditor);

PositionsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var positions = this.resources.getResourceObject().positions;

	console.log("positions: ", positions);

	var y = 0;
	for(var key in positions) {
		console.log("create PositionItem: ", key, positions[key]);
		var item = new PositionItem(key, positions[key]);
		item.y = y;
		this.view.addChild(item);
		item.on(PositionItem.Changed, this.onChanged, this);
		y += item.height;
	}
};

PositionsEditor.prototype.onChanged = function(item) {
	this.resources.getResourceObject().positions[item.id][0] = item.getValues()[0]
	this.resources.getResourceObject().positions[item.id][1] = item.getValues()[1];
	this.save();
};

module.exports = PositionsEditor;