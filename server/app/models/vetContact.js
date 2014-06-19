var db = require('../db_config.js');
require('./vet.js');
require('./contactHistory.js');

var VetContact = db.Model.extend({
  tableName: 'vetContact',
  hasTimestamps: true,
  vet: function() {
    return this.belongsTo('Vet');
  },
  contactHistory: function() {
    return this.hasMany('ContactHistory');
  }
});

module.exports = exports = db.model('VetContact', VetContact);
