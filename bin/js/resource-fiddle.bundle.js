(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
(function (process){
/**
 * A subset of Promises/A+.
 * @class Thenable
 */
function Thenable() {
	if (!(this instanceof Thenable))
		return new Thenable();

	this.decided = false;
	this.handlersUsed = false;
}

/**
 * Then.
 * @method resolve
 */
Thenable.prototype.then = function(resolutionHandler, rejectionHandler) {
	if (this.handlersUsed)
		throw new Error("Handlers already registered or called.");

	this.handlersUsed = true;
	this.resolutionHandler = resolutionHandler;
	this.rejectionHandler = rejectionHandler;
}

/**
 * Resolve.
 * @method resolve
 */
Thenable.prototype.resolve = function(result) {
	if (this.decided)
		throw new Error("Already decided.");

	this.decided = true;
	process.nextTick(this.callHandler.bind(this, true, result));
}

/**
 * Reject.
 * @method resolve
 */
Thenable.prototype.reject = function(reason) {
	if (this.decided)
		throw new Error("Already decided.");

	this.decided = true;
	process.nextTick(this.callHandler.bind(this, false, reason));
}

/**
 * Call handler.
 * @method callHandler
 * @private
 */
Thenable.prototype.callHandler = function(resolved, parameter) {
	this.handlersUsed = true;

	var handler;

	if (resolved)
		handler = this.resolutionHandler;

	else
		handler = this.rejectionHandler;

	//console.log("in callHandler, handler=" + handler);

	if (handler) {
		try {
			handler(parameter);
		} catch (e) {
			console.error("Unhandled: " + e);
			console.log(e.stack);
			throw e;
		}
	}
}

/**
 * Return a resolved thenable.
 * @method resolved
 */
Thenable.resolved = function(parameter) {
	var t = new Thenable();
	t.resolve(parameter);
	return t;
}

/**
 * Return a rejected thenable.
 * @method rejected
 */
Thenable.rejected = function(parameter) {
	var t = new Thenable();
	t.reject(parameter);
	return t;
}

/**
 * Wait for all to resolve or any to reject.
 * @method all
 */
Thenable.all = function( /* ... */ ) {
	var thenable = new Thenable();
	var i;
	var thenables = [];
	var decided = false;
	var resolvedCount = 0;

	for (i = 0; i < arguments.length; i++)
		thenables = thenables.concat(arguments[i]);

	function onResolved() {
		resolvedCount++;

		if (!decided && resolvedCount >= thenables.length) {
			decided = true;
			thenable.resolve();
		}
	}

	function onRejected(e) {
		if (!decided) {
			decided = true;
			thenable.reject(e);
		}
	}

	for (i = 0; i < thenables.length; i++) {
		thenables[i].then(onResolved, onRejected);
	}

	return thenable;
}

/**
 * Wait for any to resolve or all to reject.
 * @method all
 */
Thenable.race = function( /* ... */ ) {
	var thenable = new Thenable();
	var i;
	var thenables = [];
	var decided = false;
	var resolvedCount = 0;

	for (i = 0; i < arguments.length; i++)
		thenables = thenables.concat(arguments[i]);

	function onRejected() {
		resolvedCount++;

		if (!decided && resolvedCount >= thenables.length) {
			decided = true;
			thenable.reject();
		}
	}

	function onResolved(r) {
		if (!decided) {
			decided = true;
			thenable.resolve(r);
		}
	}

	for (i = 0; i < thenables.length; i++) {
		thenables[i].then(onResolved, onRejected);
	}

	return thenable;
}

/**
 * Create a resolved Thenable.
 * @method resolved
 */
Thenable.resolved = function(result) {
	var t = new Thenable;
	t.resolve(result);

	return t;
}

/**
 * Create a rejected Thenable.
 * @method rejected
 */
Thenable.rejected = function(reason) {
	var t = new Thenable;
	t.reject(reason);

	return t;
}

module.exports = Thenable;
}).call(this,require('_process'))
},{"_process":1}],5:[function(require,module,exports){
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
	createXNodeReadOnlyProperty("files");

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
	target.Iframe = createExtendedXNodeElement("iframe");
})();
},{}],6:[function(require,module,exports){
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
},{"inherits":2,"yaed":10}],7:[function(require,module,exports){
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
},{"./CollectionViewManager":8,"inherits":2,"xnode":5,"yaed":10}],8:[function(require,module,exports){
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
},{"inherits":2,"xnode":5,"yaed":10}],9:[function(require,module,exports){
module.exports = {
	Collection: require("./Collection"),
	CollectionView: require("./CollectionView"),
	CollectionViewManager: require("./CollectionViewManager")
};
},{"./Collection":6,"./CollectionView":7,"./CollectionViewManager":8}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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

	domContainer.appendChild(this);
};

ClassUtils.extends(FiddleClient, xnode.Div);

FiddleClient.prototype.init = function(initData, resources) {
	this.fiddleClientModel.initDefinition(initData);
	this.resources = resources;

	if (resources.isLoading()) {
		resources.on(Resources.Loaded, this.doInit, this);
		resources.on(Resources.Error, this.onResourcesError, this);
	} else {
		this.doInit();
	}
};

FiddleClient.prototype.onResourcesError = function(message) {
	console.log("resource load error: " + message);
}

FiddleClient.prototype.addTestcase = function(id, name, url) {
	this.fiddleClientModel.addTestcase(id, name, url)
};

FiddleClient.prototype.doInit = function() {
	console.log("doing init...");
	this.fiddleClientModel.initResources(this.resources);

	this.fiddleClientController = new FiddleClientController(
		this.fiddleClientView,
		this.fiddleClientModel
	);
};

module.exports = FiddleClient;
},{"../controllers/EditorController":14,"../controllers/FiddleClientController":15,"../controllers/TargetController":24,"../models/FiddleClientModel":29,"../utils/ClassUtils":35,"../views/EditorControllerView":41,"../views/FiddleClientView":43,"../views/RootView":61,"../views/TargetControllerView":64,"../views/View":68,"xnode":5}],12:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"../views/ColorItem":40,"./Editor":13}],13:[function(require,module,exports){
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
},{"../utils/APIConnection":34,"../utils/EventDispatcher":38}],14:[function(require,module,exports){
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
},{"../controllers/ColorsEditor":12,"../controllers/Editor":13,"../controllers/GraphicsEditor":16,"../controllers/Menu":17,"../controllers/PositionsEditor":18,"../controllers/StringsEditor":23,"../utils/EventDispatcher":38,"../views/EditorView":42,"../views/MenuItem":50,"../views/MenuView":51}],15:[function(require,module,exports){
var inherits = require("inherits");
var xnodec = require("xnodecollection");
var TargetTabHeaderController = require("./TargetTabHeaderController");
var TargetTabHeaderView = require("../views/TargetTabHeaderView");
var ResourceTabHeaderController = require("./ResourceTabHeaderController");
var ResourceTabHeaderView = require("../views/ResourceTabHeaderView");
var ResourceTabView = require("../views/ResourceTabView");
var ResourceTabController = require("../controllers/ResourceTabController");
var FiddleClientModel = require("../models/FiddleClientModel");

/**
 * FiddleClientController
 * @class FiddleClientController
 */
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

	this.updateCurrentTestcase();

	this.fiddleClientModel.on(FiddleClientModel.ACTIVE_TESTCASE_CHANGE, this.updateCurrentTestcase, this);
	this.fiddleClientModel.on(FiddleClientModel.ITEM_CHANGE, this.onModelItemChange, this);
	this.fiddleClientModel.on(FiddleClientModel.SAVE_COMPLETE, this.onModelSaveComplete, this);
}

/**
 * Update current test case.
 * @method updateCurrentTestcase
 */
FiddleClientController.prototype.updateCurrentTestcase = function() {
	var activeTestcase = this.fiddleClientModel.getActiveTestcase();

	if (!activeTestcase)
		return null;

	this.fiddleClientView.getTargetPaneView().setUrl(activeTestcase.getCachePreventionUrl());
}

/**
 * The model was saved, refresh target.
 * @method onModelSaveComplete
 */
FiddleClientController.prototype.onModelSaveComplete = function() {
	this.updateCurrentTestcase();
}

/**
 * Model item change.
 * @method onModelItemChange
 */
FiddleClientController.prototype.onModelItemChange = function() {
	this.fiddleClientModel.save();
}

module.exports = FiddleClientController;
},{"../controllers/ResourceTabController":21,"../models/FiddleClientModel":29,"../views/ResourceTabHeaderView":59,"../views/ResourceTabView":60,"../views/TargetTabHeaderView":66,"./ResourceTabHeaderController":22,"./TargetTabHeaderController":25,"inherits":2,"xnodecollection":9}],16:[function(require,module,exports){
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
},{"../../../lib/Resources":69,"../utils/APIConnection":34,"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"../views/ImageItem":46,"../views/SelectButton":62,"./Editor":13}],17:[function(require,module,exports){
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

},{"../utils/EventDispatcher":38,"../views/MenuItem":50}],18:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"../views/PositionItem":52,"./Editor":13}],19:[function(require,module,exports){
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
},{"../views/ResourceItemView":56,"./ResourceItemController":20,"xnodecollection":9}],20:[function(require,module,exports){
var ResourceItemModel = require("../models/ResourceItemModel");

/**
 * Control a resource item.
 * @class ResourceItemController
 */
function ResourceItemController(itemView) {
	this.itemView = itemView;

	this.itemView.on("change", this.onItemViewChange, this);
	this.itemView.on("fileSelect", this.onItemViewFileSelect, this);
}

/**
 * Set item model to serve as data.
 * @method setData
 */
ResourceItemController.prototype.setData = function(itemModel) {
	if (this.itemModel) {
		this.itemModel.off(ResourceItemModel.ITEM_CHANGE, this.onItemModelChange, this);
	}

	this.itemModel = itemModel;

	if (this.itemModel) {
		this.itemView.setKey(this.itemModel.getKey());
		this.itemView.setDefaultValue(this.itemModel.getDefaultValue());
		this.itemView.setValue(this.itemModel.getValue());
		this.itemView.setItemType(this.itemModel.getItemType());

		this.itemModel.on(ResourceItemModel.ITEM_CHANGE, this.onItemModelChange, this);
	}
}

/**
 * The model changed, update view.
 * @method onItemModelChange
 */
ResourceItemController.prototype.onItemModelChange = function() {
	this.itemView.setValue(this.itemModel.getValue());
}

/**
 * Item view change.
 * @method onItemViewChange
 */
ResourceItemController.prototype.onItemViewChange = function() {
	if (!this.itemModel)
		return;

	this.itemModel.setValue(this.itemView.getValue());
}

/**
 * File selected.
 * @method onItemViewFileSelect
 */
ResourceItemController.prototype.onItemViewFileSelect = function() {
	this.itemModel.uploadFile(this.itemView.getSelectedFile());
}

module.exports = ResourceItemController;
},{"../models/ResourceItemModel":32}],21:[function(require,module,exports){
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
},{"../views/ResourceCategoryView":53,"../views/ResourceItemView":56,"./ResourceCategoryController":19,"./ResourceItemController":20,"xnodecollection":9}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"../views/StringItem":63,"./Editor":13}],24:[function(require,module,exports){
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
},{"../controllers/Menu":17,"../models/Testcase":33,"../utils/EventDispatcher":38,"../views/IFrameView":45,"../views/MenuItem":50,"../views/MenuView":51}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
FiddleClient = require("./app/FiddleClient");
Resources = require("../../lib/Resources");
},{"../../lib/Resources":69,"./app/FiddleClient":11}],27:[function(require,module,exports){
var FiddleClientModel = require("./FiddleClientModel");
var EventDispatcher = require("yaed");
var inherits = require("inherits");
var xnodec = require("xnodecollection");
var ResourceItemModel = require("./ResourceItemModel");
var ImageItemModel = require("./ImageItemModel");
var PositionItemModel = require("./PositionItemModel");
var ColorItemModel = require("./ColorItemModel");

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
CategoryModel.ITEM_CHANGE = "itemChange";

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

	categoryModel.on(ResourceItemModel.ITEM_CHANGE, this.onSubItemChange, this);

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
	resourceItemModel.on(ResourceItemModel.ITEM_CHANGE, this.onSubItemChange, this);
}

/**
 * On sub item change.
 * @method onSubItemChange
 */
CategoryModel.prototype.onSubItemChange = function() {
	this.trigger(CategoryModel.ITEM_CHANGE);
}

/**
 * Get all items in all categories.
 * @method getAllItems
 */
CategoryModel.prototype.getAllItems = function() {
	var a = [];

	for (var i = 0; i < this.categoryCollection.getLength(); i++)
		a = a.concat(this.categoryCollection.getItemAt(i).getAllItems());

	for (var i = 0; i < this.itemCollection.getLength(); i++)
		a.push(this.itemCollection.getItemAt(i));

	return a;
}

/**
 * Init definitions.
 * @method initDefinition
 */
CategoryModel.prototype.initDefinition = function(definitionData) {
	for (var i = 0; i < definitionData.items.length; i++) {
		var itemDef = definitionData.items[i];
		var item;

		switch (itemDef.type) {
			case "graphics":
				item = new ImageItemModel(itemDef.name);
				break;

			case "position":
				item = new PositionItemModel(itemDef.name);
				break;

			case "color":
				item = new ColorItemModel(itemDef.name);
				break;

			default:
				throw new Error("unknown resource type: " + itemDef.type);
				break;
		}

		item.parseDefaultData(itemDef.value);
		this.addResourceItemModel(item);
	}

	if (definitionData.categories) {
		for (var i = 0; i < definitionData.categories.length; i++) {
			var categoryDefinition = definitionData.categories[i];
			var category = this.createCategory(categoryDefinition.title);
			category.initDefinition(categoryDefinition);
		}
	}
}

module.exports = CategoryModel;
},{"./ColorItemModel":28,"./FiddleClientModel":29,"./ImageItemModel":30,"./PositionItemModel":31,"./ResourceItemModel":32,"inherits":2,"xnodecollection":9,"yaed":10}],28:[function(require,module,exports){
var ResourceItemModel = require("./ResourceItemModel");
var inherits = require("inherits");
var ColorUtil = require("../utils/ColorUtil");

/**
 * ColorItemModel
 * @class ColorItemModel
 */
function ColorItemModel(key, defaultValue, value) {
	ResourceItemModel.call(this, key);

	this.setDefaultValue(null);
	this.setValue(null);
}

inherits(ColorItemModel, ResourceItemModel);

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
	this.notifyChange();
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

/**
 * Parse default data.
 */
ColorItemModel.prototype.parseDefaultData = function(data) {
	this.defaultValue = ColorUtil.hexToHTML(data);
}

/**
 * Parse default data.
 */
ColorItemModel.prototype.parseData = function(data) {
	this.value = ColorUtil.hexToHTML(data);

	if (this.value == this.defaultValue)
		this.value = null;
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
ColorItemModel.prototype.prepareSaveData = function(jsonData) {
	var saveData = 0;

	if (this.value && this.value[0] == "#")
		saveData = ColorUtil.htmlToHex(this.value)

	else if (this.defaultValue && this.defaultValue[0] == "#")
		saveData = ColorUtil.htmlToHex(this.defaultValue)

	jsonData.colors[this.key] = saveData;
}

module.exports = ColorItemModel;
},{"../utils/ColorUtil":36,"./ResourceItemModel":32,"inherits":2}],29:[function(require,module,exports){
var xnode = require("xnode");
var xnodec = require("xnodecollection");
var Testcase = require("./Testcase");
var CategoryModel = require("./CategoryModel");
var EventDispatcher = require("yaed");
var inherits = require("inherits");
//var request = require("request");
var HttpRequest = require("../utils/HttpRequest");

/**
 * Main model for the app.
 * @class FiddleClientModel
 */
function FiddleClientModel() {
	this.session = null;
	this.testcaseCollection = new xnodec.Collection();
	this.categoryCollection = new xnodec.Collection();

	this.saveRequest = null;
}

inherits(FiddleClientModel, EventDispatcher);

FiddleClientModel.ACTIVE_TESTCASE_CHANGE = "activeTestcaseChange";
FiddleClientModel.ITEM_CHANGE = "itemChange";
FiddleClientModel.SAVE_COMPLETE = "saveComplete";

/**
 * Set session.
 * @method setSession
 */
FiddleClientModel.prototype.setSession = function(session) {
	this.session = session;
}

/**
 * Setup resources.
 */
FiddleClientModel.prototype.initDefinition = function(definitionData) {
	console.log("init with def...");

	if (definitionData.items.length) {
		var category = this.createCategory("(Uncategorized)");

		var itemsDefinition = {
			items: definitionData.items
		};

		category.initDefinition(itemsDefinition);
	}

	for (var i = 0; i < definitionData.categories.length; i++) {
		var categoryDefinition = definitionData.categories[i];
		var category=this.createCategory(categoryDefinition.title);
		category.initDefinition(categoryDefinition);
	}

	console.log("init done, catlen=" + this.categoryCollection.getLength());
}

/**
 * Init from a resources object.
 * @method initWithResources
 */
FiddleClientModel.prototype.initResources = function(resources) {
	var resourceObject = resources.getResourceObject();
	var allByKey = this.getAllItemsByKey();

	for (var key in resourceObject.positions) {
		var item = allByKey[key];

		if (item)
			item.parseData(resourceObject.positions[key]);
	}

	for (var key in resourceObject.colors) {
		var item = allByKey[key];

		if (item)
			item.parseData(resourceObject.colors[key]);
	}

	for (var key in resourceObject.graphics) {
		if (key != "textures") {
			var item = allByKey[key];

			if (item)
				item.parseData(resourceObject.graphics[key]);
		}
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
 * Get active test case.
 * @method getActiveTestCase
 */
FiddleClientModel.prototype.getActiveTestcase = function() {
	//console.log("testcase collection length: " + this.testcaseCollection.getLength());

	for (var i = 0; i < this.testcaseCollection.getLength(); i++)
		if (this.testcaseCollection.getItemAt(i).isActive())
			return this.testcaseCollection.getItemAt(i);

	return null;
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

	categoryModel.on(CategoryModel.ITEM_CHANGE, this.onItemChange, this);

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

/**
 * Get all items in all categories.
 * @method getAllItems
 */
FiddleClientModel.prototype.getAllItems = function() {
	var a = [];

	for (var i = 0; i < this.categoryCollection.getLength(); i++)
		a = a.concat(this.categoryCollection.getItemAt(i).getAllItems());

	return a;
}

/**
 * Get all items in all categories.
 * @method getAllItems
 */
FiddleClientModel.prototype.getAllItemsByKey = function() {
	var a = this.getAllItems();
	var byKey = {};

	for (var i = 0; i < a.length; i++) {
		var item = a[i];
		byKey[item.getKey()] = item;
	}

	return byKey;
}

/**
 * Save to server.
 * @method save
 */
FiddleClientModel.prototype.save = function() {
	var allItems = this.getAllItems();

	jsonData = {};
	jsonData.graphics = {};
	jsonData.positions = {};
	jsonData.colors = {};

	for (var i = 0; i < allItems.length; i++)
		allItems[i].prepareSaveData(jsonData);

	var request = new HttpRequest(window.location + "save");
	request.setParameter("json", JSON.stringify(jsonData));
	request.perform().then(
		this.onSaveComplete.bind(this),
		this.onSaveError.bind(this)
	);
}

/**
 * Save complete.
 */
FiddleClientModel.prototype.onSaveComplete = function() {
	this.trigger(FiddleClientModel.SAVE_COMPLETE);
}

/**
 * Save complete.
 */
FiddleClientModel.prototype.onSaveError = function(e) {
	console.log("save error...");
}

/**
 * Item change.
 * @method onItemChange
 */
FiddleClientModel.prototype.onItemChange = function() {
	this.trigger(FiddleClientModel.ITEM_CHANGE);
}

module.exports = FiddleClientModel;
},{"../utils/HttpRequest":39,"./CategoryModel":27,"./Testcase":33,"inherits":2,"xnode":5,"xnodecollection":9,"yaed":10}],30:[function(require,module,exports){
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
},{"../utils/HttpRequest":39,"./ResourceItemModel":32,"inherits":2}],31:[function(require,module,exports){
var ResourceItemModel = require("./ResourceItemModel");
var inherits = require("inherits");

/**
 * PositionItemModel
 * @class PositionItemModel
 */
function PositionItemModel(key) {
	ResourceItemModel.call(this, key);

	this.defaultValue = null;
	this.value = null;
}

inherits(PositionItemModel, ResourceItemModel);

/**
 * Get default value.
 * @method getDefaultValue
 */
PositionItemModel.prototype.getDefaultValue = function() {
	return this.defaultValue;
}

/**
 * Get customized value.
 * @method getValue
 */
PositionItemModel.prototype.getValue = function() {
	return this.value;
}

/**
 * Set value.
 * @method setValue
 */
PositionItemModel.prototype.setValue = function(value) {
	this.value = value;
	this.notifyChange();
}

/**
 * Set default value.
 * @method setDefaultValue
 */
PositionItemModel.prototype.setDefaultValue = function(defaultValue) {
	this.defaultValue = defaultValue;
}

/**
 * Get item type.
 * @method getItemType
 */
PositionItemModel.prototype.getItemType = function() {
	return "position";
}

/**
 * Parse default data.
 */
PositionItemModel.prototype.parseDefaultData = function(data) {
	this.defaultValue = data[0] + ", " + data[1];
}

/**
 * Parse incoming data.
 */
PositionItemModel.prototype.parseData = function(data) {
	this.value = data[0] + ", " + data[1];

	if (this.value == this.defaultValue)
		this.value = null;
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
PositionItemModel.prototype.prepareSaveData = function(jsonData) {
	var cand = this.getDataCand(this.value);

	if (!cand)
		cand = this.getDataCand(this.defaultValue);

	jsonData.positions[this.key] = cand;
}

/**
 * Get cadidate data.
 * @method getDataCand
 */
PositionItemModel.prototype.getDataCand = function(v) {
	if (!v)
		return null;

	var data = v.split(",");
	var x = parseFloat(data[0]);
	var y = parseFloat(data[1]);

	if (!isNaN(x) && !isNaN(y))
		return [x, y];

	return null;
}

module.exports = PositionItemModel;
},{"./ResourceItemModel":32,"inherits":2}],32:[function(require,module,exports){
var EventDispatcher = require("yaed");
var inherits = require("inherits");

/**
 * ResourceItemModel
 * @class ResourceItemModel
 */
function ResourceItemModel(key) {
	this.key = key;
}

inherits(ResourceItemModel, EventDispatcher);
ResourceItemModel.ITEM_CHANGE = "itemChange";

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
	throw new Error("Abstract");
}

/**
 * Get customized value.
 * @method getValue
 */
ResourceItemModel.prototype.getValue = function() {
	throw new Error("Abstract");
}

/**
 * Set value.
 * @method setValue
 */
ResourceItemModel.prototype.setValue = function(value) {
	throw new Error("Abstract");
}

/**
 * Prepare data to be saved.
 * @method prepareSaveData
 */
ResourceItemModel.prototype.prepareSaveData = function(jsonData) {
	throw new Error("Abstract");
}

/**
 * Notify change.
 * @method notifyChange
 * @protected
 */
ResourceItemModel.prototype.notifyChange = function() {
	this.trigger(ResourceItemModel.ITEM_CHANGE);
}

/**
 * Get item type.
 * @method getItemType
 */
ResourceItemModel.prototype.getItemType = function() {
	throw new Error("Abstract");
}

module.exports = ResourceItemModel;
},{"inherits":2,"yaed":10}],33:[function(require,module,exports){
var EventDispatcher = require("yaed");
var inherits = require("inherits");

/**
 * Testcase.
 * @class Testcase
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

	this.fiddleClientModel.trigger("activeTestcaseChange");
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

/**
 * Get url.
 * @method getUrl
 */
Testcase.prototype.getUrl = function() {
	return this.url;
}

/**
 * Get url with cache prevention
 * @method getCachePreventionUrl
 */
Testcase.prototype.getCachePreventionUrl = function() {
	var timestamp = new Date().getTime();

	if (this.url.indexOf("?") >= 0)
		return this.url + "&__prevent_cache=" + timestamp;

	else
		return this.url + "?__prevent_cache=" + timestamp;
}

module.exports = Testcase;
},{"inherits":2,"yaed":10}],34:[function(require,module,exports){
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
},{"./EventDispatcher":38}],35:[function(require,module,exports){
function ClassUtils() {
	
};

ClassUtils.extends = function(object, inherits_from) {
	object.prototype = Object.create(inherits_from.prototype);
	object.prototype.constructor = object;
};


module.exports = ClassUtils;
},{}],36:[function(require,module,exports){
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
 * Convert html to hex.
 * @method htmlToHex
 */
ColorUtil.htmlToHex = function(html) {
	var color = ColorUtil.parseHTMLColor(html);

	return (color.red << 16) + (color.green << 8) + (color.blue);
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
},{}],37:[function(require,module,exports){
var xnode = require("xnode");
var inherits = require("inherits");

/**
 * Removes itself on click outside.
 * @class ContextDiv
 */
function ContextDiv() {
	xnode.Div.call(this);
}

inherits(ContextDiv, xnode.Div);

/**
 * Show.
 */
ContextDiv.prototype.show = function() {
	this.bodyMouseDownListener = this.onBodyMouseDown.bind(this);
	this.mouseDownListener = this.onMouseDown.bind(this);
	this.clickListener = this.onClick.bind(this);

	this.addEventListener("mousedown", this.mouseDownListener);
	this.addEventListener("click", this.clickListener);
	document.body.addEventListener("mousedown", this.bodyMouseDownListener);

	document.body.appendChild(this);
}

/**
 * Hide.
 */
ContextDiv.prototype.hide = function() {
	this.removeEventListener("mousedown", this.mouseDownListener);
	this.removeEventListener("click", this.clickListener);
	document.body.removeEventListener("mousedown", this.bodyMouseDownListener);

	document.body.removeChild(this);
}

/**
 * Mouse down outside, hide.
 */
ContextDiv.prototype.onBodyMouseDown = function() {
	this.hide();
}

/**
 * Mouse down inside, don't do anything.
 */
ContextDiv.prototype.onMouseDown = function(ev) {
	ev.stopPropagation();
}

/**
 * Click. Hide.
 */
ContextDiv.prototype.onClick = function() {
	this.hide();
}


module.exports = ContextDiv;
},{"inherits":2,"xnode":5}],38:[function(require,module,exports){
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
},{}],39:[function(require,module,exports){
var Thenable = require("tinp");

/**
 * Http request abstraction.
 * @class HttpRequest
 */
function HttpRequest(url) {
	this.url = url;
	this.formData = new FormData();
	this.thenable = null;
	this.decodeResponse = "json";
}

/**
 * Set url.
 * @method setUrl
 */
HttpRequest.prototype.setUrl = function(url) {
	this.url = url;
}

/**
 * Set a file to upload.
 * @method setUploadFile
 */
HttpRequest.prototype.setParameter = function(name, value) {
	this.formData.append(name, value);
}

/**
 * Perform request.
 * @method perform
 */
HttpRequest.prototype.perform = function() {
	this.thenable = new Thenable();

	this.xmlXMLHttpRequest = new XMLHttpRequest();
	this.xmlXMLHttpRequest.onreadystatechange = this.onReadyStateChange.bind(this);

	this.xmlXMLHttpRequest.open("POST", this.url, true);
	this.xmlXMLHttpRequest.send(this.formData);

	return this.thenable;
}

/**
 * Ready state change.
 * @onReadyStateChange
 */
HttpRequest.prototype.onReadyStateChange = function() {
	console.log("ready state change: " + this.xmlXMLHttpRequest.readyState);

	if (this.xmlXMLHttpRequest.readyState != 4)
		return;

	if (this.xmlXMLHttpRequest.status != 200) {
		this.thenable.reject("Error!");
		return;
	}

	var result = this.xmlXMLHttpRequest.response;

	switch (this.decodeResponse) {
		case "json":
			try {
				result = JSON.parse(result);
			} catch (e) {
				this.thenable.reject("Unable to parse response: " + this.xmlXMLHttpRequest.response);
				return;
			}
			break;
	}

	this.thenable.resolve(result);
}

module.exports = HttpRequest;
},{"tinp":4}],40:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"./InputView":48,"./ListItem":49,"./View":68}],41:[function(require,module,exports){
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

},{"../utils/ClassUtils":35,"./View":68}],42:[function(require,module,exports){
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

},{"../utils/ClassUtils":35,"./View":68}],43:[function(require,module,exports){
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
},{"./HeaderView":44,"./ResourcePaneView":57,"./TargetPaneView":65,"inherits":2,"xnode":5}],44:[function(require,module,exports){
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
},{"inherits":2,"xnode":5}],45:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"./View":68}],46:[function(require,module,exports){
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
},{"../../../lib/Resources":69,"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"./ImageView":47,"./ListItem":49,"./SelectButton":62}],47:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"./View":68}],48:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"./View":68}],49:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"./Text":67,"./View":68}],50:[function(require,module,exports){
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

},{"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"./Text":67,"./View":68}],51:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"./View":68}],52:[function(require,module,exports){
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
},{"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"./InputView":48,"./ListItem":49,"./Text":67}],53:[function(require,module,exports){
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
},{"./ResourceItemView":56,"inherits":2,"xnode":5,"yaed":10}],54:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var ColorUtil = require("../utils/ColorUtil");
var EventDispatcher = require("yaed");

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
EventDispatcher.init(ResourceColorValueView);

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
	this.trigger("valueChange");
}

/**
 * Get value.
 * @method getValue
 */
ResourceColorValueView.prototype.getValue = function() {
	return this.value;
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
},{"../utils/ColorUtil":36,"inherits":2,"xnode":5,"yaed":10}],55:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var EventDispatcher = require("yaed");
var ContextDiv = require("../utils/ContextDiv");

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
	this.valueImage.addEventListener("contextmenu", this.onValueImageContextMenu.bind(this));
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
	this.value = null;
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
	this.value = value;

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
	console.log("upload change: " + this.uploadInput.value);
	this.trigger("fileSelect");
	this.uploadInput.value = ""
}

/**
 * Get selected file for upload.
 * @method getSelectedFile
 */
ResourceImageValueView.prototype.getSelectedFile = function() {
	return this.uploadInput.files[0];
}

/**
 * Right click on the value image.
 * @method onValueImageContextMenu
 */
ResourceImageValueView.prototype.onValueImageContextMenu = function(ev) {
	ev.preventDefault();

	var menu = new ContextDiv();
	menu.className = "ui vertical menu";
	menu.style.position = "fixed";
	menu.style.left = ev.pageX + "px";
	menu.style.top = ev.pageY + "px";
	menu.style.marginTop = 0;

	var a = new xnode.A();
	a.className = "item";
	a.innerHTML = "Restore to default";

	var i=new xnode.I();
	i.className="trash icon";
	a.appendChild(i);

	menu.appendChild(a);

	a.addEventListener("click", this.onRestoreToDefaultClick.bind(this));
	menu.show();
}

/**
 * Restore to default.
 * @method onRestoreToDefaultClick
 */
ResourceImageValueView.prototype.onRestoreToDefaultClick = function() {
	this.setValue(null);
	this.trigger("valueChange");
}

/**
 * Get value.
 * @method getValue
 */
ResourceImageValueView.prototype.getValue = function() {
	return this.value;
}

module.exports = ResourceImageValueView;
},{"../utils/ContextDiv":37,"inherits":2,"xnode":5,"yaed":10}],56:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var ResourcePositionValueView = require("./ResourcePositionValueView");
var ResourceImageValueView = require("./ResourceImageValueView");
var ResourceColorValueView = require("./ResourceColorValueView");
var EventDispatcher = require("yaed");

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
EventDispatcher.init(ResourceItemView);

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
 * Get current value.
 * @method setValue
 */
ResourceItemView.prototype.getValue = function(value) {
	return this.value;
}

/**
 * Set the type of the item. This will create a value
 * view and populate the right side of the table.
 * @method setItemType
 */
ResourceItemView.prototype.setItemType = function(itemType) {
	if (itemType == this.itemType)
		return;

	if (this.valueView) {
		this.valueTd.removeChild(this.valueView);
		this.valueView.off("valueChange", this.onValueViewChange, this);
		this.valueView.off("fileSelect", this.onValueViewChange, this);
	}

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
		this.valueView.on("valueChange", this.onValueViewChange, this);
		this.valueView.on("fileSelect", this.onValueViewFileSelect, this);
	}
}

/**
 * Item change
 * @method onValueViewChange
 */
ResourceItemView.prototype.onValueViewChange = function() {
	this.value = this.valueView.getValue();
	this.trigger("change");
}

/**
 * Get selected file.
 * Only available for images.
 * @method getSelectedFile
 */
ResourceItemView.prototype.getSelectedFile = function() {
	if (this.itemType != "image" || !this.valueView)
		throw new Error("not available...");

	return this.valueView.getSelectedFile();
}

/**
 * File select.
 * @method onValueViewFileSelect
 */
ResourceItemView.prototype.onValueViewFileSelect = function() {
	this.trigger("fileSelect");
}

module.exports = ResourceItemView;
},{"./ResourceColorValueView":54,"./ResourceImageValueView":55,"./ResourcePositionValueView":58,"inherits":2,"xnode":5,"yaed":10}],57:[function(require,module,exports){
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
},{"inherits":2,"xnode":5,"xnodecollection":9}],58:[function(require,module,exports){
var inherits = require("inherits");
var xnode = require("xnode");
var EventDispatcher = require("yaed");

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

	this.valueInput.addEventListener("change", this.onValueInputChange.bind(this));
}

inherits(ResourcePositionValueView, xnode.Div);
EventDispatcher.init(ResourcePositionValueView);

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

/**
 * Set position value for current.
 * @method setValue
 */
ResourcePositionValueView.prototype.onValueInputChange = function() {
	this.trigger("valueChange");
}

/**
 * Get value.
 * @method getValue
 */
ResourcePositionValueView.prototype.getValue = function() {
	return this.valueInput.value;
}

module.exports = ResourcePositionValueView;
},{"inherits":2,"xnode":5,"yaed":10}],59:[function(require,module,exports){
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
},{"inherits":2,"xnode":5}],60:[function(require,module,exports){
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
},{"./ResourceCategoryView":53,"inherits":2,"xnode":5,"xnodecollection":9}],61:[function(require,module,exports){
var ClassUtils = require("../utils/ClassUtils");
var View = require("./View");

function RootView(domContainer) {
	View.call(this, View.div, "RootView");

	this.isRoot = true;
	
	domContainer.appendChild(this.getElement());
};
ClassUtils.extends(RootView, View);


module.exports = RootView;

},{"../utils/ClassUtils":35,"./View":68}],62:[function(require,module,exports){
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

},{"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"./View":68}],63:[function(require,module,exports){
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
},{"../../../lib/Resources":69,"../utils/ClassUtils":35,"../utils/EventDispatcher":38,"./ImageView":47,"./InputView":48,"./ListItem":49,"./SelectButton":62,"./Text":67}],64:[function(require,module,exports){
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

},{"../utils/ClassUtils":35,"./View":68}],65:[function(require,module,exports){
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

	this.iframe = new xnode.Iframe();
	this.iframe.style.position = "absolute";
	this.iframe.style.top = "5px";
	this.iframe.style.left = "5px";
	this.iframe.style.width = "calc(100% - 10px)";
	this.iframe.style.height = "calc(100% - 10px)";
	this.iframe.style.border = "1px solid #808080"
	this.inner.appendChild(this.iframe);
}

inherits(TargetPaneView, xnode.Div);

/**
 * Get holder for the tab headers.
 * @method getTabHeaderHolder
 */
TargetPaneView.prototype.getTabHeaderHolder = function() {
	return this.tabHeaders;
}

/**
 *
 */
TargetPaneView.prototype.setUrl = function(url) {
	this.iframe.src = url;
}

module.exports = TargetPaneView;
},{"inherits":2,"xnode":5,"xnodecollection":9}],66:[function(require,module,exports){
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
},{"inherits":2,"xnode":5}],67:[function(require,module,exports){
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

},{"../utils/ClassUtils":35,"./View":68}],68:[function(require,module,exports){
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
},{}],69:[function(require,module,exports){
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
},{"../client/js/utils/EventDispatcher":38,"pixi.js":3}]},{},[26])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcGl4aS5qcy9iaW4vcGl4aS5qcyIsIm5vZGVfbW9kdWxlcy90aW5wL3NyYy9UaGVuYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy94bm9kZS9zcmMveG5vZGUuanMiLCJub2RlX21vZHVsZXMveG5vZGVjb2xsZWN0aW9uL3NyYy9Db2xsZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3hub2RlY29sbGVjdGlvbi9zcmMvQ29sbGVjdGlvblZpZXcuanMiLCJub2RlX21vZHVsZXMveG5vZGVjb2xsZWN0aW9uL3NyYy9Db2xsZWN0aW9uVmlld01hbmFnZXIuanMiLCJub2RlX21vZHVsZXMveG5vZGVjb2xsZWN0aW9uL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy95YWVkL3NyYy9FdmVudERpc3BhdGNoZXIuanMiLCJzcmMvY2xpZW50L2pzL2FwcC9GaWRkbGVDbGllbnQuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL0NvbG9yc0VkaXRvci5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvRWRpdG9yLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9FZGl0b3JDb250cm9sbGVyLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9GaWRkbGVDbGllbnRDb250cm9sbGVyLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9HcmFwaGljc0VkaXRvci5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvTWVudS5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvUG9zaXRpb25zRWRpdG9yLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9SZXNvdXJjZUNhdGVnb3J5Q29udHJvbGxlci5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvUmVzb3VyY2VJdGVtQ29udHJvbGxlci5qcyIsInNyYy9jbGllbnQvanMvY29udHJvbGxlcnMvUmVzb3VyY2VUYWJDb250cm9sbGVyLmpzIiwic3JjL2NsaWVudC9qcy9jb250cm9sbGVycy9SZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXIuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL1N0cmluZ3NFZGl0b3IuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL1RhcmdldENvbnRyb2xsZXIuanMiLCJzcmMvY2xpZW50L2pzL2NvbnRyb2xsZXJzL1RhcmdldFRhYkhlYWRlckNvbnRyb2xsZXIuanMiLCJzcmMvY2xpZW50L2pzL2ZpZGRsZWNsaWVudC5qcyIsInNyYy9jbGllbnQvanMvbW9kZWxzL0NhdGVnb3J5TW9kZWwuanMiLCJzcmMvY2xpZW50L2pzL21vZGVscy9Db2xvckl0ZW1Nb2RlbC5qcyIsInNyYy9jbGllbnQvanMvbW9kZWxzL0ZpZGRsZUNsaWVudE1vZGVsLmpzIiwic3JjL2NsaWVudC9qcy9tb2RlbHMvSW1hZ2VJdGVtTW9kZWwuanMiLCJzcmMvY2xpZW50L2pzL21vZGVscy9Qb3NpdGlvbkl0ZW1Nb2RlbC5qcyIsInNyYy9jbGllbnQvanMvbW9kZWxzL1Jlc291cmNlSXRlbU1vZGVsLmpzIiwic3JjL2NsaWVudC9qcy9tb2RlbHMvVGVzdGNhc2UuanMiLCJzcmMvY2xpZW50L2pzL3V0aWxzL0FQSUNvbm5lY3Rpb24uanMiLCJzcmMvY2xpZW50L2pzL3V0aWxzL0NsYXNzVXRpbHMuanMiLCJzcmMvY2xpZW50L2pzL3V0aWxzL0NvbG9yVXRpbC5qcyIsInNyYy9jbGllbnQvanMvdXRpbHMvQ29udGV4dERpdi5qcyIsInNyYy9jbGllbnQvanMvdXRpbHMvRXZlbnREaXNwYXRjaGVyLmpzIiwic3JjL2NsaWVudC9qcy91dGlscy9IdHRwUmVxdWVzdC5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvQ29sb3JJdGVtLmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9FZGl0b3JDb250cm9sbGVyVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvRWRpdG9yVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvRmlkZGxlQ2xpZW50Vmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvSGVhZGVyVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvSUZyYW1lVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvSW1hZ2VJdGVtLmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9JbWFnZVZpZXcuanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL0lucHV0Vmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvTGlzdEl0ZW0uanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL01lbnVJdGVtLmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9NZW51Vmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUG9zaXRpb25JdGVtLmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZUNhdGVnb3J5Vmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUmVzb3VyY2VDb2xvclZhbHVlVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUmVzb3VyY2VJbWFnZVZhbHVlVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUmVzb3VyY2VJdGVtVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUmVzb3VyY2VQYW5lVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvUmVzb3VyY2VUYWJIZWFkZXJWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9SZXNvdXJjZVRhYlZpZXcuanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL1Jvb3RWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9TZWxlY3RCdXR0b24uanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL1N0cmluZ0l0ZW0uanMiLCJzcmMvY2xpZW50L2pzL3ZpZXdzL1RhcmdldENvbnRyb2xsZXJWaWV3LmpzIiwic3JjL2NsaWVudC9qcy92aWV3cy9UYXJnZXRQYW5lVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvVGFyZ2V0VGFiSGVhZGVyVmlldy5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvVGV4dC5qcyIsInNyYy9jbGllbnQvanMvdmlld3MvVmlldy5qcyIsInNyYy9saWIvUmVzb3VyY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuTXV0YXRpb25PYnNlcnZlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgdmFyIHF1ZXVlID0gW107XG5cbiAgICBpZiAoY2FuTXV0YXRpb25PYnNlcnZlcikge1xuICAgICAgICB2YXIgaGlkZGVuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXVlTGlzdCA9IHF1ZXVlLnNsaWNlKCk7XG4gICAgICAgICAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgcXVldWVMaXN0LmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGhpZGRlbkRpdiwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBoaWRkZW5EaXYuc2V0QXR0cmlidXRlKCd5ZXMnLCAnbm8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogcGl4aS5qcyAtIHYxLjYuMFxuICogQ29weXJpZ2h0IChjKSAyMDEyLTIwMTQsIE1hdCBHcm92ZXNcbiAqIGh0dHA6Ly9nb29kYm95ZGlnaXRhbC5jb20vXG4gKlxuICogQ29tcGlsZWQ6IDIwMTQtMDctMThcbiAqXG4gKiBwaXhpLmpzIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cbihmdW5jdGlvbigpe3ZhciBhPXRoaXMsYj1ifHx7fTtiLldFQkdMX1JFTkRFUkVSPTAsYi5DQU5WQVNfUkVOREVSRVI9MSxiLlZFUlNJT049XCJ2MS42LjFcIixiLmJsZW5kTW9kZXM9e05PUk1BTDowLEFERDoxLE1VTFRJUExZOjIsU0NSRUVOOjMsT1ZFUkxBWTo0LERBUktFTjo1LExJR0hURU46NixDT0xPUl9ET0RHRTo3LENPTE9SX0JVUk46OCxIQVJEX0xJR0hUOjksU09GVF9MSUdIVDoxMCxESUZGRVJFTkNFOjExLEVYQ0xVU0lPTjoxMixIVUU6MTMsU0FUVVJBVElPTjoxNCxDT0xPUjoxNSxMVU1JTk9TSVRZOjE2fSxiLnNjYWxlTW9kZXM9e0RFRkFVTFQ6MCxMSU5FQVI6MCxORUFSRVNUOjF9LGIuX1VJRD0wLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBGbG9hdDMyQXJyYXk/KGIuRmxvYXQzMkFycmF5PUZsb2F0MzJBcnJheSxiLlVpbnQxNkFycmF5PVVpbnQxNkFycmF5KTooYi5GbG9hdDMyQXJyYXk9QXJyYXksYi5VaW50MTZBcnJheT1BcnJheSksYi5JTlRFUkFDVElPTl9GUkVRVUVOQ1k9MzAsYi5BVVRPX1BSRVZFTlRfREVGQVVMVD0hMCxiLlJBRF9UT19ERUc9MTgwL01hdGguUEksYi5ERUdfVE9fUkFEPU1hdGguUEkvMTgwLGIuZG9udFNheUhlbGxvPSExLGIuc2F5SGVsbG89ZnVuY3Rpb24oYSl7aWYoIWIuZG9udFNheUhlbGxvKXtpZihuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImNocm9tZVwiKT4tMSl7dmFyIGM9W1wiJWMgJWMgJWMgUGl4aS5qcyBcIitiLlZFUlNJT04rXCIgLSBcIithK1wiICAlYyAgJWMgIGh0dHA6Ly93d3cucGl4aWpzLmNvbS8gICVjICVjIOKZpSVj4pmlJWPimaUgXCIsXCJiYWNrZ3JvdW5kOiAjZmY2NmE1XCIsXCJiYWNrZ3JvdW5kOiAjZmY2NmE1XCIsXCJjb2xvcjogI2ZmNjZhNTsgYmFja2dyb3VuZDogIzAzMDMwNztcIixcImJhY2tncm91bmQ6ICNmZjY2YTVcIixcImJhY2tncm91bmQ6ICNmZmMzZGNcIixcImJhY2tncm91bmQ6ICNmZjY2YTVcIixcImNvbG9yOiAjZmYyNDI0OyBiYWNrZ3JvdW5kOiAjZmZmXCIsXCJjb2xvcjogI2ZmMjQyNDsgYmFja2dyb3VuZDogI2ZmZlwiLFwiY29sb3I6ICNmZjI0MjQ7IGJhY2tncm91bmQ6ICNmZmZcIl07Y29uc29sZS5sb2cuYXBwbHkoY29uc29sZSxjKX1lbHNlIHdpbmRvdy5jb25zb2xlJiZjb25zb2xlLmxvZyhcIlBpeGkuanMgXCIrYi5WRVJTSU9OK1wiIC0gaHR0cDovL3d3dy5waXhpanMuY29tL1wiKTtiLmRvbnRTYXlIZWxsbz0hMH19LGIuUG9pbnQ9ZnVuY3Rpb24oYSxiKXt0aGlzLng9YXx8MCx0aGlzLnk9Ynx8MH0sYi5Qb2ludC5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGIuUG9pbnQodGhpcy54LHRoaXMueSl9LGIuUG9pbnQucHJvdG90eXBlLnNldD1mdW5jdGlvbihhLGIpe3RoaXMueD1hfHwwLHRoaXMueT1ifHwoMCE9PWI/dGhpcy54OjApfSxiLlBvaW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlBvaW50LGIuUmVjdGFuZ2xlPWZ1bmN0aW9uKGEsYixjLGQpe3RoaXMueD1hfHwwLHRoaXMueT1ifHwwLHRoaXMud2lkdGg9Y3x8MCx0aGlzLmhlaWdodD1kfHwwfSxiLlJlY3RhbmdsZS5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGIuUmVjdGFuZ2xlKHRoaXMueCx0aGlzLnksdGhpcy53aWR0aCx0aGlzLmhlaWdodCl9LGIuUmVjdGFuZ2xlLnByb3RvdHlwZS5jb250YWlucz1mdW5jdGlvbihhLGIpe2lmKHRoaXMud2lkdGg8PTB8fHRoaXMuaGVpZ2h0PD0wKXJldHVybiExO3ZhciBjPXRoaXMueDtpZihhPj1jJiZhPD1jK3RoaXMud2lkdGgpe3ZhciBkPXRoaXMueTtpZihiPj1kJiZiPD1kK3RoaXMuaGVpZ2h0KXJldHVybiEwfXJldHVybiExfSxiLlJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5SZWN0YW5nbGUsYi5FbXB0eVJlY3RhbmdsZT1uZXcgYi5SZWN0YW5nbGUoMCwwLDAsMCksYi5Qb2x5Z29uPWZ1bmN0aW9uKGEpe2lmKGEgaW5zdGFuY2VvZiBBcnJheXx8KGE9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSksXCJudW1iZXJcIj09dHlwZW9mIGFbMF0pe2Zvcih2YXIgYz1bXSxkPTAsZT1hLmxlbmd0aDtlPmQ7ZCs9MiljLnB1c2gobmV3IGIuUG9pbnQoYVtkXSxhW2QrMV0pKTthPWN9dGhpcy5wb2ludHM9YX0sYi5Qb2x5Z29uLnByb3RvdHlwZS5jbG9uZT1mdW5jdGlvbigpe2Zvcih2YXIgYT1bXSxjPTA7Yzx0aGlzLnBvaW50cy5sZW5ndGg7YysrKWEucHVzaCh0aGlzLnBvaW50c1tjXS5jbG9uZSgpKTtyZXR1cm4gbmV3IGIuUG9seWdvbihhKX0sYi5Qb2x5Z29uLnByb3RvdHlwZS5jb250YWlucz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz0hMSxkPTAsZT10aGlzLnBvaW50cy5sZW5ndGgtMTtkPHRoaXMucG9pbnRzLmxlbmd0aDtlPWQrKyl7dmFyIGY9dGhpcy5wb2ludHNbZF0ueCxnPXRoaXMucG9pbnRzW2RdLnksaD10aGlzLnBvaW50c1tlXS54LGk9dGhpcy5wb2ludHNbZV0ueSxqPWc+YiE9aT5iJiYoaC1mKSooYi1nKS8oaS1nKStmPmE7aiYmKGM9IWMpfXJldHVybiBjfSxiLlBvbHlnb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuUG9seWdvbixiLkNpcmNsZT1mdW5jdGlvbihhLGIsYyl7dGhpcy54PWF8fDAsdGhpcy55PWJ8fDAsdGhpcy5yYWRpdXM9Y3x8MH0sYi5DaXJjbGUucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBiLkNpcmNsZSh0aGlzLngsdGhpcy55LHRoaXMucmFkaXVzKX0sYi5DaXJjbGUucHJvdG90eXBlLmNvbnRhaW5zPWZ1bmN0aW9uKGEsYil7aWYodGhpcy5yYWRpdXM8PTApcmV0dXJuITE7dmFyIGM9dGhpcy54LWEsZD10aGlzLnktYixlPXRoaXMucmFkaXVzKnRoaXMucmFkaXVzO3JldHVybiBjKj1jLGQqPWQsZT49YytkfSxiLkNpcmNsZS5wcm90b3R5cGUuZ2V0Qm91bmRzPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBiLlJlY3RhbmdsZSh0aGlzLngtdGhpcy5yYWRpdXMsdGhpcy55LXRoaXMucmFkaXVzLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpfSxiLkNpcmNsZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5DaXJjbGUsYi5FbGxpcHNlPWZ1bmN0aW9uKGEsYixjLGQpe3RoaXMueD1hfHwwLHRoaXMueT1ifHwwLHRoaXMud2lkdGg9Y3x8MCx0aGlzLmhlaWdodD1kfHwwfSxiLkVsbGlwc2UucHJvdG90eXBlLmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBiLkVsbGlwc2UodGhpcy54LHRoaXMueSx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KX0sYi5FbGxpcHNlLnByb3RvdHlwZS5jb250YWlucz1mdW5jdGlvbihhLGIpe2lmKHRoaXMud2lkdGg8PTB8fHRoaXMuaGVpZ2h0PD0wKXJldHVybiExO3ZhciBjPShhLXRoaXMueCkvdGhpcy53aWR0aCxkPShiLXRoaXMueSkvdGhpcy5oZWlnaHQ7cmV0dXJuIGMqPWMsZCo9ZCwxPj1jK2R9LGIuRWxsaXBzZS5wcm90b3R5cGUuZ2V0Qm91bmRzPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBiLlJlY3RhbmdsZSh0aGlzLngtdGhpcy53aWR0aCx0aGlzLnktdGhpcy5oZWlnaHQsdGhpcy53aWR0aCx0aGlzLmhlaWdodCl9LGIuRWxsaXBzZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5FbGxpcHNlLGIuTWF0cml4PWZ1bmN0aW9uKCl7dGhpcy5hPTEsdGhpcy5iPTAsdGhpcy5jPTAsdGhpcy5kPTEsdGhpcy50eD0wLHRoaXMudHk9MH0sYi5NYXRyaXgucHJvdG90eXBlLmZyb21BcnJheT1mdW5jdGlvbihhKXt0aGlzLmE9YVswXSx0aGlzLmI9YVsxXSx0aGlzLmM9YVszXSx0aGlzLmQ9YVs0XSx0aGlzLnR4PWFbMl0sdGhpcy50eT1hWzVdfSxiLk1hdHJpeC5wcm90b3R5cGUudG9BcnJheT1mdW5jdGlvbihhKXt0aGlzLmFycmF5fHwodGhpcy5hcnJheT1uZXcgRmxvYXQzMkFycmF5KDkpKTt2YXIgYj10aGlzLmFycmF5O3JldHVybiBhPyhiWzBdPXRoaXMuYSxiWzFdPXRoaXMuYyxiWzJdPTAsYlszXT10aGlzLmIsYls0XT10aGlzLmQsYls1XT0wLGJbNl09dGhpcy50eCxiWzddPXRoaXMudHksYls4XT0xKTooYlswXT10aGlzLmEsYlsxXT10aGlzLmIsYlsyXT10aGlzLnR4LGJbM109dGhpcy5jLGJbNF09dGhpcy5kLGJbNV09dGhpcy50eSxiWzZdPTAsYls3XT0wLGJbOF09MSksYn0sYi5pZGVudGl0eU1hdHJpeD1uZXcgYi5NYXRyaXgsYi5kZXRlcm1pbmVNYXRyaXhBcnJheVR5cGU9ZnVuY3Rpb24oKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgRmxvYXQzMkFycmF5P0Zsb2F0MzJBcnJheTpBcnJheX0sYi5NYXRyaXgyPWIuZGV0ZXJtaW5lTWF0cml4QXJyYXlUeXBlKCksYi5EaXNwbGF5T2JqZWN0PWZ1bmN0aW9uKCl7dGhpcy5wb3NpdGlvbj1uZXcgYi5Qb2ludCx0aGlzLnNjYWxlPW5ldyBiLlBvaW50KDEsMSksdGhpcy5waXZvdD1uZXcgYi5Qb2ludCgwLDApLHRoaXMucm90YXRpb249MCx0aGlzLmFscGhhPTEsdGhpcy52aXNpYmxlPSEwLHRoaXMuaGl0QXJlYT1udWxsLHRoaXMuYnV0dG9uTW9kZT0hMSx0aGlzLnJlbmRlcmFibGU9ITEsdGhpcy5wYXJlbnQ9bnVsbCx0aGlzLnN0YWdlPW51bGwsdGhpcy53b3JsZEFscGhhPTEsdGhpcy5faW50ZXJhY3RpdmU9ITEsdGhpcy5kZWZhdWx0Q3Vyc29yPVwicG9pbnRlclwiLHRoaXMud29ybGRUcmFuc2Zvcm09bmV3IGIuTWF0cml4LHRoaXMuY29sb3I9W10sdGhpcy5keW5hbWljPSEwLHRoaXMuX3NyPTAsdGhpcy5fY3I9MSx0aGlzLmZpbHRlckFyZWE9bnVsbCx0aGlzLl9ib3VuZHM9bmV3IGIuUmVjdGFuZ2xlKDAsMCwxLDEpLHRoaXMuX2N1cnJlbnRCb3VuZHM9bnVsbCx0aGlzLl9tYXNrPW51bGwsdGhpcy5fY2FjaGVBc0JpdG1hcD0hMSx0aGlzLl9jYWNoZUlzRGlydHk9ITF9LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5EaXNwbGF5T2JqZWN0LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUuc2V0SW50ZXJhY3RpdmU9ZnVuY3Rpb24oYSl7dGhpcy5pbnRlcmFjdGl2ZT1hfSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSxcImludGVyYWN0aXZlXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9pbnRlcmFjdGl2ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuX2ludGVyYWN0aXZlPWEsdGhpcy5zdGFnZSYmKHRoaXMuc3RhZ2UuZGlydHk9ITApfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLFwid29ybGRWaXNpYmxlXCIse2dldDpmdW5jdGlvbigpe3ZhciBhPXRoaXM7ZG97aWYoIWEudmlzaWJsZSlyZXR1cm4hMTthPWEucGFyZW50fXdoaWxlKGEpO3JldHVybiEwfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLFwibWFza1wiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fbWFza30sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuX21hc2smJih0aGlzLl9tYXNrLmlzTWFzaz0hMSksdGhpcy5fbWFzaz1hLHRoaXMuX21hc2smJih0aGlzLl9tYXNrLmlzTWFzaz0hMCl9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUsXCJmaWx0ZXJzXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9maWx0ZXJzfSxzZXQ6ZnVuY3Rpb24oYSl7aWYoYSl7Zm9yKHZhciBiPVtdLGM9MDtjPGEubGVuZ3RoO2MrKylmb3IodmFyIGQ9YVtjXS5wYXNzZXMsZT0wO2U8ZC5sZW5ndGg7ZSsrKWIucHVzaChkW2VdKTt0aGlzLl9maWx0ZXJCbG9jaz17dGFyZ2V0OnRoaXMsZmlsdGVyUGFzc2VzOmJ9fXRoaXMuX2ZpbHRlcnM9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSxcImNhY2hlQXNCaXRtYXBcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2NhY2hlQXNCaXRtYXB9LHNldDpmdW5jdGlvbihhKXt0aGlzLl9jYWNoZUFzQml0bWFwIT09YSYmKGE/dGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKTp0aGlzLl9kZXN0cm95Q2FjaGVkU3ByaXRlKCksdGhpcy5fY2FjaGVBc0JpdG1hcD1hKX19KSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybT1mdW5jdGlvbigpe3RoaXMucm90YXRpb24hPT10aGlzLnJvdGF0aW9uQ2FjaGUmJih0aGlzLnJvdGF0aW9uQ2FjaGU9dGhpcy5yb3RhdGlvbix0aGlzLl9zcj1NYXRoLnNpbih0aGlzLnJvdGF0aW9uKSx0aGlzLl9jcj1NYXRoLmNvcyh0aGlzLnJvdGF0aW9uKSk7dmFyIGE9dGhpcy5wYXJlbnQud29ybGRUcmFuc2Zvcm0sYj10aGlzLndvcmxkVHJhbnNmb3JtLGM9dGhpcy5waXZvdC54LGQ9dGhpcy5waXZvdC55LGU9dGhpcy5fY3IqdGhpcy5zY2FsZS54LGY9LXRoaXMuX3NyKnRoaXMuc2NhbGUueSxnPXRoaXMuX3NyKnRoaXMuc2NhbGUueCxoPXRoaXMuX2NyKnRoaXMuc2NhbGUueSxpPXRoaXMucG9zaXRpb24ueC1lKmMtZCpmLGo9dGhpcy5wb3NpdGlvbi55LWgqZC1jKmcsaz1hLmEsbD1hLmIsbT1hLmMsbj1hLmQ7Yi5hPWsqZStsKmcsYi5iPWsqZitsKmgsYi50eD1rKmkrbCpqK2EudHgsYi5jPW0qZStuKmcsYi5kPW0qZituKmgsYi50eT1tKmkrbipqK2EudHksdGhpcy53b3JsZEFscGhhPXRoaXMuYWxwaGEqdGhpcy5wYXJlbnQud29ybGRBbHBoYX0sYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5nZXRCb3VuZHM9ZnVuY3Rpb24oYSl7cmV0dXJuIGE9YSxiLkVtcHR5UmVjdGFuZ2xlfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmdldExvY2FsQm91bmRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0Qm91bmRzKGIuaWRlbnRpdHlNYXRyaXgpfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnNldFN0YWdlUmVmZXJlbmNlPWZ1bmN0aW9uKGEpe3RoaXMuc3RhZ2U9YSx0aGlzLl9pbnRlcmFjdGl2ZSYmKHRoaXMuc3RhZ2UuZGlydHk9ITApfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZT1mdW5jdGlvbihhKXt2YXIgYz10aGlzLmdldExvY2FsQm91bmRzKCksZD1uZXcgYi5SZW5kZXJUZXh0dXJlKDB8Yy53aWR0aCwwfGMuaGVpZ2h0LGEpO3JldHVybiBkLnJlbmRlcih0aGlzLG5ldyBiLlBvaW50KC1jLngsLWMueSkpLGR9LGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUudXBkYXRlQ2FjaGU9ZnVuY3Rpb24oKXt0aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLl9yZW5kZXJDYWNoZWRTcHJpdGU9ZnVuY3Rpb24oYSl7dGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkQWxwaGE9dGhpcy53b3JsZEFscGhhLGEuZ2w/Yi5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJXZWJHTC5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSxhKTpiLlNwcml0ZS5wcm90b3R5cGUuX3JlbmRlckNhbnZhcy5jYWxsKHRoaXMuX2NhY2hlZFNwcml0ZSxhKX0sYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fZ2VuZXJhdGVDYWNoZWRTcHJpdGU9ZnVuY3Rpb24oKXt0aGlzLl9jYWNoZUFzQml0bWFwPSExO3ZhciBhPXRoaXMuZ2V0TG9jYWxCb3VuZHMoKTtpZih0aGlzLl9jYWNoZWRTcHJpdGUpdGhpcy5fY2FjaGVkU3ByaXRlLnRleHR1cmUucmVzaXplKDB8YS53aWR0aCwwfGEuaGVpZ2h0KTtlbHNle3ZhciBjPW5ldyBiLlJlbmRlclRleHR1cmUoMHxhLndpZHRoLDB8YS5oZWlnaHQpO3RoaXMuX2NhY2hlZFNwcml0ZT1uZXcgYi5TcHJpdGUoYyksdGhpcy5fY2FjaGVkU3ByaXRlLndvcmxkVHJhbnNmb3JtPXRoaXMud29ybGRUcmFuc2Zvcm19dmFyIGQ9dGhpcy5fZmlsdGVyczt0aGlzLl9maWx0ZXJzPW51bGwsdGhpcy5fY2FjaGVkU3ByaXRlLmZpbHRlcnM9ZCx0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5yZW5kZXIodGhpcyxuZXcgYi5Qb2ludCgtYS54LC1hLnkpKSx0aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLng9LShhLngvYS53aWR0aCksdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55PS0oYS55L2EuaGVpZ2h0KSx0aGlzLl9maWx0ZXJzPWQsdGhpcy5fY2FjaGVBc0JpdG1hcD0hMH0sYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fZGVzdHJveUNhY2hlZFNwcml0ZT1mdW5jdGlvbigpe3RoaXMuX2NhY2hlZFNwcml0ZSYmKHRoaXMuX2NhY2hlZFNwcml0ZS50ZXh0dXJlLmRlc3Ryb3koITApLHRoaXMuX2NhY2hlZFNwcml0ZT1udWxsKX0sYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fcmVuZGVyV2ViR0w9ZnVuY3Rpb24oYSl7YT1hfSxiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLl9yZW5kZXJDYW52YXM9ZnVuY3Rpb24oYSl7YT1hfSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSxcInhcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucG9zaXRpb24ueH0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMucG9zaXRpb24ueD1hfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLFwieVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wb3NpdGlvbi55fSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5wb3NpdGlvbi55PWF9fSksYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyPWZ1bmN0aW9uKCl7Yi5EaXNwbGF5T2JqZWN0LmNhbGwodGhpcyksdGhpcy5jaGlsZHJlbj1bXX0sYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUpLGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLFwid2lkdGhcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2NhbGUueCp0aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGh9LHNldDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLmdldExvY2FsQm91bmRzKCkud2lkdGg7dGhpcy5zY2FsZS54PTAhPT1iP2EvKGIvdGhpcy5zY2FsZS54KToxLHRoaXMuX3dpZHRoPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUsXCJoZWlnaHRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2NhbGUueSp0aGlzLmdldExvY2FsQm91bmRzKCkuaGVpZ2h0fSxzZXQ6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5nZXRMb2NhbEJvdW5kcygpLmhlaWdodDt0aGlzLnNjYWxlLnk9MCE9PWI/YS8oYi90aGlzLnNjYWxlLnkpOjEsdGhpcy5faGVpZ2h0PWF9fSksYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5hZGRDaGlsZD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5hZGRDaGlsZEF0KGEsdGhpcy5jaGlsZHJlbi5sZW5ndGgpfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmFkZENoaWxkQXQ9ZnVuY3Rpb24oYSxiKXtpZihiPj0wJiZiPD10aGlzLmNoaWxkcmVuLmxlbmd0aClyZXR1cm4gYS5wYXJlbnQmJmEucGFyZW50LnJlbW92ZUNoaWxkKGEpLGEucGFyZW50PXRoaXMsdGhpcy5jaGlsZHJlbi5zcGxpY2UoYiwwLGEpLHRoaXMuc3RhZ2UmJmEuc2V0U3RhZ2VSZWZlcmVuY2UodGhpcy5zdGFnZSksYTt0aHJvdyBuZXcgRXJyb3IoYStcIiBUaGUgaW5kZXggXCIrYitcIiBzdXBwbGllZCBpcyBvdXQgb2YgYm91bmRzIFwiK3RoaXMuY2hpbGRyZW4ubGVuZ3RoKX0sYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5zd2FwQ2hpbGRyZW49ZnVuY3Rpb24oYSxiKXtpZihhIT09Yil7dmFyIGM9dGhpcy5jaGlsZHJlbi5pbmRleE9mKGEpLGQ9dGhpcy5jaGlsZHJlbi5pbmRleE9mKGIpO2lmKDA+Y3x8MD5kKXRocm93IG5ldyBFcnJvcihcInN3YXBDaGlsZHJlbjogQm90aCB0aGUgc3VwcGxpZWQgRGlzcGxheU9iamVjdHMgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXIuXCIpO3RoaXMuY2hpbGRyZW5bY109Yix0aGlzLmNoaWxkcmVuW2RdPWF9fSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldENoaWxkQXQ9ZnVuY3Rpb24oYSl7aWYoYT49MCYmYTx0aGlzLmNoaWxkcmVuLmxlbmd0aClyZXR1cm4gdGhpcy5jaGlsZHJlblthXTt0aHJvdyBuZXcgRXJyb3IoXCJTdXBwbGllZCBpbmRleCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgY2hpbGQgbGlzdCwgb3IgdGhlIHN1cHBsaWVkIERpc3BsYXlPYmplY3QgbXVzdCBiZSBhIGNoaWxkIG9mIHRoZSBjYWxsZXJcIil9LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucmVtb3ZlQ2hpbGRBdCh0aGlzLmNoaWxkcmVuLmluZGV4T2YoYSkpfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkQXQ9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5nZXRDaGlsZEF0KGEpO3JldHVybiB0aGlzLnN0YWdlJiZiLnJlbW92ZVN0YWdlUmVmZXJlbmNlKCksYi5wYXJlbnQ9dm9pZCAwLHRoaXMuY2hpbGRyZW4uc3BsaWNlKGEsMSksYn0sYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbj1mdW5jdGlvbihhLGIpe3ZhciBjPWF8fDAsZD1cIm51bWJlclwiPT10eXBlb2YgYj9iOnRoaXMuY2hpbGRyZW4ubGVuZ3RoLGU9ZC1jO2lmKGU+MCYmZD49ZSl7Zm9yKHZhciBmPXRoaXMuY2hpbGRyZW4uc3BsaWNlKGMsZSksZz0wO2c8Zi5sZW5ndGg7ZysrKXt2YXIgaD1mW2ddO3RoaXMuc3RhZ2UmJmgucmVtb3ZlU3RhZ2VSZWZlcmVuY2UoKSxoLnBhcmVudD12b2lkIDB9cmV0dXJuIGZ9dGhyb3cgbmV3IEVycm9yKFwiUmFuZ2UgRXJyb3IsIG51bWVyaWMgdmFsdWVzIGFyZSBvdXRzaWRlIHRoZSBhY2NlcHRhYmxlIHJhbmdlXCIpfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybT1mdW5jdGlvbigpe2lmKHRoaXMudmlzaWJsZSYmKGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtLmNhbGwodGhpcyksIXRoaXMuX2NhY2hlQXNCaXRtYXApKWZvcih2YXIgYT0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Yz5hO2ErKyl0aGlzLmNoaWxkcmVuW2FdLnVwZGF0ZVRyYW5zZm9ybSgpfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldEJvdW5kcz1mdW5jdGlvbihhKXtpZigwPT09dGhpcy5jaGlsZHJlbi5sZW5ndGgpcmV0dXJuIGIuRW1wdHlSZWN0YW5nbGU7aWYoYSl7dmFyIGM9dGhpcy53b3JsZFRyYW5zZm9ybTt0aGlzLndvcmxkVHJhbnNmb3JtPWEsdGhpcy51cGRhdGVUcmFuc2Zvcm0oKSx0aGlzLndvcmxkVHJhbnNmb3JtPWN9Zm9yKHZhciBkLGUsZixnPTEvMCxoPTEvMCxpPS0xLzAsaj0tMS8wLGs9ITEsbD0wLG09dGhpcy5jaGlsZHJlbi5sZW5ndGg7bT5sO2wrKyl7dmFyIG49dGhpcy5jaGlsZHJlbltsXTtuLnZpc2libGUmJihrPSEwLGQ9dGhpcy5jaGlsZHJlbltsXS5nZXRCb3VuZHMoYSksZz1nPGQueD9nOmQueCxoPWg8ZC55P2g6ZC55LGU9ZC53aWR0aCtkLngsZj1kLmhlaWdodCtkLnksaT1pPmU/aTplLGo9aj5mP2o6Zil9aWYoIWspcmV0dXJuIGIuRW1wdHlSZWN0YW5nbGU7dmFyIG89dGhpcy5fYm91bmRzO3JldHVybiBvLng9ZyxvLnk9aCxvLndpZHRoPWktZyxvLmhlaWdodD1qLWgsb30sYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRMb2NhbEJvdW5kcz1mdW5jdGlvbigpe3ZhciBhPXRoaXMud29ybGRUcmFuc2Zvcm07dGhpcy53b3JsZFRyYW5zZm9ybT1iLmlkZW50aXR5TWF0cml4O2Zvcih2YXIgYz0wLGQ9dGhpcy5jaGlsZHJlbi5sZW5ndGg7ZD5jO2MrKyl0aGlzLmNoaWxkcmVuW2NdLnVwZGF0ZVRyYW5zZm9ybSgpO3ZhciBlPXRoaXMuZ2V0Qm91bmRzKCk7cmV0dXJuIHRoaXMud29ybGRUcmFuc2Zvcm09YSxlfSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnNldFN0YWdlUmVmZXJlbmNlPWZ1bmN0aW9uKGEpe3RoaXMuc3RhZ2U9YSx0aGlzLl9pbnRlcmFjdGl2ZSYmKHRoaXMuc3RhZ2UuZGlydHk9ITApO2Zvcih2YXIgYj0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Yz5iO2IrKyl7dmFyIGQ9dGhpcy5jaGlsZHJlbltiXTtkLnNldFN0YWdlUmVmZXJlbmNlKGEpfX0sYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVTdGFnZVJlZmVyZW5jZT1mdW5jdGlvbigpe2Zvcih2YXIgYT0wLGI9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Yj5hO2ErKyl7dmFyIGM9dGhpcy5jaGlsZHJlblthXTtjLnJlbW92ZVN0YWdlUmVmZXJlbmNlKCl9dGhpcy5faW50ZXJhY3RpdmUmJih0aGlzLnN0YWdlLmRpcnR5PSEwKSx0aGlzLnN0YWdlPW51bGx9LGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuX3JlbmRlcldlYkdMPWZ1bmN0aW9uKGEpe2lmKHRoaXMudmlzaWJsZSYmISh0aGlzLmFscGhhPD0wKSl7aWYodGhpcy5fY2FjaGVBc0JpdG1hcClyZXR1cm4gdGhpcy5fcmVuZGVyQ2FjaGVkU3ByaXRlKGEpLHZvaWQgMDt2YXIgYixjO2lmKHRoaXMuX21hc2t8fHRoaXMuX2ZpbHRlcnMpe2Zvcih0aGlzLl9maWx0ZXJzJiYoYS5zcHJpdGVCYXRjaC5mbHVzaCgpLGEuZmlsdGVyTWFuYWdlci5wdXNoRmlsdGVyKHRoaXMuX2ZpbHRlckJsb2NrKSksdGhpcy5fbWFzayYmKGEuc3ByaXRlQmF0Y2guc3RvcCgpLGEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5tYXNrLGEpLGEuc3ByaXRlQmF0Y2guc3RhcnQoKSksYj0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Yz5iO2IrKyl0aGlzLmNoaWxkcmVuW2JdLl9yZW5kZXJXZWJHTChhKTthLnNwcml0ZUJhdGNoLnN0b3AoKSx0aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnBvcE1hc2sodGhpcy5fbWFzayxhKSx0aGlzLl9maWx0ZXJzJiZhLmZpbHRlck1hbmFnZXIucG9wRmlsdGVyKCksYS5zcHJpdGVCYXRjaC5zdGFydCgpfWVsc2UgZm9yKGI9MCxjPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2M+YjtiKyspdGhpcy5jaGlsZHJlbltiXS5fcmVuZGVyV2ViR0woYSl9fSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLl9yZW5kZXJDYW52YXM9ZnVuY3Rpb24oYSl7aWYodGhpcy52aXNpYmxlIT09ITEmJjAhPT10aGlzLmFscGhhKXtpZih0aGlzLl9jYWNoZUFzQml0bWFwKXJldHVybiB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUoYSksdm9pZCAwO3RoaXMuX21hc2smJmEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzayxhLmNvbnRleHQpO2Zvcih2YXIgYj0wLGM9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Yz5iO2IrKyl7dmFyIGQ9dGhpcy5jaGlsZHJlbltiXTtkLl9yZW5kZXJDYW52YXMoYSl9dGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wb3BNYXNrKGEuY29udGV4dCl9fSxiLlNwcml0ZT1mdW5jdGlvbihhKXtiLkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKSx0aGlzLmFuY2hvcj1uZXcgYi5Qb2ludCx0aGlzLnRleHR1cmU9YSx0aGlzLl93aWR0aD0wLHRoaXMuX2hlaWdodD0wLHRoaXMudGludD0xNjc3NzIxNSx0aGlzLmJsZW5kTW9kZT1iLmJsZW5kTW9kZXMuTk9STUFMLGEuYmFzZVRleHR1cmUuaGFzTG9hZGVkP3RoaXMub25UZXh0dXJlVXBkYXRlKCk6KHRoaXMub25UZXh0dXJlVXBkYXRlQmluZD10aGlzLm9uVGV4dHVyZVVwZGF0ZS5iaW5kKHRoaXMpLHRoaXMudGV4dHVyZS5hZGRFdmVudExpc3RlbmVyKFwidXBkYXRlXCIsdGhpcy5vblRleHR1cmVVcGRhdGVCaW5kKSksdGhpcy5yZW5kZXJhYmxlPSEwfSxiLlNwcml0ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlKSxiLlNwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5TcHJpdGUsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuU3ByaXRlLnByb3RvdHlwZSxcIndpZHRoXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNjYWxlLngqdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRofSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5zY2FsZS54PWEvdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoLHRoaXMuX3dpZHRoPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuU3ByaXRlLnByb3RvdHlwZSxcImhlaWdodFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY2FsZS55KnRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHR9LHNldDpmdW5jdGlvbihhKXt0aGlzLnNjYWxlLnk9YS90aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0LHRoaXMuX2hlaWdodD1hfX0pLGIuU3ByaXRlLnByb3RvdHlwZS5zZXRUZXh0dXJlPWZ1bmN0aW9uKGEpe3RoaXMudGV4dHVyZT1hLHRoaXMuY2FjaGVkVGludD0xNjc3NzIxNX0sYi5TcHJpdGUucHJvdG90eXBlLm9uVGV4dHVyZVVwZGF0ZT1mdW5jdGlvbigpe3RoaXMuX3dpZHRoJiYodGhpcy5zY2FsZS54PXRoaXMuX3dpZHRoL3RoaXMudGV4dHVyZS5mcmFtZS53aWR0aCksdGhpcy5faGVpZ2h0JiYodGhpcy5zY2FsZS55PXRoaXMuX2hlaWdodC90aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0KX0sYi5TcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLnRleHR1cmUuZnJhbWUud2lkdGgsYz10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0LGQ9YiooMS10aGlzLmFuY2hvci54KSxlPWIqLXRoaXMuYW5jaG9yLngsZj1jKigxLXRoaXMuYW5jaG9yLnkpLGc9YyotdGhpcy5hbmNob3IueSxoPWF8fHRoaXMud29ybGRUcmFuc2Zvcm0saT1oLmEsaj1oLmMsaz1oLmIsbD1oLmQsbT1oLnR4LG49aC50eSxvPWkqZStrKmcrbSxwPWwqZytqKmUrbixxPWkqZCtrKmcrbSxyPWwqZytqKmQrbixzPWkqZCtrKmYrbSx0PWwqZitqKmQrbix1PWkqZStrKmYrbSx2PWwqZitqKmUrbix3PS0xLzAseD0tMS8wLHk9MS8wLHo9MS8wO3k9eT5vP286eSx5PXk+cT9xOnkseT15PnM/czp5LHk9eT51P3U6eSx6PXo+cD9wOnosej16PnI/cjp6LHo9ej50P3Q6eix6PXo+dj92Onosdz1vPnc/bzp3LHc9cT53P3E6dyx3PXM+dz9zOncsdz11Pnc/dTp3LHg9cD54P3A6eCx4PXI+eD9yOngseD10Png/dDp4LHg9dj54P3Y6eDt2YXIgQT10aGlzLl9ib3VuZHM7cmV0dXJuIEEueD15LEEud2lkdGg9dy15LEEueT16LEEuaGVpZ2h0PXgteix0aGlzLl9jdXJyZW50Qm91bmRzPUEsQX0sYi5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJXZWJHTD1mdW5jdGlvbihhKXtpZih0aGlzLnZpc2libGUmJiEodGhpcy5hbHBoYTw9MCkpe3ZhciBiLGM7aWYodGhpcy5fbWFza3x8dGhpcy5fZmlsdGVycyl7dmFyIGQ9YS5zcHJpdGVCYXRjaDtmb3IodGhpcy5fZmlsdGVycyYmKGQuZmx1c2goKSxhLmZpbHRlck1hbmFnZXIucHVzaEZpbHRlcih0aGlzLl9maWx0ZXJCbG9jaykpLHRoaXMuX21hc2smJihkLnN0b3AoKSxhLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMubWFzayxhKSxkLnN0YXJ0KCkpLGQucmVuZGVyKHRoaXMpLGI9MCxjPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2M+YjtiKyspdGhpcy5jaGlsZHJlbltiXS5fcmVuZGVyV2ViR0woYSk7ZC5zdG9wKCksdGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wb3BNYXNrKHRoaXMuX21hc2ssYSksdGhpcy5fZmlsdGVycyYmYS5maWx0ZXJNYW5hZ2VyLnBvcEZpbHRlcigpLGQuc3RhcnQoKX1lbHNlIGZvcihhLnNwcml0ZUJhdGNoLnJlbmRlcih0aGlzKSxiPTAsYz10aGlzLmNoaWxkcmVuLmxlbmd0aDtjPmI7YisrKXRoaXMuY2hpbGRyZW5bYl0uX3JlbmRlcldlYkdMKGEpfX0sYi5TcHJpdGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXM9ZnVuY3Rpb24oYSl7aWYodGhpcy52aXNpYmxlIT09ITEmJjAhPT10aGlzLmFscGhhKXtpZih0aGlzLmJsZW5kTW9kZSE9PWEuY3VycmVudEJsZW5kTW9kZSYmKGEuY3VycmVudEJsZW5kTW9kZT10aGlzLmJsZW5kTW9kZSxhLmNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPWIuYmxlbmRNb2Rlc0NhbnZhc1thLmN1cnJlbnRCbGVuZE1vZGVdKSx0aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssYS5jb250ZXh0KSx0aGlzLnRleHR1cmUudmFsaWQpe2EuY29udGV4dC5nbG9iYWxBbHBoYT10aGlzLndvcmxkQWxwaGEsYS5yb3VuZFBpeGVscz9hLmNvbnRleHQuc2V0VHJhbnNmb3JtKHRoaXMud29ybGRUcmFuc2Zvcm0uYSx0aGlzLndvcmxkVHJhbnNmb3JtLmMsdGhpcy53b3JsZFRyYW5zZm9ybS5iLHRoaXMud29ybGRUcmFuc2Zvcm0uZCwwfHRoaXMud29ybGRUcmFuc2Zvcm0udHgsMHx0aGlzLndvcmxkVHJhbnNmb3JtLnR5KTphLmNvbnRleHQuc2V0VHJhbnNmb3JtKHRoaXMud29ybGRUcmFuc2Zvcm0uYSx0aGlzLndvcmxkVHJhbnNmb3JtLmMsdGhpcy53b3JsZFRyYW5zZm9ybS5iLHRoaXMud29ybGRUcmFuc2Zvcm0uZCx0aGlzLndvcmxkVHJhbnNmb3JtLnR4LHRoaXMud29ybGRUcmFuc2Zvcm0udHkpLGEuc21vb3RoUHJvcGVydHkmJmEuc2NhbGVNb2RlIT09dGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLnNjYWxlTW9kZSYmKGEuc2NhbGVNb2RlPXRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5zY2FsZU1vZGUsYS5jb250ZXh0W2Euc21vb3RoUHJvcGVydHldPWEuc2NhbGVNb2RlPT09Yi5zY2FsZU1vZGVzLkxJTkVBUik7dmFyIGM9dGhpcy50ZXh0dXJlLnRyaW0/dGhpcy50ZXh0dXJlLnRyaW0ueC10aGlzLmFuY2hvci54KnRoaXMudGV4dHVyZS50cmltLndpZHRoOnRoaXMuYW5jaG9yLngqLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aCxkPXRoaXMudGV4dHVyZS50cmltP3RoaXMudGV4dHVyZS50cmltLnktdGhpcy5hbmNob3IueSp0aGlzLnRleHR1cmUudHJpbS5oZWlnaHQ6dGhpcy5hbmNob3IueSotdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDsxNjc3NzIxNSE9PXRoaXMudGludD8odGhpcy5jYWNoZWRUaW50IT09dGhpcy50aW50JiYodGhpcy5jYWNoZWRUaW50PXRoaXMudGludCx0aGlzLnRpbnRlZFRleHR1cmU9Yi5DYW52YXNUaW50ZXIuZ2V0VGludGVkVGV4dHVyZSh0aGlzLHRoaXMudGludCkpLGEuY29udGV4dC5kcmF3SW1hZ2UodGhpcy50aW50ZWRUZXh0dXJlLDAsMCx0aGlzLnRleHR1cmUuY3JvcC53aWR0aCx0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsYyxkLHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCkpOmEuY29udGV4dC5kcmF3SW1hZ2UodGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZSx0aGlzLnRleHR1cmUuY3JvcC54LHRoaXMudGV4dHVyZS5jcm9wLnksdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LGMsZCx0aGlzLnRleHR1cmUuY3JvcC53aWR0aCx0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQpfWZvcih2YXIgZT0wLGY9dGhpcy5jaGlsZHJlbi5sZW5ndGg7Zj5lO2UrKyl0aGlzLmNoaWxkcmVuW2VdLl9yZW5kZXJDYW52YXMoYSk7dGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wb3BNYXNrKGEuY29udGV4dCl9fSxiLlNwcml0ZS5mcm9tRnJhbWU9ZnVuY3Rpb24oYSl7dmFyIGM9Yi5UZXh0dXJlQ2FjaGVbYV07aWYoIWMpdGhyb3cgbmV3IEVycm9yKCdUaGUgZnJhbWVJZCBcIicrYSsnXCIgZG9lcyBub3QgZXhpc3QgaW4gdGhlIHRleHR1cmUgY2FjaGUnK3RoaXMpO3JldHVybiBuZXcgYi5TcHJpdGUoYyl9LGIuU3ByaXRlLmZyb21JbWFnZT1mdW5jdGlvbihhLGMsZCl7dmFyIGU9Yi5UZXh0dXJlLmZyb21JbWFnZShhLGMsZCk7cmV0dXJuIG5ldyBiLlNwcml0ZShlKX0sYi5TcHJpdGVCYXRjaD1mdW5jdGlvbihhKXtiLkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKSx0aGlzLnRleHR1cmVUaGluZz1hLHRoaXMucmVhZHk9ITF9LGIuU3ByaXRlQmF0Y2gucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSksYi5TcHJpdGVCYXRjaC5jb25zdHJ1Y3Rvcj1iLlNwcml0ZUJhdGNoLGIuU3ByaXRlQmF0Y2gucHJvdG90eXBlLmluaXRXZWJHTD1mdW5jdGlvbihhKXt0aGlzLmZhc3RTcHJpdGVCYXRjaD1uZXcgYi5XZWJHTEZhc3RTcHJpdGVCYXRjaChhKSx0aGlzLnJlYWR5PSEwfSxiLlNwcml0ZUJhdGNoLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm09ZnVuY3Rpb24oKXtiLkRpc3BsYXlPYmplY3QucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybS5jYWxsKHRoaXMpfSxiLlNwcml0ZUJhdGNoLnByb3RvdHlwZS5fcmVuZGVyV2ViR0w9ZnVuY3Rpb24oYSl7IXRoaXMudmlzaWJsZXx8dGhpcy5hbHBoYTw9MHx8IXRoaXMuY2hpbGRyZW4ubGVuZ3RofHwodGhpcy5yZWFkeXx8dGhpcy5pbml0V2ViR0woYS5nbCksYS5zcHJpdGVCYXRjaC5zdG9wKCksYS5zaGFkZXJNYW5hZ2VyLnNldFNoYWRlcihhLnNoYWRlck1hbmFnZXIuZmFzdFNoYWRlciksdGhpcy5mYXN0U3ByaXRlQmF0Y2guYmVnaW4odGhpcyxhKSx0aGlzLmZhc3RTcHJpdGVCYXRjaC5yZW5kZXIodGhpcyksYS5zcHJpdGVCYXRjaC5zdGFydCgpKX0sYi5TcHJpdGVCYXRjaC5wcm90b3R5cGUuX3JlbmRlckNhbnZhcz1mdW5jdGlvbihhKXt2YXIgYz1hLmNvbnRleHQ7Yy5nbG9iYWxBbHBoYT10aGlzLndvcmxkQWxwaGEsYi5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0uY2FsbCh0aGlzKTtmb3IodmFyIGQ9dGhpcy53b3JsZFRyYW5zZm9ybSxlPSEwLGY9MDtmPHRoaXMuY2hpbGRyZW4ubGVuZ3RoO2YrKyl7dmFyIGc9dGhpcy5jaGlsZHJlbltmXTtpZihnLnZpc2libGUpe3ZhciBoPWcudGV4dHVyZSxpPWguZnJhbWU7aWYoYy5nbG9iYWxBbHBoYT10aGlzLndvcmxkQWxwaGEqZy5hbHBoYSxnLnJvdGF0aW9uJSgyKk1hdGguUEkpPT09MCllJiYoYy5zZXRUcmFuc2Zvcm0oZC5hLGQuYyxkLmIsZC5kLGQudHgsZC50eSksZT0hMSksYy5kcmF3SW1hZ2UoaC5iYXNlVGV4dHVyZS5zb3VyY2UsaS54LGkueSxpLndpZHRoLGkuaGVpZ2h0LGcuYW5jaG9yLngqLWkud2lkdGgqZy5zY2FsZS54K2cucG9zaXRpb24ueCsuNXwwLGcuYW5jaG9yLnkqLWkuaGVpZ2h0Kmcuc2NhbGUueStnLnBvc2l0aW9uLnkrLjV8MCxpLndpZHRoKmcuc2NhbGUueCxpLmhlaWdodCpnLnNjYWxlLnkpO2Vsc2V7ZXx8KGU9ITApLGIuRGlzcGxheU9iamVjdC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtLmNhbGwoZyk7dmFyIGo9Zy53b3JsZFRyYW5zZm9ybTthLnJvdW5kUGl4ZWxzP2Muc2V0VHJhbnNmb3JtKGouYSxqLmMsai5iLGouZCwwfGoudHgsMHxqLnR5KTpjLnNldFRyYW5zZm9ybShqLmEsai5jLGouYixqLmQsai50eCxqLnR5KSxjLmRyYXdJbWFnZShoLmJhc2VUZXh0dXJlLnNvdXJjZSxpLngsaS55LGkud2lkdGgsaS5oZWlnaHQsZy5hbmNob3IueCotaS53aWR0aCsuNXwwLGcuYW5jaG9yLnkqLWkuaGVpZ2h0Ky41fDAsaS53aWR0aCxpLmhlaWdodCl9fX19LGIuTW92aWVDbGlwPWZ1bmN0aW9uKGEpe2IuU3ByaXRlLmNhbGwodGhpcyxhWzBdKSx0aGlzLnRleHR1cmVzPWEsdGhpcy5hbmltYXRpb25TcGVlZD0xLHRoaXMubG9vcD0hMCx0aGlzLm9uQ29tcGxldGU9bnVsbCx0aGlzLmN1cnJlbnRGcmFtZT0wLHRoaXMucGxheWluZz0hMX0sYi5Nb3ZpZUNsaXAucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5TcHJpdGUucHJvdG90eXBlKSxiLk1vdmllQ2xpcC5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5Nb3ZpZUNsaXAsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuTW92aWVDbGlwLnByb3RvdHlwZSxcInRvdGFsRnJhbWVzXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnRleHR1cmVzLmxlbmd0aH19KSxiLk1vdmllQ2xpcC5wcm90b3R5cGUuc3RvcD1mdW5jdGlvbigpe3RoaXMucGxheWluZz0hMX0sYi5Nb3ZpZUNsaXAucHJvdG90eXBlLnBsYXk9ZnVuY3Rpb24oKXt0aGlzLnBsYXlpbmc9ITB9LGIuTW92aWVDbGlwLnByb3RvdHlwZS5nb3RvQW5kU3RvcD1mdW5jdGlvbihhKXt0aGlzLnBsYXlpbmc9ITEsdGhpcy5jdXJyZW50RnJhbWU9YTt2YXIgYj10aGlzLmN1cnJlbnRGcmFtZSsuNXwwO3RoaXMuc2V0VGV4dHVyZSh0aGlzLnRleHR1cmVzW2IldGhpcy50ZXh0dXJlcy5sZW5ndGhdKX0sYi5Nb3ZpZUNsaXAucHJvdG90eXBlLmdvdG9BbmRQbGF5PWZ1bmN0aW9uKGEpe3RoaXMuY3VycmVudEZyYW1lPWEsdGhpcy5wbGF5aW5nPSEwfSxiLk1vdmllQ2xpcC5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtPWZ1bmN0aW9uKCl7aWYoYi5TcHJpdGUucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybS5jYWxsKHRoaXMpLHRoaXMucGxheWluZyl7dGhpcy5jdXJyZW50RnJhbWUrPXRoaXMuYW5pbWF0aW9uU3BlZWQ7dmFyIGE9dGhpcy5jdXJyZW50RnJhbWUrLjV8MDt0aGlzLmN1cnJlbnRGcmFtZT10aGlzLmN1cnJlbnRGcmFtZSV0aGlzLnRleHR1cmVzLmxlbmd0aCx0aGlzLmxvb3B8fGE8dGhpcy50ZXh0dXJlcy5sZW5ndGg/dGhpcy5zZXRUZXh0dXJlKHRoaXMudGV4dHVyZXNbYSV0aGlzLnRleHR1cmVzLmxlbmd0aF0pOmE+PXRoaXMudGV4dHVyZXMubGVuZ3RoJiYodGhpcy5nb3RvQW5kU3RvcCh0aGlzLnRleHR1cmVzLmxlbmd0aC0xKSx0aGlzLm9uQ29tcGxldGUmJnRoaXMub25Db21wbGV0ZSgpKX19LGIuTW92aWVDbGlwLmZyb21GcmFtZXM9ZnVuY3Rpb24oYSl7Zm9yKHZhciBjPVtdLGQ9MDtkPGEubGVuZ3RoO2QrKyljLnB1c2gobmV3IGIuVGV4dHVyZS5mcm9tRnJhbWUoYVtkXSkpO3JldHVybiBuZXcgYi5Nb3ZpZUNsaXAoYyl9LGIuTW92aWVDbGlwLmZyb21JbWFnZXM9ZnVuY3Rpb24oYSl7Zm9yKHZhciBjPVtdLGQ9MDtkPGEubGVuZ3RoO2QrKyljLnB1c2gobmV3IGIuVGV4dHVyZS5mcm9tSW1hZ2UoYVtkXSkpO3JldHVybiBuZXcgYi5Nb3ZpZUNsaXAoYyl9LGIuRmlsdGVyQmxvY2s9ZnVuY3Rpb24oKXt0aGlzLnZpc2libGU9ITAsdGhpcy5yZW5kZXJhYmxlPSEwfSxiLlRleHQ9ZnVuY3Rpb24oYSxjKXt0aGlzLmNhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLHRoaXMuY29udGV4dD10aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksYi5TcHJpdGUuY2FsbCh0aGlzLGIuVGV4dHVyZS5mcm9tQ2FudmFzKHRoaXMuY2FudmFzKSksdGhpcy5zZXRUZXh0KGEpLHRoaXMuc2V0U3R5bGUoYyl9LGIuVGV4dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLlNwcml0ZS5wcm90b3R5cGUpLGIuVGV4dC5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5UZXh0LE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLlRleHQucHJvdG90eXBlLFwid2lkdGhcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGlydHkmJih0aGlzLnVwZGF0ZVRleHQoKSx0aGlzLmRpcnR5PSExKSx0aGlzLnNjYWxlLngqdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRofSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5zY2FsZS54PWEvdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoLHRoaXMuX3dpZHRoPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuVGV4dC5wcm90b3R5cGUsXCJoZWlnaHRcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGlydHkmJih0aGlzLnVwZGF0ZVRleHQoKSx0aGlzLmRpcnR5PSExKSx0aGlzLnNjYWxlLnkqdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodH0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuc2NhbGUueT1hL3RoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQsdGhpcy5faGVpZ2h0PWF9fSksYi5UZXh0LnByb3RvdHlwZS5zZXRTdHlsZT1mdW5jdGlvbihhKXthPWF8fHt9LGEuZm9udD1hLmZvbnR8fFwiYm9sZCAyMHB0IEFyaWFsXCIsYS5maWxsPWEuZmlsbHx8XCJibGFja1wiLGEuYWxpZ249YS5hbGlnbnx8XCJsZWZ0XCIsYS5zdHJva2U9YS5zdHJva2V8fFwiYmxhY2tcIixhLnN0cm9rZVRoaWNrbmVzcz1hLnN0cm9rZVRoaWNrbmVzc3x8MCxhLndvcmRXcmFwPWEud29yZFdyYXB8fCExLGEud29yZFdyYXBXaWR0aD1hLndvcmRXcmFwV2lkdGh8fDEwMCxhLndvcmRXcmFwV2lkdGg9YS53b3JkV3JhcFdpZHRofHwxMDAsYS5kcm9wU2hhZG93PWEuZHJvcFNoYWRvd3x8ITEsYS5kcm9wU2hhZG93QW5nbGU9YS5kcm9wU2hhZG93QW5nbGV8fE1hdGguUEkvNixhLmRyb3BTaGFkb3dEaXN0YW5jZT1hLmRyb3BTaGFkb3dEaXN0YW5jZXx8NCxhLmRyb3BTaGFkb3dDb2xvcj1hLmRyb3BTaGFkb3dDb2xvcnx8XCJibGFja1wiLHRoaXMuc3R5bGU9YSx0aGlzLmRpcnR5PSEwfSxiLlRleHQucHJvdG90eXBlLnNldFRleHQ9ZnVuY3Rpb24oYSl7dGhpcy50ZXh0PWEudG9TdHJpbmcoKXx8XCIgXCIsdGhpcy5kaXJ0eT0hMH0sYi5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0PWZ1bmN0aW9uKCl7dGhpcy5jb250ZXh0LmZvbnQ9dGhpcy5zdHlsZS5mb250O3ZhciBhPXRoaXMudGV4dDt0aGlzLnN0eWxlLndvcmRXcmFwJiYoYT10aGlzLndvcmRXcmFwKHRoaXMudGV4dCkpO2Zvcih2YXIgYj1hLnNwbGl0KC8oPzpcXHJcXG58XFxyfFxcbikvKSxjPVtdLGQ9MCxlPTA7ZTxiLmxlbmd0aDtlKyspe3ZhciBmPXRoaXMuY29udGV4dC5tZWFzdXJlVGV4dChiW2VdKS53aWR0aDtjW2VdPWYsZD1NYXRoLm1heChkLGYpfXZhciBnPWQrdGhpcy5zdHlsZS5zdHJva2VUaGlja25lc3M7dGhpcy5zdHlsZS5kcm9wU2hhZG93JiYoZys9dGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UpLHRoaXMuY2FudmFzLndpZHRoPWcrdGhpcy5jb250ZXh0LmxpbmVXaWR0aDt2YXIgaD10aGlzLmRldGVybWluZUZvbnRIZWlnaHQoXCJmb250OiBcIit0aGlzLnN0eWxlLmZvbnQrXCI7XCIpK3RoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzLGk9aCpiLmxlbmd0aDt0aGlzLnN0eWxlLmRyb3BTaGFkb3cmJihpKz10aGlzLnN0eWxlLmRyb3BTaGFkb3dEaXN0YW5jZSksdGhpcy5jYW52YXMuaGVpZ2h0PWksbmF2aWdhdG9yLmlzQ29jb29uSlMmJnRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwwLHRoaXMuY2FudmFzLndpZHRoLHRoaXMuY2FudmFzLmhlaWdodCksdGhpcy5jb250ZXh0LmZvbnQ9dGhpcy5zdHlsZS5mb250LHRoaXMuY29udGV4dC5zdHJva2VTdHlsZT10aGlzLnN0eWxlLnN0cm9rZSx0aGlzLmNvbnRleHQubGluZVdpZHRoPXRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzLHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmU9XCJ0b3BcIjt2YXIgaixrO2lmKHRoaXMuc3R5bGUuZHJvcFNoYWRvdyl7dGhpcy5jb250ZXh0LmZpbGxTdHlsZT10aGlzLnN0eWxlLmRyb3BTaGFkb3dDb2xvcjt2YXIgbD1NYXRoLnNpbih0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkqdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2UsbT1NYXRoLmNvcyh0aGlzLnN0eWxlLmRyb3BTaGFkb3dBbmdsZSkqdGhpcy5zdHlsZS5kcm9wU2hhZG93RGlzdGFuY2U7Zm9yKGU9MDtlPGIubGVuZ3RoO2UrKylqPXRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzLzIsaz10aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcy8yK2UqaCxcInJpZ2h0XCI9PT10aGlzLnN0eWxlLmFsaWduP2orPWQtY1tlXTpcImNlbnRlclwiPT09dGhpcy5zdHlsZS5hbGlnbiYmKGorPShkLWNbZV0pLzIpLHRoaXMuc3R5bGUuZmlsbCYmdGhpcy5jb250ZXh0LmZpbGxUZXh0KGJbZV0saitsLGsrbSl9Zm9yKHRoaXMuY29udGV4dC5maWxsU3R5bGU9dGhpcy5zdHlsZS5maWxsLGU9MDtlPGIubGVuZ3RoO2UrKylqPXRoaXMuc3R5bGUuc3Ryb2tlVGhpY2tuZXNzLzIsaz10aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcy8yK2UqaCxcInJpZ2h0XCI9PT10aGlzLnN0eWxlLmFsaWduP2orPWQtY1tlXTpcImNlbnRlclwiPT09dGhpcy5zdHlsZS5hbGlnbiYmKGorPShkLWNbZV0pLzIpLHRoaXMuc3R5bGUuc3Ryb2tlJiZ0aGlzLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyYmdGhpcy5jb250ZXh0LnN0cm9rZVRleHQoYltlXSxqLGspLHRoaXMuc3R5bGUuZmlsbCYmdGhpcy5jb250ZXh0LmZpbGxUZXh0KGJbZV0saixrKTt0aGlzLnVwZGF0ZVRleHR1cmUoKX0sYi5UZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0dXJlPWZ1bmN0aW9uKCl7dGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLndpZHRoPXRoaXMuY2FudmFzLndpZHRoLHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5oZWlnaHQ9dGhpcy5jYW52YXMuaGVpZ2h0LHRoaXMudGV4dHVyZS5jcm9wLndpZHRoPXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aD10aGlzLmNhbnZhcy53aWR0aCx0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQ9dGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodD10aGlzLmNhbnZhcy5oZWlnaHQsdGhpcy5fd2lkdGg9dGhpcy5jYW52YXMud2lkdGgsdGhpcy5faGVpZ2h0PXRoaXMuY2FudmFzLmhlaWdodCx0aGlzLnJlcXVpcmVzVXBkYXRlPSEwfSxiLlRleHQucHJvdG90eXBlLl9yZW5kZXJXZWJHTD1mdW5jdGlvbihhKXt0aGlzLnJlcXVpcmVzVXBkYXRlJiYodGhpcy5yZXF1aXJlc1VwZGF0ZT0hMSxiLnVwZGF0ZVdlYkdMVGV4dHVyZSh0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUsYS5nbCkpLGIuU3ByaXRlLnByb3RvdHlwZS5fcmVuZGVyV2ViR0wuY2FsbCh0aGlzLGEpfSxiLlRleHQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybT1mdW5jdGlvbigpe3RoaXMuZGlydHkmJih0aGlzLnVwZGF0ZVRleHQoKSx0aGlzLmRpcnR5PSExKSxiLlNwcml0ZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtLmNhbGwodGhpcyl9LGIuVGV4dC5wcm90b3R5cGUuZGV0ZXJtaW5lRm9udEhlaWdodD1mdW5jdGlvbihhKXt2YXIgYz1iLlRleHQuaGVpZ2h0Q2FjaGVbYV07aWYoIWMpe3ZhciBkPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXSxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksZj1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIk1cIik7ZS5hcHBlbmRDaGlsZChmKSxlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsYStcIjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjBcIiksZC5hcHBlbmRDaGlsZChlKSxjPWUub2Zmc2V0SGVpZ2h0LGIuVGV4dC5oZWlnaHRDYWNoZVthXT1jLGQucmVtb3ZlQ2hpbGQoZSl9cmV0dXJuIGN9LGIuVGV4dC5wcm90b3R5cGUud29yZFdyYXA9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPVwiXCIsYz1hLnNwbGl0KFwiXFxuXCIpLGQ9MDtkPGMubGVuZ3RoO2QrKyl7Zm9yKHZhciBlPXRoaXMuc3R5bGUud29yZFdyYXBXaWR0aCxmPWNbZF0uc3BsaXQoXCIgXCIpLGc9MDtnPGYubGVuZ3RoO2crKyl7dmFyIGg9dGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KGZbZ10pLndpZHRoLGk9aCt0aGlzLmNvbnRleHQubWVhc3VyZVRleHQoXCIgXCIpLndpZHRoOzA9PT1nfHxpPmU/KGc+MCYmKGIrPVwiXFxuXCIpLGIrPWZbZ10sZT10aGlzLnN0eWxlLndvcmRXcmFwV2lkdGgtaCk6KGUtPWksYis9XCIgXCIrZltnXSl9ZDxjLmxlbmd0aC0xJiYoYis9XCJcXG5cIil9cmV0dXJuIGJ9LGIuVGV4dC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbihhKXt0aGlzLmNvbnRleHQ9bnVsbCx0aGlzLmNhbnZhcz1udWxsLHRoaXMudGV4dHVyZS5kZXN0cm95KHZvaWQgMD09PWE/ITA6YSl9LGIuVGV4dC5oZWlnaHRDYWNoZT17fSxiLkJpdG1hcFRleHQ9ZnVuY3Rpb24oYSxjKXtiLkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKSx0aGlzLl9wb29sPVtdLHRoaXMuc2V0VGV4dChhKSx0aGlzLnNldFN0eWxlKGMpLHRoaXMudXBkYXRlVGV4dCgpLHRoaXMuZGlydHk9ITF9LGIuQml0bWFwVGV4dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlKSxiLkJpdG1hcFRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQml0bWFwVGV4dCxiLkJpdG1hcFRleHQucHJvdG90eXBlLnNldFRleHQ9ZnVuY3Rpb24oYSl7dGhpcy50ZXh0PWF8fFwiIFwiLHRoaXMuZGlydHk9ITB9LGIuQml0bWFwVGV4dC5wcm90b3R5cGUuc2V0U3R5bGU9ZnVuY3Rpb24oYSl7YT1hfHx7fSxhLmFsaWduPWEuYWxpZ258fFwibGVmdFwiLHRoaXMuc3R5bGU9YTt2YXIgYz1hLmZvbnQuc3BsaXQoXCIgXCIpO3RoaXMuZm9udE5hbWU9Y1tjLmxlbmd0aC0xXSx0aGlzLmZvbnRTaXplPWMubGVuZ3RoPj0yP3BhcnNlSW50KGNbYy5sZW5ndGgtMl0sMTApOmIuQml0bWFwVGV4dC5mb250c1t0aGlzLmZvbnROYW1lXS5zaXplLHRoaXMuZGlydHk9ITAsdGhpcy50aW50PWEudGludH0sYi5CaXRtYXBUZXh0LnByb3RvdHlwZS51cGRhdGVUZXh0PWZ1bmN0aW9uKCl7Zm9yKHZhciBhPWIuQml0bWFwVGV4dC5mb250c1t0aGlzLmZvbnROYW1lXSxjPW5ldyBiLlBvaW50LGQ9bnVsbCxlPVtdLGY9MCxnPVtdLGg9MCxpPXRoaXMuZm9udFNpemUvYS5zaXplLGo9MDtqPHRoaXMudGV4dC5sZW5ndGg7aisrKXt2YXIgaz10aGlzLnRleHQuY2hhckNvZGVBdChqKTtpZigvKD86XFxyXFxufFxccnxcXG4pLy50ZXN0KHRoaXMudGV4dC5jaGFyQXQoaikpKWcucHVzaChjLngpLGY9TWF0aC5tYXgoZixjLngpLGgrKyxjLng9MCxjLnkrPWEubGluZUhlaWdodCxkPW51bGw7ZWxzZXt2YXIgbD1hLmNoYXJzW2tdO2wmJihkJiZsW2RdJiYoYy54Kz1sLmtlcm5pbmdbZF0pLGUucHVzaCh7dGV4dHVyZTpsLnRleHR1cmUsbGluZTpoLGNoYXJDb2RlOmsscG9zaXRpb246bmV3IGIuUG9pbnQoYy54K2wueE9mZnNldCxjLnkrbC55T2Zmc2V0KX0pLGMueCs9bC54QWR2YW5jZSxkPWspfX1nLnB1c2goYy54KSxmPU1hdGgubWF4KGYsYy54KTt2YXIgbT1bXTtmb3Ioaj0wO2g+PWo7aisrKXt2YXIgbj0wO1wicmlnaHRcIj09PXRoaXMuc3R5bGUuYWxpZ24/bj1mLWdbal06XCJjZW50ZXJcIj09PXRoaXMuc3R5bGUuYWxpZ24mJihuPShmLWdbal0pLzIpLG0ucHVzaChuKX12YXIgbz10aGlzLmNoaWxkcmVuLmxlbmd0aCxwPWUubGVuZ3RoLHE9dGhpcy50aW50fHwxNjc3NzIxNTtmb3Ioaj0wO3A+ajtqKyspe3ZhciByPW8+aj90aGlzLmNoaWxkcmVuW2pdOnRoaXMuX3Bvb2wucG9wKCk7cj9yLnNldFRleHR1cmUoZVtqXS50ZXh0dXJlKTpyPW5ldyBiLlNwcml0ZShlW2pdLnRleHR1cmUpLHIucG9zaXRpb24ueD0oZVtqXS5wb3NpdGlvbi54K21bZVtqXS5saW5lXSkqaSxyLnBvc2l0aW9uLnk9ZVtqXS5wb3NpdGlvbi55Kmksci5zY2FsZS54PXIuc2NhbGUueT1pLHIudGludD1xLHIucGFyZW50fHx0aGlzLmFkZENoaWxkKHIpfWZvcig7dGhpcy5jaGlsZHJlbi5sZW5ndGg+cDspe3ZhciBzPXRoaXMuZ2V0Q2hpbGRBdCh0aGlzLmNoaWxkcmVuLmxlbmd0aC0xKTt0aGlzLl9wb29sLnB1c2gocyksdGhpcy5yZW1vdmVDaGlsZChzKX10aGlzLnRleHRXaWR0aD1mKmksdGhpcy50ZXh0SGVpZ2h0PShjLnkrYS5saW5lSGVpZ2h0KSppfSxiLkJpdG1hcFRleHQucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybT1mdW5jdGlvbigpe3RoaXMuZGlydHkmJih0aGlzLnVwZGF0ZVRleHQoKSx0aGlzLmRpcnR5PSExKSxiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybS5jYWxsKHRoaXMpfSxiLkJpdG1hcFRleHQuZm9udHM9e30sYi5JbnRlcmFjdGlvbkRhdGE9ZnVuY3Rpb24oKXt0aGlzLmdsb2JhbD1uZXcgYi5Qb2ludCx0aGlzLnRhcmdldD1udWxsLHRoaXMub3JpZ2luYWxFdmVudD1udWxsfSxiLkludGVyYWN0aW9uRGF0YS5wcm90b3R5cGUuZ2V0TG9jYWxQb3NpdGlvbj1mdW5jdGlvbihhKXt2YXIgYz1hLndvcmxkVHJhbnNmb3JtLGQ9dGhpcy5nbG9iYWwsZT1jLmEsZj1jLmIsZz1jLnR4LGg9Yy5jLGk9Yy5kLGo9Yy50eSxrPTEvKGUqaStmKi1oKTtyZXR1cm4gbmV3IGIuUG9pbnQoaSprKmQueCstZiprKmQueSsoaipmLWcqaSkqayxlKmsqZC55Ky1oKmsqZC54KygtaiplK2cqaCkqayl9LGIuSW50ZXJhY3Rpb25EYXRhLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkludGVyYWN0aW9uRGF0YSxiLkludGVyYWN0aW9uTWFuYWdlcj1mdW5jdGlvbihhKXt0aGlzLnN0YWdlPWEsdGhpcy5tb3VzZT1uZXcgYi5JbnRlcmFjdGlvbkRhdGEsdGhpcy50b3VjaHM9e30sdGhpcy50ZW1wUG9pbnQ9bmV3IGIuUG9pbnQsdGhpcy5tb3VzZW92ZXJFbmFibGVkPSEwLHRoaXMucG9vbD1bXSx0aGlzLmludGVyYWN0aXZlSXRlbXM9W10sdGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQ9bnVsbCx0aGlzLm9uTW91c2VNb3ZlPXRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKSx0aGlzLm9uTW91c2VEb3duPXRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKSx0aGlzLm9uTW91c2VPdXQ9dGhpcy5vbk1vdXNlT3V0LmJpbmQodGhpcyksdGhpcy5vbk1vdXNlVXA9dGhpcy5vbk1vdXNlVXAuYmluZCh0aGlzKSx0aGlzLm9uVG91Y2hTdGFydD10aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpLHRoaXMub25Ub3VjaEVuZD10aGlzLm9uVG91Y2hFbmQuYmluZCh0aGlzKSx0aGlzLm9uVG91Y2hNb3ZlPXRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKSx0aGlzLmxhc3Q9MCx0aGlzLmN1cnJlbnRDdXJzb3JTdHlsZT1cImluaGVyaXRcIix0aGlzLm1vdXNlT3V0PSExfSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5JbnRlcmFjdGlvbk1hbmFnZXIsYi5JbnRlcmFjdGlvbk1hbmFnZXIucHJvdG90eXBlLmNvbGxlY3RJbnRlcmFjdGl2ZVNwcml0ZT1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1hLmNoaWxkcmVuLGQ9Yy5sZW5ndGgsZT1kLTE7ZT49MDtlLS0pe3ZhciBmPWNbZV07Zi5faW50ZXJhY3RpdmU/KGIuaW50ZXJhY3RpdmVDaGlsZHJlbj0hMCx0aGlzLmludGVyYWN0aXZlSXRlbXMucHVzaChmKSxmLmNoaWxkcmVuLmxlbmd0aD4wJiZ0aGlzLmNvbGxlY3RJbnRlcmFjdGl2ZVNwcml0ZShmLGYpKTooZi5fX2lQYXJlbnQ9bnVsbCxmLmNoaWxkcmVuLmxlbmd0aD4wJiZ0aGlzLmNvbGxlY3RJbnRlcmFjdGl2ZVNwcml0ZShmLGIpKX19LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5zZXRUYXJnZXQ9ZnVuY3Rpb24oYSl7dGhpcy50YXJnZXQ9YSxudWxsPT09dGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQmJnRoaXMuc2V0VGFyZ2V0RG9tRWxlbWVudChhLnZpZXcpfSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUuc2V0VGFyZ2V0RG9tRWxlbWVudD1mdW5jdGlvbihhKXt0aGlzLnJlbW92ZUV2ZW50cygpLHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCYmKGEuc3R5bGVbXCItbXMtY29udGVudC16b29taW5nXCJdPVwibm9uZVwiLGEuc3R5bGVbXCItbXMtdG91Y2gtYWN0aW9uXCJdPVwibm9uZVwiKSx0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudD1hLGEuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMub25Nb3VzZU1vdmUsITApLGEuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLHRoaXMub25Nb3VzZURvd24sITApLGEuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsdGhpcy5vbk1vdXNlT3V0LCEwKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsdGhpcy5vblRvdWNoU3RhcnQsITApLGEuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsdGhpcy5vblRvdWNoRW5kLCEwKSxhLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLm9uVG91Y2hNb3ZlLCEwKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIix0aGlzLm9uTW91c2VVcCwhMCl9LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVFdmVudHM9ZnVuY3Rpb24oKXt0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudCYmKHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnN0eWxlW1wiLW1zLWNvbnRlbnQtem9vbWluZ1wiXT1cIlwiLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnN0eWxlW1wiLW1zLXRvdWNoLWFjdGlvblwiXT1cIlwiLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLm9uTW91c2VNb3ZlLCEwKSx0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsdGhpcy5vbk1vdXNlRG93biwhMCksdGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsdGhpcy5vbk1vdXNlT3V0LCEwKSx0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLHRoaXMub25Ub3VjaFN0YXJ0LCEwKSx0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIix0aGlzLm9uVG91Y2hFbmQsITApLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLm9uVG91Y2hNb3ZlLCEwKSx0aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudD1udWxsLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLHRoaXMub25Nb3VzZVVwLCEwKSl9LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oKXtpZih0aGlzLnRhcmdldCl7dmFyIGE9RGF0ZS5ub3coKSxjPWEtdGhpcy5sYXN0O2lmKGM9YypiLklOVEVSQUNUSU9OX0ZSRVFVRU5DWS8xZTMsISgxPmMpKXt0aGlzLmxhc3Q9YTt2YXIgZD0wO3RoaXMuZGlydHkmJnRoaXMucmVidWlsZEludGVyYWN0aXZlR3JhcGgoKTt2YXIgZT10aGlzLmludGVyYWN0aXZlSXRlbXMubGVuZ3RoLGY9XCJpbmhlcml0XCIsZz0hMTtmb3IoZD0wO2U+ZDtkKyspe3ZhciBoPXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tkXTtoLl9faGl0PXRoaXMuaGl0VGVzdChoLHRoaXMubW91c2UpLHRoaXMubW91c2UudGFyZ2V0PWgsaC5fX2hpdCYmIWc/KGguYnV0dG9uTW9kZSYmKGY9aC5kZWZhdWx0Q3Vyc29yKSxoLmludGVyYWN0aXZlQ2hpbGRyZW58fChnPSEwKSxoLl9faXNPdmVyfHwoaC5tb3VzZW92ZXImJmgubW91c2VvdmVyKHRoaXMubW91c2UpLGguX19pc092ZXI9ITApKTpoLl9faXNPdmVyJiYoaC5tb3VzZW91dCYmaC5tb3VzZW91dCh0aGlzLm1vdXNlKSxoLl9faXNPdmVyPSExKX10aGlzLmN1cnJlbnRDdXJzb3JTdHlsZSE9PWYmJih0aGlzLmN1cnJlbnRDdXJzb3JTdHlsZT1mLHRoaXMuaW50ZXJhY3Rpb25ET01FbGVtZW50LnN0eWxlLmN1cnNvcj1mKX19fSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUucmVidWlsZEludGVyYWN0aXZlR3JhcGg9ZnVuY3Rpb24oKXt0aGlzLmRpcnR5PSExO2Zvcih2YXIgYT10aGlzLmludGVyYWN0aXZlSXRlbXMubGVuZ3RoLGI9MDthPmI7YisrKXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tiXS5pbnRlcmFjdGl2ZUNoaWxkcmVuPSExO3RoaXMuaW50ZXJhY3RpdmVJdGVtcz1bXSx0aGlzLnN0YWdlLmludGVyYWN0aXZlJiZ0aGlzLmludGVyYWN0aXZlSXRlbXMucHVzaCh0aGlzLnN0YWdlKSx0aGlzLmNvbGxlY3RJbnRlcmFjdGl2ZVNwcml0ZSh0aGlzLnN0YWdlLHRoaXMuc3RhZ2UpfSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUub25Nb3VzZU1vdmU9ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eSYmdGhpcy5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaCgpLHRoaXMubW91c2Uub3JpZ2luYWxFdmVudD1hfHx3aW5kb3cuZXZlbnQ7dmFyIGI9dGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7dGhpcy5tb3VzZS5nbG9iYWwueD0oYS5jbGllbnRYLWIubGVmdCkqKHRoaXMudGFyZ2V0LndpZHRoL2Iud2lkdGgpLHRoaXMubW91c2UuZ2xvYmFsLnk9KGEuY2xpZW50WS1iLnRvcCkqKHRoaXMudGFyZ2V0LmhlaWdodC9iLmhlaWdodCk7Zm9yKHZhciBjPXRoaXMuaW50ZXJhY3RpdmVJdGVtcy5sZW5ndGgsZD0wO2M+ZDtkKyspe3ZhciBlPXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tkXTtlLm1vdXNlbW92ZSYmZS5tb3VzZW1vdmUodGhpcy5tb3VzZSl9fSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUub25Nb3VzZURvd249ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eSYmdGhpcy5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaCgpLHRoaXMubW91c2Uub3JpZ2luYWxFdmVudD1hfHx3aW5kb3cuZXZlbnQsYi5BVVRPX1BSRVZFTlRfREVGQVVMVCYmdGhpcy5tb3VzZS5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7Zm9yKHZhciBjPXRoaXMuaW50ZXJhY3RpdmVJdGVtcy5sZW5ndGgsZD0wO2M+ZDtkKyspe3ZhciBlPXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tkXTtpZigoZS5tb3VzZWRvd258fGUuY2xpY2spJiYoZS5fX21vdXNlSXNEb3duPSEwLGUuX19oaXQ9dGhpcy5oaXRUZXN0KGUsdGhpcy5tb3VzZSksZS5fX2hpdCYmKGUubW91c2Vkb3duJiZlLm1vdXNlZG93bih0aGlzLm1vdXNlKSxlLl9faXNEb3duPSEwLCFlLmludGVyYWN0aXZlQ2hpbGRyZW4pKSlicmVha319LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5vbk1vdXNlT3V0PWZ1bmN0aW9uKCl7dGhpcy5kaXJ0eSYmdGhpcy5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaCgpO3ZhciBhPXRoaXMuaW50ZXJhY3RpdmVJdGVtcy5sZW5ndGg7dGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQuc3R5bGUuY3Vyc29yPVwiaW5oZXJpdFwiO2Zvcih2YXIgYj0wO2E+YjtiKyspe3ZhciBjPXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tiXTtjLl9faXNPdmVyJiYodGhpcy5tb3VzZS50YXJnZXQ9YyxjLm1vdXNlb3V0JiZjLm1vdXNlb3V0KHRoaXMubW91c2UpLGMuX19pc092ZXI9ITEpfXRoaXMubW91c2VPdXQ9ITAsdGhpcy5tb3VzZS5nbG9iYWwueD0tMWU0LHRoaXMubW91c2UuZ2xvYmFsLnk9LTFlNH0sYi5JbnRlcmFjdGlvbk1hbmFnZXIucHJvdG90eXBlLm9uTW91c2VVcD1mdW5jdGlvbihhKXt0aGlzLmRpcnR5JiZ0aGlzLnJlYnVpbGRJbnRlcmFjdGl2ZUdyYXBoKCksdGhpcy5tb3VzZS5vcmlnaW5hbEV2ZW50PWF8fHdpbmRvdy5ldmVudDtcbmZvcih2YXIgYj10aGlzLmludGVyYWN0aXZlSXRlbXMubGVuZ3RoLGM9ITEsZD0wO2I+ZDtkKyspe3ZhciBlPXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tkXTtlLl9faGl0PXRoaXMuaGl0VGVzdChlLHRoaXMubW91c2UpLGUuX19oaXQmJiFjPyhlLm1vdXNldXAmJmUubW91c2V1cCh0aGlzLm1vdXNlKSxlLl9faXNEb3duJiZlLmNsaWNrJiZlLmNsaWNrKHRoaXMubW91c2UpLGUuaW50ZXJhY3RpdmVDaGlsZHJlbnx8KGM9ITApKTplLl9faXNEb3duJiZlLm1vdXNldXBvdXRzaWRlJiZlLm1vdXNldXBvdXRzaWRlKHRoaXMubW91c2UpLGUuX19pc0Rvd249ITF9fSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUuaGl0VGVzdD1mdW5jdGlvbihhLGMpe3ZhciBkPWMuZ2xvYmFsO2lmKCFhLndvcmxkVmlzaWJsZSlyZXR1cm4hMTt2YXIgZT1hIGluc3RhbmNlb2YgYi5TcHJpdGUsZj1hLndvcmxkVHJhbnNmb3JtLGc9Zi5hLGg9Zi5iLGk9Zi50eCxqPWYuYyxrPWYuZCxsPWYudHksbT0xLyhnKmsraCotaiksbj1rKm0qZC54Ky1oKm0qZC55KyhsKmgtaSprKSptLG89ZyptKmQueSstaiptKmQueCsoLWwqZytpKmopKm07aWYoYy50YXJnZXQ9YSxhLmhpdEFyZWEmJmEuaGl0QXJlYS5jb250YWlucylyZXR1cm4gYS5oaXRBcmVhLmNvbnRhaW5zKG4sbyk/KGMudGFyZ2V0PWEsITApOiExO2lmKGUpe3ZhciBwLHE9YS50ZXh0dXJlLmZyYW1lLndpZHRoLHI9YS50ZXh0dXJlLmZyYW1lLmhlaWdodCxzPS1xKmEuYW5jaG9yLng7aWYobj5zJiZzK3E+biYmKHA9LXIqYS5hbmNob3IueSxvPnAmJnArcj5vKSlyZXR1cm4gYy50YXJnZXQ9YSwhMH1mb3IodmFyIHQ9YS5jaGlsZHJlbi5sZW5ndGgsdT0wO3Q+dTt1Kyspe3ZhciB2PWEuY2hpbGRyZW5bdV0sdz10aGlzLmhpdFRlc3QodixjKTtpZih3KXJldHVybiBjLnRhcmdldD1hLCEwfXJldHVybiExfSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUub25Ub3VjaE1vdmU9ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eSYmdGhpcy5yZWJ1aWxkSW50ZXJhY3RpdmVHcmFwaCgpO3ZhciBiLGM9dGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksZD1hLmNoYW5nZWRUb3VjaGVzLGU9MDtmb3IoZT0wO2U8ZC5sZW5ndGg7ZSsrKXt2YXIgZj1kW2VdO2I9dGhpcy50b3VjaHNbZi5pZGVudGlmaWVyXSxiLm9yaWdpbmFsRXZlbnQ9YXx8d2luZG93LmV2ZW50LGIuZ2xvYmFsLng9KGYuY2xpZW50WC1jLmxlZnQpKih0aGlzLnRhcmdldC53aWR0aC9jLndpZHRoKSxiLmdsb2JhbC55PShmLmNsaWVudFktYy50b3ApKih0aGlzLnRhcmdldC5oZWlnaHQvYy5oZWlnaHQpLG5hdmlnYXRvci5pc0NvY29vbkpTJiYoYi5nbG9iYWwueD1mLmNsaWVudFgsYi5nbG9iYWwueT1mLmNsaWVudFkpO2Zvcih2YXIgZz0wO2c8dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zLmxlbmd0aDtnKyspe3ZhciBoPXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tnXTtoLnRvdWNobW92ZSYmaC5fX3RvdWNoRGF0YSYmaC5fX3RvdWNoRGF0YVtmLmlkZW50aWZpZXJdJiZoLnRvdWNobW92ZShiKX19fSxiLkludGVyYWN0aW9uTWFuYWdlci5wcm90b3R5cGUub25Ub3VjaFN0YXJ0PWZ1bmN0aW9uKGEpe3RoaXMuZGlydHkmJnRoaXMucmVidWlsZEludGVyYWN0aXZlR3JhcGgoKTt2YXIgYz10aGlzLmludGVyYWN0aW9uRE9NRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtiLkFVVE9fUFJFVkVOVF9ERUZBVUxUJiZhLnByZXZlbnREZWZhdWx0KCk7Zm9yKHZhciBkPWEuY2hhbmdlZFRvdWNoZXMsZT0wO2U8ZC5sZW5ndGg7ZSsrKXt2YXIgZj1kW2VdLGc9dGhpcy5wb29sLnBvcCgpO2d8fChnPW5ldyBiLkludGVyYWN0aW9uRGF0YSksZy5vcmlnaW5hbEV2ZW50PWF8fHdpbmRvdy5ldmVudCx0aGlzLnRvdWNoc1tmLmlkZW50aWZpZXJdPWcsZy5nbG9iYWwueD0oZi5jbGllbnRYLWMubGVmdCkqKHRoaXMudGFyZ2V0LndpZHRoL2Mud2lkdGgpLGcuZ2xvYmFsLnk9KGYuY2xpZW50WS1jLnRvcCkqKHRoaXMudGFyZ2V0LmhlaWdodC9jLmhlaWdodCksbmF2aWdhdG9yLmlzQ29jb29uSlMmJihnLmdsb2JhbC54PWYuY2xpZW50WCxnLmdsb2JhbC55PWYuY2xpZW50WSk7Zm9yKHZhciBoPXRoaXMuaW50ZXJhY3RpdmVJdGVtcy5sZW5ndGgsaT0wO2g+aTtpKyspe3ZhciBqPXRoaXMuaW50ZXJhY3RpdmVJdGVtc1tpXTtpZigoai50b3VjaHN0YXJ0fHxqLnRhcCkmJihqLl9faGl0PXRoaXMuaGl0VGVzdChqLGcpLGouX19oaXQmJihqLnRvdWNoc3RhcnQmJmoudG91Y2hzdGFydChnKSxqLl9faXNEb3duPSEwLGouX190b3VjaERhdGE9ai5fX3RvdWNoRGF0YXx8e30sai5fX3RvdWNoRGF0YVtmLmlkZW50aWZpZXJdPWcsIWouaW50ZXJhY3RpdmVDaGlsZHJlbikpKWJyZWFrfX19LGIuSW50ZXJhY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5vblRvdWNoRW5kPWZ1bmN0aW9uKGEpe3RoaXMuZGlydHkmJnRoaXMucmVidWlsZEludGVyYWN0aXZlR3JhcGgoKTtmb3IodmFyIGI9dGhpcy5pbnRlcmFjdGlvbkRPTUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksYz1hLmNoYW5nZWRUb3VjaGVzLGQ9MDtkPGMubGVuZ3RoO2QrKyl7dmFyIGU9Y1tkXSxmPXRoaXMudG91Y2hzW2UuaWRlbnRpZmllcl0sZz0hMTtmLmdsb2JhbC54PShlLmNsaWVudFgtYi5sZWZ0KSoodGhpcy50YXJnZXQud2lkdGgvYi53aWR0aCksZi5nbG9iYWwueT0oZS5jbGllbnRZLWIudG9wKSoodGhpcy50YXJnZXQuaGVpZ2h0L2IuaGVpZ2h0KSxuYXZpZ2F0b3IuaXNDb2Nvb25KUyYmKGYuZ2xvYmFsLng9ZS5jbGllbnRYLGYuZ2xvYmFsLnk9ZS5jbGllbnRZKTtmb3IodmFyIGg9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zLmxlbmd0aCxpPTA7aD5pO2krKyl7dmFyIGo9dGhpcy5pbnRlcmFjdGl2ZUl0ZW1zW2ldO2ouX190b3VjaERhdGEmJmouX190b3VjaERhdGFbZS5pZGVudGlmaWVyXSYmKGouX19oaXQ9dGhpcy5oaXRUZXN0KGosai5fX3RvdWNoRGF0YVtlLmlkZW50aWZpZXJdKSxmLm9yaWdpbmFsRXZlbnQ9YXx8d2luZG93LmV2ZW50LChqLnRvdWNoZW5kfHxqLnRhcCkmJihqLl9faGl0JiYhZz8oai50b3VjaGVuZCYmai50b3VjaGVuZChmKSxqLl9faXNEb3duJiZqLnRhcCYmai50YXAoZiksai5pbnRlcmFjdGl2ZUNoaWxkcmVufHwoZz0hMCkpOmouX19pc0Rvd24mJmoudG91Y2hlbmRvdXRzaWRlJiZqLnRvdWNoZW5kb3V0c2lkZShmKSxqLl9faXNEb3duPSExKSxqLl9fdG91Y2hEYXRhW2UuaWRlbnRpZmllcl09bnVsbCl9dGhpcy5wb29sLnB1c2goZiksdGhpcy50b3VjaHNbZS5pZGVudGlmaWVyXT1udWxsfX0sYi5TdGFnZT1mdW5jdGlvbihhKXtiLkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKSx0aGlzLndvcmxkVHJhbnNmb3JtPW5ldyBiLk1hdHJpeCx0aGlzLmludGVyYWN0aXZlPSEwLHRoaXMuaW50ZXJhY3Rpb25NYW5hZ2VyPW5ldyBiLkludGVyYWN0aW9uTWFuYWdlcih0aGlzKSx0aGlzLmRpcnR5PSEwLHRoaXMuc3RhZ2U9dGhpcyx0aGlzLnN0YWdlLmhpdEFyZWE9bmV3IGIuUmVjdGFuZ2xlKDAsMCwxZTUsMWU1KSx0aGlzLnNldEJhY2tncm91bmRDb2xvcihhKX0sYi5TdGFnZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlKSxiLlN0YWdlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlN0YWdlLGIuU3RhZ2UucHJvdG90eXBlLnNldEludGVyYWN0aW9uRGVsZWdhdGU9ZnVuY3Rpb24oYSl7dGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIuc2V0VGFyZ2V0RG9tRWxlbWVudChhKX0sYi5TdGFnZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtPWZ1bmN0aW9uKCl7dGhpcy53b3JsZEFscGhhPTE7Zm9yKHZhciBhPTAsYj10aGlzLmNoaWxkcmVuLmxlbmd0aDtiPmE7YSsrKXRoaXMuY2hpbGRyZW5bYV0udXBkYXRlVHJhbnNmb3JtKCk7dGhpcy5kaXJ0eSYmKHRoaXMuZGlydHk9ITEsdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIuZGlydHk9ITApLHRoaXMuaW50ZXJhY3RpdmUmJnRoaXMuaW50ZXJhY3Rpb25NYW5hZ2VyLnVwZGF0ZSgpfSxiLlN0YWdlLnByb3RvdHlwZS5zZXRCYWNrZ3JvdW5kQ29sb3I9ZnVuY3Rpb24oYSl7dGhpcy5iYWNrZ3JvdW5kQ29sb3I9YXx8MCx0aGlzLmJhY2tncm91bmRDb2xvclNwbGl0PWIuaGV4MnJnYih0aGlzLmJhY2tncm91bmRDb2xvcik7dmFyIGM9dGhpcy5iYWNrZ3JvdW5kQ29sb3IudG9TdHJpbmcoMTYpO2M9XCIwMDAwMDBcIi5zdWJzdHIoMCw2LWMubGVuZ3RoKStjLHRoaXMuYmFja2dyb3VuZENvbG9yU3RyaW5nPVwiI1wiK2N9LGIuU3RhZ2UucHJvdG90eXBlLmdldE1vdXNlUG9zaXRpb249ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbnRlcmFjdGlvbk1hbmFnZXIubW91c2UuZ2xvYmFsfTtmb3IodmFyIGM9MCxkPVtcIm1zXCIsXCJtb3pcIixcIndlYmtpdFwiLFwib1wiXSxlPTA7ZTxkLmxlbmd0aCYmIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7KytlKXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9d2luZG93W2RbZV0rXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl0sd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lPXdpbmRvd1tkW2VdK1wiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl18fHdpbmRvd1tkW2VdK1wiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKGEpe3ZhciBiPShuZXcgRGF0ZSkuZ2V0VGltZSgpLGQ9TWF0aC5tYXgoMCwxNi0oYi1jKSksZT13aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe2EoYitkKX0sZCk7cmV0dXJuIGM9YitkLGV9KSx3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWV8fCh3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24oYSl7Y2xlYXJUaW1lb3V0KGEpfSksd2luZG93LnJlcXVlc3RBbmltRnJhbWU9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSxiLmhleDJyZ2I9ZnVuY3Rpb24oYSl7cmV0dXJuWyhhPj4xNiYyNTUpLzI1NSwoYT4+OCYyNTUpLzI1NSwoMjU1JmEpLzI1NV19LGIucmdiMmhleD1mdW5jdGlvbihhKXtyZXR1cm4oMjU1KmFbMF08PDE2KSsoMjU1KmFbMV08PDgpKzI1NSphWzJdfSxcImZ1bmN0aW9uXCIhPXR5cGVvZiBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCYmKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kPWZ1bmN0aW9uKCl7dmFyIGE9QXJyYXkucHJvdG90eXBlLnNsaWNlO3JldHVybiBmdW5jdGlvbihiKXtmdW5jdGlvbiBjKCl7dmFyIGY9ZS5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpO2QuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGM/dGhpczpiLGYpfXZhciBkPXRoaXMsZT1hLmNhbGwoYXJndW1lbnRzLDEpO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGQpdGhyb3cgbmV3IFR5cGVFcnJvcjtyZXR1cm4gYy5wcm90b3R5cGU9ZnVuY3Rpb24gZihhKXtyZXR1cm4gYSYmKGYucHJvdG90eXBlPWEpLHRoaXMgaW5zdGFuY2VvZiBmP3ZvaWQgMDpuZXcgZn0oZC5wcm90b3R5cGUpLGN9fSgpKSxiLkFqYXhSZXF1ZXN0PWZ1bmN0aW9uKCl7dmFyIGE9W1wiTXN4bWwyLlhNTEhUVFAuNi4wXCIsXCJNc3htbDIuWE1MSFRUUC4zLjBcIixcIk1pY3Jvc29mdC5YTUxIVFRQXCJdO2lmKCF3aW5kb3cuQWN0aXZlWE9iamVjdClyZXR1cm4gd2luZG93LlhNTEh0dHBSZXF1ZXN0P25ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3Q6ITE7Zm9yKHZhciBiPTA7YjxhLmxlbmd0aDtiKyspdHJ5e3JldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoYVtiXSl9Y2F0Y2goYyl7fX0sYi5jYW5Vc2VOZXdDYW52YXNCbGVuZE1vZGVzPWZ1bmN0aW9uKCl7dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTthLndpZHRoPTEsYS5oZWlnaHQ9MTt2YXIgYj1hLmdldENvbnRleHQoXCIyZFwiKTtyZXR1cm4gYi5maWxsU3R5bGU9XCIjMDAwXCIsYi5maWxsUmVjdCgwLDAsMSwxKSxiLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj1cIm11bHRpcGx5XCIsYi5maWxsU3R5bGU9XCIjZmZmXCIsYi5maWxsUmVjdCgwLDAsMSwxKSwwPT09Yi5nZXRJbWFnZURhdGEoMCwwLDEsMSkuZGF0YVswXX0sYi5nZXROZXh0UG93ZXJPZlR3bz1mdW5jdGlvbihhKXtpZihhPjAmJjA9PT0oYSZhLTEpKXJldHVybiBhO2Zvcih2YXIgYj0xO2E+YjspYjw8PTE7cmV0dXJuIGJ9LGIuRXZlbnRUYXJnZXQ9ZnVuY3Rpb24oKXt2YXIgYT17fTt0aGlzLmFkZEV2ZW50TGlzdGVuZXI9dGhpcy5vbj1mdW5jdGlvbihiLGMpe3ZvaWQgMD09PWFbYl0mJihhW2JdPVtdKSwtMT09PWFbYl0uaW5kZXhPZihjKSYmYVtiXS51bnNoaWZ0KGMpfSx0aGlzLmRpc3BhdGNoRXZlbnQ9dGhpcy5lbWl0PWZ1bmN0aW9uKGIpe2lmKGFbYi50eXBlXSYmYVtiLnR5cGVdLmxlbmd0aClmb3IodmFyIGM9YVtiLnR5cGVdLmxlbmd0aC0xO2M+PTA7Yy0tKWFbYi50eXBlXVtjXShiKX0sdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyPXRoaXMub2ZmPWZ1bmN0aW9uKGIsYyl7aWYodm9pZCAwIT09YVtiXSl7dmFyIGQ9YVtiXS5pbmRleE9mKGMpOy0xIT09ZCYmYVtiXS5zcGxpY2UoZCwxKX19LHRoaXMucmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnM9ZnVuY3Rpb24oYil7dmFyIGM9YVtiXTtjJiYoYy5sZW5ndGg9MCl9fSxiLmF1dG9EZXRlY3RSZW5kZXJlcj1mdW5jdGlvbihhLGMsZCxlLGYpe2F8fChhPTgwMCksY3x8KGM9NjAwKTt2YXIgZz1mdW5jdGlvbigpe3RyeXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO3JldHVybiEhd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCYmKGEuZ2V0Q29udGV4dChcIndlYmdsXCIpfHxhLmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIikpfWNhdGNoKGIpe3JldHVybiExfX0oKTtyZXR1cm4gZz9uZXcgYi5XZWJHTFJlbmRlcmVyKGEsYyxkLGUsZik6bmV3IGIuQ2FudmFzUmVuZGVyZXIoYSxjLGQsZSl9LGIuYXV0b0RldGVjdFJlY29tbWVuZGVkUmVuZGVyZXI9ZnVuY3Rpb24oYSxjLGQsZSxmKXthfHwoYT04MDApLGN8fChjPTYwMCk7dmFyIGc9ZnVuY3Rpb24oKXt0cnl7dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtyZXR1cm4hIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQmJihhLmdldENvbnRleHQoXCJ3ZWJnbFwiKXx8YS5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIpKX1jYXRjaChiKXtyZXR1cm4hMX19KCksaD0vQW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7cmV0dXJuIGcmJiFoP25ldyBiLldlYkdMUmVuZGVyZXIoYSxjLGQsZSxmKTpuZXcgYi5DYW52YXNSZW5kZXJlcihhLGMsZCxlKX0sYi5Qb2x5Sz17fSxiLlBvbHlLLlRyaWFuZ3VsYXRlPWZ1bmN0aW9uKGEpe3ZhciBjPSEwLGQ9YS5sZW5ndGg+PjE7aWYoMz5kKXJldHVybltdO2Zvcih2YXIgZT1bXSxmPVtdLGc9MDtkPmc7ZysrKWYucHVzaChnKTtnPTA7Zm9yKHZhciBoPWQ7aD4zOyl7dmFyIGk9ZlsoZyswKSVoXSxqPWZbKGcrMSklaF0saz1mWyhnKzIpJWhdLGw9YVsyKmldLG09YVsyKmkrMV0sbj1hWzIqal0sbz1hWzIqaisxXSxwPWFbMiprXSxxPWFbMiprKzFdLHI9ITE7aWYoYi5Qb2x5Sy5fY29udmV4KGwsbSxuLG8scCxxLGMpKXtyPSEwO2Zvcih2YXIgcz0wO2g+cztzKyspe3ZhciB0PWZbc107aWYodCE9PWkmJnQhPT1qJiZ0IT09ayYmYi5Qb2x5Sy5fUG9pbnRJblRyaWFuZ2xlKGFbMip0XSxhWzIqdCsxXSxsLG0sbixvLHAscSkpe3I9ITE7YnJlYWt9fX1pZihyKWUucHVzaChpLGosayksZi5zcGxpY2UoKGcrMSklaCwxKSxoLS0sZz0wO2Vsc2UgaWYoZysrPjMqaCl7aWYoIWMpcmV0dXJuIHdpbmRvdy5jb25zb2xlLmxvZyhcIlBJWEkgV2FybmluZzogc2hhcGUgdG9vIGNvbXBsZXggdG8gZmlsbFwiKSxbXTtmb3IoZT1bXSxmPVtdLGc9MDtkPmc7ZysrKWYucHVzaChnKTtnPTAsaD1kLGM9ITF9fXJldHVybiBlLnB1c2goZlswXSxmWzFdLGZbMl0pLGV9LGIuUG9seUsuX1BvaW50SW5UcmlhbmdsZT1mdW5jdGlvbihhLGIsYyxkLGUsZixnLGgpe3ZhciBpPWctYyxqPWgtZCxrPWUtYyxsPWYtZCxtPWEtYyxuPWItZCxvPWkqaStqKmoscD1pKmsraipsLHE9aSptK2oqbixyPWsqaytsKmwscz1rKm0rbCpuLHQ9MS8obypyLXAqcCksdT0ocipxLXAqcykqdCx2PShvKnMtcCpxKSp0O3JldHVybiB1Pj0wJiZ2Pj0wJiYxPnUrdn0sYi5Qb2x5Sy5fY29udmV4PWZ1bmN0aW9uKGEsYixjLGQsZSxmLGcpe3JldHVybihiLWQpKihlLWMpKyhjLWEpKihmLWQpPj0wPT09Z30sYi5pbml0RGVmYXVsdFNoYWRlcnM9ZnVuY3Rpb24oKXt9LGIuQ29tcGlsZVZlcnRleFNoYWRlcj1mdW5jdGlvbihhLGMpe3JldHVybiBiLl9Db21waWxlU2hhZGVyKGEsYyxhLlZFUlRFWF9TSEFERVIpfSxiLkNvbXBpbGVGcmFnbWVudFNoYWRlcj1mdW5jdGlvbihhLGMpe3JldHVybiBiLl9Db21waWxlU2hhZGVyKGEsYyxhLkZSQUdNRU5UX1NIQURFUil9LGIuX0NvbXBpbGVTaGFkZXI9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWIuam9pbihcIlxcblwiKSxlPWEuY3JlYXRlU2hhZGVyKGMpO3JldHVybiBhLnNoYWRlclNvdXJjZShlLGQpLGEuY29tcGlsZVNoYWRlcihlKSxhLmdldFNoYWRlclBhcmFtZXRlcihlLGEuQ09NUElMRV9TVEFUVVMpP2U6KHdpbmRvdy5jb25zb2xlLmxvZyhhLmdldFNoYWRlckluZm9Mb2coZSkpLG51bGwpfSxiLmNvbXBpbGVQcm9ncmFtPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1iLkNvbXBpbGVGcmFnbWVudFNoYWRlcihhLGQpLGY9Yi5Db21waWxlVmVydGV4U2hhZGVyKGEsYyksZz1hLmNyZWF0ZVByb2dyYW0oKTtyZXR1cm4gYS5hdHRhY2hTaGFkZXIoZyxmKSxhLmF0dGFjaFNoYWRlcihnLGUpLGEubGlua1Byb2dyYW0oZyksYS5nZXRQcm9ncmFtUGFyYW1ldGVyKGcsYS5MSU5LX1NUQVRVUyl8fHdpbmRvdy5jb25zb2xlLmxvZyhcIkNvdWxkIG5vdCBpbml0aWFsaXNlIHNoYWRlcnNcIiksZ30sYi5QaXhpU2hhZGVyPWZ1bmN0aW9uKGEpe3RoaXMuX1VJRD1iLl9VSUQrKyx0aGlzLmdsPWEsdGhpcy5wcm9ncmFtPW51bGwsdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbG93cCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCkgKiB2Q29sb3IgO1wiLFwifVwiXSx0aGlzLnRleHR1cmVDb3VudD0wLHRoaXMuYXR0cmlidXRlcz1bXSx0aGlzLmluaXQoKX0sYi5QaXhpU2hhZGVyLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nbCxjPWIuY29tcGlsZVByb2dyYW0oYSx0aGlzLnZlcnRleFNyY3x8Yi5QaXhpU2hhZGVyLmRlZmF1bHRWZXJ0ZXhTcmMsdGhpcy5mcmFnbWVudFNyYyk7YS51c2VQcm9ncmFtKGMpLHRoaXMudVNhbXBsZXI9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInVTYW1wbGVyXCIpLHRoaXMucHJvamVjdGlvblZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwicHJvamVjdGlvblZlY3RvclwiKSx0aGlzLm9mZnNldFZlY3Rvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwib2Zmc2V0VmVjdG9yXCIpLHRoaXMuZGltZW5zaW9ucz1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwiZGltZW5zaW9uc1wiKSx0aGlzLmFWZXJ0ZXhQb3NpdGlvbj1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhVmVydGV4UG9zaXRpb25cIiksdGhpcy5hVGV4dHVyZUNvb3JkPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFUZXh0dXJlQ29vcmRcIiksdGhpcy5jb2xvckF0dHJpYnV0ZT1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhQ29sb3JcIiksLTE9PT10aGlzLmNvbG9yQXR0cmlidXRlJiYodGhpcy5jb2xvckF0dHJpYnV0ZT0yKSx0aGlzLmF0dHJpYnV0ZXM9W3RoaXMuYVZlcnRleFBvc2l0aW9uLHRoaXMuYVRleHR1cmVDb29yZCx0aGlzLmNvbG9yQXR0cmlidXRlXTtmb3IodmFyIGQgaW4gdGhpcy51bmlmb3Jtcyl0aGlzLnVuaWZvcm1zW2RdLnVuaWZvcm1Mb2NhdGlvbj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLGQpO3RoaXMuaW5pdFVuaWZvcm1zKCksdGhpcy5wcm9ncmFtPWN9LGIuUGl4aVNoYWRlci5wcm90b3R5cGUuaW5pdFVuaWZvcm1zPWZ1bmN0aW9uKCl7dGhpcy50ZXh0dXJlQ291bnQ9MTt2YXIgYSxiPXRoaXMuZ2w7Zm9yKHZhciBjIGluIHRoaXMudW5pZm9ybXMpe2E9dGhpcy51bmlmb3Jtc1tjXTt2YXIgZD1hLnR5cGU7XCJzYW1wbGVyMkRcIj09PWQ/KGEuX2luaXQ9ITEsbnVsbCE9PWEudmFsdWUmJnRoaXMuaW5pdFNhbXBsZXIyRChhKSk6XCJtYXQyXCI9PT1kfHxcIm1hdDNcIj09PWR8fFwibWF0NFwiPT09ZD8oYS5nbE1hdHJpeD0hMCxhLmdsVmFsdWVMZW5ndGg9MSxcIm1hdDJcIj09PWQ/YS5nbEZ1bmM9Yi51bmlmb3JtTWF0cml4MmZ2OlwibWF0M1wiPT09ZD9hLmdsRnVuYz1iLnVuaWZvcm1NYXRyaXgzZnY6XCJtYXQ0XCI9PT1kJiYoYS5nbEZ1bmM9Yi51bmlmb3JtTWF0cml4NGZ2KSk6KGEuZ2xGdW5jPWJbXCJ1bmlmb3JtXCIrZF0sYS5nbFZhbHVlTGVuZ3RoPVwiMmZcIj09PWR8fFwiMmlcIj09PWQ/MjpcIjNmXCI9PT1kfHxcIjNpXCI9PT1kPzM6XCI0ZlwiPT09ZHx8XCI0aVwiPT09ZD80OjEpfX0sYi5QaXhpU2hhZGVyLnByb3RvdHlwZS5pbml0U2FtcGxlcjJEPWZ1bmN0aW9uKGEpe2lmKGEudmFsdWUmJmEudmFsdWUuYmFzZVRleHR1cmUmJmEudmFsdWUuYmFzZVRleHR1cmUuaGFzTG9hZGVkKXt2YXIgYj10aGlzLmdsO2lmKGIuYWN0aXZlVGV4dHVyZShiW1wiVEVYVFVSRVwiK3RoaXMudGV4dHVyZUNvdW50XSksYi5iaW5kVGV4dHVyZShiLlRFWFRVUkVfMkQsYS52YWx1ZS5iYXNlVGV4dHVyZS5fZ2xUZXh0dXJlc1tiLmlkXSksYS50ZXh0dXJlRGF0YSl7dmFyIGM9YS50ZXh0dXJlRGF0YSxkPWMubWFnRmlsdGVyP2MubWFnRmlsdGVyOmIuTElORUFSLGU9Yy5taW5GaWx0ZXI/Yy5taW5GaWx0ZXI6Yi5MSU5FQVIsZj1jLndyYXBTP2Mud3JhcFM6Yi5DTEFNUF9UT19FREdFLGc9Yy53cmFwVD9jLndyYXBUOmIuQ0xBTVBfVE9fRURHRSxoPWMubHVtaW5hbmNlP2IuTFVNSU5BTkNFOmIuUkdCQTtpZihjLnJlcGVhdCYmKGY9Yi5SRVBFQVQsZz1iLlJFUEVBVCksYi5waXhlbFN0b3JlaShiLlVOUEFDS19GTElQX1lfV0VCR0wsISFjLmZsaXBZKSxjLndpZHRoKXt2YXIgaT1jLndpZHRoP2Mud2lkdGg6NTEyLGo9Yy5oZWlnaHQ/Yy5oZWlnaHQ6MixrPWMuYm9yZGVyP2MuYm9yZGVyOjA7Yi50ZXhJbWFnZTJEKGIuVEVYVFVSRV8yRCwwLGgsaSxqLGssaCxiLlVOU0lHTkVEX0JZVEUsbnVsbCl9ZWxzZSBiLnRleEltYWdlMkQoYi5URVhUVVJFXzJELDAsaCxiLlJHQkEsYi5VTlNJR05FRF9CWVRFLGEudmFsdWUuYmFzZVRleHR1cmUuc291cmNlKTtiLnRleFBhcmFtZXRlcmkoYi5URVhUVVJFXzJELGIuVEVYVFVSRV9NQUdfRklMVEVSLGQpLGIudGV4UGFyYW1ldGVyaShiLlRFWFRVUkVfMkQsYi5URVhUVVJFX01JTl9GSUxURVIsZSksYi50ZXhQYXJhbWV0ZXJpKGIuVEVYVFVSRV8yRCxiLlRFWFRVUkVfV1JBUF9TLGYpLGIudGV4UGFyYW1ldGVyaShiLlRFWFRVUkVfMkQsYi5URVhUVVJFX1dSQVBfVCxnKX1iLnVuaWZvcm0xaShhLnVuaWZvcm1Mb2NhdGlvbix0aGlzLnRleHR1cmVDb3VudCksYS5faW5pdD0hMCx0aGlzLnRleHR1cmVDb3VudCsrfX0sYi5QaXhpU2hhZGVyLnByb3RvdHlwZS5zeW5jVW5pZm9ybXM9ZnVuY3Rpb24oKXt0aGlzLnRleHR1cmVDb3VudD0xO3ZhciBhLGM9dGhpcy5nbDtmb3IodmFyIGQgaW4gdGhpcy51bmlmb3JtcylhPXRoaXMudW5pZm9ybXNbZF0sMT09PWEuZ2xWYWx1ZUxlbmd0aD9hLmdsTWF0cml4PT09ITA/YS5nbEZ1bmMuY2FsbChjLGEudW5pZm9ybUxvY2F0aW9uLGEudHJhbnNwb3NlLGEudmFsdWUpOmEuZ2xGdW5jLmNhbGwoYyxhLnVuaWZvcm1Mb2NhdGlvbixhLnZhbHVlKToyPT09YS5nbFZhbHVlTGVuZ3RoP2EuZ2xGdW5jLmNhbGwoYyxhLnVuaWZvcm1Mb2NhdGlvbixhLnZhbHVlLngsYS52YWx1ZS55KTozPT09YS5nbFZhbHVlTGVuZ3RoP2EuZ2xGdW5jLmNhbGwoYyxhLnVuaWZvcm1Mb2NhdGlvbixhLnZhbHVlLngsYS52YWx1ZS55LGEudmFsdWUueik6ND09PWEuZ2xWYWx1ZUxlbmd0aD9hLmdsRnVuYy5jYWxsKGMsYS51bmlmb3JtTG9jYXRpb24sYS52YWx1ZS54LGEudmFsdWUueSxhLnZhbHVlLnosYS52YWx1ZS53KTpcInNhbXBsZXIyRFwiPT09YS50eXBlJiYoYS5faW5pdD8oYy5hY3RpdmVUZXh0dXJlKGNbXCJURVhUVVJFXCIrdGhpcy50ZXh0dXJlQ291bnRdKSxjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCxhLnZhbHVlLmJhc2VUZXh0dXJlLl9nbFRleHR1cmVzW2MuaWRdfHxiLmNyZWF0ZVdlYkdMVGV4dHVyZShhLnZhbHVlLmJhc2VUZXh0dXJlLGMpKSxjLnVuaWZvcm0xaShhLnVuaWZvcm1Mb2NhdGlvbix0aGlzLnRleHR1cmVDb3VudCksdGhpcy50ZXh0dXJlQ291bnQrKyk6dGhpcy5pbml0U2FtcGxlcjJEKGEpKX0sYi5QaXhpU2hhZGVyLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSksdGhpcy51bmlmb3Jtcz1udWxsLHRoaXMuZ2w9bnVsbCx0aGlzLmF0dHJpYnV0ZXM9bnVsbH0sYi5QaXhpU2hhZGVyLmRlZmF1bHRWZXJ0ZXhTcmM9W1wiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcImF0dHJpYnV0ZSB2ZWMyIGFDb2xvcjtcIixcInVuaWZvcm0gdmVjMiBwcm9qZWN0aW9uVmVjdG9yO1wiLFwidW5pZm9ybSB2ZWMyIG9mZnNldFZlY3RvcjtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcImNvbnN0IHZlYzIgY2VudGVyID0gdmVjMigtMS4wLCAxLjApO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX1Bvc2l0aW9uID0gdmVjNCggKChhVmVydGV4UG9zaXRpb24gKyBvZmZzZXRWZWN0b3IpIC8gcHJvamVjdGlvblZlY3RvcikgKyBjZW50ZXIgLCAwLjAsIDEuMCk7XCIsXCIgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcIiAgIHZlYzMgY29sb3IgPSBtb2QodmVjMyhhQ29sb3IueS82NTUzNi4wLCBhQ29sb3IueS8yNTYuMCwgYUNvbG9yLnkpLCAyNTYuMCkgLyAyNTYuMDtcIixcIiAgIHZDb2xvciA9IHZlYzQoY29sb3IgKiBhQ29sb3IueCwgYUNvbG9yLngpO1wiLFwifVwiXSxiLlBpeGlGYXN0U2hhZGVyPWZ1bmN0aW9uKGEpe3RoaXMuX1VJRD1iLl9VSUQrKyx0aGlzLmdsPWEsdGhpcy5wcm9ncmFtPW51bGwsdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbG93cCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyBmbG9hdCB2Q29sb3I7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpICogdkNvbG9yIDtcIixcIn1cIl0sdGhpcy52ZXJ0ZXhTcmM9W1wiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFwiYXR0cmlidXRlIHZlYzIgYVBvc2l0aW9uQ29vcmQ7XCIsXCJhdHRyaWJ1dGUgdmVjMiBhU2NhbGU7XCIsXCJhdHRyaWJ1dGUgZmxvYXQgYVJvdGF0aW9uO1wiLFwiYXR0cmlidXRlIHZlYzIgYVRleHR1cmVDb29yZDtcIixcImF0dHJpYnV0ZSBmbG9hdCBhQ29sb3I7XCIsXCJ1bmlmb3JtIHZlYzIgcHJvamVjdGlvblZlY3RvcjtcIixcInVuaWZvcm0gdmVjMiBvZmZzZXRWZWN0b3I7XCIsXCJ1bmlmb3JtIG1hdDMgdU1hdHJpeDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyBmbG9hdCB2Q29sb3I7XCIsXCJjb25zdCB2ZWMyIGNlbnRlciA9IHZlYzIoLTEuMCwgMS4wKTtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWMyIHY7XCIsXCIgICB2ZWMyIHN2ID0gYVZlcnRleFBvc2l0aW9uICogYVNjYWxlO1wiLFwiICAgdi54ID0gKHN2LngpICogY29zKGFSb3RhdGlvbikgLSAoc3YueSkgKiBzaW4oYVJvdGF0aW9uKTtcIixcIiAgIHYueSA9IChzdi54KSAqIHNpbihhUm90YXRpb24pICsgKHN2LnkpICogY29zKGFSb3RhdGlvbik7XCIsXCIgICB2ID0gKCB1TWF0cml4ICogdmVjMyh2ICsgYVBvc2l0aW9uQ29vcmQgLCAxLjApICkueHkgO1wiLFwiICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCAoIHYgLyBwcm9qZWN0aW9uVmVjdG9yKSArIGNlbnRlciAsIDAuMCwgMS4wKTtcIixcIiAgIHZUZXh0dXJlQ29vcmQgPSBhVGV4dHVyZUNvb3JkO1wiLFwiICAgdkNvbG9yID0gYUNvbG9yO1wiLFwifVwiXSx0aGlzLnRleHR1cmVDb3VudD0wLHRoaXMuaW5pdCgpfSxiLlBpeGlGYXN0U2hhZGVyLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nbCxjPWIuY29tcGlsZVByb2dyYW0oYSx0aGlzLnZlcnRleFNyYyx0aGlzLmZyYWdtZW50U3JjKTthLnVzZVByb2dyYW0oYyksdGhpcy51U2FtcGxlcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwidVNhbXBsZXJcIiksdGhpcy5wcm9qZWN0aW9uVmVjdG9yPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJwcm9qZWN0aW9uVmVjdG9yXCIpLHRoaXMub2Zmc2V0VmVjdG9yPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJvZmZzZXRWZWN0b3JcIiksdGhpcy5kaW1lbnNpb25zPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJkaW1lbnNpb25zXCIpLHRoaXMudU1hdHJpeD1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwidU1hdHJpeFwiKSx0aGlzLmFWZXJ0ZXhQb3NpdGlvbj1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhVmVydGV4UG9zaXRpb25cIiksdGhpcy5hUG9zaXRpb25Db29yZD1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhUG9zaXRpb25Db29yZFwiKSx0aGlzLmFTY2FsZT1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhU2NhbGVcIiksdGhpcy5hUm90YXRpb249YS5nZXRBdHRyaWJMb2NhdGlvbihjLFwiYVJvdGF0aW9uXCIpLHRoaXMuYVRleHR1cmVDb29yZD1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhVGV4dHVyZUNvb3JkXCIpLHRoaXMuY29sb3JBdHRyaWJ1dGU9YS5nZXRBdHRyaWJMb2NhdGlvbihjLFwiYUNvbG9yXCIpLC0xPT09dGhpcy5jb2xvckF0dHJpYnV0ZSYmKHRoaXMuY29sb3JBdHRyaWJ1dGU9MiksdGhpcy5hdHRyaWJ1dGVzPVt0aGlzLmFWZXJ0ZXhQb3NpdGlvbix0aGlzLmFQb3NpdGlvbkNvb3JkLHRoaXMuYVNjYWxlLHRoaXMuYVJvdGF0aW9uLHRoaXMuYVRleHR1cmVDb29yZCx0aGlzLmNvbG9yQXR0cmlidXRlXSx0aGlzLnByb2dyYW09Y30sYi5QaXhpRmFzdFNoYWRlci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLnByb2dyYW0pLHRoaXMudW5pZm9ybXM9bnVsbCx0aGlzLmdsPW51bGwsdGhpcy5hdHRyaWJ1dGVzPW51bGx9LGIuU3RyaXBTaGFkZXI9ZnVuY3Rpb24oYSl7dGhpcy5fVUlEPWIuX1VJRCsrLHRoaXMuZ2w9YSx0aGlzLnByb2dyYW09bnVsbCx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ1bmlmb3JtIGZsb2F0IGFscGhhO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCwgdlRleHR1cmVDb29yZC55KSk7XCIsXCJ9XCJdLHRoaXMudmVydGV4U3JjPVtcImF0dHJpYnV0ZSB2ZWMyIGFWZXJ0ZXhQb3NpdGlvbjtcIixcImF0dHJpYnV0ZSB2ZWMyIGFUZXh0dXJlQ29vcmQ7XCIsXCJ1bmlmb3JtIG1hdDMgdHJhbnNsYXRpb25NYXRyaXg7XCIsXCJ1bmlmb3JtIHZlYzIgcHJvamVjdGlvblZlY3RvcjtcIixcInVuaWZvcm0gdmVjMiBvZmZzZXRWZWN0b3I7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWMzIHYgPSB0cmFuc2xhdGlvbk1hdHJpeCAqIHZlYzMoYVZlcnRleFBvc2l0aW9uICwgMS4wKTtcIixcIiAgIHYgLT0gb2Zmc2V0VmVjdG9yLnh5eDtcIixcIiAgIGdsX1Bvc2l0aW9uID0gdmVjNCggdi54IC8gcHJvamVjdGlvblZlY3Rvci54IC0xLjAsIHYueSAvIC1wcm9qZWN0aW9uVmVjdG9yLnkgKyAxLjAgLCAwLjAsIDEuMCk7XCIsXCIgICB2VGV4dHVyZUNvb3JkID0gYVRleHR1cmVDb29yZDtcIixcIn1cIl0sdGhpcy5pbml0KCl9LGIuU3RyaXBTaGFkZXIucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsLGM9Yi5jb21waWxlUHJvZ3JhbShhLHRoaXMudmVydGV4U3JjLHRoaXMuZnJhZ21lbnRTcmMpO2EudXNlUHJvZ3JhbShjKSx0aGlzLnVTYW1wbGVyPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJ1U2FtcGxlclwiKSx0aGlzLnByb2plY3Rpb25WZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInByb2plY3Rpb25WZWN0b3JcIiksdGhpcy5vZmZzZXRWZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcIm9mZnNldFZlY3RvclwiKSx0aGlzLmNvbG9yQXR0cmlidXRlPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFDb2xvclwiKSx0aGlzLmFWZXJ0ZXhQb3NpdGlvbj1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhVmVydGV4UG9zaXRpb25cIiksdGhpcy5hVGV4dHVyZUNvb3JkPWEuZ2V0QXR0cmliTG9jYXRpb24oYyxcImFUZXh0dXJlQ29vcmRcIiksdGhpcy5hdHRyaWJ1dGVzPVt0aGlzLmFWZXJ0ZXhQb3NpdGlvbix0aGlzLmFUZXh0dXJlQ29vcmRdLHRoaXMudHJhbnNsYXRpb25NYXRyaXg9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInRyYW5zbGF0aW9uTWF0cml4XCIpLHRoaXMuYWxwaGE9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcImFscGhhXCIpLHRoaXMucHJvZ3JhbT1jfSxiLlByaW1pdGl2ZVNoYWRlcj1mdW5jdGlvbihhKXt0aGlzLl9VSUQ9Yi5fVUlEKyssdGhpcy5nbD1hLHRoaXMucHJvZ3JhbT1udWxsLHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHZDb2xvcjtcIixcIn1cIl0sdGhpcy52ZXJ0ZXhTcmM9W1wiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFwiYXR0cmlidXRlIHZlYzQgYUNvbG9yO1wiLFwidW5pZm9ybSBtYXQzIHRyYW5zbGF0aW9uTWF0cml4O1wiLFwidW5pZm9ybSB2ZWMyIHByb2plY3Rpb25WZWN0b3I7XCIsXCJ1bmlmb3JtIHZlYzIgb2Zmc2V0VmVjdG9yO1wiLFwidW5pZm9ybSBmbG9hdCBhbHBoYTtcIixcInVuaWZvcm0gdmVjMyB0aW50O1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWMzIHYgPSB0cmFuc2xhdGlvbk1hdHJpeCAqIHZlYzMoYVZlcnRleFBvc2l0aW9uICwgMS4wKTtcIixcIiAgIHYgLT0gb2Zmc2V0VmVjdG9yLnh5eDtcIixcIiAgIGdsX1Bvc2l0aW9uID0gdmVjNCggdi54IC8gcHJvamVjdGlvblZlY3Rvci54IC0xLjAsIHYueSAvIC1wcm9qZWN0aW9uVmVjdG9yLnkgKyAxLjAgLCAwLjAsIDEuMCk7XCIsXCIgICB2Q29sb3IgPSBhQ29sb3IgKiB2ZWM0KHRpbnQgKiBhbHBoYSwgYWxwaGEpO1wiLFwifVwiXSx0aGlzLmluaXQoKX0sYi5QcmltaXRpdmVTaGFkZXIucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsLGM9Yi5jb21waWxlUHJvZ3JhbShhLHRoaXMudmVydGV4U3JjLHRoaXMuZnJhZ21lbnRTcmMpO2EudXNlUHJvZ3JhbShjKSx0aGlzLnByb2plY3Rpb25WZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInByb2plY3Rpb25WZWN0b3JcIiksdGhpcy5vZmZzZXRWZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcIm9mZnNldFZlY3RvclwiKSx0aGlzLnRpbnRDb2xvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwidGludFwiKSx0aGlzLmFWZXJ0ZXhQb3NpdGlvbj1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhVmVydGV4UG9zaXRpb25cIiksdGhpcy5jb2xvckF0dHJpYnV0ZT1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhQ29sb3JcIiksdGhpcy5hdHRyaWJ1dGVzPVt0aGlzLmFWZXJ0ZXhQb3NpdGlvbix0aGlzLmNvbG9yQXR0cmlidXRlXSx0aGlzLnRyYW5zbGF0aW9uTWF0cml4PWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJ0cmFuc2xhdGlvbk1hdHJpeFwiKSx0aGlzLmFscGhhPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJhbHBoYVwiKSx0aGlzLnByb2dyYW09Y30sYi5QcmltaXRpdmVTaGFkZXIucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmdsLmRlbGV0ZVByb2dyYW0odGhpcy5wcm9ncmFtKSx0aGlzLnVuaWZvcm1zPW51bGwsdGhpcy5nbD1udWxsLHRoaXMuYXR0cmlidXRlPW51bGx9LGIuQ29tcGxleFByaW1pdGl2ZVNoYWRlcj1mdW5jdGlvbihhKXt0aGlzLl9VSUQ9Yi5fVUlEKyssdGhpcy5nbD1hLHRoaXMucHJvZ3JhbT1udWxsLHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHZDb2xvcjtcIixcIn1cIl0sdGhpcy52ZXJ0ZXhTcmM9W1wiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiLFwidW5pZm9ybSBtYXQzIHRyYW5zbGF0aW9uTWF0cml4O1wiLFwidW5pZm9ybSB2ZWMyIHByb2plY3Rpb25WZWN0b3I7XCIsXCJ1bmlmb3JtIHZlYzIgb2Zmc2V0VmVjdG9yO1wiLFwidW5pZm9ybSB2ZWMzIHRpbnQ7XCIsXCJ1bmlmb3JtIGZsb2F0IGFscGhhO1wiLFwidW5pZm9ybSB2ZWMzIGNvbG9yO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWMzIHYgPSB0cmFuc2xhdGlvbk1hdHJpeCAqIHZlYzMoYVZlcnRleFBvc2l0aW9uICwgMS4wKTtcIixcIiAgIHYgLT0gb2Zmc2V0VmVjdG9yLnh5eDtcIixcIiAgIGdsX1Bvc2l0aW9uID0gdmVjNCggdi54IC8gcHJvamVjdGlvblZlY3Rvci54IC0xLjAsIHYueSAvIC1wcm9qZWN0aW9uVmVjdG9yLnkgKyAxLjAgLCAwLjAsIDEuMCk7XCIsXCIgICB2Q29sb3IgPSB2ZWM0KGNvbG9yICogYWxwaGEgKiB0aW50LCBhbHBoYSk7XCIsXCJ9XCJdLHRoaXMuaW5pdCgpfSxiLkNvbXBsZXhQcmltaXRpdmVTaGFkZXIucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsLGM9Yi5jb21waWxlUHJvZ3JhbShhLHRoaXMudmVydGV4U3JjLHRoaXMuZnJhZ21lbnRTcmMpO2EudXNlUHJvZ3JhbShjKSx0aGlzLnByb2plY3Rpb25WZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcInByb2plY3Rpb25WZWN0b3JcIiksdGhpcy5vZmZzZXRWZWN0b3I9YS5nZXRVbmlmb3JtTG9jYXRpb24oYyxcIm9mZnNldFZlY3RvclwiKSx0aGlzLnRpbnRDb2xvcj1hLmdldFVuaWZvcm1Mb2NhdGlvbihjLFwidGludFwiKSx0aGlzLmNvbG9yPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJjb2xvclwiKSx0aGlzLmFWZXJ0ZXhQb3NpdGlvbj1hLmdldEF0dHJpYkxvY2F0aW9uKGMsXCJhVmVydGV4UG9zaXRpb25cIiksdGhpcy5hdHRyaWJ1dGVzPVt0aGlzLmFWZXJ0ZXhQb3NpdGlvbix0aGlzLmNvbG9yQXR0cmlidXRlXSx0aGlzLnRyYW5zbGF0aW9uTWF0cml4PWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJ0cmFuc2xhdGlvbk1hdHJpeFwiKSx0aGlzLmFscGhhPWEuZ2V0VW5pZm9ybUxvY2F0aW9uKGMsXCJhbHBoYVwiKSx0aGlzLnByb2dyYW09Y30sYi5Db21wbGV4UHJpbWl0aXZlU2hhZGVyLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5nbC5kZWxldGVQcm9ncmFtKHRoaXMucHJvZ3JhbSksdGhpcy51bmlmb3Jtcz1udWxsLHRoaXMuZ2w9bnVsbCx0aGlzLmF0dHJpYnV0ZT1udWxsfSxiLldlYkdMR3JhcGhpY3M9ZnVuY3Rpb24oKXt9LGIuV2ViR0xHcmFwaGljcy5yZW5kZXJHcmFwaGljcz1mdW5jdGlvbihhLGMpe3ZhciBkLGU9Yy5nbCxmPWMucHJvamVjdGlvbixnPWMub2Zmc2V0LGg9Yy5zaGFkZXJNYW5hZ2VyLnByaW1pdGl2ZVNoYWRlcjthLmRpcnR5JiZiLldlYkdMR3JhcGhpY3MudXBkYXRlR3JhcGhpY3MoYSxlKTtmb3IodmFyIGk9YS5fd2ViR0xbZS5pZF0saj0wO2o8aS5kYXRhLmxlbmd0aDtqKyspMT09PWkuZGF0YVtqXS5tb2RlPyhkPWkuZGF0YVtqXSxjLnN0ZW5jaWxNYW5hZ2VyLnB1c2hTdGVuY2lsKGEsZCxjKSxlLmRyYXdFbGVtZW50cyhlLlRSSUFOR0xFX0ZBTiw0LGUuVU5TSUdORURfU0hPUlQsMiooZC5pbmRpY2VzLmxlbmd0aC00KSksYy5zdGVuY2lsTWFuYWdlci5wb3BTdGVuY2lsKGEsZCxjKSx0aGlzLmxhc3Q9ZC5tb2RlKTooZD1pLmRhdGFbal0sYy5zaGFkZXJNYW5hZ2VyLnNldFNoYWRlcihoKSxoPWMuc2hhZGVyTWFuYWdlci5wcmltaXRpdmVTaGFkZXIsZS51bmlmb3JtTWF0cml4M2Z2KGgudHJhbnNsYXRpb25NYXRyaXgsITEsYS53b3JsZFRyYW5zZm9ybS50b0FycmF5KCEwKSksZS51bmlmb3JtMmYoaC5wcm9qZWN0aW9uVmVjdG9yLGYueCwtZi55KSxlLnVuaWZvcm0yZihoLm9mZnNldFZlY3RvciwtZy54LC1nLnkpLGUudW5pZm9ybTNmdihoLnRpbnRDb2xvcixiLmhleDJyZ2IoYS50aW50KSksZS51bmlmb3JtMWYoaC5hbHBoYSxhLndvcmxkQWxwaGEpLGUuYmluZEJ1ZmZlcihlLkFSUkFZX0JVRkZFUixkLmJ1ZmZlciksZS52ZXJ0ZXhBdHRyaWJQb2ludGVyKGguYVZlcnRleFBvc2l0aW9uLDIsZS5GTE9BVCwhMSwyNCwwKSxlLnZlcnRleEF0dHJpYlBvaW50ZXIoaC5jb2xvckF0dHJpYnV0ZSw0LGUuRkxPQVQsITEsMjQsOCksZS5iaW5kQnVmZmVyKGUuRUxFTUVOVF9BUlJBWV9CVUZGRVIsZC5pbmRleEJ1ZmZlciksZS5kcmF3RWxlbWVudHMoZS5UUklBTkdMRV9TVFJJUCxkLmluZGljZXMubGVuZ3RoLGUuVU5TSUdORURfU0hPUlQsMCkpfSxiLldlYkdMR3JhcGhpY3MudXBkYXRlR3JhcGhpY3M9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLl93ZWJHTFtjLmlkXTtkfHwoZD1hLl93ZWJHTFtjLmlkXT17bGFzdEluZGV4OjAsZGF0YTpbXSxnbDpjfSksYS5kaXJ0eT0hMTt2YXIgZTtpZihhLmNsZWFyRGlydHkpe2ZvcihhLmNsZWFyRGlydHk9ITEsZT0wO2U8ZC5kYXRhLmxlbmd0aDtlKyspe3ZhciBmPWQuZGF0YVtlXTtmLnJlc2V0KCksYi5XZWJHTEdyYXBoaWNzLmdyYXBoaWNzRGF0YVBvb2wucHVzaChmKX1kLmRhdGE9W10sZC5sYXN0SW5kZXg9MH12YXIgZztmb3IoZT1kLmxhc3RJbmRleDtlPGEuZ3JhcGhpY3NEYXRhLmxlbmd0aDtlKyspe3ZhciBoPWEuZ3JhcGhpY3NEYXRhW2VdO2gudHlwZT09PWIuR3JhcGhpY3MuUE9MWT8oaC5maWxsJiZoLnBvaW50cy5sZW5ndGg+NiYmKGgucG9pbnRzLmxlbmd0aD4xMD8oZz1iLldlYkdMR3JhcGhpY3Muc3dpdGNoTW9kZShkLDEpLGIuV2ViR0xHcmFwaGljcy5idWlsZENvbXBsZXhQb2x5KGgsZykpOihnPWIuV2ViR0xHcmFwaGljcy5zd2l0Y2hNb2RlKGQsMCksYi5XZWJHTEdyYXBoaWNzLmJ1aWxkUG9seShoLGcpKSksaC5saW5lV2lkdGg+MCYmKGc9Yi5XZWJHTEdyYXBoaWNzLnN3aXRjaE1vZGUoZCwwKSxiLldlYkdMR3JhcGhpY3MuYnVpbGRMaW5lKGgsZykpKTooZz1iLldlYkdMR3JhcGhpY3Muc3dpdGNoTW9kZShkLDApLGgudHlwZT09PWIuR3JhcGhpY3MuUkVDVD9iLldlYkdMR3JhcGhpY3MuYnVpbGRSZWN0YW5nbGUoaCxnKTpoLnR5cGU9PT1iLkdyYXBoaWNzLkNJUkN8fGgudHlwZT09PWIuR3JhcGhpY3MuRUxJUD9iLldlYkdMR3JhcGhpY3MuYnVpbGRDaXJjbGUoaCxnKTpoLnR5cGU9PT1iLkdyYXBoaWNzLlJSRUMmJmIuV2ViR0xHcmFwaGljcy5idWlsZFJvdW5kZWRSZWN0YW5nbGUoaCxnKSksZC5sYXN0SW5kZXgrK31mb3IoZT0wO2U8ZC5kYXRhLmxlbmd0aDtlKyspZz1kLmRhdGFbZV0sZy5kaXJ0eSYmZy51cGxvYWQoKX0sYi5XZWJHTEdyYXBoaWNzLnN3aXRjaE1vZGU9ZnVuY3Rpb24oYSxjKXt2YXIgZDtyZXR1cm4gYS5kYXRhLmxlbmd0aD8oZD1hLmRhdGFbYS5kYXRhLmxlbmd0aC0xXSwoZC5tb2RlIT09Y3x8MT09PWMpJiYoZD1iLldlYkdMR3JhcGhpY3MuZ3JhcGhpY3NEYXRhUG9vbC5wb3AoKXx8bmV3IGIuV2ViR0xHcmFwaGljc0RhdGEoYS5nbCksZC5tb2RlPWMsYS5kYXRhLnB1c2goZCkpKTooZD1iLldlYkdMR3JhcGhpY3MuZ3JhcGhpY3NEYXRhUG9vbC5wb3AoKXx8bmV3IGIuV2ViR0xHcmFwaGljc0RhdGEoYS5nbCksZC5tb2RlPWMsYS5kYXRhLnB1c2goZCkpLGQuZGlydHk9ITAsZH0sYi5XZWJHTEdyYXBoaWNzLmJ1aWxkUmVjdGFuZ2xlPWZ1bmN0aW9uKGEsYyl7dmFyIGQ9YS5wb2ludHMsZT1kWzBdLGY9ZFsxXSxnPWRbMl0saD1kWzNdO2lmKGEuZmlsbCl7dmFyIGk9Yi5oZXgycmdiKGEuZmlsbENvbG9yKSxqPWEuZmlsbEFscGhhLGs9aVswXSpqLGw9aVsxXSpqLG09aVsyXSpqLG49Yy5wb2ludHMsbz1jLmluZGljZXMscD1uLmxlbmd0aC82O24ucHVzaChlLGYpLG4ucHVzaChrLGwsbSxqKSxuLnB1c2goZStnLGYpLG4ucHVzaChrLGwsbSxqKSxuLnB1c2goZSxmK2gpLG4ucHVzaChrLGwsbSxqKSxuLnB1c2goZStnLGYraCksbi5wdXNoKGssbCxtLGopLG8ucHVzaChwLHAscCsxLHArMixwKzMscCszKX1pZihhLmxpbmVXaWR0aCl7dmFyIHE9YS5wb2ludHM7YS5wb2ludHM9W2UsZixlK2csZixlK2csZitoLGUsZitoLGUsZl0sYi5XZWJHTEdyYXBoaWNzLmJ1aWxkTGluZShhLGMpLGEucG9pbnRzPXF9fSxiLldlYkdMR3JhcGhpY3MuYnVpbGRSb3VuZGVkUmVjdGFuZ2xlPWZ1bmN0aW9uKGEsYyl7dmFyIGQ9YS5wb2ludHMsZT1kWzBdLGY9ZFsxXSxnPWRbMl0saD1kWzNdLGk9ZFs0XSxqPVtdO2lmKGoucHVzaChlLGYraSksaj1qLmNvbmNhdChiLldlYkdMR3JhcGhpY3MucXVhZHJhdGljQmV6aWVyQ3VydmUoZSxmK2gtaSxlLGYraCxlK2ksZitoKSksaj1qLmNvbmNhdChiLldlYkdMR3JhcGhpY3MucXVhZHJhdGljQmV6aWVyQ3VydmUoZStnLWksZitoLGUrZyxmK2gsZStnLGYraC1pKSksaj1qLmNvbmNhdChiLldlYkdMR3JhcGhpY3MucXVhZHJhdGljQmV6aWVyQ3VydmUoZStnLGYraSxlK2csZixlK2ctaSxmKSksaj1qLmNvbmNhdChiLldlYkdMR3JhcGhpY3MucXVhZHJhdGljQmV6aWVyQ3VydmUoZStpLGYsZSxmLGUsZitpKSksYS5maWxsKXt2YXIgaz1iLmhleDJyZ2IoYS5maWxsQ29sb3IpLGw9YS5maWxsQWxwaGEsbT1rWzBdKmwsbj1rWzFdKmwsbz1rWzJdKmwscD1jLnBvaW50cyxxPWMuaW5kaWNlcyxyPXAubGVuZ3RoLzYscz1iLlBvbHlLLlRyaWFuZ3VsYXRlKGopLHQ9MDtmb3IodD0wO3Q8cy5sZW5ndGg7dCs9MylxLnB1c2goc1t0XStyKSxxLnB1c2goc1t0XStyKSxxLnB1c2goc1t0KzFdK3IpLHEucHVzaChzW3QrMl0rcikscS5wdXNoKHNbdCsyXStyKTtmb3IodD0wO3Q8ai5sZW5ndGg7dCsrKXAucHVzaChqW3RdLGpbKyt0XSxtLG4sbyxsKX1pZihhLmxpbmVXaWR0aCl7dmFyIHU9YS5wb2ludHM7YS5wb2ludHM9aixiLldlYkdMR3JhcGhpY3MuYnVpbGRMaW5lKGEsYyksYS5wb2ludHM9dX19LGIuV2ViR0xHcmFwaGljcy5xdWFkcmF0aWNCZXppZXJDdXJ2ZT1mdW5jdGlvbihhLGIsYyxkLGUsZil7ZnVuY3Rpb24gZyhhLGIsYyl7dmFyIGQ9Yi1hO3JldHVybiBhK2QqY31mb3IodmFyIGgsaSxqLGssbCxtLG49MjAsbz1bXSxwPTAscT0wO24+PXE7cSsrKXA9cS9uLGg9ZyhhLGMscCksaT1nKGIsZCxwKSxqPWcoYyxlLHApLGs9ZyhkLGYscCksbD1nKGgsaixwKSxtPWcoaSxrLHApLG8ucHVzaChsLG0pO3JldHVybiBvfSxiLldlYkdMR3JhcGhpY3MuYnVpbGRDaXJjbGU9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLnBvaW50cyxlPWRbMF0sZj1kWzFdLGc9ZFsyXSxoPWRbM10saT00MCxqPTIqTWF0aC5QSS9pLGs9MDtpZihhLmZpbGwpe3ZhciBsPWIuaGV4MnJnYihhLmZpbGxDb2xvciksbT1hLmZpbGxBbHBoYSxuPWxbMF0qbSxvPWxbMV0qbSxwPWxbMl0qbSxxPWMucG9pbnRzLHI9Yy5pbmRpY2VzLHM9cS5sZW5ndGgvNjtmb3Ioci5wdXNoKHMpLGs9MDtpKzE+aztrKyspcS5wdXNoKGUsZixuLG8scCxtKSxxLnB1c2goZStNYXRoLnNpbihqKmspKmcsZitNYXRoLmNvcyhqKmspKmgsbixvLHAsbSksci5wdXNoKHMrKyxzKyspO3IucHVzaChzLTEpfWlmKGEubGluZVdpZHRoKXt2YXIgdD1hLnBvaW50cztmb3IoYS5wb2ludHM9W10saz0wO2krMT5rO2srKylhLnBvaW50cy5wdXNoKGUrTWF0aC5zaW4oaiprKSpnLGYrTWF0aC5jb3MoaiprKSpoKTtiLldlYkdMR3JhcGhpY3MuYnVpbGRMaW5lKGEsYyksYS5wb2ludHM9dH19LGIuV2ViR0xHcmFwaGljcy5idWlsZExpbmU9ZnVuY3Rpb24oYSxjKXt2YXIgZD0wLGU9YS5wb2ludHM7aWYoMCE9PWUubGVuZ3RoKXtpZihhLmxpbmVXaWR0aCUyKWZvcihkPTA7ZDxlLmxlbmd0aDtkKyspZVtkXSs9LjU7dmFyIGY9bmV3IGIuUG9pbnQoZVswXSxlWzFdKSxnPW5ldyBiLlBvaW50KGVbZS5sZW5ndGgtMl0sZVtlLmxlbmd0aC0xXSk7aWYoZi54PT09Zy54JiZmLnk9PT1nLnkpe2U9ZS5zbGljZSgpLGUucG9wKCksZS5wb3AoKSxnPW5ldyBiLlBvaW50KGVbZS5sZW5ndGgtMl0sZVtlLmxlbmd0aC0xXSk7dmFyIGg9Zy54Ky41KihmLngtZy54KSxpPWcueSsuNSooZi55LWcueSk7ZS51bnNoaWZ0KGgsaSksZS5wdXNoKGgsaSl9dmFyIGosayxsLG0sbixvLHAscSxyLHMsdCx1LHYsdyx4LHkseixBLEIsQyxELEUsRixHPWMucG9pbnRzLEg9Yy5pbmRpY2VzLEk9ZS5sZW5ndGgvMixKPWUubGVuZ3RoLEs9Ry5sZW5ndGgvNixMPWEubGluZVdpZHRoLzIsTT1iLmhleDJyZ2IoYS5saW5lQ29sb3IpLE49YS5saW5lQWxwaGEsTz1NWzBdKk4sUD1NWzFdKk4sUT1NWzJdKk47Zm9yKGw9ZVswXSxtPWVbMV0sbj1lWzJdLG89ZVszXSxyPS0obS1vKSxzPWwtbixGPU1hdGguc3FydChyKnIrcypzKSxyLz1GLHMvPUYscio9TCxzKj1MLEcucHVzaChsLXIsbS1zLE8sUCxRLE4pLEcucHVzaChsK3IsbStzLE8sUCxRLE4pLGQ9MTtJLTE+ZDtkKyspbD1lWzIqKGQtMSldLG09ZVsyKihkLTEpKzFdLG49ZVsyKmRdLG89ZVsyKmQrMV0scD1lWzIqKGQrMSldLHE9ZVsyKihkKzEpKzFdLHI9LShtLW8pLHM9bC1uLEY9TWF0aC5zcXJ0KHIqcitzKnMpLHIvPUYscy89RixyKj1MLHMqPUwsdD0tKG8tcSksdT1uLXAsRj1NYXRoLnNxcnQodCp0K3UqdSksdC89Rix1Lz1GLHQqPUwsdSo9TCx4PS1zK20tKC1zK28pLHk9LXIrbi0oLXIrbCksej0oLXIrbCkqKC1zK28pLSgtcituKSooLXMrbSksQT0tdStxLSgtdStvKSxCPS10K24tKC10K3ApLEM9KC10K3ApKigtdStvKS0oLXQrbikqKC11K3EpLEQ9eCpCLUEqeSxNYXRoLmFicyhEKTwuMT8oRCs9MTAuMSxHLnB1c2gobi1yLG8tcyxPLFAsUSxOKSxHLnB1c2gobityLG8rcyxPLFAsUSxOKSk6KGo9KHkqQy1CKnopL0Qsaz0oQSp6LXgqQykvRCxFPShqLW4pKihqLW4pKyhrLW8pKyhrLW8pLEU+MTk2MDA/KHY9ci10LHc9cy11LEY9TWF0aC5zcXJ0KHYqdit3KncpLHYvPUYsdy89Rix2Kj1MLHcqPUwsRy5wdXNoKG4tdixvLXcpLEcucHVzaChPLFAsUSxOKSxHLnB1c2gobit2LG8rdyksRy5wdXNoKE8sUCxRLE4pLEcucHVzaChuLXYsby13KSxHLnB1c2goTyxQLFEsTiksSisrKTooRy5wdXNoKGosayksRy5wdXNoKE8sUCxRLE4pLEcucHVzaChuLShqLW4pLG8tKGstbykpLEcucHVzaChPLFAsUSxOKSkpO2ZvcihsPWVbMiooSS0yKV0sbT1lWzIqKEktMikrMV0sbj1lWzIqKEktMSldLG89ZVsyKihJLTEpKzFdLHI9LShtLW8pLHM9bC1uLEY9TWF0aC5zcXJ0KHIqcitzKnMpLHIvPUYscy89RixyKj1MLHMqPUwsRy5wdXNoKG4tcixvLXMpLEcucHVzaChPLFAsUSxOKSxHLnB1c2gobityLG8rcyksRy5wdXNoKE8sUCxRLE4pLEgucHVzaChLKSxkPTA7Sj5kO2QrKylILnB1c2goSysrKTtILnB1c2goSy0xKX19LGIuV2ViR0xHcmFwaGljcy5idWlsZENvbXBsZXhQb2x5PWZ1bmN0aW9uKGEsYyl7dmFyIGQ9YS5wb2ludHMuc2xpY2UoKTtpZighKGQubGVuZ3RoPDYpKXt2YXIgZT1jLmluZGljZXM7Yy5wb2ludHM9ZCxjLmFscGhhPWEuZmlsbEFscGhhLGMuY29sb3I9Yi5oZXgycmdiKGEuZmlsbENvbG9yKTtmb3IodmFyIGYsZyxoPTEvMCxpPS0xLzAsaj0xLzAsaz0tMS8wLGw9MDtsPGQubGVuZ3RoO2wrPTIpZj1kW2xdLGc9ZFtsKzFdLGg9aD5mP2Y6aCxpPWY+aT9mOmksaj1qPmc/ZzpqLGs9Zz5rP2c6aztkLnB1c2goaCxqLGksaixpLGssaCxrKTt2YXIgbT1kLmxlbmd0aC8yO2ZvcihsPTA7bT5sO2wrKyllLnB1c2gobCl9fSxiLldlYkdMR3JhcGhpY3MuYnVpbGRQb2x5PWZ1bmN0aW9uKGEsYyl7dmFyIGQ9YS5wb2ludHM7aWYoIShkLmxlbmd0aDw2KSl7dmFyIGU9Yy5wb2ludHMsZj1jLmluZGljZXMsZz1kLmxlbmd0aC8yLGg9Yi5oZXgycmdiKGEuZmlsbENvbG9yKSxpPWEuZmlsbEFscGhhLGo9aFswXSppLGs9aFsxXSppLGw9aFsyXSppLG09Yi5Qb2x5Sy5Ucmlhbmd1bGF0ZShkKSxuPWUubGVuZ3RoLzYsbz0wO2ZvcihvPTA7bzxtLmxlbmd0aDtvKz0zKWYucHVzaChtW29dK24pLGYucHVzaChtW29dK24pLGYucHVzaChtW28rMV0rbiksZi5wdXNoKG1bbysyXStuKSxmLnB1c2gobVtvKzJdK24pO2ZvcihvPTA7Zz5vO28rKyllLnB1c2goZFsyKm9dLGRbMipvKzFdLGosayxsLGkpfX0sYi5XZWJHTEdyYXBoaWNzLmdyYXBoaWNzRGF0YVBvb2w9W10sYi5XZWJHTEdyYXBoaWNzRGF0YT1mdW5jdGlvbihhKXt0aGlzLmdsPWEsdGhpcy5jb2xvcj1bMCwwLDBdLHRoaXMucG9pbnRzPVtdLHRoaXMuaW5kaWNlcz1bXSx0aGlzLmxhc3RJbmRleD0wLHRoaXMuYnVmZmVyPWEuY3JlYXRlQnVmZmVyKCksdGhpcy5pbmRleEJ1ZmZlcj1hLmNyZWF0ZUJ1ZmZlcigpLHRoaXMubW9kZT0xLHRoaXMuYWxwaGE9MSx0aGlzLmRpcnR5PSEwfSxiLldlYkdMR3JhcGhpY3NEYXRhLnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbigpe3RoaXMucG9pbnRzPVtdLHRoaXMuaW5kaWNlcz1bXSx0aGlzLmxhc3RJbmRleD0wfSxiLldlYkdMR3JhcGhpY3NEYXRhLnByb3RvdHlwZS51cGxvYWQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsO3RoaXMuZ2xQb2ludHM9bmV3IEZsb2F0MzJBcnJheSh0aGlzLnBvaW50cyksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMuYnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5BUlJBWV9CVUZGRVIsdGhpcy5nbFBvaW50cyxhLlNUQVRJQ19EUkFXKSx0aGlzLmdsSW5kaWNpZXM9bmV3IFVpbnQxNkFycmF5KHRoaXMuaW5kaWNlcyksYS5iaW5kQnVmZmVyKGEuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRleEJ1ZmZlciksYS5idWZmZXJEYXRhKGEuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5nbEluZGljaWVzLGEuU1RBVElDX0RSQVcpLHRoaXMuZGlydHk9ITF9LGIuZ2xDb250ZXh0cz1bXSxiLldlYkdMUmVuZGVyZXI9ZnVuY3Rpb24oYSxjLGQsZSxmLGcpe2IuZGVmYXVsdFJlbmRlcmVyfHwoYi5zYXlIZWxsbyhcIndlYkdMXCIpLGIuZGVmYXVsdFJlbmRlcmVyPXRoaXMpLHRoaXMudHlwZT1iLldFQkdMX1JFTkRFUkVSLHRoaXMudHJhbnNwYXJlbnQ9ISFlLHRoaXMucHJlc2VydmVEcmF3aW5nQnVmZmVyPWcsdGhpcy53aWR0aD1hfHw4MDAsdGhpcy5oZWlnaHQ9Y3x8NjAwLHRoaXMudmlldz1kfHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLHRoaXMudmlldy53aWR0aD10aGlzLndpZHRoLHRoaXMudmlldy5oZWlnaHQ9dGhpcy5oZWlnaHQsdGhpcy5jb250ZXh0TG9zdD10aGlzLmhhbmRsZUNvbnRleHRMb3N0LmJpbmQodGhpcyksdGhpcy5jb250ZXh0UmVzdG9yZWRMb3N0PXRoaXMuaGFuZGxlQ29udGV4dFJlc3RvcmVkLmJpbmQodGhpcyksdGhpcy52aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJnbGNvbnRleHRsb3N0XCIsdGhpcy5jb250ZXh0TG9zdCwhMSksdGhpcy52aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJnbGNvbnRleHRyZXN0b3JlZFwiLHRoaXMuY29udGV4dFJlc3RvcmVkTG9zdCwhMSksdGhpcy5vcHRpb25zPXthbHBoYTp0aGlzLnRyYW5zcGFyZW50LGFudGlhbGlhczohIWYscHJlbXVsdGlwbGllZEFscGhhOiEhZSxzdGVuY2lsOiEwLHByZXNlcnZlRHJhd2luZ0J1ZmZlcjpnfTt2YXIgaD1udWxsO2lmKFtcImV4cGVyaW1lbnRhbC13ZWJnbFwiLFwid2ViZ2xcIl0uZm9yRWFjaChmdW5jdGlvbihhKXt0cnl7aD1ofHx0aGlzLnZpZXcuZ2V0Q29udGV4dChhLHRoaXMub3B0aW9ucyl9Y2F0Y2goYil7fX0sdGhpcyksIWgpdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgd2ViR0wuIFRyeSB1c2luZyB0aGUgY2FudmFzIHJlbmRlcmVyXCIrdGhpcyk7dGhpcy5nbD1oLHRoaXMuZ2xDb250ZXh0SWQ9aC5pZD1iLldlYkdMUmVuZGVyZXIuZ2xDb250ZXh0SWQrKyxiLmdsQ29udGV4dHNbdGhpcy5nbENvbnRleHRJZF09aCxiLmJsZW5kTW9kZXNXZWJHTHx8KGIuYmxlbmRNb2Rlc1dlYkdMPVtdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5OT1JNQUxdPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5BRERdPVtoLlNSQ19BTFBIQSxoLkRTVF9BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLk1VTFRJUExZXT1baC5EU1RfQ09MT1IsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuU0NSRUVOXT1baC5TUkNfQUxQSEEsaC5PTkVdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5PVkVSTEFZXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuREFSS0VOXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuTElHSFRFTl09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLkNPTE9SX0RPREdFXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuQ09MT1JfQlVSTl09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLkhBUkRfTElHSFRdPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5TT0ZUX0xJR0hUXT1baC5PTkUsaC5PTkVfTUlOVVNfU1JDX0FMUEhBXSxiLmJsZW5kTW9kZXNXZWJHTFtiLmJsZW5kTW9kZXMuRElGRkVSRU5DRV09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLkVYQ0xVU0lPTl09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLkhVRV09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLlNBVFVSQVRJT05dPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdLGIuYmxlbmRNb2Rlc1dlYkdMW2IuYmxlbmRNb2Rlcy5DT0xPUl09W2guT05FLGguT05FX01JTlVTX1NSQ19BTFBIQV0sYi5ibGVuZE1vZGVzV2ViR0xbYi5ibGVuZE1vZGVzLkxVTUlOT1NJVFldPVtoLk9ORSxoLk9ORV9NSU5VU19TUkNfQUxQSEFdKSx0aGlzLnByb2plY3Rpb249bmV3IGIuUG9pbnQsdGhpcy5wcm9qZWN0aW9uLng9dGhpcy53aWR0aC8yLHRoaXMucHJvamVjdGlvbi55PS10aGlzLmhlaWdodC8yLHRoaXMub2Zmc2V0PW5ldyBiLlBvaW50KDAsMCksdGhpcy5yZXNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCksdGhpcy5jb250ZXh0TG9zdD0hMSx0aGlzLnNoYWRlck1hbmFnZXI9bmV3IGIuV2ViR0xTaGFkZXJNYW5hZ2VyKGgpLHRoaXMuc3ByaXRlQmF0Y2g9bmV3IGIuV2ViR0xTcHJpdGVCYXRjaChoKSx0aGlzLm1hc2tNYW5hZ2VyPW5ldyBiLldlYkdMTWFza01hbmFnZXIoaCksdGhpcy5maWx0ZXJNYW5hZ2VyPW5ldyBiLldlYkdMRmlsdGVyTWFuYWdlcihoLHRoaXMudHJhbnNwYXJlbnQpLHRoaXMuc3RlbmNpbE1hbmFnZXI9bmV3IGIuV2ViR0xTdGVuY2lsTWFuYWdlcihoKSx0aGlzLmJsZW5kTW9kZU1hbmFnZXI9bmV3IGIuV2ViR0xCbGVuZE1vZGVNYW5hZ2VyKGgpLHRoaXMucmVuZGVyU2Vzc2lvbj17fSx0aGlzLnJlbmRlclNlc3Npb24uZ2w9dGhpcy5nbCx0aGlzLnJlbmRlclNlc3Npb24uZHJhd0NvdW50PTAsdGhpcy5yZW5kZXJTZXNzaW9uLnNoYWRlck1hbmFnZXI9dGhpcy5zaGFkZXJNYW5hZ2VyLHRoaXMucmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlcj10aGlzLm1hc2tNYW5hZ2VyLHRoaXMucmVuZGVyU2Vzc2lvbi5maWx0ZXJNYW5hZ2VyPXRoaXMuZmlsdGVyTWFuYWdlcix0aGlzLnJlbmRlclNlc3Npb24uYmxlbmRNb2RlTWFuYWdlcj10aGlzLmJsZW5kTW9kZU1hbmFnZXIsdGhpcy5yZW5kZXJTZXNzaW9uLnNwcml0ZUJhdGNoPXRoaXMuc3ByaXRlQmF0Y2gsdGhpcy5yZW5kZXJTZXNzaW9uLnN0ZW5jaWxNYW5hZ2VyPXRoaXMuc3RlbmNpbE1hbmFnZXIsdGhpcy5yZW5kZXJTZXNzaW9uLnJlbmRlcmVyPXRoaXMsaC51c2VQcm9ncmFtKHRoaXMuc2hhZGVyTWFuYWdlci5kZWZhdWx0U2hhZGVyLnByb2dyYW0pLGguZGlzYWJsZShoLkRFUFRIX1RFU1QpLGguZGlzYWJsZShoLkNVTExfRkFDRSksaC5lbmFibGUoaC5CTEVORCksaC5jb2xvck1hc2soITAsITAsITAsdGhpcy50cmFuc3BhcmVudCl9LGIuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5XZWJHTFJlbmRlcmVyLGIuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKGEpe2lmKCF0aGlzLmNvbnRleHRMb3N0KXt0aGlzLl9fc3RhZ2UhPT1hJiYoYS5pbnRlcmFjdGl2ZSYmYS5pbnRlcmFjdGlvbk1hbmFnZXIucmVtb3ZlRXZlbnRzKCksdGhpcy5fX3N0YWdlPWEpLGIuV2ViR0xSZW5kZXJlci51cGRhdGVUZXh0dXJlcygpLGEudXBkYXRlVHJhbnNmb3JtKCksYS5faW50ZXJhY3RpdmUmJihhLl9pbnRlcmFjdGl2ZUV2ZW50c0FkZGVkfHwoYS5faW50ZXJhY3RpdmVFdmVudHNBZGRlZD0hMCxhLmludGVyYWN0aW9uTWFuYWdlci5zZXRUYXJnZXQodGhpcykpKTt2YXIgYz10aGlzLmdsO2Mudmlld3BvcnQoMCwwLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpLGMuYmluZEZyYW1lYnVmZmVyKGMuRlJBTUVCVUZGRVIsbnVsbCksdGhpcy50cmFuc3BhcmVudD9jLmNsZWFyQ29sb3IoMCwwLDAsMCk6Yy5jbGVhckNvbG9yKGEuYmFja2dyb3VuZENvbG9yU3BsaXRbMF0sYS5iYWNrZ3JvdW5kQ29sb3JTcGxpdFsxXSxhLmJhY2tncm91bmRDb2xvclNwbGl0WzJdLDEpLGMuY2xlYXIoYy5DT0xPUl9CVUZGRVJfQklUKSx0aGlzLnJlbmRlckRpc3BsYXlPYmplY3QoYSx0aGlzLnByb2plY3Rpb24pLGEuaW50ZXJhY3RpdmU/YS5faW50ZXJhY3RpdmVFdmVudHNBZGRlZHx8KGEuX2ludGVyYWN0aXZlRXZlbnRzQWRkZWQ9ITAsYS5pbnRlcmFjdGlvbk1hbmFnZXIuc2V0VGFyZ2V0KHRoaXMpKTphLl9pbnRlcmFjdGl2ZUV2ZW50c0FkZGVkJiYoYS5faW50ZXJhY3RpdmVFdmVudHNBZGRlZD0hMSxhLmludGVyYWN0aW9uTWFuYWdlci5zZXRUYXJnZXQodGhpcykpfX0sYi5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJEaXNwbGF5T2JqZWN0PWZ1bmN0aW9uKGEsYyxkKXt0aGlzLnJlbmRlclNlc3Npb24uYmxlbmRNb2RlTWFuYWdlci5zZXRCbGVuZE1vZGUoYi5ibGVuZE1vZGVzLk5PUk1BTCksdGhpcy5yZW5kZXJTZXNzaW9uLmRyYXdDb3VudD0wLHRoaXMucmVuZGVyU2Vzc2lvbi5jdXJyZW50QmxlbmRNb2RlPTk5OTksdGhpcy5yZW5kZXJTZXNzaW9uLnByb2plY3Rpb249Yyx0aGlzLnJlbmRlclNlc3Npb24ub2Zmc2V0PXRoaXMub2Zmc2V0LHRoaXMuc3ByaXRlQmF0Y2guYmVnaW4odGhpcy5yZW5kZXJTZXNzaW9uKSx0aGlzLmZpbHRlck1hbmFnZXIuYmVnaW4odGhpcy5yZW5kZXJTZXNzaW9uLGQpLGEuX3JlbmRlcldlYkdMKHRoaXMucmVuZGVyU2Vzc2lvbiksdGhpcy5zcHJpdGVCYXRjaC5lbmQoKX0sYi5XZWJHTFJlbmRlcmVyLnVwZGF0ZVRleHR1cmVzPWZ1bmN0aW9uKCl7dmFyIGE9MDtmb3IoYT0wO2E8Yi5UZXh0dXJlLmZyYW1lVXBkYXRlcy5sZW5ndGg7YSsrKWIuV2ViR0xSZW5kZXJlci51cGRhdGVUZXh0dXJlRnJhbWUoYi5UZXh0dXJlLmZyYW1lVXBkYXRlc1thXSk7Zm9yKGE9MDthPGIudGV4dHVyZXNUb0Rlc3Ryb3kubGVuZ3RoO2ErKyliLldlYkdMUmVuZGVyZXIuZGVzdHJveVRleHR1cmUoYi50ZXh0dXJlc1RvRGVzdHJveVthXSk7Yi50ZXh0dXJlc1RvVXBkYXRlLmxlbmd0aD0wLGIudGV4dHVyZXNUb0Rlc3Ryb3kubGVuZ3RoPTAsYi5UZXh0dXJlLmZyYW1lVXBkYXRlcy5sZW5ndGg9MH0sYi5XZWJHTFJlbmRlcmVyLmRlc3Ryb3lUZXh0dXJlPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYz1hLl9nbFRleHR1cmVzLmxlbmd0aC0xO2M+PTA7Yy0tKXt2YXIgZD1hLl9nbFRleHR1cmVzW2NdLGU9Yi5nbENvbnRleHRzW2NdO1xuZSYmZCYmZS5kZWxldGVUZXh0dXJlKGQpfWEuX2dsVGV4dHVyZXMubGVuZ3RoPTB9LGIuV2ViR0xSZW5kZXJlci51cGRhdGVUZXh0dXJlRnJhbWU9ZnVuY3Rpb24oYSl7YS5fdXBkYXRlV2ViR0x1dnMoKX0sYi5XZWJHTFJlbmRlcmVyLnByb3RvdHlwZS5yZXNpemU9ZnVuY3Rpb24oYSxiKXt0aGlzLndpZHRoPWEsdGhpcy5oZWlnaHQ9Yix0aGlzLnZpZXcud2lkdGg9YSx0aGlzLnZpZXcuaGVpZ2h0PWIsdGhpcy5nbC52aWV3cG9ydCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCksdGhpcy5wcm9qZWN0aW9uLng9dGhpcy53aWR0aC8yLHRoaXMucHJvamVjdGlvbi55PS10aGlzLmhlaWdodC8yfSxiLmNyZWF0ZVdlYkdMVGV4dHVyZT1mdW5jdGlvbihhLGMpe3JldHVybiBhLmhhc0xvYWRlZCYmKGEuX2dsVGV4dHVyZXNbYy5pZF09Yy5jcmVhdGVUZXh0dXJlKCksYy5iaW5kVGV4dHVyZShjLlRFWFRVUkVfMkQsYS5fZ2xUZXh0dXJlc1tjLmlkXSksYy5waXhlbFN0b3JlaShjLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCxhLnByZW11bHRpcGxpZWRBbHBoYSksYy50ZXhJbWFnZTJEKGMuVEVYVFVSRV8yRCwwLGMuUkdCQSxjLlJHQkEsYy5VTlNJR05FRF9CWVRFLGEuc291cmNlKSxjLnRleFBhcmFtZXRlcmkoYy5URVhUVVJFXzJELGMuVEVYVFVSRV9NQUdfRklMVEVSLGEuc2NhbGVNb2RlPT09Yi5zY2FsZU1vZGVzLkxJTkVBUj9jLkxJTkVBUjpjLk5FQVJFU1QpLGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX01JTl9GSUxURVIsYS5zY2FsZU1vZGU9PT1iLnNjYWxlTW9kZXMuTElORUFSP2MuTElORUFSOmMuTkVBUkVTVCksYS5fcG93ZXJPZjI/KGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX1dSQVBfUyxjLlJFUEVBVCksYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9ULGMuUkVQRUFUKSk6KGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX1dSQVBfUyxjLkNMQU1QX1RPX0VER0UpLGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX1dSQVBfVCxjLkNMQU1QX1RPX0VER0UpKSxjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCxudWxsKSxhLl9kaXJ0eVtjLmlkXT0hMSksYS5fZ2xUZXh0dXJlc1tjLmlkXX0sYi51cGRhdGVXZWJHTFRleHR1cmU9ZnVuY3Rpb24oYSxjKXthLl9nbFRleHR1cmVzW2MuaWRdJiYoYy5iaW5kVGV4dHVyZShjLlRFWFRVUkVfMkQsYS5fZ2xUZXh0dXJlc1tjLmlkXSksYy5waXhlbFN0b3JlaShjLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCxhLnByZW11bHRpcGxpZWRBbHBoYSksYy50ZXhJbWFnZTJEKGMuVEVYVFVSRV8yRCwwLGMuUkdCQSxjLlJHQkEsYy5VTlNJR05FRF9CWVRFLGEuc291cmNlKSxjLnRleFBhcmFtZXRlcmkoYy5URVhUVVJFXzJELGMuVEVYVFVSRV9NQUdfRklMVEVSLGEuc2NhbGVNb2RlPT09Yi5zY2FsZU1vZGVzLkxJTkVBUj9jLkxJTkVBUjpjLk5FQVJFU1QpLGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX01JTl9GSUxURVIsYS5zY2FsZU1vZGU9PT1iLnNjYWxlTW9kZXMuTElORUFSP2MuTElORUFSOmMuTkVBUkVTVCksYS5fcG93ZXJPZjI/KGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX1dSQVBfUyxjLlJFUEVBVCksYy50ZXhQYXJhbWV0ZXJpKGMuVEVYVFVSRV8yRCxjLlRFWFRVUkVfV1JBUF9ULGMuUkVQRUFUKSk6KGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX1dSQVBfUyxjLkNMQU1QX1RPX0VER0UpLGMudGV4UGFyYW1ldGVyaShjLlRFWFRVUkVfMkQsYy5URVhUVVJFX1dSQVBfVCxjLkNMQU1QX1RPX0VER0UpKSxhLl9kaXJ0eVtjLmlkXT0hMSl9LGIuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuaGFuZGxlQ29udGV4dExvc3Q9ZnVuY3Rpb24oYSl7YS5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuY29udGV4dExvc3Q9ITB9LGIuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuaGFuZGxlQ29udGV4dFJlc3RvcmVkPWZ1bmN0aW9uKCl7dHJ5e3RoaXMuZ2w9dGhpcy52aWV3LmdldENvbnRleHQoXCJleHBlcmltZW50YWwtd2ViZ2xcIix0aGlzLm9wdGlvbnMpfWNhdGNoKGEpe3RyeXt0aGlzLmdsPXRoaXMudmlldy5nZXRDb250ZXh0KFwid2ViZ2xcIix0aGlzLm9wdGlvbnMpfWNhdGNoKGMpe3Rocm93IG5ldyBFcnJvcihcIiBUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB3ZWJHTC4gVHJ5IHVzaW5nIHRoZSBjYW52YXMgcmVuZGVyZXJcIit0aGlzKX19dmFyIGQ9dGhpcy5nbDtkLmlkPWIuV2ViR0xSZW5kZXJlci5nbENvbnRleHRJZCsrLHRoaXMuc2hhZGVyTWFuYWdlci5zZXRDb250ZXh0KGQpLHRoaXMuc3ByaXRlQmF0Y2guc2V0Q29udGV4dChkKSx0aGlzLnByaW1pdGl2ZUJhdGNoLnNldENvbnRleHQoZCksdGhpcy5tYXNrTWFuYWdlci5zZXRDb250ZXh0KGQpLHRoaXMuZmlsdGVyTWFuYWdlci5zZXRDb250ZXh0KGQpLHRoaXMucmVuZGVyU2Vzc2lvbi5nbD10aGlzLmdsLGQuZGlzYWJsZShkLkRFUFRIX1RFU1QpLGQuZGlzYWJsZShkLkNVTExfRkFDRSksZC5lbmFibGUoZC5CTEVORCksZC5jb2xvck1hc2soITAsITAsITAsdGhpcy50cmFuc3BhcmVudCksdGhpcy5nbC52aWV3cG9ydCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCk7Zm9yKHZhciBlIGluIGIuVGV4dHVyZUNhY2hlKXt2YXIgZj1iLlRleHR1cmVDYWNoZVtlXS5iYXNlVGV4dHVyZTtmLl9nbFRleHR1cmVzPVtdfXRoaXMuY29udGV4dExvc3Q9ITF9LGIuV2ViR0xSZW5kZXJlci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMudmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwid2ViZ2xjb250ZXh0bG9zdFwiLHRoaXMuY29udGV4dExvc3QpLHRoaXMudmlldy5yZW1vdmVFdmVudExpc3RlbmVyKFwid2ViZ2xjb250ZXh0cmVzdG9yZWRcIix0aGlzLmNvbnRleHRSZXN0b3JlZExvc3QpLGIuZ2xDb250ZXh0c1t0aGlzLmdsQ29udGV4dElkXT1udWxsLHRoaXMucHJvamVjdGlvbj1udWxsLHRoaXMub2Zmc2V0PW51bGwsdGhpcy5zaGFkZXJNYW5hZ2VyLmRlc3Ryb3koKSx0aGlzLnNwcml0ZUJhdGNoLmRlc3Ryb3koKSx0aGlzLnByaW1pdGl2ZUJhdGNoLmRlc3Ryb3koKSx0aGlzLm1hc2tNYW5hZ2VyLmRlc3Ryb3koKSx0aGlzLmZpbHRlck1hbmFnZXIuZGVzdHJveSgpLHRoaXMuc2hhZGVyTWFuYWdlcj1udWxsLHRoaXMuc3ByaXRlQmF0Y2g9bnVsbCx0aGlzLm1hc2tNYW5hZ2VyPW51bGwsdGhpcy5maWx0ZXJNYW5hZ2VyPW51bGwsdGhpcy5nbD1udWxsLHRoaXMucmVuZGVyU2Vzc2lvbj1udWxsfSxiLldlYkdMUmVuZGVyZXIuZ2xDb250ZXh0SWQ9MCxiLldlYkdMQmxlbmRNb2RlTWFuYWdlcj1mdW5jdGlvbihhKXt0aGlzLmdsPWEsdGhpcy5jdXJyZW50QmxlbmRNb2RlPTk5OTk5fSxiLldlYkdMQmxlbmRNb2RlTWFuYWdlci5wcm90b3R5cGUuc2V0QmxlbmRNb2RlPWZ1bmN0aW9uKGEpe2lmKHRoaXMuY3VycmVudEJsZW5kTW9kZT09PWEpcmV0dXJuITE7dGhpcy5jdXJyZW50QmxlbmRNb2RlPWE7dmFyIGM9Yi5ibGVuZE1vZGVzV2ViR0xbdGhpcy5jdXJyZW50QmxlbmRNb2RlXTtyZXR1cm4gdGhpcy5nbC5ibGVuZEZ1bmMoY1swXSxjWzFdKSwhMH0sYi5XZWJHTEJsZW5kTW9kZU1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmdsPW51bGx9LGIuV2ViR0xNYXNrTWFuYWdlcj1mdW5jdGlvbihhKXt0aGlzLm1hc2tTdGFjaz1bXSx0aGlzLm1hc2tQb3NpdGlvbj0wLHRoaXMuc2V0Q29udGV4dChhKSx0aGlzLnJldmVyc2U9ITEsdGhpcy5jb3VudD0wfSxiLldlYkdMTWFza01hbmFnZXIucHJvdG90eXBlLnNldENvbnRleHQ9ZnVuY3Rpb24oYSl7dGhpcy5nbD1hfSxiLldlYkdMTWFza01hbmFnZXIucHJvdG90eXBlLnB1c2hNYXNrPWZ1bmN0aW9uKGEsYyl7dmFyIGQ9Yy5nbDthLmRpcnR5JiZiLldlYkdMR3JhcGhpY3MudXBkYXRlR3JhcGhpY3MoYSxkKSxhLl93ZWJHTFtkLmlkXS5kYXRhLmxlbmd0aCYmYy5zdGVuY2lsTWFuYWdlci5wdXNoU3RlbmNpbChhLGEuX3dlYkdMW2QuaWRdLmRhdGFbMF0sYyl9LGIuV2ViR0xNYXNrTWFuYWdlci5wcm90b3R5cGUucG9wTWFzaz1mdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuZ2w7Yi5zdGVuY2lsTWFuYWdlci5wb3BTdGVuY2lsKGEsYS5fd2ViR0xbYy5pZF0uZGF0YVswXSxiKX0sYi5XZWJHTE1hc2tNYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy5tYXNrU3RhY2s9bnVsbCx0aGlzLmdsPW51bGx9LGIuV2ViR0xTdGVuY2lsTWFuYWdlcj1mdW5jdGlvbihhKXt0aGlzLnN0ZW5jaWxTdGFjaz1bXSx0aGlzLnNldENvbnRleHQoYSksdGhpcy5yZXZlcnNlPSEwLHRoaXMuY291bnQ9MH0sYi5XZWJHTFN0ZW5jaWxNYW5hZ2VyLnByb3RvdHlwZS5zZXRDb250ZXh0PWZ1bmN0aW9uKGEpe3RoaXMuZ2w9YX0sYi5XZWJHTFN0ZW5jaWxNYW5hZ2VyLnByb3RvdHlwZS5wdXNoU3RlbmNpbD1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcy5nbDt0aGlzLmJpbmRHcmFwaGljcyhhLGIsYyksMD09PXRoaXMuc3RlbmNpbFN0YWNrLmxlbmd0aCYmKGQuZW5hYmxlKGQuU1RFTkNJTF9URVNUKSxkLmNsZWFyKGQuU1RFTkNJTF9CVUZGRVJfQklUKSx0aGlzLnJldmVyc2U9ITAsdGhpcy5jb3VudD0wKSx0aGlzLnN0ZW5jaWxTdGFjay5wdXNoKGIpO3ZhciBlPXRoaXMuY291bnQ7ZC5jb2xvck1hc2soITEsITEsITEsITEpLGQuc3RlbmNpbEZ1bmMoZC5BTFdBWVMsMCwyNTUpLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5JTlZFUlQpLDE9PT1iLm1vZGU/KGQuZHJhd0VsZW1lbnRzKGQuVFJJQU5HTEVfRkFOLGIuaW5kaWNlcy5sZW5ndGgtNCxkLlVOU0lHTkVEX1NIT1JULDApLHRoaXMucmV2ZXJzZT8oZC5zdGVuY2lsRnVuYyhkLkVRVUFMLDI1NS1lLDI1NSksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLkRFQ1IpKTooZC5zdGVuY2lsRnVuYyhkLkVRVUFMLGUsMjU1KSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuSU5DUikpLGQuZHJhd0VsZW1lbnRzKGQuVFJJQU5HTEVfRkFOLDQsZC5VTlNJR05FRF9TSE9SVCwyKihiLmluZGljZXMubGVuZ3RoLTQpKSx0aGlzLnJldmVyc2U/ZC5zdGVuY2lsRnVuYyhkLkVRVUFMLDI1NS0oZSsxKSwyNTUpOmQuc3RlbmNpbEZ1bmMoZC5FUVVBTCxlKzEsMjU1KSx0aGlzLnJldmVyc2U9IXRoaXMucmV2ZXJzZSk6KHRoaXMucmV2ZXJzZT8oZC5zdGVuY2lsRnVuYyhkLkVRVUFMLGUsMjU1KSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuSU5DUikpOihkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsMjU1LWUsMjU1KSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuREVDUikpLGQuZHJhd0VsZW1lbnRzKGQuVFJJQU5HTEVfU1RSSVAsYi5pbmRpY2VzLmxlbmd0aCxkLlVOU0lHTkVEX1NIT1JULDApLHRoaXMucmV2ZXJzZT9kLnN0ZW5jaWxGdW5jKGQuRVFVQUwsZSsxLDI1NSk6ZC5zdGVuY2lsRnVuYyhkLkVRVUFMLDI1NS0oZSsxKSwyNTUpKSxkLmNvbG9yTWFzayghMCwhMCwhMCwhMCksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLktFRVApLHRoaXMuY291bnQrK30sYi5XZWJHTFN0ZW5jaWxNYW5hZ2VyLnByb3RvdHlwZS5iaW5kR3JhcGhpY3M9ZnVuY3Rpb24oYSxjLGQpe3RoaXMuX2N1cnJlbnRHcmFwaGljcz1hO3ZhciBlLGY9dGhpcy5nbCxnPWQucHJvamVjdGlvbixoPWQub2Zmc2V0OzE9PT1jLm1vZGU/KGU9ZC5zaGFkZXJNYW5hZ2VyLmNvbXBsZXhQcmltYXRpdmVTaGFkZXIsZC5zaGFkZXJNYW5hZ2VyLnNldFNoYWRlcihlKSxmLnVuaWZvcm1NYXRyaXgzZnYoZS50cmFuc2xhdGlvbk1hdHJpeCwhMSxhLndvcmxkVHJhbnNmb3JtLnRvQXJyYXkoITApKSxmLnVuaWZvcm0yZihlLnByb2plY3Rpb25WZWN0b3IsZy54LC1nLnkpLGYudW5pZm9ybTJmKGUub2Zmc2V0VmVjdG9yLC1oLngsLWgueSksZi51bmlmb3JtM2Z2KGUudGludENvbG9yLGIuaGV4MnJnYihhLnRpbnQpKSxmLnVuaWZvcm0zZnYoZS5jb2xvcixjLmNvbG9yKSxmLnVuaWZvcm0xZihlLmFscGhhLGEud29ybGRBbHBoYSpjLmFscGhhKSxmLmJpbmRCdWZmZXIoZi5BUlJBWV9CVUZGRVIsYy5idWZmZXIpLGYudmVydGV4QXR0cmliUG9pbnRlcihlLmFWZXJ0ZXhQb3NpdGlvbiwyLGYuRkxPQVQsITEsOCwwKSxmLmJpbmRCdWZmZXIoZi5FTEVNRU5UX0FSUkFZX0JVRkZFUixjLmluZGV4QnVmZmVyKSk6KGU9ZC5zaGFkZXJNYW5hZ2VyLnByaW1pdGl2ZVNoYWRlcixkLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKGUpLGYudW5pZm9ybU1hdHJpeDNmdihlLnRyYW5zbGF0aW9uTWF0cml4LCExLGEud29ybGRUcmFuc2Zvcm0udG9BcnJheSghMCkpLGYudW5pZm9ybTJmKGUucHJvamVjdGlvblZlY3RvcixnLngsLWcueSksZi51bmlmb3JtMmYoZS5vZmZzZXRWZWN0b3IsLWgueCwtaC55KSxmLnVuaWZvcm0zZnYoZS50aW50Q29sb3IsYi5oZXgycmdiKGEudGludCkpLGYudW5pZm9ybTFmKGUuYWxwaGEsYS53b3JsZEFscGhhKSxmLmJpbmRCdWZmZXIoZi5BUlJBWV9CVUZGRVIsYy5idWZmZXIpLGYudmVydGV4QXR0cmliUG9pbnRlcihlLmFWZXJ0ZXhQb3NpdGlvbiwyLGYuRkxPQVQsITEsMjQsMCksZi52ZXJ0ZXhBdHRyaWJQb2ludGVyKGUuY29sb3JBdHRyaWJ1dGUsNCxmLkZMT0FULCExLDI0LDgpLGYuYmluZEJ1ZmZlcihmLkVMRU1FTlRfQVJSQVlfQlVGRkVSLGMuaW5kZXhCdWZmZXIpKX0sYi5XZWJHTFN0ZW5jaWxNYW5hZ2VyLnByb3RvdHlwZS5wb3BTdGVuY2lsPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLmdsO2lmKHRoaXMuc3RlbmNpbFN0YWNrLnBvcCgpLHRoaXMuY291bnQtLSwwPT09dGhpcy5zdGVuY2lsU3RhY2subGVuZ3RoKWQuZGlzYWJsZShkLlNURU5DSUxfVEVTVCk7ZWxzZXt2YXIgZT10aGlzLmNvdW50O3RoaXMuYmluZEdyYXBoaWNzKGEsYixjKSxkLmNvbG9yTWFzayghMSwhMSwhMSwhMSksMT09PWIubW9kZT8odGhpcy5yZXZlcnNlPSF0aGlzLnJldmVyc2UsdGhpcy5yZXZlcnNlPyhkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsMjU1LShlKzEpLDI1NSksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLklOQ1IpKTooZC5zdGVuY2lsRnVuYyhkLkVRVUFMLGUrMSwyNTUpLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5ERUNSKSksZC5kcmF3RWxlbWVudHMoZC5UUklBTkdMRV9GQU4sNCxkLlVOU0lHTkVEX1NIT1JULDIqKGIuaW5kaWNlcy5sZW5ndGgtNCkpLGQuc3RlbmNpbEZ1bmMoZC5BTFdBWVMsMCwyNTUpLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5JTlZFUlQpLGQuZHJhd0VsZW1lbnRzKGQuVFJJQU5HTEVfRkFOLGIuaW5kaWNlcy5sZW5ndGgtNCxkLlVOU0lHTkVEX1NIT1JULDApLHRoaXMucmV2ZXJzZT9kLnN0ZW5jaWxGdW5jKGQuRVFVQUwsZSwyNTUpOmQuc3RlbmNpbEZ1bmMoZC5FUVVBTCwyNTUtZSwyNTUpKToodGhpcy5yZXZlcnNlPyhkLnN0ZW5jaWxGdW5jKGQuRVFVQUwsZSsxLDI1NSksZC5zdGVuY2lsT3AoZC5LRUVQLGQuS0VFUCxkLkRFQ1IpKTooZC5zdGVuY2lsRnVuYyhkLkVRVUFMLDI1NS0oZSsxKSwyNTUpLGQuc3RlbmNpbE9wKGQuS0VFUCxkLktFRVAsZC5JTkNSKSksZC5kcmF3RWxlbWVudHMoZC5UUklBTkdMRV9TVFJJUCxiLmluZGljZXMubGVuZ3RoLGQuVU5TSUdORURfU0hPUlQsMCksdGhpcy5yZXZlcnNlP2Quc3RlbmNpbEZ1bmMoZC5FUVVBTCxlLDI1NSk6ZC5zdGVuY2lsRnVuYyhkLkVRVUFMLDI1NS1lLDI1NSkpLGQuY29sb3JNYXNrKCEwLCEwLCEwLCEwKSxkLnN0ZW5jaWxPcChkLktFRVAsZC5LRUVQLGQuS0VFUCl9fSxiLldlYkdMU3RlbmNpbE1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLm1hc2tTdGFjaz1udWxsLHRoaXMuZ2w9bnVsbH0sYi5XZWJHTFNoYWRlck1hbmFnZXI9ZnVuY3Rpb24oYSl7dGhpcy5tYXhBdHRpYnM9MTAsdGhpcy5hdHRyaWJTdGF0ZT1bXSx0aGlzLnRlbXBBdHRyaWJTdGF0ZT1bXSx0aGlzLnNoYWRlck1hcD1bXTtmb3IodmFyIGI9MDtiPHRoaXMubWF4QXR0aWJzO2IrKyl0aGlzLmF0dHJpYlN0YXRlW2JdPSExO3RoaXMuc2V0Q29udGV4dChhKX0sYi5XZWJHTFNoYWRlck1hbmFnZXIucHJvdG90eXBlLnNldENvbnRleHQ9ZnVuY3Rpb24oYSl7dGhpcy5nbD1hLHRoaXMucHJpbWl0aXZlU2hhZGVyPW5ldyBiLlByaW1pdGl2ZVNoYWRlcihhKSx0aGlzLmNvbXBsZXhQcmltYXRpdmVTaGFkZXI9bmV3IGIuQ29tcGxleFByaW1pdGl2ZVNoYWRlcihhKSx0aGlzLmRlZmF1bHRTaGFkZXI9bmV3IGIuUGl4aVNoYWRlcihhKSx0aGlzLmZhc3RTaGFkZXI9bmV3IGIuUGl4aUZhc3RTaGFkZXIoYSksdGhpcy5zdHJpcFNoYWRlcj1uZXcgYi5TdHJpcFNoYWRlcihhKSx0aGlzLnNldFNoYWRlcih0aGlzLmRlZmF1bHRTaGFkZXIpfSxiLldlYkdMU2hhZGVyTWFuYWdlci5wcm90b3R5cGUuc2V0QXR0cmlicz1mdW5jdGlvbihhKXt2YXIgYjtmb3IoYj0wO2I8dGhpcy50ZW1wQXR0cmliU3RhdGUubGVuZ3RoO2IrKyl0aGlzLnRlbXBBdHRyaWJTdGF0ZVtiXT0hMTtmb3IoYj0wO2I8YS5sZW5ndGg7YisrKXt2YXIgYz1hW2JdO3RoaXMudGVtcEF0dHJpYlN0YXRlW2NdPSEwfXZhciBkPXRoaXMuZ2w7Zm9yKGI9MDtiPHRoaXMuYXR0cmliU3RhdGUubGVuZ3RoO2IrKyl0aGlzLmF0dHJpYlN0YXRlW2JdIT09dGhpcy50ZW1wQXR0cmliU3RhdGVbYl0mJih0aGlzLmF0dHJpYlN0YXRlW2JdPXRoaXMudGVtcEF0dHJpYlN0YXRlW2JdLHRoaXMudGVtcEF0dHJpYlN0YXRlW2JdP2QuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYik6ZC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoYikpfSxiLldlYkdMU2hhZGVyTWFuYWdlci5wcm90b3R5cGUuc2V0U2hhZGVyPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLl9jdXJyZW50SWQ9PT1hLl9VSUQ/ITE6KHRoaXMuX2N1cnJlbnRJZD1hLl9VSUQsdGhpcy5jdXJyZW50U2hhZGVyPWEsdGhpcy5nbC51c2VQcm9ncmFtKGEucHJvZ3JhbSksdGhpcy5zZXRBdHRyaWJzKGEuYXR0cmlidXRlcyksITApfSxiLldlYkdMU2hhZGVyTWFuYWdlci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuYXR0cmliU3RhdGU9bnVsbCx0aGlzLnRlbXBBdHRyaWJTdGF0ZT1udWxsLHRoaXMucHJpbWl0aXZlU2hhZGVyLmRlc3Ryb3koKSx0aGlzLmRlZmF1bHRTaGFkZXIuZGVzdHJveSgpLHRoaXMuZmFzdFNoYWRlci5kZXN0cm95KCksdGhpcy5zdHJpcFNoYWRlci5kZXN0cm95KCksdGhpcy5nbD1udWxsfSxiLldlYkdMU3ByaXRlQmF0Y2g9ZnVuY3Rpb24oYSl7dGhpcy52ZXJ0U2l6ZT02LHRoaXMuc2l6ZT0yZTM7dmFyIGI9NCp0aGlzLnNpemUqdGhpcy52ZXJ0U2l6ZSxjPTYqdGhpcy5zaXplO3RoaXMudmVydGljZXM9bmV3IEZsb2F0MzJBcnJheShiKSx0aGlzLmluZGljZXM9bmV3IFVpbnQxNkFycmF5KGMpLHRoaXMubGFzdEluZGV4Q291bnQ9MDtmb3IodmFyIGQ9MCxlPTA7Yz5kO2QrPTYsZSs9NCl0aGlzLmluZGljZXNbZCswXT1lKzAsdGhpcy5pbmRpY2VzW2QrMV09ZSsxLHRoaXMuaW5kaWNlc1tkKzJdPWUrMix0aGlzLmluZGljZXNbZCszXT1lKzAsdGhpcy5pbmRpY2VzW2QrNF09ZSsyLHRoaXMuaW5kaWNlc1tkKzVdPWUrMzt0aGlzLmRyYXdpbmc9ITEsdGhpcy5jdXJyZW50QmF0Y2hTaXplPTAsdGhpcy5jdXJyZW50QmFzZVRleHR1cmU9bnVsbCx0aGlzLnNldENvbnRleHQoYSksdGhpcy5kaXJ0eT0hMCx0aGlzLnRleHR1cmVzPVtdLHRoaXMuYmxlbmRNb2Rlcz1bXX0sYi5XZWJHTFNwcml0ZUJhdGNoLnByb3RvdHlwZS5zZXRDb250ZXh0PWZ1bmN0aW9uKGEpe3RoaXMuZ2w9YSx0aGlzLnZlcnRleEJ1ZmZlcj1hLmNyZWF0ZUJ1ZmZlcigpLHRoaXMuaW5kZXhCdWZmZXI9YS5jcmVhdGVCdWZmZXIoKSxhLmJpbmRCdWZmZXIoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGV4QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGljZXMsYS5TVEFUSUNfRFJBVyksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0aWNlcyxhLkRZTkFNSUNfRFJBVyksdGhpcy5jdXJyZW50QmxlbmRNb2RlPTk5OTk5fSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLmJlZ2luPWZ1bmN0aW9uKGEpe3RoaXMucmVuZGVyU2Vzc2lvbj1hLHRoaXMuc2hhZGVyPXRoaXMucmVuZGVyU2Vzc2lvbi5zaGFkZXJNYW5hZ2VyLmRlZmF1bHRTaGFkZXIsdGhpcy5zdGFydCgpfSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLmVuZD1mdW5jdGlvbigpe3RoaXMuZmx1c2goKX0sYi5XZWJHTFNwcml0ZUJhdGNoLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oYSl7dmFyIGI9YS50ZXh0dXJlO3RoaXMuY3VycmVudEJhdGNoU2l6ZT49dGhpcy5zaXplJiYodGhpcy5mbHVzaCgpLHRoaXMuY3VycmVudEJhc2VUZXh0dXJlPWIuYmFzZVRleHR1cmUpO3ZhciBjPWIuX3V2cztpZihjKXt2YXIgZCxlLGYsZyxoPWEud29ybGRBbHBoYSxpPWEudGludCxqPXRoaXMudmVydGljZXMsaz1hLmFuY2hvci54LGw9YS5hbmNob3IueTtpZihiLnRyaW0pe3ZhciBtPWIudHJpbTtlPW0ueC1rKm0ud2lkdGgsZD1lK2IuY3JvcC53aWR0aCxnPW0ueS1sKm0uaGVpZ2h0LGY9ZytiLmNyb3AuaGVpZ2h0fWVsc2UgZD1iLmZyYW1lLndpZHRoKigxLWspLGU9Yi5mcmFtZS53aWR0aCotayxmPWIuZnJhbWUuaGVpZ2h0KigxLWwpLGc9Yi5mcmFtZS5oZWlnaHQqLWw7dmFyIG49NCp0aGlzLmN1cnJlbnRCYXRjaFNpemUqdGhpcy52ZXJ0U2l6ZSxvPWEud29ybGRUcmFuc2Zvcm0scD1vLmEscT1vLmMscj1vLmIscz1vLmQsdD1vLnR4LHU9by50eTtqW24rK109cCplK3IqZyt0LGpbbisrXT1zKmcrcSplK3UsaltuKytdPWMueDAsaltuKytdPWMueTAsaltuKytdPWgsaltuKytdPWksaltuKytdPXAqZCtyKmcrdCxqW24rK109cypnK3EqZCt1LGpbbisrXT1jLngxLGpbbisrXT1jLnkxLGpbbisrXT1oLGpbbisrXT1pLGpbbisrXT1wKmQrcipmK3QsaltuKytdPXMqZitxKmQrdSxqW24rK109Yy54MixqW24rK109Yy55MixqW24rK109aCxqW24rK109aSxqW24rK109cCplK3IqZit0LGpbbisrXT1zKmYrcSplK3UsaltuKytdPWMueDMsaltuKytdPWMueTMsaltuKytdPWgsaltuKytdPWksdGhpcy50ZXh0dXJlc1t0aGlzLmN1cnJlbnRCYXRjaFNpemVdPWEudGV4dHVyZS5iYXNlVGV4dHVyZSx0aGlzLmJsZW5kTW9kZXNbdGhpcy5jdXJyZW50QmF0Y2hTaXplXT1hLmJsZW5kTW9kZSx0aGlzLmN1cnJlbnRCYXRjaFNpemUrK319LGIuV2ViR0xTcHJpdGVCYXRjaC5wcm90b3R5cGUucmVuZGVyVGlsaW5nU3ByaXRlPWZ1bmN0aW9uKGEpe3ZhciBjPWEudGlsaW5nVGV4dHVyZTt0aGlzLmN1cnJlbnRCYXRjaFNpemU+PXRoaXMuc2l6ZSYmKHRoaXMuZmx1c2goKSx0aGlzLmN1cnJlbnRCYXNlVGV4dHVyZT1jLmJhc2VUZXh0dXJlKSxhLl91dnN8fChhLl91dnM9bmV3IGIuVGV4dHVyZVV2cyk7dmFyIGQ9YS5fdXZzO2EudGlsZVBvc2l0aW9uLnglPWMuYmFzZVRleHR1cmUud2lkdGgqYS50aWxlU2NhbGVPZmZzZXQueCxhLnRpbGVQb3NpdGlvbi55JT1jLmJhc2VUZXh0dXJlLmhlaWdodCphLnRpbGVTY2FsZU9mZnNldC55O3ZhciBlPWEudGlsZVBvc2l0aW9uLngvKGMuYmFzZVRleHR1cmUud2lkdGgqYS50aWxlU2NhbGVPZmZzZXQueCksZj1hLnRpbGVQb3NpdGlvbi55LyhjLmJhc2VUZXh0dXJlLmhlaWdodCphLnRpbGVTY2FsZU9mZnNldC55KSxnPWEud2lkdGgvYy5iYXNlVGV4dHVyZS53aWR0aC8oYS50aWxlU2NhbGUueCphLnRpbGVTY2FsZU9mZnNldC54KSxoPWEuaGVpZ2h0L2MuYmFzZVRleHR1cmUuaGVpZ2h0LyhhLnRpbGVTY2FsZS55KmEudGlsZVNjYWxlT2Zmc2V0LnkpO2QueDA9MC1lLGQueTA9MC1mLGQueDE9MSpnLWUsZC55MT0wLWYsZC54Mj0xKmctZSxkLnkyPTEqaC1mLGQueDM9MC1lLGQueTM9MSpoLWY7dmFyIGk9YS53b3JsZEFscGhhLGo9YS50aW50LGs9dGhpcy52ZXJ0aWNlcyxsPWEud2lkdGgsbT1hLmhlaWdodCxuPWEuYW5jaG9yLngsbz1hLmFuY2hvci55LHA9bCooMS1uKSxxPWwqLW4scj1tKigxLW8pLHM9bSotbyx0PTQqdGhpcy5jdXJyZW50QmF0Y2hTaXplKnRoaXMudmVydFNpemUsdT1hLndvcmxkVHJhbnNmb3JtLHY9dS5hLHc9dS5jLHg9dS5iLHk9dS5kLHo9dS50eCxBPXUudHk7a1t0KytdPXYqcSt4KnMreixrW3QrK109eSpzK3cqcStBLGtbdCsrXT1kLngwLGtbdCsrXT1kLnkwLGtbdCsrXT1pLGtbdCsrXT1qLGtbdCsrXT12KnAreCpzK3osa1t0KytdPXkqcyt3KnArQSxrW3QrK109ZC54MSxrW3QrK109ZC55MSxrW3QrK109aSxrW3QrK109aixrW3QrK109dipwK3gqcit6LGtbdCsrXT15KnIrdypwK0Esa1t0KytdPWQueDIsa1t0KytdPWQueTIsa1t0KytdPWksa1t0KytdPWosa1t0KytdPXYqcSt4KnIreixrW3QrK109eSpyK3cqcStBLGtbdCsrXT1kLngzLGtbdCsrXT1kLnkzLGtbdCsrXT1pLGtbdCsrXT1qLHRoaXMudGV4dHVyZXNbdGhpcy5jdXJyZW50QmF0Y2hTaXplXT1jLmJhc2VUZXh0dXJlLHRoaXMuYmxlbmRNb2Rlc1t0aGlzLmN1cnJlbnRCYXRjaFNpemVdPWEuYmxlbmRNb2RlLHRoaXMuY3VycmVudEJhdGNoU2l6ZSsrfSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7aWYoMCE9PXRoaXMuY3VycmVudEJhdGNoU2l6ZSl7dmFyIGE9dGhpcy5nbDtpZih0aGlzLnJlbmRlclNlc3Npb24uc2hhZGVyTWFuYWdlci5zZXRTaGFkZXIodGhpcy5yZW5kZXJTZXNzaW9uLnNoYWRlck1hbmFnZXIuZGVmYXVsdFNoYWRlciksdGhpcy5kaXJ0eSl7dGhpcy5kaXJ0eT0hMSxhLmFjdGl2ZVRleHR1cmUoYS5URVhUVVJFMCksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QnVmZmVyKSxhLmJpbmRCdWZmZXIoYS5FTEVNRU5UX0FSUkFZX0JVRkZFUix0aGlzLmluZGV4QnVmZmVyKTt2YXIgYj10aGlzLnJlbmRlclNlc3Npb24ucHJvamVjdGlvbjthLnVuaWZvcm0yZih0aGlzLnNoYWRlci5wcm9qZWN0aW9uVmVjdG9yLGIueCxiLnkpO3ZhciBjPTQqdGhpcy52ZXJ0U2l6ZTthLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXIuYVZlcnRleFBvc2l0aW9uLDIsYS5GTE9BVCwhMSxjLDApLGEudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5hVGV4dHVyZUNvb3JkLDIsYS5GTE9BVCwhMSxjLDgpLGEudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5jb2xvckF0dHJpYnV0ZSwyLGEuRkxPQVQsITEsYywxNil9aWYodGhpcy5jdXJyZW50QmF0Y2hTaXplPi41KnRoaXMuc2l6ZSlhLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCx0aGlzLnZlcnRpY2VzKTtlbHNle3ZhciBkPXRoaXMudmVydGljZXMuc3ViYXJyYXkoMCw0KnRoaXMuY3VycmVudEJhdGNoU2l6ZSp0aGlzLnZlcnRTaXplKTthLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCxkKX1mb3IodmFyIGUsZixnPTAsaD0wLGk9bnVsbCxqPXRoaXMucmVuZGVyU2Vzc2lvbi5ibGVuZE1vZGVNYW5hZ2VyLmN1cnJlbnRCbGVuZE1vZGUsaz0wLGw9dGhpcy5jdXJyZW50QmF0Y2hTaXplO2w+aztrKyspZT10aGlzLnRleHR1cmVzW2tdLGY9dGhpcy5ibGVuZE1vZGVzW2tdLChpIT09ZXx8aiE9PWYpJiYodGhpcy5yZW5kZXJCYXRjaChpLGcsaCksaD1rLGc9MCxpPWUsaj1mLHRoaXMucmVuZGVyU2Vzc2lvbi5ibGVuZE1vZGVNYW5hZ2VyLnNldEJsZW5kTW9kZShqKSksZysrO3RoaXMucmVuZGVyQmF0Y2goaSxnLGgpLHRoaXMuY3VycmVudEJhdGNoU2l6ZT0wfX0sYi5XZWJHTFNwcml0ZUJhdGNoLnByb3RvdHlwZS5yZW5kZXJCYXRjaD1mdW5jdGlvbihhLGMsZCl7aWYoMCE9PWMpe3ZhciBlPXRoaXMuZ2w7ZS5iaW5kVGV4dHVyZShlLlRFWFRVUkVfMkQsYS5fZ2xUZXh0dXJlc1tlLmlkXXx8Yi5jcmVhdGVXZWJHTFRleHR1cmUoYSxlKSksYS5fZGlydHlbZS5pZF0mJmIudXBkYXRlV2ViR0xUZXh0dXJlKHRoaXMuY3VycmVudEJhc2VUZXh0dXJlLGUpLGUuZHJhd0VsZW1lbnRzKGUuVFJJQU5HTEVTLDYqYyxlLlVOU0lHTkVEX1NIT1JULDYqZCoyKSx0aGlzLnJlbmRlclNlc3Npb24uZHJhd0NvdW50Kyt9fSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLnN0b3A9ZnVuY3Rpb24oKXt0aGlzLmZsdXNoKCl9LGIuV2ViR0xTcHJpdGVCYXRjaC5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt0aGlzLmRpcnR5PSEwfSxiLldlYkdMU3ByaXRlQmF0Y2gucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLnZlcnRpY2VzPW51bGwsdGhpcy5pbmRpY2VzPW51bGwsdGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy52ZXJ0ZXhCdWZmZXIpLHRoaXMuZ2wuZGVsZXRlQnVmZmVyKHRoaXMuaW5kZXhCdWZmZXIpLHRoaXMuY3VycmVudEJhc2VUZXh0dXJlPW51bGwsdGhpcy5nbD1udWxsfSxiLldlYkdMRmFzdFNwcml0ZUJhdGNoPWZ1bmN0aW9uKGEpe3RoaXMudmVydFNpemU9MTAsdGhpcy5tYXhTaXplPTZlMyx0aGlzLnNpemU9dGhpcy5tYXhTaXplO3ZhciBiPTQqdGhpcy5zaXplKnRoaXMudmVydFNpemUsYz02KnRoaXMubWF4U2l6ZTt0aGlzLnZlcnRpY2VzPW5ldyBGbG9hdDMyQXJyYXkoYiksdGhpcy5pbmRpY2VzPW5ldyBVaW50MTZBcnJheShjKSx0aGlzLnZlcnRleEJ1ZmZlcj1udWxsLHRoaXMuaW5kZXhCdWZmZXI9bnVsbCx0aGlzLmxhc3RJbmRleENvdW50PTA7Zm9yKHZhciBkPTAsZT0wO2M+ZDtkKz02LGUrPTQpdGhpcy5pbmRpY2VzW2QrMF09ZSswLHRoaXMuaW5kaWNlc1tkKzFdPWUrMSx0aGlzLmluZGljZXNbZCsyXT1lKzIsdGhpcy5pbmRpY2VzW2QrM109ZSswLHRoaXMuaW5kaWNlc1tkKzRdPWUrMix0aGlzLmluZGljZXNbZCs1XT1lKzM7dGhpcy5kcmF3aW5nPSExLHRoaXMuY3VycmVudEJhdGNoU2l6ZT0wLHRoaXMuY3VycmVudEJhc2VUZXh0dXJlPW51bGwsdGhpcy5jdXJyZW50QmxlbmRNb2RlPTAsdGhpcy5yZW5kZXJTZXNzaW9uPW51bGwsdGhpcy5zaGFkZXI9bnVsbCx0aGlzLm1hdHJpeD1udWxsLHRoaXMuc2V0Q29udGV4dChhKX0sYi5XZWJHTEZhc3RTcHJpdGVCYXRjaC5wcm90b3R5cGUuc2V0Q29udGV4dD1mdW5jdGlvbihhKXt0aGlzLmdsPWEsdGhpcy52ZXJ0ZXhCdWZmZXI9YS5jcmVhdGVCdWZmZXIoKSx0aGlzLmluZGV4QnVmZmVyPWEuY3JlYXRlQnVmZmVyKCksYS5iaW5kQnVmZmVyKGEuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRleEJ1ZmZlciksYS5idWZmZXJEYXRhKGEuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRpY2VzLGEuU1RBVElDX0RSQVcpLGEuYmluZEJ1ZmZlcihhLkFSUkFZX0JVRkZFUix0aGlzLnZlcnRleEJ1ZmZlciksYS5idWZmZXJEYXRhKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGljZXMsYS5EWU5BTUlDX0RSQVcpfSxiLldlYkdMRmFzdFNwcml0ZUJhdGNoLnByb3RvdHlwZS5iZWdpbj1mdW5jdGlvbihhLGIpe3RoaXMucmVuZGVyU2Vzc2lvbj1iLHRoaXMuc2hhZGVyPXRoaXMucmVuZGVyU2Vzc2lvbi5zaGFkZXJNYW5hZ2VyLmZhc3RTaGFkZXIsdGhpcy5tYXRyaXg9YS53b3JsZFRyYW5zZm9ybS50b0FycmF5KCEwKSx0aGlzLnN0YXJ0KCl9LGIuV2ViR0xGYXN0U3ByaXRlQmF0Y2gucHJvdG90eXBlLmVuZD1mdW5jdGlvbigpe3RoaXMuZmx1c2goKX0sYi5XZWJHTEZhc3RTcHJpdGVCYXRjaC5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKGEpe3ZhciBiPWEuY2hpbGRyZW4sYz1iWzBdO2lmKGMudGV4dHVyZS5fdXZzKXt0aGlzLmN1cnJlbnRCYXNlVGV4dHVyZT1jLnRleHR1cmUuYmFzZVRleHR1cmUsYy5ibGVuZE1vZGUhPT10aGlzLnJlbmRlclNlc3Npb24uYmxlbmRNb2RlTWFuYWdlci5jdXJyZW50QmxlbmRNb2RlJiYodGhpcy5mbHVzaCgpLHRoaXMucmVuZGVyU2Vzc2lvbi5ibGVuZE1vZGVNYW5hZ2VyLnNldEJsZW5kTW9kZShjLmJsZW5kTW9kZSkpO2Zvcih2YXIgZD0wLGU9Yi5sZW5ndGg7ZT5kO2QrKyl0aGlzLnJlbmRlclNwcml0ZShiW2RdKTt0aGlzLmZsdXNoKCl9fSxiLldlYkdMRmFzdFNwcml0ZUJhdGNoLnByb3RvdHlwZS5yZW5kZXJTcHJpdGU9ZnVuY3Rpb24oYSl7aWYoYS52aXNpYmxlJiYoYS50ZXh0dXJlLmJhc2VUZXh0dXJlPT09dGhpcy5jdXJyZW50QmFzZVRleHR1cmV8fCh0aGlzLmZsdXNoKCksdGhpcy5jdXJyZW50QmFzZVRleHR1cmU9YS50ZXh0dXJlLmJhc2VUZXh0dXJlLGEudGV4dHVyZS5fdXZzKSkpe3ZhciBiLGMsZCxlLGYsZyxoLGksaj10aGlzLnZlcnRpY2VzO2lmKGI9YS50ZXh0dXJlLl91dnMsYz1hLnRleHR1cmUuZnJhbWUud2lkdGgsZD1hLnRleHR1cmUuZnJhbWUuaGVpZ2h0LGEudGV4dHVyZS50cmltKXt2YXIgaz1hLnRleHR1cmUudHJpbTtmPWsueC1hLmFuY2hvci54Kmsud2lkdGgsZT1mK2EudGV4dHVyZS5jcm9wLndpZHRoLGg9ay55LWEuYW5jaG9yLnkqay5oZWlnaHQsZz1oK2EudGV4dHVyZS5jcm9wLmhlaWdodH1lbHNlIGU9YS50ZXh0dXJlLmZyYW1lLndpZHRoKigxLWEuYW5jaG9yLngpLGY9YS50ZXh0dXJlLmZyYW1lLndpZHRoKi1hLmFuY2hvci54LGc9YS50ZXh0dXJlLmZyYW1lLmhlaWdodCooMS1hLmFuY2hvci55KSxoPWEudGV4dHVyZS5mcmFtZS5oZWlnaHQqLWEuYW5jaG9yLnk7aT00KnRoaXMuY3VycmVudEJhdGNoU2l6ZSp0aGlzLnZlcnRTaXplLGpbaSsrXT1mLGpbaSsrXT1oLGpbaSsrXT1hLnBvc2l0aW9uLngsaltpKytdPWEucG9zaXRpb24ueSxqW2krK109YS5zY2FsZS54LGpbaSsrXT1hLnNjYWxlLnksaltpKytdPWEucm90YXRpb24saltpKytdPWIueDAsaltpKytdPWIueTEsaltpKytdPWEuYWxwaGEsaltpKytdPWUsaltpKytdPWgsaltpKytdPWEucG9zaXRpb24ueCxqW2krK109YS5wb3NpdGlvbi55LGpbaSsrXT1hLnNjYWxlLngsaltpKytdPWEuc2NhbGUueSxqW2krK109YS5yb3RhdGlvbixqW2krK109Yi54MSxqW2krK109Yi55MSxqW2krK109YS5hbHBoYSxqW2krK109ZSxqW2krK109ZyxqW2krK109YS5wb3NpdGlvbi54LGpbaSsrXT1hLnBvc2l0aW9uLnksaltpKytdPWEuc2NhbGUueCxqW2krK109YS5zY2FsZS55LGpbaSsrXT1hLnJvdGF0aW9uLGpbaSsrXT1iLngyLGpbaSsrXT1iLnkyLGpbaSsrXT1hLmFscGhhLGpbaSsrXT1mLGpbaSsrXT1nLGpbaSsrXT1hLnBvc2l0aW9uLngsaltpKytdPWEucG9zaXRpb24ueSxqW2krK109YS5zY2FsZS54LGpbaSsrXT1hLnNjYWxlLnksaltpKytdPWEucm90YXRpb24saltpKytdPWIueDMsaltpKytdPWIueTMsaltpKytdPWEuYWxwaGEsdGhpcy5jdXJyZW50QmF0Y2hTaXplKyssdGhpcy5jdXJyZW50QmF0Y2hTaXplPj10aGlzLnNpemUmJnRoaXMuZmx1c2goKX19LGIuV2ViR0xGYXN0U3ByaXRlQmF0Y2gucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7aWYoMCE9PXRoaXMuY3VycmVudEJhdGNoU2l6ZSl7dmFyIGE9dGhpcy5nbDtpZih0aGlzLmN1cnJlbnRCYXNlVGV4dHVyZS5fZ2xUZXh0dXJlc1thLmlkXXx8Yi5jcmVhdGVXZWJHTFRleHR1cmUodGhpcy5jdXJyZW50QmFzZVRleHR1cmUsYSksYS5iaW5kVGV4dHVyZShhLlRFWFRVUkVfMkQsdGhpcy5jdXJyZW50QmFzZVRleHR1cmUuX2dsVGV4dHVyZXNbYS5pZF0pLHRoaXMuY3VycmVudEJhdGNoU2l6ZT4uNSp0aGlzLnNpemUpYS5idWZmZXJTdWJEYXRhKGEuQVJSQVlfQlVGRkVSLDAsdGhpcy52ZXJ0aWNlcyk7ZWxzZXt2YXIgYz10aGlzLnZlcnRpY2VzLnN1YmFycmF5KDAsNCp0aGlzLmN1cnJlbnRCYXRjaFNpemUqdGhpcy52ZXJ0U2l6ZSk7YS5idWZmZXJTdWJEYXRhKGEuQVJSQVlfQlVGRkVSLDAsYyl9YS5kcmF3RWxlbWVudHMoYS5UUklBTkdMRVMsNip0aGlzLmN1cnJlbnRCYXRjaFNpemUsYS5VTlNJR05FRF9TSE9SVCwwKSx0aGlzLmN1cnJlbnRCYXRjaFNpemU9MCx0aGlzLnJlbmRlclNlc3Npb24uZHJhd0NvdW50Kyt9fSxiLldlYkdMRmFzdFNwcml0ZUJhdGNoLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7dGhpcy5mbHVzaCgpfSxiLldlYkdMRmFzdFNwcml0ZUJhdGNoLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2w7YS5hY3RpdmVUZXh0dXJlKGEuVEVYVFVSRTApLGEuYmluZEJ1ZmZlcihhLkFSUkFZX0JVRkZFUix0aGlzLnZlcnRleEJ1ZmZlciksYS5iaW5kQnVmZmVyKGEuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRleEJ1ZmZlcik7dmFyIGI9dGhpcy5yZW5kZXJTZXNzaW9uLnByb2plY3Rpb247YS51bmlmb3JtMmYodGhpcy5zaGFkZXIucHJvamVjdGlvblZlY3RvcixiLngsYi55KSxhLnVuaWZvcm1NYXRyaXgzZnYodGhpcy5zaGFkZXIudU1hdHJpeCwhMSx0aGlzLm1hdHJpeCk7dmFyIGM9NCp0aGlzLnZlcnRTaXplO2EudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5hVmVydGV4UG9zaXRpb24sMixhLkZMT0FULCExLGMsMCksYS52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMuc2hhZGVyLmFQb3NpdGlvbkNvb3JkLDIsYS5GTE9BVCwhMSxjLDgpLGEudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5hU2NhbGUsMixhLkZMT0FULCExLGMsMTYpLGEudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5hUm90YXRpb24sMSxhLkZMT0FULCExLGMsMjQpLGEudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnNoYWRlci5hVGV4dHVyZUNvb3JkLDIsYS5GTE9BVCwhMSxjLDI4KSxhLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5zaGFkZXIuY29sb3JBdHRyaWJ1dGUsMSxhLkZMT0FULCExLGMsMzYpfSxiLldlYkdMRmlsdGVyTWFuYWdlcj1mdW5jdGlvbihhLGIpe3RoaXMudHJhbnNwYXJlbnQ9Yix0aGlzLmZpbHRlclN0YWNrPVtdLHRoaXMub2Zmc2V0WD0wLHRoaXMub2Zmc2V0WT0wLHRoaXMuc2V0Q29udGV4dChhKX0sYi5XZWJHTEZpbHRlck1hbmFnZXIucHJvdG90eXBlLnNldENvbnRleHQ9ZnVuY3Rpb24oYSl7dGhpcy5nbD1hLHRoaXMudGV4dHVyZVBvb2w9W10sdGhpcy5pbml0U2hhZGVyQnVmZmVycygpfSxiLldlYkdMRmlsdGVyTWFuYWdlci5wcm90b3R5cGUuYmVnaW49ZnVuY3Rpb24oYSxiKXt0aGlzLnJlbmRlclNlc3Npb249YSx0aGlzLmRlZmF1bHRTaGFkZXI9YS5zaGFkZXJNYW5hZ2VyLmRlZmF1bHRTaGFkZXI7dmFyIGM9dGhpcy5yZW5kZXJTZXNzaW9uLnByb2plY3Rpb247dGhpcy53aWR0aD0yKmMueCx0aGlzLmhlaWdodD0yKi1jLnksdGhpcy5idWZmZXI9Yn0sYi5XZWJHTEZpbHRlck1hbmFnZXIucHJvdG90eXBlLnB1c2hGaWx0ZXI9ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcy5nbCxkPXRoaXMucmVuZGVyU2Vzc2lvbi5wcm9qZWN0aW9uLGU9dGhpcy5yZW5kZXJTZXNzaW9uLm9mZnNldDthLl9maWx0ZXJBcmVhPWEudGFyZ2V0LmZpbHRlckFyZWF8fGEudGFyZ2V0LmdldEJvdW5kcygpLHRoaXMuZmlsdGVyU3RhY2sucHVzaChhKTt2YXIgZj1hLmZpbHRlclBhc3Nlc1swXTt0aGlzLm9mZnNldFgrPWEuX2ZpbHRlckFyZWEueCx0aGlzLm9mZnNldFkrPWEuX2ZpbHRlckFyZWEueTt2YXIgZz10aGlzLnRleHR1cmVQb29sLnBvcCgpO2c/Zy5yZXNpemUodGhpcy53aWR0aCx0aGlzLmhlaWdodCk6Zz1uZXcgYi5GaWx0ZXJUZXh0dXJlKHRoaXMuZ2wsdGhpcy53aWR0aCx0aGlzLmhlaWdodCksYy5iaW5kVGV4dHVyZShjLlRFWFRVUkVfMkQsZy50ZXh0dXJlKTt2YXIgaD1hLl9maWx0ZXJBcmVhLGk9Zi5wYWRkaW5nO2gueC09aSxoLnktPWksaC53aWR0aCs9MippLGguaGVpZ2h0Kz0yKmksaC54PDAmJihoLng9MCksaC53aWR0aD50aGlzLndpZHRoJiYoaC53aWR0aD10aGlzLndpZHRoKSxoLnk8MCYmKGgueT0wKSxoLmhlaWdodD50aGlzLmhlaWdodCYmKGguaGVpZ2h0PXRoaXMuaGVpZ2h0KSxjLmJpbmRGcmFtZWJ1ZmZlcihjLkZSQU1FQlVGRkVSLGcuZnJhbWVCdWZmZXIpLGMudmlld3BvcnQoMCwwLGgud2lkdGgsaC5oZWlnaHQpLGQueD1oLndpZHRoLzIsZC55PS1oLmhlaWdodC8yLGUueD0taC54LGUueT0taC55LHRoaXMucmVuZGVyU2Vzc2lvbi5zaGFkZXJNYW5hZ2VyLnNldFNoYWRlcih0aGlzLmRlZmF1bHRTaGFkZXIpLGMudW5pZm9ybTJmKHRoaXMuZGVmYXVsdFNoYWRlci5wcm9qZWN0aW9uVmVjdG9yLGgud2lkdGgvMiwtaC5oZWlnaHQvMiksYy51bmlmb3JtMmYodGhpcy5kZWZhdWx0U2hhZGVyLm9mZnNldFZlY3RvciwtaC54LC1oLnkpLGMuY29sb3JNYXNrKCEwLCEwLCEwLCEwKSxjLmNsZWFyQ29sb3IoMCwwLDAsMCksYy5jbGVhcihjLkNPTE9SX0JVRkZFUl9CSVQpLGEuX2dsRmlsdGVyVGV4dHVyZT1nfSxiLldlYkdMRmlsdGVyTWFuYWdlci5wcm90b3R5cGUucG9wRmlsdGVyPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nbCxjPXRoaXMuZmlsdGVyU3RhY2sucG9wKCksZD1jLl9maWx0ZXJBcmVhLGU9Yy5fZ2xGaWx0ZXJUZXh0dXJlLGY9dGhpcy5yZW5kZXJTZXNzaW9uLnByb2plY3Rpb24sZz10aGlzLnJlbmRlclNlc3Npb24ub2Zmc2V0O2lmKGMuZmlsdGVyUGFzc2VzLmxlbmd0aD4xKXthLnZpZXdwb3J0KDAsMCxkLndpZHRoLGQuaGVpZ2h0KSxhLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy52ZXJ0ZXhCdWZmZXIpLHRoaXMudmVydGV4QXJyYXlbMF09MCx0aGlzLnZlcnRleEFycmF5WzFdPWQuaGVpZ2h0LHRoaXMudmVydGV4QXJyYXlbMl09ZC53aWR0aCx0aGlzLnZlcnRleEFycmF5WzNdPWQuaGVpZ2h0LHRoaXMudmVydGV4QXJyYXlbNF09MCx0aGlzLnZlcnRleEFycmF5WzVdPTAsdGhpcy52ZXJ0ZXhBcnJheVs2XT1kLndpZHRoLHRoaXMudmVydGV4QXJyYXlbN109MCxhLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCx0aGlzLnZlcnRleEFycmF5KSxhLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy51dkJ1ZmZlciksdGhpcy51dkFycmF5WzJdPWQud2lkdGgvdGhpcy53aWR0aCx0aGlzLnV2QXJyYXlbNV09ZC5oZWlnaHQvdGhpcy5oZWlnaHQsdGhpcy51dkFycmF5WzZdPWQud2lkdGgvdGhpcy53aWR0aCx0aGlzLnV2QXJyYXlbN109ZC5oZWlnaHQvdGhpcy5oZWlnaHQsYS5idWZmZXJTdWJEYXRhKGEuQVJSQVlfQlVGRkVSLDAsdGhpcy51dkFycmF5KTt2YXIgaD1lLGk9dGhpcy50ZXh0dXJlUG9vbC5wb3AoKTtpfHwoaT1uZXcgYi5GaWx0ZXJUZXh0dXJlKHRoaXMuZ2wsdGhpcy53aWR0aCx0aGlzLmhlaWdodCkpLGkucmVzaXplKHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpLGEuYmluZEZyYW1lYnVmZmVyKGEuRlJBTUVCVUZGRVIsaS5mcmFtZUJ1ZmZlciksYS5jbGVhcihhLkNPTE9SX0JVRkZFUl9CSVQpLGEuZGlzYWJsZShhLkJMRU5EKTtmb3IodmFyIGo9MDtqPGMuZmlsdGVyUGFzc2VzLmxlbmd0aC0xO2orKyl7dmFyIGs9Yy5maWx0ZXJQYXNzZXNbal07YS5iaW5kRnJhbWVidWZmZXIoYS5GUkFNRUJVRkZFUixpLmZyYW1lQnVmZmVyKSxhLmFjdGl2ZVRleHR1cmUoYS5URVhUVVJFMCksYS5iaW5kVGV4dHVyZShhLlRFWFRVUkVfMkQsaC50ZXh0dXJlKSx0aGlzLmFwcGx5RmlsdGVyUGFzcyhrLGQsZC53aWR0aCxkLmhlaWdodCk7dmFyIGw9aDtoPWksaT1sfWEuZW5hYmxlKGEuQkxFTkQpLGU9aCx0aGlzLnRleHR1cmVQb29sLnB1c2goaSl9dmFyIG09Yy5maWx0ZXJQYXNzZXNbYy5maWx0ZXJQYXNzZXMubGVuZ3RoLTFdO3RoaXMub2Zmc2V0WC09ZC54LHRoaXMub2Zmc2V0WS09ZC55O3ZhciBuPXRoaXMud2lkdGgsbz10aGlzLmhlaWdodCxwPTAscT0wLHI9dGhpcy5idWZmZXI7aWYoMD09PXRoaXMuZmlsdGVyU3RhY2subGVuZ3RoKWEuY29sb3JNYXNrKCEwLCEwLCEwLCEwKTtlbHNle3ZhciBzPXRoaXMuZmlsdGVyU3RhY2tbdGhpcy5maWx0ZXJTdGFjay5sZW5ndGgtMV07ZD1zLl9maWx0ZXJBcmVhLG49ZC53aWR0aCxvPWQuaGVpZ2h0LHA9ZC54LHE9ZC55LHI9cy5fZ2xGaWx0ZXJUZXh0dXJlLmZyYW1lQnVmZmVyfWYueD1uLzIsZi55PS1vLzIsZy54PXAsZy55PXEsZD1jLl9maWx0ZXJBcmVhO3ZhciB0PWQueC1wLHU9ZC55LXE7YS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QnVmZmVyKSx0aGlzLnZlcnRleEFycmF5WzBdPXQsdGhpcy52ZXJ0ZXhBcnJheVsxXT11K2QuaGVpZ2h0LHRoaXMudmVydGV4QXJyYXlbMl09dCtkLndpZHRoLHRoaXMudmVydGV4QXJyYXlbM109dStkLmhlaWdodCx0aGlzLnZlcnRleEFycmF5WzRdPXQsdGhpcy52ZXJ0ZXhBcnJheVs1XT11LHRoaXMudmVydGV4QXJyYXlbNl09dCtkLndpZHRoLHRoaXMudmVydGV4QXJyYXlbN109dSxhLmJ1ZmZlclN1YkRhdGEoYS5BUlJBWV9CVUZGRVIsMCx0aGlzLnZlcnRleEFycmF5KSxhLmJpbmRCdWZmZXIoYS5BUlJBWV9CVUZGRVIsdGhpcy51dkJ1ZmZlciksdGhpcy51dkFycmF5WzJdPWQud2lkdGgvdGhpcy53aWR0aCx0aGlzLnV2QXJyYXlbNV09ZC5oZWlnaHQvdGhpcy5oZWlnaHQsdGhpcy51dkFycmF5WzZdPWQud2lkdGgvdGhpcy53aWR0aCx0aGlzLnV2QXJyYXlbN109ZC5oZWlnaHQvdGhpcy5oZWlnaHQsYS5idWZmZXJTdWJEYXRhKGEuQVJSQVlfQlVGRkVSLDAsdGhpcy51dkFycmF5KSxhLnZpZXdwb3J0KDAsMCxuLG8pLGEuYmluZEZyYW1lYnVmZmVyKGEuRlJBTUVCVUZGRVIsciksYS5hY3RpdmVUZXh0dXJlKGEuVEVYVFVSRTApLGEuYmluZFRleHR1cmUoYS5URVhUVVJFXzJELGUudGV4dHVyZSksdGhpcy5hcHBseUZpbHRlclBhc3MobSxkLG4sbyksdGhpcy5yZW5kZXJTZXNzaW9uLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKHRoaXMuZGVmYXVsdFNoYWRlciksYS51bmlmb3JtMmYodGhpcy5kZWZhdWx0U2hhZGVyLnByb2plY3Rpb25WZWN0b3Isbi8yLC1vLzIpLGEudW5pZm9ybTJmKHRoaXMuZGVmYXVsdFNoYWRlci5vZmZzZXRWZWN0b3IsLXAsLXEpLHRoaXMudGV4dHVyZVBvb2wucHVzaChlKSxjLl9nbEZpbHRlclRleHR1cmU9bnVsbH0sYi5XZWJHTEZpbHRlck1hbmFnZXIucHJvdG90eXBlLmFwcGx5RmlsdGVyUGFzcz1mdW5jdGlvbihhLGMsZCxlKXt2YXIgZj10aGlzLmdsLGc9YS5zaGFkZXJzW2YuaWRdO2d8fChnPW5ldyBiLlBpeGlTaGFkZXIoZiksZy5mcmFnbWVudFNyYz1hLmZyYWdtZW50U3JjLGcudW5pZm9ybXM9YS51bmlmb3JtcyxnLmluaXQoKSxhLnNoYWRlcnNbZi5pZF09ZyksdGhpcy5yZW5kZXJTZXNzaW9uLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKGcpLGYudW5pZm9ybTJmKGcucHJvamVjdGlvblZlY3RvcixkLzIsLWUvMiksZi51bmlmb3JtMmYoZy5vZmZzZXRWZWN0b3IsMCwwKSxhLnVuaWZvcm1zLmRpbWVuc2lvbnMmJihhLnVuaWZvcm1zLmRpbWVuc2lvbnMudmFsdWVbMF09dGhpcy53aWR0aCxhLnVuaWZvcm1zLmRpbWVuc2lvbnMudmFsdWVbMV09dGhpcy5oZWlnaHQsYS51bmlmb3Jtcy5kaW1lbnNpb25zLnZhbHVlWzJdPXRoaXMudmVydGV4QXJyYXlbMF0sYS51bmlmb3Jtcy5kaW1lbnNpb25zLnZhbHVlWzNdPXRoaXMudmVydGV4QXJyYXlbNV0pLGcuc3luY1VuaWZvcm1zKCksZi5iaW5kQnVmZmVyKGYuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QnVmZmVyKSxmLnZlcnRleEF0dHJpYlBvaW50ZXIoZy5hVmVydGV4UG9zaXRpb24sMixmLkZMT0FULCExLDAsMCksZi5iaW5kQnVmZmVyKGYuQVJSQVlfQlVGRkVSLHRoaXMudXZCdWZmZXIpLGYudmVydGV4QXR0cmliUG9pbnRlcihnLmFUZXh0dXJlQ29vcmQsMixmLkZMT0FULCExLDAsMCksZi5iaW5kQnVmZmVyKGYuQVJSQVlfQlVGRkVSLHRoaXMuY29sb3JCdWZmZXIpLGYudmVydGV4QXR0cmliUG9pbnRlcihnLmNvbG9yQXR0cmlidXRlLDIsZi5GTE9BVCwhMSwwLDApLGYuYmluZEJ1ZmZlcihmLkVMRU1FTlRfQVJSQVlfQlVGRkVSLHRoaXMuaW5kZXhCdWZmZXIpLGYuZHJhd0VsZW1lbnRzKGYuVFJJQU5HTEVTLDYsZi5VTlNJR05FRF9TSE9SVCwwKSx0aGlzLnJlbmRlclNlc3Npb24uZHJhd0NvdW50Kyt9LGIuV2ViR0xGaWx0ZXJNYW5hZ2VyLnByb3RvdHlwZS5pbml0U2hhZGVyQnVmZmVycz1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2w7dGhpcy52ZXJ0ZXhCdWZmZXI9YS5jcmVhdGVCdWZmZXIoKSx0aGlzLnV2QnVmZmVyPWEuY3JlYXRlQnVmZmVyKCksdGhpcy5jb2xvckJ1ZmZlcj1hLmNyZWF0ZUJ1ZmZlcigpLHRoaXMuaW5kZXhCdWZmZXI9YS5jcmVhdGVCdWZmZXIoKSx0aGlzLnZlcnRleEFycmF5PW5ldyBGbG9hdDMyQXJyYXkoWzAsMCwxLDAsMCwxLDEsMV0pLGEuYmluZEJ1ZmZlcihhLkFSUkFZX0JVRkZFUix0aGlzLnZlcnRleEJ1ZmZlciksYS5idWZmZXJEYXRhKGEuQVJSQVlfQlVGRkVSLHRoaXMudmVydGV4QXJyYXksYS5TVEFUSUNfRFJBVyksdGhpcy51dkFycmF5PW5ldyBGbG9hdDMyQXJyYXkoWzAsMCwxLDAsMCwxLDEsMV0pLGEuYmluZEJ1ZmZlcihhLkFSUkFZX0JVRkZFUix0aGlzLnV2QnVmZmVyKSxhLmJ1ZmZlckRhdGEoYS5BUlJBWV9CVUZGRVIsdGhpcy51dkFycmF5LGEuU1RBVElDX0RSQVcpLHRoaXMuY29sb3JBcnJheT1uZXcgRmxvYXQzMkFycmF5KFsxLDE2Nzc3MjE1LDEsMTY3NzcyMTUsMSwxNjc3NzIxNSwxLDE2Nzc3MjE1XSksYS5iaW5kQnVmZmVyKGEuQVJSQVlfQlVGRkVSLHRoaXMuY29sb3JCdWZmZXIpLGEuYnVmZmVyRGF0YShhLkFSUkFZX0JVRkZFUix0aGlzLmNvbG9yQXJyYXksYS5TVEFUSUNfRFJBVyksYS5iaW5kQnVmZmVyKGEuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5pbmRleEJ1ZmZlciksYS5idWZmZXJEYXRhKGEuRUxFTUVOVF9BUlJBWV9CVUZGRVIsbmV3IFVpbnQxNkFycmF5KFswLDEsMiwxLDMsMl0pLGEuU1RBVElDX0RSQVcpfSxiLldlYkdMRmlsdGVyTWFuYWdlci5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2w7dGhpcy5maWx0ZXJTdGFjaz1udWxsLHRoaXMub2Zmc2V0WD0wLHRoaXMub2Zmc2V0WT0wO2Zvcih2YXIgYj0wO2I8dGhpcy50ZXh0dXJlUG9vbC5sZW5ndGg7YisrKXRoaXMudGV4dHVyZVBvb2xbYl0uZGVzdHJveSgpO3RoaXMudGV4dHVyZVBvb2w9bnVsbCxhLmRlbGV0ZUJ1ZmZlcih0aGlzLnZlcnRleEJ1ZmZlciksYS5kZWxldGVCdWZmZXIodGhpcy51dkJ1ZmZlciksYS5kZWxldGVCdWZmZXIodGhpcy5jb2xvckJ1ZmZlciksYS5kZWxldGVCdWZmZXIodGhpcy5pbmRleEJ1ZmZlcil9LGIuRmlsdGVyVGV4dHVyZT1mdW5jdGlvbihhLGMsZCxlKXt0aGlzLmdsPWEsdGhpcy5mcmFtZUJ1ZmZlcj1hLmNyZWF0ZUZyYW1lYnVmZmVyKCksdGhpcy50ZXh0dXJlPWEuY3JlYXRlVGV4dHVyZSgpLGU9ZXx8Yi5zY2FsZU1vZGVzLkRFRkFVTFQsYS5iaW5kVGV4dHVyZShhLlRFWFRVUkVfMkQsdGhpcy50ZXh0dXJlKSxhLnRleFBhcmFtZXRlcmkoYS5URVhUVVJFXzJELGEuVEVYVFVSRV9NQUdfRklMVEVSLGU9PT1iLnNjYWxlTW9kZXMuTElORUFSP2EuTElORUFSOmEuTkVBUkVTVCksYS50ZXhQYXJhbWV0ZXJpKGEuVEVYVFVSRV8yRCxhLlRFWFRVUkVfTUlOX0ZJTFRFUixlPT09Yi5zY2FsZU1vZGVzLkxJTkVBUj9hLkxJTkVBUjphLk5FQVJFU1QpLGEudGV4UGFyYW1ldGVyaShhLlRFWFRVUkVfMkQsYS5URVhUVVJFX1dSQVBfUyxhLkNMQU1QX1RPX0VER0UpLGEudGV4UGFyYW1ldGVyaShhLlRFWFRVUkVfMkQsYS5URVhUVVJFX1dSQVBfVCxhLkNMQU1QX1RPX0VER0UpLGEuYmluZEZyYW1lYnVmZmVyKGEuRlJBTUVCVUZGRVIsdGhpcy5mcmFtZWJ1ZmZlciksYS5iaW5kRnJhbWVidWZmZXIoYS5GUkFNRUJVRkZFUix0aGlzLmZyYW1lQnVmZmVyKSxhLmZyYW1lYnVmZmVyVGV4dHVyZTJEKGEuRlJBTUVCVUZGRVIsYS5DT0xPUl9BVFRBQ0hNRU5UMCxhLlRFWFRVUkVfMkQsdGhpcy50ZXh0dXJlLDApLHRoaXMucmVuZGVyQnVmZmVyPWEuY3JlYXRlUmVuZGVyYnVmZmVyKCksYS5iaW5kUmVuZGVyYnVmZmVyKGEuUkVOREVSQlVGRkVSLHRoaXMucmVuZGVyQnVmZmVyKSxhLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKGEuRlJBTUVCVUZGRVIsYS5ERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQsYS5SRU5ERVJCVUZGRVIsdGhpcy5yZW5kZXJCdWZmZXIpLHRoaXMucmVzaXplKGMsZCl9LGIuRmlsdGVyVGV4dHVyZS5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmdsO2EuY2xlYXJDb2xvcigwLDAsMCwwKSxhLmNsZWFyKGEuQ09MT1JfQlVGRkVSX0JJVCl9LGIuRmlsdGVyVGV4dHVyZS5wcm90b3R5cGUucmVzaXplPWZ1bmN0aW9uKGEsYil7aWYodGhpcy53aWR0aCE9PWF8fHRoaXMuaGVpZ2h0IT09Yil7dGhpcy53aWR0aD1hLHRoaXMuaGVpZ2h0PWI7dmFyIGM9dGhpcy5nbDtjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCx0aGlzLnRleHR1cmUpLGMudGV4SW1hZ2UyRChjLlRFWFRVUkVfMkQsMCxjLlJHQkEsYSxiLDAsYy5SR0JBLGMuVU5TSUdORURfQllURSxudWxsKSxjLmJpbmRSZW5kZXJidWZmZXIoYy5SRU5ERVJCVUZGRVIsdGhpcy5yZW5kZXJCdWZmZXIpLGMucmVuZGVyYnVmZmVyU3RvcmFnZShjLlJFTkRFUkJVRkZFUixjLkRFUFRIX1NURU5DSUwsYSxiKX19LGIuRmlsdGVyVGV4dHVyZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2w7YS5kZWxldGVGcmFtZWJ1ZmZlcih0aGlzLmZyYW1lQnVmZmVyKSxhLmRlbGV0ZVRleHR1cmUodGhpcy50ZXh0dXJlKSx0aGlzLmZyYW1lQnVmZmVyPW51bGwsdGhpcy50ZXh0dXJlPW51bGx9LGIuQ2FudmFzTWFza01hbmFnZXI9ZnVuY3Rpb24oKXt9LGIuQ2FudmFzTWFza01hbmFnZXIucHJvdG90eXBlLnB1c2hNYXNrPWZ1bmN0aW9uKGEsYyl7Yy5zYXZlKCk7dmFyIGQ9YS5hbHBoYSxlPWEud29ybGRUcmFuc2Zvcm07Yy5zZXRUcmFuc2Zvcm0oZS5hLGUuYyxlLmIsZS5kLGUudHgsZS50eSksYi5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2soYSxjKSxjLmNsaXAoKSxhLndvcmxkQWxwaGE9ZH0sYi5DYW52YXNNYXNrTWFuYWdlci5wcm90b3R5cGUucG9wTWFzaz1mdW5jdGlvbihhKXthLnJlc3RvcmUoKX0sYi5DYW52YXNUaW50ZXI9ZnVuY3Rpb24oKXt9LGIuQ2FudmFzVGludGVyLmdldFRpbnRlZFRleHR1cmU9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLnRleHR1cmU7Yz1iLkNhbnZhc1RpbnRlci5yb3VuZENvbG9yKGMpO3ZhciBlPVwiI1wiKyhcIjAwMDAwXCIrKDB8YykudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpO2lmKGQudGludENhY2hlPWQudGludENhY2hlfHx7fSxkLnRpbnRDYWNoZVtlXSlyZXR1cm4gZC50aW50Q2FjaGVbZV07dmFyIGY9Yi5DYW52YXNUaW50ZXIuY2FudmFzfHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO2lmKGIuQ2FudmFzVGludGVyLnRpbnRNZXRob2QoZCxjLGYpLGIuQ2FudmFzVGludGVyLmNvbnZlcnRUaW50VG9JbWFnZSl7dmFyIGc9bmV3IEltYWdlO2cuc3JjPWYudG9EYXRhVVJMKCksZC50aW50Q2FjaGVbZV09Z31lbHNlIGQudGludENhY2hlW2VdPWYsYi5DYW52YXNUaW50ZXIuY2FudmFzPW51bGw7cmV0dXJuIGZ9LGIuQ2FudmFzVGludGVyLnRpbnRXaXRoTXVsdGlwbHk9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWMuZ2V0Q29udGV4dChcIjJkXCIpLGU9YS5mcmFtZTtjLndpZHRoPWUud2lkdGgsYy5oZWlnaHQ9ZS5oZWlnaHQsZC5maWxsU3R5bGU9XCIjXCIrKFwiMDAwMDBcIisoMHxiKS50b1N0cmluZygxNikpLnN1YnN0cigtNiksZC5maWxsUmVjdCgwLDAsZS53aWR0aCxlLmhlaWdodCksZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJtdWx0aXBseVwiLGQuZHJhd0ltYWdlKGEuYmFzZVRleHR1cmUuc291cmNlLGUueCxlLnksZS53aWR0aCxlLmhlaWdodCwwLDAsZS53aWR0aCxlLmhlaWdodCksZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJkZXN0aW5hdGlvbi1hdG9wXCIsZC5kcmF3SW1hZ2UoYS5iYXNlVGV4dHVyZS5zb3VyY2UsZS54LGUueSxlLndpZHRoLGUuaGVpZ2h0LDAsMCxlLndpZHRoLGUuaGVpZ2h0KX0sYi5DYW52YXNUaW50ZXIudGludFdpdGhPdmVybGF5PWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1jLmdldENvbnRleHQoXCIyZFwiKSxlPWEuZnJhbWU7Yy53aWR0aD1lLndpZHRoLGMuaGVpZ2h0PWUuaGVpZ2h0LGQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPVwiY29weVwiLGQuZmlsbFN0eWxlPVwiI1wiKyhcIjAwMDAwXCIrKDB8YikudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpLGQuZmlsbFJlY3QoMCwwLGUud2lkdGgsZS5oZWlnaHQpLGQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPVwiZGVzdGluYXRpb24tYXRvcFwiLGQuZHJhd0ltYWdlKGEuYmFzZVRleHR1cmUuc291cmNlLGUueCxlLnksZS53aWR0aCxlLmhlaWdodCwwLDAsZS53aWR0aCxlLmhlaWdodCl9LGIuQ2FudmFzVGludGVyLnRpbnRXaXRoUGVyUGl4ZWw9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWQuZ2V0Q29udGV4dChcIjJkXCIpLGY9YS5mcmFtZTtkLndpZHRoPWYud2lkdGgsZC5oZWlnaHQ9Zi5oZWlnaHQsZS5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJjb3B5XCIsZS5kcmF3SW1hZ2UoYS5iYXNlVGV4dHVyZS5zb3VyY2UsZi54LGYueSxmLndpZHRoLGYuaGVpZ2h0LDAsMCxmLndpZHRoLGYuaGVpZ2h0KTtmb3IodmFyIGc9Yi5oZXgycmdiKGMpLGg9Z1swXSxpPWdbMV0saj1nWzJdLGs9ZS5nZXRJbWFnZURhdGEoMCwwLGYud2lkdGgsZi5oZWlnaHQpLGw9ay5kYXRhLG09MDttPGwubGVuZ3RoO20rPTQpbFttKzBdKj1oLGxbbSsxXSo9aSxsW20rMl0qPWo7ZS5wdXRJbWFnZURhdGEoaywwLDApfSxiLkNhbnZhc1RpbnRlci5yb3VuZENvbG9yPWZ1bmN0aW9uKGEpe3ZhciBjPWIuQ2FudmFzVGludGVyLmNhY2hlU3RlcHNQZXJDb2xvckNoYW5uZWwsZD1iLmhleDJyZ2IoYSk7cmV0dXJuIGRbMF09TWF0aC5taW4oMjU1LGRbMF0vYypjKSxkWzFdPU1hdGgubWluKDI1NSxkWzFdL2MqYyksZFsyXT1NYXRoLm1pbigyNTUsZFsyXS9jKmMpLGIucmdiMmhleChkKX0sYi5DYW52YXNUaW50ZXIuY2FjaGVTdGVwc1BlckNvbG9yQ2hhbm5lbD04LGIuQ2FudmFzVGludGVyLmNvbnZlcnRUaW50VG9JbWFnZT0hMSxiLkNhbnZhc1RpbnRlci5jYW5Vc2VNdWx0aXBseT1iLmNhblVzZU5ld0NhbnZhc0JsZW5kTW9kZXMoKSxiLkNhbnZhc1RpbnRlci50aW50TWV0aG9kPWIuQ2FudmFzVGludGVyLmNhblVzZU11bHRpcGx5P2IuQ2FudmFzVGludGVyLnRpbnRXaXRoTXVsdGlwbHk6Yi5DYW52YXNUaW50ZXIudGludFdpdGhQZXJQaXhlbCxiLkNhbnZhc1JlbmRlcmVyPWZ1bmN0aW9uKGEsYyxkLGUpe2IuZGVmYXVsdFJlbmRlcmVyfHwoYi5zYXlIZWxsbyhcIkNhbnZhc1wiKSxiLmRlZmF1bHRSZW5kZXJlcj10aGlzKSx0aGlzLnR5cGU9Yi5DQU5WQVNfUkVOREVSRVIsdGhpcy5jbGVhckJlZm9yZVJlbmRlcj0hMCx0aGlzLnRyYW5zcGFyZW50PSEhZSxiLmJsZW5kTW9kZXNDYW52YXN8fChiLmJsZW5kTW9kZXNDYW52YXM9W10sYi5jYW5Vc2VOZXdDYW52YXNCbGVuZE1vZGVzKCk/KGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuTk9STUFMXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5BRERdPVwibGlnaHRlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuTVVMVElQTFldPVwibXVsdGlwbHlcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLlNDUkVFTl09XCJzY3JlZW5cIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLk9WRVJMQVldPVwib3ZlcmxheVwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuREFSS0VOXT1cImRhcmtlblwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuTElHSFRFTl09XCJsaWdodGVuXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5DT0xPUl9ET0RHRV09XCJjb2xvci1kb2RnZVwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuQ09MT1JfQlVSTl09XCJjb2xvci1idXJuXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5IQVJEX0xJR0hUXT1cImhhcmQtbGlnaHRcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLlNPRlRfTElHSFRdPVwic29mdC1saWdodFwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuRElGRkVSRU5DRV09XCJkaWZmZXJlbmNlXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5FWENMVVNJT05dPVwiZXhjbHVzaW9uXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5IVUVdPVwiaHVlXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5TQVRVUkFUSU9OXT1cInNhdHVyYXRpb25cIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkNPTE9SXT1cImNvbG9yXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5MVU1JTk9TSVRZXT1cImx1bWlub3NpdHlcIik6KGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuTk9STUFMXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5BRERdPVwibGlnaHRlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuTVVMVElQTFldPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLlNDUkVFTl09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuT1ZFUkxBWV09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuREFSS0VOXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5MSUdIVEVOXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5DT0xPUl9ET0RHRV09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuQ09MT1JfQlVSTl09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuSEFSRF9MSUdIVF09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuU09GVF9MSUdIVF09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuRElGRkVSRU5DRV09XCJzb3VyY2Utb3ZlclwiLGIuYmxlbmRNb2Rlc0NhbnZhc1tiLmJsZW5kTW9kZXMuRVhDTFVTSU9OXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5IVUVdPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLlNBVFVSQVRJT05dPVwic291cmNlLW92ZXJcIixiLmJsZW5kTW9kZXNDYW52YXNbYi5ibGVuZE1vZGVzLkNPTE9SXT1cInNvdXJjZS1vdmVyXCIsYi5ibGVuZE1vZGVzQ2FudmFzW2IuYmxlbmRNb2Rlcy5MVU1JTk9TSVRZXT1cInNvdXJjZS1vdmVyXCIpKSx0aGlzLndpZHRoPWF8fDgwMCx0aGlzLmhlaWdodD1jfHw2MDAsdGhpcy52aWV3PWR8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksdGhpcy5jb250ZXh0PXRoaXMudmlldy5nZXRDb250ZXh0KFwiMmRcIix7YWxwaGE6dGhpcy50cmFuc3BhcmVudH0pLHRoaXMucmVmcmVzaD0hMCx0aGlzLnZpZXcud2lkdGg9dGhpcy53aWR0aCx0aGlzLnZpZXcuaGVpZ2h0PXRoaXMuaGVpZ2h0LHRoaXMuY291bnQ9MCx0aGlzLm1hc2tNYW5hZ2VyPW5ldyBiLkNhbnZhc01hc2tNYW5hZ2VyLHRoaXMucmVuZGVyU2Vzc2lvbj17Y29udGV4dDp0aGlzLmNvbnRleHQsbWFza01hbmFnZXI6dGhpcy5tYXNrTWFuYWdlcixzY2FsZU1vZGU6bnVsbCxzbW9vdGhQcm9wZXJ0eTpudWxsLHJvdW5kUGl4ZWxzOiExfSxcImltYWdlU21vb3RoaW5nRW5hYmxlZFwiaW4gdGhpcy5jb250ZXh0P3RoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eT1cImltYWdlU21vb3RoaW5nRW5hYmxlZFwiOlwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCJpbiB0aGlzLmNvbnRleHQ/dGhpcy5yZW5kZXJTZXNzaW9uLnNtb290aFByb3BlcnR5PVwid2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkXCI6XCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcImluIHRoaXMuY29udGV4dD90aGlzLnJlbmRlclNlc3Npb24uc21vb3RoUHJvcGVydHk9XCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWRcIjpcIm9JbWFnZVNtb290aGluZ0VuYWJsZWRcImluIHRoaXMuY29udGV4dCYmKHRoaXMucmVuZGVyU2Vzc2lvbi5zbW9vdGhQcm9wZXJ0eT1cIm9JbWFnZVNtb290aGluZ0VuYWJsZWRcIil9LGIuQ2FudmFzUmVuZGVyZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQ2FudmFzUmVuZGVyZXIsYi5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKGEpe2IudGV4dHVyZXNUb1VwZGF0ZS5sZW5ndGg9MCxiLnRleHR1cmVzVG9EZXN0cm95Lmxlbmd0aD0wLGEudXBkYXRlVHJhbnNmb3JtKCksdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybSgxLDAsMCwxLDAsMCksdGhpcy5jb250ZXh0Lmdsb2JhbEFscGhhPTEsbmF2aWdhdG9yLmlzQ29jb29uSlMmJnRoaXMudmlldy5zY3JlZW5jYW52YXMmJih0aGlzLmNvbnRleHQuZmlsbFN0eWxlPVwiYmxhY2tcIix0aGlzLmNvbnRleHQuY2xlYXIoKSksIXRoaXMudHJhbnNwYXJlbnQmJnRoaXMuY2xlYXJCZWZvcmVSZW5kZXI/KHRoaXMuY29udGV4dC5maWxsU3R5bGU9YS5iYWNrZ3JvdW5kQ29sb3JTdHJpbmcsdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSk6dGhpcy50cmFuc3BhcmVudCYmdGhpcy5jbGVhckJlZm9yZVJlbmRlciYmdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLDAsdGhpcy53aWR0aCx0aGlzLmhlaWdodCksdGhpcy5yZW5kZXJEaXNwbGF5T2JqZWN0KGEpLGEuaW50ZXJhY3RpdmUmJihhLl9pbnRlcmFjdGl2ZUV2ZW50c0FkZGVkfHwoYS5faW50ZXJhY3RpdmVFdmVudHNBZGRlZD0hMCxhLmludGVyYWN0aW9uTWFuYWdlci5zZXRUYXJnZXQodGhpcykpKSxiLlRleHR1cmUuZnJhbWVVcGRhdGVzLmxlbmd0aD4wJiYoYi5UZXh0dXJlLmZyYW1lVXBkYXRlcy5sZW5ndGg9MClcbn0sYi5DYW52YXNSZW5kZXJlci5wcm90b3R5cGUucmVzaXplPWZ1bmN0aW9uKGEsYil7dGhpcy53aWR0aD1hLHRoaXMuaGVpZ2h0PWIsdGhpcy52aWV3LndpZHRoPWEsdGhpcy52aWV3LmhlaWdodD1ifSxiLkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJEaXNwbGF5T2JqZWN0PWZ1bmN0aW9uKGEsYil7dGhpcy5yZW5kZXJTZXNzaW9uLmNvbnRleHQ9Ynx8dGhpcy5jb250ZXh0LGEuX3JlbmRlckNhbnZhcyh0aGlzLnJlbmRlclNlc3Npb24pfSxiLkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJTdHJpcEZsYXQ9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5jb250ZXh0LGM9YS52ZXJ0aWNpZXMsZD1jLmxlbmd0aC8yO3RoaXMuY291bnQrKyxiLmJlZ2luUGF0aCgpO2Zvcih2YXIgZT0xO2QtMj5lO2UrKyl7dmFyIGY9MiplLGc9Y1tmXSxoPWNbZisyXSxpPWNbZis0XSxqPWNbZisxXSxrPWNbZiszXSxsPWNbZis1XTtiLm1vdmVUbyhnLGopLGIubGluZVRvKGgsayksYi5saW5lVG8oaSxsKX1iLmZpbGxTdHlsZT1cIiNGRjAwMDBcIixiLmZpbGwoKSxiLmNsb3NlUGF0aCgpfSxiLkNhbnZhc1JlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXJTdHJpcD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmNvbnRleHQsYz1hLnZlcnRpY2llcyxkPWEudXZzLGU9Yy5sZW5ndGgvMjt0aGlzLmNvdW50Kys7Zm9yKHZhciBmPTE7ZS0yPmY7ZisrKXt2YXIgZz0yKmYsaD1jW2ddLGk9Y1tnKzJdLGo9Y1tnKzRdLGs9Y1tnKzFdLGw9Y1tnKzNdLG09Y1tnKzVdLG49ZFtnXSphLnRleHR1cmUud2lkdGgsbz1kW2crMl0qYS50ZXh0dXJlLndpZHRoLHA9ZFtnKzRdKmEudGV4dHVyZS53aWR0aCxxPWRbZysxXSphLnRleHR1cmUuaGVpZ2h0LHI9ZFtnKzNdKmEudGV4dHVyZS5oZWlnaHQscz1kW2crNV0qYS50ZXh0dXJlLmhlaWdodDtiLnNhdmUoKSxiLmJlZ2luUGF0aCgpLGIubW92ZVRvKGgsayksYi5saW5lVG8oaSxsKSxiLmxpbmVUbyhqLG0pLGIuY2xvc2VQYXRoKCksYi5jbGlwKCk7dmFyIHQ9bipyK3EqcCtvKnMtcipwLXEqby1uKnMsdT1oKnIrcSpqK2kqcy1yKmotcSppLWgqcyx2PW4qaStoKnArbypqLWkqcC1oKm8tbipqLHc9bipyKmorcSppKnAraCpvKnMtaCpyKnAtcSpvKmotbippKnMseD1rKnIrcSptK2wqcy1yKm0tcSpsLWsqcyx5PW4qbCtrKnArbyptLWwqcC1rKm8tbiptLHo9bipyKm0rcSpsKnAraypvKnMtaypyKnAtcSpvKm0tbipsKnM7Yi50cmFuc2Zvcm0odS90LHgvdCx2L3QseS90LHcvdCx6L3QpLGIuZHJhd0ltYWdlKGEudGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsMCwwKSxiLnJlc3RvcmUoKX19LGIuQ2FudmFzQnVmZmVyPWZ1bmN0aW9uKGEsYil7dGhpcy53aWR0aD1hLHRoaXMuaGVpZ2h0PWIsdGhpcy5jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSx0aGlzLmNvbnRleHQ9dGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLHRoaXMuY2FudmFzLndpZHRoPWEsdGhpcy5jYW52YXMuaGVpZ2h0PWJ9LGIuQ2FudmFzQnVmZmVyLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuY29udGV4dC5jbGVhclJlY3QoMCwwLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpfSxiLkNhbnZhc0J1ZmZlci5wcm90b3R5cGUucmVzaXplPWZ1bmN0aW9uKGEsYil7dGhpcy53aWR0aD10aGlzLmNhbnZhcy53aWR0aD1hLHRoaXMuaGVpZ2h0PXRoaXMuY2FudmFzLmhlaWdodD1ifSxiLkNhbnZhc0dyYXBoaWNzPWZ1bmN0aW9uKCl7fSxiLkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzPWZ1bmN0aW9uKGEsYyl7Zm9yKHZhciBkPWEud29ybGRBbHBoYSxlPVwiXCIsZj0wO2Y8YS5ncmFwaGljc0RhdGEubGVuZ3RoO2YrKyl7dmFyIGc9YS5ncmFwaGljc0RhdGFbZl0saD1nLnBvaW50cztpZihjLnN0cm9rZVN0eWxlPWU9XCIjXCIrKFwiMDAwMDBcIisoMHxnLmxpbmVDb2xvcikudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpLGMubGluZVdpZHRoPWcubGluZVdpZHRoLGcudHlwZT09PWIuR3JhcGhpY3MuUE9MWSl7Yy5iZWdpblBhdGgoKSxjLm1vdmVUbyhoWzBdLGhbMV0pO2Zvcih2YXIgaT0xO2k8aC5sZW5ndGgvMjtpKyspYy5saW5lVG8oaFsyKmldLGhbMippKzFdKTtoWzBdPT09aFtoLmxlbmd0aC0yXSYmaFsxXT09PWhbaC5sZW5ndGgtMV0mJmMuY2xvc2VQYXRoKCksZy5maWxsJiYoYy5nbG9iYWxBbHBoYT1nLmZpbGxBbHBoYSpkLGMuZmlsbFN0eWxlPWU9XCIjXCIrKFwiMDAwMDBcIisoMHxnLmZpbGxDb2xvcikudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTYpLGMuZmlsbCgpKSxnLmxpbmVXaWR0aCYmKGMuZ2xvYmFsQWxwaGE9Zy5saW5lQWxwaGEqZCxjLnN0cm9rZSgpKX1lbHNlIGlmKGcudHlwZT09PWIuR3JhcGhpY3MuUkVDVCkoZy5maWxsQ29sb3J8fDA9PT1nLmZpbGxDb2xvcikmJihjLmdsb2JhbEFscGhhPWcuZmlsbEFscGhhKmQsYy5maWxsU3R5bGU9ZT1cIiNcIisoXCIwMDAwMFwiKygwfGcuZmlsbENvbG9yKS50b1N0cmluZygxNikpLnN1YnN0cigtNiksYy5maWxsUmVjdChoWzBdLGhbMV0saFsyXSxoWzNdKSksZy5saW5lV2lkdGgmJihjLmdsb2JhbEFscGhhPWcubGluZUFscGhhKmQsYy5zdHJva2VSZWN0KGhbMF0saFsxXSxoWzJdLGhbM10pKTtlbHNlIGlmKGcudHlwZT09PWIuR3JhcGhpY3MuQ0lSQyljLmJlZ2luUGF0aCgpLGMuYXJjKGhbMF0saFsxXSxoWzJdLDAsMipNYXRoLlBJKSxjLmNsb3NlUGF0aCgpLGcuZmlsbCYmKGMuZ2xvYmFsQWxwaGE9Zy5maWxsQWxwaGEqZCxjLmZpbGxTdHlsZT1lPVwiI1wiKyhcIjAwMDAwXCIrKDB8Zy5maWxsQ29sb3IpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KSxjLmZpbGwoKSksZy5saW5lV2lkdGgmJihjLmdsb2JhbEFscGhhPWcubGluZUFscGhhKmQsYy5zdHJva2UoKSk7ZWxzZSBpZihnLnR5cGU9PT1iLkdyYXBoaWNzLkVMSVApe3ZhciBqPWcucG9pbnRzLGs9MipqWzJdLGw9MipqWzNdLG09alswXS1rLzIsbj1qWzFdLWwvMjtjLmJlZ2luUGF0aCgpO3ZhciBvPS41NTIyODQ4LHA9ay8yKm8scT1sLzIqbyxyPW0rayxzPW4rbCx0PW0ray8yLHU9bitsLzI7Yy5tb3ZlVG8obSx1KSxjLmJlemllckN1cnZlVG8obSx1LXEsdC1wLG4sdCxuKSxjLmJlemllckN1cnZlVG8odCtwLG4scix1LXEscix1KSxjLmJlemllckN1cnZlVG8ocix1K3EsdCtwLHMsdCxzKSxjLmJlemllckN1cnZlVG8odC1wLHMsbSx1K3EsbSx1KSxjLmNsb3NlUGF0aCgpLGcuZmlsbCYmKGMuZ2xvYmFsQWxwaGE9Zy5maWxsQWxwaGEqZCxjLmZpbGxTdHlsZT1lPVwiI1wiKyhcIjAwMDAwXCIrKDB8Zy5maWxsQ29sb3IpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KSxjLmZpbGwoKSksZy5saW5lV2lkdGgmJihjLmdsb2JhbEFscGhhPWcubGluZUFscGhhKmQsYy5zdHJva2UoKSl9ZWxzZSBpZihnLnR5cGU9PT1iLkdyYXBoaWNzLlJSRUMpe3ZhciB2PWhbMF0sdz1oWzFdLHg9aFsyXSx5PWhbM10sej1oWzRdLEE9TWF0aC5taW4oeCx5KS8yfDA7ej16PkE/QTp6LGMuYmVnaW5QYXRoKCksYy5tb3ZlVG8odix3K3opLGMubGluZVRvKHYsdyt5LXopLGMucXVhZHJhdGljQ3VydmVUbyh2LHcreSx2K3osdyt5KSxjLmxpbmVUbyh2K3gteix3K3kpLGMucXVhZHJhdGljQ3VydmVUbyh2K3gsdyt5LHYreCx3K3kteiksYy5saW5lVG8odit4LHcreiksYy5xdWFkcmF0aWNDdXJ2ZVRvKHYreCx3LHYreC16LHcpLGMubGluZVRvKHYreix3KSxjLnF1YWRyYXRpY0N1cnZlVG8odix3LHYsdyt6KSxjLmNsb3NlUGF0aCgpLChnLmZpbGxDb2xvcnx8MD09PWcuZmlsbENvbG9yKSYmKGMuZ2xvYmFsQWxwaGE9Zy5maWxsQWxwaGEqZCxjLmZpbGxTdHlsZT1lPVwiI1wiKyhcIjAwMDAwXCIrKDB8Zy5maWxsQ29sb3IpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC02KSxjLmZpbGwoKSksZy5saW5lV2lkdGgmJihjLmdsb2JhbEFscGhhPWcubGluZUFscGhhKmQsYy5zdHJva2UoKSl9fX0sYi5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljc01hc2s9ZnVuY3Rpb24oYSxjKXt2YXIgZD1hLmdyYXBoaWNzRGF0YS5sZW5ndGg7aWYoMCE9PWQpe2Q+MSYmKGQ9MSx3aW5kb3cuY29uc29sZS5sb2coXCJQaXhpLmpzIHdhcm5pbmc6IG1hc2tzIGluIGNhbnZhcyBjYW4gb25seSBtYXNrIHVzaW5nIHRoZSBmaXJzdCBwYXRoIGluIHRoZSBncmFwaGljcyBvYmplY3RcIikpO2Zvcih2YXIgZT0wOzE+ZTtlKyspe3ZhciBmPWEuZ3JhcGhpY3NEYXRhW2VdLGc9Zi5wb2ludHM7aWYoZi50eXBlPT09Yi5HcmFwaGljcy5QT0xZKXtjLmJlZ2luUGF0aCgpLGMubW92ZVRvKGdbMF0sZ1sxXSk7Zm9yKHZhciBoPTE7aDxnLmxlbmd0aC8yO2grKyljLmxpbmVUbyhnWzIqaF0sZ1syKmgrMV0pO2dbMF09PT1nW2cubGVuZ3RoLTJdJiZnWzFdPT09Z1tnLmxlbmd0aC0xXSYmYy5jbG9zZVBhdGgoKX1lbHNlIGlmKGYudHlwZT09PWIuR3JhcGhpY3MuUkVDVCljLmJlZ2luUGF0aCgpLGMucmVjdChnWzBdLGdbMV0sZ1syXSxnWzNdKSxjLmNsb3NlUGF0aCgpO2Vsc2UgaWYoZi50eXBlPT09Yi5HcmFwaGljcy5DSVJDKWMuYmVnaW5QYXRoKCksYy5hcmMoZ1swXSxnWzFdLGdbMl0sMCwyKk1hdGguUEkpLGMuY2xvc2VQYXRoKCk7ZWxzZSBpZihmLnR5cGU9PT1iLkdyYXBoaWNzLkVMSVApe3ZhciBpPWYucG9pbnRzLGo9MippWzJdLGs9MippWzNdLGw9aVswXS1qLzIsbT1pWzFdLWsvMjtjLmJlZ2luUGF0aCgpO3ZhciBuPS41NTIyODQ4LG89ai8yKm4scD1rLzIqbixxPWwraixyPW0rayxzPWwrai8yLHQ9bStrLzI7Yy5tb3ZlVG8obCx0KSxjLmJlemllckN1cnZlVG8obCx0LXAscy1vLG0scyxtKSxjLmJlemllckN1cnZlVG8ocytvLG0scSx0LXAscSx0KSxjLmJlemllckN1cnZlVG8ocSx0K3AscytvLHIscyxyKSxjLmJlemllckN1cnZlVG8ocy1vLHIsbCx0K3AsbCx0KSxjLmNsb3NlUGF0aCgpfWVsc2UgaWYoZi50eXBlPT09Yi5HcmFwaGljcy5SUkVDKXt2YXIgdT1nWzBdLHY9Z1sxXSx3PWdbMl0seD1nWzNdLHk9Z1s0XSx6PU1hdGgubWluKHcseCkvMnwwO3k9eT56P3o6eSxjLmJlZ2luUGF0aCgpLGMubW92ZVRvKHUsdit5KSxjLmxpbmVUbyh1LHYreC15KSxjLnF1YWRyYXRpY0N1cnZlVG8odSx2K3gsdSt5LHYreCksYy5saW5lVG8odSt3LXksdit4KSxjLnF1YWRyYXRpY0N1cnZlVG8odSt3LHYreCx1K3csdit4LXkpLGMubGluZVRvKHUrdyx2K3kpLGMucXVhZHJhdGljQ3VydmVUbyh1K3csdix1K3cteSx2KSxjLmxpbmVUbyh1K3ksdiksYy5xdWFkcmF0aWNDdXJ2ZVRvKHUsdix1LHYreSksYy5jbG9zZVBhdGgoKX19fX0sYi5HcmFwaGljcz1mdW5jdGlvbigpe2IuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpLHRoaXMucmVuZGVyYWJsZT0hMCx0aGlzLmZpbGxBbHBoYT0xLHRoaXMubGluZVdpZHRoPTAsdGhpcy5saW5lQ29sb3I9XCJibGFja1wiLHRoaXMuZ3JhcGhpY3NEYXRhPVtdLHRoaXMudGludD0xNjc3NzIxNSx0aGlzLmJsZW5kTW9kZT1iLmJsZW5kTW9kZXMuTk9STUFMLHRoaXMuY3VycmVudFBhdGg9e3BvaW50czpbXX0sdGhpcy5fd2ViR0w9W10sdGhpcy5pc01hc2s9ITEsdGhpcy5ib3VuZHM9bnVsbCx0aGlzLmJvdW5kc1BhZGRpbmc9MTAsdGhpcy5kaXJ0eT0hMH0sYi5HcmFwaGljcy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlKSxiLkdyYXBoaWNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkdyYXBoaWNzLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkdyYXBoaWNzLnByb3RvdHlwZSxcImNhY2hlQXNCaXRtYXBcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2NhY2hlQXNCaXRtYXB9LHNldDpmdW5jdGlvbihhKXt0aGlzLl9jYWNoZUFzQml0bWFwPWEsdGhpcy5fY2FjaGVBc0JpdG1hcD90aGlzLl9nZW5lcmF0ZUNhY2hlZFNwcml0ZSgpOih0aGlzLmRlc3Ryb3lDYWNoZWRTcHJpdGUoKSx0aGlzLmRpcnR5PSEwKX19KSxiLkdyYXBoaWNzLnByb3RvdHlwZS5saW5lU3R5bGU9ZnVuY3Rpb24oYSxjLGQpe3JldHVybiB0aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5sZW5ndGh8fHRoaXMuZ3JhcGhpY3NEYXRhLnBvcCgpLHRoaXMubGluZVdpZHRoPWF8fDAsdGhpcy5saW5lQ29sb3I9Y3x8MCx0aGlzLmxpbmVBbHBoYT1hcmd1bWVudHMubGVuZ3RoPDM/MTpkLHRoaXMuY3VycmVudFBhdGg9e2xpbmVXaWR0aDp0aGlzLmxpbmVXaWR0aCxsaW5lQ29sb3I6dGhpcy5saW5lQ29sb3IsbGluZUFscGhhOnRoaXMubGluZUFscGhhLGZpbGxDb2xvcjp0aGlzLmZpbGxDb2xvcixmaWxsQWxwaGE6dGhpcy5maWxsQWxwaGEsZmlsbDp0aGlzLmZpbGxpbmcscG9pbnRzOltdLHR5cGU6Yi5HcmFwaGljcy5QT0xZfSx0aGlzLmdyYXBoaWNzRGF0YS5wdXNoKHRoaXMuY3VycmVudFBhdGgpLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLm1vdmVUbz1mdW5jdGlvbihhLGMpe3JldHVybiB0aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5sZW5ndGh8fHRoaXMuZ3JhcGhpY3NEYXRhLnBvcCgpLHRoaXMuY3VycmVudFBhdGg9dGhpcy5jdXJyZW50UGF0aD17bGluZVdpZHRoOnRoaXMubGluZVdpZHRoLGxpbmVDb2xvcjp0aGlzLmxpbmVDb2xvcixsaW5lQWxwaGE6dGhpcy5saW5lQWxwaGEsZmlsbENvbG9yOnRoaXMuZmlsbENvbG9yLGZpbGxBbHBoYTp0aGlzLmZpbGxBbHBoYSxmaWxsOnRoaXMuZmlsbGluZyxwb2ludHM6W10sdHlwZTpiLkdyYXBoaWNzLlBPTFl9LHRoaXMuY3VycmVudFBhdGgucG9pbnRzLnB1c2goYSxjKSx0aGlzLmdyYXBoaWNzRGF0YS5wdXNoKHRoaXMuY3VycmVudFBhdGgpLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmxpbmVUbz1mdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5wdXNoKGEsYiksdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5xdWFkcmF0aWNDdXJ2ZVRvPWZ1bmN0aW9uKGEsYixjLGQpezA9PT10aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5sZW5ndGgmJnRoaXMubW92ZVRvKDAsMCk7dmFyIGUsZixnPTIwLGg9dGhpcy5jdXJyZW50UGF0aC5wb2ludHM7MD09PWgubGVuZ3RoJiZ0aGlzLm1vdmVUbygwLDApO2Zvcih2YXIgaT1oW2gubGVuZ3RoLTJdLGo9aFtoLmxlbmd0aC0xXSxrPTAsbD0xO2c+PWw7bCsrKWs9bC9nLGU9aSsoYS1pKSprLGY9aisoYi1qKSprLGgucHVzaChlKyhhKyhjLWEpKmstZSkqayxmKyhiKyhkLWIpKmstZikqayk7cmV0dXJuIHRoaXMuZGlydHk9ITAsdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUuYmV6aWVyQ3VydmVUbz1mdW5jdGlvbihhLGIsYyxkLGUsZil7MD09PXRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aCYmdGhpcy5tb3ZlVG8oMCwwKTtmb3IodmFyIGcsaCxpLGosayxsPTIwLG09dGhpcy5jdXJyZW50UGF0aC5wb2ludHMsbj1tW20ubGVuZ3RoLTJdLG89bVttLmxlbmd0aC0xXSxwPTAscT0xO2w+cTtxKyspcD1xL2wsZz0xLXAsaD1nKmcsaT1oKmcsaj1wKnAsaz1qKnAsbS5wdXNoKGkqbiszKmgqcCphKzMqZypqKmMrayplLGkqbyszKmgqcCpiKzMqZypqKmQraypmKTtyZXR1cm4gdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5hcmNUbz1mdW5jdGlvbihhLGIsYyxkLGUpezA9PT10aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5sZW5ndGgmJnRoaXMubW92ZVRvKGEsYik7dmFyIGY9dGhpcy5jdXJyZW50UGF0aC5wb2ludHMsZz1mW2YubGVuZ3RoLTJdLGg9ZltmLmxlbmd0aC0xXSxpPWgtYixqPWctYSxrPWQtYixsPWMtYSxtPU1hdGguYWJzKGkqbC1qKmspO2lmKDFlLTg+bXx8MD09PWUpZi5wdXNoKGEsYik7ZWxzZXt2YXIgbj1pKmkraipqLG89ayprK2wqbCxwPWkqaytqKmwscT1lKk1hdGguc3FydChuKS9tLHI9ZSpNYXRoLnNxcnQobykvbSxzPXEqcC9uLHQ9cipwL28sdT1xKmwrcipqLHY9cSprK3IqaSx3PWoqKHIrcykseD1pKihyK3MpLHk9bCoocSt0KSx6PWsqKHErdCksQT1NYXRoLmF0YW4yKHgtdix3LXUpLEI9TWF0aC5hdGFuMih6LXYseS11KTt0aGlzLmFyYyh1K2EsditiLGUsQSxCLGoqaz5sKmkpfXJldHVybiB0aGlzLmRpcnR5PSEwLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmFyYz1mdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGc9YStNYXRoLmNvcyhkKSpjLGg9YitNYXRoLnNpbihkKSpjLGk9dGhpcy5jdXJyZW50UGF0aC5wb2ludHM7aWYoKDAhPT1pLmxlbmd0aCYmaVtpLmxlbmd0aC0yXSE9PWd8fGlbaS5sZW5ndGgtMV0hPT1oKSYmKHRoaXMubW92ZVRvKGcsaCksaT10aGlzLmN1cnJlbnRQYXRoLnBvaW50cyksZD09PWUpcmV0dXJuIHRoaXM7IWYmJmQ+PWU/ZSs9MipNYXRoLlBJOmYmJmU+PWQmJihkKz0yKk1hdGguUEkpO3ZhciBqPWY/LTEqKGQtZSk6ZS1kLGs9TWF0aC5hYnMoaikvKDIqTWF0aC5QSSkqNDA7aWYoMD09PWopcmV0dXJuIHRoaXM7Zm9yKHZhciBsPWovKDIqayksbT0yKmwsbj1NYXRoLmNvcyhsKSxvPU1hdGguc2luKGwpLHA9ay0xLHE9cCUxL3Ascj0wO3A+PXI7cisrKXt2YXIgcz1yK3Eqcix0PWwrZCttKnMsdT1NYXRoLmNvcyh0KSx2PS1NYXRoLnNpbih0KTtpLnB1c2goKG4qdStvKnYpKmMrYSwobiotditvKnUpKmMrYil9cmV0dXJuIHRoaXMuZGlydHk9ITAsdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1BhdGg9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aHx8dGhpcy5ncmFwaGljc0RhdGEucG9wKCksdGhpcy5jdXJyZW50UGF0aD10aGlzLmN1cnJlbnRQYXRoPXtsaW5lV2lkdGg6dGhpcy5saW5lV2lkdGgsbGluZUNvbG9yOnRoaXMubGluZUNvbG9yLGxpbmVBbHBoYTp0aGlzLmxpbmVBbHBoYSxmaWxsQ29sb3I6dGhpcy5maWxsQ29sb3IsZmlsbEFscGhhOnRoaXMuZmlsbEFscGhhLGZpbGw6dGhpcy5maWxsaW5nLHBvaW50czpbXSx0eXBlOmIuR3JhcGhpY3MuUE9MWX0sdGhpcy5ncmFwaGljc0RhdGEucHVzaCh0aGlzLmN1cnJlbnRQYXRoKSx0aGlzLmN1cnJlbnRQYXRoLnBvaW50cz10aGlzLmN1cnJlbnRQYXRoLnBvaW50cy5jb25jYXQoYSksdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5iZWdpbkZpbGw9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5maWxsaW5nPSEwLHRoaXMuZmlsbENvbG9yPWF8fDAsdGhpcy5maWxsQWxwaGE9YXJndW1lbnRzLmxlbmd0aDwyPzE6Yix0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5lbmRGaWxsPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZmlsbGluZz0hMSx0aGlzLmZpbGxDb2xvcj1udWxsLHRoaXMuZmlsbEFscGhhPTEsdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1JlY3Q9ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIHRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aHx8dGhpcy5ncmFwaGljc0RhdGEucG9wKCksdGhpcy5jdXJyZW50UGF0aD17bGluZVdpZHRoOnRoaXMubGluZVdpZHRoLGxpbmVDb2xvcjp0aGlzLmxpbmVDb2xvcixsaW5lQWxwaGE6dGhpcy5saW5lQWxwaGEsZmlsbENvbG9yOnRoaXMuZmlsbENvbG9yLGZpbGxBbHBoYTp0aGlzLmZpbGxBbHBoYSxmaWxsOnRoaXMuZmlsbGluZyxwb2ludHM6W2EsYyxkLGVdLHR5cGU6Yi5HcmFwaGljcy5SRUNUfSx0aGlzLmdyYXBoaWNzRGF0YS5wdXNoKHRoaXMuY3VycmVudFBhdGgpLHRoaXMuZGlydHk9ITAsdGhpc30sYi5HcmFwaGljcy5wcm90b3R5cGUuZHJhd1JvdW5kZWRSZWN0PWZ1bmN0aW9uKGEsYyxkLGUsZil7cmV0dXJuIHRoaXMuY3VycmVudFBhdGgucG9pbnRzLmxlbmd0aHx8dGhpcy5ncmFwaGljc0RhdGEucG9wKCksdGhpcy5jdXJyZW50UGF0aD17bGluZVdpZHRoOnRoaXMubGluZVdpZHRoLGxpbmVDb2xvcjp0aGlzLmxpbmVDb2xvcixsaW5lQWxwaGE6dGhpcy5saW5lQWxwaGEsZmlsbENvbG9yOnRoaXMuZmlsbENvbG9yLGZpbGxBbHBoYTp0aGlzLmZpbGxBbHBoYSxmaWxsOnRoaXMuZmlsbGluZyxwb2ludHM6W2EsYyxkLGUsZl0sdHlwZTpiLkdyYXBoaWNzLlJSRUN9LHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2godGhpcy5jdXJyZW50UGF0aCksdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3Q2lyY2xlPWZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4gdGhpcy5jdXJyZW50UGF0aC5wb2ludHMubGVuZ3RofHx0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKSx0aGlzLmN1cnJlbnRQYXRoPXtsaW5lV2lkdGg6dGhpcy5saW5lV2lkdGgsbGluZUNvbG9yOnRoaXMubGluZUNvbG9yLGxpbmVBbHBoYTp0aGlzLmxpbmVBbHBoYSxmaWxsQ29sb3I6dGhpcy5maWxsQ29sb3IsZmlsbEFscGhhOnRoaXMuZmlsbEFscGhhLGZpbGw6dGhpcy5maWxsaW5nLHBvaW50czpbYSxjLGQsZF0sdHlwZTpiLkdyYXBoaWNzLkNJUkN9LHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2godGhpcy5jdXJyZW50UGF0aCksdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5kcmF3RWxsaXBzZT1mdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gdGhpcy5jdXJyZW50UGF0aC5wb2ludHMubGVuZ3RofHx0aGlzLmdyYXBoaWNzRGF0YS5wb3AoKSx0aGlzLmN1cnJlbnRQYXRoPXtsaW5lV2lkdGg6dGhpcy5saW5lV2lkdGgsbGluZUNvbG9yOnRoaXMubGluZUNvbG9yLGxpbmVBbHBoYTp0aGlzLmxpbmVBbHBoYSxmaWxsQ29sb3I6dGhpcy5maWxsQ29sb3IsZmlsbEFscGhhOnRoaXMuZmlsbEFscGhhLGZpbGw6dGhpcy5maWxsaW5nLHBvaW50czpbYSxjLGQsZV0sdHlwZTpiLkdyYXBoaWNzLkVMSVB9LHRoaXMuZ3JhcGhpY3NEYXRhLnB1c2godGhpcy5jdXJyZW50UGF0aCksdGhpcy5kaXJ0eT0hMCx0aGlzfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmxpbmVXaWR0aD0wLHRoaXMuZmlsbGluZz0hMSx0aGlzLmRpcnR5PSEwLHRoaXMuY2xlYXJEaXJ0eT0hMCx0aGlzLmdyYXBoaWNzRGF0YT1bXSx0aGlzLmJvdW5kcz1udWxsLHRoaXN9LGIuR3JhcGhpY3MucHJvdG90eXBlLmdlbmVyYXRlVGV4dHVyZT1mdW5jdGlvbigpe3ZhciBhPXRoaXMuZ2V0Qm91bmRzKCksYz1uZXcgYi5DYW52YXNCdWZmZXIoYS53aWR0aCxhLmhlaWdodCksZD1iLlRleHR1cmUuZnJvbUNhbnZhcyhjLmNhbnZhcyk7cmV0dXJuIGMuY29udGV4dC50cmFuc2xhdGUoLWEueCwtYS55KSxiLkNhbnZhc0dyYXBoaWNzLnJlbmRlckdyYXBoaWNzKHRoaXMsYy5jb250ZXh0KSxkfSxiLkdyYXBoaWNzLnByb3RvdHlwZS5fcmVuZGVyV2ViR0w9ZnVuY3Rpb24oYSl7aWYodGhpcy52aXNpYmxlIT09ITEmJjAhPT10aGlzLmFscGhhJiZ0aGlzLmlzTWFzayE9PSEwKXtpZih0aGlzLl9jYWNoZUFzQml0bWFwKXJldHVybiB0aGlzLmRpcnR5JiYodGhpcy5fZ2VuZXJhdGVDYWNoZWRTcHJpdGUoKSxiLnVwZGF0ZVdlYkdMVGV4dHVyZSh0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5iYXNlVGV4dHVyZSxhLmdsKSx0aGlzLmRpcnR5PSExKSx0aGlzLl9jYWNoZWRTcHJpdGUuYWxwaGE9dGhpcy5hbHBoYSxiLlNwcml0ZS5wcm90b3R5cGUuX3JlbmRlcldlYkdMLmNhbGwodGhpcy5fY2FjaGVkU3ByaXRlLGEpLHZvaWQgMDtpZihhLnNwcml0ZUJhdGNoLnN0b3AoKSxhLmJsZW5kTW9kZU1hbmFnZXIuc2V0QmxlbmRNb2RlKHRoaXMuYmxlbmRNb2RlKSx0aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssYSksdGhpcy5fZmlsdGVycyYmYS5maWx0ZXJNYW5hZ2VyLnB1c2hGaWx0ZXIodGhpcy5fZmlsdGVyQmxvY2spLHRoaXMuYmxlbmRNb2RlIT09YS5zcHJpdGVCYXRjaC5jdXJyZW50QmxlbmRNb2RlKXthLnNwcml0ZUJhdGNoLmN1cnJlbnRCbGVuZE1vZGU9dGhpcy5ibGVuZE1vZGU7dmFyIGM9Yi5ibGVuZE1vZGVzV2ViR0xbYS5zcHJpdGVCYXRjaC5jdXJyZW50QmxlbmRNb2RlXTthLnNwcml0ZUJhdGNoLmdsLmJsZW5kRnVuYyhjWzBdLGNbMV0pfWlmKGIuV2ViR0xHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLGEpLHRoaXMuY2hpbGRyZW4ubGVuZ3RoKXthLnNwcml0ZUJhdGNoLnN0YXJ0KCk7Zm9yKHZhciBkPTAsZT10aGlzLmNoaWxkcmVuLmxlbmd0aDtlPmQ7ZCsrKXRoaXMuY2hpbGRyZW5bZF0uX3JlbmRlcldlYkdMKGEpO2Euc3ByaXRlQmF0Y2guc3RvcCgpfXRoaXMuX2ZpbHRlcnMmJmEuZmlsdGVyTWFuYWdlci5wb3BGaWx0ZXIoKSx0aGlzLl9tYXNrJiZhLm1hc2tNYW5hZ2VyLnBvcE1hc2sodGhpcy5tYXNrLGEpLGEuZHJhd0NvdW50KyssYS5zcHJpdGVCYXRjaC5zdGFydCgpfX0sYi5HcmFwaGljcy5wcm90b3R5cGUuX3JlbmRlckNhbnZhcz1mdW5jdGlvbihhKXtpZih0aGlzLnZpc2libGUhPT0hMSYmMCE9PXRoaXMuYWxwaGEmJnRoaXMuaXNNYXNrIT09ITApe3ZhciBjPWEuY29udGV4dCxkPXRoaXMud29ybGRUcmFuc2Zvcm07dGhpcy5ibGVuZE1vZGUhPT1hLmN1cnJlbnRCbGVuZE1vZGUmJihhLmN1cnJlbnRCbGVuZE1vZGU9dGhpcy5ibGVuZE1vZGUsYy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249Yi5ibGVuZE1vZGVzQ2FudmFzW2EuY3VycmVudEJsZW5kTW9kZV0pLHRoaXMuX21hc2smJmEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzayxhLmNvbnRleHQpLGMuc2V0VHJhbnNmb3JtKGQuYSxkLmMsZC5iLGQuZCxkLnR4LGQudHkpLGIuQ2FudmFzR3JhcGhpY3MucmVuZGVyR3JhcGhpY3ModGhpcyxjKTtmb3IodmFyIGU9MCxmPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2Y+ZTtlKyspdGhpcy5jaGlsZHJlbltlXS5fcmVuZGVyQ2FudmFzKGEpO3RoaXMuX21hc2smJmEubWFza01hbmFnZXIucG9wTWFzayhhLmNvbnRleHQpfX0sYi5HcmFwaGljcy5wcm90b3R5cGUuZ2V0Qm91bmRzPWZ1bmN0aW9uKGEpe3RoaXMuYm91bmRzfHx0aGlzLnVwZGF0ZUJvdW5kcygpO3ZhciBiPXRoaXMuYm91bmRzLngsYz10aGlzLmJvdW5kcy53aWR0aCt0aGlzLmJvdW5kcy54LGQ9dGhpcy5ib3VuZHMueSxlPXRoaXMuYm91bmRzLmhlaWdodCt0aGlzLmJvdW5kcy55LGY9YXx8dGhpcy53b3JsZFRyYW5zZm9ybSxnPWYuYSxoPWYuYyxpPWYuYixqPWYuZCxrPWYudHgsbD1mLnR5LG09ZypjK2kqZStrLG49aiplK2gqYytsLG89ZypiK2kqZStrLHA9aiplK2gqYitsLHE9ZypiK2kqZCtrLHI9aipkK2gqYitsLHM9ZypjK2kqZCtrLHQ9aipkK2gqYytsLHU9bSx2PW4sdz1tLHg9bjt3PXc+bz9vOncsdz13PnE/cTp3LHc9dz5zP3M6dyx4PXg+cD9wOngseD14PnI/cjp4LHg9eD50P3Q6eCx1PW8+dT9vOnUsdT1xPnU/cTp1LHU9cz51P3M6dSx2PXA+dj9wOnYsdj1yPnY/cjp2LHY9dD52P3Q6djt2YXIgeT10aGlzLl9ib3VuZHM7cmV0dXJuIHkueD13LHkud2lkdGg9dS13LHkueT14LHkuaGVpZ2h0PXYteCx5fSxiLkdyYXBoaWNzLnByb3RvdHlwZS51cGRhdGVCb3VuZHM9ZnVuY3Rpb24oKXtmb3IodmFyIGEsYyxkLGUsZixnPTEvMCxoPS0xLzAsaT0xLzAsaj0tMS8wLGs9MDtrPHRoaXMuZ3JhcGhpY3NEYXRhLmxlbmd0aDtrKyspe3ZhciBsPXRoaXMuZ3JhcGhpY3NEYXRhW2tdLG09bC50eXBlLG49bC5saW5lV2lkdGg7aWYoYT1sLnBvaW50cyxtPT09Yi5HcmFwaGljcy5SRUNUKWM9YVswXS1uLzIsZD1hWzFdLW4vMixlPWFbMl0rbixmPWFbM10rbixnPWc+Yz9jOmcsaD1jK2U+aD9jK2U6aCxpPWk+ZD9jOmksaj1kK2Y+aj9kK2Y6ajtlbHNlIGlmKG09PT1iLkdyYXBoaWNzLkNJUkN8fG09PT1iLkdyYXBoaWNzLkVMSVApYz1hWzBdLGQ9YVsxXSxlPWFbMl0rbi8yLGY9YVszXStuLzIsZz1nPmMtZT9jLWU6ZyxoPWMrZT5oP2MrZTpoLGk9aT5kLWY/ZC1mOmksaj1kK2Y+aj9kK2Y6ajtlbHNlIGZvcih2YXIgbz0wO288YS5sZW5ndGg7bys9MiljPWFbb10sZD1hW28rMV0sZz1nPmMtbj9jLW46ZyxoPWMrbj5oP2MrbjpoLGk9aT5kLW4/ZC1uOmksaj1kK24+aj9kK246an12YXIgcD10aGlzLmJvdW5kc1BhZGRpbmc7dGhpcy5ib3VuZHM9bmV3IGIuUmVjdGFuZ2xlKGctcCxpLXAsaC1nKzIqcCxqLWkrMipwKX0sYi5HcmFwaGljcy5wcm90b3R5cGUuX2dlbmVyYXRlQ2FjaGVkU3ByaXRlPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5nZXRMb2NhbEJvdW5kcygpO2lmKHRoaXMuX2NhY2hlZFNwcml0ZSl0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLnJlc2l6ZShhLndpZHRoLGEuaGVpZ2h0KTtlbHNle3ZhciBjPW5ldyBiLkNhbnZhc0J1ZmZlcihhLndpZHRoLGEuaGVpZ2h0KSxkPWIuVGV4dHVyZS5mcm9tQ2FudmFzKGMuY2FudmFzKTt0aGlzLl9jYWNoZWRTcHJpdGU9bmV3IGIuU3ByaXRlKGQpLHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXI9Yyx0aGlzLl9jYWNoZWRTcHJpdGUud29ybGRUcmFuc2Zvcm09dGhpcy53b3JsZFRyYW5zZm9ybX10aGlzLl9jYWNoZWRTcHJpdGUuYW5jaG9yLng9LShhLngvYS53aWR0aCksdGhpcy5fY2FjaGVkU3ByaXRlLmFuY2hvci55PS0oYS55L2EuaGVpZ2h0KSx0aGlzLl9jYWNoZWRTcHJpdGUuYnVmZmVyLmNvbnRleHQudHJhbnNsYXRlKC1hLngsLWEueSksYi5DYW52YXNHcmFwaGljcy5yZW5kZXJHcmFwaGljcyh0aGlzLHRoaXMuX2NhY2hlZFNwcml0ZS5idWZmZXIuY29udGV4dCksdGhpcy5fY2FjaGVkU3ByaXRlLmFscGhhPXRoaXMuYWxwaGF9LGIuR3JhcGhpY3MucHJvdG90eXBlLmRlc3Ryb3lDYWNoZWRTcHJpdGU9ZnVuY3Rpb24oKXt0aGlzLl9jYWNoZWRTcHJpdGUudGV4dHVyZS5kZXN0cm95KCEwKSx0aGlzLl9jYWNoZWRTcHJpdGU9bnVsbH0sYi5HcmFwaGljcy5QT0xZPTAsYi5HcmFwaGljcy5SRUNUPTEsYi5HcmFwaGljcy5DSVJDPTIsYi5HcmFwaGljcy5FTElQPTMsYi5HcmFwaGljcy5SUkVDPTQsYi5TdHJpcD1mdW5jdGlvbihhKXtiLkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKSx0aGlzLnRleHR1cmU9YSx0aGlzLnV2cz1uZXcgYi5GbG9hdDMyQXJyYXkoWzAsMSwxLDEsMSwwLDAsMV0pLHRoaXMudmVydGljaWVzPW5ldyBiLkZsb2F0MzJBcnJheShbMCwwLDEwMCwwLDEwMCwxMDAsMCwxMDBdKSx0aGlzLmNvbG9ycz1uZXcgYi5GbG9hdDMyQXJyYXkoWzEsMSwxLDFdKSx0aGlzLmluZGljZXM9bmV3IGIuVWludDE2QXJyYXkoWzAsMSwyLDNdKSx0aGlzLmRpcnR5PSEwfSxiLlN0cmlwLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpLGIuU3RyaXAucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuU3RyaXAsYi5TdHJpcC5wcm90b3R5cGUuX3JlbmRlcldlYkdMPWZ1bmN0aW9uKGEpeyF0aGlzLnZpc2libGV8fHRoaXMuYWxwaGE8PTB8fChhLnNwcml0ZUJhdGNoLnN0b3AoKSx0aGlzLl92ZXJ0ZXhCdWZmZXJ8fHRoaXMuX2luaXRXZWJHTChhKSxhLnNoYWRlck1hbmFnZXIuc2V0U2hhZGVyKGEuc2hhZGVyTWFuYWdlci5zdHJpcFNoYWRlciksdGhpcy5fcmVuZGVyU3RyaXAoYSksYS5zcHJpdGVCYXRjaC5zdGFydCgpKX0sYi5TdHJpcC5wcm90b3R5cGUuX2luaXRXZWJHTD1mdW5jdGlvbihhKXt2YXIgYj1hLmdsO3RoaXMuX3ZlcnRleEJ1ZmZlcj1iLmNyZWF0ZUJ1ZmZlcigpLHRoaXMuX2luZGV4QnVmZmVyPWIuY3JlYXRlQnVmZmVyKCksdGhpcy5fdXZCdWZmZXI9Yi5jcmVhdGVCdWZmZXIoKSx0aGlzLl9jb2xvckJ1ZmZlcj1iLmNyZWF0ZUJ1ZmZlcigpLGIuYmluZEJ1ZmZlcihiLkFSUkFZX0JVRkZFUix0aGlzLl92ZXJ0ZXhCdWZmZXIpLGIuYnVmZmVyRGF0YShiLkFSUkFZX0JVRkZFUix0aGlzLnZlcnRpY2llcyxiLkRZTkFNSUNfRFJBVyksYi5iaW5kQnVmZmVyKGIuQVJSQVlfQlVGRkVSLHRoaXMuX3V2QnVmZmVyKSxiLmJ1ZmZlckRhdGEoYi5BUlJBWV9CVUZGRVIsdGhpcy51dnMsYi5TVEFUSUNfRFJBVyksYi5iaW5kQnVmZmVyKGIuQVJSQVlfQlVGRkVSLHRoaXMuX2NvbG9yQnVmZmVyKSxiLmJ1ZmZlckRhdGEoYi5BUlJBWV9CVUZGRVIsdGhpcy5jb2xvcnMsYi5TVEFUSUNfRFJBVyksYi5iaW5kQnVmZmVyKGIuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5faW5kZXhCdWZmZXIpLGIuYnVmZmVyRGF0YShiLkVMRU1FTlRfQVJSQVlfQlVGRkVSLHRoaXMuaW5kaWNlcyxiLlNUQVRJQ19EUkFXKX0sYi5TdHJpcC5wcm90b3R5cGUuX3JlbmRlclN0cmlwPWZ1bmN0aW9uKGEpe3ZhciBjPWEuZ2wsZD1hLnByb2plY3Rpb24sZT1hLm9mZnNldCxmPWEuc2hhZGVyTWFuYWdlci5zdHJpcFNoYWRlcjtjLmJsZW5kRnVuYyhjLk9ORSxjLk9ORV9NSU5VU19TUkNfQUxQSEEpLGMudW5pZm9ybU1hdHJpeDNmdihmLnRyYW5zbGF0aW9uTWF0cml4LCExLHRoaXMud29ybGRUcmFuc2Zvcm0udG9BcnJheSghMCkpLGMudW5pZm9ybTJmKGYucHJvamVjdGlvblZlY3RvcixkLngsLWQueSksYy51bmlmb3JtMmYoZi5vZmZzZXRWZWN0b3IsLWUueCwtZS55KSxjLnVuaWZvcm0xZihmLmFscGhhLDEpLHRoaXMuZGlydHk/KHRoaXMuZGlydHk9ITEsYy5iaW5kQnVmZmVyKGMuQVJSQVlfQlVGRkVSLHRoaXMuX3ZlcnRleEJ1ZmZlciksYy5idWZmZXJEYXRhKGMuQVJSQVlfQlVGRkVSLHRoaXMudmVydGljaWVzLGMuU1RBVElDX0RSQVcpLGMudmVydGV4QXR0cmliUG9pbnRlcihmLmFWZXJ0ZXhQb3NpdGlvbiwyLGMuRkxPQVQsITEsMCwwKSxjLmJpbmRCdWZmZXIoYy5BUlJBWV9CVUZGRVIsdGhpcy5fdXZCdWZmZXIpLGMuYnVmZmVyRGF0YShjLkFSUkFZX0JVRkZFUix0aGlzLnV2cyxjLlNUQVRJQ19EUkFXKSxjLnZlcnRleEF0dHJpYlBvaW50ZXIoZi5hVGV4dHVyZUNvb3JkLDIsYy5GTE9BVCwhMSwwLDApLGMuYWN0aXZlVGV4dHVyZShjLlRFWFRVUkUwKSxjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCx0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuX2dsVGV4dHVyZXNbYy5pZF18fGIuY3JlYXRlV2ViR0xUZXh0dXJlKHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZSxjKSksYy5iaW5kQnVmZmVyKGMuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5faW5kZXhCdWZmZXIpLGMuYnVmZmVyRGF0YShjLkVMRU1FTlRfQVJSQVlfQlVGRkVSLHRoaXMuaW5kaWNlcyxjLlNUQVRJQ19EUkFXKSk6KGMuYmluZEJ1ZmZlcihjLkFSUkFZX0JVRkZFUix0aGlzLl92ZXJ0ZXhCdWZmZXIpLGMuYnVmZmVyU3ViRGF0YShjLkFSUkFZX0JVRkZFUiwwLHRoaXMudmVydGljaWVzKSxjLnZlcnRleEF0dHJpYlBvaW50ZXIoZi5hVmVydGV4UG9zaXRpb24sMixjLkZMT0FULCExLDAsMCksYy5iaW5kQnVmZmVyKGMuQVJSQVlfQlVGRkVSLHRoaXMuX3V2QnVmZmVyKSxjLnZlcnRleEF0dHJpYlBvaW50ZXIoZi5hVGV4dHVyZUNvb3JkLDIsYy5GTE9BVCwhMSwwLDApLGMuYWN0aXZlVGV4dHVyZShjLlRFWFRVUkUwKSxjLmJpbmRUZXh0dXJlKGMuVEVYVFVSRV8yRCx0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuX2dsVGV4dHVyZXNbYy5pZF18fGIuY3JlYXRlV2ViR0xUZXh0dXJlKHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZSxjKSksYy5iaW5kQnVmZmVyKGMuRUxFTUVOVF9BUlJBWV9CVUZGRVIsdGhpcy5faW5kZXhCdWZmZXIpKSxjLmRyYXdFbGVtZW50cyhjLlRSSUFOR0xFX1NUUklQLHRoaXMuaW5kaWNlcy5sZW5ndGgsYy5VTlNJR05FRF9TSE9SVCwwKX0sYi5TdHJpcC5wcm90b3R5cGUuX3JlbmRlckNhbnZhcz1mdW5jdGlvbihhKXt2YXIgYj1hLmNvbnRleHQsYz10aGlzLndvcmxkVHJhbnNmb3JtO2Eucm91bmRQaXhlbHM/Yi5zZXRUcmFuc2Zvcm0oYy5hLGMuYyxjLmIsYy5kLDB8Yy50eCwwfGMudHkpOmIuc2V0VHJhbnNmb3JtKGMuYSxjLmMsYy5iLGMuZCxjLnR4LGMudHkpO3ZhciBkPXRoaXMsZT1kLnZlcnRpY2llcyxmPWQudXZzLGc9ZS5sZW5ndGgvMjt0aGlzLmNvdW50Kys7Zm9yKHZhciBoPTA7Zy0yPmg7aCsrKXt2YXIgaT0yKmgsaj1lW2ldLGs9ZVtpKzJdLGw9ZVtpKzRdLG09ZVtpKzFdLG49ZVtpKzNdLG89ZVtpKzVdLHA9KGoraytsKS8zLHE9KG0rbitvKS8zLHI9ai1wLHM9bS1xLHQ9TWF0aC5zcXJ0KHIqcitzKnMpO2o9cCtyL3QqKHQrMyksbT1xK3MvdCoodCszKSxyPWstcCxzPW4tcSx0PU1hdGguc3FydChyKnIrcypzKSxrPXArci90Kih0KzMpLG49cStzL3QqKHQrMykscj1sLXAscz1vLXEsdD1NYXRoLnNxcnQocipyK3MqcyksbD1wK3IvdCoodCszKSxvPXErcy90Kih0KzMpO3ZhciB1PWZbaV0qZC50ZXh0dXJlLndpZHRoLHY9ZltpKzJdKmQudGV4dHVyZS53aWR0aCx3PWZbaSs0XSpkLnRleHR1cmUud2lkdGgseD1mW2krMV0qZC50ZXh0dXJlLmhlaWdodCx5PWZbaSszXSpkLnRleHR1cmUuaGVpZ2h0LHo9ZltpKzVdKmQudGV4dHVyZS5oZWlnaHQ7Yi5zYXZlKCksYi5iZWdpblBhdGgoKSxiLm1vdmVUbyhqLG0pLGIubGluZVRvKGssbiksYi5saW5lVG8obCxvKSxiLmNsb3NlUGF0aCgpLGIuY2xpcCgpO3ZhciBBPXUqeSt4Kncrdip6LXkqdy14KnYtdSp6LEI9aip5K3gqbCtrKnoteSpsLXgqay1qKnosQz11Kmsraip3K3YqbC1rKnctaip2LXUqbCxEPXUqeSpsK3gqayp3K2oqdip6LWoqeSp3LXgqdipsLXUqayp6LEU9bSp5K3gqbytuKnoteSpvLXgqbi1tKnosRj11Km4rbSp3K3Yqby1uKnctbSp2LXUqbyxHPXUqeSpvK3gqbip3K20qdip6LW0qeSp3LXgqdipvLXUqbip6O2IudHJhbnNmb3JtKEIvQSxFL0EsQy9BLEYvQSxEL0EsRy9BKSxiLmRyYXdJbWFnZShkLnRleHR1cmUuYmFzZVRleHR1cmUuc291cmNlLDAsMCksYi5yZXN0b3JlKCl9fSxiLlN0cmlwLnByb3RvdHlwZS5vblRleHR1cmVVcGRhdGU9ZnVuY3Rpb24oKXt0aGlzLnVwZGF0ZUZyYW1lPSEwfSxiLlJvcGU9ZnVuY3Rpb24oYSxjKXtiLlN0cmlwLmNhbGwodGhpcyxhKSx0aGlzLnBvaW50cz1jLHRoaXMudmVydGljaWVzPW5ldyBiLkZsb2F0MzJBcnJheSg0KmMubGVuZ3RoKSx0aGlzLnV2cz1uZXcgYi5GbG9hdDMyQXJyYXkoNCpjLmxlbmd0aCksdGhpcy5jb2xvcnM9bmV3IGIuRmxvYXQzMkFycmF5KDIqYy5sZW5ndGgpLHRoaXMuaW5kaWNlcz1uZXcgYi5VaW50MTZBcnJheSgyKmMubGVuZ3RoKSx0aGlzLnJlZnJlc2goKX0sYi5Sb3BlLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuU3RyaXAucHJvdG90eXBlKSxiLlJvcGUucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuUm9wZSxiLlJvcGUucHJvdG90eXBlLnJlZnJlc2g9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnBvaW50cztpZighKGEubGVuZ3RoPDEpKXt2YXIgYj10aGlzLnV2cyxjPWFbMF0sZD10aGlzLmluZGljZXMsZT10aGlzLmNvbG9yczt0aGlzLmNvdW50LT0uMixiWzBdPTAsYlsxXT0wLGJbMl09MCxiWzNdPTEsZVswXT0xLGVbMV09MSxkWzBdPTAsZFsxXT0xO2Zvcih2YXIgZixnLGgsaT1hLmxlbmd0aCxqPTE7aT5qO2orKylmPWFbal0sZz00KmosaD1qLyhpLTEpLGolMj8oYltnXT1oLGJbZysxXT0wLGJbZysyXT1oLGJbZyszXT0xKTooYltnXT1oLGJbZysxXT0wLGJbZysyXT1oLGJbZyszXT0xKSxnPTIqaixlW2ddPTEsZVtnKzFdPTEsZz0yKmosZFtnXT1nLGRbZysxXT1nKzEsYz1mfX0sYi5Sb3BlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm09ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnBvaW50cztpZighKGEubGVuZ3RoPDEpKXt2YXIgYyxkPWFbMF0sZT17eDowLHk6MH07dGhpcy5jb3VudC09LjI7Zm9yKHZhciBmLGcsaCxpLGosaz10aGlzLnZlcnRpY2llcyxsPWEubGVuZ3RoLG09MDtsPm07bSsrKWY9YVttXSxnPTQqbSxjPW08YS5sZW5ndGgtMT9hW20rMV06ZixlLnk9LShjLngtZC54KSxlLng9Yy55LWQueSxoPTEwKigxLW0vKGwtMSkpLGg+MSYmKGg9MSksaT1NYXRoLnNxcnQoZS54KmUueCtlLnkqZS55KSxqPXRoaXMudGV4dHVyZS5oZWlnaHQvMixlLngvPWksZS55Lz1pLGUueCo9aixlLnkqPWosa1tnXT1mLngrZS54LGtbZysxXT1mLnkrZS55LGtbZysyXT1mLngtZS54LGtbZyszXT1mLnktZS55LGQ9ZjtiLkRpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnVwZGF0ZVRyYW5zZm9ybS5jYWxsKHRoaXMpfX0sYi5Sb3BlLnByb3RvdHlwZS5zZXRUZXh0dXJlPWZ1bmN0aW9uKGEpe3RoaXMudGV4dHVyZT1hfSxiLlRpbGluZ1Nwcml0ZT1mdW5jdGlvbihhLGMsZCl7Yi5TcHJpdGUuY2FsbCh0aGlzLGEpLHRoaXMuX3dpZHRoPWN8fDEwMCx0aGlzLl9oZWlnaHQ9ZHx8MTAwLHRoaXMudGlsZVNjYWxlPW5ldyBiLlBvaW50KDEsMSksdGhpcy50aWxlU2NhbGVPZmZzZXQ9bmV3IGIuUG9pbnQoMSwxKSx0aGlzLnRpbGVQb3NpdGlvbj1uZXcgYi5Qb2ludCgwLDApLHRoaXMucmVuZGVyYWJsZT0hMCx0aGlzLnRpbnQ9MTY3NzcyMTUsdGhpcy5ibGVuZE1vZGU9Yi5ibGVuZE1vZGVzLk5PUk1BTH0sYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5TcHJpdGUucHJvdG90eXBlKSxiLlRpbGluZ1Nwcml0ZS5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5UaWxpbmdTcHJpdGUsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSxcIndpZHRoXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl93aWR0aH0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuX3dpZHRoPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuVGlsaW5nU3ByaXRlLnByb3RvdHlwZSxcImhlaWdodFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5faGVpZ2h0fSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5faGVpZ2h0PWF9fSksYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLnNldFRleHR1cmU9ZnVuY3Rpb24oYSl7dGhpcy50ZXh0dXJlIT09YSYmKHRoaXMudGV4dHVyZT1hLHRoaXMucmVmcmVzaFRleHR1cmU9ITAsdGhpcy5jYWNoZWRUaW50PTE2Nzc3MjE1KX0sYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLl9yZW5kZXJXZWJHTD1mdW5jdGlvbihhKXtpZih0aGlzLnZpc2libGUhPT0hMSYmMCE9PXRoaXMuYWxwaGEpe3ZhciBjLGQ7Zm9yKHRoaXMuX21hc2smJihhLnNwcml0ZUJhdGNoLnN0b3AoKSxhLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMubWFzayxhKSxhLnNwcml0ZUJhdGNoLnN0YXJ0KCkpLHRoaXMuX2ZpbHRlcnMmJihhLnNwcml0ZUJhdGNoLmZsdXNoKCksYS5maWx0ZXJNYW5hZ2VyLnB1c2hGaWx0ZXIodGhpcy5fZmlsdGVyQmxvY2spKSwhdGhpcy50aWxpbmdUZXh0dXJlfHx0aGlzLnJlZnJlc2hUZXh0dXJlPyh0aGlzLmdlbmVyYXRlVGlsaW5nVGV4dHVyZSghMCksdGhpcy50aWxpbmdUZXh0dXJlJiZ0aGlzLnRpbGluZ1RleHR1cmUubmVlZHNVcGRhdGUmJihiLnVwZGF0ZVdlYkdMVGV4dHVyZSh0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUsYS5nbCksdGhpcy50aWxpbmdUZXh0dXJlLm5lZWRzVXBkYXRlPSExKSk6YS5zcHJpdGVCYXRjaC5yZW5kZXJUaWxpbmdTcHJpdGUodGhpcyksYz0wLGQ9dGhpcy5jaGlsZHJlbi5sZW5ndGg7ZD5jO2MrKyl0aGlzLmNoaWxkcmVuW2NdLl9yZW5kZXJXZWJHTChhKTthLnNwcml0ZUJhdGNoLnN0b3AoKSx0aGlzLl9maWx0ZXJzJiZhLmZpbHRlck1hbmFnZXIucG9wRmlsdGVyKCksdGhpcy5fbWFzayYmYS5tYXNrTWFuYWdlci5wb3BNYXNrKGEpLGEuc3ByaXRlQmF0Y2guc3RhcnQoKX19LGIuVGlsaW5nU3ByaXRlLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzPWZ1bmN0aW9uKGEpe2lmKHRoaXMudmlzaWJsZSE9PSExJiYwIT09dGhpcy5hbHBoYSl7dmFyIGM9YS5jb250ZXh0O3RoaXMuX21hc2smJmEubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzayxjKSxjLmdsb2JhbEFscGhhPXRoaXMud29ybGRBbHBoYTt2YXIgZCxlLGY9dGhpcy53b3JsZFRyYW5zZm9ybTtpZihjLnNldFRyYW5zZm9ybShmLmEsZi5jLGYuYixmLmQsZi50eCxmLnR5KSwhdGhpcy5fX3RpbGVQYXR0ZXJufHx0aGlzLnJlZnJlc2hUZXh0dXJlKXtpZih0aGlzLmdlbmVyYXRlVGlsaW5nVGV4dHVyZSghMSksIXRoaXMudGlsaW5nVGV4dHVyZSlyZXR1cm47dGhpcy5fX3RpbGVQYXR0ZXJuPWMuY3JlYXRlUGF0dGVybih0aGlzLnRpbGluZ1RleHR1cmUuYmFzZVRleHR1cmUuc291cmNlLFwicmVwZWF0XCIpfXRoaXMuYmxlbmRNb2RlIT09YS5jdXJyZW50QmxlbmRNb2RlJiYoYS5jdXJyZW50QmxlbmRNb2RlPXRoaXMuYmxlbmRNb2RlLGMuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPWIuYmxlbmRNb2Rlc0NhbnZhc1thLmN1cnJlbnRCbGVuZE1vZGVdKTt2YXIgZz10aGlzLnRpbGVQb3NpdGlvbixoPXRoaXMudGlsZVNjYWxlO2ZvcihnLnglPXRoaXMudGlsaW5nVGV4dHVyZS5iYXNlVGV4dHVyZS53aWR0aCxnLnklPXRoaXMudGlsaW5nVGV4dHVyZS5iYXNlVGV4dHVyZS5oZWlnaHQsYy5zY2FsZShoLngsaC55KSxjLnRyYW5zbGF0ZShnLngsZy55KSxjLmZpbGxTdHlsZT10aGlzLl9fdGlsZVBhdHRlcm4sYy5maWxsUmVjdCgtZy54K3RoaXMuYW5jaG9yLngqLXRoaXMuX3dpZHRoLC1nLnkrdGhpcy5hbmNob3IueSotdGhpcy5faGVpZ2h0LHRoaXMuX3dpZHRoL2gueCx0aGlzLl9oZWlnaHQvaC55KSxjLnNjYWxlKDEvaC54LDEvaC55KSxjLnRyYW5zbGF0ZSgtZy54LC1nLnkpLHRoaXMuX21hc2smJmEubWFza01hbmFnZXIucG9wTWFzayhhLmNvbnRleHQpLGQ9MCxlPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO2U+ZDtkKyspdGhpcy5jaGlsZHJlbltkXS5fcmVuZGVyQ2FudmFzKGEpfX0sYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdldEJvdW5kcz1mdW5jdGlvbigpe3ZhciBhPXRoaXMuX3dpZHRoLGI9dGhpcy5faGVpZ2h0LGM9YSooMS10aGlzLmFuY2hvci54KSxkPWEqLXRoaXMuYW5jaG9yLngsZT1iKigxLXRoaXMuYW5jaG9yLnkpLGY9YiotdGhpcy5hbmNob3IueSxnPXRoaXMud29ybGRUcmFuc2Zvcm0saD1nLmEsaT1nLmMsaj1nLmIsaz1nLmQsbD1nLnR4LG09Zy50eSxuPWgqZCtqKmYrbCxvPWsqZitpKmQrbSxwPWgqYytqKmYrbCxxPWsqZitpKmMrbSxyPWgqYytqKmUrbCxzPWsqZStpKmMrbSx0PWgqZCtqKmUrbCx1PWsqZStpKmQrbSx2PS0xLzAsdz0tMS8wLHg9MS8wLHk9MS8wO3g9eD5uP246eCx4PXg+cD9wOngseD14PnI/cjp4LHg9eD50P3Q6eCx5PXk+bz9vOnkseT15PnE/cTp5LHk9eT5zP3M6eSx5PXk+dT91Onksdj1uPnY/bjp2LHY9cD52P3A6dix2PXI+dj9yOnYsdj10PnY/dDp2LHc9bz53P286dyx3PXE+dz9xOncsdz1zPnc/czp3LHc9dT53P3U6dzt2YXIgej10aGlzLl9ib3VuZHM7cmV0dXJuIHoueD14LHoud2lkdGg9di14LHoueT15LHouaGVpZ2h0PXcteSx0aGlzLl9jdXJyZW50Qm91bmRzPXosen0sYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLm9uVGV4dHVyZVVwZGF0ZT1mdW5jdGlvbigpe30sYi5UaWxpbmdTcHJpdGUucHJvdG90eXBlLmdlbmVyYXRlVGlsaW5nVGV4dHVyZT1mdW5jdGlvbihhKXtpZih0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuaGFzTG9hZGVkKXt2YXIgYyxkLGU9dGhpcy50ZXh0dXJlLGY9ZS5mcmFtZSxnPWYud2lkdGghPT1lLmJhc2VUZXh0dXJlLndpZHRofHxmLmhlaWdodCE9PWUuYmFzZVRleHR1cmUuaGVpZ2h0LGg9ITE7aWYoYT8oYz1iLmdldE5leHRQb3dlck9mVHdvKGYud2lkdGgpLGQ9Yi5nZXROZXh0UG93ZXJPZlR3byhmLmhlaWdodCksKGYud2lkdGghPT1jfHxmLmhlaWdodCE9PWQpJiYoaD0hMCkpOmcmJihjPWYud2lkdGgsZD1mLmhlaWdodCxoPSEwKSxoKXt2YXIgaTt0aGlzLnRpbGluZ1RleHR1cmUmJnRoaXMudGlsaW5nVGV4dHVyZS5pc1RpbGluZz8oaT10aGlzLnRpbGluZ1RleHR1cmUuY2FudmFzQnVmZmVyLGkucmVzaXplKGMsZCksdGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLndpZHRoPWMsdGhpcy50aWxpbmdUZXh0dXJlLmJhc2VUZXh0dXJlLmhlaWdodD1kLHRoaXMudGlsaW5nVGV4dHVyZS5uZWVkc1VwZGF0ZT0hMCk6KGk9bmV3IGIuQ2FudmFzQnVmZmVyKGMsZCksdGhpcy50aWxpbmdUZXh0dXJlPWIuVGV4dHVyZS5mcm9tQ2FudmFzKGkuY2FudmFzKSx0aGlzLnRpbGluZ1RleHR1cmUuY2FudmFzQnVmZmVyPWksdGhpcy50aWxpbmdUZXh0dXJlLmlzVGlsaW5nPSEwKSxpLmNvbnRleHQuZHJhd0ltYWdlKGUuYmFzZVRleHR1cmUuc291cmNlLGUuY3JvcC54LGUuY3JvcC55LGUuY3JvcC53aWR0aCxlLmNyb3AuaGVpZ2h0LDAsMCxjLGQpLHRoaXMudGlsZVNjYWxlT2Zmc2V0Lng9Zi53aWR0aC9jLHRoaXMudGlsZVNjYWxlT2Zmc2V0Lnk9Zi5oZWlnaHQvZH1lbHNlIHRoaXMudGlsaW5nVGV4dHVyZSYmdGhpcy50aWxpbmdUZXh0dXJlLmlzVGlsaW5nJiZ0aGlzLnRpbGluZ1RleHR1cmUuZGVzdHJveSghMCksdGhpcy50aWxlU2NhbGVPZmZzZXQueD0xLHRoaXMudGlsZVNjYWxlT2Zmc2V0Lnk9MSx0aGlzLnRpbGluZ1RleHR1cmU9ZTt0aGlzLnJlZnJlc2hUZXh0dXJlPSExLHRoaXMudGlsaW5nVGV4dHVyZS5iYXNlVGV4dHVyZS5fcG93ZXJPZjI9ITB9fTt2YXIgZj17fTtmLkJvbmVEYXRhPWZ1bmN0aW9uKGEsYil7dGhpcy5uYW1lPWEsdGhpcy5wYXJlbnQ9Yn0sZi5Cb25lRGF0YS5wcm90b3R5cGU9e2xlbmd0aDowLHg6MCx5OjAscm90YXRpb246MCxzY2FsZVg6MSxzY2FsZVk6MX0sZi5TbG90RGF0YT1mdW5jdGlvbihhLGIpe3RoaXMubmFtZT1hLHRoaXMuYm9uZURhdGE9Yn0sZi5TbG90RGF0YS5wcm90b3R5cGU9e3I6MSxnOjEsYjoxLGE6MSxhdHRhY2htZW50TmFtZTpudWxsfSxmLkJvbmU9ZnVuY3Rpb24oYSxiKXt0aGlzLmRhdGE9YSx0aGlzLnBhcmVudD1iLHRoaXMuc2V0VG9TZXR1cFBvc2UoKX0sZi5Cb25lLnlEb3duPSExLGYuQm9uZS5wcm90b3R5cGU9e3g6MCx5OjAscm90YXRpb246MCxzY2FsZVg6MSxzY2FsZVk6MSxtMDA6MCxtMDE6MCx3b3JsZFg6MCxtMTA6MCxtMTE6MCx3b3JsZFk6MCx3b3JsZFJvdGF0aW9uOjAsd29ybGRTY2FsZVg6MSx3b3JsZFNjYWxlWToxLHVwZGF0ZVdvcmxkVHJhbnNmb3JtOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5wYXJlbnQ7bnVsbCE9Yz8odGhpcy53b3JsZFg9dGhpcy54KmMubTAwK3RoaXMueSpjLm0wMStjLndvcmxkWCx0aGlzLndvcmxkWT10aGlzLngqYy5tMTArdGhpcy55KmMubTExK2Mud29ybGRZLHRoaXMud29ybGRTY2FsZVg9Yy53b3JsZFNjYWxlWCp0aGlzLnNjYWxlWCx0aGlzLndvcmxkU2NhbGVZPWMud29ybGRTY2FsZVkqdGhpcy5zY2FsZVksdGhpcy53b3JsZFJvdGF0aW9uPWMud29ybGRSb3RhdGlvbit0aGlzLnJvdGF0aW9uKToodGhpcy53b3JsZFg9dGhpcy54LHRoaXMud29ybGRZPXRoaXMueSx0aGlzLndvcmxkU2NhbGVYPXRoaXMuc2NhbGVYLHRoaXMud29ybGRTY2FsZVk9dGhpcy5zY2FsZVksdGhpcy53b3JsZFJvdGF0aW9uPXRoaXMucm90YXRpb24pO3ZhciBkPXRoaXMud29ybGRSb3RhdGlvbipNYXRoLlBJLzE4MCxlPU1hdGguY29zKGQpLGc9TWF0aC5zaW4oZCk7dGhpcy5tMDA9ZSp0aGlzLndvcmxkU2NhbGVYLHRoaXMubTEwPWcqdGhpcy53b3JsZFNjYWxlWCx0aGlzLm0wMT0tZyp0aGlzLndvcmxkU2NhbGVZLHRoaXMubTExPWUqdGhpcy53b3JsZFNjYWxlWSxhJiYodGhpcy5tMDA9LXRoaXMubTAwLHRoaXMubTAxPS10aGlzLm0wMSksYiYmKHRoaXMubTEwPS10aGlzLm0xMCx0aGlzLm0xMT0tdGhpcy5tMTEpLGYuQm9uZS55RG93biYmKHRoaXMubTEwPS10aGlzLm0xMCx0aGlzLm0xMT0tdGhpcy5tMTEpfSxzZXRUb1NldHVwUG9zZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YTt0aGlzLng9YS54LHRoaXMueT1hLnksdGhpcy5yb3RhdGlvbj1hLnJvdGF0aW9uLHRoaXMuc2NhbGVYPWEuc2NhbGVYLHRoaXMuc2NhbGVZPWEuc2NhbGVZfX0sZi5TbG90PWZ1bmN0aW9uKGEsYixjKXt0aGlzLmRhdGE9YSx0aGlzLnNrZWxldG9uPWIsdGhpcy5ib25lPWMsdGhpcy5zZXRUb1NldHVwUG9zZSgpfSxmLlNsb3QucHJvdG90eXBlPXtyOjEsZzoxLGI6MSxhOjEsX2F0dGFjaG1lbnRUaW1lOjAsYXR0YWNobWVudDpudWxsLHNldEF0dGFjaG1lbnQ6ZnVuY3Rpb24oYSl7dGhpcy5hdHRhY2htZW50PWEsdGhpcy5fYXR0YWNobWVudFRpbWU9dGhpcy5za2VsZXRvbi50aW1lfSxzZXRBdHRhY2htZW50VGltZTpmdW5jdGlvbihhKXt0aGlzLl9hdHRhY2htZW50VGltZT10aGlzLnNrZWxldG9uLnRpbWUtYX0sZ2V0QXR0YWNobWVudFRpbWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5za2VsZXRvbi50aW1lLXRoaXMuX2F0dGFjaG1lbnRUaW1lfSxzZXRUb1NldHVwUG9zZTpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZGF0YTt0aGlzLnI9YS5yLHRoaXMuZz1hLmcsdGhpcy5iPWEuYix0aGlzLmE9YS5hO2Zvcih2YXIgYj10aGlzLnNrZWxldG9uLmRhdGEuc2xvdHMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdPT1hKXt0aGlzLnNldEF0dGFjaG1lbnQoYS5hdHRhY2htZW50TmFtZT90aGlzLnNrZWxldG9uLmdldEF0dGFjaG1lbnRCeVNsb3RJbmRleChjLGEuYXR0YWNobWVudE5hbWUpOm51bGwpO2JyZWFrfX19LGYuU2tpbj1mdW5jdGlvbihhKXt0aGlzLm5hbWU9YSx0aGlzLmF0dGFjaG1lbnRzPXt9fSxmLlNraW4ucHJvdG90eXBlPXthZGRBdHRhY2htZW50OmZ1bmN0aW9uKGEsYixjKXt0aGlzLmF0dGFjaG1lbnRzW2ErXCI6XCIrYl09Y30sZ2V0QXR0YWNobWVudDpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLmF0dGFjaG1lbnRzW2ErXCI6XCIrYl19LF9hdHRhY2hBbGw6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMgaW4gYi5hdHRhY2htZW50cyl7dmFyIGQ9Yy5pbmRleE9mKFwiOlwiKSxlPXBhcnNlSW50KGMuc3Vic3RyaW5nKDAsZCksMTApLGY9Yy5zdWJzdHJpbmcoZCsxKSxnPWEuc2xvdHNbZV07aWYoZy5hdHRhY2htZW50JiZnLmF0dGFjaG1lbnQubmFtZT09Zil7dmFyIGg9dGhpcy5nZXRBdHRhY2htZW50KGUsZik7aCYmZy5zZXRBdHRhY2htZW50KGgpfX19fSxmLkFuaW1hdGlvbj1mdW5jdGlvbihhLGIsYyl7dGhpcy5uYW1lPWEsdGhpcy50aW1lbGluZXM9Yix0aGlzLmR1cmF0aW9uPWN9LGYuQW5pbWF0aW9uLnByb3RvdHlwZT17YXBwbHk6ZnVuY3Rpb24oYSxiLGMpe2MmJnRoaXMuZHVyYXRpb24mJihiJT10aGlzLmR1cmF0aW9uKTtmb3IodmFyIGQ9dGhpcy50aW1lbGluZXMsZT0wLGY9ZC5sZW5ndGg7Zj5lO2UrKylkW2VdLmFwcGx5KGEsYiwxKX0sbWl4OmZ1bmN0aW9uKGEsYixjLGQpe2MmJnRoaXMuZHVyYXRpb24mJihiJT10aGlzLmR1cmF0aW9uKTtmb3IodmFyIGU9dGhpcy50aW1lbGluZXMsZj0wLGc9ZS5sZW5ndGg7Zz5mO2YrKyllW2ZdLmFwcGx5KGEsYixkKX19LGYuYmluYXJ5U2VhcmNoPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD0wLGU9TWF0aC5mbG9vcihhLmxlbmd0aC9jKS0yO2lmKCFlKXJldHVybiBjO2Zvcih2YXIgZj1lPj4+MTs7KXtpZihhWyhmKzEpKmNdPD1iP2Q9ZisxOmU9ZixkPT1lKXJldHVybihkKzEpKmM7Zj1kK2U+Pj4xfX0sZi5saW5lYXJTZWFyY2g9ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD0wLGU9YS5sZW5ndGgtYztlPj1kO2QrPWMpaWYoYVtkXT5iKXJldHVybiBkO3JldHVybi0xfSxmLkN1cnZlcz1mdW5jdGlvbihhKXt0aGlzLmN1cnZlcz1bXSx0aGlzLmN1cnZlcy5sZW5ndGg9NiooYS0xKX0sZi5DdXJ2ZXMucHJvdG90eXBlPXtzZXRMaW5lYXI6ZnVuY3Rpb24oYSl7dGhpcy5jdXJ2ZXNbNiphXT0wfSxzZXRTdGVwcGVkOmZ1bmN0aW9uKGEpe3RoaXMuY3VydmVzWzYqYV09LTF9LHNldEN1cnZlOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9LjEsZz1mKmYsaD1nKmYsaT0zKmYsaj0zKmcsaz02KmcsbD02KmgsbT0yKi1iK2Qsbj0yKi1jK2Usbz0zKihiLWQpKzEscD0zKihjLWUpKzEscT02KmEscj10aGlzLmN1cnZlcztyW3FdPWIqaSttKmorbypoLHJbcSsxXT1jKmkrbipqK3AqaCxyW3ErMl09bSprK28qbCxyW3ErM109biprK3AqbCxyW3ErNF09bypsLHJbcSs1XT1wKmx9LGdldEN1cnZlUGVyY2VudDpmdW5jdGlvbihhLGIpe2I9MD5iPzA6Yj4xPzE6Yjt2YXIgYz02KmEsZD10aGlzLmN1cnZlcyxlPWRbY107aWYoIWUpcmV0dXJuIGI7aWYoLTE9PWUpcmV0dXJuIDA7Zm9yKHZhciBmPWRbYysxXSxnPWRbYysyXSxoPWRbYyszXSxpPWRbYys0XSxqPWRbYys1XSxrPWUsbD1mLG09ODs7KXtpZihrPj1iKXt2YXIgbj1rLWUsbz1sLWY7cmV0dXJuIG8rKGwtbykqKGItbikvKGstbil9aWYoIW0pYnJlYWs7bS0tLGUrPWcsZis9aCxnKz1pLGgrPWosays9ZSxsKz1mfXJldHVybiBsKygxLWwpKihiLWspLygxLWspfX0sZi5Sb3RhdGVUaW1lbGluZT1mdW5jdGlvbihhKXt0aGlzLmN1cnZlcz1uZXcgZi5DdXJ2ZXMoYSksdGhpcy5mcmFtZXM9W10sdGhpcy5mcmFtZXMubGVuZ3RoPTIqYX0sZi5Sb3RhdGVUaW1lbGluZS5wcm90b3R5cGU9e2JvbmVJbmRleDowLGdldEZyYW1lQ291bnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5mcmFtZXMubGVuZ3RoLzJ9LHNldEZyYW1lOmZ1bmN0aW9uKGEsYixjKXthKj0yLHRoaXMuZnJhbWVzW2FdPWIsdGhpcy5mcmFtZXNbYSsxXT1jfSxhcHBseTpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZT10aGlzLmZyYW1lcztpZighKGI8ZVswXSkpe3ZhciBnPWEuYm9uZXNbdGhpcy5ib25lSW5kZXhdO2lmKGI+PWVbZS5sZW5ndGgtMl0pe2ZvcihkPWcuZGF0YS5yb3RhdGlvbitlW2UubGVuZ3RoLTFdLWcucm90YXRpb247ZD4xODA7KWQtPTM2MDtmb3IoOy0xODA+ZDspZCs9MzYwO3JldHVybiBnLnJvdGF0aW9uKz1kKmMsdm9pZCAwfXZhciBoPWYuYmluYXJ5U2VhcmNoKGUsYiwyKSxpPWVbaC0xXSxqPWVbaF0saz0xLShiLWopLyhlW2gtMl0taik7Zm9yKGs9dGhpcy5jdXJ2ZXMuZ2V0Q3VydmVQZXJjZW50KGgvMi0xLGspLGQ9ZVtoKzFdLWk7ZD4xODA7KWQtPTM2MDtmb3IoOy0xODA+ZDspZCs9MzYwO2ZvcihkPWcuZGF0YS5yb3RhdGlvbisoaStkKmspLWcucm90YXRpb247ZD4xODA7KWQtPTM2MDtmb3IoOy0xODA+ZDspZCs9MzYwO2cucm90YXRpb24rPWQqY319fSxmLlRyYW5zbGF0ZVRpbWVsaW5lPWZ1bmN0aW9uKGEpe3RoaXMuY3VydmVzPW5ldyBmLkN1cnZlcyhhKSx0aGlzLmZyYW1lcz1bXSx0aGlzLmZyYW1lcy5sZW5ndGg9MyphfSxmLlRyYW5zbGF0ZVRpbWVsaW5lLnByb3RvdHlwZT17Ym9uZUluZGV4OjAsZ2V0RnJhbWVDb3VudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmZyYW1lcy5sZW5ndGgvM30sc2V0RnJhbWU6ZnVuY3Rpb24oYSxiLGMsZCl7YSo9Myx0aGlzLmZyYW1lc1thXT1iLHRoaXMuZnJhbWVzW2ErMV09Yyx0aGlzLmZyYW1lc1thKzJdPWR9LGFwcGx5OmZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLmZyYW1lcztpZighKGI8ZFswXSkpe3ZhciBlPWEuYm9uZXNbdGhpcy5ib25lSW5kZXhdO2lmKGI+PWRbZC5sZW5ndGgtM10pcmV0dXJuIGUueCs9KGUuZGF0YS54K2RbZC5sZW5ndGgtMl0tZS54KSpjLGUueSs9KGUuZGF0YS55K2RbZC5sZW5ndGgtMV0tZS55KSpjLHZvaWQgMDt2YXIgZz1mLmJpbmFyeVNlYXJjaChkLGIsMyksaD1kW2ctMl0saT1kW2ctMV0saj1kW2ddLGs9MS0oYi1qKS8oZFtnKy0zXS1qKTtrPXRoaXMuY3VydmVzLmdldEN1cnZlUGVyY2VudChnLzMtMSxrKSxlLngrPShlLmRhdGEueCtoKyhkW2crMV0taCkqay1lLngpKmMsZS55Kz0oZS5kYXRhLnkraSsoZFtnKzJdLWkpKmstZS55KSpjfX19LGYuU2NhbGVUaW1lbGluZT1mdW5jdGlvbihhKXt0aGlzLmN1cnZlcz1uZXcgZi5DdXJ2ZXMoYSksdGhpcy5mcmFtZXM9W10sdGhpcy5mcmFtZXMubGVuZ3RoPTMqYX0sZi5TY2FsZVRpbWVsaW5lLnByb3RvdHlwZT17Ym9uZUluZGV4OjAsZ2V0RnJhbWVDb3VudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmZyYW1lcy5sZW5ndGgvM30sc2V0RnJhbWU6ZnVuY3Rpb24oYSxiLGMsZCl7YSo9Myx0aGlzLmZyYW1lc1thXT1iLHRoaXMuZnJhbWVzW2ErMV09Yyx0aGlzLmZyYW1lc1thKzJdPWR9LGFwcGx5OmZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLmZyYW1lcztpZighKGI8ZFswXSkpe3ZhciBlPWEuYm9uZXNbdGhpcy5ib25lSW5kZXhdO2lmKGI+PWRbZC5sZW5ndGgtM10pcmV0dXJuIGUuc2NhbGVYKz0oZS5kYXRhLnNjYWxlWC0xK2RbZC5sZW5ndGgtMl0tZS5zY2FsZVgpKmMsZS5zY2FsZVkrPShlLmRhdGEuc2NhbGVZLTErZFtkLmxlbmd0aC0xXS1lLnNjYWxlWSkqYyx2b2lkIDA7dmFyIGc9Zi5iaW5hcnlTZWFyY2goZCxiLDMpLGg9ZFtnLTJdLGk9ZFtnLTFdLGo9ZFtnXSxrPTEtKGItaikvKGRbZystM10taik7az10aGlzLmN1cnZlcy5nZXRDdXJ2ZVBlcmNlbnQoZy8zLTEsayksZS5zY2FsZVgrPShlLmRhdGEuc2NhbGVYLTEraCsoZFtnKzFdLWgpKmstZS5zY2FsZVgpKmMsZS5zY2FsZVkrPShlLmRhdGEuc2NhbGVZLTEraSsoZFtnKzJdLWkpKmstZS5zY2FsZVkpKmN9fX0sZi5Db2xvclRpbWVsaW5lPWZ1bmN0aW9uKGEpe3RoaXMuY3VydmVzPW5ldyBmLkN1cnZlcyhhKSx0aGlzLmZyYW1lcz1bXSx0aGlzLmZyYW1lcy5sZW5ndGg9NSphfSxmLkNvbG9yVGltZWxpbmUucHJvdG90eXBlPXtzbG90SW5kZXg6MCxnZXRGcmFtZUNvdW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnJhbWVzLmxlbmd0aC81fSxzZXRGcmFtZTpmdW5jdGlvbihhLGIsYyxkLGUsZil7YSo9NSx0aGlzLmZyYW1lc1thXT1iLHRoaXMuZnJhbWVzW2ErMV09Yyx0aGlzLmZyYW1lc1thKzJdPWQsdGhpcy5mcmFtZXNbYSszXT1lLHRoaXMuZnJhbWVzW2ErNF09Zn0sYXBwbHk6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMuZnJhbWVzO2lmKCEoYjxkWzBdKSl7dmFyIGU9YS5zbG90c1t0aGlzLnNsb3RJbmRleF07aWYoYj49ZFtkLmxlbmd0aC01XSl7dmFyIGc9ZC5sZW5ndGgtMTtyZXR1cm4gZS5yPWRbZy0zXSxlLmc9ZFtnLTJdLGUuYj1kW2ctMV0sZS5hPWRbZ10sdm9pZCAwfXZhciBoPWYuYmluYXJ5U2VhcmNoKGQsYiw1KSxpPWRbaC00XSxqPWRbaC0zXSxrPWRbaC0yXSxsPWRbaC0xXSxtPWRbaF0sbj0xLShiLW0pLyhkW2gtNV0tbSk7bj10aGlzLmN1cnZlcy5nZXRDdXJ2ZVBlcmNlbnQoaC81LTEsbik7dmFyIG89aSsoZFtoKzFdLWkpKm4scD1qKyhkW2grMl0taikqbixxPWsrKGRbaCszXS1rKSpuLHI9bCsoZFtoKzRdLWwpKm47MT5jPyhlLnIrPShvLWUucikqYyxlLmcrPShwLWUuZykqYyxlLmIrPShxLWUuYikqYyxlLmErPShyLWUuYSkqYyk6KGUucj1vLGUuZz1wLGUuYj1xLGUuYT1yKX19fSxmLkF0dGFjaG1lbnRUaW1lbGluZT1mdW5jdGlvbihhKXt0aGlzLmN1cnZlcz1uZXcgZi5DdXJ2ZXMoYSksdGhpcy5mcmFtZXM9W10sdGhpcy5mcmFtZXMubGVuZ3RoPWEsdGhpcy5hdHRhY2htZW50TmFtZXM9W10sdGhpcy5hdHRhY2htZW50TmFtZXMubGVuZ3RoPWF9LGYuQXR0YWNobWVudFRpbWVsaW5lLnByb3RvdHlwZT17c2xvdEluZGV4OjAsZ2V0RnJhbWVDb3VudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmZyYW1lcy5sZW5ndGh9LHNldEZyYW1lOmZ1bmN0aW9uKGEsYixjKXt0aGlzLmZyYW1lc1thXT1iLHRoaXMuYXR0YWNobWVudE5hbWVzW2FdPWN9LGFwcGx5OmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5mcmFtZXM7aWYoIShiPGNbMF0pKXt2YXIgZDtkPWI+PWNbYy5sZW5ndGgtMV0/Yy5sZW5ndGgtMTpmLmJpbmFyeVNlYXJjaChjLGIsMSktMTt2YXIgZT10aGlzLmF0dGFjaG1lbnROYW1lc1tkXTthLnNsb3RzW3RoaXMuc2xvdEluZGV4XS5zZXRBdHRhY2htZW50KGU/YS5nZXRBdHRhY2htZW50QnlTbG90SW5kZXgodGhpcy5zbG90SW5kZXgsZSk6bnVsbCl9fX0sZi5Ta2VsZXRvbkRhdGE9ZnVuY3Rpb24oKXt0aGlzLmJvbmVzPVtdLHRoaXMuc2xvdHM9W10sdGhpcy5za2lucz1bXSx0aGlzLmFuaW1hdGlvbnM9W119LGYuU2tlbGV0b25EYXRhLnByb3RvdHlwZT17ZGVmYXVsdFNraW46bnVsbCxmaW5kQm9uZTpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5ib25lcyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10ubmFtZT09YSlyZXR1cm4gYltjXTtyZXR1cm4gbnVsbH0sZmluZEJvbmVJbmRleDpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5ib25lcyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10ubmFtZT09YSlyZXR1cm4gYztyZXR1cm4tMX0sZmluZFNsb3Q6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXRoaXMuc2xvdHMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdLm5hbWU9PWEpcmV0dXJuIHNsb3RbY107cmV0dXJuIG51bGx9LGZpbmRTbG90SW5kZXg6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXRoaXMuc2xvdHMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdLm5hbWU9PWEpcmV0dXJuIGM7cmV0dXJuLTF9LGZpbmRTa2luOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLnNraW5zLGM9MCxkPWIubGVuZ3RoO2Q+YztjKyspaWYoYltjXS5uYW1lPT1hKXJldHVybiBiW2NdO3JldHVybiBudWxsfSxmaW5kQW5pbWF0aW9uOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLmFuaW1hdGlvbnMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdLm5hbWU9PWEpcmV0dXJuIGJbY107cmV0dXJuIG51bGx9fSxmLlNrZWxldG9uPWZ1bmN0aW9uKGEpe3RoaXMuZGF0YT1hLHRoaXMuYm9uZXM9W107XG5mb3IodmFyIGI9MCxjPWEuYm9uZXMubGVuZ3RoO2M+YjtiKyspe3ZhciBkPWEuYm9uZXNbYl0sZT1kLnBhcmVudD90aGlzLmJvbmVzW2EuYm9uZXMuaW5kZXhPZihkLnBhcmVudCldOm51bGw7dGhpcy5ib25lcy5wdXNoKG5ldyBmLkJvbmUoZCxlKSl9Zm9yKHRoaXMuc2xvdHM9W10sdGhpcy5kcmF3T3JkZXI9W10sYj0wLGM9YS5zbG90cy5sZW5ndGg7Yz5iO2IrKyl7dmFyIGc9YS5zbG90c1tiXSxoPXRoaXMuYm9uZXNbYS5ib25lcy5pbmRleE9mKGcuYm9uZURhdGEpXSxpPW5ldyBmLlNsb3QoZyx0aGlzLGgpO3RoaXMuc2xvdHMucHVzaChpKSx0aGlzLmRyYXdPcmRlci5wdXNoKGkpfX0sZi5Ta2VsZXRvbi5wcm90b3R5cGU9e3g6MCx5OjAsc2tpbjpudWxsLHI6MSxnOjEsYjoxLGE6MSx0aW1lOjAsZmxpcFg6ITEsZmxpcFk6ITEsdXBkYXRlV29ybGRUcmFuc2Zvcm06ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5mbGlwWCxiPXRoaXMuZmxpcFksYz10aGlzLmJvbmVzLGQ9MCxlPWMubGVuZ3RoO2U+ZDtkKyspY1tkXS51cGRhdGVXb3JsZFRyYW5zZm9ybShhLGIpfSxzZXRUb1NldHVwUG9zZTpmdW5jdGlvbigpe3RoaXMuc2V0Qm9uZXNUb1NldHVwUG9zZSgpLHRoaXMuc2V0U2xvdHNUb1NldHVwUG9zZSgpfSxzZXRCb25lc1RvU2V0dXBQb3NlOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuYm9uZXMsYj0wLGM9YS5sZW5ndGg7Yz5iO2IrKylhW2JdLnNldFRvU2V0dXBQb3NlKCl9LHNldFNsb3RzVG9TZXR1cFBvc2U6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5zbG90cyxiPTAsYz1hLmxlbmd0aDtjPmI7YisrKWFbYl0uc2V0VG9TZXR1cFBvc2UoYil9LGdldFJvb3RCb25lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYm9uZXMubGVuZ3RoP3RoaXMuYm9uZXNbMF06bnVsbH0sZmluZEJvbmU6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPXRoaXMuYm9uZXMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdLmRhdGEubmFtZT09YSlyZXR1cm4gYltjXTtyZXR1cm4gbnVsbH0sZmluZEJvbmVJbmRleDpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5ib25lcyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10uZGF0YS5uYW1lPT1hKXJldHVybiBjO3JldHVybi0xfSxmaW5kU2xvdDpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5zbG90cyxjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWlmKGJbY10uZGF0YS5uYW1lPT1hKXJldHVybiBiW2NdO3JldHVybiBudWxsfSxmaW5kU2xvdEluZGV4OmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLnNsb3RzLGM9MCxkPWIubGVuZ3RoO2Q+YztjKyspaWYoYltjXS5kYXRhLm5hbWU9PWEpcmV0dXJuIGM7cmV0dXJuLTF9LHNldFNraW5CeU5hbWU6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5kYXRhLmZpbmRTa2luKGEpO2lmKCFiKXRocm93XCJTa2luIG5vdCBmb3VuZDogXCIrYTt0aGlzLnNldFNraW4oYil9LHNldFNraW46ZnVuY3Rpb24oYSl7dGhpcy5za2luJiZhJiZhLl9hdHRhY2hBbGwodGhpcyx0aGlzLnNraW4pLHRoaXMuc2tpbj1hfSxnZXRBdHRhY2htZW50QnlTbG90TmFtZTpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLmdldEF0dGFjaG1lbnRCeVNsb3RJbmRleCh0aGlzLmRhdGEuZmluZFNsb3RJbmRleChhKSxiKX0sZ2V0QXR0YWNobWVudEJ5U2xvdEluZGV4OmZ1bmN0aW9uKGEsYil7aWYodGhpcy5za2luKXt2YXIgYz10aGlzLnNraW4uZ2V0QXR0YWNobWVudChhLGIpO2lmKGMpcmV0dXJuIGN9cmV0dXJuIHRoaXMuZGF0YS5kZWZhdWx0U2tpbj90aGlzLmRhdGEuZGVmYXVsdFNraW4uZ2V0QXR0YWNobWVudChhLGIpOm51bGx9LHNldEF0dGFjaG1lbnQ6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9dGhpcy5zbG90cyxkPTAsZT1jLnNpemU7ZT5kO2QrKyl7dmFyIGY9Y1tkXTtpZihmLmRhdGEubmFtZT09YSl7dmFyIGc9bnVsbDtpZihiJiYoZz10aGlzLmdldEF0dGFjaG1lbnQoZCxiKSxudWxsPT1nKSl0aHJvd1wiQXR0YWNobWVudCBub3QgZm91bmQ6IFwiK2IrXCIsIGZvciBzbG90OiBcIithO3JldHVybiBmLnNldEF0dGFjaG1lbnQoZyksdm9pZCAwfX10aHJvd1wiU2xvdCBub3QgZm91bmQ6IFwiK2F9LHVwZGF0ZTpmdW5jdGlvbihhKXt0aW1lKz1hfX0sZi5BdHRhY2htZW50VHlwZT17cmVnaW9uOjB9LGYuUmVnaW9uQXR0YWNobWVudD1mdW5jdGlvbigpe3RoaXMub2Zmc2V0PVtdLHRoaXMub2Zmc2V0Lmxlbmd0aD04LHRoaXMudXZzPVtdLHRoaXMudXZzLmxlbmd0aD04fSxmLlJlZ2lvbkF0dGFjaG1lbnQucHJvdG90eXBlPXt4OjAseTowLHJvdGF0aW9uOjAsc2NhbGVYOjEsc2NhbGVZOjEsd2lkdGg6MCxoZWlnaHQ6MCxyZW5kZXJlck9iamVjdDpudWxsLHJlZ2lvbk9mZnNldFg6MCxyZWdpb25PZmZzZXRZOjAscmVnaW9uV2lkdGg6MCxyZWdpb25IZWlnaHQ6MCxyZWdpb25PcmlnaW5hbFdpZHRoOjAscmVnaW9uT3JpZ2luYWxIZWlnaHQ6MCxzZXRVVnM6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj10aGlzLnV2cztlPyhmWzJdPWEsZlszXT1kLGZbNF09YSxmWzVdPWIsZls2XT1jLGZbN109YixmWzBdPWMsZlsxXT1kKTooZlswXT1hLGZbMV09ZCxmWzJdPWEsZlszXT1iLGZbNF09YyxmWzVdPWIsZls2XT1jLGZbN109ZCl9LHVwZGF0ZU9mZnNldDpmdW5jdGlvbigpe3ZhciBhPXRoaXMud2lkdGgvdGhpcy5yZWdpb25PcmlnaW5hbFdpZHRoKnRoaXMuc2NhbGVYLGI9dGhpcy5oZWlnaHQvdGhpcy5yZWdpb25PcmlnaW5hbEhlaWdodCp0aGlzLnNjYWxlWSxjPS10aGlzLndpZHRoLzIqdGhpcy5zY2FsZVgrdGhpcy5yZWdpb25PZmZzZXRYKmEsZD0tdGhpcy5oZWlnaHQvMip0aGlzLnNjYWxlWSt0aGlzLnJlZ2lvbk9mZnNldFkqYixlPWMrdGhpcy5yZWdpb25XaWR0aCphLGY9ZCt0aGlzLnJlZ2lvbkhlaWdodCpiLGc9dGhpcy5yb3RhdGlvbipNYXRoLlBJLzE4MCxoPU1hdGguY29zKGcpLGk9TWF0aC5zaW4oZyksaj1jKmgrdGhpcy54LGs9YyppLGw9ZCpoK3RoaXMueSxtPWQqaSxuPWUqaCt0aGlzLngsbz1lKmkscD1mKmgrdGhpcy55LHE9ZippLHI9dGhpcy5vZmZzZXQ7clswXT1qLW0sclsxXT1sK2ssclsyXT1qLXEsclszXT1wK2sscls0XT1uLXEscls1XT1wK28scls2XT1uLW0scls3XT1sK299LGNvbXB1dGVWZXJ0aWNlczpmdW5jdGlvbihhLGIsYyxkKXthKz1jLndvcmxkWCxiKz1jLndvcmxkWTt2YXIgZT1jLm0wMCxmPWMubTAxLGc9Yy5tMTAsaD1jLm0xMSxpPXRoaXMub2Zmc2V0O2RbMF09aVswXSplK2lbMV0qZithLGRbMV09aVswXSpnK2lbMV0qaCtiLGRbMl09aVsyXSplK2lbM10qZithLGRbM109aVsyXSpnK2lbM10qaCtiLGRbNF09aVs0XSplK2lbNV0qZithLGRbNV09aVs0XSpnK2lbNV0qaCtiLGRbNl09aVs2XSplK2lbN10qZithLGRbN109aVs2XSpnK2lbN10qaCtifX0sZi5BbmltYXRpb25TdGF0ZURhdGE9ZnVuY3Rpb24oYSl7dGhpcy5za2VsZXRvbkRhdGE9YSx0aGlzLmFuaW1hdGlvblRvTWl4VGltZT17fX0sZi5BbmltYXRpb25TdGF0ZURhdGEucHJvdG90eXBlPXtkZWZhdWx0TWl4OjAsc2V0TWl4QnlOYW1lOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLnNrZWxldG9uRGF0YS5maW5kQW5pbWF0aW9uKGEpO2lmKCFkKXRocm93XCJBbmltYXRpb24gbm90IGZvdW5kOiBcIithO3ZhciBlPXRoaXMuc2tlbGV0b25EYXRhLmZpbmRBbmltYXRpb24oYik7aWYoIWUpdGhyb3dcIkFuaW1hdGlvbiBub3QgZm91bmQ6IFwiK2I7dGhpcy5zZXRNaXgoZCxlLGMpfSxzZXRNaXg6ZnVuY3Rpb24oYSxiLGMpe3RoaXMuYW5pbWF0aW9uVG9NaXhUaW1lW2EubmFtZStcIjpcIitiLm5hbWVdPWN9LGdldE1peDpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuYW5pbWF0aW9uVG9NaXhUaW1lW2EubmFtZStcIjpcIitiLm5hbWVdO3JldHVybiBjP2M6dGhpcy5kZWZhdWx0TWl4fX0sZi5BbmltYXRpb25TdGF0ZT1mdW5jdGlvbihhKXt0aGlzLmRhdGE9YSx0aGlzLnF1ZXVlPVtdfSxmLkFuaW1hdGlvblN0YXRlLnByb3RvdHlwZT17YW5pbWF0aW9uU3BlZWQ6MSxjdXJyZW50Om51bGwscHJldmlvdXM6bnVsbCxjdXJyZW50VGltZTowLHByZXZpb3VzVGltZTowLGN1cnJlbnRMb29wOiExLHByZXZpb3VzTG9vcDohMSxtaXhUaW1lOjAsbWl4RHVyYXRpb246MCx1cGRhdGU6ZnVuY3Rpb24oYSl7aWYodGhpcy5jdXJyZW50VGltZSs9YSp0aGlzLmFuaW1hdGlvblNwZWVkLHRoaXMucHJldmlvdXNUaW1lKz1hLHRoaXMubWl4VGltZSs9YSx0aGlzLnF1ZXVlLmxlbmd0aD4wKXt2YXIgYj10aGlzLnF1ZXVlWzBdO3RoaXMuY3VycmVudFRpbWU+PWIuZGVsYXkmJih0aGlzLl9zZXRBbmltYXRpb24oYi5hbmltYXRpb24sYi5sb29wKSx0aGlzLnF1ZXVlLnNoaWZ0KCkpfX0sYXBwbHk6ZnVuY3Rpb24oYSl7aWYodGhpcy5jdXJyZW50KWlmKHRoaXMucHJldmlvdXMpe3RoaXMucHJldmlvdXMuYXBwbHkoYSx0aGlzLnByZXZpb3VzVGltZSx0aGlzLnByZXZpb3VzTG9vcCk7dmFyIGI9dGhpcy5taXhUaW1lL3RoaXMubWl4RHVyYXRpb247Yj49MSYmKGI9MSx0aGlzLnByZXZpb3VzPW51bGwpLHRoaXMuY3VycmVudC5taXgoYSx0aGlzLmN1cnJlbnRUaW1lLHRoaXMuY3VycmVudExvb3AsYil9ZWxzZSB0aGlzLmN1cnJlbnQuYXBwbHkoYSx0aGlzLmN1cnJlbnRUaW1lLHRoaXMuY3VycmVudExvb3ApfSxjbGVhckFuaW1hdGlvbjpmdW5jdGlvbigpe3RoaXMucHJldmlvdXM9bnVsbCx0aGlzLmN1cnJlbnQ9bnVsbCx0aGlzLnF1ZXVlLmxlbmd0aD0wfSxfc2V0QW5pbWF0aW9uOmZ1bmN0aW9uKGEsYil7dGhpcy5wcmV2aW91cz1udWxsLGEmJnRoaXMuY3VycmVudCYmKHRoaXMubWl4RHVyYXRpb249dGhpcy5kYXRhLmdldE1peCh0aGlzLmN1cnJlbnQsYSksdGhpcy5taXhEdXJhdGlvbj4wJiYodGhpcy5taXhUaW1lPTAsdGhpcy5wcmV2aW91cz10aGlzLmN1cnJlbnQsdGhpcy5wcmV2aW91c1RpbWU9dGhpcy5jdXJyZW50VGltZSx0aGlzLnByZXZpb3VzTG9vcD10aGlzLmN1cnJlbnRMb29wKSksdGhpcy5jdXJyZW50PWEsdGhpcy5jdXJyZW50TG9vcD1iLHRoaXMuY3VycmVudFRpbWU9MH0sc2V0QW5pbWF0aW9uQnlOYW1lOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5kYXRhLnNrZWxldG9uRGF0YS5maW5kQW5pbWF0aW9uKGEpO2lmKCFjKXRocm93XCJBbmltYXRpb24gbm90IGZvdW5kOiBcIithO3RoaXMuc2V0QW5pbWF0aW9uKGMsYil9LHNldEFuaW1hdGlvbjpmdW5jdGlvbihhLGIpe3RoaXMucXVldWUubGVuZ3RoPTAsdGhpcy5fc2V0QW5pbWF0aW9uKGEsYil9LGFkZEFuaW1hdGlvbkJ5TmFtZTpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9dGhpcy5kYXRhLnNrZWxldG9uRGF0YS5maW5kQW5pbWF0aW9uKGEpO2lmKCFkKXRocm93XCJBbmltYXRpb24gbm90IGZvdW5kOiBcIithO3RoaXMuYWRkQW5pbWF0aW9uKGQsYixjKX0sYWRkQW5pbWF0aW9uOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD17fTtpZihkLmFuaW1hdGlvbj1hLGQubG9vcD1iLCFjfHwwPj1jKXt2YXIgZT10aGlzLnF1ZXVlLmxlbmd0aD90aGlzLnF1ZXVlW3RoaXMucXVldWUubGVuZ3RoLTFdLmFuaW1hdGlvbjp0aGlzLmN1cnJlbnQ7Yz1udWxsIT1lP2UuZHVyYXRpb24tdGhpcy5kYXRhLmdldE1peChlLGEpKyhjfHwwKTowfWQuZGVsYXk9Yyx0aGlzLnF1ZXVlLnB1c2goZCl9LGlzQ29tcGxldGU6ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5jdXJyZW50fHx0aGlzLmN1cnJlbnRUaW1lPj10aGlzLmN1cnJlbnQuZHVyYXRpb259fSxmLlNrZWxldG9uSnNvbj1mdW5jdGlvbihhKXt0aGlzLmF0dGFjaG1lbnRMb2FkZXI9YX0sZi5Ta2VsZXRvbkpzb24ucHJvdG90eXBlPXtzY2FsZToxLHJlYWRTa2VsZXRvbkRhdGE6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGM9bmV3IGYuU2tlbGV0b25EYXRhLGQ9YS5ib25lcyxlPTAsZz1kLmxlbmd0aDtnPmU7ZSsrKXt2YXIgaD1kW2VdLGk9bnVsbDtpZihoLnBhcmVudCYmKGk9Yy5maW5kQm9uZShoLnBhcmVudCksIWkpKXRocm93XCJQYXJlbnQgYm9uZSBub3QgZm91bmQ6IFwiK2gucGFyZW50O2I9bmV3IGYuQm9uZURhdGEoaC5uYW1lLGkpLGIubGVuZ3RoPShoLmxlbmd0aHx8MCkqdGhpcy5zY2FsZSxiLng9KGgueHx8MCkqdGhpcy5zY2FsZSxiLnk9KGgueXx8MCkqdGhpcy5zY2FsZSxiLnJvdGF0aW9uPWgucm90YXRpb258fDAsYi5zY2FsZVg9aC5zY2FsZVh8fDEsYi5zY2FsZVk9aC5zY2FsZVl8fDEsYy5ib25lcy5wdXNoKGIpfXZhciBqPWEuc2xvdHM7Zm9yKGU9MCxnPWoubGVuZ3RoO2c+ZTtlKyspe3ZhciBrPWpbZV07aWYoYj1jLmZpbmRCb25lKGsuYm9uZSksIWIpdGhyb3dcIlNsb3QgYm9uZSBub3QgZm91bmQ6IFwiK2suYm9uZTt2YXIgbD1uZXcgZi5TbG90RGF0YShrLm5hbWUsYiksbT1rLmNvbG9yO20mJihsLnI9Zi5Ta2VsZXRvbkpzb24udG9Db2xvcihtLDApLGwuZz1mLlNrZWxldG9uSnNvbi50b0NvbG9yKG0sMSksbC5iPWYuU2tlbGV0b25Kc29uLnRvQ29sb3IobSwyKSxsLmE9Zi5Ta2VsZXRvbkpzb24udG9Db2xvcihtLDMpKSxsLmF0dGFjaG1lbnROYW1lPWsuYXR0YWNobWVudCxjLnNsb3RzLnB1c2gobCl9dmFyIG49YS5za2lucztmb3IodmFyIG8gaW4gbilpZihuLmhhc093blByb3BlcnR5KG8pKXt2YXIgcD1uW29dLHE9bmV3IGYuU2tpbihvKTtmb3IodmFyIHIgaW4gcClpZihwLmhhc093blByb3BlcnR5KHIpKXt2YXIgcz1jLmZpbmRTbG90SW5kZXgociksdD1wW3JdO2Zvcih2YXIgdSBpbiB0KWlmKHQuaGFzT3duUHJvcGVydHkodSkpe3ZhciB2PXRoaXMucmVhZEF0dGFjaG1lbnQocSx1LHRbdV0pO251bGwhPXYmJnEuYWRkQXR0YWNobWVudChzLHUsdil9fWMuc2tpbnMucHVzaChxKSxcImRlZmF1bHRcIj09cS5uYW1lJiYoYy5kZWZhdWx0U2tpbj1xKX12YXIgdz1hLmFuaW1hdGlvbnM7Zm9yKHZhciB4IGluIHcpdy5oYXNPd25Qcm9wZXJ0eSh4KSYmdGhpcy5yZWFkQW5pbWF0aW9uKHgsd1t4XSxjKTtyZXR1cm4gY30scmVhZEF0dGFjaG1lbnQ6ZnVuY3Rpb24oYSxiLGMpe2I9Yy5uYW1lfHxiO3ZhciBkPWYuQXR0YWNobWVudFR5cGVbYy50eXBlfHxcInJlZ2lvblwiXTtpZihkPT1mLkF0dGFjaG1lbnRUeXBlLnJlZ2lvbil7dmFyIGU9bmV3IGYuUmVnaW9uQXR0YWNobWVudDtyZXR1cm4gZS54PShjLnh8fDApKnRoaXMuc2NhbGUsZS55PShjLnl8fDApKnRoaXMuc2NhbGUsZS5zY2FsZVg9Yy5zY2FsZVh8fDEsZS5zY2FsZVk9Yy5zY2FsZVl8fDEsZS5yb3RhdGlvbj1jLnJvdGF0aW9ufHwwLGUud2lkdGg9KGMud2lkdGh8fDMyKSp0aGlzLnNjYWxlLGUuaGVpZ2h0PShjLmhlaWdodHx8MzIpKnRoaXMuc2NhbGUsZS51cGRhdGVPZmZzZXQoKSxlLnJlbmRlcmVyT2JqZWN0PXt9LGUucmVuZGVyZXJPYmplY3QubmFtZT1iLGUucmVuZGVyZXJPYmplY3Quc2NhbGU9e30sZS5yZW5kZXJlck9iamVjdC5zY2FsZS54PWUuc2NhbGVYLGUucmVuZGVyZXJPYmplY3Quc2NhbGUueT1lLnNjYWxlWSxlLnJlbmRlcmVyT2JqZWN0LnJvdGF0aW9uPS1lLnJvdGF0aW9uKk1hdGguUEkvMTgwLGV9dGhyb3dcIlVua25vd24gYXR0YWNobWVudCB0eXBlOiBcIitkfSxyZWFkQW5pbWF0aW9uOmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGcsaCxpLGosayxsPVtdLG09MCxuPWIuYm9uZXM7Zm9yKHZhciBvIGluIG4paWYobi5oYXNPd25Qcm9wZXJ0eShvKSl7dmFyIHA9Yy5maW5kQm9uZUluZGV4KG8pO2lmKC0xPT1wKXRocm93XCJCb25lIG5vdCBmb3VuZDogXCIrbzt2YXIgcT1uW29dO2ZvcihnIGluIHEpaWYocS5oYXNPd25Qcm9wZXJ0eShnKSlpZihpPXFbZ10sXCJyb3RhdGVcIj09Zyl7Zm9yKGU9bmV3IGYuUm90YXRlVGltZWxpbmUoaS5sZW5ndGgpLGUuYm9uZUluZGV4PXAsZD0wLGo9MCxrPWkubGVuZ3RoO2s+ajtqKyspaD1pW2pdLGUuc2V0RnJhbWUoZCxoLnRpbWUsaC5hbmdsZSksZi5Ta2VsZXRvbkpzb24ucmVhZEN1cnZlKGUsZCxoKSxkKys7bC5wdXNoKGUpLG09TWF0aC5tYXgobSxlLmZyYW1lc1syKmUuZ2V0RnJhbWVDb3VudCgpLTJdKX1lbHNle2lmKFwidHJhbnNsYXRlXCIhPWcmJlwic2NhbGVcIiE9Zyl0aHJvd1wiSW52YWxpZCB0aW1lbGluZSB0eXBlIGZvciBhIGJvbmU6IFwiK2crXCIgKFwiK28rXCIpXCI7dmFyIHI9MTtmb3IoXCJzY2FsZVwiPT1nP2U9bmV3IGYuU2NhbGVUaW1lbGluZShpLmxlbmd0aCk6KGU9bmV3IGYuVHJhbnNsYXRlVGltZWxpbmUoaS5sZW5ndGgpLHI9dGhpcy5zY2FsZSksZS5ib25lSW5kZXg9cCxkPTAsaj0wLGs9aS5sZW5ndGg7az5qO2orKyl7aD1pW2pdO3ZhciBzPShoLnh8fDApKnIsdD0oaC55fHwwKSpyO2Uuc2V0RnJhbWUoZCxoLnRpbWUscyx0KSxmLlNrZWxldG9uSnNvbi5yZWFkQ3VydmUoZSxkLGgpLGQrK31sLnB1c2goZSksbT1NYXRoLm1heChtLGUuZnJhbWVzWzMqZS5nZXRGcmFtZUNvdW50KCktM10pfX12YXIgdT1iLnNsb3RzO2Zvcih2YXIgdiBpbiB1KWlmKHUuaGFzT3duUHJvcGVydHkodikpe3ZhciB3PXVbdl0seD1jLmZpbmRTbG90SW5kZXgodik7Zm9yKGcgaW4gdylpZih3Lmhhc093blByb3BlcnR5KGcpKWlmKGk9d1tnXSxcImNvbG9yXCI9PWcpe2ZvcihlPW5ldyBmLkNvbG9yVGltZWxpbmUoaS5sZW5ndGgpLGUuc2xvdEluZGV4PXgsZD0wLGo9MCxrPWkubGVuZ3RoO2s+ajtqKyspe2g9aVtqXTt2YXIgeT1oLmNvbG9yLHo9Zi5Ta2VsZXRvbkpzb24udG9Db2xvcih5LDApLEE9Zi5Ta2VsZXRvbkpzb24udG9Db2xvcih5LDEpLEI9Zi5Ta2VsZXRvbkpzb24udG9Db2xvcih5LDIpLEM9Zi5Ta2VsZXRvbkpzb24udG9Db2xvcih5LDMpO2Uuc2V0RnJhbWUoZCxoLnRpbWUseixBLEIsQyksZi5Ta2VsZXRvbkpzb24ucmVhZEN1cnZlKGUsZCxoKSxkKyt9bC5wdXNoKGUpLG09TWF0aC5tYXgobSxlLmZyYW1lc1s1KmUuZ2V0RnJhbWVDb3VudCgpLTVdKX1lbHNle2lmKFwiYXR0YWNobWVudFwiIT1nKXRocm93XCJJbnZhbGlkIHRpbWVsaW5lIHR5cGUgZm9yIGEgc2xvdDogXCIrZytcIiAoXCIrditcIilcIjtmb3IoZT1uZXcgZi5BdHRhY2htZW50VGltZWxpbmUoaS5sZW5ndGgpLGUuc2xvdEluZGV4PXgsZD0wLGo9MCxrPWkubGVuZ3RoO2s+ajtqKyspaD1pW2pdLGUuc2V0RnJhbWUoZCsrLGgudGltZSxoLm5hbWUpO2wucHVzaChlKSxtPU1hdGgubWF4KG0sZS5mcmFtZXNbZS5nZXRGcmFtZUNvdW50KCktMV0pfX1jLmFuaW1hdGlvbnMucHVzaChuZXcgZi5BbmltYXRpb24oYSxsLG0pKX19LGYuU2tlbGV0b25Kc29uLnJlYWRDdXJ2ZT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9Yy5jdXJ2ZTtkJiYoXCJzdGVwcGVkXCI9PWQ/YS5jdXJ2ZXMuc2V0U3RlcHBlZChiKTpkIGluc3RhbmNlb2YgQXJyYXkmJmEuY3VydmVzLnNldEN1cnZlKGIsZFswXSxkWzFdLGRbMl0sZFszXSkpfSxmLlNrZWxldG9uSnNvbi50b0NvbG9yPWZ1bmN0aW9uKGEsYil7aWYoOCE9YS5sZW5ndGgpdGhyb3dcIkNvbG9yIGhleGlkZWNpbWFsIGxlbmd0aCBtdXN0IGJlIDgsIHJlY2lldmVkOiBcIithO3JldHVybiBwYXJzZUludChhLnN1YnN0cigyKmIsMiksMTYpLzI1NX0sZi5BdGxhcz1mdW5jdGlvbihhLGIpe3RoaXMudGV4dHVyZUxvYWRlcj1iLHRoaXMucGFnZXM9W10sdGhpcy5yZWdpb25zPVtdO3ZhciBjPW5ldyBmLkF0bGFzUmVhZGVyKGEpLGQ9W107ZC5sZW5ndGg9NDtmb3IodmFyIGU9bnVsbDs7KXt2YXIgZz1jLnJlYWRMaW5lKCk7aWYobnVsbD09ZylicmVhaztpZihnPWMudHJpbShnKSxnLmxlbmd0aClpZihlKXt2YXIgaD1uZXcgZi5BdGxhc1JlZ2lvbjtoLm5hbWU9ZyxoLnBhZ2U9ZSxoLnJvdGF0ZT1cInRydWVcIj09Yy5yZWFkVmFsdWUoKSxjLnJlYWRUdXBsZShkKTt2YXIgaT1wYXJzZUludChkWzBdLDEwKSxqPXBhcnNlSW50KGRbMV0sMTApO2MucmVhZFR1cGxlKGQpO3ZhciBrPXBhcnNlSW50KGRbMF0sMTApLGw9cGFyc2VJbnQoZFsxXSwxMCk7aC51PWkvZS53aWR0aCxoLnY9ai9lLmhlaWdodCxoLnJvdGF0ZT8oaC51Mj0oaStsKS9lLndpZHRoLGgudjI9KGoraykvZS5oZWlnaHQpOihoLnUyPShpK2spL2Uud2lkdGgsaC52Mj0oaitsKS9lLmhlaWdodCksaC54PWksaC55PWosaC53aWR0aD1NYXRoLmFicyhrKSxoLmhlaWdodD1NYXRoLmFicyhsKSw0PT1jLnJlYWRUdXBsZShkKSYmKGguc3BsaXRzPVtwYXJzZUludChkWzBdLDEwKSxwYXJzZUludChkWzFdLDEwKSxwYXJzZUludChkWzJdLDEwKSxwYXJzZUludChkWzNdLDEwKV0sND09Yy5yZWFkVHVwbGUoZCkmJihoLnBhZHM9W3BhcnNlSW50KGRbMF0sMTApLHBhcnNlSW50KGRbMV0sMTApLHBhcnNlSW50KGRbMl0sMTApLHBhcnNlSW50KGRbM10sMTApXSxjLnJlYWRUdXBsZShkKSkpLGgub3JpZ2luYWxXaWR0aD1wYXJzZUludChkWzBdLDEwKSxoLm9yaWdpbmFsSGVpZ2h0PXBhcnNlSW50KGRbMV0sMTApLGMucmVhZFR1cGxlKGQpLGgub2Zmc2V0WD1wYXJzZUludChkWzBdLDEwKSxoLm9mZnNldFk9cGFyc2VJbnQoZFsxXSwxMCksaC5pbmRleD1wYXJzZUludChjLnJlYWRWYWx1ZSgpLDEwKSx0aGlzLnJlZ2lvbnMucHVzaChoKX1lbHNle2U9bmV3IGYuQXRsYXNQYWdlLGUubmFtZT1nLGUuZm9ybWF0PWYuQXRsYXMuRm9ybWF0W2MucmVhZFZhbHVlKCldLGMucmVhZFR1cGxlKGQpLGUubWluRmlsdGVyPWYuQXRsYXMuVGV4dHVyZUZpbHRlcltkWzBdXSxlLm1hZ0ZpbHRlcj1mLkF0bGFzLlRleHR1cmVGaWx0ZXJbZFsxXV07dmFyIG09Yy5yZWFkVmFsdWUoKTtlLnVXcmFwPWYuQXRsYXMuVGV4dHVyZVdyYXAuY2xhbXBUb0VkZ2UsZS52V3JhcD1mLkF0bGFzLlRleHR1cmVXcmFwLmNsYW1wVG9FZGdlLFwieFwiPT1tP2UudVdyYXA9Zi5BdGxhcy5UZXh0dXJlV3JhcC5yZXBlYXQ6XCJ5XCI9PW0/ZS52V3JhcD1mLkF0bGFzLlRleHR1cmVXcmFwLnJlcGVhdDpcInh5XCI9PW0mJihlLnVXcmFwPWUudldyYXA9Zi5BdGxhcy5UZXh0dXJlV3JhcC5yZXBlYXQpLGIubG9hZChlLGcpLHRoaXMucGFnZXMucHVzaChlKX1lbHNlIGU9bnVsbH19LGYuQXRsYXMucHJvdG90eXBlPXtmaW5kUmVnaW9uOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj10aGlzLnJlZ2lvbnMsYz0wLGQ9Yi5sZW5ndGg7ZD5jO2MrKylpZihiW2NdLm5hbWU9PWEpcmV0dXJuIGJbY107cmV0dXJuIG51bGx9LGRpc3Bvc2U6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5wYWdlcyxiPTAsYz1hLmxlbmd0aDtjPmI7YisrKXRoaXMudGV4dHVyZUxvYWRlci51bmxvYWQoYVtiXS5yZW5kZXJlck9iamVjdCl9LHVwZGF0ZVVWczpmdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5yZWdpb25zLGM9MCxkPWIubGVuZ3RoO2Q+YztjKyspe3ZhciBlPWJbY107ZS5wYWdlPT1hJiYoZS51PWUueC9hLndpZHRoLGUudj1lLnkvYS5oZWlnaHQsZS5yb3RhdGU/KGUudTI9KGUueCtlLmhlaWdodCkvYS53aWR0aCxlLnYyPShlLnkrZS53aWR0aCkvYS5oZWlnaHQpOihlLnUyPShlLngrZS53aWR0aCkvYS53aWR0aCxlLnYyPShlLnkrZS5oZWlnaHQpL2EuaGVpZ2h0KSl9fX0sZi5BdGxhcy5Gb3JtYXQ9e2FscGhhOjAsaW50ZW5zaXR5OjEsbHVtaW5hbmNlQWxwaGE6MixyZ2I1NjU6MyxyZ2JhNDQ0NDo0LHJnYjg4ODo1LHJnYmE4ODg4OjZ9LGYuQXRsYXMuVGV4dHVyZUZpbHRlcj17bmVhcmVzdDowLGxpbmVhcjoxLG1pcE1hcDoyLG1pcE1hcE5lYXJlc3ROZWFyZXN0OjMsbWlwTWFwTGluZWFyTmVhcmVzdDo0LG1pcE1hcE5lYXJlc3RMaW5lYXI6NSxtaXBNYXBMaW5lYXJMaW5lYXI6Nn0sZi5BdGxhcy5UZXh0dXJlV3JhcD17bWlycm9yZWRSZXBlYXQ6MCxjbGFtcFRvRWRnZToxLHJlcGVhdDoyfSxmLkF0bGFzUGFnZT1mdW5jdGlvbigpe30sZi5BdGxhc1BhZ2UucHJvdG90eXBlPXtuYW1lOm51bGwsZm9ybWF0Om51bGwsbWluRmlsdGVyOm51bGwsbWFnRmlsdGVyOm51bGwsdVdyYXA6bnVsbCx2V3JhcDpudWxsLHJlbmRlcmVyT2JqZWN0Om51bGwsd2lkdGg6MCxoZWlnaHQ6MH0sZi5BdGxhc1JlZ2lvbj1mdW5jdGlvbigpe30sZi5BdGxhc1JlZ2lvbi5wcm90b3R5cGU9e3BhZ2U6bnVsbCxuYW1lOm51bGwseDowLHk6MCx3aWR0aDowLGhlaWdodDowLHU6MCx2OjAsdTI6MCx2MjowLG9mZnNldFg6MCxvZmZzZXRZOjAsb3JpZ2luYWxXaWR0aDowLG9yaWdpbmFsSGVpZ2h0OjAsaW5kZXg6MCxyb3RhdGU6ITEsc3BsaXRzOm51bGwscGFkczpudWxsfSxmLkF0bGFzUmVhZGVyPWZ1bmN0aW9uKGEpe3RoaXMubGluZXM9YS5zcGxpdCgvXFxyXFxufFxccnxcXG4vKX0sZi5BdGxhc1JlYWRlci5wcm90b3R5cGU9e2luZGV4OjAsdHJpbTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpfSxyZWFkTGluZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmluZGV4Pj10aGlzLmxpbmVzLmxlbmd0aD9udWxsOnRoaXMubGluZXNbdGhpcy5pbmRleCsrXX0scmVhZFZhbHVlOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5yZWFkTGluZSgpLGI9YS5pbmRleE9mKFwiOlwiKTtpZigtMT09Yil0aHJvd1wiSW52YWxpZCBsaW5lOiBcIithO3JldHVybiB0aGlzLnRyaW0oYS5zdWJzdHJpbmcoYisxKSl9LHJlYWRUdXBsZTpmdW5jdGlvbihhKXt2YXIgYj10aGlzLnJlYWRMaW5lKCksYz1iLmluZGV4T2YoXCI6XCIpO2lmKC0xPT1jKXRocm93XCJJbnZhbGlkIGxpbmU6IFwiK2I7Zm9yKHZhciBkPTAsZT1jKzE7Mz5kO2QrKyl7dmFyIGY9Yi5pbmRleE9mKFwiLFwiLGUpO2lmKC0xPT1mKXtpZighZCl0aHJvd1wiSW52YWxpZCBsaW5lOiBcIitiO2JyZWFrfWFbZF09dGhpcy50cmltKGIuc3Vic3RyKGUsZi1lKSksZT1mKzF9cmV0dXJuIGFbZF09dGhpcy50cmltKGIuc3Vic3RyaW5nKGUpKSxkKzF9fSxmLkF0bGFzQXR0YWNobWVudExvYWRlcj1mdW5jdGlvbihhKXt0aGlzLmF0bGFzPWF9LGYuQXRsYXNBdHRhY2htZW50TG9hZGVyLnByb3RvdHlwZT17bmV3QXR0YWNobWVudDpmdW5jdGlvbihhLGIsYyl7c3dpdGNoKGIpe2Nhc2UgZi5BdHRhY2htZW50VHlwZS5yZWdpb246dmFyIGQ9dGhpcy5hdGxhcy5maW5kUmVnaW9uKGMpO2lmKCFkKXRocm93XCJSZWdpb24gbm90IGZvdW5kIGluIGF0bGFzOiBcIitjK1wiIChcIitiK1wiKVwiO3ZhciBlPW5ldyBmLlJlZ2lvbkF0dGFjaG1lbnQoYyk7cmV0dXJuIGUucmVuZGVyZXJPYmplY3Q9ZCxlLnNldFVWcyhkLnUsZC52LGQudTIsZC52MixkLnJvdGF0ZSksZS5yZWdpb25PZmZzZXRYPWQub2Zmc2V0WCxlLnJlZ2lvbk9mZnNldFk9ZC5vZmZzZXRZLGUucmVnaW9uV2lkdGg9ZC53aWR0aCxlLnJlZ2lvbkhlaWdodD1kLmhlaWdodCxlLnJlZ2lvbk9yaWdpbmFsV2lkdGg9ZC5vcmlnaW5hbFdpZHRoLGUucmVnaW9uT3JpZ2luYWxIZWlnaHQ9ZC5vcmlnaW5hbEhlaWdodCxlfXRocm93XCJVbmtub3duIGF0dGFjaG1lbnQgdHlwZTogXCIrYn19LGYuQm9uZS55RG93bj0hMCxiLkFuaW1DYWNoZT17fSxiLlNwaW5lPWZ1bmN0aW9uKGEpe2lmKGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpLHRoaXMuc3BpbmVEYXRhPWIuQW5pbUNhY2hlW2FdLCF0aGlzLnNwaW5lRGF0YSl0aHJvdyBuZXcgRXJyb3IoXCJTcGluZSBkYXRhIG11c3QgYmUgcHJlbG9hZGVkIHVzaW5nIFBJWEkuU3BpbmVMb2FkZXIgb3IgUElYSS5Bc3NldExvYWRlcjogXCIrYSk7dGhpcy5za2VsZXRvbj1uZXcgZi5Ta2VsZXRvbih0aGlzLnNwaW5lRGF0YSksdGhpcy5za2VsZXRvbi51cGRhdGVXb3JsZFRyYW5zZm9ybSgpLHRoaXMuc3RhdGVEYXRhPW5ldyBmLkFuaW1hdGlvblN0YXRlRGF0YSh0aGlzLnNwaW5lRGF0YSksdGhpcy5zdGF0ZT1uZXcgZi5BbmltYXRpb25TdGF0ZSh0aGlzLnN0YXRlRGF0YSksdGhpcy5zbG90Q29udGFpbmVycz1bXTtmb3IodmFyIGM9MCxkPXRoaXMuc2tlbGV0b24uZHJhd09yZGVyLmxlbmd0aDtkPmM7YysrKXt2YXIgZT10aGlzLnNrZWxldG9uLmRyYXdPcmRlcltjXSxnPWUuYXR0YWNobWVudCxoPW5ldyBiLkRpc3BsYXlPYmplY3RDb250YWluZXI7aWYodGhpcy5zbG90Q29udGFpbmVycy5wdXNoKGgpLHRoaXMuYWRkQ2hpbGQoaCksZyBpbnN0YW5jZW9mIGYuUmVnaW9uQXR0YWNobWVudCl7dmFyIGk9Zy5yZW5kZXJlck9iamVjdC5uYW1lLGo9dGhpcy5jcmVhdGVTcHJpdGUoZSxnLnJlbmRlcmVyT2JqZWN0KTtlLmN1cnJlbnRTcHJpdGU9aixlLmN1cnJlbnRTcHJpdGVOYW1lPWksaC5hZGRDaGlsZChqKX19fSxiLlNwaW5lLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpLGIuU3BpbmUucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuU3BpbmUsYi5TcGluZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtPWZ1bmN0aW9uKCl7dGhpcy5sYXN0VGltZT10aGlzLmxhc3RUaW1lfHxEYXRlLm5vdygpO3ZhciBhPS4wMDEqKERhdGUubm93KCktdGhpcy5sYXN0VGltZSk7dGhpcy5sYXN0VGltZT1EYXRlLm5vdygpLHRoaXMuc3RhdGUudXBkYXRlKGEpLHRoaXMuc3RhdGUuYXBwbHkodGhpcy5za2VsZXRvbiksdGhpcy5za2VsZXRvbi51cGRhdGVXb3JsZFRyYW5zZm9ybSgpO2Zvcih2YXIgYz10aGlzLnNrZWxldG9uLmRyYXdPcmRlcixkPTAsZT1jLmxlbmd0aDtlPmQ7ZCsrKXt2YXIgZz1jW2RdLGg9Zy5hdHRhY2htZW50LGk9dGhpcy5zbG90Q29udGFpbmVyc1tkXTtpZihoIGluc3RhbmNlb2YgZi5SZWdpb25BdHRhY2htZW50KXtpZihoLnJlbmRlcmVyT2JqZWN0JiYoIWcuY3VycmVudFNwcml0ZU5hbWV8fGcuY3VycmVudFNwcml0ZU5hbWUhPWgubmFtZSkpe3ZhciBqPWgucmVuZGVyZXJPYmplY3QubmFtZTtpZih2b2lkIDAhPT1nLmN1cnJlbnRTcHJpdGUmJihnLmN1cnJlbnRTcHJpdGUudmlzaWJsZT0hMSksZy5zcHJpdGVzPWcuc3ByaXRlc3x8e30sdm9pZCAwIT09Zy5zcHJpdGVzW2pdKWcuc3ByaXRlc1tqXS52aXNpYmxlPSEwO2Vsc2V7dmFyIGs9dGhpcy5jcmVhdGVTcHJpdGUoZyxoLnJlbmRlcmVyT2JqZWN0KTtpLmFkZENoaWxkKGspfWcuY3VycmVudFNwcml0ZT1nLnNwcml0ZXNbal0sZy5jdXJyZW50U3ByaXRlTmFtZT1qfWkudmlzaWJsZT0hMDt2YXIgbD1nLmJvbmU7aS5wb3NpdGlvbi54PWwud29ybGRYK2gueCpsLm0wMCtoLnkqbC5tMDEsaS5wb3NpdGlvbi55PWwud29ybGRZK2gueCpsLm0xMCtoLnkqbC5tMTEsaS5zY2FsZS54PWwud29ybGRTY2FsZVgsaS5zY2FsZS55PWwud29ybGRTY2FsZVksaS5yb3RhdGlvbj0tKGcuYm9uZS53b3JsZFJvdGF0aW9uKk1hdGguUEkvMTgwKSxpLmFscGhhPWcuYSxnLmN1cnJlbnRTcHJpdGUudGludD1iLnJnYjJoZXgoW2cucixnLmcsZy5iXSl9ZWxzZSBpLnZpc2libGU9ITF9Yi5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0uY2FsbCh0aGlzKX0sYi5TcGluZS5wcm90b3R5cGUuY3JlYXRlU3ByaXRlPWZ1bmN0aW9uKGEsYyl7dmFyIGQ9Yi5UZXh0dXJlQ2FjaGVbYy5uYW1lXT9jLm5hbWU6Yy5uYW1lK1wiLnBuZ1wiLGU9bmV3IGIuU3ByaXRlKGIuVGV4dHVyZS5mcm9tRnJhbWUoZCkpO3JldHVybiBlLnNjYWxlPWMuc2NhbGUsZS5yb3RhdGlvbj1jLnJvdGF0aW9uLGUuYW5jaG9yLng9ZS5hbmNob3IueT0uNSxhLnNwcml0ZXM9YS5zcHJpdGVzfHx7fSxhLnNwcml0ZXNbYy5uYW1lXT1lLGV9LGIuQmFzZVRleHR1cmVDYWNoZT17fSxiLnRleHR1cmVzVG9VcGRhdGU9W10sYi50ZXh0dXJlc1RvRGVzdHJveT1bXSxiLkJhc2VUZXh0dXJlQ2FjaGVJZEdlbmVyYXRvcj0wLGIuQmFzZVRleHR1cmU9ZnVuY3Rpb24oYSxjKXtpZihiLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyksdGhpcy53aWR0aD0xMDAsdGhpcy5oZWlnaHQ9MTAwLHRoaXMuc2NhbGVNb2RlPWN8fGIuc2NhbGVNb2Rlcy5ERUZBVUxULHRoaXMuaGFzTG9hZGVkPSExLHRoaXMuc291cmNlPWEsdGhpcy5pZD1iLkJhc2VUZXh0dXJlQ2FjaGVJZEdlbmVyYXRvcisrLHRoaXMucHJlbXVsdGlwbGllZEFscGhhPSEwLHRoaXMuX2dsVGV4dHVyZXM9W10sdGhpcy5fZGlydHk9W10sYSl7aWYoKHRoaXMuc291cmNlLmNvbXBsZXRlfHx0aGlzLnNvdXJjZS5nZXRDb250ZXh0KSYmdGhpcy5zb3VyY2Uud2lkdGgmJnRoaXMuc291cmNlLmhlaWdodCl0aGlzLmhhc0xvYWRlZD0hMCx0aGlzLndpZHRoPXRoaXMuc291cmNlLndpZHRoLHRoaXMuaGVpZ2h0PXRoaXMuc291cmNlLmhlaWdodCxiLnRleHR1cmVzVG9VcGRhdGUucHVzaCh0aGlzKTtlbHNle3ZhciBkPXRoaXM7dGhpcy5zb3VyY2Uub25sb2FkPWZ1bmN0aW9uKCl7ZC5oYXNMb2FkZWQ9ITAsZC53aWR0aD1kLnNvdXJjZS53aWR0aCxkLmhlaWdodD1kLnNvdXJjZS5oZWlnaHQ7Zm9yKHZhciBhPTA7YTxkLl9nbFRleHR1cmVzLmxlbmd0aDthKyspZC5fZGlydHlbYV09ITA7ZC5kaXNwYXRjaEV2ZW50KHt0eXBlOlwibG9hZGVkXCIsY29udGVudDpkfSl9LHRoaXMuc291cmNlLm9uZXJyb3I9ZnVuY3Rpb24oKXtkLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJlcnJvclwiLGNvbnRlbnQ6ZH0pfX10aGlzLmltYWdlVXJsPW51bGwsdGhpcy5fcG93ZXJPZjI9ITF9fSxiLkJhc2VUZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkJhc2VUZXh0dXJlLGIuQmFzZVRleHR1cmUucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLmltYWdlVXJsPyhkZWxldGUgYi5CYXNlVGV4dHVyZUNhY2hlW3RoaXMuaW1hZ2VVcmxdLGRlbGV0ZSBiLlRleHR1cmVDYWNoZVt0aGlzLmltYWdlVXJsXSx0aGlzLmltYWdlVXJsPW51bGwsdGhpcy5zb3VyY2Uuc3JjPW51bGwpOnRoaXMuc291cmNlJiZ0aGlzLnNvdXJjZS5fcGl4aUlkJiZkZWxldGUgYi5CYXNlVGV4dHVyZUNhY2hlW3RoaXMuc291cmNlLl9waXhpSWRdLHRoaXMuc291cmNlPW51bGwsYi50ZXh0dXJlc1RvRGVzdHJveS5wdXNoKHRoaXMpfSxiLkJhc2VUZXh0dXJlLnByb3RvdHlwZS51cGRhdGVTb3VyY2VJbWFnZT1mdW5jdGlvbihhKXt0aGlzLmhhc0xvYWRlZD0hMSx0aGlzLnNvdXJjZS5zcmM9bnVsbCx0aGlzLnNvdXJjZS5zcmM9YX0sYi5CYXNlVGV4dHVyZS5mcm9tSW1hZ2U9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWIuQmFzZVRleHR1cmVDYWNoZVthXTtpZih2b2lkIDA9PT1jJiYtMT09PWEuaW5kZXhPZihcImRhdGE6XCIpJiYoYz0hMCksIWUpe3ZhciBmPW5ldyBJbWFnZTtjJiYoZi5jcm9zc09yaWdpbj1cIlwiKSxmLnNyYz1hLGU9bmV3IGIuQmFzZVRleHR1cmUoZixkKSxlLmltYWdlVXJsPWEsYi5CYXNlVGV4dHVyZUNhY2hlW2FdPWV9cmV0dXJuIGV9LGIuQmFzZVRleHR1cmUuZnJvbUNhbnZhcz1mdW5jdGlvbihhLGMpe2EuX3BpeGlJZHx8KGEuX3BpeGlJZD1cImNhbnZhc19cIitiLlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yKyspO3ZhciBkPWIuQmFzZVRleHR1cmVDYWNoZVthLl9waXhpSWRdO3JldHVybiBkfHwoZD1uZXcgYi5CYXNlVGV4dHVyZShhLGMpLGIuQmFzZVRleHR1cmVDYWNoZVthLl9waXhpSWRdPWQpLGR9LGIuVGV4dHVyZUNhY2hlPXt9LGIuRnJhbWVDYWNoZT17fSxiLlRleHR1cmVDYWNoZUlkR2VuZXJhdG9yPTAsYi5UZXh0dXJlPWZ1bmN0aW9uKGEsYyl7aWYoYi5FdmVudFRhcmdldC5jYWxsKHRoaXMpLHRoaXMubm9GcmFtZT0hMSxjfHwodGhpcy5ub0ZyYW1lPSEwLGM9bmV3IGIuUmVjdGFuZ2xlKDAsMCwxLDEpKSxhIGluc3RhbmNlb2YgYi5UZXh0dXJlJiYoYT1hLmJhc2VUZXh0dXJlKSx0aGlzLmJhc2VUZXh0dXJlPWEsdGhpcy5mcmFtZT1jLHRoaXMudHJpbT1udWxsLHRoaXMudmFsaWQ9ITEsdGhpcy5zY29wZT10aGlzLHRoaXMuX3V2cz1udWxsLHRoaXMud2lkdGg9MCx0aGlzLmhlaWdodD0wLHRoaXMuY3JvcD1uZXcgYi5SZWN0YW5nbGUoMCwwLDEsMSksYS5oYXNMb2FkZWQpdGhpcy5ub0ZyYW1lJiYoYz1uZXcgYi5SZWN0YW5nbGUoMCwwLGEud2lkdGgsYS5oZWlnaHQpKSx0aGlzLnNldEZyYW1lKGMpO2Vsc2V7dmFyIGQ9dGhpczthLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIixmdW5jdGlvbigpe2Qub25CYXNlVGV4dHVyZUxvYWRlZCgpfSl9fSxiLlRleHR1cmUucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuVGV4dHVyZSxiLlRleHR1cmUucHJvdG90eXBlLm9uQmFzZVRleHR1cmVMb2FkZWQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmJhc2VUZXh0dXJlO2EucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLHRoaXMub25Mb2FkZWQpLHRoaXMubm9GcmFtZSYmKHRoaXMuZnJhbWU9bmV3IGIuUmVjdGFuZ2xlKDAsMCxhLndpZHRoLGEuaGVpZ2h0KSksdGhpcy5zZXRGcmFtZSh0aGlzLmZyYW1lKSx0aGlzLnNjb3BlLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJ1cGRhdGVcIixjb250ZW50OnRoaXN9KX0sYi5UZXh0dXJlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKGEpe2EmJnRoaXMuYmFzZVRleHR1cmUuZGVzdHJveSgpLHRoaXMudmFsaWQ9ITF9LGIuVGV4dHVyZS5wcm90b3R5cGUuc2V0RnJhbWU9ZnVuY3Rpb24oYSl7aWYodGhpcy5ub0ZyYW1lPSExLHRoaXMuZnJhbWU9YSx0aGlzLndpZHRoPWEud2lkdGgsdGhpcy5oZWlnaHQ9YS5oZWlnaHQsdGhpcy5jcm9wLng9YS54LHRoaXMuY3JvcC55PWEueSx0aGlzLmNyb3Aud2lkdGg9YS53aWR0aCx0aGlzLmNyb3AuaGVpZ2h0PWEuaGVpZ2h0LCF0aGlzLnRyaW0mJihhLngrYS53aWR0aD50aGlzLmJhc2VUZXh0dXJlLndpZHRofHxhLnkrYS5oZWlnaHQ+dGhpcy5iYXNlVGV4dHVyZS5oZWlnaHQpKXRocm93IG5ldyBFcnJvcihcIlRleHR1cmUgRXJyb3I6IGZyYW1lIGRvZXMgbm90IGZpdCBpbnNpZGUgdGhlIGJhc2UgVGV4dHVyZSBkaW1lbnNpb25zIFwiK3RoaXMpO3RoaXMudmFsaWQ9YSYmYS53aWR0aCYmYS5oZWlnaHQmJnRoaXMuYmFzZVRleHR1cmUuc291cmNlJiZ0aGlzLmJhc2VUZXh0dXJlLmhhc0xvYWRlZCx0aGlzLnRyaW0mJih0aGlzLndpZHRoPXRoaXMudHJpbS53aWR0aCx0aGlzLmhlaWdodD10aGlzLnRyaW0uaGVpZ2h0LHRoaXMuZnJhbWUud2lkdGg9dGhpcy50cmltLndpZHRoLHRoaXMuZnJhbWUuaGVpZ2h0PXRoaXMudHJpbS5oZWlnaHQpLHRoaXMudmFsaWQmJmIuVGV4dHVyZS5mcmFtZVVwZGF0ZXMucHVzaCh0aGlzKX0sYi5UZXh0dXJlLnByb3RvdHlwZS5fdXBkYXRlV2ViR0x1dnM9ZnVuY3Rpb24oKXt0aGlzLl91dnN8fCh0aGlzLl91dnM9bmV3IGIuVGV4dHVyZVV2cyk7dmFyIGE9dGhpcy5jcm9wLGM9dGhpcy5iYXNlVGV4dHVyZS53aWR0aCxkPXRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0O3RoaXMuX3V2cy54MD1hLngvYyx0aGlzLl91dnMueTA9YS55L2QsdGhpcy5fdXZzLngxPShhLngrYS53aWR0aCkvYyx0aGlzLl91dnMueTE9YS55L2QsdGhpcy5fdXZzLngyPShhLngrYS53aWR0aCkvYyx0aGlzLl91dnMueTI9KGEueSthLmhlaWdodCkvZCx0aGlzLl91dnMueDM9YS54L2MsdGhpcy5fdXZzLnkzPShhLnkrYS5oZWlnaHQpL2R9LGIuVGV4dHVyZS5mcm9tSW1hZ2U9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWIuVGV4dHVyZUNhY2hlW2FdO3JldHVybiBlfHwoZT1uZXcgYi5UZXh0dXJlKGIuQmFzZVRleHR1cmUuZnJvbUltYWdlKGEsYyxkKSksYi5UZXh0dXJlQ2FjaGVbYV09ZSksZX0sYi5UZXh0dXJlLmZyb21GcmFtZT1mdW5jdGlvbihhKXt2YXIgYz1iLlRleHR1cmVDYWNoZVthXTtpZighYyl0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmcmFtZUlkIFwiJythKydcIiBkb2VzIG5vdCBleGlzdCBpbiB0aGUgdGV4dHVyZSBjYWNoZSAnKTtyZXR1cm4gY30sYi5UZXh0dXJlLmZyb21DYW52YXM9ZnVuY3Rpb24oYSxjKXt2YXIgZD1iLkJhc2VUZXh0dXJlLmZyb21DYW52YXMoYSxjKTtyZXR1cm4gbmV3IGIuVGV4dHVyZShkKX0sYi5UZXh0dXJlLmFkZFRleHR1cmVUb0NhY2hlPWZ1bmN0aW9uKGEsYyl7Yi5UZXh0dXJlQ2FjaGVbY109YX0sYi5UZXh0dXJlLnJlbW92ZVRleHR1cmVGcm9tQ2FjaGU9ZnVuY3Rpb24oYSl7dmFyIGM9Yi5UZXh0dXJlQ2FjaGVbYV07cmV0dXJuIGRlbGV0ZSBiLlRleHR1cmVDYWNoZVthXSxkZWxldGUgYi5CYXNlVGV4dHVyZUNhY2hlW2FdLGN9LGIuVGV4dHVyZS5mcmFtZVVwZGF0ZXM9W10sYi5UZXh0dXJlVXZzPWZ1bmN0aW9uKCl7dGhpcy54MD0wLHRoaXMueTA9MCx0aGlzLngxPTAsdGhpcy55MT0wLHRoaXMueDI9MCx0aGlzLnkyPTAsdGhpcy54Mz0wLHRoaXMueTM9MH0sYi5SZW5kZXJUZXh0dXJlPWZ1bmN0aW9uKGEsYyxkLGUpe2lmKGIuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLndpZHRoPWF8fDEwMCx0aGlzLmhlaWdodD1jfHwxMDAsdGhpcy5mcmFtZT1uZXcgYi5SZWN0YW5nbGUoMCwwLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpLHRoaXMuY3JvcD1uZXcgYi5SZWN0YW5nbGUoMCwwLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpLHRoaXMuYmFzZVRleHR1cmU9bmV3IGIuQmFzZVRleHR1cmUsdGhpcy5iYXNlVGV4dHVyZS53aWR0aD10aGlzLndpZHRoLHRoaXMuYmFzZVRleHR1cmUuaGVpZ2h0PXRoaXMuaGVpZ2h0LHRoaXMuYmFzZVRleHR1cmUuX2dsVGV4dHVyZXM9W10sdGhpcy5iYXNlVGV4dHVyZS5zY2FsZU1vZGU9ZXx8Yi5zY2FsZU1vZGVzLkRFRkFVTFQsdGhpcy5iYXNlVGV4dHVyZS5oYXNMb2FkZWQ9ITAsdGhpcy5yZW5kZXJlcj1kfHxiLmRlZmF1bHRSZW5kZXJlcix0aGlzLnJlbmRlcmVyLnR5cGU9PT1iLldFQkdMX1JFTkRFUkVSKXt2YXIgZj10aGlzLnJlbmRlcmVyLmdsO3RoaXMudGV4dHVyZUJ1ZmZlcj1uZXcgYi5GaWx0ZXJUZXh0dXJlKGYsdGhpcy53aWR0aCx0aGlzLmhlaWdodCx0aGlzLmJhc2VUZXh0dXJlLnNjYWxlTW9kZSksdGhpcy5iYXNlVGV4dHVyZS5fZ2xUZXh0dXJlc1tmLmlkXT10aGlzLnRleHR1cmVCdWZmZXIudGV4dHVyZSx0aGlzLnJlbmRlcj10aGlzLnJlbmRlcldlYkdMLHRoaXMucHJvamVjdGlvbj1uZXcgYi5Qb2ludCh0aGlzLndpZHRoLzIsLXRoaXMuaGVpZ2h0LzIpfWVsc2UgdGhpcy5yZW5kZXI9dGhpcy5yZW5kZXJDYW52YXMsdGhpcy50ZXh0dXJlQnVmZmVyPW5ldyBiLkNhbnZhc0J1ZmZlcih0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSx0aGlzLmJhc2VUZXh0dXJlLnNvdXJjZT10aGlzLnRleHR1cmVCdWZmZXIuY2FudmFzO3RoaXMudmFsaWQ9ITAsYi5UZXh0dXJlLmZyYW1lVXBkYXRlcy5wdXNoKHRoaXMpfSxiLlJlbmRlclRleHR1cmUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5UZXh0dXJlLnByb3RvdHlwZSksYi5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlJlbmRlclRleHR1cmUsYi5SZW5kZXJUZXh0dXJlLnByb3RvdHlwZS5yZXNpemU9ZnVuY3Rpb24oYSxjLGQpeyhhIT09dGhpcy53aWR0aHx8YyE9PXRoaXMuaGVpZ2h0KSYmKHRoaXMud2lkdGg9dGhpcy5mcmFtZS53aWR0aD10aGlzLmNyb3Aud2lkdGg9YSx0aGlzLmhlaWdodD10aGlzLmZyYW1lLmhlaWdodD10aGlzLmNyb3AuaGVpZ2h0PWMsZCYmKHRoaXMuYmFzZVRleHR1cmUud2lkdGg9dGhpcy53aWR0aCx0aGlzLmJhc2VUZXh0dXJlLmhlaWdodD10aGlzLmhlaWdodCksdGhpcy5yZW5kZXJlci50eXBlPT09Yi5XRUJHTF9SRU5ERVJFUiYmKHRoaXMucHJvamVjdGlvbi54PXRoaXMud2lkdGgvMix0aGlzLnByb2plY3Rpb24ueT0tdGhpcy5oZWlnaHQvMiksdGhpcy50ZXh0dXJlQnVmZmVyLnJlc2l6ZSh0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KSl9LGIuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLnJlbmRlcmVyLnR5cGU9PT1iLldFQkdMX1JFTkRFUkVSJiZ0aGlzLnJlbmRlcmVyLmdsLmJpbmRGcmFtZWJ1ZmZlcih0aGlzLnJlbmRlcmVyLmdsLkZSQU1FQlVGRkVSLHRoaXMudGV4dHVyZUJ1ZmZlci5mcmFtZUJ1ZmZlciksdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCl9LGIuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUucmVuZGVyV2ViR0w9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPXRoaXMucmVuZGVyZXIuZ2w7ZS5jb2xvck1hc2soITAsITAsITAsITApLGUudmlld3BvcnQoMCwwLHRoaXMud2lkdGgsdGhpcy5oZWlnaHQpLGUuYmluZEZyYW1lYnVmZmVyKGUuRlJBTUVCVUZGRVIsdGhpcy50ZXh0dXJlQnVmZmVyLmZyYW1lQnVmZmVyKSxkJiZ0aGlzLnRleHR1cmVCdWZmZXIuY2xlYXIoKTt2YXIgZj1hLmNoaWxkcmVuLGc9YS53b3JsZFRyYW5zZm9ybTthLndvcmxkVHJhbnNmb3JtPWIuUmVuZGVyVGV4dHVyZS50ZW1wTWF0cml4LGEud29ybGRUcmFuc2Zvcm0uZD0tMSxhLndvcmxkVHJhbnNmb3JtLnR5PS0yKnRoaXMucHJvamVjdGlvbi55LGMmJihhLndvcmxkVHJhbnNmb3JtLnR4PWMueCxhLndvcmxkVHJhbnNmb3JtLnR5LT1jLnkpO2Zvcih2YXIgaD0wLGk9Zi5sZW5ndGg7aT5oO2grKylmW2hdLnVwZGF0ZVRyYW5zZm9ybSgpO2IuV2ViR0xSZW5kZXJlci51cGRhdGVUZXh0dXJlcygpLHRoaXMucmVuZGVyZXIuc3ByaXRlQmF0Y2guZGlydHk9ITAsdGhpcy5yZW5kZXJlci5yZW5kZXJEaXNwbGF5T2JqZWN0KGEsdGhpcy5wcm9qZWN0aW9uLHRoaXMudGV4dHVyZUJ1ZmZlci5mcmFtZUJ1ZmZlciksYS53b3JsZFRyYW5zZm9ybT1nLHRoaXMucmVuZGVyZXIuc3ByaXRlQmF0Y2guZGlydHk9ITB9LGIuUmVuZGVyVGV4dHVyZS5wcm90b3R5cGUucmVuZGVyQ2FudmFzPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1hLmNoaWxkcmVuLGY9YS53b3JsZFRyYW5zZm9ybTthLndvcmxkVHJhbnNmb3JtPWIuUmVuZGVyVGV4dHVyZS50ZW1wTWF0cml4LGM/KGEud29ybGRUcmFuc2Zvcm0udHg9Yy54LGEud29ybGRUcmFuc2Zvcm0udHk9Yy55KTooYS53b3JsZFRyYW5zZm9ybS50eD0wLGEud29ybGRUcmFuc2Zvcm0udHk9MCk7Zm9yKHZhciBnPTAsaD1lLmxlbmd0aDtoPmc7ZysrKWVbZ10udXBkYXRlVHJhbnNmb3JtKCk7ZCYmdGhpcy50ZXh0dXJlQnVmZmVyLmNsZWFyKCk7dmFyIGk9dGhpcy50ZXh0dXJlQnVmZmVyLmNvbnRleHQ7dGhpcy5yZW5kZXJlci5yZW5kZXJEaXNwbGF5T2JqZWN0KGEsaSksaS5zZXRUcmFuc2Zvcm0oMSwwLDAsMSwwLDApLGEud29ybGRUcmFuc2Zvcm09Zn0sYi5SZW5kZXJUZXh0dXJlLnRlbXBNYXRyaXg9bmV3IGIuTWF0cml4LGIuQXNzZXRMb2FkZXI9ZnVuY3Rpb24oYSxjKXtiLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyksdGhpcy5hc3NldFVSTHM9YSx0aGlzLmNyb3Nzb3JpZ2luPWMsdGhpcy5sb2FkZXJzQnlUeXBlPXtqcGc6Yi5JbWFnZUxvYWRlcixqcGVnOmIuSW1hZ2VMb2FkZXIscG5nOmIuSW1hZ2VMb2FkZXIsZ2lmOmIuSW1hZ2VMb2FkZXIsd2VicDpiLkltYWdlTG9hZGVyLGpzb246Yi5Kc29uTG9hZGVyLGF0bGFzOmIuQXRsYXNMb2FkZXIsYW5pbTpiLlNwaW5lTG9hZGVyLHhtbDpiLkJpdG1hcEZvbnRMb2FkZXIsZm50OmIuQml0bWFwRm9udExvYWRlcn19LGIuQXNzZXRMb2FkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuQXNzZXRMb2FkZXIsYi5Bc3NldExvYWRlci5wcm90b3R5cGUuX2dldERhdGFUeXBlPWZ1bmN0aW9uKGEpe3ZhciBiPVwiZGF0YTpcIixjPWEuc2xpY2UoMCxiLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtpZihjPT09Yil7dmFyIGQ9YS5zbGljZShiLmxlbmd0aCksZT1kLmluZGV4T2YoXCIsXCIpO2lmKC0xPT09ZSlyZXR1cm4gbnVsbDt2YXIgZj1kLnNsaWNlKDAsZSkuc3BsaXQoXCI7XCIpWzBdO3JldHVybiBmJiZcInRleHQvcGxhaW5cIiE9PWYudG9Mb3dlckNhc2UoKT9mLnNwbGl0KFwiL1wiKS5wb3AoKS50b0xvd2VyQ2FzZSgpOlwidHh0XCJ9cmV0dXJuIG51bGx9LGIuQXNzZXRMb2FkZXIucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe2Iub25Bc3NldExvYWRlZChhLmNvbnRlbnQpfXZhciBiPXRoaXM7dGhpcy5sb2FkQ291bnQ9dGhpcy5hc3NldFVSTHMubGVuZ3RoO2Zvcih2YXIgYz0wO2M8dGhpcy5hc3NldFVSTHMubGVuZ3RoO2MrKyl7dmFyIGQ9dGhpcy5hc3NldFVSTHNbY10sZT10aGlzLl9nZXREYXRhVHlwZShkKTtlfHwoZT1kLnNwbGl0KFwiP1wiKS5zaGlmdCgpLnNwbGl0KFwiLlwiKS5wb3AoKS50b0xvd2VyQ2FzZSgpKTt2YXIgZj10aGlzLmxvYWRlcnNCeVR5cGVbZV07aWYoIWYpdGhyb3cgbmV3IEVycm9yKGUrXCIgaXMgYW4gdW5zdXBwb3J0ZWQgZmlsZSB0eXBlXCIpO3ZhciBnPW5ldyBmKGQsdGhpcy5jcm9zc29yaWdpbik7Zy5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsYSksZy5sb2FkKCl9fSxiLkFzc2V0TG9hZGVyLnByb3RvdHlwZS5vbkFzc2V0TG9hZGVkPWZ1bmN0aW9uKGEpe3RoaXMubG9hZENvdW50LS0sdGhpcy5kaXNwYXRjaEV2ZW50KHt0eXBlOlwib25Qcm9ncmVzc1wiLGNvbnRlbnQ6dGhpcyxsb2FkZXI6YX0pLHRoaXMub25Qcm9ncmVzcyYmdGhpcy5vblByb2dyZXNzKGEpLHRoaXMubG9hZENvdW50fHwodGhpcy5kaXNwYXRjaEV2ZW50KHt0eXBlOlwib25Db21wbGV0ZVwiLGNvbnRlbnQ6dGhpc30pLHRoaXMub25Db21wbGV0ZSYmdGhpcy5vbkNvbXBsZXRlKCkpfSxiLkpzb25Mb2FkZXI9ZnVuY3Rpb24oYSxjKXtiLkV2ZW50VGFyZ2V0LmNhbGwodGhpcyksdGhpcy51cmw9YSx0aGlzLmNyb3Nzb3JpZ2luPWMsdGhpcy5iYXNlVXJsPWEucmVwbGFjZSgvW15cXC9dKiQvLFwiXCIpLHRoaXMubG9hZGVkPSExfSxiLkpzb25Mb2FkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuSnNvbkxvYWRlcixiLkpzb25Mb2FkZXIucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3dpbmRvdy5YRG9tYWluUmVxdWVzdCYmYS5jcm9zc29yaWdpbj8odGhpcy5hamF4UmVxdWVzdD1uZXcgd2luZG93LlhEb21haW5SZXF1ZXN0LHRoaXMuYWpheFJlcXVlc3QudGltZW91dD0zZTMsdGhpcy5hamF4UmVxdWVzdC5vbmVycm9yPWZ1bmN0aW9uKCl7YS5vbkVycm9yKCl9LHRoaXMuYWpheFJlcXVlc3Qub250aW1lb3V0PWZ1bmN0aW9uKCl7YS5vbkVycm9yKCl9LHRoaXMuYWpheFJlcXVlc3Qub25wcm9ncmVzcz1mdW5jdGlvbigpe30pOnRoaXMuYWpheFJlcXVlc3Q9d2luZG93LlhNTEh0dHBSZXF1ZXN0P25ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3Q6bmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFBcIiksdGhpcy5hamF4UmVxdWVzdC5vbmxvYWQ9ZnVuY3Rpb24oKXthLm9uSlNPTkxvYWRlZCgpfSx0aGlzLmFqYXhSZXF1ZXN0Lm9wZW4oXCJHRVRcIix0aGlzLnVybCwhMCksdGhpcy5hamF4UmVxdWVzdC5zZW5kKCl9LGIuSnNvbkxvYWRlci5wcm90b3R5cGUub25KU09OTG9hZGVkPWZ1bmN0aW9uKCl7aWYoIXRoaXMuYWpheFJlcXVlc3QucmVzcG9uc2VUZXh0KXJldHVybiB0aGlzLm9uRXJyb3IoKSx2b2lkIDA7aWYodGhpcy5qc29uPUpTT04ucGFyc2UodGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQpLHRoaXMuanNvbi5mcmFtZXMpe3ZhciBhPXRoaXMsYz10aGlzLmJhc2VVcmwrdGhpcy5qc29uLm1ldGEuaW1hZ2UsZD1uZXcgYi5JbWFnZUxvYWRlcihjLHRoaXMuY3Jvc3NvcmlnaW4pLGU9dGhpcy5qc29uLmZyYW1lczt0aGlzLnRleHR1cmU9ZC50ZXh0dXJlLmJhc2VUZXh0dXJlLGQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLGZ1bmN0aW9uKCl7YS5vbkxvYWRlZCgpfSk7Zm9yKHZhciBnIGluIGUpe3ZhciBoPWVbZ10uZnJhbWU7aWYoaCYmKGIuVGV4dHVyZUNhY2hlW2ddPW5ldyBiLlRleHR1cmUodGhpcy50ZXh0dXJlLHt4OmgueCx5OmgueSx3aWR0aDpoLncsaGVpZ2h0OmguaH0pLGIuVGV4dHVyZUNhY2hlW2ddLmNyb3A9bmV3IGIuUmVjdGFuZ2xlKGgueCxoLnksaC53LGguaCksZVtnXS50cmltbWVkKSl7dmFyIGk9ZVtnXS5zb3VyY2VTaXplLGo9ZVtnXS5zcHJpdGVTb3VyY2VTaXplO2IuVGV4dHVyZUNhY2hlW2ddLnRyaW09bmV3IGIuUmVjdGFuZ2xlKGoueCxqLnksaS53LGkuaCl9fWQubG9hZCgpfWVsc2UgaWYodGhpcy5qc29uLmJvbmVzKXt2YXIgaz1uZXcgZi5Ta2VsZXRvbkpzb24sbD1rLnJlYWRTa2VsZXRvbkRhdGEodGhpcy5qc29uKTtiLkFuaW1DYWNoZVt0aGlzLnVybF09bCx0aGlzLm9uTG9hZGVkKCl9ZWxzZSB0aGlzLm9uTG9hZGVkKCl9LGIuSnNvbkxvYWRlci5wcm90b3R5cGUub25Mb2FkZWQ9ZnVuY3Rpb24oKXt0aGlzLmxvYWRlZD0hMCx0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJsb2FkZWRcIixjb250ZW50OnRoaXN9KX0sYi5Kc29uTG9hZGVyLnByb3RvdHlwZS5vbkVycm9yPWZ1bmN0aW9uKCl7dGhpcy5kaXNwYXRjaEV2ZW50KHt0eXBlOlwiZXJyb3JcIixjb250ZW50OnRoaXN9KX0sYi5BdGxhc0xvYWRlcj1mdW5jdGlvbihhLGMpe2IuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLnVybD1hLHRoaXMuYmFzZVVybD1hLnJlcGxhY2UoL1teXFwvXSokLyxcIlwiKSx0aGlzLmNyb3Nzb3JpZ2luPWMsdGhpcy5sb2FkZWQ9ITF9LGIuQXRsYXNMb2FkZXIuY29uc3RydWN0b3I9Yi5BdGxhc0xvYWRlcixiLkF0bGFzTG9hZGVyLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKCl7dGhpcy5hamF4UmVxdWVzdD1uZXcgYi5BamF4UmVxdWVzdCx0aGlzLmFqYXhSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZT10aGlzLm9uQXRsYXNMb2FkZWQuYmluZCh0aGlzKSx0aGlzLmFqYXhSZXF1ZXN0Lm9wZW4oXCJHRVRcIix0aGlzLnVybCwhMCksdGhpcy5hamF4UmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlJiZ0aGlzLmFqYXhSZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoXCJhcHBsaWNhdGlvbi9qc29uXCIpLHRoaXMuYWpheFJlcXVlc3Quc2VuZChudWxsKX0sYi5BdGxhc0xvYWRlci5wcm90b3R5cGUub25BdGxhc0xvYWRlZD1mdW5jdGlvbigpe2lmKDQ9PT10aGlzLmFqYXhSZXF1ZXN0LnJlYWR5U3RhdGUpaWYoMjAwPT09dGhpcy5hamF4UmVxdWVzdC5zdGF0dXN8fC0xPT09d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcImh0dHBcIikpe3RoaXMuYXRsYXM9e21ldGE6e2ltYWdlOltdfSxmcmFtZXM6W119O3ZhciBhPXRoaXMuYWpheFJlcXVlc3QucmVzcG9uc2VUZXh0LnNwbGl0KC9cXHI/XFxuLyksYz0tMyxkPTAsZT1udWxsLGY9ITEsZz0wLGg9MCxpPXRoaXMub25Mb2FkZWQuYmluZCh0aGlzKTtmb3IoZz0wO2c8YS5sZW5ndGg7ZysrKWlmKGFbZ109YVtnXS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpLFwiXCI9PT1hW2ddJiYoZj1nKzEpLGFbZ10ubGVuZ3RoPjApe2lmKGY9PT1nKXRoaXMuYXRsYXMubWV0YS5pbWFnZS5wdXNoKGFbZ10pLGQ9dGhpcy5hdGxhcy5tZXRhLmltYWdlLmxlbmd0aC0xLHRoaXMuYXRsYXMuZnJhbWVzLnB1c2goe30pLGM9LTM7ZWxzZSBpZihjPjApaWYoYyU3PT09MSludWxsIT1lJiYodGhpcy5hdGxhcy5mcmFtZXNbZF1bZS5uYW1lXT1lKSxlPXtuYW1lOmFbZ10sZnJhbWU6e319O2Vsc2V7dmFyIGo9YVtnXS5zcGxpdChcIiBcIik7aWYoYyU3PT09MyllLmZyYW1lLng9TnVtYmVyKGpbMV0ucmVwbGFjZShcIixcIixcIlwiKSksZS5mcmFtZS55PU51bWJlcihqWzJdKTtlbHNlIGlmKGMlNz09PTQpZS5mcmFtZS53PU51bWJlcihqWzFdLnJlcGxhY2UoXCIsXCIsXCJcIikpLGUuZnJhbWUuaD1OdW1iZXIoalsyXSk7ZWxzZSBpZihjJTc9PT01KXt2YXIgaz17eDowLHk6MCx3Ok51bWJlcihqWzFdLnJlcGxhY2UoXCIsXCIsXCJcIikpLGg6TnVtYmVyKGpbMl0pfTtrLnc+ZS5mcmFtZS53fHxrLmg+ZS5mcmFtZS5oPyhlLnRyaW1tZWQ9ITAsZS5yZWFsU2l6ZT1rKTplLnRyaW1tZWQ9ITF9fWMrK31pZihudWxsIT1lJiYodGhpcy5hdGxhcy5mcmFtZXNbZF1bZS5uYW1lXT1lKSx0aGlzLmF0bGFzLm1ldGEuaW1hZ2UubGVuZ3RoPjApe2Zvcih0aGlzLmltYWdlcz1bXSxoPTA7aDx0aGlzLmF0bGFzLm1ldGEuaW1hZ2UubGVuZ3RoO2grKyl7dmFyIGw9dGhpcy5iYXNlVXJsK3RoaXMuYXRsYXMubWV0YS5pbWFnZVtoXSxtPXRoaXMuYXRsYXMuZnJhbWVzW2hdO3RoaXMuaW1hZ2VzLnB1c2gobmV3IGIuSW1hZ2VMb2FkZXIobCx0aGlzLmNyb3Nzb3JpZ2luKSk7Zm9yKGcgaW4gbSl7dmFyIG49bVtnXS5mcmFtZTtuJiYoYi5UZXh0dXJlQ2FjaGVbZ109bmV3IGIuVGV4dHVyZSh0aGlzLmltYWdlc1toXS50ZXh0dXJlLmJhc2VUZXh0dXJlLHt4Om4ueCx5Om4ueSx3aWR0aDpuLncsaGVpZ2h0Om4uaH0pLG1bZ10udHJpbW1lZCYmKGIuVGV4dHVyZUNhY2hlW2ddLnJlYWxTaXplPW1bZ10ucmVhbFNpemUsYi5UZXh0dXJlQ2FjaGVbZ10udHJpbS54PTAsYi5UZXh0dXJlQ2FjaGVbZ10udHJpbS55PTApKX19Zm9yKHRoaXMuY3VycmVudEltYWdlSWQ9MCxoPTA7aDx0aGlzLmltYWdlcy5sZW5ndGg7aCsrKXRoaXMuaW1hZ2VzW2hdLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIixpKTt0aGlzLmltYWdlc1t0aGlzLmN1cnJlbnRJbWFnZUlkXS5sb2FkKCl9ZWxzZSB0aGlzLm9uTG9hZGVkKCl9ZWxzZSB0aGlzLm9uRXJyb3IoKX0sYi5BdGxhc0xvYWRlci5wcm90b3R5cGUub25Mb2FkZWQ9ZnVuY3Rpb24oKXt0aGlzLmltYWdlcy5sZW5ndGgtMT50aGlzLmN1cnJlbnRJbWFnZUlkPyh0aGlzLmN1cnJlbnRJbWFnZUlkKyssdGhpcy5pbWFnZXNbdGhpcy5jdXJyZW50SW1hZ2VJZF0ubG9hZCgpKToodGhpcy5sb2FkZWQ9ITAsdGhpcy5kaXNwYXRjaEV2ZW50KHt0eXBlOlwibG9hZGVkXCIsY29udGVudDp0aGlzfSkpfSxiLkF0bGFzTG9hZGVyLnByb3RvdHlwZS5vbkVycm9yPWZ1bmN0aW9uKCl7dGhpcy5kaXNwYXRjaEV2ZW50KHt0eXBlOlwiZXJyb3JcIixjb250ZW50OnRoaXN9KX0sYi5TcHJpdGVTaGVldExvYWRlcj1mdW5jdGlvbihhLGMpe2IuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLnVybD1hLHRoaXMuY3Jvc3NvcmlnaW49Yyx0aGlzLmJhc2VVcmw9YS5yZXBsYWNlKC9bXlxcL10qJC8sXCJcIiksdGhpcy50ZXh0dXJlPW51bGwsdGhpcy5mcmFtZXM9e319LGIuU3ByaXRlU2hlZXRMb2FkZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuU3ByaXRlU2hlZXRMb2FkZXIsYi5TcHJpdGVTaGVldExvYWRlci5wcm90b3R5cGUubG9hZD1mdW5jdGlvbigpe3ZhciBhPXRoaXMsYz1uZXcgYi5Kc29uTG9hZGVyKHRoaXMudXJsLHRoaXMuY3Jvc3NvcmlnaW4pO2MuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLGZ1bmN0aW9uKGIpe2EuanNvbj1iLmNvbnRlbnQuanNvbixhLm9uTG9hZGVkKCl9KSxjLmxvYWQoKX0sYi5TcHJpdGVTaGVldExvYWRlci5wcm90b3R5cGUub25Mb2FkZWQ9ZnVuY3Rpb24oKXt0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJsb2FkZWRcIixjb250ZW50OnRoaXN9KX0sYi5JbWFnZUxvYWRlcj1mdW5jdGlvbihhLGMpe2IuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLnRleHR1cmU9Yi5UZXh0dXJlLmZyb21JbWFnZShhLGMpLHRoaXMuZnJhbWVzPVtdfSxiLkltYWdlTG9hZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkltYWdlTG9hZGVyLGIuSW1hZ2VMb2FkZXIucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oKXtpZih0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUuaGFzTG9hZGVkKXRoaXMub25Mb2FkZWQoKTtlbHNle3ZhciBhPXRoaXM7dGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIixmdW5jdGlvbigpe2Eub25Mb2FkZWQoKX0pfX0sYi5JbWFnZUxvYWRlci5wcm90b3R5cGUub25Mb2FkZWQ9ZnVuY3Rpb24oKXt0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJsb2FkZWRcIixjb250ZW50OnRoaXN9KX0sYi5JbWFnZUxvYWRlci5wcm90b3R5cGUubG9hZEZyYW1lZFNwcml0ZVNoZWV0PWZ1bmN0aW9uKGEsYyxkKXt0aGlzLmZyYW1lcz1bXTtmb3IodmFyIGU9TWF0aC5mbG9vcih0aGlzLnRleHR1cmUud2lkdGgvYSksZj1NYXRoLmZsb29yKHRoaXMudGV4dHVyZS5oZWlnaHQvYyksZz0wLGg9MDtmPmg7aCsrKWZvcih2YXIgaT0wO2U+aTtpKyssZysrKXt2YXIgaj1uZXcgYi5UZXh0dXJlKHRoaXMudGV4dHVyZSx7eDppKmEseTpoKmMsd2lkdGg6YSxoZWlnaHQ6Y30pO3RoaXMuZnJhbWVzLnB1c2goaiksZCYmKGIuVGV4dHVyZUNhY2hlW2QrXCItXCIrZ109ail9aWYodGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLmhhc0xvYWRlZCl0aGlzLm9uTG9hZGVkKCk7ZWxzZXt2YXIgaz10aGlzO3RoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkXCIsZnVuY3Rpb24oKXtrLm9uTG9hZGVkKCl9KX19LGIuQml0bWFwRm9udExvYWRlcj1mdW5jdGlvbihhLGMpe2IuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKSx0aGlzLnVybD1hLHRoaXMuY3Jvc3NvcmlnaW49Yyx0aGlzLmJhc2VVcmw9YS5yZXBsYWNlKC9bXlxcL10qJC8sXCJcIiksdGhpcy50ZXh0dXJlPW51bGx9LGIuQml0bWFwRm9udExvYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5CaXRtYXBGb250TG9hZGVyLGIuQml0bWFwRm9udExvYWRlci5wcm90b3R5cGUubG9hZD1mdW5jdGlvbigpe3RoaXMuYWpheFJlcXVlc3Q9bmV3IGIuQWpheFJlcXVlc3Q7dmFyIGE9dGhpczt0aGlzLmFqYXhSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2Eub25YTUxMb2FkZWQoKX0sdGhpcy5hamF4UmVxdWVzdC5vcGVuKFwiR0VUXCIsdGhpcy51cmwsITApLHRoaXMuYWpheFJlcXVlc3Qub3ZlcnJpZGVNaW1lVHlwZSYmdGhpcy5hamF4UmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKFwiYXBwbGljYXRpb24veG1sXCIpLHRoaXMuYWpheFJlcXVlc3Quc2VuZChudWxsKX0sYi5CaXRtYXBGb250TG9hZGVyLnByb3RvdHlwZS5vblhNTExvYWRlZD1mdW5jdGlvbigpe2lmKDQ9PT10aGlzLmFqYXhSZXF1ZXN0LnJlYWR5U3RhdGUmJigyMDA9PT10aGlzLmFqYXhSZXF1ZXN0LnN0YXR1c3x8LTE9PT13aW5kb3cubG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIikpKXt2YXIgYT10aGlzLmFqYXhSZXF1ZXN0LnJlc3BvbnNlWE1MO2lmKCFhfHwvTVNJRSA5L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KXx8bmF2aWdhdG9yLmlzQ29jb29uSlMpaWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygd2luZG93LkRPTVBhcnNlcil7dmFyIGM9bmV3IERPTVBhcnNlcjthPWMucGFyc2VGcm9tU3RyaW5nKHRoaXMuYWpheFJlcXVlc3QucmVzcG9uc2VUZXh0LFwidGV4dC94bWxcIil9ZWxzZXt2YXIgZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2QuaW5uZXJIVE1MPXRoaXMuYWpheFJlcXVlc3QucmVzcG9uc2VUZXh0LGE9ZH12YXIgZT10aGlzLmJhc2VVcmwrYS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBhZ2VcIilbMF0uZ2V0QXR0cmlidXRlKFwiZmlsZVwiKSxmPW5ldyBiLkltYWdlTG9hZGVyKGUsdGhpcy5jcm9zc29yaWdpbik7dGhpcy50ZXh0dXJlPWYudGV4dHVyZS5iYXNlVGV4dHVyZTt2YXIgZz17fSxoPWEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbmZvXCIpWzBdLGk9YS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImNvbW1vblwiKVswXTtnLmZvbnQ9aC5nZXRBdHRyaWJ1dGUoXCJmYWNlXCIpLGcuc2l6ZT1wYXJzZUludChoLmdldEF0dHJpYnV0ZShcInNpemVcIiksMTApLGcubGluZUhlaWdodD1wYXJzZUludChpLmdldEF0dHJpYnV0ZShcImxpbmVIZWlnaHRcIiksMTApLGcuY2hhcnM9e307Zm9yKHZhciBqPWEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjaGFyXCIpLGs9MDtrPGoubGVuZ3RoO2srKyl7dmFyIGw9cGFyc2VJbnQoaltrXS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSwxMCksbT1uZXcgYi5SZWN0YW5nbGUocGFyc2VJbnQoaltrXS5nZXRBdHRyaWJ1dGUoXCJ4XCIpLDEwKSxwYXJzZUludChqW2tdLmdldEF0dHJpYnV0ZShcInlcIiksMTApLHBhcnNlSW50KGpba10uZ2V0QXR0cmlidXRlKFwid2lkdGhcIiksMTApLHBhcnNlSW50KGpba10uZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpLDEwKSk7Zy5jaGFyc1tsXT17eE9mZnNldDpwYXJzZUludChqW2tdLmdldEF0dHJpYnV0ZShcInhvZmZzZXRcIiksMTApLHlPZmZzZXQ6cGFyc2VJbnQoaltrXS5nZXRBdHRyaWJ1dGUoXCJ5b2Zmc2V0XCIpLDEwKSx4QWR2YW5jZTpwYXJzZUludChqW2tdLmdldEF0dHJpYnV0ZShcInhhZHZhbmNlXCIpLDEwKSxrZXJuaW5nOnt9LHRleHR1cmU6Yi5UZXh0dXJlQ2FjaGVbbF09bmV3IGIuVGV4dHVyZSh0aGlzLnRleHR1cmUsbSl9fXZhciBuPWEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJrZXJuaW5nXCIpO2ZvcihrPTA7azxuLmxlbmd0aDtrKyspe3ZhciBvPXBhcnNlSW50KG5ba10uZ2V0QXR0cmlidXRlKFwiZmlyc3RcIiksMTApLHA9cGFyc2VJbnQobltrXS5nZXRBdHRyaWJ1dGUoXCJzZWNvbmRcIiksMTApLHE9cGFyc2VJbnQobltrXS5nZXRBdHRyaWJ1dGUoXCJhbW91bnRcIiksMTApO2cuY2hhcnNbcF0ua2VybmluZ1tvXT1xfWIuQml0bWFwVGV4dC5mb250c1tnLmZvbnRdPWc7dmFyIHI9dGhpcztmLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIixmdW5jdGlvbigpe3Iub25Mb2FkZWQoKX0pLGYubG9hZCgpfX0sYi5CaXRtYXBGb250TG9hZGVyLnByb3RvdHlwZS5vbkxvYWRlZD1mdW5jdGlvbigpe3RoaXMuZGlzcGF0Y2hFdmVudCh7dHlwZTpcImxvYWRlZFwiLGNvbnRlbnQ6dGhpc30pfSxiLlNwaW5lTG9hZGVyPWZ1bmN0aW9uKGEsYyl7Yi5FdmVudFRhcmdldC5jYWxsKHRoaXMpLHRoaXMudXJsPWEsdGhpcy5jcm9zc29yaWdpbj1jLHRoaXMubG9hZGVkPSExfSxiLlNwaW5lTG9hZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlNwaW5lTG9hZGVyLGIuU3BpbmVMb2FkZXIucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGM9bmV3IGIuSnNvbkxvYWRlcih0aGlzLnVybCx0aGlzLmNyb3Nzb3JpZ2luKTtcbmMuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLGZ1bmN0aW9uKGIpe2EuanNvbj1iLmNvbnRlbnQuanNvbixhLm9uTG9hZGVkKCl9KSxjLmxvYWQoKX0sYi5TcGluZUxvYWRlci5wcm90b3R5cGUub25Mb2FkZWQ9ZnVuY3Rpb24oKXt0aGlzLmxvYWRlZD0hMCx0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6XCJsb2FkZWRcIixjb250ZW50OnRoaXN9KX0sYi5BYnN0cmFjdEZpbHRlcj1mdW5jdGlvbihhLGIpe3RoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnNoYWRlcnM9W10sdGhpcy5kaXJ0eT0hMCx0aGlzLnBhZGRpbmc9MCx0aGlzLnVuaWZvcm1zPWJ8fHt9LHRoaXMuZnJhZ21lbnRTcmM9YXx8W119LGIuQWxwaGFNYXNrRmlsdGVyPWZ1bmN0aW9uKGEpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sYS5iYXNlVGV4dHVyZS5fcG93ZXJPZjI9ITAsdGhpcy51bmlmb3Jtcz17bWFzazp7dHlwZTpcInNhbXBsZXIyRFwiLHZhbHVlOmF9LG1hcERpbWVuc2lvbnM6e3R5cGU6XCIyZlwiLHZhbHVlOnt4OjEseTo1MTEyfX0sZGltZW5zaW9uczp7dHlwZTpcIjRmdlwiLHZhbHVlOlswLDAsMCwwXX19LGEuYmFzZVRleHR1cmUuaGFzTG9hZGVkPyh0aGlzLnVuaWZvcm1zLm1hc2sudmFsdWUueD1hLndpZHRoLHRoaXMudW5pZm9ybXMubWFzay52YWx1ZS55PWEuaGVpZ2h0KToodGhpcy5ib3VuZExvYWRlZEZ1bmN0aW9uPXRoaXMub25UZXh0dXJlTG9hZGVkLmJpbmQodGhpcyksYS5iYXNlVGV4dHVyZS5vbihcImxvYWRlZFwiLHRoaXMuYm91bmRMb2FkZWRGdW5jdGlvbikpLHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCBtYXNrO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ1bmlmb3JtIHZlYzIgb2Zmc2V0O1wiLFwidW5pZm9ybSB2ZWM0IGRpbWVuc2lvbnM7XCIsXCJ1bmlmb3JtIHZlYzIgbWFwRGltZW5zaW9ucztcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWMyIG1hcENvcmRzID0gdlRleHR1cmVDb29yZC54eTtcIixcIiAgIG1hcENvcmRzICs9IChkaW1lbnNpb25zLnp3ICsgb2Zmc2V0KS8gZGltZW5zaW9ucy54eSA7XCIsXCIgICBtYXBDb3Jkcy55ICo9IC0xLjA7XCIsXCIgICBtYXBDb3Jkcy55ICs9IDEuMDtcIixcIiAgIG1hcENvcmRzICo9IGRpbWVuc2lvbnMueHkgLyBtYXBEaW1lbnNpb25zO1wiLFwiICAgdmVjNCBvcmlnaW5hbCA9ICB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFwiICAgZmxvYXQgbWFza0FscGhhID0gIHRleHR1cmUyRChtYXNrLCBtYXBDb3JkcykucjtcIixcIiAgIG9yaWdpbmFsICo9IG1hc2tBbHBoYTtcIixcIiAgIGdsX0ZyYWdDb2xvciA9ICBvcmlnaW5hbDtcIixcIn1cIl19LGIuQWxwaGFNYXNrRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLkFscGhhTWFza0ZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5BbHBoYU1hc2tGaWx0ZXIsYi5BbHBoYU1hc2tGaWx0ZXIucHJvdG90eXBlLm9uVGV4dHVyZUxvYWRlZD1mdW5jdGlvbigpe3RoaXMudW5pZm9ybXMubWFwRGltZW5zaW9ucy52YWx1ZS54PXRoaXMudW5pZm9ybXMubWFzay52YWx1ZS53aWR0aCx0aGlzLnVuaWZvcm1zLm1hcERpbWVuc2lvbnMudmFsdWUueT10aGlzLnVuaWZvcm1zLm1hc2sudmFsdWUuaGVpZ2h0LHRoaXMudW5pZm9ybXMubWFzay52YWx1ZS5iYXNlVGV4dHVyZS5vZmYoXCJsb2FkZWRcIix0aGlzLmJvdW5kTG9hZGVkRnVuY3Rpb24pfSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5BbHBoYU1hc2tGaWx0ZXIucHJvdG90eXBlLFwibWFwXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLm1hc2sudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLm1hc2sudmFsdWU9YX19KSxiLkNvbG9yTWF0cml4RmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXttYXRyaXg6e3R5cGU6XCJtYXQ0XCIsdmFsdWU6WzEsMCwwLDAsMCwxLDAsMCwwLDAsMSwwLDAsMCwwLDFdfX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gZmxvYXQgaW52ZXJ0O1wiLFwidW5pZm9ybSBtYXQ0IG1hdHJpeDtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCkgKiBtYXRyaXg7XCIsXCJ9XCJdfSxiLkNvbG9yTWF0cml4RmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLkNvbG9yTWF0cml4RmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkNvbG9yTWF0cml4RmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkNvbG9yTWF0cml4RmlsdGVyLnByb3RvdHlwZSxcIm1hdHJpeFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5tYXRyaXgudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLm1hdHJpeC52YWx1ZT1hfX0pLGIuR3JheUZpbHRlcj1mdW5jdGlvbigpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sdGhpcy51bmlmb3Jtcz17Z3JheTp7dHlwZTpcIjFmXCIsdmFsdWU6MX19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcInVuaWZvcm0gZmxvYXQgZ3JheTtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFwiICAgZ2xfRnJhZ0NvbG9yLnJnYiA9IG1peChnbF9GcmFnQ29sb3IucmdiLCB2ZWMzKDAuMjEyNipnbF9GcmFnQ29sb3IuciArIDAuNzE1MipnbF9GcmFnQ29sb3IuZyArIDAuMDcyMipnbF9GcmFnQ29sb3IuYiksIGdyYXkpO1wiLFwifVwiXX0sYi5HcmF5RmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLkdyYXlGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuR3JheUZpbHRlcixPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5HcmF5RmlsdGVyLnByb3RvdHlwZSxcImdyYXlcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMuZ3JheS52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMuZ3JheS52YWx1ZT1hfX0pLGIuRGlzcGxhY2VtZW50RmlsdGVyPWZ1bmN0aW9uKGEpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sYS5iYXNlVGV4dHVyZS5fcG93ZXJPZjI9ITAsdGhpcy51bmlmb3Jtcz17ZGlzcGxhY2VtZW50TWFwOnt0eXBlOlwic2FtcGxlcjJEXCIsdmFsdWU6YX0sc2NhbGU6e3R5cGU6XCIyZlwiLHZhbHVlOnt4OjMwLHk6MzB9fSxvZmZzZXQ6e3R5cGU6XCIyZlwiLHZhbHVlOnt4OjAseTowfX0sbWFwRGltZW5zaW9uczp7dHlwZTpcIjJmXCIsdmFsdWU6e3g6MSx5OjUxMTJ9fSxkaW1lbnNpb25zOnt0eXBlOlwiNGZ2XCIsdmFsdWU6WzAsMCwwLDBdfX0sYS5iYXNlVGV4dHVyZS5oYXNMb2FkZWQ/KHRoaXMudW5pZm9ybXMubWFwRGltZW5zaW9ucy52YWx1ZS54PWEud2lkdGgsdGhpcy51bmlmb3Jtcy5tYXBEaW1lbnNpb25zLnZhbHVlLnk9YS5oZWlnaHQpOih0aGlzLmJvdW5kTG9hZGVkRnVuY3Rpb249dGhpcy5vblRleHR1cmVMb2FkZWQuYmluZCh0aGlzKSxhLmJhc2VUZXh0dXJlLm9uKFwibG9hZGVkXCIsdGhpcy5ib3VuZExvYWRlZEZ1bmN0aW9uKSksdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIGRpc3BsYWNlbWVudE1hcDtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidW5pZm9ybSB2ZWMyIHNjYWxlO1wiLFwidW5pZm9ybSB2ZWMyIG9mZnNldDtcIixcInVuaWZvcm0gdmVjNCBkaW1lbnNpb25zO1wiLFwidW5pZm9ybSB2ZWMyIG1hcERpbWVuc2lvbnM7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgdmVjMiBtYXBDb3JkcyA9IHZUZXh0dXJlQ29vcmQueHk7XCIsXCIgICBtYXBDb3JkcyArPSAoZGltZW5zaW9ucy56dyArIG9mZnNldCkvIGRpbWVuc2lvbnMueHkgO1wiLFwiICAgbWFwQ29yZHMueSAqPSAtMS4wO1wiLFwiICAgbWFwQ29yZHMueSArPSAxLjA7XCIsXCIgICB2ZWMyIG1hdFNhbXBsZSA9IHRleHR1cmUyRChkaXNwbGFjZW1lbnRNYXAsIG1hcENvcmRzKS54eTtcIixcIiAgIG1hdFNhbXBsZSAtPSAwLjU7XCIsXCIgICBtYXRTYW1wbGUgKj0gc2NhbGU7XCIsXCIgICBtYXRTYW1wbGUgLz0gbWFwRGltZW5zaW9ucztcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnggKyBtYXRTYW1wbGUueCwgdlRleHR1cmVDb29yZC55ICsgbWF0U2FtcGxlLnkpKTtcIixcIiAgIGdsX0ZyYWdDb2xvci5yZ2IgPSBtaXgoIGdsX0ZyYWdDb2xvci5yZ2IsIGdsX0ZyYWdDb2xvci5yZ2IsIDEuMCk7XCIsXCIgICB2ZWMyIGNvcmQgPSB2VGV4dHVyZUNvb3JkO1wiLFwifVwiXX0sYi5EaXNwbGFjZW1lbnRGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuRGlzcGxhY2VtZW50RmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkRpc3BsYWNlbWVudEZpbHRlcixiLkRpc3BsYWNlbWVudEZpbHRlci5wcm90b3R5cGUub25UZXh0dXJlTG9hZGVkPWZ1bmN0aW9uKCl7dGhpcy51bmlmb3Jtcy5tYXBEaW1lbnNpb25zLnZhbHVlLng9dGhpcy51bmlmb3Jtcy5kaXNwbGFjZW1lbnRNYXAudmFsdWUud2lkdGgsdGhpcy51bmlmb3Jtcy5tYXBEaW1lbnNpb25zLnZhbHVlLnk9dGhpcy51bmlmb3Jtcy5kaXNwbGFjZW1lbnRNYXAudmFsdWUuaGVpZ2h0LHRoaXMudW5pZm9ybXMuZGlzcGxhY2VtZW50TWFwLnZhbHVlLmJhc2VUZXh0dXJlLm9mZihcImxvYWRlZFwiLHRoaXMuYm91bmRMb2FkZWRGdW5jdGlvbil9LE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRpc3BsYWNlbWVudEZpbHRlci5wcm90b3R5cGUsXCJtYXBcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMuZGlzcGxhY2VtZW50TWFwLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy51bmlmb3Jtcy5kaXNwbGFjZW1lbnRNYXAudmFsdWU9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5EaXNwbGFjZW1lbnRGaWx0ZXIucHJvdG90eXBlLFwic2NhbGVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMuc2NhbGUudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLnNjYWxlLnZhbHVlPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuRGlzcGxhY2VtZW50RmlsdGVyLnByb3RvdHlwZSxcIm9mZnNldFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5vZmZzZXQudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLm9mZnNldC52YWx1ZT1hfX0pLGIuUGl4ZWxhdGVGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e2ludmVydDp7dHlwZTpcIjFmXCIsdmFsdWU6MH0sZGltZW5zaW9uczp7dHlwZTpcIjRmdlwiLHZhbHVlOm5ldyBGbG9hdDMyQXJyYXkoWzFlNCwxMDAsMTAsMTBdKX0scGl4ZWxTaXplOnt0eXBlOlwiMmZcIix2YWx1ZTp7eDoxMCx5OjEwfX19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIHZlYzIgdGVzdERpbTtcIixcInVuaWZvcm0gdmVjNCBkaW1lbnNpb25zO1wiLFwidW5pZm9ybSB2ZWMyIHBpeGVsU2l6ZTtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzIgY29vcmQgPSB2VGV4dHVyZUNvb3JkO1wiLFwiICAgdmVjMiBzaXplID0gZGltZW5zaW9ucy54eS9waXhlbFNpemU7XCIsXCIgICB2ZWMyIGNvbG9yID0gZmxvb3IoICggdlRleHR1cmVDb29yZCAqIHNpemUgKSApIC8gc2l6ZSArIHBpeGVsU2l6ZS9kaW1lbnNpb25zLnh5ICogMC41O1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCBjb2xvcik7XCIsXCJ9XCJdfSxiLlBpeGVsYXRlRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLlBpeGVsYXRlRmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlBpeGVsYXRlRmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLlBpeGVsYXRlRmlsdGVyLnByb3RvdHlwZSxcInNpemVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMucGl4ZWxTaXplLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eT0hMCx0aGlzLnVuaWZvcm1zLnBpeGVsU2l6ZS52YWx1ZT1hfX0pLGIuQmx1clhGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e2JsdXI6e3R5cGU6XCIxZlwiLHZhbHVlOjEvNTEyfX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gZmxvYXQgYmx1cjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzQgc3VtID0gdmVjNCgwLjApO1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnggLSA0LjAqYmx1ciwgdlRleHR1cmVDb29yZC55KSkgKiAwLjA1O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnggLSAzLjAqYmx1ciwgdlRleHR1cmVDb29yZC55KSkgKiAwLjA5O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnggLSAyLjAqYmx1ciwgdlRleHR1cmVDb29yZC55KSkgKiAwLjEyO1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnggLSBibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMTU7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCwgdlRleHR1cmVDb29yZC55KSkgKiAwLjE2O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLnggKyBibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMTU7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCArIDIuMCpibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMTI7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCArIDMuMCpibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMDk7XCIsXCIgICBzdW0gKz0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2ZWMyKHZUZXh0dXJlQ29vcmQueCArIDQuMCpibHVyLCB2VGV4dHVyZUNvb3JkLnkpKSAqIDAuMDU7XCIsXCIgICBnbF9GcmFnQ29sb3IgPSBzdW07XCIsXCJ9XCJdfSxiLkJsdXJYRmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLkJsdXJYRmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkJsdXJYRmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkJsdXJYRmlsdGVyLnByb3RvdHlwZSxcImJsdXJcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMuYmx1ci52YWx1ZS8oMS83ZTMpfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5kaXJ0eT0hMCx0aGlzLnVuaWZvcm1zLmJsdXIudmFsdWU9MS83ZTMqYX19KSxiLkJsdXJZRmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXtibHVyOnt0eXBlOlwiMWZcIix2YWx1ZToxLzUxMn19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIGZsb2F0IGJsdXI7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWM0IHN1bSA9IHZlYzQoMC4wKTtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54LCB2VGV4dHVyZUNvb3JkLnkgLSA0LjAqYmx1cikpICogMC4wNTtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54LCB2VGV4dHVyZUNvb3JkLnkgLSAzLjAqYmx1cikpICogMC4wOTtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54LCB2VGV4dHVyZUNvb3JkLnkgLSAyLjAqYmx1cikpICogMC4xMjtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54LCB2VGV4dHVyZUNvb3JkLnkgLSBibHVyKSkgKiAwLjE1O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSkpICogMC4xNjtcIixcIiAgIHN1bSArPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZlYzIodlRleHR1cmVDb29yZC54LCB2VGV4dHVyZUNvb3JkLnkgKyBibHVyKSkgKiAwLjE1O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSArIDIuMCpibHVyKSkgKiAwLjEyO1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSArIDMuMCpibHVyKSkgKiAwLjA5O1wiLFwiICAgc3VtICs9IHRleHR1cmUyRCh1U2FtcGxlciwgdmVjMih2VGV4dHVyZUNvb3JkLngsIHZUZXh0dXJlQ29vcmQueSArIDQuMCpibHVyKSkgKiAwLjA1O1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gc3VtO1wiLFwifVwiXX0sYi5CbHVyWUZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5CbHVyWUZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5CbHVyWUZpbHRlcixPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5CbHVyWUZpbHRlci5wcm90b3R5cGUsXCJibHVyXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLmJsdXIudmFsdWUvKDEvN2UzKX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMuYmx1ci52YWx1ZT0xLzdlMyphfX0pLGIuQmx1ckZpbHRlcj1mdW5jdGlvbigpe3RoaXMuYmx1clhGaWx0ZXI9bmV3IGIuQmx1clhGaWx0ZXIsdGhpcy5ibHVyWUZpbHRlcj1uZXcgYi5CbHVyWUZpbHRlcix0aGlzLnBhc3Nlcz1bdGhpcy5ibHVyWEZpbHRlcix0aGlzLmJsdXJZRmlsdGVyXX0sT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuQmx1ckZpbHRlci5wcm90b3R5cGUsXCJibHVyXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJsdXJYRmlsdGVyLmJsdXJ9LHNldDpmdW5jdGlvbihhKXt0aGlzLmJsdXJYRmlsdGVyLmJsdXI9dGhpcy5ibHVyWUZpbHRlci5ibHVyPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuQmx1ckZpbHRlci5wcm90b3R5cGUsXCJibHVyWFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ibHVyWEZpbHRlci5ibHVyfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5ibHVyWEZpbHRlci5ibHVyPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuQmx1ckZpbHRlci5wcm90b3R5cGUsXCJibHVyWVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ibHVyWUZpbHRlci5ibHVyfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy5ibHVyWUZpbHRlci5ibHVyPWF9fSksYi5JbnZlcnRGaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e2ludmVydDp7dHlwZTpcIjFmXCIsdmFsdWU6MX19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIGZsb2F0IGludmVydDtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCk7XCIsXCIgICBnbF9GcmFnQ29sb3IucmdiID0gbWl4KCAodmVjMygxKS1nbF9GcmFnQ29sb3IucmdiKSAqIGdsX0ZyYWdDb2xvci5hLCBnbF9GcmFnQ29sb3IucmdiLCAxLjAgLSBpbnZlcnQpO1wiLFwifVwiXX0sYi5JbnZlcnRGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuSW52ZXJ0RmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkludmVydEZpbHRlcixPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5JbnZlcnRGaWx0ZXIucHJvdG90eXBlLFwiaW52ZXJ0XCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLmludmVydC52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMuaW52ZXJ0LnZhbHVlPWF9fSksYi5TZXBpYUZpbHRlcj1mdW5jdGlvbigpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sdGhpcy51bmlmb3Jtcz17c2VwaWE6e3R5cGU6XCIxZlwiLHZhbHVlOjF9fSx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSBmbG9hdCBzZXBpYTtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwiY29uc3QgbWF0MyBzZXBpYU1hdHJpeCA9IG1hdDMoMC4zNTg4LCAwLjcwNDQsIDAuMTM2OCwgMC4yOTkwLCAwLjU4NzAsIDAuMTE0MCwgMC4yMzkyLCAwLjQ2OTYsIDAuMDkxMik7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKTtcIixcIiAgIGdsX0ZyYWdDb2xvci5yZ2IgPSBtaXgoIGdsX0ZyYWdDb2xvci5yZ2IsIGdsX0ZyYWdDb2xvci5yZ2IgKiBzZXBpYU1hdHJpeCwgc2VwaWEpO1wiLFwifVwiXX0sYi5TZXBpYUZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5TZXBpYUZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3I9Yi5TZXBpYUZpbHRlcixPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5TZXBpYUZpbHRlci5wcm90b3R5cGUsXCJzZXBpYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5zZXBpYS52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMudW5pZm9ybXMuc2VwaWEudmFsdWU9YX19KSxiLlR3aXN0RmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXtyYWRpdXM6e3R5cGU6XCIxZlwiLHZhbHVlOi41fSxhbmdsZTp7dHlwZTpcIjFmXCIsdmFsdWU6NX0sb2Zmc2V0Ont0eXBlOlwiMmZcIix2YWx1ZTp7eDouNSx5Oi41fX19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIHZlYzQgZGltZW5zaW9ucztcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidW5pZm9ybSBmbG9hdCByYWRpdXM7XCIsXCJ1bmlmb3JtIGZsb2F0IGFuZ2xlO1wiLFwidW5pZm9ybSB2ZWMyIG9mZnNldDtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICB2ZWMyIGNvb3JkID0gdlRleHR1cmVDb29yZCAtIG9mZnNldDtcIixcIiAgIGZsb2F0IGRpc3RhbmNlID0gbGVuZ3RoKGNvb3JkKTtcIixcIiAgIGlmIChkaXN0YW5jZSA8IHJhZGl1cykge1wiLFwiICAgICAgIGZsb2F0IHJhdGlvID0gKHJhZGl1cyAtIGRpc3RhbmNlKSAvIHJhZGl1cztcIixcIiAgICAgICBmbG9hdCBhbmdsZU1vZCA9IHJhdGlvICogcmF0aW8gKiBhbmdsZTtcIixcIiAgICAgICBmbG9hdCBzID0gc2luKGFuZ2xlTW9kKTtcIixcIiAgICAgICBmbG9hdCBjID0gY29zKGFuZ2xlTW9kKTtcIixcIiAgICAgICBjb29yZCA9IHZlYzIoY29vcmQueCAqIGMgLSBjb29yZC55ICogcywgY29vcmQueCAqIHMgKyBjb29yZC55ICogYyk7XCIsXCIgICB9XCIsXCIgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIGNvb3JkK29mZnNldCk7XCIsXCJ9XCJdfSxiLlR3aXN0RmlsdGVyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGIuQWJzdHJhY3RGaWx0ZXIucHJvdG90eXBlKSxiLlR3aXN0RmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLlR3aXN0RmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLlR3aXN0RmlsdGVyLnByb3RvdHlwZSxcIm9mZnNldFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5vZmZzZXQudmFsdWV9LHNldDpmdW5jdGlvbihhKXt0aGlzLmRpcnR5PSEwLHRoaXMudW5pZm9ybXMub2Zmc2V0LnZhbHVlPWF9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuVHdpc3RGaWx0ZXIucHJvdG90eXBlLFwicmFkaXVzXCIse2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVuaWZvcm1zLnJhZGl1cy52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuZGlydHk9ITAsdGhpcy51bmlmb3Jtcy5yYWRpdXMudmFsdWU9YX19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5Ud2lzdEZpbHRlci5wcm90b3R5cGUsXCJhbmdsZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5hbmdsZS52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuZGlydHk9ITAsdGhpcy51bmlmb3Jtcy5hbmdsZS52YWx1ZT1hfX0pLGIuQ29sb3JTdGVwRmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXtzdGVwOnt0eXBlOlwiMWZcIix2YWx1ZTo1fX0sdGhpcy5mcmFnbWVudFNyYz1bXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcIixcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiLFwidmFyeWluZyB2ZWM0IHZDb2xvcjtcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidW5pZm9ybSBmbG9hdCBzdGVwO1wiLFwidm9pZCBtYWluKHZvaWQpIHtcIixcIiAgIHZlYzQgY29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFwiICAgY29sb3IgPSBmbG9vcihjb2xvciAqIHN0ZXApIC8gc3RlcDtcIixcIiAgIGdsX0ZyYWdDb2xvciA9IGNvbG9yO1wiLFwifVwiXX0sYi5Db2xvclN0ZXBGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuQ29sb3JTdGVwRmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkNvbG9yU3RlcEZpbHRlcixPYmplY3QuZGVmaW5lUHJvcGVydHkoYi5Db2xvclN0ZXBGaWx0ZXIucHJvdG90eXBlLFwic3RlcFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5zdGVwLnZhbHVlfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy51bmlmb3Jtcy5zdGVwLnZhbHVlPWF9fSksYi5Eb3RTY3JlZW5GaWx0ZXI9ZnVuY3Rpb24oKXtiLkFic3RyYWN0RmlsdGVyLmNhbGwodGhpcyksdGhpcy5wYXNzZXM9W3RoaXNdLHRoaXMudW5pZm9ybXM9e3NjYWxlOnt0eXBlOlwiMWZcIix2YWx1ZToxfSxhbmdsZTp7dHlwZTpcIjFmXCIsdmFsdWU6NX0sZGltZW5zaW9uczp7dHlwZTpcIjRmdlwiLHZhbHVlOlswLDAsMCwwXX19LHRoaXMuZnJhZ21lbnRTcmM9W1wicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XCIsXCJ2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDtcIixcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCIsXCJ1bmlmb3JtIHZlYzQgZGltZW5zaW9ucztcIixcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiLFwidW5pZm9ybSBmbG9hdCBhbmdsZTtcIixcInVuaWZvcm0gZmxvYXQgc2NhbGU7XCIsXCJmbG9hdCBwYXR0ZXJuKCkge1wiLFwiICAgZmxvYXQgcyA9IHNpbihhbmdsZSksIGMgPSBjb3MoYW5nbGUpO1wiLFwiICAgdmVjMiB0ZXggPSB2VGV4dHVyZUNvb3JkICogZGltZW5zaW9ucy54eTtcIixcIiAgIHZlYzIgcG9pbnQgPSB2ZWMyKFwiLFwiICAgICAgIGMgKiB0ZXgueCAtIHMgKiB0ZXgueSxcIixcIiAgICAgICBzICogdGV4LnggKyBjICogdGV4LnlcIixcIiAgICkgKiBzY2FsZTtcIixcIiAgIHJldHVybiAoc2luKHBvaW50LngpICogc2luKHBvaW50LnkpKSAqIDQuMDtcIixcIn1cIixcInZvaWQgbWFpbigpIHtcIixcIiAgIHZlYzQgY29sb3IgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQpO1wiLFwiICAgZmxvYXQgYXZlcmFnZSA9IChjb2xvci5yICsgY29sb3IuZyArIGNvbG9yLmIpIC8gMy4wO1wiLFwiICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh2ZWMzKGF2ZXJhZ2UgKiAxMC4wIC0gNS4wICsgcGF0dGVybigpKSwgY29sb3IuYSk7XCIsXCJ9XCJdfSxiLkRvdFNjcmVlbkZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5Eb3RTY3JlZW5GaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuRG90U2NyZWVuRmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRvdFNjcmVlbkZpbHRlci5wcm90b3R5cGUsXCJzY2FsZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5zY2FsZS52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuZGlydHk9ITAsdGhpcy51bmlmb3Jtcy5zY2FsZS52YWx1ZT1hfX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkRvdFNjcmVlbkZpbHRlci5wcm90b3R5cGUsXCJhbmdsZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5hbmdsZS52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe3RoaXMuZGlydHk9ITAsdGhpcy51bmlmb3Jtcy5hbmdsZS52YWx1ZT1hfX0pLGIuQ3Jvc3NIYXRjaEZpbHRlcj1mdW5jdGlvbigpe2IuQWJzdHJhY3RGaWx0ZXIuY2FsbCh0aGlzKSx0aGlzLnBhc3Nlcz1bdGhpc10sdGhpcy51bmlmb3Jtcz17Ymx1cjp7dHlwZTpcIjFmXCIsdmFsdWU6MS81MTJ9fSx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSBmbG9hdCBibHVyO1wiLFwidW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XCIsXCJ2b2lkIG1haW4odm9pZCkge1wiLFwiICAgIGZsb2F0IGx1bSA9IGxlbmd0aCh0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQueHkpLnJnYik7XCIsXCIgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDEuMCwgMS4wLCAxLjApO1wiLFwiICAgIGlmIChsdW0gPCAxLjAwKSB7XCIsXCIgICAgICAgIGlmIChtb2QoZ2xfRnJhZ0Nvb3JkLnggKyBnbF9GcmFnQ29vcmQueSwgMTAuMCkgPT0gMC4wKSB7XCIsXCIgICAgICAgICAgICBnbF9GcmFnQ29sb3IgPSB2ZWM0KDAuMCwgMC4wLCAwLjAsIDEuMCk7XCIsXCIgICAgICAgIH1cIixcIiAgICB9XCIsXCIgICAgaWYgKGx1bSA8IDAuNzUpIHtcIixcIiAgICAgICAgaWYgKG1vZChnbF9GcmFnQ29vcmQueCAtIGdsX0ZyYWdDb29yZC55LCAxMC4wKSA9PSAwLjApIHtcIixcIiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcIixcIiAgICAgICAgfVwiLFwiICAgIH1cIixcIiAgICBpZiAobHVtIDwgMC41MCkge1wiLFwiICAgICAgICBpZiAobW9kKGdsX0ZyYWdDb29yZC54ICsgZ2xfRnJhZ0Nvb3JkLnkgLSA1LjAsIDEwLjApID09IDAuMCkge1wiLFwiICAgICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgwLjAsIDAuMCwgMC4wLCAxLjApO1wiLFwiICAgICAgICB9XCIsXCIgICAgfVwiLFwiICAgIGlmIChsdW0gPCAwLjMpIHtcIixcIiAgICAgICAgaWYgKG1vZChnbF9GcmFnQ29vcmQueCAtIGdsX0ZyYWdDb29yZC55IC0gNS4wLCAxMC4wKSA9PSAwLjApIHtcIixcIiAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcIixcIiAgICAgICAgfVwiLFwiICAgIH1cIixcIn1cIl19LGIuQ3Jvc3NIYXRjaEZpbHRlci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiLkFic3RyYWN0RmlsdGVyLnByb3RvdHlwZSksYi5Dcm9zc0hhdGNoRmlsdGVyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1iLkJsdXJZRmlsdGVyLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiLkNyb3NzSGF0Y2hGaWx0ZXIucHJvdG90eXBlLFwiYmx1clwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy51bmlmb3Jtcy5ibHVyLnZhbHVlLygxLzdlMyl9LHNldDpmdW5jdGlvbihhKXt0aGlzLnVuaWZvcm1zLmJsdXIudmFsdWU9MS83ZTMqYX19KSxiLlJHQlNwbGl0RmlsdGVyPWZ1bmN0aW9uKCl7Yi5BYnN0cmFjdEZpbHRlci5jYWxsKHRoaXMpLHRoaXMucGFzc2VzPVt0aGlzXSx0aGlzLnVuaWZvcm1zPXtyZWQ6e3R5cGU6XCIyZlwiLHZhbHVlOnt4OjIwLHk6MjB9fSxncmVlbjp7dHlwZTpcIjJmXCIsdmFsdWU6e3g6LTIwLHk6MjB9fSxibHVlOnt0eXBlOlwiMmZcIix2YWx1ZTp7eDoyMCx5Oi0yMH19LGRpbWVuc2lvbnM6e3R5cGU6XCI0ZnZcIix2YWx1ZTpbMCwwLDAsMF19fSx0aGlzLmZyYWdtZW50U3JjPVtcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1wiLFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCIsXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiLFwidW5pZm9ybSB2ZWMyIHJlZDtcIixcInVuaWZvcm0gdmVjMiBncmVlbjtcIixcInVuaWZvcm0gdmVjMiBibHVlO1wiLFwidW5pZm9ybSB2ZWM0IGRpbWVuc2lvbnM7XCIsXCJ1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcIixcInZvaWQgbWFpbih2b2lkKSB7XCIsXCIgICBnbF9GcmFnQ29sb3IuciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCArIHJlZC9kaW1lbnNpb25zLnh5KS5yO1wiLFwiICAgZ2xfRnJhZ0NvbG9yLmcgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQgKyBncmVlbi9kaW1lbnNpb25zLnh5KS5nO1wiLFwiICAgZ2xfRnJhZ0NvbG9yLmIgPSB0ZXh0dXJlMkQodVNhbXBsZXIsIHZUZXh0dXJlQ29vcmQgKyBibHVlL2RpbWVuc2lvbnMueHkpLmI7XCIsXCIgICBnbF9GcmFnQ29sb3IuYSA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleHR1cmVDb29yZCkuYTtcIixcIn1cIl19LGIuUkdCU3BsaXRGaWx0ZXIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoYi5BYnN0cmFjdEZpbHRlci5wcm90b3R5cGUpLGIuUkdCU3BsaXRGaWx0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIuUkdCU3BsaXRGaWx0ZXIsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIuUkdCU3BsaXRGaWx0ZXIucHJvdG90eXBlLFwiYW5nbGVcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudW5pZm9ybXMuYmx1ci52YWx1ZS8oMS83ZTMpfSxzZXQ6ZnVuY3Rpb24oYSl7dGhpcy51bmlmb3Jtcy5ibHVyLnZhbHVlPTEvN2UzKmF9fSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHM/KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1iKSxleHBvcnRzLlBJWEk9Yik6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYik6YS5QSVhJPWJ9KS5jYWxsKHRoaXMpOyIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG4vKipcbiAqIEEgc3Vic2V0IG9mIFByb21pc2VzL0ErLlxuICogQGNsYXNzIFRoZW5hYmxlXG4gKi9cbmZ1bmN0aW9uIFRoZW5hYmxlKCkge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgVGhlbmFibGUpKVxuXHRcdHJldHVybiBuZXcgVGhlbmFibGUoKTtcblxuXHR0aGlzLmRlY2lkZWQgPSBmYWxzZTtcblx0dGhpcy5oYW5kbGVyc1VzZWQgPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGVuLlxuICogQG1ldGhvZCByZXNvbHZlXG4gKi9cblRoZW5hYmxlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ocmVzb2x1dGlvbkhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcblx0aWYgKHRoaXMuaGFuZGxlcnNVc2VkKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIkhhbmRsZXJzIGFscmVhZHkgcmVnaXN0ZXJlZCBvciBjYWxsZWQuXCIpO1xuXG5cdHRoaXMuaGFuZGxlcnNVc2VkID0gdHJ1ZTtcblx0dGhpcy5yZXNvbHV0aW9uSGFuZGxlciA9IHJlc29sdXRpb25IYW5kbGVyO1xuXHR0aGlzLnJlamVjdGlvbkhhbmRsZXIgPSByZWplY3Rpb25IYW5kbGVyO1xufVxuXG4vKipcbiAqIFJlc29sdmUuXG4gKiBAbWV0aG9kIHJlc29sdmVcbiAqL1xuVGhlbmFibGUucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZXN1bHQpIHtcblx0aWYgKHRoaXMuZGVjaWRlZClcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBbHJlYWR5IGRlY2lkZWQuXCIpO1xuXG5cdHRoaXMuZGVjaWRlZCA9IHRydWU7XG5cdHByb2Nlc3MubmV4dFRpY2sodGhpcy5jYWxsSGFuZGxlci5iaW5kKHRoaXMsIHRydWUsIHJlc3VsdCkpO1xufVxuXG4vKipcbiAqIFJlamVjdC5cbiAqIEBtZXRob2QgcmVzb2x2ZVxuICovXG5UaGVuYWJsZS5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24ocmVhc29uKSB7XG5cdGlmICh0aGlzLmRlY2lkZWQpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSBkZWNpZGVkLlwiKTtcblxuXHR0aGlzLmRlY2lkZWQgPSB0cnVlO1xuXHRwcm9jZXNzLm5leHRUaWNrKHRoaXMuY2FsbEhhbmRsZXIuYmluZCh0aGlzLCBmYWxzZSwgcmVhc29uKSk7XG59XG5cbi8qKlxuICogQ2FsbCBoYW5kbGVyLlxuICogQG1ldGhvZCBjYWxsSGFuZGxlclxuICogQHByaXZhdGVcbiAqL1xuVGhlbmFibGUucHJvdG90eXBlLmNhbGxIYW5kbGVyID0gZnVuY3Rpb24ocmVzb2x2ZWQsIHBhcmFtZXRlcikge1xuXHR0aGlzLmhhbmRsZXJzVXNlZCA9IHRydWU7XG5cblx0dmFyIGhhbmRsZXI7XG5cblx0aWYgKHJlc29sdmVkKVxuXHRcdGhhbmRsZXIgPSB0aGlzLnJlc29sdXRpb25IYW5kbGVyO1xuXG5cdGVsc2Vcblx0XHRoYW5kbGVyID0gdGhpcy5yZWplY3Rpb25IYW5kbGVyO1xuXG5cdC8vY29uc29sZS5sb2coXCJpbiBjYWxsSGFuZGxlciwgaGFuZGxlcj1cIiArIGhhbmRsZXIpO1xuXG5cdGlmIChoYW5kbGVyKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGhhbmRsZXIocGFyYW1ldGVyKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiVW5oYW5kbGVkOiBcIiArIGUpO1xuXHRcdFx0Y29uc29sZS5sb2coZS5zdGFjayk7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFJldHVybiBhIHJlc29sdmVkIHRoZW5hYmxlLlxuICogQG1ldGhvZCByZXNvbHZlZFxuICovXG5UaGVuYWJsZS5yZXNvbHZlZCA9IGZ1bmN0aW9uKHBhcmFtZXRlcikge1xuXHR2YXIgdCA9IG5ldyBUaGVuYWJsZSgpO1xuXHR0LnJlc29sdmUocGFyYW1ldGVyKTtcblx0cmV0dXJuIHQ7XG59XG5cbi8qKlxuICogUmV0dXJuIGEgcmVqZWN0ZWQgdGhlbmFibGUuXG4gKiBAbWV0aG9kIHJlamVjdGVkXG4gKi9cblRoZW5hYmxlLnJlamVjdGVkID0gZnVuY3Rpb24ocGFyYW1ldGVyKSB7XG5cdHZhciB0ID0gbmV3IFRoZW5hYmxlKCk7XG5cdHQucmVqZWN0KHBhcmFtZXRlcik7XG5cdHJldHVybiB0O1xufVxuXG4vKipcbiAqIFdhaXQgZm9yIGFsbCB0byByZXNvbHZlIG9yIGFueSB0byByZWplY3QuXG4gKiBAbWV0aG9kIGFsbFxuICovXG5UaGVuYWJsZS5hbGwgPSBmdW5jdGlvbiggLyogLi4uICovICkge1xuXHR2YXIgdGhlbmFibGUgPSBuZXcgVGhlbmFibGUoKTtcblx0dmFyIGk7XG5cdHZhciB0aGVuYWJsZXMgPSBbXTtcblx0dmFyIGRlY2lkZWQgPSBmYWxzZTtcblx0dmFyIHJlc29sdmVkQ291bnQgPSAwO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG5cdFx0dGhlbmFibGVzID0gdGhlbmFibGVzLmNvbmNhdChhcmd1bWVudHNbaV0pO1xuXG5cdGZ1bmN0aW9uIG9uUmVzb2x2ZWQoKSB7XG5cdFx0cmVzb2x2ZWRDb3VudCsrO1xuXG5cdFx0aWYgKCFkZWNpZGVkICYmIHJlc29sdmVkQ291bnQgPj0gdGhlbmFibGVzLmxlbmd0aCkge1xuXHRcdFx0ZGVjaWRlZCA9IHRydWU7XG5cdFx0XHR0aGVuYWJsZS5yZXNvbHZlKCk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gb25SZWplY3RlZChlKSB7XG5cdFx0aWYgKCFkZWNpZGVkKSB7XG5cdFx0XHRkZWNpZGVkID0gdHJ1ZTtcblx0XHRcdHRoZW5hYmxlLnJlamVjdChlKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKGkgPSAwOyBpIDwgdGhlbmFibGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dGhlbmFibGVzW2ldLnRoZW4ob25SZXNvbHZlZCwgb25SZWplY3RlZCk7XG5cdH1cblxuXHRyZXR1cm4gdGhlbmFibGU7XG59XG5cbi8qKlxuICogV2FpdCBmb3IgYW55IHRvIHJlc29sdmUgb3IgYWxsIHRvIHJlamVjdC5cbiAqIEBtZXRob2QgYWxsXG4gKi9cblRoZW5hYmxlLnJhY2UgPSBmdW5jdGlvbiggLyogLi4uICovICkge1xuXHR2YXIgdGhlbmFibGUgPSBuZXcgVGhlbmFibGUoKTtcblx0dmFyIGk7XG5cdHZhciB0aGVuYWJsZXMgPSBbXTtcblx0dmFyIGRlY2lkZWQgPSBmYWxzZTtcblx0dmFyIHJlc29sdmVkQ291bnQgPSAwO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG5cdFx0dGhlbmFibGVzID0gdGhlbmFibGVzLmNvbmNhdChhcmd1bWVudHNbaV0pO1xuXG5cdGZ1bmN0aW9uIG9uUmVqZWN0ZWQoKSB7XG5cdFx0cmVzb2x2ZWRDb3VudCsrO1xuXG5cdFx0aWYgKCFkZWNpZGVkICYmIHJlc29sdmVkQ291bnQgPj0gdGhlbmFibGVzLmxlbmd0aCkge1xuXHRcdFx0ZGVjaWRlZCA9IHRydWU7XG5cdFx0XHR0aGVuYWJsZS5yZWplY3QoKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBvblJlc29sdmVkKHIpIHtcblx0XHRpZiAoIWRlY2lkZWQpIHtcblx0XHRcdGRlY2lkZWQgPSB0cnVlO1xuXHRcdFx0dGhlbmFibGUucmVzb2x2ZShyKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKGkgPSAwOyBpIDwgdGhlbmFibGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dGhlbmFibGVzW2ldLnRoZW4ob25SZXNvbHZlZCwgb25SZWplY3RlZCk7XG5cdH1cblxuXHRyZXR1cm4gdGhlbmFibGU7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcmVzb2x2ZWQgVGhlbmFibGUuXG4gKiBAbWV0aG9kIHJlc29sdmVkXG4gKi9cblRoZW5hYmxlLnJlc29sdmVkID0gZnVuY3Rpb24ocmVzdWx0KSB7XG5cdHZhciB0ID0gbmV3IFRoZW5hYmxlO1xuXHR0LnJlc29sdmUocmVzdWx0KTtcblxuXHRyZXR1cm4gdDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSByZWplY3RlZCBUaGVuYWJsZS5cbiAqIEBtZXRob2QgcmVqZWN0ZWRcbiAqL1xuVGhlbmFibGUucmVqZWN0ZWQgPSBmdW5jdGlvbihyZWFzb24pIHtcblx0dmFyIHQgPSBuZXcgVGhlbmFibGU7XG5cdHQucmVqZWN0KHJlYXNvbik7XG5cblx0cmV0dXJuIHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGhlbmFibGU7XG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSkiLCIoZnVuY3Rpb24oKSB7XG5cdC8qKlxuXHQgKiBUaGUgYmFzaWMgeG5vZGUgY2xhc3MuXG5cdCAqIEl0IHNldHMgdGhlIHVuZGVybHlpbmcgbm9kZSBlbGVtZW50IGJ5IGNhbGxpbmdcblx0ICogZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuXHQgKi9cblx0ZnVuY3Rpb24gWE5vZGUodHlwZSwgY29udGVudCkge1xuXHRcdHRoaXMubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG5cblx0XHRpZiAoY29udGVudCAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhpcy5ub2RlLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cdH1cblxuXHQvKipcblx0ICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBleHRlbmRlZCBjbGFzcyB1c2luZ1xuXHQgKiB0aGUgWE5vZGUgY2xhc3MgZGVmaW5lZCBhYm92ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KGVsZW1lbnRUeXBlLCBjb250ZW50KSB7XG5cdFx0dmFyIGYgPSBmdW5jdGlvbihjb250ZW50KSB7XG5cdFx0XHRYTm9kZS5jYWxsKHRoaXMsIGVsZW1lbnRUeXBlLCBjb250ZW50KTtcblx0XHR9O1xuXG5cdFx0Zi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFhOb2RlLnByb3RvdHlwZSk7XG5cdFx0Zi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBmO1xuXG5cdFx0cmV0dXJuIGY7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgcmVhZCBvbmx5IHByb3BlcnR5IHRoYXQgcmV0dXJucyB0aGVcblx0ICogdmFsdWUgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgb2YgdGhlXG5cdCAqIHVuZGVybHlpbmcgbm9kZSBvYmplY3QuXG5cdCAqL1xuXHRmdW5jdGlvbiBjcmVhdGVYTm9kZVJlYWRPbmx5UHJvcGVydHkocHJvcGVydHlOYW1lKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KFhOb2RlLnByb3RvdHlwZSwgcHJvcGVydHlOYW1lLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ub2RlW3Byb3BlcnR5TmFtZV07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIGEgcmVhZCB3cml0ZSBwcm9wZXJ0eSB0aGF0IG9wZXJhdGVzIG9uXG5cdCAqIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IG9mIHRoZSB1bmRlcmx5aW5nXG5cdCAqIG5vZGUgb2JqZWN0LlxuXHQgKi9cblx0ZnVuY3Rpb24gY3JlYXRlWE5vZGVSZWFkV3JpdGVQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoWE5vZGUucHJvdG90eXBlLCBwcm9wZXJ0eU5hbWUsIHtcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm5vZGVbcHJvcGVydHlOYW1lXTtcblx0XHRcdH0sXG5cblx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0dGhpcy5ub2RlW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBtZXRob2QgdGhhdCByb3V0ZXMgdGhlIGNhbGwgdGhyb3VnaCwgZG93blxuXHQgKiB0byB0aGUgc2FtZSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgbm9kZSBvYmplY3QuXG5cdCAqL1xuXHRmdW5jdGlvbiBjcmVhdGVYTm9kZU1ldGhvZChtZXRob2ROYW1lKSB7XG5cdFx0WE5vZGUucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ub2RlW21ldGhvZE5hbWVdLmFwcGx5KHRoaXMubm9kZSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTW9kaWZ5IHRoZSBOb2RlLnByb3BlcnR5IGZ1bmN0aW9uLCBzbyB0aGF0IGl0IGFjY2VwdHNcblx0ICogWE5vZGUgb2JqZWN0cy4gQWxsIFhOb2RlIG9iamVjdHMgd2lsbCBiZSBjaGFuZ2VkIHRvXG5cdCAqIHRoZSB1bmRlcmx5aW5nIG5vZGUgb2JqZWN0cywgYW5kIHRoZSBjb3JyZXNwb25kaW5nXG5cdCAqIG1ldGhvZCB3aWxsIGJlIGNhbGxlZC5cblx0ICovXG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGVUb1hOb2RlTWV0aG9kV3JhcHBlcihtZXRob2ROYW1lKSB7XG5cdFx0dmFyIG9yaWdpbmFsRnVuY3Rpb24gPSBOb2RlLnByb3RvdHlwZVttZXRob2ROYW1lXTtcblxuXHRcdE5vZGUucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRmb3IgKHZhciBhIGluIGFyZ3VtZW50cykge1xuXHRcdFx0XHRpZiAoYXJndW1lbnRzW2FdIGluc3RhbmNlb2YgWE5vZGUpXG5cdFx0XHRcdFx0YXJndW1lbnRzW2FdID0gYXJndW1lbnRzW2FdLm5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcmlnaW5hbEZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB1cCByZWFkIG9ubHkgcHJvcGVydGllcy5cblx0ICovXG5cdGNyZWF0ZVhOb2RlUmVhZE9ubHlQcm9wZXJ0eShcInN0eWxlXCIpO1xuXHRjcmVhdGVYTm9kZVJlYWRPbmx5UHJvcGVydHkoXCJmaWxlc1wiKTtcblxuXHQvKipcblx0ICogU2V0IHVwIHJlYWQvd3JpdGUgcHJvcGVydGllcy5cblx0ICovXG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJpbm5lckhUTUxcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJocmVmXCIpO1xuXHRjcmVhdGVYTm9kZVJlYWRXcml0ZVByb3BlcnR5KFwiaWRcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJ2YWx1ZVwiKTtcblx0Y3JlYXRlWE5vZGVSZWFkV3JpdGVQcm9wZXJ0eShcInR5cGVcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJjbGFzc05hbWVcIik7XG5cdGNyZWF0ZVhOb2RlUmVhZFdyaXRlUHJvcGVydHkoXCJzcmNcIik7XG5cblx0LyoqXG5cdCAqIFNldCB1cCBtZXRob2RzIHRvIGJlIHJvdXRlZCB0byB0aGUgdW5kZXJseWluZyBub2RlIG9iamVjdC5cblx0ICovXG5cdGNyZWF0ZVhOb2RlTWV0aG9kKFwiYXBwZW5kQ2hpbGRcIik7XG5cdGNyZWF0ZVhOb2RlTWV0aG9kKFwicmVtb3ZlQ2hpbGRcIik7XG5cdGNyZWF0ZVhOb2RlTWV0aG9kKFwiYWRkRXZlbnRMaXN0ZW5lclwiKTtcblx0Y3JlYXRlWE5vZGVNZXRob2QoXCJyZW1vdmVFdmVudExpc3RlbmVyXCIpO1xuXG5cdC8qKlxuXHQgKiBTZXQgdXAgbWV0aG9kcyBvbiBOb2RlLnByb3BlcnR5LlxuXHQgKi9cblx0Y3JlYXRlTm9kZVRvWE5vZGVNZXRob2RXcmFwcGVyKFwiYXBwZW5kQ2hpbGRcIik7XG5cdGNyZWF0ZU5vZGVUb1hOb2RlTWV0aG9kV3JhcHBlcihcInJlbW92ZUNoaWxkXCIpO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgZXZlbnQgbGlzdGVuZXIgYWxpYXNlcy5cblx0ICovXG5cdFhOb2RlLnByb3RvdHlwZS5vbiA9IFhOb2RlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXHRYTm9kZS5wcm90b3R5cGUub2ZmID0gWE5vZGUucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cblx0LyoqXG5cdCAqIFdvcmsgYm90aCBhcyBhIG5wbSBtb2R1bGUgYW5kIHN0YW5kYWxvbmUuXG5cdCAqL1xuXHR2YXIgdGFyZ2V0O1xuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0dGFyZ2V0ID0ge307XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSB0YXJnZXQ7XG5cdH0gZWxzZSB7XG5cdFx0eG5vZGUgPSB7fTtcblx0XHR0YXJnZXQgPSB4bm9kZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgZXh0ZW5kZWQgY2xhc3Nlcy5cblx0ICovXG5cdHRhcmdldC5EaXYgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcImRpdlwiKTtcblx0dGFyZ2V0LkJ1dHRvbiA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHR0YXJnZXQuVWwgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInVsXCIpO1xuXHR0YXJnZXQuTGkgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcImxpXCIpO1xuXHR0YXJnZXQuQSA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiYVwiKTtcblx0dGFyZ2V0Lk9wdGlvbiA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHR0YXJnZXQuU2VsZWN0ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJzZWxlY3RcIik7XG5cdHRhcmdldC5JbnB1dCA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdHRhcmdldC5OYXYgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcIm5hdlwiKTtcblx0dGFyZ2V0LlNwYW4gPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInNwYW5cIik7XG5cdHRhcmdldC5QID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJwXCIpO1xuXHR0YXJnZXQuVGFibGUgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRhYmxlXCIpO1xuXHR0YXJnZXQuVGhlYWQgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRoZWFkXCIpO1xuXHR0YXJnZXQuVGJvZHkgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRib2R5XCIpO1xuXHR0YXJnZXQuVHIgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRyXCIpO1xuXHR0YXJnZXQuVGQgPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRkXCIpO1xuXHR0YXJnZXQuVGggPSBjcmVhdGVFeHRlbmRlZFhOb2RlRWxlbWVudChcInRoXCIpO1xuXHR0YXJnZXQuSW1nID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJpbWdcIik7XG5cdHRhcmdldC5JID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJpXCIpO1xuXHR0YXJnZXQuQiA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiYlwiKTtcblx0dGFyZ2V0LkgxID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoMVwiKTtcblx0dGFyZ2V0LkgyID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoMlwiKTtcblx0dGFyZ2V0LkgzID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoM1wiKTtcblx0dGFyZ2V0Lkg0ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoNFwiKTtcblx0dGFyZ2V0Lkg1ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoNVwiKTtcblx0dGFyZ2V0Lkg2ID0gY3JlYXRlRXh0ZW5kZWRYTm9kZUVsZW1lbnQoXCJoNlwiKTtcblx0dGFyZ2V0LklmcmFtZSA9IGNyZWF0ZUV4dGVuZGVkWE5vZGVFbGVtZW50KFwiaWZyYW1lXCIpO1xufSkoKTsiLCJ2YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcInlhZWRcIik7XG5cbi8qKlxuICogQ29sbGVjdGlvbi5cbiAqIEBjbGFzcyBDb2xsZWN0aW9uXG4gKi9cbmZ1bmN0aW9uIENvbGxlY3Rpb24oKSB7XG5cdHRoaXMuaXRlbXMgPSBbXTtcbn1cblxuaW5oZXJpdHMoQ29sbGVjdGlvbiwgRXZlbnREaXNwYXRjaGVyKTtcblxuLyoqXG4gKiBBZGQgaXRlbSBhdCBlbmQuXG4gKiBAbWV0aG9kIGFkZEl0ZW1cbiAqL1xuQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0dGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuXG5cdHRoaXMudHJpZ2dlckNoYW5nZShcImFkZFwiLCBpdGVtLCB0aGlzLml0ZW1zLmxlbmd0aCAtIDEpO1xufVxuXG4vKipcbiAqIEFkZCBpdGVtIGF0IGluZGV4LlxuICogQG1ldGhvZCBhZGRJdGVtXG4gKi9cbkNvbGxlY3Rpb24ucHJvdG90eXBlLmFkZEl0ZW1BdCA9IGZ1bmN0aW9uKGluZGV4LCBpdGVtKSB7XG5cdGlmIChpbmRleCA8IDApXG5cdFx0aW5kZXggPSAwO1xuXG5cdGlmIChpbmRleCA+IHRoaXMuaXRlbXMubGVuZ3RoKVxuXHRcdGluZGV4ID0gdGhpcy5pdGVtcy5sZW5ndGg7XG5cblx0dmFyIGFmdGVyID0gdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgpO1xuXHR0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG5cdHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmNvbmNhdChhZnRlcik7XG5cblx0dGhpcy50cmlnZ2VyQ2hhbmdlKFwiYWRkXCIsIGl0ZW0sIGluZGV4KTtcbn1cblxuLyoqXG4gKiBHZXQgbGVuZ3RoLlxuICogQG1ldGhvZCBnZXRMZW5ndGhcbiAqL1xuQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0TGVuZ3RoID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLml0ZW1zLmxlbmd0aDtcbn1cblxuLyoqXG4gKiBHZXQgaXRlbSBhdCBpbmRleC5cbiAqIEBtZXRob2QgZ2V0SXRlbUF0XG4gKi9cbkNvbGxlY3Rpb24ucHJvdG90eXBlLmdldEl0ZW1BdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cdHJldHVybiB0aGlzLml0ZW1zW2luZGV4XTtcbn1cblxuLyoqXG4gKiBGaW5kIGl0ZW0gaW5kZXguXG4gKiBAbWV0aG9kIGdldEl0ZW1JbmRleFxuICovXG5Db2xsZWN0aW9uLnByb3RvdHlwZS5nZXRJdGVtSW5kZXggPSBmdW5jdGlvbihpdGVtKSB7XG5cdHJldHVybiB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG59XG5cbi8qKlxuICogUmVtb3ZlIGl0ZW0gYXQuXG4gKiBAbWV0aG9kIHJlbW92ZUl0ZW1BdFxuICovXG5Db2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVJdGVtQXQgPSBmdW5jdGlvbihpbmRleCkge1xuXHRpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuaXRlbXMubGVuZ3RoKVxuXHRcdHJldHVybjtcblxuXHR2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbUF0KGluZGV4KTtcblxuXHR0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG5cdHRoaXMudHJpZ2dlckNoYW5nZShcInJlbW92ZVwiLCBpdGVtLCBpbmRleCk7XG59XG5cbi8qKlxuICogUmVtb3ZlIGl0ZW0uXG4gKiBAbWV0aG9kIHJlbW92ZUl0ZW1cbiAqL1xuQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0dmFyIGluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoaXRlbSk7XG5cblx0dGhpcy5yZW1vdmVJdGVtQXQoaW5kZXgpO1xufVxuXG4vKipcbiAqIFRyaWdnZXIgY2hhbmdlIGV2ZW50LlxuICogQG1ldGhvZCB0cmlnZ2VyQ2hhbmdlXG4gKiBAcHJpdmF0ZVxuICovXG5Db2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnRLaW5kLCBpdGVtLCBpbmRleCkge1xuXHR0aGlzLnRyaWdnZXIoe1xuXHRcdHR5cGU6IGV2ZW50S2luZCxcblx0XHRpdGVtOiBpdGVtLFxuXHRcdGluZGV4OiBpbmRleFxuXHR9KTtcblxuXHR0aGlzLnRyaWdnZXIoe1xuXHRcdHR5cGU6IFwiY2hhbmdlXCIsXG5cdFx0a2luZDogZXZlbnRLaW5kLFxuXHRcdGl0ZW06IGl0ZW0sXG5cdFx0aW5kZXg6IGluZGV4XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb247IiwidmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCJ5YWVkXCIpO1xudmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIENvbGxlY3Rpb25WaWV3TWFuYWdlcj1yZXF1aXJlKFwiLi9Db2xsZWN0aW9uVmlld01hbmFnZXJcIik7XG5cbi8qKlxuICogQ29sbGVjdGlvblZpZXcuXG4gKiBAY2xhc3MgQ29sbGVjdGlvblZpZXdcbiAqL1xuZnVuY3Rpb24gQ29sbGVjdGlvblZpZXcoKSB7XG5cdHhub2RlLkRpdi5jYWxsKHRoaXMpO1xuXG5cdHRoaXMubWFuYWdlcj1uZXcgQ29sbGVjdGlvblZpZXdNYW5hZ2VyKHRoaXMpO1xufVxuXG5pbmhlcml0cyhDb2xsZWN0aW9uVmlldywgeG5vZGUuRGl2KTtcblxuLyoqXG4gKiBTZXQgaXRlbSByZW5kZXJlciBjbGFzcy5cbiAqIEBtZXRob2Qgc2V0SXRlbVJlbmRlcmVyQ2xhc3NcbiAqL1xuQ29sbGVjdGlvblZpZXcucHJvdG90eXBlLnNldEl0ZW1SZW5kZXJlckNsYXNzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5tYW5hZ2VyLnNldEl0ZW1SZW5kZXJlckNsYXNzKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBTZXQgaXRlbSByZW5kZXJlciBmYWN0b3J5LlxuICogQG1ldGhvZCBzZXRJdGVtUmVuZGVyZXJGYWN0b3J5XG4gKi9cbkNvbGxlY3Rpb25WaWV3LnByb3RvdHlwZS5zZXRJdGVtUmVuZGVyZXJGYWN0b3J5ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5tYW5hZ2VyLnNldEl0ZW1SZW5kZXJlckZhY3RvcnkodmFsdWUpO1xufVxuXG4vKipcbiAqIFNldCBpdGVtIGNvbnRyb2xsZXIgY2xhc3MuXG4gKiBAbWV0aG9kIHNldEl0ZW1SZW5kZXJlckNsYXNzXG4gKi9cbkNvbGxlY3Rpb25WaWV3LnByb3RvdHlwZS5zZXRJdGVtQ29udHJvbGxlckNsYXNzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5tYW5hZ2VyLnNldEl0ZW1Db250cm9sbGVyQ2xhc3ModmFsdWUpO1xufVxuXG4vKipcbiAqIFNldCBpdGVtIGNvbnRyb2xsZXIgZmFjdG9yeS5cbiAqIEBtZXRob2Qgc2V0SXRlbVJlbmRlcmVyRmFjdG9yeVxuICovXG5Db2xsZWN0aW9uVmlldy5wcm90b3R5cGUuc2V0SXRlbUNvbnRyb2xsZXJGYWN0b3J5ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5tYW5hZ2VyLnNldEl0ZW1Db250cm9sbGVyRmFjdG9yeSh2YWx1ZSk7XG59XG5cbi8qKlxuICogU2V0IGRhdGEgc291cmNlLlxuICogQG1ldGhvZCBzZXREYXRhU291cmNlXG4gKi9cbkNvbGxlY3Rpb25WaWV3LnByb3RvdHlwZS5zZXREYXRhU291cmNlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5tYW5hZ2VyLnNldERhdGFTb3VyY2UodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25WaWV3OyIsInZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwieWFlZFwiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcblxuLyoqXG4gKiBDb2xsZWN0aW9uVmlld01hbmFnZXIuXG4gKiBAY2xhc3MgQ29sbGVjdGlvblZpZXdNYW5hZ2VyXG4gKi9cbmZ1bmN0aW9uIENvbGxlY3Rpb25WaWV3TWFuYWdlcih0YXJnZXQpIHtcblx0dGhpcy5pdGVtUmVuZGVyZXJzID0gW107XG5cdHRoaXMuaXRlbVJlbmRlcmVyQ2xhc3MgPSBudWxsO1xuXHR0aGlzLml0ZW1SZW5kZXJlckZhY3RvcnkgPSBudWxsO1xuXHR0aGlzLml0ZW1Db250cm9sbGVyQ2xhc3MgPSBudWxsO1xuXHR0aGlzLml0ZW1Db250cm9sbGVyRmFjdG9yeSA9IG51bGw7XG5cdHRoaXMuZGF0YVNvdXJjZSA9IG51bGw7XG5cdHRoaXMudGFyZ2V0ID0gbnVsbDtcblxuXHR0aGlzLnNldFRhcmdldCh0YXJnZXQpO1xufVxuXG4vKipcbiAqIFNldCB0YXJnZXQuXG4gKiBAbWV0aG9kIHNldFRhcmdldFxuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLnNldFRhcmdldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMucmVtb3ZlQWxsSXRlbVJlbmRlcmVycygpO1xuXHR0aGlzLnRhcmdldD12YWx1ZTtcblx0dGhpcy5yZW1vdmVBbGxJdGVtUmVuZGVyZXJzKCk7XG59XG5cbi8qKlxuICogU2V0IGl0ZW0gcmVuZGVyZXIgY2xhc3MuXG4gKiBAbWV0aG9kIHNldEl0ZW1SZW5kZXJlckNsYXNzXG4gKi9cbkNvbGxlY3Rpb25WaWV3TWFuYWdlci5wcm90b3R5cGUuc2V0SXRlbVJlbmRlcmVyQ2xhc3MgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9IFwiZnVuY3Rpb25cIilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaXRlbSByZW5kZXJlciBjbGFzcyBzaG91bGQgYmUgYSBmdW5jdGlvblwiKTtcblxuXHR0aGlzLml0ZW1SZW5kZXJlckNsYXNzID0gdmFsdWU7XG5cdHRoaXMucmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnMoKTtcbn1cblxuLyoqXG4gKiBTZXQgaXRlbSByZW5kZXJlciBmYWN0b3J5LlxuICogQG1ldGhvZCBzZXRJdGVtUmVuZGVyZXJGYWN0b3J5XG4gKi9cbkNvbGxlY3Rpb25WaWV3TWFuYWdlci5wcm90b3R5cGUuc2V0SXRlbVJlbmRlcmVyRmFjdG9yeSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgIT0gXCJmdW5jdGlvblwiKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpdGVtIHJlbmRlcmVyIGZhY3Rvcnkgc2hvdWxkIGJlIGEgZnVuY3Rpb25cIik7XG5cblx0dGhpcy5pdGVtUmVuZGVyZXJGYWN0b3J5ID0gdmFsdWU7XG5cdHRoaXMucmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnMoKTtcbn1cblxuLyoqXG4gKiBTZXQgaXRlbSBjb250cm9sbGVyIGNsYXNzLlxuICogQG1ldGhvZCBzZXRJdGVtUmVuZGVyZXJDbGFzc1xuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLnNldEl0ZW1Db250cm9sbGVyQ2xhc3MgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9IFwiZnVuY3Rpb25cIilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaXRlbSByZW5kZXJlciBjbGFzcyBzaG91bGQgYmUgYSBmdW5jdGlvblwiKTtcblxuXHR0aGlzLml0ZW1Db250cm9sbGVyQ2xhc3MgPSB2YWx1ZTtcblx0dGhpcy5yZWZyZXNoQWxsSXRlbVJlbmRlcmVycygpO1xufVxuXG4vKipcbiAqIFNldCBpdGVtIGNvbnRyb2xsZXIgZmFjdG9yeS5cbiAqIEBtZXRob2Qgc2V0SXRlbVJlbmRlcmVyRmFjdG9yeVxuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLnNldEl0ZW1Db250cm9sbGVyRmFjdG9yeSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgIT0gXCJmdW5jdGlvblwiKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIlRoZSBpdGVtIHJlbmRlcmVyIGZhY3Rvcnkgc2hvdWxkIGJlIGEgZnVuY3Rpb25cIik7XG5cblx0dGhpcy5pdGVtQ29udHJvbGxlckZhY3RvcnkgPSB2YWx1ZTtcblx0dGhpcy5yZWZyZXNoQWxsSXRlbVJlbmRlcmVycygpO1xufVxuXG4vKipcbiAqIFNldCBkYXRhIHNvdXJjZS5cbiAqIEBtZXRob2Qgc2V0RGF0YVNvdXJjZVxuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLnNldERhdGFTb3VyY2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZiAodGhpcy5kYXRhU291cmNlKSB7XG5cdFx0dGhpcy5kYXRhU291cmNlLm9mZihcImNoYW5nZVwiLCB0aGlzLm9uRGF0YVNvdXJjZUNoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLmRhdGFTb3VyY2UgPSB2YWx1ZTtcblxuXHRpZiAodGhpcy5kYXRhU291cmNlKSB7XG5cdFx0dGhpcy5kYXRhU291cmNlLm9uKFwiY2hhbmdlXCIsIHRoaXMub25EYXRhU291cmNlQ2hhbmdlLCB0aGlzKTtcblx0fVxuXG5cdHRoaXMucmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnMoKTtcbn1cblxuLyoqXG4gKiBTb21ldGhpbmcgaW4gdGhlIGRhdGEgc291cmNlIHdhcyBjaGFuZ2VkLlxuICogQG1ldGhvZCBvbkRhdGFTb3VyY2VDaGFuZ2VcbiAqIEBwcml2YXRlXG4gKi9cbkNvbGxlY3Rpb25WaWV3TWFuYWdlci5wcm90b3R5cGUub25EYXRhU291cmNlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMucmVmcmVzaEFsbEl0ZW1SZW5kZXJlcnMoKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYWxsIGl0ZW0gcmVuZGVyZXJzLlxuICogQG1ldGhvZCByZW1vdmVBbGxJdGVtUmVuZGVyZXJzXG4gKiBAcHJpdmF0ZVxuICovXG5Db2xsZWN0aW9uVmlld01hbmFnZXIucHJvdG90eXBlLnJlbW92ZUFsbEl0ZW1SZW5kZXJlcnMgPSBmdW5jdGlvbigpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1SZW5kZXJlcnMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAodGhpcy5pdGVtUmVuZGVyZXJzW2ldLl9fY29udHJvbGxlcilcblx0XHRcdHRoaXMuaXRlbVJlbmRlcmVyc1tpXS5fX2NvbnRyb2xsZXIuc2V0RGF0YShudWxsKTtcblxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuaXRlbVJlbmRlcmVyc1tpXS5zZXREYXRhKG51bGwpO1xuXG5cdFx0dGhpcy50YXJnZXQucmVtb3ZlQ2hpbGQodGhpcy5pdGVtUmVuZGVyZXJzW2ldKTtcblx0fVxuXG5cdHRoaXMuaXRlbVJlbmRlcmVycyA9IFtdO1xufVxuXG4vKipcbiAqIFJlZnJlc2ggYWxsIGl0ZW0gcmVuZGVyZXJzLlxuICogQG1ldGhvZCByZWZyZXNoQWxsSXRlbVJlbmRlcmVyc1xuICogQHByaXZhdGVcbiAqL1xuQ29sbGVjdGlvblZpZXdNYW5hZ2VyLnByb3RvdHlwZS5yZWZyZXNoQWxsSXRlbVJlbmRlcmVycyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnJlbW92ZUFsbEl0ZW1SZW5kZXJlcnMoKTtcblxuXHRpZiAoIXRoaXMuZGF0YVNvdXJjZSlcblx0XHRyZXR1cm47XG5cblx0aWYgKCF0aGlzLml0ZW1SZW5kZXJlckNsYXNzICYmICF0aGlzLml0ZW1SZW5kZXJlckZhY3RvcnkpXG5cdFx0cmV0dXJuO1xuXG5cdGlmICghdGhpcy50YXJnZXQpXG5cdFx0cmV0dXJuO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kYXRhU291cmNlLmdldExlbmd0aCgpOyBpKyspIHtcblx0XHR2YXIgZGF0YSA9IHRoaXMuZGF0YVNvdXJjZS5nZXRJdGVtQXQoaSk7XG5cdFx0dmFyIHJlbmRlcmVyID0gdGhpcy5jcmVhdGVJdGVtUmVuZGVyZXIoKTtcblxuXHRcdGlmICh0aGlzLml0ZW1Db250cm9sbGVyQ2xhc3MgfHwgdGhpcy5pdGVtQ29udHJvbGxlckZhY3RvcnkpIHtcblx0XHRcdHJlbmRlcmVyLl9fY29udHJvbGxlciA9IHRoaXMuY3JlYXRlSXRlbUNvbnRyb2xsZXIocmVuZGVyZXIpO1xuXHRcdFx0cmVuZGVyZXIuX19jb250cm9sbGVyLnNldERhdGEoZGF0YSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbmRlcmVyLnNldERhdGEoZGF0YSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5pdGVtUmVuZGVyZXJzLnB1c2gocmVuZGVyZXIpO1xuXHRcdHRoaXMudGFyZ2V0LmFwcGVuZENoaWxkKHJlbmRlcmVyKTtcblx0fVxufVxuXG4vKipcbiAqIENyZWF0ZSBpdGVtIHJlbmRlcmVyLlxuICogQG1ldGhvZCBjcmVhdGVJdGVtUmVuZGVyZXJcbiAqIEBwcml2YXRlXG4gKi9cbkNvbGxlY3Rpb25WaWV3TWFuYWdlci5wcm90b3R5cGUuY3JlYXRlSXRlbVJlbmRlcmVyID0gZnVuY3Rpb24oKSB7XG5cdGlmICh0aGlzLml0ZW1SZW5kZXJlckZhY3RvcnkpXG5cdFx0cmV0dXJuIHRoaXMuaXRlbVJlbmRlcmVyRmFjdG9yeSgpO1xuXG5cdGlmICh0aGlzLml0ZW1SZW5kZXJlckNsYXNzKVxuXHRcdHJldHVybiBuZXcgdGhpcy5pdGVtUmVuZGVyZXJDbGFzcygpO1xuXG5cdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNyZWF0ZSBpdGVtIHJlbmRlcmVyIVwiKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgaXRlbSBjb250cm9sbGVyLlxuICogQG1ldGhvZCBjcmVhdGVJdGVtQ29udHJvbGxlclxuICogQHByaXZhdGVcbiAqL1xuQ29sbGVjdGlvblZpZXdNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVJdGVtQ29udHJvbGxlciA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdGlmICh0aGlzLml0ZW1Db250cm9sbGVyRmFjdG9yeSlcblx0XHRyZXR1cm4gdGhpcy5pdGVtQ29udHJvbGxlckZhY3RvcnkocmVuZGVyZXIpO1xuXG5cdGlmICh0aGlzLml0ZW1Db250cm9sbGVyQ2xhc3MpXG5cdFx0cmV0dXJuIG5ldyB0aGlzLml0ZW1Db250cm9sbGVyQ2xhc3MocmVuZGVyZXIpO1xuXG5cdHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNyZWF0ZSBpdGVtIGNvbnRyb2xsZXIhXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25WaWV3TWFuYWdlcjsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0Q29sbGVjdGlvbjogcmVxdWlyZShcIi4vQ29sbGVjdGlvblwiKSxcblx0Q29sbGVjdGlvblZpZXc6IHJlcXVpcmUoXCIuL0NvbGxlY3Rpb25WaWV3XCIpLFxuXHRDb2xsZWN0aW9uVmlld01hbmFnZXI6IHJlcXVpcmUoXCIuL0NvbGxlY3Rpb25WaWV3TWFuYWdlclwiKVxufTsiLCIvKipcbiAqIEFTMy9qcXVlcnkgc3R5bGUgZXZlbnQgZGlzcGF0Y2hlci4gU2xpZ2h0bHkgbW9kaWZpZWQuIFRoZVxuICoganF1ZXJ5IHN0eWxlIG9uL29mZi90cmlnZ2VyIHN0eWxlIG9mIGFkZGluZyBsaXN0ZW5lcnMgaXNcbiAqIGN1cnJlbnRseSB0aGUgcHJlZmVycmVkIG9uZS5cbiAqXG4gKiBUaGUgb24gbWV0aG9kIGZvciBhZGRpbmcgbGlzdGVuZXJzIHRha2VzIGFuIGV4dHJhIHBhcmFtZXRlciB3aGljaCBpcyB0aGVcbiAqIHNjb3BlIGluIHdoaWNoIGxpc3RlbmVycyBzaG91bGQgYmUgY2FsbGVkLiBTbyB0aGlzOlxuICpcbiAqICAgICBvYmplY3Qub24oXCJldmVudFwiLCBsaXN0ZW5lciwgdGhpcyk7XG4gKlxuICogSGFzIHRoZSBzYW1lIGZ1bmN0aW9uIHdoZW4gYWRkaW5nIGV2ZW50cyBhczpcbiAqXG4gKiAgICAgb2JqZWN0Lm9uKFwiZXZlbnRcIiwgbGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gKlxuICogSG93ZXZlciwgdGhlIGRpZmZlcmVuY2UgaXMgdGhhdCBpZiB3ZSB1c2UgdGhlIHNlY29uZCBtZXRob2QgaXRcbiAqIHdpbGwgbm90IGJlIHBvc3NpYmxlIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzIGxhdGVyLCB1bmxlc3NcbiAqIHRoZSBjbG9zdXJlIGNyZWF0ZWQgYnkgYmluZCBpcyBzdG9yZWQgc29tZXdoZXJlLiBJZiB0aGVcbiAqIGZpcnN0IG1ldGhvZCBpcyB1c2VkLCB3ZSBjYW4gcmVtb3ZlIHRoZSBsaXN0ZW5lciB3aXRoOlxuICpcbiAqICAgICBvYmplY3Qub2ZmKFwiZXZlbnRcIiwgbGlzdGVuZXIsIHRoaXMpO1xuICpcbiAqIEBjbGFzcyBFdmVudERpc3BhdGNoZXJcbiAqL1xuZnVuY3Rpb24gRXZlbnREaXNwYXRjaGVyKCkge1xuXHR0aGlzLmxpc3RlbmVyTWFwID0ge307XG59XG5cbi8qKlxuICogQWRkIGV2ZW50IGxpc3RlbmVyLlxuICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyXG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG5cdGlmICghdGhpcy5saXN0ZW5lck1hcClcblx0XHR0aGlzLmxpc3RlbmVyTWFwID0ge307XG5cblx0aWYgKCFldmVudFR5cGUpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiRXZlbnQgdHlwZSByZXF1aXJlZCBmb3IgZXZlbnQgZGlzcGF0Y2hlclwiKTtcblxuXHRpZiAoIWxpc3RlbmVyKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIHJlcXVpcmVkIGZvciBldmVudCBkaXNwYXRjaGVyXCIpO1xuXG5cdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGxpc3RlbmVyLCBzY29wZSk7XG5cblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpXG5cdFx0dGhpcy5saXN0ZW5lck1hcFtldmVudFR5cGVdID0gW107XG5cblx0dGhpcy5saXN0ZW5lck1hcFtldmVudFR5cGVdLnB1c2goe1xuXHRcdGxpc3RlbmVyOiBsaXN0ZW5lcixcblx0XHRzY29wZTogc2NvcGVcblx0fSk7XG59XG5cbi8qKlxuICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVyLlxuICogQG1ldGhvZCByZW1vdmVFdmVudExpc3RlbmVyXG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHNjb3BlKSB7XG5cdGlmICghdGhpcy5saXN0ZW5lck1hcClcblx0XHR0aGlzLmxpc3RlbmVyTWFwID0ge307XG5cblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpXG5cdFx0cmV0dXJuO1xuXG5cdHZhciBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgbGlzdGVuZXJPYmogPSBsaXN0ZW5lcnNbaV07XG5cblx0XHRpZiAobGlzdGVuZXIgPT0gbGlzdGVuZXJPYmoubGlzdGVuZXIgJiYgc2NvcGUgPT0gbGlzdGVuZXJPYmouc2NvcGUpIHtcblx0XHRcdGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHRpLS07XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFsaXN0ZW5lcnMubGVuZ3RoKVxuXHRcdGRlbGV0ZSB0aGlzLmxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggZXZlbnQuXG4gKiBAbWV0aG9kIGRpc3BhdGNoRXZlbnRcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQgLyogLi4uICovICkge1xuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXApXG5cdFx0dGhpcy5saXN0ZW5lck1hcCA9IHt9O1xuXG5cdHZhciBldmVudFR5cGU7XG5cdHZhciBsaXN0ZW5lclBhcmFtcztcblxuXHRpZiAodHlwZW9mIGV2ZW50ID09IFwic3RyaW5nXCIpIHtcblx0XHRldmVudFR5cGUgPSBldmVudDtcblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSlcblx0XHRcdGxpc3RlbmVyUGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuXHRcdGVsc2UgbGlzdGVuZXJQYXJhbXMgPSBbe1xuXHRcdFx0dHlwZTogZXZlbnRUeXBlLFxuXHRcdFx0dGFyZ2V0OiB0aGlzXG5cdFx0fV07XG5cdH0gZWxzZSB7XG5cdFx0ZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcblx0XHRldmVudC50YXJnZXQgPSB0aGlzO1xuXHRcdGxpc3RlbmVyUGFyYW1zID0gW2V2ZW50XTtcblx0fVxuXG5cdGlmICghdGhpcy5saXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKVxuXHRcdHJldHVybjtcblxuXHRmb3IgKHZhciBpIGluIHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXSkge1xuXHRcdHZhciBsaXN0ZW5lck9iaiA9IHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXVtpXTtcblx0XHRsaXN0ZW5lck9iai5saXN0ZW5lci5hcHBseShsaXN0ZW5lck9iai5zY29wZSwgbGlzdGVuZXJQYXJhbXMpO1xuXHR9XG59XG5cbi8qKlxuICogSnF1ZXJ5IHN0eWxlIGFsaWFzIGZvciBhZGRFdmVudExpc3RlbmVyXG4gKiBAbWV0aG9kIG9uXG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUub24gPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG5cbi8qKlxuICogSnF1ZXJ5IHN0eWxlIGFsaWFzIGZvciByZW1vdmVFdmVudExpc3RlbmVyXG4gKiBAbWV0aG9kIG9mZlxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblxuLyoqXG4gKiBKcXVlcnkgc3R5bGUgYWxpYXMgZm9yIGRpc3BhdGNoRXZlbnRcbiAqIEBtZXRob2QgdHJpZ2dlclxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ7XG5cbi8qKlxuICogTWFrZSBzb21ldGhpbmcgYW4gZXZlbnQgZGlzcGF0Y2hlci4gQ2FuIGJlIHVzZWQgZm9yIG11bHRpcGxlIGluaGVyaXRhbmNlLlxuICogQG1ldGhvZCBpbml0XG4gKiBAc3RhdGljXG4gKi9cbkV2ZW50RGlzcGF0Y2hlci5pbml0ID0gZnVuY3Rpb24oY2xzKSB7XG5cdGNscy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcblx0Y2xzLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuXHRjbHMucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ7XG5cdGNscy5wcm90b3R5cGUub24gPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLm9uO1xuXHRjbHMucHJvdG90eXBlLm9mZiA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUub2ZmO1xuXHRjbHMucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnRyaWdnZXI7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RGlzcGF0Y2hlcjtcbn0iLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIFJvb3RWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1Jvb3RWaWV3XCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvVmlld1wiKTtcbnZhciBFZGl0b3JDb250cm9sbGVyVmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9FZGl0b3JDb250cm9sbGVyVmlld1wiKTtcbnZhciBUYXJnZXRDb250cm9sbGVyVmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9UYXJnZXRDb250cm9sbGVyVmlld1wiKTtcbnZhciBFZGl0b3JDb250cm9sbGVyID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0VkaXRvckNvbnRyb2xsZXJcIik7XG52YXIgVGFyZ2V0Q29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9UYXJnZXRDb250cm9sbGVyXCIpO1xudmFyIEZpZGRsZUNsaWVudE1vZGVsID0gcmVxdWlyZShcIi4uL21vZGVscy9GaWRkbGVDbGllbnRNb2RlbFwiKTtcbnZhciBGaWRkbGVDbGllbnRWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL0ZpZGRsZUNsaWVudFZpZXdcIik7XG52YXIgRmlkZGxlQ2xpZW50Q29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9GaWRkbGVDbGllbnRDb250cm9sbGVyXCIpO1xudmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xuXG5mdW5jdGlvbiBGaWRkbGVDbGllbnQoZG9tQ29udGFpbmVyLCBzZXNzaW9uLCBiYXNlUGF0aCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsID0gbmV3IEZpZGRsZUNsaWVudE1vZGVsKCk7XG5cdHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwuc2V0U2Vzc2lvbihzZXNzaW9uKTtcblxuXHR0aGlzLmZpZGRsZUNsaWVudFZpZXcgPSBuZXcgRmlkZGxlQ2xpZW50VmlldygpO1xuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMuZmlkZGxlQ2xpZW50Vmlldyk7XG5cblx0ZG9tQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMpO1xufTtcblxuQ2xhc3NVdGlscy5leHRlbmRzKEZpZGRsZUNsaWVudCwgeG5vZGUuRGl2KTtcblxuRmlkZGxlQ2xpZW50LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oaW5pdERhdGEsIHJlc291cmNlcykge1xuXHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsLmluaXREZWZpbml0aW9uKGluaXREYXRhKTtcblx0dGhpcy5yZXNvdXJjZXMgPSByZXNvdXJjZXM7XG5cblx0aWYgKHJlc291cmNlcy5pc0xvYWRpbmcoKSkge1xuXHRcdHJlc291cmNlcy5vbihSZXNvdXJjZXMuTG9hZGVkLCB0aGlzLmRvSW5pdCwgdGhpcyk7XG5cdFx0cmVzb3VyY2VzLm9uKFJlc291cmNlcy5FcnJvciwgdGhpcy5vblJlc291cmNlc0Vycm9yLCB0aGlzKTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmRvSW5pdCgpO1xuXHR9XG59O1xuXG5GaWRkbGVDbGllbnQucHJvdG90eXBlLm9uUmVzb3VyY2VzRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdGNvbnNvbGUubG9nKFwicmVzb3VyY2UgbG9hZCBlcnJvcjogXCIgKyBtZXNzYWdlKTtcbn1cblxuRmlkZGxlQ2xpZW50LnByb3RvdHlwZS5hZGRUZXN0Y2FzZSA9IGZ1bmN0aW9uKGlkLCBuYW1lLCB1cmwpIHtcblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbC5hZGRUZXN0Y2FzZShpZCwgbmFtZSwgdXJsKVxufTtcblxuRmlkZGxlQ2xpZW50LnByb3RvdHlwZS5kb0luaXQgPSBmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coXCJkb2luZyBpbml0Li4uXCIpO1xuXHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsLmluaXRSZXNvdXJjZXModGhpcy5yZXNvdXJjZXMpO1xuXG5cdHRoaXMuZmlkZGxlQ2xpZW50Q29udHJvbGxlciA9IG5ldyBGaWRkbGVDbGllbnRDb250cm9sbGVyKFxuXHRcdHRoaXMuZmlkZGxlQ2xpZW50Vmlldyxcblx0XHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsXG5cdCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZGRsZUNsaWVudDsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4vRWRpdG9yXCIpO1xudmFyIENvbG9ySXRlbSA9IHJlcXVpcmUoXCIuLi92aWV3cy9Db2xvckl0ZW1cIik7XG5cbmZ1bmN0aW9uIENvbG9yc0VkaXRvcihiYXNlUGF0aCwgc2Vzc2lvbiwgdmlldykge1xuXHRFZGl0b3IuY2FsbCh0aGlzLCBiYXNlUGF0aCwgc2Vzc2lvbiwgdmlldyk7XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKENvbG9yc0VkaXRvciwgRWRpdG9yKTtcbkV2ZW50RGlzcGF0Y2hlci5pbml0KENvbG9yc0VkaXRvcik7XG5cbkNvbG9yc0VkaXRvci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKHJlc291cmNlcykge1xuXHRFZGl0b3IucHJvdG90eXBlLmluaXQuY2FsbCh0aGlzKTtcblx0dGhpcy5yZXNvdXJjZXMgPSByZXNvdXJjZXM7XG5cblx0dmFyIGNvbG9ycyA9IHRoaXMucmVzb3VyY2VzLmdldFJlc291cmNlT2JqZWN0KCkuY29sb3JzO1xuXG5cdGZvcih2YXIga2V5IGluIGNvbG9ycykge1xuXHRcdHZhciBpdGVtID0gbmV3IENvbG9ySXRlbShrZXksIGNvbG9yc1trZXldKTtcblx0XHR0aGlzLnZpZXcuYWRkSXRlbShpdGVtKTtcblx0XHRpdGVtLm9uKENvbG9ySXRlbS5DaGFuZ2VkLCB0aGlzLm9uQ2hhbmdlZCwgdGhpcyk7XG5cdH1cbn07XG5cbkNvbG9yc0VkaXRvci5wcm90b3R5cGUub25DaGFuZ2VkID0gZnVuY3Rpb24oaXRlbSkge1xuXHR0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpLmNvbG9yc1tpdGVtLmlkXSA9IGl0ZW0uZ2V0VmFsdWUoKTtcblx0dGhpcy5zYXZlKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yc0VkaXRvcjsiLCJ2YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbnZhciBBUElDb25uZWN0aW9uID0gcmVxdWlyZShcIi4uL3V0aWxzL0FQSUNvbm5lY3Rpb25cIik7XG5cbmZ1bmN0aW9uIEVkaXRvcihiYXNlUGF0aCwgc2Vzc2lvbiwgdmlldykge1xuXHR0aGlzLnZpZXcgPSB2aWV3O1xuXHR0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGg7XG5cdHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG5cdHRoaXMuaXRlbXMgPSBuZXcgQXJyYXkoKTtcblx0dGhpcy5jb250YWluZXIgPSBudWxsO1xuXHR0aGlzLnJlc291cmNlcyA9IG51bGw7XG59O1xuRWRpdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVkaXRvcjtcbkV2ZW50RGlzcGF0Y2hlci5pbml0KEVkaXRvcik7XG5cbkVkaXRvci5TYXZlZCA9IFwiU2F2ZWRcIjtcblxuRWRpdG9yLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdFxufTtcblxuXG5FZGl0b3IucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblx0dGhpcy52aWV3LnNob3coKTtcbn07XG5cblxuRWRpdG9yLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudmlldy5oaWRlKCk7XG59O1xuXG5cbkVkaXRvci5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuXHR0cnkge1xuXHRcdHZhciBjb25uZWN0aW9uID0gbmV3IEFQSUNvbm5lY3Rpb24oXCIuL1wiLCB0aGlzLnNlc3Npb24pO1xuXHRcdGNvbm5lY3Rpb24ub24oXCJsb2FkZWRcIiwgdGhpcy5vblNhdmVkLCB0aGlzKTtcblx0XHRjb25uZWN0aW9uLmxvYWQoXCJzYXZlXCIsIHtzZXNzaW9uOiB0aGlzLnNlc3Npb24sIGpzb246IEpTT04uc3RyaW5naWZ5KHRoaXMucmVzb3VyY2VzLmdldFJlc291cmNlT2JqZWN0KCkpfSk7XG5cdH1cblx0Y2F0Y2goZXJyb3IpIHtcblx0XHRjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBzYXZlOiBcIiwgZXJyb3IpO1xuXHR9XG59O1xuXG5FZGl0b3IucHJvdG90eXBlLm9uU2F2ZWQgPSBmdW5jdGlvbihkYXRhKSB7XG5cdHZhciBjb25uZWN0aW9uID0gZGF0YS5jb25uZWN0aW9uO1xuXHR2YXIganNvbiA9IGRhdGEuanNvbjtcblx0Y29ubmVjdGlvbi5vZmYoXCJsb2FkZWRcIiwgdGhpcy5vblNhdmVkLCB0aGlzKTtcblx0dGhpcy50cmlnZ2VyKEVkaXRvci5TYXZlZCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvcjsiLCJ2YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbnZhciBFZGl0b3JWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL0VkaXRvclZpZXdcIik7XG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL0VkaXRvclwiKTtcbnZhciBHcmFwaGljc0VkaXRvciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9HcmFwaGljc0VkaXRvclwiKTtcbnZhciBQb3NpdGlvbnNFZGl0b3IgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvUG9zaXRpb25zRWRpdG9yXCIpO1xudmFyIFN0cmluZ3NFZGl0b3IgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvU3RyaW5nc0VkaXRvclwiKTtcbnZhciBDb2xvcnNFZGl0b3IgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvQ29sb3JzRWRpdG9yXCIpO1xudmFyIE1lbnUgPSByZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvTWVudVwiKTtcbnZhciBNZW51SXRlbSA9IHJlcXVpcmUoXCIuLi92aWV3cy9NZW51SXRlbVwiKTtcbnZhciBNZW51VmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9NZW51Vmlld1wiKTtcblxuZnVuY3Rpb24gRWRpdG9yQ29udHJvbGxlcihiYXNlUGF0aCwgc2Vzc2lvbiwgdmlldykge1xuXHR0aGlzLnZpZXcgPSB2aWV3O1xuXG5cdHRoaXMudmlldy5zaG93KCk7XG5cdFxuXHR0aGlzLm1lbnVWaWV3ID0gbmV3IE1lbnVWaWV3KCk7XG5cdHRoaXMudmlldy5zZXRNZW51Vmlldyh0aGlzLm1lbnVWaWV3KTtcblxuXHR2YXIgaXRlbXMgPSBbXG5cdFx0bmV3IE1lbnVJdGVtKFwiaW1hZ2VcIiwgXCJHcmFwaGljc1wiKSxcblx0XHRuZXcgTWVudUl0ZW0oXCJwb3NpdGlvblwiLCBcIlBvc2l0aW9uc1wiKSxcblx0XHRuZXcgTWVudUl0ZW0oXCJjb2xvclwiLCBcIkNvbG9yc1wiKSxcblx0XHRuZXcgTWVudUl0ZW0oXCJzdHJpbmdcIiwgXCJTdHJpbmdzXCIpXG5cdF07XG5cblx0dGhpcy5tZW51Vmlldy5zZXRJdGVtcyhpdGVtcyk7XG5cblx0dGhpcy5tZW51ID0gbmV3IE1lbnUodGhpcy5tZW51VmlldywgaXRlbXMpO1xuXHR0aGlzLm1lbnUub24oTWVudS5JdGVtQ2xpY2tlZCwgdGhpcy5vbkNoYW5nZVZpZXcsIHRoaXMpO1xuXG5cdHZhciBlZGl0b3JWaWV3ID0gbmV3IEVkaXRvclZpZXcoKTtcblx0dGhpcy52aWV3LmFkZEVkaXRvcihlZGl0b3JWaWV3KTtcblx0ZWRpdG9yVmlldy55ID0gdGhpcy5tZW51Vmlldy5oZWlnaHQ7XG5cdHRoaXMuZ3JhcGhpY3NFZGl0b3IgPSBuZXcgR3JhcGhpY3NFZGl0b3IoYmFzZVBhdGgsIHNlc3Npb24sIGVkaXRvclZpZXcpO1xuXG5cdHZhciBlZGl0b3JWaWV3ID0gbmV3IEVkaXRvclZpZXcoKTtcblx0dGhpcy52aWV3LmFkZEVkaXRvcihlZGl0b3JWaWV3KTtcblx0ZWRpdG9yVmlldy55ID0gdGhpcy5tZW51Vmlldy5oZWlnaHQ7XG5cdHRoaXMucG9zaXRpb25zRWRpdG9yID0gbmV3IFBvc2l0aW9uc0VkaXRvcihcIi4vXCIsIHNlc3Npb24sIGVkaXRvclZpZXcpO1xuXG5cdHZhciBlZGl0b3JWaWV3ID0gbmV3IEVkaXRvclZpZXcoKTtcblx0dGhpcy52aWV3LmFkZEVkaXRvcihlZGl0b3JWaWV3KTtcblx0ZWRpdG9yVmlldy55ID0gdGhpcy5tZW51Vmlldy5oZWlnaHQ7XG5cdHRoaXMuY29sb3JzRWRpdG9yID0gbmV3IENvbG9yc0VkaXRvcihcIi4vXCIsIHNlc3Npb24sIGVkaXRvclZpZXcpO1xuXG5cdHZhciBlZGl0b3JWaWV3ID0gbmV3IEVkaXRvclZpZXcoKTtcblx0dGhpcy52aWV3LmFkZEVkaXRvcihlZGl0b3JWaWV3KTtcblx0dGhpcy5zdHJpbmdzRWRpdG9yID0gbmV3IFN0cmluZ3NFZGl0b3IoXCIuL1wiLCBzZXNzaW9uLCBlZGl0b3JWaWV3KTtcblxuXHR0aGlzLmN1cnJlbnRFZGl0b3IgPSB0aGlzLmdyYXBoaWNzRWRpdG9yO1xuXHR0aGlzLmN1cnJlbnRFZGl0b3Iuc2hvdygpO1xuXG5cdC8vdGhpcy5lZGl0b3Iub24oXCJzYXZlZFwiLCB0aGlzLm9uU2F2ZWQsIHRoaXMpO1xuXHQvL3RoaXMuZWRpdG9yLm9uKFwibG9hZGVkXCIsIHRoaXMub25UZXh0dXJlLCB0aGlzKTtcblx0dGhpcy5ncmFwaGljc0VkaXRvci5vbihcInVwbG9hZGVkXCIsIHRoaXMub25VcGxvYWRlZCwgdGhpcyk7XG5cblx0dGhpcy5ncmFwaGljc0VkaXRvci5vbihFZGl0b3IuU2F2ZWQsIHRoaXMub25TYXZlZCwgdGhpcyk7XG5cdHRoaXMucG9zaXRpb25zRWRpdG9yLm9uKEVkaXRvci5TYXZlZCwgdGhpcy5vblNhdmVkLCB0aGlzKTtcblx0dGhpcy5jb2xvcnNFZGl0b3Iub24oRWRpdG9yLlNhdmVkLCB0aGlzLm9uU2F2ZWQsIHRoaXMpO1xuXHR0aGlzLnN0cmluZ3NFZGl0b3Iub24oRWRpdG9yLlNhdmVkLCB0aGlzLm9uU2F2ZWQsIHRoaXMpO1xufTtcbkVkaXRvckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRWRpdG9yQ29udHJvbGxlcjtcbkV2ZW50RGlzcGF0Y2hlci5pbml0KEVkaXRvckNvbnRyb2xsZXIpO1xuXG5FZGl0b3JDb250cm9sbGVyLlJlZnJlc2ggPSBcInJlZnJlc2hcIjtcblxuRWRpdG9yQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKHJlc291cmNlcykge1xuXHR0aGlzLnJlc291cmNlcyA9IHJlc291cmNlcztcblx0XG5cdHRoaXMucG9zaXRpb25zRWRpdG9yLmluaXQocmVzb3VyY2VzKTtcblx0dGhpcy5ncmFwaGljc0VkaXRvci5pbml0KHJlc291cmNlcyk7XG5cdC8vdGhpcy5zdHJpbmdzRWRpdG9yLmluaXQocmVzb3VyY2VzKTtcblx0dGhpcy5jb2xvcnNFZGl0b3IuaW5pdChyZXNvdXJjZXMpO1xuXG5cdHRoaXMuZ3JhcGhpY3NFZGl0b3Iuc2F2ZSgpO1xufTtcblxuXG5FZGl0b3JDb250cm9sbGVyLnByb3RvdHlwZS5vbkNoYW5nZVZpZXcgPSBmdW5jdGlvbihpdGVtKSB7XG5cdHRoaXMuY3VycmVudEVkaXRvci5oaWRlKCk7XG5cdHN3aXRjaChpdGVtLmlkKSB7XG5cdFx0Y2FzZSBcImltYWdlXCI6IHtcblx0XHRcdHRoaXMuY3VycmVudEVkaXRvciA9IHRoaXMuZ3JhcGhpY3NFZGl0b3I7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcInBvc2l0aW9uXCI6IHtcblx0XHRcdHRoaXMuY3VycmVudEVkaXRvciA9IHRoaXMucG9zaXRpb25zRWRpdG9yO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJjb2xvclwiOiB7XG5cdFx0XHR0aGlzLmN1cnJlbnRFZGl0b3IgPSB0aGlzLmNvbG9yc0VkaXRvcjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwic3RyaW5nXCI6IHtcblx0XHRcdHRoaXMuY3VycmVudEVkaXRvciA9IHRoaXMuc3RyaW5nc0VkaXRvcjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHR0aGlzLmN1cnJlbnRFZGl0b3Iuc2hvdygpO1xuXHR0aGlzLmN1cnJlbnRFZGl0b3Iudmlldy51cGRhdGVMYXlvdXQodGhpcy52aWV3LndpZHRoLCB0aGlzLnZpZXcuaGVpZ2h0KTtcblxuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLnZpZXcudXBkYXRlTGF5b3V0KGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgqLjUsIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcblx0fS5iaW5kKHRoaXMpLDApO1xufTtcblxuXG5FZGl0b3JDb250cm9sbGVyLnByb3RvdHlwZS5vblVwbG9hZGVkID0gZnVuY3Rpb24odGV4dHVyZUpzb24pIHtcblx0Ly90aGlzLmVkaXRvci5zZXRUZXh0dXJlSnNvbih0ZXh0dXJlSnNvbik7XG5cdHRoaXMudHJpZ2dlcihFZGl0b3JDb250cm9sbGVyLlJlZnJlc2gpO1xufTtcblxuXG5FZGl0b3JDb250cm9sbGVyLnByb3RvdHlwZS5vblNhdmVkID0gZnVuY3Rpb24odGV4dHVyZUpzb24pIHtcblx0Ly90aGlzLmVkaXRvci5zZXRUZXh0dXJlSnNvbih0ZXh0dXJlSnNvbik7XG5cdHRoaXMudHJpZ2dlcihFZGl0b3JDb250cm9sbGVyLlJlZnJlc2gpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JDb250cm9sbGVyOyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciB4bm9kZWMgPSByZXF1aXJlKFwieG5vZGVjb2xsZWN0aW9uXCIpO1xudmFyIFRhcmdldFRhYkhlYWRlckNvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi9UYXJnZXRUYWJIZWFkZXJDb250cm9sbGVyXCIpO1xudmFyIFRhcmdldFRhYkhlYWRlclZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvVGFyZ2V0VGFiSGVhZGVyVmlld1wiKTtcbnZhciBSZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXIgPSByZXF1aXJlKFwiLi9SZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXJcIik7XG52YXIgUmVzb3VyY2VUYWJIZWFkZXJWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1Jlc291cmNlVGFiSGVhZGVyVmlld1wiKTtcbnZhciBSZXNvdXJjZVRhYlZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvUmVzb3VyY2VUYWJWaWV3XCIpO1xudmFyIFJlc291cmNlVGFiQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9SZXNvdXJjZVRhYkNvbnRyb2xsZXJcIik7XG52YXIgRmlkZGxlQ2xpZW50TW9kZWwgPSByZXF1aXJlKFwiLi4vbW9kZWxzL0ZpZGRsZUNsaWVudE1vZGVsXCIpO1xuXG4vKipcbiAqIEZpZGRsZUNsaWVudENvbnRyb2xsZXJcbiAqIEBjbGFzcyBGaWRkbGVDbGllbnRDb250cm9sbGVyXG4gKi9cbmZ1bmN0aW9uIEZpZGRsZUNsaWVudENvbnRyb2xsZXIoZmlkZGxlQ2xpZW50VmlldywgZmlkZGxlQ2xpZW50TW9kZWwpIHtcblx0dGhpcy5maWRkbGVDbGllbnRWaWV3ID0gZmlkZGxlQ2xpZW50Vmlldztcblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbCA9IGZpZGRsZUNsaWVudE1vZGVsO1xuXG5cdHRoaXMudGFyZ2V0VGFic0hlYWRlck1hbmFnZXIgPSBuZXcgeG5vZGVjLkNvbGxlY3Rpb25WaWV3TWFuYWdlcigpO1xuXHR0aGlzLnRhcmdldFRhYnNIZWFkZXJNYW5hZ2VyLnNldEl0ZW1SZW5kZXJlckNsYXNzKFRhcmdldFRhYkhlYWRlclZpZXcpO1xuXHR0aGlzLnRhcmdldFRhYnNIZWFkZXJNYW5hZ2VyLnNldEl0ZW1Db250cm9sbGVyQ2xhc3MoVGFyZ2V0VGFiSGVhZGVyQ29udHJvbGxlcik7XG5cdHRoaXMudGFyZ2V0VGFic0hlYWRlck1hbmFnZXIuc2V0VGFyZ2V0KHRoaXMuZmlkZGxlQ2xpZW50Vmlldy5nZXRUYXJnZXRQYW5lVmlldygpLmdldFRhYkhlYWRlckhvbGRlcigpKTtcblx0dGhpcy50YXJnZXRUYWJzSGVhZGVyTWFuYWdlci5zZXREYXRhU291cmNlKHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwuZ2V0VGVzdGNhc2VDb2xsZWN0aW9uKCkpO1xuXG5cdHRoaXMucmVzb3VyY2VUYWJzSGVhZGVyTWFuYWdlciA9IG5ldyB4bm9kZWMuQ29sbGVjdGlvblZpZXdNYW5hZ2VyKCk7XG5cdHRoaXMucmVzb3VyY2VUYWJzSGVhZGVyTWFuYWdlci5zZXRJdGVtUmVuZGVyZXJDbGFzcyhSZXNvdXJjZVRhYkhlYWRlclZpZXcpO1xuXHR0aGlzLnJlc291cmNlVGFic0hlYWRlck1hbmFnZXIuc2V0SXRlbUNvbnRyb2xsZXJDbGFzcyhSZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXIpO1xuXHR0aGlzLnJlc291cmNlVGFic0hlYWRlck1hbmFnZXIuc2V0VGFyZ2V0KHRoaXMuZmlkZGxlQ2xpZW50Vmlldy5nZXRSZXNvdXJjZVBhbmVWaWV3KCkuZ2V0VGFiSGVhZGVySG9sZGVyKCkpO1xuXHR0aGlzLnJlc291cmNlVGFic0hlYWRlck1hbmFnZXIuc2V0RGF0YVNvdXJjZSh0aGlzLmZpZGRsZUNsaWVudE1vZGVsLmdldENhdGVnb3J5Q29sbGVjdGlvbigpKTtcblxuXHR0aGlzLnJlc291cmNlVGFic01hbmFnZXIgPSBuZXcgeG5vZGVjLkNvbGxlY3Rpb25WaWV3TWFuYWdlcigpO1xuXHR0aGlzLnJlc291cmNlVGFic01hbmFnZXIuc2V0SXRlbVJlbmRlcmVyQ2xhc3MoUmVzb3VyY2VUYWJWaWV3KTtcblx0dGhpcy5yZXNvdXJjZVRhYnNNYW5hZ2VyLnNldEl0ZW1Db250cm9sbGVyQ2xhc3MoUmVzb3VyY2VUYWJDb250cm9sbGVyKTtcblx0dGhpcy5yZXNvdXJjZVRhYnNNYW5hZ2VyLnNldFRhcmdldCh0aGlzLmZpZGRsZUNsaWVudFZpZXcuZ2V0UmVzb3VyY2VQYW5lVmlldygpLmdldFRhYkhvbGRlcigpKTtcblx0dGhpcy5yZXNvdXJjZVRhYnNNYW5hZ2VyLnNldERhdGFTb3VyY2UodGhpcy5maWRkbGVDbGllbnRNb2RlbC5nZXRDYXRlZ29yeUNvbGxlY3Rpb24oKSk7XG5cblx0dGhpcy51cGRhdGVDdXJyZW50VGVzdGNhc2UoKTtcblxuXHR0aGlzLmZpZGRsZUNsaWVudE1vZGVsLm9uKEZpZGRsZUNsaWVudE1vZGVsLkFDVElWRV9URVNUQ0FTRV9DSEFOR0UsIHRoaXMudXBkYXRlQ3VycmVudFRlc3RjYXNlLCB0aGlzKTtcblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbC5vbihGaWRkbGVDbGllbnRNb2RlbC5JVEVNX0NIQU5HRSwgdGhpcy5vbk1vZGVsSXRlbUNoYW5nZSwgdGhpcyk7XG5cdHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwub24oRmlkZGxlQ2xpZW50TW9kZWwuU0FWRV9DT01QTEVURSwgdGhpcy5vbk1vZGVsU2F2ZUNvbXBsZXRlLCB0aGlzKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgY3VycmVudCB0ZXN0IGNhc2UuXG4gKiBAbWV0aG9kIHVwZGF0ZUN1cnJlbnRUZXN0Y2FzZVxuICovXG5GaWRkbGVDbGllbnRDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVDdXJyZW50VGVzdGNhc2UgPSBmdW5jdGlvbigpIHtcblx0dmFyIGFjdGl2ZVRlc3RjYXNlID0gdGhpcy5maWRkbGVDbGllbnRNb2RlbC5nZXRBY3RpdmVUZXN0Y2FzZSgpO1xuXG5cdGlmICghYWN0aXZlVGVzdGNhc2UpXG5cdFx0cmV0dXJuIG51bGw7XG5cblx0dGhpcy5maWRkbGVDbGllbnRWaWV3LmdldFRhcmdldFBhbmVWaWV3KCkuc2V0VXJsKGFjdGl2ZVRlc3RjYXNlLmdldENhY2hlUHJldmVudGlvblVybCgpKTtcbn1cblxuLyoqXG4gKiBUaGUgbW9kZWwgd2FzIHNhdmVkLCByZWZyZXNoIHRhcmdldC5cbiAqIEBtZXRob2Qgb25Nb2RlbFNhdmVDb21wbGV0ZVxuICovXG5GaWRkbGVDbGllbnRDb250cm9sbGVyLnByb3RvdHlwZS5vbk1vZGVsU2F2ZUNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudXBkYXRlQ3VycmVudFRlc3RjYXNlKCk7XG59XG5cbi8qKlxuICogTW9kZWwgaXRlbSBjaGFuZ2UuXG4gKiBAbWV0aG9kIG9uTW9kZWxJdGVtQ2hhbmdlXG4gKi9cbkZpZGRsZUNsaWVudENvbnRyb2xsZXIucHJvdG90eXBlLm9uTW9kZWxJdGVtQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuZmlkZGxlQ2xpZW50TW9kZWwuc2F2ZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZGRsZUNsaWVudENvbnRyb2xsZXI7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIEFQSUNvbm5lY3Rpb24gPSByZXF1aXJlKFwiLi4vdXRpbHMvQVBJQ29ubmVjdGlvblwiKTtcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi9FZGl0b3JcIik7XG52YXIgSW1hZ2VJdGVtID0gcmVxdWlyZShcIi4uL3ZpZXdzL0ltYWdlSXRlbVwiKTtcbnZhciBTZWxlY3RCdXR0b24gPSByZXF1aXJlKFwiLi4vdmlld3MvU2VsZWN0QnV0dG9uXCIpO1xudmFyIFJlc291cmNlcyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9saWIvUmVzb3VyY2VzXCIpO1xuXG5cbmZ1bmN0aW9uIEdyYXBoaWNzRWRpdG9yKGJhc2VQYXRoLCBzZXNzaW9uLCB2aWV3KSB7XG5cdEVkaXRvci5jYWxsKHRoaXMsIGJhc2VQYXRoLCBzZXNzaW9uLCB2aWV3KTtcblxuXHR0aGlzLmN1cnJlbnRJdGVtID0gbnVsbDtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoR3JhcGhpY3NFZGl0b3IsIEVkaXRvcik7XG5cbkV2ZW50RGlzcGF0Y2hlci5pbml0KEdyYXBoaWNzRWRpdG9yKTtcblxuR3JhcGhpY3NFZGl0b3IucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcblx0RWRpdG9yLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG5cdHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuXG5cdHZhciBncmFwaGljcyA9IHRoaXMucmVzb3VyY2VzLmdldFJlc291cmNlT2JqZWN0KCkuZ3JhcGhpY3M7XG5cblxuXHRmb3IodmFyIGtleSBpbiBncmFwaGljcykge1xuXHRcdGlmKGtleSAhPSBcInRleHR1cmVzXCIpIHtcblx0XHRcdHZhciBpbWFnZUl0ZW0gPSBuZXcgSW1hZ2VJdGVtKHRoaXMuYmFzZVBhdGgsIGtleSwgdGhpcy5yZXNvdXJjZXMuZ2V0RE9NVGV4dHVyZShrZXkpKTtcblx0XHRcdHRoaXMudmlldy5hZGRJdGVtKGltYWdlSXRlbSk7XG5cdFx0XHRpbWFnZUl0ZW0ub24oSW1hZ2VJdGVtLlNlbGVjdGVkLCB0aGlzLm9uVXBsb2FkLCB0aGlzKTtcblx0XHR9XG5cdH1cbn07XG5cbkdyYXBoaWNzRWRpdG9yLnByb3RvdHlwZS5vblVwbG9hZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XG5cdGlmKGl0ZW0uZ2V0VmFsdWVzKCkubGVuZ3RoID4gMCkge1xuXHRcdHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0ZGF0YS5hcHBlbmQoJ1NlbGVjdGVkRmlsZScsIGl0ZW0uZ2V0VmFsdWVzKClbMF0pO1xuXHRcdGRhdGEuYXBwZW5kKFwiRmlsZW5hbWVcIiwgaXRlbS5uYW1lKTtcblx0XHRkYXRhLmFwcGVuZChcInVybFwiLCBkb2N1bWVudC5sb2NhdGlvbik7XG5cdFx0dGhpcy5jdXJyZW50SXRlbSA9IGl0ZW07XG5cdFx0dmFyIGNvbm5lY3Rpb24gPSBuZXcgQVBJQ29ubmVjdGlvbihcIi4vXCIsIHRoaXMuc2Vzc2lvbik7XG5cdFx0Y29ubmVjdGlvbi5vbihcImxvYWRlZFwiLCB0aGlzLm9uVXBsb2FkZWQsIHRoaXMpO1xuXHRcdGNvbm5lY3Rpb24udXBsb2FkKFwidXBsb2FkXCIsIGRhdGEpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGNvbnNvbGUud2FybihcIk5vIGZpbGVzIHNlbGVjdGVkOiBldmVudDpcIiwgaXRlbSk7XG5cdH1cbn07XG5cbkdyYXBoaWNzRWRpdG9yLnByb3RvdHlwZS5vblVwbG9hZGVkID0gZnVuY3Rpb24oZGF0YSkge1xuXHR2YXIgY29ubmVjdGlvbiA9IGRhdGEuY29ubmVjdGlvbjtcblx0dmFyIGpzb24gPSBkYXRhLmpzb247XG5cdFxuXHR0aGlzLnJlc291cmNlcy5hZGRTb3VyY2Uoe2dyYXBoaWNzOiBqc29ufSwgdHJ1ZSk7XG5cdHRoaXMuc2F2ZSgpO1xuXHR0aGlzLmN1cnJlbnRJdGVtLnNldFRleHR1cmUodGhpcy5yZXNvdXJjZXMuZ2V0RE9NVGV4dHVyZSh0aGlzLmN1cnJlbnRJdGVtLm5hbWUpKTtcblx0Ly90aGlzLmxvYWRJbWFnZXMoKTtcblx0dGhpcy50cmlnZ2VyKFwidXBsb2FkZWRcIiwganNvbik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYXBoaWNzRWRpdG9yOyIsInZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIE1lbnVJdGVtID0gcmVxdWlyZShcIi4uL3ZpZXdzL01lbnVJdGVtXCIpO1xuXG5mdW5jdGlvbiBNZW51KHZpZXcsIG1lbnVJdGVtcykge1xuXHR0aGlzLm1lbnVJdGVtcyA9IG1lbnVJdGVtcztcblx0dGhpcy52aWV3ID0gdmlldztcblxuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5tZW51SXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHR0aGlzLm1lbnVJdGVtc1tpXS5vbihNZW51SXRlbS5DbGljaywgdGhpcy5vbk1lbnVJdGVtQ2xpY2ssIHRoaXMpO1xuXHR9XG5cdGlmKHRoaXMubWVudUl0ZW1zLmxlbmd0aCA+IDApIHtcblx0XHR0aGlzLmN1cnJlbnRNZW51SXRlbSA9IHRoaXMubWVudUl0ZW1zWzBdO1xuXHRcdHRoaXMuY3VycmVudE1lbnVJdGVtLnNldFNlbGVjdGVkKHRydWUpO1xuXHR9XG59O1xuTWVudS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBNZW51O1xuRXZlbnREaXNwYXRjaGVyLmluaXQoTWVudSk7XG5cbk1lbnUuSXRlbUNsaWNrZWQgPSBcIkl0ZW1DbGlja2VkXCI7XG5cbk1lbnUucHJvdG90eXBlLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG5cdGlmKHRoaXMubWVudUl0ZW1zLmxlbmd0aCA8PSAwKSB7XG5cdFx0dGhpcy5jdXJyZW50TWVudUl0ZW0gPSBpdGVtO1xuXHRcdHRoaXMuY3VycmVudE1lbnVJdGVtLnNldFNlbGVjdGVkKHRydWUpO1xuXHRcdHRoaXMudHJpZ2dlcihNZW51Lkl0ZW1DbGlja2VkLCBpdGVtKTtcblx0fVxuXHR0aGlzLnZpZXcuYWRkSXRlbShpdGVtKTtcblx0aXRlbS5vbihNZW51SXRlbS5DbGljaywgdGhpcy5vbk1lbnVJdGVtQ2xpY2ssIHRoaXMpO1xuXG59O1xuXG5NZW51LnByb3RvdHlwZS5vbk1lbnVJdGVtQ2xpY2sgPSBmdW5jdGlvbihtZW51SXRlbSkge1xuXG5cdHRoaXMuY3VycmVudE1lbnVJdGVtLnNldFNlbGVjdGVkKGZhbHNlKTtcblx0dGhpcy5jdXJyZW50TWVudUl0ZW0gPSBtZW51SXRlbTtcblx0dGhpcy5jdXJyZW50TWVudUl0ZW0uc2V0U2VsZWN0ZWQodHJ1ZSk7XG5cblx0dGhpcy50cmlnZ2VyKE1lbnUuSXRlbUNsaWNrZWQsIG1lbnVJdGVtKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNZW51O1xuIiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuL0VkaXRvclwiKTtcbnZhciBQb3NpdGlvbkl0ZW0gPSByZXF1aXJlKFwiLi4vdmlld3MvUG9zaXRpb25JdGVtXCIpO1xuXG5mdW5jdGlvbiBQb3NpdGlvbnNFZGl0b3IoYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpIHtcblx0RWRpdG9yLmNhbGwodGhpcywgYmFzZVBhdGgsIHNlc3Npb24sIHZpZXcpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhQb3NpdGlvbnNFZGl0b3IsIEVkaXRvcik7XG5FdmVudERpc3BhdGNoZXIuaW5pdChQb3NpdGlvbnNFZGl0b3IpO1xuXG5Qb3NpdGlvbnNFZGl0b3IucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcblx0RWRpdG9yLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG5cdHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuXG5cdHZhciBwb3NpdGlvbnMgPSB0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpLnBvc2l0aW9ucztcblxuXHQvL2NvbnNvbGUubG9nKFwicG9zaXRpb25zOiBcIiwgcG9zaXRpb25zKTtcblxuXHRmb3IodmFyIGtleSBpbiBwb3NpdGlvbnMpIHtcblx0XHQvL2NvbnNvbGUubG9nKFwiY3JlYXRlIFBvc2l0aW9uSXRlbTogXCIsIGtleSwgcG9zaXRpb25zW2tleV0pO1xuXHRcdHZhciBpdGVtID0gbmV3IFBvc2l0aW9uSXRlbShrZXksIHBvc2l0aW9uc1trZXldKTtcblx0XHR0aGlzLnZpZXcuYWRkSXRlbShpdGVtKTtcblx0XHRpdGVtLm9uKFBvc2l0aW9uSXRlbS5DaGFuZ2VkLCB0aGlzLm9uQ2hhbmdlZCwgdGhpcyk7XG5cdH1cbn07XG5cblBvc2l0aW9uc0VkaXRvci5wcm90b3R5cGUub25DaGFuZ2VkID0gZnVuY3Rpb24oaXRlbSkge1xuXHR0aGlzLnJlc291cmNlcy5nZXRSZXNvdXJjZU9iamVjdCgpLnBvc2l0aW9uc1tpdGVtLmlkXVswXSA9IGl0ZW0uZ2V0VmFsdWVzKClbMF1cblx0dGhpcy5yZXNvdXJjZXMuZ2V0UmVzb3VyY2VPYmplY3QoKS5wb3NpdGlvbnNbaXRlbS5pZF1bMV0gPSBpdGVtLmdldFZhbHVlcygpWzFdO1xuXHR0aGlzLnNhdmUoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zaXRpb25zRWRpdG9yOyIsInZhciBSZXNvdXJjZUl0ZW1Db250cm9sbGVyID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJdGVtQ29udHJvbGxlclwiKTtcbnZhciBSZXNvdXJjZUl0ZW1WaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL1Jlc291cmNlSXRlbVZpZXdcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcblxuLyoqXG4gKiBDb250cm9sIGEgcmVzb3VyY2UgY2F0ZWdvcnkuXG4gKiBAbWV0aG9kIFJlc291cmNlVGFiQ29udHJvbGxlclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZUNhdGVnb3J5Q29udHJvbGxlcihjYXRlZ29yeVZpZXcpIHtcblx0dGhpcy5jYXRlZ29yeVZpZXcgPSBjYXRlZ29yeVZpZXc7XG5cblx0dGhpcy5jYXRlZ29yeVZpZXcub24oXCJ0aXRsZUNsaWNrXCIsIHRoaXMub25DYXRlZ29yeVZpZXdUaXRsZUNsaWNrLCB0aGlzKTtcblxuXHR0aGlzLml0ZW1NYW5hZ2VyID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uVmlld01hbmFnZXIoKTtcblx0dGhpcy5pdGVtTWFuYWdlci5zZXRUYXJnZXQodGhpcy5jYXRlZ29yeVZpZXcuZ2V0SXRlbUhvbGRlcigpKTtcblx0dGhpcy5pdGVtTWFuYWdlci5zZXRJdGVtUmVuZGVyZXJDbGFzcyhSZXNvdXJjZUl0ZW1WaWV3KTtcblx0dGhpcy5pdGVtTWFuYWdlci5zZXRJdGVtQ29udHJvbGxlckNsYXNzKFJlc291cmNlSXRlbUNvbnRyb2xsZXIpO1xufVxuXG4vKipcbiAqIFNldCBkYXRhLlxuICogQG1ldGhvZCBzZXREYXRhXG4gKi9cblJlc291cmNlQ2F0ZWdvcnlDb250cm9sbGVyLnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24oY2F0ZWdvcnlNb2RlbCkge1xuXHRpZiAodGhpcy5jYXRlZ29yeU1vZGVsKSB7XG5cdFx0dGhpcy5pdGVtTWFuYWdlci5zZXREYXRhU291cmNlKG51bGwpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeU1vZGVsLm9mZihcImNoYW5nZVwiLCB0aGlzLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLmNhdGVnb3J5TW9kZWwgPSBjYXRlZ29yeU1vZGVsO1xuXG5cdGlmICh0aGlzLmNhdGVnb3J5TW9kZWwpIHtcblx0XHR0aGlzLml0ZW1NYW5hZ2VyLnNldERhdGFTb3VyY2UodGhpcy5jYXRlZ29yeU1vZGVsLmdldEl0ZW1Db2xsZWN0aW9uKCkpO1xuXG5cdFx0dGhpcy5jYXRlZ29yeU1vZGVsLm9uKFwiY2hhbmdlXCIsIHRoaXMub25DYXRlZ29yeU1vZGVsQ2hhbmdlLCB0aGlzKTtcblx0XHR0aGlzLmNhdGVnb3J5Vmlldy5zZXRBY3RpdmUoY2F0ZWdvcnlNb2RlbC5pc0FjdGl2ZSgpKTtcblx0XHR0aGlzLmNhdGVnb3J5Vmlldy5zZXRMYWJlbChjYXRlZ29yeU1vZGVsLmdldExhYmVsKCkpO1xuXHRcdHRoaXMuY2F0ZWdvcnlWaWV3LnNldERlc2NyaXB0aW9uKHRoaXMuY2F0ZWdvcnlNb2RlbC5nZXREZXNjcmlwdGlvbigpKTtcblx0fVxufVxuXG4vKipcbiAqIEhhbmRsZSBjaGFuZ2UgaW4gdGhlIG1vZGVsLlxuICogQG1ldGhvZCBvbkNhdGVnb3J5TW9kZWxDaGFuZ2VcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNhdGVnb3J5Vmlldy5zZXRBY3RpdmUodGhpcy5jYXRlZ29yeU1vZGVsLmlzQWN0aXZlKCkpO1xuXHR0aGlzLmNhdGVnb3J5Vmlldy5zZXREZXNjcmlwdGlvbih0aGlzLmNhdGVnb3J5TW9kZWwuZ2V0RGVzY3JpcHRpb24oKSk7XG59XG5cbi8qKlxuICogVGl0bGUgY2xpY2suIFRvZ2dsZSB0aGUgYWN0aXZlIHN0YXRlLlxuICogQG1ldGhvZCBvbkNhdGVnb3J5Vmlld1RpdGxlQ2xpY2tcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2F0ZWdvcnlWaWV3VGl0bGVDbGljayA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNhdGVnb3J5TW9kZWwuc2V0QWN0aXZlKCF0aGlzLmNhdGVnb3J5TW9kZWwuaXNBY3RpdmUoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXI7IiwidmFyIFJlc291cmNlSXRlbU1vZGVsID0gcmVxdWlyZShcIi4uL21vZGVscy9SZXNvdXJjZUl0ZW1Nb2RlbFwiKTtcblxuLyoqXG4gKiBDb250cm9sIGEgcmVzb3VyY2UgaXRlbS5cbiAqIEBjbGFzcyBSZXNvdXJjZUl0ZW1Db250cm9sbGVyXG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlSXRlbUNvbnRyb2xsZXIoaXRlbVZpZXcpIHtcblx0dGhpcy5pdGVtVmlldyA9IGl0ZW1WaWV3O1xuXG5cdHRoaXMuaXRlbVZpZXcub24oXCJjaGFuZ2VcIiwgdGhpcy5vbkl0ZW1WaWV3Q2hhbmdlLCB0aGlzKTtcblx0dGhpcy5pdGVtVmlldy5vbihcImZpbGVTZWxlY3RcIiwgdGhpcy5vbkl0ZW1WaWV3RmlsZVNlbGVjdCwgdGhpcyk7XG59XG5cbi8qKlxuICogU2V0IGl0ZW0gbW9kZWwgdG8gc2VydmUgYXMgZGF0YS5cbiAqIEBtZXRob2Qgc2V0RGF0YVxuICovXG5SZXNvdXJjZUl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24oaXRlbU1vZGVsKSB7XG5cdGlmICh0aGlzLml0ZW1Nb2RlbCkge1xuXHRcdHRoaXMuaXRlbU1vZGVsLm9mZihSZXNvdXJjZUl0ZW1Nb2RlbC5JVEVNX0NIQU5HRSwgdGhpcy5vbkl0ZW1Nb2RlbENoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLml0ZW1Nb2RlbCA9IGl0ZW1Nb2RlbDtcblxuXHRpZiAodGhpcy5pdGVtTW9kZWwpIHtcblx0XHR0aGlzLml0ZW1WaWV3LnNldEtleSh0aGlzLml0ZW1Nb2RlbC5nZXRLZXkoKSk7XG5cdFx0dGhpcy5pdGVtVmlldy5zZXREZWZhdWx0VmFsdWUodGhpcy5pdGVtTW9kZWwuZ2V0RGVmYXVsdFZhbHVlKCkpO1xuXHRcdHRoaXMuaXRlbVZpZXcuc2V0VmFsdWUodGhpcy5pdGVtTW9kZWwuZ2V0VmFsdWUoKSk7XG5cdFx0dGhpcy5pdGVtVmlldy5zZXRJdGVtVHlwZSh0aGlzLml0ZW1Nb2RlbC5nZXRJdGVtVHlwZSgpKTtcblxuXHRcdHRoaXMuaXRlbU1vZGVsLm9uKFJlc291cmNlSXRlbU1vZGVsLklURU1fQ0hBTkdFLCB0aGlzLm9uSXRlbU1vZGVsQ2hhbmdlLCB0aGlzKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBtb2RlbCBjaGFuZ2VkLCB1cGRhdGUgdmlldy5cbiAqIEBtZXRob2Qgb25JdGVtTW9kZWxDaGFuZ2VcbiAqL1xuUmVzb3VyY2VJdGVtQ29udHJvbGxlci5wcm90b3R5cGUub25JdGVtTW9kZWxDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5pdGVtVmlldy5zZXRWYWx1ZSh0aGlzLml0ZW1Nb2RlbC5nZXRWYWx1ZSgpKTtcbn1cblxuLyoqXG4gKiBJdGVtIHZpZXcgY2hhbmdlLlxuICogQG1ldGhvZCBvbkl0ZW1WaWV3Q2hhbmdlXG4gKi9cblJlc291cmNlSXRlbUNvbnRyb2xsZXIucHJvdG90eXBlLm9uSXRlbVZpZXdDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0aWYgKCF0aGlzLml0ZW1Nb2RlbClcblx0XHRyZXR1cm47XG5cblx0dGhpcy5pdGVtTW9kZWwuc2V0VmFsdWUodGhpcy5pdGVtVmlldy5nZXRWYWx1ZSgpKTtcbn1cblxuLyoqXG4gKiBGaWxlIHNlbGVjdGVkLlxuICogQG1ldGhvZCBvbkl0ZW1WaWV3RmlsZVNlbGVjdFxuICovXG5SZXNvdXJjZUl0ZW1Db250cm9sbGVyLnByb3RvdHlwZS5vbkl0ZW1WaWV3RmlsZVNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLml0ZW1Nb2RlbC51cGxvYWRGaWxlKHRoaXMuaXRlbVZpZXcuZ2V0U2VsZWN0ZWRGaWxlKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlSXRlbUNvbnRyb2xsZXI7IiwidmFyIFJlc291cmNlQ2F0ZWdvcnlDb250cm9sbGVyID0gcmVxdWlyZShcIi4vUmVzb3VyY2VDYXRlZ29yeUNvbnRyb2xsZXJcIik7XG52YXIgUmVzb3VyY2VDYXRlZ29yeVZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvUmVzb3VyY2VDYXRlZ29yeVZpZXdcIik7XG52YXIgUmVzb3VyY2VJdGVtQ29udHJvbGxlciA9IHJlcXVpcmUoXCIuL1Jlc291cmNlSXRlbUNvbnRyb2xsZXJcIik7XG52YXIgUmVzb3VyY2VJdGVtVmlldyA9IHJlcXVpcmUoXCIuLi92aWV3cy9SZXNvdXJjZUl0ZW1WaWV3XCIpO1xudmFyIHhub2RlYyA9IHJlcXVpcmUoXCJ4bm9kZWNvbGxlY3Rpb25cIik7XG5cbi8qKlxuICogQ29udHJvbCBvbmUgcmVzb3VyY2UgdGFiLlxuICogQG1ldGhvZCBSZXNvdXJjZVRhYkNvbnRyb2xsZXJcbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VUYWJDb250cm9sbGVyKHRhYlZpZXcpIHtcblx0dGhpcy50YWJWaWV3ID0gdGFiVmlldztcblxuXHR0aGlzLmNhdGVnb3J5TWFuYWdlciA9IG5ldyB4bm9kZWMuQ29sbGVjdGlvblZpZXdNYW5hZ2VyKCk7XG5cdHRoaXMuY2F0ZWdvcnlNYW5hZ2VyLnNldFRhcmdldCh0aGlzLnRhYlZpZXcuZ2V0Q2F0ZWdvcnlIb2xkZXIoKSk7XG5cdHRoaXMuY2F0ZWdvcnlNYW5hZ2VyLnNldEl0ZW1SZW5kZXJlckNsYXNzKFJlc291cmNlQ2F0ZWdvcnlWaWV3KTtcblx0dGhpcy5jYXRlZ29yeU1hbmFnZXIuc2V0SXRlbUNvbnRyb2xsZXJDbGFzcyhSZXNvdXJjZUNhdGVnb3J5Q29udHJvbGxlcik7XG5cblx0dGhpcy5pdGVtTWFuYWdlciA9IG5ldyB4bm9kZWMuQ29sbGVjdGlvblZpZXdNYW5hZ2VyKCk7XG5cdHRoaXMuaXRlbU1hbmFnZXIuc2V0VGFyZ2V0KHRoaXMudGFiVmlldy5nZXRJdGVtSG9sZGVyKCkpO1xuXHR0aGlzLml0ZW1NYW5hZ2VyLnNldEl0ZW1SZW5kZXJlckNsYXNzKFJlc291cmNlSXRlbVZpZXcpO1xuXHR0aGlzLml0ZW1NYW5hZ2VyLnNldEl0ZW1Db250cm9sbGVyQ2xhc3MoUmVzb3VyY2VJdGVtQ29udHJvbGxlcik7XG59XG5cbi8qKlxuICogU2V0IGRhdGEuXG4gKiBAbWV0aG9kIHNldERhdGFcbiAqL1xuUmVzb3VyY2VUYWJDb250cm9sbGVyLnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24oY2F0ZWdvcnlNb2RlbCkge1xuXHRpZiAodGhpcy5jYXRlZ29yeU1vZGVsKSB7XG5cdFx0dGhpcy5jYXRlZ29yeU1vZGVsLm9mZihcImNoYW5nZVwiLCB0aGlzLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSwgdGhpcyk7XG5cdFx0dGhpcy5jYXRlZ29yeU1hbmFnZXIuc2V0RGF0YVNvdXJjZShudWxsKTtcblx0XHR0aGlzLml0ZW1NYW5hZ2VyLnNldERhdGFTb3VyY2UobnVsbCk7XG5cdH1cblxuXHR0aGlzLmNhdGVnb3J5TW9kZWwgPSBjYXRlZ29yeU1vZGVsO1xuXG5cdGlmICh0aGlzLmNhdGVnb3J5TW9kZWwpIHtcblx0XHR0aGlzLmNhdGVnb3J5TW9kZWwub24oXCJjaGFuZ2VcIiwgdGhpcy5vbkNhdGVnb3J5TW9kZWxDaGFuZ2UsIHRoaXMpO1xuXHRcdHRoaXMudGFiVmlldy5zZXRBY3RpdmUoY2F0ZWdvcnlNb2RlbC5pc0FjdGl2ZSgpKTtcblx0XHR0aGlzLnRhYlZpZXcuc2V0RGVzY3JpcHRpb24oY2F0ZWdvcnlNb2RlbC5nZXREZXNjcmlwdGlvbigpKTtcblxuXHRcdHRoaXMuY2F0ZWdvcnlNYW5hZ2VyLnNldERhdGFTb3VyY2UoY2F0ZWdvcnlNb2RlbC5nZXRDYXRlZ29yeUNvbGxlY3Rpb24oKSk7XG5cdFx0dGhpcy5pdGVtTWFuYWdlci5zZXREYXRhU291cmNlKGNhdGVnb3J5TW9kZWwuZ2V0SXRlbUNvbGxlY3Rpb24oKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgY2hhbmdlIGluIHRoZSBtb2RlbC5cbiAqIEBtZXRob2Qgb25DYXRlZ29yeU1vZGVsQ2hhbmdlXG4gKi9cblJlc291cmNlVGFiQ29udHJvbGxlci5wcm90b3R5cGUub25DYXRlZ29yeU1vZGVsQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudGFiVmlldy5zZXRBY3RpdmUodGhpcy5jYXRlZ29yeU1vZGVsLmlzQWN0aXZlKCkpO1xuXHR0aGlzLnRhYlZpZXcuc2V0RGVzY3JpcHRpb24odGhpcy5jYXRlZ29yeU1vZGVsLmdldERlc2NyaXB0aW9uKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlVGFiQ29udHJvbGxlcjsiLCIvKipcbiAqIENvbnRyb2wgdGhlIGhlYWRlciBmaWVsZCBvZiB0aGUgdGFibHMgaW4gdGhlIHJlc291cmNlIHBhbmUuXG4gKiBAbWV0aG9kIFJlc291cmNlVGFiQ29udHJvbGxlclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZVRhYkhlYWRlckNvbnRyb2xsZXIodGFiSGVhZGVyVmlldykge1xuXHR0aGlzLnRhYkhlYWRlclZpZXcgPSB0YWJIZWFkZXJWaWV3O1xuXHR0aGlzLnRhYkhlYWRlclZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25UYWJIZWFkZXJWaWV3Q2xpY2suYmluZCh0aGlzKSk7XG59XG5cbi8qKlxuICogU2V0IGRhdGEuXG4gKiBAbWV0aG9kIHNldERhdGFcbiAqL1xuUmVzb3VyY2VUYWJIZWFkZXJDb250cm9sbGVyLnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24oY2F0ZWdvcnlNb2RlbCkge1xuXHRpZiAodGhpcy5jYXRlZ29yeU1vZGVsKSB7XG5cdFx0dGhpcy5jYXRlZ29yeU1vZGVsLm9mZihcImNoYW5nZVwiLCB0aGlzLm9uQ2F0ZWdvcnlNb2RlbENoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLmNhdGVnb3J5TW9kZWwgPSBjYXRlZ29yeU1vZGVsO1xuXG5cdGlmICh0aGlzLmNhdGVnb3J5TW9kZWwpIHtcblx0XHR0aGlzLmNhdGVnb3J5TW9kZWwub24oXCJjaGFuZ2VcIiwgdGhpcy5vbkNhdGVnb3J5TW9kZWxDaGFuZ2UsIHRoaXMpO1xuXHRcdHRoaXMudGFiSGVhZGVyVmlldy5zZXRMYWJlbChjYXRlZ29yeU1vZGVsLmdldExhYmVsKCkpO1xuXHRcdHRoaXMudGFiSGVhZGVyVmlldy5zZXRBY3RpdmUoY2F0ZWdvcnlNb2RlbC5pc0FjdGl2ZSgpKTtcblx0fVxufVxuXG4vKipcbiAqIFRoZSB0YWIgd2FzIGNsaWNrZWQsIHNldCB0aGlzIHRhYiBhcyB0aGUgYWN0aXZlIG9uZS5cbiAqIEBtZXRob2Qgb25UYWJIZWFkZXJWaWV3Q2xpY2tcbiAqL1xuUmVzb3VyY2VUYWJIZWFkZXJDb250cm9sbGVyLnByb3RvdHlwZS5vblRhYkhlYWRlclZpZXdDbGljayA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNhdGVnb3J5TW9kZWwuc2V0QWN0aXZlKHRydWUpO1xufVxuXG4vKipcbiAqIFRoZSBtb2RlbCBjaGFuZ2VkLlxuICogQG1ldGhvZCBvbkNhdGVnb3J5TW9kZWxDaGFuZ2VcbiAqL1xuUmVzb3VyY2VUYWJIZWFkZXJDb250cm9sbGVyLnByb3RvdHlwZS5vbkNhdGVnb3J5TW9kZWxDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50YWJIZWFkZXJWaWV3LnNldEFjdGl2ZSh0aGlzLmNhdGVnb3J5TW9kZWwuaXNBY3RpdmUoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VUYWJIZWFkZXJDb250cm9sbGVyOyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4vRWRpdG9yXCIpO1xudmFyIFN0cmluZ0l0ZW0gPSByZXF1aXJlKFwiLi4vdmlld3MvU3RyaW5nSXRlbVwiKTtcblxuZnVuY3Rpb24gU3RyaW5nc0VkaXRvcihiYXNlUGF0aCwgc2Vzc2lvbiwgdmlldykge1xuXHRFZGl0b3IuY2FsbCh0aGlzLCBiYXNlUGF0aCwgc2Vzc2lvbiwgdmlldyk7XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKFN0cmluZ3NFZGl0b3IsIEVkaXRvcik7XG5cblN0cmluZ3NFZGl0b3IucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbihyZXNvdXJjZXMpIHtcblx0RWRpdG9yLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XG5cdHRoaXMucmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuXG5cdHZhciBzdHJpbmdzID0gdGhpcy5yZXNvdXJjZXMuZ2V0UmVzb3VyY2VPYmplY3QoKS5zdHJpbmdzO1xuXG5cdGZvcih2YXIga2V5IGluIHN0cmluZ3MpIHtcblx0XHR2YXIgaXRlbSA9IG5ldyBTdHJpbmdJdGVtKGtleSwgc3RyaW5nc1trZXldKTtcblx0XHR0aGlzLnZpZXcuYWRkSXRlbShpdGVtKTtcblx0XHRpdGVtLm9uKFN0cmluZ0l0ZW0uQ2hhbmdlZCwgdGhpcy5vbkNoYW5nZWQsIHRoaXMpO1xuXHR9XG59O1xuXG5TdHJpbmdzRWRpdG9yLnByb3RvdHlwZS5vbkNoYW5nZWQgPSBmdW5jdGlvbihpdGVtKSB7XG5cdHRoaXMucmVzb3VyY2VzLnN0cmluZ3NbaXRlbS5pZF0gPSBpdGVtLmdldFZhbHVlKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZ3NFZGl0b3I7IiwidmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgTWVudSA9IHJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9NZW51XCIpO1xudmFyIE1lbnVJdGVtID0gcmVxdWlyZShcIi4uL3ZpZXdzL01lbnVJdGVtXCIpO1xudmFyIE1lbnVWaWV3ID0gcmVxdWlyZShcIi4uL3ZpZXdzL01lbnVWaWV3XCIpO1xudmFyIElGcmFtZVZpZXcgPSByZXF1aXJlKFwiLi4vdmlld3MvSUZyYW1lVmlld1wiKTtcbnZhciBUZXN0Y2FzZSA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvVGVzdGNhc2VcIik7XG5cbmZ1bmN0aW9uIFRhcmdldENvbnRyb2xsZXIodmlldykge1xuXHR0aGlzLnZpZXcgPSB2aWV3O1xuXG5cdHRoaXMubWVudVZpZXcgPSBuZXcgTWVudVZpZXcoKTtcblx0dGhpcy52aWV3LnNldE1lbnVWaWV3KHRoaXMubWVudVZpZXcpO1xuXG5cdHZhciBpdGVtcyA9IFtdO1xuXHR0aGlzLnRlc3RjYXNlcyA9IG5ldyBBcnJheSgpO1xuXG5cdHRoaXMubWVudVZpZXcuc2V0SXRlbXMoaXRlbXMpO1xuXG5cdHRoaXMubWVudSA9IG5ldyBNZW51KHRoaXMubWVudVZpZXcsIGl0ZW1zKTtcblx0dGhpcy5tZW51Lm9uKE1lbnUuSXRlbUNsaWNrZWQsIHRoaXMub25DaGFuZ2VWaWV3LCB0aGlzKTtcblxuXHR0aGlzLmlmcmFtZVZpZXcgPSBuZXcgSUZyYW1lVmlldygpO1xuXHR0aGlzLnZpZXcuc2V0VGFyZ2V0Vmlldyh0aGlzLmlmcmFtZVZpZXcpO1xuXHR0aGlzLmlmcmFtZVZpZXcueSA9IHRoaXMubWVudVZpZXcuaGVpZ2h0O1xuXHR0aGlzLmlmcmFtZVZpZXcud2lkdGggPSA1MDA7XG5cdHRoaXMuaWZyYW1lVmlldy5oZWlnaHQgPSA1MDA7XG59O1xuVGFyZ2V0Q29udHJvbGxlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUYXJnZXRDb250cm9sbGVyO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoVGFyZ2V0Q29udHJvbGxlcik7XG5cblxuVGFyZ2V0Q29udHJvbGxlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXHRcblx0dGhpcy5pZnJhbWVWaWV3LmluaXQoKTtcbn07XG5cblxuVGFyZ2V0Q29udHJvbGxlci5wcm90b3R5cGUuYWRkVGVzdGNhc2UgPSBmdW5jdGlvbihpZCwgbmFtZSwgdXJsKSB7XG5cdHRoaXMudGVzdGNhc2VzLnB1c2gobmV3IFRlc3RjYXNlKGlkLCBuYW1lLCB1cmwpKTtcblx0dGhpcy5tZW51LmFkZEl0ZW0obmV3IE1lbnVJdGVtKGlkLCBuYW1lKSk7XG59O1xuXG5cblRhcmdldENvbnRyb2xsZXIucHJvdG90eXBlLnJlbG9hZCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmlmcmFtZVZpZXcucmVsb2FkKCk7XG59O1xuXG5cblRhcmdldENvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2hhbmdlVmlldyA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMudGVzdGNhc2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYodGhpcy50ZXN0Y2FzZXNbaV0uaWQgPT0gaXRlbS5pZCkge1xuXHRcdFx0dGhpcy50YXJnZXRVUkwgPSB0aGlzLnRlc3RjYXNlc1tpXS51cmw7XG5cdFx0XHR0aGlzLmlmcmFtZVZpZXcuc2V0VXJsKHRoaXMudGFyZ2V0VVJMKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0Q29udHJvbGxlcjsiLCIvKipcbiAqIENvbnRyb2wgdGhlIGhlYWRlciBmaWVsZCBvZiB0aGUgdGFibHMgaW4gdGhlIHJlc291cmNlIHBhbmUuXG4gKiBAbWV0aG9kIFJlc291cmNlVGFiQ29udHJvbGxlclxuICovXG5mdW5jdGlvbiBUYXJnZXRUYWJIZWFkZXJDb250cm9sbGVyKHRhYkhlYWRlclZpZXcpIHtcblx0dGhpcy50YWJIZWFkZXJWaWV3ID0gdGFiSGVhZGVyVmlldztcblx0dGhpcy50YWJIZWFkZXJWaWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uVGFiSGVhZGVyVmlld0NsaWNrLmJpbmQodGhpcykpO1xufVxuXG4vKipcbiAqIFNldCBkYXRhLlxuICogQG1ldGhvZCBzZXREYXRhXG4gKi9cblRhcmdldFRhYkhlYWRlckNvbnRyb2xsZXIucHJvdG90eXBlLnNldERhdGEgPSBmdW5jdGlvbih0ZXN0Y2FzZSkge1xuXHRpZiAodGhpcy50ZXN0Y2FzZSkge1xuXHRcdHRoaXMudGVzdGNhc2Uub2ZmKFwiY2hhbmdlXCIsIHRoaXMub25UZXN0Y2FzZUNoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLnRlc3RjYXNlID0gdGVzdGNhc2U7XG5cblx0aWYgKHRoaXMudGVzdGNhc2UpIHtcblx0XHR0aGlzLnRlc3RjYXNlLm9uKFwiY2hhbmdlXCIsIHRoaXMub25UZXN0Y2FzZUNoYW5nZSwgdGhpcyk7XG5cdFx0dGhpcy50YWJIZWFkZXJWaWV3LnNldExhYmVsKHRlc3RjYXNlLmdldExhYmVsKCkpO1xuXHRcdHRoaXMudGFiSGVhZGVyVmlldy5zZXRBY3RpdmUodGVzdGNhc2UuaXNBY3RpdmUoKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBUaGUgdGFiIHdhcyBjbGlja2VkLCBzZXQgdGhpcyB0YWIgYXMgdGhlIGFjdGl2ZSBvbmUuXG4gKiBAbWV0aG9kIG9uVGFiSGVhZGVyVmlld0NsaWNrXG4gKi9cblRhcmdldFRhYkhlYWRlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVGFiSGVhZGVyVmlld0NsaWNrID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudGVzdGNhc2Uuc2V0QWN0aXZlKHRydWUpO1xufVxuXG4vKipcbiAqIFRoZSBtb2RlbCBjaGFuZ2VkLlxuICogQG1ldGhvZCBvblRlc3RjYXNlQ2hhbmdlXG4gKi9cblRhcmdldFRhYkhlYWRlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVGVzdGNhc2VDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50YWJIZWFkZXJWaWV3LnNldEFjdGl2ZSh0aGlzLnRlc3RjYXNlLmlzQWN0aXZlKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRhcmdldFRhYkhlYWRlckNvbnRyb2xsZXI7IiwiRmlkZGxlQ2xpZW50ID0gcmVxdWlyZShcIi4vYXBwL0ZpZGRsZUNsaWVudFwiKTtcblJlc291cmNlcyA9IHJlcXVpcmUoXCIuLi8uLi9saWIvUmVzb3VyY2VzXCIpOyIsInZhciBGaWRkbGVDbGllbnRNb2RlbCA9IHJlcXVpcmUoXCIuL0ZpZGRsZUNsaWVudE1vZGVsXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCJ5YWVkXCIpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIHhub2RlYyA9IHJlcXVpcmUoXCJ4bm9kZWNvbGxlY3Rpb25cIik7XG52YXIgUmVzb3VyY2VJdGVtTW9kZWwgPSByZXF1aXJlKFwiLi9SZXNvdXJjZUl0ZW1Nb2RlbFwiKTtcbnZhciBJbWFnZUl0ZW1Nb2RlbCA9IHJlcXVpcmUoXCIuL0ltYWdlSXRlbU1vZGVsXCIpO1xudmFyIFBvc2l0aW9uSXRlbU1vZGVsID0gcmVxdWlyZShcIi4vUG9zaXRpb25JdGVtTW9kZWxcIik7XG52YXIgQ29sb3JJdGVtTW9kZWwgPSByZXF1aXJlKFwiLi9Db2xvckl0ZW1Nb2RlbFwiKTtcblxuLyoqXG4gKiBHZXQgY2F0ZWdvcnkgbW9kZWwuXG4gKiBAY2xhc3MgQ2F0ZWdvcnlNb2RlbFxuICovXG5mdW5jdGlvbiBDYXRlZ29yeU1vZGVsKGxhYmVsKSB7XG5cdHRoaXMubGFiZWwgPSBsYWJlbDtcblx0dGhpcy5wYXJlbnRNb2RlbCA9IG51bGw7XG5cdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdHRoaXMuY2F0ZWdvcnlDb2xsZWN0aW9uID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uKCk7XG5cdHRoaXMuaXRlbUNvbGxlY3Rpb24gPSBuZXcgeG5vZGVjLkNvbGxlY3Rpb24oKTtcblx0dGhpcy5kZXNjcmlwdGlvbiA9IFwiXCI7XG59XG5cbmluaGVyaXRzKENhdGVnb3J5TW9kZWwsIEV2ZW50RGlzcGF0Y2hlcik7XG5DYXRlZ29yeU1vZGVsLklURU1fQ0hBTkdFID0gXCJpdGVtQ2hhbmdlXCI7XG5cbi8qKlxuICogU2V0IHJlZmVyZW5jZSB0byBwYXJlbnQgbW9kZWwuXG4gKiBAbWV0aG9kIGdldFBhcmVudE1vZGVsXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLnNldFBhcmVudE1vZGVsID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5wYXJlbnRNb2RlbCA9IHZhbHVlO1xufVxuXG4vKipcbiAqIEdldCBsYWJlbC5cbiAqIEBtZXRob2QgZ2V0TGFiZWxcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuZ2V0TGFiZWwgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMubGFiZWw7XG59XG5cbi8qKlxuICogR2V0IGRlc2NyaXB0aW9uLlxuICogQG1ldGhvZCBnZXRMYWJlbFxuICovXG5DYXRlZ29yeU1vZGVsLnByb3RvdHlwZS5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjtcbn1cblxuLyoqXG4gKiBTZXQgZGVzY3JpcHRpb24uXG4gKiBAbWV0aG9kIGdldExhYmVsXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLnNldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcblx0dGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuXG5cdHRoaXMudHJpZ2dlcihcImNoYW5nZVwiKTtcbn1cblxuLyoqXG4gKiBHZXQgcmVmZXJlbmNlIHRvIGFwcCBtb2RlbC5cbiAqIEBtZXRob2QgZ2V0QXBwTW9kZWxcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuZ2V0QXBwTW9kZWwgPSBmdW5jdGlvbigpIHtcblx0aWYgKCF0aGlzLnBhcmVudE1vZGVsKVxuXHRcdHRocm93IG5ldyBFcnJvcihcInRoZXJlIGlzIG5vIHBhcmVudCFcIik7XG5cblx0dmFyIHAgPSB0aGlzLnBhcmVudE1vZGVsO1xuXG5cdHdoaWxlIChwICYmICEocCBpbnN0YW5jZW9mIEZpZGRsZUNsaWVudE1vZGVsKSlcblx0XHRwID0gcC5wYXJlbnRNb2RlbDtcblxuXHRyZXR1cm4gcDtcbn1cblxuLyoqXG4gKiBTZXQgYWN0aXZlIHN0YXRlLlxuICogQG1ldGhvZCBzZXRBY3RpdmVcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlID09IHRoaXMuYWN0aXZlKVxuXHRcdHJldHVybjtcblxuXHR2YXIgc2libGluZ3MgPSB0aGlzLnBhcmVudE1vZGVsLmdldENhdGVnb3J5Q29sbGVjdGlvbigpO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc2libGluZ3MuZ2V0TGVuZ3RoKCk7IGkrKylcblx0XHRpZiAoc2libGluZ3MuZ2V0SXRlbUF0KGkpICE9IHRoaXMpXG5cdFx0XHRzaWJsaW5ncy5nZXRJdGVtQXQoaSkuc2V0QWN0aXZlKGZhbHNlKTtcblxuXHR0aGlzLmFjdGl2ZSA9IHZhbHVlO1xuXHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG59XG5cbi8qKlxuICogSXMgdGhpcyBjYXRlZ29yeSB0aGUgYWN0aXZlIG9uZT9cbiAqIEBtZXRob2QgaXNBY3RpdmVcbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuYWN0aXZlO1xufVxuXG4vKipcbiAqIEdldCBjYXRlZ29yeSBjb2xsZWN0aW9uIGZvciBzdWIgY2F0ZWdvcmllcy5cbiAqIEBtZXRob2QgZ2V0Q2F0ZWdvcnlDb2xsZWN0aW9uXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLmdldENhdGVnb3J5Q29sbGVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5jYXRlZ29yeUNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogR2V0IGl0ZW0gY29sbGVjdGlvbi5cbiAqIEBtZXRob2QgZ2V0SXRlbUNvbGxlY3Rpb25cbiAqL1xuQ2F0ZWdvcnlNb2RlbC5wcm90b3R5cGUuZ2V0SXRlbUNvbGxlY3Rpb24gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaXRlbUNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogQWRkIHN1YiBjYXRlZ29yeSBtb2RlbC5cbiAqIEBtZXRob2QgYWRkQ2F0ZWdvcnlNb2RlbFxuICovXG5DYXRlZ29yeU1vZGVsLnByb3RvdHlwZS5hZGRDYXRlZ29yeU1vZGVsID0gZnVuY3Rpb24oY2F0ZWdvcnlNb2RlbCkge1xuXHRjYXRlZ29yeU1vZGVsLnNldFBhcmVudE1vZGVsKHRoaXMpO1xuXHR0aGlzLmNhdGVnb3J5Q29sbGVjdGlvbi5hZGRJdGVtKGNhdGVnb3J5TW9kZWwpO1xuXG5cdGNhdGVnb3J5TW9kZWwub24oUmVzb3VyY2VJdGVtTW9kZWwuSVRFTV9DSEFOR0UsIHRoaXMub25TdWJJdGVtQ2hhbmdlLCB0aGlzKTtcblxuXHRyZXR1cm4gY2F0ZWdvcnlNb2RlbDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIGFkZCBhIGNhdGVnb3J5IG1vZGVsLlxuICogQG1ldGhvZCBjcmVhdGVDYXRlZ29yeVxuICovXG5DYXRlZ29yeU1vZGVsLnByb3RvdHlwZS5jcmVhdGVDYXRlZ29yeSA9IGZ1bmN0aW9uKHRpdGxlKSB7XG5cdHZhciBjYXRlZ29yeU1vZGVsID0gbmV3IENhdGVnb3J5TW9kZWwodGl0bGUpO1xuXG5cdHJldHVybiB0aGlzLmFkZENhdGVnb3J5TW9kZWwoY2F0ZWdvcnlNb2RlbCk7XG59XG5cbi8qKlxuICogQWRkIHJlc291cmNlIGl0ZW0gbW9kZWwuXG4gKiBAbWV0aG9kIGFkZFJlc291cmNlSXRlbU1vZGVsXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLmFkZFJlc291cmNlSXRlbU1vZGVsID0gZnVuY3Rpb24ocmVzb3VyY2VJdGVtTW9kZWwpIHtcblx0dGhpcy5pdGVtQ29sbGVjdGlvbi5hZGRJdGVtKHJlc291cmNlSXRlbU1vZGVsKTtcblx0cmVzb3VyY2VJdGVtTW9kZWwub24oUmVzb3VyY2VJdGVtTW9kZWwuSVRFTV9DSEFOR0UsIHRoaXMub25TdWJJdGVtQ2hhbmdlLCB0aGlzKTtcbn1cblxuLyoqXG4gKiBPbiBzdWIgaXRlbSBjaGFuZ2UuXG4gKiBAbWV0aG9kIG9uU3ViSXRlbUNoYW5nZVxuICovXG5DYXRlZ29yeU1vZGVsLnByb3RvdHlwZS5vblN1Ykl0ZW1DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50cmlnZ2VyKENhdGVnb3J5TW9kZWwuSVRFTV9DSEFOR0UpO1xufVxuXG4vKipcbiAqIEdldCBhbGwgaXRlbXMgaW4gYWxsIGNhdGVnb3JpZXMuXG4gKiBAbWV0aG9kIGdldEFsbEl0ZW1zXG4gKi9cbkNhdGVnb3J5TW9kZWwucHJvdG90eXBlLmdldEFsbEl0ZW1zID0gZnVuY3Rpb24oKSB7XG5cdHZhciBhID0gW107XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNhdGVnb3J5Q29sbGVjdGlvbi5nZXRMZW5ndGgoKTsgaSsrKVxuXHRcdGEgPSBhLmNvbmNhdCh0aGlzLmNhdGVnb3J5Q29sbGVjdGlvbi5nZXRJdGVtQXQoaSkuZ2V0QWxsSXRlbXMoKSk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1Db2xsZWN0aW9uLmdldExlbmd0aCgpOyBpKyspXG5cdFx0YS5wdXNoKHRoaXMuaXRlbUNvbGxlY3Rpb24uZ2V0SXRlbUF0KGkpKTtcblxuXHRyZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBJbml0IGRlZmluaXRpb25zLlxuICogQG1ldGhvZCBpbml0RGVmaW5pdGlvblxuICovXG5DYXRlZ29yeU1vZGVsLnByb3RvdHlwZS5pbml0RGVmaW5pdGlvbiA9IGZ1bmN0aW9uKGRlZmluaXRpb25EYXRhKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmaW5pdGlvbkRhdGEuaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbURlZiA9IGRlZmluaXRpb25EYXRhLml0ZW1zW2ldO1xuXHRcdHZhciBpdGVtO1xuXG5cdFx0c3dpdGNoIChpdGVtRGVmLnR5cGUpIHtcblx0XHRcdGNhc2UgXCJncmFwaGljc1wiOlxuXHRcdFx0XHRpdGVtID0gbmV3IEltYWdlSXRlbU1vZGVsKGl0ZW1EZWYubmFtZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFwicG9zaXRpb25cIjpcblx0XHRcdFx0aXRlbSA9IG5ldyBQb3NpdGlvbkl0ZW1Nb2RlbChpdGVtRGVmLm5hbWUpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSBcImNvbG9yXCI6XG5cdFx0XHRcdGl0ZW0gPSBuZXcgQ29sb3JJdGVtTW9kZWwoaXRlbURlZi5uYW1lKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcInVua25vd24gcmVzb3VyY2UgdHlwZTogXCIgKyBpdGVtRGVmLnR5cGUpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRpdGVtLnBhcnNlRGVmYXVsdERhdGEoaXRlbURlZi52YWx1ZSk7XG5cdFx0dGhpcy5hZGRSZXNvdXJjZUl0ZW1Nb2RlbChpdGVtKTtcblx0fVxuXG5cdGlmIChkZWZpbml0aW9uRGF0YS5jYXRlZ29yaWVzKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZpbml0aW9uRGF0YS5jYXRlZ29yaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2F0ZWdvcnlEZWZpbml0aW9uID0gZGVmaW5pdGlvbkRhdGEuY2F0ZWdvcmllc1tpXTtcblx0XHRcdHZhciBjYXRlZ29yeSA9IHRoaXMuY3JlYXRlQ2F0ZWdvcnkoY2F0ZWdvcnlEZWZpbml0aW9uLnRpdGxlKTtcblx0XHRcdGNhdGVnb3J5LmluaXREZWZpbml0aW9uKGNhdGVnb3J5RGVmaW5pdGlvbik7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2F0ZWdvcnlNb2RlbDsiLCJ2YXIgUmVzb3VyY2VJdGVtTW9kZWwgPSByZXF1aXJlKFwiLi9SZXNvdXJjZUl0ZW1Nb2RlbFwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciBDb2xvclV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ29sb3JVdGlsXCIpO1xuXG4vKipcbiAqIENvbG9ySXRlbU1vZGVsXG4gKiBAY2xhc3MgQ29sb3JJdGVtTW9kZWxcbiAqL1xuZnVuY3Rpb24gQ29sb3JJdGVtTW9kZWwoa2V5LCBkZWZhdWx0VmFsdWUsIHZhbHVlKSB7XG5cdFJlc291cmNlSXRlbU1vZGVsLmNhbGwodGhpcywga2V5KTtcblxuXHR0aGlzLnNldERlZmF1bHRWYWx1ZShudWxsKTtcblx0dGhpcy5zZXRWYWx1ZShudWxsKTtcbn1cblxuaW5oZXJpdHMoQ29sb3JJdGVtTW9kZWwsIFJlc291cmNlSXRlbU1vZGVsKTtcblxuLyoqXG4gKiBHZXQgZGVmYXVsdCB2YWx1ZS5cbiAqIEBtZXRob2QgZ2V0RGVmYXVsdFZhbHVlXG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb3RvdHlwZS5nZXREZWZhdWx0VmFsdWUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIFNldCBkZWZhdWx0IHZhbHVlLlxuICogQG1ldGhvZCBnZXREZWZhdWx0VmFsdWVcbiAqL1xuQ29sb3JJdGVtTW9kZWwucHJvdG90eXBlLnNldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGRlZmF1bHRWYWx1ZSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZSA9IENvbG9ySXRlbU1vZGVsLnByb2Nlc3NWYWx1ZShkZWZhdWx0VmFsdWUpO1xufVxuXG4vKipcbiAqIEdldCBjdXN0b21pemVkIHZhbHVlLlxuICogQG1ldGhvZCBnZXRWYWx1ZVxuICovXG5Db2xvckl0ZW1Nb2RlbC5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMudmFsdWU7XG59XG5cbi8qKlxuICogU2V0IHZhbHVlLlxuICogQG1ldGhvZCBzZXRWYWx1ZVxuICovXG5Db2xvckl0ZW1Nb2RlbC5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR0aGlzLnZhbHVlID0gQ29sb3JJdGVtTW9kZWwucHJvY2Vzc1ZhbHVlKHZhbHVlKTtcblx0dGhpcy5ub3RpZnlDaGFuZ2UoKTtcbn1cblxuLyoqXG4gKiBHZXQgaXRlbSB0eXBlLlxuICogQG1ldGhvZCBnZXRJdGVtVHlwZVxuICovXG5Db2xvckl0ZW1Nb2RlbC5wcm90b3R5cGUuZ2V0SXRlbVR5cGUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIFwiY29sb3JcIlxufVxuXG4vKipcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb2Nlc3NWYWx1ZSA9IGZ1bmN0aW9uKHYpIHtcblx0aWYgKCF2KVxuXHRcdHJldHVybiBudWxsO1xuXG5cdGlmICh0eXBlb2YgdiA9PSBcIm51bWJlclwiKVxuXHRcdHJldHVybiBDb2xvclV0aWwuaGV4VG9IVE1MKHYpO1xuXG5cdHJldHVybiB2O1xufVxuXG4vKipcbiAqIFBhcnNlIGRlZmF1bHQgZGF0YS5cbiAqL1xuQ29sb3JJdGVtTW9kZWwucHJvdG90eXBlLnBhcnNlRGVmYXVsdERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gQ29sb3JVdGlsLmhleFRvSFRNTChkYXRhKTtcbn1cblxuLyoqXG4gKiBQYXJzZSBkZWZhdWx0IGRhdGEuXG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb3RvdHlwZS5wYXJzZURhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG5cdHRoaXMudmFsdWUgPSBDb2xvclV0aWwuaGV4VG9IVE1MKGRhdGEpO1xuXG5cdGlmICh0aGlzLnZhbHVlID09IHRoaXMuZGVmYXVsdFZhbHVlKVxuXHRcdHRoaXMudmFsdWUgPSBudWxsO1xufVxuXG4vKipcbiAqIFByZXBhcmUgZGF0YSB0byBiZSBzYXZlZC5cbiAqIEBtZXRob2QgcHJlcGFyZVNhdmVEYXRhXG4gKi9cbkNvbG9ySXRlbU1vZGVsLnByb3RvdHlwZS5wcmVwYXJlU2F2ZURhdGEgPSBmdW5jdGlvbihqc29uRGF0YSkge1xuXHR2YXIgc2F2ZURhdGEgPSAwO1xuXG5cdGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWVbMF0gPT0gXCIjXCIpXG5cdFx0c2F2ZURhdGEgPSBDb2xvclV0aWwuaHRtbFRvSGV4KHRoaXMudmFsdWUpXG5cblx0ZWxzZSBpZiAodGhpcy5kZWZhdWx0VmFsdWUgJiYgdGhpcy5kZWZhdWx0VmFsdWVbMF0gPT0gXCIjXCIpXG5cdFx0c2F2ZURhdGEgPSBDb2xvclV0aWwuaHRtbFRvSGV4KHRoaXMuZGVmYXVsdFZhbHVlKVxuXG5cdGpzb25EYXRhLmNvbG9yc1t0aGlzLmtleV0gPSBzYXZlRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvckl0ZW1Nb2RlbDsiLCJ2YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcbnZhciBUZXN0Y2FzZSA9IHJlcXVpcmUoXCIuL1Rlc3RjYXNlXCIpO1xudmFyIENhdGVnb3J5TW9kZWwgPSByZXF1aXJlKFwiLi9DYXRlZ29yeU1vZGVsXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCJ5YWVkXCIpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xuLy92YXIgcmVxdWVzdCA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpO1xudmFyIEh0dHBSZXF1ZXN0ID0gcmVxdWlyZShcIi4uL3V0aWxzL0h0dHBSZXF1ZXN0XCIpO1xuXG4vKipcbiAqIE1haW4gbW9kZWwgZm9yIHRoZSBhcHAuXG4gKiBAY2xhc3MgRmlkZGxlQ2xpZW50TW9kZWxcbiAqL1xuZnVuY3Rpb24gRmlkZGxlQ2xpZW50TW9kZWwoKSB7XG5cdHRoaXMuc2Vzc2lvbiA9IG51bGw7XG5cdHRoaXMudGVzdGNhc2VDb2xsZWN0aW9uID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uKCk7XG5cdHRoaXMuY2F0ZWdvcnlDb2xsZWN0aW9uID0gbmV3IHhub2RlYy5Db2xsZWN0aW9uKCk7XG5cblx0dGhpcy5zYXZlUmVxdWVzdCA9IG51bGw7XG59XG5cbmluaGVyaXRzKEZpZGRsZUNsaWVudE1vZGVsLCBFdmVudERpc3BhdGNoZXIpO1xuXG5GaWRkbGVDbGllbnRNb2RlbC5BQ1RJVkVfVEVTVENBU0VfQ0hBTkdFID0gXCJhY3RpdmVUZXN0Y2FzZUNoYW5nZVwiO1xuRmlkZGxlQ2xpZW50TW9kZWwuSVRFTV9DSEFOR0UgPSBcIml0ZW1DaGFuZ2VcIjtcbkZpZGRsZUNsaWVudE1vZGVsLlNBVkVfQ09NUExFVEUgPSBcInNhdmVDb21wbGV0ZVwiO1xuXG4vKipcbiAqIFNldCBzZXNzaW9uLlxuICogQG1ldGhvZCBzZXRTZXNzaW9uXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5zZXRTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuXHR0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xufVxuXG4vKipcbiAqIFNldHVwIHJlc291cmNlcy5cbiAqL1xuRmlkZGxlQ2xpZW50TW9kZWwucHJvdG90eXBlLmluaXREZWZpbml0aW9uID0gZnVuY3Rpb24oZGVmaW5pdGlvbkRhdGEpIHtcblx0Y29uc29sZS5sb2coXCJpbml0IHdpdGggZGVmLi4uXCIpO1xuXG5cdGlmIChkZWZpbml0aW9uRGF0YS5pdGVtcy5sZW5ndGgpIHtcblx0XHR2YXIgY2F0ZWdvcnkgPSB0aGlzLmNyZWF0ZUNhdGVnb3J5KFwiKFVuY2F0ZWdvcml6ZWQpXCIpO1xuXG5cdFx0dmFyIGl0ZW1zRGVmaW5pdGlvbiA9IHtcblx0XHRcdGl0ZW1zOiBkZWZpbml0aW9uRGF0YS5pdGVtc1xuXHRcdH07XG5cblx0XHRjYXRlZ29yeS5pbml0RGVmaW5pdGlvbihpdGVtc0RlZmluaXRpb24pO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZpbml0aW9uRGF0YS5jYXRlZ29yaWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNhdGVnb3J5RGVmaW5pdGlvbiA9IGRlZmluaXRpb25EYXRhLmNhdGVnb3JpZXNbaV07XG5cdFx0dmFyIGNhdGVnb3J5PXRoaXMuY3JlYXRlQ2F0ZWdvcnkoY2F0ZWdvcnlEZWZpbml0aW9uLnRpdGxlKTtcblx0XHRjYXRlZ29yeS5pbml0RGVmaW5pdGlvbihjYXRlZ29yeURlZmluaXRpb24pO1xuXHR9XG5cblx0Y29uc29sZS5sb2coXCJpbml0IGRvbmUsIGNhdGxlbj1cIiArIHRoaXMuY2F0ZWdvcnlDb2xsZWN0aW9uLmdldExlbmd0aCgpKTtcbn1cblxuLyoqXG4gKiBJbml0IGZyb20gYSByZXNvdXJjZXMgb2JqZWN0LlxuICogQG1ldGhvZCBpbml0V2l0aFJlc291cmNlc1xuICovXG5GaWRkbGVDbGllbnRNb2RlbC5wcm90b3R5cGUuaW5pdFJlc291cmNlcyA9IGZ1bmN0aW9uKHJlc291cmNlcykge1xuXHR2YXIgcmVzb3VyY2VPYmplY3QgPSByZXNvdXJjZXMuZ2V0UmVzb3VyY2VPYmplY3QoKTtcblx0dmFyIGFsbEJ5S2V5ID0gdGhpcy5nZXRBbGxJdGVtc0J5S2V5KCk7XG5cblx0Zm9yICh2YXIga2V5IGluIHJlc291cmNlT2JqZWN0LnBvc2l0aW9ucykge1xuXHRcdHZhciBpdGVtID0gYWxsQnlLZXlba2V5XTtcblxuXHRcdGlmIChpdGVtKVxuXHRcdFx0aXRlbS5wYXJzZURhdGEocmVzb3VyY2VPYmplY3QucG9zaXRpb25zW2tleV0pO1xuXHR9XG5cblx0Zm9yICh2YXIga2V5IGluIHJlc291cmNlT2JqZWN0LmNvbG9ycykge1xuXHRcdHZhciBpdGVtID0gYWxsQnlLZXlba2V5XTtcblxuXHRcdGlmIChpdGVtKVxuXHRcdFx0aXRlbS5wYXJzZURhdGEocmVzb3VyY2VPYmplY3QuY29sb3JzW2tleV0pO1xuXHR9XG5cblx0Zm9yICh2YXIga2V5IGluIHJlc291cmNlT2JqZWN0LmdyYXBoaWNzKSB7XG5cdFx0aWYgKGtleSAhPSBcInRleHR1cmVzXCIpIHtcblx0XHRcdHZhciBpdGVtID0gYWxsQnlLZXlba2V5XTtcblxuXHRcdFx0aWYgKGl0ZW0pXG5cdFx0XHRcdGl0ZW0ucGFyc2VEYXRhKHJlc291cmNlT2JqZWN0LmdyYXBoaWNzW2tleV0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEFkZCB0ZXN0Y2FzZS5cbiAqIEBtZXRob2QgYWRkVGVzdGNhc2VcbiAqL1xuRmlkZGxlQ2xpZW50TW9kZWwucHJvdG90eXBlLmFkZFRlc3RjYXNlID0gZnVuY3Rpb24oaWQsIG5hbWUsIHVybCkge1xuXHR2YXIgdGVzdGNhc2UgPSBuZXcgVGVzdGNhc2UoaWQsIG5hbWUsIHVybCk7XG5cdHRlc3RjYXNlLnNldEZpZGRsZUNsaWVudE1vZGVsKHRoaXMpO1xuXHR0aGlzLnRlc3RjYXNlQ29sbGVjdGlvbi5hZGRJdGVtKHRlc3RjYXNlKTtcblxuXHRpZiAodGhpcy50ZXN0Y2FzZUNvbGxlY3Rpb24uZ2V0TGVuZ3RoKCkgPT0gMSlcblx0XHR0ZXN0Y2FzZS5zZXRBY3RpdmUodHJ1ZSk7XG59XG5cbi8qKlxuICogR2V0IHRlc3RjYXNlIGNvbGxlY3Rpb25cbiAqIEBtZXRob2QgZ2V0VGVzdGNhc2VDb2xsZWN0aW9uXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5nZXRUZXN0Y2FzZUNvbGxlY3Rpb24gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMudGVzdGNhc2VDb2xsZWN0aW9uO1xufVxuXG4vKipcbiAqIEdldCBhY3RpdmUgdGVzdCBjYXNlLlxuICogQG1ldGhvZCBnZXRBY3RpdmVUZXN0Q2FzZVxuICovXG5GaWRkbGVDbGllbnRNb2RlbC5wcm90b3R5cGUuZ2V0QWN0aXZlVGVzdGNhc2UgPSBmdW5jdGlvbigpIHtcblx0Ly9jb25zb2xlLmxvZyhcInRlc3RjYXNlIGNvbGxlY3Rpb24gbGVuZ3RoOiBcIiArIHRoaXMudGVzdGNhc2VDb2xsZWN0aW9uLmdldExlbmd0aCgpKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVzdGNhc2VDb2xsZWN0aW9uLmdldExlbmd0aCgpOyBpKyspXG5cdFx0aWYgKHRoaXMudGVzdGNhc2VDb2xsZWN0aW9uLmdldEl0ZW1BdChpKS5pc0FjdGl2ZSgpKVxuXHRcdFx0cmV0dXJuIHRoaXMudGVzdGNhc2VDb2xsZWN0aW9uLmdldEl0ZW1BdChpKTtcblxuXHRyZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgY2F0ZWdvcnkgY29sbGVjdGlvbi5cbiAqIEBtZXRob2QgZ2V0Q2F0ZWdvcnlDb2xsZWN0aW9uXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5nZXRDYXRlZ29yeUNvbGxlY3Rpb24gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuY2F0ZWdvcnlDb2xsZWN0aW9uO1xufVxuXG4vKipcbiAqIEFkZCBjYXRlZ29yeSBtb2RlbC5cbiAqIEBtZXRob2QgYWRkQ2F0ZWdvcnlNb2RlbFxuICovXG5GaWRkbGVDbGllbnRNb2RlbC5wcm90b3R5cGUuYWRkQ2F0ZWdvcnlNb2RlbCA9IGZ1bmN0aW9uKGNhdGVnb3J5TW9kZWwpIHtcblx0Y2F0ZWdvcnlNb2RlbC5zZXRQYXJlbnRNb2RlbCh0aGlzKTtcblx0dGhpcy5jYXRlZ29yeUNvbGxlY3Rpb24uYWRkSXRlbShjYXRlZ29yeU1vZGVsKTtcblxuXHRjYXRlZ29yeU1vZGVsLm9uKENhdGVnb3J5TW9kZWwuSVRFTV9DSEFOR0UsIHRoaXMub25JdGVtQ2hhbmdlLCB0aGlzKTtcblxuXHRpZiAodGhpcy5jYXRlZ29yeUNvbGxlY3Rpb24uZ2V0TGVuZ3RoKCkgPT0gMSlcblx0XHRjYXRlZ29yeU1vZGVsLnNldEFjdGl2ZSh0cnVlKTtcblxuXHRyZXR1cm4gY2F0ZWdvcnlNb2RlbDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIGFkZCBhIGNhdGVnb3J5IG1vZGVsLlxuICogQG1ldGhvZCBjcmVhdGVDYXRlZ29yeVxuICovXG5GaWRkbGVDbGllbnRNb2RlbC5wcm90b3R5cGUuY3JlYXRlQ2F0ZWdvcnkgPSBmdW5jdGlvbih0aXRsZSkge1xuXHR2YXIgY2F0ZWdvcnlNb2RlbCA9IG5ldyBDYXRlZ29yeU1vZGVsKHRpdGxlKTtcblxuXHRyZXR1cm4gdGhpcy5hZGRDYXRlZ29yeU1vZGVsKGNhdGVnb3J5TW9kZWwpO1xufVxuXG4vKipcbiAqIEdldCBhbGwgaXRlbXMgaW4gYWxsIGNhdGVnb3JpZXMuXG4gKiBAbWV0aG9kIGdldEFsbEl0ZW1zXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5nZXRBbGxJdGVtcyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgYSA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jYXRlZ29yeUNvbGxlY3Rpb24uZ2V0TGVuZ3RoKCk7IGkrKylcblx0XHRhID0gYS5jb25jYXQodGhpcy5jYXRlZ29yeUNvbGxlY3Rpb24uZ2V0SXRlbUF0KGkpLmdldEFsbEl0ZW1zKCkpO1xuXG5cdHJldHVybiBhO1xufVxuXG4vKipcbiAqIEdldCBhbGwgaXRlbXMgaW4gYWxsIGNhdGVnb3JpZXMuXG4gKiBAbWV0aG9kIGdldEFsbEl0ZW1zXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5nZXRBbGxJdGVtc0J5S2V5ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBhID0gdGhpcy5nZXRBbGxJdGVtcygpO1xuXHR2YXIgYnlLZXkgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGFbaV07XG5cdFx0YnlLZXlbaXRlbS5nZXRLZXkoKV0gPSBpdGVtO1xuXHR9XG5cblx0cmV0dXJuIGJ5S2V5O1xufVxuXG4vKipcbiAqIFNhdmUgdG8gc2VydmVyLlxuICogQG1ldGhvZCBzYXZlXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG5cdHZhciBhbGxJdGVtcyA9IHRoaXMuZ2V0QWxsSXRlbXMoKTtcblxuXHRqc29uRGF0YSA9IHt9O1xuXHRqc29uRGF0YS5ncmFwaGljcyA9IHt9O1xuXHRqc29uRGF0YS5wb3NpdGlvbnMgPSB7fTtcblx0anNvbkRhdGEuY29sb3JzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxJdGVtcy5sZW5ndGg7IGkrKylcblx0XHRhbGxJdGVtc1tpXS5wcmVwYXJlU2F2ZURhdGEoanNvbkRhdGEpO1xuXG5cdHZhciByZXF1ZXN0ID0gbmV3IEh0dHBSZXF1ZXN0KHdpbmRvdy5sb2NhdGlvbiArIFwic2F2ZVwiKTtcblx0cmVxdWVzdC5zZXRQYXJhbWV0ZXIoXCJqc29uXCIsIEpTT04uc3RyaW5naWZ5KGpzb25EYXRhKSk7XG5cdHJlcXVlc3QucGVyZm9ybSgpLnRoZW4oXG5cdFx0dGhpcy5vblNhdmVDb21wbGV0ZS5iaW5kKHRoaXMpLFxuXHRcdHRoaXMub25TYXZlRXJyb3IuYmluZCh0aGlzKVxuXHQpO1xufVxuXG4vKipcbiAqIFNhdmUgY29tcGxldGUuXG4gKi9cbkZpZGRsZUNsaWVudE1vZGVsLnByb3RvdHlwZS5vblNhdmVDb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRyaWdnZXIoRmlkZGxlQ2xpZW50TW9kZWwuU0FWRV9DT01QTEVURSk7XG59XG5cbi8qKlxuICogU2F2ZSBjb21wbGV0ZS5cbiAqL1xuRmlkZGxlQ2xpZW50TW9kZWwucHJvdG90eXBlLm9uU2F2ZUVycm9yID0gZnVuY3Rpb24oZSkge1xuXHRjb25zb2xlLmxvZyhcInNhdmUgZXJyb3IuLi5cIik7XG59XG5cbi8qKlxuICogSXRlbSBjaGFuZ2UuXG4gKiBAbWV0aG9kIG9uSXRlbUNoYW5nZVxuICovXG5GaWRkbGVDbGllbnRNb2RlbC5wcm90b3R5cGUub25JdGVtQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudHJpZ2dlcihGaWRkbGVDbGllbnRNb2RlbC5JVEVNX0NIQU5HRSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmlkZGxlQ2xpZW50TW9kZWw7IiwidmFyIFJlc291cmNlSXRlbU1vZGVsID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJdGVtTW9kZWxcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgSHR0cFJlcXVlc3QgPSByZXF1aXJlKFwiLi4vdXRpbHMvSHR0cFJlcXVlc3RcIik7XG5cbi8qKlxuICogSW1hZ2VJdGVtTW9kZWxcbiAqIEBjbGFzcyBJbWFnZUl0ZW1Nb2RlbFxuICovXG5mdW5jdGlvbiBJbWFnZUl0ZW1Nb2RlbChrZXkpIHtcblx0UmVzb3VyY2VJdGVtTW9kZWwuY2FsbCh0aGlzLCBrZXkpO1xuXG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gbnVsbDtcblx0dGhpcy52YWx1ZSA9IG51bGw7XG5cdHRoaXMudXBsb2FkaW5nRmlsZU5hbWUgPSBudWxsO1xufVxuXG5pbmhlcml0cyhJbWFnZUl0ZW1Nb2RlbCwgUmVzb3VyY2VJdGVtTW9kZWwpO1xuXG4vKipcbiAqIEdldCBkZWZhdWx0IHZhbHVlLlxuICogQG1ldGhvZCBnZXREZWZhdWx0VmFsdWVcbiAqL1xuSW1hZ2VJdGVtTW9kZWwucHJvdG90eXBlLmdldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5kZWZhdWx0VmFsdWU7XG59XG5cbi8qKlxuICogR2V0IGN1c3RvbWl6ZWQgdmFsdWUuXG4gKiBAbWV0aG9kIGdldFZhbHVlXG4gKi9cbkltYWdlSXRlbU1vZGVsLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy52YWx1ZTtcbn1cblxuLyoqXG4gKiBTZXQgdmFsdWUuXG4gKiBAbWV0aG9kIHNldFZhbHVlXG4gKi9cbkltYWdlSXRlbU1vZGVsLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0dGhpcy5ub3RpZnlDaGFuZ2UoKTtcbn1cblxuLyoqXG4gKiBHZXQgaXRlbSB0eXBlLlxuICogQG1ldGhvZCBnZXRJdGVtVHlwZVxuICovXG5JbWFnZUl0ZW1Nb2RlbC5wcm90b3R5cGUuZ2V0SXRlbVR5cGUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIFwiaW1hZ2VcIjtcbn1cblxuLyoqXG4gKiBAbWV0aG9kIHBhcnNlRGVmYXVsdERhdGFcbiAqL1xuSW1hZ2VJdGVtTW9kZWwucHJvdG90eXBlLnBhcnNlRGVmYXVsdERhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gZGF0YTtcbn1cblxuSW1hZ2VJdGVtTW9kZWwucHJvdG90eXBlLnBhcnNlRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0dGhpcy52YWx1ZSA9IGRhdGEuZmlsZW5hbWU7XG5cblx0aWYgKHRoaXMudmFsdWUgPT0gdGhpcy5kZWZhdWx0VmFsdWUpXG5cdFx0dGhpcy52YWx1ZSA9IG51bGw7XG59XG5cbi8qKlxuICogUHJlcGFyZSBkYXRhIHRvIGJlIHNhdmVkLlxuICogQG1ldGhvZCBwcmVwYXJlU2F2ZURhdGFcbiAqL1xuSW1hZ2VJdGVtTW9kZWwucHJvdG90eXBlLnByZXBhcmVTYXZlRGF0YSA9IGZ1bmN0aW9uKGpzb25EYXRhKSB7XG5cdHZhciBmaWxlbmFtZSA9IG51bGw7XG5cblx0aWYgKHRoaXMudmFsdWUpXG5cdFx0ZmlsZW5hbWUgPSB0aGlzLnZhbHVlO1xuXG5cdGVsc2UgaWYgKHRoaXMuZGVmYXVsdFZhbHVlKVxuXHRcdGZpbGVuYW1lID0gdGhpcy5kZWZhdWx0VmFsdWU7XG5cblx0anNvbkRhdGEuZ3JhcGhpY3NbdGhpcy5rZXldID0ge1xuXHRcdGZpbGVuYW1lOiBmaWxlbmFtZVxuXHR9O1xufVxuXG4vKipcbiAqIFVwbG9hZCBmaWxlLlxuICogQG1ldGhvZCB1cGxvYWRGaWxlXG4gKi9cbkltYWdlSXRlbU1vZGVsLnByb3RvdHlwZS51cGxvYWRGaWxlID0gZnVuY3Rpb24oZmlsZVNlbGVjdGlvbikge1xuXHR0aGlzLnVwbG9hZGluZ0ZpbGVOYW1lID0gZmlsZVNlbGVjdGlvbi5uYW1lO1xuXG5cdHZhciBodHRwUmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdCh3aW5kb3cubG9jYXRpb24gKyBcInVwbG9hZFwiKTtcblx0aHR0cFJlcXVlc3Quc2V0UGFyYW1ldGVyKFwiU2VsZWN0ZWRGaWxlXCIsIGZpbGVTZWxlY3Rpb24pO1xuXHRodHRwUmVxdWVzdC5wZXJmb3JtKCkudGhlbihcblx0XHR0aGlzLm9uRmlsZVVwbG9hZENvbXBsZXRlLmJpbmQodGhpcyksXG5cdFx0dGhpcy5vbkZpbGVVcGxvYWRFcnJvci5iaW5kKHRoaXMpXG5cdCk7XG59XG5cbi8qKlxuICogRmlsZSB1cGxvYWQgY29tcGxldGUuXG4gKi9cbkltYWdlSXRlbU1vZGVsLnByb3RvdHlwZS5vbkZpbGVVcGxvYWRDb21wbGV0ZSA9IGZ1bmN0aW9uKHJlcykge1xuXHRjb25zb2xlLmxvZyhcInVwbG9hZCBjb21wbGV0ZTogXCIgKyB0aGlzLnVwbG9hZGluZ0ZpbGVOYW1lKTtcblxuXHR0aGlzLnNldFZhbHVlKHRoaXMudXBsb2FkaW5nRmlsZU5hbWUpO1xuXHR0aGlzLnVwbG9hZGluZ0ZpbGVOYW1lID0gbnVsbDtcbn1cblxuLyoqXG4gKiBGaWxlIHVwbG9hZCBlcnJvci5cbiAqL1xuSW1hZ2VJdGVtTW9kZWwucHJvdG90eXBlLm9uRmlsZVVwbG9hZEVycm9yID0gZnVuY3Rpb24ocmVhc29uKSB7XG5cdGNvbnNvbGUubG9nKFwidXBsb2FkIGVycm9yOiBcIiArIHJlYXNvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VJdGVtTW9kZWw7IiwidmFyIFJlc291cmNlSXRlbU1vZGVsID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJdGVtTW9kZWxcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG5cbi8qKlxuICogUG9zaXRpb25JdGVtTW9kZWxcbiAqIEBjbGFzcyBQb3NpdGlvbkl0ZW1Nb2RlbFxuICovXG5mdW5jdGlvbiBQb3NpdGlvbkl0ZW1Nb2RlbChrZXkpIHtcblx0UmVzb3VyY2VJdGVtTW9kZWwuY2FsbCh0aGlzLCBrZXkpO1xuXG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gbnVsbDtcblx0dGhpcy52YWx1ZSA9IG51bGw7XG59XG5cbmluaGVyaXRzKFBvc2l0aW9uSXRlbU1vZGVsLCBSZXNvdXJjZUl0ZW1Nb2RlbCk7XG5cbi8qKlxuICogR2V0IGRlZmF1bHQgdmFsdWUuXG4gKiBAbWV0aG9kIGdldERlZmF1bHRWYWx1ZVxuICovXG5Qb3NpdGlvbkl0ZW1Nb2RlbC5wcm90b3R5cGUuZ2V0RGVmYXVsdFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgY3VzdG9taXplZCB2YWx1ZS5cbiAqIEBtZXRob2QgZ2V0VmFsdWVcbiAqL1xuUG9zaXRpb25JdGVtTW9kZWwucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnZhbHVlO1xufVxuXG4vKipcbiAqIFNldCB2YWx1ZS5cbiAqIEBtZXRob2Qgc2V0VmFsdWVcbiAqL1xuUG9zaXRpb25JdGVtTW9kZWwucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXHR0aGlzLm5vdGlmeUNoYW5nZSgpO1xufVxuXG4vKipcbiAqIFNldCBkZWZhdWx0IHZhbHVlLlxuICogQG1ldGhvZCBzZXREZWZhdWx0VmFsdWVcbiAqL1xuUG9zaXRpb25JdGVtTW9kZWwucHJvdG90eXBlLnNldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGRlZmF1bHRWYWx1ZSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgaXRlbSB0eXBlLlxuICogQG1ldGhvZCBnZXRJdGVtVHlwZVxuICovXG5Qb3NpdGlvbkl0ZW1Nb2RlbC5wcm90b3R5cGUuZ2V0SXRlbVR5cGUgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIFwicG9zaXRpb25cIjtcbn1cblxuLyoqXG4gKiBQYXJzZSBkZWZhdWx0IGRhdGEuXG4gKi9cblBvc2l0aW9uSXRlbU1vZGVsLnByb3RvdHlwZS5wYXJzZURlZmF1bHREYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZSA9IGRhdGFbMF0gKyBcIiwgXCIgKyBkYXRhWzFdO1xufVxuXG4vKipcbiAqIFBhcnNlIGluY29taW5nIGRhdGEuXG4gKi9cblBvc2l0aW9uSXRlbU1vZGVsLnByb3RvdHlwZS5wYXJzZURhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG5cdHRoaXMudmFsdWUgPSBkYXRhWzBdICsgXCIsIFwiICsgZGF0YVsxXTtcblxuXHRpZiAodGhpcy52YWx1ZSA9PSB0aGlzLmRlZmF1bHRWYWx1ZSlcblx0XHR0aGlzLnZhbHVlID0gbnVsbDtcbn1cblxuLyoqXG4gKiBQcmVwYXJlIGRhdGEgdG8gYmUgc2F2ZWQuXG4gKiBAbWV0aG9kIHByZXBhcmVTYXZlRGF0YVxuICovXG5Qb3NpdGlvbkl0ZW1Nb2RlbC5wcm90b3R5cGUucHJlcGFyZVNhdmVEYXRhID0gZnVuY3Rpb24oanNvbkRhdGEpIHtcblx0dmFyIGNhbmQgPSB0aGlzLmdldERhdGFDYW5kKHRoaXMudmFsdWUpO1xuXG5cdGlmICghY2FuZClcblx0XHRjYW5kID0gdGhpcy5nZXREYXRhQ2FuZCh0aGlzLmRlZmF1bHRWYWx1ZSk7XG5cblx0anNvbkRhdGEucG9zaXRpb25zW3RoaXMua2V5XSA9IGNhbmQ7XG59XG5cbi8qKlxuICogR2V0IGNhZGlkYXRlIGRhdGEuXG4gKiBAbWV0aG9kIGdldERhdGFDYW5kXG4gKi9cblBvc2l0aW9uSXRlbU1vZGVsLnByb3RvdHlwZS5nZXREYXRhQ2FuZCA9IGZ1bmN0aW9uKHYpIHtcblx0aWYgKCF2KVxuXHRcdHJldHVybiBudWxsO1xuXG5cdHZhciBkYXRhID0gdi5zcGxpdChcIixcIik7XG5cdHZhciB4ID0gcGFyc2VGbG9hdChkYXRhWzBdKTtcblx0dmFyIHkgPSBwYXJzZUZsb2F0KGRhdGFbMV0pO1xuXG5cdGlmICghaXNOYU4oeCkgJiYgIWlzTmFOKHkpKVxuXHRcdHJldHVybiBbeCwgeV07XG5cblx0cmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zaXRpb25JdGVtTW9kZWw7IiwidmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCJ5YWVkXCIpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xuXG4vKipcbiAqIFJlc291cmNlSXRlbU1vZGVsXG4gKiBAY2xhc3MgUmVzb3VyY2VJdGVtTW9kZWxcbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VJdGVtTW9kZWwoa2V5KSB7XG5cdHRoaXMua2V5ID0ga2V5O1xufVxuXG5pbmhlcml0cyhSZXNvdXJjZUl0ZW1Nb2RlbCwgRXZlbnREaXNwYXRjaGVyKTtcblJlc291cmNlSXRlbU1vZGVsLklURU1fQ0hBTkdFID0gXCJpdGVtQ2hhbmdlXCI7XG5cbi8qKlxuICogR2V0IGtleS5cbiAqIEBtZXRob2QgZ2V0S2V5XG4gKi9cblJlc291cmNlSXRlbU1vZGVsLnByb3RvdHlwZS5nZXRLZXkgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMua2V5O1xufVxuXG4vKipcbiAqIEdldCBkZWZhdWx0IHZhbHVlLlxuICogQG1ldGhvZCBnZXREZWZhdWx0VmFsdWVcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLmdldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJBYnN0cmFjdFwiKTtcbn1cblxuLyoqXG4gKiBHZXQgY3VzdG9taXplZCB2YWx1ZS5cbiAqIEBtZXRob2QgZ2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdHRocm93IG5ldyBFcnJvcihcIkFic3RyYWN0XCIpO1xufVxuXG4vKipcbiAqIFNldCB2YWx1ZS5cbiAqIEBtZXRob2Qgc2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiQWJzdHJhY3RcIik7XG59XG5cbi8qKlxuICogUHJlcGFyZSBkYXRhIHRvIGJlIHNhdmVkLlxuICogQG1ldGhvZCBwcmVwYXJlU2F2ZURhdGFcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLnByZXBhcmVTYXZlRGF0YSA9IGZ1bmN0aW9uKGpzb25EYXRhKSB7XG5cdHRocm93IG5ldyBFcnJvcihcIkFic3RyYWN0XCIpO1xufVxuXG4vKipcbiAqIE5vdGlmeSBjaGFuZ2UuXG4gKiBAbWV0aG9kIG5vdGlmeUNoYW5nZVxuICogQHByb3RlY3RlZFxuICovXG5SZXNvdXJjZUl0ZW1Nb2RlbC5wcm90b3R5cGUubm90aWZ5Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudHJpZ2dlcihSZXNvdXJjZUl0ZW1Nb2RlbC5JVEVNX0NIQU5HRSk7XG59XG5cbi8qKlxuICogR2V0IGl0ZW0gdHlwZS5cbiAqIEBtZXRob2QgZ2V0SXRlbVR5cGVcbiAqL1xuUmVzb3VyY2VJdGVtTW9kZWwucHJvdG90eXBlLmdldEl0ZW1UeXBlID0gZnVuY3Rpb24oKSB7XG5cdHRocm93IG5ldyBFcnJvcihcIkFic3RyYWN0XCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlSXRlbU1vZGVsOyIsInZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwieWFlZFwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcblxuLyoqXG4gKiBUZXN0Y2FzZS5cbiAqIEBjbGFzcyBUZXN0Y2FzZVxuICovXG5mdW5jdGlvbiBUZXN0Y2FzZShpZCwgbmFtZSwgdXJsKSB7XG5cdHRoaXMuaWQgPSBpZDtcblx0dGhpcy5uYW1lID0gbmFtZTtcblx0dGhpcy51cmwgPSB1cmw7XG5cblx0dGhpcy5hY3RpdmUgPSBmYWxzZTtcblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbCA9IG51bGw7XG59O1xuXG5pbmhlcml0cyhUZXN0Y2FzZSwgRXZlbnREaXNwYXRjaGVyKTtcblxuLyoqXG4gKiBTZXQgcmVmZXJlbmNlIHRvIGFwcC5cbiAqIEBtZXRob2Qgc2V0RmlkZGxlQ2xpZW50TW9kZWxcbiAqL1xuVGVzdGNhc2UucHJvdG90eXBlLnNldEZpZGRsZUNsaWVudE1vZGVsID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbCA9IHZhbHVlO1xufVxuXG4vKipcbiAqIFNldCBhY3RpdmUgc3RhdGUuXG4gKiBAbWV0aG9kIHNldEFjdGl2ZVxuICovXG5UZXN0Y2FzZS5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0aWYgKHZhbHVlID09IHRoaXMuYWN0aXZlKVxuXHRcdHJldHVybjtcblxuXHR2YXIgc2libGluZ3MgPSB0aGlzLmZpZGRsZUNsaWVudE1vZGVsLmdldFRlc3RjYXNlQ29sbGVjdGlvbigpO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc2libGluZ3MuZ2V0TGVuZ3RoKCk7IGkrKylcblx0XHRpZiAoc2libGluZ3MuZ2V0SXRlbUF0KGkpICE9IHRoaXMpXG5cdFx0XHRzaWJsaW5ncy5nZXRJdGVtQXQoaSkuc2V0QWN0aXZlKGZhbHNlKTtcblxuXHR0aGlzLmFjdGl2ZSA9IHZhbHVlO1xuXHR0aGlzLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cblx0dGhpcy5maWRkbGVDbGllbnRNb2RlbC50cmlnZ2VyKFwiYWN0aXZlVGVzdGNhc2VDaGFuZ2VcIik7XG59XG5cbi8qKlxuICogSXMgdGhpcyBjYXRlZ29yeSB0aGUgYWN0aXZlIG9uZT9cbiAqIEBtZXRob2QgaXNBY3RpdmVcbiAqL1xuVGVzdGNhc2UucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmFjdGl2ZTtcbn1cblxuLyoqXG4gKiBHZXQgbGFiZWwuXG4gKiBAbWV0aG9kIGdldExhYmVsXG4gKi9cblRlc3RjYXNlLnByb3RvdHlwZS5nZXRMYWJlbCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5uYW1lO1xufVxuXG4vKipcbiAqIEdldCB1cmwuXG4gKiBAbWV0aG9kIGdldFVybFxuICovXG5UZXN0Y2FzZS5wcm90b3R5cGUuZ2V0VXJsID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnVybDtcbn1cblxuLyoqXG4gKiBHZXQgdXJsIHdpdGggY2FjaGUgcHJldmVudGlvblxuICogQG1ldGhvZCBnZXRDYWNoZVByZXZlbnRpb25VcmxcbiAqL1xuVGVzdGNhc2UucHJvdG90eXBlLmdldENhY2hlUHJldmVudGlvblVybCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0aWYgKHRoaXMudXJsLmluZGV4T2YoXCI/XCIpID49IDApXG5cdFx0cmV0dXJuIHRoaXMudXJsICsgXCImX19wcmV2ZW50X2NhY2hlPVwiICsgdGltZXN0YW1wO1xuXG5cdGVsc2Vcblx0XHRyZXR1cm4gdGhpcy51cmwgKyBcIj9fX3ByZXZlbnRfY2FjaGU9XCIgKyB0aW1lc3RhbXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGVzdGNhc2U7IiwidmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuL0V2ZW50RGlzcGF0Y2hlclwiKTtcblxuZnVuY3Rpb24gQVBJQ29ubmVjdGlvbihiYXNlUGF0aCwgc2Vzc2lvbikge1xuXHR0aGlzLnVybCA9IGJhc2VQYXRoO1xuXHR0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGg7XG5cdHRoaXMuc2Vzc2lvbiA9IHNlc3Npb247XG59O1xuRXZlbnREaXNwYXRjaGVyLmluaXQoQVBJQ29ubmVjdGlvbik7XG5cbkFQSUNvbm5lY3Rpb24ucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbihyb3V0ZSwgcGFyYW1PYmplY3QpIHtcblx0dmFyIHhtbGh0dHAgPSBudWxsO1xuXHRpZiAod2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7IC8vIGNvZGUgZm9yIElFNyssIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuXHRcdHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0fVxuXHRlbHNlIHsgLy8gY29kZSBmb3IgSUU2LCBJRTVcblx0XHR4bWxodHRwID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcblx0fVxuXG5cdHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gdGhpcy5vblJlYWR5U3RhdGVDaGFuZ2UuYmluZCh0aGlzLCB4bWxodHRwKTtcblxuXHR2YXIgdXJsID0gdGhpcy51cmwgKyByb3V0ZTsvL1wiZ2V0SW1hZ2VzXCI7XG5cdHZhciBwYXJhbXMgPSBcIlwiO1xuXHR2YXIgZmlyc3QgPSB0cnVlO1xuXHRmb3IodmFyIG8gaW4gcGFyYW1PYmplY3QpIHtcblx0XHRpZighZmlyc3QpIHtcblx0XHRcdHBhcmFtcyArPSBcIiZcIjtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRmaXJzdCA9IGZhbHNlO1xuXHRcdH1cblx0XHRwYXJhbXMgKz0gbyArIFwiPVwiICsgcGFyYW1PYmplY3Rbb107XG5cdH1cblxuXHR4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSk7XG5cdHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTtcblx0eG1saHR0cC5zZW5kKHBhcmFtcyk7XG59O1xuXG5BUElDb25uZWN0aW9uLnByb3RvdHlwZS51cGxvYWQgPSBmdW5jdGlvbihyb3V0ZSwgcGFyYW1PYmplY3QpIHtcblx0dmFyIHhtbGh0dHAgPSBudWxsO1xuXHRpZiAod2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7IC8vIGNvZGUgZm9yIElFNyssIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuXHRcdHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0fVxuXHRlbHNlIHsgLy8gY29kZSBmb3IgSUU2LCBJRTVcblx0XHR4bWxodHRwID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcblx0fVxuXG5cdHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gdGhpcy5vblJlYWR5U3RhdGVDaGFuZ2UuYmluZCh0aGlzLCB4bWxodHRwKTtcblxuXHR2YXIgdXJsID0gdGhpcy51cmwgKyByb3V0ZTsvL1wiZ2V0SW1hZ2VzXCI7XG5cdFxuXHR4bWxodHRwLm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSk7XG5cdC8veG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xuXHR4bWxodHRwLnNlbmQocGFyYW1PYmplY3QpO1xufTtcblxuQVBJQ29ubmVjdGlvbi5wcm90b3R5cGUub25SZWFkeVN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oeG1saHR0cCkge1xuXHRpZiAoeG1saHR0cC5yZWFkeVN0YXRlID09IDQpIHtcblx0XHRpZiAoeG1saHR0cC5zdGF0dXMgPT0gMjAwIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoXCJodHRwXCIpID09IC0xKSB7XG5cdFx0XHR2YXIganNvbiA9IEpTT04ucGFyc2UoeG1saHR0cC5yZXNwb25zZSk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJsb2FkZWRcIiwge2Nvbm5lY3Rpb246IHRoaXMsIGpzb246IGpzb259KTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnNvbGUubG9nKFwiQW4gZXJyb3IgaGFzIG9jY3VyZWQgbWFraW5nIHRoZSByZXF1ZXN0XCIpXG5cdFx0fVxuXHR9XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQVBJQ29ubmVjdGlvbjsiLCJmdW5jdGlvbiBDbGFzc1V0aWxzKCkge1xuXHRcbn07XG5cbkNsYXNzVXRpbHMuZXh0ZW5kcyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5oZXJpdHNfZnJvbSkge1xuXHRvYmplY3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShpbmhlcml0c19mcm9tLnByb3RvdHlwZSk7XG5cdG9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBvYmplY3Q7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQ2xhc3NVdGlsczsiLCIvKipcbiAqIENvbG9yIHV0aWxpdGllcy5cbiAqIEBjbGFzcyBDb2xvclV0aWxcbiAqL1xuZnVuY3Rpb24gQ29sb3JVdGlsKCkge31cblxuLyoqXG4gKiBQYXJzZSBodG1sIGNvbG9yLlxuICogQG1ldGhvZCBwYXJzZUhUTUxDb2xvclxuICovXG5Db2xvclV0aWwucGFyc2VIVE1MQ29sb3IgPSBmdW5jdGlvbihodG1sQ29sb3IpIHtcblx0aWYgKGh0bWxDb2xvciA9PT0gdW5kZWZpbmVkIHx8IGh0bWxDb2xvciA9PT0gbnVsbClcblx0XHRodG1sQ29sb3IgPSBcIlwiO1xuXG5cdHZhciBzID0gaHRtbENvbG9yLnRvU3RyaW5nKCkudHJpbSgpLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuXHR2YXIgYyA9IHtcblx0XHRyZWQ6IHBhcnNlSW50KHNbMF0gKyBzWzFdLCAxNiksXG5cdFx0Z3JlZW46IHBhcnNlSW50KHNbMl0gKyBzWzNdLCAxNiksXG5cdFx0Ymx1ZTogcGFyc2VJbnQoc1s0XSArIHNbNV0sIDE2KSxcblx0fVxuXG5cdGlmIChpc05hTihjLnJlZCkpXG5cdFx0Yy5yZWQgPSAwO1xuXG5cdGlmIChpc05hTihjLmdyZWVuKSlcblx0XHRjLmdyZWVuID0gMDtcblxuXHRpZiAoaXNOYU4oYy5ibHVlKSlcblx0XHRjLmJsdWUgPSAwO1xuXG5cdHJldHVybiBjO1xufVxuXG4vKipcbiAqIENvbnZlcnQgaHRtbCB0byBoZXguXG4gKiBAbWV0aG9kIGh0bWxUb0hleFxuICovXG5Db2xvclV0aWwuaHRtbFRvSGV4ID0gZnVuY3Rpb24oaHRtbCkge1xuXHR2YXIgY29sb3IgPSBDb2xvclV0aWwucGFyc2VIVE1MQ29sb3IoaHRtbCk7XG5cblx0cmV0dXJuIChjb2xvci5yZWQgPDwgMTYpICsgKGNvbG9yLmdyZWVuIDw8IDgpICsgKGNvbG9yLmJsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgaGV4IGNvbG9yIG51bWJlciB0byBhIGh0bWwgY29sb3IuXG4gKiBAbWV0aG9kIGhleFRvSFRNTFxuICovXG5Db2xvclV0aWwuaGV4VG9IVE1MID0gZnVuY3Rpb24oaGV4KSB7XG5cdHZhciByZWQgPSAoaGV4ID4+IDE2ICYgMHhGRik7XG5cdHZhciBncmVlbiA9IChoZXggPj4gOCAmIDB4RkYpO1xuXHR2YXIgYmx1ZSA9IChoZXggJiAweEZGKTtcblxuXHRyZXR1cm4gXCIjXCIgK1xuXHRcdENvbG9yVXRpbC5wcmVmaXhaZXJvKHJlZC50b1N0cmluZygxNiksIDIpICtcblx0XHRDb2xvclV0aWwucHJlZml4WmVybyhncmVlbi50b1N0cmluZygxNiksIDIpICtcblx0XHRDb2xvclV0aWwucHJlZml4WmVybyhibHVlLnRvU3RyaW5nKDE2KSwgMik7XG59O1xuXG4vKipcbiAqIFByZWZpeCB6ZXJvXG4gKiBAbWV0aG9kIHByZWZpeFplcm9cbiAqL1xuQ29sb3JVdGlsLnByZWZpeFplcm8gPSBmdW5jdGlvbihzLCBuKSB7XG5cdGlmICghbilcblx0XHRuID0gMjtcblxuXHR3aGlsZSAocy5sZW5ndGggPCBuKVxuXHRcdHMgPSBcIjBcIiArIHM7XG5cblx0cmV0dXJuIHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sb3JVdGlsOyIsInZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcblxuLyoqXG4gKiBSZW1vdmVzIGl0c2VsZiBvbiBjbGljayBvdXRzaWRlLlxuICogQGNsYXNzIENvbnRleHREaXZcbiAqL1xuZnVuY3Rpb24gQ29udGV4dERpdigpIHtcblx0eG5vZGUuRGl2LmNhbGwodGhpcyk7XG59XG5cbmluaGVyaXRzKENvbnRleHREaXYsIHhub2RlLkRpdik7XG5cbi8qKlxuICogU2hvdy5cbiAqL1xuQ29udGV4dERpdi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmJvZHlNb3VzZURvd25MaXN0ZW5lciA9IHRoaXMub25Cb2R5TW91c2VEb3duLmJpbmQodGhpcyk7XG5cdHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XG5cdHRoaXMuY2xpY2tMaXN0ZW5lciA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuXG5cdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKTtcblx0dGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0xpc3RlbmVyKTtcblx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuYm9keU1vdXNlRG93bkxpc3RlbmVyKTtcblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMpO1xufVxuXG4vKipcbiAqIEhpZGUuXG4gKi9cbkNvbnRleHREaXYucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuXHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrTGlzdGVuZXIpO1xuXHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5ib2R5TW91c2VEb3duTGlzdGVuZXIpO1xuXG5cdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcyk7XG59XG5cbi8qKlxuICogTW91c2UgZG93biBvdXRzaWRlLCBoaWRlLlxuICovXG5Db250ZXh0RGl2LnByb3RvdHlwZS5vbkJvZHlNb3VzZURvd24gPSBmdW5jdGlvbigpIHtcblx0dGhpcy5oaWRlKCk7XG59XG5cbi8qKlxuICogTW91c2UgZG93biBpbnNpZGUsIGRvbid0IGRvIGFueXRoaW5nLlxuICovXG5Db250ZXh0RGl2LnByb3RvdHlwZS5vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGV2KSB7XG5cdGV2LnN0b3BQcm9wYWdhdGlvbigpO1xufVxuXG4vKipcbiAqIENsaWNrLiBIaWRlLlxuICovXG5Db250ZXh0RGl2LnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMuaGlkZSgpO1xufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dERpdjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBBUzMvanF1ZXJ5IHN0eWxlIGV2ZW50IGRpc3BhdGNoZXIuIFNsaWdodGx5IG1vZGlmaWVkLiBUaGVcbiAqIGpxdWVyeSBzdHlsZSBvbi9vZmYvdHJpZ2dlciBzdHlsZSBvZiBhZGRpbmcgbGlzdGVuZXJzIGlzXG4gKiBjdXJyZW50bHkgdGhlIHByZWZlcnJlZCBvbmUuXG4gKiBcbiAqIFRoZSBvbiBtZXRob2QgZm9yIGFkZGluZyBsaXN0ZW5lcnMgdGFrZXMgYW4gZXh0cmEgcGFyYW1ldGVyIHdoaWNoIGlzIHRoZVxuICogc2NvcGUgaW4gd2hpY2ggbGlzdGVuZXJzIHNob3VsZCBiZSBjYWxsZWQuIFNvIHRoaXM6XG4gKlxuICogICAgIG9iamVjdC5vbihcImV2ZW50XCIsIGxpc3RlbmVyLCB0aGlzKTtcbiAqXG4gKiBIYXMgdGhlIHNhbWUgZnVuY3Rpb24gd2hlbiBhZGRpbmcgZXZlbnRzIGFzOlxuICpcbiAqICAgICBvYmplY3Qub24oXCJldmVudFwiLCBsaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAqXG4gKiBIb3dldmVyLCB0aGUgZGlmZmVyZW5jZSBpcyB0aGF0IGlmIHdlIHVzZSB0aGUgc2Vjb25kIG1ldGhvZCBpdFxuICogd2lsbCBub3QgYmUgcG9zc2libGUgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgbGF0ZXIsIHVubGVzc1xuICogdGhlIGNsb3N1cmUgY3JlYXRlZCBieSBiaW5kIGlzIHN0b3JlZCBzb21ld2hlcmUuIElmIHRoZSBcbiAqIGZpcnN0IG1ldGhvZCBpcyB1c2VkLCB3ZSBjYW4gcmVtb3ZlIHRoZSBsaXN0ZW5lciB3aXRoOlxuICpcbiAqICAgICBvYmplY3Qub2ZmKFwiZXZlbnRcIiwgbGlzdGVuZXIsIHRoaXMpO1xuICpcbiAqIEBjbGFzcyBFdmVudERpc3BhdGNoZXJcbiAqL1xuZnVuY3Rpb24gRXZlbnREaXNwYXRjaGVyKCkge1xuXHR0aGlzLmxpc3RlbmVyTWFwID0ge307XG59XG5cbi8qKlxuICogQWRkIGV2ZW50IGxpc3RlbmVyLlxuICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyXG4gKiBAZGVwcmVjYXRlZFxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudFR5cGUsIGxpc3RlbmVyLCBzY29wZSkge1xuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXApXG5cdFx0dGhpcy5saXN0ZW5lck1hcCA9IHt9O1xuXG5cdGlmICghZXZlbnRUeXBlKVxuXHRcdHRocm93IG5ldyBFcnJvcihcIkV2ZW50IHR5cGUgcmVxdWlyZWQgZm9yIGV2ZW50IGRpc3BhdGNoZXJcIik7XG5cblx0aWYgKCFsaXN0ZW5lcilcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJMaXN0ZW5lciByZXF1aXJlZCBmb3IgZXZlbnQgZGlzcGF0Y2hlclwiKTtcblxuXHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBsaXN0ZW5lciwgc2NvcGUpO1xuXG5cdGlmICghdGhpcy5saXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKVxuXHRcdHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXSA9IFtdO1xuXG5cdHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXS5wdXNoKHtcblx0XHRsaXN0ZW5lcjogbGlzdGVuZXIsXG5cdFx0c2NvcGU6IHNjb3BlXG5cdH0pO1xufVxuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lci5cbiAqIEBtZXRob2QgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICogQGRlcHJlY2F0ZWRcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnRUeXBlLCBsaXN0ZW5lciwgc2NvcGUpIHtcblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwKVxuXHRcdHRoaXMubGlzdGVuZXJNYXAgPSB7fTtcblxuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSlcblx0XHRyZXR1cm47XG5cblx0dmFyIGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBsaXN0ZW5lck9iaiA9IGxpc3RlbmVyc1tpXTtcblxuXHRcdGlmIChsaXN0ZW5lciA9PSBsaXN0ZW5lck9iai5saXN0ZW5lciAmJiBzY29wZSA9PSBsaXN0ZW5lck9iai5zY29wZSkge1xuXHRcdFx0bGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblx0XHRcdGktLTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIWxpc3RlbmVycy5sZW5ndGgpXG5cdFx0ZGVsZXRlIHRoaXMubGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBldmVudC5cbiAqIEBtZXRob2QgZGlzcGF0Y2hFdmVudFxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuXHRpZiAoIXRoaXMubGlzdGVuZXJNYXApXG5cdFx0dGhpcy5saXN0ZW5lck1hcCA9IHt9O1xuXG5cdGlmICh0eXBlb2YgZXZlbnQgPT0gXCJzdHJpbmdcIikge1xuXHRcdGV2ZW50ID0ge1xuXHRcdFx0dHlwZTogZXZlbnRcblx0XHR9O1xuXHR9XG5cblx0aWYgKCF0aGlzLmxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KGV2ZW50LnR5cGUpKVxuXHRcdHJldHVybjtcblxuXHRpZiAoZGF0YSA9PSB1bmRlZmluZWQpXG5cdFx0ZGF0YSA9IGV2ZW50O1xuXG5cdGZvciAodmFyIGkgaW4gdGhpcy5saXN0ZW5lck1hcFtldmVudC50eXBlXSkge1xuXHRcdHZhciBsaXN0ZW5lck9iaiA9IHRoaXMubGlzdGVuZXJNYXBbZXZlbnQudHlwZV1baV07XG5cblx0XHRsaXN0ZW5lck9iai5saXN0ZW5lci5jYWxsKGxpc3RlbmVyT2JqLnNjb3BlLCBkYXRhKTtcblx0fVxufVxuXG4vKipcbiAqIEpxdWVyeSBzdHlsZSBhbGlhcyBmb3IgYWRkRXZlbnRMaXN0ZW5lclxuICogQG1ldGhvZCBvblxuICovXG5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLm9uID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXG4vKipcbiAqIEpxdWVyeSBzdHlsZSBhbGlhcyBmb3IgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICogQG1ldGhvZCBvZmZcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbi8qKlxuICogSnF1ZXJ5IHN0eWxlIGFsaWFzIGZvciBkaXNwYXRjaEV2ZW50XG4gKiBAbWV0aG9kIHRyaWdnZXJcbiAqL1xuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuXG4vKipcbiAqIE1ha2Ugc29tZXRoaW5nIGFuIGV2ZW50IGRpc3BhdGNoZXIuIENhbiBiZSB1c2VkIGZvciBtdWx0aXBsZSBpbmhlcml0YW5jZS5cbiAqIEBtZXRob2QgaW5pdFxuICogQHN0YXRpY1xuICovXG5FdmVudERpc3BhdGNoZXIuaW5pdCA9IGZ1bmN0aW9uKGNscykge1xuXHRjbHMucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG5cdGNscy5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblx0Y2xzLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50O1xuXHRjbHMucHJvdG90eXBlLm9uID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5vbjtcblx0Y2xzLnByb3RvdHlwZS5vZmYgPSBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLm9mZjtcblx0Y2xzLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS50cmlnZ2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RGlzcGF0Y2hlcjsiLCJ2YXIgVGhlbmFibGUgPSByZXF1aXJlKFwidGlucFwiKTtcblxuLyoqXG4gKiBIdHRwIHJlcXVlc3QgYWJzdHJhY3Rpb24uXG4gKiBAY2xhc3MgSHR0cFJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gSHR0cFJlcXVlc3QodXJsKSB7XG5cdHRoaXMudXJsID0gdXJsO1xuXHR0aGlzLmZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdHRoaXMudGhlbmFibGUgPSBudWxsO1xuXHR0aGlzLmRlY29kZVJlc3BvbnNlID0gXCJqc29uXCI7XG59XG5cbi8qKlxuICogU2V0IHVybC5cbiAqIEBtZXRob2Qgc2V0VXJsXG4gKi9cbkh0dHBSZXF1ZXN0LnByb3RvdHlwZS5zZXRVcmwgPSBmdW5jdGlvbih1cmwpIHtcblx0dGhpcy51cmwgPSB1cmw7XG59XG5cbi8qKlxuICogU2V0IGEgZmlsZSB0byB1cGxvYWQuXG4gKiBAbWV0aG9kIHNldFVwbG9hZEZpbGVcbiAqL1xuSHR0cFJlcXVlc3QucHJvdG90eXBlLnNldFBhcmFtZXRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG5cdHRoaXMuZm9ybURhdGEuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtIHJlcXVlc3QuXG4gKiBAbWV0aG9kIHBlcmZvcm1cbiAqL1xuSHR0cFJlcXVlc3QucHJvdG90eXBlLnBlcmZvcm0gPSBmdW5jdGlvbigpIHtcblx0dGhpcy50aGVuYWJsZSA9IG5ldyBUaGVuYWJsZSgpO1xuXG5cdHRoaXMueG1sWE1MSHR0cFJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0dGhpcy54bWxYTUxIdHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLm9uUmVhZHlTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpO1xuXG5cdHRoaXMueG1sWE1MSHR0cFJlcXVlc3Qub3BlbihcIlBPU1RcIiwgdGhpcy51cmwsIHRydWUpO1xuXHR0aGlzLnhtbFhNTEh0dHBSZXF1ZXN0LnNlbmQodGhpcy5mb3JtRGF0YSk7XG5cblx0cmV0dXJuIHRoaXMudGhlbmFibGU7XG59XG5cbi8qKlxuICogUmVhZHkgc3RhdGUgY2hhbmdlLlxuICogQG9uUmVhZHlTdGF0ZUNoYW5nZVxuICovXG5IdHRwUmVxdWVzdC5wcm90b3R5cGUub25SZWFkeVN0YXRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKFwicmVhZHkgc3RhdGUgY2hhbmdlOiBcIiArIHRoaXMueG1sWE1MSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSk7XG5cblx0aWYgKHRoaXMueG1sWE1MSHR0cFJlcXVlc3QucmVhZHlTdGF0ZSAhPSA0KVxuXHRcdHJldHVybjtcblxuXHRpZiAodGhpcy54bWxYTUxIdHRwUmVxdWVzdC5zdGF0dXMgIT0gMjAwKSB7XG5cdFx0dGhpcy50aGVuYWJsZS5yZWplY3QoXCJFcnJvciFcIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHJlc3VsdCA9IHRoaXMueG1sWE1MSHR0cFJlcXVlc3QucmVzcG9uc2U7XG5cblx0c3dpdGNoICh0aGlzLmRlY29kZVJlc3BvbnNlKSB7XG5cdFx0Y2FzZSBcImpzb25cIjpcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0dGhpcy50aGVuYWJsZS5yZWplY3QoXCJVbmFibGUgdG8gcGFyc2UgcmVzcG9uc2U6IFwiICsgdGhpcy54bWxYTUxIdHRwUmVxdWVzdC5yZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0dGhpcy50aGVuYWJsZS5yZXNvbHZlKHJlc3VsdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSHR0cFJlcXVlc3Q7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIExpc3RJdGVtID0gcmVxdWlyZShcIi4vTGlzdEl0ZW1cIik7XG52YXIgSW5wdXRWaWV3ID0gcmVxdWlyZShcIi4vSW5wdXRWaWV3XCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuXG5mdW5jdGlvbiBDb2xvckl0ZW0oaWQsIHZhbHVlKSB7XG5cdExpc3RJdGVtLmNhbGwodGhpcywgaWQpO1xuXG5cdHRoaXMuaWQgPSBpZDtcblxuXHR0aGlzLmNvbG9yVmlldyA9IG5ldyBWaWV3KFZpZXcuRGl2LCBcImNvbG9yLXZpZXdcIik7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5jb2xvclZpZXcpO1xuXHR0aGlzLmNvbG9yVmlldy53aWR0aCA9IDEwMDtcblx0dGhpcy5jb2xvclZpZXcuaGVpZ2h0ID0gMTAwO1xuXHR0aGlzLmNvbG9yVmlldy5iYWNrZ3JvdW5kID0gdmFsdWUgPyB2YWx1ZSA6IFwiIzAwMDAwMFwiO1xuXG5cdHRoaXMuY29sb3JWaWV3LnkgPSB0aGlzLmhlYWRlci5oZWlnaHQ7XG5cblx0dGhpcy5pbnB1dCA9IG5ldyBJbnB1dFZpZXcoKTtcblx0dGhpcy5hZGRDaGlsZCh0aGlzLmlucHV0KTtcblxuXHR0aGlzLmlucHV0LnNldFZhbHVlKHZhbHVlID8gdmFsdWUgOiBcIiMwMDAwMDBcIik7XG5cblx0dGhpcy5pbnB1dC54ID0gdGhpcy5jb2xvclZpZXcud2lkdGg7XG5cdHRoaXMuaW5wdXQueSA9IHRoaXMuY29sb3JWaWV3LnkgKyAodGhpcy5jb2xvclZpZXcuaGVpZ2h0IC0gdGhpcy5pbnB1dC5oZWlnaHQpKjAuNTtcblxuXHR0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoSW5wdXRWaWV3LkNoYW5nZWQsIHRoaXMub25DaGFuZ2VkLCB0aGlzKTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoQ29sb3JJdGVtLCBMaXN0SXRlbSk7XG5FdmVudERpc3BhdGNoZXIuaW5pdChDb2xvckl0ZW0pO1xuXG5cbkNvbG9ySXRlbS5DaGFuZ2VkID0gXCJDaGFuZ2VkXCI7XG5cbkNvbG9ySXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHRMaXN0SXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0LmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCk7XG5cdFxuXHR0aGlzLmNvbG9yVmlldy53aWR0aCA9IHdpZHRoICogMC41O1xuXHR0aGlzLmNvbG9yVmlldy5oZWlnaHQgPSBoZWlnaHQgLSB0aGlzLmhlYWRlci5oZWlnaHQ7XG5cblx0dGhpcy5pbnB1dC51cGRhdGVMYXlvdXQod2lkdGggKiAwLjUsIGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCk7XG5cblx0dGhpcy5pbnB1dC54ID0gd2lkdGggKiAwLjU7XG5cdHRoaXMuaW5wdXQueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0XG5cdHRoaXMuY29sb3JWaWV3LnkgPSB0aGlzLmhlYWRlci5oZWlnaHQ7XG59O1xuXG5Db2xvckl0ZW0ucHJvdG90eXBlLm9uQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmNvbG9yVmlldy5iYWNrZ3JvdW5kID0gdGhpcy5pbnB1dC5nZXRWYWx1ZSgpO1xuXHR0aGlzLnRyaWdnZXIoQ29sb3JJdGVtLkNoYW5nZWQsIHRoaXMpO1xufTtcblxuQ29sb3JJdGVtLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5pbnB1dC5nZXRWYWx1ZSgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvckl0ZW07IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcblxuZnVuY3Rpb24gRWRpdG9yQ29udHJvbGxlclZpZXcoKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJFZGl0b3JDb250cm9sbGVyVmlld1wiKTtcblxuXHR0aGlzLm1lbnVWaWV3ID0gbnVsbDtcblx0dGhpcy5lZGl0b3JzID0gbmV3IEFycmF5KCk7XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKEVkaXRvckNvbnRyb2xsZXJWaWV3LCBWaWV3KTtcblxuRWRpdG9yQ29udHJvbGxlclZpZXcucHJvdG90eXBlLnNldE1lbnVWaWV3ID0gZnVuY3Rpb24obWVudVZpZXcpIHtcblx0dGhpcy5tZW51VmlldyA9IG1lbnVWaWV3O1xuXHR0aGlzLmFkZENoaWxkKHRoaXMubWVudVZpZXcpO1xufTtcblxuRWRpdG9yQ29udHJvbGxlclZpZXcucHJvdG90eXBlLmFkZEVkaXRvciA9IGZ1bmN0aW9uKGVkaXRvcikge1xuXHR0aGlzLmVkaXRvcnMucHVzaChlZGl0b3IpO1xuXHR0aGlzLmFkZENoaWxkKGVkaXRvcik7XG59O1xuXG5FZGl0b3JDb250cm9sbGVyVmlldy5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXG5cdHRoaXMubWVudVZpZXcudXBkYXRlTGF5b3V0KHdpZHRoLCB0aGlzLm1lbnVWaWV3LmhlaWdodCk7XG5cblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuZWRpdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuZWRpdG9yc1tpXS54ID0gMDtcblx0XHR0aGlzLmVkaXRvcnNbaV0ueSA9IHRoaXMubWVudVZpZXcuaGVpZ2h0O1xuXHRcdGlmKHRoaXMuZWRpdG9yc1tpXS5pc1Zpc2libGUoKSkge1xuXHRcdFx0dGhpcy5lZGl0b3JzW2ldLnVwZGF0ZUxheW91dCh3aWR0aCwgaGVpZ2h0IC0gdGhpcy5tZW51Vmlldy5oZWlnaHQpO1xuXHRcdH1cblx0fVxuXHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3JDb250cm9sbGVyVmlldztcbiIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIEVkaXRvclZpZXcoKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJFZGl0b3JWaWV3XCIpO1xuXG5cdHRoaXMuaXRlbXMgPSBuZXcgQXJyYXkoKTtcblxuXHR0aGlzLmhpZGUoKTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoRWRpdG9yVmlldywgVmlldyk7XG5cbkVkaXRvclZpZXcucHJvdG90eXBlLmFkZEl0ZW0gPSBmdW5jdGlvbihpdGVtKSB7XG5cdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcblx0dGhpcy5hZGRDaGlsZChpdGVtKTtcbn07XG5cbkVkaXRvclZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dmFyIHkgPSAwO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuaXRlbXNbaV0ueSA9IHk7XG5cdFx0dGhpcy5pdGVtc1tpXS51cGRhdGVMYXlvdXQod2lkdGgsIDEzMCk7XG5cdFx0eSArPSAxMzA7XG5cdH1cblx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR0aGlzLmhlaWdodCA9IGhlaWdodDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yVmlldztcbiIsInZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciBUYXJnZXRQYW5lVmlldyA9IHJlcXVpcmUoXCIuL1RhcmdldFBhbmVWaWV3XCIpO1xudmFyIEhlYWRlclZpZXcgPSByZXF1aXJlKFwiLi9IZWFkZXJWaWV3XCIpO1xudmFyIFJlc291cmNlUGFuZVZpZXcgPSByZXF1aXJlKFwiLi9SZXNvdXJjZVBhbmVWaWV3XCIpO1xuXG4vKipcbiAqIE1haW4gY2xpZW50IHZpZXcuXG4gKiBAY2xhc3MgRmlkZGxlQ2xpZW50Vmlld1xuICovXG5mdW5jdGlvbiBGaWRkbGVDbGllbnRWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnRhcmdldFBhbmVWaWV3ID0gbmV3IFRhcmdldFBhbmVWaWV3KCk7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy50YXJnZXRQYW5lVmlldyk7XG5cblx0dGhpcy5oZWFkZXJWaWV3ID0gbmV3IEhlYWRlclZpZXcoKTtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmhlYWRlclZpZXcpO1xuXG5cdHRoaXMucmVzb3VyY2VQYW5lVmlldyA9IG5ldyBSZXNvdXJjZVBhbmVWaWV3KCk7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5yZXNvdXJjZVBhbmVWaWV3KTtcbn1cblxuaW5oZXJpdHMoRmlkZGxlQ2xpZW50VmlldywgeG5vZGUuRGl2KTtcblxuLyoqXG4gKiBHZXQgdGFyZ2V0IHBhbmUgdmlldy5cbiAqIEBtZXRob2QgZ2V0VGFyZ2V0UGFuZVZpZXdcbiAqL1xuRmlkZGxlQ2xpZW50Vmlldy5wcm90b3R5cGUuZ2V0VGFyZ2V0UGFuZVZpZXcgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMudGFyZ2V0UGFuZVZpZXc7XG59XG5cbi8qKlxuICogR2V0IGhlYWRlciB2aWV3LlxuICogQG1ldGhvZCBnZXRIZWFkZXJWaWV3XG4gKi9cbkZpZGRsZUNsaWVudFZpZXcucHJvdG90eXBlLmdldEhlYWRlclZpZXcgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuaGFkZXJWaWV3O1xufVxuXG4vKipcbiAqIEdldCByZXNvdXJjZSBwYW5lIHZpZXcuXG4gKiBAbWV0aG9kIGdldFJlc291cmNlUGFuZVZpZXdcbiAqL1xuRmlkZGxlQ2xpZW50Vmlldy5wcm90b3R5cGUuZ2V0UmVzb3VyY2VQYW5lVmlldyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5yZXNvdXJjZVBhbmVWaWV3O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZGRsZUNsaWVudFZpZXc7IiwidmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xuXG4vKipcbiAqIEhlYWRlciB2aWV3LlxuICogQGNsYXNzIEhlYWRlclZpZXdcbiAqL1xuZnVuY3Rpb24gSGVhZGVyVmlldygpIHtcblx0eG5vZGUuRGl2LmNhbGwodGhpcyk7XG5cblx0dGhpcy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0dGhpcy5zdHlsZS50b3AgPSBcIjBcIjtcblx0dGhpcy5zdHlsZS5sZWZ0ID0gXCIwXCI7XG5cdHRoaXMuc3R5bGUucmlnaHQgPSBcIjBcIjtcblx0dGhpcy5zdHlsZS5oZWlnaHQgPSBcIjUwcHhcIjtcblx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjZThlOGU4XCI7XG5cdHRoaXMuc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgI2UwZTBlMFwiXG5cdHRoaXMuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuXG5cdHRoaXMuaGVhZGVyID0gbmV3IHhub2RlLkgxKCk7XG5cdHRoaXMuaGVhZGVyLmNsYXNzTmFtZSA9IFwidWkgaGVhZGVyXCI7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5oZWFkZXIpO1xuXG5cdHRoaXMuaGVhZGVyLmlubmVySFRNTCA9IFwiUmVzb3VyY2UgRmlkZGxlXCI7XG59XG5cbmluaGVyaXRzKEhlYWRlclZpZXcsIHhub2RlLkRpdik7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyVmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuXG5mdW5jdGlvbiBJRnJhbWVWaWV3KCkge1xuXHRWaWV3LmNhbGwodGhpcywgVmlldy5JRnJhbWUsIFwiSUZyYW1lVmlld1wiKTtcblxuXHR0aGlzLmdldEVsZW1lbnQoKS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXHR0aGlzLmdldEVsZW1lbnQoKS5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0dGhpcy51cmwgPSBcIlwiO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhJRnJhbWVWaWV3LCBWaWV3KTtcblxuSUZyYW1lVmlldy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xufTtcblxuSUZyYW1lVmlldy5wcm90b3R5cGUuc2V0VXJsID0gZnVuY3Rpb24odGFyZ2V0VVJMKSB7XG5cdHRoaXMudXJsID0gdGFyZ2V0VVJMO1xuXHR0aGlzLnJlbG9hZCgpO1xufTtcblxuXG5JRnJhbWVWaWV3LnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5nZXRFbGVtZW50KCkuc2V0QXR0cmlidXRlKFwic3JjXCIsIHRoaXMudXJsICsgXCImX19fX3RpbWVzdGFtcD1cIitEYXRlLm5vdygpKTtcbn07XG5cbklGcmFtZVZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0XG5cdHRoaXMud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IElGcmFtZVZpZXc7IiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vdXRpbHMvRXZlbnREaXNwYXRjaGVyXCIpO1xudmFyIExpc3RJdGVtID0gcmVxdWlyZShcIi4vTGlzdEl0ZW1cIik7XG52YXIgU2VsZWN0QnV0dG9uID0gcmVxdWlyZShcIi4vU2VsZWN0QnV0dG9uXCIpO1xudmFyIEltYWdlVmlldyA9IHJlcXVpcmUoXCIuL0ltYWdlVmlld1wiKTtcbnZhciBSZXNvdXJjZXMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbGliL1Jlc291cmNlc1wiKTtcblxuZnVuY3Rpb24gSW1hZ2VJdGVtKGJhc2VQYXRoLCBuYW1lLCB0ZXh0dXJlKSB7XG5cdExpc3RJdGVtLmNhbGwodGhpcywgbmFtZSk7XG5cblx0dGhpcy5uYW1lID0gbmFtZTtcblxuXHR0aGlzLmltYWdlID0gbmV3IEltYWdlVmlldyhiYXNlUGF0aCwgdGV4dHVyZSk7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5pbWFnZSk7XG5cblx0dGhpcy5pbWFnZS55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXG5cdHRoaXMuYnV0dG9uID0gbmV3IFNlbGVjdEJ1dHRvbihcIlVwbG9hZCBuZXcgaW1hZ2VcIik7XG5cdHRoaXMuYWRkQ2hpbGQodGhpcy5idXR0b24pO1xuXG5cdHRoaXMuYnV0dG9uLm9uKFNlbGVjdEJ1dHRvbi5DaGFuZ2UsIHRoaXMub25GaWxlc1NlbGVjdGVkLCB0aGlzKTtcblx0XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKEltYWdlSXRlbSwgTGlzdEl0ZW0pO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoSW1hZ2VJdGVtKTtcblxuSW1hZ2VJdGVtLlNlbGVjdGVkID0gXCJTZWxlY3RlZFwiO1xuXG5JbWFnZUl0ZW0ucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbih0ZXh0dXJlKSB7XG5cdHRoaXMuaW1hZ2Uuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcbn07XG5cbkltYWdlSXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHRMaXN0SXRlbS5wcm90b3R5cGUudXBkYXRlTGF5b3V0LmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCk7XG5cblx0dGhpcy5pbWFnZS51cGRhdGVMYXlvdXQod2lkdGggKiAwLjUsIGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCk7XG5cdHRoaXMuaW1hZ2UueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0XG5cdHRoaXMuYnV0dG9uLnkgPSB0aGlzLmhlYWRlci5oZWlnaHQgKyAoKGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCkgLSB0aGlzLmJ1dHRvbi5oZWlnaHQpKjAuNTtcblx0dGhpcy5idXR0b24ueCA9IHdpZHRoICogMC41O1xufTtcblxuXG5JbWFnZUl0ZW0ucHJvdG90eXBlLm9uRmlsZXNTZWxlY3RlZCA9IGZ1bmN0aW9uKGZpbGVzKSB7XG5cdHRoaXMuZmlsZXMgPSBmaWxlcztcblx0XG5cdHRoaXMudHJpZ2dlcihJbWFnZUl0ZW0uU2VsZWN0ZWQsIHRoaXMpO1xufTtcblxuSW1hZ2VJdGVtLnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMuZmlsZXM7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VJdGVtOyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIEltYWdlVmlldyhiYXNlUGF0aCwgb2JqKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJJbWFnZVZpZXdcIik7XG5cblx0dGhpcy5pbWFnZU9iamVjdCA9IG51bGw7XG5cdHRoaXMubm9JbWFnZSA9IG51bGw7XG5cdGlmKG9iaiAhPSBudWxsKSB7XG5cdFx0dGhpcy5nZXRFbGVtZW50KCkuYXBwZW5kQ2hpbGQob2JqKTtcdFx0XG5cdFx0dGhpcy5pbWFnZU9iamVjdCA9IG9iajtcblx0fVxuXHRlbHNlIHtcblx0XHR0aGlzLmltYWdlT2JqZWN0ID0gbmV3IEltYWdlKCk7XG5cdFx0dGhpcy5pbWFnZU9iamVjdC5zcmMgPSBiYXNlUGF0aCArIFwiaW1nL25vX2ltYWdlLmpwZWdcIjtcblx0XHR0aGlzLmdldEVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLmltYWdlT2JqZWN0KTtcblx0XHQvL3RoaXMuaW1hZ2VPYmplY3QgPSBpbWc7XG5cdH1cbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoSW1hZ2VWaWV3LCBWaWV3KTtcblxuSW1hZ2VWaWV3LnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24odGV4dHVyZSkge1xuXHR0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmVDaGlsZCh0aGlzLmltYWdlT2JqZWN0KTtcblx0dGhpcy5pbWFnZU9iamVjdCA9IHRleHR1cmU7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLmFwcGVuZENoaWxkKHRleHR1cmUpO1xuXHR0aGlzLnVwZGF0ZUxheW91dCh0aGlzLncsIHRoaXMuaCk7XG59O1xuXG5JbWFnZVZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dGhpcy53ID0gd2lkdGg7XG5cdHRoaXMuaCA9IGhlaWdodDtcblx0dmFyIHcgPSB0aGlzLmltYWdlT2JqZWN0LmNsaWVudFdpZHRoID09IDAgPyB0aGlzLmltYWdlT2JqZWN0LndpZHRoIDogdGhpcy5pbWFnZU9iamVjdC5jbGllbnRXaWR0aDtcblx0dmFyIGggPSB0aGlzLmltYWdlT2JqZWN0LmNsaWVudEhlaWdodCA9PSAwID8gdGhpcy5pbWFnZU9iamVjdC5oZWlnaHQgOiB0aGlzLmltYWdlT2JqZWN0LmNsaWVudEhlaWdodDtcblx0aWYoKHcgPT0gMCkgfHwgKGggPT0gMCkpIHtcblx0XHR0aGlzLmltYWdlT2JqZWN0Lm9ubG9hZCA9IHRoaXMudXBkYXRlTGF5b3V0LmJpbmQodGhpcywgd2lkdGgsIGhlaWdodCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHdkaWZmID0gMDtcblx0dmFyIGhkaWZmID0gMDtcblx0aWYod2lkdGggPCB3KSB7XG5cdFx0d2RpZmYgPSBNYXRoLmFicyh3aWR0aCAtIHcpO1xuXHR9XG5cdGlmKGhlaWdodCA8IGgpIHtcblx0XHRoZGlmZiA9IE1hdGguYWJzKGhlaWdodCAtIGgpO1xuXHR9XG5cdGlmKChoZGlmZiA9PSAwKSAmJiAod2RpZmYgPT0gMCkpIHtcblx0XHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHRcdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUubGVmdCA9ICh3aWR0aCAtIHcpKjAuNSArIFwicHhcIjtcblx0XHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnRvcCA9IChoZWlnaHQgLSBoKSowLjUgKyBcInB4XCI7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHNjYWxlID0gMTtcblxuXHRzY2FsZSA9IGhlaWdodCAvIGg7XG5cdGlmKHNjYWxlKncgPiB3aWR0aCkge1xuXHRcdHNjYWxlID0gd2lkdGggLyB3O1xuXHR9XG5cdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUubXNUcmFuc2Zvcm0gPSBcInNjYWxlKFwiK3NjYWxlK1wiKVwiO1xuXHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoXCIrc2NhbGUrXCIpXCI7XG5cdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJzY2FsZShcIitzY2FsZStcIilcIjtcblxuXHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLmltYWdlT2JqZWN0LnN0eWxlLmxlZnQgPSAod2lkdGggLSB3KSowLjUgKyBcInB4XCI7XG5cdHRoaXMuaW1hZ2VPYmplY3Quc3R5bGUudG9wID0gKGhlaWdodCAtIGgpKjAuNSArIFwicHhcIjtcblxuXHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlVmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIElucHV0VmlldygpIHtcblx0Vmlldy5jYWxsKHRoaXMsIFZpZXcuSW5wdXQsIFwiSW5wdXRWaWV3XCIpO1xuXG5cdHRoaXMuZ2V0RWxlbWVudCgpLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuXG5cdHRoaXMuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMub25CbHVyLmJpbmQodGhpcykpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhJbnB1dFZpZXcsIFZpZXcpO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoSW5wdXRWaWV3KTtcblxuSW5wdXRWaWV3LkNoYW5nZWQgPSBcIkNoYW5nZWRcIjtcblxuSW5wdXRWaWV3LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5nZXRFbGVtZW50KCkudmFsdWU7XG59O1xuXG5JbnB1dFZpZXcucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy5nZXRFbGVtZW50KCkudmFsdWUgPSB2YWx1ZTtcbn07XG5cbklucHV0Vmlldy5wcm90b3R5cGUub25CbHVyID0gZnVuY3Rpb24oKSB7XG5cdHRoaXMudHJpZ2dlcihJbnB1dFZpZXcuQ2hhbmdlZCwgdGhpcyk7XG59O1xuXG5JbnB1dFZpZXcucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR0aGlzLmhlaWdodCA9IGhlaWdodDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRWaWV3OyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG52YXIgVGV4dCA9IHJlcXVpcmUoXCIuL1RleHRcIik7XG5cbmZ1bmN0aW9uIExpc3RJdGVtKG5hbWUpIHtcblx0Vmlldy5jYWxsKHRoaXMsIFZpZXcuRGl2LCBcIkxpc3RJdGVtXCIpO1xuXG5cdHRoaXMuaGVhZGVyID0gbmV3IFZpZXcoKTtcblx0dGhpcy5hZGRDaGlsZCh0aGlzLmhlYWRlcik7XG5cdHRoaXMuaGVhZGVyLmJhY2tncm91bmQgPSBcIiNBQUFBQUFcIjtcblxuXG5cdHRoaXMuaGVhZGVyVGV4dCA9IG5ldyBUZXh0KG5hbWUpO1xuXHR0aGlzLmhlYWRlci5hZGRDaGlsZCh0aGlzLmhlYWRlclRleHQpO1xuXG5cdC8vdGhpcy50ZXh0LndpZHRoID0gNDAwO1xuXG5cbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoTGlzdEl0ZW0sIFZpZXcpO1xuXG5cblxuTGlzdEl0ZW0ucHJvdG90eXBlLnVwZGF0ZUxheW91dCA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcblx0dGhpcy5oZWFkZXJUZXh0LndpZHRoID0gd2lkdGg7XG5cdHRoaXMuaGVhZGVyVGV4dC5oZWlnaHQgPSAzMDtcblx0dGhpcy5oZWFkZXIud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWFkZXIuaGVpZ2h0ID0gMzA7XG5cdHRoaXMud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RJdGVtOyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcIi4uL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcbnZhciBUZXh0ID0gcmVxdWlyZShcIi4vVGV4dFwiKTtcblxuZnVuY3Rpb24gTWVudUl0ZW0oaWQsIHN0cmluZykge1xuXHRWaWV3LmNhbGwodGhpcywgVmlldy5EaXYsIFwiTWVudUl0ZW1cIik7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSk7XG5cblx0dGhpcy5pZCA9IGlkO1xuXHR0aGlzLnN0cmluZyA9IHN0cmluZztcblx0dGhpcy50ZXh0ID0gbmV3IFRleHQodGhpcy5zdHJpbmcpO1xuXG5cdHRoaXMuYWRkQ2hpbGQodGhpcy50ZXh0KTtcblxuXHR0aGlzLnNldFNlbGVjdGVkKGZhbHNlKTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoTWVudUl0ZW0sIFZpZXcpO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoTWVudUl0ZW0pO1xuXG5NZW51SXRlbS5DbGljayA9IFwiQ2xpY2tcIjtcblxuTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuXHR0aGlzLnRyaWdnZXIoTWVudUl0ZW0uQ2xpY2ssIHRoaXMpO1xufTtcblxuTWVudUl0ZW0ucHJvdG90eXBlLnNldFNlbGVjdGVkID0gZnVuY3Rpb24oc2VsZWN0ZWQpIHtcblx0dGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuXG5cdGlmKHRoaXMuc2VsZWN0ZWQpIHtcblx0XHR0aGlzLmJhY2tncm91bmQgPSBcIiNGRjAwMDBcIjtcblx0XHR0aGlzLnRleHQuY29sb3IgPSBcIiMwMDAwRkZcIlxuXHR9XG5cdGVsc2Uge1xuXHRcdHRoaXMuYmFja2dyb3VuZCA9IFwiIzAwMDAwMFwiO1xuXHRcdHRoaXMudGV4dC5jb2xvciA9IFwiI0ZGRkZGRlwiXG5cdH1cbn07XG5cbk1lbnVJdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdHRoaXMudGV4dC51cGRhdGVMYXlvdXQod2lkdGgsIGhlaWdodCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1lbnVJdGVtO1xuIiwidmFyIENsYXNzVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2xhc3NVdGlsc1wiKTtcbnZhciBWaWV3ID0gcmVxdWlyZShcIi4vVmlld1wiKTtcblxuZnVuY3Rpb24gTWVudVZpZXcoKSB7XG5cdFZpZXcuY2FsbCh0aGlzLCBWaWV3LkRpdiwgXCJNZW51Vmlld1wiKTtcblx0dGhpcy5oZWlnaHQgPSAxMDA7XG5cdHRoaXMuaXRlbXMgPSBbXTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoTWVudVZpZXcsIFZpZXcpO1xuXG5NZW51Vmlldy5wcm90b3R5cGUuc2V0SXRlbXMgPSBmdW5jdGlvbihpdGVtcykge1xuXHR2YXIgeCA9IDA7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gaXRlbXNbaV07XG5cdFx0dGhpcy5hZGRDaGlsZChpdGVtKTtcblx0XHRpdGVtLnggPSB4O1xuXHRcdHggKz0gaXRlbS53aWR0aDtcblx0fVxuXHR0aGlzLml0ZW1zID0gaXRlbXM7XG59O1xuXG5NZW51Vmlldy5wcm90b3R5cGUuYWRkSXRlbSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0dmFyIHggPSAwO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdHRoaXMuaXRlbXNbaV0ueCA9IHg7XG5cdFx0eCArPSB0aGlzLml0ZW1zW2ldLndpZHRoO1xuXHR9XG5cdHRoaXMuYWRkQ2hpbGQoaXRlbSk7XG5cdGl0ZW0ueCA9IHg7XG5cdHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbn07XG5cbk1lbnVWaWV3LnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdHZhciB4ID0gMDtcblx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHRoaXMuaXRlbXNbaV07XG5cdFx0aXRlbS54ID0geDtcblx0XHRpdGVtLnVwZGF0ZUxheW91dCh3aWR0aCAvIHRoaXMuaXRlbXMubGVuZ3RoLCBoZWlnaHQpO1xuXHRcdHggKz0gaXRlbS53aWR0aDtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBNZW51VmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgTGlzdEl0ZW0gPSByZXF1aXJlKFwiLi9MaXN0SXRlbVwiKTtcbnZhciBJbnB1dFZpZXcgPSByZXF1aXJlKFwiLi9JbnB1dFZpZXdcIik7XG52YXIgVGV4dCA9IHJlcXVpcmUoXCIuL1RleHRcIik7XG5cbmZ1bmN0aW9uIFBvc2l0aW9uSXRlbShpZCwgdmFsdWVzKSB7XG5cdExpc3RJdGVtLmNhbGwodGhpcywgaWQpO1xuXG5cdHRoaXMuaWQgPSBpZDtcblxuXG5cdHRoaXMudGV4dFggPSBuZXcgVGV4dChcIng6XCIpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMudGV4dFgpXG5cdHRoaXMuaW5wdXRYID0gbmV3IElucHV0VmlldygpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMuaW5wdXRYKTtcblx0dGhpcy5pbnB1dFguc2V0VmFsdWUodmFsdWVzID8gdmFsdWVzWzBdIDogXCIwXCIpO1xuXG5cdHRoaXMudGV4dFkgPSBuZXcgVGV4dChcInk6XCIpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMudGV4dFkpXG5cdHRoaXMuaW5wdXRZID0gbmV3IElucHV0VmlldygpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMuaW5wdXRZKTtcblx0dGhpcy5pbnB1dFkuc2V0VmFsdWUodmFsdWVzID8gdmFsdWVzWzFdIDogXCIwXCIpO1xuXG5cdHRoaXMuaW5wdXRYLmFkZEV2ZW50TGlzdGVuZXIoSW5wdXRWaWV3LkNoYW5nZWQsIHRoaXMub25DaGFuZ2VkLCB0aGlzKTtcblx0dGhpcy5pbnB1dFkuYWRkRXZlbnRMaXN0ZW5lcihJbnB1dFZpZXcuQ2hhbmdlZCwgdGhpcy5vbkNoYW5nZWQsIHRoaXMpO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhQb3NpdGlvbkl0ZW0sIExpc3RJdGVtKTtcbkV2ZW50RGlzcGF0Y2hlci5pbml0KFBvc2l0aW9uSXRlbSk7XG5cblxuUG9zaXRpb25JdGVtLkNoYW5nZWQgPSBcIkNoYW5nZWRcIjtcblxuUG9zaXRpb25JdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdExpc3RJdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KTtcblx0dGhpcy50ZXh0WC51cGRhdGVMYXlvdXQod2lkdGgqMC4yNSwgaGVpZ2h0IC0gdGhpcy5oZWFkZXIuaGVpZ2h0KTtcblx0dGhpcy50ZXh0WS51cGRhdGVMYXlvdXQod2lkdGgqMC4yNSwgaGVpZ2h0IC0gdGhpcy5oZWFkZXIuaGVpZ2h0KTtcblx0dGhpcy5pbnB1dFgudXBkYXRlTGF5b3V0KHdpZHRoKjAuMjUsIGhlaWdodCAtIHRoaXMuaGVhZGVyLmhlaWdodCk7XG5cdHRoaXMuaW5wdXRZLnVwZGF0ZUxheW91dCh3aWR0aCowLjI1LCBoZWlnaHQgLSB0aGlzLmhlYWRlci5oZWlnaHQpO1xuXG5cdHRoaXMudGV4dFgueCA9IDA7IFxuXHR0aGlzLmlucHV0WC54ID0gd2lkdGgqMC4yNTtcblxuXHR0aGlzLnRleHRZLnggPSB3aWR0aCowLjU7XG5cdHRoaXMuaW5wdXRZLnggPSB3aWR0aCowLjc1O1xuXG5cdHRoaXMudGV4dFgueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0dGhpcy50ZXh0WS55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXHR0aGlzLmlucHV0WC55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXHR0aGlzLmlucHV0WS55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xufTtcblxuUG9zaXRpb25JdGVtLnByb3RvdHlwZS5vbkNoYW5nZWQgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50cmlnZ2VyKFBvc2l0aW9uSXRlbS5DaGFuZ2VkLCB0aGlzKTtcbn07XG5cblBvc2l0aW9uSXRlbS5wcm90b3R5cGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiBbdGhpcy5pbnB1dFguZ2V0VmFsdWUoKSwgdGhpcy5pbnB1dFkuZ2V0VmFsdWUoKV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc2l0aW9uSXRlbTsiLCJ2YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcInlhZWRcIik7XG52YXIgUmVzb3VyY2VJdGVtVmlldyA9IHJlcXVpcmUoXCIuL1Jlc291cmNlSXRlbVZpZXdcIik7XG5cbi8qKlxuICogVGhlIHZpZXcgb2Ygb25lIHJlc291cmNlIGNhdGVnb3J5LlxuICogQGNsYXNzIFJlc291cmNlQ2F0ZWdvcnlWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlQ2F0ZWdvcnlWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnRpdGxlID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcblx0dGhpcy50aXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vblRpdGxlQ2xpY2suYmluZCh0aGlzKSk7XG5cblx0dmFyIGljb24gPSBuZXcgeG5vZGUuRGl2KCk7XG5cdGljb24uY2xhc3NOYW1lID0gXCJkcm9wZG93biBpY29uXCI7XG5cdHRoaXMudGl0bGUuYXBwZW5kQ2hpbGQoaWNvbik7XG5cblx0dGhpcy50aXRsZVNwYW4gPSBuZXcgeG5vZGUuU3BhbigpO1xuXHR0aGlzLnRpdGxlLmFwcGVuZENoaWxkKHRoaXMudGl0bGVTcGFuKTtcblxuXHR0aGlzLmNvbnRlbnQgPSBuZXcgeG5vZGUuRGl2KCk7XG5cdHRoaXMuY29udGVudC5jbGFzc05hbWUgPSBcImNvbnRlbnRcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuXG5cdHRoaXMuZGVzY3JpcHRpb25QID0gbmV3IHhub2RlLlAoKTtcblx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb25QKTtcblxuXHR0aGlzLml0ZW1UYWJsZSA9IG5ldyB4bm9kZS5UYWJsZSgpO1xuXHR0aGlzLml0ZW1UYWJsZS5jbGFzc05hbWUgPSBcInVpIHRhYmxlIHVuc3RhY2thYmxlIGRlZmluaXRpb25cIjtcblx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuaXRlbVRhYmxlKTtcblxuXHR0aGlzLml0ZW1UYWJsZUJvZHkgPSBuZXcgeG5vZGUuVGJvZHkoKTtcblx0dGhpcy5pdGVtVGFibGUuYXBwZW5kQ2hpbGQodGhpcy5pdGVtVGFibGVCb2R5KTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VDYXRlZ29yeVZpZXcsIHhub2RlLkRpdik7XG5FdmVudERpc3BhdGNoZXIuaW5pdChSZXNvdXJjZUNhdGVnb3J5Vmlldyk7XG5cbi8qKlxuICogU2V0IHRoZSBsYWJlbC5cbiAqIEBtZXRob2Qgc2V0TGFiZWxcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeVZpZXcucHJvdG90eXBlLnNldExhYmVsID0gZnVuY3Rpb24obGFiZWwpIHtcblx0dGhpcy50aXRsZVNwYW4uaW5uZXJIVE1MID0gbGFiZWw7XG59XG5cbi8qKlxuICogU2hvdWxkIHRoaXMgYmUgYWN0aXZlIG9yIG5vdD9cbiAqIEBtZXRob2Qgc2V0QWN0aXZlXG4gKi9cblJlc291cmNlQ2F0ZWdvcnlWaWV3LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbihhY3RpdmUpIHtcblx0aWYgKGFjdGl2ZSkge1xuXHRcdHRoaXMudGl0bGUuY2xhc3NOYW1lID0gXCJhY3RpdmUgdGl0bGVcIjtcblx0XHR0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gXCJhY3RpdmUgY29udGVudFwiO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMudGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuXHRcdHRoaXMuY29udGVudC5jbGFzc05hbWUgPSBcImNvbnRlbnRcIjtcblx0fVxufVxuXG4vKipcbiAqIFRoZSBkZXNjcmlwdGlvbi5cbiAqIEBtZXRob2Qgc2V0RGVzY3JpcHRpb25cbiAqL1xuUmVzb3VyY2VDYXRlZ29yeVZpZXcucHJvdG90eXBlLnNldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcblx0dGhpcy5kZXNjcmlwdGlvblAuaW5uZXJIVE1MID0gZGVzY3JpcHRpb247XG59XG5cbi8qKlxuICogVGhlIHRpdGxlIHdhcyBjbGlja2VkLiBEaXNwYXRjaCBmdXJ0aGVyLlxuICogQG1ldGhvZCBvblRpdGxlQ2xpY2tcbiAqL1xuUmVzb3VyY2VDYXRlZ29yeVZpZXcucHJvdG90eXBlLm9uVGl0bGVDbGljayA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRyaWdnZXIoXCJ0aXRsZUNsaWNrXCIpO1xufVxuXG4vKipcbiAqIEdldCBob2xkZXIgZm9yIHRoZSBpdGVtcy5cbiAqIEBtZXRob2QgZ2V0SXRlbUhvbGRlclxuICovXG5SZXNvdXJjZUNhdGVnb3J5Vmlldy5wcm90b3R5cGUuZ2V0SXRlbUhvbGRlciA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5pdGVtVGFibGVCb2R5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlQ2F0ZWdvcnlWaWV3OyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBDb2xvclV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ29sb3JVdGlsXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCJ5YWVkXCIpO1xuXG4vKipcbiAqIFRoZSB2YWx1ZSB2aWV3IGZvciBhIGNvbG9yLiBUaGlzIHNob3VsZCBoYXZlIGEgY29sb3IgcGlja2VyIVxuICogQ2FuZGlkYXRlczpcbiAqICAgLSBodHRwOi8vd3d3LmRpZ2l0YWxtYWdpY3Byby5jb20valBpY2tlci9cbiAqIEBjbGFzcyBSZXNvdXJjZUNvbG9yVmFsdWVWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlQ29sb3JWYWx1ZVZpZXcoKSB7XG5cdHhub2RlLkRpdi5jYWxsKHRoaXMpO1xuXG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldyA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUuaGVpZ2h0ID0gXCIyNXB4XCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS53aWR0aCA9IFwiNzBweFwiO1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUudG9wID0gXCIxMnB4XCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjZmYwMDAwXCJcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNXB4XCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5wYWRkaW5nID0gXCIzcHhcIjtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjZTBlMGUwXCI7XG5cblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmRlZmF1bHRWYWx1ZVZpZXcpO1xuXG5cdHRoaXMudmFsdWVJbnB1dCA9IG5ldyB4bm9kZS5JbnB1dCgpO1xuXHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMudmFsdWVJbnB1dC5zdHlsZS5sZWZ0ID0gXCJjYWxjKDUwJSAtIDEwcHgpXCI7XG5cdHRoaXMudmFsdWVJbnB1dC5zdHlsZS5oZWlnaHQgPSBcIjI1cHhcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLndpZHRoID0gXCI3MHB4XCI7XG5cdHRoaXMudmFsdWVJbnB1dC5zdHlsZS50b3AgPSBcIjEycHhcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLmJhY2tncm91bmQgPSBcIiNmZjAwMDBcIlxuXHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLnBhZGRpbmcgPSBcIjNweFwiO1xuXHR0aGlzLnZhbHVlSW5wdXQuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNlMGUwZTBcIjtcblx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLm91dGxpbmUgPSAwO1xuXG5cdHRoaXMudmFsdWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRoaXMub25WYWx1ZUlucHV0Q2hhbmdlLmJpbmQodGhpcykpO1xuXG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy52YWx1ZUlucHV0KTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VDb2xvclZhbHVlVmlldywgeG5vZGUuRGl2KTtcbkV2ZW50RGlzcGF0Y2hlci5pbml0KFJlc291cmNlQ29sb3JWYWx1ZVZpZXcpO1xuXG4vKipcbiAqIFNldCBjb2xvciB2YWx1ZSBmb3IgZGVmYXVsdC5cbiAqIEBtZXRob2Qgc2V0RGVmYXVsdFZhbHVlXG4gKi9cblJlc291cmNlQ29sb3JWYWx1ZVZpZXcucHJvdG90eXBlLnNldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGRlZmF1bHRWYWx1ZSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LmlubmVySFRNTCA9IGRlZmF1bHRWYWx1ZTtcblx0dGhpcy51cGRhdGVCYWNrZ3JvdW5kQ29sb3JzKCk7XG59XG5cbi8qKlxuICogU2V0IGNvbG9yIHZhbHVlIGZvciBjdXJyZW50LlxuICogQG1ldGhvZCBzZXRWYWx1ZVxuICovXG5SZXNvdXJjZUNvbG9yVmFsdWVWaWV3LnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0dGhpcy52YWx1ZUlucHV0LnZhbHVlID0gdmFsdWU7XG5cdHRoaXMudXBkYXRlQmFja2dyb3VuZENvbG9ycygpO1xufVxuXG4vKipcbiAqIFZhbHVlIGlucHV0IGNoYW5nZS5cbiAqIEBtZXRob2Qgb25WYWx1ZUlucHV0Q2hhbmdlXG4gKi9cblJlc291cmNlQ29sb3JWYWx1ZVZpZXcucHJvdG90eXBlLm9uVmFsdWVJbnB1dENoYW5nZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlSW5wdXQudmFsdWU7XG5cdHRoaXMudXBkYXRlQmFja2dyb3VuZENvbG9ycygpO1xuXHR0aGlzLnRyaWdnZXIoXCJ2YWx1ZUNoYW5nZVwiKTtcbn1cblxuLyoqXG4gKiBHZXQgdmFsdWUuXG4gKiBAbWV0aG9kIGdldFZhbHVlXG4gKi9cblJlc291cmNlQ29sb3JWYWx1ZVZpZXcucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnZhbHVlO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBiYWNrZ3JvdW5kIGNvbG9ycy5cbiAqIEBtZXRob2QgdXBkYXRlQmFja2dyb3VuZENvbG9yc1xuICogQHByaXZhdGVcbiAqL1xuUmVzb3VyY2VDb2xvclZhbHVlVmlldy5wcm90b3R5cGUudXBkYXRlQmFja2dyb3VuZENvbG9ycyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUuYmFja2dyb3VuZCA9IHRoaXMuZGVmYXVsdFZhbHVlO1xuXG5cdHZhciBjID0gQ29sb3JVdGlsLnBhcnNlSFRNTENvbG9yKHRoaXMuZGVmYXVsdFZhbHVlKTtcblx0dmFyIGF2ZyA9IChjLnJlZCArIGMuZ3JlZW4gKyBjLmJsdWUpIC8gMztcblxuXHRpZiAoYXZnID4gMTI4KVxuXHRcdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiO1xuXG5cdGVsc2Vcblx0XHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuc3R5bGUuY29sb3IgPSBcIiNmZmZmZmZcIjtcblxuXHR2YXIgdXNlVmFsdWUgPSB0aGlzLnZhbHVlO1xuXG5cdGlmICghdXNlVmFsdWUgfHwgdXNlVmFsdWVbMF0gIT0gXCIjXCIpXG5cdFx0dXNlVmFsdWUgPSBcIiNmZmZmZmZcIlxuXG5cdHRoaXMudmFsdWVJbnB1dC5zdHlsZS5iYWNrZ3JvdW5kID0gdXNlVmFsdWU7XG5cblx0dmFyIGMgPSBDb2xvclV0aWwucGFyc2VIVE1MQ29sb3IodXNlVmFsdWUpO1xuXHR2YXIgYXZnID0gKGMucmVkICsgYy5ncmVlbiArIGMuYmx1ZSkgLyAzO1xuXG5cdGlmIChhdmcgPiAxMjgpXG5cdFx0dGhpcy52YWx1ZUlucHV0LnN0eWxlLmNvbG9yID0gXCIjMDAwMDAwXCI7XG5cblx0ZWxzZVxuXHRcdHRoaXMudmFsdWVJbnB1dC5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlQ29sb3JWYWx1ZVZpZXc7IiwidmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCJ5YWVkXCIpO1xudmFyIENvbnRleHREaXYgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ29udGV4dERpdlwiKTtcblxuLyoqXG4gKiBWaWV3IGFuZCBlZGl0IHRoZSB2YWx1ZSBvZiBhbiBpbWFnZS5cbiAqIEBtZXRob2QgUmVzb3VyY2VJbWFnZVZhbHVlVmlld1xuICovXG5mdW5jdGlvbiBSZXNvdXJjZUltYWdlVmFsdWVWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLmRlZmF1bHRJbWFnZSA9IG5ldyB4bm9kZS5JbWcoKTtcblx0dGhpcy5kZWZhdWx0SW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMuZGVmYXVsdEltYWdlLnN0eWxlLnRvcCA9IFwiMTBweFwiO1xuXHR0aGlzLmRlZmF1bHRJbWFnZS5zdHlsZS5oZWlnaHQgPSBcIjMwcHhcIjtcblx0dGhpcy5kZWZhdWx0SW1hZ2Uuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmRlZmF1bHRJbWFnZSk7XG5cblx0dGhpcy52YWx1ZUltYWdlID0gbmV3IHhub2RlLkltZygpO1xuXHR0aGlzLnZhbHVlSW1hZ2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMudmFsdWVJbWFnZS5zdHlsZS50b3AgPSBcIjEwcHhcIjtcblx0dGhpcy52YWx1ZUltYWdlLnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuXHR0aGlzLnZhbHVlSW1hZ2Uuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcblx0dGhpcy52YWx1ZUltYWdlLnN0eWxlLmxlZnQgPSBcImNhbGMoNTAlIC0gMTBweClcIjtcblx0dGhpcy52YWx1ZUltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCB0aGlzLm9uVmFsdWVJbWFnZUNvbnRleHRNZW51LmJpbmQodGhpcykpO1xuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMudmFsdWVJbWFnZSk7XG5cblx0dGhpcy51cGxvYWRJbnB1dCA9IG5ldyB4bm9kZS5JbnB1dCgpO1xuXHR0aGlzLnVwbG9hZElucHV0LnR5cGUgPSBcImZpbGVcIjtcblx0dGhpcy51cGxvYWRJbnB1dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0dGhpcy51cGxvYWRJbnB1dC5zdHlsZS56SW5kZXggPSAyO1xuXHR0aGlzLnVwbG9hZElucHV0LnN0eWxlLm9wYWNpdHkgPSAwO1xuXHR0aGlzLnVwbG9hZElucHV0LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdHRoaXMudXBsb2FkSW5wdXQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cdHRoaXMudXBsb2FkSW5wdXQub24oXCJjaGFuZ2VcIiwgdGhpcy5vblVwbG9hZElucHV0Q2hhbmdlLmJpbmQodGhpcykpO1xuXG5cdHRoaXMudXBsb2FkQnV0dG9uID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnVwbG9hZEJ1dHRvbi5jbGFzc05hbWUgPSBcInVpIGljb24gYnV0dG9uIG1pbmlcIjtcblxuXHR0aGlzLnVwbG9hZEljb24gPSBuZXcgeG5vZGUuSSgpO1xuXHR0aGlzLnVwbG9hZEljb24uY2xhc3NOYW1lID0gXCJ1cGxvYWQgaWNvblwiO1xuXHR0aGlzLnVwbG9hZEJ1dHRvbi5hcHBlbmRDaGlsZCh0aGlzLnVwbG9hZEljb24pO1xuXG5cdHRoaXMudXBsb2FkRGl2ID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnVwbG9hZERpdi5hcHBlbmRDaGlsZCh0aGlzLnVwbG9hZElucHV0KTtcblx0dGhpcy51cGxvYWREaXYuYXBwZW5kQ2hpbGQodGhpcy51cGxvYWRCdXR0b24pO1xuXHR0aGlzLnVwbG9hZERpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0dGhpcy51cGxvYWREaXYuc3R5bGUudG9wID0gXCIxM3B4XCI7XG5cdHRoaXMudXBsb2FkRGl2LnN0eWxlLnJpZ2h0ID0gXCIxMHB4XCI7XG5cdHRoaXMudXBsb2FkRGl2LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMudXBsb2FkRGl2KTtcblx0dGhpcy52YWx1ZSA9IG51bGw7XG59XG5cbmluaGVyaXRzKFJlc291cmNlSW1hZ2VWYWx1ZVZpZXcsIHhub2RlLkRpdik7XG5FdmVudERpc3BhdGNoZXIuaW5pdChSZXNvdXJjZUltYWdlVmFsdWVWaWV3KTtcblxuLyoqXG4gKiBTZXQgdXJsIG9mIHRoZSBpbWFnZSB0byBiZSBzaG93biBhcyBkZWZhdWx0XG4gKiBAbWV0aG9kIHNldERlZmF1bHRWYWx1ZVxuICovXG5SZXNvdXJjZUltYWdlVmFsdWVWaWV3LnByb3RvdHlwZS5zZXREZWZhdWx0VmFsdWUgPSBmdW5jdGlvbihkZWZhdWx0VmFsdWUpIHtcblx0Ly9jb25zb2xlLmxvZyhcInNldHRpbmcgZGVmYXVsdCB2YWx1ZTogXCIgKyBkZWZhdWx0VmFsdWUpO1xuXG5cdGlmIChkZWZhdWx0VmFsdWUpIHtcblx0XHR0aGlzLmRlZmF1bHRJbWFnZS5zcmMgPSBkZWZhdWx0VmFsdWU7XG5cdFx0dGhpcy5kZWZhdWx0SW1hZ2Uuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5kZWZhdWx0SW1hZ2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHR9XG59XG5cbi8qKlxuICogU2V0IHVybCBvZiBpbWFnZSB0byBhcHBlYXIgYXMgdmFsdWUuXG4gKiBAbWV0aG9kIHNldFZhbHVlXG4gKi9cblJlc291cmNlSW1hZ2VWYWx1ZVZpZXcucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmICh2YWx1ZSkge1xuXHRcdHRoaXMudmFsdWVJbWFnZS5zcmMgPSB2YWx1ZTtcblx0XHR0aGlzLnZhbHVlSW1hZ2Uuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy52YWx1ZUltYWdlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0fVxufVxuXG4vKipcbiAqIEZpbGUgdXBsb2FkIHNlbGVjdGVkLlxuICogQG1lb3RoZCBvblVwbG9hZElucHV0Q2hhbmdlXG4gKi9cblJlc291cmNlSW1hZ2VWYWx1ZVZpZXcucHJvdG90eXBlLm9uVXBsb2FkSW5wdXRDaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdGNvbnNvbGUubG9nKFwidXBsb2FkIGNoYW5nZTogXCIgKyB0aGlzLnVwbG9hZElucHV0LnZhbHVlKTtcblx0dGhpcy50cmlnZ2VyKFwiZmlsZVNlbGVjdFwiKTtcblx0dGhpcy51cGxvYWRJbnB1dC52YWx1ZSA9IFwiXCJcbn1cblxuLyoqXG4gKiBHZXQgc2VsZWN0ZWQgZmlsZSBmb3IgdXBsb2FkLlxuICogQG1ldGhvZCBnZXRTZWxlY3RlZEZpbGVcbiAqL1xuUmVzb3VyY2VJbWFnZVZhbHVlVmlldy5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRGaWxlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnVwbG9hZElucHV0LmZpbGVzWzBdO1xufVxuXG4vKipcbiAqIFJpZ2h0IGNsaWNrIG9uIHRoZSB2YWx1ZSBpbWFnZS5cbiAqIEBtZXRob2Qgb25WYWx1ZUltYWdlQ29udGV4dE1lbnVcbiAqL1xuUmVzb3VyY2VJbWFnZVZhbHVlVmlldy5wcm90b3R5cGUub25WYWx1ZUltYWdlQ29udGV4dE1lbnUgPSBmdW5jdGlvbihldikge1xuXHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdHZhciBtZW51ID0gbmV3IENvbnRleHREaXYoKTtcblx0bWVudS5jbGFzc05hbWUgPSBcInVpIHZlcnRpY2FsIG1lbnVcIjtcblx0bWVudS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcblx0bWVudS5zdHlsZS5sZWZ0ID0gZXYucGFnZVggKyBcInB4XCI7XG5cdG1lbnUuc3R5bGUudG9wID0gZXYucGFnZVkgKyBcInB4XCI7XG5cdG1lbnUuc3R5bGUubWFyZ2luVG9wID0gMDtcblxuXHR2YXIgYSA9IG5ldyB4bm9kZS5BKCk7XG5cdGEuY2xhc3NOYW1lID0gXCJpdGVtXCI7XG5cdGEuaW5uZXJIVE1MID0gXCJSZXN0b3JlIHRvIGRlZmF1bHRcIjtcblxuXHR2YXIgaT1uZXcgeG5vZGUuSSgpO1xuXHRpLmNsYXNzTmFtZT1cInRyYXNoIGljb25cIjtcblx0YS5hcHBlbmRDaGlsZChpKTtcblxuXHRtZW51LmFwcGVuZENoaWxkKGEpO1xuXG5cdGEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25SZXN0b3JlVG9EZWZhdWx0Q2xpY2suYmluZCh0aGlzKSk7XG5cdG1lbnUuc2hvdygpO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdG8gZGVmYXVsdC5cbiAqIEBtZXRob2Qgb25SZXN0b3JlVG9EZWZhdWx0Q2xpY2tcbiAqL1xuUmVzb3VyY2VJbWFnZVZhbHVlVmlldy5wcm90b3R5cGUub25SZXN0b3JlVG9EZWZhdWx0Q2xpY2sgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5zZXRWYWx1ZShudWxsKTtcblx0dGhpcy50cmlnZ2VyKFwidmFsdWVDaGFuZ2VcIik7XG59XG5cbi8qKlxuICogR2V0IHZhbHVlLlxuICogQG1ldGhvZCBnZXRWYWx1ZVxuICovXG5SZXNvdXJjZUltYWdlVmFsdWVWaWV3LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy52YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZUltYWdlVmFsdWVWaWV3OyIsInZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciB4bm9kZSA9IHJlcXVpcmUoXCJ4bm9kZVwiKTtcbnZhciBSZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3ID0gcmVxdWlyZShcIi4vUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlld1wiKTtcbnZhciBSZXNvdXJjZUltYWdlVmFsdWVWaWV3ID0gcmVxdWlyZShcIi4vUmVzb3VyY2VJbWFnZVZhbHVlVmlld1wiKTtcbnZhciBSZXNvdXJjZUNvbG9yVmFsdWVWaWV3ID0gcmVxdWlyZShcIi4vUmVzb3VyY2VDb2xvclZhbHVlVmlld1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwieWFlZFwiKTtcblxuLyoqXG4gKiBTaG93IGEgdGFibGUgcm93IGZvciBlYWNoIHJlc291cmNlIGl0ZW0uXG4gKiBAY2xhc3MgUmVzb3VyY2VJdGVtVmlld1xuICovXG5mdW5jdGlvbiBSZXNvdXJjZUl0ZW1WaWV3KCkge1xuXHR4bm9kZS5Uci5jYWxsKHRoaXMpO1xuXG5cdHRoaXMuc3R5bGUuaGVpZ2h0ID0gXCI1MHB4XCI7XG5cblx0dGhpcy5rZXlUZCA9IG5ldyB4bm9kZS5UZCgpO1xuXHR0aGlzLmtleVRkLnN0eWxlLndpZHRoID0gXCI1MCVcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmtleVRkKTtcblxuXHR0aGlzLnZhbHVlVGQgPSBuZXcgeG5vZGUuVGQoKTtcblx0dGhpcy52YWx1ZVRkLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuXHR0aGlzLnZhbHVlVGQuc3R5bGUud2lkdGggPSBcIjUwJVwiO1xuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMudmFsdWVUZCk7XG5cblx0dGhpcy52YWx1ZVZpZXcgPSBudWxsO1xuXHR0aGlzLml0ZW1UeXBlID0gbnVsbDtcblx0dGhpcy52YWx1ZSA9IG51bGw7XG5cdHRoaXMuZGVmYXVsdFZhbHVlID0gbnVsbDtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VJdGVtVmlldywgeG5vZGUuVHIpO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoUmVzb3VyY2VJdGVtVmlldyk7XG5cbi8qKlxuICogU2V0IGtleS4gV2lsbCBhcHBlYXIgaW4gdGhlIGxlZnQgY29sdW1uLlxuICovXG5SZXNvdXJjZUl0ZW1WaWV3LnByb3RvdHlwZS5zZXRLZXkgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR0aGlzLmtleVRkLmlubmVySFRNTCA9IHZhbHVlO1xufVxuXG4vKipcbiAqIFNldCBhYnN0cmFjdCB2YWx1ZSB0byBhcHBlYXIgYXMgZGVmYXVsdCB2YWx1ZS5cbiAqIEBtZXRob2Qgc2V0RGVmYXVsdFZhbHVlXG4gKi9cblJlc291cmNlSXRlbVZpZXcucHJvdG90eXBlLnNldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGRlZmF1bHRWYWx1ZSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblxuXHRpZiAodGhpcy52YWx1ZVZpZXcpXG5cdFx0dGhpcy52YWx1ZVZpZXcuc2V0RGVmYXVsdFZhbHVlKHRoaXMuZGVmYXVsdFZhbHVlKTtcbn1cblxuLyoqXG4gKiBTZXQgYWJzdHJhY3QgdmFsdWUgdG8gYXBwZWFyIGluIHRoZSB2YWx1ZSBjb2x1bW4uXG4gKiBAbWV0aG9kIHNldFZhbHVlXG4gKi9cblJlc291cmNlSXRlbVZpZXcucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcblx0dGhpcy52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmICh0aGlzLnZhbHVlVmlldylcblx0XHR0aGlzLnZhbHVlVmlldy5zZXRWYWx1ZSh0aGlzLnZhbHVlKTtcbn1cblxuLyoqXG4gKiBHZXQgY3VycmVudCB2YWx1ZS5cbiAqIEBtZXRob2Qgc2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VJdGVtVmlldy5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRyZXR1cm4gdGhpcy52YWx1ZTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHR5cGUgb2YgdGhlIGl0ZW0uIFRoaXMgd2lsbCBjcmVhdGUgYSB2YWx1ZVxuICogdmlldyBhbmQgcG9wdWxhdGUgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHRhYmxlLlxuICogQG1ldGhvZCBzZXRJdGVtVHlwZVxuICovXG5SZXNvdXJjZUl0ZW1WaWV3LnByb3RvdHlwZS5zZXRJdGVtVHlwZSA9IGZ1bmN0aW9uKGl0ZW1UeXBlKSB7XG5cdGlmIChpdGVtVHlwZSA9PSB0aGlzLml0ZW1UeXBlKVxuXHRcdHJldHVybjtcblxuXHRpZiAodGhpcy52YWx1ZVZpZXcpIHtcblx0XHR0aGlzLnZhbHVlVGQucmVtb3ZlQ2hpbGQodGhpcy52YWx1ZVZpZXcpO1xuXHRcdHRoaXMudmFsdWVWaWV3Lm9mZihcInZhbHVlQ2hhbmdlXCIsIHRoaXMub25WYWx1ZVZpZXdDaGFuZ2UsIHRoaXMpO1xuXHRcdHRoaXMudmFsdWVWaWV3Lm9mZihcImZpbGVTZWxlY3RcIiwgdGhpcy5vblZhbHVlVmlld0NoYW5nZSwgdGhpcyk7XG5cdH1cblxuXHR0aGlzLnZhbHVlVmlldyA9IG51bGw7XG5cdHRoaXMuaXRlbVR5cGUgPSBpdGVtVHlwZTtcblxuXHRzd2l0Y2ggKHRoaXMuaXRlbVR5cGUpIHtcblx0XHRjYXNlIFwicG9zaXRpb25cIjpcblx0XHRcdHRoaXMudmFsdWVWaWV3ID0gbmV3IFJlc291cmNlUG9zaXRpb25WYWx1ZVZpZXcoKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcImltYWdlXCI6XG5cdFx0XHR0aGlzLnZhbHVlVmlldyA9IG5ldyBSZXNvdXJjZUltYWdlVmFsdWVWaWV3KCk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgXCJjb2xvclwiOlxuXHRcdFx0dGhpcy52YWx1ZVZpZXcgPSBuZXcgUmVzb3VyY2VDb2xvclZhbHVlVmlldygpO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRpZiAodGhpcy52YWx1ZVZpZXcpIHtcblx0XHR0aGlzLnZhbHVlVGQuYXBwZW5kQ2hpbGQodGhpcy52YWx1ZVZpZXcpO1xuXHRcdHRoaXMudmFsdWVWaWV3LnNldERlZmF1bHRWYWx1ZSh0aGlzLmRlZmF1bHRWYWx1ZSk7XG5cdFx0dGhpcy52YWx1ZVZpZXcuc2V0VmFsdWUodGhpcy52YWx1ZSk7XG5cdFx0dGhpcy52YWx1ZVZpZXcub24oXCJ2YWx1ZUNoYW5nZVwiLCB0aGlzLm9uVmFsdWVWaWV3Q2hhbmdlLCB0aGlzKTtcblx0XHR0aGlzLnZhbHVlVmlldy5vbihcImZpbGVTZWxlY3RcIiwgdGhpcy5vblZhbHVlVmlld0ZpbGVTZWxlY3QsIHRoaXMpO1xuXHR9XG59XG5cbi8qKlxuICogSXRlbSBjaGFuZ2VcbiAqIEBtZXRob2Qgb25WYWx1ZVZpZXdDaGFuZ2VcbiAqL1xuUmVzb3VyY2VJdGVtVmlldy5wcm90b3R5cGUub25WYWx1ZVZpZXdDaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0dGhpcy52YWx1ZSA9IHRoaXMudmFsdWVWaWV3LmdldFZhbHVlKCk7XG5cdHRoaXMudHJpZ2dlcihcImNoYW5nZVwiKTtcbn1cblxuLyoqXG4gKiBHZXQgc2VsZWN0ZWQgZmlsZS5cbiAqIE9ubHkgYXZhaWxhYmxlIGZvciBpbWFnZXMuXG4gKiBAbWV0aG9kIGdldFNlbGVjdGVkRmlsZVxuICovXG5SZXNvdXJjZUl0ZW1WaWV3LnByb3RvdHlwZS5nZXRTZWxlY3RlZEZpbGUgPSBmdW5jdGlvbigpIHtcblx0aWYgKHRoaXMuaXRlbVR5cGUgIT0gXCJpbWFnZVwiIHx8ICF0aGlzLnZhbHVlVmlldylcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJub3QgYXZhaWxhYmxlLi4uXCIpO1xuXG5cdHJldHVybiB0aGlzLnZhbHVlVmlldy5nZXRTZWxlY3RlZEZpbGUoKTtcbn1cblxuLyoqXG4gKiBGaWxlIHNlbGVjdC5cbiAqIEBtZXRob2Qgb25WYWx1ZVZpZXdGaWxlU2VsZWN0XG4gKi9cblJlc291cmNlSXRlbVZpZXcucHJvdG90eXBlLm9uVmFsdWVWaWV3RmlsZVNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRyaWdnZXIoXCJmaWxlU2VsZWN0XCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlSXRlbVZpZXc7IiwidmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xudmFyIHhub2RlYyA9IHJlcXVpcmUoXCJ4bm9kZWNvbGxlY3Rpb25cIik7XG5cbi8qKlxuICogVGhlIGxlZnQgcGFydCBvZiB0aGUgYXBwLCBzaG93aW5nIHRoZSByZXNvdXJjZXMuXG4gKiBAY2xhc3MgUmVzb3VyY2VQYW5lVmlld1xuICovXG5mdW5jdGlvbiBSZXNvdXJjZVBhbmVWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLnN0eWxlLnRvcCA9IFwiNjBweFwiO1xuXHR0aGlzLnN0eWxlLmxlZnQgPSBcIjEwcHhcIjtcblx0dGhpcy5zdHlsZS53aWR0aCA9IFwiY2FsYyg1MCUgLSAxNXB4KVwiO1xuXHR0aGlzLnN0eWxlLmJvdHRvbSA9IFwiMTBweFwiO1xuXG5cdHRoaXMudGFiSGVhZGVycyA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy50YWJIZWFkZXJzLmNsYXNzTmFtZSA9IFwidWkgdG9wIGF0dGFjaGVkIHRhYnVsYXIgbWVudVwiO1xuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMudGFiSGVhZGVycyk7XG59XG5cbmluaGVyaXRzKFJlc291cmNlUGFuZVZpZXcsIHhub2RlLkRpdik7XG5cbi8qKlxuICogR2V0IGhvbGRlciBmb3IgdGhlIHRhYiBoZWFkZXJzLlxuICogQG1ldGhvZCBnZXRUYWJIZWFkZXJIb2xkZXJcbiAqL1xuUmVzb3VyY2VQYW5lVmlldy5wcm90b3R5cGUuZ2V0VGFiSGVhZGVySG9sZGVyID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnRhYkhlYWRlcnM7XG59XG5cbi8qKlxuICogR2V0IHRhYiBob2xkZXIuXG4gKiBAbWV0aG9kIGdldFRhYkhvbGRlclxuICovXG5SZXNvdXJjZVBhbmVWaWV3LnByb3RvdHlwZS5nZXRUYWJIb2xkZXIgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VQYW5lVmlldzsiLCJ2YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG52YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZShcInlhZWRcIik7XG5cbi8qKlxuICogVGhlIHZhbHVlIHZpZXcgZm9yIGEgcG9zaXRpb24uXG4gKiBAY2xhc3MgUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlld1xuICovXG5mdW5jdGlvbiBSZXNvdXJjZVBvc2l0aW9uVmFsdWVWaWV3KCkge1xuXHR4bm9kZS5EaXYuY2FsbCh0aGlzKTtcblxuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcgPSBuZXcgeG5vZGUuRGl2KCk7XG5cdHRoaXMuZGVmYXVsdFZhbHVlVmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLndpZHRoID0gXCI1MCVcIjtcblx0dGhpcy5kZWZhdWx0VmFsdWVWaWV3LnN0eWxlLnRvcCA9IFwiMTVweFwiO1xuXG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5kZWZhdWx0VmFsdWVWaWV3KTtcblxuXHR0aGlzLnZhbHVlRGl2ID0gbmV3IHhub2RlLkRpdigpO1xuXHR0aGlzLnZhbHVlRGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHR0aGlzLnZhbHVlRGl2LnN0eWxlLnJpZ2h0ID0gXCIxMHB4XCI7XG5cdHRoaXMudmFsdWVEaXYuc3R5bGUudG9wID0gXCIxMHB4XCI7XG5cdHRoaXMudmFsdWVEaXYuc3R5bGUud2lkdGggPSBcIjUwJVwiO1xuXG5cdHRoaXMudmFsdWVEaXYuY2xhc3NOYW1lID0gXCJ1aSBpbnB1dCBmbHVpZCBtaW5pXCI7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy52YWx1ZURpdik7XG5cblx0dGhpcy52YWx1ZUlucHV0ID0gbmV3IHhub2RlLklucHV0KCk7XG5cdHRoaXMudmFsdWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG5cdHRoaXMudmFsdWVEaXYuYXBwZW5kQ2hpbGQodGhpcy52YWx1ZUlucHV0KTtcblxuXHR0aGlzLnZhbHVlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLm9uVmFsdWVJbnB1dENoYW5nZS5iaW5kKHRoaXMpKTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlldywgeG5vZGUuRGl2KTtcbkV2ZW50RGlzcGF0Y2hlci5pbml0KFJlc291cmNlUG9zaXRpb25WYWx1ZVZpZXcpO1xuXG4vKipcbiAqIFNldCBwb3NpdGlvbiB2YWx1ZSBmb3IgZGVmYXVsdC5cbiAqIEBtZXRob2Qgc2V0RGVmYXVsdFZhbHVlXG4gKi9cblJlc291cmNlUG9zaXRpb25WYWx1ZVZpZXcucHJvdG90eXBlLnNldERlZmF1bHRWYWx1ZSA9IGZ1bmN0aW9uKGRlZmF1bHRWYWx1ZSkge1xuXHR0aGlzLmRlZmF1bHRWYWx1ZVZpZXcuaW5uZXJIVE1MID0gZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIFNldCBwb3NpdGlvbiB2YWx1ZSBmb3IgY3VycmVudC5cbiAqIEBtZXRob2Qgc2V0VmFsdWVcbiAqL1xuUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlldy5wcm90b3R5cGUuc2V0VmFsdWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHR0aGlzLnZhbHVlSW5wdXQudmFsdWUgPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBTZXQgcG9zaXRpb24gdmFsdWUgZm9yIGN1cnJlbnQuXG4gKiBAbWV0aG9kIHNldFZhbHVlXG4gKi9cblJlc291cmNlUG9zaXRpb25WYWx1ZVZpZXcucHJvdG90eXBlLm9uVmFsdWVJbnB1dENoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLnRyaWdnZXIoXCJ2YWx1ZUNoYW5nZVwiKTtcbn1cblxuLyoqXG4gKiBHZXQgdmFsdWUuXG4gKiBAbWV0aG9kIGdldFZhbHVlXG4gKi9cblJlc291cmNlUG9zaXRpb25WYWx1ZVZpZXcucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnZhbHVlSW5wdXQudmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VQb3NpdGlvblZhbHVlVmlldzsiLCJ2YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG5cbi8qKlxuICogVGhlIHRhYiBoZWFkZXIuXG4gKiBAY2xhc3MgUmVzb3VyY2VUYWJIZWFkZXJWaWV3XG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlVGFiSGVhZGVyVmlldygpIHtcblx0eG5vZGUuQS5jYWxsKHRoaXMpO1xuXHR0aGlzLmNsYXNzTmFtZSA9IFwiaXRlbVwiO1xufVxuXG5pbmhlcml0cyhSZXNvdXJjZVRhYkhlYWRlclZpZXcsIHhub2RlLkEpO1xuXG4vKipcbiAqIFNldCBsYWJlbC5cbiAqIEBjbGFzcyBzZXRMYWJlbFxuICovXG5SZXNvdXJjZVRhYkhlYWRlclZpZXcucHJvdG90eXBlLnNldExhYmVsID0gZnVuY3Rpb24obGFiZWwpIHtcblx0dGhpcy5pbm5lckhUTUwgPSBsYWJlbDtcbn1cblxuLyoqXG4gKiBTZXQgYWN0aXZlIHN0YXRlLlxuICogQGNsYXNzIHNldEFjdGl2ZVxuICovXG5SZXNvdXJjZVRhYkhlYWRlclZpZXcucHJvdG90eXBlLnNldEFjdGl2ZSA9IGZ1bmN0aW9uKGFjdGl2ZSkge1xuXHRpZiAoYWN0aXZlKVxuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJhY3RpdmUgaXRlbVwiO1xuXG5cdGVsc2Vcblx0XHR0aGlzLmNsYXNzTmFtZSA9IFwiaXRlbVwiO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc291cmNlVGFiSGVhZGVyVmlldzsiLCJ2YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgeG5vZGVjID0gcmVxdWlyZShcInhub2RlY29sbGVjdGlvblwiKTtcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoXCJpbmhlcml0c1wiKTtcbnZhciBSZXNvdXJjZUNhdGVnb3J5VmlldyA9IHJlcXVpcmUoXCIuL1Jlc291cmNlQ2F0ZWdvcnlWaWV3XCIpO1xuXG4vKipcbiAqIFRoZSB2aWV3IGZvciB0aGUgY29udGVudCB0aGF0IGdvZXMgaW50byBvbmUgdGFiLlxuICogQGNsYXNzIFJlc291cmNlVGFiVmlld1xuICovXG5mdW5jdGlvbiBSZXNvdXJjZVRhYlZpZXcoKSB7XG5cdHhub2RlLkRpdi5jYWxsKHRoaXMpO1xuXHR0aGlzLmNsYXNzTmFtZSA9IFwidWkgYm90dG9tIGF0dGFjaGVkIGFjdGl2ZSB0YWIgc2VnbWVudFwiO1xuXG5cdHRoaXMuaW5uZXIgPSBuZXcgeG5vZGUuRGl2KCk7XG5cdHRoaXMuaW5uZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cdHRoaXMuaW5uZXIuc3R5bGUuaGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSA2NXB4KVwiO1xuXHR0aGlzLmlubmVyLnN0eWxlLnBhZGRpbmcgPSBcIjFweFwiO1xuXHR0aGlzLmlubmVyLnN0eWxlLm92ZXJmbG93WSA9IFwic2Nyb2xsXCI7XG5cdHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5pbm5lcik7XG5cblx0dGhpcy5kZXNjcmlwdGlvblAgPSBuZXcgeG5vZGUuUCgpO1xuXHR0aGlzLmlubmVyLmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb25QKTtcblxuXHR0aGlzLmFjY29yZGlvbiA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy5hY2NvcmRpb24uY2xhc3NOYW1lID0gXCJ1aSBzdHlsZWQgZmx1aWQgYWNjb3JkaW9uXCI7XG5cdHRoaXMuaW5uZXIuYXBwZW5kQ2hpbGQodGhpcy5hY2NvcmRpb24pO1xuXG5cdHRoaXMuaXRlbVRhYmxlID0gbmV3IHhub2RlLlRhYmxlKCk7XG5cdHRoaXMuaXRlbVRhYmxlLmNsYXNzTmFtZSA9IFwidWkgdGFibGUgdW5zdGFja2FibGUgZGVmaW5pdGlvblwiO1xuXHR0aGlzLmlubmVyLmFwcGVuZENoaWxkKHRoaXMuaXRlbVRhYmxlKTtcblxuXHR0aGlzLml0ZW1UYWJsZUJvZHkgPSBuZXcgeG5vZGUuVGJvZHkoKTtcblx0dGhpcy5pdGVtVGFibGUuYXBwZW5kQ2hpbGQodGhpcy5pdGVtVGFibGVCb2R5KTtcbn1cblxuaW5oZXJpdHMoUmVzb3VyY2VUYWJWaWV3LCB4bm9kZS5EaXYpO1xuXG4vKipcbiAqIFNob3VsZCB0aGlzIGJlIHRoZSBhY3RpdmUgdGFiP1xuICogQG1ldGhvZCBzZXRBY3RpdmVcbiAqL1xuUmVzb3VyY2VUYWJWaWV3LnByb3RvdHlwZS5zZXRBY3RpdmUgPSBmdW5jdGlvbihhY3RpdmUpIHtcblx0aWYgKGFjdGl2ZSkge1xuXHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHR0aGlzLmNsYXNzTmFtZSA9IFwidWkgYm90dG9tIGF0dGFjaGVkIGFjdGl2ZSB0YWIgc2VnbWVudCBhY3RpdmVcIjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR0aGlzLmNsYXNzTmFtZSA9IFwidWkgYm90dG9tIGF0dGFjaGVkIGFjdGl2ZSB0YWIgc2VnbWVudFwiO1xuXHR9XG59XG5cbi8qKlxuICogU2V0IGRlc2NyaXB0aW9uLlxuICogQG1ldGhvZCBzZXREZXNjcmlwdGlvblxuICovXG5SZXNvdXJjZVRhYlZpZXcucHJvdG90eXBlLnNldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcblx0dGhpcy5kZXNjcmlwdGlvblAuaW5uZXJIVE1MID0gZGVzY3JpcHRpb247XG59XG5cbi8qKlxuICogR2V0IGRpdiBob2xkaW5nIHRoZSBjYXRlZ29yaWVzLlxuICogQG1ldGhvZCBnZXRDYXRlZ29yeUhvbGRlclxuICovXG5SZXNvdXJjZVRhYlZpZXcucHJvdG90eXBlLmdldENhdGVnb3J5SG9sZGVyID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmFjY29yZGlvbjtcbn1cblxuLyoqXG4gKiBHZXQgaG9sZGVyIGZvciB0aGUgaXRlbXMuXG4gKiBAbWV0aG9kIGdldEl0ZW1Ib2xkZXJcbiAqL1xuUmVzb3VyY2VUYWJWaWV3LnByb3RvdHlwZS5nZXRJdGVtSG9sZGVyID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLml0ZW1UYWJsZUJvZHk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VUYWJWaWV3OyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIFJvb3RWaWV3KGRvbUNvbnRhaW5lcikge1xuXHRWaWV3LmNhbGwodGhpcywgVmlldy5kaXYsIFwiUm9vdFZpZXdcIik7XG5cblx0dGhpcy5pc1Jvb3QgPSB0cnVlO1xuXHRcblx0ZG9tQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZ2V0RWxlbWVudCgpKTtcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoUm9vdFZpZXcsIFZpZXcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdFZpZXc7XG4iLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIFNlbGVjdEJ1dHRvbih0ZXh0LCBmaWx0ZXIpIHtcblx0Vmlldy5jYWxsKHRoaXMsIFZpZXcuSW5wdXQsIFwiU2VsZWN0QnV0dG9uXCIpO1xuXHR0aGlzLmdldEVsZW1lbnQoKS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZmlsZVwiKTtcblx0dGhpcy5nZXRFbGVtZW50KCkuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgdGV4dCk7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLnNldEF0dHJpYnV0ZShcImFjY2VwdFwiLCBcImltYWdlLypcIik7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcblx0dGhpcy53aWR0aCA9IDgwO1xuXHR0aGlzLmhlaWdodCA9IDMwO1xufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhTZWxlY3RCdXR0b24sIFZpZXcpO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoU2VsZWN0QnV0dG9uKTtcblxuU2VsZWN0QnV0dG9uLkNoYW5nZSA9IFwiY2hhbmdlXCI7XG5cblNlbGVjdEJ1dHRvbi5wcm90b3R5cGUub25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0dGhpcy50cmlnZ2VyKFNlbGVjdEJ1dHRvbi5DaGFuZ2UsIHRoaXMuZ2V0RWxlbWVudCgpLmZpbGVzKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RCdXR0b247XG4iLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoXCIuLi91dGlscy9FdmVudERpc3BhdGNoZXJcIik7XG52YXIgTGlzdEl0ZW0gPSByZXF1aXJlKFwiLi9MaXN0SXRlbVwiKTtcbnZhciBTZWxlY3RCdXR0b24gPSByZXF1aXJlKFwiLi9TZWxlY3RCdXR0b25cIik7XG52YXIgSW1hZ2VWaWV3ID0gcmVxdWlyZShcIi4vSW1hZ2VWaWV3XCIpO1xudmFyIFRleHQgPSByZXF1aXJlKFwiLi9UZXh0XCIpO1xudmFyIElucHV0VmlldyA9IHJlcXVpcmUoXCIuL0lucHV0Vmlld1wiKTtcbnZhciBSZXNvdXJjZXMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbGliL1Jlc291cmNlc1wiKTtcblxuZnVuY3Rpb24gU3RyaW5nSXRlbShpZCwgdmFsdWUpIHtcblx0TGlzdEl0ZW0uY2FsbCh0aGlzLCBpZCk7XG5cblxuXHR0aGlzLm5hbWUgPSBuYW1lO1xuXG5cdHRoaXMudGV4dCA9IG5ldyBUZXh0KCk7XG5cdHRoaXMuaW5wdXQgPSBuZXcgSW5wdXRWaWV3KCk7XG5cblx0dGhpcy5hZGRDaGlsZCh0aGlzLnRleHQpO1xuXHR0aGlzLmFkZENoaWxkKHRoaXMuaW5wdXQpO1xuXG5cdHRoaXMudGV4dC53aWR0aCA9IDEwMDtcblx0dGhpcy5pbnB1dC53aWR0aCA9IDIwMDtcblxuXHR0aGlzLnRleHQueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0dGhpcy5pbnB1dC55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xuXG5cdHRoaXMuaW5wdXQueCA9IDEwMDtcblxuXG5cblx0dGhpcy5idXR0b24ub24oU2VsZWN0QnV0dG9uLkNoYW5nZSwgdGhpcy5vbkZpbGVzU2VsZWN0ZWQsIHRoaXMpO1xuXHRcbn07XG5DbGFzc1V0aWxzLmV4dGVuZHMoU3RyaW5nSXRlbSwgTGlzdEl0ZW0pO1xuRXZlbnREaXNwYXRjaGVyLmluaXQoU3RyaW5nSXRlbSk7XG5cblN0cmluZ0l0ZW0uQ2hhbmdlZCA9IFwiQ2hhbmdlZFwiO1xuXG5TdHJpbmdJdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdExpc3RJdGVtLnByb3RvdHlwZS51cGRhdGVMYXlvdXQuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KTtcblxuXHR0aGlzLnRleHQudXBkYXRlTGF5b3V0KHdpZHRoKjAuNSwgaGVpZ2h0IC0gdGhpcy5oZWFkZXIuaGVpZ2h0KTtcblx0dGhpcy5pbnB1dC51cGRhdGVMYXlvdXQod2lkdGgqMC41LCBoZWlnaHQgLSB0aGlzLmhlYWRlci5oZWlnaHQpO1xuXG5cdHRoaXMudGV4dC54ID0gMDsgXG5cdHRoaXMuaW5wdXQueCA9IHdpZHRoKjAuNTtcblxuXHR0aGlzLnRleHQueSA9IHRoaXMuaGVhZGVyLmhlaWdodDtcblx0dGhpcy5pbnB1dC55ID0gdGhpcy5oZWFkZXIuaGVpZ2h0O1xufTtcblxuXG5TdHJpbmdJdGVtLnByb3RvdHlwZS5vbkNoYW5nZWQgPSBmdW5jdGlvbihmaWxlcykge1xuXHR0aGlzLnRyaWdnZXIoU3RyaW5nSXRlbS5DaGFuZ2VkLCB0aGlzKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmdJdGVtOyIsInZhciBDbGFzc1V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzL0NsYXNzVXRpbHNcIik7XG52YXIgVmlldyA9IHJlcXVpcmUoXCIuL1ZpZXdcIik7XG5cbmZ1bmN0aW9uIFRhcmdldENvbnRyb2xsZXJWaWV3KCkge1xuXHRWaWV3LmNhbGwodGhpcywgVmlldy5EaXYsIFwiVGFyZ2V0Q29udHJvbGxlclZpZXdcIik7XG5cblx0dGhpcy5tZW51VmlldyA9IG51bGw7XG5cdHRoaXMudGFyZ2V0VmlldyA9IG51bGw7XG59O1xuQ2xhc3NVdGlscy5leHRlbmRzKFRhcmdldENvbnRyb2xsZXJWaWV3LCBWaWV3KTtcblxuVGFyZ2V0Q29udHJvbGxlclZpZXcucHJvdG90eXBlLnNldE1lbnVWaWV3ID0gZnVuY3Rpb24obWVudVZpZXcpIHtcblx0dGhpcy5tZW51VmlldyA9IG1lbnVWaWV3O1xuXHR0aGlzLmFkZENoaWxkKHRoaXMubWVudVZpZXcpO1xufTtcblxuVGFyZ2V0Q29udHJvbGxlclZpZXcucHJvdG90eXBlLnNldFRhcmdldFZpZXcgPSBmdW5jdGlvbih0YXJnZXRWaWV3KSB7XG5cdHRoaXMudGFyZ2V0VmlldyA9IHRhcmdldFZpZXc7XG5cdHRoaXMuYWRkQ2hpbGQodGFyZ2V0Vmlldyk7XG59O1xuXG5UYXJnZXRDb250cm9sbGVyVmlldy5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXG5cdHRoaXMubWVudVZpZXcudXBkYXRlTGF5b3V0KHdpZHRoLCB0aGlzLm1lbnVWaWV3LmhlaWdodCk7XG5cblx0dGhpcy50YXJnZXRWaWV3LnggPSAwO1xuXHR0aGlzLnRhcmdldFZpZXcueSA9IHRoaXMubWVudVZpZXcuaGVpZ2h0O1xuXHR0aGlzLnRhcmdldFZpZXcudXBkYXRlTGF5b3V0KHdpZHRoLCBoZWlnaHQgLSB0aGlzLm1lbnVWaWV3LmhlaWdodCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRhcmdldENvbnRyb2xsZXJWaWV3O1xuIiwidmFyIGluaGVyaXRzID0gcmVxdWlyZShcImluaGVyaXRzXCIpO1xudmFyIHhub2RlID0gcmVxdWlyZShcInhub2RlXCIpO1xudmFyIHhub2RlYyA9IHJlcXVpcmUoXCJ4bm9kZWNvbGxlY3Rpb25cIik7XG5cbi8qKlxuICogVGFyZ2V0IHBhbmUuXG4gKiBAY2xhc3MgVGFyZ2V0UGFuZVZpZXdcbiAqL1xuZnVuY3Rpb24gVGFyZ2V0UGFuZVZpZXcoKSB7XG5cdHhub2RlLkRpdi5jYWxsKHRoaXMpO1xuXG5cdHRoaXMuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMuc3R5bGUudG9wID0gXCI2MHB4XCI7XG5cdHRoaXMuc3R5bGUucmlnaHQgPSBcIjEwcHhcIjtcblx0dGhpcy5zdHlsZS53aWR0aCA9IFwiY2FsYyg1MCUgLSAxNXB4KVwiO1xuXHR0aGlzLnN0eWxlLmJvdHRvbSA9IFwiMTBweFwiO1xuXG5cdHRoaXMudGFiSGVhZGVycyA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy50YWJIZWFkZXJzLmNsYXNzTmFtZSA9IFwidWkgdG9wIGF0dGFjaGVkIHRhYnVsYXIgbWVudVwiO1xuXHR0aGlzLmFwcGVuZENoaWxkKHRoaXMudGFiSGVhZGVycyk7XG5cblx0dGhpcy5pbm5lciA9IG5ldyB4bm9kZS5EaXYoKTtcblx0dGhpcy5pbm5lci5jbGFzc05hbWUgPSBcInVpIGJvdHRvbSBhdHRhY2hlZCBhY3RpdmUgdGFiIHNlZ21lbnRcIjtcblx0dGhpcy5pbm5lci5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0dGhpcy5pbm5lci5zdHlsZS5oZWlnaHQgPSBcImNhbGMoMTAwJSAtIDM1cHgpXCI7XG5cdHRoaXMuaW5uZXIuc3R5bGUucGFkZGluZyA9IFwiMXB4XCI7XG5cdHRoaXMuaW5uZXIuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIjtcblx0dGhpcy5hcHBlbmRDaGlsZCh0aGlzLmlubmVyKTtcblxuXHR0aGlzLmlmcmFtZSA9IG5ldyB4bm9kZS5JZnJhbWUoKTtcblx0dGhpcy5pZnJhbWUuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdHRoaXMuaWZyYW1lLnN0eWxlLnRvcCA9IFwiNXB4XCI7XG5cdHRoaXMuaWZyYW1lLnN0eWxlLmxlZnQgPSBcIjVweFwiO1xuXHR0aGlzLmlmcmFtZS5zdHlsZS53aWR0aCA9IFwiY2FsYygxMDAlIC0gMTBweClcIjtcblx0dGhpcy5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gXCJjYWxjKDEwMCUgLSAxMHB4KVwiO1xuXHR0aGlzLmlmcmFtZS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjODA4MDgwXCJcblx0dGhpcy5pbm5lci5hcHBlbmRDaGlsZCh0aGlzLmlmcmFtZSk7XG59XG5cbmluaGVyaXRzKFRhcmdldFBhbmVWaWV3LCB4bm9kZS5EaXYpO1xuXG4vKipcbiAqIEdldCBob2xkZXIgZm9yIHRoZSB0YWIgaGVhZGVycy5cbiAqIEBtZXRob2QgZ2V0VGFiSGVhZGVySG9sZGVyXG4gKi9cblRhcmdldFBhbmVWaWV3LnByb3RvdHlwZS5nZXRUYWJIZWFkZXJIb2xkZXIgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMudGFiSGVhZGVycztcbn1cblxuLyoqXG4gKlxuICovXG5UYXJnZXRQYW5lVmlldy5wcm90b3R5cGUuc2V0VXJsID0gZnVuY3Rpb24odXJsKSB7XG5cdHRoaXMuaWZyYW1lLnNyYyA9IHVybDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUYXJnZXRQYW5lVmlldzsiLCJ2YXIgeG5vZGUgPSByZXF1aXJlKFwieG5vZGVcIik7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKFwiaW5oZXJpdHNcIik7XG5cbi8qKlxuICogVGhlIHRhYiBoZWFkZXIuXG4gKiBAY2xhc3MgVGFyZ2V0VGFiSGVhZGVyVmlld1xuICovXG5mdW5jdGlvbiBUYXJnZXRUYWJIZWFkZXJWaWV3KCkge1xuXHR4bm9kZS5BLmNhbGwodGhpcyk7XG5cdHRoaXMuY2xhc3NOYW1lID0gXCJpdGVtXCI7XG59XG5cbmluaGVyaXRzKFRhcmdldFRhYkhlYWRlclZpZXcsIHhub2RlLkEpO1xuXG4vKipcbiAqIFNldCBsYWJlbC5cbiAqIEBjbGFzcyBzZXRMYWJlbFxuICovXG5UYXJnZXRUYWJIZWFkZXJWaWV3LnByb3RvdHlwZS5zZXRMYWJlbCA9IGZ1bmN0aW9uKGxhYmVsKSB7XG5cdHRoaXMuaW5uZXJIVE1MID0gbGFiZWw7XG59XG5cbi8qKlxuICogU2V0IGFjdGl2ZSBzdGF0ZS5cbiAqIEBjbGFzcyBzZXRBY3RpdmVcbiAqL1xuVGFyZ2V0VGFiSGVhZGVyVmlldy5wcm90b3R5cGUuc2V0QWN0aXZlID0gZnVuY3Rpb24oYWN0aXZlKSB7XG5cdGlmIChhY3RpdmUpXG5cdFx0dGhpcy5jbGFzc05hbWUgPSBcImFjdGl2ZSBpdGVtXCI7XG5cblx0ZWxzZVxuXHRcdHRoaXMuY2xhc3NOYW1lID0gXCJpdGVtXCI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0VGFiSGVhZGVyVmlldzsiLCJ2YXIgQ2xhc3NVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlscy9DbGFzc1V0aWxzXCIpO1xudmFyIFZpZXcgPSByZXF1aXJlKFwiLi9WaWV3XCIpO1xuXG5mdW5jdGlvbiBUZXh0KHRleHQpIHtcblx0Vmlldy5jYWxsKHRoaXMsIFZpZXcuU3BhbiwgXCJUZXh0XCIpO1xuXG5cdHRoaXMuZ2V0RWxlbWVudCgpLmlubmVySFRNTCA9IHRleHQ7XG5cdHRoaXMuZ2V0RWxlbWVudCgpLnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG5cdFxufTtcbkNsYXNzVXRpbHMuZXh0ZW5kcyhUZXh0LCBWaWV3KTtcblxuXG5UZXh0LnByb3RvdHlwZS51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cdHRoaXMud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dDtcbiIsImZ1bmN0aW9uIFZpZXcoZWxlbWVudFR5cGUsIGNsYXNzTmFtZSkge1xuXHR0aGlzLl9kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50VHlwZSA/IGVsZW1lbnRUeXBlIDogVmlldy5EaXYpO1xuXHR0aGlzLl9mcmFtZSA9IHtcblx0XHR4OjAsIFxuXHRcdHk6IDAsXG5cdFx0d2lkdGg6IDAsXG5cdFx0aGVpZ2h0OiAwXG5cdH07XG5cdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cblx0dGhpcy5pc1Jvb3QgPSBmYWxzZTtcblxuXHR0aGlzLl9kb21FbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSA/IGNsYXNzTmFtZSA6IFwiVmlld1wiO1xuXG5cdHRoaXMucGFyZW50ID0gbnVsbDtcblx0dGhpcy5jaGlsZHJlbiA9IG5ldyBBcnJheSgpO1xuXG59O1xuVmlldy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBWaWV3O1xuXG5WaWV3LkltYWdlID0gXCJpbWdcIjtcblZpZXcuSW5wdXQgPSBcImlucHV0XCI7XG5WaWV3LkRpdiA9IFwiZGl2XCI7XG5WaWV3LlNwYW4gPSBcInNwYW5cIjtcblZpZXcuSUZyYW1lID0gXCJpZnJhbWVcIjtcblxuVmlldy5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudDtcbn07XG5cblZpZXcucHJvdG90eXBlLmlzT25TdGFnZSA9IGZ1bmN0aW9uKCkge1xuXHRpZih0aGlzLnBhcmVudCAhPSBudWxsKSB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50LmlzT25TdGFnZSgpO1xuXHR9XG5cdGlmKHRoaXMuaXNSb290ID09IHRydWUpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5WaWV3LnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkVmlldykge1xuXHRjaGlsZFZpZXcucGFyZW50ID0gdGhpcztcblx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkVmlldyk7XG5cdHRoaXMuX2RvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGRWaWV3Ll9kb21FbGVtZW50KTtcblx0aWYodGhpcy5pc09uU3RhZ2UoKSA9PSB0cnVlKSB7XG5cdFx0dmFyIGIgPSBjaGlsZFZpZXcuaGVpZ2h0ICsgY2hpbGRWaWV3LndpZHRoO1xuXHRcdGNoaWxkVmlldy5hZGRlZFRvU3RhZ2UoKTtcblx0fVxufTtcblxuVmlldy5wcm90b3R5cGUuYWRkZWRUb1N0YWdlID0gZnVuY3Rpb24oKSB7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0dGhpcy5jaGlsZHJlbltpXS5hZGRlZFRvU3RhZ2UoKTtcblx0fVxufTtcblxuVmlldy5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjaGlsZFZpZXcpIHtcblx0dmFyIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkVmlldyk7XG5cdGlmKGluZGV4ICE9IC0xKSB7XG5cdFx0Y2hpbGRWaWV3LnBhcmVudCA9IG51bGw7XG5cdFx0dGhpcy5fZG9tRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZFZpZXcuX2RvbUVsZW1lbnQpO1xuXHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUcnlpbmcgdG8gcmVtb3ZlIGFuIGVsZW1lbnQgdGhhdCB3YXNuJ3QgYSBjaGlsZFwiKTtcblx0fVxufTtcblxuVmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xufTtcblxuVmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLl9kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG5cblZpZXcucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiO1xufTtcblxuVmlldy5wcm90b3R5cGUudXBkYXRlTGF5b3V0ID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJ1cGRhdGVMYXlvdXQgbm90IGltcGxlbWVudGVkIVwiKTtcbn07XG5cbi8qKlxuICogU2V0dGVyIGFuZCBHZXR0ZXIgZm9yIHggcG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB4IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcInhcIiwge1xuXHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9mcmFtZS54OyBcblx0fSxcblx0c2V0OiBmdW5jdGlvbih4KSB7IFxuXHRcdHRoaXMuX2ZyYW1lLnggPSB4O1xuXHRcdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHggKyBcInB4XCI7XG5cdH1cbn0pO1xuXG4vKipcbiAqIFNldHRlciBhbmQgR2V0dGVyIGZvciB5IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkgeSAgXG4gKiBAdHlwZSBmbG9hdFxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVmlldy5wcm90b3R5cGUsIFwieVwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZyYW1lLnk7IFxuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKHkpIHsgXG5cdFx0dGhpcy5fZnJhbWUueSA9IHk7XG5cdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS50b3AgPSB5ICsgXCJweFwiO1xuXHR9XG59KTtcblxuLyoqXG4gKiBTZXR0ZXIgYW5kIEdldHRlciBmb3Igd2lkdGhcbiAqIEBwcm9wZXJ0eSB3aWR0aFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgdyA9IHRoaXMuX2ZyYW1lLndpZHRoO1xuXHRcdHRoaXMud2lkdGggPSB0aGlzLl9kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2ldO1xuXHRcdFx0aWYoKGNoaWxkLnggKyBjaGlsZC53aWR0aCkgPiB3KSB7XG5cdFx0XHRcdHcgPSBjaGlsZC54ICsgY2hpbGQud2lkdGg7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHcgPiB0aGlzLl9kb21FbGVtZW50LmNsaWVudFdpZHRoKSB7XG5cdFx0XHR0aGlzLndpZHRoID0gdztcblx0XHR9XG5cdFx0cmV0dXJuIHcgXG5cdH0sXG5cdHNldDogZnVuY3Rpb24od2lkdGgpIHsgXG5cdFx0aWYodGhpcy5pc09uU3RhZ2UoKSkge1xuXHRcdFx0aWYoKHR5cGVvZiB3aWR0aCkgPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHR0aGlzLl9kb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9mcmFtZS53aWR0aCA9IHdpZHRoO1xuXHR9XG59KTtcblxuLyoqXG4gKiBTZXR0ZXIgYW5kIEdldHRlciBmb3IgaGVpZ2h0IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkgaGVpZ2h0IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG5cdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGggPSB0aGlzLl9mcmFtZS5oZWlnaHQ7XG5cdFx0dGhpcy5oZWlnaHQgPSB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcblx0XHRcdGlmKChjaGlsZC55ICsgY2hpbGQuaGVpZ2h0KSA+IGgpIHtcblx0XHRcdFx0aCA9IGNoaWxkLnkgKyBjaGlsZC5oZWlnaHQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGggPiB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodCkge1xuXHRcdFx0dGhpcy5oZWlnaHQgPSBoO1xuXHRcdH1cblx0XHRyZXR1cm4gaDsgXG5cdH0sXG5cdHNldDogZnVuY3Rpb24oaGVpZ2h0KSB7IFxuXHRcdGlmKHRoaXMuaXNPblN0YWdlKCkpIHtcblx0XHRcdGlmKCh0eXBlb2YgaGVpZ2h0KSA9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9mcmFtZS5oZWlnaHQgPSBoZWlnaHQ7XG5cdH1cbn0pO1xuXG4vKipcbiAqIFNldHRlciBhbmQgR2V0dGVyIGZvciBiYWNrZ3JvdW5kIGNvbG9yXG4gKiBAcHJvcGVydHkgaGVpZ2h0IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcImJhY2tncm91bmRcIiwge1xuXHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmJhY2tncm91bmQ7IFxuXHR9LFxuXHRzZXQ6IGZ1bmN0aW9uKGJhY2tncm91bmQpIHsgXG5cdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZDtcblx0fVxufSk7XG5cbi8qKlxuICogU2V0dGVyIGFuZCBHZXR0ZXIgZm9yIGNvbG9yXG4gKiBAcHJvcGVydHkgaGVpZ2h0IFxuICogQHR5cGUgZmxvYXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFZpZXcucHJvdG90eXBlLCBcImNvbG9yXCIsIHtcblx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jb2xvcjsgXG5cdH0sXG5cdHNldDogZnVuY3Rpb24oY29sb3IpIHsgXG5cdFx0dGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jb2xvciA9IGNvbG9yO1xuXHR9XG59KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7IiwidmFyIFBJWEkgPSByZXF1aXJlKFwicGl4aS5qc1wiKTtcbnZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKFwiLi4vY2xpZW50L2pzL3V0aWxzL0V2ZW50RGlzcGF0Y2hlclwiKTtcblxuXG5cbi8qKlxuICogQ2xpZW50IHJlc291cmNlc1xuICogQGNsYXNzIFJlc291cmNlcy5cbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VzKHNvdXJjZSkge1xuXHR2YXIgaTtcblxuXHR0aGlzLnJlc291cmNlcyA9IHtcblx0XHRncmFwaGljczoge30sXG5cdFx0cG9zaXRpb25zOiB7fSxcblx0XHRjb2xvcnM6IHt9LFxuXHRcdHN0cmluZ3M6IHt9LFxuXHRcdHZhbHVlczoge31cblx0fTtcblxuXHR0aGlzLnNvdXJjZXMgPSBuZXcgQXJyYXkoKTtcblxuXHR0aGlzLkFsaWduID0ge1xuXHRcdExlZnQ6IFwibGVmdFwiLFxuXHRcdFJpZ2h0OiBcInJpZ2h0XCIsXG5cdFx0Q2VudGVyOiBcImNlbnRlclwiXG5cdH07XG5cblx0dGhpcy50ZXh0dXJlcyA9IHt9O1xuXG5cdHRoaXMubG9hZENvdW50ID0gMDtcblx0dGhpcy5sb2FkSW5kZXggPSAwO1xuXHR0aGlzLnRleHR1cmVzTG9hZGVkID0gMDtcblx0dGhpcy50ZXh0dXJlQ291bnQgPSAwO1xuXG5cdGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZClcblx0XHR0aGlzLmFkZFNvdXJjZShzb3VyY2UpO1xufVxuRXZlbnREaXNwYXRjaGVyLmluaXQoUmVzb3VyY2VzKTtcblxuXG5SZXNvdXJjZXMuTG9hZGVkID0gXCJsb2FkZWRcIjtcblJlc291cmNlcy5FcnJvciA9IFwiZXJyb3JcIjtcblxuUmVzb3VyY2VzLnByb3RvdHlwZS5pc0xvYWRpbmcgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMubG9hZENvdW50ID4gMCB8fCB0aGlzLnRleHR1cmVzTG9hZGVkIDwgdGhpcy50ZXh0dXJlQ291bnQ7XG59O1xuXG5SZXNvdXJjZXMucHJvdG90eXBlLmFkZFNvdXJjZSA9IGZ1bmN0aW9uKG9iamVjdCwgbm9DYWNoZSkge1xuXHRpZiAodHlwZW9mIG9iamVjdCA9PSBcInN0cmluZ1wiKSB7XG5cblx0XHRmdW5jdGlvbiBmaWxlRXhpc3RzKHVybCkge1xuXHRcdFx0XHRpZiAodXJsKSB7XG5cdFx0XHRcdFx0dmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0XHRcdHJlcS5vcGVuKCdHRVQnLCB1cmwsIGZhbHNlKTtcblx0XHRcdFx0XHRyZXEuc2VuZCgpO1xuXHRcdFx0XHRcdHJldHVybiByZXEuc3RhdHVzID09IDIwMDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qXG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGlmKCFmaWxlRXhpc3RzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaChlcnJvcikge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGxvYWQgZmlsZTogXCIsIG9iamVjdCk7XG5cdFx0XHRcdFx0fSovXG5cblx0XHR0cnkge1xuXHRcdFx0dmFyIGxvYWRlciA9IG5ldyBSZXNvdXJjZXMuSnNvbkxvYWRlcihvYmplY3QsIHRydWUsIG5vQ2FjaGUpO1xuXHRcdFx0bG9hZGVyLm9uTG9hZGVkID0gdGhpcy5vbkxvYWRlZC5iaW5kKHRoaXMsIGxvYWRlciwgdGhpcy5sb2FkSW5kZXgsIG5vQ2FjaGUpO1xuXHRcdFx0bG9hZGVyLm9uRXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcblx0XHRcdHZhciBsb2FkSW5kZXggPSBwYXJzZUludCh0aGlzLmxvYWRJbmRleCArIDApO1xuXHRcdFx0bG9hZGVyLm9uRXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzLCBsb2FkZXIsIGxvYWRJbmRleCwgbm9DYWNoZSk7XG5cdFx0XHRsb2FkZXIubG9hZCgpO1xuXHRcdFx0dGhpcy5zb3VyY2VzLnB1c2godGhpcy5sb2FkSW5kZXgpO1xuXHRcdFx0dGhpcy5sb2FkQ291bnQrKztcblx0XHRcdHRoaXMubG9hZEluZGV4Kys7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBsb2FkIGZpbGU6IFwiLCBvYmplY3QpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAodGhpcy5sb2FkQ291bnQgPD0gMCkge1xuXHRcdFx0Lypcblx0XHRcdGZvcih2YXIgcCBpbiBvYmplY3QpIHtcblx0XHRcdFx0Zm9yKHZhciBvIGluIG9iamVjdFtwXSkge1xuXHRcdFx0XHRcdHRoaXMuc291cmNlc1twXVtvXSA9IG9iamVjdFtwXVtvXTtcblx0XHRcdFx0fVxuXHRcdFx0fSovXG5cdFx0XHR0aGlzLmxvYWRDb3VudCsrO1xuXHRcdFx0dGhpcy5vbkxvYWRlZCh7XG5cdFx0XHRcdGpzb246IG9iamVjdFxuXHRcdFx0fSwgdGhpcy5sb2FkSW5kZXgpO1xuXHRcdFx0dGhpcy5sb2FkSW5kZXgrKztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zb3VyY2VzLnB1c2gob2JqZWN0KTtcblx0XHRcdHRoaXMubG9hZEluZGV4Kys7XG5cdFx0fVxuXHR9XG59O1xuXG5SZXNvdXJjZXMucHJvdG90eXBlLmdldFJlc291cmNlT2JqZWN0ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnJlc291cmNlcztcbn07XG5cblJlc291cmNlcy5wcm90b3R5cGUub25Mb2FkZWQgPSBmdW5jdGlvbihsb2FkZXIsIGxvYWRJbmRleCwgbm9DYWNoZSkge1xuXHR0aGlzLmxvYWRDb3VudC0tO1xuXG5cdGlmIChsb2FkZXIgIT0gbnVsbCkge1xuXHRcdHRoaXMuc291cmNlc1tsb2FkSW5kZXhdID0gbG9hZGVyLmpzb247XG5cdH1cblxuXHRpZiAodGhpcy5sb2FkQ291bnQgPT0gMCkge1xuXHRcdC8vY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS1cXG4odGhpcy5sb2FkQ291bnQgPT0gMClcXG4tLS0tLS0tLS0tLS0tLS1cIik7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Zm9yICh2YXIgcCBpbiB0aGlzLnNvdXJjZXNbaV0pIHtcblx0XHRcdFx0Zm9yICh2YXIgbyBpbiB0aGlzLnNvdXJjZXNbaV1bcF0pIHtcblx0XHRcdFx0XHRpZiAobyA9PSBcInRleHR1cmVzXCIpIHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbcF1bb10pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5yZXNvdXJjZXNbcF1bb10gPSBbXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBleGlzdHMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGZvciAodmFyIHQgaW4gdGhpcy5zb3VyY2VzW2ldW3BdW29dKSB7XG5cdFx0XHRcdFx0XHRcdGV4aXN0cyA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIG90ID0gMDsgb3QgPCB0aGlzLnJlc291cmNlc1twXVtvXS5sZW5ndGg7IG90KyspIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5yZXNvdXJjZXNbcF1bb11bb3RdLmlkID09IHRoaXMuc291cmNlc1tpXVtwXVtvXVt0XS5pZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXhpc3RzID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFleGlzdHMpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlc291cmNlc1twXVtvXS5wdXNoKHRoaXMuc291cmNlc1tpXVtwXVtvXVt0XSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKCh0aGlzLnNvdXJjZXNbaV1bcF1bb10gJiYgKHRoaXMuc291cmNlc1tpXVtwXVtvXSAhPSBcIlwiKSkgfHwgKCF0aGlzLnJlc291cmNlc1twXVtvXSkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5yZXNvdXJjZXNbcF1bb10gPSB0aGlzLnNvdXJjZXNbaV1bcF1bb107XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzICYmIHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzLmxlbmd0aCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IHRoaXMudGV4dHVyZUNvdW50OyBpIDwgdGhpcy5yZXNvdXJjZXMuZ3JhcGhpY3MudGV4dHVyZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dGhpcy50ZXh0dXJlQ291bnQgPSB0aGlzLnJlc291cmNlcy5ncmFwaGljcy50ZXh0dXJlcy5sZW5ndGg7XG5cdFx0XHRcdHZhciB0ZXh0dXJlT2JqZWN0ID0gdGhpcy5yZXNvdXJjZXMuZ3JhcGhpY3MudGV4dHVyZXNbaV07XG5cdFx0XHRcdHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0gPSBuZXcgUElYSS5UZXh0dXJlLmZyb21JbWFnZSh0ZXh0dXJlT2JqZWN0LmZpbGUgKyAobm9DYWNoZSA/IChcIj9fX3RpbWVzdGFtcF9fPVwiICsgRGF0ZS5ub3coKSkgOiBcIlwiKSk7XG5cdFx0XHRcdGlmICh0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdLmJhc2VUZXh0dXJlLmhhc0xvYWRlZCkge1xuXHRcdFx0XHRcdHRoaXMub25UZXh0dXJlTG9hZGVkKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhcImFkZGluZyBsaXN0ZW5lcnMgdG86IFwiLCB0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdLmJhc2VUZXh0dXJlLmltYWdlVXJsKTtcblx0XHRcdFx0XHR0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdLmJhc2VUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIiwgdGhpcy5vblRleHR1cmVMb2FkZWQuYmluZCh0aGlzKSk7XG5cdFx0XHRcdFx0dGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXS5iYXNlVGV4dHVyZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdGhpcy5vblRleHR1cmVFcnJvci5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoUmVzb3VyY2VzLkxvYWRlZCk7XG5cdFx0fVxuXG5cdFx0Ly90aGlzLnRyaWdnZXIoUmVzb3VyY2VzLkxvYWRlZCk7XG5cdH1cbn07XG5cblJlc291cmNlcy5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKGxvYWRlciwgbG9hZEluZGV4LCBub0NhY2hlKSB7XG5cdHZhciBtZXNzYWdlO1xuXG5cdGlmIChsb2FkZXIuaGFzT3duUHJvcGVydHkoXCJlcnJvck1lc3NhZ2VcIikpXG5cdFx0bWVzc2FnZSA9IGxvYWRlci5lcnJvck1lc3NhZ2U7XG5cblx0ZWxzZVxuXHRcdG1lc3NhZ2UgPSBcIlVua25vd24gZXJyb3JcIjtcblxuXHR0aGlzLnRyaWdnZXIoUmVzb3VyY2VzLkVycm9yLCBtZXNzYWdlKTtcblx0cmV0dXJuO1xuXG5cdHRoaXMubG9hZENvdW50LS07XG5cblx0aWYgKHRoaXMubG9hZENvdW50IDw9IDApIHtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmb3IgKHZhciBwIGluIHRoaXMuc291cmNlc1tpXSkge1xuXHRcdFx0XHRmb3IgKHZhciBvIGluIHRoaXMuc291cmNlc1tpXVtwXSkge1xuXHRcdFx0XHRcdGlmIChvID09IFwidGV4dHVyZXNcIikge1xuXHRcdFx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1twXVtvXSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc291cmNlc1twXVtvXSA9IFtdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIGV4aXN0cyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgdCBpbiB0aGlzLnNvdXJjZXNbaV1bcF1bb10pIHtcblx0XHRcdFx0XHRcdFx0ZXhpc3RzID0gZmFsc2U7XG5cblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgb3QgPSAwOyBvdCA8IHRoaXMucmVzb3VyY2VzW3BdW29dLmxlbmd0aDsgb3QrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLnJlc291cmNlc1twXVtvXVtvdF0uaWQgPT0gdGhpcy5zb3VyY2VzW2ldW3BdW29dW3RdLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRleGlzdHMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIWV4aXN0cykge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucmVzb3VyY2VzW3BdW29dLnB1c2godGhpcy5zb3VyY2VzW2ldW3BdW29dW3RdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoKHRoaXMuc291cmNlc1tpXVtwXVtvXSAmJiAodGhpcy5zb3VyY2VzW2ldW3BdW29dICE9IFwiXCIpKSB8fCAoIXRoaXMucmVzb3VyY2VzW3BdW29dKSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlc291cmNlc1twXVtvXSA9IHRoaXMuc291cmNlc1tpXVtwXVtvXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gdGhpcy50ZXh0dXJlQ291bnQ7IGkgPCB0aGlzLnJlc291cmNlcy5ncmFwaGljcy50ZXh0dXJlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR0aGlzLnRleHR1cmVDb3VudCA9IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzLmxlbmd0aDtcblx0XHRcdFx0dmFyIHRleHR1cmVPYmplY3QgPSB0aGlzLnJlc291cmNlcy5ncmFwaGljcy50ZXh0dXJlc1tpXTtcblx0XHRcdFx0dGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXSA9IG5ldyBQSVhJLlRleHR1cmUuZnJvbUltYWdlKHRleHR1cmVPYmplY3QuZmlsZSArIChub0NhY2hlID8gKFwiP19fdGltZXN0YW1wX189XCIgKyBEYXRlLm5vdygpKSA6IFwiXCIpKTtcblx0XHRcdFx0aWYgKHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0uYmFzZVRleHR1cmUuaGFzTG9hZGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5vblRleHR1cmVMb2FkZWQoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKFwiYWRkaW5nIGxpc3RlbmVycyB0bzogXCIsIHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0uYmFzZVRleHR1cmUuaW1hZ2VVcmwpO1xuXHRcdFx0XHRcdHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0uYmFzZVRleHR1cmUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZFwiLCB0aGlzLm9uVGV4dHVyZUxvYWRlZC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHR0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdLmJhc2VUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCB0aGlzLm9uVGV4dHVyZUVycm9yLmJpbmQodGhpcykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudHJpZ2dlcihSZXNvdXJjZXMuTG9hZGVkKTtcblx0XHR9XG5cblx0fVxufTtcblxuUmVzb3VyY2VzLnByb3RvdHlwZS5vblRleHR1cmVMb2FkZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHR0aGlzLnRleHR1cmVzTG9hZGVkKys7XG5cdGlmIChldmVudCAmJiBldmVudC5jb250ZW50KSB7XG5cdFx0ZXZlbnQuY29udGVudC5yZW1vdmVBbGxFdmVudExpc3RlbmVycygpO1xuXHR9XG5cdC8vY29uc29sZS5sb2coXCJcXG4tLS0tLS0tLS1cIik7XG5cdC8vY29uc29sZS5sb2coXCJSZXNvdXJjZXMucHJvdG90eXBlLm9uVGV4dHVyZUxvYWRlZDogdGhpcy50ZXh0dXJlc0xvYWRlZCA9IFwiLCB0aGlzLnRleHR1cmVzTG9hZGVkLCBcIiwgdGhpcy50ZXh0dXJlQ291bnQgPSBcIiwgdGhpcy50ZXh0dXJlQ291bnQsIFwiLCBldmVudCA9IFwiLCBldmVudCk7XG5cdC8vY29uc29sZS5sb2coXCItLS0tLS0tLS1cXG5cIik7XG5cdGlmICh0aGlzLnRleHR1cmVzTG9hZGVkID49IHRoaXMudGV4dHVyZUNvdW50KSB7XG5cdFx0dGhpcy50cmlnZ2VyKFJlc291cmNlcy5Mb2FkZWQpO1xuXHR9XG59O1xuXG5SZXNvdXJjZXMucHJvdG90eXBlLm9uVGV4dHVyZUVycm9yID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0dGhpcy50ZXh0dXJlc0xvYWRlZCsrO1xuXHRpZiAodGhpcy50ZXh0dXJlc0xvYWRlZCA+PSB0aGlzLnRleHR1cmVDb3VudCkge1xuXHRcdHRoaXMudHJpZ2dlcihSZXNvdXJjZXMuTG9hZGVkKTtcblx0fVxufTtcblxuLyoqXG4gKiBHZXQgdmFsdWUgZnJvbSBlaXRoZXIgbG9hZGVkIHNraW4gb3IgZGVmYXVsdCBza2luLlxuICogQG1ldGhvZCBnZXRWYWx1ZVxuICovXG5SZXNvdXJjZXMucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24oa2V5KSB7XG5cdHZhciB2YWx1ZSA9IHRoaXMucmVzb3VyY2VzLnZhbHVlc1trZXldO1xuXG5cdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBza2luIGtleTogXCIgKyBrZXkpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIEdldCBjb2xvciBmcm9tIGVpdGhlciBsb2FkZWQgc2tpbiBvciBkZWZhdWx0IHNraW4uXG4gKiBAbWV0aG9kIGdldENvbG9yXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0Q29sb3IgPSBmdW5jdGlvbihrZXkpIHtcblx0dmFyIHZhbHVlID0gbnVsbDtcblxuXHRpZiAoKHRoaXMucmVzb3VyY2VzICE9IG51bGwpICYmICh0aGlzLnJlc291cmNlcy5jb2xvcnNba2V5XSAhPSBudWxsKSkge1xuXHRcdHZhbHVlID0gdGhpcy5yZXNvdXJjZXMuY29sb3JzW2tleV07XG5cdH1cblxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2tpbiBrZXk6IFwiICsga2V5KTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgcG9pbnQgZnJvbSBlaXRoZXIgbG9hZGVkIHNraW4gb3IgZGVmYXVsdCBza2luLlxuICogQG1ldGhvZCBnZXRQb2ludFxuICovXG5SZXNvdXJjZXMucHJvdG90eXBlLmdldFBvaW50ID0gZnVuY3Rpb24oa2V5KSB7XG5cdHZhciB2YWx1ZSA9IG51bGw7XG5cblx0aWYgKCh0aGlzLnJlc291cmNlcyAhPSBudWxsKSAmJiAodGhpcy5yZXNvdXJjZXMucG9zaXRpb25zW2tleV0gIT0gbnVsbCkpIHtcblx0XHR2YWx1ZSA9IG5ldyBQSVhJLlBvaW50KFxuXHRcdFx0cGFyc2VGbG9hdCh0aGlzLnJlc291cmNlcy5wb3NpdGlvbnNba2V5XVswXSksXG5cdFx0XHRwYXJzZUZsb2F0KHRoaXMucmVzb3VyY2VzLnBvc2l0aW9uc1trZXldWzFdKVxuXHRcdCk7XG5cdH1cblxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2tpbiBrZXk6IFwiICsga2V5KTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBHZXQgdGV4dHVyZSBmcm9tIGVpdGhlciBsb2FkZWQgcmVzb3VyY2VzLlxuICogQG1ldGhvZCBnZXRUZXh0dXJlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0VGV4dHVyZSA9IGZ1bmN0aW9uKGtleSkge1xuXHR2YXIgdmFsdWUgPSBudWxsO1xuXHR2YXIgaXNEZWZhdWx0ID0gZmFsc2U7XG5cdHZhciB0ZXh0dXJlID0gbnVsbDtcblx0dmFyIGZyYW1lID0gbnVsbDtcblxuXG5cdGlmICgodGhpcy5yZXNvdXJjZXMgIT0gbnVsbCkgJiYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV0gIT0gbnVsbCkpIHtcblx0XHR2YWx1ZSA9IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV07XG5cdH1cblxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcga2V5OiBcIiArIGtleSk7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRpZiAodmFsdWUudGV4dHVyZSAhPSBudWxsKSB7XG5cdFx0dGV4dHVyZSA9IHZhbHVlLnRleHR1cmU7XG5cdH1cblxuXHRpZiAodmFsdWUuY29vcmRzICE9IG51bGwpIHtcblx0XHRmcmFtZSA9IHZhbHVlLmNvb3Jkcztcblx0fVxuXG5cdGlmICh0ZXh0dXJlICE9IG51bGwpIHtcblx0XHRpZiAoZnJhbWUgIT0gbnVsbClcblx0XHRcdHJldHVybiB0aGlzLmdldENvbXBvbmVudHNQYXJ0KHRleHR1cmUsIGZyYW1lWzBdLCBmcmFtZVsxXSwgZnJhbWVbMl0sIGZyYW1lWzNdKTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRDb21wb25lbnRzUGFydCh0ZXh0dXJlLCBmcmFtZSk7XG5cdH1cblxuXG5cblx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBrZXk6IFwiICsga2V5KTtcblxuXHRyZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgdGV4dHVyZSBmcm9tIGVpdGhlciBsb2FkZWQgcmVzb3VyY2VzLlxuICogQG1ldGhvZCBnZXRET01UZXh0dXJlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0RE9NVGV4dHVyZSA9IGZ1bmN0aW9uKGtleSkge1xuXHR2YXIgdmFsdWUgPSBudWxsO1xuXHR2YXIgaXNEZWZhdWx0ID0gZmFsc2U7XG5cdHZhciB0ZXh0dXJlID0gbnVsbDtcblx0dmFyIGZyYW1lID0gbnVsbDtcblxuXG5cdGlmICgodGhpcy5yZXNvdXJjZXMgIT0gbnVsbCkgJiYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV0gIT0gbnVsbCkpIHtcblx0XHR2YWx1ZSA9IHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzW2tleV07XG5cdH1cblxuXHRpZiAodmFsdWUudGV4dHVyZSAhPSBudWxsKSB7XG5cdFx0dGV4dHVyZSA9IHZhbHVlLnRleHR1cmU7XG5cdH1cblxuXHRpZiAodmFsdWUuY29vcmRzICE9IG51bGwpIHtcblx0XHRmcmFtZSA9IHZhbHVlLmNvb3Jkcztcblx0fVxuXG5cdGlmICh0ZXh0dXJlICE9IG51bGwpIHtcblx0XHRpZiAoZnJhbWUgIT0gbnVsbClcblx0XHRcdHJldHVybiB0aGlzLmdldERPTUNvbXBvbmVudHNQYXJ0KHRleHR1cmUsIGZyYW1lWzBdLCBmcmFtZVsxXSwgZnJhbWVbMl0sIGZyYW1lWzNdKTtcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRET01Db21wb25lbnRzUGFydCh0ZXh0dXJlLCBmcmFtZSk7XG5cdH1cblxuXG5cdHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEdldCBwYXJ0IGZyb20gY29tcG9uZW50cyBhdGxhcy5cbiAqIEBtZXRob2QgZ2V0Q29tcG9uZW50c1BhcnRcbiAqIEBwcml2YXRlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0Q29tcG9uZW50c1BhcnQgPSBmdW5jdGlvbih0ZXh0dXJlaWQsIHgsIHksIHcsIGgpIHtcblxuXHR2YXIgZnJhbWU7XG5cdHZhciB0ZXh0dXJlID0gdGhpcy5nZXRUZXh0dXJlRnJvbVNraW4odGV4dHVyZWlkKTtcblxuXHRpZiAoeCA9PT0gbnVsbCkge1xuXHRcdGZyYW1lID0ge1xuXHRcdFx0eDogMCxcblx0XHRcdHk6IDAsXG5cdFx0XHR3aWR0aDogdGV4dHVyZS53aWR0aCxcblx0XHRcdGhlaWdodDogdGV4dHVyZS5oZWlnaHRcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGZyYW1lID0ge1xuXHRcdFx0eDogeCxcblx0XHRcdHk6IHksXG5cdFx0XHR3aWR0aDogdyxcblx0XHRcdGhlaWdodDogaFxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gbmV3IFBJWEkuVGV4dHVyZSh0ZXh0dXJlLCBmcmFtZSk7XG59XG5cbi8qKlxuICogR2V0IHBhcnQgZnJvbSBjb21wb25lbnRzIGF0bGFzLlxuICogQG1ldGhvZCBnZXRET01Db21wb25lbnRzUGFydFxuICogQHByaXZhdGVcbiAqL1xuUmVzb3VyY2VzLnByb3RvdHlwZS5nZXRET01Db21wb25lbnRzUGFydCA9IGZ1bmN0aW9uKHRleHR1cmVpZCwgeCwgeSwgdywgaCkge1xuXG5cdHZhciB0ZXh0dXJlID0gdGhpcy5nZXRDb21wb25lbnRzUGFydCh0ZXh0dXJlaWQsIHgsIHksIHcsIGgpO1xuXG5cdHZhciBkb20gPSB0ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZS5jbG9uZU5vZGUoKTtcblx0ZG9tLnNyYyA9IGRvbS5zcmMgKyBcIj9fX3RpbWVzdGFtcF9fPVwiICsgRGF0ZS5ub3coKTtcblxuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0ZGl2LmFwcGVuZENoaWxkKGRvbSk7XG5cdGRvbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0ZG9tLnN0eWxlLmxlZnQgPSBcIi1cIiArIHggKyBcInB4XCI7XG5cdGRvbS5zdHlsZS50b3AgPSBcIi1cIiArIHkgKyBcInB4XCI7XG5cblx0ZGl2LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblx0ZGl2LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcblx0ZGl2LnN0eWxlLmhlaWdodCA9IGggKyBcInB4XCI7XG5cblx0cmV0dXJuIGRpdjtcbn1cblxuLyoqXG4gKiBHZXQgdGV4dHVyZSBvYmplY3QgZnJvbSBza2luLlxuICogQG1ldGhvZCBnZXRUZXh0dXJlRnJvbVNraW5cbiAqIEBwcml2YXRlXG4gKi9cblJlc291cmNlcy5wcm90b3R5cGUuZ2V0VGV4dHVyZUZyb21Ta2luID0gZnVuY3Rpb24odGV4dHVyZWlkKSB7XG5cblx0dmFyIHRleHR1cmVPYmplY3QgPSBudWxsO1xuXG5cdGlmICgodGhpcy5yZXNvdXJjZXMgIT0gbnVsbCkgJiYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzICE9IG51bGwpKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJlc291cmNlcy5ncmFwaGljcy50ZXh0dXJlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMucmVzb3VyY2VzLmdyYXBoaWNzLnRleHR1cmVzW2ldLmlkID09IHRleHR1cmVpZCkge1xuXHRcdFx0XHR0ZXh0dXJlT2JqZWN0ID0gdGhpcy5yZXNvdXJjZXMuZ3JhcGhpY3MudGV4dHVyZXNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKHRleHR1cmVPYmplY3QgPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcInRleHR1cmVpZCBkb2Vzbid0IGV4aXN0OiBcIiArIHRleHR1cmVpZCk7XG5cdH1cblxuXHRpZiAodGhpcy50ZXh0dXJlc1t0ZXh0dXJlT2JqZWN0LmlkXSA9PSBudWxsKVxuXHRcdHRoaXMudGV4dHVyZXNbdGV4dHVyZU9iamVjdC5pZF0gPSBuZXcgUElYSS5UZXh0dXJlLmZyb21JbWFnZSh0ZXh0dXJlT2JqZWN0LmZpbGUpO1xuXG5cdHJldHVybiB0aGlzLnRleHR1cmVzW3RleHR1cmVPYmplY3QuaWRdO1xufVxuXG4vKipcbiAqIEBjbGFzcyBSZXNvdXJjZXMuSnNvbkxvYWRlclxuICovXG5SZXNvdXJjZXMuSnNvbkxvYWRlciA9IGZ1bmN0aW9uKHVybCwgY3Jvc3NvcmlnaW4sIG5vQ2FjaGUpIHtcblx0UElYSS5Kc29uTG9hZGVyLmNhbGwodGhpcywgdXJsICsgKG5vQ2FjaGUgPyAoXCI/dGltZXN0YW1wPVwiICsgRGF0ZS5ub3coKSkgOiBcIlwiKSwgY3Jvc3NvcmlnaW4pO1xuXHR0aGlzLm5vQ2FjaGUgPSBub0NhY2hlO1xufTtcblJlc291cmNlcy5Kc29uTG9hZGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUElYSS5Kc29uTG9hZGVyLnByb3RvdHlwZSk7XG5SZXNvdXJjZXMuSnNvbkxvYWRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZXNvdXJjZXMuSnNvbkxvYWRlcjtcblxuXG4vKipcbiAqIEludm9rZSB3aGVuIEpTT04gZmlsZSBpcyBsb2FkZWRcbiAqXG4gKiBAbWV0aG9kIG9uSlNPTkxvYWRlZFxuICogQHByaXZhdGVcbiAqL1xuUmVzb3VyY2VzLkpzb25Mb2FkZXIucHJvdG90eXBlLm9uSlNPTkxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuXG5cdGlmICghdGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQpIHtcblx0XHR0aGlzLm9uRXJyb3IoKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0cnkge1xuXHRcdHRoaXMuanNvbiA9IEpTT04ucGFyc2UodGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Y29uc29sZS5sb2codGhpcy5hamF4UmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXG5cdFx0dGhpcy5qc29uID0ge307XG5cdFx0dGhpcy5lcnJvck1lc3NhZ2UgPSBcIlVuYWJsZSB0byBwYXJzZSBKU09OXCI7XG5cdFx0dGhpcy5vbkVycm9yKCk7XG5cdFx0Ly90aGlzLm9uTG9hZGVkKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHRoaXMuanNvbi5mcmFtZXMpIHtcblx0XHQvLyBzcHJpdGUgc2hlZXRcblx0XHR2YXIgc2NvcGUgPSB0aGlzO1xuXHRcdHZhciB0ZXh0dXJlVXJsID0gdGhpcy5iYXNlVXJsICsgdGhpcy5qc29uLm1ldGEuaW1hZ2UgKyAodGhpcy5ub0NhY2hlID8gKFwiP19fdGltZXN0YW1wX189XCIgKyBEYXRlLm5vdygpKSA6IFwiXCIpO1xuXHRcdHZhciBpbWFnZSA9IG5ldyBQSVhJLkltYWdlTG9hZGVyKHRleHR1cmVVcmwsIHRoaXMuY3Jvc3NvcmlnaW4pO1xuXHRcdHZhciBmcmFtZURhdGEgPSB0aGlzLmpzb24uZnJhbWVzO1xuXG5cdFx0dGhpcy50ZXh0dXJlID0gaW1hZ2UudGV4dHVyZS5iYXNlVGV4dHVyZTtcblx0XHRpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdHNjb3BlLm9uTG9hZGVkKCk7XG5cdFx0fSk7XG5cblx0XHRmb3IgKHZhciBpIGluIGZyYW1lRGF0YSkge1xuXHRcdFx0dmFyIHJlY3QgPSBmcmFtZURhdGFbaV0uZnJhbWU7XG5cblx0XHRcdGlmIChyZWN0KSB7XG5cdFx0XHRcdFBJWEkuVGV4dHVyZUNhY2hlW2ldID0gbmV3IFBJWEkuVGV4dHVyZSh0aGlzLnRleHR1cmUsIHtcblx0XHRcdFx0XHR4OiByZWN0LngsXG5cdFx0XHRcdFx0eTogcmVjdC55LFxuXHRcdFx0XHRcdHdpZHRoOiByZWN0LncsXG5cdFx0XHRcdFx0aGVpZ2h0OiByZWN0Lmhcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0UElYSS5UZXh0dXJlQ2FjaGVbaV0uY3JvcCA9IG5ldyBQSVhJLlJlY3RhbmdsZShyZWN0LngsIHJlY3QueSwgcmVjdC53LCByZWN0LmgpO1xuXG5cdFx0XHRcdC8vICBDaGVjayB0byBzZWUgaWYgdGhlIHNwcml0ZSBpcyB0cmltbWVkXG5cdFx0XHRcdGlmIChmcmFtZURhdGFbaV0udHJpbW1lZCkge1xuXHRcdFx0XHRcdHZhciBhY3R1YWxTaXplID0gZnJhbWVEYXRhW2ldLnNvdXJjZVNpemU7XG5cdFx0XHRcdFx0dmFyIHJlYWxTaXplID0gZnJhbWVEYXRhW2ldLnNwcml0ZVNvdXJjZVNpemU7XG5cdFx0XHRcdFx0UElYSS5UZXh0dXJlQ2FjaGVbaV0udHJpbSA9IG5ldyBQSVhJLlJlY3RhbmdsZShyZWFsU2l6ZS54LCByZWFsU2l6ZS55LCBhY3R1YWxTaXplLncsIGFjdHVhbFNpemUuaCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpbWFnZS5sb2FkKCk7XG5cblx0fSBlbHNlIGlmICh0aGlzLmpzb24uYm9uZXMpIHtcblx0XHQvLyBzcGluZSBhbmltYXRpb25cblx0XHR2YXIgc3BpbmVKc29uUGFyc2VyID0gbmV3IHNwaW5lLlNrZWxldG9uSnNvbigpO1xuXHRcdHZhciBza2VsZXRvbkRhdGEgPSBzcGluZUpzb25QYXJzZXIucmVhZFNrZWxldG9uRGF0YSh0aGlzLmpzb24pO1xuXHRcdFBJWEkuQW5pbUNhY2hlW3RoaXMudXJsXSA9IHNrZWxldG9uRGF0YTtcblx0XHR0aGlzLm9uTG9hZGVkKCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5vbkxvYWRlZCgpO1xuXHR9XG59O1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNvdXJjZXM7Il19
