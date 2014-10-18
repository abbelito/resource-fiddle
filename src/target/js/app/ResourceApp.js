var PIXI = require("pixi.js");
var Resources = require("../../../lib/Resources");

function ResourceApp(resourceURL, testcase) {
	this.testcase = testcase;
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

	if(this.testcase == "test1") {
		var image = new PIXI.Sprite(this.resources.getTexture("table"));
		this.appStage.addChild(image);

		var image2 = new PIXI.Sprite(this.resources.getTexture("seatPlate"));
		this.appStage.addChild(image2);
		image2.position = this.resources.getPoint("seatPlatePosition");

		var image3 = new PIXI.Sprite(this.resources.getTexture("suitSymbol1"));
		this.appStage.addChild(image3);
		image3.position = this.resources.getPoint("suitSymbol1Position");
	}
	else if(this.testcase == "test2") {

		var image2 = new PIXI.Sprite(this.resources.getTexture("seatPlate"));
		this.appStage.addChild(image2);
		image2.position = this.resources.getPoint("seatPlatePosition");

		var image3 = new PIXI.Sprite(this.resources.getTexture("suitSymbol2"));
		this.appStage.addChild(image3);
		image3.position = this.resources.getPoint("suitSymbol2Position");
	}
	else if(this.testcase == "test3") {

		var image2 = new PIXI.Sprite(this.resources.getTexture("chatBackground"));
		this.appStage.addChild(image2);
		image2.position = this.resources.getPoint("seatPlatePosition");

		var image3 = new PIXI.Sprite(this.resources.getTexture("suitSymbol3"));
		this.appStage.addChild(image3);
		image3.position = this.resources.getPoint("suitSymbol2Position");
	}
	else if(this.testcase == "test4") {

		var image2 = new PIXI.Sprite(this.resources.getTexture("dealerButton"));
		this.appStage.addChild(image2);
		image2.position = this.resources.getPoint("seatPlatePosition");

		var image3 = new PIXI.Sprite(this.resources.getTexture("suitSymbol4"));
		this.appStage.addChild(image3);
		image3.position = this.resources.getPoint("suitSymbol2Position");
	}
};

ResourceApp.prototype.onAnimationFrame = function(time) {
	this.renderer.render(this.appStage);

	window.requestAnimationFrame(this.onAnimationFrame.bind(this));
};

module.exports = ResourceApp;