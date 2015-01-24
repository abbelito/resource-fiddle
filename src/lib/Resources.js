var PIXI = require("pixi.js");
var EventDispatcher = require("yaed");



/**
 * Client resources
 * @class Resources.
 */
function Resources(source) {
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

	if (source !== undefined)
		this.addSource(source);
}
EventDispatcher.init(Resources);

Resources.Loaded = "loaded";
Resources.Error = "error";

Resources.prototype.isLoading = function() {
	return this.loadCount > 0 || this.texturesLoaded < this.textureCount;
};

Resources.prototype.addSource = function(object, noCache) {
	if (typeof object == "string") {

		function fileExists(url) {
				if (url) {
					var req = new XMLHttpRequest();
					req.open('GET', url, false);
					req.send();
					return req.status == 200;
				} else {
					return false;
				}
			}
			/*
					try {
						if(!fileExists(object)) {
							return;
						}
					}
					catch(error) {
						console.warn("Failed to load file: ", object);
					}*/

		try {
			var loader = new Resources.JsonLoader(object, true, noCache);
			loader.onLoaded = this.onLoaded.bind(this, loader, this.loadIndex, noCache);
			loader.onError = this.onError.bind(this);
			var loadIndex = parseInt(this.loadIndex + 0);
			loader.onError = this.onError.bind(this, loader, loadIndex, noCache);
			loader.load();
			this.sources.push(this.loadIndex);
			this.loadCount++;
			this.loadIndex++;
		} catch (error) {
			console.warn("Failed to load file: ", object);
		}
	} else {
		if (this.loadCount <= 0) {
			/*
			for(var p in object) {
				for(var o in object[p]) {
					this.sources[p][o] = object[p][o];
				}
			}*/
			this.loadCount++;
			this.onLoaded({
				json: object
			}, this.loadIndex);
			this.loadIndex++;
		} else {
			this.sources.push(object);
			this.loadIndex++;
		}
	}
};

Resources.prototype.getResourceObject = function() {
	return this.resources;
};

Resources.prototype.onLoaded = function(loader, loadIndex, noCache) {
	this.loadCount--;

	if (loader != null) {
		this.sources[loadIndex] = loader.json;
	}

	if (this.loadCount == 0) {
		//console.log("---------------\n(this.loadCount == 0)\n---------------");

		for (var i = 0; i < this.sources.length; i++) {
			for (var p in this.sources[i]) {
				for (var o in this.sources[i][p]) {
					if (o == "textures") {
						if (!this.resources[p][o]) {
							this.resources[p][o] = [];
						}
						var exists = false;
						for (var t in this.sources[i][p][o]) {
							exists = false;

							for (var ot = 0; ot < this.resources[p][o].length; ot++) {
								if (this.resources[p][o][ot].id == this.sources[i][p][o][t].id) {
									exists = true;
								}
							}
							if (!exists) {
								this.resources[p][o].push(this.sources[i][p][o][t]);
							}
						}
					} else {
						if ((this.sources[i][p][o] && (this.sources[i][p][o] != "")) || (!this.resources[p][o])) {
							this.resources[p][o] = this.sources[i][p][o];
						}
					}
				}
			}
		}

		if (this.resources.graphics.textures && this.resources.graphics.textures.length) {
			for (var i = this.textureCount; i < this.resources.graphics.textures.length; i++) {
				this.textureCount = this.resources.graphics.textures.length;
				var textureObject = this.resources.graphics.textures[i];
				this.textures[textureObject.id] = new PIXI.Texture.fromImage(textureObject.file + (noCache ? ("?__timestamp__=" + Date.now()) : ""));
				if (this.textures[textureObject.id].baseTexture.hasLoaded) {
					this.onTextureLoaded();
				} else {
					//console.log("adding listeners to: ", this.textures[textureObject.id].baseTexture.imageUrl);
					this.textures[textureObject.id].baseTexture.addEventListener("loaded", this.onTextureLoaded.bind(this));
					this.textures[textureObject.id].baseTexture.addEventListener("error", this.onTextureError.bind(this));
				}
			}
		} else {
			this.trigger(Resources.Loaded);
		}

		//this.trigger(Resources.Loaded);
	}
};

Resources.prototype.onError = function(loader, loadIndex, noCache) {
	var message;

	if (loader.hasOwnProperty("errorMessage"))
		message = loader.errorMessage;

	else
		message = "Unknown error";

	this.trigger(Resources.Error, message);
	return;

	this.loadCount--;

	if (this.loadCount <= 0) {

		for (var i = 0; i < this.sources.length; i++) {
			for (var p in this.sources[i]) {
				for (var o in this.sources[i][p]) {
					if (o == "textures") {
						if (!this.resources[p][o]) {
							this.resources[p][o] = [];
						}
						var exists = false;
						for (var t in this.sources[i][p][o]) {
							exists = false;

							for (var ot = 0; ot < this.resources[p][o].length; ot++) {
								if (this.resources[p][o][ot].id == this.sources[i][p][o][t].id) {
									exists = true;
								}
							}
							if (!exists) {
								this.resources[p][o].push(this.sources[i][p][o][t]);
							}
						}
					} else {
						if ((this.sources[i][p][o] && (this.sources[i][p][o] != "")) || (!this.resources[p][o])) {
							this.resources[p][o] = this.sources[i][p][o];
						}
					}
				}
			}
		}
		if (this.resources.graphics.textures) {
			for (var i = this.textureCount; i < this.resources.graphics.textures.length; i++) {
				this.textureCount = this.resources.graphics.textures.length;
				var textureObject = this.resources.graphics.textures[i];
				this.textures[textureObject.id] = new PIXI.Texture.fromImage(textureObject.file + (noCache ? ("?__timestamp__=" + Date.now()) : ""));
				if (this.textures[textureObject.id].baseTexture.hasLoaded) {
					this.onTextureLoaded();
				} else {
					//console.log("adding listeners to: ", this.textures[textureObject.id].baseTexture.imageUrl);
					this.textures[textureObject.id].baseTexture.addEventListener("loaded", this.onTextureLoaded.bind(this));
					this.textures[textureObject.id].baseTexture.addEventListener("error", this.onTextureError.bind(this));
				}
			}
		} else {
			this.trigger(Resources.Loaded);
		}

	}
};

Resources.prototype.onTextureLoaded = function(event) {
	this.texturesLoaded++;
	if (event && event.content) {
		event.content.removeAllEventListeners();
	}
	//console.log("\n---------");
	//console.log("Resources.prototype.onTextureLoaded: this.texturesLoaded = ", this.texturesLoaded, ", this.textureCount = ", this.textureCount, ", event = ", event);
	//console.log("---------\n");
	if (this.texturesLoaded >= this.textureCount) {
		this.trigger(Resources.Loaded);
	}
};

Resources.prototype.onTextureError = function(event) {
	this.texturesLoaded++;
	if (this.texturesLoaded >= this.textureCount) {
		this.trigger(Resources.Loaded);
	}
};

/**
 * Get value from either loaded skin or default skin.
 * @method getValue
 */
Resources.prototype.getValue = function(key) {
	var value = this.resources.values[key];

	if (value == null) {
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

	if ((this.resources != null) && (this.resources.colors[key] != null)) {
		value = this.resources.colors[key];
	}

	if (value == null) {
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

	if ((this.resources != null) && (this.resources.positions[key] != null)) {
		value = new PIXI.Point(
			parseFloat(this.resources.positions[key][0]),
			parseFloat(this.resources.positions[key][1])
		);
	}

	if (value == null) {
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


	if ((this.resources != null) && (this.resources.graphics[key] != null)) {
		value = this.resources.graphics[key];
	}

	if (value == null) {
		throw new Error("Missing key: " + key);
		return null;
	}

	if (value.texture != null) {
		texture = value.texture;
	}

	if (value.coords != null) {
		frame = value.coords;
	}

	if (texture != null) {
		if (frame != null)
			return this.getComponentsPart(texture, frame[0], frame[1], frame[2], frame[3]);
		else
			return this.getComponentsPart(texture, frame);
	}



	throw new Error("Invalid key: " + key);

	return null;
}

/**
 * Check if a key exists.
 * @method keyExists
 */
Resources.prototype.keyExists = function(key) {
	if (!this.resources)
		return false;

	if (this.resources.graphics.hasOwnProperty(key) && 
		this.resources.graphics[key].texture)
		return true;

	if (this.resources.positions.hasOwnProperty(key))
		return true;

	if (this.resources.colors.hasOwnProperty(key))
		return true;

	if (this.resources.values.hasOwnProperty(key))
		return true;

	return false;
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


	if ((this.resources != null) && (this.resources.graphics[key] != null)) {
		value = this.resources.graphics[key];
	}

	if (value.texture != null) {
		texture = value.texture;
	}

	if (value.coords != null) {
		frame = value.coords;
	}

	if (texture != null) {
		if (frame != null)
			return this.getDOMComponentsPart(texture, frame[0], frame[1], frame[2], frame[3]);
		else
			return this.getDOMComponentsPart(texture, frame);
	}


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

	if (x === null) {
		frame = {
			x: 0,
			y: 0,
			width: texture.width,
			height: texture.height
		};
	} else {
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
	dom.src = dom.src + "?__timestamp__=" + Date.now();

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

	if ((this.resources != null) && (this.resources.graphics.textures != null)) {
		for (var i = 0; i < this.resources.graphics.textures.length; i++) {
			if (this.resources.graphics.textures[i].id == textureid) {
				textureObject = this.resources.graphics.textures[i];
			}
		}
	}

	if (textureObject == null) {
		throw new Error("textureid doesn't exist: " + textureid);
	}

	if (this.textures[textureObject.id] == null)
		this.textures[textureObject.id] = new PIXI.Texture.fromImage(textureObject.file);

	return this.textures[textureObject.id];
}

/**
 * @class Resources.JsonLoader
 */
Resources.JsonLoader = function(url, crossorigin, noCache) {
	PIXI.JsonLoader.call(this, url + (noCache ? ("?timestamp=" + Date.now()) : ""), crossorigin);
	this.noCache = noCache;
};
Resources.JsonLoader.prototype = Object.create(PIXI.JsonLoader.prototype);
Resources.JsonLoader.prototype.constructor = Resources.JsonLoader;


/**
 * Invoke when JSON file is loaded
 *
 * @method onJSONLoaded
 * @private
 */
Resources.JsonLoader.prototype.onJSONLoaded = function() {

	if (!this.ajaxRequest.responseText) {
		this.onError();
		return;
	}

	try {
		this.json = JSON.parse(this.ajaxRequest.responseText);
	} catch (e) {
		console.log(this.ajaxRequest.responseText);

		this.json = {};
		this.errorMessage = "Unable to parse JSON";
		this.onError();
		//this.onLoaded();
		return;
	}

	if (this.json.frames) {
		// sprite sheet
		var scope = this;
		var textureUrl = this.baseUrl + this.json.meta.image + (this.noCache ? ("?__timestamp__=" + Date.now()) : "");
		var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
		var frameData = this.json.frames;

		this.texture = image.texture.baseTexture;
		image.addEventListener('loaded', function() {
			scope.onLoaded();
		});

		for (var i in frameData) {
			var rect = frameData[i].frame;

			if (rect) {
				PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {
					x: rect.x,
					y: rect.y,
					width: rect.w,
					height: rect.h
				});

				PIXI.TextureCache[i].crop = new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h);

				//  Check to see if the sprite is trimmed
				if (frameData[i].trimmed) {
					var actualSize = frameData[i].sourceSize;
					var realSize = frameData[i].spriteSourceSize;
					PIXI.TextureCache[i].trim = new PIXI.Rectangle(realSize.x, realSize.y, actualSize.w, actualSize.h);
				}
			}
		}

		image.load();

	} else if (this.json.bones) {
		// spine animation
		var spineJsonParser = new spine.SkeletonJson();
		var skeletonData = spineJsonParser.readSkeletonData(this.json);
		PIXI.AnimCache[this.url] = skeletonData;
		this.onLoaded();
	} else {
		this.onLoaded();
	}
};

module.exports = Resources;