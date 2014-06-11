"use strict";

var db = require('../main/app.js').get('db');
var user = require('./extra_collection.js')

var Users = new db.Collection();

Users.model = User;

module.exports = Users;
