var db = require('../db_config.js');
require('./request.js');
require('./admin.js');
require('./vetContact.js');

var ContactHistory = db.Model.extend({
  tableName: 'contactHistory',
  hasTimestamps: true,
  request: function() {
    return this.belongsTo('Request');
  },
  admin: function() {
    return this.belongsTo('Admin');
  },
  vet_contact: function() {
    return this.belongsTo('Vet_Contact');
  }
});

module.exports = exports = db.model('ContactHistory', ContactHistory);
