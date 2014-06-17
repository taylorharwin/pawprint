var db = require('../db_config.js');

var Admin = require('../models/admin.js');

var Admins = new db.Collection();

Admins.model = Admin;

module.exports = Admins;
