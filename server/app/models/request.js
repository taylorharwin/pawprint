var db = require('../db_config.js');
var Pet = require('./pet.js');
var User = require('./user.js');
var Vet = require('./vet.js');
var Pet_Vaccine = require('./pet_vaccine.js');

var Request = db.Model.extend({
  tableName: 'request',
  hasTimestamps: true,
  pet: function() {
    return this.belongsTo(Pet);
  },
  user: function() {
    return this.belongsTo(User);
  },
  vet: function() {
    return this.belongsTo(Vet);
  },
  pet_vaccine: function() {
    return this.hasMany(Pet_Vaccine);
  }
});

module.exports = Request;
