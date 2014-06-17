var db = require('../db_config.js');
var Pet = require('./pet.js');
var Request = require('./request.js');
var Vet = require(',/vet.js');

var User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  pet: function() {
    return this.belongsToMany(Pet, 'user_pet', 'user_id', 'pet_id');
  },
  request: function() {
    return this.hasMany(Request);
  },
  vet: function() {
    return this.belongsTo(Vet);
  }
});

module.exports = User;
