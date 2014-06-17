var db = require('../db_config.js');
var Request = require('./request.js');
var User = require('./user.js');
var VetContact = require('./vetContact.js');

var Vet = db.Model.extend({
  tableName: 'vet',
  hasTimestamps: true,
  request: function() {
    return this.hasMany(Request);
  },
  user: function() {
    return this.hasMany(User)
  },
  vetContact: function() { 
    return this.hasMany(VetContact);
  }
});

module.exports = Vet;
