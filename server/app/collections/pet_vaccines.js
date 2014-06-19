var db = require('../db_config.js');

var Pet_Vaccine = require('../models/pet_vaccine.js');

var Pet_Vaccines = new db.Collection();

Pet_Vaccines.model = Pet_Vaccine;

module.exports = exports = Pet_Vaccines;
