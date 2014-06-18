var db = require('../db_config.js');
var Request = require('./request.js');
var Pet = require('./pet.js');
var Pet_Vaccine = require('./pet_vaccine.js');

var Vaccine = db.Model.extend({
  tableName: 'vaccine',
  hasTimestamps: true,
  pet_vaccine: function(){
    return this.hasMany(Pet_Vaccine);
  }
});

module.exports = Vaccine;
