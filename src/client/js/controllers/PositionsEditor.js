var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var Editor = require("./Editor");
var PositionItem = require("../views/PositionItem");

function PositionsEditor(session, view) {
	Editor.call(this, session, view);
};
ClassUtils.extends(PositionsEditor, Editor);
EventDispatcher.init(PositionsEditor);

PositionsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var positions = this.resources.getResourceObject().positions;

	console.log("positions: ", positions);

	for(var key in positions) {
		console.log("create PositionItem: ", key, positions[key]);
		var item = new PositionItem(key, positions[key]);
		this.view.addItem(item);
		item.on(PositionItem.Changed, this.onChanged, this);
	}
};

PositionsEditor.prototype.onChanged = function(item) {
	this.resources.getResourceObject().positions[item.id][0] = item.getValues()[0]
	this.resources.getResourceObject().positions[item.id][1] = item.getValues()[1];
	this.save();
};

module.exports = PositionsEditor;