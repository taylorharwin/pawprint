var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Vaccine = require('../app/models/vaccine.js'),
    Vaccines = require('../app/collections/vaccines.js'),
    ContactHistory = require('../app/models/contactHistory.js'),
    ContactHistorys = require('../app/collections/contactHistorys.js'),
    VetContact = require('../app/models/vetContact.js'),
    VetContacts = require('../app/collections/vetContacts.js'),
    Q    = require('q');

// TODO: validations for field length/type

var putContact = function(req, res) {
  var adminid = req.params.adminid;
  var requestid = req.params.requestid;
  var contactid = req.params.contactid;

  ContactHistory.forge({id: contactid}).fetch().then(function(contactHistory) {
    contactHistory.save(req.body, {patch: true});
    res.send(200, contactHistory.id);
  });
};

var putVaccine = function(req, res) {
  var adminid = req.params.adminid;
  var requestid = req.params.requestid;
  
// /:adminid/request/:requestid/vaccine
};

var putVetContact = function(req, res) {
  var adminid = req.params.adminid;
  var vetid = req.params.vetid;
  var vetcontactid = req.params.vetcontactid;

  VetContact.forge({id: vetcontactid}).fetch().then(function(vetContact) {
    vetContact.save(req.body, {patch: true});
    res.send(200, vetContact.id);
  });
};

var putRequest = function(req, res) {
  var requestid = req.params.requestid;
  var newStatus = req.body.status;
  // TODO: throw error if status is empty

  Request.forge({id : requestid}).fetch().then(function(request) {
    request.attributes.status = newStatus;
    return request.save(request.attributes, {patch: true});
  }).then(function(model) {
    res.send(200, model);
  });
};

module.exports = exports = {
  putContact: putContact,
  putVaccine: putVaccine,
  putVetContact: putVetContact,
  putRequest: putRequest
};


// PUT /admin/:adminid/request/:requestid/vaccine
