var Q = require('Q');
var fs = require('fs');
var nodePath = require('path');

var dirName = nodePath.join(__dirname, 'pdfDir');

// checks filenames for .pdf extension
var filenameRegEx = function(filename) {
  var match = /^(.*\.(?!(pdf)$))?[^.]*$/i;
  return(!match.test(filename));
};

// verifies filesize for uploads
var filesizeCheck = function(bytes) {
  var limit = 3;
  return (bytes/1000000 <= limit);
};

var callbackError = function(err) {
  if (err) throw err;
};

// reads files from one location, writes to a new location, and deletes from old location
var pdfSave = function(fromPath, toPath, cb) {
  if (fromPath) {
    Q.nfcall(fs.readFile, fromPath)
      .then(function(buffer) {
        if (buffer) {
          return Q.nfcall(fs.writeFile, toPath, buffer);
        }
      })
      .then(function() {
        return Q.nfcall(fs.unlink, fromPath);
      })
      .then(function(){
        cb(toPath);
      })
      .fail(callbackError);
  }
};

module.exports = exports = {
  dirName           : dirName,
  filenameRegEx     : filenameRegEx,
  filesizeCheck     : filesizeCheck,
  pdfSave           : pdfSave
};
