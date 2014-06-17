var db = require('../db_config.js');
var Pet = require('./pet.js');
var Request = require('./request.js');

var User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  pet: function() {
    return this.belongsToMany(Pet, 'user_pet', 'user_id', 'pet_id');
  }
});

module.exports = User;
