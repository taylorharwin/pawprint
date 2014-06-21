var User             = require('../app/models/user.js'),
    Pet              = require('../app/models/pet.js'),
    Vaccine          = require('../app/models/vaccine.js'),
    Pet_Vaccine      = require('../app/models/pet_vaccine.js'),
    ContactHistory   = require('../app/models/contactHistory.js'),
    Request          = require('../app/models/request.js'),
    VetContact       = require('../app/models/vetContact.js'),
    Q                = require('q');

// TODO: validations for field length/type

var putLog = function(req, res) {
  var logid = req.params.logid;
  // req.body should have type, notes, vetcontactid
  var patchObj = req.body;
  // extend patchObj with adminid
  patchObj.admin_id = req.params.adminid;

  ContactHistory.forge({id: logid}).fetch().then(function(model) {
    return model.save(patchObj, {patch: true});
  }).then(function(model) {
    res.send(200, model);
  });
};

var putPetVaccine = function(req, res) {
  var vaccineid = req.params.vaccineid;
  var patchObj = req.body;

  Pet_Vaccine.forge({id: vaccineid}).fetch().then(function(model) {
    return model.save(patchObj, {patch: true});
  }).then(function(model) {
    res.send(200, model);
  });
};

var putPdf = function(req, res) {
  var adminid = req.params.adminid;
  var requestid = req.params.requestid;
  var pdfid = req.params.pdfid;

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
  putLog: putLog,
  putPdf: putPdf,
  putPetVaccine: putPetVaccine,
  putVetContact: putVetContact,
  putRequest: putRequest
};


// PUT /admin/:adminid/request/:requestid/vaccine
