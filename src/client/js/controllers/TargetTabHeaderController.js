/**
 * Control the header field of the tabls in the resource pane.
 * @method ResourceTabController
 */
function TargetTabHeaderController(tabHeaderView) {
	this.tabHeaderView = tabHeaderView;
	this.tabHeaderView.addEventListener("click", this.onTabHeaderViewClick.bind(this));
}

/**
 * Set data.
 * @method setData
 */
TargetTabHeaderController.prototype.setData = function(testcase) {
	if (this.testcase) {
		this.testcase.off("change", this.onTestcaseChange, this);
	}

	this.testcase = testcase;

	if (this.testcase) {
		this.testcase.on("change", this.onTestcaseChange, this);
		this.tabHeaderView.setLabel(testcase.getLabel());
		this.tabHeaderView.setActive(testcase.isActive());
	}
}

/**
 * The tab was clicked, set this tab as the active one.
 * @method onTabHeaderViewClick
 */
TargetTabHeaderController.prototype.onTabHeaderViewClick = function() {
	this.testcase.setActive(true);
}

/**
 * The model changed.
 * @method onTestcaseChange
 */
TargetTabHeaderController.prototype.onTestcaseChange = function() {
	this.tabHeaderView.setActive(this.testcase.isActive());
}

module.exports = TargetTabHeaderController;