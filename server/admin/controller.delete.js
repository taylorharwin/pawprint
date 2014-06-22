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

// _deleter makes DELETE requests

// Example:
// var deletePetVaccine = function(req, res) {
//   Pet_Vaccine.forge({id: req.params.vaccineid}).fetch().then(function(model){
//     model.destroy(res.send(200, model));
//   });
// };

// BECOMES
// var deletePetVaccine = _deleter(Pet_Vaccine, {id: 'vaccineid'});


// TODO: validations
var _deleter = function (Model, options) {
  return function(req, res) {
    Model.forge({id: req.params[options.id]}).fetch().then(function(model){
      model.destroy(res.send(200, model));
    });
  };
};

var deletePetVaccine = _deleter(Pet_Vaccine, {id: 'vaccineid'});

var deleteLog = _deleter(ContactHistory, {id: 'logid'});

var deletePdf = _deleter(PdfRecord, {id: 'pdfid'});

var deleteVetContact = _deleter(VetContact, {id: 'vetcontactid'});

module.exports = exports = {
  deletePetVaccine: deletePetVaccine,
  deleteLog: deleteLog,
  deletePdf: deletePdf,
  deleteVetContact: deleteVetContact
};
