var ClassUtils = require("../utils/ClassUtils");
var RootView = require("../views/RootView");
var View = require("../views/View");
var EditorControllerView = require("../views/EditorControllerView");
var TargetControllerView = require("../views/TargetControllerView");
var EditorController = require("../controllers/EditorController");
var TargetController = require("../controllers/TargetController");
var FiddleClientModel = require("../models/FiddleClientModel");
var FiddleClientView = require("../views/FiddleClientView");
var FiddleClientController = require("../controllers/FiddleClientController");
var xnode = require("xnode");

function FiddleClient(domContainer, session, basePath) {
	xnode.Div.call(this);

	this.fiddleClientModel = new FiddleClientModel();
	this.fiddleClientModel.setSession(session);

	this.fiddleClientView = new FiddleClientView();
	this.appendChild(this.fiddleClientView);

	this.fiddleClientController = new FiddleClientController(
		this.fiddleClientView,
		this.fiddleClientModel
	);

	/*this.session = session;

	this.editorView = new EditorControllerView();
	this.addChild(this.editorView);
	this.editor = new EditorController(basePath, this.session, this.editorView);
	this.editor.on(EditorController.Refresh, this.onRefresh, this);

	this.targetView = new TargetControllerView();
	this.addChild(this.targetView);
	this.targetView.x = 500;
	this.target = new TargetController(this.targetView);

	window.addEventListener("resize", this.onResize.bind(this));*/

	domContainer.appendChild(this);
};

ClassUtils.extends(FiddleClient, xnode.Div);

FiddleClient.prototype.init = function(resources) {
	//this.editor.init(editorContainer);
	this.resources = resources;

	//console.log("loading:" + resources.isLoading());

	if (resources.isLoading()) {
		resources.on(Resources.Loaded, this.doInit, this);
		resources.on(Resources.Error, this.onResourcesError, this);
	} else {
		this.doInit();
	}
};

FiddleClient.prototype.onResourcesError = function(message) {
	console.log("resource load error: " + message);
}

FiddleClient.prototype.addTestcase = function(id, name, url) {
	//this.target.addTestcase(id, name, url);
	this.fiddleClientModel.addTestcase(id, name, url)
};

FiddleClient.prototype.doInit = function() {
	/*this.target.init();
	this.editor.init(this.resources);

	this.updateLayout(document.body.clientWidth, document.body.clientHeight);*/

	this.fiddleClientModel.initWithResources(this.resources);
};

/*FiddleClient.prototype.onRefresh = function() {
	this.target.reload();
};

FiddleClient.prototype.onResize = function() {
	this.updateLayout(document.body.clientWidth, document.body.clientHeight);
};


FiddleClient.prototype.updateLayout = function(width, height) {
	this.editorView.x = 0;
	this.targetView.x = width * 0.5;
	this.editorView.updateLayout(width * 0.5, height);
	this.targetView.updateLayout(width * 0.5, height);
};*/


module.exports = FiddleClient;