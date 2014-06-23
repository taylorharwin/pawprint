var db = require('../db_config.js');
require('./request.js');
require('./vet.js');
require('./pet.js');
require('./user_pet.js');

var User = db.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  defaults: {
    status : 'active'
  },
  pet: function() {
    return this.belongsToMany('Pet').through('User_Pet', 'user_id', 'pet_id');
  },
  user_pet: function() {
    return this.hasMany('User_Pet');
  },
  request: function() {
    return this.hasMany('Request');
  },
  vet: function() {
    return this.belongsTo('Vet');
  }
});

module.exports = exports = db.model('User', User);
