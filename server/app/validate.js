/* ABOUT THIS FILE:
 * validate.js is for helper functions that checks for specific permissions
 * All functions should return a boolean in the form of a promise
 * If the validation is false, validate functions will send a 401: 'Not Authorized'
 * When calling a validate function, only act if validate returns true
 */

var db                = require('../app/db_config.js'),
    Q                 = require('q'),
    Utils             = require('../app/utils.js'),
    // INCLUDE DATA MODELS FOR BOOKSHELF.JS
    ContactHistory    = require('../app/models/contactHistory.js'),
    PdfRecord         = require('../app/models/pdfRecord.js'),
    Pet               = require('../app/models/pet.js'),
    Pet_Vaccine       = require('../app/models/pet_vaccine.js'),
    Request           = require('../app/models/request.js'),
    User              = require('../app/models/user.js'),
    Vaccine           = require('../app/models/vaccine.js'),
    Vet               = require('../app/models/vet.js'),
    VetContact        = require('../app/models/vetContact.js');

var userOwnsPet = function(userid, petid, res) {
  return db.knex('user_pet')
    .where({
      user_id: userid,
      pet_id: petid,
    })
    .select()
    .then(function(found) {
      if(found.length === 0) {
        res.send(401, 'Not Authorized');
        return false;
      } else {
        return true;
      }
    });
};

// isUser: Only user should be able to delete use
// isRequester: Only user of the request can cancel the request

module.exports = exports = {
  userOwnsPet: userOwnsPet
};
