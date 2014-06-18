var controllerCreate = require('./controller.create.js');
var controllerGet = require('./controller.get.js');

module.exports = exports = function (router) {
  // create admin route
  router.route('/:adminid/request/:requestid/vaccine')
    .post(controllerCreate.createVaccine);
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
  router.route('/admin/:adminid/vet/:vetid/vetcontact')
    .post(controllerCreate.createVetContact);
  router.route('/admin/:adminid/request/:requestid/pdf')
    .post(controllerCreate.createPdf);
};

// PUT /admin/:adminid/request/:requestid/contact/:id  update contact log  {contactID: {contact type: xxx, admin: xxx, ...}}
// PUT /admin/:adminid/request/:requestid/vaccines update vaccine entries [array]  {vaccineID: {vaccine: xxx, date administered:xxx, ... }}
// PUT /admin/:adminid/vet/:vetid/vetcontact/:id update vet contact  {vaccineID: {name: xxx, vetID:xxx, ...}}
