var Resources = require("../../../lib/Resources");
var EventDispatcher = require("../utils/EventDispatcher");
var APIConnection = require("../utils/APIConnection");

function Editor(view) {
	this.view = view;
	this.items = new Array();
	this.container = null;
};
Editor.prototype.constructor = Editor;
EventDispatcher.init(Editor);

Editor.Saved = "Saved";

Editor.prototype.init = function() {
	
};

Editor.prototype.save = function() {
	try {
		var connection = new APIConnection();
		connection.on("loaded", this.onSaved, this);
		connection.load("save", {session:"bajs", json: JSON.stringify(Resources.getInstance().getResourceObject())});
	}
	catch(error) {
		console.log("Failed to save: ", error);
	}
};

Editor.prototype.onSaved = function(data) {
	var connection = data.connection;
	var json = data.json;
	connection.off("loaded", this.onSaved, this);
	this.trigger(Editor.Saved);
};

module.exports = Editor;