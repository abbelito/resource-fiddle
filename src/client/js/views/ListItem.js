var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");
var Text = require("./Text");

function ListItem(name) {
	View.call(this, View.Div, "ListItem");

	this.header = new View();
	this.addChild(this.header);
	this.header.background = "#AAAAAA";


	this.headerText = new Text(name);
	this.header.addChild(this.headerText);

	//this.text.width = 400;


};
ClassUtils.extends(ListItem, View);



ListItem.prototype.updateLayout = function(width, height) {
	this.headerText.width = width;
	this.headerText.height = 30;
	this.header.width = width;
	this.header.height = 30;
	this.width = width;
	this.height = height;
};

module.exports = ListItem;