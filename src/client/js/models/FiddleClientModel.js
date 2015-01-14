var xnode = require("xnode");
var xnodec = require("xnodecollection");
var Testcase = require("./Testcase");
var CategoryModel = require("./CategoryModel");
var EventDispatcher = require("yaed");
var inherits = require("inherits");
//var request = require("request");
var HttpRequest = require("../utils/HttpRequest");

/**
 * Main model for the app.
 * @class FiddleClientModel
 */
function FiddleClientModel() {
	this.session = null;
	this.testcaseCollection = new xnodec.Collection();
	this.categoryCollection = new xnodec.Collection();

	this.saveRequest = null;
}

inherits(FiddleClientModel, EventDispatcher);

FiddleClientModel.ACTIVE_TESTCASE_CHANGE = "activeTestcaseChange";
FiddleClientModel.ITEM_CHANGE = "itemChange";
FiddleClientModel.SAVE_COMPLETE = "saveComplete";

/**
 * Set session.
 * @method setSession
 */
FiddleClientModel.prototype.setSession = function(session) {
	this.session = session;
}

/**
 * Setup resources.
 */
FiddleClientModel.prototype.initDefinition = function(definitionData) {
	console.log("init with def...");

	if (definitionData.items.length) {
		var category = this.createCategory("(Uncategorized)");

		var itemsDefinition = {
			items: definitionData.items
		};

		category.initDefinition(itemsDefinition);
	}

	for (var i = 0; i < definitionData.categories.length; i++) {
		var categoryDefinition = definitionData.categories[i];
		var category=this.createCategory(categoryDefinition.title);
		category.initDefinition(categoryDefinition);
	}

	console.log("init done, catlen=" + this.categoryCollection.getLength());
}

/**
 * Init from a resources object.
 * @method initWithResources
 */
FiddleClientModel.prototype.initResources = function(resources) {
	var resourceObject = resources.getResourceObject();
	var allByKey = this.getAllItemsByKey();

	for (var key in resourceObject.positions) {
		var item = allByKey[key];

		if (item)
			item.parseData(resourceObject.positions[key]);
	}

	for (var key in resourceObject.colors) {
		var item = allByKey[key];

		if (item)
			item.parseData(resourceObject.colors[key]);
	}

	for (var key in resourceObject.graphics) {
		if (key != "textures") {
			var item = allByKey[key];

			if (item)
				item.parseData(resourceObject.graphics[key]);
		}
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
 * Get all items in all categories.
 * @method getAllItems
 */
FiddleClientModel.prototype.getAllItemsByKey = function() {
	var a = this.getAllItems();
	var byKey = {};

	for (var i = 0; i < a.length; i++) {
		var item = a[i];
		byKey[item.getKey()] = item;
	}

	return byKey;
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

	var request = new HttpRequest(window.location + "save");
	request.setParameter("json", JSON.stringify(jsonData));
	request.perform().then(
		this.onSaveComplete.bind(this),
		this.onSaveError.bind(this)
	);
}

/**
 * Save complete.
 */
FiddleClientModel.prototype.onSaveComplete = function() {
	this.trigger(FiddleClientModel.SAVE_COMPLETE);
}

/**
 * Save complete.
 */
FiddleClientModel.prototype.onSaveError = function(e) {
	console.log("save error...");
}

/**
 * Item change.
 * @method onItemChange
 */
FiddleClientModel.prototype.onItemChange = function() {
	this.trigger(FiddleClientModel.ITEM_CHANGE);
}

module.exports = FiddleClientModel;