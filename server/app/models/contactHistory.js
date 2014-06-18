var db = require('../db_config.js');
var Request = require('./request.js');
var Admin = require('./admin.js');
var Vet_Contact = require('./vet_contact.js');

var ContactHistory = db.Model.extend({
  tableName: 'contactHistory',
  hasTimestamps: true,
  request: function() {
    return this.hasOne(Request);
  },
  admin: function() {
    return this.hasOne(Admin);
  },
  vet_contact: function() {
    return this.hasOne(Vet_Contact);
  }
});

module.exports = ContactHistory;
