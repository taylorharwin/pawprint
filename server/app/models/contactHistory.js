var db = require('../db_config.js');
var Request = require('./request.js');
var Admin = require('./admin.js');

var ContactHistory = db.Model.extend({
  tableName: 'contactHistory',
  hasTimestamps: true,
  request: function() {
    return this.belongsTo(Request);
  },
  admin: function() {
    return this.belongsTo(Admin);
  }
});

module.exports = ContactHistory;
