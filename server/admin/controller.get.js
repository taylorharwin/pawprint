var db                = require('../app/db_config.js'),
    ContactHistory    = require('../app/models/contactHistory.js'),
    ContactHistorys   = require('../app/collections/contactHistorys.js'),
    PdfRecord         = require('../app/models/pdfRecord.js'),
    PdfRecords        = require('../app/collections/pdfRecords.js'),
    User              = require('../app/models/user.js'),
    Users             = require('../app/collections/users.js'),
    Pet               = require('../app/models/pet.js'),
    Pets              = require('../app/collections/pets.js'),
    Request           = require('../app/models/request.js'),
    Requests          = require('../app/collections/requests.js'),
    Vet               = require('../app/models/vet.js'),
    Vets              = require('../app/collections/vets.js'),
    Pet_Vaccine       = require('../app/models/pet_vaccine.js'),
    Pet_Vaccines      = require('../app/collections/pet_vaccines.js'),
    VetContact        = require('../app/models/vetContact.js'),
    VetContacts       = require('../app/collections/vetContacts.js'),
    Vaccine           = require('../app/models/vaccine.js'),
    Vaccines          = require('../app/collections/vaccines.js'),
    Q                 = require('q');

var getter = function (req, res, Model, options) {
  // Options is an object with 3 parameters
    // all: a boolean value for fetchALL or just fetch, defaults to fetch
    // query: an object for query parameters to pass into fetch
    // omit: a string or array of strings of parameters
    //       that should be omitted from the returned model
  var model = new Model(options.query);

  if (options.all) {
    model.fetchAll().then(function(requests) {
      // TODO omit for collections
      res.send(200, requests);
    });
  } else {
    model.fetch().then(function(requests) {
      res.send(200, requests.omit(options.omit));
    });
  }

};

var getRequests = function(req, res) {
  getter(req, res, Request, { all: true });
};

var getRequest = function(req, res) {
  getter(req, res, Request, {
    query: { id: req.params.requestid}
  });
};

var getPet = function(req, res) {
  getter(req, res, Pet, {
    query: { id: req.params.petid }
  });
};

var getUser = function(req, res) {
  getter(req, res, User, {
    query: { id: req.params.userid },
    omit: ['password', 'salt']
  });
};

var getVet = function(req, res) {
  getter(req, res, Vet, {
    query: { id: req.params.vetid }
  });
};

var getVetContacts = function(req, res) {
  getter(req, res, VetContact, {
    query: { vet_id: req.params.vetid },
    all: true
  });
};

var getPetVaccines = function(req, res) {
  getter(req, res, Pet_Vaccine, {
    query: { id: req.params.requestid },
    all: true
  });
};

var getLogs = function(req, res) {
  getter(req, res, ContactHistory, {
    query: { request_id: req.params.requestid },
    all: true
  });
};

var getPDFs = function(req, res) {
  getter(req, res, PdfRecord, {
    query: { request_id: req.params.requestid },
    all: true
  });
};

var getVaccines = function(req, res) {
  getter(req, res, Vaccine, {
    all: true
  });
};

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
