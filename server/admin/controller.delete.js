var User             = require('../app/models/user.js'),
    Pet              = require('../app/models/pet.js'),
    Vaccine          = require('../app/models/vaccine.js'),
    Pet_Vaccine      = require('../app/models/pet_vaccine.js'),
    PdfRecord        = require('../app/models/pdfRecord.js'),
    ContactHistory   = require('../app/models/contactHistory.js'),
    Request          = require('../app/models/request.js'),
    VetContact       = require('../app/models/vetContact.js'),
    Q                = require('q');


/*************DOCS***************/

// _deleter makes DELETE requests

// Example:


// TODO: validations
var _deleter = function (Model, options) {
  return function(req, res) {
    // TODO
  };
};

var deletePetVaccine

var deleteLog

var deletePdf

var deleteVetContact

module.exports = exports = {
  deletePetVaccine: deletePetVaccine,
  deleteLog: deleteLog,
  deletePdf: deletePdf,
  deleteVetContact: deleteVetContact
};
