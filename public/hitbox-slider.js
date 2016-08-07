/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var plyr = __webpack_require__(5);
	var plyrOptions = __webpack_require__(6);

	// @see https://gist.github.com/josh/8177583
	var domContentLoadedPromise = new Promise(function (resolve) {
	  if (document.readyState === 'complete') {
	    resolve();
	  } else {
	    (function () {
	      var onReady = function onReady() {
	        resolve();
	        document.removeEventListener('DOMContentLoaded', onReady, true);
	        window.removeEventListener('load', onReady, true);
	      };
	      document.addEventListener('DOMContentLoaded', onReady, true);
	      window.addEventListener('load', onReady, true);
	    })();
	  }
	});

	domContentLoadedPromise.then(function () {
	  plyr.setup('.hitbox-slider', plyrOptions).forEach(function (slider) {
	    var player = slider.plyr;
	    var frameTime = 1 / 60;

	    var startX = void 0;
	    var startVideoTime = void 0;
	    var wasVideoPaused = void 0;
	    var hasControlledPlayer = false;
	    var videoControllingTimer = void 0;

	    var touchStart = function touchStart(event) {
	      if (!event.target.classList.contains('hitbox-slider')) {
	        return;
	      }
	      event.stopPropagation();
	      event.preventDefault();

	      wasVideoPaused = player.media.paused;
	      hasControlledPlayer = false;
	      clearTimeout(videoControllingTimer);
	      videoControllingTimer = setTimeout(function () {
	        hasControlledPlayer = true;
	      }, 500);
	      player.pause();

	      startX = event.pageX || event.changedTouches[0].pageX;
	      startVideoTime = player.getCurrentTime();
	    };

	    var touchEnd = function touchEnd(event) {
	      if (!event.target.classList.contains('hitbox-slider')) {
	        return;
	      }
	      event.stopPropagation();
	      event.preventDefault();

	      startX = undefined;
	      startVideoTime = undefined;

	      if (hasControlledPlayer !== wasVideoPaused) {
	        player.play();
	        return;
	      }
	      player.pause();
	    };

	    var touchMove = function touchMove(event) {
	      if (!event.target.classList.contains('hitbox-slider')) {
	        return;
	      }

	      // マウスを押し込んだままエレメント外に出たときなどに発生する
	      if (!(event.buttons & 1 || event.touches && event.touches.length > 0)) {
	        startX = undefined;
	        startVideoTime = undefined;
	      }
	      if (startX === undefined || startVideoTime === undefined) {
	        return;
	      }

	      event.stopPropagation();
	      event.preventDefault();

	      var distanceX = (event.pageX || event.changedTouches[0].pageX) - startX;
	      var forwardTime = frameTime * distanceX * Math.abs(distanceX) * 0.0005;

	      // 1 F 以上動かしたらコントロールしたものとする
	      if (Math.floor(Math.abs(forwardTime)) > 0) {
	        hasControlledPlayer = true;
	      }

	      player.seek(startVideoTime + forwardTime);
	    };

	    slider.addEventListener('mousedown', touchStart);
	    slider.addEventListener('touchstart', touchStart);
	    slider.addEventListener('mousemove', touchMove);
	    slider.addEventListener('touchmove', touchMove);
	    slider.addEventListener('mouseup', touchEnd);
	    slider.addEventListener('touchend', touchEnd);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./plyr.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./plyr.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".plyr .plyr__video-embed iframe,.plyr__tooltip{pointer-events:none}@-webkit-keyframes plyr-progress{to{background-position:25px 0}}@keyframes plyr-progress{to{background-position:25px 0}}.plyr{position:relative;max-width:100%;min-width:200px;font-family:'San Francisco',-apple-system,BlinkMacSystemFont,'.SFNSText-Regular',Avenir,'Avenir Next','Helvetica Neue','Segoe UI',Helvetica,Arial,sans-serif;direction:ltr}.plyr,.plyr *,.plyr ::after,.plyr ::before{box-sizing:border-box}.plyr a,.plyr button,.plyr input,.plyr label{-ms-touch-action:manipulation;touch-action:manipulation}.plyr audio,.plyr video{width:100%;height:auto;vertical-align:middle;border-radius:inherit}.plyr input[type=range]{display:block;height:20px;width:100%;margin:0;padding:0;vertical-align:middle;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;border:none;background:0 0}.plyr input[type=range]::-webkit-slider-runnable-track{height:8px;background:0 0;border:0;border-radius:4px;-webkit-user-select:none;user-select:none}.plyr input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-4px;position:relative;height:16px;width:16px;background:#fff;border:2px solid transparent;border-radius:100%;transition:background .2s ease,border .2s ease,-webkit-transform .2s ease;transition:background .2s ease,border .2s ease,transform .2s ease;transition:background .2s ease,border .2s ease,transform .2s ease,-webkit-transform .2s ease;box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.15);box-sizing:border-box}.plyr input[type=range]::-moz-range-track{height:8px;background:0 0;border:0;border-radius:4px;-moz-user-select:none;user-select:none}.plyr input[type=range]::-moz-range-thumb{position:relative;height:16px;width:16px;background:#fff;border:2px solid transparent;border-radius:100%;transition:background .2s ease,border .2s ease,-webkit-transform .2s ease;transition:background .2s ease,border .2s ease,transform .2s ease;transition:background .2s ease,border .2s ease,transform .2s ease,-webkit-transform .2s ease;box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.15);box-sizing:border-box}.plyr input[type=range]::-ms-track{height:8px;background:0 0;border:0;color:transparent}.plyr input[type=range]::-ms-fill-upper{height:8px;background:0 0;border:0;border-radius:4px;-ms-user-select:none;user-select:none}.plyr input[type=range]::-ms-fill-lower{height:8px;border:0;border-radius:4px;-ms-user-select:none;user-select:none;background:#3498db}.plyr input[type=range]::-ms-thumb{position:relative;height:16px;width:16px;background:#fff;border:2px solid transparent;border-radius:100%;transition:background .2s ease,border .2s ease,-webkit-transform .2s ease;transition:background .2s ease,border .2s ease,transform .2s ease;transition:background .2s ease,border .2s ease,transform .2s ease,-webkit-transform .2s ease;box-shadow:0 1px 1px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.15);box-sizing:border-box;margin-top:0}.plyr input[type=range]::-ms-tooltip{display:none}.plyr input[type=range]:focus{outline:0}.plyr input[type=range]::-moz-focus-outer{border:0}.plyr input[type=range].tab-focus:focus{outline-offset:3px}.plyr input[type=range]:active::-webkit-slider-thumb{background:#3498db;border-color:#fff;-webkit-transform:scale(1.25);transform:scale(1.25)}.plyr input[type=range]:active::-moz-range-thumb{background:#3498db;border-color:#fff;transform:scale(1.25)}.plyr input[type=range]:active::-ms-thumb{background:#3498db;border-color:#fff;transform:scale(1.25)}.plyr--video input[type=range].tab-focus:focus{outline:rgba(255,255,255,.5) dotted 1px}.plyr--audio input[type=range].tab-focus:focus{outline:rgba(86,93,100,.5) dotted 1px}.plyr__sr-only{clip:rect(1px,1px,1px,1px);overflow:hidden;position:absolute!important;padding:0!important;border:0!important;height:1px!important;width:1px!important}.plyr__video-wrapper{position:relative;background:#000;border-radius:inherit;-webkit-mask-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)}.plyr__video-embed{padding-bottom:56.25%;height:0;overflow:hidden}.plyr__video-embed iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.plyr__video-embed>div{position:relative;padding-bottom:200%;-webkit-transform:translateY(-35.95%);transform:translateY(-35.95%)}.plyr video::-webkit-media-text-track-container{display:none}.plyr__captions{display:none;position:absolute;bottom:0;left:0;width:100%;padding:20px;-webkit-transform:translateY(-40px);transform:translateY(-40px);transition:-webkit-transform .3s ease;transition:transform .3s ease;transition:transform .3s ease,-webkit-transform .3s ease;color:#fff;font-size:16px;text-align:center;font-weight:400}.plyr__captions span{border-radius:2px;padding:3px 10px;background:rgba(0,0,0,.7);-webkit-box-decoration-break:clone;box-decoration-break:clone;line-height:150%}.plyr__captions span:empty{display:none}@media (min-width:768px){.plyr__captions{font-size:24px}}.plyr--captions-active .plyr__captions{display:block}.plyr--fullscreen-active .plyr__captions{font-size:32px}.plyr--hide-controls .plyr__captions{-webkit-transform:translateY(-15px);transform:translateY(-15px)}.plyr ::-webkit-media-controls{display:none}.plyr__controls{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;line-height:1;text-align:center}.plyr__controls .plyr__progress,.plyr__controls .plyr__time,.plyr__controls>button{margin-left:5px}.plyr__controls .plyr__progress:first-child,.plyr__controls .plyr__time:first-child,.plyr__controls>button:first-child{margin-left:0}.plyr__controls .plyr__volume{margin-left:5px}.plyr__controls [data-plyr=pause]{margin-left:0}.plyr__controls button{position:relative;display:inline-block;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;overflow:visible;vertical-align:middle;padding:7px;border:0;background:0 0;border-radius:3px;cursor:pointer;transition:background .3s ease,color .3s ease,opacity .3s ease;color:inherit}.plyr__controls button svg{width:18px;height:18px;display:block;fill:currentColor}.plyr__controls button:focus{outline:0}.plyr__controls .icon--captions-on,.plyr__controls .icon--exit-fullscreen,.plyr__controls .icon--muted{display:none}@media (min-width:480px){.plyr__controls .plyr__progress,.plyr__controls .plyr__time,.plyr__controls>button{margin-left:10px}}.plyr--hide-controls .plyr__controls{opacity:0;pointer-events:none}.plyr--video .plyr__controls{position:absolute;left:0;right:0;bottom:0;padding:50px 10px 10px;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5));border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;color:#fff;transition:opacity .3s ease}.plyr--video .plyr__controls button.tab-focus:focus,.plyr--video .plyr__controls button:hover{background:#3498db;color:#fff}.plyr--audio .plyr__controls{padding:10px;border-radius:inherit;background:#fff;border:1px solid #dbe3e8;color:#565D64}.plyr--audio .plyr__controls button.tab-focus:focus,.plyr--audio .plyr__controls button:hover,.plyr__play-large{background:#3498db;color:#fff}.plyr__play-large{display:none;position:absolute;z-index:1;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding:10px;border:4px solid currentColor;border-radius:100%;box-shadow:0 1px 1px rgba(0,0,0,.15);transition:all .3s ease}.plyr__play-large svg{position:relative;left:2px;width:20px;height:20px;display:block;fill:currentColor}.plyr__play-large:focus{outline:rgba(255,255,255,.5) dotted 1px}.plyr .plyr__play-large{display:inline-block}.plyr--audio .plyr__play-large,.plyr--playing .plyr__controls [data-plyr=play],.plyr__controls [data-plyr=pause]{display:none}.plyr--playing .plyr__play-large{opacity:0;visibility:hidden}.plyr--playing .plyr__controls [data-plyr=pause]{display:inline-block}.plyr--captions-active .plyr__controls .icon--captions-on,.plyr--fullscreen-active .icon--exit-fullscreen,.plyr--muted .plyr__controls .icon--muted{display:block}.plyr [data-plyr=fullscreen],.plyr [data-plyr=captions],.plyr--captions-active .plyr__controls .icon--captions-on+svg,.plyr--fullscreen-active .icon--exit-fullscreen+svg,.plyr--muted .plyr__controls .icon--muted+svg{display:none}.plyr--captions-enabled [data-plyr=captions],.plyr--fullscreen-enabled [data-plyr=fullscreen]{display:inline-block}.plyr__tooltip{position:absolute;z-index:2;bottom:100%;margin-bottom:10px;padding:5px 7.5px;opacity:0;background:rgba(0,0,0,.7);border-radius:3px;color:#fff;font-size:14px;line-height:1.3;-webkit-transform:translate(-50%,10px) scale(.8);transform:translate(-50%,10px) scale(.8);-webkit-transform-origin:50% 100%;transform-origin:50% 100%;transition:opacity .2s .1s ease,-webkit-transform .2s .1s ease;transition:transform .2s .1s ease,opacity .2s .1s ease;transition:transform .2s .1s ease,opacity .2s .1s ease,-webkit-transform .2s .1s ease}.plyr__tooltip::before{content:'';position:absolute;width:0;height:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:-4px;border-right:4px solid transparent;border-top:4px solid rgba(0,0,0,.7);border-left:4px solid transparent;z-index:2}.plyr button.tab-focus:focus .plyr__tooltip,.plyr button:hover .plyr__tooltip,.plyr__tooltip--visible{opacity:1;-webkit-transform:translate(-50%,0) scale(1);transform:translate(-50%,0) scale(1)}.plyr button:hover .plyr__tooltip{z-index:3}.plyr__controls button:first-child .plyr__tooltip{left:0;-webkit-transform:translate(0,10px) scale(.8);transform:translate(0,10px) scale(.8);-webkit-transform-origin:0 100%;transform-origin:0 100%}.plyr__controls button:first-child .plyr__tooltip::before{left:16px}.plyr__controls button:last-child .plyr__tooltip{right:0;-webkit-transform:translate(0,10px) scale(.8);transform:translate(0,10px) scale(.8);-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.plyr__controls button:last-child .plyr__tooltip::before{left:auto;right:16px;-webkit-transform:translateX(50%);transform:translateX(50%)}.plyr__controls button:first-child .plyr__tooltip--visible,.plyr__controls button:first-child.tab-focus:focus .plyr__tooltip,.plyr__controls button:first-child:hover .plyr__tooltip,.plyr__controls button:last-child .plyr__tooltip--visible,.plyr__controls button:last-child.tab-focus:focus .plyr__tooltip,.plyr__controls button:last-child:hover .plyr__tooltip{-webkit-transform:translate(0,0) scale(1);transform:translate(0,0) scale(1)}.plyr__progress{position:relative;display:none;-webkit-flex:1;-ms-flex:1;flex:1}.plyr__progress input[type=range]{position:relative;z-index:2}.plyr__progress input[type=range]::-webkit-slider-runnable-track{background:0 0}.plyr__progress input[type=range]::-moz-range-track{background:0 0}.plyr__progress input[type=range]::-ms-fill-upper{background:0 0}.plyr__progress .plyr__tooltip{left:0}.plyr .plyr__progress{display:inline-block}.plyr__progress--buffer,.plyr__progress--played,.plyr__volume--display{position:absolute;left:0;top:50%;width:100%;height:8px;margin:-4px 0 0;padding:0;vertical-align:top;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;border-radius:100px}.plyr__progress--buffer::-webkit-progress-bar,.plyr__progress--played::-webkit-progress-bar,.plyr__volume--display::-webkit-progress-bar{background:0 0}.plyr__progress--buffer::-webkit-progress-value,.plyr__progress--played::-webkit-progress-value,.plyr__volume--display::-webkit-progress-value{background:currentColor;border-radius:100px;min-width:8px}.plyr__progress--buffer::-moz-progress-bar,.plyr__progress--played::-moz-progress-bar,.plyr__volume--display::-moz-progress-bar{background:currentColor;border-radius:100px;min-width:8px}.plyr__progress--buffer::-ms-fill,.plyr__progress--played::-ms-fill,.plyr__volume--display::-ms-fill{border-radius:100px}.plyr__progress--played,.plyr__volume--display{z-index:1;color:#3498db;background:0 0;transition:none}.plyr__progress--played::-webkit-progress-value,.plyr__volume--display::-webkit-progress-value{min-width:8px;max-width:99%;border-top-right-radius:0;border-bottom-right-radius:0;transition:none}.plyr__progress--played::-moz-progress-bar,.plyr__volume--display::-moz-progress-bar{min-width:8px;max-width:99%;border-top-right-radius:0;border-bottom-right-radius:0;transition:none}.plyr__progress--played::-ms-fill,.plyr__volume--display::-ms-fill{display:none}.plyr__progress--buffer::-webkit-progress-value{transition:width .2s ease}.plyr__progress--buffer::-moz-progress-bar{transition:width .2s ease}.plyr__progress--buffer::-ms-fill{transition:width .2s ease}.plyr--video .plyr__progress--buffer,.plyr--video .plyr__volume--display{background:rgba(255,255,255,.25)}.plyr--video .plyr__progress--buffer{color:rgba(255,255,255,.25)}.plyr--audio .plyr__progress--buffer,.plyr--audio .plyr__volume--display{background:rgba(198,214,219,.66)}.plyr--audio .plyr__progress--buffer{color:rgba(198,214,219,.66)}.plyr--loading .plyr__progress--buffer{-webkit-animation:plyr-progress 1s linear infinite;animation:plyr-progress 1s linear infinite;background-size:25px 25px;background-repeat:repeat-x;background-image:linear-gradient(-45deg,rgba(0,0,0,.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.15) 50%,rgba(0,0,0,.15) 75%,transparent 75%,transparent);color:transparent}.plyr--video.plyr--loading .plyr__progress--buffer{background-color:rgba(255,255,255,.25)}.plyr--audio.plyr--loading .plyr__progress--buffer{background-color:rgba(198,214,219,.66)}.plyr__time{display:inline-block;vertical-align:middle;font-size:14px}.plyr__time+.plyr__time{display:none}@media (min-width:768px){.plyr__time+.plyr__time{display:inline-block}}.plyr__time+.plyr__time::before{content:'\\2044';margin-right:10px}.plyr__volume{display:none}.plyr .plyr__volume{-webkit-flex:1;-ms-flex:1;flex:1;position:relative}.plyr .plyr__volume input[type=range]{position:relative;z-index:2}@media (min-width:480px){.plyr .plyr__volume{display:block;max-width:60px}}@media (min-width:768px){.plyr .plyr__volume{max-width:100px}}.plyr--is-ios .plyr__volume,.plyr--is-ios [data-plyr=mute]{display:none!important}.plyr--fullscreen,.plyr--fullscreen-active{position:fixed;top:0;left:0;right:0;bottom:0;height:100%;width:100%;z-index:10000000;background:#000;border-radius:0}.plyr--fullscreen video,.plyr--fullscreen-active video{height:100%}.plyr--fullscreen .plyr__video-wrapper,.plyr--fullscreen-active .plyr__video-wrapper{height:100%;width:100%}.plyr--fullscreen .plyr__controls,.plyr--fullscreen-active .plyr__controls{position:absolute;bottom:0;left:0;right:0}.plyr--fullscreen-active.plyr--vimeo .plyr__video-wrapper,.plyr--fullscreen.plyr--vimeo .plyr__video-wrapper{height:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;// ==========================================================================
	// Plyr
	// plyr.js v1.8.12
	// https://github.com/selz/plyr
	// License: The MIT License (MIT)
	// ==========================================================================
	// Credits: http://paypal.github.io/accessible-html5-video-player/
	// ==========================================================================

	;(function(root, factory) {
	    'use strict';
	    /*global define,module*/

	    if (typeof module === 'object' && typeof module.exports === 'object') {
	        // Node, CommonJS-like
	        module.exports = factory(root, document);
	    } else if (true) {
	        // AMD
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { factory(root, document) }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // Browser globals (root is window)
	        root.plyr = factory(root, document);
	    }
	}(typeof window !== 'undefined' ? window : this, function(window, document) {
	    'use strict';

	    // Globals
	    var fullscreen, 
	    scroll = { x: 0, y: 0 },

	    // Default config
	    defaults = {
	        enabled:                true,
	        debug:                  false,
	        autoplay:               false,
	        loop:                   false,
	        seekTime:               10,
	        volume:                 5,
	        volumeMin:              0, 
	        volumeMax:              10, 
	        volumeStep:             1,
	        duration:               null,
	        displayDuration:        true,
	        loadSprite:             true,
	        iconPrefix:             'plyr',
	        iconUrl:                'https://cdn.plyr.io/1.8.12/plyr.svg',
	        clickToPlay:            true,
	        hideControls:           true,
	        showPosterOnEnd:        false,
	        disableContextMenu:     true,
	        tooltips: {
	            controls:           false,
	            seek:               true
	        },
	        selectors: {
	            html5:              'video, audio',
	            embed:              '[data-type]',
	            container:          '.plyr',
	            controls: {
	                container:      null,
	                wrapper:        '.plyr__controls'
	            },
	            labels:             '[data-plyr]',
	            buttons: {
	                seek:           '[data-plyr="seek"]',
	                play:           '[data-plyr="play"]',
	                pause:          '[data-plyr="pause"]',
	                restart:        '[data-plyr="restart"]',
	                rewind:         '[data-plyr="rewind"]',
	                forward:        '[data-plyr="fast-forward"]',
	                mute:           '[data-plyr="mute"]',
	                captions:       '[data-plyr="captions"]',
	                fullscreen:     '[data-plyr="fullscreen"]'
	            },
	            volume: {
	                input:          '[data-plyr="volume"]',
	                display:        '.plyr__volume--display'
	            },
	            progress: {
	                container:      '.plyr__progress',
	                buffer:         '.plyr__progress--buffer',
	                played:         '.plyr__progress--played'
	            },
	            captions:           '.plyr__captions',
	            currentTime:        '.plyr__time--current',
	            duration:           '.plyr__time--duration'
	        },
	        classes: {
	            videoWrapper:       'plyr__video-wrapper',
	            embedWrapper:       'plyr__video-embed',
	            type:               'plyr--{0}',
	            stopped:            'plyr--stopped',
	            playing:            'plyr--playing',
	            muted:              'plyr--muted',
	            loading:            'plyr--loading',
	            hover:              'plyr--hover',
	            tooltip:            'plyr__tooltip',
	            hidden:             'plyr__sr-only',
	            hideControls:       'plyr--hide-controls',
	            isIos:              'plyr--is-ios',
	            isTouch:            'plyr--is-touch',
	            captions: {
	                enabled:        'plyr--captions-enabled',
	                active:         'plyr--captions-active'
	            },
	            fullscreen: {
	                enabled:        'plyr--fullscreen-enabled',
	                active:         'plyr--fullscreen-active'
	            },
	            tabFocus:           'tab-focus'
	        },
	        captions: {
	            defaultActive:      false
	        },
	        fullscreen: {
	            enabled:            true,
	            fallback:           true,
	            allowAudio:         false
	        },
	        storage: {
	            enabled:            true,
	            key:                'plyr'
	        },
	        controls:               ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
	        i18n: {
	            restart:            'Restart',
	            rewind:             'Rewind {seektime} secs',
	            play:               'Play',
	            pause:              'Pause',
	            forward:            'Forward {seektime} secs',
	            played:             'played',
	            buffered:           'buffered',
	            currentTime:        'Current time',
	            duration:           'Duration',
	            volume:             'Volume',
	            toggleMute:         'Toggle Mute',
	            toggleCaptions:     'Toggle Captions',
	            toggleFullscreen:   'Toggle Fullscreen',
	            frameTitle:         'Player for {title}'
	        },
	        types: {
	            embed:              ['youtube', 'vimeo', 'soundcloud'],
	            html5:              ['video', 'audio']
	        },
	        // URLs
	        urls: {
	            vimeo: {
	                api:            'https://player.vimeo.com/api/player.js',
	            },
	            youtube: {
	                api:            'https://www.youtube.com/iframe_api'
	            },
	            soundcloud: {
	                api:            'https://w.soundcloud.com/player/api.js'
	            }
	        },
	        // Custom control listeners
	        listeners: {
	            seek:               null,
	            play:               null,
	            pause:              null,
	            restart:            null,
	            rewind:             null,
	            forward:            null,
	            mute:               null,
	            volume:             null,
	            captions:           null,
	            fullscreen:         null
	        },
	        // Events to watch on HTML5 media elements
	        events:                 ['ended', 'progress', 'stalled', 'playing', 'waiting', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'volumechange', 'play', 'pause', 'error', 'seeking', 'emptied']
	    };

	    // Credits: http://paypal.github.io/accessible-html5-video-player/
	    // Unfortunately, due to mixed support, UA sniffing is required
	    function _browserSniff() {
	        var ua = navigator.userAgent,
	            name = navigator.appName,
	            fullVersion = '' + parseFloat(navigator.appVersion),
	            majorVersion = parseInt(navigator.appVersion, 10),
	            nameOffset,
	            verOffset,
	            ix,
	            isIE = false,
	            isFirefox = false,
	            isChrome = false,
	            isSafari = false;

	        // MSIE 11
	        if ((navigator.appVersion.indexOf('Windows NT') !== -1) && (navigator.appVersion.indexOf('rv:11') !== -1)) {
	            isIE = true;
	            name = 'IE';
	            fullVersion = '11';
	        }
	        // MSIE
	        else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
	            isIE = true;
	            name = 'IE';
	            fullVersion = ua.substring(verOffset + 5);
	        }
	        // Chrome
	        else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
	            isChrome = true;
	            name = 'Chrome';
	            fullVersion = ua.substring(verOffset + 7);
	        }
	        // Safari
	        else if ((verOffset = ua.indexOf('Safari')) !== -1) {
	            isSafari = true;
	            name = 'Safari';
	            fullVersion = ua.substring(verOffset + 7);
	            if ((verOffset = ua.indexOf('Version')) !== -1) {
	                fullVersion = ua.substring(verOffset + 8);
	            }
	        }
	        // Firefox
	        else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
	            isFirefox = true;
	            name = 'Firefox';
	            fullVersion = ua.substring(verOffset + 8);
	        }
	        // In most other browsers, 'name/version' is at the end of userAgent
	        else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
	            name = ua.substring(nameOffset,verOffset);
	            fullVersion = ua.substring(verOffset + 1);

	            if (name.toLowerCase() == name.toUpperCase()) {
	                name = navigator.appName;
	            }
	        }

	        // Trim the fullVersion string at semicolon/space if present
	        if ((ix = fullVersion.indexOf(';')) !== -1) {
	            fullVersion = fullVersion.substring(0, ix);
	        }
	        if ((ix = fullVersion.indexOf(' ')) !== -1) {
	            fullVersion = fullVersion.substring(0, ix);
	        }

	        // Get major version
	        majorVersion = parseInt('' + fullVersion, 10);
	        if (isNaN(majorVersion)) {
	            fullVersion = '' + parseFloat(navigator.appVersion);
	            majorVersion = parseInt(navigator.appVersion, 10);
	        }

	        // Return data
	        return {
	            name:       name,
	            version:    majorVersion,
	            isIE:       isIE,
	            isFirefox:  isFirefox,
	            isChrome:   isChrome,
	            isSafari:   isSafari,
	            isIos:      /(iPad|iPhone|iPod)/g.test(navigator.platform),
	            isTouch:    'ontouchstart' in document.documentElement
	        };
	    }

	    // Check for mime type support against a player instance
	    // Credits: http://diveintohtml5.info/everything.html
	    // Related: http://www.leanbackplyr.com/test/h5mt.html
	    function _supportMime(plyr, mimeType) {
	        var media = plyr.media;

	        // Only check video types for video players
	        if (plyr.type == 'video') {
	            // Check type
	            switch (mimeType) {
	                case 'video/webm':   return !!(media.canPlayType && media.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, ''));
	                case 'video/mp4':    return !!(media.canPlayType && media.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ''));
	                case 'video/ogg':    return !!(media.canPlayType && media.canPlayType('video/ogg; codecs="theora"').replace(/no/, ''));
	            }
	        }

	        // Only check audio types for audio players
	        else if (plyr.type == 'audio') {
	            // Check type
	            switch (mimeType) {
	                case 'audio/mpeg':   return !!(media.canPlayType && media.canPlayType('audio/mpeg;').replace(/no/, ''));
	                case 'audio/ogg':    return !!(media.canPlayType && media.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
	                case 'audio/wav':    return !!(media.canPlayType && media.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
	            }
	        }

	        // If we got this far, we're stuffed
	        return false;
	    }

	    // Inject a script
	    function _injectScript(source) {
	        if (document.querySelectorAll('script[src="' + source + '"]').length) {
	            return;
	        }

	        var tag = document.createElement('script');
	        tag.src = source;
	        var firstScriptTag = document.getElementsByTagName('script')[0];
	        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    }

	    // Element exists in an array
	    function _inArray(haystack, needle) {
	        return Array.prototype.indexOf && (haystack.indexOf(needle) != -1);
	    }

	    // Replace all
	    function _replaceAll(string, find, replace) {
	        return string.replace(new RegExp(find.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace);
	    }

	    // Wrap an element
	    function _wrap(elements, wrapper) {
	        // Convert `elements` to an array, if necessary.
	        if (!elements.length) {
	            elements = [elements];
	        }

	        // Loops backwards to prevent having to clone the wrapper on the
	        // first element (see `child` below).
	        for (var i = elements.length - 1; i >= 0; i--) {
	            var child   = (i > 0) ? wrapper.cloneNode(true) : wrapper;
	            var element = elements[i];

	            // Cache the current parent and sibling.
	            var parent  = element.parentNode;
	            var sibling = element.nextSibling;

	            // Wrap the element (is automatically removed from its current
	            // parent).
	            child.appendChild(element);

	            // If the element had a sibling, insert the wrapper before
	            // the sibling to maintain the HTML structure; otherwise, just
	            // append it to the parent.
	            if (sibling) {
	                parent.insertBefore(child, sibling);
	            }
	            else {
	                parent.appendChild(child);
	            }

	            return child;
	        }
	    }

	    // Unwrap an element
	    // http://plainjs.com/javascript/manipulation/unwrap-a-dom-element-35/
	    function _unwrap(wrapper) {
	        // Get the element's parent node
	        var parent = wrapper.parentNode;

	        // Move all children out of the element
	        while (wrapper.firstChild) {
	            parent.insertBefore(wrapper.firstChild, wrapper);
	        }

	        // Remove the empty element
	        parent.removeChild(wrapper);
	    }

	    // Remove an element
	    function _remove(element) {
	        if (!element) {
	            return;
	        }
	        element.parentNode.removeChild(element);
	    }

	    // Prepend child
	    function _prependChild(parent, element) {
	        parent.insertBefore(element, parent.firstChild);
	    }

	    // Set attributes
	    function _setAttributes(element, attributes) {
	        for (var key in attributes) {
	            element.setAttribute(key, (_is.boolean(attributes[key]) && attributes[key]) ? '' : attributes[key]);
	        }
	    }

	    // Insert a HTML element
	    function _insertElement(type, parent, attributes) {
	        // Create a new <element>
	        var element = document.createElement(type);

	        // Set all passed attributes
	        _setAttributes(element, attributes);

	        // Inject the new element
	        _prependChild(parent, element);
	    }

	    // Get a classname from selector
	    function _getClassname(selector) {
	        return selector.replace('.', '');
	    }

	    // Toggle class on an element
	    function _toggleClass(element, className, state) {
	        if (element) {
	            if (element.classList) {
	                element.classList[state ? 'add' : 'remove'](className);
	            }
	            else {
	                var name = (' ' + element.className + ' ').replace(/\s+/g, ' ').replace(' ' + className + ' ', '');
	                element.className = name + (state ? ' ' + className : '');
	            }
	        }
	    }

	    // Has class name
	    function _hasClass(element, className) {
	        if (element) {
	            if (element.classList) {
	                return element.classList.contains(className);
	            }
	            else {
	                return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
	            }
	        }
	        return false;
	    }

	    // Element matches selector
	    function _matches(element, selector) {
	        var p = Element.prototype;

	        var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
	            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
	        };

	        return f.call(element, selector);
	    }

	    // Bind event
	    function _on(element, events, callback, useCapture) {
	        if (element) {
	            _toggleListener(element, events, callback, true, useCapture);
	        }
	    }

	    // Unbind event
	    function _off(element, events, callback, useCapture) {
	        if (element) {
	            _toggleListener(element, events, callback, false, useCapture);
	        }
	    }

	    // Bind along with custom handler
	    function _proxyListener(element, eventName, userListener, defaultListener, useCapture) {
	        _on(element, eventName, function(event) {
	            if (userListener) {
	                userListener.apply(element, [event]);
	            }
	            defaultListener.apply(element, [event]);
	        }, useCapture);
	    }

	    // Toggle event listener
	    function _toggleListener(element, events, callback, toggle, useCapture) {
	        var eventList = events.split(' ');

	        // Whether the listener is a capturing listener or not
	        // Default to false
	        if (!_is.boolean(useCapture)) {
	            useCapture = false;
	        }

	        // If a nodelist is passed, call itself on each node
	        if (element instanceof NodeList) {
	            for (var x = 0; x < element.length; x++) {
	                if (element[x] instanceof Node) {
	                    _toggleListener(element[x], arguments[1], arguments[2], arguments[3]);
	                }
	            }
	            return;
	        }

	        // If a single node is passed, bind the event listener
	        for (var i = 0; i < eventList.length; i++) {
	            element[toggle ? 'addEventListener' : 'removeEventListener'](eventList[i], callback, useCapture);
	        }
	    }

	    // Trigger event
	    function _triggerEvent(element, eventName, bubbles, properties) {
	        // Bail if no element
	        if (!element || !eventName) {
	            return;
	        }

	        // Default bubbles to false
	        if (!_is.boolean(bubbles)) {
	            bubbles = false;
	        }

	        // Create and dispatch the event
	        var event = new CustomEvent(eventName, { 
	            bubbles:    bubbles,
	            detail:     properties 
	        });

	        // Dispatch the event
	        element.dispatchEvent(event);
	    }

	    // Toggle aria-pressed state on a toggle button
	    // http://www.ssbbartgroup.com/blog/how-not-to-misuse-aria-states-properties-and-roles
	    function _toggleState(target, state) {
	        // Bail if no target
	        if (!target) {
	            return;
	        }

	        // Get state
	        state = (_is.boolean(state) ? state : !target.getAttribute('aria-pressed'));

	        // Set the attribute on target
	        target.setAttribute('aria-pressed', state);

	        return state;
	    }

	    // Get percentage
	    function _getPercentage(current, max) {
	        if (current === 0 || max === 0 || isNaN(current) || isNaN(max)) {
	            return 0;
	        }
	        return ((current / max) * 100).toFixed(2);
	    }

	    // Deep extend/merge destination object with N more objects
	    // http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
	    // Removed call to arguments.callee (used explicit function name instead)
	    function _extend() {
	        // Get arguments
	        var objects = arguments;

	        // Bail if nothing to merge
	        if (!objects.length) {
	            return;
	        }

	        // Return first if specified but nothing to merge
	        if (objects.lenth == 1) {
	            return objects[0];
	        }

	        // First object is the destination
	        var destination = Array.prototype.shift.call(objects),
	            length      = objects.length;

	        // Loop through all objects to merge
	        for (var i = 0; i < length; i++) {
	            var source = objects[i];

	            for (var property in source) {
	                if (source[property] && source[property].constructor && source[property].constructor === Object) {
	                    destination[property] = destination[property] || {};
	                    _extend(destination[property], source[property]);
	                }
	                else {
	                    destination[property] = source[property];
	                }
	            }
	        }

	        return destination;
	    }

	    // Check variable types
	    var _is = {
	        object: function(input) {
	            return input !== null && typeof(input) === 'object'; 
	        },
	        array: function(input) {
	            return input !== null && typeof(input) === 'object' && input.constructor === Array;
	        },
	        number: function(input) {
	            return typeof(input) === 'number' && !isNaN(input - 0) || (typeof input == 'object' && input.constructor === Number);
	        },
	        string: function(input) {
	            return typeof input === 'string' || (typeof input == 'object' && input.constructor === String);
	        },
	        boolean: function(input) {
	            return typeof input === 'boolean';
	        },
	        nodeList: function(input) {
	            return input instanceof NodeList;
	        },
	        htmlElement: function(input) {
	            return input instanceof HTMLElement;
	        },
	        undefined: function(input) {
	            return typeof input === 'undefined';
	        }
	    };

	    // Fullscreen API
	    function _fullscreen() {
	        var fullscreen = {
	                supportsFullScreen: false,
	                isFullScreen: function() { return false; },
	                requestFullScreen: function() {},
	                cancelFullScreen: function() {},
	                fullScreenEventName: '',
	                element: null,
	                prefix: ''
	            },
	            browserPrefixes = 'webkit moz o ms khtml'.split(' ');

	        // Check for native support
	        if (!_is.undefined(document.cancelFullScreen)) {
	            fullscreen.supportsFullScreen = true;
	        }
	        else {
	            // Check for fullscreen support by vendor prefix
	            for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
	                fullscreen.prefix = browserPrefixes[i];

	                if (!_is.undefined(document[fullscreen.prefix + 'CancelFullScreen'])) {
	                    fullscreen.supportsFullScreen = true;
	                    break;
	                }
	                // Special case for MS (when isn't it?)
	                else if (!_is.undefined(document.msExitFullscreen) && document.msFullscreenEnabled) {
	                    fullscreen.prefix = 'ms';
	                    fullscreen.supportsFullScreen = true;
	                    break;
	                }
	            }
	        }

	        // Update methods to do something useful
	        if (fullscreen.supportsFullScreen) {
	            // Yet again Microsoft awesomeness,
	            // Sometimes the prefix is 'ms', sometimes 'MS' to keep you on your toes
	            fullscreen.fullScreenEventName = (fullscreen.prefix == 'ms' ? 'MSFullscreenChange' : fullscreen.prefix + 'fullscreenchange');

	            fullscreen.isFullScreen = function(element) {
	                if (_is.undefined(element)) {
	                    element = document.body;
	                }
	                switch (this.prefix) {
	                    case '':
	                        return document.fullscreenElement == element;
	                    case 'moz':
	                        return document.mozFullScreenElement == element;
	                    default:
	                        return document[this.prefix + 'FullscreenElement'] == element;
	                }
	            };
	            fullscreen.requestFullScreen = function(element) {
	                if (_is.undefined(element)) {
	                    element = document.body;
	                }
	                return (this.prefix === '') ? element.requestFullScreen() : element[this.prefix + (this.prefix == 'ms' ? 'RequestFullscreen' : 'RequestFullScreen')]();
	            };
	            fullscreen.cancelFullScreen = function() {
	                return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + (this.prefix == 'ms' ? 'ExitFullscreen' : 'CancelFullScreen')]();
	            };
	            fullscreen.element = function() {
	                return (this.prefix === '') ? document.fullscreenElement : document[this.prefix + 'FullscreenElement'];
	            };
	        }

	        return fullscreen;
	    }

	    // Local storage
	    function _storage() {
	        var storage = {
	            supported: (function() {
	                if (!('localStorage' in window)) {
	                    return false;
	                }

	                // Try to use it (it might be disabled, e.g. user is in private/porn mode)
	                // see: https://github.com/Selz/plyr/issues/131
	                try {
	                    // Add test item
	                    window.localStorage.setItem('___test', 'OK');

	                    // Get the test item
	                    var result = window.localStorage.getItem('___test');

	                    // Clean up
	                    window.localStorage.removeItem('___test');

	                    // Check if value matches
	                    return (result === 'OK');
	                }
	                catch (e) {
	                    return false;
	                }

	                return false;
	            })()
	        };
	        return storage;
	    }

	    // Player instance
	    function Plyr(container, config) {
	        var plyr = this;
	        plyr.container = container;
	        plyr.timers = {};

	        // Log config options
	        _log(config);

	        // Debugging
	        function _log() {
	            if (config.debug && window.console) {
	                console.log.apply(console, arguments);
	            }
	        }
	        function _warn() {
	            if (config.debug && window.console) {
	                console.warn.apply(console, arguments);
	            }
	        }

	        // Get icon URL
	        function _getIconUrl() {
	            return {
	                url:        config.iconUrl,
	                absolute:   (config.iconUrl.indexOf("http") === 0) || plyr.browser.isIE
	            };
	        }

	        // Build the default HTML
	        function _buildControls() {
	            // Create html array
	            var html        = [],
	                iconUrl     = _getIconUrl(),
	                iconPath    = (!iconUrl.absolute ? iconUrl.url : '') + '#' + config.iconPrefix;

	            // Larger overlaid play button
	            if (_inArray(config.controls, 'play-large')) {
	                html.push(
	                    '<button type="button" data-plyr="play" class="plyr__play-large">',
	                        '<svg><use xlink:href="' + iconPath + '-play" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.play + '</span>',
	                    '</button>'
	                );
	            }

	            html.push('<div class="plyr__controls">');

	            // Restart button
	            if (_inArray(config.controls, 'restart')) {
	                html.push(
	                    '<button type="button" data-plyr="restart">',
	                        '<svg><use xlink:href="' + iconPath + '-restart" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.restart + '</span>',
	                    '</button>'
	                );
	            }

	            // Rewind button
	            if (_inArray(config.controls, 'rewind')) {
	                html.push(
	                    '<button type="button" data-plyr="rewind">',
	                        '<svg><use xlink:href="' + iconPath + '-rewind" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.rewind + '</span>',
	                    '</button>'
	                );
	            }

	            // Play Pause button
	            // TODO: This should be a toggle button really?
	            if (_inArray(config.controls, 'play')) {
	                html.push(
	                    '<button type="button" data-plyr="play">',
	                        '<svg><use xlink:href="' + iconPath + '-play" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.play + '</span>',
	                    '</button>',
	                    '<button type="button" data-plyr="pause">',
	                        '<svg><use xlink:href="' + iconPath + '-pause" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.pause + '</span>',
	                    '</button>'
	                );
	            }

	            // Fast forward button
	            if (_inArray(config.controls, 'fast-forward')) {
	                html.push(
	                    '<button type="button" data-plyr="fast-forward">',
	                        '<svg><use xlink:href="' + iconPath + '-fast-forward" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.forward + '</span>',
	                    '</button>'
	                );
	            }

	            // Progress
	            if (_inArray(config.controls, 'progress')) {
	                // Create progress
	                html.push('<span class="plyr__progress">',
	                    '<label for="seek{id}" class="plyr__sr-only">Seek</label>',
	                    '<input id="seek{id}" class="plyr__progress--seek" type="range" min="0" max="100" step="0.1" value="0" data-plyr="seek">',
	                    '<progress class="plyr__progress--played" max="100" value="0" role="presentation"></progress>',
	                    '<progress class="plyr__progress--buffer" max="100" value="0">',
	                        '<span>0</span>% ' + config.i18n.buffered,
	                    '</progress>');

	                // Seek tooltip
	                if (config.tooltips.seek) {
	                    html.push('<span class="plyr__tooltip">00:00</span>');
	                }

	                // Close
	                html.push('</span>');
	            }

	            // Media current time display
	            if (_inArray(config.controls, 'current-time')) {
	                html.push(
	                    '<span class="plyr__time">',
	                        '<span class="plyr__sr-only">' + config.i18n.currentTime + '</span>',
	                        '<span class="plyr__time--current">00:00</span>',
	                    '</span>'
	                );
	            }

	            // Media duration display
	            if (_inArray(config.controls, 'duration')) {
	                html.push(
	                    '<span class="plyr__time">',
	                        '<span class="plyr__sr-only">' + config.i18n.duration + '</span>',
	                        '<span class="plyr__time--duration">00:00</span>',
	                    '</span>'
	                );
	            }

	            // Toggle mute button
	            if (_inArray(config.controls, 'mute')) {
	                html.push(
	                    '<button type="button" data-plyr="mute">',
	                        '<svg class="icon--muted"><use xlink:href="' + iconPath + '-muted" /></svg>',
	                        '<svg><use xlink:href="' + iconPath + '-volume" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.toggleMute + '</span>',
	                    '</button>'
	                );
	            }

	            // Volume range control
	            if (_inArray(config.controls, 'volume')) {
	                html.push(
	                    '<span class="plyr__volume">',
	                        '<label for="volume{id}" class="plyr__sr-only">' + config.i18n.volume + '</label>',
	                        '<input id="volume{id}" class="plyr__volume--input" type="range" min="' + config.volumeMin + '" max="' + config.volumeMax + '" value="' + config.volume + '" data-plyr="volume">',
	                        '<progress class="plyr__volume--display" max="' + config.volumeMax + '" value="' + config.volumeMin + '" role="presentation"></progress>',
	                    '</span>'
	                );
	            }

	            // Toggle captions button
	            if (_inArray(config.controls, 'captions')) {
	                html.push(
	                    '<button type="button" data-plyr="captions">',
	                        '<svg class="icon--captions-on"><use xlink:href="' + iconPath + '-captions-on" /></svg>',
	                        '<svg><use xlink:href="' + iconPath+ '-captions-off" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.toggleCaptions + '</span>',
	                    '</button>'
	                );
	            }

	            // Toggle fullscreen button
	            if (_inArray(config.controls, 'fullscreen')) {
	                html.push(
	                    '<button type="button" data-plyr="fullscreen">',
	                        '<svg class="icon--exit-fullscreen"><use xlink:href="' + iconPath + '-exit-fullscreen" /></svg>',
	                        '<svg><use xlink:href="' + iconPath + '-enter-fullscreen" /></svg>',
	                        '<span class="plyr__sr-only">' + config.i18n.toggleFullscreen + '</span>',
	                    '</button>'
	                );
	            }

	            // Close everything
	            html.push('</div>');

	            return html.join('');
	        }

	        // Setup fullscreen
	        function _setupFullscreen() {
	            if (!plyr.supported.full) {
	                return;
	            }

	            if ((plyr.type != 'audio' || config.fullscreen.allowAudio) && config.fullscreen.enabled) {
	                // Check for native support
	                var nativeSupport = fullscreen.supportsFullScreen;

	                if (nativeSupport || (config.fullscreen.fallback && !_inFrame())) {
	                    _log((nativeSupport ? 'Native' : 'Fallback') + ' fullscreen enabled');

	                    // Add styling hook
	                    _toggleClass(plyr.container, config.classes.fullscreen.enabled, true);
	                }
	                else {
	                    _log('Fullscreen not supported and fallback disabled');
	                }

	                // Toggle state
	                if (plyr.buttons && plyr.buttons.fullscreen) {
	                    _toggleState(plyr.buttons.fullscreen, false);
	                }

	                // Setup focus trap
	                _focusTrap();
	            }
	        }

	        // Setup captions
	        function _setupCaptions() {
	            // Bail if not HTML5 video
	            if (plyr.type !== 'video') {
	                return;
	            }

	            // Inject the container
	            if (!_getElement(config.selectors.captions)) {
	                plyr.videoContainer.insertAdjacentHTML('afterbegin', '<div class="' + _getClassname(config.selectors.captions) + '"></div>');
	            }

	            // Determine if HTML5 textTracks is supported
	            plyr.usingTextTracks = false;
	            if (plyr.media.textTracks) {
	                plyr.usingTextTracks = true;
	            }

	            // Get URL of caption file if exists
	            var captionSrc = '',
	                kind,
	                children = plyr.media.childNodes;

	            for (var i = 0; i < children.length; i++) {
	                if (children[i].nodeName.toLowerCase() === 'track') {
	                    kind = children[i].kind;
	                    if (kind === 'captions' || kind === 'subtitles') {
	                        captionSrc = children[i].getAttribute('src');
	                    }
	                }
	            }

	            // Record if caption file exists or not
	            plyr.captionExists = true;
	            if (captionSrc === '') {
	                plyr.captionExists = false;
	                _log('No caption track found');
	            }
	            else {
	                _log('Caption track found; URI: ' + captionSrc);
	            }

	            // If no caption file exists, hide container for caption text
	            if (!plyr.captionExists) {
	                _toggleClass(plyr.container, config.classes.captions.enabled);
	            }
	            // If caption file exists, process captions
	            else {
	                // Turn off native caption rendering to avoid double captions
	                // This doesn't seem to work in Safari 7+, so the <track> elements are removed from the dom below
	                var tracks = plyr.media.textTracks;
	                for (var x = 0; x < tracks.length; x++) {
	                    tracks[x].mode = 'hidden';
	                }

	                // Enable UI
	                _showCaptions(plyr);

	                // Disable unsupported browsers than report false positive
	                // Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1033144
	                if ((plyr.browser.isIE && plyr.browser.version >= 10) ||
	                    (plyr.browser.isFirefox && plyr.browser.version >= 31)) {

	                    // Debugging
	                    _log('Detected browser with known TextTrack issues - using manual fallback');

	                    // Set to false so skips to 'manual' captioning
	                    plyr.usingTextTracks = false;
	                }

	                // Rendering caption tracks
	                // Native support required - http://caniuse.com/webvtt
	                if (plyr.usingTextTracks) {
	                    _log('TextTracks supported');

	                    for (var y = 0; y < tracks.length; y++) {
	                        var track = tracks[y];

	                        if (track.kind === 'captions' || track.kind === 'subtitles') {
	                            _on(track, 'cuechange', function() {
	                                // Display a cue, if there is one
	                                if (this.activeCues[0] && 'text' in this.activeCues[0]) {
	                                    _setCaption(this.activeCues[0].getCueAsHTML());
	                                }
	                                else {
	                                    _setCaption();
	                                }
	                            });
	                        }
	                    }
	                }
	                // Caption tracks not natively supported
	                else {
	                    _log('TextTracks not supported so rendering captions manually');

	                    // Render captions from array at appropriate time
	                    plyr.currentCaption = '';
	                    plyr.captions = [];

	                    if (captionSrc !== '') {
	                        // Create XMLHttpRequest Object
	                        var xhr = new XMLHttpRequest();

	                        xhr.onreadystatechange = function() {
	                            if (xhr.readyState === 4) {
	                                if (xhr.status === 200) {
	                                    var captions = [],
	                                        caption,
	                                        req = xhr.responseText;

	                                    captions = req.split('\n\n');

	                                    for (var r = 0; r < captions.length; r++) {
	                                        caption = captions[r];
	                                        plyr.captions[r] = [];

	                                        // Get the parts of the captions
	                                        var parts = caption.split('\n'),
	                                            index = 0;

	                                        // Incase caption numbers are added
	                                        if (parts[index].indexOf(":") === -1) {
	                                            index = 1;
	                                        }

	                                        plyr.captions[r] = [parts[index], parts[index + 1]];
	                                    }

	                                    // Remove first element ('VTT')
	                                    plyr.captions.shift();

	                                    _log('Successfully loaded the caption file via AJAX');
	                                }
	                                else {
	                                    _warn('There was a problem loading the caption file via AJAX');
	                                }
	                            }
	                        };

	                        xhr.open('get', captionSrc, true);

	                        xhr.send();
	                    }
	                }
	            }
	        }

	        // Set the current caption
	        function _setCaption(caption) {
	            /* jshint unused:false */
	            var container = _getElement(config.selectors.captions),
	                content = document.createElement('span');

	            // Empty the container
	            container.innerHTML = '';

	            // Default to empty
	            if (_is.undefined(caption)) {
	                caption = '';
	            }

	            // Set the span content
	            if (_is.undefined(caption)) {
	                content.innerHTML = caption.trim();
	            }
	            else {
	                content.appendChild(caption);
	            }

	            // Set new caption text
	            container.appendChild(content);

	            // Force redraw (for Safari)
	            var redraw = container.offsetHeight;
	        }

	        // Captions functions
	        // Seek the manual caption time and update UI
	        function _seekManualCaptions(time) {
	            // Utilities for caption time codes
	            function _timecodeCommon(tc, pos) {
	                var tcpair = [];
	                tcpair = tc.split(' --> ');
	                for(var i = 0; i < tcpair.length; i++) {
	                    // WebVTT allows for extra meta data after the timestamp line
	                    // So get rid of this if it exists
	                    tcpair[i] = tcpair[i].replace(/(\d+:\d+:\d+\.\d+).*/, "$1");
	                }
	                return _subTcSecs(tcpair[pos]);
	            }
	            function _timecodeMin(tc) {
	                return _timecodeCommon(tc, 0);
	            }
	            function _timecodeMax(tc) {
	                return _timecodeCommon(tc, 1);
	            }
	            function _subTcSecs(tc) {
	                if (tc === null || tc === undefined) {
	                    return 0;
	                }
	                else {
	                    var tc1 = [],
	                        tc2 = [],
	                        seconds;
	                    tc1 = tc.split(',');
	                    tc2 = tc1[0].split(':');
	                    seconds = Math.floor(tc2[0]*60*60) + Math.floor(tc2[1]*60) + Math.floor(tc2[2]);
	                    return seconds;
	                }
	            }

	            // If it's not video, or we're using textTracks, bail.
	            if (plyr.usingTextTracks || plyr.type !== 'video' || !plyr.supported.full) {
	                return;
	            }

	            // Reset subcount
	            plyr.subcount = 0;

	            // Check time is a number, if not use currentTime
	            // IE has a bug where currentTime doesn't go to 0
	            // https://twitter.com/Sam_Potts/status/573715746506731521
	            time = _is.number(time) ? time : plyr.media.currentTime;

	            // If there's no subs available, bail
	            if (!plyr.captions[plyr.subcount]) {
	                return;
	            }

	            while (_timecodeMax(plyr.captions[plyr.subcount][0]) < time.toFixed(1)) {
	                plyr.subcount++;
	                if (plyr.subcount > plyr.captions.length-1) {
	                    plyr.subcount = plyr.captions.length-1;
	                    break;
	                }
	            }

	            // Check if the next caption is in the current time range
	            if (plyr.media.currentTime.toFixed(1) >= _timecodeMin(plyr.captions[plyr.subcount][0]) &&
	                plyr.media.currentTime.toFixed(1) <= _timecodeMax(plyr.captions[plyr.subcount][0])) {
	                    plyr.currentCaption = plyr.captions[plyr.subcount][1];

	                // Render the caption
	                _setCaption(plyr.currentCaption);
	            }
	            else {
	                _setCaption();
	            }
	        }

	        // Display captions container and button (for initialization)
	        function _showCaptions() {
	            // If there's no caption toggle, bail
	            if (!plyr.buttons.captions) {
	                return;
	            }

	            _toggleClass(plyr.container, config.classes.captions.enabled, true);

	            if (config.captions.defaultActive) {
	                _toggleClass(plyr.container, config.classes.captions.active, true);
	                _toggleState(plyr.buttons.captions, true);
	            }
	        }

	        // Find all elements
	        function _getElements(selector) {
	            return plyr.container.querySelectorAll(selector);
	        }

	        // Find a single element
	        function _getElement(selector) {
	            return _getElements(selector)[0];
	        }

	        // Determine if we're in an iframe
	        function _inFrame() {
	            try {
	                return window.self !== window.top;
	            }
	            catch (e) {
	                return true;
	            }
	        }

	        // Trap focus inside container
	        function _focusTrap() {
	            var tabbables   = _getElements('input:not([disabled]), button:not([disabled])'),
	                first       = tabbables[0],
	                last        = tabbables[tabbables.length - 1];

	            function _checkFocus(event) {
	                // If it is TAB
	                if (event.which === 9 && plyr.isFullscreen) {
	                    // Move focus to first element that can be tabbed if Shift isn't used
	                    if (event.target === last && !event.shiftKey) {
	                        event.preventDefault();
	                        first.focus();
	                    }
	                    // Move focus to last element that can be tabbed if Shift is used
	                    else if (event.target === first && event.shiftKey) {
	                        event.preventDefault();
	                        last.focus();
	                    }
	                }
	            }

	            // Bind the handler
	            _on(plyr.container, 'keydown', _checkFocus);
	        }

	        // Add elements to HTML5 media (source, tracks, etc)
	        function _insertChildElements(type, attributes) {
	            if (_is.string(attributes)) {
	               _insertElement(type, plyr.media, { src: attributes });
	            }
	            else if (attributes.constructor === Array) {
	                for (var i = attributes.length - 1; i >= 0; i--) {
	                    _insertElement(type, plyr.media, attributes[i]);
	                }
	            }
	        }

	        // Insert controls
	        function _injectControls() {
	            // Sprite
	            if (config.loadSprite) {
	                var iconUrl = _getIconUrl();

	                // Only load external sprite using AJAX
	                if (iconUrl.absolute) {
	                    _log('AJAX loading absolute SVG sprite' + (plyr.browser.isIE ? ' (due to IE)' : ''));
	                    loadSprite(iconUrl.url, "sprite-plyr");
	                }
	                else {
	                    _log('Sprite will be used as external resource directly');
	                }
	            }

	            // Make a copy of the html
	            var html = config.html;

	            // Insert custom video controls
	            _log('Injecting custom controls');

	            // If no controls are specified, create default
	            if (!html) {
	                html = _buildControls();
	            }

	            // Replace seek time instances
	            html = _replaceAll(html, '{seektime}', config.seekTime);

	            // Replace all id references with random numbers
	            html = _replaceAll(html, '{id}', Math.floor(Math.random() * (10000)));

	            // Controls container
	            var container;

	            // Inject to custom location
	            if (config.selectors.controls.container !== null) {
	                container = config.selectors.controls.container;

	                if (_is.string(container)) {
	                    container = document.querySelector(container);
	                }
	            }

	            // Inject into the container by default
	            if (!_is.htmlElement(container)) {
	                container = plyr.container
	            }

	            // Inject controls HTML
	            container.insertAdjacentHTML('beforeend', html);

	            // Setup tooltips
	            if (config.tooltips.controls) {
	                var labels = _getElements([config.selectors.controls.wrapper, ' ', config.selectors.labels, ' .', config.classes.hidden].join(''));

	                for (var i = labels.length - 1; i >= 0; i--) {
	                    var label = labels[i];

	                    _toggleClass(label, config.classes.hidden, false);
	                    _toggleClass(label, config.classes.tooltip, true);
	                }
	            }
	        }

	        // Find the UI controls and store references
	        function _findElements() {
	            try {
	                plyr.controls                 = _getElement(config.selectors.controls.wrapper);

	                // Buttons
	                plyr.buttons = {};
	                plyr.buttons.seek             = _getElement(config.selectors.buttons.seek);
	                plyr.buttons.play             = _getElements(config.selectors.buttons.play);
	                plyr.buttons.pause            = _getElement(config.selectors.buttons.pause);
	                plyr.buttons.restart          = _getElement(config.selectors.buttons.restart);
	                plyr.buttons.rewind           = _getElement(config.selectors.buttons.rewind);
	                plyr.buttons.forward          = _getElement(config.selectors.buttons.forward);
	                plyr.buttons.fullscreen       = _getElement(config.selectors.buttons.fullscreen);

	                // Inputs
	                plyr.buttons.mute             = _getElement(config.selectors.buttons.mute);
	                plyr.buttons.captions         = _getElement(config.selectors.buttons.captions);

	                // Progress
	                plyr.progress = {};
	                plyr.progress.container       = _getElement(config.selectors.progress.container);

	                // Progress - Buffering
	                plyr.progress.buffer          = {};
	                plyr.progress.buffer.bar      = _getElement(config.selectors.progress.buffer);
	                plyr.progress.buffer.text     = plyr.progress.buffer.bar && plyr.progress.buffer.bar.getElementsByTagName('span')[0];

	                // Progress - Played
	                plyr.progress.played          = _getElement(config.selectors.progress.played);

	                // Seek tooltip
	                plyr.progress.tooltip         = plyr.progress.container && plyr.progress.container.querySelector('.' + config.classes.tooltip);

	                // Volume
	                plyr.volume                   = {};
	                plyr.volume.input             = _getElement(config.selectors.volume.input);
	                plyr.volume.display           = _getElement(config.selectors.volume.display);

	                // Timing
	                plyr.duration                 = _getElement(config.selectors.duration);
	                plyr.currentTime              = _getElement(config.selectors.currentTime);
	                plyr.seekTime                 = _getElements(config.selectors.seekTime);

	                return true;
	            }
	            catch(e) {
	                _warn('It looks like there is a problem with your controls HTML');

	                // Restore native video controls
	                _toggleNativeControls(true);

	                return false;
	            }
	        }

	        // Toggle style hook
	        function _toggleStyleHook() {
	            _toggleClass(plyr.container, config.selectors.container.replace('.', ''), plyr.supported.full);
	        }

	        // Toggle native controls
	        function _toggleNativeControls(toggle) {
	            if (toggle && _inArray(config.types.html5, plyr.type)) {
	                plyr.media.setAttribute('controls', '');
	            }
	            else {
	                plyr.media.removeAttribute('controls');
	            }
	        }

	        // Setup aria attribute for play and iframe title
	        function _setTitle(iframe) {
	            // Find the current text
	            var label = config.i18n.play;

	            // If there's a media title set, use that for the label
	            if (!_is.undefined(config.title) && config.title.length) {
	                label += ', ' + config.title;
	            }

	            // If there's a play button, set label
	            if (plyr.supported.full && plyr.buttons.play) {
	                for (var i = plyr.buttons.play.length - 1; i >= 0; i--) {
	                    plyr.buttons.play[i].setAttribute('aria-label', label);
	                }
	            }

	            // Set iframe title
	            // https://github.com/Selz/plyr/issues/124
	            if (_is.htmlElement(iframe)) {
	                iframe.setAttribute('title', config.i18n.frameTitle.replace('{title}', config.title));
	            }
	        }

	        // Setup media
	        function _setupMedia() {
	            // If there's no media, bail
	            if (!plyr.media) {
	                _warn('No media element found!');
	                return;
	            }

	            if (plyr.supported.full) {
	                // Add type class
	                _toggleClass(plyr.container, config.classes.type.replace('{0}', plyr.type), true);

	                // Add video class for embeds
	                // This will require changes if audio embeds are added
	                if (_inArray(config.types.embed, plyr.type)) {
	                    _toggleClass(plyr.container, config.classes.type.replace('{0}', 'video'), true);
	                }

	                // If there's no autoplay attribute, assume the video is stopped and add state class
	                _toggleClass(plyr.container, config.classes.stopped, config.autoplay);

	                // Add iOS class
	                _toggleClass(plyr.container, config.classes.isIos, plyr.browser.isIos);

	                // Add touch class
	                _toggleClass(plyr.container, config.classes.isTouch, plyr.browser.isTouch);

	                // Inject the player wrapper
	                if (plyr.type === 'video') {
	                    // Create the wrapper div
	                    var wrapper = document.createElement('div');
	                    wrapper.setAttribute('class', config.classes.videoWrapper);

	                    // Wrap the video in a container
	                    _wrap(plyr.media, wrapper);

	                    // Cache the container
	                    plyr.videoContainer = wrapper;
	                }
	            }

	            // Embeds
	            if (_inArray(config.types.embed, plyr.type)) {
	                _setupEmbed();

	                // Clean up
	                plyr.embedId = null;
	            }
	        }

	        // Setup YouTube/Vimeo
	        function _setupEmbed() {
	            var container = document.createElement('div'),
	                mediaId = plyr.embedId,
	                id = plyr.type + '-' + Math.floor(Math.random() * (10000));

	            // Remove old containers
	            var containers = _getElements('[id^="' + plyr.type + '-"]');
	            for (var i = containers.length - 1; i >= 0; i--) {
	                _remove(containers[i]);
	            }

	            // Add embed class for responsive
	            _toggleClass(plyr.media, config.classes.videoWrapper, true);
	            _toggleClass(plyr.media, config.classes.embedWrapper, true);

	            // YouTube
	            if (plyr.type === 'youtube') {
	                // Create the YouTube container
	                plyr.media.appendChild(container);

	                // Set ID
	                container.setAttribute('id', id);

	                // Setup API
	                if (_is.object(window.YT)) {
	                    _youTubeReady(mediaId, container);
	                }
	                else {
	                    // Load the API
	                    _injectScript(config.urls.youtube.api);

	                    // Setup callback for the API
	                    window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [];

	                    // Add to queue
	                    window.onYouTubeReadyCallbacks.push(function() { _youTubeReady(mediaId, container); });

	                    // Set callback to process queue
	                    window.onYouTubeIframeAPIReady = function () {
	                        window.onYouTubeReadyCallbacks.forEach(function(callback) { callback(); });
	                    };
	                }
	            }
	            // Vimeo
	            else if (plyr.type === 'vimeo') {
	                // Vimeo needs an extra div to hide controls on desktop (which has full support)
	                if (plyr.supported.full) {
	                    plyr.media.appendChild(container);
	                }
	                else {
	                    container = plyr.media;
	                }

	                // Set ID
	                container.setAttribute('id', id);

	                // Load the API if not already
	                if (!_is.object(window.Vimeo)) {
	                    _injectScript(config.urls.vimeo.api);

	                    // Wait for fragaloop load
	                    var vimeoTimer = window.setInterval(function() {
	                        if (_is.object(window.Vimeo)) {
	                            window.clearInterval(vimeoTimer);
	                            _vimeoReady(mediaId, container);
	                        }
	                    }, 50);
	                }
	                else {
	                    _vimeoReady(mediaId, container);
	                }
	            }
	            // Soundcloud
	            // TODO: Currently unsupported and undocumented
	            else if (plyr.type === 'soundcloud') {
	                // Inject the iframe
	                var soundCloud = document.createElement('iframe');

	                // Watch for iframe load
	                soundCloud.loaded = false;
	                _on(soundCloud, 'load', function() { soundCloud.loaded = true; });

	                _setAttributes(soundCloud, {
	                    'src':  'https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + mediaId,
	                    'id':   id
	                });

	                container.appendChild(soundCloud);
	                plyr.media.appendChild(container);

	                // Load the API if not already
	                if (!window.SC) {
	                    _injectScript(config.urls.soundcloud.api);
	                }

	                // Wait for SC load
	                var soundCloudTimer = window.setInterval(function() {
	                    if (window.SC && soundCloud.loaded) {
	                        window.clearInterval(soundCloudTimer);
	                        _soundcloudReady.call(soundCloud);
	                    }
	                }, 50);
	            }
	        }

	        // When embeds are ready
	        function _embedReady() {
	            // Store reference to API
	            plyr.container.plyr.embed = plyr.embed;

	            // Setup the UI if full support
	            if (plyr.supported.full) {
	                _setupInterface();
	            }

	            // Set title
	            _setTitle(_getElement('iframe'));
	        }

	        // Handle YouTube API ready
	        function _youTubeReady(videoId, container) {
	            // Setup timers object
	            // We have to poll YouTube for updates
	            if (!('timer' in plyr)) {
	                plyr.timer = {};
	            }

	            // Setup instance
	            // https://developers.google.com/youtube/iframe_api_reference
	            plyr.embed = new window.YT.Player(container.id, {
	                videoId: videoId,
	                playerVars: {
	                    autoplay:       (config.autoplay ? 1 : 0),
	                    controls:       (plyr.supported.full ? 0 : 1),
	                    rel:            0,
	                    showinfo:       0,
	                    iv_load_policy: 3,
	                    cc_load_policy: (config.captions.defaultActive ? 1 : 0),
	                    cc_lang_pref:   'en',
	                    wmode:          'transparent',
	                    modestbranding: 1,
	                    disablekb:      1,
	                    origin:         '*' // https://code.google.com/p/gdata-issues/issues/detail?id=5788#c45
	                },
	                events: {
	                    'onError': function(event) {
	                        _triggerEvent(plyr.container, 'error', true, {
	                            code:   event.data,
	                            embed:  event.target
	                        });
	                    },
	                    'onReady': function(event) {
	                        // Get the instance
	                        var instance = event.target;

	                        // Create a faux HTML5 API using the YouTube API
	                        plyr.media.play = function() {
	                            instance.playVideo();
	                            plyr.media.paused = false;
	                        };
	                        plyr.media.pause = function() {
	                            instance.pauseVideo();
	                            plyr.media.paused = true;
	                        };
	                        plyr.media.stop = function() {
	                            instance.stopVideo();
	                            plyr.media.paused = true;
	                        };
	                        plyr.media.duration = instance.getDuration();
	                        plyr.media.paused = true;
	                        plyr.media.currentTime = instance.getCurrentTime();
	                        plyr.media.muted = instance.isMuted();

	                        // Set title
	                        config.title = instance.getVideoData().title;

	                        // Trigger timeupdate
	                        _triggerEvent(plyr.media, 'timeupdate');

	                        // Reset timer
	                        window.clearInterval(plyr.timer.buffering);

	                        // Setup buffering
	                        plyr.timer.buffering = window.setInterval(function() {
	                            // Get loaded % from YouTube
	                            plyr.media.buffered = instance.getVideoLoadedFraction();

	                            // Trigger progress
	                            _triggerEvent(plyr.media, 'progress');

	                            // Bail if we're at 100%
	                            if (plyr.media.buffered === 1) {
	                                window.clearInterval(plyr.timer.buffering);

	                                // Trigger event
	                                _triggerEvent(plyr.media, 'canplaythrough');
	                            }
	                        }, 200);

	                        // Update UI
	                        _embedReady();

	                        // Display duration if available
	                        _displayDuration();
	                    },
	                    'onStateChange': function(event) {
	                        // Get the instance
	                        var instance = event.target;

	                        // Reset timer
	                        window.clearInterval(plyr.timer.playing);

	                        // Handle events
	                        // -1   Unstarted
	                        // 0    Ended
	                        // 1    Playing
	                        // 2    Paused
	                        // 3    Buffering
	                        // 5    Video cued
	                        switch (event.data) {
	                            case 0:
	                                plyr.media.paused = true;
	                                _triggerEvent(plyr.media, 'ended');
	                                break;

	                            case 1:
	                                plyr.media.paused = false;
	                                plyr.media.seeking = false;
	                                _triggerEvent(plyr.media, 'play');
	                                _triggerEvent(plyr.media, 'playing');

	                                // Poll to get playback progress
	                                plyr.timer.playing = window.setInterval(function() {
	                                    // Set the current time
	                                    plyr.media.currentTime = instance.getCurrentTime();

	                                    // Trigger timeupdate
	                                    _triggerEvent(plyr.media, 'timeupdate');
	                                }, 100);

	                                break;

	                            case 2:
	                                plyr.media.paused = true;
	                                _triggerEvent(plyr.media, 'pause');
	                                break;
	                        }

	                        _triggerEvent(plyr.container, 'statechange', false, {
	                            code: event.data
	                        });
	                    }
	                }
	            });
	        }

	        // Vimeo ready
	        function _vimeoReady(mediaId, container) {
	            // Setup player
	            plyr.embed = new window.Vimeo.Player(container.id, {
	                id:         mediaId,
	                loop:       config.loop,
	                autoplay:   config.autoplay,
	                byline:     false,
	                portrait:   false,
	                title:      false
	            });

	            // Create a faux HTML5 API using the Vimeo API
	            plyr.media.play = function() {
	                plyr.embed.play();
	                plyr.media.paused = false;
	            };
	            plyr.media.pause = function() {
	                plyr.embed.pause();
	                plyr.media.paused = true;
	            };
	            plyr.media.stop = function() {
	                plyr.embed.stop();
	                plyr.media.paused = true;
	            };
	            plyr.media.paused = true;
	            plyr.media.currentTime = 0;

	            // Update UI
	            _embedReady();

	            plyr.embed.getCurrentTime().then(function (value) {
	                plyr.media.currentTime = value;

	                // Trigger timeupdate
	                _triggerEvent(plyr.media, 'timeupdate');
	            });

	            plyr.embed.getDuration().then(function(value) {
	                plyr.media.duration = value;

	                // Display duration if available
	                _displayDuration();
	            });

	            // TODO: Captions
	            /*if (config.captions.defaultActive) {
	                plyr.embed.enableTextTrack('en');
	            }*/

	            // Fix keyboard focus issues
	            // https://github.com/Selz/plyr/issues/317
	            plyr.embed.on('loaded', function() {
	                if(_is.htmlElement(plyr.embed.element)) {
	                    plyr.embed.element.setAttribute('tabindex', '-1');
	                }
	            });

	            plyr.embed.on('play', function() {
	                plyr.media.paused = false;
	                _triggerEvent(plyr.media, 'play');
	                _triggerEvent(plyr.media, 'playing');
	            });

	            plyr.embed.on('pause', function() {
	                plyr.media.paused = true;
	                _triggerEvent(plyr.media, 'pause');
	            });

	            plyr.embed.on('timeupdate', function(data) {
	                plyr.media.seeking = false;
	                plyr.media.currentTime = data.seconds;
	                _triggerEvent(plyr.media, 'timeupdate');
	            });

	            plyr.embed.on('progress', function(data) {
	                plyr.media.buffered = data.percent;
	                _triggerEvent(plyr.media, 'progress');

	                if (parseInt(data.percent) === 1) {
	                    // Trigger event
	                    _triggerEvent(plyr.media, 'canplaythrough');
	                }
	            });

	            plyr.embed.on('ended', function() {
	                plyr.media.paused = true;
	                _triggerEvent(plyr.media, 'ended');
	            });
	        }

	        // Soundcloud ready
	        function _soundcloudReady() {
	            /* jshint validthis: true */
	            plyr.embed = window.SC.Widget(this);

	            // Setup on ready
	            plyr.embed.bind(window.SC.Widget.Events.READY, function() {
	                // Create a faux HTML5 API using the Soundcloud API
	                plyr.media.play = function() {
	                    plyr.embed.play();
	                    plyr.media.paused = false;
	                };
	                plyr.media.pause = function() {
	                    plyr.embed.pause();
	                    plyr.media.paused = true;
	                };
	                plyr.media.stop = function() {
	                    plyr.embed.seekTo(0);
	                    plyr.embed.pause();
	                    plyr.media.paused = true;
	                };
	                plyr.media.paused = true;
	                plyr.media.currentTime = 0;

	                // Update UI
	                _embedReady();

	                plyr.embed.getPosition(function(value) {
	                    plyr.media.currentTime = value;

	                    // Trigger timeupdate
	                    _triggerEvent(plyr.media, 'timeupdate');
	                });

	                plyr.embed.getDuration(function(value) {
	                    plyr.media.duration = value/1000;
	                    // Display duration if available
	                    _displayDuration();
	                });

	                plyr.embed.bind(window.SC.Widget.Events.PLAY, function() {
	                    plyr.media.paused = false;
	                    _triggerEvent(plyr.media, 'play');
	                    _triggerEvent(plyr.media, 'playing');
	                });

	                plyr.embed.bind(window.SC.Widget.Events.PAUSE, function() {
	                    plyr.media.paused = true;
	                    _triggerEvent(plyr.media, 'pause');
	                });

	                plyr.embed.bind(window.SC.Widget.Events.PLAY_PROGRESS, function(data) {
	                    plyr.media.seeking = false;
	                    plyr.media.currentTime = data.currentPosition/1000;
	                    _triggerEvent(plyr.media, 'timeupdate');
	                });

	                plyr.embed.bind(window.SC.Widget.Events.LOAD_PROGRESS, function(data) {
	                    plyr.media.buffered = data.loadProgress;
	                    _triggerEvent(plyr.media, 'progress');

	                    if (parseInt(data.loadProgress) === 1) {
	                        // Trigger event
	                        _triggerEvent(plyr.media, 'canplaythrough');
	                    }
	                });

	                plyr.embed.bind(window.SC.Widget.Events.FINISH, function() {
	                    plyr.media.paused = true;
	                    _triggerEvent(plyr.media, 'ended');
	                });

	                // Autoplay
	                if (config.autoplay) {
	                    plyr.embed.play();
	                }
	            });
	        }

	        // Play media
	        function _play() {
	            if ('play' in plyr.media) {
	                plyr.media.play();
	            }
	        }

	        // Pause media
	        function _pause() {
	            if ('pause' in plyr.media) {
	                plyr.media.pause();
	            }
	        }

	        // Toggle playback
	        function _togglePlay(toggle) {
	            // Play
	            if (toggle === true) {
	                _play();
	            }
	            // Pause
	            else if (toggle === false) {
	                _pause();
	            }
	            // True toggle
	            else {
	                plyr.media[plyr.media.paused ? 'play' : 'pause']();
	            }
	        }

	        // Rewind
	        function _rewind(seekTime) {
	            // Use default if needed
	            if (!_is.number(seekTime)) {
	                seekTime = config.seekTime;
	            }
	            _seek(plyr.media.currentTime - seekTime);
	        }

	        // Fast forward
	        function _forward(seekTime) {
	            // Use default if needed
	            if (!_is.number(seekTime)) {
	                seekTime = config.seekTime;
	            }
	            _seek(plyr.media.currentTime + seekTime);
	        }

	        // Seek to time
	        // The input parameter can be an event or a number
	        function _seek(input) {
	            var targetTime  = 0,
	                paused      = plyr.media.paused,
	                duration    = _getDuration();

	            // Explicit position
	            if (_is.number(input)) {
	                targetTime = input;
	            }
	            // Event
	            else if (_is.object(input) && _inArray(['input', 'change'], input.type)) {
	                // It's the seek slider
	                // Seek to the selected time
	                targetTime = ((input.target.value / input.target.max) * duration);
	            }

	            // Normalise targetTime
	            if (targetTime < 0) {
	                targetTime = 0;
	            }
	            else if (targetTime > duration) {
	                targetTime = duration;
	            }

	            // Update seek range and progress 
	            _updateSeekDisplay(targetTime);

	            // Set the current time
	            // Try/catch incase the media isn't set and we're calling seek() from source() and IE moans
	            try {
	                plyr.media.currentTime = targetTime.toFixed(4);
	            }
	            catch(e) {}

	            // Embeds
	            if (_inArray(config.types.embed, plyr.type)) {
	                // YouTube
	                switch(plyr.type) {
	                    case 'youtube':
	                        plyr.embed.seekTo(targetTime);
	                        break;

	                    case 'vimeo':
	                        // Round to nearest second for vimeo
	                        plyr.embed.setCurrentTime(targetTime.toFixed(0));
	                        break;

	                    case 'soundcloud':
	                        plyr.embed.seekTo(targetTime * 1000);
	                        break;
	                }

	                if (paused) {
	                    _pause();
	                }

	                // Trigger timeupdate for embeds
	                _triggerEvent(plyr.media, 'timeupdate');

	                // Set seeking flag
	                plyr.media.seeking = true;
	            }

	            // Logging
	            _log('Seeking to ' + plyr.media.currentTime + ' seconds');

	            // Special handling for 'manual' captions
	            _seekManualCaptions(targetTime);
	        }

	        // Get the duration (or custom if set)
	        function _getDuration() {
	            // It should be a number, but parse it just incase
	            var duration = parseInt(config.duration),

	            // True duration
	            mediaDuration = 0;

	            // Only if duration available
	            if(plyr.media.duration !== null && !isNaN(plyr.media.duration)) {
	                mediaDuration = plyr.media.duration;
	            }

	            // If custom duration is funky, use regular duration
	            return (isNaN(duration) ? mediaDuration : duration);
	        }

	        // Check playing state
	        function _checkPlaying() {
	            _toggleClass(plyr.container, config.classes.playing, !plyr.media.paused);
	            _toggleClass(plyr.container, config.classes.stopped, plyr.media.paused);

	            _toggleControls(plyr.media.paused);
	        }

	        // Save scroll position
	        function _saveScrollPosition() {
	            scroll = {
	                x: window.pageXOffset || 0,
	                y: window.pageYOffset || 0
	            };
	        }

	        // Restore scroll position
	        function _restoreScrollPosition() {
	            window.scrollTo(scroll.x, scroll.y);
	        }

	        // Toggle fullscreen
	        function _toggleFullscreen(event) {
	            // Check for native support
	            var nativeSupport = fullscreen.supportsFullScreen;

	            // If it's a fullscreen change event, it's probably a native close
	            if (event && event.type === fullscreen.fullScreenEventName) {
	                plyr.isFullscreen = fullscreen.isFullScreen(plyr.container);
	            }
	            // If there's native support, use it
	            else if (nativeSupport) {
	                // Request fullscreen
	                if (!fullscreen.isFullScreen(plyr.container)) {
	                    // Save scroll position
	                    _saveScrollPosition();

	                    // Request full screen
	                    fullscreen.requestFullScreen(plyr.container);
	                }
	                // Bail from fullscreen
	                else {
	                    fullscreen.cancelFullScreen();
	                }

	                // Check if we're actually full screen (it could fail)
	                plyr.isFullscreen = fullscreen.isFullScreen(plyr.container);
	            }
	            else {
	                // Otherwise, it's a simple toggle
	                plyr.isFullscreen = !plyr.isFullscreen;

	                // Bind/unbind escape key
	                if (plyr.isFullscreen) {
	                    _on(document, 'keyup', _handleEscapeFullscreen);
	                    document.body.style.overflow = 'hidden';
	                }
	                else {
	                    _off(document, 'keyup', _handleEscapeFullscreen);
	                    document.body.style.overflow = '';
	                }
	            }

	            // Set class hook
	            _toggleClass(plyr.container, config.classes.fullscreen.active, plyr.isFullscreen);

	            // Trap focus
	            if (plyr.isFullscreen) {
	                plyr.container.setAttribute('tabindex', '-1');
	            }
	            else {
	                plyr.container.removeAttribute('tabindex');
	            }

	            // Trap focus
	            _focusTrap(plyr.isFullscreen);

	            // Set button state
	            if (plyr.buttons && plyr.buttons.fullscreen) {
	                _toggleState(plyr.buttons.fullscreen, plyr.isFullscreen);
	            }

	            // Trigger an event
	            _triggerEvent(plyr.container, plyr.isFullscreen ? 'enterfullscreen' : 'exitfullscreen', true);

	            // Restore scroll position
	            if (!plyr.isFullscreen && nativeSupport) {
	                _restoreScrollPosition();
	            }
	        }

	        // Bail from faux-fullscreen
	        function _handleEscapeFullscreen(event) {
	            // If it's a keypress and not escape, bail
	            if ((event.which || event.charCode || event.keyCode) === 27 && plyr.isFullscreen) {
	                _toggleFullscreen();
	            }
	        }

	        // Mute
	        function _toggleMute(muted) {
	            // If the method is called without parameter, toggle based on current value
	            if (!_is.boolean(muted)) {
	                muted = !plyr.media.muted;
	            }

	            // Set button state
	            _toggleState(plyr.buttons.mute, muted);

	            // Set mute on the player
	            plyr.media.muted = muted;

	            // If volume is 0 after unmuting, set to default
	            if (plyr.media.volume === 0) {
	                _setVolume(config.volume);
	            }

	            // Embeds
	            if (_inArray(config.types.embed, plyr.type)) {
	                // YouTube
	                switch(plyr.type) {
	                    case 'youtube':
	                        plyr.embed[plyr.media.muted ? 'mute' : 'unMute']();
	                        break;

	                    case 'vimeo':
	                    case 'soundcloud':
	                        plyr.embed.setVolume(plyr.media.muted ? 0 : parseFloat(config.volume / config.volumeMax));
	                        break;
	                }

	                // Trigger volumechange for embeds
	                _triggerEvent(plyr.media, 'volumechange');
	            }
	        }

	        // Set volume
	        function _setVolume(volume) {
	            var max = config.volumeMax,
	                min = config.volumeMin;

	            // Use default if no value specified
	            if (_is.undefined(volume)) {
	                volume = config.volume;

	                if (config.storage.enabled && _storage().supported) {
	                    volume = window.localStorage.getItem(config.storage.key);

	                    // Clean up old volume
	                    // https://github.com/Selz/plyr/issues/171
	                    window.localStorage.removeItem('plyr-volume');
	                }
	            }

	            // Use config if all else fails
	            if (volume === null || isNaN(volume)) {
	                volume = config.volume;
	            }

	            // Maximum is volumeMax
	            if (volume > max) {
	                volume = max;
	            }
	            // Minimum is volumeMin
	            if (volume < min) {
	                volume = min;
	            }

	            // Set the player volume
	            plyr.media.volume = parseFloat(volume / max);

	            // Set the display
	            if (plyr.volume.display) {
	                plyr.volume.display.value = volume;
	            }

	            // Embeds
	            if (_inArray(config.types.embed, plyr.type)) {
	                switch(plyr.type) {
	                    case 'youtube':
	                        plyr.embed.setVolume(plyr.media.volume * 100);
	                        break;

	                    case 'vimeo':
	                    case 'soundcloud':
	                        plyr.embed.setVolume(plyr.media.volume);
	                        break;
	                }

	                // Trigger volumechange for embeds
	                _triggerEvent(plyr.media, 'volumechange');
	            }

	            // Toggle muted state
	            if (plyr.media.muted && volume > 0) {
	                _toggleMute();
	            }
	        }

	        // Increase volume
	        function _increaseVolume() {
	            var volume = plyr.media.muted ? 0 : (plyr.media.volume * config.volumeMax);

	            _setVolume(volume + (config.volumeStep / 5));
	        }

	        // Decrease volume
	        function _decreaseVolume() {
	            var volume = plyr.media.muted ? 0 : (plyr.media.volume * config.volumeMax);

	            _setVolume(volume - (config.volumeStep / 5));
	        }

	        // Update volume UI and storage
	        function _updateVolume() {
	            // Get the current volume
	            var volume = plyr.media.muted ? 0 : (plyr.media.volume * config.volumeMax);

	            // Update the <input type="range"> if present
	            if (plyr.supported.full) {
	                if (plyr.volume.input) {
	                    plyr.volume.input.value = volume;
	                }
	                if (plyr.volume.display) {
	                    plyr.volume.display.value = volume;
	                }
	            }

	            // Store the volume in storage
	            if (config.storage.enabled && _storage().supported && !isNaN(volume)) {
	                window.localStorage.setItem(config.storage.key, volume);
	            }

	            // Toggle class if muted
	            _toggleClass(plyr.container, config.classes.muted, (volume === 0));

	            // Update checkbox for mute state
	            if (plyr.supported.full && plyr.buttons.mute) {
	                _toggleState(plyr.buttons.mute, (volume === 0));
	            }
	        }

	        // Toggle captions
	        function _toggleCaptions(show) {
	            // If there's no full support, or there's no caption toggle
	            if (!plyr.supported.full || !plyr.buttons.captions) {
	                return;
	            }

	            // If the method is called without parameter, toggle based on current value
	            if (!_is.boolean(show)) {
	                show = (plyr.container.className.indexOf(config.classes.captions.active) === -1);
	            }

	            // Set global
	            plyr.captionsEnabled = show;

	            // Toggle state
	            _toggleState(plyr.buttons.captions, plyr.captionsEnabled);

	            // Add class hook
	            _toggleClass(plyr.container, config.classes.captions.active, plyr.captionsEnabled);

	            // Trigger an event
	            _triggerEvent(plyr.container, plyr.captionsEnabled ? 'captionsenabled' : 'captionsdisabled', true);
	        }

	        // Check if media is loading
	        function _checkLoading(event) {
	            var loading = (event.type === 'waiting');

	            // Clear timer
	            clearTimeout(plyr.timers.loading);

	            // Timer to prevent flicker when seeking
	            plyr.timers.loading = setTimeout(function() {
	                _toggleClass(plyr.container, config.classes.loading, loading);
	            }, (loading ? 250 : 0));
	        }

	        // Update <progress> elements
	        function _updateProgress(event) {
	            if (!plyr.supported.full) {
	                return;
	            }

	            var progress    = plyr.progress.played,
	                value       = 0,
	                duration    = _getDuration();

	            if (event) {
	                switch (event.type) {
	                    // Video playing
	                    case 'timeupdate':
	                    case 'seeking':
	                        if (plyr.controls.pressed) {
	                            return;
	                        }

	                        value = _getPercentage(plyr.media.currentTime, duration);

	                        // Set seek range value only if it's a 'natural' time event
	                        if (event.type == 'timeupdate' && plyr.buttons.seek) {
	                            plyr.buttons.seek.value = value;
	                        }

	                        break;

	                    // Check buffer status
	                    case 'playing':
	                    case 'progress':
	                        progress    = plyr.progress.buffer;
	                        value       = (function() {
	                            var buffered = plyr.media.buffered;

	                            // HTML5
	                            if (buffered && buffered.length) {
	                                return _getPercentage(buffered.end(0), duration);
	                            }
	                            // YouTube returns between 0 and 1
	                            else if (_is.number(buffered)) {
	                                return (buffered * 100);
	                            }

	                            return 0;
	                        })();

	                        break;
	                }
	            }

	            // Set values
	            _setProgress(progress, value);
	        }

	        // Set <progress> value
	        function _setProgress(progress, value) {
	            if (!plyr.supported.full) {
	                return;
	            }
	            
	            // Default to 0
	            if (_is.undefined(value)) {
	                value = 0;
	            }
	            // Default to buffer or bail
	            if (_is.undefined(progress)) {
	                if (plyr.progress && plyr.progress.buffer) {
	                    progress = plyr.progress.buffer;
	                }
	                else {
	                    return;
	                }
	            }

	            // One progress element passed
	            if (_is.htmlElement(progress)) {
	                progress.value = value;
	            }
	            // Object of progress + text element
	            else if (progress) {
	                if (progress.bar) {
	                    progress.bar.value = value;
	                }
	                if (progress.text) {
	                    progress.text.innerHTML = value;
	                }
	            }
	        }

	        // Update the displayed time
	        function _updateTimeDisplay(time, element) {
	            // Bail if there's no duration display
	            if (!element) {
	                return;
	            }

	            // Fallback to 0
	            if (isNaN(time)) {
	                time = 0;
	            }

	            plyr.secs = parseInt(time % 60);
	            plyr.mins = parseInt((time / 60) % 60);
	            plyr.hours = parseInt(((time / 60) / 60) % 60);

	            // Do we need to display hours?
	            var displayHours = (parseInt(((_getDuration() / 60) / 60) % 60) > 0);

	            // Ensure it's two digits. For example, 03 rather than 3.
	            plyr.secs = ('0' + plyr.secs).slice(-2);
	            plyr.mins = ('0' + plyr.mins).slice(-2);

	            // Render
	            element.innerHTML = (displayHours ? plyr.hours + ':' : '') + plyr.mins + ':' + plyr.secs;
	        }

	        // Show the duration on metadataloaded
	        function _displayDuration() {
	            if (!plyr.supported.full) {
	                return;
	            }

	            // Determine duration
	            var duration = _getDuration() || 0;

	            // If there's only one time display, display duration there
	            if (!plyr.duration && config.displayDuration && plyr.media.paused) {
	                _updateTimeDisplay(duration, plyr.currentTime);
	            }

	            // If there's a duration element, update content
	            if (plyr.duration) {
	                _updateTimeDisplay(duration, plyr.duration);
	            }

	            // Update the tooltip (if visible)
	            _updateSeekTooltip();
	        }

	        // Handle time change event
	        function _timeUpdate(event) {
	            // Duration
	            _updateTimeDisplay(plyr.media.currentTime, plyr.currentTime);

	            // Ignore updates while seeking
	            if (event && event.type == 'timeupdate' && plyr.media.seeking) {
	                return;
	            }

	            // Playing progress
	            _updateProgress(event);
	        }

	        // Update seek range and progress 
	        function _updateSeekDisplay(time) {
	            // Default to 0
	            if (!_is.number(time)) {
	                time = 0;
	            }

	            var duration    = _getDuration(),
	                value       = _getPercentage(time, duration);

	            // Update progress 
	            if (plyr.progress && plyr.progress.played) {
	                plyr.progress.played.value = value;
	            }

	            // Update seek range input
	            if (plyr.buttons && plyr.buttons.seek) {
	                plyr.buttons.seek.value = value;
	            }
	        }

	        // Update hover tooltip for seeking
	        function _updateSeekTooltip(event) {
	            var duration = _getDuration();

	            // Bail if setting not true
	            if (!config.tooltips.seek || !plyr.progress.container || duration === 0) {
	                return;
	            }

	            // Calculate percentage
	            var clientRect  = plyr.progress.container.getBoundingClientRect(),
	                percent     = 0,
	                visible     = config.classes.tooltip + '--visible';

	            // Determine percentage, if already visible
	            if (!event) {
	                if (_hasClass(plyr.progress.tooltip, visible)) {
	                    percent = plyr.progress.tooltip.style.left.replace('%', '');
	                }
	                else {
	                    return;
	                }
	            }
	            else {
	                percent = ((100 / clientRect.width) * (event.pageX - clientRect.left));
	            }

	            // Set bounds
	            if (percent < 0) {
	                percent = 0;
	            }
	            else if (percent > 100) {
	                percent = 100;
	            }

	            // Display the time a click would seek to
	            _updateTimeDisplay(((duration / 100) * percent), plyr.progress.tooltip);

	            // Set position
	            plyr.progress.tooltip.style.left = percent + "%";

	            // Show/hide the tooltip
	            // If the event is a moues in/out and percentage is inside bounds
	            if (event && _inArray(['mouseenter', 'mouseleave'], event.type)) {
	                _toggleClass(plyr.progress.tooltip, visible, (event.type === 'mouseenter'));
	            }
	        }

	        // Show the player controls in fullscreen mode
	        function _toggleControls(toggle) {
	            if (!config.hideControls || plyr.type === 'audio') {
	                return;
	            }

	            var delay = 0,
	                isEnterFullscreen = false,
	                show = toggle;

	            // Default to false if no boolean
	            if (!_is.boolean(toggle)) {
	                if (toggle && toggle.type) {
	                    // Is the enter fullscreen event
	                    isEnterFullscreen = (toggle.type === 'enterfullscreen');

	                    // Whether to show controls
	                    show = _inArray(['mousemove', 'touchstart', 'mouseenter', 'focus'], toggle.type);

	                    // Delay hiding on move events
	                    if (_inArray(['mousemove', 'touchmove'], toggle.type)) {
	                        delay = 2000;
	                    }

	                    // Delay a little more for keyboard users
	                    if (toggle.type === 'focus') {
	                        delay = 3000;
	                    }
	                }
	                else {
	                    show = _hasClass(plyr.container, config.classes.hideControls);
	                }
	            }

	            // Clear timer every movement
	            window.clearTimeout(plyr.timers.hover);

	            // If the mouse is not over the controls, set a timeout to hide them
	            if (show || plyr.media.paused) {
	                _toggleClass(plyr.container, config.classes.hideControls, false);

	                // Always show controls when paused or if touch
	                if (plyr.media.paused) {
	                    return;
	                }

	                // Delay for hiding on touch
	                if (plyr.browser.isTouch) {
	                    delay = 3000;
	                }
	            }

	            // If toggle is false or if we're playing (regardless of toggle), 
	            // then set the timer to hide the controls 
	            if (!show || !plyr.media.paused) {
	                plyr.timers.hover = window.setTimeout(function() {
	                    // If the mouse is over the controls (and not entering fullscreen), bail
	                    if ((plyr.controls.pressed || plyr.controls.hover) && !isEnterFullscreen) {
	                        return;
	                    }
	                    
	                    _toggleClass(plyr.container, config.classes.hideControls, true);
	                }, delay);
	            }
	        }

	        // Add common function to retrieve media source
	        function _source(source) {
	            // If not null or undefined, parse it
	            if (!_is.undefined(source)) {
	                _updateSource(source);
	                return;
	            }

	            // Return the current source
	            var url;
	            switch(plyr.type) {
	                case 'youtube':
	                    url = plyr.embed.getVideoUrl();
	                    break;

	                case 'vimeo':
	                    plyr.embed.getVideoUrl.then(function (value) {
	                        url = value;
	                    });
	                    break;

	                case 'soundcloud':
	                    plyr.embed.getCurrentSound(function(object) {
	                        url = object.permalink_url;
	                    });
	                    break;

	                default:
	                    url = plyr.media.currentSrc;
	                    break;
	            }

	            return url || '';
	        }

	        // Update source
	        // Sources are not checked for support so be careful
	        function _updateSource(source) {
	            if (!_is.object(source) || !('sources' in source) || !source.sources.length) {
	                _warn('Invalid source format');
	                return;
	            }

	            // Pause playback
	            _pause();

	            // Update seek range and progress
	            _updateSeekDisplay();

	            // Reset buffer progress
	            _setProgress();

	            // Cancel current network requests
	            _cancelRequests();

	            // Clean up YouTube stuff
	            if (plyr.type === 'youtube') {
	                // Destroy the embed instance
	                plyr.embed.destroy();

	                // Clear timer
	                window.clearInterval(plyr.timer.buffering);
	                window.clearInterval(plyr.timer.playing);
	            }
	            // HTML5 Video
	            else if (plyr.type === 'video' && plyr.videoContainer) {
	                // Remove video wrapper
	                _remove(plyr.videoContainer);
	            }

	            // Remove embed object
	            plyr.embed = null;

	            // Remove the old media
	            _remove(plyr.media);

	            // Set the type
	            if ('type' in source) {
	                plyr.type = source.type;

	                // Get child type for video (it might be an embed)
	                if (plyr.type === 'video') {
	                    var firstSource = source.sources[0];

	                    if ('type' in firstSource && _inArray(config.types.embed, firstSource.type)) {
	                        plyr.type = firstSource.type;
	                    }
	                }
	            }

	            // Check for support
	            plyr.supported = supported(plyr.type);

	            // Create new markup
	            switch(plyr.type) {
	                case 'video':
	                    plyr.media = document.createElement('video');
	                    break;

	                case 'audio':
	                    plyr.media = document.createElement('audio');
	                    break;

	                case 'youtube':
	                case 'vimeo':
	                case 'soundcloud':
	                    plyr.media = document.createElement('div');
	                    plyr.embedId = source.sources[0].src;
	                    break;
	            }

	            // Inject the new element
	            _prependChild(plyr.container, plyr.media);

	            // Autoplay the new source?
	            if (_is.boolean(source.autoplay)) {
	                config.autoplay = source.autoplay;
	            }

	            // Set attributes for audio video
	            if (_inArray(config.types.html5, plyr.type)) {
	                if (config.crossorigin) {
	                    plyr.media.setAttribute('crossorigin', '');
	                }
	                if (config.autoplay) {
	                    plyr.media.setAttribute('autoplay', '');
	                }
	                if ('poster' in source) {
	                    plyr.media.setAttribute('poster', source.poster);
	                }
	                if (config.loop) {
	                    plyr.media.setAttribute('loop', '');
	                }
	            }

	            // Classname reset
	            plyr.container.className = plyr.originalClassName;

	            // Restore class hooks
	            _toggleClass(plyr.container, config.classes.fullscreen.active, plyr.isFullscreen);
	            _toggleClass(plyr.container, config.classes.captions.active, plyr.captionsEnabled);
	            _toggleStyleHook();

	            // Set new sources for html5
	            if (_inArray(config.types.html5, plyr.type)) {
	                _insertChildElements('source', source.sources);
	            }

	            // Set up from scratch
	            _setupMedia();

	            // HTML5 stuff
	            if (_inArray(config.types.html5, plyr.type)) {
	                // Setup captions
	                if ('tracks' in source) {
	                    _insertChildElements('track', source.tracks);
	                }

	                // Load HTML5 sources
	                plyr.media.load();

	                // Setup interface
	                _setupInterface();

	                // Display duration if available
	                _displayDuration();
	            }
	            // If embed but not fully supported, setupInterface now
	            else if (_inArray(config.types.embed, plyr.type) && !plyr.supported.full) {
	                _setupInterface();
	            }

	            // Set aria title and iframe title
	            config.title = source.title;
	            _setTitle();

	            // Reset media objects
	            plyr.container.plyr.media = plyr.media;
	        }

	        // Update poster
	        function _updatePoster(source) {
	            if (plyr.type === 'video') {
	                plyr.media.setAttribute('poster', source);
	            }
	        }

	        // Listen for control events
	        function _controlListeners() {
	            // IE doesn't support input event, so we fallback to change
	            var inputEvent = (plyr.browser.isIE ? 'change' : 'input');

	            // Click play/pause helper
	            function _togglePlay() {
	                var play = plyr.media.paused;

	                // Toggle playback
	                if (play) {
	                    _play();
	                }
	                else {
	                    _pause();
	                }

	                // Determine which buttons
	                var trigger = plyr.buttons[play ? 'play' : 'pause'],
	                    target = plyr.buttons[play ? 'pause' : 'play'];

	                // Get the last play button to account for the large play button
	                if (target && target.length > 1) {
	                    target = target[target.length - 1];
	                }
	                else {
	                    target = target[0];
	                }

	                // Setup focus and tab focus
	                if (target) {
	                    var hadTabFocus = _hasClass(trigger, config.classes.tabFocus);

	                    setTimeout(function() {
	                        target.focus();

	                        if (hadTabFocus) {
	                            _toggleClass(trigger, config.classes.tabFocus, false);
	                            _toggleClass(target, config.classes.tabFocus, true);
	                        }
	                    }, 100);
	                }
	            }

	            // Detect tab focus
	            function checkFocus() {
	                var focused = document.activeElement;

	                if (!focused || focused == document.body) {
	                    focused = null;
	                }
	                else if (document.querySelector) {
	                    focused = document.querySelector(':focus');
	                }
	                for (var button in plyr.buttons) {
	                    var element = plyr.buttons[button];

	                    if (_is.nodeList(element)) {
	                        for (var i = 0; i < element.length; i++) {
	                            _toggleClass(element[i], config.classes.tabFocus, (element[i] === focused));
	                        }
	                    }
	                    else {
	                        _toggleClass(element, config.classes.tabFocus, (element === focused));
	                    }
	                }
	            }

	            _on(window, 'keyup', function(event) {
	                var code = (event.keyCode ? event.keyCode : event.which);

	                if (code == 9) {
	                    checkFocus();
	                }
	            });
	            _on(document.body, 'click', function() {
	                _toggleClass(_getElement('.' + config.classes.tabFocus), config.classes.tabFocus, false);
	            });
	            for (var button in plyr.buttons) {
	                var element = plyr.buttons[button];

	                _on(element, 'blur', function() {
	                    _toggleClass(element, 'tab-focus', false);
	                });
	            }

	            // Play
	            _proxyListener(plyr.buttons.play, 'click', config.listeners.play, _togglePlay);

	            // Pause
	            _proxyListener(plyr.buttons.pause, 'click', config.listeners.pause, _togglePlay);

	            // Restart
	            _proxyListener(plyr.buttons.restart, 'click', config.listeners.restart, _seek);

	            // Rewind
	            _proxyListener(plyr.buttons.rewind, 'click', config.listeners.rewind, _rewind);

	            // Fast forward
	            _proxyListener(plyr.buttons.forward, 'click', config.listeners.forward, _forward);

	            // Seek
	            _proxyListener(plyr.buttons.seek, inputEvent, config.listeners.seek, _seek);

	            // Set volume
	            _proxyListener(plyr.volume.input, inputEvent, config.listeners.volume, function() {
	                _setVolume(plyr.volume.input.value);
	            });

	            // Mute
	            _proxyListener(plyr.buttons.mute, 'click', config.listeners.mute, _toggleMute);

	            // Fullscreen
	            _proxyListener(plyr.buttons.fullscreen, 'click', config.listeners.fullscreen, _toggleFullscreen);

	            // Handle user exiting fullscreen by escaping etc
	            if (fullscreen.supportsFullScreen) {
	                _on(document, fullscreen.fullScreenEventName, _toggleFullscreen);
	            }

	            // Captions
	            _on(plyr.buttons.captions, 'click', _toggleCaptions);

	            // Seek tooltip
	            _on(plyr.progress.container, 'mouseenter mouseleave mousemove', _updateSeekTooltip);

	            // Toggle controls visibility based on mouse movement
	            if (config.hideControls) {
	                // Toggle controls on mouse events and entering fullscreen
	                _on(plyr.container, 'mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen', _toggleControls);

	                // Watch for cursor over controls so they don't hide when trying to interact
	                _on(plyr.controls, 'mouseenter mouseleave', function(event) { 
	                    plyr.controls.hover = event.type === 'mouseenter';
	                });

	                 // Watch for cursor over controls so they don't hide when trying to interact
	                _on(plyr.controls, 'mousedown mouseup touchstart touchend touchcancel', function(event) { 
	                    plyr.controls.pressed = _inArray(['mousedown', 'touchstart'], event.type);
	                });

	                // Focus in/out on controls
	                _on(plyr.controls, 'focus blur', _toggleControls, true);
	            }

	            // Adjust volume on scroll
	            _on(plyr.volume.input, 'wheel', function(event) {
	                event.preventDefault();

	                // Detect "natural" scroll - suppored on OS X Safari only
	                // Other browsers on OS X will be inverted until support improves
	                var inverted = event.webkitDirectionInvertedFromDevice;

	                // Scroll down (or up on natural) to decrease
	                if (event.deltaY < 0 || event.deltaX > 0) {
	                    if (inverted) {
	                        _decreaseVolume();
	                    }
	                    else {
	                        _increaseVolume();
	                    }
	                }

	                // Scroll up (or down on natural) to increase
	                if (event.deltaY > 0 || event.deltaX < 0) {
	                    if (inverted) {
	                        _increaseVolume();
	                    }
	                    else {
	                        _decreaseVolume();
	                    }
	                }
	            });
	        }

	        // Listen for media events
	        function _mediaListeners() {
	            // Time change on media
	            _on(plyr.media, 'timeupdate seeking', _timeUpdate);

	            // Update manual captions
	            _on(plyr.media, 'timeupdate', _seekManualCaptions);

	            // Display duration
	            _on(plyr.media, 'durationchange loadedmetadata', _displayDuration);

	            // Handle the media finishing
	            _on(plyr.media, 'ended', function() {
	                // Clear
	                if (plyr.type === 'video') {
	                    _setCaption();
	                }

	                // Reset UI
	                _checkPlaying();

	                // Seek to 0
	                _seek(0);

	                // Reset duration display
	                _displayDuration();

	                // Show poster on end
	                if(plyr.type === 'video' && config.showPosterOnEnd) {
	                    // Re-load media
	                    plyr.media.load();
	                }
	            });

	            // Check for buffer progress
	            _on(plyr.media, 'progress playing', _updateProgress);

	            // Handle native mute
	            _on(plyr.media, 'volumechange', _updateVolume);

	            // Handle native play/pause
	            _on(plyr.media, 'play pause', _checkPlaying);

	            // Loading
	            _on(plyr.media, 'waiting canplay seeked', _checkLoading);

	            // Click video
	            if (config.clickToPlay && plyr.type !== 'audio') {
	                // Re-fetch the wrapper
	                var wrapper = _getElement('.' + config.classes.videoWrapper);

	                // Bail if there's no wrapper (this should never happen)
	                if (!wrapper) {
	                    return;
	                }

	                // Set cursor
	                wrapper.style.cursor = "pointer";

	                // On click play, pause ore restart
	                _on(wrapper, 'click', function() {
	                    // Touch devices will just show controls (if we're hiding controls)
	                    if (config.hideControls && plyr.browser.isTouch && !plyr.media.paused) {
	                        return;
	                    }

	                    if (plyr.media.paused) {
	                        _play();
	                    }
	                    else if (plyr.media.ended) {
	                        _seek();
	                        _play();
	                    }
	                    else {
	                        _pause();
	                    }
	                });
	            }

	            // Disable right click
	            if (config.disableContextMenu) {
	                _on(plyr.media, 'contextmenu', function(event) { event.preventDefault(); });
	            }

	            // Proxy events to container
	            _on(plyr.media, config.events.join(' '), function(event) {
	                _triggerEvent(plyr.container, event.type, true);
	            });
	        }

	        // Cancel current network requests
	        // See https://github.com/Selz/plyr/issues/174
	        function _cancelRequests() {
	            if (!_inArray(config.types.html5, plyr.type)) {
	                return;
	            }

	            // Remove child sources
	            var sources = plyr.media.querySelectorAll('source');
	            for (var i = 0; i < sources.length; i++) {
	                _remove(sources[i]);
	            }

	            // Set blank video src attribute
	            // This is to prevent a MEDIA_ERR_SRC_NOT_SUPPORTED error
	            // Info: http://stackoverflow.com/questions/32231579/how-to-properly-dispose-of-an-html5-video-and-close-socket-or-connection
	            plyr.media.setAttribute('src', 'https://cdn.selz.com/plyr/blank.mp4');

	            // Load the new empty source
	            // This will cancel existing requests
	            // See https://github.com/Selz/plyr/issues/174
	            plyr.media.load();

	            // Debugging
	            _log("Cancelled network requests for old media");
	        }

	        // Destroy an instance
	        // Event listeners are removed when elements are removed
	        // http://stackoverflow.com/questions/12528049/if-a-dom-element-is-removed-are-its-listeners-also-removed-from-memory
	        function _destroy() {
	            // Bail if the element is not initialized
	            if (!plyr.init) {
	                return null;
	            }

	            // Reset container classname
	            plyr.container.setAttribute('class', _getClassname(config.selectors.container));

	            // Remove init flag
	            plyr.init = false;

	            // Remove controls
	            _remove(_getElement(config.selectors.controls.wrapper));

	            // YouTube
	            if (plyr.type === 'youtube') {
	                plyr.embed.destroy();
	                return;
	            }

	            // If video, we need to remove some more
	            if (plyr.type === 'video') {
	                // Remove captions container
	                _remove(_getElement(config.selectors.captions));

	                // Remove video wrapper
	                _unwrap(plyr.videoContainer);
	            }

	            // Restore native video controls
	            _toggleNativeControls(true);

	            // Clone the media element to remove listeners
	            // http://stackoverflow.com/questions/19469881/javascript-remove-all-event-listeners-of-specific-type
	            var clone = plyr.media.cloneNode(true);
	            plyr.media.parentNode.replaceChild(clone, plyr.media);
	        }

	        // Setup a player
	        function _init() {
	            // Bail if the element is initialized
	            if (plyr.init) {
	                return null;
	            }

	            // Setup the fullscreen api
	            fullscreen = _fullscreen();

	            // Sniff out the browser
	            plyr.browser = _browserSniff();

	            // Get the media element
	            plyr.media = plyr.container.querySelectorAll('audio, video')[0];

	            // Get the div placeholder for YouTube and Vimeo
	            if (!plyr.media) {
	                plyr.media = plyr.container.querySelectorAll('[data-type]')[0];
	            }

	            // Bail if nothing to setup
	            if (!plyr.media) {
	                return;
	            }

	            // Get original classname
	            plyr.originalClassName = plyr.container.className;

	            // Set media type based on tag or data attribute
	            // Supported: video, audio, vimeo, youtube
	            var tagName = plyr.media.tagName.toLowerCase();
	            if (tagName === 'div') {
	                plyr.type     = plyr.media.getAttribute('data-type');
	                plyr.embedId  = plyr.media.getAttribute('data-video-id');

	                // Clean up
	                plyr.media.removeAttribute('data-type');
	                plyr.media.removeAttribute('data-video-id');
	            }
	            else {
	                plyr.type           = tagName;
	                config.crossorigin  = (plyr.media.getAttribute('crossorigin') !== null);
	                config.autoplay     = (config.autoplay || (plyr.media.getAttribute('autoplay') !== null));
	                config.loop         = (config.loop || (plyr.media.getAttribute('loop') !== null));
	            }

	            // Check for support
	            plyr.supported = supported(plyr.type);

	            // Add style hook
	            _toggleStyleHook();

	            // If no native support, bail
	            if (!plyr.supported.basic) {
	                return false;
	            }

	            // Debug info
	            _log(plyr.browser.name + ' ' + plyr.browser.version);

	            // Setup media
	            _setupMedia();

	            // Setup interface
	            if (_inArray(config.types.html5, plyr.type)) {
	                // Bail if no support
	                if (!plyr.supported.full) {
	                    // Successful setup
	                    plyr.init = true;

	                    // Don't inject controls if no full support
	                    return;
	                }

	                // Setup UI
	                _setupInterface();

	                // Set title on button and frame
	                _setTitle();

	                // Autoplay
	                if (config.autoplay) {
	                    _play();
	                }
	            }
	            // If embed but not fully supported, setupInterface now (to avoid flash of controls)
	            else if (_inArray(config.types.embed, plyr.type) && !plyr.supported.full) {
	                _setupInterface();
	            }

	            // Successful setup
	            plyr.init = true;
	        }

	        function _setupInterface() {
	            // Don't setup interface if no support
	            if (!plyr.supported.full) {
	                _warn('No full support for this media type (' + plyr.type + ')');

	                // Remove controls
	                _remove(_getElement(config.selectors.controls.wrapper));

	                // Remove large play
	                _remove(_getElement(config.selectors.buttons.play));

	                // Restore native controls
	                _toggleNativeControls(true);

	                // Bail
	                return;
	            }

	            // Inject custom controls if not present
	            var controlsMissing = !_getElements(config.selectors.controls.wrapper).length;
	            if (controlsMissing) {
	                // Inject custom controls
	                _injectControls();
	            }

	            // Find the elements
	            if (!_findElements()) {
	                return;
	            }

	            // If the controls are injected, re-bind listeners for controls
	            if (controlsMissing) {
	                _controlListeners();
	            }

	            // Media element listeners
	            _mediaListeners();

	            // Remove native controls
	            _toggleNativeControls();

	            // Setup fullscreen
	            _setupFullscreen();

	            // Captions
	            _setupCaptions();

	            // Set volume
	            _setVolume();
	            _updateVolume();

	            // Reset time display
	            _timeUpdate();

	            // Update the UI
	            _checkPlaying();

	            // Display duration
	            _displayDuration();

	            // Ready event
	            _triggerEvent(plyr.container, 'ready', true);
	        }

	        // Initialize instance
	        _init();

	        // If init failed, return an empty object
	        if (!plyr.init) {
	            return {};
	        }

	        return {
	            media:              plyr.media,
	            play:               _play,
	            pause:              _pause,
	            restart:            _seek,
	            rewind:             _rewind,
	            forward:            _forward,
	            seek:               _seek,
	            source:             _source,
	            poster:             _updatePoster,
	            setVolume:          _setVolume,
	            togglePlay:         _togglePlay,
	            toggleMute:         _toggleMute,
	            toggleCaptions:     _toggleCaptions,
	            toggleFullscreen:   _toggleFullscreen,
	            toggleControls:     _toggleControls,
	            isFullscreen:       function() { return plyr.isFullscreen || false; },
	            support:            function(mimeType) { return _supportMime(plyr, mimeType); },
	            destroy:            _destroy,
	            restore:            _init,
	            getCurrentTime:     function() { return plyr.media.currentTime; }
	        };
	    }

	    // Load a sprite
	    function loadSprite(url, id) {
	        var x = new XMLHttpRequest();

	        // If the id is set and sprite exists, bail
	        if (_is.string(id) && document.querySelector('#' + id) !== null) {
	            return;
	        }

	        // Check for CORS support
	        if ('withCredentials' in x) {
	            x.open('GET', url, true);
	        }
	        else {
	            return;
	        }

	        // Inject hidden div with sprite on load
	        x.onload = function() {
	            var c = document.createElement('div');
	            c.setAttribute('hidden', '');
	            if (_is.string(id)) {
	                c.setAttribute('id', id);
	            }
	            c.innerHTML = x.responseText;
	            document.body.insertBefore(c, document.body.childNodes[0]);
	        }

	        x.send();
	    }

	    // Check for support
	    function supported(type) {
	        var browser     = _browserSniff(),
	            isOldIE     = (browser.isIE && browser.version <= 9),
	            isIos       = browser.isIos,
	            isIphone    = /iPhone|iPod/i.test(navigator.userAgent),
	            audio       = !!document.createElement('audio').canPlayType,
	            video       = !!document.createElement('video').canPlayType,
	            basic, full;

	        switch (type) {
	            case 'video':
	                basic = video;
	                full  = (basic && (!isOldIE && !isIphone));
	                break;

	            case 'audio':
	                basic = audio;
	                full  = (basic && !isOldIE);
	                break;

	            case 'vimeo':
	            case 'youtube':
	            case 'soundcloud':
	                basic = true;
	                full  = (!isOldIE && !isIos);
	                break;

	            default:
	                basic = (audio && video);
	                full  = (basic && !isOldIE);
	        }

	        return {
	            basic:  basic,
	            full:   full
	        };
	    }

	    // Setup function
	    function setup(targets, options) {
	        // Get the players
	        var elements    = [],
	            containers  = [],
	            selector    = [defaults.selectors.html5, defaults.selectors.embed].join(',');

	        // Select the elements
	        // Assume elements is a NodeList by default
	        if (_is.string(targets)) {
	            targets = document.querySelectorAll(targets);
	        }
	        // Single HTMLElement passed
	        else if (_is.htmlElement(targets)) {
	            targets = [targets];
	        }
	        // No selector passed, possibly options as first argument
	        else if (!_is.nodeList(targets) && !_is.array(targets) && !_is.string(targets))  {
	            // If options are the first argument
	            if (_is.undefined(options) && _is.object(targets)) {
	                options = targets;
	            }

	            // Use default selector
	            targets = document.querySelectorAll(selector);
	        }

	        // Convert NodeList to array
	        if (_is.nodeList(targets)) {
	            targets = Array.prototype.slice.call(targets);
	        }

	        // Bail if disabled or no basic support
	        // You may want to disable certain UAs etc
	        if (!supported().basic || !targets.length) {
	            return false;
	        }

	        // Check if the targets have multiple media elements
	        for (var i = 0; i < targets.length; i++) {
	            var target = targets[i];

	            // Get children
	            var children = target.querySelectorAll(selector);

	            // If there's more than one media element, wrap them
	            if (children.length > 1) {
	                for (var x = 0; x < children.length; x++) {
	                    containers.push({
	                        element: _wrap(children[x], document.createElement('div')),
	                        original: target
	                    });
	                }
	            }
	            else {
	                containers.push({
	                    element: target
	                });
	            }
	        }

	        // Create a player instance for each element
	        for (var key in containers) {
	            var element = containers[key].element,
	                original = containers[key].original || element;

	            // Wrap each media element if is target is media element
	            // as opposed to a wrapper
	            if (_matches(element, selector)) {
	                // Wrap in a <div>
	                element = _wrap(element, document.createElement('div'));
	            }

	            // Setup a player instance and add to the element
	            if (!('plyr' in element)) {
	                // Create instance-specific config
	                var config = _extend({}, defaults, options, JSON.parse(original.getAttribute('data-plyr')));

	                // Bail if not enabled
	                if (!config.enabled) {
	                    return null;
	                }

	                // Create new instance
	                var instance = new Plyr(element, config);

	                // Set plyr to false if setup failed
	                element.plyr = (Object.keys(instance).length ? instance : false);

	                // Callback
	                _triggerEvent(original, 'setup', true, { 
	                    plyr: element.plyr 
	                });
	            }

	            // Add to return array even if it's already setup
	            elements.push(element);
	        }

	        return elements;
	    }

	    return {
	        setup:      setup,
	        supported:  supported,
	        loadSprite: loadSprite
	    };
	}));

	// Custom event polyfill
	// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
	(function () {
	    if (typeof window.CustomEvent === 'function') {
	        return;
	    }

	    function CustomEvent(event, params) {
	        params = params || { bubbles: false, cancelable: false, detail: undefined };
	        var evt = document.createEvent('CustomEvent');
	        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	        return evt;
	    }

	    CustomEvent.prototype = window.Event.prototype;

	    window.CustomEvent = CustomEvent;
	})();


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
		"controls": [
			"play",
			"progress",
			"current-time",
			"mute",
			"volume",
			"captions",
			"fullscreen"
		],
		"seekTime": 0.01666666666666667,
		"clickToPlay": false
	};

/***/ }
/******/ ]);