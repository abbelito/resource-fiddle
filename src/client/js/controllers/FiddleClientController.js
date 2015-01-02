var inherits = require("inherits");
var xnodec = require("xnodecollection");
var TargetTabHeaderController = require("./TargetTabHeaderController");
var TargetTabHeaderView = require("../views/TargetTabHeaderView");
var ResourceTabHeaderController = require("./ResourceTabHeaderController");
var ResourceTabHeaderView = require("../views/ResourceTabHeaderView");

function FiddleClientController(fiddleClientView, fiddleClientModel) {
	this.fiddleClientView = fiddleClientView;
	this.fiddleClientModel = fiddleClientModel;

	this.targetTabsHeaderManager = new xnodec.CollectionViewManager();
	this.targetTabsHeaderManager.setItemRendererClass(TargetTabHeaderView);
	this.targetTabsHeaderManager.setItemControllerClass(TargetTabHeaderController);
	this.targetTabsHeaderManager.setTarget(this.fiddleClientView.getTargetPaneView().getTabHeaderHolder());
	this.targetTabsHeaderManager.setDataSource(this.fiddleClientModel.getTestcaseCollection());

	this.resourceTabsHeaderManager=new xnodec.CollectionViewManager();
	this.resourceTabsHeaderManager.setItemRendererClass(ResourceTabHeaderView);
	this.resourceTabsHeaderManager.setItemControllerClass(ResourceTabHeaderController);
	this.resourceTabsHeaderManager.setTarget(this.fiddleClientView.getResourcePaneView().getTabHeaderHolder());
	this.resourceTabsHeaderManager.setDataSource(this.fiddleClientModel.getCategoryCollection());
}

module.exports = FiddleClientController;