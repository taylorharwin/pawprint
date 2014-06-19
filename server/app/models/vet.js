var db = require('../db_config.js');
require('./request.js');
require('./user.js');
require('./vetContact.js');

var Vet = db.Model.extend({
  tableName: 'vet',
  hasTimestamps: true,
  request: function() {
    return this.hasMany('Request');
  },
  user: function() {
    return this.hasMany('User');
  },
  vetContact: function() {
    return this.hasMany('VetContact');
  }
});

module.exports = exports = db.model('Vet', Vet);
