"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.worker = void 0;

var _msw = require("msw");

var _handlers = require("./handlers");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Set up the mock service worker with the handlers
var worker = _msw.setupWorker.apply(void 0, _toConsumableArray(_handlers.handlers));

exports.worker = worker;
//# sourceMappingURL=browser.dev.js.map
