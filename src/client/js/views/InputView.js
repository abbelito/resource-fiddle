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

InputView.prototype.onBlur = function() {
	this.trigger(InputView.Changed, this);
};

module.exports = InputView;