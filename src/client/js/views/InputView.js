var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var View = require("./View");

function InputView() {
	View.call(this, View.Input, "InputView");

	this.getElement().setAttribute("type", "text");

	this.getElement().addEventListener("blur", this.onBlur.bind(this));
};
ClassUtils.extends(InputView, View);
EventDispatcher.init(InputView);

InputView.Changed = "Changed";

InputView.prototype.getValue = function() {
	return this.getElement().value;
};

InputView.prototype.setValue = function(value) {
	this.getElement().value = value;
};

InputView.prototype.onBlur = function() {
	this.trigger(InputView.Changed, this);
};

InputView.prototype.updateLayout = function(width, height) {
	this.width = width;
	this.height = height;
};

module.exports = InputView;