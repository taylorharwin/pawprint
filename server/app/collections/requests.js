var db = require('../db_config.js');

var Request = require('../models/request.js');

var Requests = new db.Collection();

Requests.model = Request;

module.exports = exports = Requests;
