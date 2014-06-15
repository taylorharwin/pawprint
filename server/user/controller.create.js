var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Q    = require('q');

// TODO: validations for field length/type

var createPet = function(req, res) {
  // doesn't take into account vaccines
  var userid = req.params.userid;
  var pet = new Pet(req.body);
  
  pet.save().then(function(pet) {
    User.forge({id: userid}).pet().attach(pet);
    Pets.add(pet);
    res.send(200, pet);
  });
};

var createUser = function(req, res) {
  var user = new User(req.body); 
  // need to bcrypt at some point
  // figure out logic for breaking up account creation and user details?
  user.save().then(function(newUser) {
    Users.add(newUser);
    res.send(200, newUser);
  });
};

var createRequest = function(req, res) {
  var userid = req.params.userid;
  var petid = req.params.petid;
  var vet = req.body.vetid;

  var request = new Request({
    user_id: userid,
    pet_id: petid,
    vet_id: vetid
  });

  request.save().then(function(newRequest) {
    Requests.add(newRequest);
    res.send(200, newRequest);
  });
};

module.exports = exports = {
  createUser : createUser, 
  createPet : createPet,
  createRequest : createRequest
};
