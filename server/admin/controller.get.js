var db                = require('../app/db_config.js'),
    ContactHistory    = require('../app/models/contactHistory.js'),
    ContactHistorys   = require('../app/collections/contactHistorys.js'),
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
    Q                 = require('q');

var getter = function (req, res, Model, queryParams, options) {
  // Options is an object with 2 parameters
    // all: a boolean value for fetchALL or just fetch, defaults to fetch
    // omit: a string or array of strings of parameters
    //       that should be omitted from the returned model
  var model = new Model();

  (function() {
    if (options.all) {
      return model.fetchAll();
    } else {
      return model.fetch();
    }
  })().then(function(requests) {
    res.send(200, requests.omit(options.omit));
  });
};

var getRequests = function(req, res) {
  new Request().fetchAll()
    .then(function(requests) {
      res.send(200, requests);
    });
};

var getRequest = function(req, res) {
  var requestid = req.params.requestid;

  new Request({id:requestid}).fetch()
    .then(function(request) {
      res.send(200, request);
    });
};

var getPet = function(req, res) {
  var petid = req.params.petid;

  new Pet({id:petid}).fetch()
    .then(function(request) {
      res.send(200, request);
    });
};

var getUser = function(req, res) {
  getter(req, res, User, {id:req.params.userid}, {omit: ['password', 'salt']});
};

var getVet = function(req, res) {
  var vetid = req.params.vetid;

  new Vet({id:vetid}).fetch()
    .then(function(request) {
      res.send(200, request);
    });
};

var getVetContacts = function(req, res) {
  var vetid = req.params.vetid;

};

var getPetVaccines = function(req, res) {
  var requestid = req.params.requestid;

  new Pet_Vaccine().query({where: {request_id: requestid}}).fetchAll()
    .then(function(request) {
      res.send(200, request);
    });
};

var getLogs = function(req, res) {
  var requestid = req.params.requestid;

  new ContactHistory().query({where: {request_id: requestid}}).fetchAll()
    .then(function(request) {
      res.send(200, request);
    });
};

var getPDFs = function(req, res) {
  var requestid = req.params.requestid;

};

var getVaccines = function(req, res) {
  var requestid = req.params.requestid;

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
