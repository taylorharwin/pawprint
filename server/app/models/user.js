var db = require('../db_config.js');
require('./request.js');
require('./vet.js');
require('./pet.js');

var User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  pet: function() {
    return this.belongsToMany('Pet', 'user_pet', 'user_id', 'pet_id');
  },
  request: function() {
    return this.hasMany('Request');
  },
  vet: function() {
    return this.belongsTo('Vet');
  }
});

module.exports = exports = db.model('User', User);
