"use strict";

var Extra = require('./extra_model.js'),
    Q    = require('q');

module.exports = exports = {
  get: function (req, res, next) {
    res.send(200, 'Hello World');
  },

  post: function (req, res, next) {

  }
};
