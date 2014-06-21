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

var createVaccine = function(req, res) {
  var newVaccine = req.body;

  Vaccine.forge(newVaccine).save().then(function(model) {
    res.send(201, model);
  });
};

var createLog = function(req, res) {
  var newLog = req.body;
  newLog.admin_id = req.params.adminid;
  newLog.request_id = req.params.requestid;

  ContactHistory.forge(newLog).save().then(function(model) {
    res.send(201, model);
  });
};

var createVetContact = function(req, res) {
  var newContact = req.body;
  newContact.vet_id = req.params.vetid;

  VetContact.forge(newContact).save().then(function(model) {
    res.send(201, model);
  });
};

var createPdf = function(req, res) {
  var adminid = req.params.adminid;
  var requestid = req.params.requestid;
  var pdf = req.body;
  pdf.request_id = requestid;

  PdfRecord.forge(pdf).save().then(function(pdfrecord) {
    PdfRecords.add(pdfrecord);
    res.send(201, {id: pdfrecord.id});
  });
};

module.exports = exports = {
  createPetVaccine : createPetVaccine,
  createVaccine : createVaccine,
  createLog : createLog,
  createVetContact : createVetContact,
  createPdf : createPdf
};
