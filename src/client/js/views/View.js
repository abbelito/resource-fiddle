function View(elementType, className) {
	this._domElement = document.createElement(elementType ? elementType : View.Div);
	this._frame = {
		x:0, 
		y: 0,
		width: 0,
		height: 0
	};
	this._domElement.style.position = "absolute";

	this.isRoot = false;

	this._domElement.className = className ? className : "View";

	this.parent = null;
	this.children = new Array();

};
View.prototype.constructor = View;

View.Image = "img";
View.Input = "input";
View.Div = "div";
View.Span = "span";
View.IFrame = "iframe";

View.prototype.getElement = function() {
	return this._domElement;
};

View.prototype.isOnStage = function() {
	if(this.parent != null) {
		return this.parent.isOnStage();
	}
	if(this.isRoot == true) {
		return true;
	}
	return false;
};

View.prototype.addChild = function(childView) {
	childView.parent = this;
	this.children.push(childView);
	this._domElement.appendChild(childView._domElement);
	if(this.isOnStage() == true) {
		var b = childView.height + childView.width;
		childView.addedToStage();
	}
};

View.prototype.addedToStage = function() {
	for(var i = 0; i < this.children.length; i++) {
		this.children[i].addedToStage();
	}
};

View.prototype.removeChild = function(childView) {
	var index = this.children.indexOf(childView);
	if(index != -1) {
		childView.parent = null;
		this._domElement.removeChild(childView._domElement);
		this.children.splice(index, 1);
	}
	else {
		throw new Error("Trying to remove an element that wasn't a child");
	}
};

View.prototype.show = function() {
	this._domElement.style.display = "inline-block";
};

View.prototype.hide = function() {
	this._domElement.style.display = "none";
};

View.prototype.isVisible = function() {
	return this._domElement.style.display != "none";
};

View.prototype.updateLayout = function(width, height) {
	throw new Error("updateLayout not implemented!");
};

/**
 * Setter and Getter for x position
 * @property x 
 * @type float
 */
Object.defineProperty(View.prototype, "x", {
	get: function() {
		return this._frame.x; 
	},
	set: function(x) { 
		this._frame.x = x;
		this._domElement.style.left = x + "px";
	}
});

/**
 * Setter and Getter for y position
 * @property y  
 * @type float
 */
Object.defineProperty(View.prototype, "y", {
	get: function() {
		return this._frame.y; 
	},
	set: function(y) { 
		this._frame.y = y;
		this._domElement.style.top = y + "px";
	}
});

/**
 * Setter and Getter for width
 * @property width
 * @type float
 */
Object.defineProperty(View.prototype, "width", {
	get: function() {
		var w = this._frame.width;
		this.width = this._domElement.clientWidth;
		for(var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if((child.x + child.width) > w) {
				w = child.x + child.width;
			}
		}
		if(w > this._domElement.clientWidth) {
			this.width = w;
		}
		return w 
	},
	set: function(width) { 
		if(this.isOnStage()) {
			if((typeof width) == "string") {
				this._domElement.style.width = width;
			}
			else {
				this._domElement.style.width = width + "px";
			}
		}
		this._frame.width = width;
	}
});

/**
 * Setter and Getter for height position
 * @property height 
 * @type float
 */
Object.defineProperty(View.prototype, "height", {
	get: function() {
		var h = this._frame.height;
		this.height = this._domElement.clientHeight;
		for(var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			if((child.y + child.height) > h) {
				h = child.y + child.height;
			}
		}
		if(h > this._domElement.clientHeight) {
			this.height = h;
		}
		return h; 
	},
	set: function(height) { 
		if(this.isOnStage()) {
			if((typeof height) == "string") {
				this._domElement.style.height = height;
			}
			else {
				this._domElement.style.height = height + "px";
			}
		}
		this._frame.height = height;
	}
});

/**
 * Setter and Getter for background color
 * @property height 
 * @type float
 */
Object.defineProperty(View.prototype, "background", {
	get: function() {
		return this._domElement.style.background; 
	},
	set: function(background) { 
		this._domElement.style.background = background;
	}
});

/**
 * Setter and Getter for color
 * @property height 
 * @type float
 */
Object.defineProperty(View.prototype, "color", {
	get: function() {
		return this._domElement.style.color; 
	},
	set: function(color) { 
		this._domElement.style.color = color;
	}
});


module.exports = View;