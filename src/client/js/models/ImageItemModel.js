var ResourceItemModel = require("./ResourceItemModel");
var inherits = require("inherits");
var HttpRequest = require("../utils/HttpRequest");

/**
 * ImageItemModel
 * @class ImageItemModel
 */
function ImageItemModel(key) {
	ResourceItemModel.call(this, key);

	this.defaultValue = null;
	this.value = null;
	this.uploadingFileName = null;
}

inherits(ImageItemModel, ResourceItemModel);

/**
 * Get default value.
 * @method getDefaultValue
 */
ImageItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Get customized value.
 * @method getValue
 */
ImageItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
ImageItemModel.prototype.setValue = function(value) {
	this.value = value;
	this.notifyChange();
}

/**
 * Get item type.
 * @method getItemType
 */
ImageItemModel.prototype.getItemType = function() {
	return "image";
}

/**
 * @method parseDefaultData
 */
ImageItemModel.prototype.parseDefaultData = function(data) {
	this.defaultValue = data;
}

ImageItemModel.prototype.parseData = function(data) {
	this.value = data.filename;

	if (this.value == this.defaultValue)
		this.value = null;
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
ImageItemModel.prototype.prepareSaveData = function(jsonData) {
	var filename = null;

	if (this.value)
		filename = this.value;

	else if (this.defaultValue)
		filename = this.defaultValue;

	jsonData.graphics[this.key] = {
		filename: filename
	};
}

/**
 * Upload file.
 * @method uploadFile
 */
ImageItemModel.prototype.uploadFile = function(fileSelection) {
	this.uploadingFileName = fileSelection.name;

	var httpRequest = new HttpRequest(window.location + "upload");
	httpRequest.setParameter("SelectedFile", fileSelection);
	httpRequest.perform().then(
		this.onFileUploadComplete.bind(this),
		this.onFileUploadError.bind(this)
	);
}

/**
 * File upload complete.
 */
ImageItemModel.prototype.onFileUploadComplete = function(res) {
	console.log("upload complete: " + this.uploadingFileName);

	this.setValue(this.uploadingFileName);
	this.uploadingFileName = null;
}

/**
 * File upload error.
 */
ImageItemModel.prototype.onFileUploadError = function(reason) {
	console.log("upload error: " + reason);
}

module.exports = ImageItemModel;