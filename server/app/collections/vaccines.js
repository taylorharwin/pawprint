var db = require('../db_config.js');

var Vaccine = require('../models/vaccine.js');

var Vaccines = new db.Collection();

Vaccines.model = Vaccine;

module.exports = Vaccines;
