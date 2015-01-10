/**
 * Control a resource item.
 * @class ResourceItemController
 */
function ResourceItemController(itemView) {
	this.itemView = itemView;

	this.itemView.on("change", this.onItemViewChange, this);
}

/**
 * Set item model to serve as data.
 * @method setData
 */
ResourceItemController.prototype.setData = function(itemModel) {
	this.itemModel = itemModel;

	if (this.itemModel) {
		this.itemView.setKey(this.itemModel.getKey());
		this.itemView.setDefaultValue(this.itemModel.getDefaultValue());
		this.itemView.setValue(this.itemModel.getValue());
		this.itemView.setItemType(this.itemModel.getItemType());
	}
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

module.exports = ResourceItemController;