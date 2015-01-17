var ResourceCategoryController = require("./ResourceCategoryController");
var ResourceCategoryView = require("../views/ResourceCategoryView");
var ResourceItemController = require("./ResourceItemController");
var ResourceItemView = require("../views/ResourceItemView");
var xnodec = require("xnodecollection");

/**
 * Control one resource tab.
 * @method ResourceTabController
 */
function ResourceTabController(tabView) {
	this.tabView = tabView;

	this.categoryManager = new xnodec.CollectionViewManager();
	this.categoryManager.setTarget(this.tabView.getCategoryHolder());
	this.categoryManager.setItemRendererClass(ResourceCategoryView);
	this.categoryManager.setItemControllerClass(ResourceCategoryController);
	this.categoryManager.on("postUpdate", this.updateVisibilities, this);

	this.itemManager = new xnodec.CollectionViewManager();
	this.itemManager.setTarget(this.tabView.getItemHolder());
	this.itemManager.setItemRendererClass(ResourceItemView);
	this.itemManager.setItemControllerClass(ResourceItemController);
	this.itemManager.on("postUpdate", this.updateVisibilities, this);

	this.updateVisibilities();
}

/**
 * Set data.
 * @method setData
 */
ResourceTabController.prototype.setData = function(categoryModel) {
	if (this.categoryModel) {
		this.categoryModel.off("change", this.onCategoryModelChange, this);
		this.categoryManager.setDataSource(null);
		this.itemManager.setDataSource(null);
	}

	this.categoryModel = categoryModel;

	if (this.categoryModel) {
		this.categoryModel.on("change", this.onCategoryModelChange, this);
		this.tabView.setActive(categoryModel.isActive());
		this.tabView.setDescription(categoryModel.getDescription());

		this.categoryManager.setDataSource(categoryModel.getCategoryCollection());
		this.itemManager.setDataSource(categoryModel.getItemCollection());
		this.updateVisibilities();
	}
}

/**
 * Handle change in the model.
 * @method onCategoryModelChange
 */
ResourceTabController.prototype.onCategoryModelChange = function() {
	this.tabView.setActive(this.categoryModel.isActive());
	this.tabView.setDescription(this.categoryModel.getDescription());
}

/**
 * Update visibilities of the category and item holders.
 * The should not be visible if they are empty.
 */
ResourceTabController.prototype.updateVisibilities = function() {
	if (!this.categoryModel)
		return;

	this.tabView.setCategoryHolderVisible(this.categoryModel.getCategoryCollection().getLength() > 0);
	this.tabView.setItemHolderVisible(this.categoryModel.getItemCollection().getLength() > 0);
}

module.exports = ResourceTabController;