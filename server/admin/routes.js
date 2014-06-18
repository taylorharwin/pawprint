var controllerCreate = require('./controller.create.js');
var controllerGet = require('./controller.get.js');
var controllerPut = require('./controller.put.js');

module.exports = exports = function (router) {
  // create admin route
  router.route('/:adminid/requests')
    .get(controllerGet.getRequests);
  router.route('/:adminid/request/:requestid')
    .get(controllerGet.getRequest);
  router.route('/:adminid/pet/:petid')
    .get(controllerGet.getPet);
  router.route('/:adminid/user/:userid')
    .get(controllerGet.getUser);
  router.route('/:adminid/vet/:vetid')
    .get(controllerGet.getVet);
  router.route('/:adminid/vet/:vetid/contacts')
    .get(controllerGet.getVetContacts);
  router.route('/:adminid/request/:requestid/vaccines')
    .get(controllerGet.getVaccines);
  router.route('/:adminid/request/:requestid/logs')
    .get(controllerGet.getLogs);
  router.route('/:adminid/request/:requestid/pdfs')
    .get(controllerGet.getPDFs);
  router.route('/:adminid/request/:requestid/contact')
    .post(controllerCreate.createContact);
  router.route('/:adminid/vet/:vetid/vetcontact')
    .post(controllerCreate.createVetContact);
  router.route('/:adminid/request/:requestid/pdf')
    .post(controllerCreate.createPdf);
  router.route('/:adminid/request/:requestid/vaccine')
    .post(controllerCreate.createVaccine)
    .put(controllerPut.putVaccine);
  router.route('/:adminid/request/:requestid/contact/:contactid')
    .put(controllerPut.putContact);
};

// PUT /admin/:adminid/request/:requestid/contact/:id  update contact log  {contactID: {contact type: xxx, admin: xxx, ...}}
// PUT /admin/:adminid/request/:requestid/vaccines update vaccine entries [array]  {vaccineID: {vaccine: xxx, date administered:xxx, ... }}
// PUT /admin/:adminid/vet/:vetid/vetcontact/:id update vet contact  {vaccineID: {name: xxx, vetID:xxx, ...}}
