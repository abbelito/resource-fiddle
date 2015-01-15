var FiddleClientModel = require("../models/FiddleClientModel");
var FiddleClientView = require("../views/FiddleClientView");
var FiddleClientController = require("../controllers/FiddleClientController");
var xnode = require("xnode");
var inherits = require("inherits");

function FiddleClient(domContainer, session, basePath) {
	xnode.Div.call(this);

	this.fiddleClientModel = new FiddleClientModel();
	this.fiddleClientModel.setSession(session);

	this.fiddleClientView = new FiddleClientView();
	this.appendChild(this.fiddleClientView);

	domContainer.appendChild(this);
};

inherits(FiddleClient, xnode.Div);

FiddleClient.prototype.init = function(initData, resources) {
	this.fiddleClientModel.initDefinition(initData);
	this.resources = resources;

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
	this.fiddleClientModel.addTestcase(id, name, url)
};

FiddleClient.prototype.doInit = function() {
	this.fiddleClientModel.initResources(this.resources);

	this.fiddleClientController = new FiddleClientController(
		this.fiddleClientView,
		this.fiddleClientModel
	);
};

module.exports = FiddleClient;