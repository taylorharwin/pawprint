var db = require('../db_config.js');
var Pet = require('./pet.js');
var Request = require('./request.js');
var PetUser = require('./petuser.js')

var User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  pet: function() {
    return this.belongsToMany(Pet, 'user_pet', 'pet_id', 'user_id');
  }
});

module.exports = User;
