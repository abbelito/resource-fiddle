var xnode = require("xnode");
var xnodec = require("xnodecollection");
var inherits = require("inherits");
var ResourceCategoryView = require("./ResourceCategoryView");

/**
 * The view for the content that goes into one tab.
 * @class ResourceTabView
 */
function ResourceTabView() {
	xnode.Div.call(this);
	this.className = "ui bottom attached active tab segment";

	this.inner = new xnode.Div();
	this.inner.style.position = "relative";
	this.inner.style.height = "calc(100% - 65px)";
	this.inner.style.padding = "1px";
	this.inner.style.overflowY = "scroll";
	this.appendChild(this.inner);

	this.descriptionP = new xnode.P();
	this.inner.appendChild(this.descriptionP);

	this.itemTable = new xnode.Table();
	this.itemTable.className = "ui table unstackable definition";
	this.inner.appendChild(this.itemTable);

	this.itemTableBody = new xnode.Tbody();
	this.itemTable.appendChild(this.itemTableBody);

	this.accordion = new xnode.Div();
	this.accordion.className = "ui styled fluid accordion";
	this.inner.appendChild(this.accordion);
}

inherits(ResourceTabView, xnode.Div);

/**
 * Should this be the active tab?
 * @method setActive
 */
ResourceTabView.prototype.setActive = function(active) {
	if (active) {
		this.style.display = "block";
		this.className = "ui bottom attached active tab segment active";
	} else {
		this.style.display = "none";
		this.className = "ui bottom attached active tab segment";
	}
}

/**
 * Set description.
 * @method setDescription
 */
ResourceTabView.prototype.setDescription = function(description) {
	if (!description)
		description = null;

	this.descriptionP.innerHTML = description;
}

/**
 * Get div holding the categories.
 * @method getCategoryHolder
 */
ResourceTabView.prototype.getCategoryHolder = function() {
	return this.accordion;
}

/**
 * Get holder for the items.
 * @method getItemHolder
 */
ResourceTabView.prototype.getItemHolder = function() {
	return this.itemTableBody;
}

/**
 * Set visibility of the category holder.
 * @method getCategoryHolder
 */
ResourceTabView.prototype.setCategoryHolderVisible = function(value) {
	if (value)
		this.accordion.style.display = "block";

	else
		this.accordion.style.display = "none";
}

/**
 * Set visibility of the item holder.
 * @method getItemHolder
 */
ResourceTabView.prototype.setItemHolderVisible = function(value) {
	if (value)
		this.itemTable.style.display = "block";

	else
		this.itemTable.style.display = "none";
}

module.exports = ResourceTabView;