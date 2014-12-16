var PixiApp = require("pixiapp");
var inherits = require("inherits");
var PIXI = require("pixi.js");
var url = require("url");
var querystring = require("querystring");
var Resources = require("../src/lib/Resources");

function TargetApp() {
	PixiApp.call(this, 640, 480);

	var t, style;

	style = {
		fill: "#ffffff",
		font: "bold 16px Arial"
	};

	t = new PIXI.Text("This is the test application...", style);
	t.position.y = 5;
	t.position.x = 5;
	this.addChild(t);

	var params = querystring.parse(url.parse(window.location.href).query);

	style = {
		fill: "#ffffff",
		wordWrap: true,
		wordWrapWidth: 640,
		font: "12px Arial"
	}

	t = new PIXI.Text("loading resources from: " + params.resources, style);
	t.position.y = 30;
	t.position.x = 5;
	this.addChild(t);

	this.resources = new Resources(params.resources);
	this.resources.on("loaded", this.onResourcesLoaded, this);
}

inherits(TargetApp, PixiApp);

TargetApp.prototype.onResourcesLoaded = function() {
	console.log("resources loaded...");
	console.log("pos: "+JSON.stringify(this.resources.getPoint("pos_one")));
	var s,g,t,style;

	style = {
		fill: "#ffffff",
		font: "bold 12px Arial"
	}

	t = new PIXI.Text("image_one", style);
	t.position.y = 70;
	t.position.x = 40;
	this.addChild(t);

	t = new PIXI.Text("image_two", style);
	t.position.y = 70;
	t.position.x = 290;
	this.addChild(t);

	g = new PIXI.Graphics();
	g.lineStyle(2, 0xffffff, 1);
	g.drawRect(0, 0, 220, 220);
	g.position.x = 40;
	g.position.y = 90;
	this.addChild(g);

	g = new PIXI.Graphics();
	g.lineStyle(2, 0xffffff, 1);
	g.drawRect(0, 0, 220, 220);
	g.position.x = 290;
	g.position.y = 90;
	this.addChild(g);

	s = new PIXI.Sprite(this.resources.getTexture("image_one"));
	s.position.x = 50;
	s.position.y = 100;
	s.width = 200;
	s.height = 200;
	this.addChild(s);

	s = new PIXI.Sprite(this.resources.getTexture("image_two"));
	s.position.x = 300;
	s.position.y = 100;
	s.width = 200;
	s.height = 200;
	this.addChild(s);
}

new TargetApp();