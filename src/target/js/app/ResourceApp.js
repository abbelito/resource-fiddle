var PIXI = require("pixi.js");
var Resources = require("../lib/Resources");

function ResourceApp(resourceURL) {
	this.renderer = new PIXI.autoDetectRenderer(500, 500);
	document.body.appendChild(this.renderer.view);
	this.resources = new Resources();
	this.resources.on("loaded", this.onResources, this);
	this.resources.addSource(resourceURL);
	this.appStage = new PIXI.Stage(0, true);
	window.requestAnimationFrame(this.onAnimationFrame.bind(this));
};
ResourceApp.prototype.constructor = ResourceApp;

ResourceApp.prototype.onResources = function() {
	console.log("ResourceApp.prototype.onResources");
	var image = new PIXI.Sprite(this.resources.getTexture("table"));
	this.appStage.addChild(image);

	var image2 = new PIXI.Sprite(this.resources.getTexture("seatPlate"));
	this.appStage.addChild(image2);
};

ResourceApp.prototype.onAnimationFrame = function(time) {
	this.renderer.render(this.appStage);

	window.requestAnimationFrame(this.onAnimationFrame.bind(this));
};

module.exports = ResourceApp;