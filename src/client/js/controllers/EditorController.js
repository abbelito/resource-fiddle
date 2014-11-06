var EventDispatcher = require("../utils/EventDispatcher");
var EditorView = require("../views/EditorView");
var Editor = require("../controllers/Editor");
var GraphicsEditor = require("../controllers/GraphicsEditor");
var PositionsEditor = require("../controllers/PositionsEditor");
var StringsEditor = require("../controllers/StringsEditor");
var ColorsEditor = require("../controllers/ColorsEditor");
var Menu = require("../controllers/Menu");
var MenuItem = require("../views/MenuItem");
var MenuView = require("../views/MenuView");

function EditorController(basePath, session, view) {
	this.view = view;

	this.view.show();
	
	this.menuView = new MenuView();
	this.view.setMenuView(this.menuView);

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
	this.view.addEditor(editorView);
	editorView.y = this.menuView.height;
	this.graphicsEditor = new GraphicsEditor(basePath, session, editorView);

	var editorView = new EditorView();
	this.view.addEditor(editorView);
	editorView.y = this.menuView.height;
	this.positionsEditor = new PositionsEditor(basePath, session, editorView);

	var editorView = new EditorView();
	this.view.addEditor(editorView);
	editorView.y = this.menuView.height;
	this.colorsEditor = new ColorsEditor(basePath, session, editorView);

	var editorView = new EditorView();
	this.view.addEditor(editorView);
	this.stringsEditor = new StringsEditor(basePath, session, editorView);

	this.currentEditor = this.graphicsEditor;
	this.currentEditor.show();

	//this.editor.on("saved", this.onSaved, this);
	//this.editor.on("loaded", this.onTexture, this);
	this.graphicsEditor.on("uploaded", this.onUploaded, this);

	this.graphicsEditor.on(Editor.Saved, this.onSaved, this);
	this.positionsEditor.on(Editor.Saved, this.onSaved, this);
	this.colorsEditor.on(Editor.Saved, this.onSaved, this);
	this.stringsEditor.on(Editor.Saved, this.onSaved, this);
};
EditorController.prototype.constructor = EditorController;
EventDispatcher.init(EditorController);

EditorController.Refresh = "refresh";

EditorController.prototype.init = function(resources) {
	this.resources = resources;
	
	this.positionsEditor.init(resources);
	this.graphicsEditor.init(resources);
	//this.stringsEditor.init(resources);
	this.colorsEditor.init(resources);

	this.graphicsEditor.save();
};


EditorController.prototype.onChangeView = function(item) {
	this.currentEditor.hide();
	switch(item.id) {
		case "image": {
			this.currentEditor = this.graphicsEditor;
			break;
		}
		case "position": {
			this.currentEditor = this.positionsEditor;
			break;
		}
		case "color": {
			this.currentEditor = this.colorsEditor;
			break;
		}
		case "string": {
			this.currentEditor = this.stringsEditor;
			break;
		}
	}
	this.currentEditor.show();
	this.currentEditor.view.updateLayout(this.view.width, this.view.height);

	setTimeout(function () {
		this.view.updateLayout(document.body.clientWidth*.5, document.body.clientHeight);
	}.bind(this),0);
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