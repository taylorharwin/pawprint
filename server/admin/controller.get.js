var db           = require('../app/db_config.js');
    User         = require('../app/models/user.js'),
    Users        = require('../app/collections/users.js'),
    Pet          = require('../app/models/pet.js'),
    Pets         = require('../app/collections/pets.js'),
    Request      = require('../app/models/request.js'),
    Requests     = require('../app/collections/requests.js'),
    Vet          = require('../app/models/vet.js'),
    Vets         = require('../app/collections/vets.js'),
    Pet_Vaccine  = require('../app/models/pet_vaccine.js'),
    Pet_Vaccines = require('../app/collections/pet_vaccines.js'),
    Q            = require('q');

var getRequests = function(req, res) {

};

var getRequest = function(req, res) {

};

var getPet = function(req, res) {

};

var getUser = function(req, res) {

};

var getVet = function(req, res) {

};

var getVetContacts = function(req, res) {

};

var getVaccines = function(req, res) {

};

var getLogs = function(req, res) {

};

var getPDFs = function(req, res) {

};


module.exports = exports = {
  getRequests : getRequests,
  getRequest : getRequest,
  getPet : getPet,
  getUser : getUser,
  getVet : getVet,
  getVetContacts : getVetContacts,
  getVaccines : getVaccines,
  getLogs : getLogs,
  getPDFs : getPDFs
};
