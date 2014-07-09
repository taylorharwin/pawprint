
var User      = require('../app/models/user.js'),
    Pet       = require('../app/models/pet.js'),
    Request   = require('../app/models/request.js'),
    Vet       = require('../app/models/vet.js'),
    User_Pet  = require('../app/models/user_pet.js'),
    Utils     = require('../app/utils.js'),
    Q         = require('q');

// TODO: validations for field length/type

var createUser = Utils.creator(User, {
  omit: ['password', 'salt', 'jwt', 'type']
});

var createPet = function (req, res) {
  var userid = req.params.userid;
  var newpet, newuser;

  Pet.forge(req.body).save().then(function (pet) {
    if (!pet) { throw new Error('Save Failed'); }
    newpet = pet;
    return User.forge({id: userid}).fetch();
  })
  .then(function (user) {
    newuser = user;
    if (!user) { throw new Error('User Does Not Exist'); }
    return user.pet().attach(newpet);
  })
  .then(function () {
    return User_Pet.forge({user_id: newuser.id, pet_id: newpet.id}).fetch();
  })
  .then(function (join) {
    if (!join) { throw new Error('Bad Join'); }
    var date = new Date();
    join.save({created_at: date, updated_at: date}, {patch: true});
    res.send(201, newpet);
  })
  .catch(function (err) {
    console.error(err);
    res.send(500, 'Internal Server Error');
  });
};

// TODO, accept vetid or vet object in the body
var createRequest = function(req, res) {
  
  // Set the vetid using req.body, create a new vet and get the id if it doesn't already exist
  Q.fcall(function(){
    var newRequest = {
      user_id: req.params.userid,
      pet_id: req.params.petid,
    };

    if(typeof req.body.vet === 'object') {
      return Utils.create(Vet, req.body.vet).then(function(vet) {
        newRequest.vet_id = vet.id;
        return newRequest;
      });
    } else {
      newRequest.vet_id = req.body.vet;
      return newRequest;
    }
  }).then(function(newRequest) {
    return Utils.create(Request, newRequest);
  }).then(function(model) {
    res.send(201, model);
  }).catch(function(err) {
    console.error(err);
    res.send(500, 'Internal Server Error');
  });
};

var createVet = Utils.creator(Vet);

module.exports = exports = {
  createUser : createUser,
  createPet : createPet,
  createRequest : createRequest,
  createVet : createVet
};
