var db = require('../db_config.js');

var VetContact = require('../models/vetContact.js');

var VetContacts = new db.Collection();

VetContacts.model = VetContact;

module.exports = exports = VetContacts;
