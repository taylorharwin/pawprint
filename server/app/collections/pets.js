var db = require('../db_config.js');

var Pet = require('../models/pet.js');

var Pets = new db.Collection();

Pets.model = Pet;

module.exports = Pets;
