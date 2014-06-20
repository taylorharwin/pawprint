var db = require('../app/db_config.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Pet_Vaccine = require('../app/models/pet_vaccine.js'),
    Pet_Vaccines = require('../app/collections/pet_vaccines.js'),
    ContactHistory = require('../app/models/contactHistory.js'),
    ContactHistorys = require('../app/collections/contactHistorys.js'),
    VetContact = require('../app/models/vetContact.js'),
    VetContacts = require('../app/collections/vetContacts.js'),
    PdfRecord = require('../app/models/pdfRecord.js'),
    PdfRecords = require('../app/collections/pdfRecords.js'),
    Q    = require('q');

var createPetVaccine = function(req, res) {
  var requestid = req.params.requestid;
  var vaccines = req.body; // assumes request with vaccine_i

  // search for the request with the desired request id
  Request.forge({id: requestid}).fetch()
    .then(function(request){
      if (request) {
        // insert pet_id into vaccine information
        for (var i = 0; i < vaccines.length; i++) {
          // check if this works
          vaccines[i].pet_id = request.attributes.pet_id;
        }
        // Bookshelf syntax for inserting a collection of vaccines
        var PetVaccines = db.Collection.extend({model: Pet_Vaccine});
        PetVaccines.forge(vaccines).mapThen(function(model){
          console.log(model);
          return model.save().then(function(pet_vaccine){
            return pet_vaccine.get('id');
          });
        }).then(function(done) {
          res.send(201, {id: done.id});
        });
      }
    });
};

var createVaccine = function(req, res) {

};

var createContact = function(req, res) {
  var adminid = req.params.adminid;
  var requestid = req.params.requestid;
  var newContactHistory = req.body;
  newContactHistory.admin_id = adminid;
  newContactHistory.request_id = requestid;

  Contact.forge(newContactHistory).save().then(function(contactHistory) {
    ContactHistorys.add(contactHistory);
    res.send(201, {id: contactHistory.id});
  });
};

var createVetContact = function(req, res) {
  var adminid = req.params.adminid;
  var vetid = req.paramas.vetid;
  var contacts = req.body;
  for (var i = 0; i<contacts.length; i++) {
    contacts[i].vet_id = vetid;
  }
  var newVetContacts = db.Collection.extend({model: VetContact});
  newVetContacts.forge(contacts).mapThen(function(model){
    console.log(model);
    return model.save().then(function(vetcontact){
      return vetcontact.get('id');
    });
  }).then(function(done) {
    res.send(201, {id: done.id});
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
  createContact : createContact,
  createVetContact : createVetContact,
  createPdf : createPdf
};
