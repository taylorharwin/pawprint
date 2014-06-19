var db = require('../db_config.js');

var ContactHistory = require('../models/contactHistory.js');

var ContactHistorys = new db.Collection();

ContactHistorys.model = ContactHistory;

module.exports = exports = ContactHistorys;
