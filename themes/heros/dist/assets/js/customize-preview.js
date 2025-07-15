/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/helpers/strip-tags.js":
/*!*********************************************!*\
  !*** ./src/assets/js/helpers/strip-tags.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var strip_tags = function strip_tags(input, allowed) {
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (strip_tags);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/assets/js/customize-preview.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var _helpers_strip_tags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/strip-tags.js */ "./src/assets/js/helpers/strip-tags.js");


wp.customize('blogname', function (value) {
  value.bind(function (to) {
    jquery__WEBPACK_IMPORTED_MODULE_0__('.jp-site-brand__name').html((0,_helpers_strip_tags_js__WEBPACK_IMPORTED_MODULE_1__["default"])(to));
  });
});
wp.customize('_themename_display_author_info', function (value) {
  value.bind(function (to) {
    if (to) {
      jquery__WEBPACK_IMPORTED_MODULE_0__('.j-post-author').show();
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0__('.j-post-author').hide();
    }
  });
});
wp.customize('_themename_accent_colour', function (value) {
  value.bind(function (to) {
    var inline_css = "";
    var inline_css_obj = _themename['inline-css'];
    for (var selector in inline_css_obj) {
      inline_css += "".concat(selector, " {");
      for (var prop in inline_css_obj[selector]) {
        var val = inline_css_obj[selector][prop];
        //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
        inline_css += "".concat(prop, ": ").concat(wp.customize(val).get(), ";");
      }
      inline_css += "}";
    }
    console.log(inline_css);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#_themename-stylesheet-inline-css').html(inline_css);
  });
});
wp.customize('_themename_text_link_colour', function (value) {
  value.bind(function (to) {
    var inline_css = "";
    var inline_css_obj = _themename['inline-css'];
    for (var selector in inline_css_obj) {
      inline_css += "".concat(selector, " {");
      for (var prop in inline_css_obj[selector]) {
        var val = inline_css_obj[selector][prop];
        //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
        inline_css += "".concat(prop, ": ").concat(wp.customize(val).get(), ";");
      }
      inline_css += "}";
    }
    console.log(inline_css);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#_themename-stylesheet-inline-css').html(inline_css);
  });
});
wp.customize('_themename_header_coulour', function (value) {
  value.bind(function (to) {
    var inline_css = "";
    var inline_css_obj = _themename['inline-css'];
    for (var selector in inline_css_obj) {
      inline_css += "".concat(selector, " {");
      for (var prop in inline_css_obj[selector]) {
        var val = inline_css_obj[selector][prop];
        //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
        inline_css += "".concat(prop, ": ").concat(wp.customize(val).get(), ";");
      }
      inline_css += "}";
    }
    console.log(inline_css);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#_themename-stylesheet-inline-css').html(inline_css);
  });
});
wp.customize('_themename_site_info', function (value) {
  value.bind(function (to) {
    jquery__WEBPACK_IMPORTED_MODULE_0__('.jp-site-info__text').html((0,_helpers_strip_tags_js__WEBPACK_IMPORTED_MODULE_1__["default"])(to, '<a>'));
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0MsRUFBRSxFQUFLO0lBQ2YsSUFBSUksVUFBVSxLQUFLO0lBQ25CLElBQUlDLGNBQWMsR0FBR0MsVUFBVSxDQUFDLFlBQVksQ0FBQztJQUM3QyxLQUFJLElBQUlDLFFBQVEsSUFBSUYsY0FBYyxFQUFDO01BQy9CRCxVQUFVLE9BQUFJLE1BQUEsQ0FBT0QsUUFBUSxPQUFJO01BQzdCLEtBQUksSUFBSUUsSUFBSSxJQUFJSixjQUFjLENBQUNFLFFBQVEsQ0FBQyxFQUFDO1FBQ3JDLElBQUlHLEdBQUcsR0FBR0wsY0FBYyxDQUFDRSxRQUFRLENBQUMsQ0FBQ0UsSUFBSSxDQUFDO1FBQ3hDO1FBQ0FMLFVBQVUsT0FBQUksTUFBQSxDQUFPQyxJQUFJLFFBQUFELE1BQUEsQ0FBS1osRUFBRSxDQUFDQyxTQUFTLENBQUNhLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQyxNQUFHO01BQ3hEO01BQ0FQLFVBQVUsT0FBTztJQUNyQjtJQUNBUSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1QsVUFBVSxDQUFDO0lBQ3ZCVixtQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLENBQUNPLElBQUksQ0FBQ0csVUFBVSxDQUFDO0VBQzNELENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGUixFQUFFLENBQUNDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxVQUFDQyxLQUFLLEVBQUk7RUFDM0NBLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLFVBQUNDLEVBQUUsRUFBSztJQUNmTixtQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUNPLElBQUksQ0FBQ04sa0VBQVMsQ0FBQ0ssRUFBRSxFQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3RELENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVyb3MvLi9zcmMvYXNzZXRzL2pzL2hlbHBlcnMvc3RyaXAtdGFncy5qcyIsIndlYnBhY2s6Ly9oZXJvcy9leHRlcm5hbCB2YXIgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9oZXJvcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oZXJvcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGVyb3Mvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oZXJvcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hlcm9zLy4vc3JjL2Fzc2V0cy9qcy9jdXN0b21pemUtcHJldmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBzdHJpcF90YWdzID0gKGlucHV0LCBhbGxvd2VkKSA9PiB7XG4gICAgYWxsb3dlZCA9ICgoKGFsbG93ZWQgfHwgJycpICsgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5tYXRjaCgvPFthLXpdW2EtejAtOV0qPi9nKSB8fCBbXSlcbiAgICAgICAgLmpvaW4oJycpOyAvLyBtYWtpbmcgc3VyZSB0aGUgYWxsb3dlZCBhcmcgaXMgYSBzdHJpbmcgY29udGFpbmluZyBvbmx5IHRhZ3MgaW4gbG93ZXJjYXNlICg8YT48Yj48Yz4pXG4gICAgbGV0IHRhZ3MgPSAvPFxcLz8oW2Etel1bYS16MC05XSopXFxiW14+XSo+L2dpLFxuICAgICAgICBjb21tZW50c0FuZFBocFRhZ3MgPSAvPCEtLVtcXHNcXFNdKj8tLT58PFxcPyg/OnBocCk/W1xcc1xcU10qP1xcPz4vZ2k7XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoY29tbWVudHNBbmRQaHBUYWdzLCAnJylcbiAgICAgICAgLnJlcGxhY2UodGFncywgZnVuY3Rpb24oJDAsICQxKSB7XG4gICAgICAgICAgICByZXR1cm4gYWxsb3dlZC5pbmRleE9mKCc8JyArICQxLnRvTG93ZXJDYXNlKCkgKyAnPicpID4gLTEgPyAkMCA6ICcnO1xuICAgICAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaXBfdGFncztcbiIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBzdHJpcFRhZ3MgZnJvbSBcIi4vaGVscGVycy9zdHJpcC10YWdzLmpzXCI7XG5cbiAgICB3cC5jdXN0b21pemUoJ2Jsb2duYW1lJywgKHZhbHVlKT0+IHtcbiAgICAgICAgdmFsdWUuYmluZCgodG8pID0+IHtcbiAgICAgICAgICAgICQoJy5qcC1zaXRlLWJyYW5kX19uYW1lJykuaHRtbChzdHJpcFRhZ3ModG8pKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3cC5jdXN0b21pemUoJ190aGVtZW5hbWVfZGlzcGxheV9hdXRob3JfaW5mbycsICh2YWx1ZSk9PiB7XG4gICAgICAgIHZhbHVlLmJpbmQoKHRvKSA9PiB7XG4gICAgICAgICAgICBpZih0bykge1xuICAgICAgICAgICAgICAgICQoJy5qLXBvc3QtYXV0aG9yJykuc2hvdygpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICQoJy5qLXBvc3QtYXV0aG9yJykuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHdwLmN1c3RvbWl6ZSgnX3RoZW1lbmFtZV9hY2NlbnRfY29sb3VyJywgKHZhbHVlKT0+IHtcbiAgICAgICAgdmFsdWUuYmluZCgodG8pID0+IHtcbiAgICAgICAgICAgIGxldCBpbmxpbmVfY3NzID0gYGA7XG4gICAgICAgICAgICBsZXQgaW5saW5lX2Nzc19vYmogPSBfdGhlbWVuYW1lWydpbmxpbmUtY3NzJ107XG4gICAgICAgICAgICBmb3IobGV0IHNlbGVjdG9yIGluIGlubGluZV9jc3Nfb2JqKXtcbiAgICAgICAgICAgICAgICBpbmxpbmVfY3NzICs9IGAke3NlbGVjdG9yfSB7YDtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBwcm9wIGluIGlubGluZV9jc3Nfb2JqW3NlbGVjdG9yXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gaW5saW5lX2Nzc19vYmpbc2VsZWN0b3JdW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93cC5jdXN0b21pemUodmFsWzBdKS5nZXQoKX0ke3ZhbC5sZW5ndGggPT09IDIgPyBgJHt2YWxbMV19O2AgOiAnOydcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubGluZV9jc3MgKz0gYCR7cHJvcH06ICR7d3AuY3VzdG9taXplKHZhbCkuZ2V0KCl9O2A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmxpbmVfY3NzICs9IGB9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubGluZV9jc3MpO1xuICAgICAgICAgICAgJCgnI190aGVtZW5hbWUtc3R5bGVzaGVldC1pbmxpbmUtY3NzJykuaHRtbChpbmxpbmVfY3NzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3cC5jdXN0b21pemUoJ190aGVtZW5hbWVfdGV4dF9saW5rX2NvbG91cicsICh2YWx1ZSk9PiB7XG4gICAgICAgIHZhbHVlLmJpbmQoKHRvKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5saW5lX2NzcyA9IGBgO1xuICAgICAgICAgICAgbGV0IGlubGluZV9jc3Nfb2JqID0gX3RoZW1lbmFtZVsnaW5saW5lLWNzcyddO1xuICAgICAgICAgICAgZm9yKGxldCBzZWxlY3RvciBpbiBpbmxpbmVfY3NzX29iail7XG4gICAgICAgICAgICAgICAgaW5saW5lX2NzcyArPSBgJHtzZWxlY3Rvcn0ge2A7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwcm9wIGluIGlubGluZV9jc3Nfb2JqW3NlbGVjdG9yXSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBpbmxpbmVfY3NzX29ialtzZWxlY3Rvcl1bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIC8vd3AuY3VzdG9taXplKHZhbFswXSkuZ2V0KCl9JHt2YWwubGVuZ3RoID09PSAyID8gYCR7dmFsWzFdfTtgIDogJzsnXG4gICAgICAgICAgICAgICAgICAgIGlubGluZV9jc3MgKz0gYCR7cHJvcH06ICR7d3AuY3VzdG9taXplKHZhbCkuZ2V0KCl9O2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlubGluZV9jc3MgKz0gYH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5saW5lX2Nzcyk7XG4gICAgICAgICAgICAkKCcjX3RoZW1lbmFtZS1zdHlsZXNoZWV0LWlubGluZS1jc3MnKS5odG1sKGlubGluZV9jc3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHdwLmN1c3RvbWl6ZSgnX3RoZW1lbmFtZV9oZWFkZXJfY291bG91cicsICh2YWx1ZSk9PiB7XG4gICAgICAgIHZhbHVlLmJpbmQoKHRvKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5saW5lX2NzcyA9IGBgO1xuICAgICAgICAgICAgbGV0IGlubGluZV9jc3Nfb2JqID0gX3RoZW1lbmFtZVsnaW5saW5lLWNzcyddO1xuICAgICAgICAgICAgZm9yKGxldCBzZWxlY3RvciBpbiBpbmxpbmVfY3NzX29iail7XG4gICAgICAgICAgICAgICAgaW5saW5lX2NzcyArPSBgJHtzZWxlY3Rvcn0ge2A7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwcm9wIGluIGlubGluZV9jc3Nfb2JqW3NlbGVjdG9yXSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSBpbmxpbmVfY3NzX29ialtzZWxlY3Rvcl1bcHJvcF07XG4gICAgICAgICAgICAgICAgICAgIC8vd3AuY3VzdG9taXplKHZhbFswXSkuZ2V0KCl9JHt2YWwubGVuZ3RoID09PSAyID8gYCR7dmFsWzFdfTtgIDogJzsnXG4gICAgICAgICAgICAgICAgICAgIGlubGluZV9jc3MgKz0gYCR7cHJvcH06ICR7d3AuY3VzdG9taXplKHZhbCkuZ2V0KCl9O2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlubGluZV9jc3MgKz0gYH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5saW5lX2Nzcyk7XG4gICAgICAgICAgICAkKCcjX3RoZW1lbmFtZS1zdHlsZXNoZWV0LWlubGluZS1jc3MnKS5odG1sKGlubGluZV9jc3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHdwLmN1c3RvbWl6ZSgnX3RoZW1lbmFtZV9zaXRlX2luZm8nLCAodmFsdWUpPT4ge1xuICAgICAgICB2YWx1ZS5iaW5kKCh0bykgPT4ge1xuICAgICAgICAgICAgJCgnLmpwLXNpdGUtaW5mb19fdGV4dCcpLmh0bWwoc3RyaXBUYWdzKHRvLCc8YT4nKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuIl0sIm5hbWVzIjpbInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiam9pbiIsInRhZ3MiLCJjb21tZW50c0FuZFBocFRhZ3MiLCJyZXBsYWNlIiwiJDAiLCIkMSIsImluZGV4T2YiLCIkIiwic3RyaXBUYWdzIiwid3AiLCJjdXN0b21pemUiLCJ2YWx1ZSIsImJpbmQiLCJ0byIsImh0bWwiLCJzaG93IiwiaGlkZSIsImlubGluZV9jc3MiLCJpbmxpbmVfY3NzX29iaiIsIl90aGVtZW5hbWUiLCJzZWxlY3RvciIsImNvbmNhdCIsInByb3AiLCJ2YWwiLCJnZXQiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==