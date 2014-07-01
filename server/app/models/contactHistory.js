var db = require('../db_config.js');
require('./request.js');
require('./user.js');
require('./vetContact.js');

var ContactHistory = db.Model.extend({
  tableName: 'contactHistory',
  hasTimestamps: true,
  request: function () {
    return this.belongsTo('Request');
  },
  adminUser: function () {
    return this.belongsTo('User'); // user table but is an admin
  },
  vet_contact: function () {
    return this.belongsTo('Vet_Contact');
  }
});

module.exports = exports = db.model('ContactHistory', ContactHistory);
