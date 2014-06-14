var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.requests'),
    Requests = require('../app/collections/pets.js'),
    Q    = require('q');

var createPet = function(req, res) {
  // doesn't take into account vaccines
  var userid = req.userid;
  var pet = new Pet(req.body); // does this work?
  // 
  pet.save().then(function(newPet) {
    Pets.add(newPet);
    new User({id: userid}).fetch().then(function(found) {
      if (found) {
        newPet.belongsToMany(found);
      }
      res.send(200, newPet);
    });
  });
};

// pet belongs to this userid

var createUser = function(req, res) {
  var user = new User(found); // does this work?
  user.save().then(function(newUser) {
    Users.add(newUser);
    res.send(200, newUser);
  });
};

var createRequest = function(req, res) {
  var userid = req.userid;
  var petid = req.petid;
  var request = req.body;

  var request = new Request(function(newRequest) {
    Requests.add(newRequest);
    new Pet({id: petid}).fetch().then(function(found) {
      if (found) {
        newRequest.belongsTo(found);
      }
      new User({id: userid}).fetch().then(function(found) {
        if (found) {
          newRequest.belongsTo(found);
        }
        res.send(200, newRequest);
      });
    });
  });

};

module.exports = exports = {
  createUser : createUser, 
  createPet : createPet,
  createRequest : createRequest
};
