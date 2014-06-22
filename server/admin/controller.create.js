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

var createVaccine = Utils.creator(Vaccine);

var createLog = Utils.creator(ContactHistory, {
  admin_id: 'adminid',
  request_id: 'requestid'
});

var createVetContact = Utils.creator(VetContact, {
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
