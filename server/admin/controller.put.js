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

var putLog = Utils.updater(ContactHistory, {id: 'logid'});

var putPetVaccine = Utils.updater(Pet_Vaccine, {id: 'vaccineid'});

var putPdf = Utils.updater(PdfRecord, {id: 'pdfid'});

var putVetContact = Utils.updater(VetContact, {id: 'vetcontactid'});

var putRequest = Utils.updater(Request, {id: 'requestid'});

module.exports = exports = {
  putLog: putLog,
  putPdf: putPdf,
  putPetVaccine: putPetVaccine,
  putVetContact: putVetContact,
  putRequest: putRequest
};
