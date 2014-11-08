var ClassUtils = require("../utils/ClassUtils");
var RootView = require("../views/RootView");
var View = require("../views/View");
var EditorControllerView = require("../views/EditorControllerView");
var TargetControllerView = require("../views/TargetControllerView");
var EditorController = require("../controllers/EditorController");
var TargetController = require("../controllers/TargetController");

function FiddleClient(domContainer, session, basePath) {
	RootView.call(this, domContainer);

	this.session = session;

	this.editorView = new EditorControllerView();
	this.addChild(this.editorView);
	this.editor = new EditorController(basePath, this.session, this.editorView);
	this.editor.on(EditorController.Refresh, this.onRefresh, this);

	this.targetView = new TargetControllerView();
	this.addChild(this.targetView);
	this.targetView.x = 500;
	this.target = new TargetController(this.targetView);

	window.addEventListener("resize", this.onResize.bind(this));
};
ClassUtils.extends(FiddleClient, RootView);

FiddleClient.prototype.init = function(resources) {
	//this.editor.init(editorContainer);
	console.log("FiddleClient.prototype.init graphics: ", resources);
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

	this.updateLayout(document.body.clientWidth, document.body.clientHeight);
};

FiddleClient.prototype.onRefresh = function() {
	this.target.reload();
};

FiddleClient.prototype.onResize = function() {
	console.log("FiddleClient.prototype.onResize");
	this.updateLayout(document.body.clientWidth, document.body.clientHeight);
};


FiddleClient.prototype.updateLayout = function(width, height) {
	this.editorView.x = 0;
	this.targetView.x = width*0.5;
	this.editorView.updateLayout(width*0.5, height);
	this.targetView.updateLayout(width*0.5, height);
};


module.exports = FiddleClient;