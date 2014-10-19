var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var InputView = require("./InputView");
var View = require("./View");

function ColorItem(id, value) {
	ListItem.call(this, id);

	this.id = id;

	this.colorView = new View(View.Div, "color-view");
	this.addChild(this.colorView);
	this.colorView.width = 100;
	this.colorView.height = 100;
	this.colorView.background = value ? value : "#000000";

	this.colorView.y = this.header.height;

	this.input = new InputView();
	this.addChild(this.input);

	this.input.setValue(value ? value : "#000000");

	this.input.x = this.colorView.width;
	this.input.y = this.colorView.y + (this.colorView.height - this.input.height)*0.5;

	this.input.addEventListener(InputView.Changed, this.onChanged, this);
};
ClassUtils.extends(ColorItem, ListItem);
EventDispatcher.init(ColorItem);


ColorItem.Changed = "Changed";

ColorItem.prototype.updateLayout = function(width, height) {
	this.colorView.width = width * 0.5;
	this.colorView.height = height;

	this.input.updateLayout(width * 0.5, height);

	this.input.x = width * 0.5;
	this.input.y = this.header.height;
	
	this.colorView.y = this.header.height;
};

ColorItem.prototype.onChanged = function() {
	this.trigger(ColorItem.Changed, this);
};

ColorItem.prototype.getValue = function() {
	return this.input.getValue();
};

module.exports = ColorItem;