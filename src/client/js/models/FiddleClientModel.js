var xnode = require("xnode");
var xnodec = require("xnodecollection");
var Testcase = require("./Testcase");
var CategoryModel = require("./CategoryModel");
var ImageItemModel = require("./ImageItemModel");
var ResourceItemModel = require("./ResourceItemModel");
var ColorItemModel = require("./ColorItemModel");

/**
 * Main model for the app.
 * @class FiddleClientModel
 */
function FiddleClientModel() {
	this.session = null;
	this.testcaseCollection = new xnodec.Collection();
	this.categoryCollection = new xnodec.Collection();
}

/**
 * Set session.
 * @method setSession
 */
FiddleClientModel.prototype.setSession = function(session) {
	this.session = session;
}

/**
 * Init from a resources object.
 * @method initWithResources
 */
FiddleClientModel.prototype.initWithResources = function(resources) {
	this.graphicsCategory = this.createCategory("Graphics");
	this.positionsCategory = this.createCategory("Positions");
	this.colorsCategory = this.createCategory("Colors");

	var resourceObject = resources.getResourceObject();

	for (var key in resourceObject.graphics) {
		if (key != "textures") {
			var imageItem = new ImageItemModel(key);
			this.graphicsCategory.addResourceItemModel(imageItem);
		}
	}

	for (var key in resourceObject.positions) {
		var item = resourceObject.positions[key];
		var positionItem = new ResourceItemModel("position", key);

		if (item)
			positionItem.setDefaultValue(item[0] + ", " + item[1]);

		this.positionsCategory.addResourceItemModel(positionItem);
	}

	for (var key in resourceObject.colors) {
		var item = resourceObject.colors[key];
		var colorItem = new ColorItemModel(key);

		if (item)
			colorItem.setDefaultValue(item);

		this.colorsCategory.addResourceItemModel(colorItem);
	}
}

/**
 * Add testcase.
 * @method addTestcase
 */
FiddleClientModel.prototype.addTestcase = function(id, name, url) {
	var testcase = new Testcase(id, name, url);
	testcase.setFiddleClientModel(this);
	this.testcaseCollection.addItem(testcase);

	if (this.testcaseCollection.getLength() == 1)
		testcase.setActive(true);
}

/**
 * Get testcase collection
 * @method getTestcaseCollection
 */
FiddleClientModel.prototype.getTestcaseCollection = function() {
	return this.testcaseCollection;
}

/**
 * Get category collection.
 * @method getCategoryCollection
 */
FiddleClientModel.prototype.getCategoryCollection = function() {
	return this.categoryCollection;
}

/**
 * Add category model.
 * @method addCategoryModel
 */
FiddleClientModel.prototype.addCategoryModel = function(categoryModel) {
	categoryModel.setParentModel(this);
	this.categoryCollection.addItem(categoryModel);

	if (this.categoryCollection.getLength() == 1)
		categoryModel.setActive(true);

	return categoryModel;
}

/**
 * Create and add a category model.
 * @method createCategory
 */
FiddleClientModel.prototype.createCategory = function(title) {
	var categoryModel = new CategoryModel(title);

	return this.addCategoryModel(categoryModel);
}

module.exports = FiddleClientModel;