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

	if(value && (value != '')) {
		console.log("Image item frame seems to exist");
	}

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

StringItem.prototype.addedToStage = function() {
	ListItem.prototype.addedToStage.call(this);

};


StringItem.prototype.onChanged = function(files) {
	this.trigger(StringItem.Changed, this);
};


module.exports = StringItem;