var db = require('../db_config.js');

var PdfRecord = require('../models/pdfRecord.js');

var PdfRecords = new db.Collection();

PdfRecords.model = PdfRecord;

module.exports = PdfRecords;
