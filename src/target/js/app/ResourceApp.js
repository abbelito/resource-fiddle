var PIXI = require("pixi.js");
var Resources = require("../lib/Resources");

function ResourceApp() {
	this.renderer = new PIXI.autoDetectRenderer(500, 500);
	document.body.appendChild(this.renderer.view);
	this.resources = new Resources();
	this.appStage = new PIXI.Stage(0, true);
	window.requestAnimationFrame(this.onAnimationFrame.bind(this));
};
ResourceApp.prototype.constructor = ResourceApp;

ResourceApp.prototype.loadTextures = function(textures) {
	
};

ResourceApp.prototype.onAnimationFrame = function(time) {
	this.renderer.render(this.appStage);

	window.requestAnimationFrame(this.onAnimationFrame.bind(this));
};

module.exports = ResourceApp;