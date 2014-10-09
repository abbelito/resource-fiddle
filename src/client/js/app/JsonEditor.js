function JsonEditor() {

};
JsonEditor.prototype.constructor = JsonEditor;

JsonEditor.prototype.init = function(editorContainer) {
	this.htmlElement = document.createElement("textarea");
	this.htmlElement.style.width = "100%";
	this.htmlElement.style.minHeight = "50%";
	this.htmlElement.style.maxHeight = "80%";
	this.htmlElement.style.float = "left";
	editorContainer.appendChild(this.htmlElement);
};

module.exports = JsonEditor;