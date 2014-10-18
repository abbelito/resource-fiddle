var EventDispatcher = require("../utils/EventDispatcher");
var EditorView = require("../views/EditorView");
var Editor = require("../controllers/Editor");
var GraphicsEditor = require("../controllers/GraphicsEditor");
var Menu = require("../controllers/Menu");
var MenuItem = require("../views/MenuItem");
var MenuView = require("../views/MenuView");

function EditorController(view) {
	this.view = view;
	
	this.menuView = new MenuView();
	this.view.addChild(this.menuView);

	var items = [
		new MenuItem("image", "Graphics"),
		new MenuItem("position", "Positions"),
		new MenuItem("color", "Colors"),
		new MenuItem("string", "Strings")
	];

	this.menuView.setItems(items);

	this.menu = new Menu(this.menuView, items);
	this.menu.on(Menu.ItemClicked, this.onChangeView, this);

	var editorView = new EditorView();
	this.view.addChild(editorView);
	editorView.y = this.menuView.height;
	this.graphicsEditor = new GraphicsEditor(editorView);


	//this.editor.on("saved", this.onSaved, this);
	//this.editor.on("loaded", this.onTexture, this);
	this.graphicsEditor.on("uploaded", this.onUploaded, this);
	this.graphicsEditor.on(Editor.Saved, this.onSaved, this);
};
EditorController.prototype.constructor = EditorController;
EventDispatcher.init(EditorController);

EditorController.Refresh = "refresh";

EditorController.prototype.init = function(resources) {
	this.resources = resources;
	this.graphicsEditor.init(resources);
	this.graphicsEditor.save();
};


EditorController.prototype.onChangeView = function(item) {
	switch(item.id) {
		case "image": {

			break;
		}
	}
};


EditorController.prototype.onUploaded = function(textureJson) {
	//this.editor.setTextureJson(textureJson);
	this.trigger(EditorController.Refresh);
};


EditorController.prototype.onSaved = function(textureJson) {
	//this.editor.setTextureJson(textureJson);
	this.trigger(EditorController.Refresh);
};

module.exports = EditorController;