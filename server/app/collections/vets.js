var db = require('../db_config.js');

var Vet = require('../models/vet.js')

var Vets = new db.Collection();

Vets.model = Vet;

module.exports = Vets;
