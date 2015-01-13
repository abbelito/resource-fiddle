var inherits = require("inherits");
var xnode = require("xnode");
var EventDispatcher = require("yaed");

/**
 * View and edit the value of an image.
 * @method ResourceImageValueView
 */
function ResourceImageValueView() {
	xnode.Div.call(this);

	this.defaultImage = new xnode.Img();
	this.defaultImage.style.position = "absolute";
	this.defaultImage.style.top = "10px";
	this.defaultImage.style.height = "30px";
	this.defaultImage.style.width = "auto";
	this.appendChild(this.defaultImage);

	this.valueImage = new xnode.Img();
	this.valueImage.style.position = "absolute";
	this.valueImage.style.top = "10px";
	this.valueImage.style.height = "30px";
	this.valueImage.style.width = "auto";
	this.valueImage.style.left = "calc(50% - 10px)";
	this.appendChild(this.valueImage);

	this.uploadInput = new xnode.Input();
	this.uploadInput.type = "file";
	this.uploadInput.style.position = "absolute";
	this.uploadInput.style.zIndex = 2;
	this.uploadInput.style.opacity = 0;
	this.uploadInput.style.width = "100%";
	this.uploadInput.style.height = "100%";
	this.uploadInput.on("change", this.onUploadInputChange.bind(this));

	this.uploadButton = new xnode.Div();
	this.uploadButton.className = "ui icon button mini";

	this.uploadIcon = new xnode.I();
	this.uploadIcon.className = "upload icon";
	this.uploadButton.appendChild(this.uploadIcon);

	this.uploadDiv = new xnode.Div();
	this.uploadDiv.appendChild(this.uploadInput);
	this.uploadDiv.appendChild(this.uploadButton);
	this.uploadDiv.style.position = "absolute";
	this.uploadDiv.style.top = "13px";
	this.uploadDiv.style.right = "10px";
	this.uploadDiv.style.overflow = "hidden";

	this.appendChild(this.uploadDiv);
}

inherits(ResourceImageValueView, xnode.Div);
EventDispatcher.init(ResourceImageValueView);

/**
 * Set url of the image to be shown as default
 * @method setDefaultValue
 */
ResourceImageValueView.prototype.setDefaultValue = function(defaultValue) {
	//console.log("setting default value: " + defaultValue);

	if (defaultValue) {
		this.defaultImage.src = defaultValue;
		this.defaultImage.style.display = "inline";
	} else {
		this.defaultImage.style.display = "none";
	}
}

/**
 * Set url of image to appear as value.
 * @method setValue
 */
ResourceImageValueView.prototype.setValue = function(value) {
	if (value) {
		this.valueImage.src = value;
		this.valueImage.style.display = "inline";
	} else {
		this.valueImage.style.display = "none";
	}
}

/**
 * File upload selected.
 * @meothd onUploadInputChange
 */
ResourceImageValueView.prototype.onUploadInputChange = function(e) {
	this.trigger("fileSelect");
}

/**
 * Get selected file for upload.
 * @method getSelectedFile
 */
ResourceImageValueView.prototype.getSelectedFile = function() {
	return this.uploadInput.files[0];
}

module.exports = ResourceImageValueView;