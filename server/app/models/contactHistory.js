var db = require('../db_config.js');
var Request = require('./request.js');
var Admin = require('./admin.js');
var Vet_Contact = require('./vet_contact.js');

var ContactHistory = db.Model.extend({
  tableName: 'contactHistory',
  hasTimestamps: true,
  request: function() {
    return this.belongsTo(Request);
  },
  admin: function() {
    return this.belongsTo(Admin);
  },
  vet_contact: function() {
    return this.belongsTo(Vet_Contact);
  }
});

module.exports = ContactHistory;
