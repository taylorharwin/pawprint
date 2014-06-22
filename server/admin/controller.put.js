var User             = require('../app/models/user.js'),
    Pet              = require('../app/models/pet.js'),
    Vaccine          = require('../app/models/vaccine.js'),
    Pet_Vaccine      = require('../app/models/pet_vaccine.js'),
    PdfRecord        = require('../app/models/pdfRecord.js'),
    ContactHistory   = require('../app/models/contactHistory.js'),
    Request          = require('../app/models/request.js'),
    VetContact       = require('../app/models/vetContact.js'),
    Q                = require('q');


/*************DOCS***************/

// _updater makes PUT requests which update entries in the Model passed in
// options takes an object which must have a property id for the id of the entry you would like to update

// Example:

// var putLog = function(req, res) {
//   var logid = req.params.logid;
//   // req.body should have type, notes, vetcontactid
//   var patchObj = req.body;
//   // extend patchObj with adminid
//   patchObj.admin_id = req.params.adminid;

//   ContactHistory().query({where: {id: logid}}).fetch().then(function(model) {
//     return model.save(patchObj, {patch: true});
//   }).then(function(model) {
//     res.send(200, model);
//   });
// };

// becomes

// var putLog = _updater(ContactHistory, {id: 'logid'});

// TODO: validations for field length/type, options cannot be empty, throw 4xx
var _updater = function (Model, options) {
  return function(req, res) {
    var patchObj = req.body;

    Model.forge({id: req.params[options.id]}).fetch().then(function(model) {
      return model.save(patchObj, {patch: true});
    }).then(function(model) {
      res.send(200, model);
    }).catch(function(err) {
      console.err(err);
      res.send(500, 'Internal server error');
    });
  };
};

var putLog = _updater(ContactHistory, {id: 'logid'});

var putPetVaccine = _updater(Pet_Vaccine, {id: 'vaccineid'});

var putPdf = _updater(PdfRecord, {id: 'pdfid'});

var putVetContact = _updater(VetContact, {id: 'vetcontactid'});

var putRequest = _updater(Request, {id: 'requestid'});

module.exports = exports = {
  putLog: putLog,
  putPdf: putPdf,
  putPetVaccine: putPetVaccine,
  putVetContact: putVetContact,
  putRequest: putRequest
};
