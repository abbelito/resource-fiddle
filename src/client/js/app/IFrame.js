function IFrame() {

};
IFrame.prototype.constructor = IFrame;

IFrame.prototype.init = function(targetContainer, targetURL) {	
	this.htmlElement = document.createElement("iframe");
	this.htmlElement.style.width = "100%";
	this.htmlElement.style.height = "100%";
	this.htmlElement.setAttribute("src", targetURL);
	targetContainer.appendChild(this.htmlElement);
};

module.exports = IFrame;