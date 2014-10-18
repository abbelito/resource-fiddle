var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function ImageView(obj) {
	View.call(this, View.Div, "ImageView");

	this.imageObject = null;
	this.noImage = null;
	if(obj != null) {
		this.getElement().appendChild(obj);		
		this.imageObject = obj;
	}
	else {
		this.noImage = new Image();
		this.noImage.src = "img/no_image.jpeg";
		this.getElement().appendChild(this.noImage);
		//this.imageObject = img;
	}
};
ClassUtils.extends(ImageView, View);

ImageView.prototype.addedToStage = function() {
	View.prototype.addedToStage.call(this);

	this.width = this.width;
	this.height = this.height;

	if(this.imageObject == null) {
		if(this.noImage != null) {
			this.noImage.style.width = this.width;
			this.noImage.style.height = this.height;
		}
		return;
	}

	var wdiff = 0;
	var hdiff = 0;
	if(this.width < this.imageObject.clientWidth) {
		wdiff = Math.abs(this.width - this.imageObject.clientWidth);
	}
	if(this.height < this.imageObject.clientHeight) {
		hdiff = Math.abs(this.height - this.imageObject.clientHeight);
	}
	var scale = 1;
	if(hdiff > wdiff) {
		scale = this.height / this.imageObject.clientHeight;
	}
	else if(hdiff < wdiff) {
		scale = this.width / this.imageObject.clientWidth;
	}
	else {
		this.imageObject.style.position = "absolute";
		this.imageObject.style.left = (this.width - this.imageObject.clientWidth)*0.5 + "px";
		this.imageObject.style.top = (this.height - this.imageObject.clientHeight)*0.5 + "px";
		return;
	}
	this.imageObject.style.msTransform = "scale("+scale+")";
	this.imageObject.style.transform = "scale("+scale+")";
	this.imageObject.style.webkitTransform = "scale("+scale+")";

	this.imageObject.style.position = "absolute";
	this.imageObject.style.left = (this.width - this.imageObject.clientWidth)*0.5 + "px";
	this.imageObject.style.top = (this.height - this.imageObject.clientHeight)*0.5 + "px";
};


module.exports = ImageView;