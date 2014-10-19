var RootView = require("../views/RootView");
var View = require("../views/View");
var EditorView = require("../views/EditorView");
var EditorController = require("../controllers/EditorController");
var TargetController = require("../controllers/TargetController");

function FiddleClient(domContainer) {

	this.root = new RootView(domContainer);

	this.editorView = new EditorView();
	this.root.addChild(this.editorView);
	this.editor = new EditorController(this.editorView);
	this.editor.on(EditorController.Refresh, this.onRefresh, this);

	this.targetView = new View();
	this.root.addChild(this.targetView);
	this.targetView.x = 500;
	this.target = new TargetController(this.targetView);
};

FiddleClient.prototype.constructor = FiddleClient;

FiddleClient.prototype.init = function(resources) {
	//this.editor.init(editorContainer);
	this.resources = resources;

	if(resources.isLoading()) {
		console.log("resources is loading");
		resources.on(Resources.Loaded, this.doInit, this);
	}
	else {
		this.doInit();
	}
};

FiddleClient.prototype.addTestcase = function(id, name, url) {
	this.target.addTestcase(id, name, url);
};

FiddleClient.prototype.doInit = function() {
	console.log("FiddleClient.prototype.doInit graphics: ", this.resources.getResourceObject().graphics);
	this.target.init();
	this.editor.init(this.resources);

};

FiddleClient.prototype.onRefresh = function() {
	this.target.reload();
};


module.exports = FiddleClient;