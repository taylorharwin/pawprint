var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    Vet = require('../app/models/vet.js'),
    Vets = require('../app/collections/vets.js'),
    Q    = require('q');

// TODO: validations for field length/type

var createPet = function(req, res) {
  // doesn't take into account vaccines
  var userid = req.params.userid;
  
  // create a new pet with userid
  Pet.forge(req.body).save().then(function(pet) {
    // attaches pet to user through the user_pet table
    User.forge({id: userid}).pet().attach(pet);
    Pets.add(pet);
    res.send(201, pet);
  });
};

var createUser = function(req, res) {
  // need to bcrypt at some point
  // figure out logic for breaking up account creation and user details?
  User.forge(req.body).save().then(function(newUser) {
    Users.add(newUser);
    res.send(201, newUser);
  });
};

var createRequest = function(req, res) {
  var userid = req.params.userid;
  var petid = req.params.petid;
  var vet = req.body.vet_id;

  var request = new Request({
    user_id: userid,
    pet_id: petid,
    vet_id: vet
  });

  request.save().then(function(newRequest) {
    Requests.add(newRequest);
    res.send(201, newRequest);
  });
};

var createVet = function(req, res) {
  Vet.forge(req.body).save().then(function(newVet) {
    Vets.add(newVet);
    res.send(201, newVet);
  });
};

module.exports = exports = {
  createUser : createUser, 
  createPet : createPet,
  createRequest : createRequest,
  createVet : createVet
};
