var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Q    = require('q');

var createPet = function(req, res) {
  var pet = req.body;
  var userid = req.params.userid;
  var petid = req.params.petid;

  new Pet({id: petid}).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      var pet = new Pet(found); // does this work?
      pet.save().then(function(newPet) {
        Pets.add(newPet);
        res.send(200, newPet);
      });
    }
  });
};

var createUser = function(req, res) {
  var user = req.body;
  var userid = req.params.userid;

  new User({id: userid}).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      var user = new User(found); // does this work?
      user.save().then(function(newUser) {
        Users.add(newUser);
        res.send(200, newUser);
      });
    }
  });
};

module.exports = exports = {
  createUser : createUser, 
  createPet : createPet
};
