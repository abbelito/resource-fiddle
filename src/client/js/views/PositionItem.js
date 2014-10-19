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

PositionItem.prototype.addedToStage = function() {
	this.inputX.width = 100;
	this.inputY.width = 100;
	this.inputX.height = 20;
	this.inputY.height = 20;
	
	ListItem.prototype.addedToStage.call(this);

	this.textX.x = 30; 
	this.inputX.x = 50;
	this.textY.x = 30 + this.inputX.x + this.inputX.width;
	this.inputY.x = this.textY.x + 20;

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