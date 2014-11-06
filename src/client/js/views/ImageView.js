var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function ImageView(basePath, obj) {
	View.call(this, View.Div, "ImageView");

	this.imageObject = null;
	this.noImage = null;
	if(obj != null) {
		this.getElement().appendChild(obj);		
		this.imageObject = obj;
	}
	else {
		this.imageObject = new Image();
		this.imageObject.src = basePath + "img/no_image.jpeg";
		this.getElement().appendChild(this.imageObject);
		//this.imageObject = img;
	}
};
ClassUtils.extends(ImageView, View);

ImageView.prototype.setTexture = function(texture) {
	this.getElement().removeChild(this.imageObject);
	this.imageObject = texture;
	this.getElement().appendChild(texture);
	this.updateLayout(this.w, this.h);
};

ImageView.prototype.updateLayout = function(width, height) {
	this.w = width;
	this.h = height;
	var w = this.imageObject.clientWidth == 0 ? this.imageObject.width : this.imageObject.clientWidth;
	var h = this.imageObject.clientHeight == 0 ? this.imageObject.height : this.imageObject.clientHeight;
	if((w == 0) || (h == 0)) {
		this.imageObject.onload = this.updateLayout.bind(this, width, height);
		return;
	}

	var wdiff = 0;
	var hdiff = 0;
	if(width < w) {
		wdiff = Math.abs(width - w);
	}
	if(height < h) {
		hdiff = Math.abs(height - h);
	}
	if((hdiff == 0) && (wdiff == 0)) {
		this.imageObject.style.position = "absolute";
		this.imageObject.style.left = (width - w)*0.5 + "px";
		this.imageObject.style.top = (height - h)*0.5 + "px";
		return;
	}

	var scale = 1;

	scale = height / h;
	if(scale*w > width) {
		scale = width / w;
	}
	this.imageObject.style.msTransform = "scale("+scale+")";
	this.imageObject.style.transform = "scale("+scale+")";
	this.imageObject.style.webkitTransform = "scale("+scale+")";

	this.imageObject.style.position = "absolute";
	this.imageObject.style.left = (width - w)*0.5 + "px";
	this.imageObject.style.top = (height - h)*0.5 + "px";

	this.width = width;
	this.height = height;
};


module.exports = ImageView;