var User             = require('../app/models/user.js'),
    Pet              = require('../app/models/pet.js'),
    Vaccine          = require('../app/models/vaccine.js'),
    Pet_Vaccine      = require('../app/models/pet_vaccine.js'),
    PdfRecord        = require('../app/models/pdfRecord.js'),
    ContactHistory   = require('../app/models/contactHistory.js'),
    Request          = require('../app/models/request.js'),
    VetContact       = require('../app/models/vetContact.js'),
    Q                = require('q'),
    Utils            = require('../app/utils.js');


var deletePetVaccine = Utils.deleter(Pet_Vaccine, {id: 'vaccineid'});

var deleteLog = Utils.deleter(ContactHistory, {id: 'logid'});

var deletePdf = Utils.deleter(PdfRecord, {id: 'pdfid'});

var deleteVetContact = Utils.deleter(VetContact, {id: 'vetcontactid'});

module.exports = exports = {
  deletePetVaccine: deletePetVaccine,
  deleteLog: deleteLog,
  deletePdf: deletePdf,
  deleteVetContact: deleteVetContact
};
