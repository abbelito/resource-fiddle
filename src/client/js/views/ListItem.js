var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");
var Text = require("./Text");

function ListItem(name) {
	View.call(this, View.Div, "ListItem");

	this.header = new View();
	this.addChild(this.header);
	this.header.background = "#AAAAAA";


	this.text = new Text(name);
	this.header.addChild(this.text);

	this.header.width = 300;
	this.header.height = 30;
	//this.text.width = 400;


};
ClassUtils.extends(ListItem, View);

ListItem.prototype.addedToStage = function() {
	this.text.width = this.header.width;
	this.text.height = this.header.height;
	View.prototype.addedToStage.call(this);
	console.log("this.text.width = " , this.text.width);
	/*this.text.x = (this.header.width - this.text.width)*0.5;
	this.text.y = (this.header.height - this.text.height)*0.5;*/
};

module.exports = ListItem;