var db                = require('../app/db_config.js'),
    ContactHistory    = require('../app/models/contactHistory.js'),
    PdfRecord         = require('../app/models/pdfRecord.js'),
    User              = require('../app/models/user.js'),
    Pet               = require('../app/models/pet.js'),
    Request           = require('../app/models/request.js'),
    Vet               = require('../app/models/vet.js'),
    Pet_Vaccine       = require('../app/models/pet_vaccine.js'),
    VetContact        = require('../app/models/vetContact.js'),
    Vaccine           = require('../app/models/vaccine.js'),
    Q                 = require('q'),
    Utils             = require('../app/utils.js');


var getRequests = Utils.getter(Request, {all: true});

var getRequest = Utils.getter(Request, {
  query: { id: 'requestid'}
});

var getPet = Utils.getter(Pet, {
  query: { id: 'petid' }
});

var getUser = Utils.getter(User, {
  query: { id: 'userid' },
  omit: ['password', 'salt']
});

var getVet = Utils.getter(Vet, {
  query: { id: 'vetid' }
});

var getVetContacts = Utils.getter(VetContact, {
  query: { vet_id: 'vetid' },
  all: true
});

var getPetVaccines = Utils.getter(Pet_Vaccine, {
  query: { request_id: 'requestid' },
  all: true
});

var getLogs = Utils.getter(ContactHistory, {
  query: { request_id: 'requestid' },
  all: true
});

var getPDFs = Utils.getter(PdfRecord, {
  query: { request_id: 'requestid' },
  all: true
});

var getVaccines = Utils.getter(Vaccine, {
  all: true
});

module.exports = exports = {
  getRequests : getRequests,
  getRequest : getRequest,
  getPet : getPet,
  getUser : getUser,
  getVet : getVet,
  getVetContacts : getVetContacts,
  getPetVaccines : getPetVaccines,
  getLogs : getLogs,
  getPDFs : getPDFs,
  getVaccines : getVaccines
};
