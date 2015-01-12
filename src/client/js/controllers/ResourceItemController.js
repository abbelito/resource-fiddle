var ResourceItemModel = require("../models/ResourceItemModel");

/**
 * Control a resource item.
 * @class ResourceItemController
 */
function ResourceItemController(itemView) {
	this.itemView = itemView;

	this.itemView.on("change", this.onItemViewChange, this);
	this.itemView.on("fileSelect", this.onItemViewFileSelect, this);
}

/**
 * Set item model to serve as data.
 * @method setData
 */
ResourceItemController.prototype.setData = function(itemModel) {
	if (this.itemModel) {
		this.itemModel.off(ResourceItemModel.ITEM_CHANGE, this.onItemModelChange, this);
	}

	this.itemModel = itemModel;

	if (this.itemModel) {
		this.itemView.setKey(this.itemModel.getKey());
		this.itemView.setDefaultValue(this.itemModel.getDefaultValue());
		this.itemView.setValue(this.itemModel.getValue());
		this.itemView.setItemType(this.itemModel.getItemType());

		this.itemModel.on(ResourceItemModel.ITEM_CHANGE, this.onItemModelChange, this);
	}
}

/**
 * The model changed, update view.
 * @method onItemModelChange
 */
ResourceItemController.prototype.onItemModelChange = function() {
	this.itemView.setValue(this.itemModel.getValue());
}

/**
 * Item view change.
 * @method onItemViewChange
 */
ResourceItemController.prototype.onItemViewChange = function() {
	if (!this.itemModel)
		return;

	this.itemModel.setValue(this.itemView.getValue());
}

/**
 * File selected.
 * @method onItemViewFileSelect
 */
ResourceItemController.prototype.onItemViewFileSelect = function() {
	this.itemModel.uploadFile(this.itemView.getSelectedFile());
}

module.exports = ResourceItemController;