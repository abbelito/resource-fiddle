var EventDispatcher = require("../utils/EventDispatcher");
var APIConnection = require("../utils/APIConnection");

function JsonEditor() {
	this.htmlElement = null;
	this.sendButton = null;
	this.iFrame = null;

	this.altDown = false;

	this.json = {};
};
JsonEditor.prototype.constructor = JsonEditor;
EventDispatcher.init(JsonEditor);


JsonEditor.prototype.init = function(container) {
	this.container = container;

	this.htmlElement = document.createElement("textarea");
	this.htmlElement.style.width = "100%";
	this.htmlElement.style.minHeight = "50%";
	this.htmlElement.style.maxHeight = "80%";
	this.container.appendChild(this.htmlElement);

	this.htmlElement.addEventListener("keyup", this.onKeyUp.bind(this));
	this.htmlElement.addEventListener("keydown", this.onKeyDown.bind(this));

	this.sendButton = document.createElement("input");
	this.sendButton.setAttribute("type", "button");
	this.sendButton.setAttribute("value", "Save");
	this.sendButton.addEventListener("click", this.onSave.bind(this));
	this.container.appendChild(this.sendButton);


	var connection = new APIConnection();
	connection.on("loaded", this.onTexture, this);
	connection.load("getTexture", {session:"bajs"});
};

JsonEditor.prototype.setTextureJson = function(texturejson) {
	this.json = JSON.parse(this.htmlElement.value);
	console.log("document.location = " + document.location);
	for(var i = 0; i < texturejson.textures.length; i++) {
		texturejson.textures[i].file = document.location + "php/" + texturejson.textures[i].file;
	}
	this.json.graphics = texturejson;
	this.htmlElement.value = this.beautify(this.json);
	this.onSave();
};

JsonEditor.prototype.getJson = function() {
	try {
		this.json = JSON.parse(this.htmlElement.value);
	}
	catch(error) {
		console.warn("failed to parse json in JsonEditor.prototype.getJson. Error: ", error);
	}
	return this.json;
};

JsonEditor.prototype.onSave = function() {
	try {
		var json = JSON.parse(this.htmlElement.value);
		var connection = new APIConnection();
		connection.on("loaded", this.onSaved, this);
		connection.load("save", {session:"bajs", json: this.htmlElement.value});
	}
	catch(error) {
		alert("Invalid json");
	}
};

JsonEditor.prototype.onTexture = function(data) {
	var connection = data.connection;
	var json = data.json;
	connection.off("loaded", this.onTexture, this);

	this.json = json;

	this.htmlElement.value = this.beautify(this.json);
	console.log("onTexture, json = ", this.json);

	this.trigger("loaded");
};

JsonEditor.prototype.onSaved = function(data) {
	var connection = data.connection;
	var json = data.json;
	connection.off("loaded", this.onSaved, this);
	console.log("onSaved, json = ", json);
	this.trigger("saved");
};

JsonEditor.prototype.onKeyUp = function(event) {

	switch(event.keyCode) {
		case 91: {

			this.altDown = false;
			break;
		}
	}
};

JsonEditor.prototype.onKeyDown = function(event) {
	switch(event.keyCode) {
		case 9: {
			this.insertAtCursor("\t");
			event.preventDefault();
			break;
		}
		case 91: {
			this.altDown = true;
			break;
		}
		case 83: {
			if(this.altDown == true) {
				event.preventDefault();
				this.onSave();
			}
			break;
		}
	}
};

JsonEditor.prototype.insertAtCursor = function(myValue) {
	console.log("this.htmlElement.selectionStart = " + this.htmlElement.selectionStart);
	//IE support
    if (document.selection) {
        this.htmlElement.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (this.htmlElement.selectionStart || this.htmlElement.selectionStart == '0') {
        var startPos = this.htmlElement.selectionStart;
        var endPos = this.htmlElement.selectionEnd;
        this.htmlElement.value = this.htmlElement.value.substring(0, startPos)
            + myValue
            + this.htmlElement.value.substring(endPos, this.htmlElement.value.length);
        this.htmlElement.selectionStart = endPos+1;
        this.htmlElement.selectionEnd = endPos+1;
    } else {
        this.htmlElement.value += myValue;
    }
};

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

JsonEditor.prototype.insertTabs = function(num) {
	if(num < 0)
		num = 0;
	var str = "";
	for(var i = 0; i < num; i++) {
		str += "\t";
	}
	return str;
};

JsonEditor.prototype.beautify = function(json) {
	var jsonString = JSON.stringify(json);
	//console.log("JsonEditor.prototype.beautify before: ", jsonString);
	var numTabs = 0;
	for(var i = 0; i < jsonString.length; i++) {
		switch(jsonString[i]) {
			case "[":
			case "{": {
				numTabs++;
				jsonString = jsonString.splice(i+1, 0, "\n" + this.insertTabs(numTabs));
				break;
			}
			case "}":
			case "]": {
				/*
				if((jsonString[i-1] == "}") || (jsonString[i-1] == "]")) {
					numTabs--;
					jsonString = jsonString.splice(i, 0, "\n" + this.insertTabs(numTabs));
				}
				else if((jsonString[i+1] != ",") || (jsonString[i+1] == "]")) {
					numTabs--;
					jsonString = jsonString.splice(i, 0, "\n" + this.insertTabs(numTabs));
				}*/
				numTabs--;
				jsonString = jsonString.splice(i, 0, "\n" + this.insertTabs(numTabs));
				i += 1+numTabs;
				break;
			}
			case ",": {
				jsonString = jsonString.splice(i+1, 0, "\n" + this.insertTabs(numTabs));
				break;
			}
			case ":": {
				//jsonString = jsonString.splice(i+1, 0, " ");
				break;
			}
		}
	}
	//console.log("JsonEditor.prototype.beautify after: ", jsonString);

	return jsonString;
};



module.exports = JsonEditor;