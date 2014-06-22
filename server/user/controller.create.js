var User = require('../app/models/user.js'),
    Pet = require('../app/models/pet.js'),
    Request = require('../app/models/request.js'),
    Vet = require('../app/models/vet.js'),
    Q    = require('q');

// TODO: validations for field length/type

var createUser = function(req, res) {
  // need to bcrypt at some point
  // figure out logic for breaking up account creation and user details?
  User.forge(req.body).save().then(function(model) {
    res.send(201, model.omit('password', 'salt'));
  });
};

var createPet = function(req, res) {
  // doesn't take into account vaccines
  var userid = req.params.userid;
  // console.log(userid);
  // create a new pet with userid
  Pet.forge(req.body).save().then(function(pet) {
    // attaches pet to user through the user_pet table
    console.log(pet);
    User.forge({id: userid}).fetch().then(function(user) {
      user.pet().attach(pet);
      res.send(201, {id: pet.id});
    });
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
    res.send(201, {id: newRequest.id});
  });
};

var createVet = function(req, res) {
  Vet.forge(req.body).save().then(function(newVet) {
    res.send(201, {id: newVet.id});
  });
};

module.exports = exports = {
  createUser : createUser,
  createPet : createPet,
  createRequest : createRequest,
  createVet : createVet
};
