/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/properties */ \"./src/properties.js\");\n\nconst express = __webpack_require__(/*! express */ \"express\");\nconst React = __webpack_require__(/*! react */ \"react\");\nconst app = express();\nconst PORT = process.env.PORT || 3001;\napp.use(function (req, res, next) {\n  res.header(\"Access-Control-Allow-Origin\", \"http://localhost:3000\");\n  res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept, Authorization, Operation\");\n  next();\n});\napp.use(express.json());\napp.use(express.urlencoded({\n  extended: true\n}));\napp.get('/', (req, res) => {\n  //console.log('GET req.params: ', req.params)\n  //console.log('GET req.query: ', req.query)\n  const html = \"\\n    <!DOCTYPE html>\\n    <html lang=\\\"en\\\">\\n      <head>\\n        <meta charset=\\\"UTF-8\\\" />\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\" />\\n        <title>App Server</title>\\n      </head>\\n      <body>\\n        <div id=\\\"root\\\">You've reached the Web Server that makes Voltage Fusion API calls</div>\\n      </body>\\n    </html>\";\n  res.send(html);\n});\n\n/**\r\n * GET to handle authenticate request\r\n */\napp.get('/authenticate', (req, res) => {\n  //console.log(\"Performing Authentication...\")\n\n  const url = \"\".concat(_src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_base_url, \"/v1/auth/login\");\n  //console.log('url = ', url)\n\n  const requestOptions = {\n    method: 'POST',\n    headers: {\n      'accept': '*/*',\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      tenantId: _src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_tenant_id,\n      user: _src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_username,\n      password: _src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_password\n    })\n  };\n  //console.log(\"requestOptions = \", requestOptions)\n\n  fetch(url, requestOptions).then(response => response.json()).then(data => {\n    //console.log(\"data.accessToken = \", data.accessToken)\n    res.json(data.accessToken);\n  }).catch(error => console.error(\"Error: \", error));\n});\n\n/**\r\n * GET to handle Voltage Fusion API calls\r\n */\napp.get('/call-fusion-api', (req, res) => {\n  const accessToken = req.header('Authorization');\n  const operation = req.header('Operation');\n  console.log('operation = ', operation);\n  if (operation === 'privacy-metadata') {\n    //console.log('PRIVACY-METADATA')\n\n    const url = \"\".concat(_src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_base_url, \"/research/v1/document/\").concat(_src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.document_id, \"/privacy-metadata?maskData=true\");\n    fetch(url, {\n      \"headers\": {\n        \"accept\": \"application/json, text/plain, */*\",\n        \"authorization\": \"Bearer \".concat(accessToken),\n        \"content-type\": \"application/json\",\n        \"tenant\": _src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_tenant_id\n      },\n      \"body\": \"{}\",\n      \"method\": \"POST\"\n    }).then(response => response.json()).then(data => {\n      //console.log(\"Response data...\\n\", data)\n      res.json(data);\n    }).catch(error => console.error(\"Error: \", error));\n  } else if (operation === 'text-content') {\n    //console.log('TEXT-CONTENT')\n\n    const url = \"\".concat(_src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_base_url, \"/v1/view/preview-text-content\");\n    //console.log('url = ', url)\n\n    fetch(url, {\n      \"headers\": {\n        \"accept\": \"application/octet-stream\",\n        \"authorization\": \"Bearer \".concat(accessToken),\n        \"content-type\": \"application/x-www-form-urlencoded\",\n        \"tenant\": _src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_tenant_id\n      },\n      \"body\": \"docId=\".concat(_src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.document_id, \"&maskData=true&highlightTerms=*\"),\n      \"method\": \"POST\"\n    }).then(response => response.text()).then(data => {\n      //console.log('data = ', data)\n      res.json(data);\n    }).catch(error => console.error(\"Error: \", error));\n  } else if (operation === 'reporting-groups') {\n    //console.log('REPORTING-GROUPS')\n\n    const url = \"\".concat(_src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_base_url, \"/cc/v1/reporting-group?includeCounts=true&indexedOnly=true&structuredDataType=UNSTRUCTURED\");\n    //console.log('url = ', url)\n\n    fetch(url, {\n      \"headers\": {\n        \"accept\": \"application/json, text/plain, */*\",\n        \"authorization\": \"Bearer \".concat(accessToken),\n        \"tenant\": _src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_tenant_id\n      },\n      \"body\": null,\n      \"method\": \"GET\"\n    }).then(response => response.json()).then(data => {\n      //console.log(\"Response data...\\n\", data)\n      res.json(data);\n    }).catch(error => console.error(\"Error: \", error));\n  } else if (operation === 'grammer-analytics') {\n    //console.log('GRAMMAR ENTITIY ANALYTICS')\n\n    const url = \"\".concat(_src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_base_url, \"/analyze/v1/data-analytics/entities?structuredDataType=UNSTRUCTURED\");\n    //console.log('url = ', url)\n\n    fetch(url, {\n      \"headers\": {\n        \"accept\": \"application/json, text/plain, */*\",\n        \"authorization\": \"Bearer \".concat(accessToken),\n        \"tenant\": _src_properties__WEBPACK_IMPORTED_MODULE_0__.properties.voltage_fusion_tenant_id\n      },\n      \"body\": null,\n      \"method\": \"GET\"\n    }).then(response => response.json()).then(data => {\n      //console.log(\"Response data...\\n\", data)\n      res.json(data);\n    }).catch(error => console.error(\"Error: \", error));\n  } else {\n    //console.log('OPERATION NOT SUPPORTED')\n    res.json('Operation Not Supported');\n  }\n});\napp.listen(PORT, () => {\n  console.log(\"Server is listening on port \".concat(PORT));\n});\n\n//# sourceURL=webpack://voltage_fusion_demo/./server/index.js?");

/***/ }),

/***/ "./src/properties.js":
/*!***************************!*\
  !*** ./src/properties.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   properties: () => (/* binding */ properties)\n/* harmony export */ });\nconst properties = {\n  local_server_url: 'http://localhost:3001',\n  voltage_fusion_base_url: 'https://www.demo.microfocusfileanalysis.com:9310',\n  voltage_fusion_tenant_id: 'jensen',\n  voltage_fusion_username: 'smithani@opentext.com',\n  voltage_fusion_password: 'ThinkVision1*',\n  document_id: '1504'\n};\n\n//# sourceURL=webpack://voltage_fusion_demo/./src/properties.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/index.js");
/******/ 	
/******/ })()
;