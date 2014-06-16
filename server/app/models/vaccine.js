var db = require('../db_config.js');
var Request = require('./request.js');
var Pet = require('./pet.js');
var Pet_Vaccine = require('./pet_vaccine.js');

var Vaccine = db.Model.extend({
  tableName: 'vaccine',
  hasTimestamps: true
});

module.exports = Vaccine;
