

var PIXI = require("pixi.js");
var EventDispatcher = require("../client/js/utils/EventDispatcher");



/**
 * Client resources
 * @class Resources.
 */
function Resources() {
	var i;

	this.resources = {
		graphics: {},
		positions: {},
		colors: {},
		strings: {},
		values: {}
	};

	this.sources = new Array();

	this.Align = {
	 	Left: "left",
	 	Right: "right",
	 	Center: "center"
	 };

	 this.textures = {};

	 this.loadCount = 0;
	 this.loadIndex = 0;
	 this.texturesLoaded = 0;
	 this.textureCount = 0;
}
EventDispatcher.init(Resources);


Resources.Loaded = "loaded";


Resources.prototype.isLoading = function() {
	return this.loadCount > 0 || this.texturesLoaded < this.textureCount;
};

Resources.prototype.addSource = function(object) {
	console.log("Resources.prototype.addSource  (typeof object) = ", (typeof object));
	if(typeof object == "string") {

		function fileExists(url) {
			if(url) {
				var req = new XMLHttpRequest();
				req.open('GET', url, false);
				req.send();
				return req.status==200;
			} else {
				return false;
			}
		}
		try {
			if(!fileExists(object)) {
				console.warn("File didn't exist: ", object);
				return;
			}
		}
		catch(error) {
			console.warn("Failed to load file: ", object);
		}

		try {
			var loader = new PIXI.JsonLoader(object, true);
			loader.onLoaded = this.onLoaded.bind(this, loader, this.loadIndex);
			var loadIndex = parseInt(this.loadIndex + 0);
			loader.onError = this.onError.bind(this, loader, loadIndex);
			loader.load();
			this.sources.push(this.loadIndex);
			this.loadCount++;
			this.loadIndex++;
		}
		catch(error) {
			console.warn("Failed to load file: ", object);
		}
	}
	else {
		if(this.loadCount <= 0) {
			/*
			for(var p in object) {
				for(var o in object[p]) {
					this.sources[p][o] = object[p][o];
				}
			}*/
			this.loadCount++;
			this.onLoaded({json: object}, this.loadIndex);
			this.loadIndex++;
		}
		else {
			this.sources.push(object);
			this.loadIndex++;
		}
	}
};

Resources.prototype.getResourceObject = function() {
	return this.resources;
};

Resources.prototype.onLoaded = function(loader, loadIndex) {
	this.loadCount--;
	
	if(loader != null) {
		this.sources[loadIndex] = loader.json;
	}

	if(this.loadCount <= 0) {

		for(var i = 0; i < this.sources.length; i++) {
			for(var p in this.sources[i]) {
				for(var o in this.sources[i][p]) {
					this.resources[p][o] = this.sources[i][p][o];
				}
			}
		}
		if(this.resources.graphics.textures) {
			this.textureCount = this.resources.graphics.textures.length;
			for(var i = 0; i < this.resources.graphics.textures.length; i++) {
				var textureObject = this.resources.graphics.textures[i];
				this.textures[textureObject.id] = new PIXI.Texture.fromImage(textureObject.file);
				if(this.textures[textureObject.id].baseTexture.hasLoaded) {
					this.onTextureLoaded();
				}
				else {
					this.textures[textureObject.id].baseTexture.addEventListener("loaded", this.onTextureLoaded.bind(this));
					this.textures[textureObject.id].baseTexture.addEventListener("error", this.onTextureError.bind(this));
				}
			}
		}
		else {
			this.trigger(Resources.Loaded);
		}

		//this.trigger(Resources.Loaded);
	}
};

Resources.prototype.onError = function(loader, loadIndex) {
	console.warn("Resources.prototype.onError");
	this.loadCount--;

	if(this.loadCount <= 0) {

		for(var i = 0; i < this.sources.length; i++) {
			for(var p in this.sources[i]) {
				this.resources[p] = this.sources[i][p];
			}
		}
		if(this.resources.graphics.textures) {
			this.textureCount = this.resources.graphics.textures.length;
			for(var i = 0; i < this.resources.graphics.textures.length; i++) {
				var textureObject = this.resources.graphics.textures[i];
				this.textures[textureObject.id] = new PIXI.Texture.fromImage(textureObject.file);
				if(this.textures[textureObject.id].baseTexture.hasLoaded) {
					this.onTextureLoaded();
				}
				else {
					this.textures[textureObject.id].baseTexture.addEventListener("loaded", this.onTextureLoaded.bind(this));
					this.textures[textureObject.id].baseTexture.addEventListener("error", this.onTextureError.bind(this));
				}
			}
		}
		else {
			this.trigger(Resources.Loaded);
		}

	}
};

Resources.prototype.onTextureLoaded = function() {
	console.warn("Resources.prototype.onTextureLoaded");
	this.texturesLoaded ++;
	if(this.texturesLoaded >= this.textureCount) {
		this.trigger(Resources.Loaded);
	}
};

Resources.prototype.onTextureError = function() {
	console.warn("Resources.prototype.onTextureError");
	this.texturesLoaded ++;
	if(this.texturesLoaded >= this.textureCount) {
		this.trigger(Resources.Loaded);
	}
};

/**
 * Get value from either loaded skin or default skin.
 * @method getValue
 */
Resources.prototype.getValue = function(key) {
	var value = this.resources.values[key];

	if(value == null) {
		throw new Error("Invalid skin key: " + key);
	} 

	return value;
}

/**
 * Get color from either loaded skin or default skin.
 * @method getColor
 */
Resources.prototype.getColor = function(key) {
	var value = null;
	
	if((this.resources != null) && (this.resources.colors[key] != null)) {
		value = this.resources.colors[key];
	}

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

	if((this.resources != null) && (this.resources.positions[key] != null)) {
		value = new PIXI.Point(this.resources.positions[key][0], this.resources.positions[key][1]);
	}

	if(value == null) {
		throw new Error("Invalid skin key: " + key);
	} 

	return value;
}

/**
 * Get texture from either loaded resources.
 * @method getTexture
 */
Resources.prototype.getTexture = function(key) {
	var value = null;
	var isDefault = false;
	var texture = null;
	var frame = null;


	if((this.resources != null) && (this.resources.graphics[key] != null)) {
		value = this.resources.graphics[key];
	}

	if(value == null) {
		throw new Error("Missing key: " + key);
		return null;
	}

	if(value.texture != null) {
		texture = value.texture;
	}

	if(value.coords != null) {
		frame = value.coords;
	}

	if(texture != null) {
		if(frame != null)
			return this.getComponentsPart(texture, frame[0], frame[1], frame[2], frame[3]);
		else
			return this.getComponentsPart(texture, frame);
	}


	
	throw new Error("Invalid key: " + key);
	
	return null;
}

/**
 * Get texture from either loaded resources.
 * @method getDOMTexture
 */
Resources.prototype.getDOMTexture = function(key) {
	var value = null;
	var isDefault = false;
	var texture = null;
	var frame = null;


	if((this.resources != null) && (this.resources.graphics[key] != null)) {
		value = this.resources.graphics[key];
	}

	if(value.texture != null) {
		texture = value.texture;
	}

	if(value.coords != null) {
		frame = value.coords;
	}

	if(texture != null) {
		if(frame != null)
			return this.getDOMComponentsPart(texture, frame[0], frame[1], frame[2], frame[3]);
		else
			return this.getDOMComponentsPart(texture, frame);
	}
	
	console.warn("Invalid key: " + key);
	
	return null;
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
 * Get part from components atlas.
 * @method getDOMComponentsPart
 * @private
 */
Resources.prototype.getDOMComponentsPart = function(textureid, x, y, w, h) {

	var texture = this.getComponentsPart(textureid, x, y, w, h);

	var dom = texture.baseTexture.source.cloneNode();

	var div = document.createElement("div");
	div.appendChild(dom);
	dom.style.position = "relative";
	dom.style.left = "-" + x + "px";
	dom.style.top = "-" + y + "px";

	div.style.overflow = "hidden";
	div.style.width = w + "px";
	div.style.height = h + "px";

	return div;
}

/**
 * Get texture object from skin.
 * @method getTextureFromSkin
 * @private
 */
Resources.prototype.getTextureFromSkin = function(textureid) {

	var textureObject = null;

	if((this.resources != null) && (this.resources.graphics.textures != null)) {
		for(var i = 0; i < this.resources.graphics.textures.length; i++) {
			if(this.resources.graphics.textures[i].id == textureid) {
				textureObject = this.resources.graphics.textures[i];
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


module.exports = Resources;