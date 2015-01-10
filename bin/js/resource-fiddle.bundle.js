(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],2:[function(require,module,exports){
/**
 * @license
 * pixi.js - v1.6.0
 * Copyright (c) 2012-2014, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2014-07-18
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(){var a=this,b=b||{};b.WEBGL_RENDERER=0,b.CANVAS_RENDERER=1,b.VERSION="v1.6.1",b.blendModes={NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},b.scaleModes={DEFAULT:0,LINEAR:0,NEAREST:1},b._UID=0,"undefined"!=typeof Float32Array?(b.Float32Array=Float32Array,b.Uint16Array=Uint16Array):(b.Float32Array=Array,b.Uint16Array=Array),b.INTERACTION_FREQUENCY=30,b.AUTO_PREVENT_DEFAULT=!0,b.RAD_TO_DEG=180/Math.PI,b.DEG_TO_RAD=Math.PI/180,b.dontSayHello=!1,b.sayHello=function(a){if(!b.dontSayHello){if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var c=["%c %c %c Pixi.js "+b.VERSION+" - "+a+"  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ ","background: #ff66a5","background: #ff66a5","color: #ff66a5; background: #030307;","background: #ff66a5","background: #ffc3dc","background: #ff66a5","color: #ff2424; background: #fff","color: #ff2424; background: #fff","color: #ff2424; background: #fff"];console.log.apply(console,c)}else window.console&&console.log("Pixi.js "+b.VERSION+" - http://www.pixijs.com/");b.dontSayHello=!0}},b.Point=function(a,b){this.x=a||0,this.y=b||0},b.Point.prototype.clone=function(){return new b.Point(this.x,this.y)},b.Point.prototype.set=function(a,b){this.x=a||0,this.y=b||(0!==b?this.x:0)},b.Point.prototype.constructor=b.Point,b.Rectangle=function(a,b,c,d){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0},b.Rectangle.prototype.clone=function(){return new b.Rectangle(this.x,this.y,this.width,this.height)},b.Rectangle.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=this.x;if(a>=c&&a<=c+this.width){var d=this.y;if(b>=d&&b<=d+this.height)return!0}return!1},b.Rectangle.prototype.constructor=b.Rectangle,b.EmptyRectangle=new b.Rectangle(0,0,0,0),b.Polygon=function(a){if(a instanceof Array||(a=Array.prototype.slice.call(arguments)),"number"==typeof a[0]){for(var c=[],d=0,e=a.length;e>d;d+=2)c.push(new b.Point(a[d],a[d+1]));a=c}this.points=a},b.Polygon.prototype.clone=function(){for(var a=[],c=0;c<this.points.length;c++)a.push(this.points[c].clone());return new b.Polygon(a)},b.Polygon.prototype.contains=function(a,b){for(var c=!1,d=0,e=this.points.length-1;d<this.points.length;e=d++){var f=this.points[d].x,g=this.points[d].y,h=this.points[e].x,i=this.points[e].y,j=g>b!=i>b&&(h-f)*(b-g)/(i-g)+f>a;j&&(c=!c)}return c},b.Polygon.prototype.constructor=b.Polygon,b.Circle=function(a,b,c){this.x=a||0,this.y=b||0,this.radius=c||0},b.Circle.prototype.clone=function(){return new b.Circle(this.x,this.y,this.radius)},b.Circle.prototype.contains=function(a,b){if(this.radius<=0)return!1;var c=this.x-a,d=this.y-b,e=this.radius*this.radius;return c*=c,d*=d,e>=c+d},b.Circle.prototype.getBounds=function(){return new b.Rectangle(this.x-this.radius,this.y-this.radius,this.width,this.height)},b.Circle.prototype.constructor=b.Circle,b.Ellipse=function(a,b,c,d){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0},b.Ellipse.prototype.clone=function(){return new b.Ellipse(this.x,this.y,this.width,this.height)},b.Ellipse.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=(a-this.x)/this.width,d=(b-this.y)/this.height;return c*=c,d*=d,1>=c+d},b.Ellipse.prototype.getBounds=function(){return new b.Rectangle(this.x-this.width,this.y-this.height,this.width,this.height)},b.Ellipse.prototype.constructor=b.Ellipse,b.Matrix=function(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0},b.Matrix.prototype.fromArray=function(a){this.a=a[0],this.b=a[1],this.c=a[3],this.d=a[4],this.tx=a[2],this.ty=a[5]},b.Matrix.prototype.toArray=function(a){this.array||(this.array=new Float32Array(9));var b=this.array;return a?(b[0]=this.a,b[1]=this.c,b[2]=0,b[3]=this.b,b[4]=this.d,b[5]=0,b[6]=this.tx,b[7]=this.ty,b[8]=1):(b[0]=this.a,b[1]=this.b,b[2]=this.tx,b[3]=this.c,b[4]=this.d,b[5]=this.ty,b[6]=0,b[7]=0,b[8]=1),b},b.identityMatrix=new b.Matrix,b.determineMatrixArrayType=function(){return"undefined"!=typeof Float32Array?Float32Array:Array},b.Matrix2=b.determineMatrixArrayType(),b.DisplayObject=function(){this.position=new b.Point,this.scale=new b.Point(1,1),this.pivot=new b.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.hitArea=null,this.buttonMode=!1,this.renderable=!1,this.parent=null,this.stage=null,this.worldAlpha=1,this._interactive=!1,this.defaultCursor="pointer",this.worldTransform=new b.Matrix,this.color=[],this.dynamic=!0,this._sr=0,this._cr=1,this.filterArea=null,this._bounds=new b.Rectangle(0,0,1,1),this._currentBounds=null,this._mask=null,this._cacheAsBitmap=!1,this._cacheIsDirty=!1},b.DisplayObject.prototype.constructor=b.DisplayObject,b.DisplayObject.prototype.setInteractive=function(a){this.interactive=a},Object.defineProperty(b.DisplayObject.prototype,"interactive",{get:function(){return this._interactive},set:function(a){this._interactive=a,this.stage&&(this.stage.dirty=!0)}}),Object.defineProperty(b.DisplayObject.prototype,"worldVisible",{get:function(){var a=this;do{if(!a.visible)return!1;a=a.parent}while(a);return!0}}),Object.defineProperty(b.DisplayObject.prototype,"mask",{get:function(){return this._mask},set:function(a){this._mask&&(this._mask.isMask=!1),this._mask=a,this._mask&&(this._mask.isMask=!0)}}),Object.defineProperty(b.DisplayObject.prototype,"filters",{get:function(){return this._filters},set:function(a){if(a){for(var b=[],c=0;c<a.length;c++)for(var d=a[c].passes,e=0;e<d.length;e++)b.push(d[e]);this._filterBlock={target:this,filterPasses:b}}this._filters=a}}),Object.defineProperty(b.DisplayObject.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(a){this._cacheAsBitmap!==a&&(a?this._generateCachedSprite():this._destroyCachedSprite(),this._cacheAsBitmap=a)}}),b.DisplayObject.prototype.updateTransform=function(){this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation));var a=this.parent.worldTransform,b=this.worldTransform,c=this.pivot.x,d=this.pivot.y,e=this._cr*this.scale.x,f=-this._sr*this.scale.y,g=this._sr*this.scale.x,h=this._cr*this.scale.y,i=this.position.x-e*c-d*f,j=this.position.y-h*d-c*g,k=a.a,l=a.b,m=a.c,n=a.d;b.a=k*e+l*g,b.b=k*f+l*h,b.tx=k*i+l*j+a.tx,b.c=m*e+n*g,b.d=m*f+n*h,b.ty=m*i+n*j+a.ty,this.worldAlpha=this.alpha*this.parent.worldAlpha},b.DisplayObject.prototype.getBounds=function(a){return a=a,b.EmptyRectangle},b.DisplayObject.prototype.getLocalBounds=function(){return this.getBounds(b.identityMatrix)},b.DisplayObject.prototype.setStageReference=function(a){this.stage=a,this._interactive&&(this.stage.dirty=!0)},b.DisplayObject.prototype.generateTexture=function(a){var c=this.getLocalBounds(),d=new b.RenderTexture(0|c.width,0|c.height,a);return d.render(this,new b.Point(-c.x,-c.y)),d},b.DisplayObject.prototype.updateCache=function(){this._generateCachedSprite()},b.DisplayObject.prototype._renderCachedSprite=function(a){this._cachedSprite.worldAlpha=this.worldAlpha,a.gl?b.Sprite.prototype._renderWebGL.call(this._cachedSprite,a):b.Sprite.prototype._renderCanvas.call(this._cachedSprite,a)},b.DisplayObject.prototype._generateCachedSprite=function(){this._cacheAsBitmap=!1;var a=this.getLocalBounds();if(this._cachedSprite)this._cachedSprite.texture.resize(0|a.width,0|a.height);else{var c=new b.RenderTexture(0|a.width,0|a.height);this._cachedSprite=new b.Sprite(c),this._cachedSprite.worldTransform=this.worldTransform}var d=this._filters;this._filters=null,this._cachedSprite.filters=d,this._cachedSprite.texture.render(this,new b.Point(-a.x,-a.y)),this._cachedSprite.anchor.x=-(a.x/a.width),this._cachedSprite.anchor.y=-(a.y/a.height),this._filters=d,this._cacheAsBitmap=!0},b.DisplayObject.prototype._destroyCachedSprite=function(){this._cachedSprite&&(this._cachedSprite.texture.destroy(!0),this._cachedSprite=null)},b.DisplayObject.prototype._renderWebGL=function(a){a=a},b.DisplayObject.prototype._renderCanvas=function(a){a=a},Object.defineProperty(b.DisplayObject.prototype,"x",{get:function(){return this.position.x},set:function(a){this.position.x=a}}),Object.defineProperty(b.DisplayObject.prototype,"y",{get:function(){return this.position.y},set:function(a){this.position.y=a}}),b.DisplayObjectContainer=function(){b.DisplayObject.call(this),this.children=[]},b.DisplayObjectContainer.prototype=Object.create(b.DisplayObject.prototype),b.DisplayObjectContainer.prototype.constructor=b.DisplayObjectContainer,Object.defineProperty(b.DisplayObjectContainer.prototype,"width",{get:function(){return this.scale.x*this.getLocalBounds().width},set:function(a){var b=this.getLocalBounds().width;this.scale.x=0!==b?a/(b/this.scale.x):1,this._width=a}}),Object.defineProperty(b.DisplayObjectContainer.prototype,"height",{get:function(){return this.scale.y*this.getLocalBounds().height},set:function(a){var b=this.getLocalBounds().height;this.scale.y=0!==b?a/(b/this.scale.y):1,this._height=a}}),b.DisplayObjectContainer.prototype.addChild=function(a){return this.addChildAt(a,this.children.length)},b.DisplayObjectContainer.prototype.addChildAt=function(a,b){if(b>=0&&b<=this.children.length)return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),this.stage&&a.setStageReference(this.stage),a;throw new Error(a+" The index "+b+" supplied is out of bounds "+this.children.length)},b.DisplayObjectContainer.prototype.swapChildren=function(a,b){if(a!==b){var c=this.children.indexOf(a),d=this.children.indexOf(b);if(0>c||0>d)throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");this.children[c]=b,this.children[d]=a}},b.DisplayObjectContainer.prototype.getChildAt=function(a){if(a>=0&&a<this.children.length)return this.children[a];throw new Error("Supplied index does not exist in the child list, or the supplied DisplayObject must be a child of the caller")},b.DisplayObjectContainer.prototype.removeChild=function(a){return this.removeChildAt(this.children.indexOf(a))},b.DisplayObjectContainer.prototype.removeChildAt=function(a){var b=this.getChildAt(a);return this.stage&&b.removeStageReference(),b.parent=void 0,this.children.splice(a,1),b},b.DisplayObjectContainer.prototype.removeChildren=function(a,b){var c=a||0,d="number"==typeof b?b:this.children.length,e=d-c;if(e>0&&d>=e){for(var f=this.children.splice(c,e),g=0;g<f.length;g++){var h=f[g];this.stage&&h.removeStageReference(),h.parent=void 0}return f}throw new Error("Range Error, numeric values are outside the acceptable range")},b.DisplayObjectContainer.prototype.updateTransform=function(){if(this.visible&&(b.DisplayObject.prototype.updateTransform.call(this),!this._cacheAsBitmap))for(var a=0,c=this.children.length;c>a;a++)this.children[a].updateTransform()},b.DisplayObjectContainer.prototype.getBounds=function(a){if(0===this.children.length)return b.EmptyRectangle;if(a){var c=this.worldTransform;this.worldTransform=a,this.updateTransform(),this.worldTransform=c}for(var d,e,f,g=1/0,h=1/0,i=-1/0,j=-1/0,k=!1,l=0,m=this.children.length;m>l;l++){var n=this.children[l];n.visible&&(k=!0,d=this.children[l].getBounds(a),g=g<d.x?g:d.x,h=h<d.y?h:d.y,e=d.width+d.x,f=d.height+d.y,i=i>e?i:e,j=j>f?j:f)}if(!k)return b.EmptyRectangle;var o=this._bounds;return o.x=g,o.y=h,o.width=i-g,o.height=j-h,o},b.DisplayObjectContainer.prototype.getLocalBounds=function(){var a=this.worldTransform;this.worldTransform=b.identityMatrix;for(var c=0,d=this.children.length;d>c;c++)this.children[c].updateTransform();var e=this.getBounds();return this.worldTransform=a,e},b.DisplayObjectContainer.prototype.setStageReference=function(a){this.stage=a,this._interactive&&(this.stage.dirty=!0);for(var b=0,c=this.children.length;c>b;b++){var d=this.children[b];d.setStageReference(a)}},b.DisplayObjectContainer.prototype.removeStageReference=function(){for(var a=0,b=this.children.length;b>a;a++){var c=this.children[a];c.removeStageReference()}this._interactive&&(this.stage.dirty=!0),this.stage=null},b.DisplayObjectContainer.prototype._renderWebGL=function(a){if(this.visible&&!(this.alpha<=0)){if(this._cacheAsBitmap)return this._renderCachedSprite(a),void 0;var b,c;if(this._mask||this._filters){for(this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a);a.spriteBatch.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),a.spriteBatch.start()}else for(b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a)}},b.DisplayObjectContainer.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){if(this._cacheAsBitmap)return this._renderCachedSprite(a),void 0;this._mask&&a.maskManager.pushMask(this._mask,a.context);for(var b=0,c=this.children.length;c>b;b++){var d=this.children[b];d._renderCanvas(a)}this._mask&&a.maskManager.popMask(a.context)}},b.Sprite=function(a){b.DisplayObjectContainer.call(this),this.anchor=new b.Point,this.texture=a,this._width=0,this._height=0,this.tint=16777215,this.blendMode=b.blendModes.NORMAL,a.baseTexture.hasLoaded?this.onTextureUpdate():(this.onTextureUpdateBind=this.onTextureUpdate.bind(this),this.texture.addEventListener("update",this.onTextureUpdateBind)),this.renderable=!0},b.Sprite.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Sprite.prototype.constructor=b.Sprite,Object.defineProperty(b.Sprite.prototype,"width",{get:function(){return this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(b.Sprite.prototype,"height",{get:function(){return this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),b.Sprite.prototype.setTexture=function(a){this.texture=a,this.cachedTint=16777215},b.Sprite.prototype.onTextureUpdate=function(){this._width&&(this.scale.x=this._width/this.texture.frame.width),this._height&&(this.scale.y=this._height/this.texture.frame.height)},b.Sprite.prototype.getBounds=function(a){var b=this.texture.frame.width,c=this.texture.frame.height,d=b*(1-this.anchor.x),e=b*-this.anchor.x,f=c*(1-this.anchor.y),g=c*-this.anchor.y,h=a||this.worldTransform,i=h.a,j=h.c,k=h.b,l=h.d,m=h.tx,n=h.ty,o=i*e+k*g+m,p=l*g+j*e+n,q=i*d+k*g+m,r=l*g+j*d+n,s=i*d+k*f+m,t=l*f+j*d+n,u=i*e+k*f+m,v=l*f+j*e+n,w=-1/0,x=-1/0,y=1/0,z=1/0;y=y>o?o:y,y=y>q?q:y,y=y>s?s:y,y=y>u?u:y,z=z>p?p:z,z=z>r?r:z,z=z>t?t:z,z=z>v?v:z,w=o>w?o:w,w=q>w?q:w,w=s>w?s:w,w=u>w?u:w,x=p>x?p:x,x=r>x?r:x,x=t>x?t:x,x=v>x?v:x;var A=this._bounds;return A.x=y,A.width=w-y,A.y=z,A.height=x-z,this._currentBounds=A,A},b.Sprite.prototype._renderWebGL=function(a){if(this.visible&&!(this.alpha<=0)){var b,c;if(this._mask||this._filters){var d=a.spriteBatch;for(this._filters&&(d.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(d.stop(),a.maskManager.pushMask(this.mask,a),d.start()),d.render(this),b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a);d.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),d.start()}else for(a.spriteBatch.render(this),b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a)}},b.Sprite.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){if(this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,a.context.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]),this._mask&&a.maskManager.pushMask(this._mask,a.context),this.texture.valid){a.context.globalAlpha=this.worldAlpha,a.roundPixels?a.context.setTransform(this.worldTransform.a,this.worldTransform.c,this.worldTransform.b,this.worldTransform.d,0|this.worldTransform.tx,0|this.worldTransform.ty):a.context.setTransform(this.worldTransform.a,this.worldTransform.c,this.worldTransform.b,this.worldTransform.d,this.worldTransform.tx,this.worldTransform.ty),a.smoothProperty&&a.scaleMode!==this.texture.baseTexture.scaleMode&&(a.scaleMode=this.texture.baseTexture.scaleMode,a.context[a.smoothProperty]=a.scaleMode===b.scaleModes.LINEAR);var c=this.texture.trim?this.texture.trim.x-this.anchor.x*this.texture.trim.width:this.anchor.x*-this.texture.frame.width,d=this.texture.trim?this.texture.trim.y-this.anchor.y*this.texture.trim.height:this.anchor.y*-this.texture.frame.height;16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=b.CanvasTinter.getTintedTexture(this,this.tint)),a.context.drawImage(this.tintedTexture,0,0,this.texture.crop.width,this.texture.crop.height,c,d,this.texture.crop.width,this.texture.crop.height)):a.context.drawImage(this.texture.baseTexture.source,this.texture.crop.x,this.texture.crop.y,this.texture.crop.width,this.texture.crop.height,c,d,this.texture.crop.width,this.texture.crop.height)}for(var e=0,f=this.children.length;f>e;e++)this.children[e]._renderCanvas(a);this._mask&&a.maskManager.popMask(a.context)}},b.Sprite.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache'+this);return new b.Sprite(c)},b.Sprite.fromImage=function(a,c,d){var e=b.Texture.fromImage(a,c,d);return new b.Sprite(e)},b.SpriteBatch=function(a){b.DisplayObjectContainer.call(this),this.textureThing=a,this.ready=!1},b.SpriteBatch.prototype=Object.create(b.DisplayObjectContainer.prototype),b.SpriteBatch.constructor=b.SpriteBatch,b.SpriteBatch.prototype.initWebGL=function(a){this.fastSpriteBatch=new b.WebGLFastSpriteBatch(a),this.ready=!0},b.SpriteBatch.prototype.updateTransform=function(){b.DisplayObject.prototype.updateTransform.call(this)},b.SpriteBatch.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||!this.children.length||(this.ready||this.initWebGL(a.gl),a.spriteBatch.stop(),a.shaderManager.setShader(a.shaderManager.fastShader),this.fastSpriteBatch.begin(this,a),this.fastSpriteBatch.render(this),a.spriteBatch.start())},b.SpriteBatch.prototype._renderCanvas=function(a){var c=a.context;c.globalAlpha=this.worldAlpha,b.DisplayObject.prototype.updateTransform.call(this);for(var d=this.worldTransform,e=!0,f=0;f<this.children.length;f++){var g=this.children[f];if(g.visible){var h=g.texture,i=h.frame;if(c.globalAlpha=this.worldAlpha*g.alpha,g.rotation%(2*Math.PI)===0)e&&(c.setTransform(d.a,d.c,d.b,d.d,d.tx,d.ty),e=!1),c.drawImage(h.baseTexture.source,i.x,i.y,i.width,i.height,g.anchor.x*-i.width*g.scale.x+g.position.x+.5|0,g.anchor.y*-i.height*g.scale.y+g.position.y+.5|0,i.width*g.scale.x,i.height*g.scale.y);else{e||(e=!0),b.DisplayObject.prototype.updateTransform.call(g);var j=g.worldTransform;a.roundPixels?c.setTransform(j.a,j.c,j.b,j.d,0|j.tx,0|j.ty):c.setTransform(j.a,j.c,j.b,j.d,j.tx,j.ty),c.drawImage(h.baseTexture.source,i.x,i.y,i.width,i.height,g.anchor.x*-i.width+.5|0,g.anchor.y*-i.height+.5|0,i.width,i.height)}}}},b.MovieClip=function(a){b.Sprite.call(this,a[0]),this.textures=a,this.animationSpeed=1,this.loop=!0,this.onComplete=null,this.currentFrame=0,this.playing=!1},b.MovieClip.prototype=Object.create(b.Sprite.prototype),b.MovieClip.prototype.constructor=b.MovieClip,Object.defineProperty(b.MovieClip.prototype,"totalFrames",{get:function(){return this.textures.length}}),b.MovieClip.prototype.stop=function(){this.playing=!1},b.MovieClip.prototype.play=function(){this.playing=!0},b.MovieClip.prototype.gotoAndStop=function(a){this.playing=!1,this.currentFrame=a;var b=this.currentFrame+.5|0;this.setTexture(this.textures[b%this.textures.length])},b.MovieClip.prototype.gotoAndPlay=function(a){this.currentFrame=a,this.playing=!0},b.MovieClip.prototype.updateTransform=function(){if(b.Sprite.prototype.updateTransform.call(this),this.playing){this.currentFrame+=this.animationSpeed;var a=this.currentFrame+.5|0;this.currentFrame=this.currentFrame%this.textures.length,this.loop||a<this.textures.length?this.setTexture(this.textures[a%this.textures.length]):a>=this.textures.length&&(this.gotoAndStop(this.textures.length-1),this.onComplete&&this.onComplete())}},b.MovieClip.fromFrames=function(a){for(var c=[],d=0;d<a.length;d++)c.push(new b.Texture.fromFrame(a[d]));return new b.MovieClip(c)},b.MovieClip.fromImages=function(a){for(var c=[],d=0;d<a.length;d++)c.push(new b.Texture.fromImage(a[d]));return new b.MovieClip(c)},b.FilterBlock=function(){this.visible=!0,this.renderable=!0},b.Text=function(a,c){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),b.Sprite.call(this,b.Texture.fromCanvas(this.canvas)),this.setText(a),this.setStyle(c)},b.Text.prototype=Object.create(b.Sprite.prototype),b.Text.prototype.constructor=b.Text,Object.defineProperty(b.Text.prototype,"width",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(b.Text.prototype,"height",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),b.Text.prototype.setStyle=function(a){a=a||{},a.font=a.font||"bold 20pt Arial",a.fill=a.fill||"black",a.align=a.align||"left",a.stroke=a.stroke||"black",a.strokeThickness=a.strokeThickness||0,a.wordWrap=a.wordWrap||!1,a.wordWrapWidth=a.wordWrapWidth||100,a.wordWrapWidth=a.wordWrapWidth||100,a.dropShadow=a.dropShadow||!1,a.dropShadowAngle=a.dropShadowAngle||Math.PI/6,a.dropShadowDistance=a.dropShadowDistance||4,a.dropShadowColor=a.dropShadowColor||"black",this.style=a,this.dirty=!0},b.Text.prototype.setText=function(a){this.text=a.toString()||" ",this.dirty=!0},b.Text.prototype.updateText=function(){this.context.font=this.style.font;var a=this.text;this.style.wordWrap&&(a=this.wordWrap(this.text));for(var b=a.split(/(?:\r\n|\r|\n)/),c=[],d=0,e=0;e<b.length;e++){var f=this.context.measureText(b[e]).width;c[e]=f,d=Math.max(d,f)}var g=d+this.style.strokeThickness;this.style.dropShadow&&(g+=this.style.dropShadowDistance),this.canvas.width=g+this.context.lineWidth;var h=this.determineFontHeight("font: "+this.style.font+";")+this.style.strokeThickness,i=h*b.length;this.style.dropShadow&&(i+=this.style.dropShadowDistance),this.canvas.height=i,navigator.isCocoonJS&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.font=this.style.font,this.context.strokeStyle=this.style.stroke,this.context.lineWidth=this.style.strokeThickness,this.context.textBaseline="top";var j,k;if(this.style.dropShadow){this.context.fillStyle=this.style.dropShadowColor;var l=Math.sin(this.style.dropShadowAngle)*this.style.dropShadowDistance,m=Math.cos(this.style.dropShadowAngle)*this.style.dropShadowDistance;for(e=0;e<b.length;e++)j=this.style.strokeThickness/2,k=this.style.strokeThickness/2+e*h,"right"===this.style.align?j+=d-c[e]:"center"===this.style.align&&(j+=(d-c[e])/2),this.style.fill&&this.context.fillText(b[e],j+l,k+m)}for(this.context.fillStyle=this.style.fill,e=0;e<b.length;e++)j=this.style.strokeThickness/2,k=this.style.strokeThickness/2+e*h,"right"===this.style.align?j+=d-c[e]:"center"===this.style.align&&(j+=(d-c[e])/2),this.style.stroke&&this.style.strokeThickness&&this.context.strokeText(b[e],j,k),this.style.fill&&this.context.fillText(b[e],j,k);this.updateTexture()},b.Text.prototype.updateTexture=function(){this.texture.baseTexture.width=this.canvas.width,this.texture.baseTexture.height=this.canvas.height,this.texture.crop.width=this.texture.frame.width=this.canvas.width,this.texture.crop.height=this.texture.frame.height=this.canvas.height,this._width=this.canvas.width,this._height=this.canvas.height,this.requiresUpdate=!0},b.Text.prototype._renderWebGL=function(a){this.requiresUpdate&&(this.requiresUpdate=!1,b.updateWebGLTexture(this.texture.baseTexture,a.gl)),b.Sprite.prototype._renderWebGL.call(this,a)},b.Text.prototype.updateTransform=function(){this.dirty&&(this.updateText(),this.dirty=!1),b.Sprite.prototype.updateTransform.call(this)},b.Text.prototype.determineFontHeight=function(a){var c=b.Text.heightCache[a];if(!c){var d=document.getElementsByTagName("body")[0],e=document.createElement("div"),f=document.createTextNode("M");e.appendChild(f),e.setAttribute("style",a+";position:absolute;top:0;left:0"),d.appendChild(e),c=e.offsetHeight,b.Text.heightCache[a]=c,d.removeChild(e)}return c},b.Text.prototype.wordWrap=function(a){for(var b="",c=a.split("\n"),d=0;d<c.length;d++){for(var e=this.style.wordWrapWidth,f=c[d].split(" "),g=0;g<f.length;g++){var h=this.context.measureText(f[g]).width,i=h+this.context.measureText(" ").width;0===g||i>e?(g>0&&(b+="\n"),b+=f[g],e=this.style.wordWrapWidth-h):(e-=i,b+=" "+f[g])}d<c.length-1&&(b+="\n")}return b},b.Text.prototype.destroy=function(a){this.context=null,this.canvas=null,this.texture.destroy(void 0===a?!0:a)},b.Text.heightCache={},b.BitmapText=function(a,c){b.DisplayObjectContainer.call(this),this._pool=[],this.setText(a),this.setStyle(c),this.updateText(),this.dirty=!1},b.BitmapText.prototype=Object.create(b.DisplayObjectContainer.prototype),b.BitmapText.prototype.constructor=b.BitmapText,b.BitmapText.prototype.setText=function(a){this.text=a||" ",this.dirty=!0},b.BitmapText.prototype.setStyle=function(a){a=a||{},a.align=a.align||"left",this.style=a;var c=a.font.split(" ");this.fontName=c[c.length-1],this.fontSize=c.length>=2?parseInt(c[c.length-2],10):b.BitmapText.fonts[this.fontName].size,this.dirty=!0,this.tint=a.tint},b.BitmapText.prototype.updateText=function(){for(var a=b.BitmapText.fonts[this.fontName],c=new b.Point,d=null,e=[],f=0,g=[],h=0,i=this.fontSize/a.size,j=0;j<this.text.length;j++){var k=this.text.charCodeAt(j);if(/(?:\r\n|\r|\n)/.test(this.text.charAt(j)))g.push(c.x),f=Math.max(f,c.x),h++,c.x=0,c.y+=a.lineHeight,d=null;else{var l=a.chars[k];l&&(d&&l[d]&&(c.x+=l.kerning[d]),e.push({texture:l.texture,line:h,charCode:k,position:new b.Point(c.x+l.xOffset,c.y+l.yOffset)}),c.x+=l.xAdvance,d=k)}}g.push(c.x),f=Math.max(f,c.x);var m=[];for(j=0;h>=j;j++){var n=0;"right"===this.style.align?n=f-g[j]:"center"===this.style.align&&(n=(f-g[j])/2),m.push(n)}var o=this.children.length,p=e.length,q=this.tint||16777215;for(j=0;p>j;j++){var r=o>j?this.children[j]:this._pool.pop();r?r.setTexture(e[j].texture):r=new b.Sprite(e[j].texture),r.position.x=(e[j].position.x+m[e[j].line])*i,r.position.y=e[j].position.y*i,r.scale.x=r.scale.y=i,r.tint=q,r.parent||this.addChild(r)}for(;this.children.length>p;){var s=this.getChildAt(this.children.length-1);this._pool.push(s),this.removeChild(s)}this.textWidth=f*i,this.textHeight=(c.y+a.lineHeight)*i},b.BitmapText.prototype.updateTransform=function(){this.dirty&&(this.updateText(),this.dirty=!1),b.DisplayObjectContainer.prototype.updateTransform.call(this)},b.BitmapText.fonts={},b.InteractionData=function(){this.global=new b.Point,this.target=null,this.originalEvent=null},b.InteractionData.prototype.getLocalPosition=function(a){var c=a.worldTransform,d=this.global,e=c.a,f=c.b,g=c.tx,h=c.c,i=c.d,j=c.ty,k=1/(e*i+f*-h);return new b.Point(i*k*d.x+-f*k*d.y+(j*f-g*i)*k,e*k*d.y+-h*k*d.x+(-j*e+g*h)*k)},b.InteractionData.prototype.constructor=b.InteractionData,b.InteractionManager=function(a){this.stage=a,this.mouse=new b.InteractionData,this.touchs={},this.tempPoint=new b.Point,this.mouseoverEnabled=!0,this.pool=[],this.interactiveItems=[],this.interactionDOMElement=null,this.onMouseMove=this.onMouseMove.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseOut=this.onMouseOut.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.last=0,this.currentCursorStyle="inherit",this.mouseOut=!1},b.InteractionManager.prototype.constructor=b.InteractionManager,b.InteractionManager.prototype.collectInteractiveSprite=function(a,b){for(var c=a.children,d=c.length,e=d-1;e>=0;e--){var f=c[e];f._interactive?(b.interactiveChildren=!0,this.interactiveItems.push(f),f.children.length>0&&this.collectInteractiveSprite(f,f)):(f.__iParent=null,f.children.length>0&&this.collectInteractiveSprite(f,b))}},b.InteractionManager.prototype.setTarget=function(a){this.target=a,null===this.interactionDOMElement&&this.setTargetDomElement(a.view)},b.InteractionManager.prototype.setTargetDomElement=function(a){this.removeEvents(),window.navigator.msPointerEnabled&&(a.style["-ms-content-zooming"]="none",a.style["-ms-touch-action"]="none"),this.interactionDOMElement=a,a.addEventListener("mousemove",this.onMouseMove,!0),a.addEventListener("mousedown",this.onMouseDown,!0),a.addEventListener("mouseout",this.onMouseOut,!0),a.addEventListener("touchstart",this.onTouchStart,!0),a.addEventListener("touchend",this.onTouchEnd,!0),a.addEventListener("touchmove",this.onTouchMove,!0),window.addEventListener("mouseup",this.onMouseUp,!0)},b.InteractionManager.prototype.removeEvents=function(){this.interactionDOMElement&&(this.interactionDOMElement.style["-ms-content-zooming"]="",this.interactionDOMElement.style["-ms-touch-action"]="",this.interactionDOMElement.removeEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.removeEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.removeEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.removeEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.removeEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.removeEventListener("touchmove",this.onTouchMove,!0),this.interactionDOMElement=null,window.removeEventListener("mouseup",this.onMouseUp,!0))},b.InteractionManager.prototype.update=function(){if(this.target){var a=Date.now(),c=a-this.last;if(c=c*b.INTERACTION_FREQUENCY/1e3,!(1>c)){this.last=a;var d=0;this.dirty&&this.rebuildInteractiveGraph();var e=this.interactiveItems.length,f="inherit",g=!1;for(d=0;e>d;d++){var h=this.interactiveItems[d];h.__hit=this.hitTest(h,this.mouse),this.mouse.target=h,h.__hit&&!g?(h.buttonMode&&(f=h.defaultCursor),h.interactiveChildren||(g=!0),h.__isOver||(h.mouseover&&h.mouseover(this.mouse),h.__isOver=!0)):h.__isOver&&(h.mouseout&&h.mouseout(this.mouse),h.__isOver=!1)}this.currentCursorStyle!==f&&(this.currentCursorStyle=f,this.interactionDOMElement.style.cursor=f)}}},b.InteractionManager.prototype.rebuildInteractiveGraph=function(){this.dirty=!1;for(var a=this.interactiveItems.length,b=0;a>b;b++)this.interactiveItems[b].interactiveChildren=!1;this.interactiveItems=[],this.stage.interactive&&this.interactiveItems.push(this.stage),this.collectInteractiveSprite(this.stage,this.stage)},b.InteractionManager.prototype.onMouseMove=function(a){this.dirty&&this.rebuildInteractiveGraph(),this.mouse.originalEvent=a||window.event;var b=this.interactionDOMElement.getBoundingClientRect();this.mouse.global.x=(a.clientX-b.left)*(this.target.width/b.width),this.mouse.global.y=(a.clientY-b.top)*(this.target.height/b.height);for(var c=this.interactiveItems.length,d=0;c>d;d++){var e=this.interactiveItems[d];e.mousemove&&e.mousemove(this.mouse)}},b.InteractionManager.prototype.onMouseDown=function(a){this.dirty&&this.rebuildInteractiveGraph(),this.mouse.originalEvent=a||window.event,b.AUTO_PREVENT_DEFAULT&&this.mouse.originalEvent.preventDefault();for(var c=this.interactiveItems.length,d=0;c>d;d++){var e=this.interactiveItems[d];if((e.mousedown||e.click)&&(e.__mouseIsDown=!0,e.__hit=this.hitTest(e,this.mouse),e.__hit&&(e.mousedown&&e.mousedown(this.mouse),e.__isDown=!0,!e.interactiveChildren)))break}},b.InteractionManager.prototype.onMouseOut=function(){this.dirty&&this.rebuildInteractiveGraph();var a=this.interactiveItems.length;this.interactionDOMElement.style.cursor="inherit";for(var b=0;a>b;b++){var c=this.interactiveItems[b];c.__isOver&&(this.mouse.target=c,c.mouseout&&c.mouseout(this.mouse),c.__isOver=!1)}this.mouseOut=!0,this.mouse.global.x=-1e4,this.mouse.global.y=-1e4},b.InteractionManager.prototype.onMouseUp=function(a){this.dirty&&this.rebuildInteractiveGraph(),this.mouse.originalEvent=a||window.event;
for(var b=this.interactiveItems.length,c=!1,d=0;b>d;d++){var e=this.interactiveItems[d];e.__hit=this.hitTest(e,this.mouse),e.__hit&&!c?(e.mouseup&&e.mouseup(this.mouse),e.__isDown&&e.click&&e.click(this.mouse),e.interactiveChildren||(c=!0)):e.__isDown&&e.mouseupoutside&&e.mouseupoutside(this.mouse),e.__isDown=!1}},b.InteractionManager.prototype.hitTest=function(a,c){var d=c.global;if(!a.worldVisible)return!1;var e=a instanceof b.Sprite,f=a.worldTransform,g=f.a,h=f.b,i=f.tx,j=f.c,k=f.d,l=f.ty,m=1/(g*k+h*-j),n=k*m*d.x+-h*m*d.y+(l*h-i*k)*m,o=g*m*d.y+-j*m*d.x+(-l*g+i*j)*m;if(c.target=a,a.hitArea&&a.hitArea.contains)return a.hitArea.contains(n,o)?(c.target=a,!0):!1;if(e){var p,q=a.texture.frame.width,r=a.texture.frame.height,s=-q*a.anchor.x;if(n>s&&s+q>n&&(p=-r*a.anchor.y,o>p&&p+r>o))return c.target=a,!0}for(var t=a.children.length,u=0;t>u;u++){var v=a.children[u],w=this.hitTest(v,c);if(w)return c.target=a,!0}return!1},b.InteractionManager.prototype.onTouchMove=function(a){this.dirty&&this.rebuildInteractiveGraph();var b,c=this.interactionDOMElement.getBoundingClientRect(),d=a.changedTouches,e=0;for(e=0;e<d.length;e++){var f=d[e];b=this.touchs[f.identifier],b.originalEvent=a||window.event,b.global.x=(f.clientX-c.left)*(this.target.width/c.width),b.global.y=(f.clientY-c.top)*(this.target.height/c.height),navigator.isCocoonJS&&(b.global.x=f.clientX,b.global.y=f.clientY);for(var g=0;g<this.interactiveItems.length;g++){var h=this.interactiveItems[g];h.touchmove&&h.__touchData&&h.__touchData[f.identifier]&&h.touchmove(b)}}},b.InteractionManager.prototype.onTouchStart=function(a){this.dirty&&this.rebuildInteractiveGraph();var c=this.interactionDOMElement.getBoundingClientRect();b.AUTO_PREVENT_DEFAULT&&a.preventDefault();for(var d=a.changedTouches,e=0;e<d.length;e++){var f=d[e],g=this.pool.pop();g||(g=new b.InteractionData),g.originalEvent=a||window.event,this.touchs[f.identifier]=g,g.global.x=(f.clientX-c.left)*(this.target.width/c.width),g.global.y=(f.clientY-c.top)*(this.target.height/c.height),navigator.isCocoonJS&&(g.global.x=f.clientX,g.global.y=f.clientY);for(var h=this.interactiveItems.length,i=0;h>i;i++){var j=this.interactiveItems[i];if((j.touchstart||j.tap)&&(j.__hit=this.hitTest(j,g),j.__hit&&(j.touchstart&&j.touchstart(g),j.__isDown=!0,j.__touchData=j.__touchData||{},j.__touchData[f.identifier]=g,!j.interactiveChildren)))break}}},b.InteractionManager.prototype.onTouchEnd=function(a){this.dirty&&this.rebuildInteractiveGraph();for(var b=this.interactionDOMElement.getBoundingClientRect(),c=a.changedTouches,d=0;d<c.length;d++){var e=c[d],f=this.touchs[e.identifier],g=!1;f.global.x=(e.clientX-b.left)*(this.target.width/b.width),f.global.y=(e.clientY-b.top)*(this.target.height/b.height),navigator.isCocoonJS&&(f.global.x=e.clientX,f.global.y=e.clientY);for(var h=this.interactiveItems.length,i=0;h>i;i++){var j=this.interactiveItems[i];j.__touchData&&j.__touchData[e.identifier]&&(j.__hit=this.hitTest(j,j.__touchData[e.identifier]),f.originalEvent=a||window.event,(j.touchend||j.tap)&&(j.__hit&&!g?(j.touchend&&j.touchend(f),j.__isDown&&j.tap&&j.tap(f),j.interactiveChildren||(g=!0)):j.__isDown&&j.touchendoutside&&j.touchendoutside(f),j.__isDown=!1),j.__touchData[e.identifier]=null)}this.pool.push(f),this.touchs[e.identifier]=null}},b.Stage=function(a){b.DisplayObjectContainer.call(this),this.worldTransform=new b.Matrix,this.interactive=!0,this.interactionManager=new b.InteractionManager(this),this.dirty=!0,this.stage=this,this.stage.hitArea=new b.Rectangle(0,0,1e5,1e5),this.setBackgroundColor(a)},b.Stage.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Stage.prototype.constructor=b.Stage,b.Stage.prototype.setInteractionDelegate=function(a){this.interactionManager.setTargetDomElement(a)},b.Stage.prototype.updateTransform=function(){this.worldAlpha=1;for(var a=0,b=this.children.length;b>a;a++)this.children[a].updateTransform();this.dirty&&(this.dirty=!1,this.interactionManager.dirty=!0),this.interactive&&this.interactionManager.update()},b.Stage.prototype.setBackgroundColor=function(a){this.backgroundColor=a||0,this.backgroundColorSplit=b.hex2rgb(this.backgroundColor);var c=this.backgroundColor.toString(16);c="000000".substr(0,6-c.length)+c,this.backgroundColorString="#"+c},b.Stage.prototype.getMousePosition=function(){return this.interactionManager.mouse.global};for(var c=0,d=["ms","moz","webkit","o"],e=0;e<d.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[d[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[d[e]+"CancelAnimationFrame"]||window[d[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var b=(new Date).getTime(),d=Math.max(0,16-(b-c)),e=window.setTimeout(function(){a(b+d)},d);return c=b+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),window.requestAnimFrame=window.requestAnimationFrame,b.hex2rgb=function(a){return[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]},b.rgb2hex=function(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]},"function"!=typeof Function.prototype.bind&&(Function.prototype.bind=function(){var a=Array.prototype.slice;return function(b){function c(){var f=e.concat(a.call(arguments));d.apply(this instanceof c?this:b,f)}var d=this,e=a.call(arguments,1);if("function"!=typeof d)throw new TypeError;return c.prototype=function f(a){return a&&(f.prototype=a),this instanceof f?void 0:new f}(d.prototype),c}}()),b.AjaxRequest=function(){var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"];if(!window.ActiveXObject)return window.XMLHttpRequest?new window.XMLHttpRequest:!1;for(var b=0;b<a.length;b++)try{return new window.ActiveXObject(a[b])}catch(c){}},b.canUseNewCanvasBlendModes=function(){var a=document.createElement("canvas");a.width=1,a.height=1;var b=a.getContext("2d");return b.fillStyle="#000",b.fillRect(0,0,1,1),b.globalCompositeOperation="multiply",b.fillStyle="#fff",b.fillRect(0,0,1,1),0===b.getImageData(0,0,1,1).data[0]},b.getNextPowerOfTwo=function(a){if(a>0&&0===(a&a-1))return a;for(var b=1;a>b;)b<<=1;return b},b.EventTarget=function(){var a={};this.addEventListener=this.on=function(b,c){void 0===a[b]&&(a[b]=[]),-1===a[b].indexOf(c)&&a[b].unshift(c)},this.dispatchEvent=this.emit=function(b){if(a[b.type]&&a[b.type].length)for(var c=a[b.type].length-1;c>=0;c--)a[b.type][c](b)},this.removeEventListener=this.off=function(b,c){if(void 0!==a[b]){var d=a[b].indexOf(c);-1!==d&&a[b].splice(d,1)}},this.removeAllEventListeners=function(b){var c=a[b];c&&(c.length=0)}},b.autoDetectRenderer=function(a,c,d,e,f){a||(a=800),c||(c=600);var g=function(){try{var a=document.createElement("canvas");return!!window.WebGLRenderingContext&&(a.getContext("webgl")||a.getContext("experimental-webgl"))}catch(b){return!1}}();return g?new b.WebGLRenderer(a,c,d,e,f):new b.CanvasRenderer(a,c,d,e)},b.autoDetectRecommendedRenderer=function(a,c,d,e,f){a||(a=800),c||(c=600);var g=function(){try{var a=document.createElement("canvas");return!!window.WebGLRenderingContext&&(a.getContext("webgl")||a.getContext("experimental-webgl"))}catch(b){return!1}}(),h=/Android/i.test(navigator.userAgent);return g&&!h?new b.WebGLRenderer(a,c,d,e,f):new b.CanvasRenderer(a,c,d,e)},b.PolyK={},b.PolyK.Triangulate=function(a){var c=!0,d=a.length>>1;if(3>d)return[];for(var e=[],f=[],g=0;d>g;g++)f.push(g);g=0;for(var h=d;h>3;){var i=f[(g+0)%h],j=f[(g+1)%h],k=f[(g+2)%h],l=a[2*i],m=a[2*i+1],n=a[2*j],o=a[2*j+1],p=a[2*k],q=a[2*k+1],r=!1;if(b.PolyK._convex(l,m,n,o,p,q,c)){r=!0;for(var s=0;h>s;s++){var t=f[s];if(t!==i&&t!==j&&t!==k&&b.PolyK._PointInTriangle(a[2*t],a[2*t+1],l,m,n,o,p,q)){r=!1;break}}}if(r)e.push(i,j,k),f.splice((g+1)%h,1),h--,g=0;else if(g++>3*h){if(!c)return window.console.log("PIXI Warning: shape too complex to fill"),[];for(e=[],f=[],g=0;d>g;g++)f.push(g);g=0,h=d,c=!1}}return e.push(f[0],f[1],f[2]),e},b.PolyK._PointInTriangle=function(a,b,c,d,e,f,g,h){var i=g-c,j=h-d,k=e-c,l=f-d,m=a-c,n=b-d,o=i*i+j*j,p=i*k+j*l,q=i*m+j*n,r=k*k+l*l,s=k*m+l*n,t=1/(o*r-p*p),u=(r*q-p*s)*t,v=(o*s-p*q)*t;return u>=0&&v>=0&&1>u+v},b.PolyK._convex=function(a,b,c,d,e,f,g){return(b-d)*(e-c)+(c-a)*(f-d)>=0===g},b.initDefaultShaders=function(){},b.CompileVertexShader=function(a,c){return b._CompileShader(a,c,a.VERTEX_SHADER)},b.CompileFragmentShader=function(a,c){return b._CompileShader(a,c,a.FRAGMENT_SHADER)},b._CompileShader=function(a,b,c){var d=b.join("\n"),e=a.createShader(c);return a.shaderSource(e,d),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)?e:(window.console.log(a.getShaderInfoLog(e)),null)},b.compileProgram=function(a,c,d){var e=b.CompileFragmentShader(a,d),f=b.CompileVertexShader(a,c),g=a.createProgram();return a.attachShader(g,f),a.attachShader(g,e),a.linkProgram(g),a.getProgramParameter(g,a.LINK_STATUS)||window.console.log("Could not initialise shaders"),g},b.PixiShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.textureCount=0,this.attributes=[],this.init()},b.PixiShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc||b.PixiShader.defaultVertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aTextureCoord,this.colorAttribute];for(var d in this.uniforms)this.uniforms[d].uniformLocation=a.getUniformLocation(c,d);this.initUniforms(),this.program=c},b.PixiShader.prototype.initUniforms=function(){this.textureCount=1;var a,b=this.gl;for(var c in this.uniforms){a=this.uniforms[c];var d=a.type;"sampler2D"===d?(a._init=!1,null!==a.value&&this.initSampler2D(a)):"mat2"===d||"mat3"===d||"mat4"===d?(a.glMatrix=!0,a.glValueLength=1,"mat2"===d?a.glFunc=b.uniformMatrix2fv:"mat3"===d?a.glFunc=b.uniformMatrix3fv:"mat4"===d&&(a.glFunc=b.uniformMatrix4fv)):(a.glFunc=b["uniform"+d],a.glValueLength="2f"===d||"2i"===d?2:"3f"===d||"3i"===d?3:"4f"===d||"4i"===d?4:1)}},b.PixiShader.prototype.initSampler2D=function(a){if(a.value&&a.value.baseTexture&&a.value.baseTexture.hasLoaded){var b=this.gl;if(b.activeTexture(b["TEXTURE"+this.textureCount]),b.bindTexture(b.TEXTURE_2D,a.value.baseTexture._glTextures[b.id]),a.textureData){var c=a.textureData,d=c.magFilter?c.magFilter:b.LINEAR,e=c.minFilter?c.minFilter:b.LINEAR,f=c.wrapS?c.wrapS:b.CLAMP_TO_EDGE,g=c.wrapT?c.wrapT:b.CLAMP_TO_EDGE,h=c.luminance?b.LUMINANCE:b.RGBA;if(c.repeat&&(f=b.REPEAT,g=b.REPEAT),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!!c.flipY),c.width){var i=c.width?c.width:512,j=c.height?c.height:2,k=c.border?c.border:0;b.texImage2D(b.TEXTURE_2D,0,h,i,j,k,h,b.UNSIGNED_BYTE,null)}else b.texImage2D(b.TEXTURE_2D,0,h,b.RGBA,b.UNSIGNED_BYTE,a.value.baseTexture.source);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,d),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,e),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,f),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,g)}b.uniform1i(a.uniformLocation,this.textureCount),a._init=!0,this.textureCount++}},b.PixiShader.prototype.syncUniforms=function(){this.textureCount=1;var a,c=this.gl;for(var d in this.uniforms)a=this.uniforms[d],1===a.glValueLength?a.glMatrix===!0?a.glFunc.call(c,a.uniformLocation,a.transpose,a.value):a.glFunc.call(c,a.uniformLocation,a.value):2===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y):3===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z):4===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z,a.value.w):"sampler2D"===a.type&&(a._init?(c.activeTexture(c["TEXTURE"+this.textureCount]),c.bindTexture(c.TEXTURE_2D,a.value.baseTexture._glTextures[c.id]||b.createWebGLTexture(a.value.baseTexture,c)),c.uniform1i(a.uniformLocation,this.textureCount),this.textureCount++):this.initSampler2D(a))},b.PixiShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.PixiShader.defaultVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec2 aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;","   vColor = vec4(color * aColor.x, aColor.x);","}"],b.PixiFastShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"],this.textureCount=0,this.init()},b.PixiFastShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.uMatrix=a.getUniformLocation(c,"uMatrix"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aPositionCoord=a.getAttribLocation(c,"aPositionCoord"),this.aScale=a.getAttribLocation(c,"aScale"),this.aRotation=a.getAttribLocation(c,"aRotation"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute],this.program=c},b.PixiFastShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.StripShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"],this.init()},b.StripShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.attributes=[this.aVertexPosition,this.aTextureCoord],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.PrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"],this.init()},b.PrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.PrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.ComplexPrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"],this.init()},b.ComplexPrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.color=a.getUniformLocation(c,"color"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.ComplexPrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.WebGLGraphics=function(){},b.WebGLGraphics.renderGraphics=function(a,c){var d,e=c.gl,f=c.projection,g=c.offset,h=c.shaderManager.primitiveShader;a.dirty&&b.WebGLGraphics.updateGraphics(a,e);for(var i=a._webGL[e.id],j=0;j<i.data.length;j++)1===i.data[j].mode?(d=i.data[j],c.stencilManager.pushStencil(a,d,c),e.drawElements(e.TRIANGLE_FAN,4,e.UNSIGNED_SHORT,2*(d.indices.length-4)),c.stencilManager.popStencil(a,d,c),this.last=d.mode):(d=i.data[j],c.shaderManager.setShader(h),h=c.shaderManager.primitiveShader,e.uniformMatrix3fv(h.translationMatrix,!1,a.worldTransform.toArray(!0)),e.uniform2f(h.projectionVector,f.x,-f.y),e.uniform2f(h.offsetVector,-g.x,-g.y),e.uniform3fv(h.tintColor,b.hex2rgb(a.tint)),e.uniform1f(h.alpha,a.worldAlpha),e.bindBuffer(e.ARRAY_BUFFER,d.buffer),e.vertexAttribPointer(h.aVertexPosition,2,e.FLOAT,!1,24,0),e.vertexAttribPointer(h.colorAttribute,4,e.FLOAT,!1,24,8),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,d.indexBuffer),e.drawElements(e.TRIANGLE_STRIP,d.indices.length,e.UNSIGNED_SHORT,0))},b.WebGLGraphics.updateGraphics=function(a,c){var d=a._webGL[c.id];d||(d=a._webGL[c.id]={lastIndex:0,data:[],gl:c}),a.dirty=!1;var e;if(a.clearDirty){for(a.clearDirty=!1,e=0;e<d.data.length;e++){var f=d.data[e];f.reset(),b.WebGLGraphics.graphicsDataPool.push(f)}d.data=[],d.lastIndex=0}var g;for(e=d.lastIndex;e<a.graphicsData.length;e++){var h=a.graphicsData[e];h.type===b.Graphics.POLY?(h.fill&&h.points.length>6&&(h.points.length>10?(g=b.WebGLGraphics.switchMode(d,1),b.WebGLGraphics.buildComplexPoly(h,g)):(g=b.WebGLGraphics.switchMode(d,0),b.WebGLGraphics.buildPoly(h,g))),h.lineWidth>0&&(g=b.WebGLGraphics.switchMode(d,0),b.WebGLGraphics.buildLine(h,g))):(g=b.WebGLGraphics.switchMode(d,0),h.type===b.Graphics.RECT?b.WebGLGraphics.buildRectangle(h,g):h.type===b.Graphics.CIRC||h.type===b.Graphics.ELIP?b.WebGLGraphics.buildCircle(h,g):h.type===b.Graphics.RREC&&b.WebGLGraphics.buildRoundedRectangle(h,g)),d.lastIndex++}for(e=0;e<d.data.length;e++)g=d.data[e],g.dirty&&g.upload()},b.WebGLGraphics.switchMode=function(a,c){var d;return a.data.length?(d=a.data[a.data.length-1],(d.mode!==c||1===c)&&(d=b.WebGLGraphics.graphicsDataPool.pop()||new b.WebGLGraphicsData(a.gl),d.mode=c,a.data.push(d))):(d=b.WebGLGraphics.graphicsDataPool.pop()||new b.WebGLGraphicsData(a.gl),d.mode=c,a.data.push(d)),d.dirty=!0,d},b.WebGLGraphics.buildRectangle=function(a,c){var d=a.points,e=d[0],f=d[1],g=d[2],h=d[3];if(a.fill){var i=b.hex2rgb(a.fillColor),j=a.fillAlpha,k=i[0]*j,l=i[1]*j,m=i[2]*j,n=c.points,o=c.indices,p=n.length/6;n.push(e,f),n.push(k,l,m,j),n.push(e+g,f),n.push(k,l,m,j),n.push(e,f+h),n.push(k,l,m,j),n.push(e+g,f+h),n.push(k,l,m,j),o.push(p,p,p+1,p+2,p+3,p+3)}if(a.lineWidth){var q=a.points;a.points=[e,f,e+g,f,e+g,f+h,e,f+h,e,f],b.WebGLGraphics.buildLine(a,c),a.points=q}},b.WebGLGraphics.buildRoundedRectangle=function(a,c){var d=a.points,e=d[0],f=d[1],g=d[2],h=d[3],i=d[4],j=[];if(j.push(e,f+i),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e,f+h-i,e,f+h,e+i,f+h)),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e+g-i,f+h,e+g,f+h,e+g,f+h-i)),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e+g,f+i,e+g,f,e+g-i,f)),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e+i,f,e,f,e,f+i)),a.fill){var k=b.hex2rgb(a.fillColor),l=a.fillAlpha,m=k[0]*l,n=k[1]*l,o=k[2]*l,p=c.points,q=c.indices,r=p.length/6,s=b.PolyK.Triangulate(j),t=0;for(t=0;t<s.length;t+=3)q.push(s[t]+r),q.push(s[t]+r),q.push(s[t+1]+r),q.push(s[t+2]+r),q.push(s[t+2]+r);for(t=0;t<j.length;t++)p.push(j[t],j[++t],m,n,o,l)}if(a.lineWidth){var u=a.points;a.points=j,b.WebGLGraphics.buildLine(a,c),a.points=u}},b.WebGLGraphics.quadraticBezierCurve=function(a,b,c,d,e,f){function g(a,b,c){var d=b-a;return a+d*c}for(var h,i,j,k,l,m,n=20,o=[],p=0,q=0;n>=q;q++)p=q/n,h=g(a,c,p),i=g(b,d,p),j=g(c,e,p),k=g(d,f,p),l=g(h,j,p),m=g(i,k,p),o.push(l,m);return o},b.WebGLGraphics.buildCircle=function(a,c){var d=a.points,e=d[0],f=d[1],g=d[2],h=d[3],i=40,j=2*Math.PI/i,k=0;if(a.fill){var l=b.hex2rgb(a.fillColor),m=a.fillAlpha,n=l[0]*m,o=l[1]*m,p=l[2]*m,q=c.points,r=c.indices,s=q.length/6;for(r.push(s),k=0;i+1>k;k++)q.push(e,f,n,o,p,m),q.push(e+Math.sin(j*k)*g,f+Math.cos(j*k)*h,n,o,p,m),r.push(s++,s++);r.push(s-1)}if(a.lineWidth){var t=a.points;for(a.points=[],k=0;i+1>k;k++)a.points.push(e+Math.sin(j*k)*g,f+Math.cos(j*k)*h);b.WebGLGraphics.buildLine(a,c),a.points=t}},b.WebGLGraphics.buildLine=function(a,c){var d=0,e=a.points;if(0!==e.length){if(a.lineWidth%2)for(d=0;d<e.length;d++)e[d]+=.5;var f=new b.Point(e[0],e[1]),g=new b.Point(e[e.length-2],e[e.length-1]);if(f.x===g.x&&f.y===g.y){e=e.slice(),e.pop(),e.pop(),g=new b.Point(e[e.length-2],e[e.length-1]);var h=g.x+.5*(f.x-g.x),i=g.y+.5*(f.y-g.y);e.unshift(h,i),e.push(h,i)}var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G=c.points,H=c.indices,I=e.length/2,J=e.length,K=G.length/6,L=a.lineWidth/2,M=b.hex2rgb(a.lineColor),N=a.lineAlpha,O=M[0]*N,P=M[1]*N,Q=M[2]*N;for(l=e[0],m=e[1],n=e[2],o=e[3],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,G.push(l-r,m-s,O,P,Q,N),G.push(l+r,m+s,O,P,Q,N),d=1;I-1>d;d++)l=e[2*(d-1)],m=e[2*(d-1)+1],n=e[2*d],o=e[2*d+1],p=e[2*(d+1)],q=e[2*(d+1)+1],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,t=-(o-q),u=n-p,F=Math.sqrt(t*t+u*u),t/=F,u/=F,t*=L,u*=L,x=-s+m-(-s+o),y=-r+n-(-r+l),z=(-r+l)*(-s+o)-(-r+n)*(-s+m),A=-u+q-(-u+o),B=-t+n-(-t+p),C=(-t+p)*(-u+o)-(-t+n)*(-u+q),D=x*B-A*y,Math.abs(D)<.1?(D+=10.1,G.push(n-r,o-s,O,P,Q,N),G.push(n+r,o+s,O,P,Q,N)):(j=(y*C-B*z)/D,k=(A*z-x*C)/D,E=(j-n)*(j-n)+(k-o)+(k-o),E>19600?(v=r-t,w=s-u,F=Math.sqrt(v*v+w*w),v/=F,w/=F,v*=L,w*=L,G.push(n-v,o-w),G.push(O,P,Q,N),G.push(n+v,o+w),G.push(O,P,Q,N),G.push(n-v,o-w),G.push(O,P,Q,N),J++):(G.push(j,k),G.push(O,P,Q,N),G.push(n-(j-n),o-(k-o)),G.push(O,P,Q,N)));for(l=e[2*(I-2)],m=e[2*(I-2)+1],n=e[2*(I-1)],o=e[2*(I-1)+1],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,G.push(n-r,o-s),G.push(O,P,Q,N),G.push(n+r,o+s),G.push(O,P,Q,N),H.push(K),d=0;J>d;d++)H.push(K++);H.push(K-1)}},b.WebGLGraphics.buildComplexPoly=function(a,c){var d=a.points.slice();if(!(d.length<6)){var e=c.indices;c.points=d,c.alpha=a.fillAlpha,c.color=b.hex2rgb(a.fillColor);for(var f,g,h=1/0,i=-1/0,j=1/0,k=-1/0,l=0;l<d.length;l+=2)f=d[l],g=d[l+1],h=h>f?f:h,i=f>i?f:i,j=j>g?g:j,k=g>k?g:k;d.push(h,j,i,j,i,k,h,k);var m=d.length/2;for(l=0;m>l;l++)e.push(l)}},b.WebGLGraphics.buildPoly=function(a,c){var d=a.points;if(!(d.length<6)){var e=c.points,f=c.indices,g=d.length/2,h=b.hex2rgb(a.fillColor),i=a.fillAlpha,j=h[0]*i,k=h[1]*i,l=h[2]*i,m=b.PolyK.Triangulate(d),n=e.length/6,o=0;for(o=0;o<m.length;o+=3)f.push(m[o]+n),f.push(m[o]+n),f.push(m[o+1]+n),f.push(m[o+2]+n),f.push(m[o+2]+n);for(o=0;g>o;o++)e.push(d[2*o],d[2*o+1],j,k,l,i)}},b.WebGLGraphics.graphicsDataPool=[],b.WebGLGraphicsData=function(a){this.gl=a,this.color=[0,0,0],this.points=[],this.indices=[],this.lastIndex=0,this.buffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.mode=1,this.alpha=1,this.dirty=!0},b.WebGLGraphicsData.prototype.reset=function(){this.points=[],this.indices=[],this.lastIndex=0},b.WebGLGraphicsData.prototype.upload=function(){var a=this.gl;this.glPoints=new Float32Array(this.points),a.bindBuffer(a.ARRAY_BUFFER,this.buffer),a.bufferData(a.ARRAY_BUFFER,this.glPoints,a.STATIC_DRAW),this.glIndicies=new Uint16Array(this.indices),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.glIndicies,a.STATIC_DRAW),this.dirty=!1},b.glContexts=[],b.WebGLRenderer=function(a,c,d,e,f,g){b.defaultRenderer||(b.sayHello("webGL"),b.defaultRenderer=this),this.type=b.WEBGL_RENDERER,this.transparent=!!e,this.preserveDrawingBuffer=g,this.width=a||800,this.height=c||600,this.view=d||document.createElement("canvas"),this.view.width=this.width,this.view.height=this.height,this.contextLost=this.handleContextLost.bind(this),this.contextRestoredLost=this.handleContextRestored.bind(this),this.view.addEventListener("webglcontextlost",this.contextLost,!1),this.view.addEventListener("webglcontextrestored",this.contextRestoredLost,!1),this.options={alpha:this.transparent,antialias:!!f,premultipliedAlpha:!!e,stencil:!0,preserveDrawingBuffer:g};var h=null;if(["experimental-webgl","webgl"].forEach(function(a){try{h=h||this.view.getContext(a,this.options)}catch(b){}},this),!h)throw new Error("This browser does not support webGL. Try using the canvas renderer"+this);this.gl=h,this.glContextId=h.id=b.WebGLRenderer.glContextId++,b.glContexts[this.glContextId]=h,b.blendModesWebGL||(b.blendModesWebGL=[],b.blendModesWebGL[b.blendModes.NORMAL]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.ADD]=[h.SRC_ALPHA,h.DST_ALPHA],b.blendModesWebGL[b.blendModes.MULTIPLY]=[h.DST_COLOR,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.SCREEN]=[h.SRC_ALPHA,h.ONE],b.blendModesWebGL[b.blendModes.OVERLAY]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.DARKEN]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.LIGHTEN]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.COLOR_DODGE]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.COLOR_BURN]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.HARD_LIGHT]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.SOFT_LIGHT]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.DIFFERENCE]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.EXCLUSION]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.HUE]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.SATURATION]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.COLOR]=[h.ONE,h.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.LUMINOSITY]=[h.ONE,h.ONE_MINUS_SRC_ALPHA]),this.projection=new b.Point,this.projection.x=this.width/2,this.projection.y=-this.height/2,this.offset=new b.Point(0,0),this.resize(this.width,this.height),this.contextLost=!1,this.shaderManager=new b.WebGLShaderManager(h),this.spriteBatch=new b.WebGLSpriteBatch(h),this.maskManager=new b.WebGLMaskManager(h),this.filterManager=new b.WebGLFilterManager(h,this.transparent),this.stencilManager=new b.WebGLStencilManager(h),this.blendModeManager=new b.WebGLBlendModeManager(h),this.renderSession={},this.renderSession.gl=this.gl,this.renderSession.drawCount=0,this.renderSession.shaderManager=this.shaderManager,this.renderSession.maskManager=this.maskManager,this.renderSession.filterManager=this.filterManager,this.renderSession.blendModeManager=this.blendModeManager,this.renderSession.spriteBatch=this.spriteBatch,this.renderSession.stencilManager=this.stencilManager,this.renderSession.renderer=this,h.useProgram(this.shaderManager.defaultShader.program),h.disable(h.DEPTH_TEST),h.disable(h.CULL_FACE),h.enable(h.BLEND),h.colorMask(!0,!0,!0,this.transparent)},b.WebGLRenderer.prototype.constructor=b.WebGLRenderer,b.WebGLRenderer.prototype.render=function(a){if(!this.contextLost){this.__stage!==a&&(a.interactive&&a.interactionManager.removeEvents(),this.__stage=a),b.WebGLRenderer.updateTextures(),a.updateTransform(),a._interactive&&(a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this)));var c=this.gl;c.viewport(0,0,this.width,this.height),c.bindFramebuffer(c.FRAMEBUFFER,null),this.transparent?c.clearColor(0,0,0,0):c.clearColor(a.backgroundColorSplit[0],a.backgroundColorSplit[1],a.backgroundColorSplit[2],1),c.clear(c.COLOR_BUFFER_BIT),this.renderDisplayObject(a,this.projection),a.interactive?a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this)):a._interactiveEventsAdded&&(a._interactiveEventsAdded=!1,a.interactionManager.setTarget(this))}},b.WebGLRenderer.prototype.renderDisplayObject=function(a,c,d){this.renderSession.blendModeManager.setBlendMode(b.blendModes.NORMAL),this.renderSession.drawCount=0,this.renderSession.currentBlendMode=9999,this.renderSession.projection=c,this.renderSession.offset=this.offset,this.spriteBatch.begin(this.renderSession),this.filterManager.begin(this.renderSession,d),a._renderWebGL(this.renderSession),this.spriteBatch.end()},b.WebGLRenderer.updateTextures=function(){var a=0;for(a=0;a<b.Texture.frameUpdates.length;a++)b.WebGLRenderer.updateTextureFrame(b.Texture.frameUpdates[a]);for(a=0;a<b.texturesToDestroy.length;a++)b.WebGLRenderer.destroyTexture(b.texturesToDestroy[a]);b.texturesToUpdate.length=0,b.texturesToDestroy.length=0,b.Texture.frameUpdates.length=0},b.WebGLRenderer.destroyTexture=function(a){for(var c=a._glTextures.length-1;c>=0;c--){var d=a._glTextures[c],e=b.glContexts[c];
e&&d&&e.deleteTexture(d)}a._glTextures.length=0},b.WebGLRenderer.updateTextureFrame=function(a){a._updateWebGLuvs()},b.WebGLRenderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.view.width=a,this.view.height=b,this.gl.viewport(0,0,this.width,this.height),this.projection.x=this.width/2,this.projection.y=-this.height/2},b.createWebGLTexture=function(a,c){return a.hasLoaded&&(a._glTextures[c.id]=c.createTexture(),c.bindTexture(c.TEXTURE_2D,a._glTextures[c.id]),c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultipliedAlpha),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,a.source),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a._powerOf2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.REPEAT),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.REPEAT)):(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE)),c.bindTexture(c.TEXTURE_2D,null),a._dirty[c.id]=!1),a._glTextures[c.id]},b.updateWebGLTexture=function(a,c){a._glTextures[c.id]&&(c.bindTexture(c.TEXTURE_2D,a._glTextures[c.id]),c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultipliedAlpha),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,a.source),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a._powerOf2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.REPEAT),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.REPEAT)):(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE)),a._dirty[c.id]=!1)},b.WebGLRenderer.prototype.handleContextLost=function(a){a.preventDefault(),this.contextLost=!0},b.WebGLRenderer.prototype.handleContextRestored=function(){try{this.gl=this.view.getContext("experimental-webgl",this.options)}catch(a){try{this.gl=this.view.getContext("webgl",this.options)}catch(c){throw new Error(" This browser does not support webGL. Try using the canvas renderer"+this)}}var d=this.gl;d.id=b.WebGLRenderer.glContextId++,this.shaderManager.setContext(d),this.spriteBatch.setContext(d),this.primitiveBatch.setContext(d),this.maskManager.setContext(d),this.filterManager.setContext(d),this.renderSession.gl=this.gl,d.disable(d.DEPTH_TEST),d.disable(d.CULL_FACE),d.enable(d.BLEND),d.colorMask(!0,!0,!0,this.transparent),this.gl.viewport(0,0,this.width,this.height);for(var e in b.TextureCache){var f=b.TextureCache[e].baseTexture;f._glTextures=[]}this.contextLost=!1},b.WebGLRenderer.prototype.destroy=function(){this.view.removeEventListener("webglcontextlost",this.contextLost),this.view.removeEventListener("webglcontextrestored",this.contextRestoredLost),b.glContexts[this.glContextId]=null,this.projection=null,this.offset=null,this.shaderManager.destroy(),this.spriteBatch.destroy(),this.primitiveBatch.destroy(),this.maskManager.destroy(),this.filterManager.destroy(),this.shaderManager=null,this.spriteBatch=null,this.maskManager=null,this.filterManager=null,this.gl=null,this.renderSession=null},b.WebGLRenderer.glContextId=0,b.WebGLBlendModeManager=function(a){this.gl=a,this.currentBlendMode=99999},b.WebGLBlendModeManager.prototype.setBlendMode=function(a){if(this.currentBlendMode===a)return!1;this.currentBlendMode=a;var c=b.blendModesWebGL[this.currentBlendMode];return this.gl.blendFunc(c[0],c[1]),!0},b.WebGLBlendModeManager.prototype.destroy=function(){this.gl=null},b.WebGLMaskManager=function(a){this.maskStack=[],this.maskPosition=0,this.setContext(a),this.reverse=!1,this.count=0},b.WebGLMaskManager.prototype.setContext=function(a){this.gl=a},b.WebGLMaskManager.prototype.pushMask=function(a,c){var d=c.gl;a.dirty&&b.WebGLGraphics.updateGraphics(a,d),a._webGL[d.id].data.length&&c.stencilManager.pushStencil(a,a._webGL[d.id].data[0],c)},b.WebGLMaskManager.prototype.popMask=function(a,b){var c=this.gl;b.stencilManager.popStencil(a,a._webGL[c.id].data[0],b)},b.WebGLMaskManager.prototype.destroy=function(){this.maskStack=null,this.gl=null},b.WebGLStencilManager=function(a){this.stencilStack=[],this.setContext(a),this.reverse=!0,this.count=0},b.WebGLStencilManager.prototype.setContext=function(a){this.gl=a},b.WebGLStencilManager.prototype.pushStencil=function(a,b,c){var d=this.gl;this.bindGraphics(a,b,c),0===this.stencilStack.length&&(d.enable(d.STENCIL_TEST),d.clear(d.STENCIL_BUFFER_BIT),this.reverse=!0,this.count=0),this.stencilStack.push(b);var e=this.count;d.colorMask(!1,!1,!1,!1),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),1===b.mode?(d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),this.reverse?d.stencilFunc(d.EQUAL,255-(e+1),255):d.stencilFunc(d.EQUAL,e+1,255),this.reverse=!this.reverse):(this.reverse?(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e+1,255):d.stencilFunc(d.EQUAL,255-(e+1),255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP),this.count++},b.WebGLStencilManager.prototype.bindGraphics=function(a,c,d){this._currentGraphics=a;var e,f=this.gl,g=d.projection,h=d.offset;1===c.mode?(e=d.shaderManager.complexPrimativeShader,d.shaderManager.setShader(e),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform3fv(e.color,c.color),f.uniform1f(e.alpha,a.worldAlpha*c.alpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,8,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer)):(e=d.shaderManager.primitiveShader,d.shaderManager.setShader(e),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform1f(e.alpha,a.worldAlpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,24,0),f.vertexAttribPointer(e.colorAttribute,4,f.FLOAT,!1,24,8),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer))},b.WebGLStencilManager.prototype.popStencil=function(a,b,c){var d=this.gl;if(this.stencilStack.pop(),this.count--,0===this.stencilStack.length)d.disable(d.STENCIL_TEST);else{var e=this.count;this.bindGraphics(a,b,c),d.colorMask(!1,!1,!1,!1),1===b.mode?(this.reverse=!this.reverse,this.reverse?(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)):(this.reverse?(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP)}},b.WebGLStencilManager.prototype.destroy=function(){this.maskStack=null,this.gl=null},b.WebGLShaderManager=function(a){this.maxAttibs=10,this.attribState=[],this.tempAttribState=[],this.shaderMap=[];for(var b=0;b<this.maxAttibs;b++)this.attribState[b]=!1;this.setContext(a)},b.WebGLShaderManager.prototype.setContext=function(a){this.gl=a,this.primitiveShader=new b.PrimitiveShader(a),this.complexPrimativeShader=new b.ComplexPrimitiveShader(a),this.defaultShader=new b.PixiShader(a),this.fastShader=new b.PixiFastShader(a),this.stripShader=new b.StripShader(a),this.setShader(this.defaultShader)},b.WebGLShaderManager.prototype.setAttribs=function(a){var b;for(b=0;b<this.tempAttribState.length;b++)this.tempAttribState[b]=!1;for(b=0;b<a.length;b++){var c=a[b];this.tempAttribState[c]=!0}var d=this.gl;for(b=0;b<this.attribState.length;b++)this.attribState[b]!==this.tempAttribState[b]&&(this.attribState[b]=this.tempAttribState[b],this.tempAttribState[b]?d.enableVertexAttribArray(b):d.disableVertexAttribArray(b))},b.WebGLShaderManager.prototype.setShader=function(a){return this._currentId===a._UID?!1:(this._currentId=a._UID,this.currentShader=a,this.gl.useProgram(a.program),this.setAttribs(a.attributes),!0)},b.WebGLShaderManager.prototype.destroy=function(){this.attribState=null,this.tempAttribState=null,this.primitiveShader.destroy(),this.defaultShader.destroy(),this.fastShader.destroy(),this.stripShader.destroy(),this.gl=null},b.WebGLSpriteBatch=function(a){this.vertSize=6,this.size=2e3;var b=4*this.size*this.vertSize,c=6*this.size;this.vertices=new Float32Array(b),this.indices=new Uint16Array(c),this.lastIndexCount=0;for(var d=0,e=0;c>d;d+=6,e+=4)this.indices[d+0]=e+0,this.indices[d+1]=e+1,this.indices[d+2]=e+2,this.indices[d+3]=e+0,this.indices[d+4]=e+2,this.indices[d+5]=e+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.setContext(a),this.dirty=!0,this.textures=[],this.blendModes=[]},b.WebGLSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW),this.currentBlendMode=99999},b.WebGLSpriteBatch.prototype.begin=function(a){this.renderSession=a,this.shader=this.renderSession.shaderManager.defaultShader,this.start()},b.WebGLSpriteBatch.prototype.end=function(){this.flush()},b.WebGLSpriteBatch.prototype.render=function(a){var b=a.texture;this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=b.baseTexture);var c=b._uvs;if(c){var d,e,f,g,h=a.worldAlpha,i=a.tint,j=this.vertices,k=a.anchor.x,l=a.anchor.y;if(b.trim){var m=b.trim;e=m.x-k*m.width,d=e+b.crop.width,g=m.y-l*m.height,f=g+b.crop.height}else d=b.frame.width*(1-k),e=b.frame.width*-k,f=b.frame.height*(1-l),g=b.frame.height*-l;var n=4*this.currentBatchSize*this.vertSize,o=a.worldTransform,p=o.a,q=o.c,r=o.b,s=o.d,t=o.tx,u=o.ty;j[n++]=p*e+r*g+t,j[n++]=s*g+q*e+u,j[n++]=c.x0,j[n++]=c.y0,j[n++]=h,j[n++]=i,j[n++]=p*d+r*g+t,j[n++]=s*g+q*d+u,j[n++]=c.x1,j[n++]=c.y1,j[n++]=h,j[n++]=i,j[n++]=p*d+r*f+t,j[n++]=s*f+q*d+u,j[n++]=c.x2,j[n++]=c.y2,j[n++]=h,j[n++]=i,j[n++]=p*e+r*f+t,j[n++]=s*f+q*e+u,j[n++]=c.x3,j[n++]=c.y3,j[n++]=h,j[n++]=i,this.textures[this.currentBatchSize]=a.texture.baseTexture,this.blendModes[this.currentBatchSize]=a.blendMode,this.currentBatchSize++}},b.WebGLSpriteBatch.prototype.renderTilingSprite=function(a){var c=a.tilingTexture;this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=c.baseTexture),a._uvs||(a._uvs=new b.TextureUvs);var d=a._uvs;a.tilePosition.x%=c.baseTexture.width*a.tileScaleOffset.x,a.tilePosition.y%=c.baseTexture.height*a.tileScaleOffset.y;var e=a.tilePosition.x/(c.baseTexture.width*a.tileScaleOffset.x),f=a.tilePosition.y/(c.baseTexture.height*a.tileScaleOffset.y),g=a.width/c.baseTexture.width/(a.tileScale.x*a.tileScaleOffset.x),h=a.height/c.baseTexture.height/(a.tileScale.y*a.tileScaleOffset.y);d.x0=0-e,d.y0=0-f,d.x1=1*g-e,d.y1=0-f,d.x2=1*g-e,d.y2=1*h-f,d.x3=0-e,d.y3=1*h-f;var i=a.worldAlpha,j=a.tint,k=this.vertices,l=a.width,m=a.height,n=a.anchor.x,o=a.anchor.y,p=l*(1-n),q=l*-n,r=m*(1-o),s=m*-o,t=4*this.currentBatchSize*this.vertSize,u=a.worldTransform,v=u.a,w=u.c,x=u.b,y=u.d,z=u.tx,A=u.ty;k[t++]=v*q+x*s+z,k[t++]=y*s+w*q+A,k[t++]=d.x0,k[t++]=d.y0,k[t++]=i,k[t++]=j,k[t++]=v*p+x*s+z,k[t++]=y*s+w*p+A,k[t++]=d.x1,k[t++]=d.y1,k[t++]=i,k[t++]=j,k[t++]=v*p+x*r+z,k[t++]=y*r+w*p+A,k[t++]=d.x2,k[t++]=d.y2,k[t++]=i,k[t++]=j,k[t++]=v*q+x*r+z,k[t++]=y*r+w*q+A,k[t++]=d.x3,k[t++]=d.y3,k[t++]=i,k[t++]=j,this.textures[this.currentBatchSize]=c.baseTexture,this.blendModes[this.currentBatchSize]=a.blendMode,this.currentBatchSize++},b.WebGLSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a=this.gl;if(this.renderSession.shaderManager.setShader(this.renderSession.shaderManager.defaultShader),this.dirty){this.dirty=!1,a.activeTexture(a.TEXTURE0),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var b=this.renderSession.projection;a.uniform2f(this.shader.projectionVector,b.x,b.y);var c=4*this.vertSize;a.vertexAttribPointer(this.shader.aVertexPosition,2,a.FLOAT,!1,c,0),a.vertexAttribPointer(this.shader.aTextureCoord,2,a.FLOAT,!1,c,8),a.vertexAttribPointer(this.shader.colorAttribute,2,a.FLOAT,!1,c,16)}if(this.currentBatchSize>.5*this.size)a.bufferSubData(a.ARRAY_BUFFER,0,this.vertices);else{var d=this.vertices.subarray(0,4*this.currentBatchSize*this.vertSize);a.bufferSubData(a.ARRAY_BUFFER,0,d)}for(var e,f,g=0,h=0,i=null,j=this.renderSession.blendModeManager.currentBlendMode,k=0,l=this.currentBatchSize;l>k;k++)e=this.textures[k],f=this.blendModes[k],(i!==e||j!==f)&&(this.renderBatch(i,g,h),h=k,g=0,i=e,j=f,this.renderSession.blendModeManager.setBlendMode(j)),g++;this.renderBatch(i,g,h),this.currentBatchSize=0}},b.WebGLSpriteBatch.prototype.renderBatch=function(a,c,d){if(0!==c){var e=this.gl;e.bindTexture(e.TEXTURE_2D,a._glTextures[e.id]||b.createWebGLTexture(a,e)),a._dirty[e.id]&&b.updateWebGLTexture(this.currentBaseTexture,e),e.drawElements(e.TRIANGLES,6*c,e.UNSIGNED_SHORT,6*d*2),this.renderSession.drawCount++}},b.WebGLSpriteBatch.prototype.stop=function(){this.flush()},b.WebGLSpriteBatch.prototype.start=function(){this.dirty=!0},b.WebGLSpriteBatch.prototype.destroy=function(){this.vertices=null,this.indices=null,this.gl.deleteBuffer(this.vertexBuffer),this.gl.deleteBuffer(this.indexBuffer),this.currentBaseTexture=null,this.gl=null},b.WebGLFastSpriteBatch=function(a){this.vertSize=10,this.maxSize=6e3,this.size=this.maxSize;var b=4*this.size*this.vertSize,c=6*this.maxSize;this.vertices=new Float32Array(b),this.indices=new Uint16Array(c),this.vertexBuffer=null,this.indexBuffer=null,this.lastIndexCount=0;for(var d=0,e=0;c>d;d+=6,e+=4)this.indices[d+0]=e+0,this.indices[d+1]=e+1,this.indices[d+2]=e+2,this.indices[d+3]=e+0,this.indices[d+4]=e+2,this.indices[d+5]=e+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.currentBlendMode=0,this.renderSession=null,this.shader=null,this.matrix=null,this.setContext(a)},b.WebGLFastSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW)},b.WebGLFastSpriteBatch.prototype.begin=function(a,b){this.renderSession=b,this.shader=this.renderSession.shaderManager.fastShader,this.matrix=a.worldTransform.toArray(!0),this.start()},b.WebGLFastSpriteBatch.prototype.end=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.render=function(a){var b=a.children,c=b[0];if(c.texture._uvs){this.currentBaseTexture=c.texture.baseTexture,c.blendMode!==this.renderSession.blendModeManager.currentBlendMode&&(this.flush(),this.renderSession.blendModeManager.setBlendMode(c.blendMode));for(var d=0,e=b.length;e>d;d++)this.renderSprite(b[d]);this.flush()}},b.WebGLFastSpriteBatch.prototype.renderSprite=function(a){if(a.visible&&(a.texture.baseTexture===this.currentBaseTexture||(this.flush(),this.currentBaseTexture=a.texture.baseTexture,a.texture._uvs))){var b,c,d,e,f,g,h,i,j=this.vertices;if(b=a.texture._uvs,c=a.texture.frame.width,d=a.texture.frame.height,a.texture.trim){var k=a.texture.trim;f=k.x-a.anchor.x*k.width,e=f+a.texture.crop.width,h=k.y-a.anchor.y*k.height,g=h+a.texture.crop.height}else e=a.texture.frame.width*(1-a.anchor.x),f=a.texture.frame.width*-a.anchor.x,g=a.texture.frame.height*(1-a.anchor.y),h=a.texture.frame.height*-a.anchor.y;i=4*this.currentBatchSize*this.vertSize,j[i++]=f,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x0,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x1,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x2,j[i++]=b.y2,j[i++]=a.alpha,j[i++]=f,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x3,j[i++]=b.y3,j[i++]=a.alpha,this.currentBatchSize++,this.currentBatchSize>=this.size&&this.flush()}},b.WebGLFastSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a=this.gl;if(this.currentBaseTexture._glTextures[a.id]||b.createWebGLTexture(this.currentBaseTexture,a),a.bindTexture(a.TEXTURE_2D,this.currentBaseTexture._glTextures[a.id]),this.currentBatchSize>.5*this.size)a.bufferSubData(a.ARRAY_BUFFER,0,this.vertices);else{var c=this.vertices.subarray(0,4*this.currentBatchSize*this.vertSize);a.bufferSubData(a.ARRAY_BUFFER,0,c)}a.drawElements(a.TRIANGLES,6*this.currentBatchSize,a.UNSIGNED_SHORT,0),this.currentBatchSize=0,this.renderSession.drawCount++}},b.WebGLFastSpriteBatch.prototype.stop=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.start=function(){var a=this.gl;a.activeTexture(a.TEXTURE0),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var b=this.renderSession.projection;a.uniform2f(this.shader.projectionVector,b.x,b.y),a.uniformMatrix3fv(this.shader.uMatrix,!1,this.matrix);var c=4*this.vertSize;a.vertexAttribPointer(this.shader.aVertexPosition,2,a.FLOAT,!1,c,0),a.vertexAttribPointer(this.shader.aPositionCoord,2,a.FLOAT,!1,c,8),a.vertexAttribPointer(this.shader.aScale,2,a.FLOAT,!1,c,16),a.vertexAttribPointer(this.shader.aRotation,1,a.FLOAT,!1,c,24),a.vertexAttribPointer(this.shader.aTextureCoord,2,a.FLOAT,!1,c,28),a.vertexAttribPointer(this.shader.colorAttribute,1,a.FLOAT,!1,c,36)},b.WebGLFilterManager=function(a,b){this.transparent=b,this.filterStack=[],this.offsetX=0,this.offsetY=0,this.setContext(a)},b.WebGLFilterManager.prototype.setContext=function(a){this.gl=a,this.texturePool=[],this.initShaderBuffers()},b.WebGLFilterManager.prototype.begin=function(a,b){this.renderSession=a,this.defaultShader=a.shaderManager.defaultShader;var c=this.renderSession.projection;this.width=2*c.x,this.height=2*-c.y,this.buffer=b},b.WebGLFilterManager.prototype.pushFilter=function(a){var c=this.gl,d=this.renderSession.projection,e=this.renderSession.offset;a._filterArea=a.target.filterArea||a.target.getBounds(),this.filterStack.push(a);var f=a.filterPasses[0];this.offsetX+=a._filterArea.x,this.offsetY+=a._filterArea.y;var g=this.texturePool.pop();g?g.resize(this.width,this.height):g=new b.FilterTexture(this.gl,this.width,this.height),c.bindTexture(c.TEXTURE_2D,g.texture);var h=a._filterArea,i=f.padding;h.x-=i,h.y-=i,h.width+=2*i,h.height+=2*i,h.x<0&&(h.x=0),h.width>this.width&&(h.width=this.width),h.y<0&&(h.y=0),h.height>this.height&&(h.height=this.height),c.bindFramebuffer(c.FRAMEBUFFER,g.frameBuffer),c.viewport(0,0,h.width,h.height),d.x=h.width/2,d.y=-h.height/2,e.x=-h.x,e.y=-h.y,this.renderSession.shaderManager.setShader(this.defaultShader),c.uniform2f(this.defaultShader.projectionVector,h.width/2,-h.height/2),c.uniform2f(this.defaultShader.offsetVector,-h.x,-h.y),c.colorMask(!0,!0,!0,!0),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),a._glFilterTexture=g},b.WebGLFilterManager.prototype.popFilter=function(){var a=this.gl,c=this.filterStack.pop(),d=c._filterArea,e=c._glFilterTexture,f=this.renderSession.projection,g=this.renderSession.offset;if(c.filterPasses.length>1){a.viewport(0,0,d.width,d.height),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=0,this.vertexArray[1]=d.height,this.vertexArray[2]=d.width,this.vertexArray[3]=d.height,this.vertexArray[4]=0,this.vertexArray[5]=0,this.vertexArray[6]=d.width,this.vertexArray[7]=0,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray);var h=e,i=this.texturePool.pop();i||(i=new b.FilterTexture(this.gl,this.width,this.height)),i.resize(this.width,this.height),a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.clear(a.COLOR_BUFFER_BIT),a.disable(a.BLEND);for(var j=0;j<c.filterPasses.length-1;j++){var k=c.filterPasses[j];a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,h.texture),this.applyFilterPass(k,d,d.width,d.height);var l=h;h=i,i=l}a.enable(a.BLEND),e=h,this.texturePool.push(i)}var m=c.filterPasses[c.filterPasses.length-1];this.offsetX-=d.x,this.offsetY-=d.y;var n=this.width,o=this.height,p=0,q=0,r=this.buffer;if(0===this.filterStack.length)a.colorMask(!0,!0,!0,!0);else{var s=this.filterStack[this.filterStack.length-1];d=s._filterArea,n=d.width,o=d.height,p=d.x,q=d.y,r=s._glFilterTexture.frameBuffer}f.x=n/2,f.y=-o/2,g.x=p,g.y=q,d=c._filterArea;var t=d.x-p,u=d.y-q;a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=t,this.vertexArray[1]=u+d.height,this.vertexArray[2]=t+d.width,this.vertexArray[3]=u+d.height,this.vertexArray[4]=t,this.vertexArray[5]=u,this.vertexArray[6]=t+d.width,this.vertexArray[7]=u,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray),a.viewport(0,0,n,o),a.bindFramebuffer(a.FRAMEBUFFER,r),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,e.texture),this.applyFilterPass(m,d,n,o),this.renderSession.shaderManager.setShader(this.defaultShader),a.uniform2f(this.defaultShader.projectionVector,n/2,-o/2),a.uniform2f(this.defaultShader.offsetVector,-p,-q),this.texturePool.push(e),c._glFilterTexture=null},b.WebGLFilterManager.prototype.applyFilterPass=function(a,c,d,e){var f=this.gl,g=a.shaders[f.id];g||(g=new b.PixiShader(f),g.fragmentSrc=a.fragmentSrc,g.uniforms=a.uniforms,g.init(),a.shaders[f.id]=g),this.renderSession.shaderManager.setShader(g),f.uniform2f(g.projectionVector,d/2,-e/2),f.uniform2f(g.offsetVector,0,0),a.uniforms.dimensions&&(a.uniforms.dimensions.value[0]=this.width,a.uniforms.dimensions.value[1]=this.height,a.uniforms.dimensions.value[2]=this.vertexArray[0],a.uniforms.dimensions.value[3]=this.vertexArray[5]),g.syncUniforms(),f.bindBuffer(f.ARRAY_BUFFER,this.vertexBuffer),f.vertexAttribPointer(g.aVertexPosition,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.uvBuffer),f.vertexAttribPointer(g.aTextureCoord,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.colorBuffer),f.vertexAttribPointer(g.colorAttribute,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,this.indexBuffer),f.drawElements(f.TRIANGLES,6,f.UNSIGNED_SHORT,0),this.renderSession.drawCount++},b.WebGLFilterManager.prototype.initShaderBuffers=function(){var a=this.gl;this.vertexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.vertexArray=new Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertexArray,a.STATIC_DRAW),this.uvArray=new Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),a.bufferData(a.ARRAY_BUFFER,this.uvArray,a.STATIC_DRAW),this.colorArray=new Float32Array([1,16777215,1,16777215,1,16777215,1,16777215]),a.bindBuffer(a.ARRAY_BUFFER,this.colorBuffer),a.bufferData(a.ARRAY_BUFFER,this.colorArray,a.STATIC_DRAW),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),a.STATIC_DRAW)},b.WebGLFilterManager.prototype.destroy=function(){var a=this.gl;this.filterStack=null,this.offsetX=0,this.offsetY=0;for(var b=0;b<this.texturePool.length;b++)this.texturePool[b].destroy();this.texturePool=null,a.deleteBuffer(this.vertexBuffer),a.deleteBuffer(this.uvBuffer),a.deleteBuffer(this.colorBuffer),a.deleteBuffer(this.indexBuffer)},b.FilterTexture=function(a,c,d,e){this.gl=a,this.frameBuffer=a.createFramebuffer(),this.texture=a.createTexture(),e=e||b.scaleModes.DEFAULT,a.bindTexture(a.TEXTURE_2D,this.texture),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.bindFramebuffer(a.FRAMEBUFFER,this.framebuffer),a.bindFramebuffer(a.FRAMEBUFFER,this.frameBuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.texture,0),this.renderBuffer=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,this.renderBuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,this.renderBuffer),this.resize(c,d)},b.FilterTexture.prototype.clear=function(){var a=this.gl;a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT)},b.FilterTexture.prototype.resize=function(a,b){if(this.width!==a||this.height!==b){this.width=a,this.height=b;var c=this.gl;c.bindTexture(c.TEXTURE_2D,this.texture),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,a,b,0,c.RGBA,c.UNSIGNED_BYTE,null),c.bindRenderbuffer(c.RENDERBUFFER,this.renderBuffer),c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_STENCIL,a,b)}},b.FilterTexture.prototype.destroy=function(){var a=this.gl;a.deleteFramebuffer(this.frameBuffer),a.deleteTexture(this.texture),this.frameBuffer=null,this.texture=null},b.CanvasMaskManager=function(){},b.CanvasMaskManager.prototype.pushMask=function(a,c){c.save();var d=a.alpha,e=a.worldTransform;c.setTransform(e.a,e.c,e.b,e.d,e.tx,e.ty),b.CanvasGraphics.renderGraphicsMask(a,c),c.clip(),a.worldAlpha=d},b.CanvasMaskManager.prototype.popMask=function(a){a.restore()},b.CanvasTinter=function(){},b.CanvasTinter.getTintedTexture=function(a,c){var d=a.texture;c=b.CanvasTinter.roundColor(c);var e="#"+("00000"+(0|c).toString(16)).substr(-6);if(d.tintCache=d.tintCache||{},d.tintCache[e])return d.tintCache[e];var f=b.CanvasTinter.canvas||document.createElement("canvas");if(b.CanvasTinter.tintMethod(d,c,f),b.CanvasTinter.convertTintToImage){var g=new Image;g.src=f.toDataURL(),d.tintCache[e]=g}else d.tintCache[e]=f,b.CanvasTinter.canvas=null;return f},b.CanvasTinter.tintWithMultiply=function(a,b,c){var d=c.getContext("2d"),e=a.frame;c.width=e.width,c.height=e.height,d.fillStyle="#"+("00000"+(0|b).toString(16)).substr(-6),d.fillRect(0,0,e.width,e.height),d.globalCompositeOperation="multiply",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height),d.globalCompositeOperation="destination-atop",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height)},b.CanvasTinter.tintWithOverlay=function(a,b,c){var d=c.getContext("2d"),e=a.frame;c.width=e.width,c.height=e.height,d.globalCompositeOperation="copy",d.fillStyle="#"+("00000"+(0|b).toString(16)).substr(-6),d.fillRect(0,0,e.width,e.height),d.globalCompositeOperation="destination-atop",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height)},b.CanvasTinter.tintWithPerPixel=function(a,c,d){var e=d.getContext("2d"),f=a.frame;d.width=f.width,d.height=f.height,e.globalCompositeOperation="copy",e.drawImage(a.baseTexture.source,f.x,f.y,f.width,f.height,0,0,f.width,f.height);for(var g=b.hex2rgb(c),h=g[0],i=g[1],j=g[2],k=e.getImageData(0,0,f.width,f.height),l=k.data,m=0;m<l.length;m+=4)l[m+0]*=h,l[m+1]*=i,l[m+2]*=j;e.putImageData(k,0,0)},b.CanvasTinter.roundColor=function(a){var c=b.CanvasTinter.cacheStepsPerColorChannel,d=b.hex2rgb(a);return d[0]=Math.min(255,d[0]/c*c),d[1]=Math.min(255,d[1]/c*c),d[2]=Math.min(255,d[2]/c*c),b.rgb2hex(d)},b.CanvasTinter.cacheStepsPerColorChannel=8,b.CanvasTinter.convertTintToImage=!1,b.CanvasTinter.canUseMultiply=b.canUseNewCanvasBlendModes(),b.CanvasTinter.tintMethod=b.CanvasTinter.canUseMultiply?b.CanvasTinter.tintWithMultiply:b.CanvasTinter.tintWithPerPixel,b.CanvasRenderer=function(a,c,d,e){b.defaultRenderer||(b.sayHello("Canvas"),b.defaultRenderer=this),this.type=b.CANVAS_RENDERER,this.clearBeforeRender=!0,this.transparent=!!e,b.blendModesCanvas||(b.blendModesCanvas=[],b.canUseNewCanvasBlendModes()?(b.blendModesCanvas[b.blendModes.NORMAL]="source-over",b.blendModesCanvas[b.blendModes.ADD]="lighter",b.blendModesCanvas[b.blendModes.MULTIPLY]="multiply",b.blendModesCanvas[b.blendModes.SCREEN]="screen",b.blendModesCanvas[b.blendModes.OVERLAY]="overlay",b.blendModesCanvas[b.blendModes.DARKEN]="darken",b.blendModesCanvas[b.blendModes.LIGHTEN]="lighten",b.blendModesCanvas[b.blendModes.COLOR_DODGE]="color-dodge",b.blendModesCanvas[b.blendModes.COLOR_BURN]="color-burn",b.blendModesCanvas[b.blendModes.HARD_LIGHT]="hard-light",b.blendModesCanvas[b.blendModes.SOFT_LIGHT]="soft-light",b.blendModesCanvas[b.blendModes.DIFFERENCE]="difference",b.blendModesCanvas[b.blendModes.EXCLUSION]="exclusion",b.blendModesCanvas[b.blendModes.HUE]="hue",b.blendModesCanvas[b.blendModes.SATURATION]="saturation",b.blendModesCanvas[b.blendModes.COLOR]="color",b.blendModesCanvas[b.blendModes.LUMINOSITY]="luminosity"):(b.blendModesCanvas[b.blendModes.NORMAL]="source-over",b.blendModesCanvas[b.blendModes.ADD]="lighter",b.blendModesCanvas[b.blendModes.MULTIPLY]="source-over",b.blendModesCanvas[b.blendModes.SCREEN]="source-over",b.blendModesCanvas[b.blendModes.OVERLAY]="source-over",b.blendModesCanvas[b.blendModes.DARKEN]="source-over",b.blendModesCanvas[b.blendModes.LIGHTEN]="source-over",b.blendModesCanvas[b.blendModes.COLOR_DODGE]="source-over",b.blendModesCanvas[b.blendModes.COLOR_BURN]="source-over",b.blendModesCanvas[b.blendModes.HARD_LIGHT]="source-over",b.blendModesCanvas[b.blendModes.SOFT_LIGHT]="source-over",b.blendModesCanvas[b.blendModes.DIFFERENCE]="source-over",b.blendModesCanvas[b.blendModes.EXCLUSION]="source-over",b.blendModesCanvas[b.blendModes.HUE]="source-over",b.blendModesCanvas[b.blendModes.SATURATION]="source-over",b.blendModesCanvas[b.blendModes.COLOR]="source-over",b.blendModesCanvas[b.blendModes.LUMINOSITY]="source-over")),this.width=a||800,this.height=c||600,this.view=d||document.createElement("canvas"),this.context=this.view.getContext("2d",{alpha:this.transparent}),this.refresh=!0,this.view.width=this.width,this.view.height=this.height,this.count=0,this.maskManager=new b.CanvasMaskManager,this.renderSession={context:this.context,maskManager:this.maskManager,scaleMode:null,smoothProperty:null,roundPixels:!1},"imageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="imageSmoothingEnabled":"webkitImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="webkitImageSmoothingEnabled":"mozImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="mozImageSmoothingEnabled":"oImageSmoothingEnabled"in this.context&&(this.renderSession.smoothProperty="oImageSmoothingEnabled")},b.CanvasRenderer.prototype.constructor=b.CanvasRenderer,b.CanvasRenderer.prototype.render=function(a){b.texturesToUpdate.length=0,b.texturesToDestroy.length=0,a.updateTransform(),this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,navigator.isCocoonJS&&this.view.screencanvas&&(this.context.fillStyle="black",this.context.clear()),!this.transparent&&this.clearBeforeRender?(this.context.fillStyle=a.backgroundColorString,this.context.fillRect(0,0,this.width,this.height)):this.transparent&&this.clearBeforeRender&&this.context.clearRect(0,0,this.width,this.height),this.renderDisplayObject(a),a.interactive&&(a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this))),b.Texture.frameUpdates.length>0&&(b.Texture.frameUpdates.length=0)
},b.CanvasRenderer.prototype.resize=function(a,b){this.width=a,this.height=b,this.view.width=a,this.view.height=b},b.CanvasRenderer.prototype.renderDisplayObject=function(a,b){this.renderSession.context=b||this.context,a._renderCanvas(this.renderSession)},b.CanvasRenderer.prototype.renderStripFlat=function(a){var b=this.context,c=a.verticies,d=c.length/2;this.count++,b.beginPath();for(var e=1;d-2>e;e++){var f=2*e,g=c[f],h=c[f+2],i=c[f+4],j=c[f+1],k=c[f+3],l=c[f+5];b.moveTo(g,j),b.lineTo(h,k),b.lineTo(i,l)}b.fillStyle="#FF0000",b.fill(),b.closePath()},b.CanvasRenderer.prototype.renderStrip=function(a){var b=this.context,c=a.verticies,d=a.uvs,e=c.length/2;this.count++;for(var f=1;e-2>f;f++){var g=2*f,h=c[g],i=c[g+2],j=c[g+4],k=c[g+1],l=c[g+3],m=c[g+5],n=d[g]*a.texture.width,o=d[g+2]*a.texture.width,p=d[g+4]*a.texture.width,q=d[g+1]*a.texture.height,r=d[g+3]*a.texture.height,s=d[g+5]*a.texture.height;b.save(),b.beginPath(),b.moveTo(h,k),b.lineTo(i,l),b.lineTo(j,m),b.closePath(),b.clip();var t=n*r+q*p+o*s-r*p-q*o-n*s,u=h*r+q*j+i*s-r*j-q*i-h*s,v=n*i+h*p+o*j-i*p-h*o-n*j,w=n*r*j+q*i*p+h*o*s-h*r*p-q*o*j-n*i*s,x=k*r+q*m+l*s-r*m-q*l-k*s,y=n*l+k*p+o*m-l*p-k*o-n*m,z=n*r*m+q*l*p+k*o*s-k*r*p-q*o*m-n*l*s;b.transform(u/t,x/t,v/t,y/t,w/t,z/t),b.drawImage(a.texture.baseTexture.source,0,0),b.restore()}},b.CanvasBuffer=function(a,b){this.width=a,this.height=b,this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=a,this.canvas.height=b},b.CanvasBuffer.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},b.CanvasBuffer.prototype.resize=function(a,b){this.width=this.canvas.width=a,this.height=this.canvas.height=b},b.CanvasGraphics=function(){},b.CanvasGraphics.renderGraphics=function(a,c){for(var d=a.worldAlpha,e="",f=0;f<a.graphicsData.length;f++){var g=a.graphicsData[f],h=g.points;if(c.strokeStyle=e="#"+("00000"+(0|g.lineColor).toString(16)).substr(-6),c.lineWidth=g.lineWidth,g.type===b.Graphics.POLY){c.beginPath(),c.moveTo(h[0],h[1]);for(var i=1;i<h.length/2;i++)c.lineTo(h[2*i],h[2*i+1]);h[0]===h[h.length-2]&&h[1]===h[h.length-1]&&c.closePath(),g.fill&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fill()),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.stroke())}else if(g.type===b.Graphics.RECT)(g.fillColor||0===g.fillColor)&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fillRect(h[0],h[1],h[2],h[3])),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.strokeRect(h[0],h[1],h[2],h[3]));else if(g.type===b.Graphics.CIRC)c.beginPath(),c.arc(h[0],h[1],h[2],0,2*Math.PI),c.closePath(),g.fill&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fill()),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.stroke());else if(g.type===b.Graphics.ELIP){var j=g.points,k=2*j[2],l=2*j[3],m=j[0]-k/2,n=j[1]-l/2;c.beginPath();var o=.5522848,p=k/2*o,q=l/2*o,r=m+k,s=n+l,t=m+k/2,u=n+l/2;c.moveTo(m,u),c.bezierCurveTo(m,u-q,t-p,n,t,n),c.bezierCurveTo(t+p,n,r,u-q,r,u),c.bezierCurveTo(r,u+q,t+p,s,t,s),c.bezierCurveTo(t-p,s,m,u+q,m,u),c.closePath(),g.fill&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fill()),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.stroke())}else if(g.type===b.Graphics.RREC){var v=h[0],w=h[1],x=h[2],y=h[3],z=h[4],A=Math.min(x,y)/2|0;z=z>A?A:z,c.beginPath(),c.moveTo(v,w+z),c.lineTo(v,w+y-z),c.quadraticCurveTo(v,w+y,v+z,w+y),c.lineTo(v+x-z,w+y),c.quadraticCurveTo(v+x,w+y,v+x,w+y-z),c.lineTo(v+x,w+z),c.quadraticCurveTo(v+x,w,v+x-z,w),c.lineTo(v+z,w),c.quadraticCurveTo(v,w,v,w+z),c.closePath(),(g.fillColor||0===g.fillColor)&&(c.globalAlpha=g.fillAlpha*d,c.fillStyle=e="#"+("00000"+(0|g.fillColor).toString(16)).substr(-6),c.fill()),g.lineWidth&&(c.globalAlpha=g.lineAlpha*d,c.stroke())}}},b.CanvasGraphics.renderGraphicsMask=function(a,c){var d=a.graphicsData.length;if(0!==d){d>1&&(d=1,window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));for(var e=0;1>e;e++){var f=a.graphicsData[e],g=f.points;if(f.type===b.Graphics.POLY){c.beginPath(),c.moveTo(g[0],g[1]);for(var h=1;h<g.length/2;h++)c.lineTo(g[2*h],g[2*h+1]);g[0]===g[g.length-2]&&g[1]===g[g.length-1]&&c.closePath()}else if(f.type===b.Graphics.RECT)c.beginPath(),c.rect(g[0],g[1],g[2],g[3]),c.closePath();else if(f.type===b.Graphics.CIRC)c.beginPath(),c.arc(g[0],g[1],g[2],0,2*Math.PI),c.closePath();else if(f.type===b.Graphics.ELIP){var i=f.points,j=2*i[2],k=2*i[3],l=i[0]-j/2,m=i[1]-k/2;c.beginPath();var n=.5522848,o=j/2*n,p=k/2*n,q=l+j,r=m+k,s=l+j/2,t=m+k/2;c.moveTo(l,t),c.bezierCurveTo(l,t-p,s-o,m,s,m),c.bezierCurveTo(s+o,m,q,t-p,q,t),c.bezierCurveTo(q,t+p,s+o,r,s,r),c.bezierCurveTo(s-o,r,l,t+p,l,t),c.closePath()}else if(f.type===b.Graphics.RREC){var u=g[0],v=g[1],w=g[2],x=g[3],y=g[4],z=Math.min(w,x)/2|0;y=y>z?z:y,c.beginPath(),c.moveTo(u,v+y),c.lineTo(u,v+x-y),c.quadraticCurveTo(u,v+x,u+y,v+x),c.lineTo(u+w-y,v+x),c.quadraticCurveTo(u+w,v+x,u+w,v+x-y),c.lineTo(u+w,v+y),c.quadraticCurveTo(u+w,v,u+w-y,v),c.lineTo(u+y,v),c.quadraticCurveTo(u,v,u,v+y),c.closePath()}}}},b.Graphics=function(){b.DisplayObjectContainer.call(this),this.renderable=!0,this.fillAlpha=1,this.lineWidth=0,this.lineColor="black",this.graphicsData=[],this.tint=16777215,this.blendMode=b.blendModes.NORMAL,this.currentPath={points:[]},this._webGL=[],this.isMask=!1,this.bounds=null,this.boundsPadding=10,this.dirty=!0},b.Graphics.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Graphics.prototype.constructor=b.Graphics,Object.defineProperty(b.Graphics.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(a){this._cacheAsBitmap=a,this._cacheAsBitmap?this._generateCachedSprite():(this.destroyCachedSprite(),this.dirty=!0)}}),b.Graphics.prototype.lineStyle=function(a,c,d){return this.currentPath.points.length||this.graphicsData.pop(),this.lineWidth=a||0,this.lineColor=c||0,this.lineAlpha=arguments.length<3?1:d,this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:b.Graphics.POLY},this.graphicsData.push(this.currentPath),this},b.Graphics.prototype.moveTo=function(a,c){return this.currentPath.points.length||this.graphicsData.pop(),this.currentPath=this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:b.Graphics.POLY},this.currentPath.points.push(a,c),this.graphicsData.push(this.currentPath),this},b.Graphics.prototype.lineTo=function(a,b){return this.currentPath.points.push(a,b),this.dirty=!0,this},b.Graphics.prototype.quadraticCurveTo=function(a,b,c,d){0===this.currentPath.points.length&&this.moveTo(0,0);var e,f,g=20,h=this.currentPath.points;0===h.length&&this.moveTo(0,0);for(var i=h[h.length-2],j=h[h.length-1],k=0,l=1;g>=l;l++)k=l/g,e=i+(a-i)*k,f=j+(b-j)*k,h.push(e+(a+(c-a)*k-e)*k,f+(b+(d-b)*k-f)*k);return this.dirty=!0,this},b.Graphics.prototype.bezierCurveTo=function(a,b,c,d,e,f){0===this.currentPath.points.length&&this.moveTo(0,0);for(var g,h,i,j,k,l=20,m=this.currentPath.points,n=m[m.length-2],o=m[m.length-1],p=0,q=1;l>q;q++)p=q/l,g=1-p,h=g*g,i=h*g,j=p*p,k=j*p,m.push(i*n+3*h*p*a+3*g*j*c+k*e,i*o+3*h*p*b+3*g*j*d+k*f);return this.dirty=!0,this},b.Graphics.prototype.arcTo=function(a,b,c,d,e){0===this.currentPath.points.length&&this.moveTo(a,b);var f=this.currentPath.points,g=f[f.length-2],h=f[f.length-1],i=h-b,j=g-a,k=d-b,l=c-a,m=Math.abs(i*l-j*k);if(1e-8>m||0===e)f.push(a,b);else{var n=i*i+j*j,o=k*k+l*l,p=i*k+j*l,q=e*Math.sqrt(n)/m,r=e*Math.sqrt(o)/m,s=q*p/n,t=r*p/o,u=q*l+r*j,v=q*k+r*i,w=j*(r+s),x=i*(r+s),y=l*(q+t),z=k*(q+t),A=Math.atan2(x-v,w-u),B=Math.atan2(z-v,y-u);this.arc(u+a,v+b,e,A,B,j*k>l*i)}return this.dirty=!0,this},b.Graphics.prototype.arc=function(a,b,c,d,e,f){var g=a+Math.cos(d)*c,h=b+Math.sin(d)*c,i=this.currentPath.points;if((0!==i.length&&i[i.length-2]!==g||i[i.length-1]!==h)&&(this.moveTo(g,h),i=this.currentPath.points),d===e)return this;!f&&d>=e?e+=2*Math.PI:f&&e>=d&&(d+=2*Math.PI);var j=f?-1*(d-e):e-d,k=Math.abs(j)/(2*Math.PI)*40;if(0===j)return this;for(var l=j/(2*k),m=2*l,n=Math.cos(l),o=Math.sin(l),p=k-1,q=p%1/p,r=0;p>=r;r++){var s=r+q*r,t=l+d+m*s,u=Math.cos(t),v=-Math.sin(t);i.push((n*u+o*v)*c+a,(n*-v+o*u)*c+b)}return this.dirty=!0,this},b.Graphics.prototype.drawPath=function(a){return this.currentPath.points.length||this.graphicsData.pop(),this.currentPath=this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[],type:b.Graphics.POLY},this.graphicsData.push(this.currentPath),this.currentPath.points=this.currentPath.points.concat(a),this.dirty=!0,this},b.Graphics.prototype.beginFill=function(a,b){return this.filling=!0,this.fillColor=a||0,this.fillAlpha=arguments.length<2?1:b,this},b.Graphics.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},b.Graphics.prototype.drawRect=function(a,c,d,e){return this.currentPath.points.length||this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,c,d,e],type:b.Graphics.RECT},this.graphicsData.push(this.currentPath),this.dirty=!0,this},b.Graphics.prototype.drawRoundedRect=function(a,c,d,e,f){return this.currentPath.points.length||this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,c,d,e,f],type:b.Graphics.RREC},this.graphicsData.push(this.currentPath),this.dirty=!0,this},b.Graphics.prototype.drawCircle=function(a,c,d){return this.currentPath.points.length||this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,c,d,d],type:b.Graphics.CIRC},this.graphicsData.push(this.currentPath),this.dirty=!0,this},b.Graphics.prototype.drawEllipse=function(a,c,d,e){return this.currentPath.points.length||this.graphicsData.pop(),this.currentPath={lineWidth:this.lineWidth,lineColor:this.lineColor,lineAlpha:this.lineAlpha,fillColor:this.fillColor,fillAlpha:this.fillAlpha,fill:this.filling,points:[a,c,d,e],type:b.Graphics.ELIP},this.graphicsData.push(this.currentPath),this.dirty=!0,this},b.Graphics.prototype.clear=function(){return this.lineWidth=0,this.filling=!1,this.dirty=!0,this.clearDirty=!0,this.graphicsData=[],this.bounds=null,this},b.Graphics.prototype.generateTexture=function(){var a=this.getBounds(),c=new b.CanvasBuffer(a.width,a.height),d=b.Texture.fromCanvas(c.canvas);return c.context.translate(-a.x,-a.y),b.CanvasGraphics.renderGraphics(this,c.context),d},b.Graphics.prototype._renderWebGL=function(a){if(this.visible!==!1&&0!==this.alpha&&this.isMask!==!0){if(this._cacheAsBitmap)return this.dirty&&(this._generateCachedSprite(),b.updateWebGLTexture(this._cachedSprite.texture.baseTexture,a.gl),this.dirty=!1),this._cachedSprite.alpha=this.alpha,b.Sprite.prototype._renderWebGL.call(this._cachedSprite,a),void 0;if(a.spriteBatch.stop(),a.blendModeManager.setBlendMode(this.blendMode),this._mask&&a.maskManager.pushMask(this._mask,a),this._filters&&a.filterManager.pushFilter(this._filterBlock),this.blendMode!==a.spriteBatch.currentBlendMode){a.spriteBatch.currentBlendMode=this.blendMode;var c=b.blendModesWebGL[a.spriteBatch.currentBlendMode];a.spriteBatch.gl.blendFunc(c[0],c[1])}if(b.WebGLGraphics.renderGraphics(this,a),this.children.length){a.spriteBatch.start();for(var d=0,e=this.children.length;e>d;d++)this.children[d]._renderWebGL(a);a.spriteBatch.stop()}this._filters&&a.filterManager.popFilter(),this._mask&&a.maskManager.popMask(this.mask,a),a.drawCount++,a.spriteBatch.start()}},b.Graphics.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha&&this.isMask!==!0){var c=a.context,d=this.worldTransform;this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,c.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]),this._mask&&a.maskManager.pushMask(this._mask,a.context),c.setTransform(d.a,d.c,d.b,d.d,d.tx,d.ty),b.CanvasGraphics.renderGraphics(this,c);for(var e=0,f=this.children.length;f>e;e++)this.children[e]._renderCanvas(a);this._mask&&a.maskManager.popMask(a.context)}},b.Graphics.prototype.getBounds=function(a){this.bounds||this.updateBounds();var b=this.bounds.x,c=this.bounds.width+this.bounds.x,d=this.bounds.y,e=this.bounds.height+this.bounds.y,f=a||this.worldTransform,g=f.a,h=f.c,i=f.b,j=f.d,k=f.tx,l=f.ty,m=g*c+i*e+k,n=j*e+h*c+l,o=g*b+i*e+k,p=j*e+h*b+l,q=g*b+i*d+k,r=j*d+h*b+l,s=g*c+i*d+k,t=j*d+h*c+l,u=m,v=n,w=m,x=n;w=w>o?o:w,w=w>q?q:w,w=w>s?s:w,x=x>p?p:x,x=x>r?r:x,x=x>t?t:x,u=o>u?o:u,u=q>u?q:u,u=s>u?s:u,v=p>v?p:v,v=r>v?r:v,v=t>v?t:v;var y=this._bounds;return y.x=w,y.width=u-w,y.y=x,y.height=v-x,y},b.Graphics.prototype.updateBounds=function(){for(var a,c,d,e,f,g=1/0,h=-1/0,i=1/0,j=-1/0,k=0;k<this.graphicsData.length;k++){var l=this.graphicsData[k],m=l.type,n=l.lineWidth;if(a=l.points,m===b.Graphics.RECT)c=a[0]-n/2,d=a[1]-n/2,e=a[2]+n,f=a[3]+n,g=g>c?c:g,h=c+e>h?c+e:h,i=i>d?c:i,j=d+f>j?d+f:j;else if(m===b.Graphics.CIRC||m===b.Graphics.ELIP)c=a[0],d=a[1],e=a[2]+n/2,f=a[3]+n/2,g=g>c-e?c-e:g,h=c+e>h?c+e:h,i=i>d-f?d-f:i,j=d+f>j?d+f:j;else for(var o=0;o<a.length;o+=2)c=a[o],d=a[o+1],g=g>c-n?c-n:g,h=c+n>h?c+n:h,i=i>d-n?d-n:i,j=d+n>j?d+n:j}var p=this.boundsPadding;this.bounds=new b.Rectangle(g-p,i-p,h-g+2*p,j-i+2*p)},b.Graphics.prototype._generateCachedSprite=function(){var a=this.getLocalBounds();if(this._cachedSprite)this._cachedSprite.buffer.resize(a.width,a.height);else{var c=new b.CanvasBuffer(a.width,a.height),d=b.Texture.fromCanvas(c.canvas);this._cachedSprite=new b.Sprite(d),this._cachedSprite.buffer=c,this._cachedSprite.worldTransform=this.worldTransform}this._cachedSprite.anchor.x=-(a.x/a.width),this._cachedSprite.anchor.y=-(a.y/a.height),this._cachedSprite.buffer.context.translate(-a.x,-a.y),b.CanvasGraphics.renderGraphics(this,this._cachedSprite.buffer.context),this._cachedSprite.alpha=this.alpha},b.Graphics.prototype.destroyCachedSprite=function(){this._cachedSprite.texture.destroy(!0),this._cachedSprite=null},b.Graphics.POLY=0,b.Graphics.RECT=1,b.Graphics.CIRC=2,b.Graphics.ELIP=3,b.Graphics.RREC=4,b.Strip=function(a){b.DisplayObjectContainer.call(this),this.texture=a,this.uvs=new b.Float32Array([0,1,1,1,1,0,0,1]),this.verticies=new b.Float32Array([0,0,100,0,100,100,0,100]),this.colors=new b.Float32Array([1,1,1,1]),this.indices=new b.Uint16Array([0,1,2,3]),this.dirty=!0},b.Strip.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Strip.prototype.constructor=b.Strip,b.Strip.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||(a.spriteBatch.stop(),this._vertexBuffer||this._initWebGL(a),a.shaderManager.setShader(a.shaderManager.stripShader),this._renderStrip(a),a.spriteBatch.start())},b.Strip.prototype._initWebGL=function(a){var b=a.gl;this._vertexBuffer=b.createBuffer(),this._indexBuffer=b.createBuffer(),this._uvBuffer=b.createBuffer(),this._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,this._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,this.verticies,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._uvBuffer),b.bufferData(b.ARRAY_BUFFER,this.uvs,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._colorBuffer),b.bufferData(b.ARRAY_BUFFER,this.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,this.indices,b.STATIC_DRAW)},b.Strip.prototype._renderStrip=function(a){var c=a.gl,d=a.projection,e=a.offset,f=a.shaderManager.stripShader;c.blendFunc(c.ONE,c.ONE_MINUS_SRC_ALPHA),c.uniformMatrix3fv(f.translationMatrix,!1,this.worldTransform.toArray(!0)),c.uniform2f(f.projectionVector,d.x,-d.y),c.uniform2f(f.offsetVector,-e.x,-e.y),c.uniform1f(f.alpha,1),this.dirty?(this.dirty=!1,c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferData(c.ARRAY_BUFFER,this.verticies,c.STATIC_DRAW),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.bufferData(c.ARRAY_BUFFER,this.uvs,c.STATIC_DRAW),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]||b.createWebGLTexture(this.texture.baseTexture,c)),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,this.indices,c.STATIC_DRAW)):(c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferSubData(c.ARRAY_BUFFER,0,this.verticies),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]||b.createWebGLTexture(this.texture.baseTexture,c)),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer)),c.drawElements(c.TRIANGLE_STRIP,this.indices.length,c.UNSIGNED_SHORT,0)},b.Strip.prototype._renderCanvas=function(a){var b=a.context,c=this.worldTransform;a.roundPixels?b.setTransform(c.a,c.c,c.b,c.d,0|c.tx,0|c.ty):b.setTransform(c.a,c.c,c.b,c.d,c.tx,c.ty);var d=this,e=d.verticies,f=d.uvs,g=e.length/2;this.count++;for(var h=0;g-2>h;h++){var i=2*h,j=e[i],k=e[i+2],l=e[i+4],m=e[i+1],n=e[i+3],o=e[i+5],p=(j+k+l)/3,q=(m+n+o)/3,r=j-p,s=m-q,t=Math.sqrt(r*r+s*s);j=p+r/t*(t+3),m=q+s/t*(t+3),r=k-p,s=n-q,t=Math.sqrt(r*r+s*s),k=p+r/t*(t+3),n=q+s/t*(t+3),r=l-p,s=o-q,t=Math.sqrt(r*r+s*s),l=p+r/t*(t+3),o=q+s/t*(t+3);var u=f[i]*d.texture.width,v=f[i+2]*d.texture.width,w=f[i+4]*d.texture.width,x=f[i+1]*d.texture.height,y=f[i+3]*d.texture.height,z=f[i+5]*d.texture.height;b.save(),b.beginPath(),b.moveTo(j,m),b.lineTo(k,n),b.lineTo(l,o),b.closePath(),b.clip();var A=u*y+x*w+v*z-y*w-x*v-u*z,B=j*y+x*l+k*z-y*l-x*k-j*z,C=u*k+j*w+v*l-k*w-j*v-u*l,D=u*y*l+x*k*w+j*v*z-j*y*w-x*v*l-u*k*z,E=m*y+x*o+n*z-y*o-x*n-m*z,F=u*n+m*w+v*o-n*w-m*v-u*o,G=u*y*o+x*n*w+m*v*z-m*y*w-x*v*o-u*n*z;b.transform(B/A,E/A,C/A,F/A,D/A,G/A),b.drawImage(d.texture.baseTexture.source,0,0),b.restore()}},b.Strip.prototype.onTextureUpdate=function(){this.updateFrame=!0},b.Rope=function(a,c){b.Strip.call(this,a),this.points=c,this.verticies=new b.Float32Array(4*c.length),this.uvs=new b.Float32Array(4*c.length),this.colors=new b.Float32Array(2*c.length),this.indices=new b.Uint16Array(2*c.length),this.refresh()},b.Rope.prototype=Object.create(b.Strip.prototype),b.Rope.prototype.constructor=b.Rope,b.Rope.prototype.refresh=function(){var a=this.points;if(!(a.length<1)){var b=this.uvs,c=a[0],d=this.indices,e=this.colors;this.count-=.2,b[0]=0,b[1]=0,b[2]=0,b[3]=1,e[0]=1,e[1]=1,d[0]=0,d[1]=1;for(var f,g,h,i=a.length,j=1;i>j;j++)f=a[j],g=4*j,h=j/(i-1),j%2?(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1):(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1),g=2*j,e[g]=1,e[g+1]=1,g=2*j,d[g]=g,d[g+1]=g+1,c=f}},b.Rope.prototype.updateTransform=function(){var a=this.points;if(!(a.length<1)){var c,d=a[0],e={x:0,y:0};this.count-=.2;for(var f,g,h,i,j,k=this.verticies,l=a.length,m=0;l>m;m++)f=a[m],g=4*m,c=m<a.length-1?a[m+1]:f,e.y=-(c.x-d.x),e.x=c.y-d.y,h=10*(1-m/(l-1)),h>1&&(h=1),i=Math.sqrt(e.x*e.x+e.y*e.y),j=this.texture.height/2,e.x/=i,e.y/=i,e.x*=j,e.y*=j,k[g]=f.x+e.x,k[g+1]=f.y+e.y,k[g+2]=f.x-e.x,k[g+3]=f.y-e.y,d=f;b.DisplayObjectContainer.prototype.updateTransform.call(this)}},b.Rope.prototype.setTexture=function(a){this.texture=a},b.TilingSprite=function(a,c,d){b.Sprite.call(this,a),this._width=c||100,this._height=d||100,this.tileScale=new b.Point(1,1),this.tileScaleOffset=new b.Point(1,1),this.tilePosition=new b.Point(0,0),this.renderable=!0,this.tint=16777215,this.blendMode=b.blendModes.NORMAL},b.TilingSprite.prototype=Object.create(b.Sprite.prototype),b.TilingSprite.prototype.constructor=b.TilingSprite,Object.defineProperty(b.TilingSprite.prototype,"width",{get:function(){return this._width},set:function(a){this._width=a}}),Object.defineProperty(b.TilingSprite.prototype,"height",{get:function(){return this._height},set:function(a){this._height=a}}),b.TilingSprite.prototype.setTexture=function(a){this.texture!==a&&(this.texture=a,this.refreshTexture=!0,this.cachedTint=16777215)},b.TilingSprite.prototype._renderWebGL=function(a){if(this.visible!==!1&&0!==this.alpha){var c,d;for(this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),!this.tilingTexture||this.refreshTexture?(this.generateTilingTexture(!0),this.tilingTexture&&this.tilingTexture.needsUpdate&&(b.updateWebGLTexture(this.tilingTexture.baseTexture,a.gl),this.tilingTexture.needsUpdate=!1)):a.spriteBatch.renderTilingSprite(this),c=0,d=this.children.length;d>c;c++)this.children[c]._renderWebGL(a);a.spriteBatch.stop(),this._filters&&a.filterManager.popFilter(),this._mask&&a.maskManager.popMask(a),a.spriteBatch.start()}},b.TilingSprite.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){var c=a.context;this._mask&&a.maskManager.pushMask(this._mask,c),c.globalAlpha=this.worldAlpha;var d,e,f=this.worldTransform;if(c.setTransform(f.a,f.c,f.b,f.d,f.tx,f.ty),!this.__tilePattern||this.refreshTexture){if(this.generateTilingTexture(!1),!this.tilingTexture)return;this.__tilePattern=c.createPattern(this.tilingTexture.baseTexture.source,"repeat")}this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,c.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]);var g=this.tilePosition,h=this.tileScale;for(g.x%=this.tilingTexture.baseTexture.width,g.y%=this.tilingTexture.baseTexture.height,c.scale(h.x,h.y),c.translate(g.x,g.y),c.fillStyle=this.__tilePattern,c.fillRect(-g.x+this.anchor.x*-this._width,-g.y+this.anchor.y*-this._height,this._width/h.x,this._height/h.y),c.scale(1/h.x,1/h.y),c.translate(-g.x,-g.y),this._mask&&a.maskManager.popMask(a.context),d=0,e=this.children.length;e>d;d++)this.children[d]._renderCanvas(a)}},b.TilingSprite.prototype.getBounds=function(){var a=this._width,b=this._height,c=a*(1-this.anchor.x),d=a*-this.anchor.x,e=b*(1-this.anchor.y),f=b*-this.anchor.y,g=this.worldTransform,h=g.a,i=g.c,j=g.b,k=g.d,l=g.tx,m=g.ty,n=h*d+j*f+l,o=k*f+i*d+m,p=h*c+j*f+l,q=k*f+i*c+m,r=h*c+j*e+l,s=k*e+i*c+m,t=h*d+j*e+l,u=k*e+i*d+m,v=-1/0,w=-1/0,x=1/0,y=1/0;x=x>n?n:x,x=x>p?p:x,x=x>r?r:x,x=x>t?t:x,y=y>o?o:y,y=y>q?q:y,y=y>s?s:y,y=y>u?u:y,v=n>v?n:v,v=p>v?p:v,v=r>v?r:v,v=t>v?t:v,w=o>w?o:w,w=q>w?q:w,w=s>w?s:w,w=u>w?u:w;var z=this._bounds;return z.x=x,z.width=v-x,z.y=y,z.height=w-y,this._currentBounds=z,z},b.TilingSprite.prototype.onTextureUpdate=function(){},b.TilingSprite.prototype.generateTilingTexture=function(a){if(this.texture.baseTexture.hasLoaded){var c,d,e=this.texture,f=e.frame,g=f.width!==e.baseTexture.width||f.height!==e.baseTexture.height,h=!1;if(a?(c=b.getNextPowerOfTwo(f.width),d=b.getNextPowerOfTwo(f.height),(f.width!==c||f.height!==d)&&(h=!0)):g&&(c=f.width,d=f.height,h=!0),h){var i;this.tilingTexture&&this.tilingTexture.isTiling?(i=this.tilingTexture.canvasBuffer,i.resize(c,d),this.tilingTexture.baseTexture.width=c,this.tilingTexture.baseTexture.height=d,this.tilingTexture.needsUpdate=!0):(i=new b.CanvasBuffer(c,d),this.tilingTexture=b.Texture.fromCanvas(i.canvas),this.tilingTexture.canvasBuffer=i,this.tilingTexture.isTiling=!0),i.context.drawImage(e.baseTexture.source,e.crop.x,e.crop.y,e.crop.width,e.crop.height,0,0,c,d),this.tileScaleOffset.x=f.width/c,this.tileScaleOffset.y=f.height/d}else this.tilingTexture&&this.tilingTexture.isTiling&&this.tilingTexture.destroy(!0),this.tileScaleOffset.x=1,this.tileScaleOffset.y=1,this.tilingTexture=e;this.refreshTexture=!1,this.tilingTexture.baseTexture._powerOf2=!0}};var f={};f.BoneData=function(a,b){this.name=a,this.parent=b},f.BoneData.prototype={length:0,x:0,y:0,rotation:0,scaleX:1,scaleY:1},f.SlotData=function(a,b){this.name=a,this.boneData=b},f.SlotData.prototype={r:1,g:1,b:1,a:1,attachmentName:null},f.Bone=function(a,b){this.data=a,this.parent=b,this.setToSetupPose()},f.Bone.yDown=!1,f.Bone.prototype={x:0,y:0,rotation:0,scaleX:1,scaleY:1,m00:0,m01:0,worldX:0,m10:0,m11:0,worldY:0,worldRotation:0,worldScaleX:1,worldScaleY:1,updateWorldTransform:function(a,b){var c=this.parent;null!=c?(this.worldX=this.x*c.m00+this.y*c.m01+c.worldX,this.worldY=this.x*c.m10+this.y*c.m11+c.worldY,this.worldScaleX=c.worldScaleX*this.scaleX,this.worldScaleY=c.worldScaleY*this.scaleY,this.worldRotation=c.worldRotation+this.rotation):(this.worldX=this.x,this.worldY=this.y,this.worldScaleX=this.scaleX,this.worldScaleY=this.scaleY,this.worldRotation=this.rotation);var d=this.worldRotation*Math.PI/180,e=Math.cos(d),g=Math.sin(d);this.m00=e*this.worldScaleX,this.m10=g*this.worldScaleX,this.m01=-g*this.worldScaleY,this.m11=e*this.worldScaleY,a&&(this.m00=-this.m00,this.m01=-this.m01),b&&(this.m10=-this.m10,this.m11=-this.m11),f.Bone.yDown&&(this.m10=-this.m10,this.m11=-this.m11)},setToSetupPose:function(){var a=this.data;this.x=a.x,this.y=a.y,this.rotation=a.rotation,this.scaleX=a.scaleX,this.scaleY=a.scaleY}},f.Slot=function(a,b,c){this.data=a,this.skeleton=b,this.bone=c,this.setToSetupPose()},f.Slot.prototype={r:1,g:1,b:1,a:1,_attachmentTime:0,attachment:null,setAttachment:function(a){this.attachment=a,this._attachmentTime=this.skeleton.time},setAttachmentTime:function(a){this._attachmentTime=this.skeleton.time-a},getAttachmentTime:function(){return this.skeleton.time-this._attachmentTime},setToSetupPose:function(){var a=this.data;this.r=a.r,this.g=a.g,this.b=a.b,this.a=a.a;for(var b=this.skeleton.data.slots,c=0,d=b.length;d>c;c++)if(b[c]==a){this.setAttachment(a.attachmentName?this.skeleton.getAttachmentBySlotIndex(c,a.attachmentName):null);break}}},f.Skin=function(a){this.name=a,this.attachments={}},f.Skin.prototype={addAttachment:function(a,b,c){this.attachments[a+":"+b]=c},getAttachment:function(a,b){return this.attachments[a+":"+b]},_attachAll:function(a,b){for(var c in b.attachments){var d=c.indexOf(":"),e=parseInt(c.substring(0,d),10),f=c.substring(d+1),g=a.slots[e];if(g.attachment&&g.attachment.name==f){var h=this.getAttachment(e,f);h&&g.setAttachment(h)}}}},f.Animation=function(a,b,c){this.name=a,this.timelines=b,this.duration=c},f.Animation.prototype={apply:function(a,b,c){c&&this.duration&&(b%=this.duration);for(var d=this.timelines,e=0,f=d.length;f>e;e++)d[e].apply(a,b,1)},mix:function(a,b,c,d){c&&this.duration&&(b%=this.duration);for(var e=this.timelines,f=0,g=e.length;g>f;f++)e[f].apply(a,b,d)}},f.binarySearch=function(a,b,c){var d=0,e=Math.floor(a.length/c)-2;if(!e)return c;for(var f=e>>>1;;){if(a[(f+1)*c]<=b?d=f+1:e=f,d==e)return(d+1)*c;f=d+e>>>1}},f.linearSearch=function(a,b,c){for(var d=0,e=a.length-c;e>=d;d+=c)if(a[d]>b)return d;return-1},f.Curves=function(a){this.curves=[],this.curves.length=6*(a-1)},f.Curves.prototype={setLinear:function(a){this.curves[6*a]=0},setStepped:function(a){this.curves[6*a]=-1},setCurve:function(a,b,c,d,e){var f=.1,g=f*f,h=g*f,i=3*f,j=3*g,k=6*g,l=6*h,m=2*-b+d,n=2*-c+e,o=3*(b-d)+1,p=3*(c-e)+1,q=6*a,r=this.curves;r[q]=b*i+m*j+o*h,r[q+1]=c*i+n*j+p*h,r[q+2]=m*k+o*l,r[q+3]=n*k+p*l,r[q+4]=o*l,r[q+5]=p*l},getCurvePercent:function(a,b){b=0>b?0:b>1?1:b;var c=6*a,d=this.curves,e=d[c];if(!e)return b;if(-1==e)return 0;for(var f=d[c+1],g=d[c+2],h=d[c+3],i=d[c+4],j=d[c+5],k=e,l=f,m=8;;){if(k>=b){var n=k-e,o=l-f;return o+(l-o)*(b-n)/(k-n)}if(!m)break;m--,e+=g,f+=h,g+=i,h+=j,k+=e,l+=f}return l+(1-l)*(b-k)/(1-k)}},f.RotateTimeline=function(a){this.curves=new f.Curves(a),this.frames=[],this.frames.length=2*a},f.RotateTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/2},setFrame:function(a,b,c){a*=2,this.frames[a]=b,this.frames[a+1]=c},apply:function(a,b,c){var d,e=this.frames;if(!(b<e[0])){var g=a.bones[this.boneIndex];if(b>=e[e.length-2]){for(d=g.data.rotation+e[e.length-1]-g.rotation;d>180;)d-=360;for(;-180>d;)d+=360;return g.rotation+=d*c,void 0}var h=f.binarySearch(e,b,2),i=e[h-1],j=e[h],k=1-(b-j)/(e[h-2]-j);for(k=this.curves.getCurvePercent(h/2-1,k),d=e[h+1]-i;d>180;)d-=360;for(;-180>d;)d+=360;for(d=g.data.rotation+(i+d*k)-g.rotation;d>180;)d-=360;for(;-180>d;)d+=360;g.rotation+=d*c}}},f.TranslateTimeline=function(a){this.curves=new f.Curves(a),this.frames=[],this.frames.length=3*a},f.TranslateTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/3},setFrame:function(a,b,c,d){a*=3,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d},apply:function(a,b,c){var d=this.frames;if(!(b<d[0])){var e=a.bones[this.boneIndex];if(b>=d[d.length-3])return e.x+=(e.data.x+d[d.length-2]-e.x)*c,e.y+=(e.data.y+d[d.length-1]-e.y)*c,void 0;var g=f.binarySearch(d,b,3),h=d[g-2],i=d[g-1],j=d[g],k=1-(b-j)/(d[g+-3]-j);k=this.curves.getCurvePercent(g/3-1,k),e.x+=(e.data.x+h+(d[g+1]-h)*k-e.x)*c,e.y+=(e.data.y+i+(d[g+2]-i)*k-e.y)*c}}},f.ScaleTimeline=function(a){this.curves=new f.Curves(a),this.frames=[],this.frames.length=3*a},f.ScaleTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/3},setFrame:function(a,b,c,d){a*=3,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d},apply:function(a,b,c){var d=this.frames;if(!(b<d[0])){var e=a.bones[this.boneIndex];if(b>=d[d.length-3])return e.scaleX+=(e.data.scaleX-1+d[d.length-2]-e.scaleX)*c,e.scaleY+=(e.data.scaleY-1+d[d.length-1]-e.scaleY)*c,void 0;var g=f.binarySearch(d,b,3),h=d[g-2],i=d[g-1],j=d[g],k=1-(b-j)/(d[g+-3]-j);k=this.curves.getCurvePercent(g/3-1,k),e.scaleX+=(e.data.scaleX-1+h+(d[g+1]-h)*k-e.scaleX)*c,e.scaleY+=(e.data.scaleY-1+i+(d[g+2]-i)*k-e.scaleY)*c}}},f.ColorTimeline=function(a){this.curves=new f.Curves(a),this.frames=[],this.frames.length=5*a},f.ColorTimeline.prototype={slotIndex:0,getFrameCount:function(){return this.frames.length/5},setFrame:function(a,b,c,d,e,f){a*=5,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d,this.frames[a+3]=e,this.frames[a+4]=f},apply:function(a,b,c){var d=this.frames;if(!(b<d[0])){var e=a.slots[this.slotIndex];if(b>=d[d.length-5]){var g=d.length-1;return e.r=d[g-3],e.g=d[g-2],e.b=d[g-1],e.a=d[g],void 0}var h=f.binarySearch(d,b,5),i=d[h-4],j=d[h-3],k=d[h-2],l=d[h-1],m=d[h],n=1-(b-m)/(d[h-5]-m);n=this.curves.getCurvePercent(h/5-1,n);var o=i+(d[h+1]-i)*n,p=j+(d[h+2]-j)*n,q=k+(d[h+3]-k)*n,r=l+(d[h+4]-l)*n;1>c?(e.r+=(o-e.r)*c,e.g+=(p-e.g)*c,e.b+=(q-e.b)*c,e.a+=(r-e.a)*c):(e.r=o,e.g=p,e.b=q,e.a=r)}}},f.AttachmentTimeline=function(a){this.curves=new f.Curves(a),this.frames=[],this.frames.length=a,this.attachmentNames=[],this.attachmentNames.length=a},f.AttachmentTimeline.prototype={slotIndex:0,getFrameCount:function(){return this.frames.length},setFrame:function(a,b,c){this.frames[a]=b,this.attachmentNames[a]=c},apply:function(a,b){var c=this.frames;if(!(b<c[0])){var d;d=b>=c[c.length-1]?c.length-1:f.binarySearch(c,b,1)-1;var e=this.attachmentNames[d];a.slots[this.slotIndex].setAttachment(e?a.getAttachmentBySlotIndex(this.slotIndex,e):null)}}},f.SkeletonData=function(){this.bones=[],this.slots=[],this.skins=[],this.animations=[]},f.SkeletonData.prototype={defaultSkin:null,findBone:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findBoneIndex:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].name==a)return c;return-1},findSlot:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].name==a)return slot[c];return null},findSlotIndex:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].name==a)return c;return-1},findSkin:function(a){for(var b=this.skins,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findAnimation:function(a){for(var b=this.animations,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null}},f.Skeleton=function(a){this.data=a,this.bones=[];
for(var b=0,c=a.bones.length;c>b;b++){var d=a.bones[b],e=d.parent?this.bones[a.bones.indexOf(d.parent)]:null;this.bones.push(new f.Bone(d,e))}for(this.slots=[],this.drawOrder=[],b=0,c=a.slots.length;c>b;b++){var g=a.slots[b],h=this.bones[a.bones.indexOf(g.boneData)],i=new f.Slot(g,this,h);this.slots.push(i),this.drawOrder.push(i)}},f.Skeleton.prototype={x:0,y:0,skin:null,r:1,g:1,b:1,a:1,time:0,flipX:!1,flipY:!1,updateWorldTransform:function(){for(var a=this.flipX,b=this.flipY,c=this.bones,d=0,e=c.length;e>d;d++)c[d].updateWorldTransform(a,b)},setToSetupPose:function(){this.setBonesToSetupPose(),this.setSlotsToSetupPose()},setBonesToSetupPose:function(){for(var a=this.bones,b=0,c=a.length;c>b;b++)a[b].setToSetupPose()},setSlotsToSetupPose:function(){for(var a=this.slots,b=0,c=a.length;c>b;b++)a[b].setToSetupPose(b)},getRootBone:function(){return this.bones.length?this.bones[0]:null},findBone:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return b[c];return null},findBoneIndex:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return c;return-1},findSlot:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return b[c];return null},findSlotIndex:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return c;return-1},setSkinByName:function(a){var b=this.data.findSkin(a);if(!b)throw"Skin not found: "+a;this.setSkin(b)},setSkin:function(a){this.skin&&a&&a._attachAll(this,this.skin),this.skin=a},getAttachmentBySlotName:function(a,b){return this.getAttachmentBySlotIndex(this.data.findSlotIndex(a),b)},getAttachmentBySlotIndex:function(a,b){if(this.skin){var c=this.skin.getAttachment(a,b);if(c)return c}return this.data.defaultSkin?this.data.defaultSkin.getAttachment(a,b):null},setAttachment:function(a,b){for(var c=this.slots,d=0,e=c.size;e>d;d++){var f=c[d];if(f.data.name==a){var g=null;if(b&&(g=this.getAttachment(d,b),null==g))throw"Attachment not found: "+b+", for slot: "+a;return f.setAttachment(g),void 0}}throw"Slot not found: "+a},update:function(a){time+=a}},f.AttachmentType={region:0},f.RegionAttachment=function(){this.offset=[],this.offset.length=8,this.uvs=[],this.uvs.length=8},f.RegionAttachment.prototype={x:0,y:0,rotation:0,scaleX:1,scaleY:1,width:0,height:0,rendererObject:null,regionOffsetX:0,regionOffsetY:0,regionWidth:0,regionHeight:0,regionOriginalWidth:0,regionOriginalHeight:0,setUVs:function(a,b,c,d,e){var f=this.uvs;e?(f[2]=a,f[3]=d,f[4]=a,f[5]=b,f[6]=c,f[7]=b,f[0]=c,f[1]=d):(f[0]=a,f[1]=d,f[2]=a,f[3]=b,f[4]=c,f[5]=b,f[6]=c,f[7]=d)},updateOffset:function(){var a=this.width/this.regionOriginalWidth*this.scaleX,b=this.height/this.regionOriginalHeight*this.scaleY,c=-this.width/2*this.scaleX+this.regionOffsetX*a,d=-this.height/2*this.scaleY+this.regionOffsetY*b,e=c+this.regionWidth*a,f=d+this.regionHeight*b,g=this.rotation*Math.PI/180,h=Math.cos(g),i=Math.sin(g),j=c*h+this.x,k=c*i,l=d*h+this.y,m=d*i,n=e*h+this.x,o=e*i,p=f*h+this.y,q=f*i,r=this.offset;r[0]=j-m,r[1]=l+k,r[2]=j-q,r[3]=p+k,r[4]=n-q,r[5]=p+o,r[6]=n-m,r[7]=l+o},computeVertices:function(a,b,c,d){a+=c.worldX,b+=c.worldY;var e=c.m00,f=c.m01,g=c.m10,h=c.m11,i=this.offset;d[0]=i[0]*e+i[1]*f+a,d[1]=i[0]*g+i[1]*h+b,d[2]=i[2]*e+i[3]*f+a,d[3]=i[2]*g+i[3]*h+b,d[4]=i[4]*e+i[5]*f+a,d[5]=i[4]*g+i[5]*h+b,d[6]=i[6]*e+i[7]*f+a,d[7]=i[6]*g+i[7]*h+b}},f.AnimationStateData=function(a){this.skeletonData=a,this.animationToMixTime={}},f.AnimationStateData.prototype={defaultMix:0,setMixByName:function(a,b,c){var d=this.skeletonData.findAnimation(a);if(!d)throw"Animation not found: "+a;var e=this.skeletonData.findAnimation(b);if(!e)throw"Animation not found: "+b;this.setMix(d,e,c)},setMix:function(a,b,c){this.animationToMixTime[a.name+":"+b.name]=c},getMix:function(a,b){var c=this.animationToMixTime[a.name+":"+b.name];return c?c:this.defaultMix}},f.AnimationState=function(a){this.data=a,this.queue=[]},f.AnimationState.prototype={animationSpeed:1,current:null,previous:null,currentTime:0,previousTime:0,currentLoop:!1,previousLoop:!1,mixTime:0,mixDuration:0,update:function(a){if(this.currentTime+=a*this.animationSpeed,this.previousTime+=a,this.mixTime+=a,this.queue.length>0){var b=this.queue[0];this.currentTime>=b.delay&&(this._setAnimation(b.animation,b.loop),this.queue.shift())}},apply:function(a){if(this.current)if(this.previous){this.previous.apply(a,this.previousTime,this.previousLoop);var b=this.mixTime/this.mixDuration;b>=1&&(b=1,this.previous=null),this.current.mix(a,this.currentTime,this.currentLoop,b)}else this.current.apply(a,this.currentTime,this.currentLoop)},clearAnimation:function(){this.previous=null,this.current=null,this.queue.length=0},_setAnimation:function(a,b){this.previous=null,a&&this.current&&(this.mixDuration=this.data.getMix(this.current,a),this.mixDuration>0&&(this.mixTime=0,this.previous=this.current,this.previousTime=this.currentTime,this.previousLoop=this.currentLoop)),this.current=a,this.currentLoop=b,this.currentTime=0},setAnimationByName:function(a,b){var c=this.data.skeletonData.findAnimation(a);if(!c)throw"Animation not found: "+a;this.setAnimation(c,b)},setAnimation:function(a,b){this.queue.length=0,this._setAnimation(a,b)},addAnimationByName:function(a,b,c){var d=this.data.skeletonData.findAnimation(a);if(!d)throw"Animation not found: "+a;this.addAnimation(d,b,c)},addAnimation:function(a,b,c){var d={};if(d.animation=a,d.loop=b,!c||0>=c){var e=this.queue.length?this.queue[this.queue.length-1].animation:this.current;c=null!=e?e.duration-this.data.getMix(e,a)+(c||0):0}d.delay=c,this.queue.push(d)},isComplete:function(){return!this.current||this.currentTime>=this.current.duration}},f.SkeletonJson=function(a){this.attachmentLoader=a},f.SkeletonJson.prototype={scale:1,readSkeletonData:function(a){for(var b,c=new f.SkeletonData,d=a.bones,e=0,g=d.length;g>e;e++){var h=d[e],i=null;if(h.parent&&(i=c.findBone(h.parent),!i))throw"Parent bone not found: "+h.parent;b=new f.BoneData(h.name,i),b.length=(h.length||0)*this.scale,b.x=(h.x||0)*this.scale,b.y=(h.y||0)*this.scale,b.rotation=h.rotation||0,b.scaleX=h.scaleX||1,b.scaleY=h.scaleY||1,c.bones.push(b)}var j=a.slots;for(e=0,g=j.length;g>e;e++){var k=j[e];if(b=c.findBone(k.bone),!b)throw"Slot bone not found: "+k.bone;var l=new f.SlotData(k.name,b),m=k.color;m&&(l.r=f.SkeletonJson.toColor(m,0),l.g=f.SkeletonJson.toColor(m,1),l.b=f.SkeletonJson.toColor(m,2),l.a=f.SkeletonJson.toColor(m,3)),l.attachmentName=k.attachment,c.slots.push(l)}var n=a.skins;for(var o in n)if(n.hasOwnProperty(o)){var p=n[o],q=new f.Skin(o);for(var r in p)if(p.hasOwnProperty(r)){var s=c.findSlotIndex(r),t=p[r];for(var u in t)if(t.hasOwnProperty(u)){var v=this.readAttachment(q,u,t[u]);null!=v&&q.addAttachment(s,u,v)}}c.skins.push(q),"default"==q.name&&(c.defaultSkin=q)}var w=a.animations;for(var x in w)w.hasOwnProperty(x)&&this.readAnimation(x,w[x],c);return c},readAttachment:function(a,b,c){b=c.name||b;var d=f.AttachmentType[c.type||"region"];if(d==f.AttachmentType.region){var e=new f.RegionAttachment;return e.x=(c.x||0)*this.scale,e.y=(c.y||0)*this.scale,e.scaleX=c.scaleX||1,e.scaleY=c.scaleY||1,e.rotation=c.rotation||0,e.width=(c.width||32)*this.scale,e.height=(c.height||32)*this.scale,e.updateOffset(),e.rendererObject={},e.rendererObject.name=b,e.rendererObject.scale={},e.rendererObject.scale.x=e.scaleX,e.rendererObject.scale.y=e.scaleY,e.rendererObject.rotation=-e.rotation*Math.PI/180,e}throw"Unknown attachment type: "+d},readAnimation:function(a,b,c){var d,e,g,h,i,j,k,l=[],m=0,n=b.bones;for(var o in n)if(n.hasOwnProperty(o)){var p=c.findBoneIndex(o);if(-1==p)throw"Bone not found: "+o;var q=n[o];for(g in q)if(q.hasOwnProperty(g))if(i=q[g],"rotate"==g){for(e=new f.RotateTimeline(i.length),e.boneIndex=p,d=0,j=0,k=i.length;k>j;j++)h=i[j],e.setFrame(d,h.time,h.angle),f.SkeletonJson.readCurve(e,d,h),d++;l.push(e),m=Math.max(m,e.frames[2*e.getFrameCount()-2])}else{if("translate"!=g&&"scale"!=g)throw"Invalid timeline type for a bone: "+g+" ("+o+")";var r=1;for("scale"==g?e=new f.ScaleTimeline(i.length):(e=new f.TranslateTimeline(i.length),r=this.scale),e.boneIndex=p,d=0,j=0,k=i.length;k>j;j++){h=i[j];var s=(h.x||0)*r,t=(h.y||0)*r;e.setFrame(d,h.time,s,t),f.SkeletonJson.readCurve(e,d,h),d++}l.push(e),m=Math.max(m,e.frames[3*e.getFrameCount()-3])}}var u=b.slots;for(var v in u)if(u.hasOwnProperty(v)){var w=u[v],x=c.findSlotIndex(v);for(g in w)if(w.hasOwnProperty(g))if(i=w[g],"color"==g){for(e=new f.ColorTimeline(i.length),e.slotIndex=x,d=0,j=0,k=i.length;k>j;j++){h=i[j];var y=h.color,z=f.SkeletonJson.toColor(y,0),A=f.SkeletonJson.toColor(y,1),B=f.SkeletonJson.toColor(y,2),C=f.SkeletonJson.toColor(y,3);e.setFrame(d,h.time,z,A,B,C),f.SkeletonJson.readCurve(e,d,h),d++}l.push(e),m=Math.max(m,e.frames[5*e.getFrameCount()-5])}else{if("attachment"!=g)throw"Invalid timeline type for a slot: "+g+" ("+v+")";for(e=new f.AttachmentTimeline(i.length),e.slotIndex=x,d=0,j=0,k=i.length;k>j;j++)h=i[j],e.setFrame(d++,h.time,h.name);l.push(e),m=Math.max(m,e.frames[e.getFrameCount()-1])}}c.animations.push(new f.Animation(a,l,m))}},f.SkeletonJson.readCurve=function(a,b,c){var d=c.curve;d&&("stepped"==d?a.curves.setStepped(b):d instanceof Array&&a.curves.setCurve(b,d[0],d[1],d[2],d[3]))},f.SkeletonJson.toColor=function(a,b){if(8!=a.length)throw"Color hexidecimal length must be 8, recieved: "+a;return parseInt(a.substr(2*b,2),16)/255},f.Atlas=function(a,b){this.textureLoader=b,this.pages=[],this.regions=[];var c=new f.AtlasReader(a),d=[];d.length=4;for(var e=null;;){var g=c.readLine();if(null==g)break;if(g=c.trim(g),g.length)if(e){var h=new f.AtlasRegion;h.name=g,h.page=e,h.rotate="true"==c.readValue(),c.readTuple(d);var i=parseInt(d[0],10),j=parseInt(d[1],10);c.readTuple(d);var k=parseInt(d[0],10),l=parseInt(d[1],10);h.u=i/e.width,h.v=j/e.height,h.rotate?(h.u2=(i+l)/e.width,h.v2=(j+k)/e.height):(h.u2=(i+k)/e.width,h.v2=(j+l)/e.height),h.x=i,h.y=j,h.width=Math.abs(k),h.height=Math.abs(l),4==c.readTuple(d)&&(h.splits=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10)],4==c.readTuple(d)&&(h.pads=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10)],c.readTuple(d))),h.originalWidth=parseInt(d[0],10),h.originalHeight=parseInt(d[1],10),c.readTuple(d),h.offsetX=parseInt(d[0],10),h.offsetY=parseInt(d[1],10),h.index=parseInt(c.readValue(),10),this.regions.push(h)}else{e=new f.AtlasPage,e.name=g,e.format=f.Atlas.Format[c.readValue()],c.readTuple(d),e.minFilter=f.Atlas.TextureFilter[d[0]],e.magFilter=f.Atlas.TextureFilter[d[1]];var m=c.readValue();e.uWrap=f.Atlas.TextureWrap.clampToEdge,e.vWrap=f.Atlas.TextureWrap.clampToEdge,"x"==m?e.uWrap=f.Atlas.TextureWrap.repeat:"y"==m?e.vWrap=f.Atlas.TextureWrap.repeat:"xy"==m&&(e.uWrap=e.vWrap=f.Atlas.TextureWrap.repeat),b.load(e,g),this.pages.push(e)}else e=null}},f.Atlas.prototype={findRegion:function(a){for(var b=this.regions,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},dispose:function(){for(var a=this.pages,b=0,c=a.length;c>b;b++)this.textureLoader.unload(a[b].rendererObject)},updateUVs:function(a){for(var b=this.regions,c=0,d=b.length;d>c;c++){var e=b[c];e.page==a&&(e.u=e.x/a.width,e.v=e.y/a.height,e.rotate?(e.u2=(e.x+e.height)/a.width,e.v2=(e.y+e.width)/a.height):(e.u2=(e.x+e.width)/a.width,e.v2=(e.y+e.height)/a.height))}}},f.Atlas.Format={alpha:0,intensity:1,luminanceAlpha:2,rgb565:3,rgba4444:4,rgb888:5,rgba8888:6},f.Atlas.TextureFilter={nearest:0,linear:1,mipMap:2,mipMapNearestNearest:3,mipMapLinearNearest:4,mipMapNearestLinear:5,mipMapLinearLinear:6},f.Atlas.TextureWrap={mirroredRepeat:0,clampToEdge:1,repeat:2},f.AtlasPage=function(){},f.AtlasPage.prototype={name:null,format:null,minFilter:null,magFilter:null,uWrap:null,vWrap:null,rendererObject:null,width:0,height:0},f.AtlasRegion=function(){},f.AtlasRegion.prototype={page:null,name:null,x:0,y:0,width:0,height:0,u:0,v:0,u2:0,v2:0,offsetX:0,offsetY:0,originalWidth:0,originalHeight:0,index:0,rotate:!1,splits:null,pads:null},f.AtlasReader=function(a){this.lines=a.split(/\r\n|\r|\n/)},f.AtlasReader.prototype={index:0,trim:function(a){return a.replace(/^\s+|\s+$/g,"")},readLine:function(){return this.index>=this.lines.length?null:this.lines[this.index++]},readValue:function(){var a=this.readLine(),b=a.indexOf(":");if(-1==b)throw"Invalid line: "+a;return this.trim(a.substring(b+1))},readTuple:function(a){var b=this.readLine(),c=b.indexOf(":");if(-1==c)throw"Invalid line: "+b;for(var d=0,e=c+1;3>d;d++){var f=b.indexOf(",",e);if(-1==f){if(!d)throw"Invalid line: "+b;break}a[d]=this.trim(b.substr(e,f-e)),e=f+1}return a[d]=this.trim(b.substring(e)),d+1}},f.AtlasAttachmentLoader=function(a){this.atlas=a},f.AtlasAttachmentLoader.prototype={newAttachment:function(a,b,c){switch(b){case f.AttachmentType.region:var d=this.atlas.findRegion(c);if(!d)throw"Region not found in atlas: "+c+" ("+b+")";var e=new f.RegionAttachment(c);return e.rendererObject=d,e.setUVs(d.u,d.v,d.u2,d.v2,d.rotate),e.regionOffsetX=d.offsetX,e.regionOffsetY=d.offsetY,e.regionWidth=d.width,e.regionHeight=d.height,e.regionOriginalWidth=d.originalWidth,e.regionOriginalHeight=d.originalHeight,e}throw"Unknown attachment type: "+b}},f.Bone.yDown=!0,b.AnimCache={},b.Spine=function(a){if(b.DisplayObjectContainer.call(this),this.spineData=b.AnimCache[a],!this.spineData)throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: "+a);this.skeleton=new f.Skeleton(this.spineData),this.skeleton.updateWorldTransform(),this.stateData=new f.AnimationStateData(this.spineData),this.state=new f.AnimationState(this.stateData),this.slotContainers=[];for(var c=0,d=this.skeleton.drawOrder.length;d>c;c++){var e=this.skeleton.drawOrder[c],g=e.attachment,h=new b.DisplayObjectContainer;if(this.slotContainers.push(h),this.addChild(h),g instanceof f.RegionAttachment){var i=g.rendererObject.name,j=this.createSprite(e,g.rendererObject);e.currentSprite=j,e.currentSpriteName=i,h.addChild(j)}}},b.Spine.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Spine.prototype.constructor=b.Spine,b.Spine.prototype.updateTransform=function(){this.lastTime=this.lastTime||Date.now();var a=.001*(Date.now()-this.lastTime);this.lastTime=Date.now(),this.state.update(a),this.state.apply(this.skeleton),this.skeleton.updateWorldTransform();for(var c=this.skeleton.drawOrder,d=0,e=c.length;e>d;d++){var g=c[d],h=g.attachment,i=this.slotContainers[d];if(h instanceof f.RegionAttachment){if(h.rendererObject&&(!g.currentSpriteName||g.currentSpriteName!=h.name)){var j=h.rendererObject.name;if(void 0!==g.currentSprite&&(g.currentSprite.visible=!1),g.sprites=g.sprites||{},void 0!==g.sprites[j])g.sprites[j].visible=!0;else{var k=this.createSprite(g,h.rendererObject);i.addChild(k)}g.currentSprite=g.sprites[j],g.currentSpriteName=j}i.visible=!0;var l=g.bone;i.position.x=l.worldX+h.x*l.m00+h.y*l.m01,i.position.y=l.worldY+h.x*l.m10+h.y*l.m11,i.scale.x=l.worldScaleX,i.scale.y=l.worldScaleY,i.rotation=-(g.bone.worldRotation*Math.PI/180),i.alpha=g.a,g.currentSprite.tint=b.rgb2hex([g.r,g.g,g.b])}else i.visible=!1}b.DisplayObjectContainer.prototype.updateTransform.call(this)},b.Spine.prototype.createSprite=function(a,c){var d=b.TextureCache[c.name]?c.name:c.name+".png",e=new b.Sprite(b.Texture.fromFrame(d));return e.scale=c.scale,e.rotation=c.rotation,e.anchor.x=e.anchor.y=.5,a.sprites=a.sprites||{},a.sprites[c.name]=e,e},b.BaseTextureCache={},b.texturesToUpdate=[],b.texturesToDestroy=[],b.BaseTextureCacheIdGenerator=0,b.BaseTexture=function(a,c){if(b.EventTarget.call(this),this.width=100,this.height=100,this.scaleMode=c||b.scaleModes.DEFAULT,this.hasLoaded=!1,this.source=a,this.id=b.BaseTextureCacheIdGenerator++,this.premultipliedAlpha=!0,this._glTextures=[],this._dirty=[],a){if((this.source.complete||this.source.getContext)&&this.source.width&&this.source.height)this.hasLoaded=!0,this.width=this.source.width,this.height=this.source.height,b.texturesToUpdate.push(this);else{var d=this;this.source.onload=function(){d.hasLoaded=!0,d.width=d.source.width,d.height=d.source.height;for(var a=0;a<d._glTextures.length;a++)d._dirty[a]=!0;d.dispatchEvent({type:"loaded",content:d})},this.source.onerror=function(){d.dispatchEvent({type:"error",content:d})}}this.imageUrl=null,this._powerOf2=!1}},b.BaseTexture.prototype.constructor=b.BaseTexture,b.BaseTexture.prototype.destroy=function(){this.imageUrl?(delete b.BaseTextureCache[this.imageUrl],delete b.TextureCache[this.imageUrl],this.imageUrl=null,this.source.src=null):this.source&&this.source._pixiId&&delete b.BaseTextureCache[this.source._pixiId],this.source=null,b.texturesToDestroy.push(this)},b.BaseTexture.prototype.updateSourceImage=function(a){this.hasLoaded=!1,this.source.src=null,this.source.src=a},b.BaseTexture.fromImage=function(a,c,d){var e=b.BaseTextureCache[a];if(void 0===c&&-1===a.indexOf("data:")&&(c=!0),!e){var f=new Image;c&&(f.crossOrigin=""),f.src=a,e=new b.BaseTexture(f,d),e.imageUrl=a,b.BaseTextureCache[a]=e}return e},b.BaseTexture.fromCanvas=function(a,c){a._pixiId||(a._pixiId="canvas_"+b.TextureCacheIdGenerator++);var d=b.BaseTextureCache[a._pixiId];return d||(d=new b.BaseTexture(a,c),b.BaseTextureCache[a._pixiId]=d),d},b.TextureCache={},b.FrameCache={},b.TextureCacheIdGenerator=0,b.Texture=function(a,c){if(b.EventTarget.call(this),this.noFrame=!1,c||(this.noFrame=!0,c=new b.Rectangle(0,0,1,1)),a instanceof b.Texture&&(a=a.baseTexture),this.baseTexture=a,this.frame=c,this.trim=null,this.valid=!1,this.scope=this,this._uvs=null,this.width=0,this.height=0,this.crop=new b.Rectangle(0,0,1,1),a.hasLoaded)this.noFrame&&(c=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(c);else{var d=this;a.addEventListener("loaded",function(){d.onBaseTextureLoaded()})}},b.Texture.prototype.constructor=b.Texture,b.Texture.prototype.onBaseTextureLoaded=function(){var a=this.baseTexture;a.removeEventListener("loaded",this.onLoaded),this.noFrame&&(this.frame=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(this.frame),this.scope.dispatchEvent({type:"update",content:this})},b.Texture.prototype.destroy=function(a){a&&this.baseTexture.destroy(),this.valid=!1},b.Texture.prototype.setFrame=function(a){if(this.noFrame=!1,this.frame=a,this.width=a.width,this.height=a.height,this.crop.x=a.x,this.crop.y=a.y,this.crop.width=a.width,this.crop.height=a.height,!this.trim&&(a.x+a.width>this.baseTexture.width||a.y+a.height>this.baseTexture.height))throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.valid=a&&a.width&&a.height&&this.baseTexture.source&&this.baseTexture.hasLoaded,this.trim&&(this.width=this.trim.width,this.height=this.trim.height,this.frame.width=this.trim.width,this.frame.height=this.trim.height),this.valid&&b.Texture.frameUpdates.push(this)},b.Texture.prototype._updateWebGLuvs=function(){this._uvs||(this._uvs=new b.TextureUvs);var a=this.crop,c=this.baseTexture.width,d=this.baseTexture.height;this._uvs.x0=a.x/c,this._uvs.y0=a.y/d,this._uvs.x1=(a.x+a.width)/c,this._uvs.y1=a.y/d,this._uvs.x2=(a.x+a.width)/c,this._uvs.y2=(a.y+a.height)/d,this._uvs.x3=a.x/c,this._uvs.y3=(a.y+a.height)/d},b.Texture.fromImage=function(a,c,d){var e=b.TextureCache[a];return e||(e=new b.Texture(b.BaseTexture.fromImage(a,c,d)),b.TextureCache[a]=e),e},b.Texture.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache ');return c},b.Texture.fromCanvas=function(a,c){var d=b.BaseTexture.fromCanvas(a,c);return new b.Texture(d)},b.Texture.addTextureToCache=function(a,c){b.TextureCache[c]=a},b.Texture.removeTextureFromCache=function(a){var c=b.TextureCache[a];return delete b.TextureCache[a],delete b.BaseTextureCache[a],c},b.Texture.frameUpdates=[],b.TextureUvs=function(){this.x0=0,this.y0=0,this.x1=0,this.y1=0,this.x2=0,this.y2=0,this.x3=0,this.y3=0},b.RenderTexture=function(a,c,d,e){if(b.EventTarget.call(this),this.width=a||100,this.height=c||100,this.frame=new b.Rectangle(0,0,this.width,this.height),this.crop=new b.Rectangle(0,0,this.width,this.height),this.baseTexture=new b.BaseTexture,this.baseTexture.width=this.width,this.baseTexture.height=this.height,this.baseTexture._glTextures=[],this.baseTexture.scaleMode=e||b.scaleModes.DEFAULT,this.baseTexture.hasLoaded=!0,this.renderer=d||b.defaultRenderer,this.renderer.type===b.WEBGL_RENDERER){var f=this.renderer.gl;this.textureBuffer=new b.FilterTexture(f,this.width,this.height,this.baseTexture.scaleMode),this.baseTexture._glTextures[f.id]=this.textureBuffer.texture,this.render=this.renderWebGL,this.projection=new b.Point(this.width/2,-this.height/2)}else this.render=this.renderCanvas,this.textureBuffer=new b.CanvasBuffer(this.width,this.height),this.baseTexture.source=this.textureBuffer.canvas;this.valid=!0,b.Texture.frameUpdates.push(this)},b.RenderTexture.prototype=Object.create(b.Texture.prototype),b.RenderTexture.prototype.constructor=b.RenderTexture,b.RenderTexture.prototype.resize=function(a,c,d){(a!==this.width||c!==this.height)&&(this.width=this.frame.width=this.crop.width=a,this.height=this.frame.height=this.crop.height=c,d&&(this.baseTexture.width=this.width,this.baseTexture.height=this.height),this.renderer.type===b.WEBGL_RENDERER&&(this.projection.x=this.width/2,this.projection.y=-this.height/2),this.textureBuffer.resize(this.width,this.height))},b.RenderTexture.prototype.clear=function(){this.renderer.type===b.WEBGL_RENDERER&&this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer),this.textureBuffer.clear()},b.RenderTexture.prototype.renderWebGL=function(a,c,d){var e=this.renderer.gl;e.colorMask(!0,!0,!0,!0),e.viewport(0,0,this.width,this.height),e.bindFramebuffer(e.FRAMEBUFFER,this.textureBuffer.frameBuffer),d&&this.textureBuffer.clear();var f=a.children,g=a.worldTransform;a.worldTransform=b.RenderTexture.tempMatrix,a.worldTransform.d=-1,a.worldTransform.ty=-2*this.projection.y,c&&(a.worldTransform.tx=c.x,a.worldTransform.ty-=c.y);for(var h=0,i=f.length;i>h;h++)f[h].updateTransform();b.WebGLRenderer.updateTextures(),this.renderer.spriteBatch.dirty=!0,this.renderer.renderDisplayObject(a,this.projection,this.textureBuffer.frameBuffer),a.worldTransform=g,this.renderer.spriteBatch.dirty=!0},b.RenderTexture.prototype.renderCanvas=function(a,c,d){var e=a.children,f=a.worldTransform;a.worldTransform=b.RenderTexture.tempMatrix,c?(a.worldTransform.tx=c.x,a.worldTransform.ty=c.y):(a.worldTransform.tx=0,a.worldTransform.ty=0);for(var g=0,h=e.length;h>g;g++)e[g].updateTransform();d&&this.textureBuffer.clear();var i=this.textureBuffer.context;this.renderer.renderDisplayObject(a,i),i.setTransform(1,0,0,1,0,0),a.worldTransform=f},b.RenderTexture.tempMatrix=new b.Matrix,b.AssetLoader=function(a,c){b.EventTarget.call(this),this.assetURLs=a,this.crossorigin=c,this.loadersByType={jpg:b.ImageLoader,jpeg:b.ImageLoader,png:b.ImageLoader,gif:b.ImageLoader,webp:b.ImageLoader,json:b.JsonLoader,atlas:b.AtlasLoader,anim:b.SpineLoader,xml:b.BitmapFontLoader,fnt:b.BitmapFontLoader}},b.AssetLoader.prototype.constructor=b.AssetLoader,b.AssetLoader.prototype._getDataType=function(a){var b="data:",c=a.slice(0,b.length).toLowerCase();if(c===b){var d=a.slice(b.length),e=d.indexOf(",");if(-1===e)return null;var f=d.slice(0,e).split(";")[0];return f&&"text/plain"!==f.toLowerCase()?f.split("/").pop().toLowerCase():"txt"}return null},b.AssetLoader.prototype.load=function(){function a(a){b.onAssetLoaded(a.content)}var b=this;this.loadCount=this.assetURLs.length;for(var c=0;c<this.assetURLs.length;c++){var d=this.assetURLs[c],e=this._getDataType(d);e||(e=d.split("?").shift().split(".").pop().toLowerCase());var f=this.loadersByType[e];if(!f)throw new Error(e+" is an unsupported file type");var g=new f(d,this.crossorigin);g.addEventListener("loaded",a),g.load()}},b.AssetLoader.prototype.onAssetLoaded=function(a){this.loadCount--,this.dispatchEvent({type:"onProgress",content:this,loader:a}),this.onProgress&&this.onProgress(a),this.loadCount||(this.dispatchEvent({type:"onComplete",content:this}),this.onComplete&&this.onComplete())},b.JsonLoader=function(a,c){b.EventTarget.call(this),this.url=a,this.crossorigin=c,this.baseUrl=a.replace(/[^\/]*$/,""),this.loaded=!1},b.JsonLoader.prototype.constructor=b.JsonLoader,b.JsonLoader.prototype.load=function(){var a=this;window.XDomainRequest&&a.crossorigin?(this.ajaxRequest=new window.XDomainRequest,this.ajaxRequest.timeout=3e3,this.ajaxRequest.onerror=function(){a.onError()},this.ajaxRequest.ontimeout=function(){a.onError()},this.ajaxRequest.onprogress=function(){}):this.ajaxRequest=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP"),this.ajaxRequest.onload=function(){a.onJSONLoaded()},this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.send()},b.JsonLoader.prototype.onJSONLoaded=function(){if(!this.ajaxRequest.responseText)return this.onError(),void 0;if(this.json=JSON.parse(this.ajaxRequest.responseText),this.json.frames){var a=this,c=this.baseUrl+this.json.meta.image,d=new b.ImageLoader(c,this.crossorigin),e=this.json.frames;this.texture=d.texture.baseTexture,d.addEventListener("loaded",function(){a.onLoaded()});for(var g in e){var h=e[g].frame;if(h&&(b.TextureCache[g]=new b.Texture(this.texture,{x:h.x,y:h.y,width:h.w,height:h.h}),b.TextureCache[g].crop=new b.Rectangle(h.x,h.y,h.w,h.h),e[g].trimmed)){var i=e[g].sourceSize,j=e[g].spriteSourceSize;b.TextureCache[g].trim=new b.Rectangle(j.x,j.y,i.w,i.h)}}d.load()}else if(this.json.bones){var k=new f.SkeletonJson,l=k.readSkeletonData(this.json);b.AnimCache[this.url]=l,this.onLoaded()}else this.onLoaded()},b.JsonLoader.prototype.onLoaded=function(){this.loaded=!0,this.dispatchEvent({type:"loaded",content:this})},b.JsonLoader.prototype.onError=function(){this.dispatchEvent({type:"error",content:this})},b.AtlasLoader=function(a,c){b.EventTarget.call(this),this.url=a,this.baseUrl=a.replace(/[^\/]*$/,""),this.crossorigin=c,this.loaded=!1},b.AtlasLoader.constructor=b.AtlasLoader,b.AtlasLoader.prototype.load=function(){this.ajaxRequest=new b.AjaxRequest,this.ajaxRequest.onreadystatechange=this.onAtlasLoaded.bind(this),this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.overrideMimeType&&this.ajaxRequest.overrideMimeType("application/json"),this.ajaxRequest.send(null)},b.AtlasLoader.prototype.onAtlasLoaded=function(){if(4===this.ajaxRequest.readyState)if(200===this.ajaxRequest.status||-1===window.location.href.indexOf("http")){this.atlas={meta:{image:[]},frames:[]};var a=this.ajaxRequest.responseText.split(/\r?\n/),c=-3,d=0,e=null,f=!1,g=0,h=0,i=this.onLoaded.bind(this);for(g=0;g<a.length;g++)if(a[g]=a[g].replace(/^\s+|\s+$/g,""),""===a[g]&&(f=g+1),a[g].length>0){if(f===g)this.atlas.meta.image.push(a[g]),d=this.atlas.meta.image.length-1,this.atlas.frames.push({}),c=-3;else if(c>0)if(c%7===1)null!=e&&(this.atlas.frames[d][e.name]=e),e={name:a[g],frame:{}};else{var j=a[g].split(" ");if(c%7===3)e.frame.x=Number(j[1].replace(",","")),e.frame.y=Number(j[2]);else if(c%7===4)e.frame.w=Number(j[1].replace(",","")),e.frame.h=Number(j[2]);else if(c%7===5){var k={x:0,y:0,w:Number(j[1].replace(",","")),h:Number(j[2])};k.w>e.frame.w||k.h>e.frame.h?(e.trimmed=!0,e.realSize=k):e.trimmed=!1}}c++}if(null!=e&&(this.atlas.frames[d][e.name]=e),this.atlas.meta.image.length>0){for(this.images=[],h=0;h<this.atlas.meta.image.length;h++){var l=this.baseUrl+this.atlas.meta.image[h],m=this.atlas.frames[h];this.images.push(new b.ImageLoader(l,this.crossorigin));for(g in m){var n=m[g].frame;n&&(b.TextureCache[g]=new b.Texture(this.images[h].texture.baseTexture,{x:n.x,y:n.y,width:n.w,height:n.h}),m[g].trimmed&&(b.TextureCache[g].realSize=m[g].realSize,b.TextureCache[g].trim.x=0,b.TextureCache[g].trim.y=0))}}for(this.currentImageId=0,h=0;h<this.images.length;h++)this.images[h].addEventListener("loaded",i);this.images[this.currentImageId].load()}else this.onLoaded()}else this.onError()},b.AtlasLoader.prototype.onLoaded=function(){this.images.length-1>this.currentImageId?(this.currentImageId++,this.images[this.currentImageId].load()):(this.loaded=!0,this.dispatchEvent({type:"loaded",content:this}))},b.AtlasLoader.prototype.onError=function(){this.dispatchEvent({type:"error",content:this})},b.SpriteSheetLoader=function(a,c){b.EventTarget.call(this),this.url=a,this.crossorigin=c,this.baseUrl=a.replace(/[^\/]*$/,""),this.texture=null,this.frames={}},b.SpriteSheetLoader.prototype.constructor=b.SpriteSheetLoader,b.SpriteSheetLoader.prototype.load=function(){var a=this,c=new b.JsonLoader(this.url,this.crossorigin);c.addEventListener("loaded",function(b){a.json=b.content.json,a.onLoaded()}),c.load()},b.SpriteSheetLoader.prototype.onLoaded=function(){this.dispatchEvent({type:"loaded",content:this})},b.ImageLoader=function(a,c){b.EventTarget.call(this),this.texture=b.Texture.fromImage(a,c),this.frames=[]},b.ImageLoader.prototype.constructor=b.ImageLoader,b.ImageLoader.prototype.load=function(){if(this.texture.baseTexture.hasLoaded)this.onLoaded();else{var a=this;this.texture.baseTexture.addEventListener("loaded",function(){a.onLoaded()})}},b.ImageLoader.prototype.onLoaded=function(){this.dispatchEvent({type:"loaded",content:this})},b.ImageLoader.prototype.loadFramedSpriteSheet=function(a,c,d){this.frames=[];for(var e=Math.floor(this.texture.width/a),f=Math.floor(this.texture.height/c),g=0,h=0;f>h;h++)for(var i=0;e>i;i++,g++){var j=new b.Texture(this.texture,{x:i*a,y:h*c,width:a,height:c});this.frames.push(j),d&&(b.TextureCache[d+"-"+g]=j)}if(this.texture.baseTexture.hasLoaded)this.onLoaded();else{var k=this;this.texture.baseTexture.addEventListener("loaded",function(){k.onLoaded()})}},b.BitmapFontLoader=function(a,c){b.EventTarget.call(this),this.url=a,this.crossorigin=c,this.baseUrl=a.replace(/[^\/]*$/,""),this.texture=null},b.BitmapFontLoader.prototype.constructor=b.BitmapFontLoader,b.BitmapFontLoader.prototype.load=function(){this.ajaxRequest=new b.AjaxRequest;var a=this;this.ajaxRequest.onreadystatechange=function(){a.onXMLLoaded()},this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.overrideMimeType&&this.ajaxRequest.overrideMimeType("application/xml"),this.ajaxRequest.send(null)},b.BitmapFontLoader.prototype.onXMLLoaded=function(){if(4===this.ajaxRequest.readyState&&(200===this.ajaxRequest.status||-1===window.location.protocol.indexOf("http"))){var a=this.ajaxRequest.responseXML;if(!a||/MSIE 9/i.test(navigator.userAgent)||navigator.isCocoonJS)if("function"==typeof window.DOMParser){var c=new DOMParser;a=c.parseFromString(this.ajaxRequest.responseText,"text/xml")}else{var d=document.createElement("div");d.innerHTML=this.ajaxRequest.responseText,a=d}var e=this.baseUrl+a.getElementsByTagName("page")[0].getAttribute("file"),f=new b.ImageLoader(e,this.crossorigin);this.texture=f.texture.baseTexture;var g={},h=a.getElementsByTagName("info")[0],i=a.getElementsByTagName("common")[0];g.font=h.getAttribute("face"),g.size=parseInt(h.getAttribute("size"),10),g.lineHeight=parseInt(i.getAttribute("lineHeight"),10),g.chars={};for(var j=a.getElementsByTagName("char"),k=0;k<j.length;k++){var l=parseInt(j[k].getAttribute("id"),10),m=new b.Rectangle(parseInt(j[k].getAttribute("x"),10),parseInt(j[k].getAttribute("y"),10),parseInt(j[k].getAttribute("width"),10),parseInt(j[k].getAttribute("height"),10));g.chars[l]={xOffset:parseInt(j[k].getAttribute("xoffset"),10),yOffset:parseInt(j[k].getAttribute("yoffset"),10),xAdvance:parseInt(j[k].getAttribute("xadvance"),10),kerning:{},texture:b.TextureCache[l]=new b.Texture(this.texture,m)}}var n=a.getElementsByTagName("kerning");for(k=0;k<n.length;k++){var o=parseInt(n[k].getAttribute("first"),10),p=parseInt(n[k].getAttribute("second"),10),q=parseInt(n[k].getAttribute("amount"),10);g.chars[p].kerning[o]=q}b.BitmapText.fonts[g.font]=g;var r=this;f.addEventListener("loaded",function(){r.onLoaded()}),f.load()}},b.BitmapFontLoader.prototype.onLoaded=function(){this.dispatchEvent({type:"loaded",content:this})},b.SpineLoader=function(a,c){b.EventTarget.call(this),this.url=a,this.crossorigin=c,this.loaded=!1},b.SpineLoader.prototype.constructor=b.SpineLoader,b.SpineLoader.prototype.load=function(){var a=this,c=new b.JsonLoader(this.url,this.crossorigin);
c.addEventListener("loaded",function(b){a.json=b.content.json,a.onLoaded()}),c.load()},b.SpineLoader.prototype.onLoaded=function(){this.loaded=!0,this.dispatchEvent({type:"loaded",content:this})},b.AbstractFilter=function(a,b){this.passes=[this],this.shaders=[],this.dirty=!0,this.padding=0,this.uniforms=b||{},this.fragmentSrc=a||[]},b.AlphaMaskFilter=function(a){b.AbstractFilter.call(this),this.passes=[this],a.baseTexture._powerOf2=!0,this.uniforms={mask:{type:"sampler2D",value:a},mapDimensions:{type:"2f",value:{x:1,y:5112}},dimensions:{type:"4fv",value:[0,0,0,0]}},a.baseTexture.hasLoaded?(this.uniforms.mask.value.x=a.width,this.uniforms.mask.value.y=a.height):(this.boundLoadedFunction=this.onTextureLoaded.bind(this),a.baseTexture.on("loaded",this.boundLoadedFunction)),this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D mask;","uniform sampler2D uSampler;","uniform vec2 offset;","uniform vec4 dimensions;","uniform vec2 mapDimensions;","void main(void) {","   vec2 mapCords = vTextureCoord.xy;","   mapCords += (dimensions.zw + offset)/ dimensions.xy ;","   mapCords.y *= -1.0;","   mapCords.y += 1.0;","   mapCords *= dimensions.xy / mapDimensions;","   vec4 original =  texture2D(uSampler, vTextureCoord);","   float maskAlpha =  texture2D(mask, mapCords).r;","   original *= maskAlpha;","   gl_FragColor =  original;","}"]},b.AlphaMaskFilter.prototype=Object.create(b.AbstractFilter.prototype),b.AlphaMaskFilter.prototype.constructor=b.AlphaMaskFilter,b.AlphaMaskFilter.prototype.onTextureLoaded=function(){this.uniforms.mapDimensions.value.x=this.uniforms.mask.value.width,this.uniforms.mapDimensions.value.y=this.uniforms.mask.value.height,this.uniforms.mask.value.baseTexture.off("loaded",this.boundLoadedFunction)},Object.defineProperty(b.AlphaMaskFilter.prototype,"map",{get:function(){return this.uniforms.mask.value},set:function(a){this.uniforms.mask.value=a}}),b.ColorMatrixFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={matrix:{type:"mat4",value:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float invert;","uniform mat4 matrix;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;","}"]},b.ColorMatrixFilter.prototype=Object.create(b.AbstractFilter.prototype),b.ColorMatrixFilter.prototype.constructor=b.ColorMatrixFilter,Object.defineProperty(b.ColorMatrixFilter.prototype,"matrix",{get:function(){return this.uniforms.matrix.value},set:function(a){this.uniforms.matrix.value=a}}),b.GrayFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={gray:{type:"1f",value:1}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","uniform float gray;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord);","   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);","}"]},b.GrayFilter.prototype=Object.create(b.AbstractFilter.prototype),b.GrayFilter.prototype.constructor=b.GrayFilter,Object.defineProperty(b.GrayFilter.prototype,"gray",{get:function(){return this.uniforms.gray.value},set:function(a){this.uniforms.gray.value=a}}),b.DisplacementFilter=function(a){b.AbstractFilter.call(this),this.passes=[this],a.baseTexture._powerOf2=!0,this.uniforms={displacementMap:{type:"sampler2D",value:a},scale:{type:"2f",value:{x:30,y:30}},offset:{type:"2f",value:{x:0,y:0}},mapDimensions:{type:"2f",value:{x:1,y:5112}},dimensions:{type:"4fv",value:[0,0,0,0]}},a.baseTexture.hasLoaded?(this.uniforms.mapDimensions.value.x=a.width,this.uniforms.mapDimensions.value.y=a.height):(this.boundLoadedFunction=this.onTextureLoaded.bind(this),a.baseTexture.on("loaded",this.boundLoadedFunction)),this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D displacementMap;","uniform sampler2D uSampler;","uniform vec2 scale;","uniform vec2 offset;","uniform vec4 dimensions;","uniform vec2 mapDimensions;","void main(void) {","   vec2 mapCords = vTextureCoord.xy;","   mapCords += (dimensions.zw + offset)/ dimensions.xy ;","   mapCords.y *= -1.0;","   mapCords.y += 1.0;","   vec2 matSample = texture2D(displacementMap, mapCords).xy;","   matSample -= 0.5;","   matSample *= scale;","   matSample /= mapDimensions;","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));","   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);","   vec2 cord = vTextureCoord;","}"]},b.DisplacementFilter.prototype=Object.create(b.AbstractFilter.prototype),b.DisplacementFilter.prototype.constructor=b.DisplacementFilter,b.DisplacementFilter.prototype.onTextureLoaded=function(){this.uniforms.mapDimensions.value.x=this.uniforms.displacementMap.value.width,this.uniforms.mapDimensions.value.y=this.uniforms.displacementMap.value.height,this.uniforms.displacementMap.value.baseTexture.off("loaded",this.boundLoadedFunction)},Object.defineProperty(b.DisplacementFilter.prototype,"map",{get:function(){return this.uniforms.displacementMap.value},set:function(a){this.uniforms.displacementMap.value=a}}),Object.defineProperty(b.DisplacementFilter.prototype,"scale",{get:function(){return this.uniforms.scale.value},set:function(a){this.uniforms.scale.value=a}}),Object.defineProperty(b.DisplacementFilter.prototype,"offset",{get:function(){return this.uniforms.offset.value},set:function(a){this.uniforms.offset.value=a}}),b.PixelateFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={invert:{type:"1f",value:0},dimensions:{type:"4fv",value:new Float32Array([1e4,100,10,10])},pixelSize:{type:"2f",value:{x:10,y:10}}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec2 testDim;","uniform vec4 dimensions;","uniform vec2 pixelSize;","uniform sampler2D uSampler;","void main(void) {","   vec2 coord = vTextureCoord;","   vec2 size = dimensions.xy/pixelSize;","   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;","   gl_FragColor = texture2D(uSampler, color);","}"]},b.PixelateFilter.prototype=Object.create(b.AbstractFilter.prototype),b.PixelateFilter.prototype.constructor=b.PixelateFilter,Object.defineProperty(b.PixelateFilter.prototype,"size",{get:function(){return this.uniforms.pixelSize.value},set:function(a){this.dirty=!0,this.uniforms.pixelSize.value=a}}),b.BlurXFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={blur:{type:"1f",value:1/512}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float blur;","uniform sampler2D uSampler;","void main(void) {","   vec4 sum = vec4(0.0);","   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;","   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;","   gl_FragColor = sum;","}"]},b.BlurXFilter.prototype=Object.create(b.AbstractFilter.prototype),b.BlurXFilter.prototype.constructor=b.BlurXFilter,Object.defineProperty(b.BlurXFilter.prototype,"blur",{get:function(){return this.uniforms.blur.value/(1/7e3)},set:function(a){this.dirty=!0,this.uniforms.blur.value=1/7e3*a}}),b.BlurYFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={blur:{type:"1f",value:1/512}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float blur;","uniform sampler2D uSampler;","void main(void) {","   vec4 sum = vec4(0.0);","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;","   gl_FragColor = sum;","}"]},b.BlurYFilter.prototype=Object.create(b.AbstractFilter.prototype),b.BlurYFilter.prototype.constructor=b.BlurYFilter,Object.defineProperty(b.BlurYFilter.prototype,"blur",{get:function(){return this.uniforms.blur.value/(1/7e3)},set:function(a){this.uniforms.blur.value=1/7e3*a}}),b.BlurFilter=function(){this.blurXFilter=new b.BlurXFilter,this.blurYFilter=new b.BlurYFilter,this.passes=[this.blurXFilter,this.blurYFilter]},Object.defineProperty(b.BlurFilter.prototype,"blur",{get:function(){return this.blurXFilter.blur},set:function(a){this.blurXFilter.blur=this.blurYFilter.blur=a}}),Object.defineProperty(b.BlurFilter.prototype,"blurX",{get:function(){return this.blurXFilter.blur},set:function(a){this.blurXFilter.blur=a}}),Object.defineProperty(b.BlurFilter.prototype,"blurY",{get:function(){return this.blurYFilter.blur},set:function(a){this.blurYFilter.blur=a}}),b.InvertFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={invert:{type:"1f",value:1}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float invert;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord);","   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);","}"]},b.InvertFilter.prototype=Object.create(b.AbstractFilter.prototype),b.InvertFilter.prototype.constructor=b.InvertFilter,Object.defineProperty(b.InvertFilter.prototype,"invert",{get:function(){return this.uniforms.invert.value},set:function(a){this.uniforms.invert.value=a}}),b.SepiaFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={sepia:{type:"1f",value:1}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float sepia;","uniform sampler2D uSampler;","const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord);","   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);","}"]},b.SepiaFilter.prototype=Object.create(b.AbstractFilter.prototype),b.SepiaFilter.prototype.constructor=b.SepiaFilter,Object.defineProperty(b.SepiaFilter.prototype,"sepia",{get:function(){return this.uniforms.sepia.value},set:function(a){this.uniforms.sepia.value=a}}),b.TwistFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={radius:{type:"1f",value:.5},angle:{type:"1f",value:5},offset:{type:"2f",value:{x:.5,y:.5}}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec4 dimensions;","uniform sampler2D uSampler;","uniform float radius;","uniform float angle;","uniform vec2 offset;","void main(void) {","   vec2 coord = vTextureCoord - offset;","   float distance = length(coord);","   if (distance < radius) {","       float ratio = (radius - distance) / radius;","       float angleMod = ratio * ratio * angle;","       float s = sin(angleMod);","       float c = cos(angleMod);","       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);","   }","   gl_FragColor = texture2D(uSampler, coord+offset);","}"]},b.TwistFilter.prototype=Object.create(b.AbstractFilter.prototype),b.TwistFilter.prototype.constructor=b.TwistFilter,Object.defineProperty(b.TwistFilter.prototype,"offset",{get:function(){return this.uniforms.offset.value},set:function(a){this.dirty=!0,this.uniforms.offset.value=a}}),Object.defineProperty(b.TwistFilter.prototype,"radius",{get:function(){return this.uniforms.radius.value},set:function(a){this.dirty=!0,this.uniforms.radius.value=a}}),Object.defineProperty(b.TwistFilter.prototype,"angle",{get:function(){return this.uniforms.angle.value},set:function(a){this.dirty=!0,this.uniforms.angle.value=a}}),b.ColorStepFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={step:{type:"1f",value:5}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","uniform float step;","void main(void) {","   vec4 color = texture2D(uSampler, vTextureCoord);","   color = floor(color * step) / step;","   gl_FragColor = color;","}"]},b.ColorStepFilter.prototype=Object.create(b.AbstractFilter.prototype),b.ColorStepFilter.prototype.constructor=b.ColorStepFilter,Object.defineProperty(b.ColorStepFilter.prototype,"step",{get:function(){return this.uniforms.step.value},set:function(a){this.uniforms.step.value=a}}),b.DotScreenFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={scale:{type:"1f",value:1},angle:{type:"1f",value:5},dimensions:{type:"4fv",value:[0,0,0,0]}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec4 dimensions;","uniform sampler2D uSampler;","uniform float angle;","uniform float scale;","float pattern() {","   float s = sin(angle), c = cos(angle);","   vec2 tex = vTextureCoord * dimensions.xy;","   vec2 point = vec2(","       c * tex.x - s * tex.y,","       s * tex.x + c * tex.y","   ) * scale;","   return (sin(point.x) * sin(point.y)) * 4.0;","}","void main() {","   vec4 color = texture2D(uSampler, vTextureCoord);","   float average = (color.r + color.g + color.b) / 3.0;","   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);","}"]},b.DotScreenFilter.prototype=Object.create(b.AbstractFilter.prototype),b.DotScreenFilter.prototype.constructor=b.DotScreenFilter,Object.defineProperty(b.DotScreenFilter.prototype,"scale",{get:function(){return this.uniforms.scale.value},set:function(a){this.dirty=!0,this.uniforms.scale.value=a}}),Object.defineProperty(b.DotScreenFilter.prototype,"angle",{get:function(){return this.uniforms.angle.value},set:function(a){this.dirty=!0,this.uniforms.angle.value=a}}),b.CrossHatchFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={blur:{type:"1f",value:1/512}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float blur;","uniform sampler2D uSampler;","void main(void) {","    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);","    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);","    if (lum < 1.00) {","        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","    if (lum < 0.75) {","        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","    if (lum < 0.50) {","        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","    if (lum < 0.3) {","        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","}"]},b.CrossHatchFilter.prototype=Object.create(b.AbstractFilter.prototype),b.CrossHatchFilter.prototype.constructor=b.BlurYFilter,Object.defineProperty(b.CrossHatchFilter.prototype,"blur",{get:function(){return this.uniforms.blur.value/(1/7e3)},set:function(a){this.uniforms.blur.value=1/7e3*a}}),b.RGBSplitFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={red:{type:"2f",value:{x:20,y:20}},green:{type:"2f",value:{x:-20,y:20}},blue:{type:"2f",value:{x:20,y:-20}},dimensions:{type:"4fv",value:[0,0,0,0]}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec2 red;","uniform vec2 green;","uniform vec2 blue;","uniform vec4 dimensions;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;","   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;","   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;","   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;","}"]},b.RGBSplitFilter.prototype=Object.create(b.AbstractFilter.prototype),b.RGBSplitFilter.prototype.constructor=b.RGBSplitFilter,Object.defineProperty(b.RGBSplitFilter.prototype,"angle",{get:function(){return this.uniforms.blur.value/(1/7e3)},set:function(a){this.uniforms.blur.value=1/7e3*a}}),"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=b),exports.PIXI=b):"undefined"!=typeof define&&define.amd?define(b):a.PIXI=b}).call(this);
},{}],3:[function(require,module,exports){
(function() {
	/**
	 * The basic xnode class.
	 * It sets the underlying node element by calling
	 * document.createElement
	 */
	function XNode(type, content) {
		this.node = document.createElement(type);

		if (content !== undefined)
			this.node.innerHTML = content;
	}

	/**
	 * This method creates an extended class using
	 * the XNode class defined above.
	 */
	function createExtendedXNodeElement(elementType, content) {
		var f = function(content) {
			XNode.call(this, elementType, content);
		};

		f.prototype = Object.create(XNode.prototype);
		f.prototype.constructor = f;

		return f;
	}

	/**
	 * Create a read only property that returns the
	 * value of the corresponding property of the
	 * underlying node object.
	 */
	function createXNodeReadOnlyProperty(propertyName) {
		Object.defineProperty(XNode.prototype, propertyName, {
			get: function() {
				return this.node[propertyName];
			}
		});
	}

	/**
	 * Create a read write property that operates on
	 * the corresponding property of the underlying
	 * node object.
	 */
	function createXNodeReadWriteProperty(propertyName) {
		Object.defineProperty(XNode.prototype, propertyName, {
			get: function() {
				return this.node[propertyName];
			},

			set: function(value) {
				this.node[propertyName] = value;
			}
		});
	}

	/**
	 * Create a method that routes the call through, down
	 * to the same method on the underlying node object.
	 */
	function createXNodeMethod(methodName) {
		XNode.prototype[methodName] = function() {
			return this.node[methodName].apply(this.node, arguments);
		}
	}

	/**
	 * Modify the Node.property function, so that it accepts
	 * XNode objects. All XNode objects will be changed to
	 * the underlying node objects, and the corresponding
	 * method will be called.
	 */
	function createNodeToXNodeMethodWrapper(methodName) {
		var originalFunction = Node.prototype[methodName];

		Node.prototype[methodName] = function() {
			for (var a in arguments) {
				if (arguments[a] instanceof XNode)
					arguments[a] = arguments[a].node;
			}

			return originalFunction.apply(this, arguments);
		}
	}

	/**
	 * Set up read only properties.
	 */
	createXNodeReadOnlyProperty("style");

	/**
	 * Set up read/write properties.
	 */
	createXNodeReadWriteProperty("innerHTML");
	createXNodeReadWriteProperty("href");
	createXNodeReadWriteProperty("id");
	createXNodeReadWriteProperty("value");
	createXNodeReadWriteProperty("type");
	createXNodeReadWriteProperty("className");
	createXNodeReadWriteProperty("src");

	/**
	 * Set up methods to be routed to the underlying node object.
	 */
	createXNodeMethod("appendChild");
	createXNodeMethod("removeChild");
	createXNodeMethod("addEventListener");
	createXNodeMethod("removeEventListener");

	/**
	 * Set up methods on Node.property.
	 */
	createNodeToXNodeMethodWrapper("appendChild");
	createNodeToXNodeMethodWrapper("removeChild");

	/**
	 * Create event listener aliases.
	 */
	XNode.prototype.on = XNode.prototype.addEventListener;
	XNode.prototype.off = XNode.prototype.removeEventListener;

	/**
	 * Work both as a npm module and standalone.
	 */
	var target;

	if (typeof module !== "undefined" && module.exports) {
		target = {};
		module.exports = target;
	} else {
		xnode = {};
		target = xnode;
	}

	/**
	 * Create extended classes.
	 */
	target.Div = createExtendedXNodeElement("div");
	target.Button = createExtendedXNodeElement("button");
	target.Ul = createExtendedXNodeElement("ul");
	target.Li = createExtendedXNodeElement("li");
	target.A = createExtendedXNodeElement("a");
	target.Option = createExtendedXNodeElement("option");
	target.Select = createExtendedXNodeElement("select");
	target.Input = createExtendedXNodeElement("input");
	target.Nav = createExtendedXNodeElement("nav");
	target.Span = createExtendedXNodeElement("span");
	target.P = createExtendedXNodeElement("p");
	target.Table = createExtendedXNodeElement("table");
	target.Thead = createExtendedXNodeElement("thead");
	target.Tbody = createExtendedXNodeElement("tbody");
	target.Tr = createExtendedXNodeElement("tr");
	target.Td = createExtendedXNodeElement("td");
	target.Th = createExtendedXNodeElement("th");
	target.Img = createExtendedXNodeElement("img");
	target.I = createExtendedXNodeElement("i");
	target.B = createExtendedXNodeElement("b");
	target.H1 = createExtendedXNodeElement("h1");
	target.H2 = createExtendedXNodeElement("h2");
	target.H3 = createExtendedXNodeElement("h3");
	target.H4 = createExtendedXNodeElement("h4");
	target.H5 = createExtendedXNodeElement("h5");
	target.H6 = createExtendedXNodeElement("h6");
})();
},{}],4:[function(require,module,exports){
var inherits = require("inherits");
var EventDispatcher = require("yaed");

/**
 * Collection.
 * @class Collection
 */
function Collection() {
	this.items = [];
}

inherits(Collection, EventDispatcher);

/**
 * Add item at end.
 * @method addItem
 */
Collection.prototype.addItem = function(item) {
	this.items.push(item);

	this.triggerChange("add", item, this.items.length - 1);
}

/**
 * Add item at index.
 * @method addItem
 */
Collection.prototype.addItemAt = function(index, item) {
	if (index < 0)
		index = 0;

	if (index > this.items.length)
		index = this.items.length;

	var after = this.items.splice(index);
	this.items.push(item);
	this.items = this.items.concat(after);

	this.triggerChange("add", item, index);
}

/**
 * Get length.
 * @method getLength
 */
Collection.prototype.getLength = function() {
	return this.items.length;
}

/**
 * Get item at index.
 * @method getItemAt
 */
Collection.prototype.getItemAt = function(index) {
	return this.items[index];
}

/**
 * Find item index.
 * @method getItemIndex
 */
Collection.prototype.getItemIndex = function(item) {
	return this.items.indexOf(item);
}

/**
 * Remove item at.
 * @method removeItemAt
 */
Collection.prototype.removeItemAt = function(index) {
	if (index < 0 || index >= this.items.length)
		return;

	var item = this.getItemAt(index);

	this.items.splice(index, 1);
	this.triggerChange("remove", item, index);
}

/**
 * Remove item.
 * @method removeItem
 */
Collection.prototype.removeItem = function(item) {
	var index = this.getItemIndex(item);

	this.removeItemAt(index);
}

/**
 * Trigger change event.
 * @method triggerChange
 * @private
 */
Collection.prototype.triggerChange = function(eventKind, item, index) {
	this.trigger({
		type: eventKind,
		item: item,
		index: index
	});

	this.trigger({
		type: "change",
		kind: eventKind,
		item: item,
		index: index
	});
}

module.exports = Collection;
},{"inherits":1,"yaed":8}],5:[function(require,module,exports){
var EventDispatcher = require("yaed");
var xnode = require("xnode");
var inherits = require("inherits");
var CollectionViewManager=require("./CollectionViewManager");

/**
 * CollectionView.
 * @class CollectionView
 */
function CollectionView() {
	xnode.Div.call(this);

	this.manager=new CollectionViewManager(this);
}

inherits(CollectionView, xnode.Div);

/**
 * Set item renderer class.
 * @method setItemRendererClass
 */
CollectionView.prototype.setItemRendererClass = function(value) {
	this.manager.setItemRendererClass(value);
}

/**
 * Set item renderer factory.
 * @method setItemRendererFactory
 */
CollectionView.prototype.setItemRendererFactory = function(value) {
	this.manager.setItemRendererFactory(value);
}

/**
 * Set item controller class.
 * @method setItemRendererClass
 */
CollectionView.prototype.setItemControllerClass = function(value) {
	this.manager.setItemControllerClass(value);
}

/**
 * Set item controller factory.
 * @method setItemRendererFactory
 */
CollectionView.prototype.setItemControllerFactory = function(value) {
	this.manager.setItemControllerFactory(value);
}

/**
 * Set data source.
 * @method setDataSource
 */
CollectionView.prototype.setDataSource = function(value) {
	this.manager.setDataSource(value);
}

module.exports = CollectionView;
},{"./CollectionViewManager":6,"inherits":1,"xnode":3,"yaed":8}],6:[function(require,module,exports){
var EventDispatcher = require("yaed");
var xnode = require("xnode");
var inherits = require("inherits");

/**
 * CollectionViewManager.
 * @class CollectionViewManager
 */
function CollectionViewManager(target) {
	this.itemRenderers = [];
	this.itemRendererClass = null;
	this.itemRendererFactory = null;
	this.itemControllerClass = null;
	this.itemControllerFactory = null;
	this.dataSource = null;
	this.target = null;

	this.setTarget(target);
}

/**
 * Set target.
 * @method setTarget
 */
CollectionViewManager.prototype.setTarget = function(value) {
	this.removeAllItemRenderers();
	this.target=value;
	this.removeAllItemRenderers();
}

/**
 * Set item renderer class.
 * @method setItemRendererClass
 */
CollectionViewManager.prototype.setItemRendererClass = function(value) {
	if (value && typeof value != "function")
		throw new Error("The item renderer class should be a function");

	this.itemRendererClass = value;
	this.refreshAllItemRenderers();
}

/**
 * Set item renderer factory.
 * @method setItemRendererFactory
 */
CollectionViewManager.prototype.setItemRendererFactory = function(value) {
	if (value && typeof value != "function")
		throw new Error("The item renderer factory should be a function");

	this.itemRendererFactory = value;
	this.refreshAllItemRenderers();
}

/**
 * Set item controller class.
 * @method setItemRendererClass
 */
CollectionViewManager.prototype.setItemControllerClass = function(value) {
	if (value && typeof value != "function")
		throw new Error("The item renderer class should be a function");

	this.itemControllerClass = value;
	this.refreshAllItemRenderers();
}

/**
 * Set item controller factory.
 * @method setItemRendererFactory
 */
CollectionViewManager.prototype.setItemControllerFactory = function(value) {
	if (value && typeof value != "function")
		throw new Error("The item renderer factory should be a function");

	this.itemControllerFactory = value;
	this.refreshAllItemRenderers();
}

/**
 * Set data source.
 * @method setDataSource
 */
CollectionViewManager.prototype.setDataSource = function(value) {
	if (this.dataSource) {
		this.dataSource.off("change", this.onDataSourceChange, this);
	}

	this.dataSource = value;

	if (this.dataSource) {
		this.dataSource.on("change", this.onDataSourceChange, this);
	}

	this.refreshAllItemRenderers();
}

/**
 * Something in the data source was changed.
 * @method onDataSourceChange
 * @private
 */
CollectionViewManager.prototype.onDataSourceChange = function() {
	this.refreshAllItemRenderers();
}

/**
 * Remove all item renderers.
 * @method removeAllItemRenderers
 * @private
 */
CollectionViewManager.prototype.removeAllItemRenderers = function() {
	for (var i = 0; i < this.itemRenderers.length; i++) {
		if (this.itemRenderers[i].__controller)
			this.itemRenderers[i].__controller.setData(null);

		else
			this.itemRenderers[i].setData(null);

		this.target.removeChild(this.itemRenderers[i]);
	}

	this.itemRenderers = [];
}

/**
 * Refresh all item renderers.
 * @method refreshAllItemRenderers
 * @private
 */
CollectionViewManager.prototype.refreshAllItemRenderers = function() {
	this.removeAllItemRenderers();

	if (!this.dataSource)
		return;

	if (!this.itemRendererClass && !this.itemRendererFactory)
		return;

	if (!this.target)
		return;

	for (var i = 0; i < this.dataSource.getLength(); i++) {
		var data = this.dataSource.getItemAt(i);
		var renderer = this.createItemRenderer();

		if (this.itemControllerClass || this.itemControllerFactory) {
			renderer.__controller = this.createItemController(renderer);
			renderer.__controller.setData(data);
		} else {
			renderer.setData(data);
		}

		this.itemRenderers.push(renderer);
		this.target.appendChild(renderer);
	}
}

/**
 * Create item renderer.
 * @method createItemRenderer
 * @private
 */
CollectionViewManager.prototype.createItemRenderer = function() {
	if (this.itemRendererFactory)
		return this.itemRendererFactory();

	if (this.itemRendererClass)
		return new this.itemRendererClass();

	throw new Error("Can't create item renderer!");
}

/**
 * Create item controller.
 * @method createItemController
 * @private
 */
CollectionViewManager.prototype.createItemController = function(renderer) {
	if (this.itemControllerFactory)
		return this.itemControllerFactory(renderer);

	if (this.itemControllerClass)
		return new this.itemControllerClass(renderer);

	throw new Error("Can't create item controller!");
}

module.exports = CollectionViewManager;
},{"inherits":1,"xnode":3,"yaed":8}],7:[function(require,module,exports){
module.exports = {
	Collection: require("./Collection"),
	CollectionView: require("./CollectionView"),
	CollectionViewManager: require("./CollectionViewManager")
};
},{"./Collection":4,"./CollectionView":5,"./CollectionViewManager":6}],8:[function(require,module,exports){
/**
 * AS3/jquery style event dispatcher. Slightly modified. The
 * jquery style on/off/trigger style of adding listeners is
 * currently the preferred one.
 *
 * The on method for adding listeners takes an extra parameter which is the
 * scope in which listeners should be called. So this:
 *
 *     object.on("event", listener, this);
 *
 * Has the same function when adding events as:
 *
 *     object.on("event", listener.bind(this));
 *
 * However, the difference is that if we use the second method it
 * will not be possible to remove the listeners later, unless
 * the closure created by bind is stored somewhere. If the
 * first method is used, we can remove the listener with:
 *
 *     object.off("event", listener, this);
 *
 * @class EventDispatcher
 */
function EventDispatcher() {
	this.listenerMap = {};
}

/**
 * Add event listener.
 * @method addEventListener
 */
EventDispatcher.prototype.addEventListener = function(eventType, listener, scope) {
	if (!this.listenerMap)
		this.listenerMap = {};

	if (!eventType)
		throw new Error("Event type required for event dispatcher");

	if (!listener)
		throw new Error("Listener required for event dispatcher");

	this.removeEventListener(eventType, listener, scope);

	if (!this.listenerMap.hasOwnProperty(eventType))
		this.listenerMap[eventType] = [];

	this.listenerMap[eventType].push({
		listener: listener,
		scope: scope
	});
}

/**
 * Remove event listener.
 * @method removeEventListener
 */
EventDispatcher.prototype.removeEventListener = function(eventType, listener, scope) {
	if (!this.listenerMap)
		this.listenerMap = {};

	if (!this.listenerMap.hasOwnProperty(eventType))
		return;

	var listeners = this.listenerMap[eventType];

	for (var i = 0; i < listeners.length; i++) {
		var listenerObj = listeners[i];

		if (listener == listenerObj.listener && scope == listenerObj.scope) {
			listeners.splice(i, 1);
			i--;
		}
	}

	if (!listeners.length)
		delete this.listenerMap[eventType];
}

/**
 * Dispatch event.
 * @method dispatchEvent
 */
EventDispatcher.prototype.dispatchEvent = function(event /* ... */ ) {
	if (!this.listenerMap)
		this.listenerMap = {};

	var eventType;
	var listenerParams;

	if (typeof event == "string") {
		eventType = event;

		if (arguments.length > 1)
			listenerParams = Array.prototype.slice.call(arguments, 1);

		else listenerParams = [{
			type: eventType,
			target: this
		}];
	} else {
		eventType = event.type;
		event.target = this;
		listenerParams = [event];
	}

	if (!this.listenerMap.hasOwnProperty(eventType))
		return;

	for (var i in this.listenerMap[eventType]) {
		var listenerObj = this.listenerMap[eventType][i];
		listenerObj.listener.apply(listenerObj.scope, listenerParams);
	}
}

/**
 * Jquery style alias for addEventListener
 * @method on
 */
EventDispatcher.prototype.on = EventDispatcher.prototype.addEventListener;

/**
 * Jquery style alias for removeEventListener
 * @method off
 */
EventDispatcher.prototype.off = EventDispatcher.prototype.removeEventListener;

/**
 * Jquery style alias for dispatchEvent
 * @method trigger
 */
EventDispatcher.prototype.trigger = EventDispatcher.prototype.dispatchEvent;

/**
 * Make something an event dispatcher. Can be used for multiple inheritance.
 * @method init
 * @static
 */
EventDispatcher.init = function(cls) {
	cls.prototype.addEventListener = EventDispatcher.prototype.addEventListener;
	cls.prototype.removeEventListener = EventDispatcher.prototype.removeEventListener;
	cls.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
	cls.prototype.on = EventDispatcher.prototype.on;
	cls.prototype.off = EventDispatcher.prototype.off;
	cls.prototype.trigger = EventDispatcher.prototype.trigger;
}

if (typeof module !== 'undefined') {
	module.exports = EventDispatcher;
}
},{}],9:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var RootView = require("../views/RootView");
var View = require("../views/View");
var EditorControllerView = require("../views/EditorControllerView");
var TargetControllerView = require("../views/TargetControllerView");
var EditorController = require("../controllers/EditorController");
var TargetController = require("../controllers/TargetController");
var FiddleClientModel = require("../models/FiddleClientModel");
var FiddleClientView = require("../views/FiddleClientView");
var FiddleClientController = require("../controllers/FiddleClientController");
var xnode = require("xnode");

function FiddleClient(domContainer, session, basePath) {
	xnode.Div.call(this);

	this.fiddleClientModel = new FiddleClientModel();
	this.fiddleClientModel.setSession(session);

	this.fiddleClientView = new FiddleClientView();
	this.appendChild(this.fiddleClientView);

	this.fiddleClientController = new FiddleClientController(
		this.fiddleClientView,
		this.fiddleClientModel
	);

	/*this.session = session;

	this.editorView = new EditorControllerView();
	this.addChild(this.editorView);
	this.editor = new EditorController(basePath, this.session, this.editorView);
	this.editor.on(EditorController.Refresh, this.onRefresh, this);

	this.targetView = new TargetControllerView();
	this.addChild(this.targetView);
	this.targetView.x = 500;
	this.target = new TargetController(this.targetView);

	window.addEventListener("resize", this.onResize.bind(this));*/

	domContainer.appendChild(this);
};

ClassUtils.extends(FiddleClient, xnode.Div);

FiddleClient.prototype.init = function(resources) {
	//this.editor.init(editorContainer);
	this.resources = resources;

	if (resources.isLoading()) {
		resources.on(Resources.Loaded, this.doInit, this);
	} else {
		this.doInit();
	}
};

FiddleClient.prototype.addTestcase = function(id, name, url) {
	//this.target.addTestcase(id, name, url);
	this.fiddleClientModel.addTestcase(id, name, url)
};

FiddleClient.prototype.doInit = function() {
	/*this.target.init();
	this.editor.init(this.resources);

	this.updateLayout(document.body.clientWidth, document.body.clientHeight);*/

	this.fiddleClientModel.initWithResources(this.resources);
};

/*FiddleClient.prototype.onRefresh = function() {
	this.target.reload();
};

FiddleClient.prototype.onResize = function() {
	this.updateLayout(document.body.clientWidth, document.body.clientHeight);
};


FiddleClient.prototype.updateLayout = function(width, height) {
	this.editorView.x = 0;
	this.targetView.x = width * 0.5;
	this.editorView.updateLayout(width * 0.5, height);
	this.targetView.updateLayout(width * 0.5, height);
};*/


module.exports = FiddleClient;
},{"../controllers/EditorController":12,"../controllers/FiddleClientController":13,"../controllers/TargetController":22,"../models/FiddleClientModel":27,"../utils/ClassUtils":32,"../views/EditorControllerView":36,"../views/FiddleClientView":38,"../views/RootView":56,"../views/TargetControllerView":59,"../views/View":63,"xnode":3}],10:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var Editor = require("./Editor");
var ColorItem = require("../views/ColorItem");

function ColorsEditor(basePath, session, view) {
	Editor.call(this, basePath, session, view);
};
ClassUtils.extends(ColorsEditor, Editor);
EventDispatcher.init(ColorsEditor);

ColorsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var colors = this.resources.getResourceObject().colors;

	for(var key in colors) {
		var item = new ColorItem(key, colors[key]);
		this.view.addItem(item);
		item.on(ColorItem.Changed, this.onChanged, this);
	}
};

ColorsEditor.prototype.onChanged = function(item) {
	this.resources.getResourceObject().colors[item.id] = item.getValue();
	this.save();
};

module.exports = ColorsEditor;
},{"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"../views/ColorItem":35,"./Editor":11}],11:[function(require,module,exports){
var EventDispatcher = require("../utils/EventDispatcher");
var APIConnection = require("../utils/APIConnection");

function Editor(basePath, session, view) {
	this.view = view;
	this.basePath = basePath;
	this.session = session;
	this.items = new Array();
	this.container = null;
	this.resources = null;
};
Editor.prototype.constructor = Editor;
EventDispatcher.init(Editor);

Editor.Saved = "Saved";

Editor.prototype.init = function() {
	
};


Editor.prototype.show = function() {
	this.view.show();
};


Editor.prototype.hide = function() {
	this.view.hide();
};


Editor.prototype.save = function() {
	try {
		var connection = new APIConnection("./", this.session);
		connection.on("loaded", this.onSaved, this);
		connection.load("save", {session: this.session, json: JSON.stringify(this.resources.getResourceObject())});
	}
	catch(error) {
		console.log("Failed to save: ", error);
	}
};

Editor.prototype.onSaved = function(data) {
	var connection = data.connection;
	var json = data.json;
	connection.off("loaded", this.onSaved, this);
	this.trigger(Editor.Saved);
};

module.exports = Editor;
},{"../utils/APIConnection":31,"../utils/EventDispatcher":34}],12:[function(require,module,exports){
var EventDispatcher = require("../utils/EventDispatcher");
var EditorView = require("../views/EditorView");
var Editor = require("../controllers/Editor");
var GraphicsEditor = require("../controllers/GraphicsEditor");
var PositionsEditor = require("../controllers/PositionsEditor");
var StringsEditor = require("../controllers/StringsEditor");
var ColorsEditor = require("../controllers/ColorsEditor");
var Menu = require("../controllers/Menu");
var MenuItem = require("../views/MenuItem");
var MenuView = require("../views/MenuView");

function EditorController(basePath, session, view) {
	this.view = view;

	this.view.show();
	
	this.menuView = new MenuView();
	this.view.setMenuView(this.menuView);

	var items = [
		new MenuItem("image", "Graphics"),
		new MenuItem("position", "Positions"),
		new MenuItem("color", "Colors"),
		new MenuItem("string", "Strings")
	];

	this.menuView.setItems(items);

	this.menu = new Menu(this.menuView, items);
	this.menu.on(Menu.ItemClicked, this.onChangeView, this);

	var editorView = new EditorView();
	this.view.addEditor(editorView);
	editorView.y = this.menuView.height;
	this.graphicsEditor = new GraphicsEditor(basePath, session, editorView);

	var editorView = new EditorView();
	this.view.addEditor(editorView);
	editorView.y = this.menuView.height;
	this.positionsEditor = new PositionsEditor("./", session, editorView);

	var editorView = new EditorView();
	this.view.addEditor(editorView);
	editorView.y = this.menuView.height;
	this.colorsEditor = new ColorsEditor("./", session, editorView);

	var editorView = new EditorView();
	this.view.addEditor(editorView);
	this.stringsEditor = new StringsEditor("./", session, editorView);

	this.currentEditor = this.graphicsEditor;
	this.currentEditor.show();

	//this.editor.on("saved", this.onSaved, this);
	//this.editor.on("loaded", this.onTexture, this);
	this.graphicsEditor.on("uploaded", this.onUploaded, this);

	this.graphicsEditor.on(Editor.Saved, this.onSaved, this);
	this.positionsEditor.on(Editor.Saved, this.onSaved, this);
	this.colorsEditor.on(Editor.Saved, this.onSaved, this);
	this.stringsEditor.on(Editor.Saved, this.onSaved, this);
};
EditorController.prototype.constructor = EditorController;
EventDispatcher.init(EditorController);

EditorController.Refresh = "refresh";

EditorController.prototype.init = function(resources) {
	this.resources = resources;
	
	this.positionsEditor.init(resources);
	this.graphicsEditor.init(resources);
	//this.stringsEditor.init(resources);
	this.colorsEditor.init(resources);

	this.graphicsEditor.save();
};


EditorController.prototype.onChangeView = function(item) {
	this.currentEditor.hide();
	switch(item.id) {
		case "image": {
			this.currentEditor = this.graphicsEditor;
			break;
		}
		case "position": {
			this.currentEditor = this.positionsEditor;
			break;
		}
		case "color": {
			this.currentEditor = this.colorsEditor;
			break;
		}
		case "string": {
			this.currentEditor = this.stringsEditor;
			break;
		}
	}
	this.currentEditor.show();
	this.currentEditor.view.updateLayout(this.view.width, this.view.height);

	setTimeout(function () {
		this.view.updateLayout(document.body.clientWidth*.5, document.body.clientHeight);
	}.bind(this),0);
};


EditorController.prototype.onUploaded = function(textureJson) {
	//this.editor.setTextureJson(textureJson);
	this.trigger(EditorController.Refresh);
};


EditorController.prototype.onSaved = function(textureJson) {
	//this.editor.setTextureJson(textureJson);
	this.trigger(EditorController.Refresh);
};

module.exports = EditorController;
},{"../controllers/ColorsEditor":10,"../controllers/Editor":11,"../controllers/GraphicsEditor":14,"../controllers/Menu":15,"../controllers/PositionsEditor":16,"../controllers/StringsEditor":21,"../utils/EventDispatcher":34,"../views/EditorView":37,"../views/MenuItem":45,"../views/MenuView":46}],13:[function(require,module,exports){
var inherits = require("inherits");
var xnodec = require("xnodecollection");
var TargetTabHeaderController = require("./TargetTabHeaderController");
var TargetTabHeaderView = require("../views/TargetTabHeaderView");
var ResourceTabHeaderController = require("./ResourceTabHeaderController");
var ResourceTabHeaderView = require("../views/ResourceTabHeaderView");
var ResourceTabView = require("../views/ResourceTabView");
var ResourceTabController = require("../controllers/ResourceTabController");

function FiddleClientController(fiddleClientView, fiddleClientModel) {
	this.fiddleClientView = fiddleClientView;
	this.fiddleClientModel = fiddleClientModel;

	this.targetTabsHeaderManager = new xnodec.CollectionViewManager();
	this.targetTabsHeaderManager.setItemRendererClass(TargetTabHeaderView);
	this.targetTabsHeaderManager.setItemControllerClass(TargetTabHeaderController);
	this.targetTabsHeaderManager.setTarget(this.fiddleClientView.getTargetPaneView().getTabHeaderHolder());
	this.targetTabsHeaderManager.setDataSource(this.fiddleClientModel.getTestcaseCollection());

	this.resourceTabsHeaderManager = new xnodec.CollectionViewManager();
	this.resourceTabsHeaderManager.setItemRendererClass(ResourceTabHeaderView);
	this.resourceTabsHeaderManager.setItemControllerClass(ResourceTabHeaderController);
	this.resourceTabsHeaderManager.setTarget(this.fiddleClientView.getResourcePaneView().getTabHeaderHolder());
	this.resourceTabsHeaderManager.setDataSource(this.fiddleClientModel.getCategoryCollection());

	this.resourceTabsManager = new xnodec.CollectionViewManager();
	this.resourceTabsManager.setItemRendererClass(ResourceTabView);
	this.resourceTabsManager.setItemControllerClass(ResourceTabController);
	this.resourceTabsManager.setTarget(this.fiddleClientView.getResourcePaneView().getTabHolder());
	this.resourceTabsManager.setDataSource(this.fiddleClientModel.getCategoryCollection());
}

module.exports = FiddleClientController;
},{"../controllers/ResourceTabController":19,"../views/ResourceTabHeaderView":54,"../views/ResourceTabView":55,"../views/TargetTabHeaderView":61,"./ResourceTabHeaderController":20,"./TargetTabHeaderController":23,"inherits":1,"xnodecollection":7}],14:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var APIConnection = require("../utils/APIConnection");
var Editor = require("./Editor");
var ImageItem = require("../views/ImageItem");
var SelectButton = require("../views/SelectButton");
var Resources = require("../../../lib/Resources");


function GraphicsEditor(basePath, session, view) {
	Editor.call(this, basePath, session, view);

	this.currentItem = null;
};
ClassUtils.extends(GraphicsEditor, Editor);

EventDispatcher.init(GraphicsEditor);

GraphicsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var graphics = this.resources.getResourceObject().graphics;


	for(var key in graphics) {
		if(key != "textures") {
			var imageItem = new ImageItem(this.basePath, key, this.resources.getDOMTexture(key));
			this.view.addItem(imageItem);
			imageItem.on(ImageItem.Selected, this.onUpload, this);
		}
	}
};

GraphicsEditor.prototype.onUpload = function(item) {
	
	if(item.getValues().length > 0) {
		var data = new FormData();
		data.append('SelectedFile', item.getValues()[0]);
		data.append("Filename", item.name);
		data.append("url", document.location);
		this.currentItem = item;
		var connection = new APIConnection("./", this.session);
		connection.on("loaded", this.onUploaded, this);
		connection.upload("upload", data);
	}
	else {
		console.warn("No files selected: event:", item);
	}
};

GraphicsEditor.prototype.onUploaded = function(data) {
	var connection = data.connection;
	var json = data.json;
	
	this.resources.addSource({graphics: json}, true);
	this.save();
	this.currentItem.setTexture(this.resources.getDOMTexture(this.currentItem.name));
	//this.loadImages();
	this.trigger("uploaded", json);
};

module.exports = GraphicsEditor;
},{"../../../lib/Resources":64,"../utils/APIConnection":31,"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"../views/ImageItem":41,"../views/SelectButton":57,"./Editor":11}],15:[function(require,module,exports){
var EventDispatcher = require("../utils/EventDispatcher");
var MenuItem = require("../views/MenuItem");

function Menu(view, menuItems) {
	this.menuItems = menuItems;
	this.view = view;

	for(var i = 0; i < this.menuItems.length; i++) {
		this.menuItems[i].on(MenuItem.Click, this.onMenuItemClick, this);
	}
	if(this.menuItems.length > 0) {
		this.currentMenuItem = this.menuItems[0];
		this.currentMenuItem.setSelected(true);
	}
};
Menu.prototype.constructor = Menu;
EventDispatcher.init(Menu);

Menu.ItemClicked = "ItemClicked";

Menu.prototype.addItem = function(item) {
	if(this.menuItems.length <= 0) {
		this.currentMenuItem = item;
		this.currentMenuItem.setSelected(true);
		this.trigger(Menu.ItemClicked, item);
	}
	this.view.addItem(item);
	item.on(MenuItem.Click, this.onMenuItemClick, this);

};

Menu.prototype.onMenuItemClick = function(menuItem) {

	this.currentMenuItem.setSelected(false);
	this.currentMenuItem = menuItem;
	this.currentMenuItem.setSelected(true);

	this.trigger(Menu.ItemClicked, menuItem);
};


module.exports = Menu;

},{"../utils/EventDispatcher":34,"../views/MenuItem":45}],16:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var Editor = require("./Editor");
var PositionItem = require("../views/PositionItem");

function PositionsEditor(basePath, session, view) {
	Editor.call(this, basePath, session, view);
};
ClassUtils.extends(PositionsEditor, Editor);
EventDispatcher.init(PositionsEditor);

PositionsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var positions = this.resources.getResourceObject().positions;

	//console.log("positions: ", positions);

	for(var key in positions) {
		//console.log("create PositionItem: ", key, positions[key]);
		var item = new PositionItem(key, positions[key]);
		this.view.addItem(item);
		item.on(PositionItem.Changed, this.onChanged, this);
	}
};

PositionsEditor.prototype.onChanged = function(item) {
	this.resources.getResourceObject().positions[item.id][0] = item.getValues()[0]
	this.resources.getResourceObject().positions[item.id][1] = item.getValues()[1];
	this.save();
};

module.exports = PositionsEditor;
},{"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"../views/PositionItem":47,"./Editor":11}],17:[function(require,module,exports){
var ResourceItemController = require("./ResourceItemController");
var ResourceItemView = require("../views/ResourceItemView");
var xnodec = require("xnodecollection");

/**
 * Control a resource category.
 * @method ResourceTabController
 */
function ResourceCategoryController(categoryView) {
	this.categoryView = categoryView;

	this.categoryView.on("titleClick", this.onCategoryViewTitleClick, this);

	this.itemManager = new xnodec.CollectionViewManager();
	this.itemManager.setTarget(this.categoryView.getItemHolder());
	this.itemManager.setItemRendererClass(ResourceItemView);
	this.itemManager.setItemControllerClass(ResourceItemController);
}

/**
 * Set data.
 * @method setData
 */
ResourceCategoryController.prototype.setData = function(categoryModel) {
	if (this.categoryModel) {
		this.itemManager.setDataSource(null);

		this.categoryModel.off("change", this.onCategoryModelChange, this);
	}

	this.categoryModel = categoryModel;

	if (this.categoryModel) {
		this.itemManager.setDataSource(this.categoryModel.getItemCollection());

		this.categoryModel.on("change", this.onCategoryModelChange, this);
		this.categoryView.setActive(categoryModel.isActive());
		this.categoryView.setLabel(categoryModel.getLabel());
		this.categoryView.setDescription(this.categoryModel.getDescription());
	}
}

/**
 * Handle change in the model.
 * @method onCategoryModelChange
 */
ResourceCategoryController.prototype.onCategoryModelChange = function() {
	this.categoryView.setActive(this.categoryModel.isActive());
	this.categoryView.setDescription(this.categoryModel.getDescription());
}

/**
 * Title click. Toggle the active state.
 * @method onCategoryViewTitleClick
 */
ResourceCategoryController.prototype.onCategoryViewTitleClick = function() {
	this.categoryModel.setActive(!this.categoryModel.isActive());
}

module.exports = ResourceCategoryController;
},{"../views/ResourceItemView":51,"./ResourceItemController":18,"xnodecollection":7}],18:[function(require,module,exports){
/**
 * Control a resource item.
 * @class ResourceItemController
 */
function ResourceItemController(itemView) {
	this.itemView = itemView;
}

/**
 * Set item model to serve as data.
 * @method setData
 */
ResourceItemController.prototype.setData = function(itemModel) {
	this.itemModel = itemModel;

	if (this.itemModel) {
		this.itemView.setKey(this.itemModel.getKey());
		this.itemView.setDefaultValue(this.itemModel.getDefaultValue());
		this.itemView.setValue(this.itemModel.getValue());

		this.itemView.setItemType(this.itemModel.getItemType());
	}
}

module.exports = ResourceItemController;
},{}],19:[function(require,module,exports){
var ResourceCategoryController = require("./ResourceCategoryController");
var ResourceCategoryView = require("../views/ResourceCategoryView");
var ResourceItemController = require("./ResourceItemController");
var ResourceItemView = require("../views/ResourceItemView");
var xnodec = require("xnodecollection");

/**
 * Control one resource tab.
 * @method ResourceTabController
 */
function ResourceTabController(tabView) {
	this.tabView = tabView;

	this.categoryManager = new xnodec.CollectionViewManager();
	this.categoryManager.setTarget(this.tabView.getCategoryHolder());
	this.categoryManager.setItemRendererClass(ResourceCategoryView);
	this.categoryManager.setItemControllerClass(ResourceCategoryController);

	this.itemManager = new xnodec.CollectionViewManager();
	this.itemManager.setTarget(this.tabView.getItemHolder());
	this.itemManager.setItemRendererClass(ResourceItemView);
	this.itemManager.setItemControllerClass(ResourceItemController);
}

/**
 * Set data.
 * @method setData
 */
ResourceTabController.prototype.setData = function(categoryModel) {
	if (this.categoryModel) {
		this.categoryModel.off("change", this.onCategoryModelChange, this);
		this.categoryManager.setDataSource(null);
		this.itemManager.setDataSource(null);
	}

	this.categoryModel = categoryModel;

	if (this.categoryModel) {
		this.categoryModel.on("change", this.onCategoryModelChange, this);
		this.tabView.setActive(categoryModel.isActive());
		this.tabView.setDescription(categoryModel.getDescription());

		this.categoryManager.setDataSource(categoryModel.getCategoryCollection());
		this.itemManager.setDataSource(categoryModel.getItemCollection());
	}
}

/**
 * Handle change in the model.
 * @method onCategoryModelChange
 */
ResourceTabController.prototype.onCategoryModelChange = function() {
	this.tabView.setActive(this.categoryModel.isActive());
	this.tabView.setDescription(this.categoryModel.getDescription());
}

module.exports = ResourceTabController;
},{"../views/ResourceCategoryView":48,"../views/ResourceItemView":51,"./ResourceCategoryController":17,"./ResourceItemController":18,"xnodecollection":7}],20:[function(require,module,exports){
/**
 * Control the header field of the tabls in the resource pane.
 * @method ResourceTabController
 */
function ResourceTabHeaderController(tabHeaderView) {
	this.tabHeaderView = tabHeaderView;
	this.tabHeaderView.addEventListener("click", this.onTabHeaderViewClick.bind(this));
}

/**
 * Set data.
 * @method setData
 */
ResourceTabHeaderController.prototype.setData = function(categoryModel) {
	if (this.categoryModel) {
		this.categoryModel.off("change", this.onCategoryModelChange, this);
	}

	this.categoryModel = categoryModel;

	if (this.categoryModel) {
		this.categoryModel.on("change", this.onCategoryModelChange, this);
		this.tabHeaderView.setLabel(categoryModel.getLabel());
		this.tabHeaderView.setActive(categoryModel.isActive());
	}
}

/**
 * The tab was clicked, set this tab as the active one.
 * @method onTabHeaderViewClick
 */
ResourceTabHeaderController.prototype.onTabHeaderViewClick = function() {
	this.categoryModel.setActive(true);
}

/**
 * The model changed.
 * @method onCategoryModelChange
 */
ResourceTabHeaderController.prototype.onCategoryModelChange = function() {
	this.tabHeaderView.setActive(this.categoryModel.isActive());
}

module.exports = ResourceTabHeaderController;
},{}],21:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var Editor = require("./Editor");
var StringItem = require("../views/StringItem");

function StringsEditor(basePath, session, view) {
	Editor.call(this, basePath, session, view);
};
ClassUtils.extends(StringsEditor, Editor);

StringsEditor.prototype.init = function(resources) {
	Editor.prototype.init.call(this);
	this.resources = resources;

	var strings = this.resources.getResourceObject().strings;

	for(var key in strings) {
		var item = new StringItem(key, strings[key]);
		this.view.addItem(item);
		item.on(StringItem.Changed, this.onChanged, this);
	}
};

StringsEditor.prototype.onChanged = function(item) {
	this.resources.strings[item.id] = item.getValue();
};

module.exports = StringsEditor;
},{"../utils/ClassUtils":32,"../views/StringItem":58,"./Editor":11}],22:[function(require,module,exports){
var EventDispatcher = require("../utils/EventDispatcher");
var Menu = require("../controllers/Menu");
var MenuItem = require("../views/MenuItem");
var MenuView = require("../views/MenuView");
var IFrameView = require("../views/IFrameView");
var Testcase = require("../models/Testcase");

function TargetController(view) {
	this.view = view;

	this.menuView = new MenuView();
	this.view.setMenuView(this.menuView);

	var items = [];
	this.testcases = new Array();

	this.menuView.setItems(items);

	this.menu = new Menu(this.menuView, items);
	this.menu.on(Menu.ItemClicked, this.onChangeView, this);

	this.iframeView = new IFrameView();
	this.view.setTargetView(this.iframeView);
	this.iframeView.y = this.menuView.height;
	this.iframeView.width = 500;
	this.iframeView.height = 500;
};
TargetController.prototype.constructor = TargetController;
EventDispatcher.init(TargetController);


TargetController.prototype.init = function() {
	
	this.iframeView.init();
};


TargetController.prototype.addTestcase = function(id, name, url) {
	this.testcases.push(new Testcase(id, name, url));
	this.menu.addItem(new MenuItem(id, name));
};


TargetController.prototype.reload = function() {
	this.iframeView.reload();
};


TargetController.prototype.onChangeView = function(item) {
	for(var i = 0; i < this.testcases.length; i++) {
		if(this.testcases[i].id == item.id) {
			this.targetURL = this.testcases[i].url;
			this.iframeView.setUrl(this.targetURL);
			return;
		}
	}
};

module.exports = TargetController;
},{"../controllers/Menu":15,"../models/Testcase":30,"../utils/EventDispatcher":34,"../views/IFrameView":40,"../views/MenuItem":45,"../views/MenuView":46}],23:[function(require,module,exports){
/**
 * Control the header field of the tabls in the resource pane.
 * @method ResourceTabController
 */
function TargetTabHeaderController(tabHeaderView) {
	this.tabHeaderView = tabHeaderView;
	this.tabHeaderView.addEventListener("click", this.onTabHeaderViewClick.bind(this));
}

/**
 * Set data.
 * @method setData
 */
TargetTabHeaderController.prototype.setData = function(testcase) {
	if (this.testcase) {
		this.testcase.off("change", this.onTestcaseChange, this);
	}

	this.testcase = testcase;

	if (this.testcase) {
		this.testcase.on("change", this.onTestcaseChange, this);
		this.tabHeaderView.setLabel(testcase.getLabel());
		this.tabHeaderView.setActive(testcase.isActive());
	}
}

/**
 * The tab was clicked, set this tab as the active one.
 * @method onTabHeaderViewClick
 */
TargetTabHeaderController.prototype.onTabHeaderViewClick = function() {
	this.testcase.setActive(true);
}

/**
 * The model changed.
 * @method onTestcaseChange
 */
TargetTabHeaderController.prototype.onTestcaseChange = function() {
	this.tabHeaderView.setActive(this.testcase.isActive());
}

module.exports = TargetTabHeaderController;
},{}],24:[function(require,module,exports){
FiddleClient = require("./app/FiddleClient");
Resources = require("../../lib/Resources");
},{"../../lib/Resources":64,"./app/FiddleClient":9}],25:[function(require,module,exports){
var FiddleClientModel = require("./FiddleClientModel");
var EventDispatcher = require("yaed");
var inherits = require("inherits");
var xnodec = require("xnodecollection");

/**
 * Get category model.
 * @class CategoryModel
 */
function CategoryModel(label) {
	this.label = label;
	this.parentModel = null;
	this.active = false;
	this.categoryCollection = new xnodec.Collection();
	this.itemCollection = new xnodec.Collection();
	this.description = "";
}

inherits(CategoryModel, EventDispatcher);

/**
 * Set reference to parent model.
 * @method getParentModel
 */
CategoryModel.prototype.setParentModel = function(value) {
	this.parentModel = value;
}

/**
 * Get label.
 * @method getLabel
 */
CategoryModel.prototype.getLabel = function() {
	return this.label;
}

/**
 * Get description.
 * @method getLabel
 */
CategoryModel.prototype.getDescription = function() {
	return this.description;
}

/**
 * Set description.
 * @method getLabel
 */
CategoryModel.prototype.setDescription = function(description) {
	this.description = description;

	this.trigger("change");
}

/**
 * Get reference to app model.
 * @method getAppModel
 */
CategoryModel.prototype.getAppModel = function() {
	if (!this.parentModel)
		throw new Error("there is no parent!");

	var p = this.parentModel;

	while (p && !(p instanceof FiddleClientModel))
		p = p.parentModel;

	return p;
}

/**
 * Set active state.
 * @method setActive
 */
CategoryModel.prototype.setActive = function(value) {
	if (value == this.active)
		return;

	var siblings = this.parentModel.getCategoryCollection();

	for (var i = 0; i < siblings.getLength(); i++)
		if (siblings.getItemAt(i) != this)
			siblings.getItemAt(i).setActive(false);

	this.active = value;
	this.trigger("change");
}

/**
 * Is this category the active one?
 * @method isActive
 */
CategoryModel.prototype.isActive = function() {
	return this.active;
}

/**
 * Get category collection for sub categories.
 * @method getCategoryCollection
 */
CategoryModel.prototype.getCategoryCollection = function() {
	return this.categoryCollection;
}

/**
 * Get item collection.
 * @method getItemCollection
 */
CategoryModel.prototype.getItemCollection = function() {
	return this.itemCollection;
}

/**
 * Add sub category model.
 * @method addCategoryModel
 */
CategoryModel.prototype.addCategoryModel = function(categoryModel) {
	categoryModel.setParentModel(this);
	this.categoryCollection.addItem(categoryModel);

	return categoryModel;
}

/**
 * Create and add a category model.
 * @method createCategory
 */
CategoryModel.prototype.createCategory = function(title) {
	var categoryModel = new CategoryModel(title);

	return this.addCategoryModel(categoryModel);
}

/**
 * Add resource item model.
 * @method addResourceItemModel
 */
CategoryModel.prototype.addResourceItemModel = function(resourceItemModel) {
	this.itemCollection.addItem(resourceItemModel);
}

module.exports = CategoryModel;
},{"./FiddleClientModel":27,"inherits":1,"xnodecollection":7,"yaed":8}],26:[function(require,module,exports){
var ColorUtil = require("../utils/ColorUtil");

/**
 * ColorItemModel
 * @class ColorItemModel
 */
function ColorItemModel(key, defaultValue, value) {
	this.key = key;

	this.setDefaultValue(defaultValue);
	this.setValue(value);
}

/**
 * Get key.
 * @method getKey
 */
ColorItemModel.prototype.getKey = function() {
	return this.key;
}

/**
 * Get default value.
 * @method getDefaultValue
 */
ColorItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Set default value.
 * @method getDefaultValue
 */
ColorItemModel.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = ColorItemModel.processValue(defaultValue);
}

/**
 * Get customized value.
 * @method getValue
 */
ColorItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
ColorItemModel.prototype.setValue = function(value) {
	this.value = ColorItemModel.processValue(value);
}

/**
 * Get item type.
 * @method getItemType
 */
ColorItemModel.prototype.getItemType = function() {
	return "color"
}

/**
 * @static
 * @private
 */
ColorItemModel.processValue = function(v) {
	if (!v)
		return null;

	if (typeof v == "number")
		return ColorUtil.hexToHTML(v);

	return v;
}

module.exports = ColorItemModel;
},{"../utils/ColorUtil":33}],27:[function(require,module,exports){
var xnode = require("xnode");
var xnodec = require("xnodecollection");
var Testcase = require("./Testcase");
var CategoryModel = require("./CategoryModel");
var ImageItemModel = require("./ImageItemModel");
var ResourceItemModel = require("./ResourceItemModel");
var ColorItemModel = require("./ColorItemModel");

/**
 * Main model for the app.
 * @class FiddleClientModel
 */
function FiddleClientModel() {
	this.session = null;
	this.testcaseCollection = new xnodec.Collection();
	this.categoryCollection = new xnodec.Collection();
}

/**
 * Set session.
 * @method setSession
 */
FiddleClientModel.prototype.setSession = function(session) {
	this.session = session;
}

/**
 * Init from a resources object.
 * @method initWithResources
 */
FiddleClientModel.prototype.initWithResources = function(resources) {
	this.graphicsCategory = this.createCategory("Graphics");
	this.positionsCategory = this.createCategory("Positions");
	this.colorsCategory = this.createCategory("Colors");

	var resourceObject = resources.getResourceObject();

	for (var key in resourceObject.graphics) {
		if (key != "textures") {
			var imageItem = new ImageItemModel(key);
			this.graphicsCategory.addResourceItemModel(imageItem);
		}
	}

	for (var key in resourceObject.positions) {
		var item = resourceObject.positions[key];
		var positionItem = new ResourceItemModel("position", key);

		if (item)
			positionItem.setDefaultValue(item[0] + ", " + item[1]);

		this.positionsCategory.addResourceItemModel(positionItem);
	}

	for (var key in resourceObject.colors) {
		var item = resourceObject.colors[key];
		var colorItem = new ColorItemModel(key);

		if (item)
			colorItem.setDefaultValue(item);

		this.colorsCategory.addResourceItemModel(colorItem);
	}
}

/**
 * Add testcase.
 * @method addTestcase
 */
FiddleClientModel.prototype.addTestcase = function(id, name, url) {
	var testcase = new Testcase(id, name, url);
	testcase.setFiddleClientModel(this);
	this.testcaseCollection.addItem(testcase);

	if (this.testcaseCollection.getLength() == 1)
		testcase.setActive(true);
}

/**
 * Get testcase collection
 * @method getTestcaseCollection
 */
FiddleClientModel.prototype.getTestcaseCollection = function() {
	return this.testcaseCollection;
}

/**
 * Get category collection.
 * @method getCategoryCollection
 */
FiddleClientModel.prototype.getCategoryCollection = function() {
	return this.categoryCollection;
}

/**
 * Add category model.
 * @method addCategoryModel
 */
FiddleClientModel.prototype.addCategoryModel = function(categoryModel) {
	categoryModel.setParentModel(this);
	this.categoryCollection.addItem(categoryModel);

	if (this.categoryCollection.getLength() == 1)
		categoryModel.setActive(true);

	return categoryModel;
}

/**
 * Create and add a category model.
 * @method createCategory
 */
FiddleClientModel.prototype.createCategory = function(title) {
	var categoryModel = new CategoryModel(title);

	return this.addCategoryModel(categoryModel);
}

module.exports = FiddleClientModel;
},{"./CategoryModel":25,"./ColorItemModel":26,"./ImageItemModel":28,"./ResourceItemModel":29,"./Testcase":30,"xnode":3,"xnodecollection":7}],28:[function(require,module,exports){
/**
 * ImageItemModel
 * @class ImageItemModel
 */
function ImageItemModel(key) {
	this.key = key;

	this.defaultValue = null;
	this.value = null;
}

/**
 * Get key.
 * @method getKey
 */
ImageItemModel.prototype.getKey = function() {
	return this.key;
}

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
}

/**
 * Get item type.
 * @method getItemType
 */
ImageItemModel.prototype.getItemType = function() {
	return "image";
}

module.exports = ImageItemModel;
},{}],29:[function(require,module,exports){
/**
 * ResourceItemModel
 * @class ResourceItemModel
 */
function ResourceItemModel(type, key, defaultValue, value) {
	this.key = key;

	if (!defaultValue)
		defaultValue="";

	if (!value)
		value="";

	this.defaultValue = defaultValue;
	this.value = value;

	this.itemType = type;

	if (!this.itemType)
		this.itemType = "position";
}

/**
 * Get key.
 * @method getKey
 */
ResourceItemModel.prototype.getKey = function() {
	return this.key;
}

/**
 * Get default value.
 * @method getDefaultValue
 */
ResourceItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Set default value.
 * @method getDefaultValue
 */
ResourceItemModel.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}

/**
 * Get customized value.
 * @method getValue
 */
ResourceItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
ResourceItemModel.prototype.setValue = function(value) {
	this.value = value;
}

/**
 * Get item type.
 * @method getItemType
 */
ResourceItemModel.prototype.getItemType = function() {
	return this.itemType;
}

module.exports = ResourceItemModel;
},{}],30:[function(require,module,exports){
var EventDispatcher = require("yaed");
var inherits = require("inherits");

/**
 * Testcase
 */
function Testcase(id, name, url) {
	this.id = id;
	this.name = name;
	this.url = url;

	this.active = false;
	this.fiddleClientModel = null;
};

inherits(Testcase, EventDispatcher);

/**
 * Set reference to app.
 * @method setFiddleClientModel
 */
Testcase.prototype.setFiddleClientModel = function(value) {
	this.fiddleClientModel = value;
}

/**
 * Set active state.
 * @method setActive
 */
Testcase.prototype.setActive = function(value) {
	if (value == this.active)
		return;

	var siblings = this.fiddleClientModel.getTestcaseCollection();

	for (var i = 0; i < siblings.getLength(); i++)
		if (siblings.getItemAt(i) != this)
			siblings.getItemAt(i).setActive(false);

	this.active = value;
	this.trigger("change");
}

/**
 * Is this category the active one?
 * @method isActive
 */
Testcase.prototype.isActive = function() {
	return this.active;
}

/**
 * Get label.
 * @method getLabel
 */
Testcase.prototype.getLabel = function() {
	return this.name;
}

module.exports = Testcase;
},{"inherits":1,"yaed":8}],31:[function(require,module,exports){
var EventDispatcher = require("./EventDispatcher");

function APIConnection(basePath, session) {
	this.url = basePath;
	this.basePath = basePath;
	this.session = session;
};
EventDispatcher.init(APIConnection);

APIConnection.prototype.load = function(route, paramObject) {
	var xmlhttp = null;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = this.onReadyStateChange.bind(this, xmlhttp);

	var url = this.url + route;//"getImages";
	var params = "";
	var first = true;
	for(var o in paramObject) {
		if(!first) {
			params += "&";
		}
		else {
			first = false;
		}
		params += o + "=" + paramObject[o];
	}

	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
};

APIConnection.prototype.upload = function(route, paramObject) {
	var xmlhttp = null;
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else { // code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = this.onReadyStateChange.bind(this, xmlhttp);

	var url = this.url + route;//"getImages";
	
	xmlhttp.open("POST", url, true);
	//xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(paramObject);
};

APIConnection.prototype.onReadyStateChange = function(xmlhttp) {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200 || window.location.href.indexOf("http") == -1) {
			var json = JSON.parse(xmlhttp.response);
			this.trigger("loaded", {connection: this, json: json});
		}
		else{
			console.log("An error has occured making the request")
		}
	}
};


module.exports = APIConnection;
},{"./EventDispatcher":34}],32:[function(require,module,exports){
function ClassUtils() {
	
};

ClassUtils.extends = function(object, inherits_from) {
	object.prototype = Object.create(inherits_from.prototype);
	object.prototype.constructor = object;
};


module.exports = ClassUtils;
},{}],33:[function(require,module,exports){
/**
 * Color utilities.
 * @class ColorUtil
 */
function ColorUtil() {}

/**
 * Parse html color.
 * @method parseHTMLColor
 */
ColorUtil.parseHTMLColor = function(htmlColor) {
	if (htmlColor === undefined || htmlColor === null)
		htmlColor = "";

	var s = htmlColor.toString().trim().replace("#", "");
	var c = {
		red: parseInt(s[0] + s[1], 16),
		green: parseInt(s[2] + s[3], 16),
		blue: parseInt(s[4] + s[5], 16),
	}

	if (isNaN(c.red))
		c.red = 0;

	if (isNaN(c.green))
		c.green = 0;

	if (isNaN(c.blue))
		c.blue = 0;

	return c;
}

/**
 * Converts a hex color number to a html color.
 * @method hexToHTML
 */
ColorUtil.hexToHTML = function(hex) {
	var red = (hex >> 16 & 0xFF);
	var green = (hex >> 8 & 0xFF);
	var blue = (hex & 0xFF);

	return "#" +
		ColorUtil.prefixZero(red.toString(16), 2) +
		ColorUtil.prefixZero(green.toString(16), 2) +
		ColorUtil.prefixZero(blue.toString(16), 2);
};

/**
 * Prefix zero
 * @method prefixZero
 */
ColorUtil.prefixZero = function(s, n) {
	if (!n)
		n = 2;

	while (s.length < n)
		s = "0" + s;

	return s;
}

module.exports = ColorUtil;
},{}],34:[function(require,module,exports){
"use strict";

/**
 * AS3/jquery style event dispatcher. Slightly modified. The
 * jquery style on/off/trigger style of adding listeners is
 * currently the preferred one.
 * 
 * The on method for adding listeners takes an extra parameter which is the
 * scope in which listeners should be called. So this:
 *
 *     object.on("event", listener, this);
 *
 * Has the same function when adding events as:
 *
 *     object.on("event", listener.bind(this));
 *
 * However, the difference is that if we use the second method it
 * will not be possible to remove the listeners later, unless
 * the closure created by bind is stored somewhere. If the 
 * first method is used, we can remove the listener with:
 *
 *     object.off("event", listener, this);
 *
 * @class EventDispatcher
 */
function EventDispatcher() {
	this.listenerMap = {};
}

/**
 * Add event listener.
 * @method addEventListener
 * @deprecated
 */
EventDispatcher.prototype.addEventListener = function(eventType, listener, scope) {
	if (!this.listenerMap)
		this.listenerMap = {};

	if (!eventType)
		throw new Error("Event type required for event dispatcher");

	if (!listener)
		throw new Error("Listener required for event dispatcher");

	this.removeEventListener(eventType, listener, scope);

	if (!this.listenerMap.hasOwnProperty(eventType))
		this.listenerMap[eventType] = [];

	this.listenerMap[eventType].push({
		listener: listener,
		scope: scope
	});
}

/**
 * Remove event listener.
 * @method removeEventListener
 * @deprecated
 */
EventDispatcher.prototype.removeEventListener = function(eventType, listener, scope) {
	if (!this.listenerMap)
		this.listenerMap = {};

	if (!this.listenerMap.hasOwnProperty(eventType))
		return;

	var listeners = this.listenerMap[eventType];

	for (var i = 0; i < listeners.length; i++) {
		var listenerObj = listeners[i];

		if (listener == listenerObj.listener && scope == listenerObj.scope) {
			listeners.splice(i, 1);
			i--;
		}
	}

	if (!listeners.length)
		delete this.listenerMap[eventType];
}

/**
 * Dispatch event.
 * @method dispatchEvent
 */
EventDispatcher.prototype.dispatchEvent = function(event, data) {
	if (!this.listenerMap)
		this.listenerMap = {};

	if (typeof event == "string") {
		event = {
			type: event
		};
	}

	if (!this.listenerMap.hasOwnProperty(event.type))
		return;

	if (data == undefined)
		data = event;

	for (var i in this.listenerMap[event.type]) {
		var listenerObj = this.listenerMap[event.type][i];

		listenerObj.listener.call(listenerObj.scope, data);
	}
}

/**
 * Jquery style alias for addEventListener
 * @method on
 */
EventDispatcher.prototype.on = EventDispatcher.prototype.addEventListener;

/**
 * Jquery style alias for removeEventListener
 * @method off
 */
EventDispatcher.prototype.off = EventDispatcher.prototype.removeEventListener;

/**
 * Jquery style alias for dispatchEvent
 * @method trigger
 */
EventDispatcher.prototype.trigger = EventDispatcher.prototype.dispatchEvent;

/**
 * Make something an event dispatcher. Can be used for multiple inheritance.
 * @method init
 * @static
 */
EventDispatcher.init = function(cls) {
	cls.prototype.addEventListener = EventDispatcher.prototype.addEventListener;
	cls.prototype.removeEventListener = EventDispatcher.prototype.removeEventListener;
	cls.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
	cls.prototype.on = EventDispatcher.prototype.on;
	cls.prototype.off = EventDispatcher.prototype.off;
	cls.prototype.trigger = EventDispatcher.prototype.trigger;
}

module.exports = EventDispatcher;
},{}],35:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var InputView = require("./InputView");
var View = require("./View");

function ColorItem(id, value) {
	ListItem.call(this, id);

	this.id = id;

	this.colorView = new View(View.Div, "color-view");
	this.addChild(this.colorView);
	this.colorView.width = 100;
	this.colorView.height = 100;
	this.colorView.background = value ? value : "#000000";

	this.colorView.y = this.header.height;

	this.input = new InputView();
	this.addChild(this.input);

	this.input.setValue(value ? value : "#000000");

	this.input.x = this.colorView.width;
	this.input.y = this.colorView.y + (this.colorView.height - this.input.height)*0.5;

	this.input.addEventListener(InputView.Changed, this.onChanged, this);
};
ClassUtils.extends(ColorItem, ListItem);
EventDispatcher.init(ColorItem);


ColorItem.Changed = "Changed";

ColorItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);
	
	this.colorView.width = width * 0.5;
	this.colorView.height = height - this.header.height;

	this.input.updateLayout(width * 0.5, height - this.header.height);

	this.input.x = width * 0.5;
	this.input.y = this.header.height;
	
	this.colorView.y = this.header.height;
};

ColorItem.prototype.onChanged = function() {
	this.colorView.background = this.input.getValue();
	this.trigger(ColorItem.Changed, this);
};

ColorItem.prototype.getValue = function() {
	return this.input.getValue();
};

module.exports = ColorItem;
},{"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"./InputView":43,"./ListItem":44,"./View":63}],36:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function EditorControllerView() {
	View.call(this, View.Div, "EditorControllerView");

	this.menuView = null;
	this.editors = new Array();
};
ClassUtils.extends(EditorControllerView, View);

EditorControllerView.prototype.setMenuView = function(menuView) {
	this.menuView = menuView;
	this.addChild(this.menuView);
};

EditorControllerView.prototype.addEditor = function(editor) {
	this.editors.push(editor);
	this.addChild(editor);
};

EditorControllerView.prototype.updateLayout = function(width, height) {

	this.menuView.updateLayout(width, this.menuView.height);

	for(var i = 0; i < this.editors.length; i++) {
		this.editors[i].x = 0;
		this.editors[i].y = this.menuView.height;
		if(this.editors[i].isVisible()) {
			this.editors[i].updateLayout(width, height - this.menuView.height);
		}
	}
	this.width = width;
	this.height = height;
};

module.exports = EditorControllerView;

},{"../utils/ClassUtils":32,"./View":63}],37:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function EditorView() {
	View.call(this, View.Div, "EditorView");

	this.items = new Array();

	this.hide();
};
ClassUtils.extends(EditorView, View);

EditorView.prototype.addItem = function(item) {
	this.items.push(item);
	this.addChild(item);
};

EditorView.prototype.updateLayout = function(width, height) {
	var y = 0;
	for(var i = 0; i < this.items.length; i++) {
		this.items[i].y = y;
		this.items[i].updateLayout(width, 130);
		y += 130;
	}
	this.width = width;
	this.height = height;
};

module.exports = EditorView;

},{"../utils/ClassUtils":32,"./View":63}],38:[function(require,module,exports){
var xnode = require("xnode");
var inherits = require("inherits");
var TargetPaneView = require("./TargetPaneView");
var HeaderView = require("./HeaderView");
var ResourcePaneView = require("./ResourcePaneView");

/**
 * Main client view.
 * @class FiddleClientView
 */
function FiddleClientView() {
	xnode.Div.call(this);

	this.targetPaneView = new TargetPaneView();
	this.appendChild(this.targetPaneView);

	this.headerView = new HeaderView();
	this.appendChild(this.headerView);

	this.resourcePaneView = new ResourcePaneView();
	this.appendChild(this.resourcePaneView);
}

inherits(FiddleClientView, xnode.Div);

/**
 * Get target pane view.
 * @method getTargetPaneView
 */
FiddleClientView.prototype.getTargetPaneView = function() {
	return this.targetPaneView;
}

/**
 * Get header view.
 * @method getHeaderView
 */
FiddleClientView.prototype.getHeaderView = function() {
	return this.haderView;
}

/**
 * Get resource pane view.
 * @method getResourcePaneView
 */
FiddleClientView.prototype.getResourcePaneView = function() {
	return this.resourcePaneView;
}

module.exports = FiddleClientView;
},{"./HeaderView":39,"./ResourcePaneView":52,"./TargetPaneView":60,"inherits":1,"xnode":3}],39:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");

/**
 * Header view.
 * @class HeaderView
 */
function HeaderView() {
	xnode.Div.call(this);

	this.style.position = "absolute";
	this.style.top = "0";
	this.style.left = "0";
	this.style.right = "0";
	this.style.height = "50px";
	this.style.background = "#e8e8e8";
	this.style.borderBottom = "1px solid #e0e0e0"
	this.style.padding = "10px";

	this.header = new xnode.H1();
	this.header.className = "ui header";
	this.appendChild(this.header);

	this.header.innerHTML = "Resource Fiddle";
}

inherits(HeaderView, xnode.Div);

module.exports = HeaderView;
},{"inherits":1,"xnode":3}],40:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function IFrameView() {
	View.call(this, View.IFrame, "IFrameView");

	this.getElement().style.width = "100%";
	this.getElement().style.height = "100%";
	this.url = "";
};
ClassUtils.extends(IFrameView, View);

IFrameView.prototype.init = function() {
};

IFrameView.prototype.setUrl = function(targetURL) {
	this.url = targetURL;
	this.reload();
};


IFrameView.prototype.reload = function() {
	this.getElement().setAttribute("src", this.url + "&____timestamp="+Date.now());
};

IFrameView.prototype.updateLayout = function(width, height) {
	
	this.width = width;
	this.height = height;
};

module.exports = IFrameView;
},{"../utils/ClassUtils":32,"./View":63}],41:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var SelectButton = require("./SelectButton");
var ImageView = require("./ImageView");
var Resources = require("../../../lib/Resources");

function ImageItem(basePath, name, texture) {
	ListItem.call(this, name);

	this.name = name;

	this.image = new ImageView(basePath, texture);
	this.addChild(this.image);

	this.image.y = this.header.height;

	this.button = new SelectButton("Upload new image");
	this.addChild(this.button);

	this.button.on(SelectButton.Change, this.onFilesSelected, this);
	
};
ClassUtils.extends(ImageItem, ListItem);
EventDispatcher.init(ImageItem);

ImageItem.Selected = "Selected";

ImageItem.prototype.setTexture = function(texture) {
	this.image.setTexture(texture);
};

ImageItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);

	this.image.updateLayout(width * 0.5, height - this.header.height);
	this.image.y = this.header.height;
	
	this.button.y = this.header.height + ((height - this.header.height) - this.button.height)*0.5;
	this.button.x = width * 0.5;
};


ImageItem.prototype.onFilesSelected = function(files) {
	this.files = files;
	
	this.trigger(ImageItem.Selected, this);
};

ImageItem.prototype.getValues = function() {
	return this.files;
};


module.exports = ImageItem;
},{"../../../lib/Resources":64,"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"./ImageView":42,"./ListItem":44,"./SelectButton":57}],42:[function(require,module,exports){
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
},{"../utils/ClassUtils":32,"./View":63}],43:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var View = require("./View");

function InputView() {
	View.call(this, View.Input, "InputView");

	this.getElement().setAttribute("type", "text");

	this.getElement().addEventListener("blur", this.onBlur.bind(this));
};
ClassUtils.extends(InputView, View);
EventDispatcher.init(InputView);

InputView.Changed = "Changed";

InputView.prototype.getValue = function() {
	return this.getElement().value;
};

InputView.prototype.setValue = function(value) {
	this.getElement().value = value;
};

InputView.prototype.onBlur = function() {
	this.trigger(InputView.Changed, this);
};

InputView.prototype.updateLayout = function(width, height) {
	this.width = width;
	this.height = height;
};

module.exports = InputView;
},{"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"./View":63}],44:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");
var Text = require("./Text");

function ListItem(name) {
	View.call(this, View.Div, "ListItem");

	this.header = new View();
	this.addChild(this.header);
	this.header.background = "#AAAAAA";


	this.headerText = new Text(name);
	this.header.addChild(this.headerText);

	//this.text.width = 400;


};
ClassUtils.extends(ListItem, View);



ListItem.prototype.updateLayout = function(width, height) {
	this.headerText.width = width;
	this.headerText.height = 30;
	this.header.width = width;
	this.header.height = 30;
	this.width = width;
	this.height = height;
};

module.exports = ListItem;
},{"../utils/ClassUtils":32,"./Text":62,"./View":63}],45:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var View = require("./View");
var Text = require("./Text");

function MenuItem(id, string) {
	View.call(this, View.Div, "MenuItem");
	this.getElement().addEventListener("click", this.onClick.bind(this));

	this.id = id;
	this.string = string;
	this.text = new Text(this.string);

	this.addChild(this.text);

	this.setSelected(false);
};
ClassUtils.extends(MenuItem, View);
EventDispatcher.init(MenuItem);

MenuItem.Click = "Click";

MenuItem.prototype.onClick = function(event) {
	this.trigger(MenuItem.Click, this);
};

MenuItem.prototype.setSelected = function(selected) {
	this.selected = selected;

	if(this.selected) {
		this.background = "#FF0000";
		this.text.color = "#0000FF"
	}
	else {
		this.background = "#000000";
		this.text.color = "#FFFFFF"
	}
};

MenuItem.prototype.updateLayout = function(width, height) {
	this.text.updateLayout(width, height);
};

module.exports = MenuItem;

},{"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"./Text":62,"./View":63}],46:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function MenuView() {
	View.call(this, View.Div, "MenuView");
	this.height = 100;
	this.items = [];
};
ClassUtils.extends(MenuView, View);

MenuView.prototype.setItems = function(items) {
	var x = 0;
	for(var i = 0; i < items.length; i++) {
		var item = items[i];
		this.addChild(item);
		item.x = x;
		x += item.width;
	}
	this.items = items;
};

MenuView.prototype.addItem = function(item) {
	var x = 0;
	for(var i = 0; i < this.items.length; i++) {
		this.items[i].x = x;
		x += this.items[i].width;
	}
	this.addChild(item);
	item.x = x;
	this.items.push(item);
};

MenuView.prototype.updateLayout = function(width, height) {
	var x = 0;
	for(var i = 0; i < this.items.length; i++) {
		var item = this.items[i];
		item.x = x;
		item.updateLayout(width / this.items.length, height);
		x += item.width;
	}
};

module.exports = MenuView;
},{"../utils/ClassUtils":32,"./View":63}],47:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var InputView = require("./InputView");
var Text = require("./Text");

function PositionItem(id, values) {
	ListItem.call(this, id);

	this.id = id;


	this.textX = new Text("x:");
	this.addChild(this.textX)
	this.inputX = new InputView();
	this.addChild(this.inputX);
	this.inputX.setValue(values ? values[0] : "0");

	this.textY = new Text("y:");
	this.addChild(this.textY)
	this.inputY = new InputView();
	this.addChild(this.inputY);
	this.inputY.setValue(values ? values[1] : "0");

	this.inputX.addEventListener(InputView.Changed, this.onChanged, this);
	this.inputY.addEventListener(InputView.Changed, this.onChanged, this);
};
ClassUtils.extends(PositionItem, ListItem);
EventDispatcher.init(PositionItem);


PositionItem.Changed = "Changed";

PositionItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);
	this.textX.updateLayout(width*0.25, height - this.header.height);
	this.textY.updateLayout(width*0.25, height - this.header.height);
	this.inputX.updateLayout(width*0.25, height - this.header.height);
	this.inputY.updateLayout(width*0.25, height - this.header.height);

	this.textX.x = 0; 
	this.inputX.x = width*0.25;

	this.textY.x = width*0.5;
	this.inputY.x = width*0.75;

	this.textX.y = this.header.height;
	this.textY.y = this.header.height;
	this.inputX.y = this.header.height;
	this.inputY.y = this.header.height;
};

PositionItem.prototype.onChanged = function() {
	this.trigger(PositionItem.Changed, this);
};

PositionItem.prototype.getValues = function() {
	return [this.inputX.getValue(), this.inputY.getValue()];
};

module.exports = PositionItem;
},{"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"./InputView":43,"./ListItem":44,"./Text":62}],48:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var EventDispatcher = require("yaed");
var ResourceItemView = require("./ResourceItemView");

/**
 * The view of one resource category.
 * @class ResourceCategoryView
 */
function ResourceCategoryView() {
	xnode.Div.call(this);

	this.title = new xnode.Div();
	this.title.className = "title";
	this.appendChild(this.title);
	this.title.addEventListener("click", this.onTitleClick.bind(this));

	var icon = new xnode.Div();
	icon.className = "dropdown icon";
	this.title.appendChild(icon);

	this.titleSpan = new xnode.Span();
	this.title.appendChild(this.titleSpan);

	this.content = new xnode.Div();
	this.content.className = "content";
	this.appendChild(this.content);

	this.descriptionP = new xnode.P();
	this.content.appendChild(this.descriptionP);

	this.itemTable = new xnode.Table();
	this.itemTable.className = "ui table unstackable definition";
	this.content.appendChild(this.itemTable);

	this.itemTableBody = new xnode.Tbody();
	this.itemTable.appendChild(this.itemTableBody);
}

inherits(ResourceCategoryView, xnode.Div);
EventDispatcher.init(ResourceCategoryView);

/**
 * Set the label.
 * @method setLabel
 */
ResourceCategoryView.prototype.setLabel = function(label) {
	this.titleSpan.innerHTML = label;
}

/**
 * Should this be active or not?
 * @method setActive
 */
ResourceCategoryView.prototype.setActive = function(active) {
	if (active) {
		this.title.className = "active title";
		this.content.className = "active content";
	} else {
		this.title.className = "title";
		this.content.className = "content";
	}
}

/**
 * The description.
 * @method setDescription
 */
ResourceCategoryView.prototype.setDescription = function(description) {
	this.descriptionP.innerHTML = description;
}

/**
 * The title was clicked. Dispatch further.
 * @method onTitleClick
 */
ResourceCategoryView.prototype.onTitleClick = function() {
	this.trigger("titleClick");
}

/**
 * Get holder for the items.
 * @method getItemHolder
 */
ResourceCategoryView.prototype.getItemHolder = function() {
	return this.itemTableBody;
}

module.exports = ResourceCategoryView;
},{"./ResourceItemView":51,"inherits":1,"xnode":3,"yaed":8}],49:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var ColorUtil = require("../utils/ColorUtil");

/**
 * The value view for a color. This should have a color picker!
 * Candidates:
 *   - http://www.digitalmagicpro.com/jPicker/
 * @class ResourceColorValueView
 */
function ResourceColorValueView() {
	xnode.Div.call(this);

	this.defaultValueView = new xnode.Div();
	this.defaultValueView.style.position = "absolute";
	this.defaultValueView.style.height = "25px";
	this.defaultValueView.style.width = "70px";
	this.defaultValueView.style.top = "12px";
	this.defaultValueView.style.background = "#ff0000"
	this.defaultValueView.style.borderRadius = "5px";
	this.defaultValueView.style.padding = "3px";
	this.defaultValueView.style.textAlign = "center";
	this.defaultValueView.style.border = "1px solid #e0e0e0";

	this.appendChild(this.defaultValueView);

	this.valueInput = new xnode.Input();
	this.valueInput.style.position = "absolute";
	this.valueInput.style.left = "calc(50% - 10px)";
	this.valueInput.style.height = "25px";
	this.valueInput.style.width = "70px";
	this.valueInput.style.top = "12px";
	this.valueInput.style.background = "#ff0000"
	this.valueInput.style.borderRadius = "5px";
	this.valueInput.style.padding = "3px";
	this.valueInput.style.textAlign = "center";
	this.valueInput.style.border = "1px solid #e0e0e0";
	this.valueInput.style.outline = 0;

	this.valueInput.addEventListener("change", this.onValueInputChange.bind(this));

	this.appendChild(this.valueInput);
}

inherits(ResourceColorValueView, xnode.Div);

/**
 * Set color value for default.
 * @method setDefaultValue
 */
ResourceColorValueView.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
	this.defaultValueView.innerHTML = defaultValue;
	this.updateBackgroundColors();
}

/**
 * Set color value for current.
 * @method setValue
 */
ResourceColorValueView.prototype.setValue = function(value) {
	this.value = value;
	this.valueInput.value = value;
	this.updateBackgroundColors();
}

/**
 * Value input change.
 * @method onValueInputChange
 */
ResourceColorValueView.prototype.onValueInputChange = function(value) {
	this.value = this.valueInput.value;
	this.updateBackgroundColors();
}

/**
 * Update background colors.
 * @method updateBackgroundColors
 * @private
 */
ResourceColorValueView.prototype.updateBackgroundColors = function() {
	this.defaultValueView.style.background = this.defaultValue;

	var c = ColorUtil.parseHTMLColor(this.defaultValue);
	var avg = (c.red + c.green + c.blue) / 3;

	if (avg > 128)
		this.defaultValueView.style.color = "#000000";

	else
		this.defaultValueView.style.color = "#ffffff";

	var useValue = this.value;

	if (!useValue || useValue[0] != "#")
		useValue = "#ffffff"

	this.valueInput.style.background = useValue;

	var c = ColorUtil.parseHTMLColor(useValue);
	var avg = (c.red + c.green + c.blue) / 3;

	if (avg > 128)
		this.valueInput.style.color = "#000000";

	else
		this.valueInput.style.color = "#ffffff";
}

module.exports = ResourceColorValueView;
},{"../utils/ColorUtil":33,"inherits":1,"xnode":3}],50:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");

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

	this.uploadButton = new xnode.Div();
	this.uploadButton.className = "ui icon button mini";

	this.uploadIcon=new xnode.I();
	this.uploadIcon.className="upload icon";
	this.uploadButton.appendChild(this.uploadIcon);

	this.uploadDiv = new xnode.Div();
	this.uploadDiv.appendChild(this.uploadInput);
	this.uploadDiv.appendChild(this.uploadButton);
	this.uploadDiv.style.position = "absolute";
	this.uploadDiv.style.top = "13px";
	this.uploadDiv.style.right = "10px";
	this.uploadDiv.style.overflow="hidden";

	this.appendChild(this.uploadDiv);
}

inherits(ResourceImageValueView, xnode.Div);

/**
 * Set url of the image to be shown as default
 * @method setDefaultValue
 */
ResourceImageValueView.prototype.setDefaultValue = function(defaultValue) {
	this.defaultImage.src = defaultValue;
}

/**
 * Set url of image to appear as value.
 * @method setValue
 */
ResourceImageValueView.prototype.setValue = function(value) {
	this.valueImage.src = value;
}

module.exports = ResourceImageValueView;
},{"inherits":1,"xnode":3}],51:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var ResourcePositionValueView = require("./ResourcePositionValueView");
var ResourceImageValueView = require("./ResourceImageValueView");
var ResourceColorValueView = require("./ResourceColorValueView");

/**
 * Show a table row for each resource item.
 * @class ResourceItemView
 */
function ResourceItemView() {
	xnode.Tr.call(this);

	this.style.height = "50px";

	this.keyTd = new xnode.Td();
	this.keyTd.style.width = "50%";
	this.appendChild(this.keyTd);

	this.valueTd = new xnode.Td();
	this.valueTd.style.position = "relative";
	this.valueTd.style.width = "50%";
	this.appendChild(this.valueTd);

	this.valueView = null;
	this.itemType = null;
	this.value = null;
	this.defaultValue = null;
}

inherits(ResourceItemView, xnode.Tr);

/**
 * Set key. Will appear in the left column.
 */
ResourceItemView.prototype.setKey = function(value) {
	this.keyTd.innerHTML = value;
}

/**
 * Set abstract value to appear as default value.
 * @method setDefaultValue
 */
ResourceItemView.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;

	if (this.valueView)
		this.valueView.setDefaultValue(this.defaultValue);
}

/**
 * Set abstract value to appear in the value column.
 * @method setValue
 */
ResourceItemView.prototype.setValue = function(value) {
	this.value = value;

	if (this.valueView)
		this.valueView.setValue(this.value);
}

/**
 * Set the type of the item. This will create a value
 * view and populate the right side of the table.
 * @method setItemType
 */
ResourceItemView.prototype.setItemType = function(itemType) {
	if (itemType == this.itemType)
		return;

	if (this.valueView)
		this.valueTd.removeChild(this.valueView);

	this.valueView = null;
	this.itemType = itemType;

	switch (this.itemType) {
		case "position":
			this.valueView = new ResourcePositionValueView();
			break;

		case "image":
			this.valueView = new ResourceImageValueView();
			break;

		case "color":
			this.valueView = new ResourceColorValueView();
			break;
	}

	if (this.valueView) {
		this.valueTd.appendChild(this.valueView);
		this.valueView.setDefaultValue(this.defaultValue);
		this.valueView.setValue(this.value);
	}
}

module.exports = ResourceItemView;
},{"./ResourceColorValueView":49,"./ResourceImageValueView":50,"./ResourcePositionValueView":53,"inherits":1,"xnode":3}],52:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var xnodec = require("xnodecollection");

/**
 * The left part of the app, showing the resources.
 * @class ResourcePaneView
 */
function ResourcePaneView() {
	xnode.Div.call(this);

	this.style.position = "absolute";
	this.style.top = "60px";
	this.style.left = "10px";
	this.style.width = "calc(50% - 15px)";
	this.style.bottom = "10px";

	this.tabHeaders = new xnode.Div();
	this.tabHeaders.className = "ui top attached tabular menu";
	this.appendChild(this.tabHeaders);
}

inherits(ResourcePaneView, xnode.Div);

/**
 * Get holder for the tab headers.
 * @method getTabHeaderHolder
 */
ResourcePaneView.prototype.getTabHeaderHolder = function() {
	return this.tabHeaders;
}

/**
 * Get tab holder.
 * @method getTabHolder
 */
ResourcePaneView.prototype.getTabHolder = function() {
	return this;
}

module.exports = ResourcePaneView;
},{"inherits":1,"xnode":3,"xnodecollection":7}],53:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");

/**
 * The value view for a position.
 * @class ResourcePositionValueView
 */
function ResourcePositionValueView() {
	xnode.Div.call(this);

	this.defaultValueView = new xnode.Div();
	this.defaultValueView.style.position = "absolute";
	this.defaultValueView.style.width = "50%";
	this.defaultValueView.style.top = "15px";

	this.appendChild(this.defaultValueView);

	this.valueDiv = new xnode.Div();
	this.valueDiv.style.position = "absolute";
	this.valueDiv.style.right = "10px";
	this.valueDiv.style.top = "10px";
	this.valueDiv.style.width = "50%";

	this.valueDiv.className = "ui input fluid mini";
	this.appendChild(this.valueDiv);

	this.valueInput = new xnode.Input();
	this.valueInput.type = "text";
	this.valueDiv.appendChild(this.valueInput);
}

inherits(ResourcePositionValueView, xnode.Div);

/**
 * Set position value for default.
 * @method setDefaultValue
 */
ResourcePositionValueView.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValueView.innerHTML = defaultValue;
}

/**
 * Set position value for current.
 * @method setValue
 */
ResourcePositionValueView.prototype.setValue = function(value) {
	this.valueInput.value = value;
}

module.exports = ResourcePositionValueView;
},{"inherits":1,"xnode":3}],54:[function(require,module,exports){
var xnode = require("xnode");
var inherits = require("inherits");

/**
 * The tab header.
 * @class ResourceTabHeaderView
 */
function ResourceTabHeaderView() {
	xnode.A.call(this);
	this.className = "item";
}

inherits(ResourceTabHeaderView, xnode.A);

/**
 * Set label.
 * @class setLabel
 */
ResourceTabHeaderView.prototype.setLabel = function(label) {
	this.innerHTML = label;
}

/**
 * Set active state.
 * @class setActive
 */
ResourceTabHeaderView.prototype.setActive = function(active) {
	if (active)
		this.className = "active item";

	else
		this.className = "item";
}

module.exports = ResourceTabHeaderView;
},{"inherits":1,"xnode":3}],55:[function(require,module,exports){
var xnode = require("xnode");
var xnodec = require("xnodecollection");
var inherits = require("inherits");
var ResourceCategoryView = require("./ResourceCategoryView");

/**
 * The view for the content that goes into one tab.
 * @class ResourceTabView
 */
function ResourceTabView() {
	xnode.Div.call(this);
	this.className = "ui bottom attached active tab segment";

	this.inner = new xnode.Div();
	this.inner.style.position = "relative";
	this.inner.style.height = "calc(100% - 65px)";
	this.inner.style.padding = "1px";
	this.inner.style.overflowY = "scroll";
	this.appendChild(this.inner);

	this.descriptionP = new xnode.P();
	this.inner.appendChild(this.descriptionP);

	this.accordion = new xnode.Div();
	this.accordion.className = "ui styled fluid accordion";
	this.inner.appendChild(this.accordion);

	this.itemTable = new xnode.Table();
	this.itemTable.className = "ui table unstackable definition";
	this.inner.appendChild(this.itemTable);

	this.itemTableBody = new xnode.Tbody();
	this.itemTable.appendChild(this.itemTableBody);
}

inherits(ResourceTabView, xnode.Div);

/**
 * Should this be the active tab?
 * @method setActive
 */
ResourceTabView.prototype.setActive = function(active) {
	if (active) {
		this.style.display = "block";
		this.className = "ui bottom attached active tab segment active";
	} else {
		this.style.display = "none";
		this.className = "ui bottom attached active tab segment";
	}
}

/**
 * Set description.
 * @method setDescription
 */
ResourceTabView.prototype.setDescription = function(description) {
	this.descriptionP.innerHTML = description;
}

/**
 * Get div holding the categories.
 * @method getCategoryHolder
 */
ResourceTabView.prototype.getCategoryHolder = function() {
	return this.accordion;
}

/**
 * Get holder for the items.
 * @method getItemHolder
 */
ResourceTabView.prototype.getItemHolder = function() {
	return this.itemTableBody;
}

module.exports = ResourceTabView;
},{"./ResourceCategoryView":48,"inherits":1,"xnode":3,"xnodecollection":7}],56:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function RootView(domContainer) {
	View.call(this, View.div, "RootView");

	this.isRoot = true;
	
	domContainer.appendChild(this.getElement());
};
ClassUtils.extends(RootView, View);


module.exports = RootView;

},{"../utils/ClassUtils":32,"./View":63}],57:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var View = require("./View");

function SelectButton(text, filter) {
	View.call(this, View.Input, "SelectButton");
	this.getElement().setAttribute("type", "file");
	this.getElement().setAttribute("value", text);
	this.getElement().setAttribute("accept", "image/*");
	this.getElement().addEventListener("change", this.onChange.bind(this));
	this.width = 80;
	this.height = 30;
};
ClassUtils.extends(SelectButton, View);
EventDispatcher.init(SelectButton);

SelectButton.Change = "change";

SelectButton.prototype.onChange = function() {
	this.trigger(SelectButton.Change, this.getElement().files);
};


module.exports = SelectButton;

},{"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"./View":63}],58:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var EventDispatcher = require("../utils/EventDispatcher");
var ListItem = require("./ListItem");
var SelectButton = require("./SelectButton");
var ImageView = require("./ImageView");
var Text = require("./Text");
var InputView = require("./InputView");
var Resources = require("../../../lib/Resources");

function StringItem(id, value) {
	ListItem.call(this, id);


	this.name = name;

	this.text = new Text();
	this.input = new InputView();

	this.addChild(this.text);
	this.addChild(this.input);

	this.text.width = 100;
	this.input.width = 200;

	this.text.y = this.header.height;
	this.input.y = this.header.height;

	this.input.x = 100;



	this.button.on(SelectButton.Change, this.onFilesSelected, this);
	
};
ClassUtils.extends(StringItem, ListItem);
EventDispatcher.init(StringItem);

StringItem.Changed = "Changed";

StringItem.prototype.updateLayout = function(width, height) {
	ListItem.prototype.updateLayout.call(this, width, height);

	this.text.updateLayout(width*0.5, height - this.header.height);
	this.input.updateLayout(width*0.5, height - this.header.height);

	this.text.x = 0; 
	this.input.x = width*0.5;

	this.text.y = this.header.height;
	this.input.y = this.header.height;
};


StringItem.prototype.onChanged = function(files) {
	this.trigger(StringItem.Changed, this);
};


module.exports = StringItem;
},{"../../../lib/Resources":64,"../utils/ClassUtils":32,"../utils/EventDispatcher":34,"./ImageView":42,"./InputView":43,"./ListItem":44,"./SelectButton":57,"./Text":62}],59:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function TargetControllerView() {
	View.call(this, View.Div, "TargetControllerView");

	this.menuView = null;
	this.targetView = null;
};
ClassUtils.extends(TargetControllerView, View);

TargetControllerView.prototype.setMenuView = function(menuView) {
	this.menuView = menuView;
	this.addChild(this.menuView);
};

TargetControllerView.prototype.setTargetView = function(targetView) {
	this.targetView = targetView;
	this.addChild(targetView);
};

TargetControllerView.prototype.updateLayout = function(width, height) {

	this.menuView.updateLayout(width, this.menuView.height);

	this.targetView.x = 0;
	this.targetView.y = this.menuView.height;
	this.targetView.updateLayout(width, height - this.menuView.height);
};

module.exports = TargetControllerView;

},{"../utils/ClassUtils":32,"./View":63}],60:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var xnodec = require("xnodecollection");

/**
 * Target pane.
 * @class TargetPaneView
 */
function TargetPaneView() {
	xnode.Div.call(this);

	this.style.position = "absolute";
	this.style.top = "60px";
	this.style.right = "10px";
	this.style.width = "calc(50% - 15px)";
	this.style.bottom = "10px";

	this.tabHeaders = new xnode.Div();
	this.tabHeaders.className = "ui top attached tabular menu";
	this.appendChild(this.tabHeaders);

	this.inner = new xnode.Div();
	this.inner.className = "ui bottom attached active tab segment";
	this.inner.style.position = "relative";
	this.inner.style.height = "calc(100% - 35px)";
	this.inner.style.padding = "1px";
	this.inner.style.overflowY = "scroll";
	this.appendChild(this.inner);

}

inherits(TargetPaneView, xnode.Div);

/**
 * Get holder for the tab headers.
 * @method getTabHeaderHolder
 */
TargetPaneView.prototype.getTabHeaderHolder = function() {
	return this.tabHeaders;
}

module.exports = TargetPaneView;
},{"inherits":1,"xnode":3,"xnodecollection":7}],61:[function(require,module,exports){
var xnode = require("xnode");
var inherits = require("inherits");

/**
 * The tab header.
 * @class TargetTabHeaderView
 */
function TargetTabHeaderView() {
	xnode.A.call(this);
	this.className = "item";
}

inherits(TargetTabHeaderView, xnode.A);

/**
 * Set label.
 * @class setLabel
 */
TargetTabHeaderView.prototype.setLabel = function(label) {
	this.innerHTML = label;
}

/**
 * Set active state.
 * @class setActive
 */
TargetTabHeaderView.prototype.setActive = function(active) {
	if (active)
		this.className = "active item";

	else
		this.className = "item";
}

module.exports = TargetTabHeaderView;
},{"inherits":1,"xnode":3}],62:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function Text(text) {
	View.call(this, View.Span, "Text");

	this.getElement().innerHTML = text;
	this.getElement().style.textAlign = "center";
	
};
ClassUtils.extends(Text, View);


Text.prototype.updateLayout = function(width, height) {
	this.width = width;
	this.height = height;
};


module.exports = Text;

},{"../utils/ClassUtils":32,"./View":63}],63:[function(require,module,exports){
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
},{}],64:[function(require,module,exports){
var PIXI = require("pixi.js");
var EventDispatcher = require("../client/js/utils/EventDispatcher");



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

		//this.trigger(Resources.Loaded);
	}
};

Resources.prototype.onError = function(loader, loadIndex, noCache) {
	console.warn("Resources.prototype.onError");
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
		this.json = {};
		this.onLoaded();
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
},{"../client/js/utils/EventDispatcher":34,"pixi.js":2}]},{},[24])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9waXhpLmpzL2Jpbi9waXhpLmpzIiwibm9kZV9tb2R1bGVzL3hub2RlL3NyYy94bm9kZS5qcyIsIm5vZGVfbW9kdWxlcy94bm9kZWNvbGxlY3Rpb24vc3JjL0NvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMveG5vZGVjb2xsZWN0aW9uL3NyYy9Db2xsZWN0aW9uVmlldy5qcyIsIm5vZGVfbW9kdWxlcy94bm9kZWNvbGxlY3Rpb24vc3JjL0NvbGxlY3Rpb25WaWV3TWFuYWdlci5qcyIsIm5vZGVfbW9kdWxlcy94bm9kZWNvbGxlY3Rpb24vc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3lhZWQvc3JjL0V2ZW50RGlzcGF0Y2hlci5qcyIsInNyYy9jbGllbnQvanMvYXBwL0ZpZGRsZUNsaWVudC5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvQ29sb3JzRWRpdG9yLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9FZGl0b3IuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL0VkaXRvckNvbnRyb2xsZXIuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL0ZpZGRsZUNsaWVudENvbnRyb2xsZXIuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL0dyYXBoaWNzRWRpdG9yLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9NZW51LmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9Qb3NpdGlvbnNFZGl0b3IuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL1Jlc291cmNlQ2F0ZWdvcnlDb250cm9sbGVyLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9SZXNvdXJjZUl0ZW1Db250cm9sbGVyLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9SZXNvdXJjZVRhYkNvbnRyb2xsZXIuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL1Jlc291cmNlVGFiSGVhZGVyQ29udHJvbGxlci5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvU3RyaW5nc0VkaXRvci5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvVGFyZ2V0Q29udHJvbGxlci5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvVGFyZ2V0VGFiSGVhZGVyQ29udHJvbGxlci5qcyIsInNyYy9jbGllbnQvanMvZmlkZGxlY2xpZW50LmpzIiwic3JjL2NsaWVudC9qcy9tb2RlbHMvQ2F0ZWdvcnlNb2RlbC5qcyIsInNyYy9jbGllbnQvanMvbW9kZWxzL0NvbG9ySXRlbU1vZGVsLmpzIiwic3JjL2NsaWVudC9qcy9tb2RlbHMvRmlkZGxlQ2xpZW50TW9kZWwuanMiLCJzcmMvY2xpZW50L2pzL21vZGVscy9JbWFnZUl0ZW1Nb2RlbC5qcyIsInNyYy9jbGllbnQvanMvbW9kZWxzL1Jlc291cmNlSXRlbU1vZGVsLmpzIiwic3JjL2NsaWVudC9qcy9tb2RlbHMvVGVzdGNhc2UuanMiLCJzcmMvY2xpZW50L2pzL3V0aWxzL0FQSUNvbm5lY3Rpb24uanMiLCJzcmMvY2xpZW50L2pzL3V0aWxzL0NsYXNzVXRpbHMuanMiLCJzcmMvY2xpZW50L2pzL3V0aWxzL0NvbG9yVXRpbC5qcyIsInNyYy9jbGllbnQvanMvdXRpbHMvRXZlbnREaXNwYXRjaGVyLmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9Db2xvckl0ZW0uanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL0VkaXRvckNvbnRyb2xsZXJWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9FZGl0b3JWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9GaWRkbGVDbGllbnRWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9IZWFkZXJWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9JRnJhbWVWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9JbWFnZUl0ZW0uanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL0ltYWdlVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvSW5wdXRWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9MaXN0SXRlbS5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvTWVudUl0ZW0uanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL01lbnVWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9Qb3NpdGlvbkl0ZW0uanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL1Jlc291cmNlQ2F0ZWdvcnlWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZUNvbG9yVmFsdWVWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZUltYWdlVmFsdWVWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZUl0ZW1WaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZVBhbmVWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZVRhYkhlYWRlclZpZXcuanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL1Jlc291cmNlVGFiVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUm9vdFZpZXcuanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL1NlbGVjdEJ1dHRvbi5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvU3RyaW5nSXRlbS5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvVGFyZ2V0Q29udHJvbGxlclZpZXcuanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL1RhcmdldFBhbmVWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9UYXJnZXRUYWJIZWFkZXJWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9UZXh0LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9WaWV3LmpzIiwic3JjL2xpYi9SZXNvdXJjZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBwaXhpLmpzIC0gdjEuNi4wXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxNCwgTWF0IEdyb3Zlc1xuICogaHR0cDovL2dvb2Rib3lkaWdpdGFsLmNvbS9cbiAqXG4gKiBDb21waWxlZDogMjAxNC0wNy0xOFxuICpcbiAqIHBpeGkuanMgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuKGZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxiPWJ8fHt9O2IuV0VCR0xfUkVOREVSRVI9MCxiLkNBTlZBU19SRU5ERVJFUj0xLGIuVkVSU0lPTj1cInYxLjYuMVwiLGIuYmxlbmRNb2Rlcz17Tk9STUFMOjAsQUREOjEsTVVMVElQTFk6MixTQ1JFRU46MyxPVkVSTEFZOjQsREFSS0VOOjUsTElHSFRFTjo2LENPTE9SX0RPREdFOjcsQ09MT1JfQlVSTjo4LEhBUkRfTElHSFQ6OSxTT0ZUX0xJR0hUOjEwLERJRkZFUkVOQ0U6MTEsRVhDTFVTSU9OOjEyLEhVRToxMyxTQVRVUkFUSU9OOjE0LENPTE9SOjE1LExVTUlOT1NJVFk6MTZ9LGIuc2NhbGVNb2Rlcz17REVGQVVMVDowLExJTkVBUjowLE5FQVJFU1Q6MX0sYi5fVUlEPTAsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZsb2F0MzJBcnJheT8oYi5GbG9hdDMyQXJyYXk9RmxvYXQzMkFycmF5LGIuVWludDE2QXJyYXk9VWludDE2QXJyYXkpOihiLkZsb2F0MzJBcnJheT1BcnJheSxiLlVpbnQxNkFycmF5PUFycmF5KSxiLklOVEVSQUNUSU9OX0ZSRVFVRU5DWT0zMCxiLkFVVE9fUFJFVkVOVF9ERUZBVUxUPSEwLGIuUkFEX1RPX0RFRz0xODAvTWF0aC5QSSxiLkRFR19UT19SQUQ9TWF0aC5QSS8xODAsYi5kb250U2F5SGVsbG89ITEsYi5zYXlIZWxsbz1mdW5jdGlvbihhKXtpZighYi5kb250U2F5SGVsbG8pe2lmKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpPi0xKXt2YXIgYz1bXCIlYyAlYyAlYyBQaXhpLmpzIFwiK2IuVkVSU0lPTitcIiAtIFwiK2ErXCIgICVjICAlYyAgaHR0cDovL3d3dy5waXhpanMuY29tLyAgJWMgJWMg4pmlJWPimaUlY+KZpSBcIixcImJhY2tncm91bmQ6ICNmZjY2YTVcIixcImJhY2tncm91bmQ6ICNmZjY2YTVcIixcImNvbG9yOiAjZmY2NmE1OyBiYWNrZ3JvdW5kOiAjMDMwMzA3O1wiLFwiYmFja2dyb3VuZDogI2ZmNjZhNVwiLFwiYmFja2dyb3VuZDogI2ZmYzNkY1wiLFwiYmFja2dyb3VuZDogI2ZmNjZhNVwiLFwiY29sb3I6ICNmZjI0MjQ7IGJhY2tncm91bmQ6ICNmZmZcIixcImNvbG9yOiAjZmYyNDI0OyBiYWNrZ3JvdW5kOiAjZmZmXCIsXCJjb2xvcjogI2ZmMjQyNDsgYmFja2dyb3VuZDogI2ZmZlwiXTtjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLGMpfWVsc2Ugd2luZG93LmNvbnNvbGUmJmNvbnNvbGUubG9nKFwiUGl4aS5qcyBcIitiLlZFUlNJT04rXCIgLSBodHRwOi8vd3d3LnBpeGlqcy5jb20vXCIpO2IuZG9udFNheUhlbGxvPSEwfX0sYi5Qb2ludD1mdW5jdGlvbihhLGIpe3RoaXMueD1hfHwwLHRoaXMueT1ifHwwfSxiLlBvaW50LnByb3RvdHlwZS5jbG9uZT1mdW5jdGlvbigpe3JldHVybiBuZXcgYi5Qb2ludCh0aGlzLngsdGhpcy55KX0sYi5Qb2ludC5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKGEsYil7dGhpcy54PWF8fDAsdGhpcy55PWJ8fCgwIT09Yj90aGlzLng6MCl9LGIuUG9pbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuUG9pbnQsYi5SZWN0YW5nbGU9ZnVuY3Rpb24oYSxiLGMsZCl7dGhpcy54PWF8fDAsdGhpcy55PWJ8fDAsdGhpcy53aWR0aD1jfHwwLHRoaXMuaGVpZ2h0PWR8fDB9LGIuUmVjdGFuZ2xlLnByb3RvdHlwZS5jbG9uZT1mdW5jdGlvbigpe3JldHVybiBuZXcgYi5SZWN0YW5nbGUodGhpcy54LHRoaXMueSx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KX0sYi5SZWN0YW5nbGUucHJvdG90eXBlLmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7aWYodGhpcy53aWR0aDw9MHx8dGhpcy5oZWlnaHQ8PTApcmV0dXJuITE7dmFyIGM9dGhpcy54O2lmKGE+PWMmJmE8PWMrdGhpcy53aWR0aCl7dmFyIGQ9dGhpcy55O2lmKGI+PWQmJmI8PWQrdGhpcy5oZWlnaHQpcmV0dXJuITB9cmV0dXJuITF9LGIuUmVjdGFuZ2xlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlJlY3RhbmdsZSxiLkVtcHR5UmVjdGFuZ2xlPW5ldyBiLlJlY3RhbmdsZSgwLDAsMCwwKSxiLlBvbHlnb249ZnVuY3Rpb24oYSl7aWYoYSBpbnN0YW5jZW9mIEFycmF5fHwoYT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSxcIm51bWJlclwiPT10eXBlb2YgYVswXSl7Zm9yKHZhciBjPVtdLGQ9MCxlPWEubGVuZ3RoO2U+ZDtkKz0yKWMucHVzaChuZXcgYi5Qb2ludChhW2RdLGFbZCsxXSkpO2E9Y310aGlzLnBvaW50cz1hfSxiLlBvbHlnb24ucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7Zm9yKHZhciBhPVtdLGM9MDtjPHRoaXMucG9pbnRzLmxlbmd0aDtjKyspYS5wdXNoKHRoaXMucG9pbnRzW2NdLmNsb25lKCkpO3JldHVybiBuZXcgYi5Qb2x5Z29uKGEpfSxiLlBvbHlnb24ucHJvdG90eXBlLmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPSExLGQ9MCxlPXRoaXMucG9pbnRzLmxlbmd0aC0xO2Q8dGhpcy5wb2ludHMubGVuZ3RoO2U9ZCsrKXt2YXIgZj10aGlzLnBvaW50c1tkXS54LGc9dGhpcy5wb2ludHNbZF0ueSxoPXRoaXMucG9pbnRzW2VdLngsaT10aGlzLnBvaW50c1tlXS55LGo9Zz5iIT1pPmImJihoLWYpKihiLWcpLyhpLWcpK2Y+YTtqJiYoYz0hYyl9cmV0dXJuIGN9LGIuUG9seWdvbi5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5Qb2x5Z29uLGIuQ2lyY2xlPWZ1bmN0aW9uKGEsYixjKXt0aGlzLng9YXx8MCx0aGlzLnk9Ynx8MCx0aGlzLnJhZGl1cz1jfHwwfSxiLkNpcmNsZS5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGIuQ2lyY2xlKHRoaXMueCx0aGlzLnksdGhpcy5yYWRpdXMpfSxiLkNpcmNsZS5wcm90b3R5cGUuY29udGFpbnM9ZnVuY3Rpb24oYSxiKXtpZih0aGlzLnJhZGl1czw9MClyZXR1cm4hMTt2YXIgYz10aGlzLngtYSxkPXRoaXMueS1iLGU9dGhpcy5yYWRpdXMqdGhpcy5yYWRpdXM7cmV0dXJuIGMqPWMsZCo9ZCxlPj1jK2R9LGIuQ2lyY2xlLnByb3RvdHlwZS5nZXRCb3VuZHM9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGIuUmVjdGFuZ2xlKHRoaXMueC10aGlzLnJhZGl1cyx0aGlzLnktdGhpcy5yYWRpdXMsdGhpcy53aWR0aCx0aGlzLmhlaWdodCl9LGIuQ2lyY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkNpcmNsZSxiLkVsbGlwc2U9ZnVuY3Rpb24oYSxiLGMsZCl7dGhpcy54PWF8fDAsdGhpcy55PWJ8fDAsdGhpcy53aWR0aD1jfHwwLHRoaXMuaGVpZ2h0PWR8fDB9LGIuRWxsaXBzZS5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGIuRWxsaXBzZSh0aGlzLngsdGhpcy55LHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpfSxiLkVsbGlwc2UucHJvdG90eXBlLmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7aWYodGhpcy53aWR0aDw9MHx8dGhpcy5oZWlnaHQ8PTApcmV0dXJuITE7dmFyIGM9KGEtdGhpcy54KS90aGlzLndpZHRoLGQ9KGItdGhpcy55KS90aGlzLmhlaWdodDtyZXR1cm4gYyo9YyxkKj1kLDE+PWMrZH0sYi5FbGxpcHNlLnByb3RvdHlwZS5nZXRCb3VuZHM9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGIuUmVjdGFuZ2xlKHRoaXMueC10aGlzLndpZHRoLHRoaXMueS10aGlzLmhlaWdodCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KX0sYi5FbGxpcHNlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkVsbGlwc2UsYi5NYXRyaXg9ZnVuY3Rpb24oKXt0aGlzLmE9MSx0aGlzLmI9MCx0aGlzLmM9MCx0aGlzLmQ9MSx0aGlzLnR4PTAsdGhpcy50eT0wfSxiLk1hdHJpeC5wcm90b3R5cGUuZnJvbUFycmF5PWZ1bmN0aW9uKGEpe3RoaXMuYT1hWzBdLHRoaXMuYj1hWzFdLHRoaXMuYz1hWzNdLHRoaXMuZD1hWzRdLHRoaXMudHg9YVsyXSx0aGlzLnR5PWFbNV19LGIuTWF0cml4LnByb3RvdHlwZS50b0FycmF5PWZ1bmN0aW9uKGEpe3RoaXMuYXJyYXl8fCh0aGlzLmFycmF5PW5ldyBGbG9hdDMyQXJyYXkoOSkpO3ZhciBiPXRoaXMuYXJyYXk7cmV0dXJuIGE/KGJbMF09dGhpcy5hLGJbMV09dGhpcy5jLGJbMl09MCxiWzNdPXRoaXMuYixiWzRdPXRoaXMuZCxiWzVdPTAsYls2XT10aGlzLnR4LGJbN109dGhpcy50eSxiWzhdPTEpOihiWzBdPXRoaXMuYSxiWzFdPXRoaXMuYixiWzJdPXRoaXMudHgsYlszXT10aGlzLmMsYls0XT10aGlzLmQsYls1XT10aGlzLnR5LGJbNl09MCxiWzddPTAsYls4XT0xKSxifSxiLmlkZW50aXR5TWF0cml4PW5ldyBiLk1hdHJpeCxiLmRldGVybWluZU1hdHJpeEFycmF5VHlwZT1mdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBGbG9hdDMyQXJyYXk/RmxvYXQzMkFycmF5OkFycmF5fSxiLk1hdHJpeDI9Yi5kZXRlcm1pbmVNYXRyaXhBcnJheVR5cGUoKSxiLkRpc3BsYXlPYmplY3Q9ZnVuY3Rpb24oKXt0aGlzLnBvc2l0aW9uPW5ldyBiLlBvaW50LHRoaXMuc2NhbGU9bmV3IGIuUG9pbnQoMSwxKSx0aGlzLnBpdm90PW5ldyBiLlBvaW50KDAsMCksdGhpcy5yb3RhdGlvbj0wLHRoaXMuYWxwaGE9MSx0aGlzLnZpc2libGU9ITAsdGhpcy5oaXRBcmVhPW51bGwsdGhpcy5idXR0b25Nb2RlPSExLHRoaXMucmVuZGVyYWJsZT0hMSx0aGlzLnBhcmVudD1udWxsLHRoaXMuc3RhZ2U9bnVsbCx0aGlzLndvcmxkQWxwaGE9MSx0aGlzLl9pbnRlcmFjdGl2ZT0hMSx0aGlzLmRlZmF1bHRDdXJzb3I9XCJwb2ludGVyXCIsdGhpcy53b3JsZFRyYW5zZm9ybT1uZXcgYi5NYXRyaXgsdGhpcy5jb2xvcj1bXSx0aGlzLmR5bmFtaWM9ITAsdGhpcy5fc3I9MCx0aGlzLl9jcj0xLHRoaXMuZmlsdGVyQXJlYT1udWxsLHRoaXMuX2JvdW5kcz1uZXcgYi5SZWN0YW5nbGUoMCwwLDEsMSksdGhpcy5fY3VycmVudEJvdW5kcz1udWxsLHRoaXMuX21hc2s9bnVsbCx0aGlzLl9jYWNoZUFzQml0bWFwPSExLHRoaXMuX2NhY2hlSXNEaXJ0eT0hMX0sYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkRpc3BsYXlPYmplY3QsYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5zZXRJbnRlcmFjdGl2ZT1mdW5jdGlvbihhKXt0aGlzLmludGVyYWN0aXZlPWF9LE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLFwiaW50ZXJhY3RpdmVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2ludGVyYWN0aXZlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5faW50ZXJhY3RpdmU9YSx0aGlzLnN0YWdlJiYodGhpcy5zdGFnZS5kaXJ0eT0hMCl9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsXCJ3b3JsZFZpc2libGVcIix7Z2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcztkb3tpZighYS52aXNpYmxlKXJldHVybiExO2E9YS5wYXJlbnR9d2hpbGUoYSk7cmV0dXJuITB9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsXCJtYXNrXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9tYXNrfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5fbWFzayYmKHRoaXMuX21hc2suaXNNYXNrPSExKSx0aGlzLl9tYXNrPWEsdGhpcy5fbWFzayYmKHRoaXMuX21hc2suaXNNYXNrPSEwKX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSxcImZpbHRlcnNcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2ZpbHRlcnN9LHNldDpmdW5jdGlvbihhKXtpZihhKXtmb3IodmFyIGI9W10sYz0wO2M8YS5sZW5ndGg7YysrKWZvcih2YXIgZD1hW2NdLnBhc3NlcyxlPTA7ZTxkLmxlbmd0aDtlKyspYi5wdXNoKGRbZV0pO3RoaXMuX2ZpbHRlckJsb2NrPXt0YXJnZXQ6dGhpcyxmaWx0ZXJQYXNzZXM6Yn19dGhpcy5fZmlsdGVycz1hfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLFwiY2FjaGVBc0JpdG1hcFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fY2FjaGVBc0JpdG1hcH0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuX2NhY2hlQXNCaXRtYXAhPT1hJiYoYT90aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpOnRoaXMuX2Rlc3Ryb3lDYWNoZWRTcHJpdGUoKSx0aGlzLl9jYWNoZUFzQml0bWFwPWEpfX0pLGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtPWZ1bmN0aW9uKCl7dGhpcy5yb3RhdGlvbiE9PXRoaXMucm90YXRpb25DYWNoZSYmKHRoaXMucm90YXRpb25DYWNoZT10aGlzLnJvdGF0aW9uLHRoaXMuX3NyPU1hdGguc2luKHRoaXMucm90YXRpb24pLHRoaXMuX2NyPU1hdGguY29zKHRoaXMucm90YXRpb24pKTt2YXIgYT10aGlzLnBhcmVudC53b3JsZFRyYW5zZm9ybSxiPXRoaXMud29ybGRUcmFuc2Zvcm0sYz10aGlzLnBpdm90LngsZD10aGlzLnBpdm90LnksZT10aGlzLl9jcip0aGlzLnNjYWxlLngsZj0tdGhpcy5fc3IqdGhpcy5zY2FsZS55LGc9dGhpcy5fc3IqdGhpcy5zY2FsZS54LGg9dGhpcy5fY3IqdGhpcy5zY2FsZS55LGk9dGhpcy5wb3NpdGlvbi54LWUqYy1kKmYsaj10aGlzLnBvc2l0aW9uLnktaCpkLWMqZyxrPWEuYSxsPWEuYixtPWEuYyxuPWEuZDtiLmE9ayplK2wqZyxiLmI9aypmK2wqaCxiLnR4PWsqaStsKmorYS50eCxiLmM9bSplK24qZyxiLmQ9bSpmK24qaCxiLnR5PW0qaStuKmorYS50eSx0aGlzLndvcmxkQWxwaGE9dGhpcy5hbHBoYSp0aGlzLnBhcmVudC53b3JsZEFscGhhfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmdldEJvdW5kcz1mdW5jdGlvbihhKXtyZXR1cm4gYT1hLGIuRW1wdHlSZWN0YW5nbGV9LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuZ2V0TG9jYWxCb3VuZHM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXRCb3VuZHMoYi5pZGVudGl0eU1hdHJpeCl9LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuc2V0U3RhZ2VSZWZlcmVuY2U9ZnVuY3Rpb24oYSl7dGhpcy5zdGFnZT1hLHRoaXMuX2ludGVyYWN0aXZlJiYodGhpcy5zdGFnZS5kaXJ0eT0hMCl9LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuZ2VuZXJhdGVUZXh0dXJlPWZ1bmN0aW9uKGEpe3ZhciBjPXRoaXMuZ2V0TG9jYWxCb3VuZHMoKSxkPW5ldyBiLlJlbmRlclRleHR1cmUoMHxjLndpZHRoLDB8Yy5oZWlnaHQsYSk7cmV0dXJuIGQucmVuZGVyKHRoaXMsbmV3IGIuUG9pbnQoLWMueCwtYy55KSksZH0sYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS51cGRhdGVDYWNoZT1mdW5jdGlvbigpe3RoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCl9LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuX3JlbmRlckNhY2hlZFNwcml0ZT1mdW5jdGlvbihhKXt0aGlzLl9jYWNoZWRTcHJpdGUud29ybGRBbHBoYT10aGlzLndvcmxkQWxwaGEsYS5nbD9iLlNwcml0ZS5wcm90b3R5cGUuX3JlbmRlcldlYkdMLmNhbGwodGhpcy5fY2FjaGVkU3ByaXRlLGEpOmIuU3ByaXRlLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzLmNhbGwodGhpcy5fY2FjaGVkU3ByaXRlLGEpfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZT1mdW5jdGlvbigpe3RoaXMuX2NhY2hlQXNCaXRtYXA9ITE7dmFyIGE9dGhpcy5nZXRMb2NhbEJvdW5kcygpO2lmKHRoaXMuX2NhY2hlZFNwcml0ZSl0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5yZXNpemUoMHxhLndpZHRoLDB8YS5oZWlnaHQpO2Vsc2V7dmFyIGM9bmV3IGIuUmVuZGVyVGV4dHVyZSgwfGEud2lkdGgsMHxhLmhlaWdodCk7dGhpcy5fY2FjaGVkU3ByaXRlPW5ldyBiLlNwcml0ZShjKSx0aGlzLl9jYWNoZWRTcHJpdGUud29ybGRUcmFuc2Zvcm09dGhpcy53b3JsZFRyYW5zZm9ybX12YXIgZD10aGlzLl9maWx0ZXJzO3RoaXMuX2ZpbHRlcnM9bnVsbCx0aGlzLl9jYWNoZWRTcHJpdGUuZmlsdGVycz1kLHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLnJlbmRlcih0aGlzLG5ldyBiLlBvaW50KC1hLngsLWEueSkpLHRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueD0tKGEueC9hLndpZHRoKSx0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnk9LShhLnkvYS5oZWlnaHQpLHRoaXMuX2ZpbHRlcnM9ZCx0aGlzLl9jYWNoZUFzQml0bWFwPSEwfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLl9kZXN0cm95Q2FjaGVkU3ByaXRlPWZ1bmN0aW9uKCl7dGhpcy5fY2FjaGVkU3ByaXRlJiYodGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUuZGVzdHJveSghMCksdGhpcy5fY2FjaGVkU3ByaXRlPW51bGwpfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLl9yZW5kZXJXZWJHTD1mdW5jdGlvbihhKXthPWF9LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuX3JlbmRlckNhbnZhcz1mdW5jdGlvbihhKXthPWF9LE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLFwieFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wb3NpdGlvbi54fSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5wb3NpdGlvbi54PWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsXCJ5XCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBvc2l0aW9uLnl9LHNldDpmdW5jdGlvbihhKXt0aGlzLnBvc2l0aW9uLnk9YX19KSxiLkRpc3BsYXlPYmplY3RDb250YWluZXI9ZnVuY3Rpb24oKXtiLkRpc3BsYXlPYmplY3QuY2FsbCh0aGlzKSx0aGlzLmNoaWxkcmVuPVtdfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSksYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkRpc3BsYXlPYmplY3RDb250YWluZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUsXCJ3aWR0aFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY2FsZS54KnRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aH0sc2V0OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuZ2V0TG9jYWxCb3VuZHMoKS53aWR0aDt0aGlzLnNjYWxlLng9MCE9PWI/YS8oYi90aGlzLnNjYWxlLngpOjEsdGhpcy5fd2lkdGg9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSxcImhlaWdodFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY2FsZS55KnRoaXMuZ2V0TG9jYWxCb3VuZHMoKS5oZWlnaHR9LHNldDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLmdldExvY2FsQm91bmRzKCkuaGVpZ2h0O3RoaXMuc2NhbGUueT0wIT09Yj9hLyhiL3RoaXMuc2NhbGUueSk6MSx0aGlzLl9oZWlnaHQ9YX19KSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmFkZENoaWxkPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmFkZENoaWxkQXQoYSx0aGlzLmNoaWxkcmVuLmxlbmd0aCl9LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuYWRkQ2hpbGRBdD1mdW5jdGlvbihhLGIpe2lmKGI+PTAmJmI8PXRoaXMuY2hpbGRyZW4ubGVuZ3RoKXJldHVybiBhLnBhcmVudCYmYS5wYXJlbnQucmVtb3ZlQ2hpbGQoYSksYS5wYXJlbnQ9dGhpcyx0aGlzLmNoaWxkcmVuLnNwbGljZShiLDAsYSksdGhpcy5zdGFnZSYmYS5zZXRTdGFnZVJlZmVyZW5jZSh0aGlzLnN0YWdlKSxhO3Rocm93IG5ldyBFcnJvcihhK1wiIFRoZSBpbmRleCBcIitiK1wiIHN1cHBsaWVkIGlzIG91dCBvZiBib3VuZHMgXCIrdGhpcy5jaGlsZHJlbi5sZW5ndGgpfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnN3YXBDaGlsZHJlbj1mdW5jdGlvbihhLGIpe2lmKGEhPT1iKXt2YXIgYz10aGlzLmNoaWxkcmVuLmluZGV4T2YoYSksZD10aGlzLmNoaWxkcmVuLmluZGV4T2YoYik7aWYoMD5jfHwwPmQpdGhyb3cgbmV3IEVycm9yKFwic3dhcENoaWxkcmVuOiBCb3RoIHRoZSBzdXBwbGllZCBEaXNwbGF5T2JqZWN0cyBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlci5cIik7dGhpcy5jaGlsZHJlbltjXT1iLHRoaXMuY2hpbGRyZW5bZF09YX19LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2hpbGRBdD1mdW5jdGlvbihhKXtpZihhPj0wJiZhPHRoaXMuY2hpbGRyZW4ubGVuZ3RoKXJldHVybiB0aGlzLmNoaWxkcmVuW2FdO3Rocm93IG5ldyBFcnJvcihcIlN1cHBsaWVkIGluZGV4IGRvZXMgbm90IGV4aXN0IGluIHRoZSBjaGlsZCBsaXN0LCBvciB0aGUgc3VwcGxpZWQgRGlzcGxheU9iamVjdCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIGNhbGxlclwiKX0sYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5yZW1vdmVDaGlsZEF0KHRoaXMuY2hpbGRyZW4uaW5kZXhPZihhKSl9LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmdldENoaWxkQXQoYSk7cmV0dXJuIHRoaXMuc3RhZ2UmJmIucmVtb3ZlU3RhZ2VSZWZlcmVuY2UoKSxiLnBhcmVudD12b2lkIDAsdGhpcy5jaGlsZHJlbi5zcGxpY2UoYSwxKSxifSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkcmVuPWZ1bmN0aW9uKGEsYil7dmFyIGM9YXx8MCxkPVwibnVtYmVyXCI9PXR5cGVvZiBiP2I6dGhpcy5jaGlsZHJlbi5sZW5ndGgsZT1kLWM7aWYoZT4wJiZkPj1lKXtmb3IodmFyIGY9dGhpcy5jaGlsZHJlbi5zcGxpY2UoYyxlKSxnPTA7ZzxmLmxlbmd0aDtnKyspe3ZhciBoPWZbZ107dGhpcy5zdGFnZSYmaC5yZW1vdmVTdGFnZVJlZmVyZW5jZSgpLGgucGFyZW50PXZvaWQgMH1yZXR1cm4gZn10aHJvdyBuZXcgRXJyb3IoXCJSYW5nZSBFcnJvciwgbnVtZXJpYyB2YWx1ZXMgYXJlIG91dHNpZGUgdGhlIGFjY2VwdGFibGUgcmFuZ2VcIil9LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtPWZ1bmN0aW9uKCl7aWYodGhpcy52aXNpYmxlJiYoYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0uY2FsbCh0aGlzKSwhdGhpcy5fY2FjaGVBc0JpdG1hcCkpZm9yKHZhciBhPTAsYz10aGlzLmNoaWxkcmVuLmxlbmd0aDtjPmE7YSsrKXRoaXMuY2hpbGRyZW5bYV0udXBkYXRlVHJhbnNmb3JtKCl9LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Qm91bmRzPWZ1bmN0aW9uKGEpe2lmKDA9PT10aGlzLmNoaWxkcmVuLmxlbmd0aClyZXR1cm4gYi5FbXB0eVJlY3RhbmdsZTtpZihhKXt2YXIgYz10aGlzLndvcmxkVHJhbnNmb3JtO3RoaXMud29ybGRUcmFuc2Zvcm09YSx0aGlzLnVwZGF0ZVRyYW5zZm9ybSgpLHRoaXMud29ybGRUcmFuc2Zvcm09Y31mb3IodmFyIGQsZSxmLGc9MS8wLGg9MS8wLGk9LTEvMCxqPS0xLzAsaz0hMSxsPTAsbT10aGlzLmNoaWxkcmVuLmxlbmd0aDttPmw7bCsrKXt2YXIgbj10aGlzLmNoaWxkcmVuW2xdO24udmlzaWJsZSYmKGs9ITAsZD10aGlzLmNoaWxkcmVuW2xdLmdldEJvdW5kcyhhKSxnPWc8ZC54P2c6ZC54LGg9aDxkLnk/aDpkLnksZT1kLndpZHRoK2QueCxmPWQuaGVpZ2h0K2QueSxpPWk+ZT9pOmUsaj1qPmY/ajpmKX1pZighaylyZXR1cm4gYi5FbXB0eVJlY3RhbmdsZTt2YXIgbz10aGlzLl9ib3VuZHM7cmV0dXJuIG8ueD1nLG8ueT1oLG8ud2lkdGg9aS1nLG8uaGVpZ2h0PWotaCxvfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldExvY2FsQm91bmRzPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy53b3JsZFRyYW5zZm9ybTt0aGlzLndvcmxkVHJhbnNmb3JtPWIuaWRlbnRpdHlNYXRyaXg7Zm9yKHZhciBjPTAsZD10aGlzLmNoaWxkcmVuLmxlbmd0aDtkPmM7YysrKXRoaXMuY2hpbGRyZW5bY10udXBkYXRlVHJhbnNmb3JtKCk7dmFyIGU9dGhpcy5nZXRCb3VuZHMoKTtyZXR1cm4gdGhpcy53b3JsZFRyYW5zZm9ybT1hLGV9LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuc2V0U3RhZ2VSZWZlcmVuY2U9ZnVuY3Rpb24oYSl7dGhpcy5zdGFnZT1hLHRoaXMuX2ludGVyYWN0aXZlJiYodGhpcy5zdGFnZS5kaXJ0eT0hMCk7Zm9yKHZhciBiPTAsYz10aGlzLmNoaWxkcmVuLmxlbmd0aDtjPmI7YisrKXt2YXIgZD10aGlzLmNoaWxkcmVuW2JdO2Quc2V0U3RhZ2VSZWZlcmVuY2UoYSl9fSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnJlbW92ZVN0YWdlUmVmZXJlbmNlPWZ1bmN0aW9uKCl7Zm9yKHZhciBhPTAsYj10aGlzLmNoaWxkcmVuLmxlbmd0aDtiPmE7YSsrKXt2YXIgYz10aGlzLmNoaWxkcmVuW2FdO2MucmVtb3ZlU3RhZ2VSZWZlcmVuY2UoKX10aGlzLl9pbnRlcmFjdGl2ZSYmKHRoaXMuc3RhZ2UuZGlydHk9ITApLHRoaXMuc3RhZ2U9bnVsbH0sYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5fcmVuZGVyV2ViR0w9ZnVuY3Rpb24oYSl7aWYodGhpcy52aXNpYmxlJiYhKHRoaXMuYWxwaGE8PTApKXtpZih0aGlzLl9jYWNoZUFzQml0bWFwKXJldHVybiB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUoYSksdm9pZCAwO3ZhciBiLGM7aWYodGhpcy5fbWFza3x8dGhpcy5fZmlsdGVycyl7Zm9yKHRoaXMuX2ZpbHRlcnMmJihhLnNwcml0ZUJhdGNoLmZsdXNoKCksYS5maWx0ZXJNYW5hZ2VyLnB1c2hGaWx0ZXIodGhpcy5fZmlsdGVyQmxvY2spKSx0aGlzLl9tYXNrJiYoYS5zcHJpdGVCYXRjaC5zdG9wKCksYS5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLm1hc2ssYSksYS5zcHJpdGVCYXRjaC5zdGFydCgpKSxiPTAsYz10aGlzLmNoaWxkcmVuLmxlbmd0aDtjPmI7YisrKXRoaXMuY2hpbGRyZW5bYl0uX3JlbmRlcldlYkdMKGEpO2Euc3ByaXRlQmF0Y2guc3RvcCgpLHRoaXMuX21hc2smJmEubWFza01hbmFnZXIucG9wTWFzayh0aGlzLl9tYXNrLGEpLHRoaXMuX2ZpbHRlcnMmJmEuZmlsdGVyTWFuYWdlci5wb3BGaWx0ZXIoKSxhLnNwcml0ZUJhdGNoLnN0YXJ0KCl9ZWxzZSBmb3IoYj0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Yz5iO2IrKyl0aGlzLmNoaWxkcmVuW2JdLl9yZW5kZXJXZWJHTChhKX19LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuX3JlbmRlckNhbnZhcz1mdW5jdGlvbihhKXtpZih0aGlzLnZpc2libGUhPT0hMSYmMCE9PXRoaXMuYWxwaGEpe2lmKHRoaXMuX2NhY2hlQXNCaXRtYXApcmV0dXJuIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShhKSx2b2lkIDA7dGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLGEuY29udGV4dCk7Zm9yKHZhciBiPTAsYz10aGlzLmNoaWxkcmVuLmxlbmd0aDtjPmI7YisrKXt2YXIgZD10aGlzLmNoaWxkcmVuW2JdO2QuX3JlbmRlckNhbnZhcyhhKX10aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnBvcE1hc2soYS5jb250ZXh0KX19LGIuU3ByaXRlPWZ1bmN0aW9uKGEpe2IuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpLHRoaXMuYW5jaG9yPW5ldyBiLlBvaW50LHRoaXMudGV4dHVyZT1hLHRoaXMuX3dpZHRoPTAsdGhpcy5faGVpZ2h0PTAsdGhpcy50aW50PTE2Nzc3MjE1LHRoaXMuYmxlbmRNb2RlPWIuYmxlbmRNb2Rlcy5OT1JNQUwsYS5iYXNlVGV4dHVyZS5oYXNMb2FkZWQ/dGhpcy5vblRleHR1cmVVcGRhdGUoKToodGhpcy5vblRleHR1cmVVcGRhdGVCaW5kPXRoaXMub25UZXh0dXJlVXBkYXRlLmJpbmQodGhpcyksdGhpcy50ZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJ1cGRhdGVcIix0aGlzLm9uVGV4dHVyZVVwZGF0ZUJpbmQpKSx0aGlzLnJlbmRlcmFibGU9ITB9LGIuU3ByaXRlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpLGIuU3ByaXRlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlNwcml0ZSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5TcHJpdGUucHJvdG90eXBlLFwid2lkdGhcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2NhbGUueCp0aGlzLnRleHR1cmUuZnJhbWUud2lkdGh9LHNldDpmdW5jdGlvbihhKXt0aGlzLnNjYWxlLng9YS90aGlzLnRleHR1cmUuZnJhbWUud2lkdGgsdGhpcy5fd2lkdGg9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5TcHJpdGUucHJvdG90eXBlLFwiaGVpZ2h0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNjYWxlLnkqdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodH0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuc2NhbGUueT1hL3RoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQsdGhpcy5faGVpZ2h0PWF9fSksYi5TcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmU9ZnVuY3Rpb24oYSl7dGhpcy50ZXh0dXJlPWEsdGhpcy5jYWNoZWRUaW50PTE2Nzc3MjE1fSxiLlNwcml0ZS5wcm90b3R5cGUub25UZXh0dXJlVXBkYXRlPWZ1bmN0aW9uKCl7dGhpcy5fd2lkdGgmJih0aGlzLnNjYWxlLng9dGhpcy5fd2lkdGgvdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoKSx0aGlzLl9oZWlnaHQmJih0aGlzLnNjYWxlLnk9dGhpcy5faGVpZ2h0L3RoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQpfSxiLlNwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aCxjPXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQsZD1iKigxLXRoaXMuYW5jaG9yLngpLGU9YiotdGhpcy5hbmNob3IueCxmPWMqKDEtdGhpcy5hbmNob3IueSksZz1jKi10aGlzLmFuY2hvci55LGg9YXx8dGhpcy53b3JsZFRyYW5zZm9ybSxpPWguYSxqPWguYyxrPWguYixsPWguZCxtPWgudHgsbj1oLnR5LG89aSplK2sqZyttLHA9bCpnK2oqZStuLHE9aSpkK2sqZyttLHI9bCpnK2oqZCtuLHM9aSpkK2sqZittLHQ9bCpmK2oqZCtuLHU9aSplK2sqZittLHY9bCpmK2oqZStuLHc9LTEvMCx4PS0xLzAseT0xLzAsej0xLzA7eT15Pm8/bzp5LHk9eT5xP3E6eSx5PXk+cz9zOnkseT15PnU/dTp5LHo9ej5wP3A6eix6PXo+cj9yOnosej16PnQ/dDp6LHo9ej52P3Y6eix3PW8+dz9vOncsdz1xPnc/cTp3LHc9cz53P3M6dyx3PXU+dz91OncseD1wPng/cDp4LHg9cj54P3I6eCx4PXQ+eD90OngseD12Png/djp4O3ZhciBBPXRoaXMuX2JvdW5kcztyZXR1cm4gQS54PXksQS53aWR0aD13LXksQS55PXosQS5oZWlnaHQ9eC16LHRoaXMuX2N1cnJlbnRCb3VuZHM9QSxBfSxiLlNwcml0ZS5wcm90b3R5cGUuX3JlbmRlcldlYkdMPWZ1bmN0aW9uKGEpe2lmKHRoaXMudmlzaWJsZSYmISh0aGlzLmFscGhhPD0wKSl7dmFyIGIsYztpZih0aGlzLl9tYXNrfHx0aGlzLl9maWx0ZXJzKXt2YXIgZD1hLnNwcml0ZUJhdGNoO2Zvcih0aGlzLl9maWx0ZXJzJiYoZC5mbHVzaCgpLGEuZmlsdGVyTWFuYWdlci5wdXNoRmlsdGVyKHRoaXMuX2ZpbHRlckJsb2NrKSksdGhpcy5fbWFzayYmKGQuc3RvcCgpLGEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5tYXNrLGEpLGQuc3RhcnQoKSksZC5yZW5kZXIodGhpcyksYj0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Yz5iO2IrKyl0aGlzLmNoaWxkcmVuW2JdLl9yZW5kZXJXZWJHTChhKTtkLnN0b3AoKSx0aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnBvcE1hc2sodGhpcy5fbWFzayxhKSx0aGlzLl9maWx0ZXJzJiZhLmZpbHRlck1hbmFnZXIucG9wRmlsdGVyKCksZC5zdGFydCgpfWVsc2UgZm9yKGEuc3ByaXRlQmF0Y2gucmVuZGVyKHRoaXMpLGI9MCxjPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2M+YjtiKyspdGhpcy5jaGlsZHJlbltiXS5fcmVuZGVyV2ViR0woYSl9fSxiLlNwcml0ZS5wcm90b3R5cGUuX3JlbmRlckNhbnZhcz1mdW5jdGlvbihhKXtpZih0aGlzLnZpc2libGUhPT0hMSYmMCE9PXRoaXMuYWxwaGEpe2lmKHRoaXMuYmxlbmRNb2RlIT09YS5jdXJyZW50QmxlbmRNb2RlJiYoYS5jdXJyZW50QmxlbmRNb2RlPXRoaXMuYmxlbmRNb2RlLGEuY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249Yi5ibGVuZE1vZGVzQ2FudmFzW2EuY3VycmVudEJsZW5kTW9kZV0pLHRoaXMuX21hc2smJmEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzayxhLmNvbnRleHQpLHRoaXMudGV4dHVyZS52YWxpZCl7YS5jb250ZXh0Lmdsb2JhbEFscGhhPXRoaXMud29ybGRBbHBoYSxhLnJvdW5kUGl4ZWxzP2EuY29udGV4dC5zZXRUcmFuc2Zvcm0odGhpcy53b3JsZFRyYW5zZm9ybS5hLHRoaXMud29ybGRUcmFuc2Zvcm0uYyx0aGlzLndvcmxkVHJhbnNmb3JtLmIsdGhpcy53b3JsZFRyYW5zZm9ybS5kLDB8dGhpcy53b3JsZFRyYW5zZm9ybS50eCwwfHRoaXMud29ybGRUcmFuc2Zvcm0udHkpOmEuY29udGV4dC5zZXRUcmFuc2Zvcm0odGhpcy53b3JsZFRyYW5zZm9ybS5hLHRoaXMud29ybGRUcmFuc2Zvcm0uYyx0aGlzLndvcmxkVHJhbnNmb3JtLmIsdGhpcy53b3JsZFRyYW5zZm9ybS5kLHRoaXMud29ybGRUcmFuc2Zvcm0udHgsdGhpcy53b3JsZFRyYW5zZm9ybS50eSksYS5zbW9vdGhQcm9wZXJ0eSYmYS5zY2FsZU1vZGUhPT10aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuc2NhbGVNb2RlJiYoYS5zY2FsZU1vZGU9dGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLnNjYWxlTW9kZSxhLmNvbnRleHRbYS5zbW9vdGhQcm9wZXJ0eV09YS5zY2FsZU1vZGU9PT1iLnNjYWxlTW9kZXMuTElORUFSKTt2YXIgYz10aGlzLnRleHR1cmUudHJpbT90aGlzLnRleHR1cmUudHJpbS54LXRoaXMuYW5jaG9yLngqdGhpcy50ZXh0dXJlLnRyaW0ud2lkdGg6dGhpcy5hbmNob3IueCotdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoLGQ9dGhpcy50ZXh0dXJlLnRyaW0/dGhpcy50ZXh0dXJlLnRyaW0ueS10aGlzLmFuY2hvci55KnRoaXMudGV4dHVyZS50cmltLmhlaWdodDp0aGlzLmFuY2hvci55Ki10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0OzE2Nzc3MjE1IT09dGhpcy50aW50Pyh0aGlzLmNhY2hlZFRpbnQhPT10aGlzLnRpbnQmJih0aGlzLmNhY2hlZFRpbnQ9dGhpcy50aW50LHRoaXMudGludGVkVGV4dHVyZT1iLkNhbnZhc1RpbnRlci5nZXRUaW50ZWRUZXh0dXJlKHRoaXMsdGhpcy50aW50KSksYS5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLnRpbnRlZFRleHR1cmUsMCwwLHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxjLGQsdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0KSk6YS5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuc291cmNlLHRoaXMudGV4dHVyZS5jcm9wLngsdGhpcy50ZXh0dXJlLmNyb3AueSx0aGlzLnRleHR1cmUuY3JvcC53aWR0aCx0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsYyxkLHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCl9Zm9yKHZhciBlPTAsZj10aGlzLmNoaWxkcmVuLmxlbmd0aDtmPmU7ZSsrKXRoaXMuY2hpbGRyZW5bZV0uX3JlbmRlckNhbnZhcyhhKTt0aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnBvcE1hc2soYS5jb250ZXh0KX19LGIuU3ByaXRlLmZyb21GcmFtZT1mdW5jdGlvbihhKXt2YXIgYz1iLlRleHR1cmVDYWNoZVthXTtpZighYyl0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmcmFtZUlkIFwiJythKydcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGV4dHVyZSBjYWNoZScrdGhpcyk7cmV0dXJuIG5ldyBiLlNwcml0ZShjKX0sYi5TcHJpdGUuZnJvbUltYWdlPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1iLlRleHR1cmUuZnJvbUltYWdlKGEsYyxkKTtyZXR1cm4gbmV3IGIuU3ByaXRlKGUpfSxiLlNwcml0ZUJhdGNoPWZ1bmN0aW9uKGEpe2IuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpLHRoaXMudGV4dHVyZVRoaW5nPWEsdGhpcy5yZWFkeT0hMX0sYi5TcHJpdGVCYXRjaC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlKSxiLlNwcml0ZUJhdGNoLmNvbnN0cnVjdG9yPWIuU3ByaXRlQmF0Y2gsYi5TcHJpdGVCYXRjaC5wcm90b3R5cGUuaW5pdFdlYkdMPWZ1bmN0aW9uKGEpe3RoaXMuZmFzdFNwcml0ZUJhdGNoPW5ldyBiLldlYkdMRmFzdFNwcml0ZUJhdGNoKGEpLHRoaXMucmVhZHk9ITB9LGIuU3ByaXRlQmF0Y2gucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybT1mdW5jdGlvbigpe2IuRGlzcGxheU9iamVjdC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtLmNhbGwodGhpcyl9LGIuU3ByaXRlQmF0Y2gucHJvdG90eXBlLl9yZW5kZXJXZWJHTD1mdW5jdGlvbihhKXshdGhpcy52aXNpYmxlfHx0aGlzLmFscGhhPD0wfHwhdGhpcy5jaGlsZHJlbi5sZW5ndGh8fCh0aGlzLnJlYWR5fHx0aGlzLmluaXRXZWJHTChhLmdsKSxhLnNwcml0ZUJhdGNoLnN0b3AoKSxhLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKGEuc2hhZGVyTWFuYWdlci5mYXN0U2hhZGVyKSx0aGlzLmZhc3RTcHJpdGVCYXRjaC5iZWdpbih0aGlzLGEpLHRoaXMuZmFzdFNwcml0ZUJhdGNoLnJlbmRlcih0aGlzKSxhLnNwcml0ZUJhdGNoLnN0YXJ0KCkpfSxiLlNwcml0ZUJhdGNoLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzPWZ1bmN0aW9uKGEpe3ZhciBjPWEuY29udGV4dDtjLmdsb2JhbEFscGhhPXRoaXMud29ybGRBbHBoYSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybS5jYWxsKHRoaXMpO2Zvcih2YXIgZD10aGlzLndvcmxkVHJhbnNmb3JtLGU9ITAsZj0wO2Y8dGhpcy5jaGlsZHJlbi5sZW5ndGg7ZisrKXt2YXIgZz10aGlzLmNoaWxkcmVuW2ZdO2lmKGcudmlzaWJsZSl7dmFyIGg9Zy50ZXh0dXJlLGk9aC5mcmFtZTtpZihjLmdsb2JhbEFscGhhPXRoaXMud29ybGRBbHBoYSpnLmFscGhhLGcucm90YXRpb24lKDIqTWF0aC5QSSk9PT0wKWUmJihjLnNldFRyYW5zZm9ybShkLmEsZC5jLGQuYixkLmQsZC50eCxkLnR5KSxlPSExKSxjLmRyYXdJbWFnZShoLmJhc2VUZXh0dXJlLnNvdXJjZSxpLngsaS55LGkud2lkdGgsaS5oZWlnaHQsZy5hbmNob3IueCotaS53aWR0aCpnLnNjYWxlLngrZy5wb3NpdGlvbi54Ky41fDAsZy5hbmNob3IueSotaS5oZWlnaHQqZy5zY2FsZS55K2cucG9zaXRpb24ueSsuNXwwLGkud2lkdGgqZy5zY2FsZS54LGkuaGVpZ2h0Kmcuc2NhbGUueSk7ZWxzZXtlfHwoZT0hMCksYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0uY2FsbChnKTt2YXIgaj1nLndvcmxkVHJhbnNmb3JtO2Eucm91bmRQaXhlbHM/Yy5zZXRUcmFuc2Zvcm0oai5hLGouYyxqLmIsai5kLDB8ai50eCwwfGoudHkpOmMuc2V0VHJhbnNmb3JtKGouYSxqLmMsai5iLGouZCxqLnR4LGoudHkpLGMuZHJhd0ltYWdlKGguYmFzZVRleHR1cmUuc291cmNlLGkueCxpLnksaS53aWR0aCxpLmhlaWdodCxnLmFuY2hvci54Ki1pLndpZHRoKy41fDAsZy5hbmNob3IueSotaS5oZWlnaHQrLjV8MCxpLndpZHRoLGkuaGVpZ2h0KX19fX0sYi5Nb3ZpZUNsaXA9ZnVuY3Rpb24oYSl7Yi5TcHJpdGUuY2FsbCh0aGlzLGFbMF0pLHRoaXMudGV4dHVyZXM9YSx0aGlzLmFuaW1hdGlvblNwZWVkPTEsdGhpcy5sb29wPSEwLHRoaXMub25Db21wbGV0ZT1udWxsLHRoaXMuY3VycmVudEZyYW1lPTAsdGhpcy5wbGF5aW5nPSExfSxiLk1vdmllQ2xpcC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLlNwcml0ZS5wcm90b3R5cGUpLGIuTW92aWVDbGlwLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLk1vdmllQ2xpcCxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5Nb3ZpZUNsaXAucHJvdG90eXBlLFwidG90YWxGcmFtZXNcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGV4dHVyZXMubGVuZ3RofX0pLGIuTW92aWVDbGlwLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7dGhpcy5wbGF5aW5nPSExfSxiLk1vdmllQ2xpcC5wcm90b3R5cGUucGxheT1mdW5jdGlvbigpe3RoaXMucGxheWluZz0hMH0sYi5Nb3ZpZUNsaXAucHJvdG90eXBlLmdvdG9BbmRTdG9wPWZ1bmN0aW9uKGEpe3RoaXMucGxheWluZz0hMSx0aGlzLmN1cnJlbnRGcmFtZT1hO3ZhciBiPXRoaXMuY3VycmVudEZyYW1lKy41fDA7dGhpcy5zZXRUZXh0dXJlKHRoaXMudGV4dHVyZXNbYiV0aGlzLnRleHR1cmVzLmxlbmd0aF0pfSxiLk1vdmllQ2xpcC5wcm90b3R5cGUuZ290b0FuZFBsYXk9ZnVuY3Rpb24oYSl7dGhpcy5jdXJyZW50RnJhbWU9YSx0aGlzLnBsYXlpbmc9ITB9LGIuTW92aWVDbGlwLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm09ZnVuY3Rpb24oKXtpZihiLlNwcml0ZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtLmNhbGwodGhpcyksdGhpcy5wbGF5aW5nKXt0aGlzLmN1cnJlbnRGcmFtZSs9dGhpcy5hbmltYXRpb25TcGVlZDt2YXIgYT10aGlzLmN1cnJlbnRGcmFtZSsuNXwwO3RoaXMuY3VycmVudEZyYW1lPXRoaXMuY3VycmVudEZyYW1lJXRoaXMudGV4dHVyZXMubGVuZ3RoLHRoaXMubG9vcHx8YTx0aGlzLnRleHR1cmVzLmxlbmd0aD90aGlzLnNldFRleHR1cmUodGhpcy50ZXh0dXJlc1thJXRoaXMudGV4dHVyZXMubGVuZ3RoXSk6YT49dGhpcy50ZXh0dXJlcy5sZW5ndGgmJih0aGlzLmdvdG9BbmRTdG9wKHRoaXMudGV4dHVyZXMubGVuZ3RoLTEpLHRoaXMub25Db21wbGV0ZSYmdGhpcy5vbkNvbXBsZXRlKCkpfX0sYi5Nb3ZpZUNsaXAuZnJvbUZyYW1lcz1mdW5jdGlvbihhKXtmb3IodmFyIGM9W10sZD0wO2Q8YS5sZW5ndGg7ZCsrKWMucHVzaChuZXcgYi5UZXh0dXJlLmZyb21GcmFtZShhW2RdKSk7cmV0dXJuIG5ldyBiLk1vdmllQ2xpcChjKX0sYi5Nb3ZpZUNsaXAuZnJvbUltYWdlcz1mdW5jdGlvbihhKXtmb3IodmFyIGM9W10sZD0wO2Q8YS5sZW5ndGg7ZCsrKWMucHVzaChuZXcgYi5UZXh0dXJlLmZyb21JbWFnZShhW2RdKSk7cmV0dXJuIG5ldyBiLk1vdmllQ2xpcChjKX0sYi5GaWx0ZXJCbG9jaz1mdW5jdGlvbigpe3RoaXMudmlzaWJsZT0hMCx0aGlzLnJlbmRlcmFibGU9ITB9LGIuVGV4dD1mdW5jdGlvbihhLGMpe3RoaXMuY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksdGhpcy5jb250ZXh0PXRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxiLlNwcml0ZS5jYWxsKHRoaXMsYi5UZXh0dXJlLmZyb21DYW52YXModGhpcy5jYW52YXMpKSx0aGlzLnNldFRleHQoYSksdGhpcy5zZXRTdHlsZShjKX0sYi5UZXh0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuU3ByaXRlLnByb3RvdHlwZSksYi5UZXh0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlRleHQsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuVGV4dC5wcm90b3R5cGUsXCJ3aWR0aFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kaXJ0eSYmKHRoaXMudXBkYXRlVGV4dCgpLHRoaXMuZGlydHk9ITEpLHRoaXMuc2NhbGUueCp0aGlzLnRleHR1cmUuZnJhbWUud2lkdGh9LHNldDpmdW5jdGlvbihhKXt0aGlzLnNjYWxlLng9YS90aGlzLnRleHR1cmUuZnJhbWUud2lkdGgsdGhpcy5fd2lkdGg9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5UZXh0LnByb3RvdHlwZSxcImhlaWdodFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kaXJ0eSYmKHRoaXMudXBkYXRlVGV4dCgpLHRoaXMuZGlydHk9ITEpLHRoaXMuc2NhbGUueSp0aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0fSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5zY2FsZS55PWEvdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodCx0aGlzLl9oZWlnaHQ9YX19KSxiLlRleHQucHJvdG90eXBlLnNldFN0eWxlPWZ1bmN0aW9uKGEpe2E9YXx8e30sYS5mb250PWEuZm9udHx8XCJib2xkIDIwcHQgQXJpYWxcIixhLmZpbGw9YS5maWxsfHxcImJsYWNrXCIsYS5hbGlnbj1hLmFsaWdufHxcImxlZnRcIixhLnN0cm9rZT1hLnN0cm9rZXx8XCJibGFja1wiLGEuc3Ryb2tlVGhpY2tuZXNzPWEuc3Ryb2tlVGhpY2tuZXNzfHwwLGEud29yZFdyYXA9YS53b3JkV3JhcHx8ITEsYS53b3JkV3JhcFdpZHRoPWEud29yZFdyYXBXaWR0aHx8MTAwLGEud29yZFdyYXBXaWR0aD1hLndvcmRXcmFwV2lkdGh8fDEwMCxhLmRyb3BTaGFkb3c9YS5kcm9wU2hhZG93fHwhMSxhLmRyb3BTaGFkb3dBbmdsZT1hLmRyb3BTaGFkb3dBbmdsZXx8TWF0aC5QSS82LGEuZHJvcFNoYWRvd0Rpc3RhbmNlPWEuZHJvcFNoYWRvd0Rpc3RhbmNlfHw0LGEuZHJvcFNoYWRvd0NvbG9yPWEuZHJvcFNoYWRvd0NvbG9yfHxcImJsYWNrXCIsdGhpcy5zdHlsZT1hLHRoaXMuZGlydHk9ITB9LGIuVGV4dC5wcm90b3R5cGUuc2V0VGV4dD1mdW5jdGlvbihhKXt0aGlzLnRleHQ9YS50b1N0cmluZygpfHxcIiBcIix0aGlzLmRpcnR5PSEwfSxiLlRleHQucHJvdG90eXBlLnVwZGF0ZVRleHQ9ZnVuY3Rpb24oKXt0aGlzLmNvbnRleHQuZm9udD10aGlzLnN0eWxlLmZvbnQ7dmFyIGE9dGhpcy50ZXh0O3RoaXMuc3R5bGUud29yZFdyYXAmJihhPXRoaXMud29yZFdyYXAodGhpcy50ZXh0KSk7Zm9yKHZhciBiPWEuc3BsaXQoLyg/OlxcclxcbnxcXHJ8XFxuKS8pLGM9W10sZD0wLGU9MDtlPGIubGVuZ3RoO2UrKyl7dmFyIGY9dGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KGJbZV0pLndpZHRoO2NbZV09ZixkPU1hdGgubWF4KGQsZil9dmFyIGc9ZCt0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzczt0aGlzLnN0eWxlLmRyb3BTaGFkb3cmJihnKz10aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSksdGhpcy5jYW52YXMud2lkdGg9Zyt0aGlzLmNvbnRleHQubGluZVdpZHRoO3ZhciBoPXRoaXMuZGV0ZXJtaW5lRm9udEhlaWdodChcImZvbnQ6IFwiK3RoaXMuc3R5bGUuZm9udCtcIjtcIikrdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MsaT1oKmIubGVuZ3RoO3RoaXMuc3R5bGUuZHJvcFNoYWRvdyYmKGkrPXRoaXMuc3R5bGUuZHJvcFNoYWRvd0Rpc3RhbmNlKSx0aGlzLmNhbnZhcy5oZWlnaHQ9aSxuYXZpZ2F0b3IuaXNDb2Nvb25KUyYmdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsdGhpcy5jYW52YXMud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0KSx0aGlzLmNvbnRleHQuZm9udD10aGlzLnN0eWxlLmZvbnQsdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlPXRoaXMuc3R5bGUuc3Ryb2tlLHRoaXMuY29udGV4dC5saW5lV2lkdGg9dGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MsdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZT1cInRvcFwiO3ZhciBqLGs7aWYodGhpcy5zdHlsZS5kcm9wU2hhZG93KXt0aGlzLmNvbnRleHQuZmlsbFN0eWxlPXRoaXMuc3R5bGUuZHJvcFNoYWRvd0NvbG9yO3ZhciBsPU1hdGguc2luKHRoaXMuc3R5bGUuZHJvcFNoYWRvd0FuZ2xlKSp0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSxtPU1hdGguY29zKHRoaXMuc3R5bGUuZHJvcFNoYWRvd0FuZ2xlKSp0aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZTtmb3IoZT0wO2U8Yi5sZW5ndGg7ZSsrKWo9dGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MvMixrPXRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzLzIrZSpoLFwicmlnaHRcIj09PXRoaXMuc3R5bGUuYWxpZ24/ais9ZC1jW2VdOlwiY2VudGVyXCI9PT10aGlzLnN0eWxlLmFsaWduJiYoais9KGQtY1tlXSkvMiksdGhpcy5zdHlsZS5maWxsJiZ0aGlzLmNvbnRleHQuZmlsbFRleHQoYltlXSxqK2wsayttKX1mb3IodGhpcy5jb250ZXh0LmZpbGxTdHlsZT10aGlzLnN0eWxlLmZpbGwsZT0wO2U8Yi5sZW5ndGg7ZSsrKWo9dGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3MvMixrPXRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzLzIrZSpoLFwicmlnaHRcIj09PXRoaXMuc3R5bGUuYWxpZ24/ais9ZC1jW2VdOlwiY2VudGVyXCI9PT10aGlzLnN0eWxlLmFsaWduJiYoais9KGQtY1tlXSkvMiksdGhpcy5zdHlsZS5zdHJva2UmJnRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzJiZ0aGlzLmNvbnRleHQuc3Ryb2tlVGV4dChiW2VdLGosayksdGhpcy5zdHlsZS5maWxsJiZ0aGlzLmNvbnRleHQuZmlsbFRleHQoYltlXSxqLGspO3RoaXMudXBkYXRlVGV4dHVyZSgpfSxiLlRleHQucHJvdG90eXBlLnVwZGF0ZVRleHR1cmU9ZnVuY3Rpb24oKXt0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUud2lkdGg9dGhpcy5jYW52YXMud2lkdGgsdGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLmhlaWdodD10aGlzLmNhbnZhcy5oZWlnaHQsdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGg9dGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoPXRoaXMuY2FudmFzLndpZHRoLHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodD10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0PXRoaXMuY2FudmFzLmhlaWdodCx0aGlzLl93aWR0aD10aGlzLmNhbnZhcy53aWR0aCx0aGlzLl9oZWlnaHQ9dGhpcy5jYW52YXMuaGVpZ2h0LHRoaXMucmVxdWlyZXNVcGRhdGU9ITB9LGIuVGV4dC5wcm90b3R5cGUuX3JlbmRlcldlYkdMPWZ1bmN0aW9uKGEpe3RoaXMucmVxdWlyZXNVcGRhdGUmJih0aGlzLnJlcXVpcmVzVXBkYXRlPSExLGIudXBkYXRlV2ViR0xUZXh0dXJlKHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZSxhLmdsKSksYi5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJXZWJHTC5jYWxsKHRoaXMsYSl9LGIuVGV4dC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtPWZ1bmN0aW9uKCl7dGhpcy5kaXJ0eSYmKHRoaXMudXBkYXRlVGV4dCgpLHRoaXMuZGlydHk9ITEpLGIuU3ByaXRlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0uY2FsbCh0aGlzKX0sYi5UZXh0LnByb3RvdHlwZS5kZXRlcm1pbmVGb250SGVpZ2h0PWZ1bmN0aW9uKGEpe3ZhciBjPWIuVGV4dC5oZWlnaHRDYWNoZVthXTtpZighYyl7dmFyIGQ9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxmPWRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiTVwiKTtlLmFwcGVuZENoaWxkKGYpLGUuc2V0QXR0cmlidXRlKFwic3R5bGVcIixhK1wiO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MFwiKSxkLmFwcGVuZENoaWxkKGUpLGM9ZS5vZmZzZXRIZWlnaHQsYi5UZXh0LmhlaWdodENhY2hlW2FdPWMsZC5yZW1vdmVDaGlsZChlKX1yZXR1cm4gY30sYi5UZXh0LnByb3RvdHlwZS53b3JkV3JhcD1mdW5jdGlvbihhKXtmb3IodmFyIGI9XCJcIixjPWEuc3BsaXQoXCJcXG5cIiksZD0wO2Q8Yy5sZW5ndGg7ZCsrKXtmb3IodmFyIGU9dGhpcy5zdHlsZS53b3JkV3JhcFdpZHRoLGY9Y1tkXS5zcGxpdChcIiBcIiksZz0wO2c8Zi5sZW5ndGg7ZysrKXt2YXIgaD10aGlzLmNvbnRleHQubWVhc3VyZVRleHQoZltnXSkud2lkdGgsaT1oK3RoaXMuY29udGV4dC5tZWFzdXJlVGV4dChcIiBcIikud2lkdGg7MD09PWd8fGk+ZT8oZz4wJiYoYis9XCJcXG5cIiksYis9ZltnXSxlPXRoaXMuc3R5bGUud29yZFdyYXBXaWR0aC1oKTooZS09aSxiKz1cIiBcIitmW2ddKX1kPGMubGVuZ3RoLTEmJihiKz1cIlxcblwiKX1yZXR1cm4gYn0sYi5UZXh0LnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKGEpe3RoaXMuY29udGV4dD1udWxsLHRoaXMuY2FudmFzPW51bGwsdGhpcy50ZXh0dXJlLmRlc3Ryb3kodm9pZCAwPT09YT8hMDphKX0sYi5UZXh0LmhlaWdodENhY2hlPXt9LGIuQml0bWFwVGV4dD1mdW5jdGlvbihhLGMpe2IuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpLHRoaXMuX3Bvb2w9W10sdGhpcy5zZXRUZXh0KGEpLHRoaXMuc2V0U3R5bGUoYyksdGhpcy51cGRhdGVUZXh0KCksdGhpcy5kaXJ0eT0hMX0sYi5CaXRtYXBUZXh0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpLGIuQml0bWFwVGV4dC5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5CaXRtYXBUZXh0LGIuQml0bWFwVGV4dC5wcm90b3R5cGUuc2V0VGV4dD1mdW5jdGlvbihhKXt0aGlzLnRleHQ9YXx8XCIgXCIsdGhpcy5kaXJ0eT0hMH0sYi5CaXRtYXBUZXh0LnByb3RvdHlwZS5zZXRTdHlsZT1mdW5jdGlvbihhKXthPWF8fHt9LGEuYWxpZ249YS5hbGlnbnx8XCJsZWZ0XCIsdGhpcy5zdHlsZT1hO3ZhciBjPWEuZm9udC5zcGxpdChcIiBcIik7dGhpcy5mb250TmFtZT1jW2MubGVuZ3RoLTFdLHRoaXMuZm9udFNpemU9Yy5sZW5ndGg+PTI/cGFyc2VJbnQoY1tjLmxlbmd0aC0yXSwxMCk6Yi5CaXRtYXBUZXh0LmZvbnRzW3RoaXMuZm9udE5hbWVdLnNpemUsdGhpcy5kaXJ0eT0hMCx0aGlzLnRpbnQ9YS50aW50fSxiLkJpdG1hcFRleHQucHJvdG90eXBlLnVwZGF0ZVRleHQ9ZnVuY3Rpb24oKXtmb3IodmFyIGE9Yi5CaXRtYXBUZXh0LmZvbnRzW3RoaXMuZm9udE5hbWVdLGM9bmV3IGIuUG9pbnQsZD1udWxsLGU9W10sZj0wLGc9W10saD0wLGk9dGhpcy5mb250U2l6ZS9hLnNpemUsaj0wO2o8dGhpcy50ZXh0Lmxlbmd0aDtqKyspe3ZhciBrPXRoaXMudGV4dC5jaGFyQ29kZUF0KGopO2lmKC8oPzpcXHJcXG58XFxyfFxcbikvLnRlc3QodGhpcy50ZXh0LmNoYXJBdChqKSkpZy5wdXNoKGMueCksZj1NYXRoLm1heChmLGMueCksaCsrLGMueD0wLGMueSs9YS5saW5lSGVpZ2h0LGQ9bnVsbDtlbHNle3ZhciBsPWEuY2hhcnNba107bCYmKGQmJmxbZF0mJihjLngrPWwua2VybmluZ1tkXSksZS5wdXNoKHt0ZXh0dXJlOmwudGV4dHVyZSxsaW5lOmgsY2hhckNvZGU6ayxwb3NpdGlvbjpuZXcgYi5Qb2ludChjLngrbC54T2Zmc2V0LGMueStsLnlPZmZzZXQpfSksYy54Kz1sLnhBZHZhbmNlLGQ9ayl9fWcucHVzaChjLngpLGY9TWF0aC5tYXgoZixjLngpO3ZhciBtPVtdO2ZvcihqPTA7aD49ajtqKyspe3ZhciBuPTA7XCJyaWdodFwiPT09dGhpcy5zdHlsZS5hbGlnbj9uPWYtZ1tqXTpcImNlbnRlclwiPT09dGhpcy5zdHlsZS5hbGlnbiYmKG49KGYtZ1tqXSkvMiksbS5wdXNoKG4pfXZhciBvPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLHA9ZS5sZW5ndGgscT10aGlzLnRpbnR8fDE2Nzc3MjE1O2ZvcihqPTA7cD5qO2orKyl7dmFyIHI9bz5qP3RoaXMuY2hpbGRyZW5bal06dGhpcy5fcG9vbC5wb3AoKTtyP3Iuc2V0VGV4dHVyZShlW2pdLnRleHR1cmUpOnI9bmV3IGIuU3ByaXRlKGVbal0udGV4dHVyZSksci5wb3NpdGlvbi54PShlW2pdLnBvc2l0aW9uLngrbVtlW2pdLmxpbmVdKSppLHIucG9zaXRpb24ueT1lW2pdLnBvc2l0aW9uLnkqaSxyLnNjYWxlLng9ci5zY2FsZS55PWksci50aW50PXEsci5wYXJlbnR8fHRoaXMuYWRkQ2hpbGQocil9Zm9yKDt0aGlzLmNoaWxkcmVuLmxlbmd0aD5wOyl7dmFyIHM9dGhpcy5nZXRDaGlsZEF0KHRoaXMuY2hpbGRyZW4ubGVuZ3RoLTEpO3RoaXMuX3Bvb2wucHVzaChzKSx0aGlzLnJlbW92ZUNoaWxkKHMpfXRoaXMudGV4dFdpZHRoPWYqaSx0aGlzLnRleHRIZWlnaHQ9KGMueSthLmxpbmVIZWlnaHQpKml9LGIuQml0bWFwVGV4dC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtPWZ1bmN0aW9uKCl7dGhpcy5kaXJ0eSYmKHRoaXMudXBkYXRlVGV4dCgpLHRoaXMuZGlydHk9ITEpLGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtLmNhbGwodGhpcyl9LGIuQml0bWFwVGV4dC5mb250cz17fSxiLkludGVyYWN0aW9uRGF0YT1mdW5jdGlvbigpe3RoaXMuZ2xvYmFsPW5ldyBiLlBvaW50LHRoaXMudGFyZ2V0PW51bGwsdGhpcy5vcmlnaW5hbEV2ZW50PW51bGx9LGIuSW50ZXJhY3Rpb25EYXRhLnByb3RvdHlwZS5nZXRMb2NhbFBvc2l0aW9uPWZ1bmN0aW9uKGEpe3ZhciBjPWEud29ybGRUcmFuc2Zvcm0sZD10aGlzLmdsb2JhbCxlPWMuYSxmPWMuYixnPWMudHgsaD1jLmMsaT1jLmQsaj1jLnR5LGs9MS8oZSppK2YqLWgpO3JldHVybiBuZXcgYi5Qb2ludChpKmsqZC54Ky1mKmsqZC55KyhqKmYtZyppKSprLGUqaypkLnkrLWgqaypkLngrKC1qKmUrZypoKSprKX0sYi5JbnRlcmFjdGlvbkRhdGEucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuSW50ZXJhY3Rpb25EYXRhLGIuSW50ZXJhY3Rpb25NYW5hZ2VyPWZ1bmN0aW9uKGEpe3RoaXMuc3RhZ2U9YSx0aGlzLm1vdXNlPW5ldyBiLkludGVyYWN0aW9uRGF0YSx0aGlzLnRvdWNocz17fSx0aGlzLnRlbXBQb2ludD1uZXcgYi5Qb2ludCx0aGlzLm1vdXNlb3ZlckVuYWJsZWQ9ITAsdGhpcy5wb29sPVtdLHRoaXMuaW50ZXJhY3RpdmVJdGVtcz1bXSx0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudD1udWxsLHRoaXMub25Nb3VzZU1vdmU9dGhpcy5vbk1vdXNlTW92ZS5iaW5kKHRoaXMpLHRoaXMub25Nb3VzZURvd249dGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpLHRoaXMub25Nb3VzZU91dD10aGlzLm9uTW91c2VPdXQuYmluZCh0aGlzKSx0aGlzLm9uTW91c2VVcD10aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpLHRoaXMub25Ub3VjaFN0YXJ0PXRoaXMub25Ub3VjaFN0YXJ0LmJpbmQodGhpcyksdGhpcy5vblRvdWNoRW5kPXRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpLHRoaXMub25Ub3VjaE1vdmU9dGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpLHRoaXMubGFzdD0wLHRoaXMuY3VycmVudEN1cnNvclN0eWxlPVwiaW5oZXJpdFwiLHRoaXMubW91c2VPdXQ9ITF9LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkludGVyYWN0aW9uTWFuYWdlcixiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUuY29sbGVjdEludGVyYWN0aXZlU3ByaXRlPWZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPWEuY2hpbGRyZW4sZD1jLmxlbmd0aCxlPWQtMTtlPj0wO2UtLSl7dmFyIGY9Y1tlXTtmLl9pbnRlcmFjdGl2ZT8oYi5pbnRlcmFjdGl2ZUNoaWxkcmVuPSEwLHRoaXMuaW50ZXJhY3RpdmVJdGVtcy5wdXNoKGYpLGYuY2hpbGRyZW4ubGVuZ3RoPjAmJnRoaXMuY29sbGVjdEludGVyYWN0aXZlU3ByaXRlKGYsZikpOihmLl9faVBhcmVudD1udWxsLGYuY2hpbGRyZW4ubGVuZ3RoPjAmJnRoaXMuY29sbGVjdEludGVyYWN0aXZlU3ByaXRlKGYsYikpfX0sYi5JbnRlcmFjdGlvbk1hbmFnZXIucHJvdG90eXBlLnNldFRhcmdldD1mdW5jdGlvbihhKXt0aGlzLnRhcmdldD1hLG51bGw9PT10aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudCYmdGhpcy5zZXRUYXJnZXREb21FbGVtZW50KGEudmlldyl9LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5zZXRUYXJnZXREb21FbGVtZW50PWZ1bmN0aW9uKGEpe3RoaXMucmVtb3ZlRXZlbnRzKCksd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkJiYoYS5zdHlsZVtcIi1tcy1jb250ZW50LXpvb21pbmdcIl09XCJub25lXCIsYS5zdHlsZVtcIi1tcy10b3VjaC1hY3Rpb25cIl09XCJub25lXCIpLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50PWEsYS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5vbk1vdXNlTW92ZSwhMCksYS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsdGhpcy5vbk1vdXNlRG93biwhMCksYS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIix0aGlzLm9uTW91c2VPdXQsITApLGEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIix0aGlzLm9uVG91Y2hTdGFydCwhMCksYS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIix0aGlzLm9uVG91Y2hFbmQsITApLGEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMub25Ub3VjaE1vdmUsITApLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMub25Nb3VzZVVwLCEwKX0sYi5JbnRlcmFjdGlvbk1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50cz1mdW5jdGlvbigpe3RoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50JiYodGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQuc3R5bGVbXCItbXMtY29udGVudC16b29taW5nXCJdPVwiXCIsdGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQuc3R5bGVbXCItbXMtdG91Y2gtYWN0aW9uXCJdPVwiXCIsdGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMub25Nb3VzZU1vdmUsITApLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIix0aGlzLm9uTW91c2VEb3duLCEwKSx0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIix0aGlzLm9uTW91c2VPdXQsITApLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsdGhpcy5vblRvdWNoU3RhcnQsITApLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHRoaXMub25Ub3VjaEVuZCwhMCksdGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMub25Ub3VjaE1vdmUsITApLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50PW51bGwsd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsdGhpcy5vbk1vdXNlVXAsITApKX0sYi5JbnRlcmFjdGlvbk1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbigpe2lmKHRoaXMudGFyZ2V0KXt2YXIgYT1EYXRlLm5vdygpLGM9YS10aGlzLmxhc3Q7aWYoYz1jKmIuSU5URVJBQ1RJT05fRlJFUVVFTkNZLzFlMywhKDE+Yykpe3RoaXMubGFzdD1hO3ZhciBkPTA7dGhpcy5kaXJ0eSYmdGhpcy5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaCgpO3ZhciBlPXRoaXMuaW50ZXJhY3RpdmVJdGVtcy5sZW5ndGgsZj1cImluaGVyaXRcIixnPSExO2ZvcihkPTA7ZT5kO2QrKyl7dmFyIGg9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2RdO2guX19oaXQ9dGhpcy5oaXRUZXN0KGgsdGhpcy5tb3VzZSksdGhpcy5tb3VzZS50YXJnZXQ9aCxoLl9faGl0JiYhZz8oaC5idXR0b25Nb2RlJiYoZj1oLmRlZmF1bHRDdXJzb3IpLGguaW50ZXJhY3RpdmVDaGlsZHJlbnx8KGc9ITApLGguX19pc092ZXJ8fChoLm1vdXNlb3ZlciYmaC5tb3VzZW92ZXIodGhpcy5tb3VzZSksaC5fX2lzT3Zlcj0hMCkpOmguX19pc092ZXImJihoLm1vdXNlb3V0JiZoLm1vdXNlb3V0KHRoaXMubW91c2UpLGguX19pc092ZXI9ITEpfXRoaXMuY3VycmVudEN1cnNvclN0eWxlIT09ZiYmKHRoaXMuY3VycmVudEN1cnNvclN0eWxlPWYsdGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQuc3R5bGUuY3Vyc29yPWYpfX19LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaD1mdW5jdGlvbigpe3RoaXMuZGlydHk9ITE7Zm9yKHZhciBhPXRoaXMuaW50ZXJhY3RpdmVJdGVtcy5sZW5ndGgsYj0wO2E+YjtiKyspdGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2JdLmludGVyYWN0aXZlQ2hpbGRyZW49ITE7dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zPVtdLHRoaXMuc3RhZ2UuaW50ZXJhY3RpdmUmJnRoaXMuaW50ZXJhY3RpdmVJdGVtcy5wdXNoKHRoaXMuc3RhZ2UpLHRoaXMuY29sbGVjdEludGVyYWN0aXZlU3ByaXRlKHRoaXMuc3RhZ2UsdGhpcy5zdGFnZSl9LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5vbk1vdXNlTW92ZT1mdW5jdGlvbihhKXt0aGlzLmRpcnR5JiZ0aGlzLnJlYnVpbGRJbnRlcmFjdGl2ZUdyYXBoKCksdGhpcy5tb3VzZS5vcmlnaW5hbEV2ZW50PWF8fHdpbmRvdy5ldmVudDt2YXIgYj10aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt0aGlzLm1vdXNlLmdsb2JhbC54PShhLmNsaWVudFgtYi5sZWZ0KSoodGhpcy50YXJnZXQud2lkdGgvYi53aWR0aCksdGhpcy5tb3VzZS5nbG9iYWwueT0oYS5jbGllbnRZLWIudG9wKSoodGhpcy50YXJnZXQuaGVpZ2h0L2IuaGVpZ2h0KTtmb3IodmFyIGM9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zLmxlbmd0aCxkPTA7Yz5kO2QrKyl7dmFyIGU9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2RdO2UubW91c2Vtb3ZlJiZlLm1vdXNlbW92ZSh0aGlzLm1vdXNlKX19LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5vbk1vdXNlRG93bj1mdW5jdGlvbihhKXt0aGlzLmRpcnR5JiZ0aGlzLnJlYnVpbGRJbnRlcmFjdGl2ZUdyYXBoKCksdGhpcy5tb3VzZS5vcmlnaW5hbEV2ZW50PWF8fHdpbmRvdy5ldmVudCxiLkFVVE9fUFJFVkVOVF9ERUZBVUxUJiZ0aGlzLm1vdXNlLm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKTtmb3IodmFyIGM9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zLmxlbmd0aCxkPTA7Yz5kO2QrKyl7dmFyIGU9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2RdO2lmKChlLm1vdXNlZG93bnx8ZS5jbGljaykmJihlLl9fbW91c2VJc0Rvd249ITAsZS5fX2hpdD10aGlzLmhpdFRlc3QoZSx0aGlzLm1vdXNlKSxlLl9faGl0JiYoZS5tb3VzZWRvd24mJmUubW91c2Vkb3duKHRoaXMubW91c2UpLGUuX19pc0Rvd249ITAsIWUuaW50ZXJhY3RpdmVDaGlsZHJlbikpKWJyZWFrfX0sYi5JbnRlcmFjdGlvbk1hbmFnZXIucHJvdG90eXBlLm9uTW91c2VPdXQ9ZnVuY3Rpb24oKXt0aGlzLmRpcnR5JiZ0aGlzLnJlYnVpbGRJbnRlcmFjdGl2ZUdyYXBoKCk7dmFyIGE9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zLmxlbmd0aDt0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5zdHlsZS5jdXJzb3I9XCJpbmhlcml0XCI7Zm9yKHZhciBiPTA7YT5iO2IrKyl7dmFyIGM9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2JdO2MuX19pc092ZXImJih0aGlzLm1vdXNlLnRhcmdldD1jLGMubW91c2VvdXQmJmMubW91c2VvdXQodGhpcy5tb3VzZSksYy5fX2lzT3Zlcj0hMSl9dGhpcy5tb3VzZU91dD0hMCx0aGlzLm1vdXNlLmdsb2JhbC54PS0xZTQsdGhpcy5tb3VzZS5nbG9iYWwueT0tMWU0fSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUub25Nb3VzZVVwPWZ1bmN0aW9uKGEpe3RoaXMuZGlydHkmJnRoaXMucmVidWlsZEludGVyYWN0aXZlR3JhcGgoKSx0aGlzLm1vdXNlLm9yaWdpbmFsRXZlbnQ9YXx8d2luZG93LmV2ZW50O1xuZm9yKHZhciBiPXRoaXMuaW50ZXJhY3RpdmVJdGVtcy5sZW5ndGgsYz0hMSxkPTA7Yj5kO2QrKyl7dmFyIGU9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2RdO2UuX19oaXQ9dGhpcy5oaXRUZXN0KGUsdGhpcy5tb3VzZSksZS5fX2hpdCYmIWM/KGUubW91c2V1cCYmZS5tb3VzZXVwKHRoaXMubW91c2UpLGUuX19pc0Rvd24mJmUuY2xpY2smJmUuY2xpY2sodGhpcy5tb3VzZSksZS5pbnRlcmFjdGl2ZUNoaWxkcmVufHwoYz0hMCkpOmUuX19pc0Rvd24mJmUubW91c2V1cG91dHNpZGUmJmUubW91c2V1cG91dHNpZGUodGhpcy5tb3VzZSksZS5fX2lzRG93bj0hMX19LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5oaXRUZXN0PWZ1bmN0aW9uKGEsYyl7dmFyIGQ9Yy5nbG9iYWw7aWYoIWEud29ybGRWaXNpYmxlKXJldHVybiExO3ZhciBlPWEgaW5zdGFuY2VvZiBiLlNwcml0ZSxmPWEud29ybGRUcmFuc2Zvcm0sZz1mLmEsaD1mLmIsaT1mLnR4LGo9Zi5jLGs9Zi5kLGw9Zi50eSxtPTEvKGcqaytoKi1qKSxuPWsqbSpkLngrLWgqbSpkLnkrKGwqaC1pKmspKm0sbz1nKm0qZC55Ky1qKm0qZC54KygtbCpnK2kqaikqbTtpZihjLnRhcmdldD1hLGEuaGl0QXJlYSYmYS5oaXRBcmVhLmNvbnRhaW5zKXJldHVybiBhLmhpdEFyZWEuY29udGFpbnMobixvKT8oYy50YXJnZXQ9YSwhMCk6ITE7aWYoZSl7dmFyIHAscT1hLnRleHR1cmUuZnJhbWUud2lkdGgscj1hLnRleHR1cmUuZnJhbWUuaGVpZ2h0LHM9LXEqYS5hbmNob3IueDtpZihuPnMmJnMrcT5uJiYocD0tciphLmFuY2hvci55LG8+cCYmcCtyPm8pKXJldHVybiBjLnRhcmdldD1hLCEwfWZvcih2YXIgdD1hLmNoaWxkcmVuLmxlbmd0aCx1PTA7dD51O3UrKyl7dmFyIHY9YS5jaGlsZHJlblt1XSx3PXRoaXMuaGl0VGVzdCh2LGMpO2lmKHcpcmV0dXJuIGMudGFyZ2V0PWEsITB9cmV0dXJuITF9LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5vblRvdWNoTW92ZT1mdW5jdGlvbihhKXt0aGlzLmRpcnR5JiZ0aGlzLnJlYnVpbGRJbnRlcmFjdGl2ZUdyYXBoKCk7dmFyIGIsYz10aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxkPWEuY2hhbmdlZFRvdWNoZXMsZT0wO2ZvcihlPTA7ZTxkLmxlbmd0aDtlKyspe3ZhciBmPWRbZV07Yj10aGlzLnRvdWNoc1tmLmlkZW50aWZpZXJdLGIub3JpZ2luYWxFdmVudD1hfHx3aW5kb3cuZXZlbnQsYi5nbG9iYWwueD0oZi5jbGllbnRYLWMubGVmdCkqKHRoaXMudGFyZ2V0LndpZHRoL2Mud2lkdGgpLGIuZ2xvYmFsLnk9KGYuY2xpZW50WS1jLnRvcCkqKHRoaXMudGFyZ2V0LmhlaWdodC9jLmhlaWdodCksbmF2aWdhdG9yLmlzQ29jb29uSlMmJihiLmdsb2JhbC54PWYuY2xpZW50WCxiLmdsb2JhbC55PWYuY2xpZW50WSk7Zm9yKHZhciBnPTA7Zzx0aGlzLmludGVyYWN0aXZlSXRlbXMubGVuZ3RoO2crKyl7dmFyIGg9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2ddO2gudG91Y2htb3ZlJiZoLl9fdG91Y2hEYXRhJiZoLl9fdG91Y2hEYXRhW2YuaWRlbnRpZmllcl0mJmgudG91Y2htb3ZlKGIpfX19LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5vblRvdWNoU3RhcnQ9ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eSYmdGhpcy5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaCgpO3ZhciBjPXRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO2IuQVVUT19QUkVWRU5UX0RFRkFVTFQmJmEucHJldmVudERlZmF1bHQoKTtmb3IodmFyIGQ9YS5jaGFuZ2VkVG91Y2hlcyxlPTA7ZTxkLmxlbmd0aDtlKyspe3ZhciBmPWRbZV0sZz10aGlzLnBvb2wucG9wKCk7Z3x8KGc9bmV3IGIuSW50ZXJhY3Rpb25EYXRhKSxnLm9yaWdpbmFsRXZlbnQ9YXx8d2luZG93LmV2ZW50LHRoaXMudG91Y2hzW2YuaWRlbnRpZmllcl09ZyxnLmdsb2JhbC54PShmLmNsaWVudFgtYy5sZWZ0KSoodGhpcy50YXJnZXQud2lkdGgvYy53aWR0aCksZy5nbG9iYWwueT0oZi5jbGllbnRZLWMudG9wKSoodGhpcy50YXJnZXQuaGVpZ2h0L2MuaGVpZ2h0KSxuYXZpZ2F0b3IuaXNDb2Nvb25KUyYmKGcuZ2xvYmFsLng9Zi5jbGllbnRYLGcuZ2xvYmFsLnk9Zi5jbGllbnRZKTtmb3IodmFyIGg9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zLmxlbmd0aCxpPTA7aD5pO2krKyl7dmFyIGo9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2ldO2lmKChqLnRvdWNoc3RhcnR8fGoudGFwKSYmKGouX19oaXQ9dGhpcy5oaXRUZXN0KGosZyksai5fX2hpdCYmKGoudG91Y2hzdGFydCYmai50b3VjaHN0YXJ0KGcpLGouX19pc0Rvd249ITAsai5fX3RvdWNoRGF0YT1qLl9fdG91Y2hEYXRhfHx7fSxqLl9fdG91Y2hEYXRhW2YuaWRlbnRpZmllcl09Zywhai5pbnRlcmFjdGl2ZUNoaWxkcmVuKSkpYnJlYWt9fX0sYi5JbnRlcmFjdGlvbk1hbmFnZXIucHJvdG90eXBlLm9uVG91Y2hFbmQ9ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eSYmdGhpcy5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaCgpO2Zvcih2YXIgYj10aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxjPWEuY2hhbmdlZFRvdWNoZXMsZD0wO2Q8Yy5sZW5ndGg7ZCsrKXt2YXIgZT1jW2RdLGY9dGhpcy50b3VjaHNbZS5pZGVudGlmaWVyXSxnPSExO2YuZ2xvYmFsLng9KGUuY2xpZW50WC1iLmxlZnQpKih0aGlzLnRhcmdldC53aWR0aC9iLndpZHRoKSxmLmdsb2JhbC55PShlLmNsaWVudFktYi50b3ApKih0aGlzLnRhcmdldC5oZWlnaHQvYi5oZWlnaHQpLG5hdmlnYXRvci5pc0NvY29vbkpTJiYoZi5nbG9iYWwueD1lLmNsaWVudFgsZi5nbG9iYWwueT1lLmNsaWVudFkpO2Zvcih2YXIgaD10aGlzLmludGVyYWN0aXZlSXRlbXMubGVuZ3RoLGk9MDtoPmk7aSsrKXt2YXIgaj10aGlzLmludGVyYWN0aXZlSXRlbXNbaV07ai5fX3RvdWNoRGF0YSYmai5fX3RvdWNoRGF0YVtlLmlkZW50aWZpZXJdJiYoai5fX2hpdD10aGlzLmhpdFRlc3QoaixqLl9fdG91Y2hEYXRhW2UuaWRlbnRpZmllcl0pLGYub3JpZ2luYWxFdmVudD1hfHx3aW5kb3cuZXZlbnQsKGoudG91Y2hlbmR8fGoudGFwKSYmKGouX19oaXQmJiFnPyhqLnRvdWNoZW5kJiZqLnRvdWNoZW5kKGYpLGouX19pc0Rvd24mJmoudGFwJiZqLnRhcChmKSxqLmludGVyYWN0aXZlQ2hpbGRyZW58fChnPSEwKSk6ai5fX2lzRG93biYmai50b3VjaGVuZG91dHNpZGUmJmoudG91Y2hlbmRvdXRzaWRlKGYpLGouX19pc0Rvd249ITEpLGouX190b3VjaERhdGFbZS5pZGVudGlmaWVyXT1udWxsKX10aGlzLnBvb2wucHVzaChmKSx0aGlzLnRvdWNoc1tlLmlkZW50aWZpZXJdPW51bGx9fSxiLlN0YWdlPWZ1bmN0aW9uKGEpe2IuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpLHRoaXMud29ybGRUcmFuc2Zvcm09bmV3IGIuTWF0cml4LHRoaXMuaW50ZXJhY3RpdmU9ITAsdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXI9bmV3IGIuSW50ZXJhY3Rpb25NYW5hZ2VyKHRoaXMpLHRoaXMuZGlydHk9ITAsdGhpcy5zdGFnZT10aGlzLHRoaXMuc3RhZ2UuaGl0QXJlYT1uZXcgYi5SZWN0YW5nbGUoMCwwLDFlNSwxZTUpLHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKGEpfSxiLlN0YWdlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpLGIuU3RhZ2UucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuU3RhZ2UsYi5TdGFnZS5wcm90b3R5cGUuc2V0SW50ZXJhY3Rpb25EZWxlZ2F0ZT1mdW5jdGlvbihhKXt0aGlzLmludGVyYWN0aW9uTWFuYWdlci5zZXRUYXJnZXREb21FbGVtZW50KGEpfSxiLlN0YWdlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm09ZnVuY3Rpb24oKXt0aGlzLndvcmxkQWxwaGE9MTtmb3IodmFyIGE9MCxiPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2I+YTthKyspdGhpcy5jaGlsZHJlblthXS51cGRhdGVUcmFuc2Zvcm0oKTt0aGlzLmRpcnR5JiYodGhpcy5kaXJ0eT0hMSx0aGlzLmludGVyYWN0aW9uTWFuYWdlci5kaXJ0eT0hMCksdGhpcy5pbnRlcmFjdGl2ZSYmdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIudXBkYXRlKCl9LGIuU3RhZ2UucHJvdG90eXBlLnNldEJhY2tncm91bmRDb2xvcj1mdW5jdGlvbihhKXt0aGlzLmJhY2tncm91bmRDb2xvcj1hfHwwLHRoaXMuYmFja2dyb3VuZENvbG9yU3BsaXQ9Yi5oZXgycmdiKHRoaXMuYmFja2dyb3VuZENvbG9yKTt2YXIgYz10aGlzLmJhY2tncm91bmRDb2xvci50b1N0cmluZygxNik7Yz1cIjAwMDAwMFwiLnN1YnN0cigwLDYtYy5sZW5ndGgpK2MsdGhpcy5iYWNrZ3JvdW5kQ29sb3JTdHJpbmc9XCIjXCIrY30sYi5TdGFnZS5wcm90b3R5cGUuZ2V0TW91c2VQb3NpdGlvbj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmludGVyYWN0aW9uTWFuYWdlci5tb3VzZS5nbG9iYWx9O2Zvcih2YXIgYz0wLGQ9W1wibXNcIixcIm1velwiLFwid2Via2l0XCIsXCJvXCJdLGU9MDtlPGQubGVuZ3RoJiYhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsrK2Upd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT13aW5kb3dbZFtlXStcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXSx3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU9d2luZG93W2RbZV0rXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXXx8d2luZG93W2RbZV0rXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZXx8KHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24oYSl7dmFyIGI9KG5ldyBEYXRlKS5nZXRUaW1lKCksZD1NYXRoLm1heCgwLDE2LShiLWMpKSxlPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YShiK2QpfSxkKTtyZXR1cm4gYz1iK2QsZX0pLHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZXx8KHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZT1mdW5jdGlvbihhKXtjbGVhclRpbWVvdXQoYSl9KSx3aW5kb3cucmVxdWVzdEFuaW1GcmFtZT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLGIuaGV4MnJnYj1mdW5jdGlvbihhKXtyZXR1cm5bKGE+PjE2JjI1NSkvMjU1LChhPj44JjI1NSkvMjU1LCgyNTUmYSkvMjU1XX0sYi5yZ2IyaGV4PWZ1bmN0aW9uKGEpe3JldHVybigyNTUqYVswXTw8MTYpKygyNTUqYVsxXTw8OCkrMjU1KmFbMl19LFwiZnVuY3Rpb25cIiE9dHlwZW9mIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kJiYoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oKXt2YXIgYT1BcnJheS5wcm90b3R5cGUuc2xpY2U7cmV0dXJuIGZ1bmN0aW9uKGIpe2Z1bmN0aW9uIGMoKXt2YXIgZj1lLmNvbmNhdChhLmNhbGwoYXJndW1lbnRzKSk7ZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgYz90aGlzOmIsZil9dmFyIGQ9dGhpcyxlPWEuY2FsbChhcmd1bWVudHMsMSk7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZCl0aHJvdyBuZXcgVHlwZUVycm9yO3JldHVybiBjLnByb3RvdHlwZT1mdW5jdGlvbiBmKGEpe3JldHVybiBhJiYoZi5wcm90b3R5cGU9YSksdGhpcyBpbnN0YW5jZW9mIGY/dm9pZCAwOm5ldyBmfShkLnByb3RvdHlwZSksY319KCkpLGIuQWpheFJlcXVlc3Q9ZnVuY3Rpb24oKXt2YXIgYT1bXCJNc3htbDIuWE1MSFRUUC42LjBcIixcIk1zeG1sMi5YTUxIVFRQLjMuMFwiLFwiTWljcm9zb2Z0LlhNTEhUVFBcIl07aWYoIXdpbmRvdy5BY3RpdmVYT2JqZWN0KXJldHVybiB3aW5kb3cuWE1MSHR0cFJlcXVlc3Q/bmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdDohMTtmb3IodmFyIGI9MDtiPGEubGVuZ3RoO2IrKyl0cnl7cmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdChhW2JdKX1jYXRjaChjKXt9fSxiLmNhblVzZU5ld0NhbnZhc0JsZW5kTW9kZXM9ZnVuY3Rpb24oKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO2Eud2lkdGg9MSxhLmhlaWdodD0xO3ZhciBiPWEuZ2V0Q29udGV4dChcIjJkXCIpO3JldHVybiBiLmZpbGxTdHlsZT1cIiMwMDBcIixiLmZpbGxSZWN0KDAsMCwxLDEpLGIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPVwibXVsdGlwbHlcIixiLmZpbGxTdHlsZT1cIiNmZmZcIixiLmZpbGxSZWN0KDAsMCwxLDEpLDA9PT1iLmdldEltYWdlRGF0YSgwLDAsMSwxKS5kYXRhWzBdfSxiLmdldE5leHRQb3dlck9mVHdvPWZ1bmN0aW9uKGEpe2lmKGE+MCYmMD09PShhJmEtMSkpcmV0dXJuIGE7Zm9yKHZhciBiPTE7YT5iOyliPDw9MTtyZXR1cm4gYn0sYi5FdmVudFRhcmdldD1mdW5jdGlvbigpe3ZhciBhPXt9O3RoaXMuYWRkRXZlbnRMaXN0ZW5lcj10aGlzLm9uPWZ1bmN0aW9uKGIsYyl7dm9pZCAwPT09YVtiXSYmKGFbYl09W10pLC0xPT09YVtiXS5pbmRleE9mKGMpJiZhW2JdLnVuc2hpZnQoYyl9LHRoaXMuZGlzcGF0Y2hFdmVudD10aGlzLmVtaXQ9ZnVuY3Rpb24oYil7aWYoYVtiLnR5cGVdJiZhW2IudHlwZV0ubGVuZ3RoKWZvcih2YXIgYz1hW2IudHlwZV0ubGVuZ3RoLTE7Yz49MDtjLS0pYVtiLnR5cGVdW2NdKGIpfSx0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXI9dGhpcy5vZmY9ZnVuY3Rpb24oYixjKXtpZih2b2lkIDAhPT1hW2JdKXt2YXIgZD1hW2JdLmluZGV4T2YoYyk7LTEhPT1kJiZhW2JdLnNwbGljZShkLDEpfX0sdGhpcy5yZW1vdmVBbGxFdmVudExpc3RlbmVycz1mdW5jdGlvbihiKXt2YXIgYz1hW2JdO2MmJihjLmxlbmd0aD0wKX19LGIuYXV0b0RldGVjdFJlbmRlcmVyPWZ1bmN0aW9uKGEsYyxkLGUsZil7YXx8KGE9ODAwKSxjfHwoYz02MDApO3ZhciBnPWZ1bmN0aW9uKCl7dHJ5e3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7cmV0dXJuISF3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0JiYoYS5nZXRDb250ZXh0KFwid2ViZ2xcIil8fGEuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiKSl9Y2F0Y2goYil7cmV0dXJuITF9fSgpO3JldHVybiBnP25ldyBiLldlYkdMUmVuZGVyZXIoYSxjLGQsZSxmKTpuZXcgYi5DYW52YXNSZW5kZXJlcihhLGMsZCxlKX0sYi5hdXRvRGV0ZWN0UmVjb21tZW5kZWRSZW5kZXJlcj1mdW5jdGlvbihhLGMsZCxlLGYpe2F8fChhPTgwMCksY3x8KGM9NjAwKTt2YXIgZz1mdW5jdGlvbigpe3RyeXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3JldHVybiEhd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCYmKGEuZ2V0Q29udGV4dChcIndlYmdsXCIpfHxhLmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIikpfWNhdGNoKGIpe3JldHVybiExfX0oKSxoPS9BbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtyZXR1cm4gZyYmIWg/bmV3IGIuV2ViR0xSZW5kZXJlcihhLGMsZCxlLGYpOm5ldyBiLkNhbnZhc1JlbmRlcmVyKGEsYyxkLGUpfSxiLlBvbHlLPXt9LGIuUG9seUsuVHJpYW5ndWxhdGU9ZnVuY3Rpb24oYSl7dmFyIGM9ITAsZD1hLmxlbmd0aD4+MTtpZigzPmQpcmV0dXJuW107Zm9yKHZhciBlPVtdLGY9W10sZz0wO2Q+ZztnKyspZi5wdXNoKGcpO2c9MDtmb3IodmFyIGg9ZDtoPjM7KXt2YXIgaT1mWyhnKzApJWhdLGo9ZlsoZysxKSVoXSxrPWZbKGcrMiklaF0sbD1hWzIqaV0sbT1hWzIqaSsxXSxuPWFbMipqXSxvPWFbMipqKzFdLHA9YVsyKmtdLHE9YVsyKmsrMV0scj0hMTtpZihiLlBvbHlLLl9jb252ZXgobCxtLG4sbyxwLHEsYykpe3I9ITA7Zm9yKHZhciBzPTA7aD5zO3MrKyl7dmFyIHQ9ZltzXTtpZih0IT09aSYmdCE9PWomJnQhPT1rJiZiLlBvbHlLLl9Qb2ludEluVHJpYW5nbGUoYVsyKnRdLGFbMip0KzFdLGwsbSxuLG8scCxxKSl7cj0hMTticmVha319fWlmKHIpZS5wdXNoKGksaixrKSxmLnNwbGljZSgoZysxKSVoLDEpLGgtLSxnPTA7ZWxzZSBpZihnKys+MypoKXtpZighYylyZXR1cm4gd2luZG93LmNvbnNvbGUubG9nKFwiUElYSSBXYXJuaW5nOiBzaGFwZSB0b28gY29tcGxleCB0byBmaWxsXCIpLFtdO2ZvcihlPVtdLGY9W10sZz0wO2Q+ZztnKyspZi5wdXNoKGcpO2c9MCxoPWQsYz0hMX19cmV0dXJuIGUucHVzaChmWzBdLGZbMV0sZlsyXSksZX0sYi5Qb2x5Sy5fUG9pbnRJblRyaWFuZ2xlPWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcsaCl7dmFyIGk9Zy1jLGo9aC1kLGs9ZS1jLGw9Zi1kLG09YS1jLG49Yi1kLG89aSppK2oqaixwPWkqaytqKmwscT1pKm0raipuLHI9ayprK2wqbCxzPWsqbStsKm4sdD0xLyhvKnItcCpwKSx1PShyKnEtcCpzKSp0LHY9KG8qcy1wKnEpKnQ7cmV0dXJuIHU+PTAmJnY+PTAmJjE+dSt2fSxiLlBvbHlLLl9jb252ZXg9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7cmV0dXJuKGItZCkqKGUtYykrKGMtYSkqKGYtZCk+PTA9PT1nfSxiLmluaXREZWZhdWx0U2hhZGVycz1mdW5jdGlvbigpe30sYi5Db21waWxlVmVydGV4U2hhZGVyPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIGIuX0NvbXBpbGVTaGFkZXIoYSxjLGEuVkVSVEVYX1NIQURFUil9LGIuQ29tcGlsZUZyYWdtZW50U2hhZGVyPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIGIuX0NvbXBpbGVTaGFkZXIoYSxjLGEuRlJBR01FTlRfU0hBREVSKX0sYi5fQ29tcGlsZVNoYWRlcj1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9Yi5qb2luKFwiXFxuXCIpLGU9YS5jcmVhdGVTaGFkZXIoYyk7cmV0dXJuIGEuc2hhZGVyU291cmNlKGUsZCksYS5jb21waWxlU2hhZGVyKGUpLGEuZ2V0U2hhZGVyUGFyYW1ldGVyKGUsYS5DT01QSUxFX1NUQVRVUyk/ZTood2luZG93LmNvbnNvbGUubG9nKGEuZ2V0U2hhZGVySW5mb0xvZyhlKSksbnVsbCl9LGIuY29tcGlsZVByb2dyYW09ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWIuQ29tcGlsZUZyYWdtZW50U2hhZGVyKGEsZCksZj1iLkNvbXBpbGVWZXJ0ZXhTaGFkZXIoYSxjKSxnPWEuY3JlYXRlUHJvZ3JhbSgpO3JldHVybiBhLmF0dGFjaFNoYWRlcihnLGYpLGEuYXR0YWNoU2hhZGVyKGcsZSksYS5saW5rUHJvZ3JhbShnKSxhLmdldFByb2dyYW1QYXJhbWV0ZXIoZyxhLkxJTktfU1RBVFVTKXx8d2luZG93LmNvbnNvbGUubG9nKFwiQ291bGQgbm90IGluaXRpYWxpc2Ugc2hhZGVyc1wiKSxnfSxiLlBpeGlTaGFkZXI9ZnVuY3Rpb24oYSl7dGhpcy5fVUlEPWIuX1VJRCsrLHRoaXMuZ2w9YSx0aGlzLnByb2dyYW09bnVsbCx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBsb3dwIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKSAqIHZDb2xvciA7XCIsXCJ9XCJdLHRoaXMudGV4dHVyZUNvdW50PTAsdGhpcy5hdHRyaWJ1dGVzPVtdLHRoaXMuaW5pdCgpfSxiLlBpeGlTaGFkZXIucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsLGM9Yi5jb21waWxlUHJvZ3JhbShhLHRoaXMudmVydGV4U3JjfHxiLlBpeGlTaGFkZXIuZGVmYXVsdFZlcnRleFNyYyx0aGlzLmZyYWdtZW50U3JjKTthLnVzZVByb2dyYW0oYyksdGhpcy51U2FtcGxlcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwidVNhbXBsZXJcIiksdGhpcy5wcm9qZWN0aW9uVmVjdG9yPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJwcm9qZWN0aW9uVmVjdG9yXCIpLHRoaXMub2Zmc2V0VmVjdG9yPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJvZmZzZXRWZWN0b3JcIiksdGhpcy5kaW1lbnNpb25zPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJkaW1lbnNpb25zXCIpLHRoaXMuYVZlcnRleFBvc2l0aW9uPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFWZXJ0ZXhQb3NpdGlvblwiKSx0aGlzLmFUZXh0dXJlQ29vcmQ9YS5nZXRBdHRyaWJMb2NhdGlvbihjLFwiYVRleHR1cmVDb29yZFwiKSx0aGlzLmNvbG9yQXR0cmlidXRlPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFDb2xvclwiKSwtMT09PXRoaXMuY29sb3JBdHRyaWJ1dGUmJih0aGlzLmNvbG9yQXR0cmlidXRlPTIpLHRoaXMuYXR0cmlidXRlcz1bdGhpcy5hVmVydGV4UG9zaXRpb24sdGhpcy5hVGV4dHVyZUNvb3JkLHRoaXMuY29sb3JBdHRyaWJ1dGVdO2Zvcih2YXIgZCBpbiB0aGlzLnVuaWZvcm1zKXRoaXMudW5pZm9ybXNbZF0udW5pZm9ybUxvY2F0aW9uPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsZCk7dGhpcy5pbml0VW5pZm9ybXMoKSx0aGlzLnByb2dyYW09Y30sYi5QaXhpU2hhZGVyLnByb3RvdHlwZS5pbml0VW5pZm9ybXM9ZnVuY3Rpb24oKXt0aGlzLnRleHR1cmVDb3VudD0xO3ZhciBhLGI9dGhpcy5nbDtmb3IodmFyIGMgaW4gdGhpcy51bmlmb3Jtcyl7YT10aGlzLnVuaWZvcm1zW2NdO3ZhciBkPWEudHlwZTtcInNhbXBsZXIyRFwiPT09ZD8oYS5faW5pdD0hMSxudWxsIT09YS52YWx1ZSYmdGhpcy5pbml0U2FtcGxlcjJEKGEpKTpcIm1hdDJcIj09PWR8fFwibWF0M1wiPT09ZHx8XCJtYXQ0XCI9PT1kPyhhLmdsTWF0cml4PSEwLGEuZ2xWYWx1ZUxlbmd0aD0xLFwibWF0MlwiPT09ZD9hLmdsRnVuYz1iLnVuaWZvcm1NYXRyaXgyZnY6XCJtYXQzXCI9PT1kP2EuZ2xGdW5jPWIudW5pZm9ybU1hdHJpeDNmdjpcIm1hdDRcIj09PWQmJihhLmdsRnVuYz1iLnVuaWZvcm1NYXRyaXg0ZnYpKTooYS5nbEZ1bmM9YltcInVuaWZvcm1cIitkXSxhLmdsVmFsdWVMZW5ndGg9XCIyZlwiPT09ZHx8XCIyaVwiPT09ZD8yOlwiM2ZcIj09PWR8fFwiM2lcIj09PWQ/MzpcIjRmXCI9PT1kfHxcIjRpXCI9PT1kPzQ6MSl9fSxiLlBpeGlTaGFkZXIucHJvdG90eXBlLmluaXRTYW1wbGVyMkQ9ZnVuY3Rpb24oYSl7aWYoYS52YWx1ZSYmYS52YWx1ZS5iYXNlVGV4dHVyZSYmYS52YWx1ZS5iYXNlVGV4dHVyZS5oYXNMb2FkZWQpe3ZhciBiPXRoaXMuZ2w7aWYoYi5hY3RpdmVUZXh0dXJlKGJbXCJURVhUVVJFXCIrdGhpcy50ZXh0dXJlQ291bnRdKSxiLmJpbmRUZXh0dXJlKGIuVEVYVFVSRV8yRCxhLnZhbHVlLmJhc2VUZXh0dXJlLl9nbFRleHR1cmVzW2IuaWRdKSxhLnRleHR1cmVEYXRhKXt2YXIgYz1hLnRleHR1cmVEYXRhLGQ9Yy5tYWdGaWx0ZXI/Yy5tYWdGaWx0ZXI6Yi5MSU5FQVIsZT1jLm1pbkZpbHRlcj9jLm1pbkZpbHRlcjpiLkxJTkVBUixmPWMud3JhcFM/Yy53cmFwUzpiLkNMQU1QX1RPX0VER0UsZz1jLndyYXBUP2Mud3JhcFQ6Yi5DTEFNUF9UT19FREdFLGg9Yy5sdW1pbmFuY2U/Yi5MVU1JTkFOQ0U6Yi5SR0JBO2lmKGMucmVwZWF0JiYoZj1iLlJFUEVBVCxnPWIuUkVQRUFUKSxiLnBpeGVsU3RvcmVpKGIuVU5QQUNLX0ZMSVBfWV9XRUJHTCwhIWMuZmxpcFkpLGMud2lkdGgpe3ZhciBpPWMud2lkdGg/Yy53aWR0aDo1MTIsaj1jLmhlaWdodD9jLmhlaWdodDoyLGs9Yy5ib3JkZXI/Yy5ib3JkZXI6MDtiLnRleEltYWdlMkQoYi5URVhUVVJFXzJELDAsaCxpLGosayxoLGIuVU5TSUdORURfQllURSxudWxsKX1lbHNlIGIudGV4SW1hZ2UyRChiLlRFWFRVUkVfMkQsMCxoLGIuUkdCQSxiLlVOU0lHTkVEX0JZVEUsYS52YWx1ZS5iYXNlVGV4dHVyZS5zb3VyY2UpO2IudGV4UGFyYW1ldGVyaShiLlRFWFRVUkVfMkQsYi5URVhUVVJFX01BR19GSUxURVIsZCksYi50ZXhQYXJhbWV0ZXJpKGIuVEVYVFVSRV8yRCxiLlRFWFRVUkVfTUlOX0ZJTFRFUixlKSxiLnRleFBhcmFtZXRlcmkoYi5URVhUVVJFXzJELGIuVEVYVFVSRV9XUkFQX1MsZiksYi50ZXhQYXJhbWV0ZXJpKGIuVEVYVFVSRV8yRCxiLlRFWFRVUkVfV1JBUF9ULGcpfWIudW5pZm9ybTFpKGEudW5pZm9ybUxvY2F0aW9uLHRoaXMudGV4dHVyZUNvdW50KSxhLl9pbml0PSEwLHRoaXMudGV4dHVyZUNvdW50Kyt9fSxiLlBpeGlTaGFkZXIucHJvdG90eXBlLnN5bmNVbmlmb3Jtcz1mdW5jdGlvbigpe3RoaXMudGV4dHVyZUNvdW50PTE7dmFyIGEsYz10aGlzLmdsO2Zvcih2YXIgZCBpbiB0aGlzLnVuaWZvcm1zKWE9dGhpcy51bmlmb3Jtc1tkXSwxPT09YS5nbFZhbHVlTGVuZ3RoP2EuZ2xNYXRyaXg9PT0hMD9hLmdsRnVuYy5jYWxsKGMsYS51bmlmb3JtTG9jYXRpb24sYS50cmFuc3Bvc2UsYS52YWx1ZSk6YS5nbEZ1bmMuY2FsbChjLGEudW5pZm9ybUxvY2F0aW9uLGEudmFsdWUpOjI9PT1hLmdsVmFsdWVMZW5ndGg/YS5nbEZ1bmMuY2FsbChjLGEudW5pZm9ybUxvY2F0aW9uLGEudmFsdWUueCxhLnZhbHVlLnkpOjM9PT1hLmdsVmFsdWVMZW5ndGg/YS5nbEZ1bmMuY2FsbChjLGEudW5pZm9ybUxvY2F0aW9uLGEudmFsdWUueCxhLnZhbHVlLnksYS52YWx1ZS56KTo0PT09YS5nbFZhbHVlTGVuZ3RoP2EuZ2xGdW5jLmNhbGwoYyxhLnVuaWZvcm1Mb2NhdGlvbixhLnZhbHVlLngsYS52YWx1ZS55LGEudmFsdWUueixhLnZhbHVlLncpOlwic2FtcGxlcjJEXCI9PT1hLnR5cGUmJihhLl9pbml0PyhjLmFjdGl2ZVRleHR1cmUoY1tcIlRFWFRVUkVcIit0aGlzLnRleHR1cmVDb3VudF0pLGMuYmluZFRleHR1cmUoYy5URVhUVVJFXzJELGEudmFsdWUuYmFzZVRleHR1cmUuX2dsVGV4dHVyZXNbYy5pZF18fGIuY3JlYXRlV2ViR0xUZXh0dXJlKGEudmFsdWUuYmFzZVRleHR1cmUsYykpLGMudW5pZm9ybTFpKGEudW5pZm9ybUxvY2F0aW9uLHRoaXMudGV4dHVyZUNvdW50KSx0aGlzLnRleHR1cmVDb3VudCsrKTp0aGlzLmluaXRTYW1wbGVyMkQoYSkpfSxiLlBpeGlTaGFkZXIucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmdsLmRlbGV0ZVByb2dyYW0odGhpcy5wcm9ncmFtKSx0aGlzLnVuaWZvcm1zPW51bGwsdGhpcy5nbD1udWxsLHRoaXMuYXR0cmlidXRlcz1udWxsfSxiLlBpeGlTaGFkZXIuZGVmYXVsdFZlcnRleFNyYz1bXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXCJhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFwiYXR0cmlidXRlIHZlYzIgYUNvbG9yO1wiLFwidW5pZm9ybSB2ZWMyIHByb2plY3Rpb25WZWN0b3I7XCIsXCJ1bmlmb3JtIHZlYzIgb2Zmc2V0VmVjdG9yO1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwiY29uc3QgdmVjMiBjZW50ZXIgPSB2ZWMyKC0xLjAsIDEuMCk7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCAoKGFWZXJ0ZXhQb3NpdGlvbiArIG9mZnNldFZlY3RvcikgLyBwcm9qZWN0aW9uVmVjdG9yKSArIGNlbnRlciAsIDAuMCwgMS4wKTtcIixcIiAgIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiLFwiICAgdmVjMyBjb2xvciA9IG1vZCh2ZWMzKGFDb2xvci55LzY1NTM2LjAsIGFDb2xvci55LzI1Ni4wLCBhQ29sb3IueSksIDI1Ni4wKSAvIDI1Ni4wO1wiLFwiICAgdkNvbG9yID0gdmVjNChjb2xvciAqIGFDb2xvci54LCBhQ29sb3IueCk7XCIsXCJ9XCJdLGIuUGl4aUZhc3RTaGFkZXI9ZnVuY3Rpb24oYSl7dGhpcy5fVUlEPWIuX1VJRCsrLHRoaXMuZ2w9YSx0aGlzLnByb2dyYW09bnVsbCx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBsb3dwIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIGZsb2F0IHZDb2xvcjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCkgKiB2Q29sb3IgO1wiLFwifVwiXSx0aGlzLnZlcnRleFNyYz1bXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXCJhdHRyaWJ1dGUgdmVjMiBhUG9zaXRpb25Db29yZDtcIixcImF0dHJpYnV0ZSB2ZWMyIGFTY2FsZTtcIixcImF0dHJpYnV0ZSBmbG9hdCBhUm90YXRpb247XCIsXCJhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1wiLFwiYXR0cmlidXRlIGZsb2F0IGFDb2xvcjtcIixcInVuaWZvcm0gdmVjMiBwcm9qZWN0aW9uVmVjdG9yO1wiLFwidW5pZm9ybSB2ZWMyIG9mZnNldFZlY3RvcjtcIixcInVuaWZvcm0gbWF0MyB1TWF0cml4O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIGZsb2F0IHZDb2xvcjtcIixcImNvbnN0IHZlYzIgY2VudGVyID0gdmVjMigtMS4wLCAxLjApO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzIgdjtcIixcIiAgIHZlYzIgc3YgPSBhVmVydGV4UG9zaXRpb24gKiBhU2NhbGU7XCIsXCIgICB2LnggPSAoc3YueCkgKiBjb3MoYVJvdGF0aW9uKSAtIChzdi55KSAqIHNpbihhUm90YXRpb24pO1wiLFwiICAgdi55ID0gKHN2LngpICogc2luKGFSb3RhdGlvbikgKyAoc3YueSkgKiBjb3MoYVJvdGF0aW9uKTtcIixcIiAgIHYgPSAoIHVNYXRyaXggKiB2ZWMzKHYgKyBhUG9zaXRpb25Db29yZCAsIDEuMCkgKS54eSA7XCIsXCIgICBnbF9Qb3NpdGlvbiA9IHZlYzQoICggdiAvIHByb2plY3Rpb25WZWN0b3IpICsgY2VudGVyICwgMC4wLCAxLjApO1wiLFwiICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCIsXCIgICB2Q29sb3IgPSBhQ29sb3I7XCIsXCJ9XCJdLHRoaXMudGV4dHVyZUNvdW50PTAsdGhpcy5pbml0KCl9LGIuUGl4aUZhc3RTaGFkZXIucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsLGM9Yi5jb21waWxlUHJvZ3JhbShhLHRoaXMudmVydGV4U3JjLHRoaXMuZnJhZ21lbnRTcmMpO2EudXNlUHJvZ3JhbShjKSx0aGlzLnVTYW1wbGVyPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJ1U2FtcGxlclwiKSx0aGlzLnByb2plY3Rpb25WZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInByb2plY3Rpb25WZWN0b3JcIiksdGhpcy5vZmZzZXRWZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcIm9mZnNldFZlY3RvclwiKSx0aGlzLmRpbWVuc2lvbnM9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcImRpbWVuc2lvbnNcIiksdGhpcy51TWF0cml4PWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJ1TWF0cml4XCIpLHRoaXMuYVZlcnRleFBvc2l0aW9uPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFWZXJ0ZXhQb3NpdGlvblwiKSx0aGlzLmFQb3NpdGlvbkNvb3JkPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFQb3NpdGlvbkNvb3JkXCIpLHRoaXMuYVNjYWxlPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFTY2FsZVwiKSx0aGlzLmFSb3RhdGlvbj1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhUm90YXRpb25cIiksdGhpcy5hVGV4dHVyZUNvb3JkPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFUZXh0dXJlQ29vcmRcIiksdGhpcy5jb2xvckF0dHJpYnV0ZT1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhQ29sb3JcIiksLTE9PT10aGlzLmNvbG9yQXR0cmlidXRlJiYodGhpcy5jb2xvckF0dHJpYnV0ZT0yKSx0aGlzLmF0dHJpYnV0ZXM9W3RoaXMuYVZlcnRleFBvc2l0aW9uLHRoaXMuYVBvc2l0aW9uQ29vcmQsdGhpcy5hU2NhbGUsdGhpcy5hUm90YXRpb24sdGhpcy5hVGV4dHVyZUNvb3JkLHRoaXMuY29sb3JBdHRyaWJ1dGVdLHRoaXMucHJvZ3JhbT1jfSxiLlBpeGlGYXN0U2hhZGVyLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSksdGhpcy51bmlmb3Jtcz1udWxsLHRoaXMuZ2w9bnVsbCx0aGlzLmF0dHJpYnV0ZXM9bnVsbH0sYi5TdHJpcFNoYWRlcj1mdW5jdGlvbihhKXt0aGlzLl9VSUQ9Yi5fVUlEKyssdGhpcy5nbD1hLHRoaXMucHJvZ3JhbT1udWxsLHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInVuaWZvcm0gZmxvYXQgYWxwaGE7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54LCB2VGV4dHVyZUNvb3JkLnkpKTtcIixcIn1cIl0sdGhpcy52ZXJ0ZXhTcmM9W1wiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcInVuaWZvcm0gbWF0MyB0cmFuc2xhdGlvbk1hdHJpeDtcIixcInVuaWZvcm0gdmVjMiBwcm9qZWN0aW9uVmVjdG9yO1wiLFwidW5pZm9ybSB2ZWMyIG9mZnNldFZlY3RvcjtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzMgdiA9IHRyYW5zbGF0aW9uTWF0cml4ICogdmVjMyhhVmVydGV4UG9zaXRpb24gLCAxLjApO1wiLFwiICAgdiAtPSBvZmZzZXRWZWN0b3IueHl4O1wiLFwiICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCB2LnggLyBwcm9qZWN0aW9uVmVjdG9yLnggLTEuMCwgdi55IC8gLXByb2plY3Rpb25WZWN0b3IueSArIDEuMCAsIDAuMCwgMS4wKTtcIixcIiAgIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiLFwifVwiXSx0aGlzLmluaXQoKX0sYi5TdHJpcFNoYWRlci5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2wsYz1iLmNvbXBpbGVQcm9ncmFtKGEsdGhpcy52ZXJ0ZXhTcmMsdGhpcy5mcmFnbWVudFNyYyk7YS51c2VQcm9ncmFtKGMpLHRoaXMudVNhbXBsZXI9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInVTYW1wbGVyXCIpLHRoaXMucHJvamVjdGlvblZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwicHJvamVjdGlvblZlY3RvclwiKSx0aGlzLm9mZnNldFZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwib2Zmc2V0VmVjdG9yXCIpLHRoaXMuY29sb3JBdHRyaWJ1dGU9YS5nZXRBdHRyaWJMb2NhdGlvbihjLFwiYUNvbG9yXCIpLHRoaXMuYVZlcnRleFBvc2l0aW9uPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFWZXJ0ZXhQb3NpdGlvblwiKSx0aGlzLmFUZXh0dXJlQ29vcmQ9YS5nZXRBdHRyaWJMb2NhdGlvbihjLFwiYVRleHR1cmVDb29yZFwiKSx0aGlzLmF0dHJpYnV0ZXM9W3RoaXMuYVZlcnRleFBvc2l0aW9uLHRoaXMuYVRleHR1cmVDb29yZF0sdGhpcy50cmFuc2xhdGlvbk1hdHJpeD1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwidHJhbnNsYXRpb25NYXRyaXhcIiksdGhpcy5hbHBoYT1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwiYWxwaGFcIiksdGhpcy5wcm9ncmFtPWN9LGIuUHJpbWl0aXZlU2hhZGVyPWZ1bmN0aW9uKGEpe3RoaXMuX1VJRD1iLl9VSUQrKyx0aGlzLmdsPWEsdGhpcy5wcm9ncmFtPW51bGwsdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdkNvbG9yO1wiLFwifVwiXSx0aGlzLnZlcnRleFNyYz1bXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXCJhdHRyaWJ1dGUgdmVjNCBhQ29sb3I7XCIsXCJ1bmlmb3JtIG1hdDMgdHJhbnNsYXRpb25NYXRyaXg7XCIsXCJ1bmlmb3JtIHZlYzIgcHJvamVjdGlvblZlY3RvcjtcIixcInVuaWZvcm0gdmVjMiBvZmZzZXRWZWN0b3I7XCIsXCJ1bmlmb3JtIGZsb2F0IGFscGhhO1wiLFwidW5pZm9ybSB2ZWMzIHRpbnQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzMgdiA9IHRyYW5zbGF0aW9uTWF0cml4ICogdmVjMyhhVmVydGV4UG9zaXRpb24gLCAxLjApO1wiLFwiICAgdiAtPSBvZmZzZXRWZWN0b3IueHl4O1wiLFwiICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCB2LnggLyBwcm9qZWN0aW9uVmVjdG9yLnggLTEuMCwgdi55IC8gLXByb2plY3Rpb25WZWN0b3IueSArIDEuMCAsIDAuMCwgMS4wKTtcIixcIiAgIHZDb2xvciA9IGFDb2xvciAqIHZlYzQodGludCAqIGFscGhhLCBhbHBoYSk7XCIsXCJ9XCJdLHRoaXMuaW5pdCgpfSxiLlByaW1pdGl2ZVNoYWRlci5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2wsYz1iLmNvbXBpbGVQcm9ncmFtKGEsdGhpcy52ZXJ0ZXhTcmMsdGhpcy5mcmFnbWVudFNyYyk7YS51c2VQcm9ncmFtKGMpLHRoaXMucHJvamVjdGlvblZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwicHJvamVjdGlvblZlY3RvclwiKSx0aGlzLm9mZnNldFZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwib2Zmc2V0VmVjdG9yXCIpLHRoaXMudGludENvbG9yPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJ0aW50XCIpLHRoaXMuYVZlcnRleFBvc2l0aW9uPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFWZXJ0ZXhQb3NpdGlvblwiKSx0aGlzLmNvbG9yQXR0cmlidXRlPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFDb2xvclwiKSx0aGlzLmF0dHJpYnV0ZXM9W3RoaXMuYVZlcnRleFBvc2l0aW9uLHRoaXMuY29sb3JBdHRyaWJ1dGVdLHRoaXMudHJhbnNsYXRpb25NYXRyaXg9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInRyYW5zbGF0aW9uTWF0cml4XCIpLHRoaXMuYWxwaGE9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcImFscGhhXCIpLHRoaXMucHJvZ3JhbT1jfSxiLlByaW1pdGl2ZVNoYWRlci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLnByb2dyYW0pLHRoaXMudW5pZm9ybXM9bnVsbCx0aGlzLmdsPW51bGwsdGhpcy5hdHRyaWJ1dGU9bnVsbH0sYi5Db21wbGV4UHJpbWl0aXZlU2hhZGVyPWZ1bmN0aW9uKGEpe3RoaXMuX1VJRD1iLl9VSUQrKyx0aGlzLmdsPWEsdGhpcy5wcm9ncmFtPW51bGwsdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdkNvbG9yO1wiLFwifVwiXSx0aGlzLnZlcnRleFNyYz1bXCJhdHRyaWJ1dGUgdmVjMiBhVmVydGV4UG9zaXRpb247XCIsXCJ1bmlmb3JtIG1hdDMgdHJhbnNsYXRpb25NYXRyaXg7XCIsXCJ1bmlmb3JtIHZlYzIgcHJvamVjdGlvblZlY3RvcjtcIixcInVuaWZvcm0gdmVjMiBvZmZzZXRWZWN0b3I7XCIsXCJ1bmlmb3JtIHZlYzMgdGludDtcIixcInVuaWZvcm0gZmxvYXQgYWxwaGE7XCIsXCJ1bmlmb3JtIHZlYzMgY29sb3I7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzMgdiA9IHRyYW5zbGF0aW9uTWF0cml4ICogdmVjMyhhVmVydGV4UG9zaXRpb24gLCAxLjApO1wiLFwiICAgdiAtPSBvZmZzZXRWZWN0b3IueHl4O1wiLFwiICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCB2LnggLyBwcm9qZWN0aW9uVmVjdG9yLnggLTEuMCwgdi55IC8gLXByb2plY3Rpb25WZWN0b3IueSArIDEuMCAsIDAuMCwgMS4wKTtcIixcIiAgIHZDb2xvciA9IHZlYzQoY29sb3IgKiBhbHBoYSAqIHRpbnQsIGFscGhhKTtcIixcIn1cIl0sdGhpcy5pbml0KCl9LGIuQ29tcGxleFByaW1pdGl2ZVNoYWRlci5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2wsYz1iLmNvbXBpbGVQcm9ncmFtKGEsdGhpcy52ZXJ0ZXhTcmMsdGhpcy5mcmFnbWVudFNyYyk7YS51c2VQcm9ncmFtKGMpLHRoaXMucHJvamVjdGlvblZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwicHJvamVjdGlvblZlY3RvclwiKSx0aGlzLm9mZnNldFZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwib2Zmc2V0VmVjdG9yXCIpLHRoaXMudGludENvbG9yPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJ0aW50XCIpLHRoaXMuY29sb3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcImNvbG9yXCIpLHRoaXMuYVZlcnRleFBvc2l0aW9uPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFWZXJ0ZXhQb3NpdGlvblwiKSx0aGlzLmF0dHJpYnV0ZXM9W3RoaXMuYVZlcnRleFBvc2l0aW9uLHRoaXMuY29sb3JBdHRyaWJ1dGVdLHRoaXMudHJhbnNsYXRpb25NYXRyaXg9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInRyYW5zbGF0aW9uTWF0cml4XCIpLHRoaXMuYWxwaGE9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcImFscGhhXCIpLHRoaXMucHJvZ3JhbT1jfSxiLkNvbXBsZXhQcmltaXRpdmVTaGFkZXIucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmdsLmRlbGV0ZVByb2dyYW0odGhpcy5wcm9ncmFtKSx0aGlzLnVuaWZvcm1zPW51bGwsdGhpcy5nbD1udWxsLHRoaXMuYXR0cmlidXRlPW51bGx9LGIuV2ViR0xHcmFwaGljcz1mdW5jdGlvbigpe30sYi5XZWJHTEdyYXBoaWNzLnJlbmRlckdyYXBoaWNzPWZ1bmN0aW9uKGEsYyl7dmFyIGQsZT1jLmdsLGY9Yy5wcm9qZWN0aW9uLGc9Yy5vZmZzZXQsaD1jLnNoYWRlck1hbmFnZXIucHJpbWl0aXZlU2hhZGVyO2EuZGlydHkmJmIuV2ViR0xHcmFwaGljcy51cGRhdGVHcmFwaGljcyhhLGUpO2Zvcih2YXIgaT1hLl93ZWJHTFtlLmlkXSxqPTA7ajxpLmRhdGEubGVuZ3RoO2orKykxPT09aS5kYXRhW2pdLm1vZGU/KGQ9aS5kYXRhW2pdLGMuc3RlbmNpbE1hbmFnZXIucHVzaFN0ZW5jaWwoYSxkLGMpLGUuZHJhd0VsZW1lbnRzKGUuVFJJQU5HTEVfRkFOLDQsZS5VTlNJR05FRF9TSE9SVCwyKihkLmluZGljZXMubGVuZ3RoLTQpKSxjLnN0ZW5jaWxNYW5hZ2VyLnBvcFN0ZW5jaWwoYSxkLGMpLHRoaXMubGFzdD1kLm1vZGUpOihkPWkuZGF0YVtqXSxjLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKGgpLGg9Yy5zaGFkZXJNYW5hZ2VyLnByaW1pdGl2ZVNoYWRlcixlLnVuaWZvcm1NYXRyaXgzZnYoaC50cmFuc2xhdGlvbk1hdHJpeCwhMSxhLndvcmxkVHJhbnNmb3JtLnRvQXJyYXkoITApKSxlLnVuaWZvcm0yZihoLnByb2plY3Rpb25WZWN0b3IsZi54LC1mLnkpLGUudW5pZm9ybTJmKGgub2Zmc2V0VmVjdG9yLC1nLngsLWcueSksZS51bmlmb3JtM2Z2KGgudGludENvbG9yLGIuaGV4MnJnYihhLnRpbnQpKSxlLnVuaWZvcm0xZihoLmFscGhhLGEud29ybGRBbHBoYSksZS5iaW5kQnVmZmVyKGUuQVJSQVlfQlVGRkVSLGQuYnVmZmVyKSxlLnZlcnRleEF0dHJpYlBvaW50ZXIoaC5hVmVydGV4UG9zaXRpb24sMixlLkZMT0FULCExLDI0LDApLGUudmVydGV4QXR0cmliUG9pbnRlcihoLmNvbG9yQXR0cmlidXRlLDQsZS5GTE9BVCwhMSwyNCw4KSxlLmJpbmRCdWZmZXIoZS5FTEVNRU5UX0FSUkFZX0JVRkZFUixkLmluZGV4QnVmZmVyKSxlLmRyYXdFbGVtZW50cyhlLlRSSUFOR0xFX1NUUklQLGQuaW5kaWNlcy5sZW5ndGgsZS5VTlNJR05FRF9TSE9SVCwwKSl9LGIuV2ViR0xHcmFwaGljcy51cGRhdGVHcmFwaGljcz1mdW5jdGlvbihhLGMpe3ZhciBkPWEuX3dlYkdMW2MuaWRdO2R8fChkPWEuX3dlYkdMW2MuaWRdPXtsYXN0SW5kZXg6MCxkYXRhOltdLGdsOmN9KSxhLmRpcnR5PSExO3ZhciBlO2lmKGEuY2xlYXJEaXJ0eSl7Zm9yKGEuY2xlYXJEaXJ0eT0hMSxlPTA7ZTxkLmRhdGEubGVuZ3RoO2UrKyl7dmFyIGY9ZC5kYXRhW2VdO2YucmVzZXQoKSxiLldlYkdMR3JhcGhpY3MuZ3JhcGhpY3NEYXRhUG9vbC5wdXNoKGYpfWQuZGF0YT1bXSxkLmxhc3RJbmRleD0wfXZhciBnO2ZvcihlPWQubGFzdEluZGV4O2U8YS5ncmFwaGljc0RhdGEubGVuZ3RoO2UrKyl7dmFyIGg9YS5ncmFwaGljc0RhdGFbZV07aC50eXBlPT09Yi5HcmFwaGljcy5QT0xZPyhoLmZpbGwmJmgucG9pbnRzLmxlbmd0aD42JiYoaC5wb2ludHMubGVuZ3RoPjEwPyhnPWIuV2ViR0xHcmFwaGljcy5zd2l0Y2hNb2RlKGQsMSksYi5XZWJHTEdyYXBoaWNzLmJ1aWxkQ29tcGxleFBvbHkoaCxnKSk6KGc9Yi5XZWJHTEdyYXBoaWNzLnN3aXRjaE1vZGUoZCwwKSxiLldlYkdMR3JhcGhpY3MuYnVpbGRQb2x5KGgsZykpKSxoLmxpbmVXaWR0aD4wJiYoZz1iLldlYkdMR3JhcGhpY3Muc3dpdGNoTW9kZShkLDApLGIuV2ViR0xHcmFwaGljcy5idWlsZExpbmUoaCxnKSkpOihnPWIuV2ViR0xHcmFwaGljcy5zd2l0Y2hNb2RlKGQsMCksaC50eXBlPT09Yi5HcmFwaGljcy5SRUNUP2IuV2ViR0xHcmFwaGljcy5idWlsZFJlY3RhbmdsZShoLGcpOmgudHlwZT09PWIuR3JhcGhpY3MuQ0lSQ3x8aC50eXBlPT09Yi5HcmFwaGljcy5FTElQP2IuV2ViR0xHcmFwaGljcy5idWlsZENpcmNsZShoLGcpOmgudHlwZT09PWIuR3JhcGhpY3MuUlJFQyYmYi5XZWJHTEdyYXBoaWNzLmJ1aWxkUm91bmRlZFJlY3RhbmdsZShoLGcpKSxkLmxhc3RJbmRleCsrfWZvcihlPTA7ZTxkLmRhdGEubGVuZ3RoO2UrKylnPWQuZGF0YVtlXSxnLmRpcnR5JiZnLnVwbG9hZCgpfSxiLldlYkdMR3JhcGhpY3Muc3dpdGNoTW9kZT1mdW5jdGlvbihhLGMpe3ZhciBkO3JldHVybiBhLmRhdGEubGVuZ3RoPyhkPWEuZGF0YVthLmRhdGEubGVuZ3RoLTFdLChkLm1vZGUhPT1jfHwxPT09YykmJihkPWIuV2ViR0xHcmFwaGljcy5ncmFwaGljc0RhdGFQb29sLnBvcCgpfHxuZXcgYi5XZWJHTEdyYXBoaWNzRGF0YShhLmdsKSxkLm1vZGU9YyxhLmRhdGEucHVzaChkKSkpOihkPWIuV2ViR0xHcmFwaGljcy5ncmFwaGljc0RhdGFQb29sLnBvcCgpfHxuZXcgYi5XZWJHTEdyYXBoaWNzRGF0YShhLmdsKSxkLm1vZGU9YyxhLmRhdGEucHVzaChkKSksZC5kaXJ0eT0hMCxkfSxiLldlYkdMR3JhcGhpY3MuYnVpbGRSZWN0YW5nbGU9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLnBvaW50cyxlPWRbMF0sZj1kWzFdLGc9ZFsyXSxoPWRbM107aWYoYS5maWxsKXt2YXIgaT1iLmhleDJyZ2IoYS5maWxsQ29sb3IpLGo9YS5maWxsQWxwaGEsaz1pWzBdKmosbD1pWzFdKmosbT1pWzJdKmosbj1jLnBvaW50cyxvPWMuaW5kaWNlcyxwPW4ubGVuZ3RoLzY7bi5wdXNoKGUsZiksbi5wdXNoKGssbCxtLGopLG4ucHVzaChlK2csZiksbi5wdXNoKGssbCxtLGopLG4ucHVzaChlLGYraCksbi5wdXNoKGssbCxtLGopLG4ucHVzaChlK2csZitoKSxuLnB1c2goayxsLG0saiksby5wdXNoKHAscCxwKzEscCsyLHArMyxwKzMpfWlmKGEubGluZVdpZHRoKXt2YXIgcT1hLnBvaW50czthLnBvaW50cz1bZSxmLGUrZyxmLGUrZyxmK2gsZSxmK2gsZSxmXSxiLldlYkdMR3JhcGhpY3MuYnVpbGRMaW5lKGEsYyksYS5wb2ludHM9cX19LGIuV2ViR0xHcmFwaGljcy5idWlsZFJvdW5kZWRSZWN0YW5nbGU9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLnBvaW50cyxlPWRbMF0sZj1kWzFdLGc9ZFsyXSxoPWRbM10saT1kWzRdLGo9W107aWYoai5wdXNoKGUsZitpKSxqPWouY29uY2F0KGIuV2ViR0xHcmFwaGljcy5xdWFkcmF0aWNCZXppZXJDdXJ2ZShlLGYraC1pLGUsZitoLGUraSxmK2gpKSxqPWouY29uY2F0KGIuV2ViR0xHcmFwaGljcy5xdWFkcmF0aWNCZXppZXJDdXJ2ZShlK2ctaSxmK2gsZStnLGYraCxlK2csZitoLWkpKSxqPWouY29uY2F0KGIuV2ViR0xHcmFwaGljcy5xdWFkcmF0aWNCZXppZXJDdXJ2ZShlK2csZitpLGUrZyxmLGUrZy1pLGYpKSxqPWouY29uY2F0KGIuV2ViR0xHcmFwaGljcy5xdWFkcmF0aWNCZXppZXJDdXJ2ZShlK2ksZixlLGYsZSxmK2kpKSxhLmZpbGwpe3ZhciBrPWIuaGV4MnJnYihhLmZpbGxDb2xvciksbD1hLmZpbGxBbHBoYSxtPWtbMF0qbCxuPWtbMV0qbCxvPWtbMl0qbCxwPWMucG9pbnRzLHE9Yy5pbmRpY2VzLHI9cC5sZW5ndGgvNixzPWIuUG9seUsuVHJpYW5ndWxhdGUoaiksdD0wO2Zvcih0PTA7dDxzLmxlbmd0aDt0Kz0zKXEucHVzaChzW3RdK3IpLHEucHVzaChzW3RdK3IpLHEucHVzaChzW3QrMV0rcikscS5wdXNoKHNbdCsyXStyKSxxLnB1c2goc1t0KzJdK3IpO2Zvcih0PTA7dDxqLmxlbmd0aDt0KyspcC5wdXNoKGpbdF0salsrK3RdLG0sbixvLGwpfWlmKGEubGluZVdpZHRoKXt2YXIgdT1hLnBvaW50czthLnBvaW50cz1qLGIuV2ViR0xHcmFwaGljcy5idWlsZExpbmUoYSxjKSxhLnBvaW50cz11fX0sYi5XZWJHTEdyYXBoaWNzLnF1YWRyYXRpY0JlemllckN1cnZlPWZ1bmN0aW9uKGEsYixjLGQsZSxmKXtmdW5jdGlvbiBnKGEsYixjKXt2YXIgZD1iLWE7cmV0dXJuIGErZCpjfWZvcih2YXIgaCxpLGosayxsLG0sbj0yMCxvPVtdLHA9MCxxPTA7bj49cTtxKyspcD1xL24saD1nKGEsYyxwKSxpPWcoYixkLHApLGo9ZyhjLGUscCksaz1nKGQsZixwKSxsPWcoaCxqLHApLG09ZyhpLGsscCksby5wdXNoKGwsbSk7cmV0dXJuIG99LGIuV2ViR0xHcmFwaGljcy5idWlsZENpcmNsZT1mdW5jdGlvbihhLGMpe3ZhciBkPWEucG9pbnRzLGU9ZFswXSxmPWRbMV0sZz1kWzJdLGg9ZFszXSxpPTQwLGo9MipNYXRoLlBJL2ksaz0wO2lmKGEuZmlsbCl7dmFyIGw9Yi5oZXgycmdiKGEuZmlsbENvbG9yKSxtPWEuZmlsbEFscGhhLG49bFswXSptLG89bFsxXSptLHA9bFsyXSptLHE9Yy5wb2ludHMscj1jLmluZGljZXMscz1xLmxlbmd0aC82O2ZvcihyLnB1c2gocyksaz0wO2krMT5rO2srKylxLnB1c2goZSxmLG4sbyxwLG0pLHEucHVzaChlK01hdGguc2luKGoqaykqZyxmK01hdGguY29zKGoqaykqaCxuLG8scCxtKSxyLnB1c2gocysrLHMrKyk7ci5wdXNoKHMtMSl9aWYoYS5saW5lV2lkdGgpe3ZhciB0PWEucG9pbnRzO2ZvcihhLnBvaW50cz1bXSxrPTA7aSsxPms7aysrKWEucG9pbnRzLnB1c2goZStNYXRoLnNpbihqKmspKmcsZitNYXRoLmNvcyhqKmspKmgpO2IuV2ViR0xHcmFwaGljcy5idWlsZExpbmUoYSxjKSxhLnBvaW50cz10fX0sYi5XZWJHTEdyYXBoaWNzLmJ1aWxkTGluZT1mdW5jdGlvbihhLGMpe3ZhciBkPTAsZT1hLnBvaW50cztpZigwIT09ZS5sZW5ndGgpe2lmKGEubGluZVdpZHRoJTIpZm9yKGQ9MDtkPGUubGVuZ3RoO2QrKyllW2RdKz0uNTt2YXIgZj1uZXcgYi5Qb2ludChlWzBdLGVbMV0pLGc9bmV3IGIuUG9pbnQoZVtlLmxlbmd0aC0yXSxlW2UubGVuZ3RoLTFdKTtpZihmLng9PT1nLngmJmYueT09PWcueSl7ZT1lLnNsaWNlKCksZS5wb3AoKSxlLnBvcCgpLGc9bmV3IGIuUG9pbnQoZVtlLmxlbmd0aC0yXSxlW2UubGVuZ3RoLTFdKTt2YXIgaD1nLngrLjUqKGYueC1nLngpLGk9Zy55Ky41KihmLnktZy55KTtlLnVuc2hpZnQoaCxpKSxlLnB1c2goaCxpKX12YXIgaixrLGwsbSxuLG8scCxxLHIscyx0LHUsdix3LHgseSx6LEEsQixDLEQsRSxGLEc9Yy5wb2ludHMsSD1jLmluZGljZXMsST1lLmxlbmd0aC8yLEo9ZS5sZW5ndGgsSz1HLmxlbmd0aC82LEw9YS5saW5lV2lkdGgvMixNPWIuaGV4MnJnYihhLmxpbmVDb2xvciksTj1hLmxpbmVBbHBoYSxPPU1bMF0qTixQPU1bMV0qTixRPU1bMl0qTjtmb3IobD1lWzBdLG09ZVsxXSxuPWVbMl0sbz1lWzNdLHI9LShtLW8pLHM9bC1uLEY9TWF0aC5zcXJ0KHIqcitzKnMpLHIvPUYscy89RixyKj1MLHMqPUwsRy5wdXNoKGwtcixtLXMsTyxQLFEsTiksRy5wdXNoKGwrcixtK3MsTyxQLFEsTiksZD0xO0ktMT5kO2QrKylsPWVbMiooZC0xKV0sbT1lWzIqKGQtMSkrMV0sbj1lWzIqZF0sbz1lWzIqZCsxXSxwPWVbMiooZCsxKV0scT1lWzIqKGQrMSkrMV0scj0tKG0tbykscz1sLW4sRj1NYXRoLnNxcnQocipyK3Mqcyksci89RixzLz1GLHIqPUwscyo9TCx0PS0oby1xKSx1PW4tcCxGPU1hdGguc3FydCh0KnQrdSp1KSx0Lz1GLHUvPUYsdCo9TCx1Kj1MLHg9LXMrbS0oLXMrbykseT0tcituLSgtcitsKSx6PSgtcitsKSooLXMrbyktKC1yK24pKigtcyttKSxBPS11K3EtKC11K28pLEI9LXQrbi0oLXQrcCksQz0oLXQrcCkqKC11K28pLSgtdCtuKSooLXUrcSksRD14KkItQSp5LE1hdGguYWJzKEQpPC4xPyhEKz0xMC4xLEcucHVzaChuLXIsby1zLE8sUCxRLE4pLEcucHVzaChuK3IsbytzLE8sUCxRLE4pKTooaj0oeSpDLUIqeikvRCxrPShBKnoteCpDKS9ELEU9KGotbikqKGotbikrKGstbykrKGstbyksRT4xOTYwMD8odj1yLXQsdz1zLXUsRj1NYXRoLnNxcnQodip2K3cqdyksdi89Rix3Lz1GLHYqPUwsdyo9TCxHLnB1c2gobi12LG8tdyksRy5wdXNoKE8sUCxRLE4pLEcucHVzaChuK3Ysbyt3KSxHLnB1c2goTyxQLFEsTiksRy5wdXNoKG4tdixvLXcpLEcucHVzaChPLFAsUSxOKSxKKyspOihHLnB1c2goaixrKSxHLnB1c2goTyxQLFEsTiksRy5wdXNoKG4tKGotbiksby0oay1vKSksRy5wdXNoKE8sUCxRLE4pKSk7Zm9yKGw9ZVsyKihJLTIpXSxtPWVbMiooSS0yKSsxXSxuPWVbMiooSS0xKV0sbz1lWzIqKEktMSkrMV0scj0tKG0tbykscz1sLW4sRj1NYXRoLnNxcnQocipyK3Mqcyksci89RixzLz1GLHIqPUwscyo9TCxHLnB1c2gobi1yLG8tcyksRy5wdXNoKE8sUCxRLE4pLEcucHVzaChuK3IsbytzKSxHLnB1c2goTyxQLFEsTiksSC5wdXNoKEspLGQ9MDtKPmQ7ZCsrKUgucHVzaChLKyspO0gucHVzaChLLTEpfX0sYi5XZWJHTEdyYXBoaWNzLmJ1aWxkQ29tcGxleFBvbHk9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLnBvaW50cy5zbGljZSgpO2lmKCEoZC5sZW5ndGg8Nikpe3ZhciBlPWMuaW5kaWNlcztjLnBvaW50cz1kLGMuYWxwaGE9YS5maWxsQWxwaGEsYy5jb2xvcj1iLmhleDJyZ2IoYS5maWxsQ29sb3IpO2Zvcih2YXIgZixnLGg9MS8wLGk9LTEvMCxqPTEvMCxrPS0xLzAsbD0wO2w8ZC5sZW5ndGg7bCs9MilmPWRbbF0sZz1kW2wrMV0saD1oPmY/ZjpoLGk9Zj5pP2Y6aSxqPWo+Zz9nOmosaz1nPms/ZzprO2QucHVzaChoLGosaSxqLGksayxoLGspO3ZhciBtPWQubGVuZ3RoLzI7Zm9yKGw9MDttPmw7bCsrKWUucHVzaChsKX19LGIuV2ViR0xHcmFwaGljcy5idWlsZFBvbHk9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLnBvaW50cztpZighKGQubGVuZ3RoPDYpKXt2YXIgZT1jLnBvaW50cyxmPWMuaW5kaWNlcyxnPWQubGVuZ3RoLzIsaD1iLmhleDJyZ2IoYS5maWxsQ29sb3IpLGk9YS5maWxsQWxwaGEsaj1oWzBdKmksaz1oWzFdKmksbD1oWzJdKmksbT1iLlBvbHlLLlRyaWFuZ3VsYXRlKGQpLG49ZS5sZW5ndGgvNixvPTA7Zm9yKG89MDtvPG0ubGVuZ3RoO28rPTMpZi5wdXNoKG1bb10rbiksZi5wdXNoKG1bb10rbiksZi5wdXNoKG1bbysxXStuKSxmLnB1c2gobVtvKzJdK24pLGYucHVzaChtW28rMl0rbik7Zm9yKG89MDtnPm87bysrKWUucHVzaChkWzIqb10sZFsyKm8rMV0saixrLGwsaSl9fSxiLldlYkdMR3JhcGhpY3MuZ3JhcGhpY3NEYXRhUG9vbD1bXSxiLldlYkdMR3JhcGhpY3NEYXRhPWZ1bmN0aW9uKGEpe3RoaXMuZ2w9YSx0aGlzLmNvbG9yPVswLDAsMF0sdGhpcy5wb2ludHM9W10sdGhpcy5pbmRpY2VzPVtdLHRoaXMubGFzdEluZGV4PTAsdGhpcy5idWZmZXI9YS5jcmVhdGVCdWZmZXIoKSx0aGlzLmluZGV4QnVmZmVyPWEuY3JlYXRlQnVmZmVyKCksdGhpcy5tb2RlPTEsdGhpcy5hbHBoYT0xLHRoaXMuZGlydHk9ITB9LGIuV2ViR0xHcmFwaGljc0RhdGEucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKCl7dGhpcy5wb2ludHM9W10sdGhpcy5pbmRpY2VzPVtdLHRoaXMubGFzdEluZGV4PTB9LGIuV2ViR0xHcmFwaGljc0RhdGEucHJvdG90eXBlLnVwbG9hZD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2w7dGhpcy5nbFBvaW50cz1uZXcgRmxvYXQzMkFycmF5KHRoaXMucG9pbnRzKSxhLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy5idWZmZXIpLGEuYnVmZmVyRGF0YShhLkFSUkFZX0JVRkZFUix0aGlzLmdsUG9pbnRzLGEuU1RBVElDX0RSQVcpLHRoaXMuZ2xJbmRpY2llcz1uZXcgVWludDE2QXJyYXkodGhpcy5pbmRpY2VzKSxhLmJpbmRCdWZmZXIoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGV4QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmdsSW5kaWNpZXMsYS5TVEFUSUNfRFJBVyksdGhpcy5kaXJ0eT0hMX0sYi5nbENvbnRleHRzPVtdLGIuV2ViR0xSZW5kZXJlcj1mdW5jdGlvbihhLGMsZCxlLGYsZyl7Yi5kZWZhdWx0UmVuZGVyZXJ8fChiLnNheUhlbGxvKFwid2ViR0xcIiksYi5kZWZhdWx0UmVuZGVyZXI9dGhpcyksdGhpcy50eXBlPWIuV0VCR0xfUkVOREVSRVIsdGhpcy50cmFuc3BhcmVudD0hIWUsdGhpcy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXI9Zyx0aGlzLndpZHRoPWF8fDgwMCx0aGlzLmhlaWdodD1jfHw2MDAsdGhpcy52aWV3PWR8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksdGhpcy52aWV3LndpZHRoPXRoaXMud2lkdGgsdGhpcy52aWV3LmhlaWdodD10aGlzLmhlaWdodCx0aGlzLmNvbnRleHRMb3N0PXRoaXMuaGFuZGxlQ29udGV4dExvc3QuYmluZCh0aGlzKSx0aGlzLmNvbnRleHRSZXN0b3JlZExvc3Q9dGhpcy5oYW5kbGVDb250ZXh0UmVzdG9yZWQuYmluZCh0aGlzKSx0aGlzLnZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmdsY29udGV4dGxvc3RcIix0aGlzLmNvbnRleHRMb3N0LCExKSx0aGlzLnZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmdsY29udGV4dHJlc3RvcmVkXCIsdGhpcy5jb250ZXh0UmVzdG9yZWRMb3N0LCExKSx0aGlzLm9wdGlvbnM9e2FscGhhOnRoaXMudHJhbnNwYXJlbnQsYW50aWFsaWFzOiEhZixwcmVtdWx0aXBsaWVkQWxwaGE6ISFlLHN0ZW5jaWw6ITAscHJlc2VydmVEcmF3aW5nQnVmZmVyOmd9O3ZhciBoPW51bGw7aWYoW1wiZXhwZXJpbWVudGFsLXdlYmdsXCIsXCJ3ZWJnbFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3RyeXtoPWh8fHRoaXMudmlldy5nZXRDb250ZXh0KGEsdGhpcy5vcHRpb25zKX1jYXRjaChiKXt9fSx0aGlzKSwhaCl0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB3ZWJHTC4gVHJ5IHVzaW5nIHRoZSBjYW52YXMgcmVuZGVyZXJcIit0aGlzKTt0aGlzLmdsPWgsdGhpcy5nbENvbnRleHRJZD1oLmlkPWIuV2ViR0xSZW5kZXJlci5nbENvbnRleHRJZCsrLGIuZ2xDb250ZXh0c1t0aGlzLmdsQ29udGV4dElkXT1oLGIuYmxlbmRNb2Rlc1dlYkdMfHwoYi5ibGVuZE1vZGVzV2ViR0w9W10sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLk5PUk1BTF09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLkFERF09W2guU1JDX0FMUEhBLGguRFNUX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuTVVMVElQTFldPVtoLkRTVF9DT0xPUixoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5TQ1JFRU5dPVtoLlNSQ19BTFBIQSxoLk9ORV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLk9WRVJMQVldPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5EQVJLRU5dPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5MSUdIVEVOXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuQ09MT1JfRE9ER0VdPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5DT0xPUl9CVVJOXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuSEFSRF9MSUdIVF09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLlNPRlRfTElHSFRdPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5ESUZGRVJFTkNFXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuRVhDTFVTSU9OXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuSFVFXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuU0FUVVJBVElPTl09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLkNPTE9SXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuTFVNSU5PU0lUWV09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0pLHRoaXMucHJvamVjdGlvbj1uZXcgYi5Qb2ludCx0aGlzLnByb2plY3Rpb24ueD10aGlzLndpZHRoLzIsdGhpcy5wcm9qZWN0aW9uLnk9LXRoaXMuaGVpZ2h0LzIsdGhpcy5vZmZzZXQ9bmV3IGIuUG9pbnQoMCwwKSx0aGlzLnJlc2l6ZSh0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSx0aGlzLmNvbnRleHRMb3N0PSExLHRoaXMuc2hhZGVyTWFuYWdlcj1uZXcgYi5XZWJHTFNoYWRlck1hbmFnZXIoaCksdGhpcy5zcHJpdGVCYXRjaD1uZXcgYi5XZWJHTFNwcml0ZUJhdGNoKGgpLHRoaXMubWFza01hbmFnZXI9bmV3IGIuV2ViR0xNYXNrTWFuYWdlcihoKSx0aGlzLmZpbHRlck1hbmFnZXI9bmV3IGIuV2ViR0xGaWx0ZXJNYW5hZ2VyKGgsdGhpcy50cmFuc3BhcmVudCksdGhpcy5zdGVuY2lsTWFuYWdlcj1uZXcgYi5XZWJHTFN0ZW5jaWxNYW5hZ2VyKGgpLHRoaXMuYmxlbmRNb2RlTWFuYWdlcj1uZXcgYi5XZWJHTEJsZW5kTW9kZU1hbmFnZXIoaCksdGhpcy5yZW5kZXJTZXNzaW9uPXt9LHRoaXMucmVuZGVyU2Vzc2lvbi5nbD10aGlzLmdsLHRoaXMucmVuZGVyU2Vzc2lvbi5kcmF3Q291bnQ9MCx0aGlzLnJlbmRlclNlc3Npb24uc2hhZGVyTWFuYWdlcj10aGlzLnNoYWRlck1hbmFnZXIsdGhpcy5yZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyPXRoaXMubWFza01hbmFnZXIsdGhpcy5yZW5kZXJTZXNzaW9uLmZpbHRlck1hbmFnZXI9dGhpcy5maWx0ZXJNYW5hZ2VyLHRoaXMucmVuZGVyU2Vzc2lvbi5ibGVuZE1vZGVNYW5hZ2VyPXRoaXMuYmxlbmRNb2RlTWFuYWdlcix0aGlzLnJlbmRlclNlc3Npb24uc3ByaXRlQmF0Y2g9dGhpcy5zcHJpdGVCYXRjaCx0aGlzLnJlbmRlclNlc3Npb24uc3RlbmNpbE1hbmFnZXI9dGhpcy5zdGVuY2lsTWFuYWdlcix0aGlzLnJlbmRlclNlc3Npb24ucmVuZGVyZXI9dGhpcyxoLnVzZVByb2dyYW0odGhpcy5zaGFkZXJNYW5hZ2VyLmRlZmF1bHRTaGFkZXIucHJvZ3JhbSksaC5kaXNhYmxlKGguREVQVEhfVEVTVCksaC5kaXNhYmxlKGguQ1VMTF9GQUNFKSxoLmVuYWJsZShoLkJMRU5EKSxoLmNvbG9yTWFzayghMCwhMCwhMCx0aGlzLnRyYW5zcGFyZW50KX0sYi5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLldlYkdMUmVuZGVyZXIsYi5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oYSl7aWYoIXRoaXMuY29udGV4dExvc3Qpe3RoaXMuX19zdGFnZSE9PWEmJihhLmludGVyYWN0aXZlJiZhLmludGVyYWN0aW9uTWFuYWdlci5yZW1vdmVFdmVudHMoKSx0aGlzLl9fc3RhZ2U9YSksYi5XZWJHTFJlbmRlcmVyLnVwZGF0ZVRleHR1cmVzKCksYS51cGRhdGVUcmFuc2Zvcm0oKSxhLl9pbnRlcmFjdGl2ZSYmKGEuX2ludGVyYWN0aXZlRXZlbnRzQWRkZWR8fChhLl9pbnRlcmFjdGl2ZUV2ZW50c0FkZGVkPSEwLGEuaW50ZXJhY3Rpb25NYW5hZ2VyLnNldFRhcmdldCh0aGlzKSkpO3ZhciBjPXRoaXMuZ2w7Yy52aWV3cG9ydCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCksYy5iaW5kRnJhbWVidWZmZXIoYy5GUkFNRUJVRkZFUixudWxsKSx0aGlzLnRyYW5zcGFyZW50P2MuY2xlYXJDb2xvcigwLDAsMCwwKTpjLmNsZWFyQ29sb3IoYS5iYWNrZ3JvdW5kQ29sb3JTcGxpdFswXSxhLmJhY2tncm91bmRDb2xvclNwbGl0WzFdLGEuYmFja2dyb3VuZENvbG9yU3BsaXRbMl0sMSksYy5jbGVhcihjLkNPTE9SX0JVRkZFUl9CSVQpLHRoaXMucmVuZGVyRGlzcGxheU9iamVjdChhLHRoaXMucHJvamVjdGlvbiksYS5pbnRlcmFjdGl2ZT9hLl9pbnRlcmFjdGl2ZUV2ZW50c0FkZGVkfHwoYS5faW50ZXJhY3RpdmVFdmVudHNBZGRlZD0hMCxhLmludGVyYWN0aW9uTWFuYWdlci5zZXRUYXJnZXQodGhpcykpOmEuX2ludGVyYWN0aXZlRXZlbnRzQWRkZWQmJihhLl9pbnRlcmFjdGl2ZUV2ZW50c0FkZGVkPSExLGEuaW50ZXJhY3Rpb25NYW5hZ2VyLnNldFRhcmdldCh0aGlzKSl9fSxiLldlYkdMUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckRpc3BsYXlPYmplY3Q9ZnVuY3Rpb24oYSxjLGQpe3RoaXMucmVuZGVyU2Vzc2lvbi5ibGVuZE1vZGVNYW5hZ2VyLnNldEJsZW5kTW9kZShiLmJsZW5kTW9kZXMuTk9STUFMKSx0aGlzLnJlbmRlclNlc3Npb24uZHJhd0NvdW50PTAsdGhpcy5yZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU9OTk5OSx0aGlzLnJlbmRlclNlc3Npb24ucHJvamVjdGlvbj1jLHRoaXMucmVuZGVyU2Vzc2lvbi5vZmZzZXQ9dGhpcy5vZmZzZXQsdGhpcy5zcHJpdGVCYXRjaC5iZWdpbih0aGlzLnJlbmRlclNlc3Npb24pLHRoaXMuZmlsdGVyTWFuYWdlci5iZWdpbih0aGlzLnJlbmRlclNlc3Npb24sZCksYS5fcmVuZGVyV2ViR0wodGhpcy5yZW5kZXJTZXNzaW9uKSx0aGlzLnNwcml0ZUJhdGNoLmVuZCgpfSxiLldlYkdMUmVuZGVyZXIudXBkYXRlVGV4dHVyZXM9ZnVuY3Rpb24oKXt2YXIgYT0wO2ZvcihhPTA7YTxiLlRleHR1cmUuZnJhbWVVcGRhdGVzLmxlbmd0aDthKyspYi5XZWJHTFJlbmRlcmVyLnVwZGF0ZVRleHR1cmVGcmFtZShiLlRleHR1cmUuZnJhbWVVcGRhdGVzW2FdKTtmb3IoYT0wO2E8Yi50ZXh0dXJlc1RvRGVzdHJveS5sZW5ndGg7YSsrKWIuV2ViR0xSZW5kZXJlci5kZXN0cm95VGV4dHVyZShiLnRleHR1cmVzVG9EZXN0cm95W2FdKTtiLnRleHR1cmVzVG9VcGRhdGUubGVuZ3RoPTAsYi50ZXh0dXJlc1RvRGVzdHJveS5sZW5ndGg9MCxiLlRleHR1cmUuZnJhbWVVcGRhdGVzLmxlbmd0aD0wfSxiLldlYkdMUmVuZGVyZXIuZGVzdHJveVRleHR1cmU9ZnVuY3Rpb24oYSl7Zm9yKHZhciBjPWEuX2dsVGV4dHVyZXMubGVuZ3RoLTE7Yz49MDtjLS0pe3ZhciBkPWEuX2dsVGV4dHVyZXNbY10sZT1iLmdsQ29udGV4dHNbY107XG5lJiZkJiZlLmRlbGV0ZVRleHR1cmUoZCl9YS5fZ2xUZXh0dXJlcy5sZW5ndGg9MH0sYi5XZWJHTFJlbmRlcmVyLnVwZGF0ZVRleHR1cmVGcmFtZT1mdW5jdGlvbihhKXthLl91cGRhdGVXZWJHTHV2cygpfSxiLldlYkdMUmVuZGVyZXIucHJvdG90eXBlLnJlc2l6ZT1mdW5jdGlvbihhLGIpe3RoaXMud2lkdGg9YSx0aGlzLmhlaWdodD1iLHRoaXMudmlldy53aWR0aD1hLHRoaXMudmlldy5oZWlnaHQ9Yix0aGlzLmdsLnZpZXdwb3J0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSx0aGlzLnByb2plY3Rpb24ueD10aGlzLndpZHRoLzIsdGhpcy5wcm9qZWN0aW9uLnk9LXRoaXMuaGVpZ2h0LzJ9LGIuY3JlYXRlV2ViR0xUZXh0dXJlPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIGEuaGFzTG9hZGVkJiYoYS5fZ2xUZXh0dXJlc1tjLmlkXT1jLmNyZWF0ZVRleHR1cmUoKSxjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCxhLl9nbFRleHR1cmVzW2MuaWRdKSxjLnBpeGVsU3RvcmVpKGMuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLGEucHJlbXVsdGlwbGllZEFscGhhKSxjLnRleEltYWdlMkQoYy5URVhUVVJFXzJELDAsYy5SR0JBLGMuUkdCQSxjLlVOU0lHTkVEX0JZVEUsYS5zb3VyY2UpLGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX01BR19GSUxURVIsYS5zY2FsZU1vZGU9PT1iLnNjYWxlTW9kZXMuTElORUFSP2MuTElORUFSOmMuTkVBUkVTVCksYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfTUlOX0ZJTFRFUixhLnNjYWxlTW9kZT09PWIuc2NhbGVNb2Rlcy5MSU5FQVI/Yy5MSU5FQVI6Yy5ORUFSRVNUKSxhLl9wb3dlck9mMj8oYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9TLGMuUkVQRUFUKSxjLnRleFBhcmFtZXRlcmkoYy5URVhUVVJFXzJELGMuVEVYVFVSRV9XUkFQX1QsYy5SRVBFQVQpKTooYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9TLGMuQ0xBTVBfVE9fRURHRSksYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9ULGMuQ0xBTVBfVE9fRURHRSkpLGMuYmluZFRleHR1cmUoYy5URVhUVVJFXzJELG51bGwpLGEuX2RpcnR5W2MuaWRdPSExKSxhLl9nbFRleHR1cmVzW2MuaWRdfSxiLnVwZGF0ZVdlYkdMVGV4dHVyZT1mdW5jdGlvbihhLGMpe2EuX2dsVGV4dHVyZXNbYy5pZF0mJihjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCxhLl9nbFRleHR1cmVzW2MuaWRdKSxjLnBpeGVsU3RvcmVpKGMuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLGEucHJlbXVsdGlwbGllZEFscGhhKSxjLnRleEltYWdlMkQoYy5URVhUVVJFXzJELDAsYy5SR0JBLGMuUkdCQSxjLlVOU0lHTkVEX0JZVEUsYS5zb3VyY2UpLGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX01BR19GSUxURVIsYS5zY2FsZU1vZGU9PT1iLnNjYWxlTW9kZXMuTElORUFSP2MuTElORUFSOmMuTkVBUkVTVCksYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfTUlOX0ZJTFRFUixhLnNjYWxlTW9kZT09PWIuc2NhbGVNb2Rlcy5MSU5FQVI/Yy5MSU5FQVI6Yy5ORUFSRVNUKSxhLl9wb3dlck9mMj8oYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9TLGMuUkVQRUFUKSxjLnRleFBhcmFtZXRlcmkoYy5URVhUVVJFXzJELGMuVEVYVFVSRV9XUkFQX1QsYy5SRVBFQVQpKTooYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9TLGMuQ0xBTVBfVE9fRURHRSksYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9ULGMuQ0xBTVBfVE9fRURHRSkpLGEuX2RpcnR5W2MuaWRdPSExKX0sYi5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5oYW5kbGVDb250ZXh0TG9zdD1mdW5jdGlvbihhKXthLnByZXZlbnREZWZhdWx0KCksdGhpcy5jb250ZXh0TG9zdD0hMH0sYi5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5oYW5kbGVDb250ZXh0UmVzdG9yZWQ9ZnVuY3Rpb24oKXt0cnl7dGhpcy5nbD10aGlzLnZpZXcuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiLHRoaXMub3B0aW9ucyl9Y2F0Y2goYSl7dHJ5e3RoaXMuZ2w9dGhpcy52aWV3LmdldENvbnRleHQoXCJ3ZWJnbFwiLHRoaXMub3B0aW9ucyl9Y2F0Y2goYyl7dGhyb3cgbmV3IEVycm9yKFwiIFRoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHdlYkdMLiBUcnkgdXNpbmcgdGhlIGNhbnZhcyByZW5kZXJlclwiK3RoaXMpfX12YXIgZD10aGlzLmdsO2QuaWQ9Yi5XZWJHTFJlbmRlcmVyLmdsQ29udGV4dElkKyssdGhpcy5zaGFkZXJNYW5hZ2VyLnNldENvbnRleHQoZCksdGhpcy5zcHJpdGVCYXRjaC5zZXRDb250ZXh0KGQpLHRoaXMucHJpbWl0aXZlQmF0Y2guc2V0Q29udGV4dChkKSx0aGlzLm1hc2tNYW5hZ2VyLnNldENvbnRleHQoZCksdGhpcy5maWx0ZXJNYW5hZ2VyLnNldENvbnRleHQoZCksdGhpcy5yZW5kZXJTZXNzaW9uLmdsPXRoaXMuZ2wsZC5kaXNhYmxlKGQuREVQVEhfVEVTVCksZC5kaXNhYmxlKGQuQ1VMTF9GQUNFKSxkLmVuYWJsZShkLkJMRU5EKSxkLmNvbG9yTWFzayghMCwhMCwhMCx0aGlzLnRyYW5zcGFyZW50KSx0aGlzLmdsLnZpZXdwb3J0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtmb3IodmFyIGUgaW4gYi5UZXh0dXJlQ2FjaGUpe3ZhciBmPWIuVGV4dHVyZUNhY2hlW2VdLmJhc2VUZXh0dXJlO2YuX2dsVGV4dHVyZXM9W119dGhpcy5jb250ZXh0TG9zdD0hMX0sYi5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy52aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3ZWJnbGNvbnRleHRsb3N0XCIsdGhpcy5jb250ZXh0TG9zdCksdGhpcy52aWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3ZWJnbGNvbnRleHRyZXN0b3JlZFwiLHRoaXMuY29udGV4dFJlc3RvcmVkTG9zdCksYi5nbENvbnRleHRzW3RoaXMuZ2xDb250ZXh0SWRdPW51bGwsdGhpcy5wcm9qZWN0aW9uPW51bGwsdGhpcy5vZmZzZXQ9bnVsbCx0aGlzLnNoYWRlck1hbmFnZXIuZGVzdHJveSgpLHRoaXMuc3ByaXRlQmF0Y2guZGVzdHJveSgpLHRoaXMucHJpbWl0aXZlQmF0Y2guZGVzdHJveSgpLHRoaXMubWFza01hbmFnZXIuZGVzdHJveSgpLHRoaXMuZmlsdGVyTWFuYWdlci5kZXN0cm95KCksdGhpcy5zaGFkZXJNYW5hZ2VyPW51bGwsdGhpcy5zcHJpdGVCYXRjaD1udWxsLHRoaXMubWFza01hbmFnZXI9bnVsbCx0aGlzLmZpbHRlck1hbmFnZXI9bnVsbCx0aGlzLmdsPW51bGwsdGhpcy5yZW5kZXJTZXNzaW9uPW51bGx9LGIuV2ViR0xSZW5kZXJlci5nbENvbnRleHRJZD0wLGIuV2ViR0xCbGVuZE1vZGVNYW5hZ2VyPWZ1bmN0aW9uKGEpe3RoaXMuZ2w9YSx0aGlzLmN1cnJlbnRCbGVuZE1vZGU9OTk5OTl9LGIuV2ViR0xCbGVuZE1vZGVNYW5hZ2VyLnByb3RvdHlwZS5zZXRCbGVuZE1vZGU9ZnVuY3Rpb24oYSl7aWYodGhpcy5jdXJyZW50QmxlbmRNb2RlPT09YSlyZXR1cm4hMTt0aGlzLmN1cnJlbnRCbGVuZE1vZGU9YTt2YXIgYz1iLmJsZW5kTW9kZXNXZWJHTFt0aGlzLmN1cnJlbnRCbGVuZE1vZGVdO3JldHVybiB0aGlzLmdsLmJsZW5kRnVuYyhjWzBdLGNbMV0pLCEwfSxiLldlYkdMQmxlbmRNb2RlTWFuYWdlci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuZ2w9bnVsbH0sYi5XZWJHTE1hc2tNYW5hZ2VyPWZ1bmN0aW9uKGEpe3RoaXMubWFza1N0YWNrPVtdLHRoaXMubWFza1Bvc2l0aW9uPTAsdGhpcy5zZXRDb250ZXh0KGEpLHRoaXMucmV2ZXJzZT0hMSx0aGlzLmNvdW50PTB9LGIuV2ViR0xNYXNrTWFuYWdlci5wcm90b3R5cGUuc2V0Q29udGV4dD1mdW5jdGlvbihhKXt0aGlzLmdsPWF9LGIuV2ViR0xNYXNrTWFuYWdlci5wcm90b3R5cGUucHVzaE1hc2s9ZnVuY3Rpb24oYSxjKXt2YXIgZD1jLmdsO2EuZGlydHkmJmIuV2ViR0xHcmFwaGljcy51cGRhdGVHcmFwaGljcyhhLGQpLGEuX3dlYkdMW2QuaWRdLmRhdGEubGVuZ3RoJiZjLnN0ZW5jaWxNYW5hZ2VyLnB1c2hTdGVuY2lsKGEsYS5fd2ViR0xbZC5pZF0uZGF0YVswXSxjKX0sYi5XZWJHTE1hc2tNYW5hZ2VyLnByb3RvdHlwZS5wb3BNYXNrPWZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5nbDtiLnN0ZW5jaWxNYW5hZ2VyLnBvcFN0ZW5jaWwoYSxhLl93ZWJHTFtjLmlkXS5kYXRhWzBdLGIpfSxiLldlYkdMTWFza01hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLm1hc2tTdGFjaz1udWxsLHRoaXMuZ2w9bnVsbH0sYi5XZWJHTFN0ZW5jaWxNYW5hZ2VyPWZ1bmN0aW9uKGEpe3RoaXMuc3RlbmNpbFN0YWNrPVtdLHRoaXMuc2V0Q29udGV4dChhKSx0aGlzLnJldmVyc2U9ITAsdGhpcy5jb3VudD0wfSxiLldlYkdMU3RlbmNpbE1hbmFnZXIucHJvdG90eXBlLnNldENvbnRleHQ9ZnVuY3Rpb24oYSl7dGhpcy5nbD1hfSxiLldlYkdMU3RlbmNpbE1hbmFnZXIucHJvdG90eXBlLnB1c2hTdGVuY2lsPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLmdsO3RoaXMuYmluZEdyYXBoaWNzKGEsYixjKSwwPT09dGhpcy5zdGVuY2lsU3RhY2subGVuZ3RoJiYoZC5lbmFibGUoZC5TVEVOQ0lMX1RFU1QpLGQuY2xlYXIoZC5TVEVOQ0lMX0JVRkZFUl9CSVQpLHRoaXMucmV2ZXJzZT0hMCx0aGlzLmNvdW50PTApLHRoaXMuc3RlbmNpbFN0YWNrLnB1c2goYik7dmFyIGU9dGhpcy5jb3VudDtkLmNvbG9yTWFzayghMSwhMSwhMSwhMSksZC5zdGVuY2lsRnVuYyhkLkFMV0FZUywwLDI1NSksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLklOVkVSVCksMT09PWIubW9kZT8oZC5kcmF3RWxlbWVudHMoZC5UUklBTkdMRV9GQU4sYi5pbmRpY2VzLmxlbmd0aC00LGQuVU5TSUdORURfU0hPUlQsMCksdGhpcy5yZXZlcnNlPyhkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsMjU1LWUsMjU1KSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuREVDUikpOihkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsZSwyNTUpLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5JTkNSKSksZC5kcmF3RWxlbWVudHMoZC5UUklBTkdMRV9GQU4sNCxkLlVOU0lHTkVEX1NIT1JULDIqKGIuaW5kaWNlcy5sZW5ndGgtNCkpLHRoaXMucmV2ZXJzZT9kLnN0ZW5jaWxGdW5jKGQuRVFVQUwsMjU1LShlKzEpLDI1NSk6ZC5zdGVuY2lsRnVuYyhkLkVRVUFMLGUrMSwyNTUpLHRoaXMucmV2ZXJzZT0hdGhpcy5yZXZlcnNlKToodGhpcy5yZXZlcnNlPyhkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsZSwyNTUpLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5JTkNSKSk6KGQuc3RlbmNpbEZ1bmMoZC5FUVVBTCwyNTUtZSwyNTUpLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5ERUNSKSksZC5kcmF3RWxlbWVudHMoZC5UUklBTkdMRV9TVFJJUCxiLmluZGljZXMubGVuZ3RoLGQuVU5TSUdORURfU0hPUlQsMCksdGhpcy5yZXZlcnNlP2Quc3RlbmNpbEZ1bmMoZC5FUVVBTCxlKzEsMjU1KTpkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsMjU1LShlKzEpLDI1NSkpLGQuY29sb3JNYXNrKCEwLCEwLCEwLCEwKSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuS0VFUCksdGhpcy5jb3VudCsrfSxiLldlYkdMU3RlbmNpbE1hbmFnZXIucHJvdG90eXBlLmJpbmRHcmFwaGljcz1mdW5jdGlvbihhLGMsZCl7dGhpcy5fY3VycmVudEdyYXBoaWNzPWE7dmFyIGUsZj10aGlzLmdsLGc9ZC5wcm9qZWN0aW9uLGg9ZC5vZmZzZXQ7MT09PWMubW9kZT8oZT1kLnNoYWRlck1hbmFnZXIuY29tcGxleFByaW1hdGl2ZVNoYWRlcixkLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKGUpLGYudW5pZm9ybU1hdHJpeDNmdihlLnRyYW5zbGF0aW9uTWF0cml4LCExLGEud29ybGRUcmFuc2Zvcm0udG9BcnJheSghMCkpLGYudW5pZm9ybTJmKGUucHJvamVjdGlvblZlY3RvcixnLngsLWcueSksZi51bmlmb3JtMmYoZS5vZmZzZXRWZWN0b3IsLWgueCwtaC55KSxmLnVuaWZvcm0zZnYoZS50aW50Q29sb3IsYi5oZXgycmdiKGEudGludCkpLGYudW5pZm9ybTNmdihlLmNvbG9yLGMuY29sb3IpLGYudW5pZm9ybTFmKGUuYWxwaGEsYS53b3JsZEFscGhhKmMuYWxwaGEpLGYuYmluZEJ1ZmZlcihmLkFSUkFZX0JVRkZFUixjLmJ1ZmZlciksZi52ZXJ0ZXhBdHRyaWJQb2ludGVyKGUuYVZlcnRleFBvc2l0aW9uLDIsZi5GTE9BVCwhMSw4LDApLGYuYmluZEJ1ZmZlcihmLkVMRU1FTlRfQVJSQVlfQlVGRkVSLGMuaW5kZXhCdWZmZXIpKTooZT1kLnNoYWRlck1hbmFnZXIucHJpbWl0aXZlU2hhZGVyLGQuc2hhZGVyTWFuYWdlci5zZXRTaGFkZXIoZSksZi51bmlmb3JtTWF0cml4M2Z2KGUudHJhbnNsYXRpb25NYXRyaXgsITEsYS53b3JsZFRyYW5zZm9ybS50b0FycmF5KCEwKSksZi51bmlmb3JtMmYoZS5wcm9qZWN0aW9uVmVjdG9yLGcueCwtZy55KSxmLnVuaWZvcm0yZihlLm9mZnNldFZlY3RvciwtaC54LC1oLnkpLGYudW5pZm9ybTNmdihlLnRpbnRDb2xvcixiLmhleDJyZ2IoYS50aW50KSksZi51bmlmb3JtMWYoZS5hbHBoYSxhLndvcmxkQWxwaGEpLGYuYmluZEJ1ZmZlcihmLkFSUkFZX0JVRkZFUixjLmJ1ZmZlciksZi52ZXJ0ZXhBdHRyaWJQb2ludGVyKGUuYVZlcnRleFBvc2l0aW9uLDIsZi5GTE9BVCwhMSwyNCwwKSxmLnZlcnRleEF0dHJpYlBvaW50ZXIoZS5jb2xvckF0dHJpYnV0ZSw0LGYuRkxPQVQsITEsMjQsOCksZi5iaW5kQnVmZmVyKGYuRUxFTUVOVF9BUlJBWV9CVUZGRVIsYy5pbmRleEJ1ZmZlcikpfSxiLldlYkdMU3RlbmNpbE1hbmFnZXIucHJvdG90eXBlLnBvcFN0ZW5jaWw9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMuZ2w7aWYodGhpcy5zdGVuY2lsU3RhY2sucG9wKCksdGhpcy5jb3VudC0tLDA9PT10aGlzLnN0ZW5jaWxTdGFjay5sZW5ndGgpZC5kaXNhYmxlKGQuU1RFTkNJTF9URVNUKTtlbHNle3ZhciBlPXRoaXMuY291bnQ7dGhpcy5iaW5kR3JhcGhpY3MoYSxiLGMpLGQuY29sb3JNYXNrKCExLCExLCExLCExKSwxPT09Yi5tb2RlPyh0aGlzLnJldmVyc2U9IXRoaXMucmV2ZXJzZSx0aGlzLnJldmVyc2U/KGQuc3RlbmNpbEZ1bmMoZC5FUVVBTCwyNTUtKGUrMSksMjU1KSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuSU5DUikpOihkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsZSsxLDI1NSksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLkRFQ1IpKSxkLmRyYXdFbGVtZW50cyhkLlRSSUFOR0xFX0ZBTiw0LGQuVU5TSUdORURfU0hPUlQsMiooYi5pbmRpY2VzLmxlbmd0aC00KSksZC5zdGVuY2lsRnVuYyhkLkFMV0FZUywwLDI1NSksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLklOVkVSVCksZC5kcmF3RWxlbWVudHMoZC5UUklBTkdMRV9GQU4sYi5pbmRpY2VzLmxlbmd0aC00LGQuVU5TSUdORURfU0hPUlQsMCksdGhpcy5yZXZlcnNlP2Quc3RlbmNpbEZ1bmMoZC5FUVVBTCxlLDI1NSk6ZC5zdGVuY2lsRnVuYyhkLkVRVUFMLDI1NS1lLDI1NSkpOih0aGlzLnJldmVyc2U/KGQuc3RlbmNpbEZ1bmMoZC5FUVVBTCxlKzEsMjU1KSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuREVDUikpOihkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsMjU1LShlKzEpLDI1NSksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLklOQ1IpKSxkLmRyYXdFbGVtZW50cyhkLlRSSUFOR0xFX1NUUklQLGIuaW5kaWNlcy5sZW5ndGgsZC5VTlNJR05FRF9TSE9SVCwwKSx0aGlzLnJldmVyc2U/ZC5zdGVuY2lsRnVuYyhkLkVRVUFMLGUsMjU1KTpkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsMjU1LWUsMjU1KSksZC5jb2xvck1hc2soITAsITAsITAsITApLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5LRUVQKX19LGIuV2ViR0xTdGVuY2lsTWFuYWdlci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMubWFza1N0YWNrPW51bGwsdGhpcy5nbD1udWxsfSxiLldlYkdMU2hhZGVyTWFuYWdlcj1mdW5jdGlvbihhKXt0aGlzLm1heEF0dGlicz0xMCx0aGlzLmF0dHJpYlN0YXRlPVtdLHRoaXMudGVtcEF0dHJpYlN0YXRlPVtdLHRoaXMuc2hhZGVyTWFwPVtdO2Zvcih2YXIgYj0wO2I8dGhpcy5tYXhBdHRpYnM7YisrKXRoaXMuYXR0cmliU3RhdGVbYl09ITE7dGhpcy5zZXRDb250ZXh0KGEpfSxiLldlYkdMU2hhZGVyTWFuYWdlci5wcm90b3R5cGUuc2V0Q29udGV4dD1mdW5jdGlvbihhKXt0aGlzLmdsPWEsdGhpcy5wcmltaXRpdmVTaGFkZXI9bmV3IGIuUHJpbWl0aXZlU2hhZGVyKGEpLHRoaXMuY29tcGxleFByaW1hdGl2ZVNoYWRlcj1uZXcgYi5Db21wbGV4UHJpbWl0aXZlU2hhZGVyKGEpLHRoaXMuZGVmYXVsdFNoYWRlcj1uZXcgYi5QaXhpU2hhZGVyKGEpLHRoaXMuZmFzdFNoYWRlcj1uZXcgYi5QaXhpRmFzdFNoYWRlcihhKSx0aGlzLnN0cmlwU2hhZGVyPW5ldyBiLlN0cmlwU2hhZGVyKGEpLHRoaXMuc2V0U2hhZGVyKHRoaXMuZGVmYXVsdFNoYWRlcil9LGIuV2ViR0xTaGFkZXJNYW5hZ2VyLnByb3RvdHlwZS5zZXRBdHRyaWJzPWZ1bmN0aW9uKGEpe3ZhciBiO2ZvcihiPTA7Yjx0aGlzLnRlbXBBdHRyaWJTdGF0ZS5sZW5ndGg7YisrKXRoaXMudGVtcEF0dHJpYlN0YXRlW2JdPSExO2ZvcihiPTA7YjxhLmxlbmd0aDtiKyspe3ZhciBjPWFbYl07dGhpcy50ZW1wQXR0cmliU3RhdGVbY109ITB9dmFyIGQ9dGhpcy5nbDtmb3IoYj0wO2I8dGhpcy5hdHRyaWJTdGF0ZS5sZW5ndGg7YisrKXRoaXMuYXR0cmliU3RhdGVbYl0hPT10aGlzLnRlbXBBdHRyaWJTdGF0ZVtiXSYmKHRoaXMuYXR0cmliU3RhdGVbYl09dGhpcy50ZW1wQXR0cmliU3RhdGVbYl0sdGhpcy50ZW1wQXR0cmliU3RhdGVbYl0/ZC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShiKTpkLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShiKSl9LGIuV2ViR0xTaGFkZXJNYW5hZ2VyLnByb3RvdHlwZS5zZXRTaGFkZXI9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuX2N1cnJlbnRJZD09PWEuX1VJRD8hMToodGhpcy5fY3VycmVudElkPWEuX1VJRCx0aGlzLmN1cnJlbnRTaGFkZXI9YSx0aGlzLmdsLnVzZVByb2dyYW0oYS5wcm9ncmFtKSx0aGlzLnNldEF0dHJpYnMoYS5hdHRyaWJ1dGVzKSwhMCl9LGIuV2ViR0xTaGFkZXJNYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5hdHRyaWJTdGF0ZT1udWxsLHRoaXMudGVtcEF0dHJpYlN0YXRlPW51bGwsdGhpcy5wcmltaXRpdmVTaGFkZXIuZGVzdHJveSgpLHRoaXMuZGVmYXVsdFNoYWRlci5kZXN0cm95KCksdGhpcy5mYXN0U2hhZGVyLmRlc3Ryb3koKSx0aGlzLnN0cmlwU2hhZGVyLmRlc3Ryb3koKSx0aGlzLmdsPW51bGx9LGIuV2ViR0xTcHJpdGVCYXRjaD1mdW5jdGlvbihhKXt0aGlzLnZlcnRTaXplPTYsdGhpcy5zaXplPTJlMzt2YXIgYj00KnRoaXMuc2l6ZSp0aGlzLnZlcnRTaXplLGM9Nip0aGlzLnNpemU7dGhpcy52ZXJ0aWNlcz1uZXcgRmxvYXQzMkFycmF5KGIpLHRoaXMuaW5kaWNlcz1uZXcgVWludDE2QXJyYXkoYyksdGhpcy5sYXN0SW5kZXhDb3VudD0wO2Zvcih2YXIgZD0wLGU9MDtjPmQ7ZCs9NixlKz00KXRoaXMuaW5kaWNlc1tkKzBdPWUrMCx0aGlzLmluZGljZXNbZCsxXT1lKzEsdGhpcy5pbmRpY2VzW2QrMl09ZSsyLHRoaXMuaW5kaWNlc1tkKzNdPWUrMCx0aGlzLmluZGljZXNbZCs0XT1lKzIsdGhpcy5pbmRpY2VzW2QrNV09ZSszO3RoaXMuZHJhd2luZz0hMSx0aGlzLmN1cnJlbnRCYXRjaFNpemU9MCx0aGlzLmN1cnJlbnRCYXNlVGV4dHVyZT1udWxsLHRoaXMuc2V0Q29udGV4dChhKSx0aGlzLmRpcnR5PSEwLHRoaXMudGV4dHVyZXM9W10sdGhpcy5ibGVuZE1vZGVzPVtdfSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLnNldENvbnRleHQ9ZnVuY3Rpb24oYSl7dGhpcy5nbD1hLHRoaXMudmVydGV4QnVmZmVyPWEuY3JlYXRlQnVmZmVyKCksdGhpcy5pbmRleEJ1ZmZlcj1hLmNyZWF0ZUJ1ZmZlcigpLGEuYmluZEJ1ZmZlcihhLkVMRU1FTlRfQVJSQVlfQlVGRkVSLHRoaXMuaW5kZXhCdWZmZXIpLGEuYnVmZmVyRGF0YShhLkVMRU1FTlRfQVJSQVlfQlVGRkVSLHRoaXMuaW5kaWNlcyxhLlNUQVRJQ19EUkFXKSxhLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0ZXhCdWZmZXIpLGEuYnVmZmVyRGF0YShhLkFSUkFZX0JVRkZFUix0aGlzLnZlcnRpY2VzLGEuRFlOQU1JQ19EUkFXKSx0aGlzLmN1cnJlbnRCbGVuZE1vZGU9OTk5OTl9LGIuV2ViR0xTcHJpdGVCYXRjaC5wcm90b3R5cGUuYmVnaW49ZnVuY3Rpb24oYSl7dGhpcy5yZW5kZXJTZXNzaW9uPWEsdGhpcy5zaGFkZXI9dGhpcy5yZW5kZXJTZXNzaW9uLnNoYWRlck1hbmFnZXIuZGVmYXVsdFNoYWRlcix0aGlzLnN0YXJ0KCl9LGIuV2ViR0xTcHJpdGVCYXRjaC5wcm90b3R5cGUuZW5kPWZ1bmN0aW9uKCl7dGhpcy5mbHVzaCgpfSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbihhKXt2YXIgYj1hLnRleHR1cmU7dGhpcy5jdXJyZW50QmF0Y2hTaXplPj10aGlzLnNpemUmJih0aGlzLmZsdXNoKCksdGhpcy5jdXJyZW50QmFzZVRleHR1cmU9Yi5iYXNlVGV4dHVyZSk7dmFyIGM9Yi5fdXZzO2lmKGMpe3ZhciBkLGUsZixnLGg9YS53b3JsZEFscGhhLGk9YS50aW50LGo9dGhpcy52ZXJ0aWNlcyxrPWEuYW5jaG9yLngsbD1hLmFuY2hvci55O2lmKGIudHJpbSl7dmFyIG09Yi50cmltO2U9bS54LWsqbS53aWR0aCxkPWUrYi5jcm9wLndpZHRoLGc9bS55LWwqbS5oZWlnaHQsZj1nK2IuY3JvcC5oZWlnaHR9ZWxzZSBkPWIuZnJhbWUud2lkdGgqKDEtayksZT1iLmZyYW1lLndpZHRoKi1rLGY9Yi5mcmFtZS5oZWlnaHQqKDEtbCksZz1iLmZyYW1lLmhlaWdodCotbDt2YXIgbj00KnRoaXMuY3VycmVudEJhdGNoU2l6ZSp0aGlzLnZlcnRTaXplLG89YS53b3JsZFRyYW5zZm9ybSxwPW8uYSxxPW8uYyxyPW8uYixzPW8uZCx0PW8udHgsdT1vLnR5O2pbbisrXT1wKmUrcipnK3QsaltuKytdPXMqZytxKmUrdSxqW24rK109Yy54MCxqW24rK109Yy55MCxqW24rK109aCxqW24rK109aSxqW24rK109cCpkK3IqZyt0LGpbbisrXT1zKmcrcSpkK3UsaltuKytdPWMueDEsaltuKytdPWMueTEsaltuKytdPWgsaltuKytdPWksaltuKytdPXAqZCtyKmYrdCxqW24rK109cypmK3EqZCt1LGpbbisrXT1jLngyLGpbbisrXT1jLnkyLGpbbisrXT1oLGpbbisrXT1pLGpbbisrXT1wKmUrcipmK3QsaltuKytdPXMqZitxKmUrdSxqW24rK109Yy54MyxqW24rK109Yy55MyxqW24rK109aCxqW24rK109aSx0aGlzLnRleHR1cmVzW3RoaXMuY3VycmVudEJhdGNoU2l6ZV09YS50ZXh0dXJlLmJhc2VUZXh0dXJlLHRoaXMuYmxlbmRNb2Rlc1t0aGlzLmN1cnJlbnRCYXRjaFNpemVdPWEuYmxlbmRNb2RlLHRoaXMuY3VycmVudEJhdGNoU2l6ZSsrfX0sYi5XZWJHTFNwcml0ZUJhdGNoLnByb3RvdHlwZS5yZW5kZXJUaWxpbmdTcHJpdGU9ZnVuY3Rpb24oYSl7dmFyIGM9YS50aWxpbmdUZXh0dXJlO3RoaXMuY3VycmVudEJhdGNoU2l6ZT49dGhpcy5zaXplJiYodGhpcy5mbHVzaCgpLHRoaXMuY3VycmVudEJhc2VUZXh0dXJlPWMuYmFzZVRleHR1cmUpLGEuX3V2c3x8KGEuX3V2cz1uZXcgYi5UZXh0dXJlVXZzKTt2YXIgZD1hLl91dnM7YS50aWxlUG9zaXRpb24ueCU9Yy5iYXNlVGV4dHVyZS53aWR0aCphLnRpbGVTY2FsZU9mZnNldC54LGEudGlsZVBvc2l0aW9uLnklPWMuYmFzZVRleHR1cmUuaGVpZ2h0KmEudGlsZVNjYWxlT2Zmc2V0Lnk7dmFyIGU9YS50aWxlUG9zaXRpb24ueC8oYy5iYXNlVGV4dHVyZS53aWR0aCphLnRpbGVTY2FsZU9mZnNldC54KSxmPWEudGlsZVBvc2l0aW9uLnkvKGMuYmFzZVRleHR1cmUuaGVpZ2h0KmEudGlsZVNjYWxlT2Zmc2V0LnkpLGc9YS53aWR0aC9jLmJhc2VUZXh0dXJlLndpZHRoLyhhLnRpbGVTY2FsZS54KmEudGlsZVNjYWxlT2Zmc2V0LngpLGg9YS5oZWlnaHQvYy5iYXNlVGV4dHVyZS5oZWlnaHQvKGEudGlsZVNjYWxlLnkqYS50aWxlU2NhbGVPZmZzZXQueSk7ZC54MD0wLWUsZC55MD0wLWYsZC54MT0xKmctZSxkLnkxPTAtZixkLngyPTEqZy1lLGQueTI9MSpoLWYsZC54Mz0wLWUsZC55Mz0xKmgtZjt2YXIgaT1hLndvcmxkQWxwaGEsaj1hLnRpbnQsaz10aGlzLnZlcnRpY2VzLGw9YS53aWR0aCxtPWEuaGVpZ2h0LG49YS5hbmNob3IueCxvPWEuYW5jaG9yLnkscD1sKigxLW4pLHE9bCotbixyPW0qKDEtbykscz1tKi1vLHQ9NCp0aGlzLmN1cnJlbnRCYXRjaFNpemUqdGhpcy52ZXJ0U2l6ZSx1PWEud29ybGRUcmFuc2Zvcm0sdj11LmEsdz11LmMseD11LmIseT11LmQsej11LnR4LEE9dS50eTtrW3QrK109dipxK3gqcyt6LGtbdCsrXT15KnMrdypxK0Esa1t0KytdPWQueDAsa1t0KytdPWQueTAsa1t0KytdPWksa1t0KytdPWosa1t0KytdPXYqcCt4KnMreixrW3QrK109eSpzK3cqcCtBLGtbdCsrXT1kLngxLGtbdCsrXT1kLnkxLGtbdCsrXT1pLGtbdCsrXT1qLGtbdCsrXT12KnAreCpyK3osa1t0KytdPXkqcit3KnArQSxrW3QrK109ZC54MixrW3QrK109ZC55MixrW3QrK109aSxrW3QrK109aixrW3QrK109dipxK3gqcit6LGtbdCsrXT15KnIrdypxK0Esa1t0KytdPWQueDMsa1t0KytdPWQueTMsa1t0KytdPWksa1t0KytdPWosdGhpcy50ZXh0dXJlc1t0aGlzLmN1cnJlbnRCYXRjaFNpemVdPWMuYmFzZVRleHR1cmUsdGhpcy5ibGVuZE1vZGVzW3RoaXMuY3VycmVudEJhdGNoU2l6ZV09YS5ibGVuZE1vZGUsdGhpcy5jdXJyZW50QmF0Y2hTaXplKyt9LGIuV2ViR0xTcHJpdGVCYXRjaC5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXtpZigwIT09dGhpcy5jdXJyZW50QmF0Y2hTaXplKXt2YXIgYT10aGlzLmdsO2lmKHRoaXMucmVuZGVyU2Vzc2lvbi5zaGFkZXJNYW5hZ2VyLnNldFNoYWRlcih0aGlzLnJlbmRlclNlc3Npb24uc2hhZGVyTWFuYWdlci5kZWZhdWx0U2hhZGVyKSx0aGlzLmRpcnR5KXt0aGlzLmRpcnR5PSExLGEuYWN0aXZlVGV4dHVyZShhLlRFWFRVUkUwKSxhLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0ZXhCdWZmZXIpLGEuYmluZEJ1ZmZlcihhLkVMRU1FTlRfQVJSQVlfQlVGRkVSLHRoaXMuaW5kZXhCdWZmZXIpO3ZhciBiPXRoaXMucmVuZGVyU2Vzc2lvbi5wcm9qZWN0aW9uO2EudW5pZm9ybTJmKHRoaXMuc2hhZGVyLnByb2plY3Rpb25WZWN0b3IsYi54LGIueSk7dmFyIGM9NCp0aGlzLnZlcnRTaXplO2EudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5hVmVydGV4UG9zaXRpb24sMixhLkZMT0FULCExLGMsMCksYS52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyLmFUZXh0dXJlQ29vcmQsMixhLkZMT0FULCExLGMsOCksYS52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyLmNvbG9yQXR0cmlidXRlLDIsYS5GTE9BVCwhMSxjLDE2KX1pZih0aGlzLmN1cnJlbnRCYXRjaFNpemU+LjUqdGhpcy5zaXplKWEuYnVmZmVyU3ViRGF0YShhLkFSUkFZX0JVRkZFUiwwLHRoaXMudmVydGljZXMpO2Vsc2V7dmFyIGQ9dGhpcy52ZXJ0aWNlcy5zdWJhcnJheSgwLDQqdGhpcy5jdXJyZW50QmF0Y2hTaXplKnRoaXMudmVydFNpemUpO2EuYnVmZmVyU3ViRGF0YShhLkFSUkFZX0JVRkZFUiwwLGQpfWZvcih2YXIgZSxmLGc9MCxoPTAsaT1udWxsLGo9dGhpcy5yZW5kZXJTZXNzaW9uLmJsZW5kTW9kZU1hbmFnZXIuY3VycmVudEJsZW5kTW9kZSxrPTAsbD10aGlzLmN1cnJlbnRCYXRjaFNpemU7bD5rO2srKyllPXRoaXMudGV4dHVyZXNba10sZj10aGlzLmJsZW5kTW9kZXNba10sKGkhPT1lfHxqIT09ZikmJih0aGlzLnJlbmRlckJhdGNoKGksZyxoKSxoPWssZz0wLGk9ZSxqPWYsdGhpcy5yZW5kZXJTZXNzaW9uLmJsZW5kTW9kZU1hbmFnZXIuc2V0QmxlbmRNb2RlKGopKSxnKys7dGhpcy5yZW5kZXJCYXRjaChpLGcsaCksdGhpcy5jdXJyZW50QmF0Y2hTaXplPTB9fSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLnJlbmRlckJhdGNoPWZ1bmN0aW9uKGEsYyxkKXtpZigwIT09Yyl7dmFyIGU9dGhpcy5nbDtlLmJpbmRUZXh0dXJlKGUuVEVYVFVSRV8yRCxhLl9nbFRleHR1cmVzW2UuaWRdfHxiLmNyZWF0ZVdlYkdMVGV4dHVyZShhLGUpKSxhLl9kaXJ0eVtlLmlkXSYmYi51cGRhdGVXZWJHTFRleHR1cmUodGhpcy5jdXJyZW50QmFzZVRleHR1cmUsZSksZS5kcmF3RWxlbWVudHMoZS5UUklBTkdMRVMsNipjLGUuVU5TSUdORURfU0hPUlQsNipkKjIpLHRoaXMucmVuZGVyU2Vzc2lvbi5kcmF3Q291bnQrK319LGIuV2ViR0xTcHJpdGVCYXRjaC5wcm90b3R5cGUuc3RvcD1mdW5jdGlvbigpe3RoaXMuZmx1c2goKX0sYi5XZWJHTFNwcml0ZUJhdGNoLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbigpe3RoaXMuZGlydHk9ITB9LGIuV2ViR0xTcHJpdGVCYXRjaC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMudmVydGljZXM9bnVsbCx0aGlzLmluZGljZXM9bnVsbCx0aGlzLmdsLmRlbGV0ZUJ1ZmZlcih0aGlzLnZlcnRleEJ1ZmZlciksdGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy5pbmRleEJ1ZmZlciksdGhpcy5jdXJyZW50QmFzZVRleHR1cmU9bnVsbCx0aGlzLmdsPW51bGx9LGIuV2ViR0xGYXN0U3ByaXRlQmF0Y2g9ZnVuY3Rpb24oYSl7dGhpcy52ZXJ0U2l6ZT0xMCx0aGlzLm1heFNpemU9NmUzLHRoaXMuc2l6ZT10aGlzLm1heFNpemU7dmFyIGI9NCp0aGlzLnNpemUqdGhpcy52ZXJ0U2l6ZSxjPTYqdGhpcy5tYXhTaXplO3RoaXMudmVydGljZXM9bmV3IEZsb2F0MzJBcnJheShiKSx0aGlzLmluZGljZXM9bmV3IFVpbnQxNkFycmF5KGMpLHRoaXMudmVydGV4QnVmZmVyPW51bGwsdGhpcy5pbmRleEJ1ZmZlcj1udWxsLHRoaXMubGFzdEluZGV4Q291bnQ9MDtmb3IodmFyIGQ9MCxlPTA7Yz5kO2QrPTYsZSs9NCl0aGlzLmluZGljZXNbZCswXT1lKzAsdGhpcy5pbmRpY2VzW2QrMV09ZSsxLHRoaXMuaW5kaWNlc1tkKzJdPWUrMix0aGlzLmluZGljZXNbZCszXT1lKzAsdGhpcy5pbmRpY2VzW2QrNF09ZSsyLHRoaXMuaW5kaWNlc1tkKzVdPWUrMzt0aGlzLmRyYXdpbmc9ITEsdGhpcy5jdXJyZW50QmF0Y2hTaXplPTAsdGhpcy5jdXJyZW50QmFzZVRleHR1cmU9bnVsbCx0aGlzLmN1cnJlbnRCbGVuZE1vZGU9MCx0aGlzLnJlbmRlclNlc3Npb249bnVsbCx0aGlzLnNoYWRlcj1udWxsLHRoaXMubWF0cml4PW51bGwsdGhpcy5zZXRDb250ZXh0KGEpfSxiLldlYkdMRmFzdFNwcml0ZUJhdGNoLnByb3RvdHlwZS5zZXRDb250ZXh0PWZ1bmN0aW9uKGEpe3RoaXMuZ2w9YSx0aGlzLnZlcnRleEJ1ZmZlcj1hLmNyZWF0ZUJ1ZmZlcigpLHRoaXMuaW5kZXhCdWZmZXI9YS5jcmVhdGVCdWZmZXIoKSxhLmJpbmRCdWZmZXIoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGV4QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGljZXMsYS5TVEFUSUNfRFJBVyksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0aWNlcyxhLkRZTkFNSUNfRFJBVyl9LGIuV2ViR0xGYXN0U3ByaXRlQmF0Y2gucHJvdG90eXBlLmJlZ2luPWZ1bmN0aW9uKGEsYil7dGhpcy5yZW5kZXJTZXNzaW9uPWIsdGhpcy5zaGFkZXI9dGhpcy5yZW5kZXJTZXNzaW9uLnNoYWRlck1hbmFnZXIuZmFzdFNoYWRlcix0aGlzLm1hdHJpeD1hLndvcmxkVHJhbnNmb3JtLnRvQXJyYXkoITApLHRoaXMuc3RhcnQoKX0sYi5XZWJHTEZhc3RTcHJpdGVCYXRjaC5wcm90b3R5cGUuZW5kPWZ1bmN0aW9uKCl7dGhpcy5mbHVzaCgpfSxiLldlYkdMRmFzdFNwcml0ZUJhdGNoLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oYSl7dmFyIGI9YS5jaGlsZHJlbixjPWJbMF07aWYoYy50ZXh0dXJlLl91dnMpe3RoaXMuY3VycmVudEJhc2VUZXh0dXJlPWMudGV4dHVyZS5iYXNlVGV4dHVyZSxjLmJsZW5kTW9kZSE9PXRoaXMucmVuZGVyU2Vzc2lvbi5ibGVuZE1vZGVNYW5hZ2VyLmN1cnJlbnRCbGVuZE1vZGUmJih0aGlzLmZsdXNoKCksdGhpcy5yZW5kZXJTZXNzaW9uLmJsZW5kTW9kZU1hbmFnZXIuc2V0QmxlbmRNb2RlKGMuYmxlbmRNb2RlKSk7Zm9yKHZhciBkPTAsZT1iLmxlbmd0aDtlPmQ7ZCsrKXRoaXMucmVuZGVyU3ByaXRlKGJbZF0pO3RoaXMuZmx1c2goKX19LGIuV2ViR0xGYXN0U3ByaXRlQmF0Y2gucHJvdG90eXBlLnJlbmRlclNwcml0ZT1mdW5jdGlvbihhKXtpZihhLnZpc2libGUmJihhLnRleHR1cmUuYmFzZVRleHR1cmU9PT10aGlzLmN1cnJlbnRCYXNlVGV4dHVyZXx8KHRoaXMuZmx1c2goKSx0aGlzLmN1cnJlbnRCYXNlVGV4dHVyZT1hLnRleHR1cmUuYmFzZVRleHR1cmUsYS50ZXh0dXJlLl91dnMpKSl7dmFyIGIsYyxkLGUsZixnLGgsaSxqPXRoaXMudmVydGljZXM7aWYoYj1hLnRleHR1cmUuX3V2cyxjPWEudGV4dHVyZS5mcmFtZS53aWR0aCxkPWEudGV4dHVyZS5mcmFtZS5oZWlnaHQsYS50ZXh0dXJlLnRyaW0pe3ZhciBrPWEudGV4dHVyZS50cmltO2Y9ay54LWEuYW5jaG9yLngqay53aWR0aCxlPWYrYS50ZXh0dXJlLmNyb3Aud2lkdGgsaD1rLnktYS5hbmNob3IueSprLmhlaWdodCxnPWgrYS50ZXh0dXJlLmNyb3AuaGVpZ2h0fWVsc2UgZT1hLnRleHR1cmUuZnJhbWUud2lkdGgqKDEtYS5hbmNob3IueCksZj1hLnRleHR1cmUuZnJhbWUud2lkdGgqLWEuYW5jaG9yLngsZz1hLnRleHR1cmUuZnJhbWUuaGVpZ2h0KigxLWEuYW5jaG9yLnkpLGg9YS50ZXh0dXJlLmZyYW1lLmhlaWdodCotYS5hbmNob3IueTtpPTQqdGhpcy5jdXJyZW50QmF0Y2hTaXplKnRoaXMudmVydFNpemUsaltpKytdPWYsaltpKytdPWgsaltpKytdPWEucG9zaXRpb24ueCxqW2krK109YS5wb3NpdGlvbi55LGpbaSsrXT1hLnNjYWxlLngsaltpKytdPWEuc2NhbGUueSxqW2krK109YS5yb3RhdGlvbixqW2krK109Yi54MCxqW2krK109Yi55MSxqW2krK109YS5hbHBoYSxqW2krK109ZSxqW2krK109aCxqW2krK109YS5wb3NpdGlvbi54LGpbaSsrXT1hLnBvc2l0aW9uLnksaltpKytdPWEuc2NhbGUueCxqW2krK109YS5zY2FsZS55LGpbaSsrXT1hLnJvdGF0aW9uLGpbaSsrXT1iLngxLGpbaSsrXT1iLnkxLGpbaSsrXT1hLmFscGhhLGpbaSsrXT1lLGpbaSsrXT1nLGpbaSsrXT1hLnBvc2l0aW9uLngsaltpKytdPWEucG9zaXRpb24ueSxqW2krK109YS5zY2FsZS54LGpbaSsrXT1hLnNjYWxlLnksaltpKytdPWEucm90YXRpb24saltpKytdPWIueDIsaltpKytdPWIueTIsaltpKytdPWEuYWxwaGEsaltpKytdPWYsaltpKytdPWcsaltpKytdPWEucG9zaXRpb24ueCxqW2krK109YS5wb3NpdGlvbi55LGpbaSsrXT1hLnNjYWxlLngsaltpKytdPWEuc2NhbGUueSxqW2krK109YS5yb3RhdGlvbixqW2krK109Yi54MyxqW2krK109Yi55MyxqW2krK109YS5hbHBoYSx0aGlzLmN1cnJlbnRCYXRjaFNpemUrKyx0aGlzLmN1cnJlbnRCYXRjaFNpemU+PXRoaXMuc2l6ZSYmdGhpcy5mbHVzaCgpfX0sYi5XZWJHTEZhc3RTcHJpdGVCYXRjaC5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXtpZigwIT09dGhpcy5jdXJyZW50QmF0Y2hTaXplKXt2YXIgYT10aGlzLmdsO2lmKHRoaXMuY3VycmVudEJhc2VUZXh0dXJlLl9nbFRleHR1cmVzW2EuaWRdfHxiLmNyZWF0ZVdlYkdMVGV4dHVyZSh0aGlzLmN1cnJlbnRCYXNlVGV4dHVyZSxhKSxhLmJpbmRUZXh0dXJlKGEuVEVYVFVSRV8yRCx0aGlzLmN1cnJlbnRCYXNlVGV4dHVyZS5fZ2xUZXh0dXJlc1thLmlkXSksdGhpcy5jdXJyZW50QmF0Y2hTaXplPi41KnRoaXMuc2l6ZSlhLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCx0aGlzLnZlcnRpY2VzKTtlbHNle3ZhciBjPXRoaXMudmVydGljZXMuc3ViYXJyYXkoMCw0KnRoaXMuY3VycmVudEJhdGNoU2l6ZSp0aGlzLnZlcnRTaXplKTthLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCxjKX1hLmRyYXdFbGVtZW50cyhhLlRSSUFOR0xFUyw2KnRoaXMuY3VycmVudEJhdGNoU2l6ZSxhLlVOU0lHTkVEX1NIT1JULDApLHRoaXMuY3VycmVudEJhdGNoU2l6ZT0wLHRoaXMucmVuZGVyU2Vzc2lvbi5kcmF3Q291bnQrK319LGIuV2ViR0xGYXN0U3ByaXRlQmF0Y2gucHJvdG90eXBlLnN0b3A9ZnVuY3Rpb24oKXt0aGlzLmZsdXNoKCl9LGIuV2ViR0xGYXN0U3ByaXRlQmF0Y2gucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nbDthLmFjdGl2ZVRleHR1cmUoYS5URVhUVVJFMCksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QnVmZmVyKSxhLmJpbmRCdWZmZXIoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGV4QnVmZmVyKTt2YXIgYj10aGlzLnJlbmRlclNlc3Npb24ucHJvamVjdGlvbjthLnVuaWZvcm0yZih0aGlzLnNoYWRlci5wcm9qZWN0aW9uVmVjdG9yLGIueCxiLnkpLGEudW5pZm9ybU1hdHJpeDNmdih0aGlzLnNoYWRlci51TWF0cml4LCExLHRoaXMubWF0cml4KTt2YXIgYz00KnRoaXMudmVydFNpemU7YS52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyLmFWZXJ0ZXhQb3NpdGlvbiwyLGEuRkxPQVQsITEsYywwKSxhLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXIuYVBvc2l0aW9uQ29vcmQsMixhLkZMT0FULCExLGMsOCksYS52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyLmFTY2FsZSwyLGEuRkxPQVQsITEsYywxNiksYS52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyLmFSb3RhdGlvbiwxLGEuRkxPQVQsITEsYywyNCksYS52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyLmFUZXh0dXJlQ29vcmQsMixhLkZMT0FULCExLGMsMjgpLGEudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5jb2xvckF0dHJpYnV0ZSwxLGEuRkxPQVQsITEsYywzNil9LGIuV2ViR0xGaWx0ZXJNYW5hZ2VyPWZ1bmN0aW9uKGEsYil7dGhpcy50cmFuc3BhcmVudD1iLHRoaXMuZmlsdGVyU3RhY2s9W10sdGhpcy5vZmZzZXRYPTAsdGhpcy5vZmZzZXRZPTAsdGhpcy5zZXRDb250ZXh0KGEpfSxiLldlYkdMRmlsdGVyTWFuYWdlci5wcm90b3R5cGUuc2V0Q29udGV4dD1mdW5jdGlvbihhKXt0aGlzLmdsPWEsdGhpcy50ZXh0dXJlUG9vbD1bXSx0aGlzLmluaXRTaGFkZXJCdWZmZXJzKCl9LGIuV2ViR0xGaWx0ZXJNYW5hZ2VyLnByb3RvdHlwZS5iZWdpbj1mdW5jdGlvbihhLGIpe3RoaXMucmVuZGVyU2Vzc2lvbj1hLHRoaXMuZGVmYXVsdFNoYWRlcj1hLnNoYWRlck1hbmFnZXIuZGVmYXVsdFNoYWRlcjt2YXIgYz10aGlzLnJlbmRlclNlc3Npb24ucHJvamVjdGlvbjt0aGlzLndpZHRoPTIqYy54LHRoaXMuaGVpZ2h0PTIqLWMueSx0aGlzLmJ1ZmZlcj1ifSxiLldlYkdMRmlsdGVyTWFuYWdlci5wcm90b3R5cGUucHVzaEZpbHRlcj1mdW5jdGlvbihhKXt2YXIgYz10aGlzLmdsLGQ9dGhpcy5yZW5kZXJTZXNzaW9uLnByb2plY3Rpb24sZT10aGlzLnJlbmRlclNlc3Npb24ub2Zmc2V0O2EuX2ZpbHRlckFyZWE9YS50YXJnZXQuZmlsdGVyQXJlYXx8YS50YXJnZXQuZ2V0Qm91bmRzKCksdGhpcy5maWx0ZXJTdGFjay5wdXNoKGEpO3ZhciBmPWEuZmlsdGVyUGFzc2VzWzBdO3RoaXMub2Zmc2V0WCs9YS5fZmlsdGVyQXJlYS54LHRoaXMub2Zmc2V0WSs9YS5fZmlsdGVyQXJlYS55O3ZhciBnPXRoaXMudGV4dHVyZVBvb2wucG9wKCk7Zz9nLnJlc2l6ZSh0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTpnPW5ldyBiLkZpbHRlclRleHR1cmUodGhpcy5nbCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSxjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCxnLnRleHR1cmUpO3ZhciBoPWEuX2ZpbHRlckFyZWEsaT1mLnBhZGRpbmc7aC54LT1pLGgueS09aSxoLndpZHRoKz0yKmksaC5oZWlnaHQrPTIqaSxoLng8MCYmKGgueD0wKSxoLndpZHRoPnRoaXMud2lkdGgmJihoLndpZHRoPXRoaXMud2lkdGgpLGgueTwwJiYoaC55PTApLGguaGVpZ2h0PnRoaXMuaGVpZ2h0JiYoaC5oZWlnaHQ9dGhpcy5oZWlnaHQpLGMuYmluZEZyYW1lYnVmZmVyKGMuRlJBTUVCVUZGRVIsZy5mcmFtZUJ1ZmZlciksYy52aWV3cG9ydCgwLDAsaC53aWR0aCxoLmhlaWdodCksZC54PWgud2lkdGgvMixkLnk9LWguaGVpZ2h0LzIsZS54PS1oLngsZS55PS1oLnksdGhpcy5yZW5kZXJTZXNzaW9uLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKHRoaXMuZGVmYXVsdFNoYWRlciksYy51bmlmb3JtMmYodGhpcy5kZWZhdWx0U2hhZGVyLnByb2plY3Rpb25WZWN0b3IsaC53aWR0aC8yLC1oLmhlaWdodC8yKSxjLnVuaWZvcm0yZih0aGlzLmRlZmF1bHRTaGFkZXIub2Zmc2V0VmVjdG9yLC1oLngsLWgueSksYy5jb2xvck1hc2soITAsITAsITAsITApLGMuY2xlYXJDb2xvcigwLDAsMCwwKSxjLmNsZWFyKGMuQ09MT1JfQlVGRkVSX0JJVCksYS5fZ2xGaWx0ZXJUZXh0dXJlPWd9LGIuV2ViR0xGaWx0ZXJNYW5hZ2VyLnByb3RvdHlwZS5wb3BGaWx0ZXI9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsLGM9dGhpcy5maWx0ZXJTdGFjay5wb3AoKSxkPWMuX2ZpbHRlckFyZWEsZT1jLl9nbEZpbHRlclRleHR1cmUsZj10aGlzLnJlbmRlclNlc3Npb24ucHJvamVjdGlvbixnPXRoaXMucmVuZGVyU2Vzc2lvbi5vZmZzZXQ7aWYoYy5maWx0ZXJQYXNzZXMubGVuZ3RoPjEpe2Eudmlld3BvcnQoMCwwLGQud2lkdGgsZC5oZWlnaHQpLGEuYmluZEJ1ZmZlcihhLkFSUkFZX0JVRkZFUix0aGlzLnZlcnRleEJ1ZmZlciksdGhpcy52ZXJ0ZXhBcnJheVswXT0wLHRoaXMudmVydGV4QXJyYXlbMV09ZC5oZWlnaHQsdGhpcy52ZXJ0ZXhBcnJheVsyXT1kLndpZHRoLHRoaXMudmVydGV4QXJyYXlbM109ZC5oZWlnaHQsdGhpcy52ZXJ0ZXhBcnJheVs0XT0wLHRoaXMudmVydGV4QXJyYXlbNV09MCx0aGlzLnZlcnRleEFycmF5WzZdPWQud2lkdGgsdGhpcy52ZXJ0ZXhBcnJheVs3XT0wLGEuYnVmZmVyU3ViRGF0YShhLkFSUkFZX0JVRkZFUiwwLHRoaXMudmVydGV4QXJyYXkpLGEuYmluZEJ1ZmZlcihhLkFSUkFZX0JVRkZFUix0aGlzLnV2QnVmZmVyKSx0aGlzLnV2QXJyYXlbMl09ZC53aWR0aC90aGlzLndpZHRoLHRoaXMudXZBcnJheVs1XT1kLmhlaWdodC90aGlzLmhlaWdodCx0aGlzLnV2QXJyYXlbNl09ZC53aWR0aC90aGlzLndpZHRoLHRoaXMudXZBcnJheVs3XT1kLmhlaWdodC90aGlzLmhlaWdodCxhLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCx0aGlzLnV2QXJyYXkpO3ZhciBoPWUsaT10aGlzLnRleHR1cmVQb29sLnBvcCgpO2l8fChpPW5ldyBiLkZpbHRlclRleHR1cmUodGhpcy5nbCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSksaS5yZXNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCksYS5iaW5kRnJhbWVidWZmZXIoYS5GUkFNRUJVRkZFUixpLmZyYW1lQnVmZmVyKSxhLmNsZWFyKGEuQ09MT1JfQlVGRkVSX0JJVCksYS5kaXNhYmxlKGEuQkxFTkQpO2Zvcih2YXIgaj0wO2o8Yy5maWx0ZXJQYXNzZXMubGVuZ3RoLTE7aisrKXt2YXIgaz1jLmZpbHRlclBhc3Nlc1tqXTthLmJpbmRGcmFtZWJ1ZmZlcihhLkZSQU1FQlVGRkVSLGkuZnJhbWVCdWZmZXIpLGEuYWN0aXZlVGV4dHVyZShhLlRFWFRVUkUwKSxhLmJpbmRUZXh0dXJlKGEuVEVYVFVSRV8yRCxoLnRleHR1cmUpLHRoaXMuYXBwbHlGaWx0ZXJQYXNzKGssZCxkLndpZHRoLGQuaGVpZ2h0KTt2YXIgbD1oO2g9aSxpPWx9YS5lbmFibGUoYS5CTEVORCksZT1oLHRoaXMudGV4dHVyZVBvb2wucHVzaChpKX12YXIgbT1jLmZpbHRlclBhc3Nlc1tjLmZpbHRlclBhc3Nlcy5sZW5ndGgtMV07dGhpcy5vZmZzZXRYLT1kLngsdGhpcy5vZmZzZXRZLT1kLnk7dmFyIG49dGhpcy53aWR0aCxvPXRoaXMuaGVpZ2h0LHA9MCxxPTAscj10aGlzLmJ1ZmZlcjtpZigwPT09dGhpcy5maWx0ZXJTdGFjay5sZW5ndGgpYS5jb2xvck1hc2soITAsITAsITAsITApO2Vsc2V7dmFyIHM9dGhpcy5maWx0ZXJTdGFja1t0aGlzLmZpbHRlclN0YWNrLmxlbmd0aC0xXTtkPXMuX2ZpbHRlckFyZWEsbj1kLndpZHRoLG89ZC5oZWlnaHQscD1kLngscT1kLnkscj1zLl9nbEZpbHRlclRleHR1cmUuZnJhbWVCdWZmZXJ9Zi54PW4vMixmLnk9LW8vMixnLng9cCxnLnk9cSxkPWMuX2ZpbHRlckFyZWE7dmFyIHQ9ZC54LXAsdT1kLnktcTthLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0ZXhCdWZmZXIpLHRoaXMudmVydGV4QXJyYXlbMF09dCx0aGlzLnZlcnRleEFycmF5WzFdPXUrZC5oZWlnaHQsdGhpcy52ZXJ0ZXhBcnJheVsyXT10K2Qud2lkdGgsdGhpcy52ZXJ0ZXhBcnJheVszXT11K2QuaGVpZ2h0LHRoaXMudmVydGV4QXJyYXlbNF09dCx0aGlzLnZlcnRleEFycmF5WzVdPXUsdGhpcy52ZXJ0ZXhBcnJheVs2XT10K2Qud2lkdGgsdGhpcy52ZXJ0ZXhBcnJheVs3XT11LGEuYnVmZmVyU3ViRGF0YShhLkFSUkFZX0JVRkZFUiwwLHRoaXMudmVydGV4QXJyYXkpLGEuYmluZEJ1ZmZlcihhLkFSUkFZX0JVRkZFUix0aGlzLnV2QnVmZmVyKSx0aGlzLnV2QXJyYXlbMl09ZC53aWR0aC90aGlzLndpZHRoLHRoaXMudXZBcnJheVs1XT1kLmhlaWdodC90aGlzLmhlaWdodCx0aGlzLnV2QXJyYXlbNl09ZC53aWR0aC90aGlzLndpZHRoLHRoaXMudXZBcnJheVs3XT1kLmhlaWdodC90aGlzLmhlaWdodCxhLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCx0aGlzLnV2QXJyYXkpLGEudmlld3BvcnQoMCwwLG4sbyksYS5iaW5kRnJhbWVidWZmZXIoYS5GUkFNRUJVRkZFUixyKSxhLmFjdGl2ZVRleHR1cmUoYS5URVhUVVJFMCksYS5iaW5kVGV4dHVyZShhLlRFWFRVUkVfMkQsZS50ZXh0dXJlKSx0aGlzLmFwcGx5RmlsdGVyUGFzcyhtLGQsbixvKSx0aGlzLnJlbmRlclNlc3Npb24uc2hhZGVyTWFuYWdlci5zZXRTaGFkZXIodGhpcy5kZWZhdWx0U2hhZGVyKSxhLnVuaWZvcm0yZih0aGlzLmRlZmF1bHRTaGFkZXIucHJvamVjdGlvblZlY3RvcixuLzIsLW8vMiksYS51bmlmb3JtMmYodGhpcy5kZWZhdWx0U2hhZGVyLm9mZnNldFZlY3RvciwtcCwtcSksdGhpcy50ZXh0dXJlUG9vbC5wdXNoKGUpLGMuX2dsRmlsdGVyVGV4dHVyZT1udWxsfSxiLldlYkdMRmlsdGVyTWFuYWdlci5wcm90b3R5cGUuYXBwbHlGaWx0ZXJQYXNzPWZ1bmN0aW9uKGEsYyxkLGUpe3ZhciBmPXRoaXMuZ2wsZz1hLnNoYWRlcnNbZi5pZF07Z3x8KGc9bmV3IGIuUGl4aVNoYWRlcihmKSxnLmZyYWdtZW50U3JjPWEuZnJhZ21lbnRTcmMsZy51bmlmb3Jtcz1hLnVuaWZvcm1zLGcuaW5pdCgpLGEuc2hhZGVyc1tmLmlkXT1nKSx0aGlzLnJlbmRlclNlc3Npb24uc2hhZGVyTWFuYWdlci5zZXRTaGFkZXIoZyksZi51bmlmb3JtMmYoZy5wcm9qZWN0aW9uVmVjdG9yLGQvMiwtZS8yKSxmLnVuaWZvcm0yZihnLm9mZnNldFZlY3RvciwwLDApLGEudW5pZm9ybXMuZGltZW5zaW9ucyYmKGEudW5pZm9ybXMuZGltZW5zaW9ucy52YWx1ZVswXT10aGlzLndpZHRoLGEudW5pZm9ybXMuZGltZW5zaW9ucy52YWx1ZVsxXT10aGlzLmhlaWdodCxhLnVuaWZvcm1zLmRpbWVuc2lvbnMudmFsdWVbMl09dGhpcy52ZXJ0ZXhBcnJheVswXSxhLnVuaWZvcm1zLmRpbWVuc2lvbnMudmFsdWVbM109dGhpcy52ZXJ0ZXhBcnJheVs1XSksZy5zeW5jVW5pZm9ybXMoKSxmLmJpbmRCdWZmZXIoZi5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0ZXhCdWZmZXIpLGYudmVydGV4QXR0cmliUG9pbnRlcihnLmFWZXJ0ZXhQb3NpdGlvbiwyLGYuRkxPQVQsITEsMCwwKSxmLmJpbmRCdWZmZXIoZi5BUlJBWV9CVUZGRVIsdGhpcy51dkJ1ZmZlciksZi52ZXJ0ZXhBdHRyaWJQb2ludGVyKGcuYVRleHR1cmVDb29yZCwyLGYuRkxPQVQsITEsMCwwKSxmLmJpbmRCdWZmZXIoZi5BUlJBWV9CVUZGRVIsdGhpcy5jb2xvckJ1ZmZlciksZi52ZXJ0ZXhBdHRyaWJQb2ludGVyKGcuY29sb3JBdHRyaWJ1dGUsMixmLkZMT0FULCExLDAsMCksZi5iaW5kQnVmZmVyKGYuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRleEJ1ZmZlciksZi5kcmF3RWxlbWVudHMoZi5UUklBTkdMRVMsNixmLlVOU0lHTkVEX1NIT1JULDApLHRoaXMucmVuZGVyU2Vzc2lvbi5kcmF3Q291bnQrK30sYi5XZWJHTEZpbHRlck1hbmFnZXIucHJvdG90eXBlLmluaXRTaGFkZXJCdWZmZXJzPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nbDt0aGlzLnZlcnRleEJ1ZmZlcj1hLmNyZWF0ZUJ1ZmZlcigpLHRoaXMudXZCdWZmZXI9YS5jcmVhdGVCdWZmZXIoKSx0aGlzLmNvbG9yQnVmZmVyPWEuY3JlYXRlQnVmZmVyKCksdGhpcy5pbmRleEJ1ZmZlcj1hLmNyZWF0ZUJ1ZmZlcigpLHRoaXMudmVydGV4QXJyYXk9bmV3IEZsb2F0MzJBcnJheShbMCwwLDEsMCwwLDEsMSwxXSksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0ZXhBcnJheSxhLlNUQVRJQ19EUkFXKSx0aGlzLnV2QXJyYXk9bmV3IEZsb2F0MzJBcnJheShbMCwwLDEsMCwwLDEsMSwxXSksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMudXZCdWZmZXIpLGEuYnVmZmVyRGF0YShhLkFSUkFZX0JVRkZFUix0aGlzLnV2QXJyYXksYS5TVEFUSUNfRFJBVyksdGhpcy5jb2xvckFycmF5PW5ldyBGbG9hdDMyQXJyYXkoWzEsMTY3NzcyMTUsMSwxNjc3NzIxNSwxLDE2Nzc3MjE1LDEsMTY3NzcyMTVdKSxhLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy5jb2xvckJ1ZmZlciksYS5idWZmZXJEYXRhKGEuQVJSQVlfQlVGRkVSLHRoaXMuY29sb3JBcnJheSxhLlNUQVRJQ19EUkFXKSxhLmJpbmRCdWZmZXIoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGV4QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUixuZXcgVWludDE2QXJyYXkoWzAsMSwyLDEsMywyXSksYS5TVEFUSUNfRFJBVyl9LGIuV2ViR0xGaWx0ZXJNYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nbDt0aGlzLmZpbHRlclN0YWNrPW51bGwsdGhpcy5vZmZzZXRYPTAsdGhpcy5vZmZzZXRZPTA7Zm9yKHZhciBiPTA7Yjx0aGlzLnRleHR1cmVQb29sLmxlbmd0aDtiKyspdGhpcy50ZXh0dXJlUG9vbFtiXS5kZXN0cm95KCk7dGhpcy50ZXh0dXJlUG9vbD1udWxsLGEuZGVsZXRlQnVmZmVyKHRoaXMudmVydGV4QnVmZmVyKSxhLmRlbGV0ZUJ1ZmZlcih0aGlzLnV2QnVmZmVyKSxhLmRlbGV0ZUJ1ZmZlcih0aGlzLmNvbG9yQnVmZmVyKSxhLmRlbGV0ZUJ1ZmZlcih0aGlzLmluZGV4QnVmZmVyKX0sYi5GaWx0ZXJUZXh0dXJlPWZ1bmN0aW9uKGEsYyxkLGUpe3RoaXMuZ2w9YSx0aGlzLmZyYW1lQnVmZmVyPWEuY3JlYXRlRnJhbWVidWZmZXIoKSx0aGlzLnRleHR1cmU9YS5jcmVhdGVUZXh0dXJlKCksZT1lfHxiLnNjYWxlTW9kZXMuREVGQVVMVCxhLmJpbmRUZXh0dXJlKGEuVEVYVFVSRV8yRCx0aGlzLnRleHR1cmUpLGEudGV4UGFyYW1ldGVyaShhLlRFWFRVUkVfMkQsYS5URVhUVVJFX01BR19GSUxURVIsZT09PWIuc2NhbGVNb2Rlcy5MSU5FQVI/YS5MSU5FQVI6YS5ORUFSRVNUKSxhLnRleFBhcmFtZXRlcmkoYS5URVhUVVJFXzJELGEuVEVYVFVSRV9NSU5fRklMVEVSLGU9PT1iLnNjYWxlTW9kZXMuTElORUFSP2EuTElORUFSOmEuTkVBUkVTVCksYS50ZXhQYXJhbWV0ZXJpKGEuVEVYVFVSRV8yRCxhLlRFWFRVUkVfV1JBUF9TLGEuQ0xBTVBfVE9fRURHRSksYS50ZXhQYXJhbWV0ZXJpKGEuVEVYVFVSRV8yRCxhLlRFWFRVUkVfV1JBUF9ULGEuQ0xBTVBfVE9fRURHRSksYS5iaW5kRnJhbWVidWZmZXIoYS5GUkFNRUJVRkZFUix0aGlzLmZyYW1lYnVmZmVyKSxhLmJpbmRGcmFtZWJ1ZmZlcihhLkZSQU1FQlVGRkVSLHRoaXMuZnJhbWVCdWZmZXIpLGEuZnJhbWVidWZmZXJUZXh0dXJlMkQoYS5GUkFNRUJVRkZFUixhLkNPTE9SX0FUVEFDSE1FTlQwLGEuVEVYVFVSRV8yRCx0aGlzLnRleHR1cmUsMCksdGhpcy5yZW5kZXJCdWZmZXI9YS5jcmVhdGVSZW5kZXJidWZmZXIoKSxhLmJpbmRSZW5kZXJidWZmZXIoYS5SRU5ERVJCVUZGRVIsdGhpcy5yZW5kZXJCdWZmZXIpLGEuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoYS5GUkFNRUJVRkZFUixhLkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVCxhLlJFTkRFUkJVRkZFUix0aGlzLnJlbmRlckJ1ZmZlciksdGhpcy5yZXNpemUoYyxkKX0sYi5GaWx0ZXJUZXh0dXJlLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2w7YS5jbGVhckNvbG9yKDAsMCwwLDApLGEuY2xlYXIoYS5DT0xPUl9CVUZGRVJfQklUKX0sYi5GaWx0ZXJUZXh0dXJlLnByb3RvdHlwZS5yZXNpemU9ZnVuY3Rpb24oYSxiKXtpZih0aGlzLndpZHRoIT09YXx8dGhpcy5oZWlnaHQhPT1iKXt0aGlzLndpZHRoPWEsdGhpcy5oZWlnaHQ9Yjt2YXIgYz10aGlzLmdsO2MuYmluZFRleHR1cmUoYy5URVhUVVJFXzJELHRoaXMudGV4dHVyZSksYy50ZXhJbWFnZTJEKGMuVEVYVFVSRV8yRCwwLGMuUkdCQSxhLGIsMCxjLlJHQkEsYy5VTlNJR05FRF9CWVRFLG51bGwpLGMuYmluZFJlbmRlcmJ1ZmZlcihjLlJFTkRFUkJVRkZFUix0aGlzLnJlbmRlckJ1ZmZlciksYy5yZW5kZXJidWZmZXJTdG9yYWdlKGMuUkVOREVSQlVGRkVSLGMuREVQVEhfU1RFTkNJTCxhLGIpfX0sYi5GaWx0ZXJUZXh0dXJlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nbDthLmRlbGV0ZUZyYW1lYnVmZmVyKHRoaXMuZnJhbWVCdWZmZXIpLGEuZGVsZXRlVGV4dHVyZSh0aGlzLnRleHR1cmUpLHRoaXMuZnJhbWVCdWZmZXI9bnVsbCx0aGlzLnRleHR1cmU9bnVsbH0sYi5DYW52YXNNYXNrTWFuYWdlcj1mdW5jdGlvbigpe30sYi5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucHVzaE1hc2s9ZnVuY3Rpb24oYSxjKXtjLnNhdmUoKTt2YXIgZD1hLmFscGhhLGU9YS53b3JsZFRyYW5zZm9ybTtjLnNldFRyYW5zZm9ybShlLmEsZS5jLGUuYixlLmQsZS50eCxlLnR5KSxiLkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzTWFzayhhLGMpLGMuY2xpcCgpLGEud29ybGRBbHBoYT1kfSxiLkNhbnZhc01hc2tNYW5hZ2VyLnByb3RvdHlwZS5wb3BNYXNrPWZ1bmN0aW9uKGEpe2EucmVzdG9yZSgpfSxiLkNhbnZhc1RpbnRlcj1mdW5jdGlvbigpe30sYi5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZT1mdW5jdGlvbihhLGMpe3ZhciBkPWEudGV4dHVyZTtjPWIuQ2FudmFzVGludGVyLnJvdW5kQ29sb3IoYyk7dmFyIGU9XCIjXCIrKFwiMDAwMDBcIisoMHxjKS50b1N0cmluZygxNikpLnN1YnN0cigtNik7aWYoZC50aW50Q2FjaGU9ZC50aW50Q2FjaGV8fHt9LGQudGludENhY2hlW2VdKXJldHVybiBkLnRpbnRDYWNoZVtlXTt2YXIgZj1iLkNhbnZhc1RpbnRlci5jYW52YXN8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7aWYoYi5DYW52YXNUaW50ZXIudGludE1ldGhvZChkLGMsZiksYi5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlKXt2YXIgZz1uZXcgSW1hZ2U7Zy5zcmM9Zi50b0RhdGFVUkwoKSxkLnRpbnRDYWNoZVtlXT1nfWVsc2UgZC50aW50Q2FjaGVbZV09ZixiLkNhbnZhc1RpbnRlci5jYW52YXM9bnVsbDtyZXR1cm4gZn0sYi5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9Yy5nZXRDb250ZXh0KFwiMmRcIiksZT1hLmZyYW1lO2Mud2lkdGg9ZS53aWR0aCxjLmhlaWdodD1lLmhlaWdodCxkLmZpbGxTdHlsZT1cIiNcIisoXCIwMDAwMFwiKygwfGIpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KSxkLmZpbGxSZWN0KDAsMCxlLndpZHRoLGUuaGVpZ2h0KSxkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj1cIm11bHRpcGx5XCIsZC5kcmF3SW1hZ2UoYS5iYXNlVGV4dHVyZS5zb3VyY2UsZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LDAsMCxlLndpZHRoLGUuaGVpZ2h0KSxkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj1cImRlc3RpbmF0aW9uLWF0b3BcIixkLmRyYXdJbWFnZShhLmJhc2VUZXh0dXJlLnNvdXJjZSxlLngsZS55LGUud2lkdGgsZS5oZWlnaHQsMCwwLGUud2lkdGgsZS5oZWlnaHQpfSxiLkNhbnZhc1RpbnRlci50aW50V2l0aE92ZXJsYXk9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWMuZ2V0Q29udGV4dChcIjJkXCIpLGU9YS5mcmFtZTtjLndpZHRoPWUud2lkdGgsYy5oZWlnaHQ9ZS5oZWlnaHQsZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJjb3B5XCIsZC5maWxsU3R5bGU9XCIjXCIrKFwiMDAwMDBcIisoMHxiKS50b1N0cmluZygxNikpLnN1YnN0cigtNiksZC5maWxsUmVjdCgwLDAsZS53aWR0aCxlLmhlaWdodCksZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJkZXN0aW5hdGlvbi1hdG9wXCIsZC5kcmF3SW1hZ2UoYS5iYXNlVGV4dHVyZS5zb3VyY2UsZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LDAsMCxlLndpZHRoLGUuaGVpZ2h0KX0sYi5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbD1mdW5jdGlvbihhLGMsZCl7dmFyIGU9ZC5nZXRDb250ZXh0KFwiMmRcIiksZj1hLmZyYW1lO2Qud2lkdGg9Zi53aWR0aCxkLmhlaWdodD1mLmhlaWdodCxlLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj1cImNvcHlcIixlLmRyYXdJbWFnZShhLmJhc2VUZXh0dXJlLnNvdXJjZSxmLngsZi55LGYud2lkdGgsZi5oZWlnaHQsMCwwLGYud2lkdGgsZi5oZWlnaHQpO2Zvcih2YXIgZz1iLmhleDJyZ2IoYyksaD1nWzBdLGk9Z1sxXSxqPWdbMl0saz1lLmdldEltYWdlRGF0YSgwLDAsZi53aWR0aCxmLmhlaWdodCksbD1rLmRhdGEsbT0wO208bC5sZW5ndGg7bSs9NClsW20rMF0qPWgsbFttKzFdKj1pLGxbbSsyXSo9ajtlLnB1dEltYWdlRGF0YShrLDAsMCl9LGIuQ2FudmFzVGludGVyLnJvdW5kQ29sb3I9ZnVuY3Rpb24oYSl7dmFyIGM9Yi5DYW52YXNUaW50ZXIuY2FjaGVTdGVwc1BlckNvbG9yQ2hhbm5lbCxkPWIuaGV4MnJnYihhKTtyZXR1cm4gZFswXT1NYXRoLm1pbigyNTUsZFswXS9jKmMpLGRbMV09TWF0aC5taW4oMjU1LGRbMV0vYypjKSxkWzJdPU1hdGgubWluKDI1NSxkWzJdL2MqYyksYi5yZ2IyaGV4KGQpfSxiLkNhbnZhc1RpbnRlci5jYWNoZVN0ZXBzUGVyQ29sb3JDaGFubmVsPTgsYi5DYW52YXNUaW50ZXIuY29udmVydFRpbnRUb0ltYWdlPSExLGIuQ2FudmFzVGludGVyLmNhblVzZU11bHRpcGx5PWIuY2FuVXNlTmV3Q2FudmFzQmxlbmRNb2RlcygpLGIuQ2FudmFzVGludGVyLnRpbnRNZXRob2Q9Yi5DYW52YXNUaW50ZXIuY2FuVXNlTXVsdGlwbHk/Yi5DYW52YXNUaW50ZXIudGludFdpdGhNdWx0aXBseTpiLkNhbnZhc1RpbnRlci50aW50V2l0aFBlclBpeGVsLGIuQ2FudmFzUmVuZGVyZXI9ZnVuY3Rpb24oYSxjLGQsZSl7Yi5kZWZhdWx0UmVuZGVyZXJ8fChiLnNheUhlbGxvKFwiQ2FudmFzXCIpLGIuZGVmYXVsdFJlbmRlcmVyPXRoaXMpLHRoaXMudHlwZT1iLkNBTlZBU19SRU5ERVJFUix0aGlzLmNsZWFyQmVmb3JlUmVuZGVyPSEwLHRoaXMudHJhbnNwYXJlbnQ9ISFlLGIuYmxlbmRNb2Rlc0NhbnZhc3x8KGIuYmxlbmRNb2Rlc0NhbnZhcz1bXSxiLmNhblVzZU5ld0NhbnZhc0JsZW5kTW9kZXMoKT8oYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5OT1JNQUxdPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkFERF09XCJsaWdodGVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5NVUxUSVBMWV09XCJtdWx0aXBseVwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuU0NSRUVOXT1cInNjcmVlblwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuT1ZFUkxBWV09XCJvdmVybGF5XCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5EQVJLRU5dPVwiZGFya2VuXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5MSUdIVEVOXT1cImxpZ2h0ZW5cIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkNPTE9SX0RPREdFXT1cImNvbG9yLWRvZGdlXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5DT0xPUl9CVVJOXT1cImNvbG9yLWJ1cm5cIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkhBUkRfTElHSFRdPVwiaGFyZC1saWdodFwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuU09GVF9MSUdIVF09XCJzb2Z0LWxpZ2h0XCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5ESUZGRVJFTkNFXT1cImRpZmZlcmVuY2VcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkVYQ0xVU0lPTl09XCJleGNsdXNpb25cIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkhVRV09XCJodWVcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLlNBVFVSQVRJT05dPVwic2F0dXJhdGlvblwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuQ09MT1JdPVwiY29sb3JcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkxVTUlOT1NJVFldPVwibHVtaW5vc2l0eVwiKTooYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5OT1JNQUxdPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkFERF09XCJsaWdodGVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5NVUxUSVBMWV09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuU0NSRUVOXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5PVkVSTEFZXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5EQVJLRU5dPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkxJR0hURU5dPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkNPTE9SX0RPREdFXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5DT0xPUl9CVVJOXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5IQVJEX0xJR0hUXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5TT0ZUX0xJR0hUXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5ESUZGRVJFTkNFXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5FWENMVVNJT05dPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkhVRV09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuU0FUVVJBVElPTl09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuQ09MT1JdPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkxVTUlOT1NJVFldPVwic291cmNlLW92ZXJcIikpLHRoaXMud2lkdGg9YXx8ODAwLHRoaXMuaGVpZ2h0PWN8fDYwMCx0aGlzLnZpZXc9ZHx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSx0aGlzLmNvbnRleHQ9dGhpcy52aWV3LmdldENvbnRleHQoXCIyZFwiLHthbHBoYTp0aGlzLnRyYW5zcGFyZW50fSksdGhpcy5yZWZyZXNoPSEwLHRoaXMudmlldy53aWR0aD10aGlzLndpZHRoLHRoaXMudmlldy5oZWlnaHQ9dGhpcy5oZWlnaHQsdGhpcy5jb3VudD0wLHRoaXMubWFza01hbmFnZXI9bmV3IGIuQ2FudmFzTWFza01hbmFnZXIsdGhpcy5yZW5kZXJTZXNzaW9uPXtjb250ZXh0OnRoaXMuY29udGV4dCxtYXNrTWFuYWdlcjp0aGlzLm1hc2tNYW5hZ2VyLHNjYWxlTW9kZTpudWxsLHNtb290aFByb3BlcnR5Om51bGwscm91bmRQaXhlbHM6ITF9LFwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkXCJpbiB0aGlzLmNvbnRleHQ/dGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5PVwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI6XCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcImluIHRoaXMuY29udGV4dD90aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHk9XCJ3ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWRcIjpcIm1vekltYWdlU21vb3RoaW5nRW5hYmxlZFwiaW4gdGhpcy5jb250ZXh0P3RoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eT1cIm1vekltYWdlU21vb3RoaW5nRW5hYmxlZFwiOlwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiaW4gdGhpcy5jb250ZXh0JiYodGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5PVwib0ltYWdlU21vb3RoaW5nRW5hYmxlZFwiKX0sYi5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5DYW52YXNSZW5kZXJlcixiLkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oYSl7Yi50ZXh0dXJlc1RvVXBkYXRlLmxlbmd0aD0wLGIudGV4dHVyZXNUb0Rlc3Ryb3kubGVuZ3RoPTAsYS51cGRhdGVUcmFuc2Zvcm0oKSx0aGlzLmNvbnRleHQuc2V0VHJhbnNmb3JtKDEsMCwwLDEsMCwwKSx0aGlzLmNvbnRleHQuZ2xvYmFsQWxwaGE9MSxuYXZpZ2F0b3IuaXNDb2Nvb25KUyYmdGhpcy52aWV3LnNjcmVlbmNhbnZhcyYmKHRoaXMuY29udGV4dC5maWxsU3R5bGU9XCJibGFja1wiLHRoaXMuY29udGV4dC5jbGVhcigpKSwhdGhpcy50cmFuc3BhcmVudCYmdGhpcy5jbGVhckJlZm9yZVJlbmRlcj8odGhpcy5jb250ZXh0LmZpbGxTdHlsZT1hLmJhY2tncm91bmRDb2xvclN0cmluZyx0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwwLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpKTp0aGlzLnRyYW5zcGFyZW50JiZ0aGlzLmNsZWFyQmVmb3JlUmVuZGVyJiZ0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSx0aGlzLnJlbmRlckRpc3BsYXlPYmplY3QoYSksYS5pbnRlcmFjdGl2ZSYmKGEuX2ludGVyYWN0aXZlRXZlbnRzQWRkZWR8fChhLl9pbnRlcmFjdGl2ZUV2ZW50c0FkZGVkPSEwLGEuaW50ZXJhY3Rpb25NYW5hZ2VyLnNldFRhcmdldCh0aGlzKSkpLGIuVGV4dHVyZS5mcmFtZVVwZGF0ZXMubGVuZ3RoPjAmJihiLlRleHR1cmUuZnJhbWVVcGRhdGVzLmxlbmd0aD0wKVxufSxiLkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZXNpemU9ZnVuY3Rpb24oYSxiKXt0aGlzLndpZHRoPWEsdGhpcy5oZWlnaHQ9Yix0aGlzLnZpZXcud2lkdGg9YSx0aGlzLnZpZXcuaGVpZ2h0PWJ9LGIuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlckRpc3BsYXlPYmplY3Q9ZnVuY3Rpb24oYSxiKXt0aGlzLnJlbmRlclNlc3Npb24uY29udGV4dD1ifHx0aGlzLmNvbnRleHQsYS5fcmVuZGVyQ2FudmFzKHRoaXMucmVuZGVyU2Vzc2lvbil9LGIuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlclN0cmlwRmxhdD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmNvbnRleHQsYz1hLnZlcnRpY2llcyxkPWMubGVuZ3RoLzI7dGhpcy5jb3VudCsrLGIuYmVnaW5QYXRoKCk7Zm9yKHZhciBlPTE7ZC0yPmU7ZSsrKXt2YXIgZj0yKmUsZz1jW2ZdLGg9Y1tmKzJdLGk9Y1tmKzRdLGo9Y1tmKzFdLGs9Y1tmKzNdLGw9Y1tmKzVdO2IubW92ZVRvKGcsaiksYi5saW5lVG8oaCxrKSxiLmxpbmVUbyhpLGwpfWIuZmlsbFN0eWxlPVwiI0ZGMDAwMFwiLGIuZmlsbCgpLGIuY2xvc2VQYXRoKCl9LGIuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLnJlbmRlclN0cmlwPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuY29udGV4dCxjPWEudmVydGljaWVzLGQ9YS51dnMsZT1jLmxlbmd0aC8yO3RoaXMuY291bnQrKztmb3IodmFyIGY9MTtlLTI+ZjtmKyspe3ZhciBnPTIqZixoPWNbZ10saT1jW2crMl0saj1jW2crNF0saz1jW2crMV0sbD1jW2crM10sbT1jW2crNV0sbj1kW2ddKmEudGV4dHVyZS53aWR0aCxvPWRbZysyXSphLnRleHR1cmUud2lkdGgscD1kW2crNF0qYS50ZXh0dXJlLndpZHRoLHE9ZFtnKzFdKmEudGV4dHVyZS5oZWlnaHQscj1kW2crM10qYS50ZXh0dXJlLmhlaWdodCxzPWRbZys1XSphLnRleHR1cmUuaGVpZ2h0O2Iuc2F2ZSgpLGIuYmVnaW5QYXRoKCksYi5tb3ZlVG8oaCxrKSxiLmxpbmVUbyhpLGwpLGIubGluZVRvKGosbSksYi5jbG9zZVBhdGgoKSxiLmNsaXAoKTt2YXIgdD1uKnIrcSpwK28qcy1yKnAtcSpvLW4qcyx1PWgqcitxKmoraSpzLXIqai1xKmktaCpzLHY9bippK2gqcCtvKmotaSpwLWgqby1uKmosdz1uKnIqaitxKmkqcCtoKm8qcy1oKnIqcC1xKm8qai1uKmkqcyx4PWsqcitxKm0rbCpzLXIqbS1xKmwtaypzLHk9bipsK2sqcCtvKm0tbCpwLWsqby1uKm0sej1uKnIqbStxKmwqcCtrKm8qcy1rKnIqcC1xKm8qbS1uKmwqcztiLnRyYW5zZm9ybSh1L3QseC90LHYvdCx5L3Qsdy90LHovdCksYi5kcmF3SW1hZ2UoYS50ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZSwwLDApLGIucmVzdG9yZSgpfX0sYi5DYW52YXNCdWZmZXI9ZnVuY3Rpb24oYSxiKXt0aGlzLndpZHRoPWEsdGhpcy5oZWlnaHQ9Yix0aGlzLmNhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLHRoaXMuY29udGV4dD10aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksdGhpcy5jYW52YXMud2lkdGg9YSx0aGlzLmNhbnZhcy5oZWlnaHQ9Yn0sYi5DYW52YXNCdWZmZXIucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCl9LGIuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5yZXNpemU9ZnVuY3Rpb24oYSxiKXt0aGlzLndpZHRoPXRoaXMuY2FudmFzLndpZHRoPWEsdGhpcy5oZWlnaHQ9dGhpcy5jYW52YXMuaGVpZ2h0PWJ9LGIuQ2FudmFzR3JhcGhpY3M9ZnVuY3Rpb24oKXt9LGIuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3M9ZnVuY3Rpb24oYSxjKXtmb3IodmFyIGQ9YS53b3JsZEFscGhhLGU9XCJcIixmPTA7ZjxhLmdyYXBoaWNzRGF0YS5sZW5ndGg7ZisrKXt2YXIgZz1hLmdyYXBoaWNzRGF0YVtmXSxoPWcucG9pbnRzO2lmKGMuc3Ryb2tlU3R5bGU9ZT1cIiNcIisoXCIwMDAwMFwiKygwfGcubGluZUNvbG9yKS50b1N0cmluZygxNikpLnN1YnN0cigtNiksYy5saW5lV2lkdGg9Zy5saW5lV2lkdGgsZy50eXBlPT09Yi5HcmFwaGljcy5QT0xZKXtjLmJlZ2luUGF0aCgpLGMubW92ZVRvKGhbMF0saFsxXSk7Zm9yKHZhciBpPTE7aTxoLmxlbmd0aC8yO2krKyljLmxpbmVUbyhoWzIqaV0saFsyKmkrMV0pO2hbMF09PT1oW2gubGVuZ3RoLTJdJiZoWzFdPT09aFtoLmxlbmd0aC0xXSYmYy5jbG9zZVBhdGgoKSxnLmZpbGwmJihjLmdsb2JhbEFscGhhPWcuZmlsbEFscGhhKmQsYy5maWxsU3R5bGU9ZT1cIiNcIisoXCIwMDAwMFwiKygwfGcuZmlsbENvbG9yKS50b1N0cmluZygxNikpLnN1YnN0cigtNiksYy5maWxsKCkpLGcubGluZVdpZHRoJiYoYy5nbG9iYWxBbHBoYT1nLmxpbmVBbHBoYSpkLGMuc3Ryb2tlKCkpfWVsc2UgaWYoZy50eXBlPT09Yi5HcmFwaGljcy5SRUNUKShnLmZpbGxDb2xvcnx8MD09PWcuZmlsbENvbG9yKSYmKGMuZ2xvYmFsQWxwaGE9Zy5maWxsQWxwaGEqZCxjLmZpbGxTdHlsZT1lPVwiI1wiKyhcIjAwMDAwXCIrKDB8Zy5maWxsQ29sb3IpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KSxjLmZpbGxSZWN0KGhbMF0saFsxXSxoWzJdLGhbM10pKSxnLmxpbmVXaWR0aCYmKGMuZ2xvYmFsQWxwaGE9Zy5saW5lQWxwaGEqZCxjLnN0cm9rZVJlY3QoaFswXSxoWzFdLGhbMl0saFszXSkpO2Vsc2UgaWYoZy50eXBlPT09Yi5HcmFwaGljcy5DSVJDKWMuYmVnaW5QYXRoKCksYy5hcmMoaFswXSxoWzFdLGhbMl0sMCwyKk1hdGguUEkpLGMuY2xvc2VQYXRoKCksZy5maWxsJiYoYy5nbG9iYWxBbHBoYT1nLmZpbGxBbHBoYSpkLGMuZmlsbFN0eWxlPWU9XCIjXCIrKFwiMDAwMDBcIisoMHxnLmZpbGxDb2xvcikudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpLGMuZmlsbCgpKSxnLmxpbmVXaWR0aCYmKGMuZ2xvYmFsQWxwaGE9Zy5saW5lQWxwaGEqZCxjLnN0cm9rZSgpKTtlbHNlIGlmKGcudHlwZT09PWIuR3JhcGhpY3MuRUxJUCl7dmFyIGo9Zy5wb2ludHMsaz0yKmpbMl0sbD0yKmpbM10sbT1qWzBdLWsvMixuPWpbMV0tbC8yO2MuYmVnaW5QYXRoKCk7dmFyIG89LjU1MjI4NDgscD1rLzIqbyxxPWwvMipvLHI9bStrLHM9bitsLHQ9bStrLzIsdT1uK2wvMjtjLm1vdmVUbyhtLHUpLGMuYmV6aWVyQ3VydmVUbyhtLHUtcSx0LXAsbix0LG4pLGMuYmV6aWVyQ3VydmVUbyh0K3AsbixyLHUtcSxyLHUpLGMuYmV6aWVyQ3VydmVUbyhyLHUrcSx0K3Ascyx0LHMpLGMuYmV6aWVyQ3VydmVUbyh0LXAscyxtLHUrcSxtLHUpLGMuY2xvc2VQYXRoKCksZy5maWxsJiYoYy5nbG9iYWxBbHBoYT1nLmZpbGxBbHBoYSpkLGMuZmlsbFN0eWxlPWU9XCIjXCIrKFwiMDAwMDBcIisoMHxnLmZpbGxDb2xvcikudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpLGMuZmlsbCgpKSxnLmxpbmVXaWR0aCYmKGMuZ2xvYmFsQWxwaGE9Zy5saW5lQWxwaGEqZCxjLnN0cm9rZSgpKX1lbHNlIGlmKGcudHlwZT09PWIuR3JhcGhpY3MuUlJFQyl7dmFyIHY9aFswXSx3PWhbMV0seD1oWzJdLHk9aFszXSx6PWhbNF0sQT1NYXRoLm1pbih4LHkpLzJ8MDt6PXo+QT9BOnosYy5iZWdpblBhdGgoKSxjLm1vdmVUbyh2LHcreiksYy5saW5lVG8odix3K3kteiksYy5xdWFkcmF0aWNDdXJ2ZVRvKHYsdyt5LHYreix3K3kpLGMubGluZVRvKHYreC16LHcreSksYy5xdWFkcmF0aWNDdXJ2ZVRvKHYreCx3K3ksdit4LHcreS16KSxjLmxpbmVUbyh2K3gsdyt6KSxjLnF1YWRyYXRpY0N1cnZlVG8odit4LHcsdit4LXosdyksYy5saW5lVG8odit6LHcpLGMucXVhZHJhdGljQ3VydmVUbyh2LHcsdix3K3opLGMuY2xvc2VQYXRoKCksKGcuZmlsbENvbG9yfHwwPT09Zy5maWxsQ29sb3IpJiYoYy5nbG9iYWxBbHBoYT1nLmZpbGxBbHBoYSpkLGMuZmlsbFN0eWxlPWU9XCIjXCIrKFwiMDAwMDBcIisoMHxnLmZpbGxDb2xvcikudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpLGMuZmlsbCgpKSxnLmxpbmVXaWR0aCYmKGMuZ2xvYmFsQWxwaGE9Zy5saW5lQWxwaGEqZCxjLnN0cm9rZSgpKX19fSxiLkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzTWFzaz1mdW5jdGlvbihhLGMpe3ZhciBkPWEuZ3JhcGhpY3NEYXRhLmxlbmd0aDtpZigwIT09ZCl7ZD4xJiYoZD0xLHdpbmRvdy5jb25zb2xlLmxvZyhcIlBpeGkuanMgd2FybmluZzogbWFza3MgaW4gY2FudmFzIGNhbiBvbmx5IG1hc2sgdXNpbmcgdGhlIGZpcnN0IHBhdGggaW4gdGhlIGdyYXBoaWNzIG9iamVjdFwiKSk7Zm9yKHZhciBlPTA7MT5lO2UrKyl7dmFyIGY9YS5ncmFwaGljc0RhdGFbZV0sZz1mLnBvaW50cztpZihmLnR5cGU9PT1iLkdyYXBoaWNzLlBPTFkpe2MuYmVnaW5QYXRoKCksYy5tb3ZlVG8oZ1swXSxnWzFdKTtmb3IodmFyIGg9MTtoPGcubGVuZ3RoLzI7aCsrKWMubGluZVRvKGdbMipoXSxnWzIqaCsxXSk7Z1swXT09PWdbZy5sZW5ndGgtMl0mJmdbMV09PT1nW2cubGVuZ3RoLTFdJiZjLmNsb3NlUGF0aCgpfWVsc2UgaWYoZi50eXBlPT09Yi5HcmFwaGljcy5SRUNUKWMuYmVnaW5QYXRoKCksYy5yZWN0KGdbMF0sZ1sxXSxnWzJdLGdbM10pLGMuY2xvc2VQYXRoKCk7ZWxzZSBpZihmLnR5cGU9PT1iLkdyYXBoaWNzLkNJUkMpYy5iZWdpblBhdGgoKSxjLmFyYyhnWzBdLGdbMV0sZ1syXSwwLDIqTWF0aC5QSSksYy5jbG9zZVBhdGgoKTtlbHNlIGlmKGYudHlwZT09PWIuR3JhcGhpY3MuRUxJUCl7dmFyIGk9Zi5wb2ludHMsaj0yKmlbMl0saz0yKmlbM10sbD1pWzBdLWovMixtPWlbMV0tay8yO2MuYmVnaW5QYXRoKCk7dmFyIG49LjU1MjI4NDgsbz1qLzIqbixwPWsvMipuLHE9bCtqLHI9bStrLHM9bCtqLzIsdD1tK2svMjtjLm1vdmVUbyhsLHQpLGMuYmV6aWVyQ3VydmVUbyhsLHQtcCxzLW8sbSxzLG0pLGMuYmV6aWVyQ3VydmVUbyhzK28sbSxxLHQtcCxxLHQpLGMuYmV6aWVyQ3VydmVUbyhxLHQrcCxzK28scixzLHIpLGMuYmV6aWVyQ3VydmVUbyhzLW8scixsLHQrcCxsLHQpLGMuY2xvc2VQYXRoKCl9ZWxzZSBpZihmLnR5cGU9PT1iLkdyYXBoaWNzLlJSRUMpe3ZhciB1PWdbMF0sdj1nWzFdLHc9Z1syXSx4PWdbM10seT1nWzRdLHo9TWF0aC5taW4odyx4KS8yfDA7eT15Pno/ejp5LGMuYmVnaW5QYXRoKCksYy5tb3ZlVG8odSx2K3kpLGMubGluZVRvKHUsdit4LXkpLGMucXVhZHJhdGljQ3VydmVUbyh1LHYreCx1K3ksdit4KSxjLmxpbmVUbyh1K3cteSx2K3gpLGMucXVhZHJhdGljQ3VydmVUbyh1K3csdit4LHUrdyx2K3gteSksYy5saW5lVG8odSt3LHYreSksYy5xdWFkcmF0aWNDdXJ2ZVRvKHUrdyx2LHUrdy15LHYpLGMubGluZVRvKHUreSx2KSxjLnF1YWRyYXRpY0N1cnZlVG8odSx2LHUsdit5KSxjLmNsb3NlUGF0aCgpfX19fSxiLkdyYXBoaWNzPWZ1bmN0aW9uKCl7Yi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNhbGwodGhpcyksdGhpcy5yZW5kZXJhYmxlPSEwLHRoaXMuZmlsbEFscGhhPTEsdGhpcy5saW5lV2lkdGg9MCx0aGlzLmxpbmVDb2xvcj1cImJsYWNrXCIsdGhpcy5ncmFwaGljc0RhdGE9W10sdGhpcy50aW50PTE2Nzc3MjE1LHRoaXMuYmxlbmRNb2RlPWIuYmxlbmRNb2Rlcy5OT1JNQUwsdGhpcy5jdXJyZW50UGF0aD17cG9pbnRzOltdfSx0aGlzLl93ZWJHTD1bXSx0aGlzLmlzTWFzaz0hMSx0aGlzLmJvdW5kcz1udWxsLHRoaXMuYm91bmRzUGFkZGluZz0xMCx0aGlzLmRpcnR5PSEwfSxiLkdyYXBoaWNzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpLGIuR3JhcGhpY3MucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuR3JhcGhpY3MsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuR3JhcGhpY3MucHJvdG90eXBlLFwiY2FjaGVBc0JpdG1hcFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fY2FjaGVBc0JpdG1hcH0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuX2NhY2hlQXNCaXRtYXA9YSx0aGlzLl9jYWNoZUFzQml0bWFwP3RoaXMuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlKCk6KHRoaXMuZGVzdHJveUNhY2hlZFNwcml0ZSgpLHRoaXMuZGlydHk9ITApfX0pLGIuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVTdHlsZT1mdW5jdGlvbihhLGMsZCl7cmV0dXJuIHRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aHx8dGhpcy5ncmFwaGljc0RhdGEucG9wKCksdGhpcy5saW5lV2lkdGg9YXx8MCx0aGlzLmxpbmVDb2xvcj1jfHwwLHRoaXMubGluZUFscGhhPWFyZ3VtZW50cy5sZW5ndGg8Mz8xOmQsdGhpcy5jdXJyZW50UGF0aD17bGluZVdpZHRoOnRoaXMubGluZVdpZHRoLGxpbmVDb2xvcjp0aGlzLmxpbmVDb2xvcixsaW5lQWxwaGE6dGhpcy5saW5lQWxwaGEsZmlsbENvbG9yOnRoaXMuZmlsbENvbG9yLGZpbGxBbHBoYTp0aGlzLmZpbGxBbHBoYSxmaWxsOnRoaXMuZmlsbGluZyxwb2ludHM6W10sdHlwZTpiLkdyYXBoaWNzLlBPTFl9LHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2godGhpcy5jdXJyZW50UGF0aCksdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUubW92ZVRvPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIHRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aHx8dGhpcy5ncmFwaGljc0RhdGEucG9wKCksdGhpcy5jdXJyZW50UGF0aD10aGlzLmN1cnJlbnRQYXRoPXtsaW5lV2lkdGg6dGhpcy5saW5lV2lkdGgsbGluZUNvbG9yOnRoaXMubGluZUNvbG9yLGxpbmVBbHBoYTp0aGlzLmxpbmVBbHBoYSxmaWxsQ29sb3I6dGhpcy5maWxsQ29sb3IsZmlsbEFscGhhOnRoaXMuZmlsbEFscGhhLGZpbGw6dGhpcy5maWxsaW5nLHBvaW50czpbXSx0eXBlOmIuR3JhcGhpY3MuUE9MWX0sdGhpcy5jdXJyZW50UGF0aC5wb2ludHMucHVzaChhLGMpLHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2godGhpcy5jdXJyZW50UGF0aCksdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUubGluZVRvPWZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMuY3VycmVudFBhdGgucG9pbnRzLnB1c2goYSxiKSx0aGlzLmRpcnR5PSEwLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLnF1YWRyYXRpY0N1cnZlVG89ZnVuY3Rpb24oYSxiLGMsZCl7MD09PXRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aCYmdGhpcy5tb3ZlVG8oMCwwKTt2YXIgZSxmLGc9MjAsaD10aGlzLmN1cnJlbnRQYXRoLnBvaW50czswPT09aC5sZW5ndGgmJnRoaXMubW92ZVRvKDAsMCk7Zm9yKHZhciBpPWhbaC5sZW5ndGgtMl0saj1oW2gubGVuZ3RoLTFdLGs9MCxsPTE7Zz49bDtsKyspaz1sL2csZT1pKyhhLWkpKmssZj1qKyhiLWopKmssaC5wdXNoKGUrKGErKGMtYSkqay1lKSprLGYrKGIrKGQtYikqay1mKSprKTtyZXR1cm4gdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5iZXppZXJDdXJ2ZVRvPWZ1bmN0aW9uKGEsYixjLGQsZSxmKXswPT09dGhpcy5jdXJyZW50UGF0aC5wb2ludHMubGVuZ3RoJiZ0aGlzLm1vdmVUbygwLDApO2Zvcih2YXIgZyxoLGksaixrLGw9MjAsbT10aGlzLmN1cnJlbnRQYXRoLnBvaW50cyxuPW1bbS5sZW5ndGgtMl0sbz1tW20ubGVuZ3RoLTFdLHA9MCxxPTE7bD5xO3ErKylwPXEvbCxnPTEtcCxoPWcqZyxpPWgqZyxqPXAqcCxrPWoqcCxtLnB1c2goaSpuKzMqaCpwKmErMypnKmoqYytrKmUsaSpvKzMqaCpwKmIrMypnKmoqZCtrKmYpO3JldHVybiB0aGlzLmRpcnR5PSEwLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmFyY1RvPWZ1bmN0aW9uKGEsYixjLGQsZSl7MD09PXRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aCYmdGhpcy5tb3ZlVG8oYSxiKTt2YXIgZj10aGlzLmN1cnJlbnRQYXRoLnBvaW50cyxnPWZbZi5sZW5ndGgtMl0saD1mW2YubGVuZ3RoLTFdLGk9aC1iLGo9Zy1hLGs9ZC1iLGw9Yy1hLG09TWF0aC5hYnMoaSpsLWoqayk7aWYoMWUtOD5tfHwwPT09ZSlmLnB1c2goYSxiKTtlbHNle3ZhciBuPWkqaStqKmosbz1rKmsrbCpsLHA9aSprK2oqbCxxPWUqTWF0aC5zcXJ0KG4pL20scj1lKk1hdGguc3FydChvKS9tLHM9cSpwL24sdD1yKnAvbyx1PXEqbCtyKmosdj1xKmsrcippLHc9aioocitzKSx4PWkqKHIrcykseT1sKihxK3QpLHo9ayoocSt0KSxBPU1hdGguYXRhbjIoeC12LHctdSksQj1NYXRoLmF0YW4yKHotdix5LXUpO3RoaXMuYXJjKHUrYSx2K2IsZSxBLEIsaiprPmwqaSl9cmV0dXJuIHRoaXMuZGlydHk9ITAsdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUuYXJjPWZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZz1hK01hdGguY29zKGQpKmMsaD1iK01hdGguc2luKGQpKmMsaT10aGlzLmN1cnJlbnRQYXRoLnBvaW50cztpZigoMCE9PWkubGVuZ3RoJiZpW2kubGVuZ3RoLTJdIT09Z3x8aVtpLmxlbmd0aC0xXSE9PWgpJiYodGhpcy5tb3ZlVG8oZyxoKSxpPXRoaXMuY3VycmVudFBhdGgucG9pbnRzKSxkPT09ZSlyZXR1cm4gdGhpczshZiYmZD49ZT9lKz0yKk1hdGguUEk6ZiYmZT49ZCYmKGQrPTIqTWF0aC5QSSk7dmFyIGo9Zj8tMSooZC1lKTplLWQsaz1NYXRoLmFicyhqKS8oMipNYXRoLlBJKSo0MDtpZigwPT09ailyZXR1cm4gdGhpcztmb3IodmFyIGw9ai8oMiprKSxtPTIqbCxuPU1hdGguY29zKGwpLG89TWF0aC5zaW4obCkscD1rLTEscT1wJTEvcCxyPTA7cD49cjtyKyspe3ZhciBzPXIrcSpyLHQ9bCtkK20qcyx1PU1hdGguY29zKHQpLHY9LU1hdGguc2luKHQpO2kucHVzaCgobip1K28qdikqYythLChuKi12K28qdSkqYytiKX1yZXR1cm4gdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3UGF0aD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5jdXJyZW50UGF0aC5wb2ludHMubGVuZ3RofHx0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKSx0aGlzLmN1cnJlbnRQYXRoPXRoaXMuY3VycmVudFBhdGg9e2xpbmVXaWR0aDp0aGlzLmxpbmVXaWR0aCxsaW5lQ29sb3I6dGhpcy5saW5lQ29sb3IsbGluZUFscGhhOnRoaXMubGluZUFscGhhLGZpbGxDb2xvcjp0aGlzLmZpbGxDb2xvcixmaWxsQWxwaGE6dGhpcy5maWxsQWxwaGEsZmlsbDp0aGlzLmZpbGxpbmcscG9pbnRzOltdLHR5cGU6Yi5HcmFwaGljcy5QT0xZfSx0aGlzLmdyYXBoaWNzRGF0YS5wdXNoKHRoaXMuY3VycmVudFBhdGgpLHRoaXMuY3VycmVudFBhdGgucG9pbnRzPXRoaXMuY3VycmVudFBhdGgucG9pbnRzLmNvbmNhdChhKSx0aGlzLmRpcnR5PSEwLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmJlZ2luRmlsbD1mdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLmZpbGxpbmc9ITAsdGhpcy5maWxsQ29sb3I9YXx8MCx0aGlzLmZpbGxBbHBoYT1hcmd1bWVudHMubGVuZ3RoPDI/MTpiLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmVuZEZpbGw9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWxsaW5nPSExLHRoaXMuZmlsbENvbG9yPW51bGwsdGhpcy5maWxsQWxwaGE9MSx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3UmVjdD1mdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gdGhpcy5jdXJyZW50UGF0aC5wb2ludHMubGVuZ3RofHx0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKSx0aGlzLmN1cnJlbnRQYXRoPXtsaW5lV2lkdGg6dGhpcy5saW5lV2lkdGgsbGluZUNvbG9yOnRoaXMubGluZUNvbG9yLGxpbmVBbHBoYTp0aGlzLmxpbmVBbHBoYSxmaWxsQ29sb3I6dGhpcy5maWxsQ29sb3IsZmlsbEFscGhhOnRoaXMuZmlsbEFscGhhLGZpbGw6dGhpcy5maWxsaW5nLHBvaW50czpbYSxjLGQsZV0sdHlwZTpiLkdyYXBoaWNzLlJFQ1R9LHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2godGhpcy5jdXJyZW50UGF0aCksdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Um91bmRlZFJlY3Q9ZnVuY3Rpb24oYSxjLGQsZSxmKXtyZXR1cm4gdGhpcy5jdXJyZW50UGF0aC5wb2ludHMubGVuZ3RofHx0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKSx0aGlzLmN1cnJlbnRQYXRoPXtsaW5lV2lkdGg6dGhpcy5saW5lV2lkdGgsbGluZUNvbG9yOnRoaXMubGluZUNvbG9yLGxpbmVBbHBoYTp0aGlzLmxpbmVBbHBoYSxmaWxsQ29sb3I6dGhpcy5maWxsQ29sb3IsZmlsbEFscGhhOnRoaXMuZmlsbEFscGhhLGZpbGw6dGhpcy5maWxsaW5nLHBvaW50czpbYSxjLGQsZSxmXSx0eXBlOmIuR3JhcGhpY3MuUlJFQ30sdGhpcy5ncmFwaGljc0RhdGEucHVzaCh0aGlzLmN1cnJlbnRQYXRoKSx0aGlzLmRpcnR5PSEwLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdDaXJjbGU9ZnVuY3Rpb24oYSxjLGQpe3JldHVybiB0aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5sZW5ndGh8fHRoaXMuZ3JhcGhpY3NEYXRhLnBvcCgpLHRoaXMuY3VycmVudFBhdGg9e2xpbmVXaWR0aDp0aGlzLmxpbmVXaWR0aCxsaW5lQ29sb3I6dGhpcy5saW5lQ29sb3IsbGluZUFscGhhOnRoaXMubGluZUFscGhhLGZpbGxDb2xvcjp0aGlzLmZpbGxDb2xvcixmaWxsQWxwaGE6dGhpcy5maWxsQWxwaGEsZmlsbDp0aGlzLmZpbGxpbmcscG9pbnRzOlthLGMsZCxkXSx0eXBlOmIuR3JhcGhpY3MuQ0lSQ30sdGhpcy5ncmFwaGljc0RhdGEucHVzaCh0aGlzLmN1cnJlbnRQYXRoKSx0aGlzLmRpcnR5PSEwLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmRyYXdFbGxpcHNlPWZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiB0aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5sZW5ndGh8fHRoaXMuZ3JhcGhpY3NEYXRhLnBvcCgpLHRoaXMuY3VycmVudFBhdGg9e2xpbmVXaWR0aDp0aGlzLmxpbmVXaWR0aCxsaW5lQ29sb3I6dGhpcy5saW5lQ29sb3IsbGluZUFscGhhOnRoaXMubGluZUFscGhhLGZpbGxDb2xvcjp0aGlzLmZpbGxDb2xvcixmaWxsQWxwaGE6dGhpcy5maWxsQWxwaGEsZmlsbDp0aGlzLmZpbGxpbmcscG9pbnRzOlthLGMsZCxlXSx0eXBlOmIuR3JhcGhpY3MuRUxJUH0sdGhpcy5ncmFwaGljc0RhdGEucHVzaCh0aGlzLmN1cnJlbnRQYXRoKSx0aGlzLmRpcnR5PSEwLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGluZVdpZHRoPTAsdGhpcy5maWxsaW5nPSExLHRoaXMuZGlydHk9ITAsdGhpcy5jbGVhckRpcnR5PSEwLHRoaXMuZ3JhcGhpY3NEYXRhPVtdLHRoaXMuYm91bmRzPW51bGwsdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUuZ2VuZXJhdGVUZXh0dXJlPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nZXRCb3VuZHMoKSxjPW5ldyBiLkNhbnZhc0J1ZmZlcihhLndpZHRoLGEuaGVpZ2h0KSxkPWIuVGV4dHVyZS5mcm9tQ2FudmFzKGMuY2FudmFzKTtyZXR1cm4gYy5jb250ZXh0LnRyYW5zbGF0ZSgtYS54LC1hLnkpLGIuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcyxjLmNvbnRleHQpLGR9LGIuR3JhcGhpY3MucHJvdG90eXBlLl9yZW5kZXJXZWJHTD1mdW5jdGlvbihhKXtpZih0aGlzLnZpc2libGUhPT0hMSYmMCE9PXRoaXMuYWxwaGEmJnRoaXMuaXNNYXNrIT09ITApe2lmKHRoaXMuX2NhY2hlQXNCaXRtYXApcmV0dXJuIHRoaXMuZGlydHkmJih0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpLGIudXBkYXRlV2ViR0xUZXh0dXJlKHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmJhc2VUZXh0dXJlLGEuZ2wpLHRoaXMuZGlydHk9ITEpLHRoaXMuX2NhY2hlZFNwcml0ZS5hbHBoYT10aGlzLmFscGhhLGIuU3ByaXRlLnByb3RvdHlwZS5fcmVuZGVyV2ViR0wuY2FsbCh0aGlzLl9jYWNoZWRTcHJpdGUsYSksdm9pZCAwO2lmKGEuc3ByaXRlQmF0Y2guc3RvcCgpLGEuYmxlbmRNb2RlTWFuYWdlci5zZXRCbGVuZE1vZGUodGhpcy5ibGVuZE1vZGUpLHRoaXMuX21hc2smJmEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzayxhKSx0aGlzLl9maWx0ZXJzJiZhLmZpbHRlck1hbmFnZXIucHVzaEZpbHRlcih0aGlzLl9maWx0ZXJCbG9jayksdGhpcy5ibGVuZE1vZGUhPT1hLnNwcml0ZUJhdGNoLmN1cnJlbnRCbGVuZE1vZGUpe2Euc3ByaXRlQmF0Y2guY3VycmVudEJsZW5kTW9kZT10aGlzLmJsZW5kTW9kZTt2YXIgYz1iLmJsZW5kTW9kZXNXZWJHTFthLnNwcml0ZUJhdGNoLmN1cnJlbnRCbGVuZE1vZGVdO2Euc3ByaXRlQmF0Y2guZ2wuYmxlbmRGdW5jKGNbMF0sY1sxXSl9aWYoYi5XZWJHTEdyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsYSksdGhpcy5jaGlsZHJlbi5sZW5ndGgpe2Euc3ByaXRlQmF0Y2guc3RhcnQoKTtmb3IodmFyIGQ9MCxlPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2U+ZDtkKyspdGhpcy5jaGlsZHJlbltkXS5fcmVuZGVyV2ViR0woYSk7YS5zcHJpdGVCYXRjaC5zdG9wKCl9dGhpcy5fZmlsdGVycyYmYS5maWx0ZXJNYW5hZ2VyLnBvcEZpbHRlcigpLHRoaXMuX21hc2smJmEubWFza01hbmFnZXIucG9wTWFzayh0aGlzLm1hc2ssYSksYS5kcmF3Q291bnQrKyxhLnNwcml0ZUJhdGNoLnN0YXJ0KCl9fSxiLkdyYXBoaWNzLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzPWZ1bmN0aW9uKGEpe2lmKHRoaXMudmlzaWJsZSE9PSExJiYwIT09dGhpcy5hbHBoYSYmdGhpcy5pc01hc2shPT0hMCl7dmFyIGM9YS5jb250ZXh0LGQ9dGhpcy53b3JsZFRyYW5zZm9ybTt0aGlzLmJsZW5kTW9kZSE9PWEuY3VycmVudEJsZW5kTW9kZSYmKGEuY3VycmVudEJsZW5kTW9kZT10aGlzLmJsZW5kTW9kZSxjLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj1iLmJsZW5kTW9kZXNDYW52YXNbYS5jdXJyZW50QmxlbmRNb2RlXSksdGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLGEuY29udGV4dCksYy5zZXRUcmFuc2Zvcm0oZC5hLGQuYyxkLmIsZC5kLGQudHgsZC50eSksYi5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLGMpO2Zvcih2YXIgZT0wLGY9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Zj5lO2UrKyl0aGlzLmNoaWxkcmVuW2VdLl9yZW5kZXJDYW52YXMoYSk7dGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wb3BNYXNrKGEuY29udGV4dCl9fSxiLkdyYXBoaWNzLnByb3RvdHlwZS5nZXRCb3VuZHM9ZnVuY3Rpb24oYSl7dGhpcy5ib3VuZHN8fHRoaXMudXBkYXRlQm91bmRzKCk7dmFyIGI9dGhpcy5ib3VuZHMueCxjPXRoaXMuYm91bmRzLndpZHRoK3RoaXMuYm91bmRzLngsZD10aGlzLmJvdW5kcy55LGU9dGhpcy5ib3VuZHMuaGVpZ2h0K3RoaXMuYm91bmRzLnksZj1hfHx0aGlzLndvcmxkVHJhbnNmb3JtLGc9Zi5hLGg9Zi5jLGk9Zi5iLGo9Zi5kLGs9Zi50eCxsPWYudHksbT1nKmMraSplK2ssbj1qKmUraCpjK2wsbz1nKmIraSplK2sscD1qKmUraCpiK2wscT1nKmIraSpkK2sscj1qKmQraCpiK2wscz1nKmMraSpkK2ssdD1qKmQraCpjK2wsdT1tLHY9bix3PW0seD1uO3c9dz5vP286dyx3PXc+cT9xOncsdz13PnM/czp3LHg9eD5wP3A6eCx4PXg+cj9yOngseD14PnQ/dDp4LHU9bz51P286dSx1PXE+dT9xOnUsdT1zPnU/czp1LHY9cD52P3A6dix2PXI+dj9yOnYsdj10PnY/dDp2O3ZhciB5PXRoaXMuX2JvdW5kcztyZXR1cm4geS54PXcseS53aWR0aD11LXcseS55PXgseS5oZWlnaHQ9di14LHl9LGIuR3JhcGhpY3MucHJvdG90eXBlLnVwZGF0ZUJvdW5kcz1mdW5jdGlvbigpe2Zvcih2YXIgYSxjLGQsZSxmLGc9MS8wLGg9LTEvMCxpPTEvMCxqPS0xLzAsaz0wO2s8dGhpcy5ncmFwaGljc0RhdGEubGVuZ3RoO2srKyl7dmFyIGw9dGhpcy5ncmFwaGljc0RhdGFba10sbT1sLnR5cGUsbj1sLmxpbmVXaWR0aDtpZihhPWwucG9pbnRzLG09PT1iLkdyYXBoaWNzLlJFQ1QpYz1hWzBdLW4vMixkPWFbMV0tbi8yLGU9YVsyXStuLGY9YVszXStuLGc9Zz5jP2M6ZyxoPWMrZT5oP2MrZTpoLGk9aT5kP2M6aSxqPWQrZj5qP2QrZjpqO2Vsc2UgaWYobT09PWIuR3JhcGhpY3MuQ0lSQ3x8bT09PWIuR3JhcGhpY3MuRUxJUCljPWFbMF0sZD1hWzFdLGU9YVsyXStuLzIsZj1hWzNdK24vMixnPWc+Yy1lP2MtZTpnLGg9YytlPmg/YytlOmgsaT1pPmQtZj9kLWY6aSxqPWQrZj5qP2QrZjpqO2Vsc2UgZm9yKHZhciBvPTA7bzxhLmxlbmd0aDtvKz0yKWM9YVtvXSxkPWFbbysxXSxnPWc+Yy1uP2MtbjpnLGg9YytuPmg/YytuOmgsaT1pPmQtbj9kLW46aSxqPWQrbj5qP2QrbjpqfXZhciBwPXRoaXMuYm91bmRzUGFkZGluZzt0aGlzLmJvdW5kcz1uZXcgYi5SZWN0YW5nbGUoZy1wLGktcCxoLWcrMipwLGotaSsyKnApfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGU9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdldExvY2FsQm91bmRzKCk7aWYodGhpcy5fY2FjaGVkU3ByaXRlKXRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIucmVzaXplKGEud2lkdGgsYS5oZWlnaHQpO2Vsc2V7dmFyIGM9bmV3IGIuQ2FudmFzQnVmZmVyKGEud2lkdGgsYS5oZWlnaHQpLGQ9Yi5UZXh0dXJlLmZyb21DYW52YXMoYy5jYW52YXMpO3RoaXMuX2NhY2hlZFNwcml0ZT1uZXcgYi5TcHJpdGUoZCksdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlcj1jLHRoaXMuX2NhY2hlZFNwcml0ZS53b3JsZFRyYW5zZm9ybT10aGlzLndvcmxkVHJhbnNmb3JtfXRoaXMuX2NhY2hlZFNwcml0ZS5hbmNob3IueD0tKGEueC9hLndpZHRoKSx0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLnk9LShhLnkvYS5oZWlnaHQpLHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dC50cmFuc2xhdGUoLWEueCwtYS55KSxiLkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsdGhpcy5fY2FjaGVkU3ByaXRlLmJ1ZmZlci5jb250ZXh0KSx0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGE9dGhpcy5hbHBoYX0sYi5HcmFwaGljcy5wcm90b3R5cGUuZGVzdHJveUNhY2hlZFNwcml0ZT1mdW5jdGlvbigpe3RoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3koITApLHRoaXMuX2NhY2hlZFNwcml0ZT1udWxsfSxiLkdyYXBoaWNzLlBPTFk9MCxiLkdyYXBoaWNzLlJFQ1Q9MSxiLkdyYXBoaWNzLkNJUkM9MixiLkdyYXBoaWNzLkVMSVA9MyxiLkdyYXBoaWNzLlJSRUM9NCxiLlN0cmlwPWZ1bmN0aW9uKGEpe2IuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpLHRoaXMudGV4dHVyZT1hLHRoaXMudXZzPW5ldyBiLkZsb2F0MzJBcnJheShbMCwxLDEsMSwxLDAsMCwxXSksdGhpcy52ZXJ0aWNpZXM9bmV3IGIuRmxvYXQzMkFycmF5KFswLDAsMTAwLDAsMTAwLDEwMCwwLDEwMF0pLHRoaXMuY29sb3JzPW5ldyBiLkZsb2F0MzJBcnJheShbMSwxLDEsMV0pLHRoaXMuaW5kaWNlcz1uZXcgYi5VaW50MTZBcnJheShbMCwxLDIsM10pLHRoaXMuZGlydHk9ITB9LGIuU3RyaXAucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSksYi5TdHJpcC5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5TdHJpcCxiLlN0cmlwLnByb3RvdHlwZS5fcmVuZGVyV2ViR0w9ZnVuY3Rpb24oYSl7IXRoaXMudmlzaWJsZXx8dGhpcy5hbHBoYTw9MHx8KGEuc3ByaXRlQmF0Y2guc3RvcCgpLHRoaXMuX3ZlcnRleEJ1ZmZlcnx8dGhpcy5faW5pdFdlYkdMKGEpLGEuc2hhZGVyTWFuYWdlci5zZXRTaGFkZXIoYS5zaGFkZXJNYW5hZ2VyLnN0cmlwU2hhZGVyKSx0aGlzLl9yZW5kZXJTdHJpcChhKSxhLnNwcml0ZUJhdGNoLnN0YXJ0KCkpfSxiLlN0cmlwLnByb3RvdHlwZS5faW5pdFdlYkdMPWZ1bmN0aW9uKGEpe3ZhciBiPWEuZ2w7dGhpcy5fdmVydGV4QnVmZmVyPWIuY3JlYXRlQnVmZmVyKCksdGhpcy5faW5kZXhCdWZmZXI9Yi5jcmVhdGVCdWZmZXIoKSx0aGlzLl91dkJ1ZmZlcj1iLmNyZWF0ZUJ1ZmZlcigpLHRoaXMuX2NvbG9yQnVmZmVyPWIuY3JlYXRlQnVmZmVyKCksYi5iaW5kQnVmZmVyKGIuQVJSQVlfQlVGRkVSLHRoaXMuX3ZlcnRleEJ1ZmZlciksYi5idWZmZXJEYXRhKGIuQVJSQVlfQlVGRkVSLHRoaXMudmVydGljaWVzLGIuRFlOQU1JQ19EUkFXKSxiLmJpbmRCdWZmZXIoYi5BUlJBWV9CVUZGRVIsdGhpcy5fdXZCdWZmZXIpLGIuYnVmZmVyRGF0YShiLkFSUkFZX0JVRkZFUix0aGlzLnV2cyxiLlNUQVRJQ19EUkFXKSxiLmJpbmRCdWZmZXIoYi5BUlJBWV9CVUZGRVIsdGhpcy5fY29sb3JCdWZmZXIpLGIuYnVmZmVyRGF0YShiLkFSUkFZX0JVRkZFUix0aGlzLmNvbG9ycyxiLlNUQVRJQ19EUkFXKSxiLmJpbmRCdWZmZXIoYi5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLl9pbmRleEJ1ZmZlciksYi5idWZmZXJEYXRhKGIuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRpY2VzLGIuU1RBVElDX0RSQVcpfSxiLlN0cmlwLnByb3RvdHlwZS5fcmVuZGVyU3RyaXA9ZnVuY3Rpb24oYSl7dmFyIGM9YS5nbCxkPWEucHJvamVjdGlvbixlPWEub2Zmc2V0LGY9YS5zaGFkZXJNYW5hZ2VyLnN0cmlwU2hhZGVyO2MuYmxlbmRGdW5jKGMuT05FLGMuT05FX01JTlVTX1NSQ19BTFBIQSksYy51bmlmb3JtTWF0cml4M2Z2KGYudHJhbnNsYXRpb25NYXRyaXgsITEsdGhpcy53b3JsZFRyYW5zZm9ybS50b0FycmF5KCEwKSksYy51bmlmb3JtMmYoZi5wcm9qZWN0aW9uVmVjdG9yLGQueCwtZC55KSxjLnVuaWZvcm0yZihmLm9mZnNldFZlY3RvciwtZS54LC1lLnkpLGMudW5pZm9ybTFmKGYuYWxwaGEsMSksdGhpcy5kaXJ0eT8odGhpcy5kaXJ0eT0hMSxjLmJpbmRCdWZmZXIoYy5BUlJBWV9CVUZGRVIsdGhpcy5fdmVydGV4QnVmZmVyKSxjLmJ1ZmZlckRhdGEoYy5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0aWNpZXMsYy5TVEFUSUNfRFJBVyksYy52ZXJ0ZXhBdHRyaWJQb2ludGVyKGYuYVZlcnRleFBvc2l0aW9uLDIsYy5GTE9BVCwhMSwwLDApLGMuYmluZEJ1ZmZlcihjLkFSUkFZX0JVRkZFUix0aGlzLl91dkJ1ZmZlciksYy5idWZmZXJEYXRhKGMuQVJSQVlfQlVGRkVSLHRoaXMudXZzLGMuU1RBVElDX0RSQVcpLGMudmVydGV4QXR0cmliUG9pbnRlcihmLmFUZXh0dXJlQ29vcmQsMixjLkZMT0FULCExLDAsMCksYy5hY3RpdmVUZXh0dXJlKGMuVEVYVFVSRTApLGMuYmluZFRleHR1cmUoYy5URVhUVVJFXzJELHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5fZ2xUZXh0dXJlc1tjLmlkXXx8Yi5jcmVhdGVXZWJHTFRleHR1cmUodGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLGMpKSxjLmJpbmRCdWZmZXIoYy5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLl9pbmRleEJ1ZmZlciksYy5idWZmZXJEYXRhKGMuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRpY2VzLGMuU1RBVElDX0RSQVcpKTooYy5iaW5kQnVmZmVyKGMuQVJSQVlfQlVGRkVSLHRoaXMuX3ZlcnRleEJ1ZmZlciksYy5idWZmZXJTdWJEYXRhKGMuQVJSQVlfQlVGRkVSLDAsdGhpcy52ZXJ0aWNpZXMpLGMudmVydGV4QXR0cmliUG9pbnRlcihmLmFWZXJ0ZXhQb3NpdGlvbiwyLGMuRkxPQVQsITEsMCwwKSxjLmJpbmRCdWZmZXIoYy5BUlJBWV9CVUZGRVIsdGhpcy5fdXZCdWZmZXIpLGMudmVydGV4QXR0cmliUG9pbnRlcihmLmFUZXh0dXJlQ29vcmQsMixjLkZMT0FULCExLDAsMCksYy5hY3RpdmVUZXh0dXJlKGMuVEVYVFVSRTApLGMuYmluZFRleHR1cmUoYy5URVhUVVJFXzJELHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5fZ2xUZXh0dXJlc1tjLmlkXXx8Yi5jcmVhdGVXZWJHTFRleHR1cmUodGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLGMpKSxjLmJpbmRCdWZmZXIoYy5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLl9pbmRleEJ1ZmZlcikpLGMuZHJhd0VsZW1lbnRzKGMuVFJJQU5HTEVfU1RSSVAsdGhpcy5pbmRpY2VzLmxlbmd0aCxjLlVOU0lHTkVEX1NIT1JULDApfSxiLlN0cmlwLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzPWZ1bmN0aW9uKGEpe3ZhciBiPWEuY29udGV4dCxjPXRoaXMud29ybGRUcmFuc2Zvcm07YS5yb3VuZFBpeGVscz9iLnNldFRyYW5zZm9ybShjLmEsYy5jLGMuYixjLmQsMHxjLnR4LDB8Yy50eSk6Yi5zZXRUcmFuc2Zvcm0oYy5hLGMuYyxjLmIsYy5kLGMudHgsYy50eSk7dmFyIGQ9dGhpcyxlPWQudmVydGljaWVzLGY9ZC51dnMsZz1lLmxlbmd0aC8yO3RoaXMuY291bnQrKztmb3IodmFyIGg9MDtnLTI+aDtoKyspe3ZhciBpPTIqaCxqPWVbaV0saz1lW2krMl0sbD1lW2krNF0sbT1lW2krMV0sbj1lW2krM10sbz1lW2krNV0scD0oaitrK2wpLzMscT0obStuK28pLzMscj1qLXAscz1tLXEsdD1NYXRoLnNxcnQocipyK3Mqcyk7aj1wK3IvdCoodCszKSxtPXErcy90Kih0KzMpLHI9ay1wLHM9bi1xLHQ9TWF0aC5zcXJ0KHIqcitzKnMpLGs9cCtyL3QqKHQrMyksbj1xK3MvdCoodCszKSxyPWwtcCxzPW8tcSx0PU1hdGguc3FydChyKnIrcypzKSxsPXArci90Kih0KzMpLG89cStzL3QqKHQrMyk7dmFyIHU9ZltpXSpkLnRleHR1cmUud2lkdGgsdj1mW2krMl0qZC50ZXh0dXJlLndpZHRoLHc9ZltpKzRdKmQudGV4dHVyZS53aWR0aCx4PWZbaSsxXSpkLnRleHR1cmUuaGVpZ2h0LHk9ZltpKzNdKmQudGV4dHVyZS5oZWlnaHQsej1mW2krNV0qZC50ZXh0dXJlLmhlaWdodDtiLnNhdmUoKSxiLmJlZ2luUGF0aCgpLGIubW92ZVRvKGosbSksYi5saW5lVG8oayxuKSxiLmxpbmVUbyhsLG8pLGIuY2xvc2VQYXRoKCksYi5jbGlwKCk7dmFyIEE9dSp5K3gqdyt2KnoteSp3LXgqdi11KnosQj1qKnkreCpsK2sqei15KmwteCprLWoqeixDPXUqaytqKncrdipsLWsqdy1qKnYtdSpsLEQ9dSp5KmwreCprKncraip2Knotaip5KncteCp2KmwtdSprKnosRT1tKnkreCpvK24qei15Km8teCpuLW0qeixGPXUqbittKncrdipvLW4qdy1tKnYtdSpvLEc9dSp5Km8reCpuKncrbSp2KnotbSp5KncteCp2Km8tdSpuKno7Yi50cmFuc2Zvcm0oQi9BLEUvQSxDL0EsRi9BLEQvQSxHL0EpLGIuZHJhd0ltYWdlKGQudGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsMCwwKSxiLnJlc3RvcmUoKX19LGIuU3RyaXAucHJvdG90eXBlLm9uVGV4dHVyZVVwZGF0ZT1mdW5jdGlvbigpe3RoaXMudXBkYXRlRnJhbWU9ITB9LGIuUm9wZT1mdW5jdGlvbihhLGMpe2IuU3RyaXAuY2FsbCh0aGlzLGEpLHRoaXMucG9pbnRzPWMsdGhpcy52ZXJ0aWNpZXM9bmV3IGIuRmxvYXQzMkFycmF5KDQqYy5sZW5ndGgpLHRoaXMudXZzPW5ldyBiLkZsb2F0MzJBcnJheSg0KmMubGVuZ3RoKSx0aGlzLmNvbG9ycz1uZXcgYi5GbG9hdDMyQXJyYXkoMipjLmxlbmd0aCksdGhpcy5pbmRpY2VzPW5ldyBiLlVpbnQxNkFycmF5KDIqYy5sZW5ndGgpLHRoaXMucmVmcmVzaCgpfSxiLlJvcGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5TdHJpcC5wcm90b3R5cGUpLGIuUm9wZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5Sb3BlLGIuUm9wZS5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbigpe3ZhciBhPXRoaXMucG9pbnRzO2lmKCEoYS5sZW5ndGg8MSkpe3ZhciBiPXRoaXMudXZzLGM9YVswXSxkPXRoaXMuaW5kaWNlcyxlPXRoaXMuY29sb3JzO3RoaXMuY291bnQtPS4yLGJbMF09MCxiWzFdPTAsYlsyXT0wLGJbM109MSxlWzBdPTEsZVsxXT0xLGRbMF09MCxkWzFdPTE7Zm9yKHZhciBmLGcsaCxpPWEubGVuZ3RoLGo9MTtpPmo7aisrKWY9YVtqXSxnPTQqaixoPWovKGktMSksaiUyPyhiW2ddPWgsYltnKzFdPTAsYltnKzJdPWgsYltnKzNdPTEpOihiW2ddPWgsYltnKzFdPTAsYltnKzJdPWgsYltnKzNdPTEpLGc9MipqLGVbZ109MSxlW2crMV09MSxnPTIqaixkW2ddPWcsZFtnKzFdPWcrMSxjPWZ9fSxiLlJvcGUucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybT1mdW5jdGlvbigpe3ZhciBhPXRoaXMucG9pbnRzO2lmKCEoYS5sZW5ndGg8MSkpe3ZhciBjLGQ9YVswXSxlPXt4OjAseTowfTt0aGlzLmNvdW50LT0uMjtmb3IodmFyIGYsZyxoLGksaixrPXRoaXMudmVydGljaWVzLGw9YS5sZW5ndGgsbT0wO2w+bTttKyspZj1hW21dLGc9NCptLGM9bTxhLmxlbmd0aC0xP2FbbSsxXTpmLGUueT0tKGMueC1kLngpLGUueD1jLnktZC55LGg9MTAqKDEtbS8obC0xKSksaD4xJiYoaD0xKSxpPU1hdGguc3FydChlLngqZS54K2UueSplLnkpLGo9dGhpcy50ZXh0dXJlLmhlaWdodC8yLGUueC89aSxlLnkvPWksZS54Kj1qLGUueSo9aixrW2ddPWYueCtlLngsa1tnKzFdPWYueStlLnksa1tnKzJdPWYueC1lLngsa1tnKzNdPWYueS1lLnksZD1mO2IuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtLmNhbGwodGhpcyl9fSxiLlJvcGUucHJvdG90eXBlLnNldFRleHR1cmU9ZnVuY3Rpb24oYSl7dGhpcy50ZXh0dXJlPWF9LGIuVGlsaW5nU3ByaXRlPWZ1bmN0aW9uKGEsYyxkKXtiLlNwcml0ZS5jYWxsKHRoaXMsYSksdGhpcy5fd2lkdGg9Y3x8MTAwLHRoaXMuX2hlaWdodD1kfHwxMDAsdGhpcy50aWxlU2NhbGU9bmV3IGIuUG9pbnQoMSwxKSx0aGlzLnRpbGVTY2FsZU9mZnNldD1uZXcgYi5Qb2ludCgxLDEpLHRoaXMudGlsZVBvc2l0aW9uPW5ldyBiLlBvaW50KDAsMCksdGhpcy5yZW5kZXJhYmxlPSEwLHRoaXMudGludD0xNjc3NzIxNSx0aGlzLmJsZW5kTW9kZT1iLmJsZW5kTW9kZXMuTk9STUFMfSxiLlRpbGluZ1Nwcml0ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLlNwcml0ZS5wcm90b3R5cGUpLGIuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlRpbGluZ1Nwcml0ZSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLFwid2lkdGhcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dpZHRofSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5fd2lkdGg9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLFwiaGVpZ2h0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9oZWlnaHR9LHNldDpmdW5jdGlvbihhKXt0aGlzLl9oZWlnaHQ9YX19KSxiLlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuc2V0VGV4dHVyZT1mdW5jdGlvbihhKXt0aGlzLnRleHR1cmUhPT1hJiYodGhpcy50ZXh0dXJlPWEsdGhpcy5yZWZyZXNoVGV4dHVyZT0hMCx0aGlzLmNhY2hlZFRpbnQ9MTY3NzcyMTUpfSxiLlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuX3JlbmRlcldlYkdMPWZ1bmN0aW9uKGEpe2lmKHRoaXMudmlzaWJsZSE9PSExJiYwIT09dGhpcy5hbHBoYSl7dmFyIGMsZDtmb3IodGhpcy5fbWFzayYmKGEuc3ByaXRlQmF0Y2guc3RvcCgpLGEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5tYXNrLGEpLGEuc3ByaXRlQmF0Y2guc3RhcnQoKSksdGhpcy5fZmlsdGVycyYmKGEuc3ByaXRlQmF0Y2guZmx1c2goKSxhLmZpbHRlck1hbmFnZXIucHVzaEZpbHRlcih0aGlzLl9maWx0ZXJCbG9jaykpLCF0aGlzLnRpbGluZ1RleHR1cmV8fHRoaXMucmVmcmVzaFRleHR1cmU/KHRoaXMuZ2VuZXJhdGVUaWxpbmdUZXh0dXJlKCEwKSx0aGlzLnRpbGluZ1RleHR1cmUmJnRoaXMudGlsaW5nVGV4dHVyZS5uZWVkc1VwZGF0ZSYmKGIudXBkYXRlV2ViR0xUZXh0dXJlKHRoaXMudGlsaW5nVGV4dHVyZS5iYXNlVGV4dHVyZSxhLmdsKSx0aGlzLnRpbGluZ1RleHR1cmUubmVlZHNVcGRhdGU9ITEpKTphLnNwcml0ZUJhdGNoLnJlbmRlclRpbGluZ1Nwcml0ZSh0aGlzKSxjPTAsZD10aGlzLmNoaWxkcmVuLmxlbmd0aDtkPmM7YysrKXRoaXMuY2hpbGRyZW5bY10uX3JlbmRlcldlYkdMKGEpO2Euc3ByaXRlQmF0Y2guc3RvcCgpLHRoaXMuX2ZpbHRlcnMmJmEuZmlsdGVyTWFuYWdlci5wb3BGaWx0ZXIoKSx0aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnBvcE1hc2soYSksYS5zcHJpdGVCYXRjaC5zdGFydCgpfX0sYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXM9ZnVuY3Rpb24oYSl7aWYodGhpcy52aXNpYmxlIT09ITEmJjAhPT10aGlzLmFscGhhKXt2YXIgYz1hLmNvbnRleHQ7dGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLGMpLGMuZ2xvYmFsQWxwaGE9dGhpcy53b3JsZEFscGhhO3ZhciBkLGUsZj10aGlzLndvcmxkVHJhbnNmb3JtO2lmKGMuc2V0VHJhbnNmb3JtKGYuYSxmLmMsZi5iLGYuZCxmLnR4LGYudHkpLCF0aGlzLl9fdGlsZVBhdHRlcm58fHRoaXMucmVmcmVzaFRleHR1cmUpe2lmKHRoaXMuZ2VuZXJhdGVUaWxpbmdUZXh0dXJlKCExKSwhdGhpcy50aWxpbmdUZXh0dXJlKXJldHVybjt0aGlzLl9fdGlsZVBhdHRlcm49Yy5jcmVhdGVQYXR0ZXJuKHRoaXMudGlsaW5nVGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsXCJyZXBlYXRcIil9dGhpcy5ibGVuZE1vZGUhPT1hLmN1cnJlbnRCbGVuZE1vZGUmJihhLmN1cnJlbnRCbGVuZE1vZGU9dGhpcy5ibGVuZE1vZGUsYy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249Yi5ibGVuZE1vZGVzQ2FudmFzW2EuY3VycmVudEJsZW5kTW9kZV0pO3ZhciBnPXRoaXMudGlsZVBvc2l0aW9uLGg9dGhpcy50aWxlU2NhbGU7Zm9yKGcueCU9dGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLndpZHRoLGcueSU9dGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLmhlaWdodCxjLnNjYWxlKGgueCxoLnkpLGMudHJhbnNsYXRlKGcueCxnLnkpLGMuZmlsbFN0eWxlPXRoaXMuX190aWxlUGF0dGVybixjLmZpbGxSZWN0KC1nLngrdGhpcy5hbmNob3IueCotdGhpcy5fd2lkdGgsLWcueSt0aGlzLmFuY2hvci55Ki10aGlzLl9oZWlnaHQsdGhpcy5fd2lkdGgvaC54LHRoaXMuX2hlaWdodC9oLnkpLGMuc2NhbGUoMS9oLngsMS9oLnkpLGMudHJhbnNsYXRlKC1nLngsLWcueSksdGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wb3BNYXNrKGEuY29udGV4dCksZD0wLGU9dGhpcy5jaGlsZHJlbi5sZW5ndGg7ZT5kO2QrKyl0aGlzLmNoaWxkcmVuW2RdLl9yZW5kZXJDYW52YXMoYSl9fSxiLlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuZ2V0Qm91bmRzPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5fd2lkdGgsYj10aGlzLl9oZWlnaHQsYz1hKigxLXRoaXMuYW5jaG9yLngpLGQ9YSotdGhpcy5hbmNob3IueCxlPWIqKDEtdGhpcy5hbmNob3IueSksZj1iKi10aGlzLmFuY2hvci55LGc9dGhpcy53b3JsZFRyYW5zZm9ybSxoPWcuYSxpPWcuYyxqPWcuYixrPWcuZCxsPWcudHgsbT1nLnR5LG49aCpkK2oqZitsLG89aypmK2kqZCttLHA9aCpjK2oqZitsLHE9aypmK2kqYyttLHI9aCpjK2oqZStsLHM9ayplK2kqYyttLHQ9aCpkK2oqZStsLHU9ayplK2kqZCttLHY9LTEvMCx3PS0xLzAseD0xLzAseT0xLzA7eD14Pm4/bjp4LHg9eD5wP3A6eCx4PXg+cj9yOngseD14PnQ/dDp4LHk9eT5vP286eSx5PXk+cT9xOnkseT15PnM/czp5LHk9eT51P3U6eSx2PW4+dj9uOnYsdj1wPnY/cDp2LHY9cj52P3I6dix2PXQ+dj90OnYsdz1vPnc/bzp3LHc9cT53P3E6dyx3PXM+dz9zOncsdz11Pnc/dTp3O3ZhciB6PXRoaXMuX2JvdW5kcztyZXR1cm4gei54PXgsei53aWR0aD12LXgsei55PXksei5oZWlnaHQ9dy15LHRoaXMuX2N1cnJlbnRCb3VuZHM9eix6fSxiLlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUub25UZXh0dXJlVXBkYXRlPWZ1bmN0aW9uKCl7fSxiLlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuZ2VuZXJhdGVUaWxpbmdUZXh0dXJlPWZ1bmN0aW9uKGEpe2lmKHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5oYXNMb2FkZWQpe3ZhciBjLGQsZT10aGlzLnRleHR1cmUsZj1lLmZyYW1lLGc9Zi53aWR0aCE9PWUuYmFzZVRleHR1cmUud2lkdGh8fGYuaGVpZ2h0IT09ZS5iYXNlVGV4dHVyZS5oZWlnaHQsaD0hMTtpZihhPyhjPWIuZ2V0TmV4dFBvd2VyT2ZUd28oZi53aWR0aCksZD1iLmdldE5leHRQb3dlck9mVHdvKGYuaGVpZ2h0KSwoZi53aWR0aCE9PWN8fGYuaGVpZ2h0IT09ZCkmJihoPSEwKSk6ZyYmKGM9Zi53aWR0aCxkPWYuaGVpZ2h0LGg9ITApLGgpe3ZhciBpO3RoaXMudGlsaW5nVGV4dHVyZSYmdGhpcy50aWxpbmdUZXh0dXJlLmlzVGlsaW5nPyhpPXRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXIsaS5yZXNpemUoYyxkKSx0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUud2lkdGg9Yyx0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUuaGVpZ2h0PWQsdGhpcy50aWxpbmdUZXh0dXJlLm5lZWRzVXBkYXRlPSEwKTooaT1uZXcgYi5DYW52YXNCdWZmZXIoYyxkKSx0aGlzLnRpbGluZ1RleHR1cmU9Yi5UZXh0dXJlLmZyb21DYW52YXMoaS5jYW52YXMpLHRoaXMudGlsaW5nVGV4dHVyZS5jYW52YXNCdWZmZXI9aSx0aGlzLnRpbGluZ1RleHR1cmUuaXNUaWxpbmc9ITApLGkuY29udGV4dC5kcmF3SW1hZ2UoZS5iYXNlVGV4dHVyZS5zb3VyY2UsZS5jcm9wLngsZS5jcm9wLnksZS5jcm9wLndpZHRoLGUuY3JvcC5oZWlnaHQsMCwwLGMsZCksdGhpcy50aWxlU2NhbGVPZmZzZXQueD1mLndpZHRoL2MsdGhpcy50aWxlU2NhbGVPZmZzZXQueT1mLmhlaWdodC9kfWVsc2UgdGhpcy50aWxpbmdUZXh0dXJlJiZ0aGlzLnRpbGluZ1RleHR1cmUuaXNUaWxpbmcmJnRoaXMudGlsaW5nVGV4dHVyZS5kZXN0cm95KCEwKSx0aGlzLnRpbGVTY2FsZU9mZnNldC54PTEsdGhpcy50aWxlU2NhbGVPZmZzZXQueT0xLHRoaXMudGlsaW5nVGV4dHVyZT1lO3RoaXMucmVmcmVzaFRleHR1cmU9ITEsdGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLl9wb3dlck9mMj0hMH19O3ZhciBmPXt9O2YuQm9uZURhdGE9ZnVuY3Rpb24oYSxiKXt0aGlzLm5hbWU9YSx0aGlzLnBhcmVudD1ifSxmLkJvbmVEYXRhLnByb3RvdHlwZT17bGVuZ3RoOjAseDowLHk6MCxyb3RhdGlvbjowLHNjYWxlWDoxLHNjYWxlWToxfSxmLlNsb3REYXRhPWZ1bmN0aW9uKGEsYil7dGhpcy5uYW1lPWEsdGhpcy5ib25lRGF0YT1ifSxmLlNsb3REYXRhLnByb3RvdHlwZT17cjoxLGc6MSxiOjEsYToxLGF0dGFjaG1lbnROYW1lOm51bGx9LGYuQm9uZT1mdW5jdGlvbihhLGIpe3RoaXMuZGF0YT1hLHRoaXMucGFyZW50PWIsdGhpcy5zZXRUb1NldHVwUG9zZSgpfSxmLkJvbmUueURvd249ITEsZi5Cb25lLnByb3RvdHlwZT17eDowLHk6MCxyb3RhdGlvbjowLHNjYWxlWDoxLHNjYWxlWToxLG0wMDowLG0wMTowLHdvcmxkWDowLG0xMDowLG0xMTowLHdvcmxkWTowLHdvcmxkUm90YXRpb246MCx3b3JsZFNjYWxlWDoxLHdvcmxkU2NhbGVZOjEsdXBkYXRlV29ybGRUcmFuc2Zvcm06ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLnBhcmVudDtudWxsIT1jPyh0aGlzLndvcmxkWD10aGlzLngqYy5tMDArdGhpcy55KmMubTAxK2Mud29ybGRYLHRoaXMud29ybGRZPXRoaXMueCpjLm0xMCt0aGlzLnkqYy5tMTErYy53b3JsZFksdGhpcy53b3JsZFNjYWxlWD1jLndvcmxkU2NhbGVYKnRoaXMuc2NhbGVYLHRoaXMud29ybGRTY2FsZVk9Yy53b3JsZFNjYWxlWSp0aGlzLnNjYWxlWSx0aGlzLndvcmxkUm90YXRpb249Yy53b3JsZFJvdGF0aW9uK3RoaXMucm90YXRpb24pOih0aGlzLndvcmxkWD10aGlzLngsdGhpcy53b3JsZFk9dGhpcy55LHRoaXMud29ybGRTY2FsZVg9dGhpcy5zY2FsZVgsdGhpcy53b3JsZFNjYWxlWT10aGlzLnNjYWxlWSx0aGlzLndvcmxkUm90YXRpb249dGhpcy5yb3RhdGlvbik7dmFyIGQ9dGhpcy53b3JsZFJvdGF0aW9uKk1hdGguUEkvMTgwLGU9TWF0aC5jb3MoZCksZz1NYXRoLnNpbihkKTt0aGlzLm0wMD1lKnRoaXMud29ybGRTY2FsZVgsdGhpcy5tMTA9Zyp0aGlzLndvcmxkU2NhbGVYLHRoaXMubTAxPS1nKnRoaXMud29ybGRTY2FsZVksdGhpcy5tMTE9ZSp0aGlzLndvcmxkU2NhbGVZLGEmJih0aGlzLm0wMD0tdGhpcy5tMDAsdGhpcy5tMDE9LXRoaXMubTAxKSxiJiYodGhpcy5tMTA9LXRoaXMubTEwLHRoaXMubTExPS10aGlzLm0xMSksZi5Cb25lLnlEb3duJiYodGhpcy5tMTA9LXRoaXMubTEwLHRoaXMubTExPS10aGlzLm0xMSl9LHNldFRvU2V0dXBQb3NlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhO3RoaXMueD1hLngsdGhpcy55PWEueSx0aGlzLnJvdGF0aW9uPWEucm90YXRpb24sdGhpcy5zY2FsZVg9YS5zY2FsZVgsdGhpcy5zY2FsZVk9YS5zY2FsZVl9fSxmLlNsb3Q9ZnVuY3Rpb24oYSxiLGMpe3RoaXMuZGF0YT1hLHRoaXMuc2tlbGV0b249Yix0aGlzLmJvbmU9Yyx0aGlzLnNldFRvU2V0dXBQb3NlKCl9LGYuU2xvdC5wcm90b3R5cGU9e3I6MSxnOjEsYjoxLGE6MSxfYXR0YWNobWVudFRpbWU6MCxhdHRhY2htZW50Om51bGwsc2V0QXR0YWNobWVudDpmdW5jdGlvbihhKXt0aGlzLmF0dGFjaG1lbnQ9YSx0aGlzLl9hdHRhY2htZW50VGltZT10aGlzLnNrZWxldG9uLnRpbWV9LHNldEF0dGFjaG1lbnRUaW1lOmZ1bmN0aW9uKGEpe3RoaXMuX2F0dGFjaG1lbnRUaW1lPXRoaXMuc2tlbGV0b24udGltZS1hfSxnZXRBdHRhY2htZW50VGltZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNrZWxldG9uLnRpbWUtdGhpcy5fYXR0YWNobWVudFRpbWV9LHNldFRvU2V0dXBQb3NlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kYXRhO3RoaXMucj1hLnIsdGhpcy5nPWEuZyx0aGlzLmI9YS5iLHRoaXMuYT1hLmE7Zm9yKHZhciBiPXRoaXMuc2tlbGV0b24uZGF0YS5zbG90cyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY109PWEpe3RoaXMuc2V0QXR0YWNobWVudChhLmF0dGFjaG1lbnROYW1lP3RoaXMuc2tlbGV0b24uZ2V0QXR0YWNobWVudEJ5U2xvdEluZGV4KGMsYS5hdHRhY2htZW50TmFtZSk6bnVsbCk7YnJlYWt9fX0sZi5Ta2luPWZ1bmN0aW9uKGEpe3RoaXMubmFtZT1hLHRoaXMuYXR0YWNobWVudHM9e319LGYuU2tpbi5wcm90b3R5cGU9e2FkZEF0dGFjaG1lbnQ6ZnVuY3Rpb24oYSxiLGMpe3RoaXMuYXR0YWNobWVudHNbYStcIjpcIitiXT1jfSxnZXRBdHRhY2htZW50OmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMuYXR0YWNobWVudHNbYStcIjpcIitiXX0sX2F0dGFjaEFsbDpmdW5jdGlvbihhLGIpe2Zvcih2YXIgYyBpbiBiLmF0dGFjaG1lbnRzKXt2YXIgZD1jLmluZGV4T2YoXCI6XCIpLGU9cGFyc2VJbnQoYy5zdWJzdHJpbmcoMCxkKSwxMCksZj1jLnN1YnN0cmluZyhkKzEpLGc9YS5zbG90c1tlXTtpZihnLmF0dGFjaG1lbnQmJmcuYXR0YWNobWVudC5uYW1lPT1mKXt2YXIgaD10aGlzLmdldEF0dGFjaG1lbnQoZSxmKTtoJiZnLnNldEF0dGFjaG1lbnQoaCl9fX19LGYuQW5pbWF0aW9uPWZ1bmN0aW9uKGEsYixjKXt0aGlzLm5hbWU9YSx0aGlzLnRpbWVsaW5lcz1iLHRoaXMuZHVyYXRpb249Y30sZi5BbmltYXRpb24ucHJvdG90eXBlPXthcHBseTpmdW5jdGlvbihhLGIsYyl7YyYmdGhpcy5kdXJhdGlvbiYmKGIlPXRoaXMuZHVyYXRpb24pO2Zvcih2YXIgZD10aGlzLnRpbWVsaW5lcyxlPTAsZj1kLmxlbmd0aDtmPmU7ZSsrKWRbZV0uYXBwbHkoYSxiLDEpfSxtaXg6ZnVuY3Rpb24oYSxiLGMsZCl7YyYmdGhpcy5kdXJhdGlvbiYmKGIlPXRoaXMuZHVyYXRpb24pO2Zvcih2YXIgZT10aGlzLnRpbWVsaW5lcyxmPTAsZz1lLmxlbmd0aDtnPmY7ZisrKWVbZl0uYXBwbHkoYSxiLGQpfX0sZi5iaW5hcnlTZWFyY2g9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPTAsZT1NYXRoLmZsb29yKGEubGVuZ3RoL2MpLTI7aWYoIWUpcmV0dXJuIGM7Zm9yKHZhciBmPWU+Pj4xOzspe2lmKGFbKGYrMSkqY108PWI/ZD1mKzE6ZT1mLGQ9PWUpcmV0dXJuKGQrMSkqYztmPWQrZT4+PjF9fSxmLmxpbmVhclNlYXJjaD1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPTAsZT1hLmxlbmd0aC1jO2U+PWQ7ZCs9YylpZihhW2RdPmIpcmV0dXJuIGQ7cmV0dXJuLTF9LGYuQ3VydmVzPWZ1bmN0aW9uKGEpe3RoaXMuY3VydmVzPVtdLHRoaXMuY3VydmVzLmxlbmd0aD02KihhLTEpfSxmLkN1cnZlcy5wcm90b3R5cGU9e3NldExpbmVhcjpmdW5jdGlvbihhKXt0aGlzLmN1cnZlc1s2KmFdPTB9LHNldFN0ZXBwZWQ6ZnVuY3Rpb24oYSl7dGhpcy5jdXJ2ZXNbNiphXT0tMX0sc2V0Q3VydmU6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj0uMSxnPWYqZixoPWcqZixpPTMqZixqPTMqZyxrPTYqZyxsPTYqaCxtPTIqLWIrZCxuPTIqLWMrZSxvPTMqKGItZCkrMSxwPTMqKGMtZSkrMSxxPTYqYSxyPXRoaXMuY3VydmVzO3JbcV09YippK20qaitvKmgscltxKzFdPWMqaStuKmorcCpoLHJbcSsyXT1tKmsrbypsLHJbcSszXT1uKmsrcCpsLHJbcSs0XT1vKmwscltxKzVdPXAqbH0sZ2V0Q3VydmVQZXJjZW50OmZ1bmN0aW9uKGEsYil7Yj0wPmI/MDpiPjE/MTpiO3ZhciBjPTYqYSxkPXRoaXMuY3VydmVzLGU9ZFtjXTtpZighZSlyZXR1cm4gYjtpZigtMT09ZSlyZXR1cm4gMDtmb3IodmFyIGY9ZFtjKzFdLGc9ZFtjKzJdLGg9ZFtjKzNdLGk9ZFtjKzRdLGo9ZFtjKzVdLGs9ZSxsPWYsbT04Ozspe2lmKGs+PWIpe3ZhciBuPWstZSxvPWwtZjtyZXR1cm4gbysobC1vKSooYi1uKS8oay1uKX1pZighbSlicmVhazttLS0sZSs9ZyxmKz1oLGcrPWksaCs9aixrKz1lLGwrPWZ9cmV0dXJuIGwrKDEtbCkqKGItaykvKDEtayl9fSxmLlJvdGF0ZVRpbWVsaW5lPWZ1bmN0aW9uKGEpe3RoaXMuY3VydmVzPW5ldyBmLkN1cnZlcyhhKSx0aGlzLmZyYW1lcz1bXSx0aGlzLmZyYW1lcy5sZW5ndGg9MiphfSxmLlJvdGF0ZVRpbWVsaW5lLnByb3RvdHlwZT17Ym9uZUluZGV4OjAsZ2V0RnJhbWVDb3VudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmZyYW1lcy5sZW5ndGgvMn0sc2V0RnJhbWU6ZnVuY3Rpb24oYSxiLGMpe2EqPTIsdGhpcy5mcmFtZXNbYV09Yix0aGlzLmZyYW1lc1thKzFdPWN9LGFwcGx5OmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlPXRoaXMuZnJhbWVzO2lmKCEoYjxlWzBdKSl7dmFyIGc9YS5ib25lc1t0aGlzLmJvbmVJbmRleF07aWYoYj49ZVtlLmxlbmd0aC0yXSl7Zm9yKGQ9Zy5kYXRhLnJvdGF0aW9uK2VbZS5sZW5ndGgtMV0tZy5yb3RhdGlvbjtkPjE4MDspZC09MzYwO2Zvcig7LTE4MD5kOylkKz0zNjA7cmV0dXJuIGcucm90YXRpb24rPWQqYyx2b2lkIDB9dmFyIGg9Zi5iaW5hcnlTZWFyY2goZSxiLDIpLGk9ZVtoLTFdLGo9ZVtoXSxrPTEtKGItaikvKGVbaC0yXS1qKTtmb3Ioaz10aGlzLmN1cnZlcy5nZXRDdXJ2ZVBlcmNlbnQoaC8yLTEsayksZD1lW2grMV0taTtkPjE4MDspZC09MzYwO2Zvcig7LTE4MD5kOylkKz0zNjA7Zm9yKGQ9Zy5kYXRhLnJvdGF0aW9uKyhpK2QqayktZy5yb3RhdGlvbjtkPjE4MDspZC09MzYwO2Zvcig7LTE4MD5kOylkKz0zNjA7Zy5yb3RhdGlvbis9ZCpjfX19LGYuVHJhbnNsYXRlVGltZWxpbmU9ZnVuY3Rpb24oYSl7dGhpcy5jdXJ2ZXM9bmV3IGYuQ3VydmVzKGEpLHRoaXMuZnJhbWVzPVtdLHRoaXMuZnJhbWVzLmxlbmd0aD0zKmF9LGYuVHJhbnNsYXRlVGltZWxpbmUucHJvdG90eXBlPXtib25lSW5kZXg6MCxnZXRGcmFtZUNvdW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnJhbWVzLmxlbmd0aC8zfSxzZXRGcmFtZTpmdW5jdGlvbihhLGIsYyxkKXthKj0zLHRoaXMuZnJhbWVzW2FdPWIsdGhpcy5mcmFtZXNbYSsxXT1jLHRoaXMuZnJhbWVzW2ErMl09ZH0sYXBwbHk6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMuZnJhbWVzO2lmKCEoYjxkWzBdKSl7dmFyIGU9YS5ib25lc1t0aGlzLmJvbmVJbmRleF07aWYoYj49ZFtkLmxlbmd0aC0zXSlyZXR1cm4gZS54Kz0oZS5kYXRhLngrZFtkLmxlbmd0aC0yXS1lLngpKmMsZS55Kz0oZS5kYXRhLnkrZFtkLmxlbmd0aC0xXS1lLnkpKmMsdm9pZCAwO3ZhciBnPWYuYmluYXJ5U2VhcmNoKGQsYiwzKSxoPWRbZy0yXSxpPWRbZy0xXSxqPWRbZ10saz0xLShiLWopLyhkW2crLTNdLWopO2s9dGhpcy5jdXJ2ZXMuZ2V0Q3VydmVQZXJjZW50KGcvMy0xLGspLGUueCs9KGUuZGF0YS54K2grKGRbZysxXS1oKSprLWUueCkqYyxlLnkrPShlLmRhdGEueStpKyhkW2crMl0taSkqay1lLnkpKmN9fX0sZi5TY2FsZVRpbWVsaW5lPWZ1bmN0aW9uKGEpe3RoaXMuY3VydmVzPW5ldyBmLkN1cnZlcyhhKSx0aGlzLmZyYW1lcz1bXSx0aGlzLmZyYW1lcy5sZW5ndGg9MyphfSxmLlNjYWxlVGltZWxpbmUucHJvdG90eXBlPXtib25lSW5kZXg6MCxnZXRGcmFtZUNvdW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnJhbWVzLmxlbmd0aC8zfSxzZXRGcmFtZTpmdW5jdGlvbihhLGIsYyxkKXthKj0zLHRoaXMuZnJhbWVzW2FdPWIsdGhpcy5mcmFtZXNbYSsxXT1jLHRoaXMuZnJhbWVzW2ErMl09ZH0sYXBwbHk6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMuZnJhbWVzO2lmKCEoYjxkWzBdKSl7dmFyIGU9YS5ib25lc1t0aGlzLmJvbmVJbmRleF07aWYoYj49ZFtkLmxlbmd0aC0zXSlyZXR1cm4gZS5zY2FsZVgrPShlLmRhdGEuc2NhbGVYLTErZFtkLmxlbmd0aC0yXS1lLnNjYWxlWCkqYyxlLnNjYWxlWSs9KGUuZGF0YS5zY2FsZVktMStkW2QubGVuZ3RoLTFdLWUuc2NhbGVZKSpjLHZvaWQgMDt2YXIgZz1mLmJpbmFyeVNlYXJjaChkLGIsMyksaD1kW2ctMl0saT1kW2ctMV0saj1kW2ddLGs9MS0oYi1qKS8oZFtnKy0zXS1qKTtrPXRoaXMuY3VydmVzLmdldEN1cnZlUGVyY2VudChnLzMtMSxrKSxlLnNjYWxlWCs9KGUuZGF0YS5zY2FsZVgtMStoKyhkW2crMV0taCkqay1lLnNjYWxlWCkqYyxlLnNjYWxlWSs9KGUuZGF0YS5zY2FsZVktMStpKyhkW2crMl0taSkqay1lLnNjYWxlWSkqY319fSxmLkNvbG9yVGltZWxpbmU9ZnVuY3Rpb24oYSl7dGhpcy5jdXJ2ZXM9bmV3IGYuQ3VydmVzKGEpLHRoaXMuZnJhbWVzPVtdLHRoaXMuZnJhbWVzLmxlbmd0aD01KmF9LGYuQ29sb3JUaW1lbGluZS5wcm90b3R5cGU9e3Nsb3RJbmRleDowLGdldEZyYW1lQ291bnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5mcmFtZXMubGVuZ3RoLzV9LHNldEZyYW1lOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXthKj01LHRoaXMuZnJhbWVzW2FdPWIsdGhpcy5mcmFtZXNbYSsxXT1jLHRoaXMuZnJhbWVzW2ErMl09ZCx0aGlzLmZyYW1lc1thKzNdPWUsdGhpcy5mcmFtZXNbYSs0XT1mfSxhcHBseTpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcy5mcmFtZXM7aWYoIShiPGRbMF0pKXt2YXIgZT1hLnNsb3RzW3RoaXMuc2xvdEluZGV4XTtpZihiPj1kW2QubGVuZ3RoLTVdKXt2YXIgZz1kLmxlbmd0aC0xO3JldHVybiBlLnI9ZFtnLTNdLGUuZz1kW2ctMl0sZS5iPWRbZy0xXSxlLmE9ZFtnXSx2b2lkIDB9dmFyIGg9Zi5iaW5hcnlTZWFyY2goZCxiLDUpLGk9ZFtoLTRdLGo9ZFtoLTNdLGs9ZFtoLTJdLGw9ZFtoLTFdLG09ZFtoXSxuPTEtKGItbSkvKGRbaC01XS1tKTtuPXRoaXMuY3VydmVzLmdldEN1cnZlUGVyY2VudChoLzUtMSxuKTt2YXIgbz1pKyhkW2grMV0taSkqbixwPWorKGRbaCsyXS1qKSpuLHE9aysoZFtoKzNdLWspKm4scj1sKyhkW2grNF0tbCkqbjsxPmM/KGUucis9KG8tZS5yKSpjLGUuZys9KHAtZS5nKSpjLGUuYis9KHEtZS5iKSpjLGUuYSs9KHItZS5hKSpjKTooZS5yPW8sZS5nPXAsZS5iPXEsZS5hPXIpfX19LGYuQXR0YWNobWVudFRpbWVsaW5lPWZ1bmN0aW9uKGEpe3RoaXMuY3VydmVzPW5ldyBmLkN1cnZlcyhhKSx0aGlzLmZyYW1lcz1bXSx0aGlzLmZyYW1lcy5sZW5ndGg9YSx0aGlzLmF0dGFjaG1lbnROYW1lcz1bXSx0aGlzLmF0dGFjaG1lbnROYW1lcy5sZW5ndGg9YX0sZi5BdHRhY2htZW50VGltZWxpbmUucHJvdG90eXBlPXtzbG90SW5kZXg6MCxnZXRGcmFtZUNvdW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnJhbWVzLmxlbmd0aH0sc2V0RnJhbWU6ZnVuY3Rpb24oYSxiLGMpe3RoaXMuZnJhbWVzW2FdPWIsdGhpcy5hdHRhY2htZW50TmFtZXNbYV09Y30sYXBwbHk6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmZyYW1lcztpZighKGI8Y1swXSkpe3ZhciBkO2Q9Yj49Y1tjLmxlbmd0aC0xXT9jLmxlbmd0aC0xOmYuYmluYXJ5U2VhcmNoKGMsYiwxKS0xO3ZhciBlPXRoaXMuYXR0YWNobWVudE5hbWVzW2RdO2Euc2xvdHNbdGhpcy5zbG90SW5kZXhdLnNldEF0dGFjaG1lbnQoZT9hLmdldEF0dGFjaG1lbnRCeVNsb3RJbmRleCh0aGlzLnNsb3RJbmRleCxlKTpudWxsKX19fSxmLlNrZWxldG9uRGF0YT1mdW5jdGlvbigpe3RoaXMuYm9uZXM9W10sdGhpcy5zbG90cz1bXSx0aGlzLnNraW5zPVtdLHRoaXMuYW5pbWF0aW9ucz1bXX0sZi5Ta2VsZXRvbkRhdGEucHJvdG90eXBlPXtkZWZhdWx0U2tpbjpudWxsLGZpbmRCb25lOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLmJvbmVzLGM9MCxkPWIubGVuZ3RoO2Q+YztjKyspaWYoYltjXS5uYW1lPT1hKXJldHVybiBiW2NdO3JldHVybiBudWxsfSxmaW5kQm9uZUluZGV4OmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLmJvbmVzLGM9MCxkPWIubGVuZ3RoO2Q+YztjKyspaWYoYltjXS5uYW1lPT1hKXJldHVybiBjO3JldHVybi0xfSxmaW5kU2xvdDpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5zbG90cyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10ubmFtZT09YSlyZXR1cm4gc2xvdFtjXTtyZXR1cm4gbnVsbH0sZmluZFNsb3RJbmRleDpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5zbG90cyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10ubmFtZT09YSlyZXR1cm4gYztyZXR1cm4tMX0sZmluZFNraW46ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXRoaXMuc2tpbnMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdLm5hbWU9PWEpcmV0dXJuIGJbY107cmV0dXJuIG51bGx9LGZpbmRBbmltYXRpb246ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXRoaXMuYW5pbWF0aW9ucyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10ubmFtZT09YSlyZXR1cm4gYltjXTtyZXR1cm4gbnVsbH19LGYuU2tlbGV0b249ZnVuY3Rpb24oYSl7dGhpcy5kYXRhPWEsdGhpcy5ib25lcz1bXTtcbmZvcih2YXIgYj0wLGM9YS5ib25lcy5sZW5ndGg7Yz5iO2IrKyl7dmFyIGQ9YS5ib25lc1tiXSxlPWQucGFyZW50P3RoaXMuYm9uZXNbYS5ib25lcy5pbmRleE9mKGQucGFyZW50KV06bnVsbDt0aGlzLmJvbmVzLnB1c2gobmV3IGYuQm9uZShkLGUpKX1mb3IodGhpcy5zbG90cz1bXSx0aGlzLmRyYXdPcmRlcj1bXSxiPTAsYz1hLnNsb3RzLmxlbmd0aDtjPmI7YisrKXt2YXIgZz1hLnNsb3RzW2JdLGg9dGhpcy5ib25lc1thLmJvbmVzLmluZGV4T2YoZy5ib25lRGF0YSldLGk9bmV3IGYuU2xvdChnLHRoaXMsaCk7dGhpcy5zbG90cy5wdXNoKGkpLHRoaXMuZHJhd09yZGVyLnB1c2goaSl9fSxmLlNrZWxldG9uLnByb3RvdHlwZT17eDowLHk6MCxza2luOm51bGwscjoxLGc6MSxiOjEsYToxLHRpbWU6MCxmbGlwWDohMSxmbGlwWTohMSx1cGRhdGVXb3JsZFRyYW5zZm9ybTpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLmZsaXBYLGI9dGhpcy5mbGlwWSxjPXRoaXMuYm9uZXMsZD0wLGU9Yy5sZW5ndGg7ZT5kO2QrKyljW2RdLnVwZGF0ZVdvcmxkVHJhbnNmb3JtKGEsYil9LHNldFRvU2V0dXBQb3NlOmZ1bmN0aW9uKCl7dGhpcy5zZXRCb25lc1RvU2V0dXBQb3NlKCksdGhpcy5zZXRTbG90c1RvU2V0dXBQb3NlKCl9LHNldEJvbmVzVG9TZXR1cFBvc2U6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5ib25lcyxiPTAsYz1hLmxlbmd0aDtjPmI7YisrKWFbYl0uc2V0VG9TZXR1cFBvc2UoKX0sc2V0U2xvdHNUb1NldHVwUG9zZTpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLnNsb3RzLGI9MCxjPWEubGVuZ3RoO2M+YjtiKyspYVtiXS5zZXRUb1NldHVwUG9zZShiKX0sZ2V0Um9vdEJvbmU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ib25lcy5sZW5ndGg/dGhpcy5ib25lc1swXTpudWxsfSxmaW5kQm9uZTpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5ib25lcyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10uZGF0YS5uYW1lPT1hKXJldHVybiBiW2NdO3JldHVybiBudWxsfSxmaW5kQm9uZUluZGV4OmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLmJvbmVzLGM9MCxkPWIubGVuZ3RoO2Q+YztjKyspaWYoYltjXS5kYXRhLm5hbWU9PWEpcmV0dXJuIGM7cmV0dXJuLTF9LGZpbmRTbG90OmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLnNsb3RzLGM9MCxkPWIubGVuZ3RoO2Q+YztjKyspaWYoYltjXS5kYXRhLm5hbWU9PWEpcmV0dXJuIGJbY107cmV0dXJuIG51bGx9LGZpbmRTbG90SW5kZXg6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXRoaXMuc2xvdHMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdLmRhdGEubmFtZT09YSlyZXR1cm4gYztyZXR1cm4tMX0sc2V0U2tpbkJ5TmFtZTpmdW5jdGlvbihhKXt2YXIgYj10aGlzLmRhdGEuZmluZFNraW4oYSk7aWYoIWIpdGhyb3dcIlNraW4gbm90IGZvdW5kOiBcIithO3RoaXMuc2V0U2tpbihiKX0sc2V0U2tpbjpmdW5jdGlvbihhKXt0aGlzLnNraW4mJmEmJmEuX2F0dGFjaEFsbCh0aGlzLHRoaXMuc2tpbiksdGhpcy5za2luPWF9LGdldEF0dGFjaG1lbnRCeVNsb3ROYW1lOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudEJ5U2xvdEluZGV4KHRoaXMuZGF0YS5maW5kU2xvdEluZGV4KGEpLGIpfSxnZXRBdHRhY2htZW50QnlTbG90SW5kZXg6ZnVuY3Rpb24oYSxiKXtpZih0aGlzLnNraW4pe3ZhciBjPXRoaXMuc2tpbi5nZXRBdHRhY2htZW50KGEsYik7aWYoYylyZXR1cm4gY31yZXR1cm4gdGhpcy5kYXRhLmRlZmF1bHRTa2luP3RoaXMuZGF0YS5kZWZhdWx0U2tpbi5nZXRBdHRhY2htZW50KGEsYik6bnVsbH0sc2V0QXR0YWNobWVudDpmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz10aGlzLnNsb3RzLGQ9MCxlPWMuc2l6ZTtlPmQ7ZCsrKXt2YXIgZj1jW2RdO2lmKGYuZGF0YS5uYW1lPT1hKXt2YXIgZz1udWxsO2lmKGImJihnPXRoaXMuZ2V0QXR0YWNobWVudChkLGIpLG51bGw9PWcpKXRocm93XCJBdHRhY2htZW50IG5vdCBmb3VuZDogXCIrYitcIiwgZm9yIHNsb3Q6IFwiK2E7cmV0dXJuIGYuc2V0QXR0YWNobWVudChnKSx2b2lkIDB9fXRocm93XCJTbG90IG5vdCBmb3VuZDogXCIrYX0sdXBkYXRlOmZ1bmN0aW9uKGEpe3RpbWUrPWF9fSxmLkF0dGFjaG1lbnRUeXBlPXtyZWdpb246MH0sZi5SZWdpb25BdHRhY2htZW50PWZ1bmN0aW9uKCl7dGhpcy5vZmZzZXQ9W10sdGhpcy5vZmZzZXQubGVuZ3RoPTgsdGhpcy51dnM9W10sdGhpcy51dnMubGVuZ3RoPTh9LGYuUmVnaW9uQXR0YWNobWVudC5wcm90b3R5cGU9e3g6MCx5OjAscm90YXRpb246MCxzY2FsZVg6MSxzY2FsZVk6MSx3aWR0aDowLGhlaWdodDowLHJlbmRlcmVyT2JqZWN0Om51bGwscmVnaW9uT2Zmc2V0WDowLHJlZ2lvbk9mZnNldFk6MCxyZWdpb25XaWR0aDowLHJlZ2lvbkhlaWdodDowLHJlZ2lvbk9yaWdpbmFsV2lkdGg6MCxyZWdpb25PcmlnaW5hbEhlaWdodDowLHNldFVWczpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPXRoaXMudXZzO2U/KGZbMl09YSxmWzNdPWQsZls0XT1hLGZbNV09YixmWzZdPWMsZls3XT1iLGZbMF09YyxmWzFdPWQpOihmWzBdPWEsZlsxXT1kLGZbMl09YSxmWzNdPWIsZls0XT1jLGZbNV09YixmWzZdPWMsZls3XT1kKX0sdXBkYXRlT2Zmc2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy53aWR0aC90aGlzLnJlZ2lvbk9yaWdpbmFsV2lkdGgqdGhpcy5zY2FsZVgsYj10aGlzLmhlaWdodC90aGlzLnJlZ2lvbk9yaWdpbmFsSGVpZ2h0KnRoaXMuc2NhbGVZLGM9LXRoaXMud2lkdGgvMip0aGlzLnNjYWxlWCt0aGlzLnJlZ2lvbk9mZnNldFgqYSxkPS10aGlzLmhlaWdodC8yKnRoaXMuc2NhbGVZK3RoaXMucmVnaW9uT2Zmc2V0WSpiLGU9Yyt0aGlzLnJlZ2lvbldpZHRoKmEsZj1kK3RoaXMucmVnaW9uSGVpZ2h0KmIsZz10aGlzLnJvdGF0aW9uKk1hdGguUEkvMTgwLGg9TWF0aC5jb3MoZyksaT1NYXRoLnNpbihnKSxqPWMqaCt0aGlzLngsaz1jKmksbD1kKmgrdGhpcy55LG09ZCppLG49ZSpoK3RoaXMueCxvPWUqaSxwPWYqaCt0aGlzLnkscT1mKmkscj10aGlzLm9mZnNldDtyWzBdPWotbSxyWzFdPWwrayxyWzJdPWotcSxyWzNdPXArayxyWzRdPW4tcSxyWzVdPXArbyxyWzZdPW4tbSxyWzddPWwrb30sY29tcHV0ZVZlcnRpY2VzOmZ1bmN0aW9uKGEsYixjLGQpe2ErPWMud29ybGRYLGIrPWMud29ybGRZO3ZhciBlPWMubTAwLGY9Yy5tMDEsZz1jLm0xMCxoPWMubTExLGk9dGhpcy5vZmZzZXQ7ZFswXT1pWzBdKmUraVsxXSpmK2EsZFsxXT1pWzBdKmcraVsxXSpoK2IsZFsyXT1pWzJdKmUraVszXSpmK2EsZFszXT1pWzJdKmcraVszXSpoK2IsZFs0XT1pWzRdKmUraVs1XSpmK2EsZFs1XT1pWzRdKmcraVs1XSpoK2IsZFs2XT1pWzZdKmUraVs3XSpmK2EsZFs3XT1pWzZdKmcraVs3XSpoK2J9fSxmLkFuaW1hdGlvblN0YXRlRGF0YT1mdW5jdGlvbihhKXt0aGlzLnNrZWxldG9uRGF0YT1hLHRoaXMuYW5pbWF0aW9uVG9NaXhUaW1lPXt9fSxmLkFuaW1hdGlvblN0YXRlRGF0YS5wcm90b3R5cGU9e2RlZmF1bHRNaXg6MCxzZXRNaXhCeU5hbWU6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMuc2tlbGV0b25EYXRhLmZpbmRBbmltYXRpb24oYSk7aWYoIWQpdGhyb3dcIkFuaW1hdGlvbiBub3QgZm91bmQ6IFwiK2E7dmFyIGU9dGhpcy5za2VsZXRvbkRhdGEuZmluZEFuaW1hdGlvbihiKTtpZighZSl0aHJvd1wiQW5pbWF0aW9uIG5vdCBmb3VuZDogXCIrYjt0aGlzLnNldE1peChkLGUsYyl9LHNldE1peDpmdW5jdGlvbihhLGIsYyl7dGhpcy5hbmltYXRpb25Ub01peFRpbWVbYS5uYW1lK1wiOlwiK2IubmFtZV09Y30sZ2V0TWl4OmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5hbmltYXRpb25Ub01peFRpbWVbYS5uYW1lK1wiOlwiK2IubmFtZV07cmV0dXJuIGM/Yzp0aGlzLmRlZmF1bHRNaXh9fSxmLkFuaW1hdGlvblN0YXRlPWZ1bmN0aW9uKGEpe3RoaXMuZGF0YT1hLHRoaXMucXVldWU9W119LGYuQW5pbWF0aW9uU3RhdGUucHJvdG90eXBlPXthbmltYXRpb25TcGVlZDoxLGN1cnJlbnQ6bnVsbCxwcmV2aW91czpudWxsLGN1cnJlbnRUaW1lOjAscHJldmlvdXNUaW1lOjAsY3VycmVudExvb3A6ITEscHJldmlvdXNMb29wOiExLG1peFRpbWU6MCxtaXhEdXJhdGlvbjowLHVwZGF0ZTpmdW5jdGlvbihhKXtpZih0aGlzLmN1cnJlbnRUaW1lKz1hKnRoaXMuYW5pbWF0aW9uU3BlZWQsdGhpcy5wcmV2aW91c1RpbWUrPWEsdGhpcy5taXhUaW1lKz1hLHRoaXMucXVldWUubGVuZ3RoPjApe3ZhciBiPXRoaXMucXVldWVbMF07dGhpcy5jdXJyZW50VGltZT49Yi5kZWxheSYmKHRoaXMuX3NldEFuaW1hdGlvbihiLmFuaW1hdGlvbixiLmxvb3ApLHRoaXMucXVldWUuc2hpZnQoKSl9fSxhcHBseTpmdW5jdGlvbihhKXtpZih0aGlzLmN1cnJlbnQpaWYodGhpcy5wcmV2aW91cyl7dGhpcy5wcmV2aW91cy5hcHBseShhLHRoaXMucHJldmlvdXNUaW1lLHRoaXMucHJldmlvdXNMb29wKTt2YXIgYj10aGlzLm1peFRpbWUvdGhpcy5taXhEdXJhdGlvbjtiPj0xJiYoYj0xLHRoaXMucHJldmlvdXM9bnVsbCksdGhpcy5jdXJyZW50Lm1peChhLHRoaXMuY3VycmVudFRpbWUsdGhpcy5jdXJyZW50TG9vcCxiKX1lbHNlIHRoaXMuY3VycmVudC5hcHBseShhLHRoaXMuY3VycmVudFRpbWUsdGhpcy5jdXJyZW50TG9vcCl9LGNsZWFyQW5pbWF0aW9uOmZ1bmN0aW9uKCl7dGhpcy5wcmV2aW91cz1udWxsLHRoaXMuY3VycmVudD1udWxsLHRoaXMucXVldWUubGVuZ3RoPTB9LF9zZXRBbmltYXRpb246ZnVuY3Rpb24oYSxiKXt0aGlzLnByZXZpb3VzPW51bGwsYSYmdGhpcy5jdXJyZW50JiYodGhpcy5taXhEdXJhdGlvbj10aGlzLmRhdGEuZ2V0TWl4KHRoaXMuY3VycmVudCxhKSx0aGlzLm1peER1cmF0aW9uPjAmJih0aGlzLm1peFRpbWU9MCx0aGlzLnByZXZpb3VzPXRoaXMuY3VycmVudCx0aGlzLnByZXZpb3VzVGltZT10aGlzLmN1cnJlbnRUaW1lLHRoaXMucHJldmlvdXNMb29wPXRoaXMuY3VycmVudExvb3ApKSx0aGlzLmN1cnJlbnQ9YSx0aGlzLmN1cnJlbnRMb29wPWIsdGhpcy5jdXJyZW50VGltZT0wfSxzZXRBbmltYXRpb25CeU5hbWU6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmRhdGEuc2tlbGV0b25EYXRhLmZpbmRBbmltYXRpb24oYSk7aWYoIWMpdGhyb3dcIkFuaW1hdGlvbiBub3QgZm91bmQ6IFwiK2E7dGhpcy5zZXRBbmltYXRpb24oYyxiKX0sc2V0QW5pbWF0aW9uOmZ1bmN0aW9uKGEsYil7dGhpcy5xdWV1ZS5sZW5ndGg9MCx0aGlzLl9zZXRBbmltYXRpb24oYSxiKX0sYWRkQW5pbWF0aW9uQnlOYW1lOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLmRhdGEuc2tlbGV0b25EYXRhLmZpbmRBbmltYXRpb24oYSk7aWYoIWQpdGhyb3dcIkFuaW1hdGlvbiBub3QgZm91bmQ6IFwiK2E7dGhpcy5hZGRBbmltYXRpb24oZCxiLGMpfSxhZGRBbmltYXRpb246ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXt9O2lmKGQuYW5pbWF0aW9uPWEsZC5sb29wPWIsIWN8fDA+PWMpe3ZhciBlPXRoaXMucXVldWUubGVuZ3RoP3RoaXMucXVldWVbdGhpcy5xdWV1ZS5sZW5ndGgtMV0uYW5pbWF0aW9uOnRoaXMuY3VycmVudDtjPW51bGwhPWU/ZS5kdXJhdGlvbi10aGlzLmRhdGEuZ2V0TWl4KGUsYSkrKGN8fDApOjB9ZC5kZWxheT1jLHRoaXMucXVldWUucHVzaChkKX0saXNDb21wbGV0ZTpmdW5jdGlvbigpe3JldHVybiF0aGlzLmN1cnJlbnR8fHRoaXMuY3VycmVudFRpbWU+PXRoaXMuY3VycmVudC5kdXJhdGlvbn19LGYuU2tlbGV0b25Kc29uPWZ1bmN0aW9uKGEpe3RoaXMuYXR0YWNobWVudExvYWRlcj1hfSxmLlNrZWxldG9uSnNvbi5wcm90b3R5cGU9e3NjYWxlOjEscmVhZFNrZWxldG9uRGF0YTpmdW5jdGlvbihhKXtmb3IodmFyIGIsYz1uZXcgZi5Ta2VsZXRvbkRhdGEsZD1hLmJvbmVzLGU9MCxnPWQubGVuZ3RoO2c+ZTtlKyspe3ZhciBoPWRbZV0saT1udWxsO2lmKGgucGFyZW50JiYoaT1jLmZpbmRCb25lKGgucGFyZW50KSwhaSkpdGhyb3dcIlBhcmVudCBib25lIG5vdCBmb3VuZDogXCIraC5wYXJlbnQ7Yj1uZXcgZi5Cb25lRGF0YShoLm5hbWUsaSksYi5sZW5ndGg9KGgubGVuZ3RofHwwKSp0aGlzLnNjYWxlLGIueD0oaC54fHwwKSp0aGlzLnNjYWxlLGIueT0oaC55fHwwKSp0aGlzLnNjYWxlLGIucm90YXRpb249aC5yb3RhdGlvbnx8MCxiLnNjYWxlWD1oLnNjYWxlWHx8MSxiLnNjYWxlWT1oLnNjYWxlWXx8MSxjLmJvbmVzLnB1c2goYil9dmFyIGo9YS5zbG90cztmb3IoZT0wLGc9ai5sZW5ndGg7Zz5lO2UrKyl7dmFyIGs9altlXTtpZihiPWMuZmluZEJvbmUoay5ib25lKSwhYil0aHJvd1wiU2xvdCBib25lIG5vdCBmb3VuZDogXCIray5ib25lO3ZhciBsPW5ldyBmLlNsb3REYXRhKGsubmFtZSxiKSxtPWsuY29sb3I7bSYmKGwucj1mLlNrZWxldG9uSnNvbi50b0NvbG9yKG0sMCksbC5nPWYuU2tlbGV0b25Kc29uLnRvQ29sb3IobSwxKSxsLmI9Zi5Ta2VsZXRvbkpzb24udG9Db2xvcihtLDIpLGwuYT1mLlNrZWxldG9uSnNvbi50b0NvbG9yKG0sMykpLGwuYXR0YWNobWVudE5hbWU9ay5hdHRhY2htZW50LGMuc2xvdHMucHVzaChsKX12YXIgbj1hLnNraW5zO2Zvcih2YXIgbyBpbiBuKWlmKG4uaGFzT3duUHJvcGVydHkobykpe3ZhciBwPW5bb10scT1uZXcgZi5Ta2luKG8pO2Zvcih2YXIgciBpbiBwKWlmKHAuaGFzT3duUHJvcGVydHkocikpe3ZhciBzPWMuZmluZFNsb3RJbmRleChyKSx0PXBbcl07Zm9yKHZhciB1IGluIHQpaWYodC5oYXNPd25Qcm9wZXJ0eSh1KSl7dmFyIHY9dGhpcy5yZWFkQXR0YWNobWVudChxLHUsdFt1XSk7bnVsbCE9diYmcS5hZGRBdHRhY2htZW50KHMsdSx2KX19Yy5za2lucy5wdXNoKHEpLFwiZGVmYXVsdFwiPT1xLm5hbWUmJihjLmRlZmF1bHRTa2luPXEpfXZhciB3PWEuYW5pbWF0aW9ucztmb3IodmFyIHggaW4gdyl3Lmhhc093blByb3BlcnR5KHgpJiZ0aGlzLnJlYWRBbmltYXRpb24oeCx3W3hdLGMpO3JldHVybiBjfSxyZWFkQXR0YWNobWVudDpmdW5jdGlvbihhLGIsYyl7Yj1jLm5hbWV8fGI7dmFyIGQ9Zi5BdHRhY2htZW50VHlwZVtjLnR5cGV8fFwicmVnaW9uXCJdO2lmKGQ9PWYuQXR0YWNobWVudFR5cGUucmVnaW9uKXt2YXIgZT1uZXcgZi5SZWdpb25BdHRhY2htZW50O3JldHVybiBlLng9KGMueHx8MCkqdGhpcy5zY2FsZSxlLnk9KGMueXx8MCkqdGhpcy5zY2FsZSxlLnNjYWxlWD1jLnNjYWxlWHx8MSxlLnNjYWxlWT1jLnNjYWxlWXx8MSxlLnJvdGF0aW9uPWMucm90YXRpb258fDAsZS53aWR0aD0oYy53aWR0aHx8MzIpKnRoaXMuc2NhbGUsZS5oZWlnaHQ9KGMuaGVpZ2h0fHwzMikqdGhpcy5zY2FsZSxlLnVwZGF0ZU9mZnNldCgpLGUucmVuZGVyZXJPYmplY3Q9e30sZS5yZW5kZXJlck9iamVjdC5uYW1lPWIsZS5yZW5kZXJlck9iamVjdC5zY2FsZT17fSxlLnJlbmRlcmVyT2JqZWN0LnNjYWxlLng9ZS5zY2FsZVgsZS5yZW5kZXJlck9iamVjdC5zY2FsZS55PWUuc2NhbGVZLGUucmVuZGVyZXJPYmplY3Qucm90YXRpb249LWUucm90YXRpb24qTWF0aC5QSS8xODAsZX10aHJvd1wiVW5rbm93biBhdHRhY2htZW50IHR5cGU6IFwiK2R9LHJlYWRBbmltYXRpb246ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZyxoLGksaixrLGw9W10sbT0wLG49Yi5ib25lcztmb3IodmFyIG8gaW4gbilpZihuLmhhc093blByb3BlcnR5KG8pKXt2YXIgcD1jLmZpbmRCb25lSW5kZXgobyk7aWYoLTE9PXApdGhyb3dcIkJvbmUgbm90IGZvdW5kOiBcIitvO3ZhciBxPW5bb107Zm9yKGcgaW4gcSlpZihxLmhhc093blByb3BlcnR5KGcpKWlmKGk9cVtnXSxcInJvdGF0ZVwiPT1nKXtmb3IoZT1uZXcgZi5Sb3RhdGVUaW1lbGluZShpLmxlbmd0aCksZS5ib25lSW5kZXg9cCxkPTAsaj0wLGs9aS5sZW5ndGg7az5qO2orKyloPWlbal0sZS5zZXRGcmFtZShkLGgudGltZSxoLmFuZ2xlKSxmLlNrZWxldG9uSnNvbi5yZWFkQ3VydmUoZSxkLGgpLGQrKztsLnB1c2goZSksbT1NYXRoLm1heChtLGUuZnJhbWVzWzIqZS5nZXRGcmFtZUNvdW50KCktMl0pfWVsc2V7aWYoXCJ0cmFuc2xhdGVcIiE9ZyYmXCJzY2FsZVwiIT1nKXRocm93XCJJbnZhbGlkIHRpbWVsaW5lIHR5cGUgZm9yIGEgYm9uZTogXCIrZytcIiAoXCIrbytcIilcIjt2YXIgcj0xO2ZvcihcInNjYWxlXCI9PWc/ZT1uZXcgZi5TY2FsZVRpbWVsaW5lKGkubGVuZ3RoKTooZT1uZXcgZi5UcmFuc2xhdGVUaW1lbGluZShpLmxlbmd0aCkscj10aGlzLnNjYWxlKSxlLmJvbmVJbmRleD1wLGQ9MCxqPTAsaz1pLmxlbmd0aDtrPmo7aisrKXtoPWlbal07dmFyIHM9KGgueHx8MCkqcix0PShoLnl8fDApKnI7ZS5zZXRGcmFtZShkLGgudGltZSxzLHQpLGYuU2tlbGV0b25Kc29uLnJlYWRDdXJ2ZShlLGQsaCksZCsrfWwucHVzaChlKSxtPU1hdGgubWF4KG0sZS5mcmFtZXNbMyplLmdldEZyYW1lQ291bnQoKS0zXSl9fXZhciB1PWIuc2xvdHM7Zm9yKHZhciB2IGluIHUpaWYodS5oYXNPd25Qcm9wZXJ0eSh2KSl7dmFyIHc9dVt2XSx4PWMuZmluZFNsb3RJbmRleCh2KTtmb3IoZyBpbiB3KWlmKHcuaGFzT3duUHJvcGVydHkoZykpaWYoaT13W2ddLFwiY29sb3JcIj09Zyl7Zm9yKGU9bmV3IGYuQ29sb3JUaW1lbGluZShpLmxlbmd0aCksZS5zbG90SW5kZXg9eCxkPTAsaj0wLGs9aS5sZW5ndGg7az5qO2orKyl7aD1pW2pdO3ZhciB5PWguY29sb3Isej1mLlNrZWxldG9uSnNvbi50b0NvbG9yKHksMCksQT1mLlNrZWxldG9uSnNvbi50b0NvbG9yKHksMSksQj1mLlNrZWxldG9uSnNvbi50b0NvbG9yKHksMiksQz1mLlNrZWxldG9uSnNvbi50b0NvbG9yKHksMyk7ZS5zZXRGcmFtZShkLGgudGltZSx6LEEsQixDKSxmLlNrZWxldG9uSnNvbi5yZWFkQ3VydmUoZSxkLGgpLGQrK31sLnB1c2goZSksbT1NYXRoLm1heChtLGUuZnJhbWVzWzUqZS5nZXRGcmFtZUNvdW50KCktNV0pfWVsc2V7aWYoXCJhdHRhY2htZW50XCIhPWcpdGhyb3dcIkludmFsaWQgdGltZWxpbmUgdHlwZSBmb3IgYSBzbG90OiBcIitnK1wiIChcIit2K1wiKVwiO2ZvcihlPW5ldyBmLkF0dGFjaG1lbnRUaW1lbGluZShpLmxlbmd0aCksZS5zbG90SW5kZXg9eCxkPTAsaj0wLGs9aS5sZW5ndGg7az5qO2orKyloPWlbal0sZS5zZXRGcmFtZShkKyssaC50aW1lLGgubmFtZSk7bC5wdXNoKGUpLG09TWF0aC5tYXgobSxlLmZyYW1lc1tlLmdldEZyYW1lQ291bnQoKS0xXSl9fWMuYW5pbWF0aW9ucy5wdXNoKG5ldyBmLkFuaW1hdGlvbihhLGwsbSkpfX0sZi5Ta2VsZXRvbkpzb24ucmVhZEN1cnZlPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1jLmN1cnZlO2QmJihcInN0ZXBwZWRcIj09ZD9hLmN1cnZlcy5zZXRTdGVwcGVkKGIpOmQgaW5zdGFuY2VvZiBBcnJheSYmYS5jdXJ2ZXMuc2V0Q3VydmUoYixkWzBdLGRbMV0sZFsyXSxkWzNdKSl9LGYuU2tlbGV0b25Kc29uLnRvQ29sb3I9ZnVuY3Rpb24oYSxiKXtpZig4IT1hLmxlbmd0aCl0aHJvd1wiQ29sb3IgaGV4aWRlY2ltYWwgbGVuZ3RoIG11c3QgYmUgOCwgcmVjaWV2ZWQ6IFwiK2E7cmV0dXJuIHBhcnNlSW50KGEuc3Vic3RyKDIqYiwyKSwxNikvMjU1fSxmLkF0bGFzPWZ1bmN0aW9uKGEsYil7dGhpcy50ZXh0dXJlTG9hZGVyPWIsdGhpcy5wYWdlcz1bXSx0aGlzLnJlZ2lvbnM9W107dmFyIGM9bmV3IGYuQXRsYXNSZWFkZXIoYSksZD1bXTtkLmxlbmd0aD00O2Zvcih2YXIgZT1udWxsOzspe3ZhciBnPWMucmVhZExpbmUoKTtpZihudWxsPT1nKWJyZWFrO2lmKGc9Yy50cmltKGcpLGcubGVuZ3RoKWlmKGUpe3ZhciBoPW5ldyBmLkF0bGFzUmVnaW9uO2gubmFtZT1nLGgucGFnZT1lLGgucm90YXRlPVwidHJ1ZVwiPT1jLnJlYWRWYWx1ZSgpLGMucmVhZFR1cGxlKGQpO3ZhciBpPXBhcnNlSW50KGRbMF0sMTApLGo9cGFyc2VJbnQoZFsxXSwxMCk7Yy5yZWFkVHVwbGUoZCk7dmFyIGs9cGFyc2VJbnQoZFswXSwxMCksbD1wYXJzZUludChkWzFdLDEwKTtoLnU9aS9lLndpZHRoLGgudj1qL2UuaGVpZ2h0LGgucm90YXRlPyhoLnUyPShpK2wpL2Uud2lkdGgsaC52Mj0oaitrKS9lLmhlaWdodCk6KGgudTI9KGkraykvZS53aWR0aCxoLnYyPShqK2wpL2UuaGVpZ2h0KSxoLng9aSxoLnk9aixoLndpZHRoPU1hdGguYWJzKGspLGguaGVpZ2h0PU1hdGguYWJzKGwpLDQ9PWMucmVhZFR1cGxlKGQpJiYoaC5zcGxpdHM9W3BhcnNlSW50KGRbMF0sMTApLHBhcnNlSW50KGRbMV0sMTApLHBhcnNlSW50KGRbMl0sMTApLHBhcnNlSW50KGRbM10sMTApXSw0PT1jLnJlYWRUdXBsZShkKSYmKGgucGFkcz1bcGFyc2VJbnQoZFswXSwxMCkscGFyc2VJbnQoZFsxXSwxMCkscGFyc2VJbnQoZFsyXSwxMCkscGFyc2VJbnQoZFszXSwxMCldLGMucmVhZFR1cGxlKGQpKSksaC5vcmlnaW5hbFdpZHRoPXBhcnNlSW50KGRbMF0sMTApLGgub3JpZ2luYWxIZWlnaHQ9cGFyc2VJbnQoZFsxXSwxMCksYy5yZWFkVHVwbGUoZCksaC5vZmZzZXRYPXBhcnNlSW50KGRbMF0sMTApLGgub2Zmc2V0WT1wYXJzZUludChkWzFdLDEwKSxoLmluZGV4PXBhcnNlSW50KGMucmVhZFZhbHVlKCksMTApLHRoaXMucmVnaW9ucy5wdXNoKGgpfWVsc2V7ZT1uZXcgZi5BdGxhc1BhZ2UsZS5uYW1lPWcsZS5mb3JtYXQ9Zi5BdGxhcy5Gb3JtYXRbYy5yZWFkVmFsdWUoKV0sYy5yZWFkVHVwbGUoZCksZS5taW5GaWx0ZXI9Zi5BdGxhcy5UZXh0dXJlRmlsdGVyW2RbMF1dLGUubWFnRmlsdGVyPWYuQXRsYXMuVGV4dHVyZUZpbHRlcltkWzFdXTt2YXIgbT1jLnJlYWRWYWx1ZSgpO2UudVdyYXA9Zi5BdGxhcy5UZXh0dXJlV3JhcC5jbGFtcFRvRWRnZSxlLnZXcmFwPWYuQXRsYXMuVGV4dHVyZVdyYXAuY2xhbXBUb0VkZ2UsXCJ4XCI9PW0/ZS51V3JhcD1mLkF0bGFzLlRleHR1cmVXcmFwLnJlcGVhdDpcInlcIj09bT9lLnZXcmFwPWYuQXRsYXMuVGV4dHVyZVdyYXAucmVwZWF0OlwieHlcIj09bSYmKGUudVdyYXA9ZS52V3JhcD1mLkF0bGFzLlRleHR1cmVXcmFwLnJlcGVhdCksYi5sb2FkKGUsZyksdGhpcy5wYWdlcy5wdXNoKGUpfWVsc2UgZT1udWxsfX0sZi5BdGxhcy5wcm90b3R5cGU9e2ZpbmRSZWdpb246ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXRoaXMucmVnaW9ucyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10ubmFtZT09YSlyZXR1cm4gYltjXTtyZXR1cm4gbnVsbH0sZGlzcG9zZTpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLnBhZ2VzLGI9MCxjPWEubGVuZ3RoO2M+YjtiKyspdGhpcy50ZXh0dXJlTG9hZGVyLnVubG9hZChhW2JdLnJlbmRlcmVyT2JqZWN0KX0sdXBkYXRlVVZzOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLnJlZ2lvbnMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKyl7dmFyIGU9YltjXTtlLnBhZ2U9PWEmJihlLnU9ZS54L2Eud2lkdGgsZS52PWUueS9hLmhlaWdodCxlLnJvdGF0ZT8oZS51Mj0oZS54K2UuaGVpZ2h0KS9hLndpZHRoLGUudjI9KGUueStlLndpZHRoKS9hLmhlaWdodCk6KGUudTI9KGUueCtlLndpZHRoKS9hLndpZHRoLGUudjI9KGUueStlLmhlaWdodCkvYS5oZWlnaHQpKX19fSxmLkF0bGFzLkZvcm1hdD17YWxwaGE6MCxpbnRlbnNpdHk6MSxsdW1pbmFuY2VBbHBoYToyLHJnYjU2NTozLHJnYmE0NDQ0OjQscmdiODg4OjUscmdiYTg4ODg6Nn0sZi5BdGxhcy5UZXh0dXJlRmlsdGVyPXtuZWFyZXN0OjAsbGluZWFyOjEsbWlwTWFwOjIsbWlwTWFwTmVhcmVzdE5lYXJlc3Q6MyxtaXBNYXBMaW5lYXJOZWFyZXN0OjQsbWlwTWFwTmVhcmVzdExpbmVhcjo1LG1pcE1hcExpbmVhckxpbmVhcjo2fSxmLkF0bGFzLlRleHR1cmVXcmFwPXttaXJyb3JlZFJlcGVhdDowLGNsYW1wVG9FZGdlOjEscmVwZWF0OjJ9LGYuQXRsYXNQYWdlPWZ1bmN0aW9uKCl7fSxmLkF0bGFzUGFnZS5wcm90b3R5cGU9e25hbWU6bnVsbCxmb3JtYXQ6bnVsbCxtaW5GaWx0ZXI6bnVsbCxtYWdGaWx0ZXI6bnVsbCx1V3JhcDpudWxsLHZXcmFwOm51bGwscmVuZGVyZXJPYmplY3Q6bnVsbCx3aWR0aDowLGhlaWdodDowfSxmLkF0bGFzUmVnaW9uPWZ1bmN0aW9uKCl7fSxmLkF0bGFzUmVnaW9uLnByb3RvdHlwZT17cGFnZTpudWxsLG5hbWU6bnVsbCx4OjAseTowLHdpZHRoOjAsaGVpZ2h0OjAsdTowLHY6MCx1MjowLHYyOjAsb2Zmc2V0WDowLG9mZnNldFk6MCxvcmlnaW5hbFdpZHRoOjAsb3JpZ2luYWxIZWlnaHQ6MCxpbmRleDowLHJvdGF0ZTohMSxzcGxpdHM6bnVsbCxwYWRzOm51bGx9LGYuQXRsYXNSZWFkZXI9ZnVuY3Rpb24oYSl7dGhpcy5saW5lcz1hLnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pfSxmLkF0bGFzUmVhZGVyLnByb3RvdHlwZT17aW5kZXg6MCx0cmltOmZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIil9LHJlYWRMaW5lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaW5kZXg+PXRoaXMubGluZXMubGVuZ3RoP251bGw6dGhpcy5saW5lc1t0aGlzLmluZGV4KytdfSxyZWFkVmFsdWU6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnJlYWRMaW5lKCksYj1hLmluZGV4T2YoXCI6XCIpO2lmKC0xPT1iKXRocm93XCJJbnZhbGlkIGxpbmU6IFwiK2E7cmV0dXJuIHRoaXMudHJpbShhLnN1YnN0cmluZyhiKzEpKX0scmVhZFR1cGxlOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMucmVhZExpbmUoKSxjPWIuaW5kZXhPZihcIjpcIik7aWYoLTE9PWMpdGhyb3dcIkludmFsaWQgbGluZTogXCIrYjtmb3IodmFyIGQ9MCxlPWMrMTszPmQ7ZCsrKXt2YXIgZj1iLmluZGV4T2YoXCIsXCIsZSk7aWYoLTE9PWYpe2lmKCFkKXRocm93XCJJbnZhbGlkIGxpbmU6IFwiK2I7YnJlYWt9YVtkXT10aGlzLnRyaW0oYi5zdWJzdHIoZSxmLWUpKSxlPWYrMX1yZXR1cm4gYVtkXT10aGlzLnRyaW0oYi5zdWJzdHJpbmcoZSkpLGQrMX19LGYuQXRsYXNBdHRhY2htZW50TG9hZGVyPWZ1bmN0aW9uKGEpe3RoaXMuYXRsYXM9YX0sZi5BdGxhc0F0dGFjaG1lbnRMb2FkZXIucHJvdG90eXBlPXtuZXdBdHRhY2htZW50OmZ1bmN0aW9uKGEsYixjKXtzd2l0Y2goYil7Y2FzZSBmLkF0dGFjaG1lbnRUeXBlLnJlZ2lvbjp2YXIgZD10aGlzLmF0bGFzLmZpbmRSZWdpb24oYyk7aWYoIWQpdGhyb3dcIlJlZ2lvbiBub3QgZm91bmQgaW4gYXRsYXM6IFwiK2MrXCIgKFwiK2IrXCIpXCI7dmFyIGU9bmV3IGYuUmVnaW9uQXR0YWNobWVudChjKTtyZXR1cm4gZS5yZW5kZXJlck9iamVjdD1kLGUuc2V0VVZzKGQudSxkLnYsZC51MixkLnYyLGQucm90YXRlKSxlLnJlZ2lvbk9mZnNldFg9ZC5vZmZzZXRYLGUucmVnaW9uT2Zmc2V0WT1kLm9mZnNldFksZS5yZWdpb25XaWR0aD1kLndpZHRoLGUucmVnaW9uSGVpZ2h0PWQuaGVpZ2h0LGUucmVnaW9uT3JpZ2luYWxXaWR0aD1kLm9yaWdpbmFsV2lkdGgsZS5yZWdpb25PcmlnaW5hbEhlaWdodD1kLm9yaWdpbmFsSGVpZ2h0LGV9dGhyb3dcIlVua25vd24gYXR0YWNobWVudCB0eXBlOiBcIitifX0sZi5Cb25lLnlEb3duPSEwLGIuQW5pbUNhY2hlPXt9LGIuU3BpbmU9ZnVuY3Rpb24oYSl7aWYoYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmNhbGwodGhpcyksdGhpcy5zcGluZURhdGE9Yi5BbmltQ2FjaGVbYV0sIXRoaXMuc3BpbmVEYXRhKXRocm93IG5ldyBFcnJvcihcIlNwaW5lIGRhdGEgbXVzdCBiZSBwcmVsb2FkZWQgdXNpbmcgUElYSS5TcGluZUxvYWRlciBvciBQSVhJLkFzc2V0TG9hZGVyOiBcIithKTt0aGlzLnNrZWxldG9uPW5ldyBmLlNrZWxldG9uKHRoaXMuc3BpbmVEYXRhKSx0aGlzLnNrZWxldG9uLnVwZGF0ZVdvcmxkVHJhbnNmb3JtKCksdGhpcy5zdGF0ZURhdGE9bmV3IGYuQW5pbWF0aW9uU3RhdGVEYXRhKHRoaXMuc3BpbmVEYXRhKSx0aGlzLnN0YXRlPW5ldyBmLkFuaW1hdGlvblN0YXRlKHRoaXMuc3RhdGVEYXRhKSx0aGlzLnNsb3RDb250YWluZXJzPVtdO2Zvcih2YXIgYz0wLGQ9dGhpcy5za2VsZXRvbi5kcmF3T3JkZXIubGVuZ3RoO2Q+YztjKyspe3ZhciBlPXRoaXMuc2tlbGV0b24uZHJhd09yZGVyW2NdLGc9ZS5hdHRhY2htZW50LGg9bmV3IGIuRGlzcGxheU9iamVjdENvbnRhaW5lcjtpZih0aGlzLnNsb3RDb250YWluZXJzLnB1c2goaCksdGhpcy5hZGRDaGlsZChoKSxnIGluc3RhbmNlb2YgZi5SZWdpb25BdHRhY2htZW50KXt2YXIgaT1nLnJlbmRlcmVyT2JqZWN0Lm5hbWUsaj10aGlzLmNyZWF0ZVNwcml0ZShlLGcucmVuZGVyZXJPYmplY3QpO2UuY3VycmVudFNwcml0ZT1qLGUuY3VycmVudFNwcml0ZU5hbWU9aSxoLmFkZENoaWxkKGopfX19LGIuU3BpbmUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSksYi5TcGluZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5TcGluZSxiLlNwaW5lLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm09ZnVuY3Rpb24oKXt0aGlzLmxhc3RUaW1lPXRoaXMubGFzdFRpbWV8fERhdGUubm93KCk7dmFyIGE9LjAwMSooRGF0ZS5ub3coKS10aGlzLmxhc3RUaW1lKTt0aGlzLmxhc3RUaW1lPURhdGUubm93KCksdGhpcy5zdGF0ZS51cGRhdGUoYSksdGhpcy5zdGF0ZS5hcHBseSh0aGlzLnNrZWxldG9uKSx0aGlzLnNrZWxldG9uLnVwZGF0ZVdvcmxkVHJhbnNmb3JtKCk7Zm9yKHZhciBjPXRoaXMuc2tlbGV0b24uZHJhd09yZGVyLGQ9MCxlPWMubGVuZ3RoO2U+ZDtkKyspe3ZhciBnPWNbZF0saD1nLmF0dGFjaG1lbnQsaT10aGlzLnNsb3RDb250YWluZXJzW2RdO2lmKGggaW5zdGFuY2VvZiBmLlJlZ2lvbkF0dGFjaG1lbnQpe2lmKGgucmVuZGVyZXJPYmplY3QmJighZy5jdXJyZW50U3ByaXRlTmFtZXx8Zy5jdXJyZW50U3ByaXRlTmFtZSE9aC5uYW1lKSl7dmFyIGo9aC5yZW5kZXJlck9iamVjdC5uYW1lO2lmKHZvaWQgMCE9PWcuY3VycmVudFNwcml0ZSYmKGcuY3VycmVudFNwcml0ZS52aXNpYmxlPSExKSxnLnNwcml0ZXM9Zy5zcHJpdGVzfHx7fSx2b2lkIDAhPT1nLnNwcml0ZXNbal0pZy5zcHJpdGVzW2pdLnZpc2libGU9ITA7ZWxzZXt2YXIgaz10aGlzLmNyZWF0ZVNwcml0ZShnLGgucmVuZGVyZXJPYmplY3QpO2kuYWRkQ2hpbGQoayl9Zy5jdXJyZW50U3ByaXRlPWcuc3ByaXRlc1tqXSxnLmN1cnJlbnRTcHJpdGVOYW1lPWp9aS52aXNpYmxlPSEwO3ZhciBsPWcuYm9uZTtpLnBvc2l0aW9uLng9bC53b3JsZFgraC54KmwubTAwK2gueSpsLm0wMSxpLnBvc2l0aW9uLnk9bC53b3JsZFkraC54KmwubTEwK2gueSpsLm0xMSxpLnNjYWxlLng9bC53b3JsZFNjYWxlWCxpLnNjYWxlLnk9bC53b3JsZFNjYWxlWSxpLnJvdGF0aW9uPS0oZy5ib25lLndvcmxkUm90YXRpb24qTWF0aC5QSS8xODApLGkuYWxwaGE9Zy5hLGcuY3VycmVudFNwcml0ZS50aW50PWIucmdiMmhleChbZy5yLGcuZyxnLmJdKX1lbHNlIGkudmlzaWJsZT0hMX1iLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybS5jYWxsKHRoaXMpfSxiLlNwaW5lLnByb3RvdHlwZS5jcmVhdGVTcHJpdGU9ZnVuY3Rpb24oYSxjKXt2YXIgZD1iLlRleHR1cmVDYWNoZVtjLm5hbWVdP2MubmFtZTpjLm5hbWUrXCIucG5nXCIsZT1uZXcgYi5TcHJpdGUoYi5UZXh0dXJlLmZyb21GcmFtZShkKSk7cmV0dXJuIGUuc2NhbGU9Yy5zY2FsZSxlLnJvdGF0aW9uPWMucm90YXRpb24sZS5hbmNob3IueD1lLmFuY2hvci55PS41LGEuc3ByaXRlcz1hLnNwcml0ZXN8fHt9LGEuc3ByaXRlc1tjLm5hbWVdPWUsZX0sYi5CYXNlVGV4dHVyZUNhY2hlPXt9LGIudGV4dHVyZXNUb1VwZGF0ZT1bXSxiLnRleHR1cmVzVG9EZXN0cm95PVtdLGIuQmFzZVRleHR1cmVDYWNoZUlkR2VuZXJhdG9yPTAsYi5CYXNlVGV4dHVyZT1mdW5jdGlvbihhLGMpe2lmKGIuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLndpZHRoPTEwMCx0aGlzLmhlaWdodD0xMDAsdGhpcy5zY2FsZU1vZGU9Y3x8Yi5zY2FsZU1vZGVzLkRFRkFVTFQsdGhpcy5oYXNMb2FkZWQ9ITEsdGhpcy5zb3VyY2U9YSx0aGlzLmlkPWIuQmFzZVRleHR1cmVDYWNoZUlkR2VuZXJhdG9yKyssdGhpcy5wcmVtdWx0aXBsaWVkQWxwaGE9ITAsdGhpcy5fZ2xUZXh0dXJlcz1bXSx0aGlzLl9kaXJ0eT1bXSxhKXtpZigodGhpcy5zb3VyY2UuY29tcGxldGV8fHRoaXMuc291cmNlLmdldENvbnRleHQpJiZ0aGlzLnNvdXJjZS53aWR0aCYmdGhpcy5zb3VyY2UuaGVpZ2h0KXRoaXMuaGFzTG9hZGVkPSEwLHRoaXMud2lkdGg9dGhpcy5zb3VyY2Uud2lkdGgsdGhpcy5oZWlnaHQ9dGhpcy5zb3VyY2UuaGVpZ2h0LGIudGV4dHVyZXNUb1VwZGF0ZS5wdXNoKHRoaXMpO2Vsc2V7dmFyIGQ9dGhpczt0aGlzLnNvdXJjZS5vbmxvYWQ9ZnVuY3Rpb24oKXtkLmhhc0xvYWRlZD0hMCxkLndpZHRoPWQuc291cmNlLndpZHRoLGQuaGVpZ2h0PWQuc291cmNlLmhlaWdodDtmb3IodmFyIGE9MDthPGQuX2dsVGV4dHVyZXMubGVuZ3RoO2ErKylkLl9kaXJ0eVthXT0hMDtkLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJsb2FkZWRcIixjb250ZW50OmR9KX0sdGhpcy5zb3VyY2Uub25lcnJvcj1mdW5jdGlvbigpe2QuZGlzcGF0Y2hFdmVudCh7dHlwZTpcImVycm9yXCIsY29udGVudDpkfSl9fXRoaXMuaW1hZ2VVcmw9bnVsbCx0aGlzLl9wb3dlck9mMj0hMX19LGIuQmFzZVRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQmFzZVRleHR1cmUsYi5CYXNlVGV4dHVyZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuaW1hZ2VVcmw/KGRlbGV0ZSBiLkJhc2VUZXh0dXJlQ2FjaGVbdGhpcy5pbWFnZVVybF0sZGVsZXRlIGIuVGV4dHVyZUNhY2hlW3RoaXMuaW1hZ2VVcmxdLHRoaXMuaW1hZ2VVcmw9bnVsbCx0aGlzLnNvdXJjZS5zcmM9bnVsbCk6dGhpcy5zb3VyY2UmJnRoaXMuc291cmNlLl9waXhpSWQmJmRlbGV0ZSBiLkJhc2VUZXh0dXJlQ2FjaGVbdGhpcy5zb3VyY2UuX3BpeGlJZF0sdGhpcy5zb3VyY2U9bnVsbCxiLnRleHR1cmVzVG9EZXN0cm95LnB1c2godGhpcyl9LGIuQmFzZVRleHR1cmUucHJvdG90eXBlLnVwZGF0ZVNvdXJjZUltYWdlPWZ1bmN0aW9uKGEpe3RoaXMuaGFzTG9hZGVkPSExLHRoaXMuc291cmNlLnNyYz1udWxsLHRoaXMuc291cmNlLnNyYz1hfSxiLkJhc2VUZXh0dXJlLmZyb21JbWFnZT1mdW5jdGlvbihhLGMsZCl7dmFyIGU9Yi5CYXNlVGV4dHVyZUNhY2hlW2FdO2lmKHZvaWQgMD09PWMmJi0xPT09YS5pbmRleE9mKFwiZGF0YTpcIikmJihjPSEwKSwhZSl7dmFyIGY9bmV3IEltYWdlO2MmJihmLmNyb3NzT3JpZ2luPVwiXCIpLGYuc3JjPWEsZT1uZXcgYi5CYXNlVGV4dHVyZShmLGQpLGUuaW1hZ2VVcmw9YSxiLkJhc2VUZXh0dXJlQ2FjaGVbYV09ZX1yZXR1cm4gZX0sYi5CYXNlVGV4dHVyZS5mcm9tQ2FudmFzPWZ1bmN0aW9uKGEsYyl7YS5fcGl4aUlkfHwoYS5fcGl4aUlkPVwiY2FudmFzX1wiK2IuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3IrKyk7dmFyIGQ9Yi5CYXNlVGV4dHVyZUNhY2hlW2EuX3BpeGlJZF07cmV0dXJuIGR8fChkPW5ldyBiLkJhc2VUZXh0dXJlKGEsYyksYi5CYXNlVGV4dHVyZUNhY2hlW2EuX3BpeGlJZF09ZCksZH0sYi5UZXh0dXJlQ2FjaGU9e30sYi5GcmFtZUNhY2hlPXt9LGIuVGV4dHVyZUNhY2hlSWRHZW5lcmF0b3I9MCxiLlRleHR1cmU9ZnVuY3Rpb24oYSxjKXtpZihiLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyksdGhpcy5ub0ZyYW1lPSExLGN8fCh0aGlzLm5vRnJhbWU9ITAsYz1uZXcgYi5SZWN0YW5nbGUoMCwwLDEsMSkpLGEgaW5zdGFuY2VvZiBiLlRleHR1cmUmJihhPWEuYmFzZVRleHR1cmUpLHRoaXMuYmFzZVRleHR1cmU9YSx0aGlzLmZyYW1lPWMsdGhpcy50cmltPW51bGwsdGhpcy52YWxpZD0hMSx0aGlzLnNjb3BlPXRoaXMsdGhpcy5fdXZzPW51bGwsdGhpcy53aWR0aD0wLHRoaXMuaGVpZ2h0PTAsdGhpcy5jcm9wPW5ldyBiLlJlY3RhbmdsZSgwLDAsMSwxKSxhLmhhc0xvYWRlZCl0aGlzLm5vRnJhbWUmJihjPW5ldyBiLlJlY3RhbmdsZSgwLDAsYS53aWR0aCxhLmhlaWdodCkpLHRoaXMuc2V0RnJhbWUoYyk7ZWxzZXt2YXIgZD10aGlzO2EuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLGZ1bmN0aW9uKCl7ZC5vbkJhc2VUZXh0dXJlTG9hZGVkKCl9KX19LGIuVGV4dHVyZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5UZXh0dXJlLGIuVGV4dHVyZS5wcm90b3R5cGUub25CYXNlVGV4dHVyZUxvYWRlZD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuYmFzZVRleHR1cmU7YS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsdGhpcy5vbkxvYWRlZCksdGhpcy5ub0ZyYW1lJiYodGhpcy5mcmFtZT1uZXcgYi5SZWN0YW5nbGUoMCwwLGEud2lkdGgsYS5oZWlnaHQpKSx0aGlzLnNldEZyYW1lKHRoaXMuZnJhbWUpLHRoaXMuc2NvcGUuZGlzcGF0Y2hFdmVudCh7dHlwZTpcInVwZGF0ZVwiLGNvbnRlbnQ6dGhpc30pfSxiLlRleHR1cmUucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oYSl7YSYmdGhpcy5iYXNlVGV4dHVyZS5kZXN0cm95KCksdGhpcy52YWxpZD0hMX0sYi5UZXh0dXJlLnByb3RvdHlwZS5zZXRGcmFtZT1mdW5jdGlvbihhKXtpZih0aGlzLm5vRnJhbWU9ITEsdGhpcy5mcmFtZT1hLHRoaXMud2lkdGg9YS53aWR0aCx0aGlzLmhlaWdodD1hLmhlaWdodCx0aGlzLmNyb3AueD1hLngsdGhpcy5jcm9wLnk9YS55LHRoaXMuY3JvcC53aWR0aD1hLndpZHRoLHRoaXMuY3JvcC5oZWlnaHQ9YS5oZWlnaHQsIXRoaXMudHJpbSYmKGEueCthLndpZHRoPnRoaXMuYmFzZVRleHR1cmUud2lkdGh8fGEueSthLmhlaWdodD50aGlzLmJhc2VUZXh0dXJlLmhlaWdodCkpdGhyb3cgbmV3IEVycm9yKFwiVGV4dHVyZSBFcnJvcjogZnJhbWUgZG9lcyBub3QgZml0IGluc2lkZSB0aGUgYmFzZSBUZXh0dXJlIGRpbWVuc2lvbnMgXCIrdGhpcyk7dGhpcy52YWxpZD1hJiZhLndpZHRoJiZhLmhlaWdodCYmdGhpcy5iYXNlVGV4dHVyZS5zb3VyY2UmJnRoaXMuYmFzZVRleHR1cmUuaGFzTG9hZGVkLHRoaXMudHJpbSYmKHRoaXMud2lkdGg9dGhpcy50cmltLndpZHRoLHRoaXMuaGVpZ2h0PXRoaXMudHJpbS5oZWlnaHQsdGhpcy5mcmFtZS53aWR0aD10aGlzLnRyaW0ud2lkdGgsdGhpcy5mcmFtZS5oZWlnaHQ9dGhpcy50cmltLmhlaWdodCksdGhpcy52YWxpZCYmYi5UZXh0dXJlLmZyYW1lVXBkYXRlcy5wdXNoKHRoaXMpfSxiLlRleHR1cmUucHJvdG90eXBlLl91cGRhdGVXZWJHTHV2cz1mdW5jdGlvbigpe3RoaXMuX3V2c3x8KHRoaXMuX3V2cz1uZXcgYi5UZXh0dXJlVXZzKTt2YXIgYT10aGlzLmNyb3AsYz10aGlzLmJhc2VUZXh0dXJlLndpZHRoLGQ9dGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQ7dGhpcy5fdXZzLngwPWEueC9jLHRoaXMuX3V2cy55MD1hLnkvZCx0aGlzLl91dnMueDE9KGEueCthLndpZHRoKS9jLHRoaXMuX3V2cy55MT1hLnkvZCx0aGlzLl91dnMueDI9KGEueCthLndpZHRoKS9jLHRoaXMuX3V2cy55Mj0oYS55K2EuaGVpZ2h0KS9kLHRoaXMuX3V2cy54Mz1hLngvYyx0aGlzLl91dnMueTM9KGEueSthLmhlaWdodCkvZH0sYi5UZXh0dXJlLmZyb21JbWFnZT1mdW5jdGlvbihhLGMsZCl7dmFyIGU9Yi5UZXh0dXJlQ2FjaGVbYV07cmV0dXJuIGV8fChlPW5ldyBiLlRleHR1cmUoYi5CYXNlVGV4dHVyZS5mcm9tSW1hZ2UoYSxjLGQpKSxiLlRleHR1cmVDYWNoZVthXT1lKSxlfSxiLlRleHR1cmUuZnJvbUZyYW1lPWZ1bmN0aW9uKGEpe3ZhciBjPWIuVGV4dHVyZUNhY2hlW2FdO2lmKCFjKXRocm93IG5ldyBFcnJvcignVGhlIGZyYW1lSWQgXCInK2ErJ1wiIGRvZXMgbm90IGV4aXN0IGluIHRoZSB0ZXh0dXJlIGNhY2hlICcpO3JldHVybiBjfSxiLlRleHR1cmUuZnJvbUNhbnZhcz1mdW5jdGlvbihhLGMpe3ZhciBkPWIuQmFzZVRleHR1cmUuZnJvbUNhbnZhcyhhLGMpO3JldHVybiBuZXcgYi5UZXh0dXJlKGQpfSxiLlRleHR1cmUuYWRkVGV4dHVyZVRvQ2FjaGU9ZnVuY3Rpb24oYSxjKXtiLlRleHR1cmVDYWNoZVtjXT1hfSxiLlRleHR1cmUucmVtb3ZlVGV4dHVyZUZyb21DYWNoZT1mdW5jdGlvbihhKXt2YXIgYz1iLlRleHR1cmVDYWNoZVthXTtyZXR1cm4gZGVsZXRlIGIuVGV4dHVyZUNhY2hlW2FdLGRlbGV0ZSBiLkJhc2VUZXh0dXJlQ2FjaGVbYV0sY30sYi5UZXh0dXJlLmZyYW1lVXBkYXRlcz1bXSxiLlRleHR1cmVVdnM9ZnVuY3Rpb24oKXt0aGlzLngwPTAsdGhpcy55MD0wLHRoaXMueDE9MCx0aGlzLnkxPTAsdGhpcy54Mj0wLHRoaXMueTI9MCx0aGlzLngzPTAsdGhpcy55Mz0wfSxiLlJlbmRlclRleHR1cmU9ZnVuY3Rpb24oYSxjLGQsZSl7aWYoYi5FdmVudFRhcmdldC5jYWxsKHRoaXMpLHRoaXMud2lkdGg9YXx8MTAwLHRoaXMuaGVpZ2h0PWN8fDEwMCx0aGlzLmZyYW1lPW5ldyBiLlJlY3RhbmdsZSgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCksdGhpcy5jcm9wPW5ldyBiLlJlY3RhbmdsZSgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCksdGhpcy5iYXNlVGV4dHVyZT1uZXcgYi5CYXNlVGV4dHVyZSx0aGlzLmJhc2VUZXh0dXJlLndpZHRoPXRoaXMud2lkdGgsdGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQ9dGhpcy5oZWlnaHQsdGhpcy5iYXNlVGV4dHVyZS5fZ2xUZXh0dXJlcz1bXSx0aGlzLmJhc2VUZXh0dXJlLnNjYWxlTW9kZT1lfHxiLnNjYWxlTW9kZXMuREVGQVVMVCx0aGlzLmJhc2VUZXh0dXJlLmhhc0xvYWRlZD0hMCx0aGlzLnJlbmRlcmVyPWR8fGIuZGVmYXVsdFJlbmRlcmVyLHRoaXMucmVuZGVyZXIudHlwZT09PWIuV0VCR0xfUkVOREVSRVIpe3ZhciBmPXRoaXMucmVuZGVyZXIuZ2w7dGhpcy50ZXh0dXJlQnVmZmVyPW5ldyBiLkZpbHRlclRleHR1cmUoZix0aGlzLndpZHRoLHRoaXMuaGVpZ2h0LHRoaXMuYmFzZVRleHR1cmUuc2NhbGVNb2RlKSx0aGlzLmJhc2VUZXh0dXJlLl9nbFRleHR1cmVzW2YuaWRdPXRoaXMudGV4dHVyZUJ1ZmZlci50ZXh0dXJlLHRoaXMucmVuZGVyPXRoaXMucmVuZGVyV2ViR0wsdGhpcy5wcm9qZWN0aW9uPW5ldyBiLlBvaW50KHRoaXMud2lkdGgvMiwtdGhpcy5oZWlnaHQvMil9ZWxzZSB0aGlzLnJlbmRlcj10aGlzLnJlbmRlckNhbnZhcyx0aGlzLnRleHR1cmVCdWZmZXI9bmV3IGIuQ2FudmFzQnVmZmVyKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpLHRoaXMuYmFzZVRleHR1cmUuc291cmNlPXRoaXMudGV4dHVyZUJ1ZmZlci5jYW52YXM7dGhpcy52YWxpZD0hMCxiLlRleHR1cmUuZnJhbWVVcGRhdGVzLnB1c2godGhpcyl9LGIuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLlRleHR1cmUucHJvdG90eXBlKSxiLlJlbmRlclRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuUmVuZGVyVGV4dHVyZSxiLlJlbmRlclRleHR1cmUucHJvdG90eXBlLnJlc2l6ZT1mdW5jdGlvbihhLGMsZCl7KGEhPT10aGlzLndpZHRofHxjIT09dGhpcy5oZWlnaHQpJiYodGhpcy53aWR0aD10aGlzLmZyYW1lLndpZHRoPXRoaXMuY3JvcC53aWR0aD1hLHRoaXMuaGVpZ2h0PXRoaXMuZnJhbWUuaGVpZ2h0PXRoaXMuY3JvcC5oZWlnaHQ9YyxkJiYodGhpcy5iYXNlVGV4dHVyZS53aWR0aD10aGlzLndpZHRoLHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0PXRoaXMuaGVpZ2h0KSx0aGlzLnJlbmRlcmVyLnR5cGU9PT1iLldFQkdMX1JFTkRFUkVSJiYodGhpcy5wcm9qZWN0aW9uLng9dGhpcy53aWR0aC8yLHRoaXMucHJvamVjdGlvbi55PS10aGlzLmhlaWdodC8yKSx0aGlzLnRleHR1cmVCdWZmZXIucmVzaXplKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpKX0sYi5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMucmVuZGVyZXIudHlwZT09PWIuV0VCR0xfUkVOREVSRVImJnRoaXMucmVuZGVyZXIuZ2wuYmluZEZyYW1lYnVmZmVyKHRoaXMucmVuZGVyZXIuZ2wuRlJBTUVCVUZGRVIsdGhpcy50ZXh0dXJlQnVmZmVyLmZyYW1lQnVmZmVyKSx0aGlzLnRleHR1cmVCdWZmZXIuY2xlYXIoKX0sYi5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZW5kZXJXZWJHTD1mdW5jdGlvbihhLGMsZCl7dmFyIGU9dGhpcy5yZW5kZXJlci5nbDtlLmNvbG9yTWFzayghMCwhMCwhMCwhMCksZS52aWV3cG9ydCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCksZS5iaW5kRnJhbWVidWZmZXIoZS5GUkFNRUJVRkZFUix0aGlzLnRleHR1cmVCdWZmZXIuZnJhbWVCdWZmZXIpLGQmJnRoaXMudGV4dHVyZUJ1ZmZlci5jbGVhcigpO3ZhciBmPWEuY2hpbGRyZW4sZz1hLndvcmxkVHJhbnNmb3JtO2Eud29ybGRUcmFuc2Zvcm09Yi5SZW5kZXJUZXh0dXJlLnRlbXBNYXRyaXgsYS53b3JsZFRyYW5zZm9ybS5kPS0xLGEud29ybGRUcmFuc2Zvcm0udHk9LTIqdGhpcy5wcm9qZWN0aW9uLnksYyYmKGEud29ybGRUcmFuc2Zvcm0udHg9Yy54LGEud29ybGRUcmFuc2Zvcm0udHktPWMueSk7Zm9yKHZhciBoPTAsaT1mLmxlbmd0aDtpPmg7aCsrKWZbaF0udXBkYXRlVHJhbnNmb3JtKCk7Yi5XZWJHTFJlbmRlcmVyLnVwZGF0ZVRleHR1cmVzKCksdGhpcy5yZW5kZXJlci5zcHJpdGVCYXRjaC5kaXJ0eT0hMCx0aGlzLnJlbmRlcmVyLnJlbmRlckRpc3BsYXlPYmplY3QoYSx0aGlzLnByb2plY3Rpb24sdGhpcy50ZXh0dXJlQnVmZmVyLmZyYW1lQnVmZmVyKSxhLndvcmxkVHJhbnNmb3JtPWcsdGhpcy5yZW5kZXJlci5zcHJpdGVCYXRjaC5kaXJ0eT0hMH0sYi5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZW5kZXJDYW52YXM9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWEuY2hpbGRyZW4sZj1hLndvcmxkVHJhbnNmb3JtO2Eud29ybGRUcmFuc2Zvcm09Yi5SZW5kZXJUZXh0dXJlLnRlbXBNYXRyaXgsYz8oYS53b3JsZFRyYW5zZm9ybS50eD1jLngsYS53b3JsZFRyYW5zZm9ybS50eT1jLnkpOihhLndvcmxkVHJhbnNmb3JtLnR4PTAsYS53b3JsZFRyYW5zZm9ybS50eT0wKTtmb3IodmFyIGc9MCxoPWUubGVuZ3RoO2g+ZztnKyspZVtnXS51cGRhdGVUcmFuc2Zvcm0oKTtkJiZ0aGlzLnRleHR1cmVCdWZmZXIuY2xlYXIoKTt2YXIgaT10aGlzLnRleHR1cmVCdWZmZXIuY29udGV4dDt0aGlzLnJlbmRlcmVyLnJlbmRlckRpc3BsYXlPYmplY3QoYSxpKSxpLnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCksYS53b3JsZFRyYW5zZm9ybT1mfSxiLlJlbmRlclRleHR1cmUudGVtcE1hdHJpeD1uZXcgYi5NYXRyaXgsYi5Bc3NldExvYWRlcj1mdW5jdGlvbihhLGMpe2IuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLmFzc2V0VVJMcz1hLHRoaXMuY3Jvc3NvcmlnaW49Yyx0aGlzLmxvYWRlcnNCeVR5cGU9e2pwZzpiLkltYWdlTG9hZGVyLGpwZWc6Yi5JbWFnZUxvYWRlcixwbmc6Yi5JbWFnZUxvYWRlcixnaWY6Yi5JbWFnZUxvYWRlcix3ZWJwOmIuSW1hZ2VMb2FkZXIsanNvbjpiLkpzb25Mb2FkZXIsYXRsYXM6Yi5BdGxhc0xvYWRlcixhbmltOmIuU3BpbmVMb2FkZXIseG1sOmIuQml0bWFwRm9udExvYWRlcixmbnQ6Yi5CaXRtYXBGb250TG9hZGVyfX0sYi5Bc3NldExvYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5Bc3NldExvYWRlcixiLkFzc2V0TG9hZGVyLnByb3RvdHlwZS5fZ2V0RGF0YVR5cGU9ZnVuY3Rpb24oYSl7dmFyIGI9XCJkYXRhOlwiLGM9YS5zbGljZSgwLGIubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO2lmKGM9PT1iKXt2YXIgZD1hLnNsaWNlKGIubGVuZ3RoKSxlPWQuaW5kZXhPZihcIixcIik7aWYoLTE9PT1lKXJldHVybiBudWxsO3ZhciBmPWQuc2xpY2UoMCxlKS5zcGxpdChcIjtcIilbMF07cmV0dXJuIGYmJlwidGV4dC9wbGFpblwiIT09Zi50b0xvd2VyQ2FzZSgpP2Yuc3BsaXQoXCIvXCIpLnBvcCgpLnRvTG93ZXJDYXNlKCk6XCJ0eHRcIn1yZXR1cm4gbnVsbH0sYi5Bc3NldExvYWRlci5wcm90b3R5cGUubG9hZD1mdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSl7Yi5vbkFzc2V0TG9hZGVkKGEuY29udGVudCl9dmFyIGI9dGhpczt0aGlzLmxvYWRDb3VudD10aGlzLmFzc2V0VVJMcy5sZW5ndGg7Zm9yKHZhciBjPTA7Yzx0aGlzLmFzc2V0VVJMcy5sZW5ndGg7YysrKXt2YXIgZD10aGlzLmFzc2V0VVJMc1tjXSxlPXRoaXMuX2dldERhdGFUeXBlKGQpO2V8fChlPWQuc3BsaXQoXCI/XCIpLnNoaWZ0KCkuc3BsaXQoXCIuXCIpLnBvcCgpLnRvTG93ZXJDYXNlKCkpO3ZhciBmPXRoaXMubG9hZGVyc0J5VHlwZVtlXTtpZighZil0aHJvdyBuZXcgRXJyb3IoZStcIiBpcyBhbiB1bnN1cHBvcnRlZCBmaWxlIHR5cGVcIik7dmFyIGc9bmV3IGYoZCx0aGlzLmNyb3Nzb3JpZ2luKTtnLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIixhKSxnLmxvYWQoKX19LGIuQXNzZXRMb2FkZXIucHJvdG90eXBlLm9uQXNzZXRMb2FkZWQ9ZnVuY3Rpb24oYSl7dGhpcy5sb2FkQ291bnQtLSx0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJvblByb2dyZXNzXCIsY29udGVudDp0aGlzLGxvYWRlcjphfSksdGhpcy5vblByb2dyZXNzJiZ0aGlzLm9uUHJvZ3Jlc3MoYSksdGhpcy5sb2FkQ291bnR8fCh0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJvbkNvbXBsZXRlXCIsY29udGVudDp0aGlzfSksdGhpcy5vbkNvbXBsZXRlJiZ0aGlzLm9uQ29tcGxldGUoKSl9LGIuSnNvbkxvYWRlcj1mdW5jdGlvbihhLGMpe2IuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLnVybD1hLHRoaXMuY3Jvc3NvcmlnaW49Yyx0aGlzLmJhc2VVcmw9YS5yZXBsYWNlKC9bXlxcL10qJC8sXCJcIiksdGhpcy5sb2FkZWQ9ITF9LGIuSnNvbkxvYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5Kc29uTG9hZGVyLGIuSnNvbkxvYWRlci5wcm90b3R5cGUubG9hZD1mdW5jdGlvbigpe3ZhciBhPXRoaXM7d2luZG93LlhEb21haW5SZXF1ZXN0JiZhLmNyb3Nzb3JpZ2luPyh0aGlzLmFqYXhSZXF1ZXN0PW5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QsdGhpcy5hamF4UmVxdWVzdC50aW1lb3V0PTNlMyx0aGlzLmFqYXhSZXF1ZXN0Lm9uZXJyb3I9ZnVuY3Rpb24oKXthLm9uRXJyb3IoKX0sdGhpcy5hamF4UmVxdWVzdC5vbnRpbWVvdXQ9ZnVuY3Rpb24oKXthLm9uRXJyb3IoKX0sdGhpcy5hamF4UmVxdWVzdC5vbnByb2dyZXNzPWZ1bmN0aW9uKCl7fSk6dGhpcy5hamF4UmVxdWVzdD13aW5kb3cuWE1MSHR0cFJlcXVlc3Q/bmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdDpuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKSx0aGlzLmFqYXhSZXF1ZXN0Lm9ubG9hZD1mdW5jdGlvbigpe2Eub25KU09OTG9hZGVkKCl9LHRoaXMuYWpheFJlcXVlc3Qub3BlbihcIkdFVFwiLHRoaXMudXJsLCEwKSx0aGlzLmFqYXhSZXF1ZXN0LnNlbmQoKX0sYi5Kc29uTG9hZGVyLnByb3RvdHlwZS5vbkpTT05Mb2FkZWQ9ZnVuY3Rpb24oKXtpZighdGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQpcmV0dXJuIHRoaXMub25FcnJvcigpLHZvaWQgMDtpZih0aGlzLmpzb249SlNPTi5wYXJzZSh0aGlzLmFqYXhSZXF1ZXN0LnJlc3BvbnNlVGV4dCksdGhpcy5qc29uLmZyYW1lcyl7dmFyIGE9dGhpcyxjPXRoaXMuYmFzZVVybCt0aGlzLmpzb24ubWV0YS5pbWFnZSxkPW5ldyBiLkltYWdlTG9hZGVyKGMsdGhpcy5jcm9zc29yaWdpbiksZT10aGlzLmpzb24uZnJhbWVzO3RoaXMudGV4dHVyZT1kLnRleHR1cmUuYmFzZVRleHR1cmUsZC5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsZnVuY3Rpb24oKXthLm9uTG9hZGVkKCl9KTtmb3IodmFyIGcgaW4gZSl7dmFyIGg9ZVtnXS5mcmFtZTtpZihoJiYoYi5UZXh0dXJlQ2FjaGVbZ109bmV3IGIuVGV4dHVyZSh0aGlzLnRleHR1cmUse3g6aC54LHk6aC55LHdpZHRoOmgudyxoZWlnaHQ6aC5ofSksYi5UZXh0dXJlQ2FjaGVbZ10uY3JvcD1uZXcgYi5SZWN0YW5nbGUoaC54LGgueSxoLncsaC5oKSxlW2ddLnRyaW1tZWQpKXt2YXIgaT1lW2ddLnNvdXJjZVNpemUsaj1lW2ddLnNwcml0ZVNvdXJjZVNpemU7Yi5UZXh0dXJlQ2FjaGVbZ10udHJpbT1uZXcgYi5SZWN0YW5nbGUoai54LGoueSxpLncsaS5oKX19ZC5sb2FkKCl9ZWxzZSBpZih0aGlzLmpzb24uYm9uZXMpe3ZhciBrPW5ldyBmLlNrZWxldG9uSnNvbixsPWsucmVhZFNrZWxldG9uRGF0YSh0aGlzLmpzb24pO2IuQW5pbUNhY2hlW3RoaXMudXJsXT1sLHRoaXMub25Mb2FkZWQoKX1lbHNlIHRoaXMub25Mb2FkZWQoKX0sYi5Kc29uTG9hZGVyLnByb3RvdHlwZS5vbkxvYWRlZD1mdW5jdGlvbigpe3RoaXMubG9hZGVkPSEwLHRoaXMuZGlzcGF0Y2hFdmVudCh7dHlwZTpcImxvYWRlZFwiLGNvbnRlbnQ6dGhpc30pfSxiLkpzb25Mb2FkZXIucHJvdG90eXBlLm9uRXJyb3I9ZnVuY3Rpb24oKXt0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJlcnJvclwiLGNvbnRlbnQ6dGhpc30pfSxiLkF0bGFzTG9hZGVyPWZ1bmN0aW9uKGEsYyl7Yi5FdmVudFRhcmdldC5jYWxsKHRoaXMpLHRoaXMudXJsPWEsdGhpcy5iYXNlVXJsPWEucmVwbGFjZSgvW15cXC9dKiQvLFwiXCIpLHRoaXMuY3Jvc3NvcmlnaW49Yyx0aGlzLmxvYWRlZD0hMX0sYi5BdGxhc0xvYWRlci5jb25zdHJ1Y3Rvcj1iLkF0bGFzTG9hZGVyLGIuQXRsYXNMb2FkZXIucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oKXt0aGlzLmFqYXhSZXF1ZXN0PW5ldyBiLkFqYXhSZXF1ZXN0LHRoaXMuYWpheFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlPXRoaXMub25BdGxhc0xvYWRlZC5iaW5kKHRoaXMpLHRoaXMuYWpheFJlcXVlc3Qub3BlbihcIkdFVFwiLHRoaXMudXJsLCEwKSx0aGlzLmFqYXhSZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUmJnRoaXMuYWpheFJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIiksdGhpcy5hamF4UmVxdWVzdC5zZW5kKG51bGwpfSxiLkF0bGFzTG9hZGVyLnByb3RvdHlwZS5vbkF0bGFzTG9hZGVkPWZ1bmN0aW9uKCl7aWYoND09PXRoaXMuYWpheFJlcXVlc3QucmVhZHlTdGF0ZSlpZigyMDA9PT10aGlzLmFqYXhSZXF1ZXN0LnN0YXR1c3x8LTE9PT13aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiaHR0cFwiKSl7dGhpcy5hdGxhcz17bWV0YTp7aW1hZ2U6W119LGZyYW1lczpbXX07dmFyIGE9dGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQuc3BsaXQoL1xccj9cXG4vKSxjPS0zLGQ9MCxlPW51bGwsZj0hMSxnPTAsaD0wLGk9dGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMpO2ZvcihnPTA7ZzxhLmxlbmd0aDtnKyspaWYoYVtnXT1hW2ddLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIiksXCJcIj09PWFbZ10mJihmPWcrMSksYVtnXS5sZW5ndGg+MCl7aWYoZj09PWcpdGhpcy5hdGxhcy5tZXRhLmltYWdlLnB1c2goYVtnXSksZD10aGlzLmF0bGFzLm1ldGEuaW1hZ2UubGVuZ3RoLTEsdGhpcy5hdGxhcy5mcmFtZXMucHVzaCh7fSksYz0tMztlbHNlIGlmKGM+MClpZihjJTc9PT0xKW51bGwhPWUmJih0aGlzLmF0bGFzLmZyYW1lc1tkXVtlLm5hbWVdPWUpLGU9e25hbWU6YVtnXSxmcmFtZTp7fX07ZWxzZXt2YXIgaj1hW2ddLnNwbGl0KFwiIFwiKTtpZihjJTc9PT0zKWUuZnJhbWUueD1OdW1iZXIoalsxXS5yZXBsYWNlKFwiLFwiLFwiXCIpKSxlLmZyYW1lLnk9TnVtYmVyKGpbMl0pO2Vsc2UgaWYoYyU3PT09NCllLmZyYW1lLnc9TnVtYmVyKGpbMV0ucmVwbGFjZShcIixcIixcIlwiKSksZS5mcmFtZS5oPU51bWJlcihqWzJdKTtlbHNlIGlmKGMlNz09PTUpe3ZhciBrPXt4OjAseTowLHc6TnVtYmVyKGpbMV0ucmVwbGFjZShcIixcIixcIlwiKSksaDpOdW1iZXIoalsyXSl9O2sudz5lLmZyYW1lLnd8fGsuaD5lLmZyYW1lLmg/KGUudHJpbW1lZD0hMCxlLnJlYWxTaXplPWspOmUudHJpbW1lZD0hMX19YysrfWlmKG51bGwhPWUmJih0aGlzLmF0bGFzLmZyYW1lc1tkXVtlLm5hbWVdPWUpLHRoaXMuYXRsYXMubWV0YS5pbWFnZS5sZW5ndGg+MCl7Zm9yKHRoaXMuaW1hZ2VzPVtdLGg9MDtoPHRoaXMuYXRsYXMubWV0YS5pbWFnZS5sZW5ndGg7aCsrKXt2YXIgbD10aGlzLmJhc2VVcmwrdGhpcy5hdGxhcy5tZXRhLmltYWdlW2hdLG09dGhpcy5hdGxhcy5mcmFtZXNbaF07dGhpcy5pbWFnZXMucHVzaChuZXcgYi5JbWFnZUxvYWRlcihsLHRoaXMuY3Jvc3NvcmlnaW4pKTtmb3IoZyBpbiBtKXt2YXIgbj1tW2ddLmZyYW1lO24mJihiLlRleHR1cmVDYWNoZVtnXT1uZXcgYi5UZXh0dXJlKHRoaXMuaW1hZ2VzW2hdLnRleHR1cmUuYmFzZVRleHR1cmUse3g6bi54LHk6bi55LHdpZHRoOm4udyxoZWlnaHQ6bi5ofSksbVtnXS50cmltbWVkJiYoYi5UZXh0dXJlQ2FjaGVbZ10ucmVhbFNpemU9bVtnXS5yZWFsU2l6ZSxiLlRleHR1cmVDYWNoZVtnXS50cmltLng9MCxiLlRleHR1cmVDYWNoZVtnXS50cmltLnk9MCkpfX1mb3IodGhpcy5jdXJyZW50SW1hZ2VJZD0wLGg9MDtoPHRoaXMuaW1hZ2VzLmxlbmd0aDtoKyspdGhpcy5pbWFnZXNbaF0uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLGkpO3RoaXMuaW1hZ2VzW3RoaXMuY3VycmVudEltYWdlSWRdLmxvYWQoKX1lbHNlIHRoaXMub25Mb2FkZWQoKX1lbHNlIHRoaXMub25FcnJvcigpfSxiLkF0bGFzTG9hZGVyLnByb3RvdHlwZS5vbkxvYWRlZD1mdW5jdGlvbigpe3RoaXMuaW1hZ2VzLmxlbmd0aC0xPnRoaXMuY3VycmVudEltYWdlSWQ/KHRoaXMuY3VycmVudEltYWdlSWQrKyx0aGlzLmltYWdlc1t0aGlzLmN1cnJlbnRJbWFnZUlkXS5sb2FkKCkpOih0aGlzLmxvYWRlZD0hMCx0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJsb2FkZWRcIixjb250ZW50OnRoaXN9KSl9LGIuQXRsYXNMb2FkZXIucHJvdG90eXBlLm9uRXJyb3I9ZnVuY3Rpb24oKXt0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJlcnJvclwiLGNvbnRlbnQ6dGhpc30pfSxiLlNwcml0ZVNoZWV0TG9hZGVyPWZ1bmN0aW9uKGEsYyl7Yi5FdmVudFRhcmdldC5jYWxsKHRoaXMpLHRoaXMudXJsPWEsdGhpcy5jcm9zc29yaWdpbj1jLHRoaXMuYmFzZVVybD1hLnJlcGxhY2UoL1teXFwvXSokLyxcIlwiKSx0aGlzLnRleHR1cmU9bnVsbCx0aGlzLmZyYW1lcz17fX0sYi5TcHJpdGVTaGVldExvYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5TcHJpdGVTaGVldExvYWRlcixiLlNwcml0ZVNoZWV0TG9hZGVyLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxjPW5ldyBiLkpzb25Mb2FkZXIodGhpcy51cmwsdGhpcy5jcm9zc29yaWdpbik7Yy5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsZnVuY3Rpb24oYil7YS5qc29uPWIuY29udGVudC5qc29uLGEub25Mb2FkZWQoKX0pLGMubG9hZCgpfSxiLlNwcml0ZVNoZWV0TG9hZGVyLnByb3RvdHlwZS5vbkxvYWRlZD1mdW5jdGlvbigpe3RoaXMuZGlzcGF0Y2hFdmVudCh7dHlwZTpcImxvYWRlZFwiLGNvbnRlbnQ6dGhpc30pfSxiLkltYWdlTG9hZGVyPWZ1bmN0aW9uKGEsYyl7Yi5FdmVudFRhcmdldC5jYWxsKHRoaXMpLHRoaXMudGV4dHVyZT1iLlRleHR1cmUuZnJvbUltYWdlKGEsYyksdGhpcy5mcmFtZXM9W119LGIuSW1hZ2VMb2FkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuSW1hZ2VMb2FkZXIsYi5JbWFnZUxvYWRlci5wcm90b3R5cGUubG9hZD1mdW5jdGlvbigpe2lmKHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5oYXNMb2FkZWQpdGhpcy5vbkxvYWRlZCgpO2Vsc2V7dmFyIGE9dGhpczt0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLGZ1bmN0aW9uKCl7YS5vbkxvYWRlZCgpfSl9fSxiLkltYWdlTG9hZGVyLnByb3RvdHlwZS5vbkxvYWRlZD1mdW5jdGlvbigpe3RoaXMuZGlzcGF0Y2hFdmVudCh7dHlwZTpcImxvYWRlZFwiLGNvbnRlbnQ6dGhpc30pfSxiLkltYWdlTG9hZGVyLnByb3RvdHlwZS5sb2FkRnJhbWVkU3ByaXRlU2hlZXQ9ZnVuY3Rpb24oYSxjLGQpe3RoaXMuZnJhbWVzPVtdO2Zvcih2YXIgZT1NYXRoLmZsb29yKHRoaXMudGV4dHVyZS53aWR0aC9hKSxmPU1hdGguZmxvb3IodGhpcy50ZXh0dXJlLmhlaWdodC9jKSxnPTAsaD0wO2Y+aDtoKyspZm9yKHZhciBpPTA7ZT5pO2krKyxnKyspe3ZhciBqPW5ldyBiLlRleHR1cmUodGhpcy50ZXh0dXJlLHt4OmkqYSx5OmgqYyx3aWR0aDphLGhlaWdodDpjfSk7dGhpcy5mcmFtZXMucHVzaChqKSxkJiYoYi5UZXh0dXJlQ2FjaGVbZCtcIi1cIitnXT1qKX1pZih0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuaGFzTG9hZGVkKXRoaXMub25Mb2FkZWQoKTtlbHNle3ZhciBrPXRoaXM7dGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIixmdW5jdGlvbigpe2sub25Mb2FkZWQoKX0pfX0sYi5CaXRtYXBGb250TG9hZGVyPWZ1bmN0aW9uKGEsYyl7Yi5FdmVudFRhcmdldC5jYWxsKHRoaXMpLHRoaXMudXJsPWEsdGhpcy5jcm9zc29yaWdpbj1jLHRoaXMuYmFzZVVybD1hLnJlcGxhY2UoL1teXFwvXSokLyxcIlwiKSx0aGlzLnRleHR1cmU9bnVsbH0sYi5CaXRtYXBGb250TG9hZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkJpdG1hcEZvbnRMb2FkZXIsYi5CaXRtYXBGb250TG9hZGVyLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKCl7dGhpcy5hamF4UmVxdWVzdD1uZXcgYi5BamF4UmVxdWVzdDt2YXIgYT10aGlzO3RoaXMuYWpheFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YS5vblhNTExvYWRlZCgpfSx0aGlzLmFqYXhSZXF1ZXN0Lm9wZW4oXCJHRVRcIix0aGlzLnVybCwhMCksdGhpcy5hamF4UmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlJiZ0aGlzLmFqYXhSZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoXCJhcHBsaWNhdGlvbi94bWxcIiksdGhpcy5hamF4UmVxdWVzdC5zZW5kKG51bGwpfSxiLkJpdG1hcEZvbnRMb2FkZXIucHJvdG90eXBlLm9uWE1MTG9hZGVkPWZ1bmN0aW9uKCl7aWYoND09PXRoaXMuYWpheFJlcXVlc3QucmVhZHlTdGF0ZSYmKDIwMD09PXRoaXMuYWpheFJlcXVlc3Quc3RhdHVzfHwtMT09PXdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKFwiaHR0cFwiKSkpe3ZhciBhPXRoaXMuYWpheFJlcXVlc3QucmVzcG9uc2VYTUw7aWYoIWF8fC9NU0lFIDkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpfHxuYXZpZ2F0b3IuaXNDb2Nvb25KUylpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB3aW5kb3cuRE9NUGFyc2VyKXt2YXIgYz1uZXcgRE9NUGFyc2VyO2E9Yy5wYXJzZUZyb21TdHJpbmcodGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQsXCJ0ZXh0L3htbFwiKX1lbHNle3ZhciBkPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZC5pbm5lckhUTUw9dGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQsYT1kfXZhciBlPXRoaXMuYmFzZVVybCthLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFnZVwiKVswXS5nZXRBdHRyaWJ1dGUoXCJmaWxlXCIpLGY9bmV3IGIuSW1hZ2VMb2FkZXIoZSx0aGlzLmNyb3Nzb3JpZ2luKTt0aGlzLnRleHR1cmU9Zi50ZXh0dXJlLmJhc2VUZXh0dXJlO3ZhciBnPXt9LGg9YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImluZm9cIilbMF0saT1hLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY29tbW9uXCIpWzBdO2cuZm9udD1oLmdldEF0dHJpYnV0ZShcImZhY2VcIiksZy5zaXplPXBhcnNlSW50KGguZ2V0QXR0cmlidXRlKFwic2l6ZVwiKSwxMCksZy5saW5lSGVpZ2h0PXBhcnNlSW50KGkuZ2V0QXR0cmlidXRlKFwibGluZUhlaWdodFwiKSwxMCksZy5jaGFycz17fTtmb3IodmFyIGo9YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImNoYXJcIiksaz0wO2s8ai5sZW5ndGg7aysrKXt2YXIgbD1wYXJzZUludChqW2tdLmdldEF0dHJpYnV0ZShcImlkXCIpLDEwKSxtPW5ldyBiLlJlY3RhbmdsZShwYXJzZUludChqW2tdLmdldEF0dHJpYnV0ZShcInhcIiksMTApLHBhcnNlSW50KGpba10uZ2V0QXR0cmlidXRlKFwieVwiKSwxMCkscGFyc2VJbnQoaltrXS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSwxMCkscGFyc2VJbnQoaltrXS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiksMTApKTtnLmNoYXJzW2xdPXt4T2Zmc2V0OnBhcnNlSW50KGpba10uZ2V0QXR0cmlidXRlKFwieG9mZnNldFwiKSwxMCkseU9mZnNldDpwYXJzZUludChqW2tdLmdldEF0dHJpYnV0ZShcInlvZmZzZXRcIiksMTApLHhBZHZhbmNlOnBhcnNlSW50KGpba10uZ2V0QXR0cmlidXRlKFwieGFkdmFuY2VcIiksMTApLGtlcm5pbmc6e30sdGV4dHVyZTpiLlRleHR1cmVDYWNoZVtsXT1uZXcgYi5UZXh0dXJlKHRoaXMudGV4dHVyZSxtKX19dmFyIG49YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImtlcm5pbmdcIik7Zm9yKGs9MDtrPG4ubGVuZ3RoO2srKyl7dmFyIG89cGFyc2VJbnQobltrXS5nZXRBdHRyaWJ1dGUoXCJmaXJzdFwiKSwxMCkscD1wYXJzZUludChuW2tdLmdldEF0dHJpYnV0ZShcInNlY29uZFwiKSwxMCkscT1wYXJzZUludChuW2tdLmdldEF0dHJpYnV0ZShcImFtb3VudFwiKSwxMCk7Zy5jaGFyc1twXS5rZXJuaW5nW29dPXF9Yi5CaXRtYXBUZXh0LmZvbnRzW2cuZm9udF09Zzt2YXIgcj10aGlzO2YuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLGZ1bmN0aW9uKCl7ci5vbkxvYWRlZCgpfSksZi5sb2FkKCl9fSxiLkJpdG1hcEZvbnRMb2FkZXIucHJvdG90eXBlLm9uTG9hZGVkPWZ1bmN0aW9uKCl7dGhpcy5kaXNwYXRjaEV2ZW50KHt0eXBlOlwibG9hZGVkXCIsY29udGVudDp0aGlzfSl9LGIuU3BpbmVMb2FkZXI9ZnVuY3Rpb24oYSxjKXtiLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyksdGhpcy51cmw9YSx0aGlzLmNyb3Nzb3JpZ2luPWMsdGhpcy5sb2FkZWQ9ITF9LGIuU3BpbmVMb2FkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuU3BpbmVMb2FkZXIsYi5TcGluZUxvYWRlci5wcm90b3R5cGUubG9hZD1mdW5jdGlvbigpe3ZhciBhPXRoaXMsYz1uZXcgYi5Kc29uTG9hZGVyKHRoaXMudXJsLHRoaXMuY3Jvc3NvcmlnaW4pO1xuYy5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsZnVuY3Rpb24oYil7YS5qc29uPWIuY29udGVudC5qc29uLGEub25Mb2FkZWQoKX0pLGMubG9hZCgpfSxiLlNwaW5lTG9hZGVyLnByb3RvdHlwZS5vbkxvYWRlZD1mdW5jdGlvbigpe3RoaXMubG9hZGVkPSEwLHRoaXMuZGlzcGF0Y2hFdmVudCh7dHlwZTpcImxvYWRlZFwiLGNvbnRlbnQ6dGhpc30pfSxiLkFic3RyYWN0RmlsdGVyPWZ1bmN0aW9uKGEsYil7dGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMuc2hhZGVycz1bXSx0aGlzLmRpcnR5PSEwLHRoaXMucGFkZGluZz0wLHRoaXMudW5pZm9ybXM9Ynx8e30sdGhpcy5mcmFnbWVudFNyYz1hfHxbXX0sYi5BbHBoYU1hc2tGaWx0ZXI9ZnVuY3Rpb24oYSl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSxhLmJhc2VUZXh0dXJlLl9wb3dlck9mMj0hMCx0aGlzLnVuaWZvcm1zPXttYXNrOnt0eXBlOlwic2FtcGxlcjJEXCIsdmFsdWU6YX0sbWFwRGltZW5zaW9uczp7dHlwZTpcIjJmXCIsdmFsdWU6e3g6MSx5OjUxMTJ9fSxkaW1lbnNpb25zOnt0eXBlOlwiNGZ2XCIsdmFsdWU6WzAsMCwwLDBdfX0sYS5iYXNlVGV4dHVyZS5oYXNMb2FkZWQ/KHRoaXMudW5pZm9ybXMubWFzay52YWx1ZS54PWEud2lkdGgsdGhpcy51bmlmb3Jtcy5tYXNrLnZhbHVlLnk9YS5oZWlnaHQpOih0aGlzLmJvdW5kTG9hZGVkRnVuY3Rpb249dGhpcy5vblRleHR1cmVMb2FkZWQuYmluZCh0aGlzKSxhLmJhc2VUZXh0dXJlLm9uKFwibG9hZGVkXCIsdGhpcy5ib3VuZExvYWRlZEZ1bmN0aW9uKSksdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIG1hc2s7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcInVuaWZvcm0gdmVjMiBvZmZzZXQ7XCIsXCJ1bmlmb3JtIHZlYzQgZGltZW5zaW9ucztcIixcInVuaWZvcm0gdmVjMiBtYXBEaW1lbnNpb25zO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzIgbWFwQ29yZHMgPSB2VGV4dHVyZUNvb3JkLnh5O1wiLFwiICAgbWFwQ29yZHMgKz0gKGRpbWVuc2lvbnMuencgKyBvZmZzZXQpLyBkaW1lbnNpb25zLnh5IDtcIixcIiAgIG1hcENvcmRzLnkgKj0gLTEuMDtcIixcIiAgIG1hcENvcmRzLnkgKz0gMS4wO1wiLFwiICAgbWFwQ29yZHMgKj0gZGltZW5zaW9ucy54eSAvIG1hcERpbWVuc2lvbnM7XCIsXCIgICB2ZWM0IG9yaWdpbmFsID0gIHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXCIgICBmbG9hdCBtYXNrQWxwaGEgPSAgdGV4dHVyZTJEKG1hc2ssIG1hcENvcmRzKS5yO1wiLFwiICAgb3JpZ2luYWwgKj0gbWFza0FscGhhO1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gIG9yaWdpbmFsO1wiLFwifVwiXX0sYi5BbHBoYU1hc2tGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuQWxwaGFNYXNrRmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkFscGhhTWFza0ZpbHRlcixiLkFscGhhTWFza0ZpbHRlci5wcm90b3R5cGUub25UZXh0dXJlTG9hZGVkPWZ1bmN0aW9uKCl7dGhpcy51bmlmb3Jtcy5tYXBEaW1lbnNpb25zLnZhbHVlLng9dGhpcy51bmlmb3Jtcy5tYXNrLnZhbHVlLndpZHRoLHRoaXMudW5pZm9ybXMubWFwRGltZW5zaW9ucy52YWx1ZS55PXRoaXMudW5pZm9ybXMubWFzay52YWx1ZS5oZWlnaHQsdGhpcy51bmlmb3Jtcy5tYXNrLnZhbHVlLmJhc2VUZXh0dXJlLm9mZihcImxvYWRlZFwiLHRoaXMuYm91bmRMb2FkZWRGdW5jdGlvbil9LE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkFscGhhTWFza0ZpbHRlci5wcm90b3R5cGUsXCJtYXBcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMubWFzay52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMubWFzay52YWx1ZT1hfX0pLGIuQ29sb3JNYXRyaXhGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e21hdHJpeDp7dHlwZTpcIm1hdDRcIix2YWx1ZTpbMSwwLDAsMCwwLDEsMCwwLDAsMCwxLDAsMCwwLDAsMV19fSx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSBmbG9hdCBpbnZlcnQ7XCIsXCJ1bmlmb3JtIG1hdDQgbWF0cml4O1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKSAqIG1hdHJpeDtcIixcIn1cIl19LGIuQ29sb3JNYXRyaXhGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuQ29sb3JNYXRyaXhGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQ29sb3JNYXRyaXhGaWx0ZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuQ29sb3JNYXRyaXhGaWx0ZXIucHJvdG90eXBlLFwibWF0cml4XCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLm1hdHJpeC52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMubWF0cml4LnZhbHVlPWF9fSksYi5HcmF5RmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXtncmF5Ont0eXBlOlwiMWZcIix2YWx1ZToxfX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidW5pZm9ybSBmbG9hdCBncmF5O1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXCIgICBnbF9GcmFnQ29sb3IucmdiID0gbWl4KGdsX0ZyYWdDb2xvci5yZ2IsIHZlYzMoMC4yMTI2KmdsX0ZyYWdDb2xvci5yICsgMC43MTUyKmdsX0ZyYWdDb2xvci5nICsgMC4wNzIyKmdsX0ZyYWdDb2xvci5iKSwgZ3JheSk7XCIsXCJ9XCJdfSxiLkdyYXlGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuR3JheUZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5HcmF5RmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkdyYXlGaWx0ZXIucHJvdG90eXBlLFwiZ3JheVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5ncmF5LnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy51bmlmb3Jtcy5ncmF5LnZhbHVlPWF9fSksYi5EaXNwbGFjZW1lbnRGaWx0ZXI9ZnVuY3Rpb24oYSl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSxhLmJhc2VUZXh0dXJlLl9wb3dlck9mMj0hMCx0aGlzLnVuaWZvcm1zPXtkaXNwbGFjZW1lbnRNYXA6e3R5cGU6XCJzYW1wbGVyMkRcIix2YWx1ZTphfSxzY2FsZTp7dHlwZTpcIjJmXCIsdmFsdWU6e3g6MzAseTozMH19LG9mZnNldDp7dHlwZTpcIjJmXCIsdmFsdWU6e3g6MCx5OjB9fSxtYXBEaW1lbnNpb25zOnt0eXBlOlwiMmZcIix2YWx1ZTp7eDoxLHk6NTExMn19LGRpbWVuc2lvbnM6e3R5cGU6XCI0ZnZcIix2YWx1ZTpbMCwwLDAsMF19fSxhLmJhc2VUZXh0dXJlLmhhc0xvYWRlZD8odGhpcy51bmlmb3Jtcy5tYXBEaW1lbnNpb25zLnZhbHVlLng9YS53aWR0aCx0aGlzLnVuaWZvcm1zLm1hcERpbWVuc2lvbnMudmFsdWUueT1hLmhlaWdodCk6KHRoaXMuYm91bmRMb2FkZWRGdW5jdGlvbj10aGlzLm9uVGV4dHVyZUxvYWRlZC5iaW5kKHRoaXMpLGEuYmFzZVRleHR1cmUub24oXCJsb2FkZWRcIix0aGlzLmJvdW5kTG9hZGVkRnVuY3Rpb24pKSx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgZGlzcGxhY2VtZW50TWFwO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ1bmlmb3JtIHZlYzIgc2NhbGU7XCIsXCJ1bmlmb3JtIHZlYzIgb2Zmc2V0O1wiLFwidW5pZm9ybSB2ZWM0IGRpbWVuc2lvbnM7XCIsXCJ1bmlmb3JtIHZlYzIgbWFwRGltZW5zaW9ucztcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWMyIG1hcENvcmRzID0gdlRleHR1cmVDb29yZC54eTtcIixcIiAgIG1hcENvcmRzICs9IChkaW1lbnNpb25zLnp3ICsgb2Zmc2V0KS8gZGltZW5zaW9ucy54eSA7XCIsXCIgICBtYXBDb3Jkcy55ICo9IC0xLjA7XCIsXCIgICBtYXBDb3Jkcy55ICs9IDEuMDtcIixcIiAgIHZlYzIgbWF0U2FtcGxlID0gdGV4dHVyZTJEKGRpc3BsYWNlbWVudE1hcCwgbWFwQ29yZHMpLnh5O1wiLFwiICAgbWF0U2FtcGxlIC09IDAuNTtcIixcIiAgIG1hdFNhbXBsZSAqPSBzY2FsZTtcIixcIiAgIG1hdFNhbXBsZSAvPSBtYXBEaW1lbnNpb25zO1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCArIG1hdFNhbXBsZS54LCB2VGV4dHVyZUNvb3JkLnkgKyBtYXRTYW1wbGUueSkpO1wiLFwiICAgZ2xfRnJhZ0NvbG9yLnJnYiA9IG1peCggZ2xfRnJhZ0NvbG9yLnJnYiwgZ2xfRnJhZ0NvbG9yLnJnYiwgMS4wKTtcIixcIiAgIHZlYzIgY29yZCA9IHZUZXh0dXJlQ29vcmQ7XCIsXCJ9XCJdfSxiLkRpc3BsYWNlbWVudEZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5EaXNwbGFjZW1lbnRGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuRGlzcGxhY2VtZW50RmlsdGVyLGIuRGlzcGxhY2VtZW50RmlsdGVyLnByb3RvdHlwZS5vblRleHR1cmVMb2FkZWQ9ZnVuY3Rpb24oKXt0aGlzLnVuaWZvcm1zLm1hcERpbWVuc2lvbnMudmFsdWUueD10aGlzLnVuaWZvcm1zLmRpc3BsYWNlbWVudE1hcC52YWx1ZS53aWR0aCx0aGlzLnVuaWZvcm1zLm1hcERpbWVuc2lvbnMudmFsdWUueT10aGlzLnVuaWZvcm1zLmRpc3BsYWNlbWVudE1hcC52YWx1ZS5oZWlnaHQsdGhpcy51bmlmb3Jtcy5kaXNwbGFjZW1lbnRNYXAudmFsdWUuYmFzZVRleHR1cmUub2ZmKFwibG9hZGVkXCIsdGhpcy5ib3VuZExvYWRlZEZ1bmN0aW9uKX0sT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxhY2VtZW50RmlsdGVyLnByb3RvdHlwZSxcIm1hcFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5kaXNwbGFjZW1lbnRNYXAudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLmRpc3BsYWNlbWVudE1hcC52YWx1ZT1hfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYWNlbWVudEZpbHRlci5wcm90b3R5cGUsXCJzY2FsZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5zY2FsZS52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMuc2NhbGUudmFsdWU9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5EaXNwbGFjZW1lbnRGaWx0ZXIucHJvdG90eXBlLFwib2Zmc2V0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLm9mZnNldC52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMub2Zmc2V0LnZhbHVlPWF9fSksYi5QaXhlbGF0ZUZpbHRlcj1mdW5jdGlvbigpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sdGhpcy51bmlmb3Jtcz17aW52ZXJ0Ont0eXBlOlwiMWZcIix2YWx1ZTowfSxkaW1lbnNpb25zOnt0eXBlOlwiNGZ2XCIsdmFsdWU6bmV3IEZsb2F0MzJBcnJheShbMWU0LDEwMCwxMCwxMF0pfSxwaXhlbFNpemU6e3R5cGU6XCIyZlwiLHZhbHVlOnt4OjEwLHk6MTB9fX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gdmVjMiB0ZXN0RGltO1wiLFwidW5pZm9ybSB2ZWM0IGRpbWVuc2lvbnM7XCIsXCJ1bmlmb3JtIHZlYzIgcGl4ZWxTaXplO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgdmVjMiBjb29yZCA9IHZUZXh0dXJlQ29vcmQ7XCIsXCIgICB2ZWMyIHNpemUgPSBkaW1lbnNpb25zLnh5L3BpeGVsU2l6ZTtcIixcIiAgIHZlYzIgY29sb3IgPSBmbG9vciggKCB2VGV4dHVyZUNvb3JkICogc2l6ZSApICkgLyBzaXplICsgcGl4ZWxTaXplL2RpbWVuc2lvbnMueHkgKiAwLjU7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIGNvbG9yKTtcIixcIn1cIl19LGIuUGl4ZWxhdGVGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuUGl4ZWxhdGVGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuUGl4ZWxhdGVGaWx0ZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuUGl4ZWxhdGVGaWx0ZXIucHJvdG90eXBlLFwic2l6ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5waXhlbFNpemUudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLmRpcnR5PSEwLHRoaXMudW5pZm9ybXMucGl4ZWxTaXplLnZhbHVlPWF9fSksYi5CbHVyWEZpbHRlcj1mdW5jdGlvbigpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sdGhpcy51bmlmb3Jtcz17Ymx1cjp7dHlwZTpcIjFmXCIsdmFsdWU6MS81MTJ9fSx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSBmbG9hdCBibHVyO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgdmVjNCBzdW0gPSB2ZWM0KDAuMCk7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCAtIDQuMCpibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMDU7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCAtIDMuMCpibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMDk7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCAtIDIuMCpibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMTI7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCAtIGJsdXIsIHZUZXh0dXJlQ29vcmQueSkpICogMC4xNTtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54LCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMTY7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCArIGJsdXIsIHZUZXh0dXJlQ29vcmQueSkpICogMC4xNTtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54ICsgMi4wKmJsdXIsIHZUZXh0dXJlQ29vcmQueSkpICogMC4xMjtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54ICsgMy4wKmJsdXIsIHZUZXh0dXJlQ29vcmQueSkpICogMC4wOTtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54ICsgNC4wKmJsdXIsIHZUZXh0dXJlQ29vcmQueSkpICogMC4wNTtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHN1bTtcIixcIn1cIl19LGIuQmx1clhGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuQmx1clhGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQmx1clhGaWx0ZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuQmx1clhGaWx0ZXIucHJvdG90eXBlLFwiYmx1clwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5ibHVyLnZhbHVlLygxLzdlMyl9LHNldDpmdW5jdGlvbihhKXt0aGlzLmRpcnR5PSEwLHRoaXMudW5pZm9ybXMuYmx1ci52YWx1ZT0xLzdlMyphfX0pLGIuQmx1cllGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e2JsdXI6e3R5cGU6XCIxZlwiLHZhbHVlOjEvNTEyfX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gZmxvYXQgYmx1cjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzQgc3VtID0gdmVjNCgwLjApO1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSAtIDQuMCpibHVyKSkgKiAwLjA1O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSAtIDMuMCpibHVyKSkgKiAwLjA5O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSAtIDIuMCpibHVyKSkgKiAwLjEyO1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSAtIGJsdXIpKSAqIDAuMTU7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCwgdlRleHR1cmVDb29yZC55KSkgKiAwLjE2O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSArIGJsdXIpKSAqIDAuMTU7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCwgdlRleHR1cmVDb29yZC55ICsgMi4wKmJsdXIpKSAqIDAuMTI7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCwgdlRleHR1cmVDb29yZC55ICsgMy4wKmJsdXIpKSAqIDAuMDk7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCwgdlRleHR1cmVDb29yZC55ICsgNC4wKmJsdXIpKSAqIDAuMDU7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSBzdW07XCIsXCJ9XCJdfSxiLkJsdXJZRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLkJsdXJZRmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkJsdXJZRmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkJsdXJZRmlsdGVyLnByb3RvdHlwZSxcImJsdXJcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMuYmx1ci52YWx1ZS8oMS83ZTMpfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy51bmlmb3Jtcy5ibHVyLnZhbHVlPTEvN2UzKmF9fSksYi5CbHVyRmlsdGVyPWZ1bmN0aW9uKCl7dGhpcy5ibHVyWEZpbHRlcj1uZXcgYi5CbHVyWEZpbHRlcix0aGlzLmJsdXJZRmlsdGVyPW5ldyBiLkJsdXJZRmlsdGVyLHRoaXMucGFzc2VzPVt0aGlzLmJsdXJYRmlsdGVyLHRoaXMuYmx1cllGaWx0ZXJdfSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5CbHVyRmlsdGVyLnByb3RvdHlwZSxcImJsdXJcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYmx1clhGaWx0ZXIuYmx1cn0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuYmx1clhGaWx0ZXIuYmx1cj10aGlzLmJsdXJZRmlsdGVyLmJsdXI9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5CbHVyRmlsdGVyLnByb3RvdHlwZSxcImJsdXJYXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJsdXJYRmlsdGVyLmJsdXJ9LHNldDpmdW5jdGlvbihhKXt0aGlzLmJsdXJYRmlsdGVyLmJsdXI9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5CbHVyRmlsdGVyLnByb3RvdHlwZSxcImJsdXJZXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJsdXJZRmlsdGVyLmJsdXJ9LHNldDpmdW5jdGlvbihhKXt0aGlzLmJsdXJZRmlsdGVyLmJsdXI9YX19KSxiLkludmVydEZpbHRlcj1mdW5jdGlvbigpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sdGhpcy51bmlmb3Jtcz17aW52ZXJ0Ont0eXBlOlwiMWZcIix2YWx1ZToxfX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gZmxvYXQgaW52ZXJ0O1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcIiAgIGdsX0ZyYWdDb2xvci5yZ2IgPSBtaXgoICh2ZWMzKDEpLWdsX0ZyYWdDb2xvci5yZ2IpICogZ2xfRnJhZ0NvbG9yLmEsIGdsX0ZyYWdDb2xvci5yZ2IsIDEuMCAtIGludmVydCk7XCIsXCJ9XCJdfSxiLkludmVydEZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5JbnZlcnRGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuSW52ZXJ0RmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkludmVydEZpbHRlci5wcm90b3R5cGUsXCJpbnZlcnRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMuaW52ZXJ0LnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy51bmlmb3Jtcy5pbnZlcnQudmFsdWU9YX19KSxiLlNlcGlhRmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXtzZXBpYTp7dHlwZTpcIjFmXCIsdmFsdWU6MX19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIGZsb2F0IHNlcGlhO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJjb25zdCBtYXQzIHNlcGlhTWF0cml4ID0gbWF0MygwLjM1ODgsIDAuNzA0NCwgMC4xMzY4LCAwLjI5OTAsIDAuNTg3MCwgMC4xMTQwLCAwLjIzOTIsIDAuNDY5NiwgMC4wOTEyKTtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFwiICAgZ2xfRnJhZ0NvbG9yLnJnYiA9IG1peCggZ2xfRnJhZ0NvbG9yLnJnYiwgZ2xfRnJhZ0NvbG9yLnJnYiAqIHNlcGlhTWF0cml4LCBzZXBpYSk7XCIsXCJ9XCJdfSxiLlNlcGlhRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLlNlcGlhRmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlNlcGlhRmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLlNlcGlhRmlsdGVyLnByb3RvdHlwZSxcInNlcGlhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLnNlcGlhLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy51bmlmb3Jtcy5zZXBpYS52YWx1ZT1hfX0pLGIuVHdpc3RGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e3JhZGl1czp7dHlwZTpcIjFmXCIsdmFsdWU6LjV9LGFuZ2xlOnt0eXBlOlwiMWZcIix2YWx1ZTo1fSxvZmZzZXQ6e3R5cGU6XCIyZlwiLHZhbHVlOnt4Oi41LHk6LjV9fX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gdmVjNCBkaW1lbnNpb25zO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ1bmlmb3JtIGZsb2F0IHJhZGl1cztcIixcInVuaWZvcm0gZmxvYXQgYW5nbGU7XCIsXCJ1bmlmb3JtIHZlYzIgb2Zmc2V0O1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzIgY29vcmQgPSB2VGV4dHVyZUNvb3JkIC0gb2Zmc2V0O1wiLFwiICAgZmxvYXQgZGlzdGFuY2UgPSBsZW5ndGgoY29vcmQpO1wiLFwiICAgaWYgKGRpc3RhbmNlIDwgcmFkaXVzKSB7XCIsXCIgICAgICAgZmxvYXQgcmF0aW8gPSAocmFkaXVzIC0gZGlzdGFuY2UpIC8gcmFkaXVzO1wiLFwiICAgICAgIGZsb2F0IGFuZ2xlTW9kID0gcmF0aW8gKiByYXRpbyAqIGFuZ2xlO1wiLFwiICAgICAgIGZsb2F0IHMgPSBzaW4oYW5nbGVNb2QpO1wiLFwiICAgICAgIGZsb2F0IGMgPSBjb3MoYW5nbGVNb2QpO1wiLFwiICAgICAgIGNvb3JkID0gdmVjMihjb29yZC54ICogYyAtIGNvb3JkLnkgKiBzLCBjb29yZC54ICogcyArIGNvb3JkLnkgKiBjKTtcIixcIiAgIH1cIixcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgY29vcmQrb2Zmc2V0KTtcIixcIn1cIl19LGIuVHdpc3RGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuVHdpc3RGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuVHdpc3RGaWx0ZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuVHdpc3RGaWx0ZXIucHJvdG90eXBlLFwib2Zmc2V0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLm9mZnNldC52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuZGlydHk9ITAsdGhpcy51bmlmb3Jtcy5vZmZzZXQudmFsdWU9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5Ud2lzdEZpbHRlci5wcm90b3R5cGUsXCJyYWRpdXNcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMucmFkaXVzLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eT0hMCx0aGlzLnVuaWZvcm1zLnJhZGl1cy52YWx1ZT1hfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLlR3aXN0RmlsdGVyLnByb3RvdHlwZSxcImFuZ2xlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLmFuZ2xlLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eT0hMCx0aGlzLnVuaWZvcm1zLmFuZ2xlLnZhbHVlPWF9fSksYi5Db2xvclN0ZXBGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e3N0ZXA6e3R5cGU6XCIxZlwiLHZhbHVlOjV9fSx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ1bmlmb3JtIGZsb2F0IHN0ZXA7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgdmVjNCBjb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXCIgICBjb2xvciA9IGZsb29yKGNvbG9yICogc3RlcCkgLyBzdGVwO1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gY29sb3I7XCIsXCJ9XCJdfSxiLkNvbG9yU3RlcEZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5Db2xvclN0ZXBGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQ29sb3JTdGVwRmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkNvbG9yU3RlcEZpbHRlci5wcm90b3R5cGUsXCJzdGVwXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLnN0ZXAudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLnN0ZXAudmFsdWU9YX19KSxiLkRvdFNjcmVlbkZpbHRlcj1mdW5jdGlvbigpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sdGhpcy51bmlmb3Jtcz17c2NhbGU6e3R5cGU6XCIxZlwiLHZhbHVlOjF9LGFuZ2xlOnt0eXBlOlwiMWZcIix2YWx1ZTo1fSxkaW1lbnNpb25zOnt0eXBlOlwiNGZ2XCIsdmFsdWU6WzAsMCwwLDBdfX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gdmVjNCBkaW1lbnNpb25zO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ1bmlmb3JtIGZsb2F0IGFuZ2xlO1wiLFwidW5pZm9ybSBmbG9hdCBzY2FsZTtcIixcImZsb2F0IHBhdHRlcm4oKSB7XCIsXCIgICBmbG9hdCBzID0gc2luKGFuZ2xlKSwgYyA9IGNvcyhhbmdsZSk7XCIsXCIgICB2ZWMyIHRleCA9IHZUZXh0dXJlQ29vcmQgKiBkaW1lbnNpb25zLnh5O1wiLFwiICAgdmVjMiBwb2ludCA9IHZlYzIoXCIsXCIgICAgICAgYyAqIHRleC54IC0gcyAqIHRleC55LFwiLFwiICAgICAgIHMgKiB0ZXgueCArIGMgKiB0ZXgueVwiLFwiICAgKSAqIHNjYWxlO1wiLFwiICAgcmV0dXJuIChzaW4ocG9pbnQueCkgKiBzaW4ocG9pbnQueSkpICogNC4wO1wiLFwifVwiLFwidm9pZCBtYWluKCkge1wiLFwiICAgdmVjNCBjb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXCIgICBmbG9hdCBhdmVyYWdlID0gKGNvbG9yLnIgKyBjb2xvci5nICsgY29sb3IuYikgLyAzLjA7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHZlYzMoYXZlcmFnZSAqIDEwLjAgLSA1LjAgKyBwYXR0ZXJuKCkpLCBjb2xvci5hKTtcIixcIn1cIl19LGIuRG90U2NyZWVuRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLkRvdFNjcmVlbkZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5Eb3RTY3JlZW5GaWx0ZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRG90U2NyZWVuRmlsdGVyLnByb3RvdHlwZSxcInNjYWxlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLnNjYWxlLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eT0hMCx0aGlzLnVuaWZvcm1zLnNjYWxlLnZhbHVlPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRG90U2NyZWVuRmlsdGVyLnByb3RvdHlwZSxcImFuZ2xlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLmFuZ2xlLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eT0hMCx0aGlzLnVuaWZvcm1zLmFuZ2xlLnZhbHVlPWF9fSksYi5Dcm9zc0hhdGNoRmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXtibHVyOnt0eXBlOlwiMWZcIix2YWx1ZToxLzUxMn19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIGZsb2F0IGJsdXI7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICAgZmxvYXQgbHVtID0gbGVuZ3RoKHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZC54eSkucmdiKTtcIixcIiAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDEuMCwgMS4wLCAxLjAsIDEuMCk7XCIsXCIgICAgaWYgKGx1bSA8IDEuMDApIHtcIixcIiAgICAgICAgaWYgKG1vZChnbF9GcmFnQ29vcmQueCArIGdsX0ZyYWdDb29yZC55LCAxMC4wKSA9PSAwLjApIHtcIixcIiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcIixcIiAgICAgICAgfVwiLFwiICAgIH1cIixcIiAgICBpZiAobHVtIDwgMC43NSkge1wiLFwiICAgICAgICBpZiAobW9kKGdsX0ZyYWdDb29yZC54IC0gZ2xfRnJhZ0Nvb3JkLnksIDEwLjApID09IDAuMCkge1wiLFwiICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjAsIDAuMCwgMC4wLCAxLjApO1wiLFwiICAgICAgICB9XCIsXCIgICAgfVwiLFwiICAgIGlmIChsdW0gPCAwLjUwKSB7XCIsXCIgICAgICAgIGlmIChtb2QoZ2xfRnJhZ0Nvb3JkLnggKyBnbF9GcmFnQ29vcmQueSAtIDUuMCwgMTAuMCkgPT0gMC4wKSB7XCIsXCIgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDAuMCwgMC4wLCAwLjAsIDEuMCk7XCIsXCIgICAgICAgIH1cIixcIiAgICB9XCIsXCIgICAgaWYgKGx1bSA8IDAuMykge1wiLFwiICAgICAgICBpZiAobW9kKGdsX0ZyYWdDb29yZC54IC0gZ2xfRnJhZ0Nvb3JkLnkgLSA1LjAsIDEwLjApID09IDAuMCkge1wiLFwiICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjAsIDAuMCwgMC4wLCAxLjApO1wiLFwiICAgICAgICB9XCIsXCIgICAgfVwiLFwifVwiXX0sYi5Dcm9zc0hhdGNoRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLkNyb3NzSGF0Y2hGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQmx1cllGaWx0ZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuQ3Jvc3NIYXRjaEZpbHRlci5wcm90b3R5cGUsXCJibHVyXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLmJsdXIudmFsdWUvKDEvN2UzKX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMuYmx1ci52YWx1ZT0xLzdlMyphfX0pLGIuUkdCU3BsaXRGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e3JlZDp7dHlwZTpcIjJmXCIsdmFsdWU6e3g6MjAseToyMH19LGdyZWVuOnt0eXBlOlwiMmZcIix2YWx1ZTp7eDotMjAseToyMH19LGJsdWU6e3R5cGU6XCIyZlwiLHZhbHVlOnt4OjIwLHk6LTIwfX0sZGltZW5zaW9uczp7dHlwZTpcIjRmdlwiLHZhbHVlOlswLDAsMCwwXX19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIHZlYzIgcmVkO1wiLFwidW5pZm9ybSB2ZWMyIGdyZWVuO1wiLFwidW5pZm9ybSB2ZWMyIGJsdWU7XCIsXCJ1bmlmb3JtIHZlYzQgZGltZW5zaW9ucztcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvci5yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkICsgcmVkL2RpbWVuc2lvbnMueHkpLnI7XCIsXCIgICBnbF9GcmFnQ29sb3IuZyA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCArIGdyZWVuL2RpbWVuc2lvbnMueHkpLmc7XCIsXCIgICBnbF9GcmFnQ29sb3IuYiA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCArIGJsdWUvZGltZW5zaW9ucy54eSkuYjtcIixcIiAgIGdsX0ZyYWdDb2xvci5hID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKS5hO1wiLFwifVwiXX0sYi5SR0JTcGxpdEZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5SR0JTcGxpdEZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5SR0JTcGxpdEZpbHRlcixPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5SR0JTcGxpdEZpbHRlci5wcm90b3R5cGUsXCJhbmdsZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5ibHVyLnZhbHVlLygxLzdlMyl9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLmJsdXIudmFsdWU9MS83ZTMqYX19KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cz8oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJihleHBvcnRzPW1vZHVsZS5leHBvcnRzPWIpLGV4cG9ydHMuUElYST1iKTpcInVuZGVmaW5lZFwiIT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShiKTphLlBJWEk9Yn0pLmNhbGwodGhpcyk7IiwiKGZ1bmN0aW9uKCkge1xuXHQvKipcblx0ICogVGhlIGJhc2ljIHhub2RlIGNsYXNzLlxuXHQgKiBJdCBzZXRzIHRoZSB1bmRlcmx5aW5nIG5vZGUgZWxlbWVudCBieSBjYWxsaW5nXG5cdCAqIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcblx0ICovXG5cdGZ1bmN0aW9uIFhOb2RlKHR5cGUsIGNvbnRlbnQpIHtcblx0XHR0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXG5cdFx0aWYgKGNvbnRlbnQgIT09IHVuZGVmaW5lZClcblx0XHRcdHRoaXMubm9kZS5pbm5lckhUTUwgPSBjb250ZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gZXh0ZW5kZWQgY2xhc3MgdXNpbmdcblx0ICogdGhlIFhOb2RlIGNsYXNzIGRlZmluZWQgYWJvdmUuXG5cdCAqL1xuXHRmdW5jdGlvbiBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChlbGVtZW50VHlwZSwgY29udGVudCkge1xuXHRcdHZhciBmID0gZnVuY3Rpb24oY29udGVudCkge1xuXHRcdFx0WE5vZGUuY2FsbCh0aGlzLCBlbGVtZW50VHlwZSwgY29udGVudCk7XG5cdFx0fTtcblxuXHRcdGYucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShYTm9kZS5wcm90b3R5cGUpO1xuXHRcdGYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZjtcblxuXHRcdHJldHVybiBmO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIHJlYWQgb25seSBwcm9wZXJ0eSB0aGF0IHJldHVybnMgdGhlXG5cdCAqIHZhbHVlIG9mIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IG9mIHRoZVxuXHQgKiB1bmRlcmx5aW5nIG5vZGUgb2JqZWN0LlxuXHQgKi9cblx0ZnVuY3Rpb24gY3JlYXRlWE5vZGVSZWFkT25seVByb3BlcnR5KHByb3BlcnR5TmFtZSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTm9kZS5wcm90b3R5cGUsIHByb3BlcnR5TmFtZSwge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubm9kZVtwcm9wZXJ0eU5hbWVdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIHJlYWQgd3JpdGUgcHJvcGVydHkgdGhhdCBvcGVyYXRlcyBvblxuXHQgKiB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBvZiB0aGUgdW5kZXJseWluZ1xuXHQgKiBub2RlIG9iamVjdC5cblx0ICovXG5cdGZ1bmN0aW9uIGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkocHJvcGVydHlOYW1lKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFhOb2RlLnByb3RvdHlwZSwgcHJvcGVydHlOYW1lLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ub2RlW3Byb3BlcnR5TmFtZV07XG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdHRoaXMubm9kZVtwcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbWV0aG9kIHRoYXQgcm91dGVzIHRoZSBjYWxsIHRocm91Z2gsIGRvd25cblx0ICogdG8gdGhlIHNhbWUgbWV0aG9kIG9uIHRoZSB1bmRlcmx5aW5nIG5vZGUgb2JqZWN0LlxuXHQgKi9cblx0ZnVuY3Rpb24gY3JlYXRlWE5vZGVNZXRob2QobWV0aG9kTmFtZSkge1xuXHRcdFhOb2RlLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubm9kZVttZXRob2ROYW1lXS5hcHBseSh0aGlzLm5vZGUsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE1vZGlmeSB0aGUgTm9kZS5wcm9wZXJ0eSBmdW5jdGlvbiwgc28gdGhhdCBpdCBhY2NlcHRzXG5cdCAqIFhOb2RlIG9iamVjdHMuIEFsbCBYTm9kZSBvYmplY3RzIHdpbGwgYmUgY2hhbmdlZCB0b1xuXHQgKiB0aGUgdW5kZXJseWluZyBub2RlIG9iamVjdHMsIGFuZCB0aGUgY29ycmVzcG9uZGluZ1xuXHQgKiBtZXRob2Qgd2lsbCBiZSBjYWxsZWQuXG5cdCAqL1xuXHRmdW5jdGlvbiBjcmVhdGVOb2RlVG9YTm9kZU1ldGhvZFdyYXBwZXIobWV0aG9kTmFtZSkge1xuXHRcdHZhciBvcmlnaW5hbEZ1bmN0aW9uID0gTm9kZS5wcm90b3R5cGVbbWV0aG9kTmFtZV07XG5cblx0XHROb2RlLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Zm9yICh2YXIgYSBpbiBhcmd1bWVudHMpIHtcblx0XHRcdFx0aWYgKGFyZ3VtZW50c1thXSBpbnN0YW5jZW9mIFhOb2RlKVxuXHRcdFx0XHRcdGFyZ3VtZW50c1thXSA9IGFyZ3VtZW50c1thXS5ub2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3JpZ2luYWxGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdXAgcmVhZCBvbmx5IHByb3BlcnRpZXMuXG5cdCAqL1xuXHRjcmVhdGVYTm9kZVJlYWRPbmx5UHJvcGVydHkoXCJzdHlsZVwiKTtcblxuXHQvKipcblx0ICogU2V0IHVwIHJlYWQvd3JpdGUgcHJvcGVydGllcy5cblx0ICovXG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJpbm5lckhUTUxcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJocmVmXCIpO1xuXHRjcmVhdGVYTm9kZVJlYWRXcml0ZVByb3BlcnR5KFwiaWRcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJ2YWx1ZVwiKTtcblx0Y3JlYXRlWE5vZGVSZWFkV3JpdGVQcm9wZXJ0eShcInR5cGVcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJjbGFzc05hbWVcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJzcmNcIik7XG5cblx0LyoqXG5cdCAqIFNldCB1cCBtZXRob2RzIHRvIGJlIHJvdXRlZCB0byB0aGUgdW5kZXJseWluZyBub2RlIG9iamVjdC5cblx0ICovXG5cdGNyZWF0ZVhOb2RlTWV0aG9kKFwiYXBwZW5kQ2hpbGRcIik7XG5cdGNyZWF0ZVhOb2RlTWV0aG9kKFwicmVtb3ZlQ2hpbGRcIik7XG5cdGNyZWF0ZVhOb2RlTWV0aG9kKFwiYWRkRXZlbnRMaXN0ZW5lclwiKTtcblx0Y3JlYXRlWE5vZGVNZXRob2QoXCJyZW1vdmVFdmVudExpc3RlbmVyXCIpO1xuXG5cdC8qKlxuXHQgKiBTZXQgdXAgbWV0aG9kcyBvbiBOb2RlLnByb3BlcnR5LlxuXHQgKi9cblx0Y3JlYXRlTm9kZVRvWE5vZGVNZXRob2RXcmFwcGVyKFwiYXBwZW5kQ2hpbGRcIik7XG5cdGNyZWF0ZU5vZGVUb1hOb2RlTWV0aG9kV3JhcHBlcihcInJlbW92ZUNoaWxkXCIpO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgZXZlbnQgbGlzdGVuZXIgYWxpYXNlcy5cblx0ICovXG5cdFhOb2RlLnByb3RvdHlwZS5vbiA9IFhOb2RlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXHRYTm9kZS5wcm90b3R5cGUub2ZmID0gWE5vZGUucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cblx0LyoqXG5cdCAqIFdvcmsgYm90aCBhcyBhIG5wbSBtb2R1bGUgYW5kIHN0YW5kYWxvbmUuXG5cdCAqL1xuXHR2YXIgdGFyZ2V0O1xuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSB0YXJnZXQ7XG5cdH0gZWxzZSB7XG5cdFx0eG5vZGUgPSB7fTtcblx0XHR0YXJnZXQgPSB4bm9kZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgZXh0ZW5kZWQgY2xhc3Nlcy5cblx0ICovXG5cdHRhcmdldC5EaXYgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcImRpdlwiKTtcblx0dGFyZ2V0LkJ1dHRvbiA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHR0YXJnZXQuVWwgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInVsXCIpO1xuXHR0YXJnZXQuTGkgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcImxpXCIpO1xuXHR0YXJnZXQuQSA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiYVwiKTtcblx0dGFyZ2V0Lk9wdGlvbiA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHR0YXJnZXQuU2VsZWN0ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJzZWxlY3RcIik7XG5cdHRhcmdldC5JbnB1dCA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdHRhcmdldC5OYXYgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcIm5hdlwiKTtcblx0dGFyZ2V0LlNwYW4gPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInNwYW5cIik7XG5cdHRhcmdldC5QID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJwXCIpO1xuXHR0YXJnZXQuVGFibGUgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRhYmxlXCIpO1xuXHR0YXJnZXQuVGhlYWQgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRoZWFkXCIpO1xuXHR0YXJnZXQuVGJvZHkgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRib2R5XCIpO1xuXHR0YXJnZXQuVHIgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRyXCIpO1xuXHR0YXJnZXQuVGQgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRkXCIpO1xuXHR0YXJnZXQuVGggPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRoXCIpO1xuXHR0YXJnZXQuSW1nID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJpbWdcIik7XG5cdHRhcmdldC5JID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJpXCIpO1xuXHR0YXJnZXQuQiA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiYlwiKTtcblx0dGFyZ2V0LkgxID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoMVwiKTtcblx0dGFyZ2V0LkgyID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoMlwiKTtcblx0dGFyZ2V0LkgzID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoM1wiKTtcblx0dGFyZ2V0Lkg0ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoNFwiKTtcblx0dGFyZ2V0Lkg1ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoNVwiKTtcblx0dGFyZ2V0Lkg2ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoNlwiKTtcbn0pKCk7IiwidmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCJ5YWVkXCIpO1xuXG4vKipcbiAqIENvbGxlY3Rpb24uXG4gKiBAY2xhc3MgQ29sbGVjdGlvblxuICovXG5mdW5jdGlvbiBDb2xsZWN0aW9uKCkge1xuXHR0aGlzLml0ZW1zID0gW107XG59XG5cbmluaGVyaXRzKENvbGxlY3Rpb24sIEV2ZW50RGlzcGF0Y2hlcik7XG5cbi8qKlxuICogQWRkIGl0ZW0gYXQgZW5kLlxuICogQG1ldGhvZCBhZGRJdGVtXG4gKi9cbkNvbGxlY3Rpb24ucHJvdG90eXBlLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG5cdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcblxuXHR0aGlzLnRyaWdnZXJDaGFuZ2UoXCJhZGRcIiwgaXRlbSwgdGhpcy5pdGVtcy5sZW5ndGggLSAxKTtcbn1cblxuLyoqXG4gKiBBZGQgaXRlbSBhdCBpbmRleC5cbiAqIEBtZXRob2QgYWRkSXRlbVxuICovXG5Db2xsZWN0aW9uLnByb3RvdHlwZS5hZGRJdGVtQXQgPSBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuXHRpZiAoaW5kZXggPCAwKVxuXHRcdGluZGV4ID0gMDtcblxuXHRpZiAoaW5kZXggPiB0aGlzLml0ZW1zLmxlbmd0aClcblx0XHRpbmRleCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuXG5cdHZhciBhZnRlciA9IHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4KTtcblx0dGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuXHR0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5jb25jYXQoYWZ0ZXIpO1xuXG5cdHRoaXMudHJpZ2dlckNoYW5nZShcImFkZFwiLCBpdGVtLCBpbmRleCk7XG59XG5cbi8qKlxuICogR2V0IGxlbmd0aC5cbiAqIEBtZXRob2QgZ2V0TGVuZ3RoXG4gKi9cbkNvbGxlY3Rpb24ucHJvdG90eXBlLmdldExlbmd0aCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGg7XG59XG5cbi8qKlxuICogR2V0IGl0ZW0gYXQgaW5kZXguXG4gKiBAbWV0aG9kIGdldEl0ZW1BdFxuICovXG5Db2xsZWN0aW9uLnByb3RvdHlwZS5nZXRJdGVtQXQgPSBmdW5jdGlvbihpbmRleCkge1xuXHRyZXR1cm4gdGhpcy5pdGVtc1tpbmRleF07XG59XG5cbi8qKlxuICogRmluZCBpdGVtIGluZGV4LlxuICogQG1ldGhvZCBnZXRJdGVtSW5kZXhcbiAqL1xuQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0SXRlbUluZGV4ID0gZnVuY3Rpb24oaXRlbSkge1xuXHRyZXR1cm4gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xufVxuXG4vKipcbiAqIFJlbW92ZSBpdGVtIGF0LlxuICogQG1ldGhvZCByZW1vdmVJdGVtQXRcbiAqL1xuQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlSXRlbUF0ID0gZnVuY3Rpb24oaW5kZXgpIHtcblx0aWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLml0ZW1zLmxlbmd0aClcblx0XHRyZXR1cm47XG5cblx0dmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW1BdChpbmRleCk7XG5cblx0dGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHR0aGlzLnRyaWdnZXJDaGFuZ2UoXCJyZW1vdmVcIiwgaXRlbSwgaW5kZXgpO1xufVxuXG4vKipcbiAqIFJlbW92ZSBpdGVtLlxuICogQG1ldGhvZCByZW1vdmVJdGVtXG4gKi9cbkNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG5cdHZhciBpbmRleCA9IHRoaXMuZ2V0SXRlbUluZGV4KGl0ZW0pO1xuXG5cdHRoaXMucmVtb3ZlSXRlbUF0KGluZGV4KTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGNoYW5nZSBldmVudC5cbiAqIEBtZXRob2QgdHJpZ2dlckNoYW5nZVxuICogQHByaXZhdGVcbiAqL1xuQ29sbGVjdGlvbi5wcm90b3R5cGUudHJpZ2dlckNoYW5nZSA9IGZ1bmN0aW9uKGV2ZW50S2luZCwgaXRlbSwgaW5kZXgpIHtcblx0dGhpcy50cmlnZ2VyKHtcblx0XHR0eXBlOiBldmVudEtpbmQsXG5cdFx0aXRlbTogaXRlbSxcblx0XHRpbmRleDogaW5kZXhcblx0fSk7XG5cblx0dGhpcy50cmlnZ2VyKHtcblx0XHR0eXBlOiBcImNoYW5nZVwiLFxuXHRcdGtpbmQ6IGV2ZW50S2luZCxcblx0XHRpdGVtOiBpdGVtLFxuXHRcdGluZGV4OiBpbmRleFxuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uOyIsInZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwieWFlZFwiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciBDb2xsZWN0aW9uVmlld01hbmFnZXI9cmVxdWlyZShcIi4vQ29sbGVjdGlvblZpZXdNYW5hZ2VyXCIpO1xuXG4vKipcbiAqIENvbGxlY3Rpb25WaWV3LlxuICogQGNsYXNzIENvbGxlY3Rpb25WaWV3XG4gKi9cbmZ1bmN0aW9uIENvbGxlY3Rpb25WaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLm1hbmFnZXI9bmV3IENvbGxlY3Rpb25WaWV3TWFuYWdlcih0aGlzKTtcbn1cblxuaW5oZXJpdHMoQ29sbGVjdGlvblZpZXcsIHhub2RlLkRpdik7XG5cbi8qKlxuICogU2V0IGl0ZW0gcmVuZGVyZXIgY2xhc3MuXG4gKiBAbWV0aG9kIHNldEl0ZW1SZW5kZXJlckNsYXNzXG4gKi9cbkNvbGxlY3Rpb25WaWV3LnByb3RvdHlwZS5zZXRJdGVtUmVuZGVyZXJDbGFzcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMubWFuYWdlci5zZXRJdGVtUmVuZGVyZXJDbGFzcyh2YWx1ZSk7XG59XG5cbi8qKlxuICogU2V0IGl0ZW0gcmVuZGVyZXIgZmFjdG9yeS5cbiAqIEBtZXRob2Qgc2V0SXRlbVJlbmRlcmVyRmFjdG9yeVxuICovXG5Db2xsZWN0aW9uVmlldy5wcm90b3R5cGUuc2V0SXRlbVJlbmRlcmVyRmFjdG9yeSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMubWFuYWdlci5zZXRJdGVtUmVuZGVyZXJGYWN0b3J5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBTZXQgaXRlbSBjb250cm9sbGVyIGNsYXNzLlxuICogQG1ldGhvZCBzZXRJdGVtUmVuZGVyZXJDbGFzc1xuICovXG5Db2xsZWN0aW9uVmlldy5wcm90b3R5cGUuc2V0SXRlbUNvbnRyb2xsZXJDbGFzcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMubWFuYWdlci5zZXRJdGVtQ29udHJvbGxlckNsYXNzKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBTZXQgaXRlbSBjb250cm9sbGVyIGZhY3RvcnkuXG4gKiBAbWV0aG9kIHNldEl0ZW1SZW5kZXJlckZhY3RvcnlcbiAqL1xuQ29sbGVjdGlvblZpZXcucHJvdG90eXBlLnNldEl0ZW1Db250cm9sbGVyRmFjdG9yeSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMubWFuYWdlci5zZXRJdGVtQ29udHJvbGxlckZhY3RvcnkodmFsdWUpO1xufVxuXG4vKipcbiAqIFNldCBkYXRhIHNvdXJjZS5cbiAqIEBtZXRob2Qgc2V0RGF0YVNvdXJjZVxuICovXG5Db2xsZWN0aW9uVmlldy5wcm90b3R5cGUuc2V0RGF0YVNvdXJjZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMubWFuYWdlci5zZXREYXRhU291cmNlKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uVmlldzsiLCJ2YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcInlhZWRcIik7XG52YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG5cbi8qKlxuICogQ29sbGVjdGlvblZpZXdNYW5hZ2VyLlxuICogQGNsYXNzIENvbGxlY3Rpb25WaWV3TWFuYWdlclxuICovXG5mdW5jdGlvbiBDb2xsZWN0aW9uVmlld01hbmFnZXIodGFyZ2V0KSB7XG5cdHRoaXMuaXRlbVJlbmRlcmVycyA9IFtdO1xuXHR0aGlzLml0ZW1SZW5kZXJlckNsYXNzID0gbnVsbDtcblx0dGhpcy5pdGVtUmVuZGVyZXJGYWN0b3J5ID0gbnVsbDtcblx0dGhpcy5pdGVtQ29udHJvbGxlckNsYXNzID0gbnVsbDtcblx0dGhpcy5pdGVtQ29udHJvbGxlckZhY3RvcnkgPSBudWxsO1xuXHR0aGlzLmRhdGFTb3VyY2UgPSBudWxsO1xuXHR0aGlzLnRhcmdldCA9IG51bGw7XG5cblx0dGhpcy5zZXRUYXJnZXQodGFyZ2V0KTtcbn1cblxuLyoqXG4gKiBTZXQgdGFyZ2V0LlxuICogQG1ldGhvZCBzZXRUYXJnZXRcbiAqL1xuQ29sbGVjdGlvblZpZXdNYW5hZ2VyLnByb3RvdHlwZS5zZXRUYXJnZXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR0aGlzLnJlbW92ZUFsbEl0ZW1SZW5kZXJlcnMoKTtcblx0dGhpcy50YXJnZXQ9dmFsdWU7XG5cdHRoaXMucmVtb3ZlQWxsSXRlbVJlbmRlcmVycygpO1xufVxuXG4vKipcbiAqIFNldCBpdGVtIHJlbmRlcmVyIGNsYXNzLlxuICogQG1ldGhvZCBzZXRJdGVtUmVuZGVyZXJDbGFzc1xuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLnNldEl0ZW1SZW5kZXJlckNsYXNzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPSBcImZ1bmN0aW9uXCIpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGl0ZW0gcmVuZGVyZXIgY2xhc3Mgc2hvdWxkIGJlIGEgZnVuY3Rpb25cIik7XG5cblx0dGhpcy5pdGVtUmVuZGVyZXJDbGFzcyA9IHZhbHVlO1xuXHR0aGlzLnJlZnJlc2hBbGxJdGVtUmVuZGVyZXJzKCk7XG59XG5cbi8qKlxuICogU2V0IGl0ZW0gcmVuZGVyZXIgZmFjdG9yeS5cbiAqIEBtZXRob2Qgc2V0SXRlbVJlbmRlcmVyRmFjdG9yeVxuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLnNldEl0ZW1SZW5kZXJlckZhY3RvcnkgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9IFwiZnVuY3Rpb25cIilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaXRlbSByZW5kZXJlciBmYWN0b3J5IHNob3VsZCBiZSBhIGZ1bmN0aW9uXCIpO1xuXG5cdHRoaXMuaXRlbVJlbmRlcmVyRmFjdG9yeSA9IHZhbHVlO1xuXHR0aGlzLnJlZnJlc2hBbGxJdGVtUmVuZGVyZXJzKCk7XG59XG5cbi8qKlxuICogU2V0IGl0ZW0gY29udHJvbGxlciBjbGFzcy5cbiAqIEBtZXRob2Qgc2V0SXRlbVJlbmRlcmVyQ2xhc3NcbiAqL1xuQ29sbGVjdGlvblZpZXdNYW5hZ2VyLnByb3RvdHlwZS5zZXRJdGVtQ29udHJvbGxlckNsYXNzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPSBcImZ1bmN0aW9uXCIpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIGl0ZW0gcmVuZGVyZXIgY2xhc3Mgc2hvdWxkIGJlIGEgZnVuY3Rpb25cIik7XG5cblx0dGhpcy5pdGVtQ29udHJvbGxlckNsYXNzID0gdmFsdWU7XG5cdHRoaXMucmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnMoKTtcbn1cblxuLyoqXG4gKiBTZXQgaXRlbSBjb250cm9sbGVyIGZhY3RvcnkuXG4gKiBAbWV0aG9kIHNldEl0ZW1SZW5kZXJlckZhY3RvcnlcbiAqL1xuQ29sbGVjdGlvblZpZXdNYW5hZ2VyLnByb3RvdHlwZS5zZXRJdGVtQ29udHJvbGxlckZhY3RvcnkgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9IFwiZnVuY3Rpb25cIilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaXRlbSByZW5kZXJlciBmYWN0b3J5IHNob3VsZCBiZSBhIGZ1bmN0aW9uXCIpO1xuXG5cdHRoaXMuaXRlbUNvbnRyb2xsZXJGYWN0b3J5ID0gdmFsdWU7XG5cdHRoaXMucmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnMoKTtcbn1cblxuLyoqXG4gKiBTZXQgZGF0YSBzb3VyY2UuXG4gKiBAbWV0aG9kIHNldERhdGFTb3VyY2VcbiAqL1xuQ29sbGVjdGlvblZpZXdNYW5hZ2VyLnByb3RvdHlwZS5zZXREYXRhU291cmNlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuXHRcdHRoaXMuZGF0YVNvdXJjZS5vZmYoXCJjaGFuZ2VcIiwgdGhpcy5vbkRhdGFTb3VyY2VDaGFuZ2UsIHRoaXMpO1xuXHR9XG5cblx0dGhpcy5kYXRhU291cmNlID0gdmFsdWU7XG5cblx0aWYgKHRoaXMuZGF0YVNvdXJjZSkge1xuXHRcdHRoaXMuZGF0YVNvdXJjZS5vbihcImNoYW5nZVwiLCB0aGlzLm9uRGF0YVNvdXJjZUNoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLnJlZnJlc2hBbGxJdGVtUmVuZGVyZXJzKCk7XG59XG5cbi8qKlxuICogU29tZXRoaW5nIGluIHRoZSBkYXRhIHNvdXJjZSB3YXMgY2hhbmdlZC5cbiAqIEBtZXRob2Qgb25EYXRhU291cmNlQ2hhbmdlXG4gKiBAcHJpdmF0ZVxuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLm9uRGF0YVNvdXJjZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnJlZnJlc2hBbGxJdGVtUmVuZGVyZXJzKCk7XG59XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBpdGVtIHJlbmRlcmVycy5cbiAqIEBtZXRob2QgcmVtb3ZlQWxsSXRlbVJlbmRlcmVyc1xuICogQHByaXZhdGVcbiAqL1xuQ29sbGVjdGlvblZpZXdNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVBbGxJdGVtUmVuZGVyZXJzID0gZnVuY3Rpb24oKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtUmVuZGVyZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKHRoaXMuaXRlbVJlbmRlcmVyc1tpXS5fX2NvbnRyb2xsZXIpXG5cdFx0XHR0aGlzLml0ZW1SZW5kZXJlcnNbaV0uX19jb250cm9sbGVyLnNldERhdGEobnVsbCk7XG5cblx0XHRlbHNlXG5cdFx0XHR0aGlzLml0ZW1SZW5kZXJlcnNbaV0uc2V0RGF0YShudWxsKTtcblxuXHRcdHRoaXMudGFyZ2V0LnJlbW92ZUNoaWxkKHRoaXMuaXRlbVJlbmRlcmVyc1tpXSk7XG5cdH1cblxuXHR0aGlzLml0ZW1SZW5kZXJlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBSZWZyZXNoIGFsbCBpdGVtIHJlbmRlcmVycy5cbiAqIEBtZXRob2QgcmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnNcbiAqIEBwcml2YXRlXG4gKi9cbkNvbGxlY3Rpb25WaWV3TWFuYWdlci5wcm90b3R5cGUucmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnMgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5yZW1vdmVBbGxJdGVtUmVuZGVyZXJzKCk7XG5cblx0aWYgKCF0aGlzLmRhdGFTb3VyY2UpXG5cdFx0cmV0dXJuO1xuXG5cdGlmICghdGhpcy5pdGVtUmVuZGVyZXJDbGFzcyAmJiAhdGhpcy5pdGVtUmVuZGVyZXJGYWN0b3J5KVxuXHRcdHJldHVybjtcblxuXHRpZiAoIXRoaXMudGFyZ2V0KVxuXHRcdHJldHVybjtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YVNvdXJjZS5nZXRMZW5ndGgoKTsgaSsrKSB7XG5cdFx0dmFyIGRhdGEgPSB0aGlzLmRhdGFTb3VyY2UuZ2V0SXRlbUF0KGkpO1xuXHRcdHZhciByZW5kZXJlciA9IHRoaXMuY3JlYXRlSXRlbVJlbmRlcmVyKCk7XG5cblx0XHRpZiAodGhpcy5pdGVtQ29udHJvbGxlckNsYXNzIHx8IHRoaXMuaXRlbUNvbnRyb2xsZXJGYWN0b3J5KSB7XG5cdFx0XHRyZW5kZXJlci5fX2NvbnRyb2xsZXIgPSB0aGlzLmNyZWF0ZUl0ZW1Db250cm9sbGVyKHJlbmRlcmVyKTtcblx0XHRcdHJlbmRlcmVyLl9fY29udHJvbGxlci5zZXREYXRhKGRhdGEpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW5kZXJlci5zZXREYXRhKGRhdGEpO1xuXHRcdH1cblxuXHRcdHRoaXMuaXRlbVJlbmRlcmVycy5wdXNoKHJlbmRlcmVyKTtcblx0XHR0aGlzLnRhcmdldC5hcHBlbmRDaGlsZChyZW5kZXJlcik7XG5cdH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgaXRlbSByZW5kZXJlci5cbiAqIEBtZXRob2QgY3JlYXRlSXRlbVJlbmRlcmVyXG4gKiBAcHJpdmF0ZVxuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLmNyZWF0ZUl0ZW1SZW5kZXJlciA9IGZ1bmN0aW9uKCkge1xuXHRpZiAodGhpcy5pdGVtUmVuZGVyZXJGYWN0b3J5KVxuXHRcdHJldHVybiB0aGlzLml0ZW1SZW5kZXJlckZhY3RvcnkoKTtcblxuXHRpZiAodGhpcy5pdGVtUmVuZGVyZXJDbGFzcylcblx0XHRyZXR1cm4gbmV3IHRoaXMuaXRlbVJlbmRlcmVyQ2xhc3MoKTtcblxuXHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjcmVhdGUgaXRlbSByZW5kZXJlciFcIik7XG59XG5cbi8qKlxuICogQ3JlYXRlIGl0ZW0gY29udHJvbGxlci5cbiAqIEBtZXRob2QgY3JlYXRlSXRlbUNvbnRyb2xsZXJcbiAqIEBwcml2YXRlXG4gKi9cbkNvbGxlY3Rpb25WaWV3TWFuYWdlci5wcm90b3R5cGUuY3JlYXRlSXRlbUNvbnRyb2xsZXIgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRpZiAodGhpcy5pdGVtQ29udHJvbGxlckZhY3RvcnkpXG5cdFx0cmV0dXJuIHRoaXMuaXRlbUNvbnRyb2xsZXJGYWN0b3J5KHJlbmRlcmVyKTtcblxuXHRpZiAodGhpcy5pdGVtQ29udHJvbGxlckNsYXNzKVxuXHRcdHJldHVybiBuZXcgdGhpcy5pdGVtQ29udHJvbGxlckNsYXNzKHJlbmRlcmVyKTtcblxuXHR0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBjcmVhdGUgaXRlbSBjb250cm9sbGVyIVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xsZWN0aW9uVmlld01hbmFnZXI7IiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdENvbGxlY3Rpb246IHJlcXVpcmUoXCIuL0NvbGxlY3Rpb25cIiksXG5cdENvbGxlY3Rpb25WaWV3OiByZXF1aXJlKFwiLi9Db2xsZWN0aW9uVmlld1wiKSxcblx0Q29sbGVjdGlvblZpZXdNYW5hZ2VyOiByZXF1aXJlKFwiLi9Db2xsZWN0aW9uVmlld01hbmFnZXJcIilcbn07IiwiLyoqXG4gKiBBUzMvanF1ZXJ5IHN0eWxlIGV2ZW50IGRpc3BhdGNoZXIuIFNsaWdodGx5IG1vZGlmaWVkLiBUaGVcbiAqIGpxdWVyeSBzdHlsZSBvbi9vZmYvdHJpZ2dlciBzdHlsZSBvZiBhZGRpbmcgbGlzdGVuZXJzIGlzXG4gKiBjdXJyZW50bHkgdGhlIHByZWZlcnJlZCBvbmUuXG4gKlxuICogVGhlIG9uIG1ldGhvZCBmb3IgYWRkaW5nIGxpc3RlbmVycyB0YWtlcyBhbiBleHRyYSBwYXJhbWV0ZXIgd2hpY2ggaXMgdGhlXG4gKiBzY29wZSBpbiB3aGljaCBsaXN0ZW5lcnMgc2hvdWxkIGJlIGNhbGxlZC4gU28gdGhpczpcbiAqXG4gKiAgICAgb2JqZWN0Lm9uKFwiZXZlbnRcIiwgbGlzdGVuZXIsIHRoaXMpO1xuICpcbiAqIEhhcyB0aGUgc2FtZSBmdW5jdGlvbiB3aGVuIGFkZGluZyBldmVudHMgYXM6XG4gKlxuICogICAgIG9iamVjdC5vbihcImV2ZW50XCIsIGxpc3RlbmVyLmJpbmQodGhpcykpO1xuICpcbiAqIEhvd2V2ZXIsIHRoZSBkaWZmZXJlbmNlIGlzIHRoYXQgaWYgd2UgdXNlIHRoZSBzZWNvbmQgbWV0aG9kIGl0XG4gKiB3aWxsIG5vdCBiZSBwb3NzaWJsZSB0byByZW1vdmUgdGhlIGxpc3RlbmVycyBsYXRlciwgdW5sZXNzXG4gKiB0aGUgY2xvc3VyZSBjcmVhdGVkIGJ5IGJpbmQgaXMgc3RvcmVkIHNvbWV3aGVyZS4gSWYgdGhlXG4gKiBmaXJzdCBtZXRob2QgaXMgdXNlZCwgd2UgY2FuIHJlbW92ZSB0aGUgbGlzdGVuZXIgd2l0aDpcbiAqXG4gKiAgICAgb2JqZWN0Lm9mZihcImV2ZW50XCIsIGxpc3RlbmVyLCB0aGlzKTtcbiAqXG4gKiBAY2xhc3MgRXZlbnREaXNwYXRjaGVyXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RGlzcGF0Y2hlcigpIHtcblx0dGhpcy5saXN0ZW5lck1hcCA9IHt9O1xufVxuXG4vKipcbiAqIEFkZCBldmVudCBsaXN0ZW5lci5cbiAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lclxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudFR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXApXG5cdFx0dGhpcy5saXN0ZW5lck1hcCA9IHt9O1xuXG5cdGlmICghZXZlbnRUeXBlKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIkV2ZW50IHR5cGUgcmVxdWlyZWQgZm9yIGV2ZW50IGRpc3BhdGNoZXJcIik7XG5cblx0aWYgKCFsaXN0ZW5lcilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJMaXN0ZW5lciByZXF1aXJlZCBmb3IgZXZlbnQgZGlzcGF0Y2hlclwiKTtcblxuXHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBsaXN0ZW5lciwgc2NvcGUpO1xuXG5cdGlmICghdGhpcy5saXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKVxuXHRcdHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXSA9IFtdO1xuXG5cdHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXS5wdXNoKHtcblx0XHRsaXN0ZW5lcjogbGlzdGVuZXIsXG5cdFx0c2NvcGU6IHNjb3BlXG5cdH0pO1xufVxuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lci5cbiAqIEBtZXRob2QgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudFR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXApXG5cdFx0dGhpcy5saXN0ZW5lck1hcCA9IHt9O1xuXG5cdGlmICghdGhpcy5saXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKVxuXHRcdHJldHVybjtcblxuXHR2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lck1hcFtldmVudFR5cGVdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGxpc3RlbmVyT2JqID0gbGlzdGVuZXJzW2ldO1xuXG5cdFx0aWYgKGxpc3RlbmVyID09IGxpc3RlbmVyT2JqLmxpc3RlbmVyICYmIHNjb3BlID09IGxpc3RlbmVyT2JqLnNjb3BlKSB7XG5cdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0aS0tO1xuXHRcdH1cblx0fVxuXG5cdGlmICghbGlzdGVuZXJzLmxlbmd0aClcblx0XHRkZWxldGUgdGhpcy5saXN0ZW5lck1hcFtldmVudFR5cGVdO1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGV2ZW50LlxuICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKGV2ZW50IC8qIC4uLiAqLyApIHtcblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwKVxuXHRcdHRoaXMubGlzdGVuZXJNYXAgPSB7fTtcblxuXHR2YXIgZXZlbnRUeXBlO1xuXHR2YXIgbGlzdGVuZXJQYXJhbXM7XG5cblx0aWYgKHR5cGVvZiBldmVudCA9PSBcInN0cmluZ1wiKSB7XG5cdFx0ZXZlbnRUeXBlID0gZXZlbnQ7XG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG5cdFx0XHRsaXN0ZW5lclBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cblx0XHRlbHNlIGxpc3RlbmVyUGFyYW1zID0gW3tcblx0XHRcdHR5cGU6IGV2ZW50VHlwZSxcblx0XHRcdHRhcmdldDogdGhpc1xuXHRcdH1dO1xuXHR9IGVsc2Uge1xuXHRcdGV2ZW50VHlwZSA9IGV2ZW50LnR5cGU7XG5cdFx0ZXZlbnQudGFyZ2V0ID0gdGhpcztcblx0XHRsaXN0ZW5lclBhcmFtcyA9IFtldmVudF07XG5cdH1cblxuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSlcblx0XHRyZXR1cm47XG5cblx0Zm9yICh2YXIgaSBpbiB0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV0pIHtcblx0XHR2YXIgbGlzdGVuZXJPYmogPSB0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV1baV07XG5cdFx0bGlzdGVuZXJPYmoubGlzdGVuZXIuYXBwbHkobGlzdGVuZXJPYmouc2NvcGUsIGxpc3RlbmVyUGFyYW1zKTtcblx0fVxufVxuXG4vKipcbiAqIEpxdWVyeSBzdHlsZSBhbGlhcyBmb3IgYWRkRXZlbnRMaXN0ZW5lclxuICogQG1ldGhvZCBvblxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLm9uID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXG4vKipcbiAqIEpxdWVyeSBzdHlsZSBhbGlhcyBmb3IgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICogQG1ldGhvZCBvZmZcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbi8qKlxuICogSnF1ZXJ5IHN0eWxlIGFsaWFzIGZvciBkaXNwYXRjaEV2ZW50XG4gKiBAbWV0aG9kIHRyaWdnZXJcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuXG4vKipcbiAqIE1ha2Ugc29tZXRoaW5nIGFuIGV2ZW50IGRpc3BhdGNoZXIuIENhbiBiZSB1c2VkIGZvciBtdWx0aXBsZSBpbmhlcml0YW5jZS5cbiAqIEBtZXRob2QgaW5pdFxuICogQHN0YXRpY1xuICovXG5FdmVudERpc3BhdGNoZXIuaW5pdCA9IGZ1bmN0aW9uKGNscykge1xuXHRjbHMucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG5cdGNscy5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblx0Y2xzLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuXHRjbHMucHJvdG90eXBlLm9uID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5vbjtcblx0Y2xzLnByb3RvdHlwZS5vZmYgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLm9mZjtcblx0Y2xzLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS50cmlnZ2VyO1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBFdmVudERpc3BhdGNoZXI7XG59IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBSb290VmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9Sb290Vmlld1wiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1ZpZXdcIik7XG52YXIgRWRpdG9yQ29udHJvbGxlclZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvRWRpdG9yQ29udHJvbGxlclZpZXdcIik7XG52YXIgVGFyZ2V0Q29udHJvbGxlclZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvVGFyZ2V0Q29udHJvbGxlclZpZXdcIik7XG52YXIgRWRpdG9yQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9FZGl0b3JDb250cm9sbGVyXCIpO1xudmFyIFRhcmdldENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvVGFyZ2V0Q29udHJvbGxlclwiKTtcbnZhciBGaWRkbGVDbGllbnRNb2RlbCA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvRmlkZGxlQ2xpZW50TW9kZWxcIik7XG52YXIgRmlkZGxlQ2xpZW50VmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9GaWRkbGVDbGllbnRWaWV3XCIpO1xudmFyIEZpZGRsZUNsaWVudENvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvRmlkZGxlQ2xpZW50Q29udHJvbGxlclwiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcblxuZnVuY3Rpb24gRmlkZGxlQ2xpZW50KGRvbUNvbnRhaW5lciwgc2Vzc2lvbiwgYmFzZVBhdGgpIHtcblx0eG5vZGUuRGl2LmNhbGwodGhpcyk7XG5cblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbCA9IG5ldyBGaWRkbGVDbGllbnRNb2RlbCgpO1xuXHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsLnNldFNlc3Npb24oc2Vzc2lvbik7XG5cblx0dGhpcy5maWRkbGVDbGllbnRWaWV3ID0gbmV3IEZpZGRsZUNsaWVudFZpZXcoKTtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmZpZGRsZUNsaWVudFZpZXcpO1xuXG5cdHRoaXMuZmlkZGxlQ2xpZW50Q29udHJvbGxlciA9IG5ldyBGaWRkbGVDbGllbnRDb250cm9sbGVyKFxuXHRcdHRoaXMuZmlkZGxlQ2xpZW50Vmlldyxcblx0XHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsXG5cdCk7XG5cblx0Lyp0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuXG5cdHRoaXMuZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JDb250cm9sbGVyVmlldygpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMuZWRpdG9yVmlldyk7XG5cdHRoaXMuZWRpdG9yID0gbmV3IEVkaXRvckNvbnRyb2xsZXIoYmFzZVBhdGgsIHRoaXMuc2Vzc2lvbiwgdGhpcy5lZGl0b3JWaWV3KTtcblx0dGhpcy5lZGl0b3Iub24oRWRpdG9yQ29udHJvbGxlci5SZWZyZXNoLCB0aGlzLm9uUmVmcmVzaCwgdGhpcyk7XG5cblx0dGhpcy50YXJnZXRWaWV3ID0gbmV3IFRhcmdldENvbnRyb2xsZXJWaWV3KCk7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy50YXJnZXRWaWV3KTtcblx0dGhpcy50YXJnZXRWaWV3LnggPSA1MDA7XG5cdHRoaXMudGFyZ2V0ID0gbmV3IFRhcmdldENvbnRyb2xsZXIodGhpcy50YXJnZXRWaWV3KTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpOyovXG5cblx0ZG9tQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMpO1xufTtcblxuQ2xhc3NVdGlscy5leHRlbmRzKEZpZGRsZUNsaWVudCwgeG5vZGUuRGl2KTtcblxuRmlkZGxlQ2xpZW50LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24ocmVzb3VyY2VzKSB7XG5cdC8vdGhpcy5lZGl0b3IuaW5pdChlZGl0b3JDb250YWluZXIpO1xuXHR0aGlzLnJlc291cmNlcyA9IHJlc291cmNlcztcblxuXHRpZiAocmVzb3VyY2VzLmlzTG9hZGluZygpKSB7XG5cdFx0cmVzb3VyY2VzLm9uKFJlc291cmNlcy5Mb2FkZWQsIHRoaXMuZG9Jbml0LCB0aGlzKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmRvSW5pdCgpO1xuXHR9XG59O1xuXG5GaWRkbGVDbGllbnQucHJvdG90eXBlLmFkZFRlc3RjYXNlID0gZnVuY3Rpb24oaWQsIG5hbWUsIHVybCkge1xuXHQvL3RoaXMudGFyZ2V0LmFkZFRlc3RjYXNlKGlkLCBuYW1lLCB1cmwpO1xuXHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsLmFkZFRlc3RjYXNlKGlkLCBuYW1lLCB1cmwpXG59O1xuXG5GaWRkbGVDbGllbnQucHJvdG90eXBlLmRvSW5pdCA9IGZ1bmN0aW9uKCkge1xuXHQvKnRoaXMudGFyZ2V0LmluaXQoKTtcblx0dGhpcy5lZGl0b3IuaW5pdCh0aGlzLnJlc291cmNlcyk7XG5cblx0dGhpcy51cGRhdGVMYXlvdXQoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpOyovXG5cblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbC5pbml0V2l0aFJlc291cmNlcyh0aGlzLnJlc291cmNlcyk7XG59O1xuXG4vKkZpZGRsZUNsaWVudC5wcm90b3R5cGUub25SZWZyZXNoID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudGFyZ2V0LnJlbG9hZCgpO1xufTtcblxuRmlkZGxlQ2xpZW50LnByb3RvdHlwZS5vblJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnVwZGF0ZUxheW91dChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG59O1xuXG5cbkZpZGRsZUNsaWVudC5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHR0aGlzLmVkaXRvclZpZXcueCA9IDA7XG5cdHRoaXMudGFyZ2V0Vmlldy54ID0gd2lkdGggKiAwLjU7XG5cdHRoaXMuZWRpdG9yVmlldy51cGRhdGVMYXlvdXQod2lkdGggKiAwLjUsIGhlaWdodCk7XG5cdHRoaXMudGFyZ2V0Vmlldy51cGRhdGVMYXlvdXQod2lkdGggKiAwLjUsIGhlaWdodCk7XG59OyovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBGaWRkbGVDbGllbnQ7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuL0VkaXRvclwiKTtcbnZhciBDb2xvckl0ZW0gPSByZXF1aXJlKFwiLi4vdmlld3MvQ29sb3JJdGVtXCIpO1xuXG5mdW5jdGlvbiBDb2xvcnNFZGl0b3IoYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpIHtcblx0RWRpdG9yLmNhbGwodGhpcywgYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhDb2xvcnNFZGl0b3IsIEVkaXRvcik7XG5FdmVudERpc3BhdGNoZXIuaW5pdChDb2xvcnNFZGl0b3IpO1xuXG5Db2xvcnNFZGl0b3IucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcblx0RWRpdG9yLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG5cdHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuXG5cdHZhciBjb2xvcnMgPSB0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpLmNvbG9ycztcblxuXHRmb3IodmFyIGtleSBpbiBjb2xvcnMpIHtcblx0XHR2YXIgaXRlbSA9IG5ldyBDb2xvckl0ZW0oa2V5LCBjb2xvcnNba2V5XSk7XG5cdFx0dGhpcy52aWV3LmFkZEl0ZW0oaXRlbSk7XG5cdFx0aXRlbS5vbihDb2xvckl0ZW0uQ2hhbmdlZCwgdGhpcy5vbkNoYW5nZWQsIHRoaXMpO1xuXHR9XG59O1xuXG5Db2xvcnNFZGl0b3IucHJvdG90eXBlLm9uQ2hhbmdlZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0dGhpcy5yZXNvdXJjZXMuZ2V0UmVzb3VyY2VPYmplY3QoKS5jb2xvcnNbaXRlbS5pZF0gPSBpdGVtLmdldFZhbHVlKCk7XG5cdHRoaXMuc2F2ZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvcnNFZGl0b3I7IiwidmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgQVBJQ29ubmVjdGlvbiA9IHJlcXVpcmUoXCIuLi91dGlscy9BUElDb25uZWN0aW9uXCIpO1xuXG5mdW5jdGlvbiBFZGl0b3IoYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpIHtcblx0dGhpcy52aWV3ID0gdmlldztcblx0dGhpcy5iYXNlUGF0aCA9IGJhc2VQYXRoO1xuXHR0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuXHR0aGlzLml0ZW1zID0gbmV3IEFycmF5KCk7XG5cdHRoaXMuY29udGFpbmVyID0gbnVsbDtcblx0dGhpcy5yZXNvdXJjZXMgPSBudWxsO1xufTtcbkVkaXRvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFZGl0b3I7XG5FdmVudERpc3BhdGNoZXIuaW5pdChFZGl0b3IpO1xuXG5FZGl0b3IuU2F2ZWQgPSBcIlNhdmVkXCI7XG5cbkVkaXRvci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcbn07XG5cblxuRWRpdG9yLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudmlldy5zaG93KCk7XG59O1xuXG5cbkVkaXRvci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnZpZXcuaGlkZSgpO1xufTtcblxuXG5FZGl0b3IucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcblx0dHJ5IHtcblx0XHR2YXIgY29ubmVjdGlvbiA9IG5ldyBBUElDb25uZWN0aW9uKFwiLi9cIiwgdGhpcy5zZXNzaW9uKTtcblx0XHRjb25uZWN0aW9uLm9uKFwibG9hZGVkXCIsIHRoaXMub25TYXZlZCwgdGhpcyk7XG5cdFx0Y29ubmVjdGlvbi5sb2FkKFwic2F2ZVwiLCB7c2Vzc2lvbjogdGhpcy5zZXNzaW9uLCBqc29uOiBKU09OLnN0cmluZ2lmeSh0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpKX0pO1xuXHR9XG5cdGNhdGNoKGVycm9yKSB7XG5cdFx0Y29uc29sZS5sb2coXCJGYWlsZWQgdG8gc2F2ZTogXCIsIGVycm9yKTtcblx0fVxufTtcblxuRWRpdG9yLnByb3RvdHlwZS5vblNhdmVkID0gZnVuY3Rpb24oZGF0YSkge1xuXHR2YXIgY29ubmVjdGlvbiA9IGRhdGEuY29ubmVjdGlvbjtcblx0dmFyIGpzb24gPSBkYXRhLmpzb247XG5cdGNvbm5lY3Rpb24ub2ZmKFwibG9hZGVkXCIsIHRoaXMub25TYXZlZCwgdGhpcyk7XG5cdHRoaXMudHJpZ2dlcihFZGl0b3IuU2F2ZWQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3I7IiwidmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgRWRpdG9yVmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9FZGl0b3JWaWV3XCIpO1xudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9FZGl0b3JcIik7XG52YXIgR3JhcGhpY3NFZGl0b3IgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvR3JhcGhpY3NFZGl0b3JcIik7XG52YXIgUG9zaXRpb25zRWRpdG9yID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL1Bvc2l0aW9uc0VkaXRvclwiKTtcbnZhciBTdHJpbmdzRWRpdG9yID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL1N0cmluZ3NFZGl0b3JcIik7XG52YXIgQ29sb3JzRWRpdG9yID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0NvbG9yc0VkaXRvclwiKTtcbnZhciBNZW51ID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL01lbnVcIik7XG52YXIgTWVudUl0ZW0gPSByZXF1aXJlKFwiLi4vdmlld3MvTWVudUl0ZW1cIik7XG52YXIgTWVudVZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvTWVudVZpZXdcIik7XG5cbmZ1bmN0aW9uIEVkaXRvckNvbnRyb2xsZXIoYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpIHtcblx0dGhpcy52aWV3ID0gdmlldztcblxuXHR0aGlzLnZpZXcuc2hvdygpO1xuXHRcblx0dGhpcy5tZW51VmlldyA9IG5ldyBNZW51VmlldygpO1xuXHR0aGlzLnZpZXcuc2V0TWVudVZpZXcodGhpcy5tZW51Vmlldyk7XG5cblx0dmFyIGl0ZW1zID0gW1xuXHRcdG5ldyBNZW51SXRlbShcImltYWdlXCIsIFwiR3JhcGhpY3NcIiksXG5cdFx0bmV3IE1lbnVJdGVtKFwicG9zaXRpb25cIiwgXCJQb3NpdGlvbnNcIiksXG5cdFx0bmV3IE1lbnVJdGVtKFwiY29sb3JcIiwgXCJDb2xvcnNcIiksXG5cdFx0bmV3IE1lbnVJdGVtKFwic3RyaW5nXCIsIFwiU3RyaW5nc1wiKVxuXHRdO1xuXG5cdHRoaXMubWVudVZpZXcuc2V0SXRlbXMoaXRlbXMpO1xuXG5cdHRoaXMubWVudSA9IG5ldyBNZW51KHRoaXMubWVudVZpZXcsIGl0ZW1zKTtcblx0dGhpcy5tZW51Lm9uKE1lbnUuSXRlbUNsaWNrZWQsIHRoaXMub25DaGFuZ2VWaWV3LCB0aGlzKTtcblxuXHR2YXIgZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JWaWV3KCk7XG5cdHRoaXMudmlldy5hZGRFZGl0b3IoZWRpdG9yVmlldyk7XG5cdGVkaXRvclZpZXcueSA9IHRoaXMubWVudVZpZXcuaGVpZ2h0O1xuXHR0aGlzLmdyYXBoaWNzRWRpdG9yID0gbmV3IEdyYXBoaWNzRWRpdG9yKGJhc2VQYXRoLCBzZXNzaW9uLCBlZGl0b3JWaWV3KTtcblxuXHR2YXIgZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JWaWV3KCk7XG5cdHRoaXMudmlldy5hZGRFZGl0b3IoZWRpdG9yVmlldyk7XG5cdGVkaXRvclZpZXcueSA9IHRoaXMubWVudVZpZXcuaGVpZ2h0O1xuXHR0aGlzLnBvc2l0aW9uc0VkaXRvciA9IG5ldyBQb3NpdGlvbnNFZGl0b3IoXCIuL1wiLCBzZXNzaW9uLCBlZGl0b3JWaWV3KTtcblxuXHR2YXIgZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JWaWV3KCk7XG5cdHRoaXMudmlldy5hZGRFZGl0b3IoZWRpdG9yVmlldyk7XG5cdGVkaXRvclZpZXcueSA9IHRoaXMubWVudVZpZXcuaGVpZ2h0O1xuXHR0aGlzLmNvbG9yc0VkaXRvciA9IG5ldyBDb2xvcnNFZGl0b3IoXCIuL1wiLCBzZXNzaW9uLCBlZGl0b3JWaWV3KTtcblxuXHR2YXIgZWRpdG9yVmlldyA9IG5ldyBFZGl0b3JWaWV3KCk7XG5cdHRoaXMudmlldy5hZGRFZGl0b3IoZWRpdG9yVmlldyk7XG5cdHRoaXMuc3RyaW5nc0VkaXRvciA9IG5ldyBTdHJpbmdzRWRpdG9yKFwiLi9cIiwgc2Vzc2lvbiwgZWRpdG9yVmlldyk7XG5cblx0dGhpcy5jdXJyZW50RWRpdG9yID0gdGhpcy5ncmFwaGljc0VkaXRvcjtcblx0dGhpcy5jdXJyZW50RWRpdG9yLnNob3coKTtcblxuXHQvL3RoaXMuZWRpdG9yLm9uKFwic2F2ZWRcIiwgdGhpcy5vblNhdmVkLCB0aGlzKTtcblx0Ly90aGlzLmVkaXRvci5vbihcImxvYWRlZFwiLCB0aGlzLm9uVGV4dHVyZSwgdGhpcyk7XG5cdHRoaXMuZ3JhcGhpY3NFZGl0b3Iub24oXCJ1cGxvYWRlZFwiLCB0aGlzLm9uVXBsb2FkZWQsIHRoaXMpO1xuXG5cdHRoaXMuZ3JhcGhpY3NFZGl0b3Iub24oRWRpdG9yLlNhdmVkLCB0aGlzLm9uU2F2ZWQsIHRoaXMpO1xuXHR0aGlzLnBvc2l0aW9uc0VkaXRvci5vbihFZGl0b3IuU2F2ZWQsIHRoaXMub25TYXZlZCwgdGhpcyk7XG5cdHRoaXMuY29sb3JzRWRpdG9yLm9uKEVkaXRvci5TYXZlZCwgdGhpcy5vblNhdmVkLCB0aGlzKTtcblx0dGhpcy5zdHJpbmdzRWRpdG9yLm9uKEVkaXRvci5TYXZlZCwgdGhpcy5vblNhdmVkLCB0aGlzKTtcbn07XG5FZGl0b3JDb250cm9sbGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVkaXRvckNvbnRyb2xsZXI7XG5FdmVudERpc3BhdGNoZXIuaW5pdChFZGl0b3JDb250cm9sbGVyKTtcblxuRWRpdG9yQ29udHJvbGxlci5SZWZyZXNoID0gXCJyZWZyZXNoXCI7XG5cbkVkaXRvckNvbnRyb2xsZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcblx0dGhpcy5yZXNvdXJjZXMgPSByZXNvdXJjZXM7XG5cdFxuXHR0aGlzLnBvc2l0aW9uc0VkaXRvci5pbml0KHJlc291cmNlcyk7XG5cdHRoaXMuZ3JhcGhpY3NFZGl0b3IuaW5pdChyZXNvdXJjZXMpO1xuXHQvL3RoaXMuc3RyaW5nc0VkaXRvci5pbml0KHJlc291cmNlcyk7XG5cdHRoaXMuY29sb3JzRWRpdG9yLmluaXQocmVzb3VyY2VzKTtcblxuXHR0aGlzLmdyYXBoaWNzRWRpdG9yLnNhdmUoKTtcbn07XG5cblxuRWRpdG9yQ29udHJvbGxlci5wcm90b3R5cGUub25DaGFuZ2VWaWV3ID0gZnVuY3Rpb24oaXRlbSkge1xuXHR0aGlzLmN1cnJlbnRFZGl0b3IuaGlkZSgpO1xuXHRzd2l0Y2goaXRlbS5pZCkge1xuXHRcdGNhc2UgXCJpbWFnZVwiOiB7XG5cdFx0XHR0aGlzLmN1cnJlbnRFZGl0b3IgPSB0aGlzLmdyYXBoaWNzRWRpdG9yO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJwb3NpdGlvblwiOiB7XG5cdFx0XHR0aGlzLmN1cnJlbnRFZGl0b3IgPSB0aGlzLnBvc2l0aW9uc0VkaXRvcjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiY29sb3JcIjoge1xuXHRcdFx0dGhpcy5jdXJyZW50RWRpdG9yID0gdGhpcy5jb2xvcnNFZGl0b3I7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcInN0cmluZ1wiOiB7XG5cdFx0XHR0aGlzLmN1cnJlbnRFZGl0b3IgPSB0aGlzLnN0cmluZ3NFZGl0b3I7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0dGhpcy5jdXJyZW50RWRpdG9yLnNob3coKTtcblx0dGhpcy5jdXJyZW50RWRpdG9yLnZpZXcudXBkYXRlTGF5b3V0KHRoaXMudmlldy53aWR0aCwgdGhpcy52aWV3LmhlaWdodCk7XG5cblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0dGhpcy52aWV3LnVwZGF0ZUxheW91dChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKi41LCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG5cdH0uYmluZCh0aGlzKSwwKTtcbn07XG5cblxuRWRpdG9yQ29udHJvbGxlci5wcm90b3R5cGUub25VcGxvYWRlZCA9IGZ1bmN0aW9uKHRleHR1cmVKc29uKSB7XG5cdC8vdGhpcy5lZGl0b3Iuc2V0VGV4dHVyZUpzb24odGV4dHVyZUpzb24pO1xuXHR0aGlzLnRyaWdnZXIoRWRpdG9yQ29udHJvbGxlci5SZWZyZXNoKTtcbn07XG5cblxuRWRpdG9yQ29udHJvbGxlci5wcm90b3R5cGUub25TYXZlZCA9IGZ1bmN0aW9uKHRleHR1cmVKc29uKSB7XG5cdC8vdGhpcy5lZGl0b3Iuc2V0VGV4dHVyZUpzb24odGV4dHVyZUpzb24pO1xuXHR0aGlzLnRyaWdnZXIoRWRpdG9yQ29udHJvbGxlci5SZWZyZXNoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yQ29udHJvbGxlcjsiLCJ2YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcbnZhciBUYXJnZXRUYWJIZWFkZXJDb250cm9sbGVyID0gcmVxdWlyZShcIi4vVGFyZ2V0VGFiSGVhZGVyQ29udHJvbGxlclwiKTtcbnZhciBUYXJnZXRUYWJIZWFkZXJWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1RhcmdldFRhYkhlYWRlclZpZXdcIik7XG52YXIgUmVzb3VyY2VUYWJIZWFkZXJDb250cm9sbGVyID0gcmVxdWlyZShcIi4vUmVzb3VyY2VUYWJIZWFkZXJDb250cm9sbGVyXCIpO1xudmFyIFJlc291cmNlVGFiSGVhZGVyVmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9SZXNvdXJjZVRhYkhlYWRlclZpZXdcIik7XG52YXIgUmVzb3VyY2VUYWJWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1Jlc291cmNlVGFiVmlld1wiKTtcbnZhciBSZXNvdXJjZVRhYkNvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvUmVzb3VyY2VUYWJDb250cm9sbGVyXCIpO1xuXG5mdW5jdGlvbiBGaWRkbGVDbGllbnRDb250cm9sbGVyKGZpZGRsZUNsaWVudFZpZXcsIGZpZGRsZUNsaWVudE1vZGVsKSB7XG5cdHRoaXMuZmlkZGxlQ2xpZW50VmlldyA9IGZpZGRsZUNsaWVudFZpZXc7XG5cdHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwgPSBmaWRkbGVDbGllbnRNb2RlbDtcblxuXHR0aGlzLnRhcmdldFRhYnNIZWFkZXJNYW5hZ2VyID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uVmlld01hbmFnZXIoKTtcblx0dGhpcy50YXJnZXRUYWJzSGVhZGVyTWFuYWdlci5zZXRJdGVtUmVuZGVyZXJDbGFzcyhUYXJnZXRUYWJIZWFkZXJWaWV3KTtcblx0dGhpcy50YXJnZXRUYWJzSGVhZGVyTWFuYWdlci5zZXRJdGVtQ29udHJvbGxlckNsYXNzKFRhcmdldFRhYkhlYWRlckNvbnRyb2xsZXIpO1xuXHR0aGlzLnRhcmdldFRhYnNIZWFkZXJNYW5hZ2VyLnNldFRhcmdldCh0aGlzLmZpZGRsZUNsaWVudFZpZXcuZ2V0VGFyZ2V0UGFuZVZpZXcoKS5nZXRUYWJIZWFkZXJIb2xkZXIoKSk7XG5cdHRoaXMudGFyZ2V0VGFic0hlYWRlck1hbmFnZXIuc2V0RGF0YVNvdXJjZSh0aGlzLmZpZGRsZUNsaWVudE1vZGVsLmdldFRlc3RjYXNlQ29sbGVjdGlvbigpKTtcblxuXHR0aGlzLnJlc291cmNlVGFic0hlYWRlck1hbmFnZXIgPSBuZXcgeG5vZGVjLkNvbGxlY3Rpb25WaWV3TWFuYWdlcigpO1xuXHR0aGlzLnJlc291cmNlVGFic0hlYWRlck1hbmFnZXIuc2V0SXRlbVJlbmRlcmVyQ2xhc3MoUmVzb3VyY2VUYWJIZWFkZXJWaWV3KTtcblx0dGhpcy5yZXNvdXJjZVRhYnNIZWFkZXJNYW5hZ2VyLnNldEl0ZW1Db250cm9sbGVyQ2xhc3MoUmVzb3VyY2VUYWJIZWFkZXJDb250cm9sbGVyKTtcblx0dGhpcy5yZXNvdXJjZVRhYnNIZWFkZXJNYW5hZ2VyLnNldFRhcmdldCh0aGlzLmZpZGRsZUNsaWVudFZpZXcuZ2V0UmVzb3VyY2VQYW5lVmlldygpLmdldFRhYkhlYWRlckhvbGRlcigpKTtcblx0dGhpcy5yZXNvdXJjZVRhYnNIZWFkZXJNYW5hZ2VyLnNldERhdGFTb3VyY2UodGhpcy5maWRkbGVDbGllbnRNb2RlbC5nZXRDYXRlZ29yeUNvbGxlY3Rpb24oKSk7XG5cblx0dGhpcy5yZXNvdXJjZVRhYnNNYW5hZ2VyID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uVmlld01hbmFnZXIoKTtcblx0dGhpcy5yZXNvdXJjZVRhYnNNYW5hZ2VyLnNldEl0ZW1SZW5kZXJlckNsYXNzKFJlc291cmNlVGFiVmlldyk7XG5cdHRoaXMucmVzb3VyY2VUYWJzTWFuYWdlci5zZXRJdGVtQ29udHJvbGxlckNsYXNzKFJlc291cmNlVGFiQ29udHJvbGxlcik7XG5cdHRoaXMucmVzb3VyY2VUYWJzTWFuYWdlci5zZXRUYXJnZXQodGhpcy5maWRkbGVDbGllbnRWaWV3LmdldFJlc291cmNlUGFuZVZpZXcoKS5nZXRUYWJIb2xkZXIoKSk7XG5cdHRoaXMucmVzb3VyY2VUYWJzTWFuYWdlci5zZXREYXRhU291cmNlKHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwuZ2V0Q2F0ZWdvcnlDb2xsZWN0aW9uKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZGRsZUNsaWVudENvbnRyb2xsZXI7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIEFQSUNvbm5lY3Rpb24gPSByZXF1aXJlKFwiLi4vdXRpbHMvQVBJQ29ubmVjdGlvblwiKTtcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi9FZGl0b3JcIik7XG52YXIgSW1hZ2VJdGVtID0gcmVxdWlyZShcIi4uL3ZpZXdzL0ltYWdlSXRlbVwiKTtcbnZhciBTZWxlY3RCdXR0b24gPSByZXF1aXJlKFwiLi4vdmlld3MvU2VsZWN0QnV0dG9uXCIpO1xudmFyIFJlc291cmNlcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9saWIvUmVzb3VyY2VzXCIpO1xuXG5cbmZ1bmN0aW9uIEdyYXBoaWNzRWRpdG9yKGJhc2VQYXRoLCBzZXNzaW9uLCB2aWV3KSB7XG5cdEVkaXRvci5jYWxsKHRoaXMsIGJhc2VQYXRoLCBzZXNzaW9uLCB2aWV3KTtcblxuXHR0aGlzLmN1cnJlbnRJdGVtID0gbnVsbDtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoR3JhcGhpY3NFZGl0b3IsIEVkaXRvcik7XG5cbkV2ZW50RGlzcGF0Y2hlci5pbml0KEdyYXBoaWNzRWRpdG9yKTtcblxuR3JhcGhpY3NFZGl0b3IucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcblx0RWRpdG9yLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG5cdHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuXG5cdHZhciBncmFwaGljcyA9IHRoaXMucmVzb3VyY2VzLmdldFJlc291cmNlT2JqZWN0KCkuZ3JhcGhpY3M7XG5cblxuXHRmb3IodmFyIGtleSBpbiBncmFwaGljcykge1xuXHRcdGlmKGtleSAhPSBcInRleHR1cmVzXCIpIHtcblx0XHRcdHZhciBpbWFnZUl0ZW0gPSBuZXcgSW1hZ2VJdGVtKHRoaXMuYmFzZVBhdGgsIGtleSwgdGhpcy5yZXNvdXJjZXMuZ2V0RE9NVGV4dHVyZShrZXkpKTtcblx0XHRcdHRoaXMudmlldy5hZGRJdGVtKGltYWdlSXRlbSk7XG5cdFx0XHRpbWFnZUl0ZW0ub24oSW1hZ2VJdGVtLlNlbGVjdGVkLCB0aGlzLm9uVXBsb2FkLCB0aGlzKTtcblx0XHR9XG5cdH1cbn07XG5cbkdyYXBoaWNzRWRpdG9yLnByb3RvdHlwZS5vblVwbG9hZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XG5cdGlmKGl0ZW0uZ2V0VmFsdWVzKCkubGVuZ3RoID4gMCkge1xuXHRcdHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0ZGF0YS5hcHBlbmQoJ1NlbGVjdGVkRmlsZScsIGl0ZW0uZ2V0VmFsdWVzKClbMF0pO1xuXHRcdGRhdGEuYXBwZW5kKFwiRmlsZW5hbWVcIiwgaXRlbS5uYW1lKTtcblx0XHRkYXRhLmFwcGVuZChcInVybFwiLCBkb2N1bWVudC5sb2NhdGlvbik7XG5cdFx0dGhpcy5jdXJyZW50SXRlbSA9IGl0ZW07XG5cdFx0dmFyIGNvbm5lY3Rpb24gPSBuZXcgQVBJQ29ubmVjdGlvbihcIi4vXCIsIHRoaXMuc2Vzc2lvbik7XG5cdFx0Y29ubmVjdGlvbi5vbihcImxvYWRlZFwiLCB0aGlzLm9uVXBsb2FkZWQsIHRoaXMpO1xuXHRcdGNvbm5lY3Rpb24udXBsb2FkKFwidXBsb2FkXCIsIGRhdGEpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihcIk5vIGZpbGVzIHNlbGVjdGVkOiBldmVudDpcIiwgaXRlbSk7XG5cdH1cbn07XG5cbkdyYXBoaWNzRWRpdG9yLnByb3RvdHlwZS5vblVwbG9hZGVkID0gZnVuY3Rpb24oZGF0YSkge1xuXHR2YXIgY29ubmVjdGlvbiA9IGRhdGEuY29ubmVjdGlvbjtcblx0dmFyIGpzb24gPSBkYXRhLmpzb247XG5cdFxuXHR0aGlzLnJlc291cmNlcy5hZGRTb3VyY2Uoe2dyYXBoaWNzOiBqc29ufSwgdHJ1ZSk7XG5cdHRoaXMuc2F2ZSgpO1xuXHR0aGlzLmN1cnJlbnRJdGVtLnNldFRleHR1cmUodGhpcy5yZXNvdXJjZXMuZ2V0RE9NVGV4dHVyZSh0aGlzLmN1cnJlbnRJdGVtLm5hbWUpKTtcblx0Ly90aGlzLmxvYWRJbWFnZXMoKTtcblx0dGhpcy50cmlnZ2VyKFwidXBsb2FkZWRcIiwganNvbik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYXBoaWNzRWRpdG9yOyIsInZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIE1lbnVJdGVtID0gcmVxdWlyZShcIi4uL3ZpZXdzL01lbnVJdGVtXCIpO1xuXG5mdW5jdGlvbiBNZW51KHZpZXcsIG1lbnVJdGVtcykge1xuXHR0aGlzLm1lbnVJdGVtcyA9IG1lbnVJdGVtcztcblx0dGhpcy52aWV3ID0gdmlldztcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5tZW51SXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHR0aGlzLm1lbnVJdGVtc1tpXS5vbihNZW51SXRlbS5DbGljaywgdGhpcy5vbk1lbnVJdGVtQ2xpY2ssIHRoaXMpO1xuXHR9XG5cdGlmKHRoaXMubWVudUl0ZW1zLmxlbmd0aCA+IDApIHtcblx0XHR0aGlzLmN1cnJlbnRNZW51SXRlbSA9IHRoaXMubWVudUl0ZW1zWzBdO1xuXHRcdHRoaXMuY3VycmVudE1lbnVJdGVtLnNldFNlbGVjdGVkKHRydWUpO1xuXHR9XG59O1xuTWVudS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51O1xuRXZlbnREaXNwYXRjaGVyLmluaXQoTWVudSk7XG5cbk1lbnUuSXRlbUNsaWNrZWQgPSBcIkl0ZW1DbGlja2VkXCI7XG5cbk1lbnUucHJvdG90eXBlLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG5cdGlmKHRoaXMubWVudUl0ZW1zLmxlbmd0aCA8PSAwKSB7XG5cdFx0dGhpcy5jdXJyZW50TWVudUl0ZW0gPSBpdGVtO1xuXHRcdHRoaXMuY3VycmVudE1lbnVJdGVtLnNldFNlbGVjdGVkKHRydWUpO1xuXHRcdHRoaXMudHJpZ2dlcihNZW51Lkl0ZW1DbGlja2VkLCBpdGVtKTtcblx0fVxuXHR0aGlzLnZpZXcuYWRkSXRlbShpdGVtKTtcblx0aXRlbS5vbihNZW51SXRlbS5DbGljaywgdGhpcy5vbk1lbnVJdGVtQ2xpY2ssIHRoaXMpO1xuXG59O1xuXG5NZW51LnByb3RvdHlwZS5vbk1lbnVJdGVtQ2xpY2sgPSBmdW5jdGlvbihtZW51SXRlbSkge1xuXG5cdHRoaXMuY3VycmVudE1lbnVJdGVtLnNldFNlbGVjdGVkKGZhbHNlKTtcblx0dGhpcy5jdXJyZW50TWVudUl0ZW0gPSBtZW51SXRlbTtcblx0dGhpcy5jdXJyZW50TWVudUl0ZW0uc2V0U2VsZWN0ZWQodHJ1ZSk7XG5cblx0dGhpcy50cmlnZ2VyKE1lbnUuSXRlbUNsaWNrZWQsIG1lbnVJdGVtKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xuIiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuL0VkaXRvclwiKTtcbnZhciBQb3NpdGlvbkl0ZW0gPSByZXF1aXJlKFwiLi4vdmlld3MvUG9zaXRpb25JdGVtXCIpO1xuXG5mdW5jdGlvbiBQb3NpdGlvbnNFZGl0b3IoYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpIHtcblx0RWRpdG9yLmNhbGwodGhpcywgYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhQb3NpdGlvbnNFZGl0b3IsIEVkaXRvcik7XG5FdmVudERpc3BhdGNoZXIuaW5pdChQb3NpdGlvbnNFZGl0b3IpO1xuXG5Qb3NpdGlvbnNFZGl0b3IucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcblx0RWRpdG9yLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG5cdHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuXG5cdHZhciBwb3NpdGlvbnMgPSB0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpLnBvc2l0aW9ucztcblxuXHQvL2NvbnNvbGUubG9nKFwicG9zaXRpb25zOiBcIiwgcG9zaXRpb25zKTtcblxuXHRmb3IodmFyIGtleSBpbiBwb3NpdGlvbnMpIHtcblx0XHQvL2NvbnNvbGUubG9nKFwiY3JlYXRlIFBvc2l0aW9uSXRlbTogXCIsIGtleSwgcG9zaXRpb25zW2tleV0pO1xuXHRcdHZhciBpdGVtID0gbmV3IFBvc2l0aW9uSXRlbShrZXksIHBvc2l0aW9uc1trZXldKTtcblx0XHR0aGlzLnZpZXcuYWRkSXRlbShpdGVtKTtcblx0XHRpdGVtLm9uKFBvc2l0aW9uSXRlbS5DaGFuZ2VkLCB0aGlzLm9uQ2hhbmdlZCwgdGhpcyk7XG5cdH1cbn07XG5cblBvc2l0aW9uc0VkaXRvci5wcm90b3R5cGUub25DaGFuZ2VkID0gZnVuY3Rpb24oaXRlbSkge1xuXHR0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpLnBvc2l0aW9uc1tpdGVtLmlkXVswXSA9IGl0ZW0uZ2V0VmFsdWVzKClbMF1cblx0dGhpcy5yZXNvdXJjZXMuZ2V0UmVzb3VyY2VPYmplY3QoKS5wb3NpdGlvbnNbaXRlbS5pZF1bMV0gPSBpdGVtLmdldFZhbHVlcygpWzFdO1xuXHR0aGlzLnNhdmUoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zaXRpb25zRWRpdG9yOyIsInZhciBSZXNvdXJjZUl0ZW1Db250cm9sbGVyID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJdGVtQ29udHJvbGxlclwiKTtcbnZhciBSZXNvdXJjZUl0ZW1WaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1Jlc291cmNlSXRlbVZpZXdcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcblxuLyoqXG4gKiBDb250cm9sIGEgcmVzb3VyY2UgY2F0ZWdvcnkuXG4gKiBAbWV0aG9kIFJlc291cmNlVGFiQ29udHJvbGxlclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZUNhdGVnb3J5Q29udHJvbGxlcihjYXRlZ29yeVZpZXcpIHtcblx0dGhpcy5jYXRlZ29yeVZpZXcgPSBjYXRlZ29yeVZpZXc7XG5cblx0dGhpcy5jYXRlZ29yeVZpZXcub24oXCJ0aXRsZUNsaWNrXCIsIHRoaXMub25DYXRlZ29yeVZpZXdUaXRsZUNsaWNrLCB0aGlzKTtcblxuXHR0aGlzLml0ZW1NYW5hZ2VyID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uVmlld01hbmFnZXIoKTtcblx0dGhpcy5pdGVtTWFuYWdlci5zZXRUYXJnZXQodGhpcy5jYXRlZ29yeVZpZXcuZ2V0SXRlbUhvbGRlcigpKTtcblx0dGhpcy5pdGVtTWFuYWdlci5zZXRJdGVtUmVuZGVyZXJDbGFzcyhSZXNvdXJjZUl0ZW1WaWV3KTtcblx0dGhpcy5pdGVtTWFuYWdlci5zZXRJdGVtQ29udHJvbGxlckNsYXNzKFJlc291cmNlSXRlbUNvbnRyb2xsZXIpO1xufVxuXG4vKipcbiAqIFNldCBkYXRhLlxuICogQG1ldGhvZCBzZXREYXRhXG4gKi9cblJlc291cmNlQ2F0ZWdvcnlDb250cm9sbGVyLnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24oY2F0ZWdvcnlNb2RlbCkge1xuXHRpZiAodGhpcy5jYXRlZ29yeU1vZGVsKSB7XG5cdFx0dGhpcy5pdGVtTWFuYWdlci5zZXREYXRhU291cmNlKG51bGwpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeU1vZGVsLm9mZihcImNoYW5nZVwiLCB0aGlzLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLmNhdGVnb3J5TW9kZWwgPSBjYXRlZ29yeU1vZGVsO1xuXG5cdGlmICh0aGlzLmNhdGVnb3J5TW9kZWwpIHtcblx0XHR0aGlzLml0ZW1NYW5hZ2VyLnNldERhdGFTb3VyY2UodGhpcy5jYXRlZ29yeU1vZGVsLmdldEl0ZW1Db2xsZWN0aW9uKCkpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeU1vZGVsLm9uKFwiY2hhbmdlXCIsIHRoaXMub25DYXRlZ29yeU1vZGVsQ2hhbmdlLCB0aGlzKTtcblx0XHR0aGlzLmNhdGVnb3J5Vmlldy5zZXRBY3RpdmUoY2F0ZWdvcnlNb2RlbC5pc0FjdGl2ZSgpKTtcblx0XHR0aGlzLmNhdGVnb3J5Vmlldy5zZXRMYWJlbChjYXRlZ29yeU1vZGVsLmdldExhYmVsKCkpO1xuXHRcdHRoaXMuY2F0ZWdvcnlWaWV3LnNldERlc2NyaXB0aW9uKHRoaXMuY2F0ZWdvcnlNb2RlbC5nZXREZXNjcmlwdGlvbigpKTtcblx0fVxufVxuXG4vKipcbiAqIEhhbmRsZSBjaGFuZ2UgaW4gdGhlIG1vZGVsLlxuICogQG1ldGhvZCBvbkNhdGVnb3J5TW9kZWxDaGFuZ2VcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNhdGVnb3J5Vmlldy5zZXRBY3RpdmUodGhpcy5jYXRlZ29yeU1vZGVsLmlzQWN0aXZlKCkpO1xuXHR0aGlzLmNhdGVnb3J5Vmlldy5zZXREZXNjcmlwdGlvbih0aGlzLmNhdGVnb3J5TW9kZWwuZ2V0RGVzY3JpcHRpb24oKSk7XG59XG5cbi8qKlxuICogVGl0bGUgY2xpY2suIFRvZ2dsZSB0aGUgYWN0aXZlIHN0YXRlLlxuICogQG1ldGhvZCBvbkNhdGVnb3J5Vmlld1RpdGxlQ2xpY2tcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2F0ZWdvcnlWaWV3VGl0bGVDbGljayA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNhdGVnb3J5TW9kZWwuc2V0QWN0aXZlKCF0aGlzLmNhdGVnb3J5TW9kZWwuaXNBY3RpdmUoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXI7IiwiLyoqXG4gKiBDb250cm9sIGEgcmVzb3VyY2UgaXRlbS5cbiAqIEBjbGFzcyBSZXNvdXJjZUl0ZW1Db250cm9sbGVyXG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlSXRlbUNvbnRyb2xsZXIoaXRlbVZpZXcpIHtcblx0dGhpcy5pdGVtVmlldyA9IGl0ZW1WaWV3O1xufVxuXG4vKipcbiAqIFNldCBpdGVtIG1vZGVsIHRvIHNlcnZlIGFzIGRhdGEuXG4gKiBAbWV0aG9kIHNldERhdGFcbiAqL1xuUmVzb3VyY2VJdGVtQ29udHJvbGxlci5wcm90b3R5cGUuc2V0RGF0YSA9IGZ1bmN0aW9uKGl0ZW1Nb2RlbCkge1xuXHR0aGlzLml0ZW1Nb2RlbCA9IGl0ZW1Nb2RlbDtcblxuXHRpZiAodGhpcy5pdGVtTW9kZWwpIHtcblx0XHR0aGlzLml0ZW1WaWV3LnNldEtleSh0aGlzLml0ZW1Nb2RlbC5nZXRLZXkoKSk7XG5cdFx0dGhpcy5pdGVtVmlldy5zZXREZWZhdWx0VmFsdWUodGhpcy5pdGVtTW9kZWwuZ2V0RGVmYXVsdFZhbHVlKCkpO1xuXHRcdHRoaXMuaXRlbVZpZXcuc2V0VmFsdWUodGhpcy5pdGVtTW9kZWwuZ2V0VmFsdWUoKSk7XG5cblx0XHR0aGlzLml0ZW1WaWV3LnNldEl0ZW1UeXBlKHRoaXMuaXRlbU1vZGVsLmdldEl0ZW1UeXBlKCkpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VJdGVtQ29udHJvbGxlcjsiLCJ2YXIgUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi9SZXNvdXJjZUNhdGVnb3J5Q29udHJvbGxlclwiKTtcbnZhciBSZXNvdXJjZUNhdGVnb3J5VmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9SZXNvdXJjZUNhdGVnb3J5Vmlld1wiKTtcbnZhciBSZXNvdXJjZUl0ZW1Db250cm9sbGVyID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJdGVtQ29udHJvbGxlclwiKTtcbnZhciBSZXNvdXJjZUl0ZW1WaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1Jlc291cmNlSXRlbVZpZXdcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcblxuLyoqXG4gKiBDb250cm9sIG9uZSByZXNvdXJjZSB0YWIuXG4gKiBAbWV0aG9kIFJlc291cmNlVGFiQ29udHJvbGxlclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZVRhYkNvbnRyb2xsZXIodGFiVmlldykge1xuXHR0aGlzLnRhYlZpZXcgPSB0YWJWaWV3O1xuXG5cdHRoaXMuY2F0ZWdvcnlNYW5hZ2VyID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uVmlld01hbmFnZXIoKTtcblx0dGhpcy5jYXRlZ29yeU1hbmFnZXIuc2V0VGFyZ2V0KHRoaXMudGFiVmlldy5nZXRDYXRlZ29yeUhvbGRlcigpKTtcblx0dGhpcy5jYXRlZ29yeU1hbmFnZXIuc2V0SXRlbVJlbmRlcmVyQ2xhc3MoUmVzb3VyY2VDYXRlZ29yeVZpZXcpO1xuXHR0aGlzLmNhdGVnb3J5TWFuYWdlci5zZXRJdGVtQ29udHJvbGxlckNsYXNzKFJlc291cmNlQ2F0ZWdvcnlDb250cm9sbGVyKTtcblxuXHR0aGlzLml0ZW1NYW5hZ2VyID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uVmlld01hbmFnZXIoKTtcblx0dGhpcy5pdGVtTWFuYWdlci5zZXRUYXJnZXQodGhpcy50YWJWaWV3LmdldEl0ZW1Ib2xkZXIoKSk7XG5cdHRoaXMuaXRlbU1hbmFnZXIuc2V0SXRlbVJlbmRlcmVyQ2xhc3MoUmVzb3VyY2VJdGVtVmlldyk7XG5cdHRoaXMuaXRlbU1hbmFnZXIuc2V0SXRlbUNvbnRyb2xsZXJDbGFzcyhSZXNvdXJjZUl0ZW1Db250cm9sbGVyKTtcbn1cblxuLyoqXG4gKiBTZXQgZGF0YS5cbiAqIEBtZXRob2Qgc2V0RGF0YVxuICovXG5SZXNvdXJjZVRhYkNvbnRyb2xsZXIucHJvdG90eXBlLnNldERhdGEgPSBmdW5jdGlvbihjYXRlZ29yeU1vZGVsKSB7XG5cdGlmICh0aGlzLmNhdGVnb3J5TW9kZWwpIHtcblx0XHR0aGlzLmNhdGVnb3J5TW9kZWwub2ZmKFwiY2hhbmdlXCIsIHRoaXMub25DYXRlZ29yeU1vZGVsQ2hhbmdlLCB0aGlzKTtcblx0XHR0aGlzLmNhdGVnb3J5TWFuYWdlci5zZXREYXRhU291cmNlKG51bGwpO1xuXHRcdHRoaXMuaXRlbU1hbmFnZXIuc2V0RGF0YVNvdXJjZShudWxsKTtcblx0fVxuXG5cdHRoaXMuY2F0ZWdvcnlNb2RlbCA9IGNhdGVnb3J5TW9kZWw7XG5cblx0aWYgKHRoaXMuY2F0ZWdvcnlNb2RlbCkge1xuXHRcdHRoaXMuY2F0ZWdvcnlNb2RlbC5vbihcImNoYW5nZVwiLCB0aGlzLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSwgdGhpcyk7XG5cdFx0dGhpcy50YWJWaWV3LnNldEFjdGl2ZShjYXRlZ29yeU1vZGVsLmlzQWN0aXZlKCkpO1xuXHRcdHRoaXMudGFiVmlldy5zZXREZXNjcmlwdGlvbihjYXRlZ29yeU1vZGVsLmdldERlc2NyaXB0aW9uKCkpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeU1hbmFnZXIuc2V0RGF0YVNvdXJjZShjYXRlZ29yeU1vZGVsLmdldENhdGVnb3J5Q29sbGVjdGlvbigpKTtcblx0XHR0aGlzLml0ZW1NYW5hZ2VyLnNldERhdGFTb3VyY2UoY2F0ZWdvcnlNb2RlbC5nZXRJdGVtQ29sbGVjdGlvbigpKTtcblx0fVxufVxuXG4vKipcbiAqIEhhbmRsZSBjaGFuZ2UgaW4gdGhlIG1vZGVsLlxuICogQG1ldGhvZCBvbkNhdGVnb3J5TW9kZWxDaGFuZ2VcbiAqL1xuUmVzb3VyY2VUYWJDb250cm9sbGVyLnByb3RvdHlwZS5vbkNhdGVnb3J5TW9kZWxDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50YWJWaWV3LnNldEFjdGl2ZSh0aGlzLmNhdGVnb3J5TW9kZWwuaXNBY3RpdmUoKSk7XG5cdHRoaXMudGFiVmlldy5zZXREZXNjcmlwdGlvbih0aGlzLmNhdGVnb3J5TW9kZWwuZ2V0RGVzY3JpcHRpb24oKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VUYWJDb250cm9sbGVyOyIsIi8qKlxuICogQ29udHJvbCB0aGUgaGVhZGVyIGZpZWxkIG9mIHRoZSB0YWJscyBpbiB0aGUgcmVzb3VyY2UgcGFuZS5cbiAqIEBtZXRob2QgUmVzb3VyY2VUYWJDb250cm9sbGVyXG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlVGFiSGVhZGVyQ29udHJvbGxlcih0YWJIZWFkZXJWaWV3KSB7XG5cdHRoaXMudGFiSGVhZGVyVmlldyA9IHRhYkhlYWRlclZpZXc7XG5cdHRoaXMudGFiSGVhZGVyVmlldy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vblRhYkhlYWRlclZpZXdDbGljay5iaW5kKHRoaXMpKTtcbn1cblxuLyoqXG4gKiBTZXQgZGF0YS5cbiAqIEBtZXRob2Qgc2V0RGF0YVxuICovXG5SZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXIucHJvdG90eXBlLnNldERhdGEgPSBmdW5jdGlvbihjYXRlZ29yeU1vZGVsKSB7XG5cdGlmICh0aGlzLmNhdGVnb3J5TW9kZWwpIHtcblx0XHR0aGlzLmNhdGVnb3J5TW9kZWwub2ZmKFwiY2hhbmdlXCIsIHRoaXMub25DYXRlZ29yeU1vZGVsQ2hhbmdlLCB0aGlzKTtcblx0fVxuXG5cdHRoaXMuY2F0ZWdvcnlNb2RlbCA9IGNhdGVnb3J5TW9kZWw7XG5cblx0aWYgKHRoaXMuY2F0ZWdvcnlNb2RlbCkge1xuXHRcdHRoaXMuY2F0ZWdvcnlNb2RlbC5vbihcImNoYW5nZVwiLCB0aGlzLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSwgdGhpcyk7XG5cdFx0dGhpcy50YWJIZWFkZXJWaWV3LnNldExhYmVsKGNhdGVnb3J5TW9kZWwuZ2V0TGFiZWwoKSk7XG5cdFx0dGhpcy50YWJIZWFkZXJWaWV3LnNldEFjdGl2ZShjYXRlZ29yeU1vZGVsLmlzQWN0aXZlKCkpO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIHRhYiB3YXMgY2xpY2tlZCwgc2V0IHRoaXMgdGFiIGFzIHRoZSBhY3RpdmUgb25lLlxuICogQG1ldGhvZCBvblRhYkhlYWRlclZpZXdDbGlja1xuICovXG5SZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVGFiSGVhZGVyVmlld0NsaWNrID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuY2F0ZWdvcnlNb2RlbC5zZXRBY3RpdmUodHJ1ZSk7XG59XG5cbi8qKlxuICogVGhlIG1vZGVsIGNoYW5nZWQuXG4gKiBAbWV0aG9kIG9uQ2F0ZWdvcnlNb2RlbENoYW5nZVxuICovXG5SZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRhYkhlYWRlclZpZXcuc2V0QWN0aXZlKHRoaXMuY2F0ZWdvcnlNb2RlbC5pc0FjdGl2ZSgpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXI7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi9FZGl0b3JcIik7XG52YXIgU3RyaW5nSXRlbSA9IHJlcXVpcmUoXCIuLi92aWV3cy9TdHJpbmdJdGVtXCIpO1xuXG5mdW5jdGlvbiBTdHJpbmdzRWRpdG9yKGJhc2VQYXRoLCBzZXNzaW9uLCB2aWV3KSB7XG5cdEVkaXRvci5jYWxsKHRoaXMsIGJhc2VQYXRoLCBzZXNzaW9uLCB2aWV3KTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoU3RyaW5nc0VkaXRvciwgRWRpdG9yKTtcblxuU3RyaW5nc0VkaXRvci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKHJlc291cmNlcykge1xuXHRFZGl0b3IucHJvdG90eXBlLmluaXQuY2FsbCh0aGlzKTtcblx0dGhpcy5yZXNvdXJjZXMgPSByZXNvdXJjZXM7XG5cblx0dmFyIHN0cmluZ3MgPSB0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpLnN0cmluZ3M7XG5cblx0Zm9yKHZhciBrZXkgaW4gc3RyaW5ncykge1xuXHRcdHZhciBpdGVtID0gbmV3IFN0cmluZ0l0ZW0oa2V5LCBzdHJpbmdzW2tleV0pO1xuXHRcdHRoaXMudmlldy5hZGRJdGVtKGl0ZW0pO1xuXHRcdGl0ZW0ub24oU3RyaW5nSXRlbS5DaGFuZ2VkLCB0aGlzLm9uQ2hhbmdlZCwgdGhpcyk7XG5cdH1cbn07XG5cblN0cmluZ3NFZGl0b3IucHJvdG90eXBlLm9uQ2hhbmdlZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0dGhpcy5yZXNvdXJjZXMuc3RyaW5nc1tpdGVtLmlkXSA9IGl0ZW0uZ2V0VmFsdWUoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nc0VkaXRvcjsiLCJ2YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbnZhciBNZW51ID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL01lbnVcIik7XG52YXIgTWVudUl0ZW0gPSByZXF1aXJlKFwiLi4vdmlld3MvTWVudUl0ZW1cIik7XG52YXIgTWVudVZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvTWVudVZpZXdcIik7XG52YXIgSUZyYW1lVmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9JRnJhbWVWaWV3XCIpO1xudmFyIFRlc3RjYXNlID0gcmVxdWlyZShcIi4uL21vZGVscy9UZXN0Y2FzZVwiKTtcblxuZnVuY3Rpb24gVGFyZ2V0Q29udHJvbGxlcih2aWV3KSB7XG5cdHRoaXMudmlldyA9IHZpZXc7XG5cblx0dGhpcy5tZW51VmlldyA9IG5ldyBNZW51VmlldygpO1xuXHR0aGlzLnZpZXcuc2V0TWVudVZpZXcodGhpcy5tZW51Vmlldyk7XG5cblx0dmFyIGl0ZW1zID0gW107XG5cdHRoaXMudGVzdGNhc2VzID0gbmV3IEFycmF5KCk7XG5cblx0dGhpcy5tZW51Vmlldy5zZXRJdGVtcyhpdGVtcyk7XG5cblx0dGhpcy5tZW51ID0gbmV3IE1lbnUodGhpcy5tZW51VmlldywgaXRlbXMpO1xuXHR0aGlzLm1lbnUub24oTWVudS5JdGVtQ2xpY2tlZCwgdGhpcy5vbkNoYW5nZVZpZXcsIHRoaXMpO1xuXG5cdHRoaXMuaWZyYW1lVmlldyA9IG5ldyBJRnJhbWVWaWV3KCk7XG5cdHRoaXMudmlldy5zZXRUYXJnZXRWaWV3KHRoaXMuaWZyYW1lVmlldyk7XG5cdHRoaXMuaWZyYW1lVmlldy55ID0gdGhpcy5tZW51Vmlldy5oZWlnaHQ7XG5cdHRoaXMuaWZyYW1lVmlldy53aWR0aCA9IDUwMDtcblx0dGhpcy5pZnJhbWVWaWV3LmhlaWdodCA9IDUwMDtcbn07XG5UYXJnZXRDb250cm9sbGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRhcmdldENvbnRyb2xsZXI7XG5FdmVudERpc3BhdGNoZXIuaW5pdChUYXJnZXRDb250cm9sbGVyKTtcblxuXG5UYXJnZXRDb250cm9sbGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdFxuXHR0aGlzLmlmcmFtZVZpZXcuaW5pdCgpO1xufTtcblxuXG5UYXJnZXRDb250cm9sbGVyLnByb3RvdHlwZS5hZGRUZXN0Y2FzZSA9IGZ1bmN0aW9uKGlkLCBuYW1lLCB1cmwpIHtcblx0dGhpcy50ZXN0Y2FzZXMucHVzaChuZXcgVGVzdGNhc2UoaWQsIG5hbWUsIHVybCkpO1xuXHR0aGlzLm1lbnUuYWRkSXRlbShuZXcgTWVudUl0ZW0oaWQsIG5hbWUpKTtcbn07XG5cblxuVGFyZ2V0Q29udHJvbGxlci5wcm90b3R5cGUucmVsb2FkID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuaWZyYW1lVmlldy5yZWxvYWQoKTtcbn07XG5cblxuVGFyZ2V0Q29udHJvbGxlci5wcm90b3R5cGUub25DaGFuZ2VWaWV3ID0gZnVuY3Rpb24oaXRlbSkge1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy50ZXN0Y2FzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRpZih0aGlzLnRlc3RjYXNlc1tpXS5pZCA9PSBpdGVtLmlkKSB7XG5cdFx0XHR0aGlzLnRhcmdldFVSTCA9IHRoaXMudGVzdGNhc2VzW2ldLnVybDtcblx0XHRcdHRoaXMuaWZyYW1lVmlldy5zZXRVcmwodGhpcy50YXJnZXRVUkwpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXRDb250cm9sbGVyOyIsIi8qKlxuICogQ29udHJvbCB0aGUgaGVhZGVyIGZpZWxkIG9mIHRoZSB0YWJscyBpbiB0aGUgcmVzb3VyY2UgcGFuZS5cbiAqIEBtZXRob2QgUmVzb3VyY2VUYWJDb250cm9sbGVyXG4gKi9cbmZ1bmN0aW9uIFRhcmdldFRhYkhlYWRlckNvbnRyb2xsZXIodGFiSGVhZGVyVmlldykge1xuXHR0aGlzLnRhYkhlYWRlclZpZXcgPSB0YWJIZWFkZXJWaWV3O1xuXHR0aGlzLnRhYkhlYWRlclZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25UYWJIZWFkZXJWaWV3Q2xpY2suYmluZCh0aGlzKSk7XG59XG5cbi8qKlxuICogU2V0IGRhdGEuXG4gKiBAbWV0aG9kIHNldERhdGFcbiAqL1xuVGFyZ2V0VGFiSGVhZGVyQ29udHJvbGxlci5wcm90b3R5cGUuc2V0RGF0YSA9IGZ1bmN0aW9uKHRlc3RjYXNlKSB7XG5cdGlmICh0aGlzLnRlc3RjYXNlKSB7XG5cdFx0dGhpcy50ZXN0Y2FzZS5vZmYoXCJjaGFuZ2VcIiwgdGhpcy5vblRlc3RjYXNlQ2hhbmdlLCB0aGlzKTtcblx0fVxuXG5cdHRoaXMudGVzdGNhc2UgPSB0ZXN0Y2FzZTtcblxuXHRpZiAodGhpcy50ZXN0Y2FzZSkge1xuXHRcdHRoaXMudGVzdGNhc2Uub24oXCJjaGFuZ2VcIiwgdGhpcy5vblRlc3RjYXNlQ2hhbmdlLCB0aGlzKTtcblx0XHR0aGlzLnRhYkhlYWRlclZpZXcuc2V0TGFiZWwodGVzdGNhc2UuZ2V0TGFiZWwoKSk7XG5cdFx0dGhpcy50YWJIZWFkZXJWaWV3LnNldEFjdGl2ZSh0ZXN0Y2FzZS5pc0FjdGl2ZSgpKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSB0YWIgd2FzIGNsaWNrZWQsIHNldCB0aGlzIHRhYiBhcyB0aGUgYWN0aXZlIG9uZS5cbiAqIEBtZXRob2Qgb25UYWJIZWFkZXJWaWV3Q2xpY2tcbiAqL1xuVGFyZ2V0VGFiSGVhZGVyQ29udHJvbGxlci5wcm90b3R5cGUub25UYWJIZWFkZXJWaWV3Q2xpY2sgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50ZXN0Y2FzZS5zZXRBY3RpdmUodHJ1ZSk7XG59XG5cbi8qKlxuICogVGhlIG1vZGVsIGNoYW5nZWQuXG4gKiBAbWV0aG9kIG9uVGVzdGNhc2VDaGFuZ2VcbiAqL1xuVGFyZ2V0VGFiSGVhZGVyQ29udHJvbGxlci5wcm90b3R5cGUub25UZXN0Y2FzZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRhYkhlYWRlclZpZXcuc2V0QWN0aXZlKHRoaXMudGVzdGNhc2UuaXNBY3RpdmUoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0VGFiSGVhZGVyQ29udHJvbGxlcjsiLCJGaWRkbGVDbGllbnQgPSByZXF1aXJlKFwiLi9hcHAvRmlkZGxlQ2xpZW50XCIpO1xuUmVzb3VyY2VzID0gcmVxdWlyZShcIi4uLy4uL2xpYi9SZXNvdXJjZXNcIik7IiwidmFyIEZpZGRsZUNsaWVudE1vZGVsID0gcmVxdWlyZShcIi4vRmlkZGxlQ2xpZW50TW9kZWxcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcInlhZWRcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcblxuLyoqXG4gKiBHZXQgY2F0ZWdvcnkgbW9kZWwuXG4gKiBAY2xhc3MgQ2F0ZWdvcnlNb2RlbFxuICovXG5mdW5jdGlvbiBDYXRlZ29yeU1vZGVsKGxhYmVsKSB7XG5cdHRoaXMubGFiZWwgPSBsYWJlbDtcblx0dGhpcy5wYXJlbnRNb2RlbCA9IG51bGw7XG5cdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdHRoaXMuY2F0ZWdvcnlDb2xsZWN0aW9uID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uKCk7XG5cdHRoaXMuaXRlbUNvbGxlY3Rpb24gPSBuZXcgeG5vZGVjLkNvbGxlY3Rpb24oKTtcblx0dGhpcy5kZXNjcmlwdGlvbiA9IFwiXCI7XG59XG5cbmluaGVyaXRzKENhdGVnb3J5TW9kZWwsIEV2ZW50RGlzcGF0Y2hlcik7XG5cbi8qKlxuICogU2V0IHJlZmVyZW5jZSB0byBwYXJlbnQgbW9kZWwuXG4gKiBAbWV0aG9kIGdldFBhcmVudE1vZGVsXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLnNldFBhcmVudE1vZGVsID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5wYXJlbnRNb2RlbCA9IHZhbHVlO1xufVxuXG4vKipcbiAqIEdldCBsYWJlbC5cbiAqIEBtZXRob2QgZ2V0TGFiZWxcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuZ2V0TGFiZWwgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMubGFiZWw7XG59XG5cbi8qKlxuICogR2V0IGRlc2NyaXB0aW9uLlxuICogQG1ldGhvZCBnZXRMYWJlbFxuICovXG5DYXRlZ29yeU1vZGVsLnByb3RvdHlwZS5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbn1cblxuLyoqXG4gKiBTZXQgZGVzY3JpcHRpb24uXG4gKiBAbWV0aG9kIGdldExhYmVsXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLnNldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcblx0dGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXG5cdHRoaXMudHJpZ2dlcihcImNoYW5nZVwiKTtcbn1cblxuLyoqXG4gKiBHZXQgcmVmZXJlbmNlIHRvIGFwcCBtb2RlbC5cbiAqIEBtZXRob2QgZ2V0QXBwTW9kZWxcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuZ2V0QXBwTW9kZWwgPSBmdW5jdGlvbigpIHtcblx0aWYgKCF0aGlzLnBhcmVudE1vZGVsKVxuXHRcdHRocm93IG5ldyBFcnJvcihcInRoZXJlIGlzIG5vIHBhcmVudCFcIik7XG5cblx0dmFyIHAgPSB0aGlzLnBhcmVudE1vZGVsO1xuXG5cdHdoaWxlIChwICYmICEocCBpbnN0YW5jZW9mIEZpZGRsZUNsaWVudE1vZGVsKSlcblx0XHRwID0gcC5wYXJlbnRNb2RlbDtcblxuXHRyZXR1cm4gcDtcbn1cblxuLyoqXG4gKiBTZXQgYWN0aXZlIHN0YXRlLlxuICogQG1ldGhvZCBzZXRBY3RpdmVcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlID09IHRoaXMuYWN0aXZlKVxuXHRcdHJldHVybjtcblxuXHR2YXIgc2libGluZ3MgPSB0aGlzLnBhcmVudE1vZGVsLmdldENhdGVnb3J5Q29sbGVjdGlvbigpO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc2libGluZ3MuZ2V0TGVuZ3RoKCk7IGkrKylcblx0XHRpZiAoc2libGluZ3MuZ2V0SXRlbUF0KGkpICE9IHRoaXMpXG5cdFx0XHRzaWJsaW5ncy5nZXRJdGVtQXQoaSkuc2V0QWN0aXZlKGZhbHNlKTtcblxuXHR0aGlzLmFjdGl2ZSA9IHZhbHVlO1xuXHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG59XG5cbi8qKlxuICogSXMgdGhpcyBjYXRlZ29yeSB0aGUgYWN0aXZlIG9uZT9cbiAqIEBtZXRob2QgaXNBY3RpdmVcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuYWN0aXZlO1xufVxuXG4vKipcbiAqIEdldCBjYXRlZ29yeSBjb2xsZWN0aW9uIGZvciBzdWIgY2F0ZWdvcmllcy5cbiAqIEBtZXRob2QgZ2V0Q2F0ZWdvcnlDb2xsZWN0aW9uXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLmdldENhdGVnb3J5Q29sbGVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5jYXRlZ29yeUNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGl0ZW0gY29sbGVjdGlvbi5cbiAqIEBtZXRob2QgZ2V0SXRlbUNvbGxlY3Rpb25cbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuZ2V0SXRlbUNvbGxlY3Rpb24gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaXRlbUNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogQWRkIHN1YiBjYXRlZ29yeSBtb2RlbC5cbiAqIEBtZXRob2QgYWRkQ2F0ZWdvcnlNb2RlbFxuICovXG5DYXRlZ29yeU1vZGVsLnByb3RvdHlwZS5hZGRDYXRlZ29yeU1vZGVsID0gZnVuY3Rpb24oY2F0ZWdvcnlNb2RlbCkge1xuXHRjYXRlZ29yeU1vZGVsLnNldFBhcmVudE1vZGVsKHRoaXMpO1xuXHR0aGlzLmNhdGVnb3J5Q29sbGVjdGlvbi5hZGRJdGVtKGNhdGVnb3J5TW9kZWwpO1xuXG5cdHJldHVybiBjYXRlZ29yeU1vZGVsO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhbmQgYWRkIGEgY2F0ZWdvcnkgbW9kZWwuXG4gKiBAbWV0aG9kIGNyZWF0ZUNhdGVnb3J5XG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLmNyZWF0ZUNhdGVnb3J5ID0gZnVuY3Rpb24odGl0bGUpIHtcblx0dmFyIGNhdGVnb3J5TW9kZWwgPSBuZXcgQ2F0ZWdvcnlNb2RlbCh0aXRsZSk7XG5cblx0cmV0dXJuIHRoaXMuYWRkQ2F0ZWdvcnlNb2RlbChjYXRlZ29yeU1vZGVsKTtcbn1cblxuLyoqXG4gKiBBZGQgcmVzb3VyY2UgaXRlbSBtb2RlbC5cbiAqIEBtZXRob2QgYWRkUmVzb3VyY2VJdGVtTW9kZWxcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuYWRkUmVzb3VyY2VJdGVtTW9kZWwgPSBmdW5jdGlvbihyZXNvdXJjZUl0ZW1Nb2RlbCkge1xuXHR0aGlzLml0ZW1Db2xsZWN0aW9uLmFkZEl0ZW0ocmVzb3VyY2VJdGVtTW9kZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhdGVnb3J5TW9kZWw7IiwidmFyIENvbG9yVXRpbCA9IHJlcXVpcmUoXCIuLi91dGlscy9Db2xvclV0aWxcIik7XG5cbi8qKlxuICogQ29sb3JJdGVtTW9kZWxcbiAqIEBjbGFzcyBDb2xvckl0ZW1Nb2RlbFxuICovXG5mdW5jdGlvbiBDb2xvckl0ZW1Nb2RlbChrZXksIGRlZmF1bHRWYWx1ZSwgdmFsdWUpIHtcblx0dGhpcy5rZXkgPSBrZXk7XG5cblx0dGhpcy5zZXREZWZhdWx0VmFsdWUoZGVmYXVsdFZhbHVlKTtcblx0dGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0IGtleS5cbiAqIEBtZXRob2QgZ2V0S2V5XG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMua2V5O1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IHZhbHVlLlxuICogQG1ldGhvZCBnZXREZWZhdWx0VmFsdWVcbiAqL1xuQ29sb3JJdGVtTW9kZWwucHJvdG90eXBlLmdldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5kZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogU2V0IGRlZmF1bHQgdmFsdWUuXG4gKiBAbWV0aG9kIGdldERlZmF1bHRWYWx1ZVxuICovXG5Db2xvckl0ZW1Nb2RlbC5wcm90b3R5cGUuc2V0RGVmYXVsdFZhbHVlID0gZnVuY3Rpb24oZGVmYXVsdFZhbHVlKSB7XG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gQ29sb3JJdGVtTW9kZWwucHJvY2Vzc1ZhbHVlKGRlZmF1bHRWYWx1ZSk7XG59XG5cbi8qKlxuICogR2V0IGN1c3RvbWl6ZWQgdmFsdWUuXG4gKiBAbWV0aG9kIGdldFZhbHVlXG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy52YWx1ZTtcbn1cblxuLyoqXG4gKiBTZXQgdmFsdWUuXG4gKiBAbWV0aG9kIHNldFZhbHVlXG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMudmFsdWUgPSBDb2xvckl0ZW1Nb2RlbC5wcm9jZXNzVmFsdWUodmFsdWUpO1xufVxuXG4vKipcbiAqIEdldCBpdGVtIHR5cGUuXG4gKiBAbWV0aG9kIGdldEl0ZW1UeXBlXG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb3RvdHlwZS5nZXRJdGVtVHlwZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gXCJjb2xvclwiXG59XG5cbi8qKlxuICogQHN0YXRpY1xuICogQHByaXZhdGVcbiAqL1xuQ29sb3JJdGVtTW9kZWwucHJvY2Vzc1ZhbHVlID0gZnVuY3Rpb24odikge1xuXHRpZiAoIXYpXG5cdFx0cmV0dXJuIG51bGw7XG5cblx0aWYgKHR5cGVvZiB2ID09IFwibnVtYmVyXCIpXG5cdFx0cmV0dXJuIENvbG9yVXRpbC5oZXhUb0hUTUwodik7XG5cblx0cmV0dXJuIHY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sb3JJdGVtTW9kZWw7IiwidmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xudmFyIHhub2RlYyA9IHJlcXVpcmUoXCJ4bm9kZWNvbGxlY3Rpb25cIik7XG52YXIgVGVzdGNhc2UgPSByZXF1aXJlKFwiLi9UZXN0Y2FzZVwiKTtcbnZhciBDYXRlZ29yeU1vZGVsID0gcmVxdWlyZShcIi4vQ2F0ZWdvcnlNb2RlbFwiKTtcbnZhciBJbWFnZUl0ZW1Nb2RlbCA9IHJlcXVpcmUoXCIuL0ltYWdlSXRlbU1vZGVsXCIpO1xudmFyIFJlc291cmNlSXRlbU1vZGVsID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJdGVtTW9kZWxcIik7XG52YXIgQ29sb3JJdGVtTW9kZWwgPSByZXF1aXJlKFwiLi9Db2xvckl0ZW1Nb2RlbFwiKTtcblxuLyoqXG4gKiBNYWluIG1vZGVsIGZvciB0aGUgYXBwLlxuICogQGNsYXNzIEZpZGRsZUNsaWVudE1vZGVsXG4gKi9cbmZ1bmN0aW9uIEZpZGRsZUNsaWVudE1vZGVsKCkge1xuXHR0aGlzLnNlc3Npb24gPSBudWxsO1xuXHR0aGlzLnRlc3RjYXNlQ29sbGVjdGlvbiA9IG5ldyB4bm9kZWMuQ29sbGVjdGlvbigpO1xuXHR0aGlzLmNhdGVnb3J5Q29sbGVjdGlvbiA9IG5ldyB4bm9kZWMuQ29sbGVjdGlvbigpO1xufVxuXG4vKipcbiAqIFNldCBzZXNzaW9uLlxuICogQG1ldGhvZCBzZXRTZXNzaW9uXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5zZXRTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuXHR0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xufVxuXG4vKipcbiAqIEluaXQgZnJvbSBhIHJlc291cmNlcyBvYmplY3QuXG4gKiBAbWV0aG9kIGluaXRXaXRoUmVzb3VyY2VzXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5pbml0V2l0aFJlc291cmNlcyA9IGZ1bmN0aW9uKHJlc291cmNlcykge1xuXHR0aGlzLmdyYXBoaWNzQ2F0ZWdvcnkgPSB0aGlzLmNyZWF0ZUNhdGVnb3J5KFwiR3JhcGhpY3NcIik7XG5cdHRoaXMucG9zaXRpb25zQ2F0ZWdvcnkgPSB0aGlzLmNyZWF0ZUNhdGVnb3J5KFwiUG9zaXRpb25zXCIpO1xuXHR0aGlzLmNvbG9yc0NhdGVnb3J5ID0gdGhpcy5jcmVhdGVDYXRlZ29yeShcIkNvbG9yc1wiKTtcblxuXHR2YXIgcmVzb3VyY2VPYmplY3QgPSByZXNvdXJjZXMuZ2V0UmVzb3VyY2VPYmplY3QoKTtcblxuXHRmb3IgKHZhciBrZXkgaW4gcmVzb3VyY2VPYmplY3QuZ3JhcGhpY3MpIHtcblx0XHRpZiAoa2V5ICE9IFwidGV4dHVyZXNcIikge1xuXHRcdFx0dmFyIGltYWdlSXRlbSA9IG5ldyBJbWFnZUl0ZW1Nb2RlbChrZXkpO1xuXHRcdFx0dGhpcy5ncmFwaGljc0NhdGVnb3J5LmFkZFJlc291cmNlSXRlbU1vZGVsKGltYWdlSXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yICh2YXIga2V5IGluIHJlc291cmNlT2JqZWN0LnBvc2l0aW9ucykge1xuXHRcdHZhciBpdGVtID0gcmVzb3VyY2VPYmplY3QucG9zaXRpb25zW2tleV07XG5cdFx0dmFyIHBvc2l0aW9uSXRlbSA9IG5ldyBSZXNvdXJjZUl0ZW1Nb2RlbChcInBvc2l0aW9uXCIsIGtleSk7XG5cblx0XHRpZiAoaXRlbSlcblx0XHRcdHBvc2l0aW9uSXRlbS5zZXREZWZhdWx0VmFsdWUoaXRlbVswXSArIFwiLCBcIiArIGl0ZW1bMV0pO1xuXG5cdFx0dGhpcy5wb3NpdGlvbnNDYXRlZ29yeS5hZGRSZXNvdXJjZUl0ZW1Nb2RlbChwb3NpdGlvbkl0ZW0pO1xuXHR9XG5cblx0Zm9yICh2YXIga2V5IGluIHJlc291cmNlT2JqZWN0LmNvbG9ycykge1xuXHRcdHZhciBpdGVtID0gcmVzb3VyY2VPYmplY3QuY29sb3JzW2tleV07XG5cdFx0dmFyIGNvbG9ySXRlbSA9IG5ldyBDb2xvckl0ZW1Nb2RlbChrZXkpO1xuXG5cdFx0aWYgKGl0ZW0pXG5cdFx0XHRjb2xvckl0ZW0uc2V0RGVmYXVsdFZhbHVlKGl0ZW0pO1xuXG5cdFx0dGhpcy5jb2xvcnNDYXRlZ29yeS5hZGRSZXNvdXJjZUl0ZW1Nb2RlbChjb2xvckl0ZW0pO1xuXHR9XG59XG5cbi8qKlxuICogQWRkIHRlc3RjYXNlLlxuICogQG1ldGhvZCBhZGRUZXN0Y2FzZVxuICovXG5GaWRkbGVDbGllbnRNb2RlbC5wcm90b3R5cGUuYWRkVGVzdGNhc2UgPSBmdW5jdGlvbihpZCwgbmFtZSwgdXJsKSB7XG5cdHZhciB0ZXN0Y2FzZSA9IG5ldyBUZXN0Y2FzZShpZCwgbmFtZSwgdXJsKTtcblx0dGVzdGNhc2Uuc2V0RmlkZGxlQ2xpZW50TW9kZWwodGhpcyk7XG5cdHRoaXMudGVzdGNhc2VDb2xsZWN0aW9uLmFkZEl0ZW0odGVzdGNhc2UpO1xuXG5cdGlmICh0aGlzLnRlc3RjYXNlQ29sbGVjdGlvbi5nZXRMZW5ndGgoKSA9PSAxKVxuXHRcdHRlc3RjYXNlLnNldEFjdGl2ZSh0cnVlKTtcbn1cblxuLyoqXG4gKiBHZXQgdGVzdGNhc2UgY29sbGVjdGlvblxuICogQG1ldGhvZCBnZXRUZXN0Y2FzZUNvbGxlY3Rpb25cbiAqL1xuRmlkZGxlQ2xpZW50TW9kZWwucHJvdG90eXBlLmdldFRlc3RjYXNlQ29sbGVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy50ZXN0Y2FzZUNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGNhdGVnb3J5IGNvbGxlY3Rpb24uXG4gKiBAbWV0aG9kIGdldENhdGVnb3J5Q29sbGVjdGlvblxuICovXG5GaWRkbGVDbGllbnRNb2RlbC5wcm90b3R5cGUuZ2V0Q2F0ZWdvcnlDb2xsZWN0aW9uID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmNhdGVnb3J5Q29sbGVjdGlvbjtcbn1cblxuLyoqXG4gKiBBZGQgY2F0ZWdvcnkgbW9kZWwuXG4gKiBAbWV0aG9kIGFkZENhdGVnb3J5TW9kZWxcbiAqL1xuRmlkZGxlQ2xpZW50TW9kZWwucHJvdG90eXBlLmFkZENhdGVnb3J5TW9kZWwgPSBmdW5jdGlvbihjYXRlZ29yeU1vZGVsKSB7XG5cdGNhdGVnb3J5TW9kZWwuc2V0UGFyZW50TW9kZWwodGhpcyk7XG5cdHRoaXMuY2F0ZWdvcnlDb2xsZWN0aW9uLmFkZEl0ZW0oY2F0ZWdvcnlNb2RlbCk7XG5cblx0aWYgKHRoaXMuY2F0ZWdvcnlDb2xsZWN0aW9uLmdldExlbmd0aCgpID09IDEpXG5cdFx0Y2F0ZWdvcnlNb2RlbC5zZXRBY3RpdmUodHJ1ZSk7XG5cblx0cmV0dXJuIGNhdGVnb3J5TW9kZWw7XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuZCBhZGQgYSBjYXRlZ29yeSBtb2RlbC5cbiAqIEBtZXRob2QgY3JlYXRlQ2F0ZWdvcnlcbiAqL1xuRmlkZGxlQ2xpZW50TW9kZWwucHJvdG90eXBlLmNyZWF0ZUNhdGVnb3J5ID0gZnVuY3Rpb24odGl0bGUpIHtcblx0dmFyIGNhdGVnb3J5TW9kZWwgPSBuZXcgQ2F0ZWdvcnlNb2RlbCh0aXRsZSk7XG5cblx0cmV0dXJuIHRoaXMuYWRkQ2F0ZWdvcnlNb2RlbChjYXRlZ29yeU1vZGVsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWRkbGVDbGllbnRNb2RlbDsiLCIvKipcbiAqIEltYWdlSXRlbU1vZGVsXG4gKiBAY2xhc3MgSW1hZ2VJdGVtTW9kZWxcbiAqL1xuZnVuY3Rpb24gSW1hZ2VJdGVtTW9kZWwoa2V5KSB7XG5cdHRoaXMua2V5ID0ga2V5O1xuXG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gbnVsbDtcblx0dGhpcy52YWx1ZSA9IG51bGw7XG59XG5cbi8qKlxuICogR2V0IGtleS5cbiAqIEBtZXRob2QgZ2V0S2V5XG4gKi9cbkltYWdlSXRlbU1vZGVsLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMua2V5O1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IHZhbHVlLlxuICogQG1ldGhvZCBnZXREZWZhdWx0VmFsdWVcbiAqL1xuSW1hZ2VJdGVtTW9kZWwucHJvdG90eXBlLmdldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5kZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogR2V0IGN1c3RvbWl6ZWQgdmFsdWUuXG4gKiBAbWV0aG9kIGdldFZhbHVlXG4gKi9cbkltYWdlSXRlbU1vZGVsLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy52YWx1ZTtcbn1cblxuLyoqXG4gKiBTZXQgdmFsdWUuXG4gKiBAbWV0aG9kIHNldFZhbHVlXG4gKi9cbkltYWdlSXRlbU1vZGVsLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgaXRlbSB0eXBlLlxuICogQG1ldGhvZCBnZXRJdGVtVHlwZVxuICovXG5JbWFnZUl0ZW1Nb2RlbC5wcm90b3R5cGUuZ2V0SXRlbVR5cGUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIFwiaW1hZ2VcIjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbWFnZUl0ZW1Nb2RlbDsiLCIvKipcbiAqIFJlc291cmNlSXRlbU1vZGVsXG4gKiBAY2xhc3MgUmVzb3VyY2VJdGVtTW9kZWxcbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VJdGVtTW9kZWwodHlwZSwga2V5LCBkZWZhdWx0VmFsdWUsIHZhbHVlKSB7XG5cdHRoaXMua2V5ID0ga2V5O1xuXG5cdGlmICghZGVmYXVsdFZhbHVlKVxuXHRcdGRlZmF1bHRWYWx1ZT1cIlwiO1xuXG5cdGlmICghdmFsdWUpXG5cdFx0dmFsdWU9XCJcIjtcblxuXHR0aGlzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXG5cdHRoaXMuaXRlbVR5cGUgPSB0eXBlO1xuXG5cdGlmICghdGhpcy5pdGVtVHlwZSlcblx0XHR0aGlzLml0ZW1UeXBlID0gXCJwb3NpdGlvblwiO1xufVxuXG4vKipcbiAqIEdldCBrZXkuXG4gKiBAbWV0aG9kIGdldEtleVxuICovXG5SZXNvdXJjZUl0ZW1Nb2RlbC5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmtleTtcbn1cblxuLyoqXG4gKiBHZXQgZGVmYXVsdCB2YWx1ZS5cbiAqIEBtZXRob2QgZ2V0RGVmYXVsdFZhbHVlXG4gKi9cblJlc291cmNlSXRlbU1vZGVsLnByb3RvdHlwZS5nZXREZWZhdWx0VmFsdWUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIFNldCBkZWZhdWx0IHZhbHVlLlxuICogQG1ldGhvZCBnZXREZWZhdWx0VmFsdWVcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLnNldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGRlZmF1bHRWYWx1ZSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgY3VzdG9taXplZCB2YWx1ZS5cbiAqIEBtZXRob2QgZ2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnZhbHVlO1xufVxuXG4vKipcbiAqIFNldCB2YWx1ZS5cbiAqIEBtZXRob2Qgc2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xufVxuXG4vKipcbiAqIEdldCBpdGVtIHR5cGUuXG4gKiBAbWV0aG9kIGdldEl0ZW1UeXBlXG4gKi9cblJlc291cmNlSXRlbU1vZGVsLnByb3RvdHlwZS5nZXRJdGVtVHlwZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5pdGVtVHlwZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZUl0ZW1Nb2RlbDsiLCJ2YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcInlhZWRcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG5cbi8qKlxuICogVGVzdGNhc2VcbiAqL1xuZnVuY3Rpb24gVGVzdGNhc2UoaWQsIG5hbWUsIHVybCkge1xuXHR0aGlzLmlkID0gaWQ7XG5cdHRoaXMubmFtZSA9IG5hbWU7XG5cdHRoaXMudXJsID0gdXJsO1xuXG5cdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwgPSBudWxsO1xufTtcblxuaW5oZXJpdHMoVGVzdGNhc2UsIEV2ZW50RGlzcGF0Y2hlcik7XG5cbi8qKlxuICogU2V0IHJlZmVyZW5jZSB0byBhcHAuXG4gKiBAbWV0aG9kIHNldEZpZGRsZUNsaWVudE1vZGVsXG4gKi9cblRlc3RjYXNlLnByb3RvdHlwZS5zZXRGaWRkbGVDbGllbnRNb2RlbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwgPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBTZXQgYWN0aXZlIHN0YXRlLlxuICogQG1ldGhvZCBzZXRBY3RpdmVcbiAqL1xuVGVzdGNhc2UucHJvdG90eXBlLnNldEFjdGl2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSA9PSB0aGlzLmFjdGl2ZSlcblx0XHRyZXR1cm47XG5cblx0dmFyIHNpYmxpbmdzID0gdGhpcy5maWRkbGVDbGllbnRNb2RlbC5nZXRUZXN0Y2FzZUNvbGxlY3Rpb24oKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHNpYmxpbmdzLmdldExlbmd0aCgpOyBpKyspXG5cdFx0aWYgKHNpYmxpbmdzLmdldEl0ZW1BdChpKSAhPSB0aGlzKVxuXHRcdFx0c2libGluZ3MuZ2V0SXRlbUF0KGkpLnNldEFjdGl2ZShmYWxzZSk7XG5cblx0dGhpcy5hY3RpdmUgPSB2YWx1ZTtcblx0dGhpcy50cmlnZ2VyKFwiY2hhbmdlXCIpO1xufVxuXG4vKipcbiAqIElzIHRoaXMgY2F0ZWdvcnkgdGhlIGFjdGl2ZSBvbmU/XG4gKiBAbWV0aG9kIGlzQWN0aXZlXG4gKi9cblRlc3RjYXNlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5hY3RpdmU7XG59XG5cbi8qKlxuICogR2V0IGxhYmVsLlxuICogQG1ldGhvZCBnZXRMYWJlbFxuICovXG5UZXN0Y2FzZS5wcm90b3R5cGUuZ2V0TGFiZWwgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMubmFtZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0Y2FzZTsiLCJ2YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4vRXZlbnREaXNwYXRjaGVyXCIpO1xuXG5mdW5jdGlvbiBBUElDb25uZWN0aW9uKGJhc2VQYXRoLCBzZXNzaW9uKSB7XG5cdHRoaXMudXJsID0gYmFzZVBhdGg7XG5cdHRoaXMuYmFzZVBhdGggPSBiYXNlUGF0aDtcblx0dGhpcy5zZXNzaW9uID0gc2Vzc2lvbjtcbn07XG5FdmVudERpc3BhdGNoZXIuaW5pdChBUElDb25uZWN0aW9uKTtcblxuQVBJQ29ubmVjdGlvbi5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKHJvdXRlLCBwYXJhbU9iamVjdCkge1xuXHR2YXIgeG1saHR0cCA9IG51bGw7XG5cdGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHsgLy8gY29kZSBmb3IgSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG5cdFx0eG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR9XG5cdGVsc2UgeyAvLyBjb2RlIGZvciBJRTYsIElFNVxuXHRcdHhtbGh0dHAgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuXHR9XG5cblx0eG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLm9uUmVhZHlTdGF0ZUNoYW5nZS5iaW5kKHRoaXMsIHhtbGh0dHApO1xuXG5cdHZhciB1cmwgPSB0aGlzLnVybCArIHJvdXRlOy8vXCJnZXRJbWFnZXNcIjtcblx0dmFyIHBhcmFtcyA9IFwiXCI7XG5cdHZhciBmaXJzdCA9IHRydWU7XG5cdGZvcih2YXIgbyBpbiBwYXJhbU9iamVjdCkge1xuXHRcdGlmKCFmaXJzdCkge1xuXHRcdFx0cGFyYW1zICs9IFwiJlwiO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZpcnN0ID0gZmFsc2U7XG5cdFx0fVxuXHRcdHBhcmFtcyArPSBvICsgXCI9XCIgKyBwYXJhbU9iamVjdFtvXTtcblx0fVxuXG5cdHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcblx0eG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXHR4bWxodHRwLnNlbmQocGFyYW1zKTtcbn07XG5cbkFQSUNvbm5lY3Rpb24ucHJvdG90eXBlLnVwbG9hZCA9IGZ1bmN0aW9uKHJvdXRlLCBwYXJhbU9iamVjdCkge1xuXHR2YXIgeG1saHR0cCA9IG51bGw7XG5cdGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHsgLy8gY29kZSBmb3IgSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG5cdFx0eG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR9XG5cdGVsc2UgeyAvLyBjb2RlIGZvciBJRTYsIElFNVxuXHRcdHhtbGh0dHAgPSBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuXHR9XG5cblx0eG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLm9uUmVhZHlTdGF0ZUNoYW5nZS5iaW5kKHRoaXMsIHhtbGh0dHApO1xuXG5cdHZhciB1cmwgPSB0aGlzLnVybCArIHJvdXRlOy8vXCJnZXRJbWFnZXNcIjtcblx0XG5cdHhtbGh0dHAub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcblx0Ly94bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XG5cdHhtbGh0dHAuc2VuZChwYXJhbU9iamVjdCk7XG59O1xuXG5BUElDb25uZWN0aW9uLnByb3RvdHlwZS5vblJlYWR5U3RhdGVDaGFuZ2UgPSBmdW5jdGlvbih4bWxodHRwKSB7XG5cdGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdGlmICh4bWxodHRwLnN0YXR1cyA9PSAyMDAgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcImh0dHBcIikgPT0gLTEpIHtcblx0XHRcdHZhciBqc29uID0gSlNPTi5wYXJzZSh4bWxodHRwLnJlc3BvbnNlKTtcblx0XHRcdHRoaXMudHJpZ2dlcihcImxvYWRlZFwiLCB7Y29ubmVjdGlvbjogdGhpcywganNvbjoganNvbn0pO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0Y29uc29sZS5sb2coXCJBbiBlcnJvciBoYXMgb2NjdXJlZCBtYWtpbmcgdGhlIHJlcXVlc3RcIilcblx0XHR9XG5cdH1cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBBUElDb25uZWN0aW9uOyIsImZ1bmN0aW9uIENsYXNzVXRpbHMoKSB7XG5cdFxufTtcblxuQ2xhc3NVdGlscy5leHRlbmRzID0gZnVuY3Rpb24ob2JqZWN0LCBpbmhlcml0c19mcm9tKSB7XG5cdG9iamVjdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGluaGVyaXRzX2Zyb20ucHJvdG90eXBlKTtcblx0b2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG9iamVjdDtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBDbGFzc1V0aWxzOyIsIi8qKlxuICogQ29sb3IgdXRpbGl0aWVzLlxuICogQGNsYXNzIENvbG9yVXRpbFxuICovXG5mdW5jdGlvbiBDb2xvclV0aWwoKSB7fVxuXG4vKipcbiAqIFBhcnNlIGh0bWwgY29sb3IuXG4gKiBAbWV0aG9kIHBhcnNlSFRNTENvbG9yXG4gKi9cbkNvbG9yVXRpbC5wYXJzZUhUTUxDb2xvciA9IGZ1bmN0aW9uKGh0bWxDb2xvcikge1xuXHRpZiAoaHRtbENvbG9yID09PSB1bmRlZmluZWQgfHwgaHRtbENvbG9yID09PSBudWxsKVxuXHRcdGh0bWxDb2xvciA9IFwiXCI7XG5cblx0dmFyIHMgPSBodG1sQ29sb3IudG9TdHJpbmcoKS50cmltKCkucmVwbGFjZShcIiNcIiwgXCJcIik7XG5cdHZhciBjID0ge1xuXHRcdHJlZDogcGFyc2VJbnQoc1swXSArIHNbMV0sIDE2KSxcblx0XHRncmVlbjogcGFyc2VJbnQoc1syXSArIHNbM10sIDE2KSxcblx0XHRibHVlOiBwYXJzZUludChzWzRdICsgc1s1XSwgMTYpLFxuXHR9XG5cblx0aWYgKGlzTmFOKGMucmVkKSlcblx0XHRjLnJlZCA9IDA7XG5cblx0aWYgKGlzTmFOKGMuZ3JlZW4pKVxuXHRcdGMuZ3JlZW4gPSAwO1xuXG5cdGlmIChpc05hTihjLmJsdWUpKVxuXHRcdGMuYmx1ZSA9IDA7XG5cblx0cmV0dXJuIGM7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBoZXggY29sb3IgbnVtYmVyIHRvIGEgaHRtbCBjb2xvci5cbiAqIEBtZXRob2QgaGV4VG9IVE1MXG4gKi9cbkNvbG9yVXRpbC5oZXhUb0hUTUwgPSBmdW5jdGlvbihoZXgpIHtcblx0dmFyIHJlZCA9IChoZXggPj4gMTYgJiAweEZGKTtcblx0dmFyIGdyZWVuID0gKGhleCA+PiA4ICYgMHhGRik7XG5cdHZhciBibHVlID0gKGhleCAmIDB4RkYpO1xuXG5cdHJldHVybiBcIiNcIiArXG5cdFx0Q29sb3JVdGlsLnByZWZpeFplcm8ocmVkLnRvU3RyaW5nKDE2KSwgMikgK1xuXHRcdENvbG9yVXRpbC5wcmVmaXhaZXJvKGdyZWVuLnRvU3RyaW5nKDE2KSwgMikgK1xuXHRcdENvbG9yVXRpbC5wcmVmaXhaZXJvKGJsdWUudG9TdHJpbmcoMTYpLCAyKTtcbn07XG5cbi8qKlxuICogUHJlZml4IHplcm9cbiAqIEBtZXRob2QgcHJlZml4WmVyb1xuICovXG5Db2xvclV0aWwucHJlZml4WmVybyA9IGZ1bmN0aW9uKHMsIG4pIHtcblx0aWYgKCFuKVxuXHRcdG4gPSAyO1xuXG5cdHdoaWxlIChzLmxlbmd0aCA8IG4pXG5cdFx0cyA9IFwiMFwiICsgcztcblxuXHRyZXR1cm4gcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvclV0aWw7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQVMzL2pxdWVyeSBzdHlsZSBldmVudCBkaXNwYXRjaGVyLiBTbGlnaHRseSBtb2RpZmllZC4gVGhlXG4gKiBqcXVlcnkgc3R5bGUgb24vb2ZmL3RyaWdnZXIgc3R5bGUgb2YgYWRkaW5nIGxpc3RlbmVycyBpc1xuICogY3VycmVudGx5IHRoZSBwcmVmZXJyZWQgb25lLlxuICogXG4gKiBUaGUgb24gbWV0aG9kIGZvciBhZGRpbmcgbGlzdGVuZXJzIHRha2VzIGFuIGV4dHJhIHBhcmFtZXRlciB3aGljaCBpcyB0aGVcbiAqIHNjb3BlIGluIHdoaWNoIGxpc3RlbmVycyBzaG91bGQgYmUgY2FsbGVkLiBTbyB0aGlzOlxuICpcbiAqICAgICBvYmplY3Qub24oXCJldmVudFwiLCBsaXN0ZW5lciwgdGhpcyk7XG4gKlxuICogSGFzIHRoZSBzYW1lIGZ1bmN0aW9uIHdoZW4gYWRkaW5nIGV2ZW50cyBhczpcbiAqXG4gKiAgICAgb2JqZWN0Lm9uKFwiZXZlbnRcIiwgbGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gKlxuICogSG93ZXZlciwgdGhlIGRpZmZlcmVuY2UgaXMgdGhhdCBpZiB3ZSB1c2UgdGhlIHNlY29uZCBtZXRob2QgaXRcbiAqIHdpbGwgbm90IGJlIHBvc3NpYmxlIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzIGxhdGVyLCB1bmxlc3NcbiAqIHRoZSBjbG9zdXJlIGNyZWF0ZWQgYnkgYmluZCBpcyBzdG9yZWQgc29tZXdoZXJlLiBJZiB0aGUgXG4gKiBmaXJzdCBtZXRob2QgaXMgdXNlZCwgd2UgY2FuIHJlbW92ZSB0aGUgbGlzdGVuZXIgd2l0aDpcbiAqXG4gKiAgICAgb2JqZWN0Lm9mZihcImV2ZW50XCIsIGxpc3RlbmVyLCB0aGlzKTtcbiAqXG4gKiBAY2xhc3MgRXZlbnREaXNwYXRjaGVyXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RGlzcGF0Y2hlcigpIHtcblx0dGhpcy5saXN0ZW5lck1hcCA9IHt9O1xufVxuXG4vKipcbiAqIEFkZCBldmVudCBsaXN0ZW5lci5cbiAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lclxuICogQGRlcHJlY2F0ZWRcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwKVxuXHRcdHRoaXMubGlzdGVuZXJNYXAgPSB7fTtcblxuXHRpZiAoIWV2ZW50VHlwZSlcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJFdmVudCB0eXBlIHJlcXVpcmVkIGZvciBldmVudCBkaXNwYXRjaGVyXCIpO1xuXG5cdGlmICghbGlzdGVuZXIpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiTGlzdGVuZXIgcmVxdWlyZWQgZm9yIGV2ZW50IGRpc3BhdGNoZXJcIik7XG5cblx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHNjb3BlKTtcblxuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSlcblx0XHR0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV0gPSBbXTtcblxuXHR0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV0ucHVzaCh7XG5cdFx0bGlzdGVuZXI6IGxpc3RlbmVyLFxuXHRcdHNjb3BlOiBzY29wZVxuXHR9KTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXIuXG4gKiBAbWV0aG9kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAqIEBkZXByZWNhdGVkXG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG5cdGlmICghdGhpcy5saXN0ZW5lck1hcClcblx0XHR0aGlzLmxpc3RlbmVyTWFwID0ge307XG5cblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpXG5cdFx0cmV0dXJuO1xuXG5cdHZhciBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgbGlzdGVuZXJPYmogPSBsaXN0ZW5lcnNbaV07XG5cblx0XHRpZiAobGlzdGVuZXIgPT0gbGlzdGVuZXJPYmoubGlzdGVuZXIgJiYgc2NvcGUgPT0gbGlzdGVuZXJPYmouc2NvcGUpIHtcblx0XHRcdGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHRpLS07XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFsaXN0ZW5lcnMubGVuZ3RoKVxuXHRcdGRlbGV0ZSB0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggZXZlbnQuXG4gKiBAbWV0aG9kIGRpc3BhdGNoRXZlbnRcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwKVxuXHRcdHRoaXMubGlzdGVuZXJNYXAgPSB7fTtcblxuXHRpZiAodHlwZW9mIGV2ZW50ID09IFwic3RyaW5nXCIpIHtcblx0XHRldmVudCA9IHtcblx0XHRcdHR5cGU6IGV2ZW50XG5cdFx0fTtcblx0fVxuXG5cdGlmICghdGhpcy5saXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShldmVudC50eXBlKSlcblx0XHRyZXR1cm47XG5cblx0aWYgKGRhdGEgPT0gdW5kZWZpbmVkKVxuXHRcdGRhdGEgPSBldmVudDtcblxuXHRmb3IgKHZhciBpIGluIHRoaXMubGlzdGVuZXJNYXBbZXZlbnQudHlwZV0pIHtcblx0XHR2YXIgbGlzdGVuZXJPYmogPSB0aGlzLmxpc3RlbmVyTWFwW2V2ZW50LnR5cGVdW2ldO1xuXG5cdFx0bGlzdGVuZXJPYmoubGlzdGVuZXIuY2FsbChsaXN0ZW5lck9iai5zY29wZSwgZGF0YSk7XG5cdH1cbn1cblxuLyoqXG4gKiBKcXVlcnkgc3R5bGUgYWxpYXMgZm9yIGFkZEV2ZW50TGlzdGVuZXJcbiAqIEBtZXRob2Qgb25cbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcblxuLyoqXG4gKiBKcXVlcnkgc3R5bGUgYWxpYXMgZm9yIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAqIEBtZXRob2Qgb2ZmXG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUub2ZmID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuXG4vKipcbiAqIEpxdWVyeSBzdHlsZSBhbGlhcyBmb3IgZGlzcGF0Y2hFdmVudFxuICogQG1ldGhvZCB0cmlnZ2VyXG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUudHJpZ2dlciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudDtcblxuLyoqXG4gKiBNYWtlIHNvbWV0aGluZyBhbiBldmVudCBkaXNwYXRjaGVyLiBDYW4gYmUgdXNlZCBmb3IgbXVsdGlwbGUgaW5oZXJpdGFuY2UuXG4gKiBAbWV0aG9kIGluaXRcbiAqIEBzdGF0aWNcbiAqL1xuRXZlbnREaXNwYXRjaGVyLmluaXQgPSBmdW5jdGlvbihjbHMpIHtcblx0Y2xzLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXHRjbHMucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cdGNscy5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudDtcblx0Y2xzLnByb3RvdHlwZS5vbiA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUub247XG5cdGNscy5wcm90b3R5cGUub2ZmID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5vZmY7XG5cdGNscy5wcm90b3R5cGUudHJpZ2dlciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUudHJpZ2dlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudERpc3BhdGNoZXI7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIExpc3RJdGVtID0gcmVxdWlyZShcIi4vTGlzdEl0ZW1cIik7XG52YXIgSW5wdXRWaWV3ID0gcmVxdWlyZShcIi4vSW5wdXRWaWV3XCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuXG5mdW5jdGlvbiBDb2xvckl0ZW0oaWQsIHZhbHVlKSB7XG5cdExpc3RJdGVtLmNhbGwodGhpcywgaWQpO1xuXG5cdHRoaXMuaWQgPSBpZDtcblxuXHR0aGlzLmNvbG9yVmlldyA9IG5ldyBWaWV3KFZpZXcuRGl2LCBcImNvbG9yLXZpZXdcIik7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5jb2xvclZpZXcpO1xuXHR0aGlzLmNvbG9yVmlldy53aWR0aCA9IDEwMDtcblx0dGhpcy5jb2xvclZpZXcuaGVpZ2h0ID0gMTAwO1xuXHR0aGlzLmNvbG9yVmlldy5iYWNrZ3JvdW5kID0gdmFsdWUgPyB2YWx1ZSA6IFwiIzAwMDAwMFwiO1xuXG5cdHRoaXMuY29sb3JWaWV3LnkgPSB0aGlzLmhlYWRlci5oZWlnaHQ7XG5cblx0dGhpcy5pbnB1dCA9IG5ldyBJbnB1dFZpZXcoKTtcblx0dGhpcy5hZGRDaGlsZCh0aGlzLmlucHV0KTtcblxuXHR0aGlzLmlucHV0LnNldFZhbHVlKHZhbHVlID8gdmFsdWUgOiBcIiMwMDAwMDBcIik7XG5cblx0dGhpcy5pbnB1dC54ID0gdGhpcy5jb2xvclZpZXcud2lkdGg7XG5cdHRoaXMuaW5wdXQueSA9IHRoaXMuY29sb3JWaWV3LnkgKyAodGhpcy5jb2xvclZpZXcuaGVpZ2h0IC0gdGhpcy5pbnB1dC5oZWlnaHQpKjAuNTtcblxuXHR0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoSW5wdXRWaWV3LkNoYW5nZWQsIHRoaXMub25DaGFuZ2VkLCB0aGlzKTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoQ29sb3JJdGVtLCBMaXN0SXRlbSk7XG5FdmVudERpc3BhdGNoZXIuaW5pdChDb2xvckl0ZW0pO1xuXG5cbkNvbG9ySXRlbS5DaGFuZ2VkID0gXCJDaGFuZ2VkXCI7XG5cbkNvbG9ySXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHRMaXN0SXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0LmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCk7XG5cdFxuXHR0aGlzLmNvbG9yVmlldy53aWR0aCA9IHdpZHRoICogMC41O1xuXHR0aGlzLmNvbG9yVmlldy5oZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmhlYWRlci5oZWlnaHQ7XG5cblx0dGhpcy5pbnB1dC51cGRhdGVMYXlvdXQod2lkdGggKiAwLjUsIGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCk7XG5cblx0dGhpcy5pbnB1dC54ID0gd2lkdGggKiAwLjU7XG5cdHRoaXMuaW5wdXQueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0XG5cdHRoaXMuY29sb3JWaWV3LnkgPSB0aGlzLmhlYWRlci5oZWlnaHQ7XG59O1xuXG5Db2xvckl0ZW0ucHJvdG90eXBlLm9uQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNvbG9yVmlldy5iYWNrZ3JvdW5kID0gdGhpcy5pbnB1dC5nZXRWYWx1ZSgpO1xuXHR0aGlzLnRyaWdnZXIoQ29sb3JJdGVtLkNoYW5nZWQsIHRoaXMpO1xufTtcblxuQ29sb3JJdGVtLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5pbnB1dC5nZXRWYWx1ZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvckl0ZW07IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcblxuZnVuY3Rpb24gRWRpdG9yQ29udHJvbGxlclZpZXcoKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJFZGl0b3JDb250cm9sbGVyVmlld1wiKTtcblxuXHR0aGlzLm1lbnVWaWV3ID0gbnVsbDtcblx0dGhpcy5lZGl0b3JzID0gbmV3IEFycmF5KCk7XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKEVkaXRvckNvbnRyb2xsZXJWaWV3LCBWaWV3KTtcblxuRWRpdG9yQ29udHJvbGxlclZpZXcucHJvdG90eXBlLnNldE1lbnVWaWV3ID0gZnVuY3Rpb24obWVudVZpZXcpIHtcblx0dGhpcy5tZW51VmlldyA9IG1lbnVWaWV3O1xuXHR0aGlzLmFkZENoaWxkKHRoaXMubWVudVZpZXcpO1xufTtcblxuRWRpdG9yQ29udHJvbGxlclZpZXcucHJvdG90eXBlLmFkZEVkaXRvciA9IGZ1bmN0aW9uKGVkaXRvcikge1xuXHR0aGlzLmVkaXRvcnMucHVzaChlZGl0b3IpO1xuXHR0aGlzLmFkZENoaWxkKGVkaXRvcik7XG59O1xuXG5FZGl0b3JDb250cm9sbGVyVmlldy5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXG5cdHRoaXMubWVudVZpZXcudXBkYXRlTGF5b3V0KHdpZHRoLCB0aGlzLm1lbnVWaWV3LmhlaWdodCk7XG5cblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZWRpdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuZWRpdG9yc1tpXS54ID0gMDtcblx0XHR0aGlzLmVkaXRvcnNbaV0ueSA9IHRoaXMubWVudVZpZXcuaGVpZ2h0O1xuXHRcdGlmKHRoaXMuZWRpdG9yc1tpXS5pc1Zpc2libGUoKSkge1xuXHRcdFx0dGhpcy5lZGl0b3JzW2ldLnVwZGF0ZUxheW91dCh3aWR0aCwgaGVpZ2h0IC0gdGhpcy5tZW51Vmlldy5oZWlnaHQpO1xuXHRcdH1cblx0fVxuXHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JDb250cm9sbGVyVmlldztcbiIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIEVkaXRvclZpZXcoKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJFZGl0b3JWaWV3XCIpO1xuXG5cdHRoaXMuaXRlbXMgPSBuZXcgQXJyYXkoKTtcblxuXHR0aGlzLmhpZGUoKTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoRWRpdG9yVmlldywgVmlldyk7XG5cbkVkaXRvclZpZXcucHJvdG90eXBlLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG5cdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcblx0dGhpcy5hZGRDaGlsZChpdGVtKTtcbn07XG5cbkVkaXRvclZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dmFyIHkgPSAwO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuaXRlbXNbaV0ueSA9IHk7XG5cdFx0dGhpcy5pdGVtc1tpXS51cGRhdGVMYXlvdXQod2lkdGgsIDEzMCk7XG5cdFx0eSArPSAxMzA7XG5cdH1cblx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR0aGlzLmhlaWdodCA9IGhlaWdodDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yVmlldztcbiIsInZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciBUYXJnZXRQYW5lVmlldyA9IHJlcXVpcmUoXCIuL1RhcmdldFBhbmVWaWV3XCIpO1xudmFyIEhlYWRlclZpZXcgPSByZXF1aXJlKFwiLi9IZWFkZXJWaWV3XCIpO1xudmFyIFJlc291cmNlUGFuZVZpZXcgPSByZXF1aXJlKFwiLi9SZXNvdXJjZVBhbmVWaWV3XCIpO1xuXG4vKipcbiAqIE1haW4gY2xpZW50IHZpZXcuXG4gKiBAY2xhc3MgRmlkZGxlQ2xpZW50Vmlld1xuICovXG5mdW5jdGlvbiBGaWRkbGVDbGllbnRWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnRhcmdldFBhbmVWaWV3ID0gbmV3IFRhcmdldFBhbmVWaWV3KCk7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy50YXJnZXRQYW5lVmlldyk7XG5cblx0dGhpcy5oZWFkZXJWaWV3ID0gbmV3IEhlYWRlclZpZXcoKTtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmhlYWRlclZpZXcpO1xuXG5cdHRoaXMucmVzb3VyY2VQYW5lVmlldyA9IG5ldyBSZXNvdXJjZVBhbmVWaWV3KCk7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5yZXNvdXJjZVBhbmVWaWV3KTtcbn1cblxuaW5oZXJpdHMoRmlkZGxlQ2xpZW50VmlldywgeG5vZGUuRGl2KTtcblxuLyoqXG4gKiBHZXQgdGFyZ2V0IHBhbmUgdmlldy5cbiAqIEBtZXRob2QgZ2V0VGFyZ2V0UGFuZVZpZXdcbiAqL1xuRmlkZGxlQ2xpZW50Vmlldy5wcm90b3R5cGUuZ2V0VGFyZ2V0UGFuZVZpZXcgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMudGFyZ2V0UGFuZVZpZXc7XG59XG5cbi8qKlxuICogR2V0IGhlYWRlciB2aWV3LlxuICogQG1ldGhvZCBnZXRIZWFkZXJWaWV3XG4gKi9cbkZpZGRsZUNsaWVudFZpZXcucHJvdG90eXBlLmdldEhlYWRlclZpZXcgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaGFkZXJWaWV3O1xufVxuXG4vKipcbiAqIEdldCByZXNvdXJjZSBwYW5lIHZpZXcuXG4gKiBAbWV0aG9kIGdldFJlc291cmNlUGFuZVZpZXdcbiAqL1xuRmlkZGxlQ2xpZW50Vmlldy5wcm90b3R5cGUuZ2V0UmVzb3VyY2VQYW5lVmlldyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5yZXNvdXJjZVBhbmVWaWV3O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZGRsZUNsaWVudFZpZXc7IiwidmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xuXG4vKipcbiAqIEhlYWRlciB2aWV3LlxuICogQGNsYXNzIEhlYWRlclZpZXdcbiAqL1xuZnVuY3Rpb24gSGVhZGVyVmlldygpIHtcblx0eG5vZGUuRGl2LmNhbGwodGhpcyk7XG5cblx0dGhpcy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0dGhpcy5zdHlsZS50b3AgPSBcIjBcIjtcblx0dGhpcy5zdHlsZS5sZWZ0ID0gXCIwXCI7XG5cdHRoaXMuc3R5bGUucmlnaHQgPSBcIjBcIjtcblx0dGhpcy5zdHlsZS5oZWlnaHQgPSBcIjUwcHhcIjtcblx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjZThlOGU4XCI7XG5cdHRoaXMuc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgI2UwZTBlMFwiXG5cdHRoaXMuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuXG5cdHRoaXMuaGVhZGVyID0gbmV3IHhub2RlLkgxKCk7XG5cdHRoaXMuaGVhZGVyLmNsYXNzTmFtZSA9IFwidWkgaGVhZGVyXCI7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5oZWFkZXIpO1xuXG5cdHRoaXMuaGVhZGVyLmlubmVySFRNTCA9IFwiUmVzb3VyY2UgRmlkZGxlXCI7XG59XG5cbmluaGVyaXRzKEhlYWRlclZpZXcsIHhub2RlLkRpdik7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyVmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuXG5mdW5jdGlvbiBJRnJhbWVWaWV3KCkge1xuXHRWaWV3LmNhbGwodGhpcywgVmlldy5JRnJhbWUsIFwiSUZyYW1lVmlld1wiKTtcblxuXHR0aGlzLmdldEVsZW1lbnQoKS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHR0aGlzLmdldEVsZW1lbnQoKS5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0dGhpcy51cmwgPSBcIlwiO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhJRnJhbWVWaWV3LCBWaWV3KTtcblxuSUZyYW1lVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xufTtcblxuSUZyYW1lVmlldy5wcm90b3R5cGUuc2V0VXJsID0gZnVuY3Rpb24odGFyZ2V0VVJMKSB7XG5cdHRoaXMudXJsID0gdGFyZ2V0VVJMO1xuXHR0aGlzLnJlbG9hZCgpO1xufTtcblxuXG5JRnJhbWVWaWV3LnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5nZXRFbGVtZW50KCkuc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMudXJsICsgXCImX19fX3RpbWVzdGFtcD1cIitEYXRlLm5vdygpKTtcbn07XG5cbklGcmFtZVZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0XG5cdHRoaXMud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElGcmFtZVZpZXc7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIExpc3RJdGVtID0gcmVxdWlyZShcIi4vTGlzdEl0ZW1cIik7XG52YXIgU2VsZWN0QnV0dG9uID0gcmVxdWlyZShcIi4vU2VsZWN0QnV0dG9uXCIpO1xudmFyIEltYWdlVmlldyA9IHJlcXVpcmUoXCIuL0ltYWdlVmlld1wiKTtcbnZhciBSZXNvdXJjZXMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbGliL1Jlc291cmNlc1wiKTtcblxuZnVuY3Rpb24gSW1hZ2VJdGVtKGJhc2VQYXRoLCBuYW1lLCB0ZXh0dXJlKSB7XG5cdExpc3RJdGVtLmNhbGwodGhpcywgbmFtZSk7XG5cblx0dGhpcy5uYW1lID0gbmFtZTtcblxuXHR0aGlzLmltYWdlID0gbmV3IEltYWdlVmlldyhiYXNlUGF0aCwgdGV4dHVyZSk7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5pbWFnZSk7XG5cblx0dGhpcy5pbWFnZS55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXG5cdHRoaXMuYnV0dG9uID0gbmV3IFNlbGVjdEJ1dHRvbihcIlVwbG9hZCBuZXcgaW1hZ2VcIik7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5idXR0b24pO1xuXG5cdHRoaXMuYnV0dG9uLm9uKFNlbGVjdEJ1dHRvbi5DaGFuZ2UsIHRoaXMub25GaWxlc1NlbGVjdGVkLCB0aGlzKTtcblx0XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKEltYWdlSXRlbSwgTGlzdEl0ZW0pO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoSW1hZ2VJdGVtKTtcblxuSW1hZ2VJdGVtLlNlbGVjdGVkID0gXCJTZWxlY3RlZFwiO1xuXG5JbWFnZUl0ZW0ucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbih0ZXh0dXJlKSB7XG5cdHRoaXMuaW1hZ2Uuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcbn07XG5cbkltYWdlSXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHRMaXN0SXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0LmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCk7XG5cblx0dGhpcy5pbWFnZS51cGRhdGVMYXlvdXQod2lkdGggKiAwLjUsIGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCk7XG5cdHRoaXMuaW1hZ2UueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0XG5cdHRoaXMuYnV0dG9uLnkgPSB0aGlzLmhlYWRlci5oZWlnaHQgKyAoKGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCkgLSB0aGlzLmJ1dHRvbi5oZWlnaHQpKjAuNTtcblx0dGhpcy5idXR0b24ueCA9IHdpZHRoICogMC41O1xufTtcblxuXG5JbWFnZUl0ZW0ucHJvdG90eXBlLm9uRmlsZXNTZWxlY3RlZCA9IGZ1bmN0aW9uKGZpbGVzKSB7XG5cdHRoaXMuZmlsZXMgPSBmaWxlcztcblx0XG5cdHRoaXMudHJpZ2dlcihJbWFnZUl0ZW0uU2VsZWN0ZWQsIHRoaXMpO1xufTtcblxuSW1hZ2VJdGVtLnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZmlsZXM7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VJdGVtOyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIEltYWdlVmlldyhiYXNlUGF0aCwgb2JqKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJJbWFnZVZpZXdcIik7XG5cblx0dGhpcy5pbWFnZU9iamVjdCA9IG51bGw7XG5cdHRoaXMubm9JbWFnZSA9IG51bGw7XG5cdGlmKG9iaiAhPSBudWxsKSB7XG5cdFx0dGhpcy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQob2JqKTtcdFx0XG5cdFx0dGhpcy5pbWFnZU9iamVjdCA9IG9iajtcblx0fVxuXHRlbHNlIHtcblx0XHR0aGlzLmltYWdlT2JqZWN0ID0gbmV3IEltYWdlKCk7XG5cdFx0dGhpcy5pbWFnZU9iamVjdC5zcmMgPSBiYXNlUGF0aCArIFwiaW1nL25vX2ltYWdlLmpwZWdcIjtcblx0XHR0aGlzLmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLmltYWdlT2JqZWN0KTtcblx0XHQvL3RoaXMuaW1hZ2VPYmplY3QgPSBpbWc7XG5cdH1cbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoSW1hZ2VWaWV3LCBWaWV3KTtcblxuSW1hZ2VWaWV3LnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24odGV4dHVyZSkge1xuXHR0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVDaGlsZCh0aGlzLmltYWdlT2JqZWN0KTtcblx0dGhpcy5pbWFnZU9iamVjdCA9IHRleHR1cmU7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRleHR1cmUpO1xuXHR0aGlzLnVwZGF0ZUxheW91dCh0aGlzLncsIHRoaXMuaCk7XG59O1xuXG5JbWFnZVZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dGhpcy53ID0gd2lkdGg7XG5cdHRoaXMuaCA9IGhlaWdodDtcblx0dmFyIHcgPSB0aGlzLmltYWdlT2JqZWN0LmNsaWVudFdpZHRoID09IDAgPyB0aGlzLmltYWdlT2JqZWN0LndpZHRoIDogdGhpcy5pbWFnZU9iamVjdC5jbGllbnRXaWR0aDtcblx0dmFyIGggPSB0aGlzLmltYWdlT2JqZWN0LmNsaWVudEhlaWdodCA9PSAwID8gdGhpcy5pbWFnZU9iamVjdC5oZWlnaHQgOiB0aGlzLmltYWdlT2JqZWN0LmNsaWVudEhlaWdodDtcblx0aWYoKHcgPT0gMCkgfHwgKGggPT0gMCkpIHtcblx0XHR0aGlzLmltYWdlT2JqZWN0Lm9ubG9hZCA9IHRoaXMudXBkYXRlTGF5b3V0LmJpbmQodGhpcywgd2lkdGgsIGhlaWdodCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHdkaWZmID0gMDtcblx0dmFyIGhkaWZmID0gMDtcblx0aWYod2lkdGggPCB3KSB7XG5cdFx0d2RpZmYgPSBNYXRoLmFicyh3aWR0aCAtIHcpO1xuXHR9XG5cdGlmKGhlaWdodCA8IGgpIHtcblx0XHRoZGlmZiA9IE1hdGguYWJzKGhlaWdodCAtIGgpO1xuXHR9XG5cdGlmKChoZGlmZiA9PSAwKSAmJiAod2RpZmYgPT0gMCkpIHtcblx0XHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHRcdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUubGVmdCA9ICh3aWR0aCAtIHcpKjAuNSArIFwicHhcIjtcblx0XHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnRvcCA9IChoZWlnaHQgLSBoKSowLjUgKyBcInB4XCI7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHNjYWxlID0gMTtcblxuXHRzY2FsZSA9IGhlaWdodCAvIGg7XG5cdGlmKHNjYWxlKncgPiB3aWR0aCkge1xuXHRcdHNjYWxlID0gd2lkdGggLyB3O1xuXHR9XG5cdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUubXNUcmFuc2Zvcm0gPSBcInNjYWxlKFwiK3NjYWxlK1wiKVwiO1xuXHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoXCIrc2NhbGUrXCIpXCI7XG5cdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZShcIitzY2FsZStcIilcIjtcblxuXHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLmxlZnQgPSAod2lkdGggLSB3KSowLjUgKyBcInB4XCI7XG5cdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUudG9wID0gKGhlaWdodCAtIGgpKjAuNSArIFwicHhcIjtcblxuXHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlVmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIElucHV0VmlldygpIHtcblx0Vmlldy5jYWxsKHRoaXMsIFZpZXcuSW5wdXQsIFwiSW5wdXRWaWV3XCIpO1xuXG5cdHRoaXMuZ2V0RWxlbWVudCgpLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuXG5cdHRoaXMuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMub25CbHVyLmJpbmQodGhpcykpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhJbnB1dFZpZXcsIFZpZXcpO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoSW5wdXRWaWV3KTtcblxuSW5wdXRWaWV3LkNoYW5nZWQgPSBcIkNoYW5nZWRcIjtcblxuSW5wdXRWaWV3LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5nZXRFbGVtZW50KCkudmFsdWU7XG59O1xuXG5JbnB1dFZpZXcucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5nZXRFbGVtZW50KCkudmFsdWUgPSB2YWx1ZTtcbn07XG5cbklucHV0Vmlldy5wcm90b3R5cGUub25CbHVyID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudHJpZ2dlcihJbnB1dFZpZXcuQ2hhbmdlZCwgdGhpcyk7XG59O1xuXG5JbnB1dFZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR0aGlzLmhlaWdodCA9IGhlaWdodDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRWaWV3OyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG52YXIgVGV4dCA9IHJlcXVpcmUoXCIuL1RleHRcIik7XG5cbmZ1bmN0aW9uIExpc3RJdGVtKG5hbWUpIHtcblx0Vmlldy5jYWxsKHRoaXMsIFZpZXcuRGl2LCBcIkxpc3RJdGVtXCIpO1xuXG5cdHRoaXMuaGVhZGVyID0gbmV3IFZpZXcoKTtcblx0dGhpcy5hZGRDaGlsZCh0aGlzLmhlYWRlcik7XG5cdHRoaXMuaGVhZGVyLmJhY2tncm91bmQgPSBcIiNBQUFBQUFcIjtcblxuXG5cdHRoaXMuaGVhZGVyVGV4dCA9IG5ldyBUZXh0KG5hbWUpO1xuXHR0aGlzLmhlYWRlci5hZGRDaGlsZCh0aGlzLmhlYWRlclRleHQpO1xuXG5cdC8vdGhpcy50ZXh0LndpZHRoID0gNDAwO1xuXG5cbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoTGlzdEl0ZW0sIFZpZXcpO1xuXG5cblxuTGlzdEl0ZW0ucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dGhpcy5oZWFkZXJUZXh0LndpZHRoID0gd2lkdGg7XG5cdHRoaXMuaGVhZGVyVGV4dC5oZWlnaHQgPSAzMDtcblx0dGhpcy5oZWFkZXIud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWFkZXIuaGVpZ2h0ID0gMzA7XG5cdHRoaXMud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RJdGVtOyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcbnZhciBUZXh0ID0gcmVxdWlyZShcIi4vVGV4dFwiKTtcblxuZnVuY3Rpb24gTWVudUl0ZW0oaWQsIHN0cmluZykge1xuXHRWaWV3LmNhbGwodGhpcywgVmlldy5EaXYsIFwiTWVudUl0ZW1cIik7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XG5cblx0dGhpcy5pZCA9IGlkO1xuXHR0aGlzLnN0cmluZyA9IHN0cmluZztcblx0dGhpcy50ZXh0ID0gbmV3IFRleHQodGhpcy5zdHJpbmcpO1xuXG5cdHRoaXMuYWRkQ2hpbGQodGhpcy50ZXh0KTtcblxuXHR0aGlzLnNldFNlbGVjdGVkKGZhbHNlKTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoTWVudUl0ZW0sIFZpZXcpO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoTWVudUl0ZW0pO1xuXG5NZW51SXRlbS5DbGljayA9IFwiQ2xpY2tcIjtcblxuTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuXHR0aGlzLnRyaWdnZXIoTWVudUl0ZW0uQ2xpY2ssIHRoaXMpO1xufTtcblxuTWVudUl0ZW0ucHJvdG90eXBlLnNldFNlbGVjdGVkID0gZnVuY3Rpb24oc2VsZWN0ZWQpIHtcblx0dGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuXG5cdGlmKHRoaXMuc2VsZWN0ZWQpIHtcblx0XHR0aGlzLmJhY2tncm91bmQgPSBcIiNGRjAwMDBcIjtcblx0XHR0aGlzLnRleHQuY29sb3IgPSBcIiMwMDAwRkZcIlxuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuYmFja2dyb3VuZCA9IFwiIzAwMDAwMFwiO1xuXHRcdHRoaXMudGV4dC5jb2xvciA9IFwiI0ZGRkZGRlwiXG5cdH1cbn07XG5cbk1lbnVJdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdHRoaXMudGV4dC51cGRhdGVMYXlvdXQod2lkdGgsIGhlaWdodCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVJdGVtO1xuIiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcblxuZnVuY3Rpb24gTWVudVZpZXcoKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJNZW51Vmlld1wiKTtcblx0dGhpcy5oZWlnaHQgPSAxMDA7XG5cdHRoaXMuaXRlbXMgPSBbXTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoTWVudVZpZXcsIFZpZXcpO1xuXG5NZW51Vmlldy5wcm90b3R5cGUuc2V0SXRlbXMgPSBmdW5jdGlvbihpdGVtcykge1xuXHR2YXIgeCA9IDA7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gaXRlbXNbaV07XG5cdFx0dGhpcy5hZGRDaGlsZChpdGVtKTtcblx0XHRpdGVtLnggPSB4O1xuXHRcdHggKz0gaXRlbS53aWR0aDtcblx0fVxuXHR0aGlzLml0ZW1zID0gaXRlbXM7XG59O1xuXG5NZW51Vmlldy5wcm90b3R5cGUuYWRkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0dmFyIHggPSAwO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuaXRlbXNbaV0ueCA9IHg7XG5cdFx0eCArPSB0aGlzLml0ZW1zW2ldLndpZHRoO1xuXHR9XG5cdHRoaXMuYWRkQ2hpbGQoaXRlbSk7XG5cdGl0ZW0ueCA9IHg7XG5cdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbn07XG5cbk1lbnVWaWV3LnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdHZhciB4ID0gMDtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHRoaXMuaXRlbXNbaV07XG5cdFx0aXRlbS54ID0geDtcblx0XHRpdGVtLnVwZGF0ZUxheW91dCh3aWR0aCAvIHRoaXMuaXRlbXMubGVuZ3RoLCBoZWlnaHQpO1xuXHRcdHggKz0gaXRlbS53aWR0aDtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZW51VmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgTGlzdEl0ZW0gPSByZXF1aXJlKFwiLi9MaXN0SXRlbVwiKTtcbnZhciBJbnB1dFZpZXcgPSByZXF1aXJlKFwiLi9JbnB1dFZpZXdcIik7XG52YXIgVGV4dCA9IHJlcXVpcmUoXCIuL1RleHRcIik7XG5cbmZ1bmN0aW9uIFBvc2l0aW9uSXRlbShpZCwgdmFsdWVzKSB7XG5cdExpc3RJdGVtLmNhbGwodGhpcywgaWQpO1xuXG5cdHRoaXMuaWQgPSBpZDtcblxuXG5cdHRoaXMudGV4dFggPSBuZXcgVGV4dChcIng6XCIpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMudGV4dFgpXG5cdHRoaXMuaW5wdXRYID0gbmV3IElucHV0VmlldygpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMuaW5wdXRYKTtcblx0dGhpcy5pbnB1dFguc2V0VmFsdWUodmFsdWVzID8gdmFsdWVzWzBdIDogXCIwXCIpO1xuXG5cdHRoaXMudGV4dFkgPSBuZXcgVGV4dChcInk6XCIpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMudGV4dFkpXG5cdHRoaXMuaW5wdXRZID0gbmV3IElucHV0VmlldygpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMuaW5wdXRZKTtcblx0dGhpcy5pbnB1dFkuc2V0VmFsdWUodmFsdWVzID8gdmFsdWVzWzFdIDogXCIwXCIpO1xuXG5cdHRoaXMuaW5wdXRYLmFkZEV2ZW50TGlzdGVuZXIoSW5wdXRWaWV3LkNoYW5nZWQsIHRoaXMub25DaGFuZ2VkLCB0aGlzKTtcblx0dGhpcy5pbnB1dFkuYWRkRXZlbnRMaXN0ZW5lcihJbnB1dFZpZXcuQ2hhbmdlZCwgdGhpcy5vbkNoYW5nZWQsIHRoaXMpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhQb3NpdGlvbkl0ZW0sIExpc3RJdGVtKTtcbkV2ZW50RGlzcGF0Y2hlci5pbml0KFBvc2l0aW9uSXRlbSk7XG5cblxuUG9zaXRpb25JdGVtLkNoYW5nZWQgPSBcIkNoYW5nZWRcIjtcblxuUG9zaXRpb25JdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdExpc3RJdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KTtcblx0dGhpcy50ZXh0WC51cGRhdGVMYXlvdXQod2lkdGgqMC4yNSwgaGVpZ2h0IC0gdGhpcy5oZWFkZXIuaGVpZ2h0KTtcblx0dGhpcy50ZXh0WS51cGRhdGVMYXlvdXQod2lkdGgqMC4yNSwgaGVpZ2h0IC0gdGhpcy5oZWFkZXIuaGVpZ2h0KTtcblx0dGhpcy5pbnB1dFgudXBkYXRlTGF5b3V0KHdpZHRoKjAuMjUsIGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCk7XG5cdHRoaXMuaW5wdXRZLnVwZGF0ZUxheW91dCh3aWR0aCowLjI1LCBoZWlnaHQgLSB0aGlzLmhlYWRlci5oZWlnaHQpO1xuXG5cdHRoaXMudGV4dFgueCA9IDA7IFxuXHR0aGlzLmlucHV0WC54ID0gd2lkdGgqMC4yNTtcblxuXHR0aGlzLnRleHRZLnggPSB3aWR0aCowLjU7XG5cdHRoaXMuaW5wdXRZLnggPSB3aWR0aCowLjc1O1xuXG5cdHRoaXMudGV4dFgueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0dGhpcy50ZXh0WS55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXHR0aGlzLmlucHV0WC55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXHR0aGlzLmlucHV0WS55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xufTtcblxuUG9zaXRpb25JdGVtLnByb3RvdHlwZS5vbkNoYW5nZWQgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50cmlnZ2VyKFBvc2l0aW9uSXRlbS5DaGFuZ2VkLCB0aGlzKTtcbn07XG5cblBvc2l0aW9uSXRlbS5wcm90b3R5cGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiBbdGhpcy5pbnB1dFguZ2V0VmFsdWUoKSwgdGhpcy5pbnB1dFkuZ2V0VmFsdWUoKV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc2l0aW9uSXRlbTsiLCJ2YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcInlhZWRcIik7XG52YXIgUmVzb3VyY2VJdGVtVmlldyA9IHJlcXVpcmUoXCIuL1Jlc291cmNlSXRlbVZpZXdcIik7XG5cbi8qKlxuICogVGhlIHZpZXcgb2Ygb25lIHJlc291cmNlIGNhdGVnb3J5LlxuICogQGNsYXNzIFJlc291cmNlQ2F0ZWdvcnlWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlQ2F0ZWdvcnlWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnRpdGxlID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcblx0dGhpcy50aXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vblRpdGxlQ2xpY2suYmluZCh0aGlzKSk7XG5cblx0dmFyIGljb24gPSBuZXcgeG5vZGUuRGl2KCk7XG5cdGljb24uY2xhc3NOYW1lID0gXCJkcm9wZG93biBpY29uXCI7XG5cdHRoaXMudGl0bGUuYXBwZW5kQ2hpbGQoaWNvbik7XG5cblx0dGhpcy50aXRsZVNwYW4gPSBuZXcgeG5vZGUuU3BhbigpO1xuXHR0aGlzLnRpdGxlLmFwcGVuZENoaWxkKHRoaXMudGl0bGVTcGFuKTtcblxuXHR0aGlzLmNvbnRlbnQgPSBuZXcgeG5vZGUuRGl2KCk7XG5cdHRoaXMuY29udGVudC5jbGFzc05hbWUgPSBcImNvbnRlbnRcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuXG5cdHRoaXMuZGVzY3JpcHRpb25QID0gbmV3IHhub2RlLlAoKTtcblx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb25QKTtcblxuXHR0aGlzLml0ZW1UYWJsZSA9IG5ldyB4bm9kZS5UYWJsZSgpO1xuXHR0aGlzLml0ZW1UYWJsZS5jbGFzc05hbWUgPSBcInVpIHRhYmxlIHVuc3RhY2thYmxlIGRlZmluaXRpb25cIjtcblx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuaXRlbVRhYmxlKTtcblxuXHR0aGlzLml0ZW1UYWJsZUJvZHkgPSBuZXcgeG5vZGUuVGJvZHkoKTtcblx0dGhpcy5pdGVtVGFibGUuYXBwZW5kQ2hpbGQodGhpcy5pdGVtVGFibGVCb2R5KTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VDYXRlZ29yeVZpZXcsIHhub2RlLkRpdik7XG5FdmVudERpc3BhdGNoZXIuaW5pdChSZXNvdXJjZUNhdGVnb3J5Vmlldyk7XG5cbi8qKlxuICogU2V0IHRoZSBsYWJlbC5cbiAqIEBtZXRob2Qgc2V0TGFiZWxcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeVZpZXcucHJvdG90eXBlLnNldExhYmVsID0gZnVuY3Rpb24obGFiZWwpIHtcblx0dGhpcy50aXRsZVNwYW4uaW5uZXJIVE1MID0gbGFiZWw7XG59XG5cbi8qKlxuICogU2hvdWxkIHRoaXMgYmUgYWN0aXZlIG9yIG5vdD9cbiAqIEBtZXRob2Qgc2V0QWN0aXZlXG4gKi9cblJlc291cmNlQ2F0ZWdvcnlWaWV3LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbihhY3RpdmUpIHtcblx0aWYgKGFjdGl2ZSkge1xuXHRcdHRoaXMudGl0bGUuY2xhc3NOYW1lID0gXCJhY3RpdmUgdGl0bGVcIjtcblx0XHR0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gXCJhY3RpdmUgY29udGVudFwiO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMudGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuXHRcdHRoaXMuY29udGVudC5jbGFzc05hbWUgPSBcImNvbnRlbnRcIjtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBkZXNjcmlwdGlvbi5cbiAqIEBtZXRob2Qgc2V0RGVzY3JpcHRpb25cbiAqL1xuUmVzb3VyY2VDYXRlZ29yeVZpZXcucHJvdG90eXBlLnNldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcblx0dGhpcy5kZXNjcmlwdGlvblAuaW5uZXJIVE1MID0gZGVzY3JpcHRpb247XG59XG5cbi8qKlxuICogVGhlIHRpdGxlIHdhcyBjbGlja2VkLiBEaXNwYXRjaCBmdXJ0aGVyLlxuICogQG1ldGhvZCBvblRpdGxlQ2xpY2tcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeVZpZXcucHJvdG90eXBlLm9uVGl0bGVDbGljayA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRyaWdnZXIoXCJ0aXRsZUNsaWNrXCIpO1xufVxuXG4vKipcbiAqIEdldCBob2xkZXIgZm9yIHRoZSBpdGVtcy5cbiAqIEBtZXRob2QgZ2V0SXRlbUhvbGRlclxuICovXG5SZXNvdXJjZUNhdGVnb3J5Vmlldy5wcm90b3R5cGUuZ2V0SXRlbUhvbGRlciA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5pdGVtVGFibGVCb2R5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlQ2F0ZWdvcnlWaWV3OyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBDb2xvclV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ29sb3JVdGlsXCIpO1xuXG4vKipcbiAqIFRoZSB2YWx1ZSB2aWV3IGZvciBhIGNvbG9yLiBUaGlzIHNob3VsZCBoYXZlIGEgY29sb3IgcGlja2VyIVxuICogQ2FuZGlkYXRlczpcbiAqICAgLSBodHRwOi8vd3d3LmRpZ2l0YWxtYWdpY3Byby5jb20valBpY2tlci9cbiAqIEBjbGFzcyBSZXNvdXJjZUNvbG9yVmFsdWVWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlQ29sb3JWYWx1ZVZpZXcoKSB7XG5cdHhub2RlLkRpdi5jYWxsKHRoaXMpO1xuXG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldyA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUuaGVpZ2h0ID0gXCIyNXB4XCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS53aWR0aCA9IFwiNzBweFwiO1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUudG9wID0gXCIxMnB4XCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjZmYwMDAwXCJcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNXB4XCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5wYWRkaW5nID0gXCIzcHhcIjtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjZTBlMGUwXCI7XG5cblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmRlZmF1bHRWYWx1ZVZpZXcpO1xuXG5cdHRoaXMudmFsdWVJbnB1dCA9IG5ldyB4bm9kZS5JbnB1dCgpO1xuXHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMudmFsdWVJbnB1dC5zdHlsZS5sZWZ0ID0gXCJjYWxjKDUwJSAtIDEwcHgpXCI7XG5cdHRoaXMudmFsdWVJbnB1dC5zdHlsZS5oZWlnaHQgPSBcIjI1cHhcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLndpZHRoID0gXCI3MHB4XCI7XG5cdHRoaXMudmFsdWVJbnB1dC5zdHlsZS50b3AgPSBcIjEycHhcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLmJhY2tncm91bmQgPSBcIiNmZjAwMDBcIlxuXHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjNweFwiO1xuXHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNlMGUwZTBcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLm91dGxpbmUgPSAwO1xuXG5cdHRoaXMudmFsdWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRoaXMub25WYWx1ZUlucHV0Q2hhbmdlLmJpbmQodGhpcykpO1xuXG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy52YWx1ZUlucHV0KTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VDb2xvclZhbHVlVmlldywgeG5vZGUuRGl2KTtcblxuLyoqXG4gKiBTZXQgY29sb3IgdmFsdWUgZm9yIGRlZmF1bHQuXG4gKiBAbWV0aG9kIHNldERlZmF1bHRWYWx1ZVxuICovXG5SZXNvdXJjZUNvbG9yVmFsdWVWaWV3LnByb3RvdHlwZS5zZXREZWZhdWx0VmFsdWUgPSBmdW5jdGlvbihkZWZhdWx0VmFsdWUpIHtcblx0dGhpcy5kZWZhdWx0VmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5pbm5lckhUTUwgPSBkZWZhdWx0VmFsdWU7XG5cdHRoaXMudXBkYXRlQmFja2dyb3VuZENvbG9ycygpO1xufVxuXG4vKipcbiAqIFNldCBjb2xvciB2YWx1ZSBmb3IgY3VycmVudC5cbiAqIEBtZXRob2Qgc2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VDb2xvclZhbHVlVmlldy5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdHRoaXMudmFsdWVJbnB1dC52YWx1ZSA9IHZhbHVlO1xuXHR0aGlzLnVwZGF0ZUJhY2tncm91bmRDb2xvcnMoKTtcbn1cblxuLyoqXG4gKiBWYWx1ZSBpbnB1dCBjaGFuZ2UuXG4gKiBAbWV0aG9kIG9uVmFsdWVJbnB1dENoYW5nZVxuICovXG5SZXNvdXJjZUNvbG9yVmFsdWVWaWV3LnByb3RvdHlwZS5vblZhbHVlSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR0aGlzLnZhbHVlID0gdGhpcy52YWx1ZUlucHV0LnZhbHVlO1xuXHR0aGlzLnVwZGF0ZUJhY2tncm91bmRDb2xvcnMoKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYmFja2dyb3VuZCBjb2xvcnMuXG4gKiBAbWV0aG9kIHVwZGF0ZUJhY2tncm91bmRDb2xvcnNcbiAqIEBwcml2YXRlXG4gKi9cblJlc291cmNlQ29sb3JWYWx1ZVZpZXcucHJvdG90eXBlLnVwZGF0ZUJhY2tncm91bmRDb2xvcnMgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcblxuXHR2YXIgYyA9IENvbG9yVXRpbC5wYXJzZUhUTUxDb2xvcih0aGlzLmRlZmF1bHRWYWx1ZSk7XG5cdHZhciBhdmcgPSAoYy5yZWQgKyBjLmdyZWVuICsgYy5ibHVlKSAvIDM7XG5cblx0aWYgKGF2ZyA+IDEyOClcblx0XHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUuY29sb3IgPSBcIiMwMDAwMDBcIjtcblxuXHRlbHNlXG5cdFx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLmNvbG9yID0gXCIjZmZmZmZmXCI7XG5cblx0dmFyIHVzZVZhbHVlID0gdGhpcy52YWx1ZTtcblxuXHRpZiAoIXVzZVZhbHVlIHx8IHVzZVZhbHVlWzBdICE9IFwiI1wiKVxuXHRcdHVzZVZhbHVlID0gXCIjZmZmZmZmXCJcblxuXHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUuYmFja2dyb3VuZCA9IHVzZVZhbHVlO1xuXG5cdHZhciBjID0gQ29sb3JVdGlsLnBhcnNlSFRNTENvbG9yKHVzZVZhbHVlKTtcblx0dmFyIGF2ZyA9IChjLnJlZCArIGMuZ3JlZW4gKyBjLmJsdWUpIC8gMztcblxuXHRpZiAoYXZnID4gMTI4KVxuXHRcdHRoaXMudmFsdWVJbnB1dC5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xuXG5cdGVsc2Vcblx0XHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZUNvbG9yVmFsdWVWaWV3OyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcblxuLyoqXG4gKiBWaWV3IGFuZCBlZGl0IHRoZSB2YWx1ZSBvZiBhbiBpbWFnZS5cbiAqIEBtZXRob2QgUmVzb3VyY2VJbWFnZVZhbHVlVmlld1xuICovXG5mdW5jdGlvbiBSZXNvdXJjZUltYWdlVmFsdWVWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLmRlZmF1bHRJbWFnZSA9IG5ldyB4bm9kZS5JbWcoKTtcblx0dGhpcy5kZWZhdWx0SW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMuZGVmYXVsdEltYWdlLnN0eWxlLnRvcCA9IFwiMTBweFwiO1xuXHR0aGlzLmRlZmF1bHRJbWFnZS5zdHlsZS5oZWlnaHQgPSBcIjMwcHhcIjtcblx0dGhpcy5kZWZhdWx0SW1hZ2Uuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmRlZmF1bHRJbWFnZSk7XG5cblx0dGhpcy52YWx1ZUltYWdlID0gbmV3IHhub2RlLkltZygpO1xuXHR0aGlzLnZhbHVlSW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMudmFsdWVJbWFnZS5zdHlsZS50b3AgPSBcIjEwcHhcIjtcblx0dGhpcy52YWx1ZUltYWdlLnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuXHR0aGlzLnZhbHVlSW1hZ2Uuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcblx0dGhpcy52YWx1ZUltYWdlLnN0eWxlLmxlZnQgPSBcImNhbGMoNTAlIC0gMTBweClcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLnZhbHVlSW1hZ2UpO1xuXG5cdHRoaXMudXBsb2FkSW5wdXQgPSBuZXcgeG5vZGUuSW5wdXQoKTtcblx0dGhpcy51cGxvYWRJbnB1dC50eXBlID0gXCJmaWxlXCI7XG5cdHRoaXMudXBsb2FkSW5wdXQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMudXBsb2FkSW5wdXQuc3R5bGUuekluZGV4ID0gMjtcblx0dGhpcy51cGxvYWRJbnB1dC5zdHlsZS5vcGFjaXR5ID0gMDtcblx0dGhpcy51cGxvYWRJbnB1dC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHR0aGlzLnVwbG9hZElucHV0LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXG5cdHRoaXMudXBsb2FkQnV0dG9uID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnVwbG9hZEJ1dHRvbi5jbGFzc05hbWUgPSBcInVpIGljb24gYnV0dG9uIG1pbmlcIjtcblxuXHR0aGlzLnVwbG9hZEljb249bmV3IHhub2RlLkkoKTtcblx0dGhpcy51cGxvYWRJY29uLmNsYXNzTmFtZT1cInVwbG9hZCBpY29uXCI7XG5cdHRoaXMudXBsb2FkQnV0dG9uLmFwcGVuZENoaWxkKHRoaXMudXBsb2FkSWNvbik7XG5cblx0dGhpcy51cGxvYWREaXYgPSBuZXcgeG5vZGUuRGl2KCk7XG5cdHRoaXMudXBsb2FkRGl2LmFwcGVuZENoaWxkKHRoaXMudXBsb2FkSW5wdXQpO1xuXHR0aGlzLnVwbG9hZERpdi5hcHBlbmRDaGlsZCh0aGlzLnVwbG9hZEJ1dHRvbik7XG5cdHRoaXMudXBsb2FkRGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLnVwbG9hZERpdi5zdHlsZS50b3AgPSBcIjEzcHhcIjtcblx0dGhpcy51cGxvYWREaXYuc3R5bGUucmlnaHQgPSBcIjEwcHhcIjtcblx0dGhpcy51cGxvYWREaXYuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIjtcblxuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMudXBsb2FkRGl2KTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VJbWFnZVZhbHVlVmlldywgeG5vZGUuRGl2KTtcblxuLyoqXG4gKiBTZXQgdXJsIG9mIHRoZSBpbWFnZSB0byBiZSBzaG93biBhcyBkZWZhdWx0XG4gKiBAbWV0aG9kIHNldERlZmF1bHRWYWx1ZVxuICovXG5SZXNvdXJjZUltYWdlVmFsdWVWaWV3LnByb3RvdHlwZS5zZXREZWZhdWx0VmFsdWUgPSBmdW5jdGlvbihkZWZhdWx0VmFsdWUpIHtcblx0dGhpcy5kZWZhdWx0SW1hZ2Uuc3JjID0gZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIFNldCB1cmwgb2YgaW1hZ2UgdG8gYXBwZWFyIGFzIHZhbHVlLlxuICogQG1ldGhvZCBzZXRWYWx1ZVxuICovXG5SZXNvdXJjZUltYWdlVmFsdWVWaWV3LnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMudmFsdWVJbWFnZS5zcmMgPSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZUltYWdlVmFsdWVWaWV3OyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBSZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3ID0gcmVxdWlyZShcIi4vUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlld1wiKTtcbnZhciBSZXNvdXJjZUltYWdlVmFsdWVWaWV3ID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJbWFnZVZhbHVlVmlld1wiKTtcbnZhciBSZXNvdXJjZUNvbG9yVmFsdWVWaWV3ID0gcmVxdWlyZShcIi4vUmVzb3VyY2VDb2xvclZhbHVlVmlld1wiKTtcblxuLyoqXG4gKiBTaG93IGEgdGFibGUgcm93IGZvciBlYWNoIHJlc291cmNlIGl0ZW0uXG4gKiBAY2xhc3MgUmVzb3VyY2VJdGVtVmlld1xuICovXG5mdW5jdGlvbiBSZXNvdXJjZUl0ZW1WaWV3KCkge1xuXHR4bm9kZS5Uci5jYWxsKHRoaXMpO1xuXG5cdHRoaXMuc3R5bGUuaGVpZ2h0ID0gXCI1MHB4XCI7XG5cblx0dGhpcy5rZXlUZCA9IG5ldyB4bm9kZS5UZCgpO1xuXHR0aGlzLmtleVRkLnN0eWxlLndpZHRoID0gXCI1MCVcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmtleVRkKTtcblxuXHR0aGlzLnZhbHVlVGQgPSBuZXcgeG5vZGUuVGQoKTtcblx0dGhpcy52YWx1ZVRkLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXHR0aGlzLnZhbHVlVGQuc3R5bGUud2lkdGggPSBcIjUwJVwiO1xuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMudmFsdWVUZCk7XG5cblx0dGhpcy52YWx1ZVZpZXcgPSBudWxsO1xuXHR0aGlzLml0ZW1UeXBlID0gbnVsbDtcblx0dGhpcy52YWx1ZSA9IG51bGw7XG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gbnVsbDtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VJdGVtVmlldywgeG5vZGUuVHIpO1xuXG4vKipcbiAqIFNldCBrZXkuIFdpbGwgYXBwZWFyIGluIHRoZSBsZWZ0IGNvbHVtbi5cbiAqL1xuUmVzb3VyY2VJdGVtVmlldy5wcm90b3R5cGUuc2V0S2V5ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5rZXlUZC5pbm5lckhUTUwgPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBTZXQgYWJzdHJhY3QgdmFsdWUgdG8gYXBwZWFyIGFzIGRlZmF1bHQgdmFsdWUuXG4gKiBAbWV0aG9kIHNldERlZmF1bHRWYWx1ZVxuICovXG5SZXNvdXJjZUl0ZW1WaWV3LnByb3RvdHlwZS5zZXREZWZhdWx0VmFsdWUgPSBmdW5jdGlvbihkZWZhdWx0VmFsdWUpIHtcblx0dGhpcy5kZWZhdWx0VmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cblx0aWYgKHRoaXMudmFsdWVWaWV3KVxuXHRcdHRoaXMudmFsdWVWaWV3LnNldERlZmF1bHRWYWx1ZSh0aGlzLmRlZmF1bHRWYWx1ZSk7XG59XG5cbi8qKlxuICogU2V0IGFic3RyYWN0IHZhbHVlIHRvIGFwcGVhciBpbiB0aGUgdmFsdWUgY29sdW1uLlxuICogQG1ldGhvZCBzZXRWYWx1ZVxuICovXG5SZXNvdXJjZUl0ZW1WaWV3LnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuXHRpZiAodGhpcy52YWx1ZVZpZXcpXG5cdFx0dGhpcy52YWx1ZVZpZXcuc2V0VmFsdWUodGhpcy52YWx1ZSk7XG59XG5cbi8qKlxuICogU2V0IHRoZSB0eXBlIG9mIHRoZSBpdGVtLiBUaGlzIHdpbGwgY3JlYXRlIGEgdmFsdWVcbiAqIHZpZXcgYW5kIHBvcHVsYXRlIHRoZSByaWdodCBzaWRlIG9mIHRoZSB0YWJsZS5cbiAqIEBtZXRob2Qgc2V0SXRlbVR5cGVcbiAqL1xuUmVzb3VyY2VJdGVtVmlldy5wcm90b3R5cGUuc2V0SXRlbVR5cGUgPSBmdW5jdGlvbihpdGVtVHlwZSkge1xuXHRpZiAoaXRlbVR5cGUgPT0gdGhpcy5pdGVtVHlwZSlcblx0XHRyZXR1cm47XG5cblx0aWYgKHRoaXMudmFsdWVWaWV3KVxuXHRcdHRoaXMudmFsdWVUZC5yZW1vdmVDaGlsZCh0aGlzLnZhbHVlVmlldyk7XG5cblx0dGhpcy52YWx1ZVZpZXcgPSBudWxsO1xuXHR0aGlzLml0ZW1UeXBlID0gaXRlbVR5cGU7XG5cblx0c3dpdGNoICh0aGlzLml0ZW1UeXBlKSB7XG5cdFx0Y2FzZSBcInBvc2l0aW9uXCI6XG5cdFx0XHR0aGlzLnZhbHVlVmlldyA9IG5ldyBSZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3KCk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgXCJpbWFnZVwiOlxuXHRcdFx0dGhpcy52YWx1ZVZpZXcgPSBuZXcgUmVzb3VyY2VJbWFnZVZhbHVlVmlldygpO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiY29sb3JcIjpcblx0XHRcdHRoaXMudmFsdWVWaWV3ID0gbmV3IFJlc291cmNlQ29sb3JWYWx1ZVZpZXcoKTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0aWYgKHRoaXMudmFsdWVWaWV3KSB7XG5cdFx0dGhpcy52YWx1ZVRkLmFwcGVuZENoaWxkKHRoaXMudmFsdWVWaWV3KTtcblx0XHR0aGlzLnZhbHVlVmlldy5zZXREZWZhdWx0VmFsdWUodGhpcy5kZWZhdWx0VmFsdWUpO1xuXHRcdHRoaXMudmFsdWVWaWV3LnNldFZhbHVlKHRoaXMudmFsdWUpO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VJdGVtVmlldzsiLCJ2YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcblxuLyoqXG4gKiBUaGUgbGVmdCBwYXJ0IG9mIHRoZSBhcHAsIHNob3dpbmcgdGhlIHJlc291cmNlcy5cbiAqIEBjbGFzcyBSZXNvdXJjZVBhbmVWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlUGFuZVZpZXcoKSB7XG5cdHhub2RlLkRpdi5jYWxsKHRoaXMpO1xuXG5cdHRoaXMuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMuc3R5bGUudG9wID0gXCI2MHB4XCI7XG5cdHRoaXMuc3R5bGUubGVmdCA9IFwiMTBweFwiO1xuXHR0aGlzLnN0eWxlLndpZHRoID0gXCJjYWxjKDUwJSAtIDE1cHgpXCI7XG5cdHRoaXMuc3R5bGUuYm90dG9tID0gXCIxMHB4XCI7XG5cblx0dGhpcy50YWJIZWFkZXJzID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnRhYkhlYWRlcnMuY2xhc3NOYW1lID0gXCJ1aSB0b3AgYXR0YWNoZWQgdGFidWxhciBtZW51XCI7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy50YWJIZWFkZXJzKTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VQYW5lVmlldywgeG5vZGUuRGl2KTtcblxuLyoqXG4gKiBHZXQgaG9sZGVyIGZvciB0aGUgdGFiIGhlYWRlcnMuXG4gKiBAbWV0aG9kIGdldFRhYkhlYWRlckhvbGRlclxuICovXG5SZXNvdXJjZVBhbmVWaWV3LnByb3RvdHlwZS5nZXRUYWJIZWFkZXJIb2xkZXIgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMudGFiSGVhZGVycztcbn1cblxuLyoqXG4gKiBHZXQgdGFiIGhvbGRlci5cbiAqIEBtZXRob2QgZ2V0VGFiSG9sZGVyXG4gKi9cblJlc291cmNlUGFuZVZpZXcucHJvdG90eXBlLmdldFRhYkhvbGRlciA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZVBhbmVWaWV3OyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcblxuLyoqXG4gKiBUaGUgdmFsdWUgdmlldyBmb3IgYSBwb3NpdGlvbi5cbiAqIEBjbGFzcyBSZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlUG9zaXRpb25WYWx1ZVZpZXcoKSB7XG5cdHhub2RlLkRpdi5jYWxsKHRoaXMpO1xuXG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldyA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUud2lkdGggPSBcIjUwJVwiO1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUudG9wID0gXCIxNXB4XCI7XG5cblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmRlZmF1bHRWYWx1ZVZpZXcpO1xuXG5cdHRoaXMudmFsdWVEaXYgPSBuZXcgeG5vZGUuRGl2KCk7XG5cdHRoaXMudmFsdWVEaXYuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMudmFsdWVEaXYuc3R5bGUucmlnaHQgPSBcIjEwcHhcIjtcblx0dGhpcy52YWx1ZURpdi5zdHlsZS50b3AgPSBcIjEwcHhcIjtcblx0dGhpcy52YWx1ZURpdi5zdHlsZS53aWR0aCA9IFwiNTAlXCI7XG5cblx0dGhpcy52YWx1ZURpdi5jbGFzc05hbWUgPSBcInVpIGlucHV0IGZsdWlkIG1pbmlcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLnZhbHVlRGl2KTtcblxuXHR0aGlzLnZhbHVlSW5wdXQgPSBuZXcgeG5vZGUuSW5wdXQoKTtcblx0dGhpcy52YWx1ZUlucHV0LnR5cGUgPSBcInRleHRcIjtcblx0dGhpcy52YWx1ZURpdi5hcHBlbmRDaGlsZCh0aGlzLnZhbHVlSW5wdXQpO1xufVxuXG5pbmhlcml0cyhSZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3LCB4bm9kZS5EaXYpO1xuXG4vKipcbiAqIFNldCBwb3NpdGlvbiB2YWx1ZSBmb3IgZGVmYXVsdC5cbiAqIEBtZXRob2Qgc2V0RGVmYXVsdFZhbHVlXG4gKi9cblJlc291cmNlUG9zaXRpb25WYWx1ZVZpZXcucHJvdG90eXBlLnNldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGRlZmF1bHRWYWx1ZSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuaW5uZXJIVE1MID0gZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIFNldCBwb3NpdGlvbiB2YWx1ZSBmb3IgY3VycmVudC5cbiAqIEBtZXRob2Qgc2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlldy5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR0aGlzLnZhbHVlSW5wdXQudmFsdWUgPSB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3OyIsInZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcblxuLyoqXG4gKiBUaGUgdGFiIGhlYWRlci5cbiAqIEBjbGFzcyBSZXNvdXJjZVRhYkhlYWRlclZpZXdcbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VUYWJIZWFkZXJWaWV3KCkge1xuXHR4bm9kZS5BLmNhbGwodGhpcyk7XG5cdHRoaXMuY2xhc3NOYW1lID0gXCJpdGVtXCI7XG59XG5cbmluaGVyaXRzKFJlc291cmNlVGFiSGVhZGVyVmlldywgeG5vZGUuQSk7XG5cbi8qKlxuICogU2V0IGxhYmVsLlxuICogQGNsYXNzIHNldExhYmVsXG4gKi9cblJlc291cmNlVGFiSGVhZGVyVmlldy5wcm90b3R5cGUuc2V0TGFiZWwgPSBmdW5jdGlvbihsYWJlbCkge1xuXHR0aGlzLmlubmVySFRNTCA9IGxhYmVsO1xufVxuXG4vKipcbiAqIFNldCBhY3RpdmUgc3RhdGUuXG4gKiBAY2xhc3Mgc2V0QWN0aXZlXG4gKi9cblJlc291cmNlVGFiSGVhZGVyVmlldy5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24oYWN0aXZlKSB7XG5cdGlmIChhY3RpdmUpXG5cdFx0dGhpcy5jbGFzc05hbWUgPSBcImFjdGl2ZSBpdGVtXCI7XG5cblx0ZWxzZVxuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJpdGVtXCI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VUYWJIZWFkZXJWaWV3OyIsInZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciB4bm9kZWMgPSByZXF1aXJlKFwieG5vZGVjb2xsZWN0aW9uXCIpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIFJlc291cmNlQ2F0ZWdvcnlWaWV3ID0gcmVxdWlyZShcIi4vUmVzb3VyY2VDYXRlZ29yeVZpZXdcIik7XG5cbi8qKlxuICogVGhlIHZpZXcgZm9yIHRoZSBjb250ZW50IHRoYXQgZ29lcyBpbnRvIG9uZSB0YWIuXG4gKiBAY2xhc3MgUmVzb3VyY2VUYWJWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlVGFiVmlldygpIHtcblx0eG5vZGUuRGl2LmNhbGwodGhpcyk7XG5cdHRoaXMuY2xhc3NOYW1lID0gXCJ1aSBib3R0b20gYXR0YWNoZWQgYWN0aXZlIHRhYiBzZWdtZW50XCI7XG5cblx0dGhpcy5pbm5lciA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy5pbm5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0dGhpcy5pbm5lci5zdHlsZS5oZWlnaHQgPSBcImNhbGMoMTAwJSAtIDY1cHgpXCI7XG5cdHRoaXMuaW5uZXIuc3R5bGUucGFkZGluZyA9IFwiMXB4XCI7XG5cdHRoaXMuaW5uZXIuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmlubmVyKTtcblxuXHR0aGlzLmRlc2NyaXB0aW9uUCA9IG5ldyB4bm9kZS5QKCk7XG5cdHRoaXMuaW5uZXIuYXBwZW5kQ2hpbGQodGhpcy5kZXNjcmlwdGlvblApO1xuXG5cdHRoaXMuYWNjb3JkaW9uID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLmFjY29yZGlvbi5jbGFzc05hbWUgPSBcInVpIHN0eWxlZCBmbHVpZCBhY2NvcmRpb25cIjtcblx0dGhpcy5pbm5lci5hcHBlbmRDaGlsZCh0aGlzLmFjY29yZGlvbik7XG5cblx0dGhpcy5pdGVtVGFibGUgPSBuZXcgeG5vZGUuVGFibGUoKTtcblx0dGhpcy5pdGVtVGFibGUuY2xhc3NOYW1lID0gXCJ1aSB0YWJsZSB1bnN0YWNrYWJsZSBkZWZpbml0aW9uXCI7XG5cdHRoaXMuaW5uZXIuYXBwZW5kQ2hpbGQodGhpcy5pdGVtVGFibGUpO1xuXG5cdHRoaXMuaXRlbVRhYmxlQm9keSA9IG5ldyB4bm9kZS5UYm9keSgpO1xuXHR0aGlzLml0ZW1UYWJsZS5hcHBlbmRDaGlsZCh0aGlzLml0ZW1UYWJsZUJvZHkpO1xufVxuXG5pbmhlcml0cyhSZXNvdXJjZVRhYlZpZXcsIHhub2RlLkRpdik7XG5cbi8qKlxuICogU2hvdWxkIHRoaXMgYmUgdGhlIGFjdGl2ZSB0YWI/XG4gKiBAbWV0aG9kIHNldEFjdGl2ZVxuICovXG5SZXNvdXJjZVRhYlZpZXcucHJvdG90eXBlLnNldEFjdGl2ZSA9IGZ1bmN0aW9uKGFjdGl2ZSkge1xuXHRpZiAoYWN0aXZlKSB7XG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJ1aSBib3R0b20gYXR0YWNoZWQgYWN0aXZlIHRhYiBzZWdtZW50IGFjdGl2ZVwiO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJ1aSBib3R0b20gYXR0YWNoZWQgYWN0aXZlIHRhYiBzZWdtZW50XCI7XG5cdH1cbn1cblxuLyoqXG4gKiBTZXQgZGVzY3JpcHRpb24uXG4gKiBAbWV0aG9kIHNldERlc2NyaXB0aW9uXG4gKi9cblJlc291cmNlVGFiVmlldy5wcm90b3R5cGUuc2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuXHR0aGlzLmRlc2NyaXB0aW9uUC5pbm5lckhUTUwgPSBkZXNjcmlwdGlvbjtcbn1cblxuLyoqXG4gKiBHZXQgZGl2IGhvbGRpbmcgdGhlIGNhdGVnb3JpZXMuXG4gKiBAbWV0aG9kIGdldENhdGVnb3J5SG9sZGVyXG4gKi9cblJlc291cmNlVGFiVmlldy5wcm90b3R5cGUuZ2V0Q2F0ZWdvcnlIb2xkZXIgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuYWNjb3JkaW9uO1xufVxuXG4vKipcbiAqIEdldCBob2xkZXIgZm9yIHRoZSBpdGVtcy5cbiAqIEBtZXRob2QgZ2V0SXRlbUhvbGRlclxuICovXG5SZXNvdXJjZVRhYlZpZXcucHJvdG90eXBlLmdldEl0ZW1Ib2xkZXIgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaXRlbVRhYmxlQm9keTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZVRhYlZpZXc7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcblxuZnVuY3Rpb24gUm9vdFZpZXcoZG9tQ29udGFpbmVyKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LmRpdiwgXCJSb290Vmlld1wiKTtcblxuXHR0aGlzLmlzUm9vdCA9IHRydWU7XG5cdFxuXHRkb21Db250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5nZXRFbGVtZW50KCkpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhSb290VmlldywgVmlldyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSb290VmlldztcbiIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcblxuZnVuY3Rpb24gU2VsZWN0QnV0dG9uKHRleHQsIGZpbHRlcikge1xuXHRWaWV3LmNhbGwodGhpcywgVmlldy5JbnB1dCwgXCJTZWxlY3RCdXR0b25cIik7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJmaWxlXCIpO1xuXHR0aGlzLmdldEVsZW1lbnQoKS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0ZXh0KTtcblx0dGhpcy5nZXRFbGVtZW50KCkuc2V0QXR0cmlidXRlKFwiYWNjZXB0XCIsIFwiaW1hZ2UvKlwiKTtcblx0dGhpcy5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHR0aGlzLndpZHRoID0gODA7XG5cdHRoaXMuaGVpZ2h0ID0gMzA7XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKFNlbGVjdEJ1dHRvbiwgVmlldyk7XG5FdmVudERpc3BhdGNoZXIuaW5pdChTZWxlY3RCdXR0b24pO1xuXG5TZWxlY3RCdXR0b24uQ2hhbmdlID0gXCJjaGFuZ2VcIjtcblxuU2VsZWN0QnV0dG9uLnByb3RvdHlwZS5vbkNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRyaWdnZXIoU2VsZWN0QnV0dG9uLkNoYW5nZSwgdGhpcy5nZXRFbGVtZW50KCkuZmlsZXMpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdEJ1dHRvbjtcbiIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbnZhciBMaXN0SXRlbSA9IHJlcXVpcmUoXCIuL0xpc3RJdGVtXCIpO1xudmFyIFNlbGVjdEJ1dHRvbiA9IHJlcXVpcmUoXCIuL1NlbGVjdEJ1dHRvblwiKTtcbnZhciBJbWFnZVZpZXcgPSByZXF1aXJlKFwiLi9JbWFnZVZpZXdcIik7XG52YXIgVGV4dCA9IHJlcXVpcmUoXCIuL1RleHRcIik7XG52YXIgSW5wdXRWaWV3ID0gcmVxdWlyZShcIi4vSW5wdXRWaWV3XCIpO1xudmFyIFJlc291cmNlcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9saWIvUmVzb3VyY2VzXCIpO1xuXG5mdW5jdGlvbiBTdHJpbmdJdGVtKGlkLCB2YWx1ZSkge1xuXHRMaXN0SXRlbS5jYWxsKHRoaXMsIGlkKTtcblxuXG5cdHRoaXMubmFtZSA9IG5hbWU7XG5cblx0dGhpcy50ZXh0ID0gbmV3IFRleHQoKTtcblx0dGhpcy5pbnB1dCA9IG5ldyBJbnB1dFZpZXcoKTtcblxuXHR0aGlzLmFkZENoaWxkKHRoaXMudGV4dCk7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5pbnB1dCk7XG5cblx0dGhpcy50ZXh0LndpZHRoID0gMTAwO1xuXHR0aGlzLmlucHV0LndpZHRoID0gMjAwO1xuXG5cdHRoaXMudGV4dC55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXHR0aGlzLmlucHV0LnkgPSB0aGlzLmhlYWRlci5oZWlnaHQ7XG5cblx0dGhpcy5pbnB1dC54ID0gMTAwO1xuXG5cblxuXHR0aGlzLmJ1dHRvbi5vbihTZWxlY3RCdXR0b24uQ2hhbmdlLCB0aGlzLm9uRmlsZXNTZWxlY3RlZCwgdGhpcyk7XG5cdFxufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhTdHJpbmdJdGVtLCBMaXN0SXRlbSk7XG5FdmVudERpc3BhdGNoZXIuaW5pdChTdHJpbmdJdGVtKTtcblxuU3RyaW5nSXRlbS5DaGFuZ2VkID0gXCJDaGFuZ2VkXCI7XG5cblN0cmluZ0l0ZW0ucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0TGlzdEl0ZW0ucHJvdG90eXBlLnVwZGF0ZUxheW91dC5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpO1xuXG5cdHRoaXMudGV4dC51cGRhdGVMYXlvdXQod2lkdGgqMC41LCBoZWlnaHQgLSB0aGlzLmhlYWRlci5oZWlnaHQpO1xuXHR0aGlzLmlucHV0LnVwZGF0ZUxheW91dCh3aWR0aCowLjUsIGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCk7XG5cblx0dGhpcy50ZXh0LnggPSAwOyBcblx0dGhpcy5pbnB1dC54ID0gd2lkdGgqMC41O1xuXG5cdHRoaXMudGV4dC55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXHR0aGlzLmlucHV0LnkgPSB0aGlzLmhlYWRlci5oZWlnaHQ7XG59O1xuXG5cblN0cmluZ0l0ZW0ucHJvdG90eXBlLm9uQ2hhbmdlZCA9IGZ1bmN0aW9uKGZpbGVzKSB7XG5cdHRoaXMudHJpZ2dlcihTdHJpbmdJdGVtLkNoYW5nZWQsIHRoaXMpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZ0l0ZW07IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcblxuZnVuY3Rpb24gVGFyZ2V0Q29udHJvbGxlclZpZXcoKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJUYXJnZXRDb250cm9sbGVyVmlld1wiKTtcblxuXHR0aGlzLm1lbnVWaWV3ID0gbnVsbDtcblx0dGhpcy50YXJnZXRWaWV3ID0gbnVsbDtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoVGFyZ2V0Q29udHJvbGxlclZpZXcsIFZpZXcpO1xuXG5UYXJnZXRDb250cm9sbGVyVmlldy5wcm90b3R5cGUuc2V0TWVudVZpZXcgPSBmdW5jdGlvbihtZW51Vmlldykge1xuXHR0aGlzLm1lbnVWaWV3ID0gbWVudVZpZXc7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5tZW51Vmlldyk7XG59O1xuXG5UYXJnZXRDb250cm9sbGVyVmlldy5wcm90b3R5cGUuc2V0VGFyZ2V0VmlldyA9IGZ1bmN0aW9uKHRhcmdldFZpZXcpIHtcblx0dGhpcy50YXJnZXRWaWV3ID0gdGFyZ2V0Vmlldztcblx0dGhpcy5hZGRDaGlsZCh0YXJnZXRWaWV3KTtcbn07XG5cblRhcmdldENvbnRyb2xsZXJWaWV3LnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cblx0dGhpcy5tZW51Vmlldy51cGRhdGVMYXlvdXQod2lkdGgsIHRoaXMubWVudVZpZXcuaGVpZ2h0KTtcblxuXHR0aGlzLnRhcmdldFZpZXcueCA9IDA7XG5cdHRoaXMudGFyZ2V0Vmlldy55ID0gdGhpcy5tZW51Vmlldy5oZWlnaHQ7XG5cdHRoaXMudGFyZ2V0Vmlldy51cGRhdGVMYXlvdXQod2lkdGgsIGhlaWdodCAtIHRoaXMubWVudVZpZXcuaGVpZ2h0KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0Q29udHJvbGxlclZpZXc7XG4iLCJ2YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcblxuLyoqXG4gKiBUYXJnZXQgcGFuZS5cbiAqIEBjbGFzcyBUYXJnZXRQYW5lVmlld1xuICovXG5mdW5jdGlvbiBUYXJnZXRQYW5lVmlldygpIHtcblx0eG5vZGUuRGl2LmNhbGwodGhpcyk7XG5cblx0dGhpcy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0dGhpcy5zdHlsZS50b3AgPSBcIjYwcHhcIjtcblx0dGhpcy5zdHlsZS5yaWdodCA9IFwiMTBweFwiO1xuXHR0aGlzLnN0eWxlLndpZHRoID0gXCJjYWxjKDUwJSAtIDE1cHgpXCI7XG5cdHRoaXMuc3R5bGUuYm90dG9tID0gXCIxMHB4XCI7XG5cblx0dGhpcy50YWJIZWFkZXJzID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnRhYkhlYWRlcnMuY2xhc3NOYW1lID0gXCJ1aSB0b3AgYXR0YWNoZWQgdGFidWxhciBtZW51XCI7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy50YWJIZWFkZXJzKTtcblxuXHR0aGlzLmlubmVyID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLmlubmVyLmNsYXNzTmFtZSA9IFwidWkgYm90dG9tIGF0dGFjaGVkIGFjdGl2ZSB0YWIgc2VnbWVudFwiO1xuXHR0aGlzLmlubmVyLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXHR0aGlzLmlubmVyLnN0eWxlLmhlaWdodCA9IFwiY2FsYygxMDAlIC0gMzVweClcIjtcblx0dGhpcy5pbm5lci5zdHlsZS5wYWRkaW5nID0gXCIxcHhcIjtcblx0dGhpcy5pbm5lci5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMuaW5uZXIpO1xuXG59XG5cbmluaGVyaXRzKFRhcmdldFBhbmVWaWV3LCB4bm9kZS5EaXYpO1xuXG4vKipcbiAqIEdldCBob2xkZXIgZm9yIHRoZSB0YWIgaGVhZGVycy5cbiAqIEBtZXRob2QgZ2V0VGFiSGVhZGVySG9sZGVyXG4gKi9cblRhcmdldFBhbmVWaWV3LnByb3RvdHlwZS5nZXRUYWJIZWFkZXJIb2xkZXIgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMudGFiSGVhZGVycztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXRQYW5lVmlldzsiLCJ2YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG5cbi8qKlxuICogVGhlIHRhYiBoZWFkZXIuXG4gKiBAY2xhc3MgVGFyZ2V0VGFiSGVhZGVyVmlld1xuICovXG5mdW5jdGlvbiBUYXJnZXRUYWJIZWFkZXJWaWV3KCkge1xuXHR4bm9kZS5BLmNhbGwodGhpcyk7XG5cdHRoaXMuY2xhc3NOYW1lID0gXCJpdGVtXCI7XG59XG5cbmluaGVyaXRzKFRhcmdldFRhYkhlYWRlclZpZXcsIHhub2RlLkEpO1xuXG4vKipcbiAqIFNldCBsYWJlbC5cbiAqIEBjbGFzcyBzZXRMYWJlbFxuICovXG5UYXJnZXRUYWJIZWFkZXJWaWV3LnByb3RvdHlwZS5zZXRMYWJlbCA9IGZ1bmN0aW9uKGxhYmVsKSB7XG5cdHRoaXMuaW5uZXJIVE1MID0gbGFiZWw7XG59XG5cbi8qKlxuICogU2V0IGFjdGl2ZSBzdGF0ZS5cbiAqIEBjbGFzcyBzZXRBY3RpdmVcbiAqL1xuVGFyZ2V0VGFiSGVhZGVyVmlldy5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24oYWN0aXZlKSB7XG5cdGlmIChhY3RpdmUpXG5cdFx0dGhpcy5jbGFzc05hbWUgPSBcImFjdGl2ZSBpdGVtXCI7XG5cblx0ZWxzZVxuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJpdGVtXCI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0VGFiSGVhZGVyVmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuXG5mdW5jdGlvbiBUZXh0KHRleHQpIHtcblx0Vmlldy5jYWxsKHRoaXMsIFZpZXcuU3BhbiwgXCJUZXh0XCIpO1xuXG5cdHRoaXMuZ2V0RWxlbWVudCgpLmlubmVySFRNTCA9IHRleHQ7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG5cdFxufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhUZXh0LCBWaWV3KTtcblxuXG5UZXh0LnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdHRoaXMud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dDtcbiIsImZ1bmN0aW9uIFZpZXcoZWxlbWVudFR5cGUsIGNsYXNzTmFtZSkge1xuXHR0aGlzLl9kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSA/IGVsZW1lbnRUeXBlIDogVmlldy5EaXYpO1xuXHR0aGlzLl9mcmFtZSA9IHtcblx0XHR4OjAsIFxuXHRcdHk6IDAsXG5cdFx0d2lkdGg6IDAsXG5cdFx0aGVpZ2h0OiAwXG5cdH07XG5cdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cblx0dGhpcy5pc1Jvb3QgPSBmYWxzZTtcblxuXHR0aGlzLl9kb21FbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSA/IGNsYXNzTmFtZSA6IFwiVmlld1wiO1xuXG5cdHRoaXMucGFyZW50ID0gbnVsbDtcblx0dGhpcy5jaGlsZHJlbiA9IG5ldyBBcnJheSgpO1xuXG59O1xuVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBWaWV3O1xuXG5WaWV3LkltYWdlID0gXCJpbWdcIjtcblZpZXcuSW5wdXQgPSBcImlucHV0XCI7XG5WaWV3LkRpdiA9IFwiZGl2XCI7XG5WaWV3LlNwYW4gPSBcInNwYW5cIjtcblZpZXcuSUZyYW1lID0gXCJpZnJhbWVcIjtcblxuVmlldy5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudDtcbn07XG5cblZpZXcucHJvdG90eXBlLmlzT25TdGFnZSA9IGZ1bmN0aW9uKCkge1xuXHRpZih0aGlzLnBhcmVudCAhPSBudWxsKSB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50LmlzT25TdGFnZSgpO1xuXHR9XG5cdGlmKHRoaXMuaXNSb290ID09IHRydWUpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5WaWV3LnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkVmlldykge1xuXHRjaGlsZFZpZXcucGFyZW50ID0gdGhpcztcblx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkVmlldyk7XG5cdHRoaXMuX2RvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGRWaWV3Ll9kb21FbGVtZW50KTtcblx0aWYodGhpcy5pc09uU3RhZ2UoKSA9PSB0cnVlKSB7XG5cdFx0dmFyIGIgPSBjaGlsZFZpZXcuaGVpZ2h0ICsgY2hpbGRWaWV3LndpZHRoO1xuXHRcdGNoaWxkVmlldy5hZGRlZFRvU3RhZ2UoKTtcblx0fVxufTtcblxuVmlldy5wcm90b3R5cGUuYWRkZWRUb1N0YWdlID0gZnVuY3Rpb24oKSB7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0dGhpcy5jaGlsZHJlbltpXS5hZGRlZFRvU3RhZ2UoKTtcblx0fVxufTtcblxuVmlldy5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjaGlsZFZpZXcpIHtcblx0dmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkVmlldyk7XG5cdGlmKGluZGV4ICE9IC0xKSB7XG5cdFx0Y2hpbGRWaWV3LnBhcmVudCA9IG51bGw7XG5cdFx0dGhpcy5fZG9tRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZFZpZXcuX2RvbUVsZW1lbnQpO1xuXHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUcnlpbmcgdG8gcmVtb3ZlIGFuIGVsZW1lbnQgdGhhdCB3YXNuJ3QgYSBjaGlsZFwiKTtcblx0fVxufTtcblxuVmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xufTtcblxuVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG5cblZpZXcucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiO1xufTtcblxuVmlldy5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJ1cGRhdGVMYXlvdXQgbm90IGltcGxlbWVudGVkIVwiKTtcbn07XG5cbi8qKlxuICogU2V0dGVyIGFuZCBHZXR0ZXIgZm9yIHggcG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB4IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcInhcIiwge1xuXHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9mcmFtZS54OyBcblx0fSxcblx0c2V0OiBmdW5jdGlvbih4KSB7IFxuXHRcdHRoaXMuX2ZyYW1lLnggPSB4O1xuXHRcdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHggKyBcInB4XCI7XG5cdH1cbn0pO1xuXG4vKipcbiAqIFNldHRlciBhbmQgR2V0dGVyIGZvciB5IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkgeSAgXG4gKiBAdHlwZSBmbG9hdFxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVmlldy5wcm90b3R5cGUsIFwieVwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZyYW1lLnk7IFxuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKHkpIHsgXG5cdFx0dGhpcy5fZnJhbWUueSA9IHk7XG5cdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS50b3AgPSB5ICsgXCJweFwiO1xuXHR9XG59KTtcblxuLyoqXG4gKiBTZXR0ZXIgYW5kIEdldHRlciBmb3Igd2lkdGhcbiAqIEBwcm9wZXJ0eSB3aWR0aFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgdyA9IHRoaXMuX2ZyYW1lLndpZHRoO1xuXHRcdHRoaXMud2lkdGggPSB0aGlzLl9kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXHRcdFx0aWYoKGNoaWxkLnggKyBjaGlsZC53aWR0aCkgPiB3KSB7XG5cdFx0XHRcdHcgPSBjaGlsZC54ICsgY2hpbGQud2lkdGg7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHcgPiB0aGlzLl9kb21FbGVtZW50LmNsaWVudFdpZHRoKSB7XG5cdFx0XHR0aGlzLndpZHRoID0gdztcblx0XHR9XG5cdFx0cmV0dXJuIHcgXG5cdH0sXG5cdHNldDogZnVuY3Rpb24od2lkdGgpIHsgXG5cdFx0aWYodGhpcy5pc09uU3RhZ2UoKSkge1xuXHRcdFx0aWYoKHR5cGVvZiB3aWR0aCkgPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9mcmFtZS53aWR0aCA9IHdpZHRoO1xuXHR9XG59KTtcblxuLyoqXG4gKiBTZXR0ZXIgYW5kIEdldHRlciBmb3IgaGVpZ2h0IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkgaGVpZ2h0IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGggPSB0aGlzLl9mcmFtZS5oZWlnaHQ7XG5cdFx0dGhpcy5oZWlnaHQgPSB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcblx0XHRcdGlmKChjaGlsZC55ICsgY2hpbGQuaGVpZ2h0KSA+IGgpIHtcblx0XHRcdFx0aCA9IGNoaWxkLnkgKyBjaGlsZC5oZWlnaHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGggPiB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodCkge1xuXHRcdFx0dGhpcy5oZWlnaHQgPSBoO1xuXHRcdH1cblx0XHRyZXR1cm4gaDsgXG5cdH0sXG5cdHNldDogZnVuY3Rpb24oaGVpZ2h0KSB7IFxuXHRcdGlmKHRoaXMuaXNPblN0YWdlKCkpIHtcblx0XHRcdGlmKCh0eXBlb2YgaGVpZ2h0KSA9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9mcmFtZS5oZWlnaHQgPSBoZWlnaHQ7XG5cdH1cbn0pO1xuXG4vKipcbiAqIFNldHRlciBhbmQgR2V0dGVyIGZvciBiYWNrZ3JvdW5kIGNvbG9yXG4gKiBAcHJvcGVydHkgaGVpZ2h0IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcImJhY2tncm91bmRcIiwge1xuXHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmJhY2tncm91bmQ7IFxuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKGJhY2tncm91bmQpIHsgXG5cdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcblx0fVxufSk7XG5cbi8qKlxuICogU2V0dGVyIGFuZCBHZXR0ZXIgZm9yIGNvbG9yXG4gKiBAcHJvcGVydHkgaGVpZ2h0IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcImNvbG9yXCIsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jb2xvcjsgXG5cdH0sXG5cdHNldDogZnVuY3Rpb24oY29sb3IpIHsgXG5cdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7IiwidmFyIFBJWEkgPSByZXF1aXJlKFwicGl4aS5qc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vY2xpZW50L2pzL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcblxuXG5cbi8qKlxuICogQ2xpZW50IHJlc291cmNlc1xuICogQGNsYXNzIFJlc291cmNlcy5cbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VzKHNvdXJjZSkge1xuXHR2YXIgaTtcblxuXHR0aGlzLnJlc291cmNlcyA9IHtcblx0XHRncmFwaGljczoge30sXG5cdFx0cG9zaXRpb25zOiB7fSxcblx0XHRjb2xvcnM6IHt9LFxuXHRcdHN0cmluZ3M6IHt9LFxuXHRcdHZhbHVlczoge31cblx0fTtcblxuXHR0aGlzLnNvdXJjZXMgPSBuZXcgQXJyYXkoKTtcblxuXHR0aGlzLkFsaWduID0ge1xuXHRcdExlZnQ6IFwibGVmdFwiLFxuXHRcdFJpZ2h0OiBcInJpZ2h0XCIsXG5cdFx0Q2VudGVyOiBcImNlbnRlclwiXG5cdH07XG5cblx0dGhpcy50ZXh0dXJlcyA9IHt9O1xuXG5cdHRoaXMubG9hZENvdW50ID0gMDtcblx0dGhpcy5sb2FkSW5kZXggPSAwO1xuXHR0aGlzLnRleHR1cmVzTG9hZGVkID0gMDtcblx0dGhpcy50ZXh0dXJlQ291bnQgPSAwO1xuXG5cdGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZClcblx0XHR0aGlzLmFkZFNvdXJjZShzb3VyY2UpO1xufVxuRXZlbnREaXNwYXRjaGVyLmluaXQoUmVzb3VyY2VzKTtcblxuXG5SZXNvdXJjZXMuTG9hZGVkID0gXCJsb2FkZWRcIjtcblxuXG5SZXNvdXJjZXMucHJvdG90eXBlLmlzTG9hZGluZyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5sb2FkQ291bnQgPiAwIHx8IHRoaXMudGV4dHVyZXNMb2FkZWQgPCB0aGlzLnRleHR1cmVDb3VudDtcbn07XG5cblJlc291cmNlcy5wcm90b3R5cGUuYWRkU291cmNlID0gZnVuY3Rpb24ob2JqZWN0LCBub0NhY2hlKSB7XG5cdGlmICh0eXBlb2Ygb2JqZWN0ID09IFwic3RyaW5nXCIpIHtcblxuXHRcdGZ1bmN0aW9uIGZpbGVFeGlzdHModXJsKSB7XG5cdFx0XHRcdGlmICh1cmwpIHtcblx0XHRcdFx0XHR2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRcdFx0cmVxLm9wZW4oJ0dFVCcsIHVybCwgZmFsc2UpO1xuXHRcdFx0XHRcdHJlcS5zZW5kKCk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcS5zdGF0dXMgPT0gMjAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Lypcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0aWYoIWZpbGVFeGlzdHMob2JqZWN0KSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhdGNoKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gbG9hZCBmaWxlOiBcIiwgb2JqZWN0KTtcblx0XHRcdFx0XHR9Ki9cblxuXHRcdHRyeSB7XG5cdFx0XHR2YXIgbG9hZGVyID0gbmV3IFJlc291cmNlcy5Kc29uTG9hZGVyKG9iamVjdCwgdHJ1ZSwgbm9DYWNoZSk7XG5cdFx0XHRsb2FkZXIub25Mb2FkZWQgPSB0aGlzLm9uTG9hZGVkLmJpbmQodGhpcywgbG9hZGVyLCB0aGlzLmxvYWRJbmRleCwgbm9DYWNoZSk7XG5cdFx0XHR2YXIgbG9hZEluZGV4ID0gcGFyc2VJbnQodGhpcy5sb2FkSW5kZXggKyAwKTtcblx0XHRcdGxvYWRlci5vbkVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcywgbG9hZGVyLCBsb2FkSW5kZXgsIG5vQ2FjaGUpO1xuXHRcdFx0bG9hZGVyLmxvYWQoKTtcblx0XHRcdHRoaXMuc291cmNlcy5wdXNoKHRoaXMubG9hZEluZGV4KTtcblx0XHRcdHRoaXMubG9hZENvdW50Kys7XG5cdFx0XHR0aGlzLmxvYWRJbmRleCsrO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gbG9hZCBmaWxlOiBcIiwgb2JqZWN0KTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHRoaXMubG9hZENvdW50IDw9IDApIHtcblx0XHRcdC8qXG5cdFx0XHRmb3IodmFyIHAgaW4gb2JqZWN0KSB7XG5cdFx0XHRcdGZvcih2YXIgbyBpbiBvYmplY3RbcF0pIHtcblx0XHRcdFx0XHR0aGlzLnNvdXJjZXNbcF1bb10gPSBvYmplY3RbcF1bb107XG5cdFx0XHRcdH1cblx0XHRcdH0qL1xuXHRcdFx0dGhpcy5sb2FkQ291bnQrKztcblx0XHRcdHRoaXMub25Mb2FkZWQoe1xuXHRcdFx0XHRqc29uOiBvYmplY3Rcblx0XHRcdH0sIHRoaXMubG9hZEluZGV4KTtcblx0XHRcdHRoaXMubG9hZEluZGV4Kys7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc291cmNlcy5wdXNoKG9iamVjdCk7XG5cdFx0XHR0aGlzLmxvYWRJbmRleCsrO1xuXHRcdH1cblx0fVxufTtcblxuUmVzb3VyY2VzLnByb3RvdHlwZS5nZXRSZXNvdXJjZU9iamVjdCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5yZXNvdXJjZXM7XG59O1xuXG5SZXNvdXJjZXMucHJvdG90eXBlLm9uTG9hZGVkID0gZnVuY3Rpb24obG9hZGVyLCBsb2FkSW5kZXgsIG5vQ2FjaGUpIHtcblx0dGhpcy5sb2FkQ291bnQtLTtcblxuXHRpZiAobG9hZGVyICE9IG51bGwpIHtcblx0XHR0aGlzLnNvdXJjZXNbbG9hZEluZGV4XSA9IGxvYWRlci5qc29uO1xuXHR9XG5cblx0aWYgKHRoaXMubG9hZENvdW50ID09IDApIHtcblx0XHQvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tXFxuKHRoaXMubG9hZENvdW50ID09IDApXFxuLS0tLS0tLS0tLS0tLS0tXCIpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGZvciAodmFyIHAgaW4gdGhpcy5zb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGZvciAodmFyIG8gaW4gdGhpcy5zb3VyY2VzW2ldW3BdKSB7XG5cdFx0XHRcdFx0aWYgKG8gPT0gXCJ0ZXh0dXJlc1wiKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW3BdW29dKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzb3VyY2VzW3BdW29dID0gW107XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgZXhpc3RzID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciB0IGluIHRoaXMuc291cmNlc1tpXVtwXVtvXSkge1xuXHRcdFx0XHRcdFx0XHRleGlzdHMgPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBvdCA9IDA7IG90IDwgdGhpcy5yZXNvdXJjZXNbcF1bb10ubGVuZ3RoOyBvdCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMucmVzb3VyY2VzW3BdW29dW290XS5pZCA9PSB0aGlzLnNvdXJjZXNbaV1bcF1bb11bdF0uaWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGV4aXN0cyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghZXhpc3RzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5yZXNvdXJjZXNbcF1bb10ucHVzaCh0aGlzLnNvdXJjZXNbaV1bcF1bb11bdF0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmICgodGhpcy5zb3VyY2VzW2ldW3BdW29dICYmICh0aGlzLnNvdXJjZXNbaV1bcF1bb10gIT0gXCJcIikpIHx8ICghdGhpcy5yZXNvdXJjZXNbcF1bb10pKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzb3VyY2VzW3BdW29dID0gdGhpcy5zb3VyY2VzW2ldW3BdW29dO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5yZXNvdXJjZXMuZ3JhcGhpY3MudGV4dHVyZXMpIHtcblx0XHRcdGZvciAodmFyIGkgPSB0aGlzLnRleHR1cmVDb3VudDsgaSA8IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMudGV4dHVyZUNvdW50ID0gdGhpcy5yZXNvdXJjZXMuZ3JhcGhpY3MudGV4dHVyZXMubGVuZ3RoO1xuXHRcdFx0XHR2YXIgdGV4dHVyZU9iamVjdCA9IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzW2ldO1xuXHRcdFx0XHR0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdID0gbmV3IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UodGV4dHVyZU9iamVjdC5maWxlICsgKG5vQ2FjaGUgPyAoXCI/X190aW1lc3RhbXBfXz1cIiArIERhdGUubm93KCkpIDogXCJcIikpO1xuXHRcdFx0XHRpZiAodGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXS5iYXNlVGV4dHVyZS5oYXNMb2FkZWQpIHtcblx0XHRcdFx0XHR0aGlzLm9uVGV4dHVyZUxvYWRlZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coXCJhZGRpbmcgbGlzdGVuZXJzIHRvOiBcIiwgdGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXS5iYXNlVGV4dHVyZS5pbWFnZVVybCk7XG5cdFx0XHRcdFx0dGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXS5iYXNlVGV4dHVyZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsIHRoaXMub25UZXh0dXJlTG9hZGVkLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0uYmFzZVRleHR1cmUuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHRoaXMub25UZXh0dXJlRXJyb3IuYmluZCh0aGlzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy50cmlnZ2VyKFJlc291cmNlcy5Mb2FkZWQpO1xuXHRcdH1cblxuXHRcdC8vdGhpcy50cmlnZ2VyKFJlc291cmNlcy5Mb2FkZWQpO1xuXHR9XG59O1xuXG5SZXNvdXJjZXMucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihsb2FkZXIsIGxvYWRJbmRleCwgbm9DYWNoZSkge1xuXHRjb25zb2xlLndhcm4oXCJSZXNvdXJjZXMucHJvdG90eXBlLm9uRXJyb3JcIik7XG5cdHRoaXMubG9hZENvdW50LS07XG5cblx0aWYgKHRoaXMubG9hZENvdW50IDw9IDApIHtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHRoaXMuc291cmNlc1tpXSkge1xuXHRcdFx0XHRmb3IgKHZhciBvIGluIHRoaXMuc291cmNlc1tpXVtwXSkge1xuXHRcdFx0XHRcdGlmIChvID09IFwidGV4dHVyZXNcIikge1xuXHRcdFx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1twXVtvXSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc291cmNlc1twXVtvXSA9IFtdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIGV4aXN0cyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgdCBpbiB0aGlzLnNvdXJjZXNbaV1bcF1bb10pIHtcblx0XHRcdFx0XHRcdFx0ZXhpc3RzID0gZmFsc2U7XG5cblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgb3QgPSAwOyBvdCA8IHRoaXMucmVzb3VyY2VzW3BdW29dLmxlbmd0aDsgb3QrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLnJlc291cmNlc1twXVtvXVtvdF0uaWQgPT0gdGhpcy5zb3VyY2VzW2ldW3BdW29dW3RdLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRleGlzdHMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIWV4aXN0cykge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucmVzb3VyY2VzW3BdW29dLnB1c2godGhpcy5zb3VyY2VzW2ldW3BdW29dW3RdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoKHRoaXMuc291cmNlc1tpXVtwXVtvXSAmJiAodGhpcy5zb3VyY2VzW2ldW3BdW29dICE9IFwiXCIpKSB8fCAoIXRoaXMucmVzb3VyY2VzW3BdW29dKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc291cmNlc1twXVtvXSA9IHRoaXMuc291cmNlc1tpXVtwXVtvXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gdGhpcy50ZXh0dXJlQ291bnQ7IGkgPCB0aGlzLnJlc291cmNlcy5ncmFwaGljcy50ZXh0dXJlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLnRleHR1cmVDb3VudCA9IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzLmxlbmd0aDtcblx0XHRcdFx0dmFyIHRleHR1cmVPYmplY3QgPSB0aGlzLnJlc291cmNlcy5ncmFwaGljcy50ZXh0dXJlc1tpXTtcblx0XHRcdFx0dGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXSA9IG5ldyBQSVhJLlRleHR1cmUuZnJvbUltYWdlKHRleHR1cmVPYmplY3QuZmlsZSArIChub0NhY2hlID8gKFwiP19fdGltZXN0YW1wX189XCIgKyBEYXRlLm5vdygpKSA6IFwiXCIpKTtcblx0XHRcdFx0aWYgKHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0uYmFzZVRleHR1cmUuaGFzTG9hZGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5vblRleHR1cmVMb2FkZWQoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiYWRkaW5nIGxpc3RlbmVycyB0bzogXCIsIHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0uYmFzZVRleHR1cmUuaW1hZ2VVcmwpO1xuXHRcdFx0XHRcdHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0uYmFzZVRleHR1cmUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLCB0aGlzLm9uVGV4dHVyZUxvYWRlZC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHR0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdLmJhc2VUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCB0aGlzLm9uVGV4dHVyZUVycm9yLmJpbmQodGhpcykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudHJpZ2dlcihSZXNvdXJjZXMuTG9hZGVkKTtcblx0XHR9XG5cblx0fVxufTtcblxuUmVzb3VyY2VzLnByb3RvdHlwZS5vblRleHR1cmVMb2FkZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHR0aGlzLnRleHR1cmVzTG9hZGVkKys7XG5cdGlmIChldmVudCAmJiBldmVudC5jb250ZW50KSB7XG5cdFx0ZXZlbnQuY29udGVudC5yZW1vdmVBbGxFdmVudExpc3RlbmVycygpO1xuXHR9XG5cdC8vY29uc29sZS5sb2coXCJcXG4tLS0tLS0tLS1cIik7XG5cdC8vY29uc29sZS5sb2coXCJSZXNvdXJjZXMucHJvdG90eXBlLm9uVGV4dHVyZUxvYWRlZDogdGhpcy50ZXh0dXJlc0xvYWRlZCA9IFwiLCB0aGlzLnRleHR1cmVzTG9hZGVkLCBcIiwgdGhpcy50ZXh0dXJlQ291bnQgPSBcIiwgdGhpcy50ZXh0dXJlQ291bnQsIFwiLCBldmVudCA9IFwiLCBldmVudCk7XG5cdC8vY29uc29sZS5sb2coXCItLS0tLS0tLS1cXG5cIik7XG5cdGlmICh0aGlzLnRleHR1cmVzTG9hZGVkID49IHRoaXMudGV4dHVyZUNvdW50KSB7XG5cdFx0dGhpcy50cmlnZ2VyKFJlc291cmNlcy5Mb2FkZWQpO1xuXHR9XG59O1xuXG5SZXNvdXJjZXMucHJvdG90eXBlLm9uVGV4dHVyZUVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0dGhpcy50ZXh0dXJlc0xvYWRlZCsrO1xuXHRpZiAodGhpcy50ZXh0dXJlc0xvYWRlZCA+PSB0aGlzLnRleHR1cmVDb3VudCkge1xuXHRcdHRoaXMudHJpZ2dlcihSZXNvdXJjZXMuTG9hZGVkKTtcblx0fVxufTtcblxuLyoqXG4gKiBHZXQgdmFsdWUgZnJvbSBlaXRoZXIgbG9hZGVkIHNraW4gb3IgZGVmYXVsdCBza2luLlxuICogQG1ldGhvZCBnZXRWYWx1ZVxuICovXG5SZXNvdXJjZXMucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oa2V5KSB7XG5cdHZhciB2YWx1ZSA9IHRoaXMucmVzb3VyY2VzLnZhbHVlc1trZXldO1xuXG5cdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBza2luIGtleTogXCIgKyBrZXkpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEdldCBjb2xvciBmcm9tIGVpdGhlciBsb2FkZWQgc2tpbiBvciBkZWZhdWx0IHNraW4uXG4gKiBAbWV0aG9kIGdldENvbG9yXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0Q29sb3IgPSBmdW5jdGlvbihrZXkpIHtcblx0dmFyIHZhbHVlID0gbnVsbDtcblxuXHRpZiAoKHRoaXMucmVzb3VyY2VzICE9IG51bGwpICYmICh0aGlzLnJlc291cmNlcy5jb2xvcnNba2V5XSAhPSBudWxsKSkge1xuXHRcdHZhbHVlID0gdGhpcy5yZXNvdXJjZXMuY29sb3JzW2tleV07XG5cdH1cblxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2tpbiBrZXk6IFwiICsga2V5KTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgcG9pbnQgZnJvbSBlaXRoZXIgbG9hZGVkIHNraW4gb3IgZGVmYXVsdCBza2luLlxuICogQG1ldGhvZCBnZXRQb2ludFxuICovXG5SZXNvdXJjZXMucHJvdG90eXBlLmdldFBvaW50ID0gZnVuY3Rpb24oa2V5KSB7XG5cdHZhciB2YWx1ZSA9IG51bGw7XG5cblx0aWYgKCh0aGlzLnJlc291cmNlcyAhPSBudWxsKSAmJiAodGhpcy5yZXNvdXJjZXMucG9zaXRpb25zW2tleV0gIT0gbnVsbCkpIHtcblx0XHR2YWx1ZSA9IG5ldyBQSVhJLlBvaW50KFxuXHRcdFx0cGFyc2VGbG9hdCh0aGlzLnJlc291cmNlcy5wb3NpdGlvbnNba2V5XVswXSksXG5cdFx0XHRwYXJzZUZsb2F0KHRoaXMucmVzb3VyY2VzLnBvc2l0aW9uc1trZXldWzFdKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2tpbiBrZXk6IFwiICsga2V5KTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgdGV4dHVyZSBmcm9tIGVpdGhlciBsb2FkZWQgcmVzb3VyY2VzLlxuICogQG1ldGhvZCBnZXRUZXh0dXJlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0VGV4dHVyZSA9IGZ1bmN0aW9uKGtleSkge1xuXHR2YXIgdmFsdWUgPSBudWxsO1xuXHR2YXIgaXNEZWZhdWx0ID0gZmFsc2U7XG5cdHZhciB0ZXh0dXJlID0gbnVsbDtcblx0dmFyIGZyYW1lID0gbnVsbDtcblxuXG5cdGlmICgodGhpcy5yZXNvdXJjZXMgIT0gbnVsbCkgJiYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV0gIT0gbnVsbCkpIHtcblx0XHR2YWx1ZSA9IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV07XG5cdH1cblxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcga2V5OiBcIiArIGtleSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRpZiAodmFsdWUudGV4dHVyZSAhPSBudWxsKSB7XG5cdFx0dGV4dHVyZSA9IHZhbHVlLnRleHR1cmU7XG5cdH1cblxuXHRpZiAodmFsdWUuY29vcmRzICE9IG51bGwpIHtcblx0XHRmcmFtZSA9IHZhbHVlLmNvb3Jkcztcblx0fVxuXG5cdGlmICh0ZXh0dXJlICE9IG51bGwpIHtcblx0XHRpZiAoZnJhbWUgIT0gbnVsbClcblx0XHRcdHJldHVybiB0aGlzLmdldENvbXBvbmVudHNQYXJ0KHRleHR1cmUsIGZyYW1lWzBdLCBmcmFtZVsxXSwgZnJhbWVbMl0sIGZyYW1lWzNdKTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRDb21wb25lbnRzUGFydCh0ZXh0dXJlLCBmcmFtZSk7XG5cdH1cblxuXG5cblx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBrZXk6IFwiICsga2V5KTtcblxuXHRyZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgdGV4dHVyZSBmcm9tIGVpdGhlciBsb2FkZWQgcmVzb3VyY2VzLlxuICogQG1ldGhvZCBnZXRET01UZXh0dXJlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0RE9NVGV4dHVyZSA9IGZ1bmN0aW9uKGtleSkge1xuXHR2YXIgdmFsdWUgPSBudWxsO1xuXHR2YXIgaXNEZWZhdWx0ID0gZmFsc2U7XG5cdHZhciB0ZXh0dXJlID0gbnVsbDtcblx0dmFyIGZyYW1lID0gbnVsbDtcblxuXG5cdGlmICgodGhpcy5yZXNvdXJjZXMgIT0gbnVsbCkgJiYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV0gIT0gbnVsbCkpIHtcblx0XHR2YWx1ZSA9IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV07XG5cdH1cblxuXHRpZiAodmFsdWUudGV4dHVyZSAhPSBudWxsKSB7XG5cdFx0dGV4dHVyZSA9IHZhbHVlLnRleHR1cmU7XG5cdH1cblxuXHRpZiAodmFsdWUuY29vcmRzICE9IG51bGwpIHtcblx0XHRmcmFtZSA9IHZhbHVlLmNvb3Jkcztcblx0fVxuXG5cdGlmICh0ZXh0dXJlICE9IG51bGwpIHtcblx0XHRpZiAoZnJhbWUgIT0gbnVsbClcblx0XHRcdHJldHVybiB0aGlzLmdldERPTUNvbXBvbmVudHNQYXJ0KHRleHR1cmUsIGZyYW1lWzBdLCBmcmFtZVsxXSwgZnJhbWVbMl0sIGZyYW1lWzNdKTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRET01Db21wb25lbnRzUGFydCh0ZXh0dXJlLCBmcmFtZSk7XG5cdH1cblxuXG5cdHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEdldCBwYXJ0IGZyb20gY29tcG9uZW50cyBhdGxhcy5cbiAqIEBtZXRob2QgZ2V0Q29tcG9uZW50c1BhcnRcbiAqIEBwcml2YXRlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0Q29tcG9uZW50c1BhcnQgPSBmdW5jdGlvbih0ZXh0dXJlaWQsIHgsIHksIHcsIGgpIHtcblxuXHR2YXIgZnJhbWU7XG5cdHZhciB0ZXh0dXJlID0gdGhpcy5nZXRUZXh0dXJlRnJvbVNraW4odGV4dHVyZWlkKTtcblxuXHRpZiAoeCA9PT0gbnVsbCkge1xuXHRcdGZyYW1lID0ge1xuXHRcdFx0eDogMCxcblx0XHRcdHk6IDAsXG5cdFx0XHR3aWR0aDogdGV4dHVyZS53aWR0aCxcblx0XHRcdGhlaWdodDogdGV4dHVyZS5oZWlnaHRcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGZyYW1lID0ge1xuXHRcdFx0eDogeCxcblx0XHRcdHk6IHksXG5cdFx0XHR3aWR0aDogdyxcblx0XHRcdGhlaWdodDogaFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gbmV3IFBJWEkuVGV4dHVyZSh0ZXh0dXJlLCBmcmFtZSk7XG59XG5cbi8qKlxuICogR2V0IHBhcnQgZnJvbSBjb21wb25lbnRzIGF0bGFzLlxuICogQG1ldGhvZCBnZXRET01Db21wb25lbnRzUGFydFxuICogQHByaXZhdGVcbiAqL1xuUmVzb3VyY2VzLnByb3RvdHlwZS5nZXRET01Db21wb25lbnRzUGFydCA9IGZ1bmN0aW9uKHRleHR1cmVpZCwgeCwgeSwgdywgaCkge1xuXG5cdHZhciB0ZXh0dXJlID0gdGhpcy5nZXRDb21wb25lbnRzUGFydCh0ZXh0dXJlaWQsIHgsIHksIHcsIGgpO1xuXG5cdHZhciBkb20gPSB0ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZS5jbG9uZU5vZGUoKTtcblx0ZG9tLnNyYyA9IGRvbS5zcmMgKyBcIj9fX3RpbWVzdGFtcF9fPVwiICsgRGF0ZS5ub3coKTtcblxuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0ZGl2LmFwcGVuZENoaWxkKGRvbSk7XG5cdGRvbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0ZG9tLnN0eWxlLmxlZnQgPSBcIi1cIiArIHggKyBcInB4XCI7XG5cdGRvbS5zdHlsZS50b3AgPSBcIi1cIiArIHkgKyBcInB4XCI7XG5cblx0ZGl2LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblx0ZGl2LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcblx0ZGl2LnN0eWxlLmhlaWdodCA9IGggKyBcInB4XCI7XG5cblx0cmV0dXJuIGRpdjtcbn1cblxuLyoqXG4gKiBHZXQgdGV4dHVyZSBvYmplY3QgZnJvbSBza2luLlxuICogQG1ldGhvZCBnZXRUZXh0dXJlRnJvbVNraW5cbiAqIEBwcml2YXRlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0VGV4dHVyZUZyb21Ta2luID0gZnVuY3Rpb24odGV4dHVyZWlkKSB7XG5cblx0dmFyIHRleHR1cmVPYmplY3QgPSBudWxsO1xuXG5cdGlmICgodGhpcy5yZXNvdXJjZXMgIT0gbnVsbCkgJiYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzICE9IG51bGwpKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlc291cmNlcy5ncmFwaGljcy50ZXh0dXJlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzW2ldLmlkID09IHRleHR1cmVpZCkge1xuXHRcdFx0XHR0ZXh0dXJlT2JqZWN0ID0gdGhpcy5yZXNvdXJjZXMuZ3JhcGhpY3MudGV4dHVyZXNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKHRleHR1cmVPYmplY3QgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcInRleHR1cmVpZCBkb2Vzbid0IGV4aXN0OiBcIiArIHRleHR1cmVpZCk7XG5cdH1cblxuXHRpZiAodGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXSA9PSBudWxsKVxuXHRcdHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0gPSBuZXcgUElYSS5UZXh0dXJlLmZyb21JbWFnZSh0ZXh0dXJlT2JqZWN0LmZpbGUpO1xuXG5cdHJldHVybiB0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdO1xufVxuXG4vKipcbiAqIEBjbGFzcyBSZXNvdXJjZXMuSnNvbkxvYWRlclxuICovXG5SZXNvdXJjZXMuSnNvbkxvYWRlciA9IGZ1bmN0aW9uKHVybCwgY3Jvc3NvcmlnaW4sIG5vQ2FjaGUpIHtcblx0UElYSS5Kc29uTG9hZGVyLmNhbGwodGhpcywgdXJsICsgKG5vQ2FjaGUgPyAoXCI/dGltZXN0YW1wPVwiICsgRGF0ZS5ub3coKSkgOiBcIlwiKSwgY3Jvc3NvcmlnaW4pO1xuXHR0aGlzLm5vQ2FjaGUgPSBub0NhY2hlO1xufTtcblJlc291cmNlcy5Kc29uTG9hZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUElYSS5Kc29uTG9hZGVyLnByb3RvdHlwZSk7XG5SZXNvdXJjZXMuSnNvbkxvYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZXNvdXJjZXMuSnNvbkxvYWRlcjtcblxuXG4vKipcbiAqIEludm9rZSB3aGVuIEpTT04gZmlsZSBpcyBsb2FkZWRcbiAqXG4gKiBAbWV0aG9kIG9uSlNPTkxvYWRlZFxuICogQHByaXZhdGVcbiAqL1xuUmVzb3VyY2VzLkpzb25Mb2FkZXIucHJvdG90eXBlLm9uSlNPTkxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXG5cdGlmICghdGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQpIHtcblx0XHR0aGlzLm9uRXJyb3IoKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0cnkge1xuXHRcdHRoaXMuanNvbiA9IEpTT04ucGFyc2UodGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0dGhpcy5qc29uID0ge307XG5cdFx0dGhpcy5vbkxvYWRlZCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0aGlzLmpzb24uZnJhbWVzKSB7XG5cdFx0Ly8gc3ByaXRlIHNoZWV0XG5cdFx0dmFyIHNjb3BlID0gdGhpcztcblx0XHR2YXIgdGV4dHVyZVVybCA9IHRoaXMuYmFzZVVybCArIHRoaXMuanNvbi5tZXRhLmltYWdlICsgKHRoaXMubm9DYWNoZSA/IChcIj9fX3RpbWVzdGFtcF9fPVwiICsgRGF0ZS5ub3coKSkgOiBcIlwiKTtcblx0XHR2YXIgaW1hZ2UgPSBuZXcgUElYSS5JbWFnZUxvYWRlcih0ZXh0dXJlVXJsLCB0aGlzLmNyb3Nzb3JpZ2luKTtcblx0XHR2YXIgZnJhbWVEYXRhID0gdGhpcy5qc29uLmZyYW1lcztcblxuXHRcdHRoaXMudGV4dHVyZSA9IGltYWdlLnRleHR1cmUuYmFzZVRleHR1cmU7XG5cdFx0aW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRzY29wZS5vbkxvYWRlZCgpO1xuXHRcdH0pO1xuXG5cdFx0Zm9yICh2YXIgaSBpbiBmcmFtZURhdGEpIHtcblx0XHRcdHZhciByZWN0ID0gZnJhbWVEYXRhW2ldLmZyYW1lO1xuXG5cdFx0XHRpZiAocmVjdCkge1xuXHRcdFx0XHRQSVhJLlRleHR1cmVDYWNoZVtpXSA9IG5ldyBQSVhJLlRleHR1cmUodGhpcy50ZXh0dXJlLCB7XG5cdFx0XHRcdFx0eDogcmVjdC54LFxuXHRcdFx0XHRcdHk6IHJlY3QueSxcblx0XHRcdFx0XHR3aWR0aDogcmVjdC53LFxuXHRcdFx0XHRcdGhlaWdodDogcmVjdC5oXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFBJWEkuVGV4dHVyZUNhY2hlW2ldLmNyb3AgPSBuZXcgUElYSS5SZWN0YW5nbGUocmVjdC54LCByZWN0LnksIHJlY3QudywgcmVjdC5oKTtcblxuXHRcdFx0XHQvLyAgQ2hlY2sgdG8gc2VlIGlmIHRoZSBzcHJpdGUgaXMgdHJpbW1lZFxuXHRcdFx0XHRpZiAoZnJhbWVEYXRhW2ldLnRyaW1tZWQpIHtcblx0XHRcdFx0XHR2YXIgYWN0dWFsU2l6ZSA9IGZyYW1lRGF0YVtpXS5zb3VyY2VTaXplO1xuXHRcdFx0XHRcdHZhciByZWFsU2l6ZSA9IGZyYW1lRGF0YVtpXS5zcHJpdGVTb3VyY2VTaXplO1xuXHRcdFx0XHRcdFBJWEkuVGV4dHVyZUNhY2hlW2ldLnRyaW0gPSBuZXcgUElYSS5SZWN0YW5nbGUocmVhbFNpemUueCwgcmVhbFNpemUueSwgYWN0dWFsU2l6ZS53LCBhY3R1YWxTaXplLmgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aW1hZ2UubG9hZCgpO1xuXG5cdH0gZWxzZSBpZiAodGhpcy5qc29uLmJvbmVzKSB7XG5cdFx0Ly8gc3BpbmUgYW5pbWF0aW9uXG5cdFx0dmFyIHNwaW5lSnNvblBhcnNlciA9IG5ldyBzcGluZS5Ta2VsZXRvbkpzb24oKTtcblx0XHR2YXIgc2tlbGV0b25EYXRhID0gc3BpbmVKc29uUGFyc2VyLnJlYWRTa2VsZXRvbkRhdGEodGhpcy5qc29uKTtcblx0XHRQSVhJLkFuaW1DYWNoZVt0aGlzLnVybF0gPSBza2VsZXRvbkRhdGE7XG5cdFx0dGhpcy5vbkxvYWRlZCgpO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMub25Mb2FkZWQoKTtcblx0fVxufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VzOyJdfQ==
