var db = require('../db_config.js');
require('./request.js');

var PdfRecord = db.Model.extend({
  tableName: 'pdfRecord',
  hasTimestamps: true,
  request: function() {
    return this.belongsTo('Request');
  }
});

module.exports = exports = db.model('PdfRecord', PdfRecord);
