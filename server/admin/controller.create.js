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

/************DOCS****************/
// _creator returns a function that makes POST request with the req.body extended by any params passed in
// params is an object with properties for each property the model should be extended with
  // Example: 
    // var createLog = function(req, res) {
    //   var newLog = req.body;
    //   newLog.admin_id = req.params.adminid;
    //   newLog.request_id = req.params.requestid;
    //   ContactHistory.forge(newLog).save().then(function(model) {
    //     res.send(201, model);
    //   });
    // };

    // becomes

    // var createLog = function(req, res) {
    //   creator(req, res, ContactHistory, {
    //     admin_id: req.params.adminid,
    //     request_id: req.params.requestid
    //   });
    // }; 
var _creator = function(Model, params) {
  return function (req, res) {
    var newObj = req.body;
    for (var property in params) {
      newObj[property] = req.params[params[property]];
    }

    Model.forge(newObj).save().then(function(model) {
      res.send(201, model);
    }).catch(function(err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  };
};

// createPetVaccine
var createPetVaccine = function(req, res) {
  var requestid = req.params.requestid;
  var vaccines = req.body;

  // search for the request with the desired request id
  Request.forge({id: requestid}).fetch()
    .then(function(request){
      var PetVaccines = db.Collection.extend({model: Pet_Vaccine});
      return PetVaccines.forge(vaccines).mapThen(function(model){
        model.set({
          request_id: req.params.requestid,
          pet_id: request.attributes.pet_id
          // TODO set date of expiration
        });
        return model.save();
      });
    }).then(function(collection) {
      res.send(201, collection);
    });
};

var createVaccine = _creator(Vaccine);

var createLog = _creator(ContactHistory, {
  admin_id: 'adminid',
  request_id: 'requestid'
});

var createVetContact = _creator(VetContact, {
  vet_id: 'vetid'
});

var createPdf = function(req, res) {
  // TODO, this will be a multi-part form request
};

module.exports = exports = {
  createPetVaccine : createPetVaccine,
  createVaccine : createVaccine,
  createLog : createLog,
  createVetContact : createVetContact,
  createPdf : createPdf
};
