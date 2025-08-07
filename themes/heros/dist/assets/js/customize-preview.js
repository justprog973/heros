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
const strip_tags = (input, allowed) => {
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
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


wp.customize('blogname', value => {
  value.bind(to => {
    jquery__WEBPACK_IMPORTED_MODULE_0__('.jp-site-brand__name').html((0,_helpers_strip_tags_js__WEBPACK_IMPORTED_MODULE_1__["default"])(to));
  });
});
wp.customize('_themename_display_author_info', value => {
  value.bind(to => {
    if (to) {
      jquery__WEBPACK_IMPORTED_MODULE_0__('.j-post-author').show();
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0__('.j-post-author').hide();
    }
  });
});
wp.customize('_themename_accent_colour', value => {
  value.bind(to => {
    let inline_css = ``;
    let inline_css_obj = _themename['inline-css'];
    for (let selector in inline_css_obj) {
      inline_css += `${selector} {`;
      for (let prop in inline_css_obj[selector]) {
        let val = inline_css_obj[selector][prop];
        //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
        inline_css += `${prop}: ${wp.customize(val).get()};`;
      }
      inline_css += `}`;
    }
    console.log(inline_css);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#_themename-stylesheet-inline-css').html(inline_css);
  });
});
wp.customize('_themename_text_link_colour', value => {
  value.bind(to => {
    let inline_css = ``;
    let inline_css_obj = _themename['inline-css'];
    for (let selector in inline_css_obj) {
      inline_css += `${selector} {`;
      for (let prop in inline_css_obj[selector]) {
        let val = inline_css_obj[selector][prop];
        //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
        inline_css += `${prop}: ${wp.customize(val).get()};`;
      }
      inline_css += `}`;
    }
    console.log(inline_css);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#_themename-stylesheet-inline-css').html(inline_css);
  });
});
wp.customize('_themename_header_coulour', value => {
  value.bind(to => {
    let inline_css = ``;
    let inline_css_obj = _themename['inline-css'];
    for (let selector in inline_css_obj) {
      inline_css += `${selector} {`;
      for (let prop in inline_css_obj[selector]) {
        let val = inline_css_obj[selector][prop];
        //wp.customize(val[0]).get()}${val.length === 2 ? `${val[1]};` : ';'
        inline_css += `${prop}: ${wp.customize(val).get()};`;
      }
      inline_css += `}`;
    }
    console.log(inline_css);
    jquery__WEBPACK_IMPORTED_MODULE_0__('#_themename-stylesheet-inline-css').html(inline_css);
  });
});
wp.customize('_themename_site_info', value => {
  value.bind(to => {
    jquery__WEBPACK_IMPORTED_MODULE_0__('.jp-site-info__text').html((0,_helpers_strip_tags_js__WEBPACK_IMPORTED_MODULE_1__["default"])(to, '<a>'));
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUksSUFBSUMsUUFBUSxJQUFJRixjQUFjLEVBQUM7TUFDL0JELFVBQVUsSUFBSSxHQUFHRyxRQUFRLElBQUk7TUFDN0IsS0FBSSxJQUFJQyxJQUFJLElBQUlILGNBQWMsQ0FBQ0UsUUFBUSxDQUFDLEVBQUM7UUFDckMsSUFBSUUsR0FBRyxHQUFHSixjQUFjLENBQUNFLFFBQVEsQ0FBQyxDQUFDQyxJQUFJLENBQUM7UUFDeEM7UUFDQUosVUFBVSxJQUFJLEdBQUdJLElBQUksS0FBS1osRUFBRSxDQUFDQyxTQUFTLENBQUNZLEdBQUcsQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQyxHQUFHO01BQ3hEO01BQ0FOLFVBQVUsSUFBSSxHQUFHO0lBQ3JCO0lBQ0FPLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUixVQUFVLENBQUM7SUFDdkJWLG1DQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQ08sSUFBSSxDQUFDRyxVQUFVLENBQUM7RUFDM0QsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUZSLEVBQUUsQ0FBQ0MsU0FBUyxDQUFDLHNCQUFzQixFQUFHQyxLQUFLLElBQUk7RUFDM0NBLEtBQUssQ0FBQ0MsSUFBSSxDQUFFQyxFQUFFLElBQUs7SUFDZk4sbUNBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDTyxJQUFJLENBQUNOLGtFQUFTLENBQUNLLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQztFQUN0RCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hlcm9zLy4vc3JjL2Fzc2V0cy9qcy9oZWxwZXJzL3N0cmlwLXRhZ3MuanMiLCJ3ZWJwYWNrOi8vaGVyb3MvZXh0ZXJuYWwgdmFyIFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vaGVyb3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGVyb3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2hlcm9zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGVyb3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZXJvcy8uL3NyYy9hc3NldHMvanMvY3VzdG9taXplLXByZXZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3RyaXBfdGFncyA9IChpbnB1dCwgYWxsb3dlZCkgPT4ge1xuICAgIGFsbG93ZWQgPSAoKChhbGxvd2VkIHx8ICcnKSArICcnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAubWF0Y2goLzxbYS16XVthLXowLTldKj4vZykgfHwgW10pXG4gICAgICAgIC5qb2luKCcnKTsgLy8gbWFraW5nIHN1cmUgdGhlIGFsbG93ZWQgYXJnIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgb25seSB0YWdzIGluIGxvd2VyY2FzZSAoPGE+PGI+PGM+KVxuICAgIGxldCB0YWdzID0gLzxcXC8/KFthLXpdW2EtejAtOV0qKVxcYltePl0qPi9naSxcbiAgICAgICAgY29tbWVudHNBbmRQaHBUYWdzID0gLzwhLS1bXFxzXFxTXSo/LS0+fDxcXD8oPzpwaHApP1tcXHNcXFNdKj9cXD8+L2dpO1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKGNvbW1lbnRzQW5kUGhwVGFncywgJycpXG4gICAgICAgIC5yZXBsYWNlKHRhZ3MsIGZ1bmN0aW9uKCQwLCAkMSkge1xuICAgICAgICAgICAgcmV0dXJuIGFsbG93ZWQuaW5kZXhPZignPCcgKyAkMS50b0xvd2VyQ2FzZSgpICsgJz4nKSA+IC0xID8gJDAgOiAnJztcbiAgICAgICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmlwX3RhZ3M7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgc3RyaXBUYWdzIGZyb20gXCIuL2hlbHBlcnMvc3RyaXAtdGFncy5qc1wiO1xuXG4gICAgd3AuY3VzdG9taXplKCdibG9nbmFtZScsICh2YWx1ZSk9PiB7XG4gICAgICAgIHZhbHVlLmJpbmQoKHRvKSA9PiB7XG4gICAgICAgICAgICAkKCcuanAtc2l0ZS1icmFuZF9fbmFtZScpLmh0bWwoc3RyaXBUYWdzKHRvKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgd3AuY3VzdG9taXplKCdfdGhlbWVuYW1lX2Rpc3BsYXlfYXV0aG9yX2luZm8nLCAodmFsdWUpPT4ge1xuICAgICAgICB2YWx1ZS5iaW5kKCh0bykgPT4ge1xuICAgICAgICAgICAgaWYodG8pIHtcbiAgICAgICAgICAgICAgICAkKCcuai1wb3N0LWF1dGhvcicpLnNob3coKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuai1wb3N0LWF1dGhvcicpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3cC5jdXN0b21pemUoJ190aGVtZW5hbWVfYWNjZW50X2NvbG91cicsICh2YWx1ZSk9PiB7XG4gICAgICAgIHZhbHVlLmJpbmQoKHRvKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5saW5lX2NzcyA9IGBgO1xuICAgICAgICAgICAgbGV0IGlubGluZV9jc3Nfb2JqID0gX3RoZW1lbmFtZVsnaW5saW5lLWNzcyddO1xuICAgICAgICAgICAgZm9yKGxldCBzZWxlY3RvciBpbiBpbmxpbmVfY3NzX29iail7XG4gICAgICAgICAgICAgICAgaW5saW5lX2NzcyArPSBgJHtzZWxlY3Rvcn0ge2A7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgcHJvcCBpbiBpbmxpbmVfY3NzX29ialtzZWxlY3Rvcl0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IGlubGluZV9jc3Nfb2JqW3NlbGVjdG9yXVtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd3AuY3VzdG9taXplKHZhbFswXSkuZ2V0KCl9JHt2YWwubGVuZ3RoID09PSAyID8gYCR7dmFsWzFdfTtgIDogJzsnXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVfY3NzICs9IGAke3Byb3B9OiAke3dwLmN1c3RvbWl6ZSh2YWwpLmdldCgpfTtgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5saW5lX2NzcyArPSBgfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmxpbmVfY3NzKTtcbiAgICAgICAgICAgICQoJyNfdGhlbWVuYW1lLXN0eWxlc2hlZXQtaW5saW5lLWNzcycpLmh0bWwoaW5saW5lX2Nzcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgd3AuY3VzdG9taXplKCdfdGhlbWVuYW1lX3RleHRfbGlua19jb2xvdXInLCAodmFsdWUpPT4ge1xuICAgICAgICB2YWx1ZS5iaW5kKCh0bykgPT4ge1xuICAgICAgICAgICAgbGV0IGlubGluZV9jc3MgPSBgYDtcbiAgICAgICAgICAgIGxldCBpbmxpbmVfY3NzX29iaiA9IF90aGVtZW5hbWVbJ2lubGluZS1jc3MnXTtcbiAgICAgICAgICAgIGZvcihsZXQgc2VsZWN0b3IgaW4gaW5saW5lX2Nzc19vYmope1xuICAgICAgICAgICAgICAgIGlubGluZV9jc3MgKz0gYCR7c2VsZWN0b3J9IHtgO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgcHJvcCBpbiBpbmxpbmVfY3NzX29ialtzZWxlY3Rvcl0pe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gaW5saW5lX2Nzc19vYmpbc2VsZWN0b3JdW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAvL3dwLmN1c3RvbWl6ZSh2YWxbMF0pLmdldCgpfSR7dmFsLmxlbmd0aCA9PT0gMiA/IGAke3ZhbFsxXX07YCA6ICc7J1xuICAgICAgICAgICAgICAgICAgICBpbmxpbmVfY3NzICs9IGAke3Byb3B9OiAke3dwLmN1c3RvbWl6ZSh2YWwpLmdldCgpfTtgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmxpbmVfY3NzICs9IGB9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubGluZV9jc3MpO1xuICAgICAgICAgICAgJCgnI190aGVtZW5hbWUtc3R5bGVzaGVldC1pbmxpbmUtY3NzJykuaHRtbChpbmxpbmVfY3NzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3cC5jdXN0b21pemUoJ190aGVtZW5hbWVfaGVhZGVyX2NvdWxvdXInLCAodmFsdWUpPT4ge1xuICAgICAgICB2YWx1ZS5iaW5kKCh0bykgPT4ge1xuICAgICAgICAgICAgbGV0IGlubGluZV9jc3MgPSBgYDtcbiAgICAgICAgICAgIGxldCBpbmxpbmVfY3NzX29iaiA9IF90aGVtZW5hbWVbJ2lubGluZS1jc3MnXTtcbiAgICAgICAgICAgIGZvcihsZXQgc2VsZWN0b3IgaW4gaW5saW5lX2Nzc19vYmope1xuICAgICAgICAgICAgICAgIGlubGluZV9jc3MgKz0gYCR7c2VsZWN0b3J9IHtgO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgcHJvcCBpbiBpbmxpbmVfY3NzX29ialtzZWxlY3Rvcl0pe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gaW5saW5lX2Nzc19vYmpbc2VsZWN0b3JdW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAvL3dwLmN1c3RvbWl6ZSh2YWxbMF0pLmdldCgpfSR7dmFsLmxlbmd0aCA9PT0gMiA/IGAke3ZhbFsxXX07YCA6ICc7J1xuICAgICAgICAgICAgICAgICAgICBpbmxpbmVfY3NzICs9IGAke3Byb3B9OiAke3dwLmN1c3RvbWl6ZSh2YWwpLmdldCgpfTtgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmxpbmVfY3NzICs9IGB9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlubGluZV9jc3MpO1xuICAgICAgICAgICAgJCgnI190aGVtZW5hbWUtc3R5bGVzaGVldC1pbmxpbmUtY3NzJykuaHRtbChpbmxpbmVfY3NzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3cC5jdXN0b21pemUoJ190aGVtZW5hbWVfc2l0ZV9pbmZvJywgKHZhbHVlKT0+IHtcbiAgICAgICAgdmFsdWUuYmluZCgodG8pID0+IHtcbiAgICAgICAgICAgICQoJy5qcC1zaXRlLWluZm9fX3RleHQnKS5odG1sKHN0cmlwVGFncyh0bywnPGE+JykpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiJdLCJuYW1lcyI6WyJzdHJpcF90YWdzIiwiaW5wdXQiLCJhbGxvd2VkIiwidG9Mb3dlckNhc2UiLCJtYXRjaCIsImpvaW4iLCJ0YWdzIiwiY29tbWVudHNBbmRQaHBUYWdzIiwicmVwbGFjZSIsIiQwIiwiJDEiLCJpbmRleE9mIiwiJCIsInN0cmlwVGFncyIsIndwIiwiY3VzdG9taXplIiwidmFsdWUiLCJiaW5kIiwidG8iLCJodG1sIiwic2hvdyIsImhpZGUiLCJpbmxpbmVfY3NzIiwiaW5saW5lX2Nzc19vYmoiLCJfdGhlbWVuYW1lIiwic2VsZWN0b3IiLCJwcm9wIiwidmFsIiwiZ2V0IiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=