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
    Q                 = require('q');

/*************DOCS***************/

// _getter makes GET requests with query options and allows you to omit things in the return
// Options is an object with 3 parameters
  // all: a boolean value, set true for all values that match the queries and false for just the first (defaults to false)
  // query: an object for query parameters to pass into fetch
  // omit: a string or array of strings of parameters
  //       that should be omitted from the returned model

// Example:

  // var getUser = function(req, res) {
  //   var getUser = function(req, res) {
  //   var userid = req.params.userid;
  //   
  //   new User({id:userid}).fetch()
  //     .then(function(request) {
  //       res.send(200, request.omit('password', 'salt'));
  //     });
  //    
  //   };
  // };

  // becomes

  // var getUser = _getter(User, {
  //   query: { id: 'userid' },
  //   omit: ['password', 'salt']
  // });

var _getter = function (Model, options) {
  return function(req, res) {
    options = options || {};
    
    // Get parameters from req.params
    var query = options.query || {};
    var params = {};
    for (var property in query) {
      params[property] = req.params[query[property]];
    }
    
    // Query the database 
    var model = new Model().query({where: params});

    // Get all objects that match the query
    model.fetchAll().then(function(collection) {
      // Iterate through the collection to exclude private properties
      return collection.mapThen(function(model) {
        return model.omit(options.omit);
      });
    }).then(function(collection){
      // If all is true, return everything; else return only the first
      var result = !!options.all ? collection : collection[0];
      if (collection.length > 1) {
        // TODO throw some error about only sending the first of many obj
      }
      res.send(200, result);
    }).catch(function(err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  };
};

var getRequests = _getter(Request, {all: true});

var getRequest = _getter(Request, {
  query: { id: 'requestid'}
});

var getPet = _getter(Pet, {
  query: { id: 'petid' }
});

var getUser = _getter(User, {
  query: { id: 'userid' },
  omit: ['password', 'salt']
});

var getVet =_getter(Vet, {
  query: { id: 'vetid' }
});

var getVetContacts = _getter(VetContact, {
  query: { vet_id: 'vetid' },
  all: true
});

var getPetVaccines = _getter(Pet_Vaccine, {
  query: { request_id: 'requestid' },
  all: true
});

var getLogs = _getter(ContactHistory, {
  query: { request_id: 'requestid' },
  all: true
});

var getPDFs = _getter(PdfRecord, {
  query: { request_id: 'requestid' },
  all: true
});

var getVaccines = _getter(Vaccine, {
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
