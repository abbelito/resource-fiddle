var EventDispatcher = require("../utils/EventDispatcher");
var Menu = require("../controllers/Menu");
var MenuItem = require("../views/MenuItem");
var MenuView = require("../views/MenuView");
var IFrameView = require("../views/IFrameView");
var Testcase = require("../models/Testcase");

function TargetController(view) {
	this.view = view;

	this.menuView = new MenuView();
	this.view.addChild(this.menuView);

	var items = [];
	this.testcases = new Array();

	this.menuView.setItems(items);

	this.menu = new Menu(this.menuView, items);
	this.menu.on(Menu.ItemClicked, this.onChangeView, this);

	this.iframeView = new IFrameView();
	this.view.addChild(this.iframeView);
	this.iframeView.y = this.menuView.height;
	this.iframeView.width = 500;
	this.iframeView.height = 500;
};
TargetController.prototype.constructor = TargetController;
EventDispatcher.init(TargetController);


TargetController.prototype.init = function() {
	
	this.iframeView.init();
};


TargetController.prototype.addTestcase = function(id, name, url) {
	this.testcases.push(new Testcase(id, name, url));
	this.menu.addItem(new MenuItem(id, name));
};


TargetController.prototype.reload = function() {
	this.iframeView.reload();
};


TargetController.prototype.onChangeView = function(item) {
	for(var i = 0; i < this.testcases.length; i++) {
		if(this.testcases[i].id == item.id) {
			this.targetURL = this.testcases[i].url;
			this.iframeView.setUrl(this.targetURL);
			return;
		}
	}
};

module.exports = TargetController;