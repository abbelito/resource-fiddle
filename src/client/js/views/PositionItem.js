var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var InputView = require("./InputView");
var Text = require("./Text");

function PositionItem(id, values) {
	ListItem.call(this, id);

	this.id = id;


	this.textX = new Text("x:");
	this.addChild(this.textX)
	this.inputX = new InputView();
	this.addChild(this.inputX);
	this.inputX.setValue(values ? values[0] : "0");

	this.textY = new Text("y:");
	this.addChild(this.textY)
	this.inputY = new InputView();
	this.addChild(this.inputY);
	this.inputY.setValue(values ? values[1] : "0");

	this.inputX.addEventListener(InputView.Changed, this.onChanged, this);
	this.inputY.addEventListener(InputView.Changed, this.onChanged, this);
};
ClassUtils.extends(PositionItem, ListItem);
EventDispatcher.init(PositionItem);


PositionItem.Changed = "Changed";

PositionItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);
	this.textX.updateLayout(width*0.25, height - this.header.height);
	this.textY.updateLayout(width*0.25, height - this.header.height);
	this.inputX.updateLayout(width*0.25, height - this.header.height);
	this.inputY.updateLayout(width*0.25, height - this.header.height);

	this.textX.x = 0; 
	this.inputX.x = width*0.25;

	this.textY.x = width*0.5;
	this.inputY.x = width*0.75;

	this.textX.y = this.header.height;
	this.textY.y = this.header.height;
	this.inputX.y = this.header.height;
	this.inputY.y = this.header.height;
};

PositionItem.prototype.onChanged = function() {
	this.trigger(PositionItem.Changed, this);
};

PositionItem.prototype.getValues = function() {
	return [this.inputX.getValue(), this.inputY.getValue()];
};

module.exports = PositionItem;