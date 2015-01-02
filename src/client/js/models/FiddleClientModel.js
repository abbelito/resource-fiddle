var xnode = require("xnode");
var xnodec = require("xnodecollection");
var Testcase = require("./Testcase");

/**
 * Main model for the app.
 * @class FiddleClientModel
 */
function FiddleClientModel() {
	this.session = null;
	this.testcaseCollection = new xnodec.Collection();
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

module.exports = FiddleClientModel;