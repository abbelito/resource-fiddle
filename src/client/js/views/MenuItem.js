var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var View = require("./View");
var Text = require("./Text");

function MenuItem(id, string) {
	View.call(this, View.Div, "MenuItem");
	this.getElement().addEventListener("click", this.onClick.bind(this));

	this.id = id;
	this.string = string;
	this.text = new Text(this.string);

	this.addChild(this.text);

	this.setSelected(false);
};
ClassUtils.extends(MenuItem, View);
EventDispatcher.init(MenuItem);

MenuItem.Click = "Click";

MenuItem.prototype.onClick = function(event) {
	this.trigger(MenuItem.Click, this);
};

MenuItem.prototype.setSelected = function(selected) {
	this.selected = selected;

	if(this.selected) {
		this.background = "#FF0000";
		this.text.color = "#0000FF"
	}
	else {
		this.background = "#000000";
		this.text.color = "#FFFFFF"
	}
};

MenuItem.prototype.updateLayout = function(width, height) {
	this.text.updateLayout(width, height);
};

module.exports = MenuItem;
