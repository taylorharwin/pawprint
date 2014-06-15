var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    db = require('../app/db_config.js'),
    Q    = require('q');

// TODO: validations for field length/type

// var getPet = function(req, res) {
//   // doesn't take into account vaccines
//   var userid = req.userid;
//   var pet = new Pet(req.body); // does this work?
//   // 
//   pet.save().then(function(newPet) {
//     Pets.add(newPet);
//     new User({id: userid}).fetch().then(function(found) {
//       if (found) {
//         newPet.belongsTo(found);
//       }
//       res.send(200, newPet);
//     });
//   });
// };

// // pet belongs to this userid

var getUser = function(req, res) {
  var userid = req.userid;
  

  db.knex('user_pet')
    .join('user', 'user.id', '=', 'user_pet.userid')
    .select()

  // new User({id: userid}).fetch().then(function(found) {
  //   if (found) {
  //     res.send(200, found);
  //   }
  // });
};

// var getRequest = function(req, res) {
//   var userid = req.userid;
//   var petid = req.petid;
//   var request = req.body;

//   var request = new Request(function(newRequest) {
//     Requests.add(newRequest);
//     new Pet({id: petid}).fetch().then(function(found) {
//       if (found) {
//         newRequest.belongsTo(found);
//       }
//       new User({id: userid}).fetch().then(function(found) {
//         if (found) {
//           newRequest.belongsTo(found);
//         }
//         res.send(200, newRequest);
//       });
//     });
//   });

// };

// module.exports = exports = {
//   getUser : getUser, 
//   getPet : getPet,
//   getRequest : getRequest
// };
