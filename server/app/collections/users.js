var db = require('../db_config.js');

var User = require('../models/user.js')

var Users = new db.Collection();

Users.model = User;

module.exports = Users;
