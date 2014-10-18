

var PIXI = require("pixi.js");
var EventDispatcher = require("../utils/EventDispatcher");

/**
 * Client resources
 * @class Resources.
 */
function Resources() {
	var i;

	this.defaultSkin = null;
	this.skin = null;


	 this.Align = {
	 	Left: "left",
	 	Right: "right",
	 	Center: "center"
	 };

	 this.textures = {};

	 this.loadCount = 0;

}
EventDispatcher.init(Resources);

Resources.prototype.addSource = function(object) {
	console.log("Resources.prototype.addSource  (typeof object) = ", (typeof object));
	if(typeof object == "string") {
		var loader = new PIXI.JsonLoader(object);
		loader.onLoaded = this.onLoaded.bind(this, loader);
		loader.load();
		this.loadCount++;
	}
	else {
		if(this.defaultSkin == null) {
			this.defaultSkin = object;		
		}
		else {
			this.skin = object;			
		}
	}
};

Resources.prototype.onLoaded = function(loader) {
	console.log("Resources.prototype.onLoaded this.loadCount = ", this.loadCount);
	this.loadCount--;
		this.defaultSkin = loader.json;	
		this.skin = loader.json;	
		/*
	if(this.defaultSkin == null) {
		this.defaultSkin = loader.json;		
	}
	else {
		this.skin = loader.json;			
	}
	*/
	if(this.loadCount <= 0)
		this.trigger("loaded");
};

/**
 * Get value from either loaded skin or default skin.
 * @method getValue
 */
Resources.prototype.getValue = function(key) {
	var value = null;

	if((this.skin != null) && (this.skin[key] != null))
		value = this.skin[key];
	else
		value = this.defaultSkin[key];

	if(value == null) {
		throw new Error("Invalid skin key: " + key);
	} 

	return value;
}

/**
 * Get point from either loaded skin or default skin.
 * @method getPoint
 */
Resources.prototype.getPoint = function(key) {
	var value = null;

	if((this.skin != null) && (this.skin.positions[key] != null))
		value = new PIXI.Point(this.skin.positions[key][0], this.skin.positions[key][1]);
	else
		value = new PIXI.Point(this.defaultSkin.positions[key][0], this.defaultSkin.positions[key][1]);

	if(value == null) {
		throw new Error("Invalid skin key: " + key);
	} 

	return value;
}

/**
 * Get points from either loaded skin or default skin.
 * @method getPoints
 */
Resources.prototype.getPoints = function(key) {
	var values = null;

	var points = new Array();

	if((this.skin != null) && (this.skin.positions[key] != null))
		values = this.skin.positions[key];
	else
		values = this.defaultSkin.positions[key];

	for(var i = 0; i < values.length; i++) {
		points.push(new PIXI.Point(values[i][0], values[i][1]));
	}

	if(points.length <= 0) {
		throw new Error("Invalid skin key: " + key);
	} 

	return points;
}

/**
 * Get texture from either loaded skin or default skin.
 * @method getTexture
 */
Resources.prototype.getTexture = function(key, index) {
	var value = null;
	var isDefault = false;
	var texture = null;
	var frame = null;


	if((this.skin != null) && (this.skin.graphics[key] != null)) {
		value = this.skin.graphics[key];
	}
	else {
		value = this.defaultSkin.graphics[key];
		isDefault = true;
	}
//	console.log("value = " + value + ", key = " +key);


	if(value.texture != null) {
		texture = value.texture;
	}
	else if(!isDefault && (this.skin.defaultTexture != null)) {
		texture = this.skin.defaultTexture;
	}
	else {
		texture = this.defaultSkin.defaultTexture;
	}

	if(value.coords != null) {
		frame = value.coords;
	}
	else if(typeof value === "string") {
		texture = value;
	}
	else {
		frame = value;
	}

	if(texture != null) {
		if(frame != null)
			return this.getComponentsPart(texture, frame[0], frame[1], frame[2], frame[3]);
		else
			return this.getComponentsPart(texture, frame);
	}


	
	throw new Error("Invalid skin key: " + key);
	
	return null;
}

/**
 * Get textures from either loaded skin or default skin.
 * @method getTextures
 */
Resources.prototype.getTextures = function(key) {
	var values = null;
	var isDefault = false;

	
	

	if((this.skin != null) && (this.skin[key] != null)) {
		values = this.skin[key];
	}
	else {
		values = this.defaultSkin[key];
		isDefault = true;
	}


	var frame = null;
	var texture = null;
	var textures = new Array();
	for(var i = 0; i < values.length; i++) {
		frame = null;
		texture = null;
		
		if(values[i].texture != null) {
			texture = values[i].texture;
		}
		else if(!isDefault && (this.skin.defaultTexture != null)) {
			texture = this.skin.defaultTexture;
		}
		else {
			texture = this.defaultSkin.defaultTexture;
		}

		if(values[i].coords != null) {
			frame = values[i].coords;
		}
		else if(typeof values[i] === "string") {
			texture = values[i];
		}
		else {
			frame = values[i];
		}

		if(texture != null) {
			if(frame != null)
				textures.push(this.getComponentsPart(texture, frame[0], frame[1], frame[2], frame[3]));
			else
				textures.push(this.getComponentsPart(texture, frame));
		}
	}

	
	if(textures.length <= 0)
		throw new Error("Invalid skin key: " + key);
	 

	return textures;
}

/**
 * Get part from components atlas.
 * @method getComponentsPart
 * @private
 */
Resources.prototype.getComponentsPart = function(textureid, x, y, w, h) {

	var frame;
	var texture = this.getTextureFromSkin(textureid);

	if(x === null) {
		frame = {
			x: 0,
			y: 0,
			width: texture.width,
			height: texture.height
		};
	}
	else {
		frame = {
			x: x,
			y: y,
			width: w,
			height: h
		};
	}

	return new PIXI.Texture(texture, frame);
}

/**
 * Get texture object from skin.
 * @method getTextureFromSkin
 * @private
 */
Resources.prototype.getTextureFromSkin = function(textureid) {

	var textureObject = null;

	if((this.skin != null) && (this.skin.graphics.textures != null)) {
		for(var i = 0; i < this.skin.graphics.textures.length; i++) {
			if(this.skin.graphics.textures[i].id == textureid) {
				textureObject = this.skin.graphics.textures[i];
			}
		}
	}
	if(textureObject == null) {
		for(var i = 0; i < this.defaultSkin.graphics.textures.length; i++) {
			if(this.defaultSkin.graphics.textures[i].id == textureid) {
				textureObject = this.defaultSkin.graphics.textures[i];
			}
		}
	}

	if(textureObject == null) {
		throw new Error("textureid doesn't exist: " + textureid);
	}

	if(this.textures[textureObject.id] == null)
		this.textures[textureObject.id] = new PIXI.Texture.fromImage(textureObject.file);

	return this.textures[textureObject.id];
}


/**
 * Get singleton instance.
 * @method getInstance
 */
Resources.getInstance = function() {
	if (!Resources.instance)
		Resources.instance = new Resources();

	return Resources.instance;
}

module.exports = Resources;