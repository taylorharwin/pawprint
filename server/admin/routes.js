var controllerCreate = require('./controller.create.js');

module.exports = exports = function (router) {
  // create admin route
  router.route('/:adminid/request/:requestid/vaccine')
        .post(controllerCreate.createVaccine);
};

// PUT /admin/:adminid/request/:requestid/contact/:id  update contact log  {contactID: {contact type: xxx, admin: xxx, ...}}
// PUT /admin/:adminid/request/:requestid/vaccines update vaccine entries [array]  {vaccineID: {vaccine: xxx, date administered:xxx, ... }}
// PUT /admin/:adminid/vet/:vetid/vetcontact/:id update vet contact  {vaccineID: {name: xxx, vetID:xxx, ...}}
