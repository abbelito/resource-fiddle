var inherits = require("inherits");
var xnodec = require("xnodecollection");
var TargetTabHeaderController = require("./TargetTabHeaderController");
var TargetTabHeaderView = require("../views/TargetTabHeaderView");
var ResourceTabHeaderController = require("./ResourceTabHeaderController");
var ResourceTabHeaderView = require("../views/ResourceTabHeaderView");
var ResourceTabView = require("../views/ResourceTabView");
var ResourceTabController = require("../controllers/ResourceTabController");
var FiddleClientModel = require("../models/FiddleClientModel");

/**
 * FiddleClientController
 * @class FiddleClientController
 */
function FiddleClientController(fiddleClientView, fiddleClientModel) {
	this.fiddleClientView = fiddleClientView;
	this.fiddleClientModel = fiddleClientModel;

	this.targetTabsHeaderManager = new xnodec.CollectionViewManager();
	this.targetTabsHeaderManager.setItemRendererClass(TargetTabHeaderView);
	this.targetTabsHeaderManager.setItemControllerClass(TargetTabHeaderController);
	this.targetTabsHeaderManager.setTarget(this.fiddleClientView.getTargetPaneView().getTabHeaderHolder());
	this.targetTabsHeaderManager.setDataSource(this.fiddleClientModel.getTestcaseCollection());

	this.resourceTabsHeaderManager = new xnodec.CollectionViewManager();
	this.resourceTabsHeaderManager.setItemRendererClass(ResourceTabHeaderView);
	this.resourceTabsHeaderManager.setItemControllerClass(ResourceTabHeaderController);
	this.resourceTabsHeaderManager.setTarget(this.fiddleClientView.getResourcePaneView().getTabHeaderHolder());
	this.resourceTabsHeaderManager.setDataSource(this.fiddleClientModel.getCategoryCollection());

	this.resourceTabsManager = new xnodec.CollectionViewManager();
	this.resourceTabsManager.setItemRendererClass(ResourceTabView);
	this.resourceTabsManager.setItemControllerClass(ResourceTabController);
	this.resourceTabsManager.setTarget(this.fiddleClientView.getResourcePaneView().getTabHolder());
	this.resourceTabsManager.setDataSource(this.fiddleClientModel.getCategoryCollection());

	this.updateCurrentTestcase();

	this.fiddleClientModel.on(FiddleClientModel.ACTIVE_TESTCASE_CHANGE, this.updateCurrentTestcase, this);
	this.fiddleClientModel.on(FiddleClientModel.ITEM_CHANGE, this.onModelItemChange, this);
	this.fiddleClientModel.on(FiddleClientModel.SAVE_COMPLETE, this.onModelSaveComplete, this);
}

/**
 * Update current test case.
 * @method updateCurrentTestcase
 */
FiddleClientController.prototype.updateCurrentTestcase = function() {
	var activeTestcase = this.fiddleClientModel.getActiveTestcase();

	if (!activeTestcase)
		return null;

	this.fiddleClientView.getTargetPaneView().setUrl(activeTestcase.getCachePreventionUrl());
}

/**
 * The model was saved, refresh target.
 * @method onModelSaveComplete
 */
FiddleClientController.prototype.onModelSaveComplete = function() {
	this.updateCurrentTestcase();
}

/**
 * Model item change.
 * @method onModelItemChange
 */
FiddleClientController.prototype.onModelItemChange = function() {
	this.fiddleClientModel.save();
}

module.exports = FiddleClientController;