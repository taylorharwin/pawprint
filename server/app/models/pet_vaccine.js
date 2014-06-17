var db = require('../db_config.js');
var Pet = require('./pet.js');
var Vaccine = require('./vaccine.js');
var Request = require('./request.js');

var Pet = db.Model.extend({
  tableName: 'pet_vaccine',
  hasTimestamps: true,
  request: function() { 
    return this.belongsTo(Request);
  },
  pet: function() {
    return this.belongsTo(Pet);
  },
  vaccine: function() {
    return this.belongsTo(Vaccine);
  }
});

module.exports = Pet;
