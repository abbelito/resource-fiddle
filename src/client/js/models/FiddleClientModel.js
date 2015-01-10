var xnode = require("xnode");
var xnodec = require("xnodecollection");
var Testcase = require("./Testcase");
var CategoryModel = require("./CategoryModel");
var ImageItemModel = require("./ImageItemModel");
var ResourceItemModel = require("./ResourceItemModel");
var PositionItemModel = require("./PositionItemModel");
var ColorItemModel = require("./ColorItemModel");
var EventDispatcher = require("yaed");
var inherits = require("inherits");

/**
 * Main model for the app.
 * @class FiddleClientModel
 */
function FiddleClientModel() {
	this.session = null;
	this.testcaseCollection = new xnodec.Collection();
	this.categoryCollection = new xnodec.Collection();
}

inherits(FiddleClientModel, EventDispatcher);

FiddleClientModel.ACTIVE_TESTCASE_CHANGE = "activeTestcaseChange";
FiddleClientModel.ITEM_CHANGE = "itemChange";

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
		var positionItem = new PositionItemModel(key);

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
 * Get active test case.
 * @method getActiveTestCase
 */
FiddleClientModel.prototype.getActiveTestcase = function() {
	//console.log("testcase collection length: " + this.testcaseCollection.getLength());

	for (var i = 0; i < this.testcaseCollection.getLength(); i++)
		if (this.testcaseCollection.getItemAt(i).isActive())
			return this.testcaseCollection.getItemAt(i);

	return null;
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

	categoryModel.on(CategoryModel.ITEM_CHANGE, this.onItemChange, this);

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

/**
 * Get all items in all categories.
 * @method getAllItems
 */
FiddleClientModel.prototype.getAllItems = function() {
	var a = [];

	for (var i = 0; i < this.categoryCollection.getLength(); i++)
		a = a.concat(this.categoryCollection.getItemAt(i).getAllItems());

	return a;
}

/**
 * Save to server.
 * @method save
 */
FiddleClientModel.prototype.save = function() {
	var allItems = this.getAllItems();

	jsonData = {};
	jsonData.graphics = {};
	jsonData.positions = {};
	jsonData.colors = {};

	for (var i = 0; i < allItems.length; i++)
		allItems[i].prepareSaveData(jsonData);
}

/**
 * Item change.
 * @method onItemChange
 */
FiddleClientModel.prototype.onItemChange = function() {
	this.trigger(FiddleClientModel.ITEM_CHANGE);
}

module.exports = FiddleClientModel;