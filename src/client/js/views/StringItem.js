var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var SelectButton = require("./SelectButton");
var ImageView = require("./ImageView");
var Text = require("./Text");
var InputView = require("./InputView");
var Resources = require("../../../lib/Resources");

function StringItem(id, value) {
	ListItem.call(this, id);


	this.name = name;

	this.text = new Text();
	this.input = new InputView();

	this.addChild(this.text);
	this.addChild(this.input);

	this.text.width = 100;
	this.input.width = 200;

	this.text.y = this.header.height;
	this.input.y = this.header.height;

	this.input.x = 100;



	this.button.on(SelectButton.Change, this.onFilesSelected, this);
	
};
ClassUtils.extends(StringItem, ListItem);
EventDispatcher.init(StringItem);

StringItem.Changed = "Changed";

StringItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);

	this.text.updateLayout(width*0.5, height - this.header.height);
	this.input.updateLayout(width*0.5, height - this.header.height);

	this.text.x = 0; 
	this.input.x = width*0.5;

	this.text.y = this.header.height;
	this.input.y = this.header.height;
};


StringItem.prototype.onChanged = function(files) {
	this.trigger(StringItem.Changed, this);
};


module.exports = StringItem;