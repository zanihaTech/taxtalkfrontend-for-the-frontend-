"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlers = void 0;

var _msw = require("msw");

// src/mocks/handlers.js
// Define your mock handlers here
var handlers = [_msw.rest.get('https://example.com/api/posts', function (req, res, ctx) {
  return res(ctx.status(200), ctx.json({
    posts: [{
      id: 1,
      title: 'Sample Post 1',
      content: 'Content for post 1'
    }, {
      id: 2,
      title: 'Sample Post 2',
      content: 'Content for post 2'
    }]
  }));
}) // Add more handlers as needed (POST, PUT, DELETE, etc.)
];
exports.handlers = handlers;
//# sourceMappingURL=handlers.dev.js.map
