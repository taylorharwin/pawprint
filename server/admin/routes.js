var Create = require('./controller.create.js');
var Get = require('./controller.get.js');
var Put = require('./controller.put.js');

module.exports = exports = function (router) {
  // create admin route
  router.route('/:adminid/requests')
    .get(Get.getRequests);
  router.route('/:adminid/request/:requestid')
    .get(Get.getRequest);
  router.route('/:adminid/pet/:petid')
    .get(Get.getPet);
  router.route('/:adminid/user/:userid')
    .get(Get.getUser);
  router.route('/:adminid/vet/:vetid')
    .get(Get.getVet);
  router.route('/:adminid/vet/:vetid/contacts')
    .get(Get.getVetContacts);
  router.route('/:adminid/request/:requestid/vaccines')
    .get(Get.getVaccines);
  router.route('/:adminid/request/:requestid/logs')
    .get(Get.getLogs);
  router.route('/:adminid/request/:requestid/pdfs')
    .get(Get.getPDFs);
  router.route('/:adminid/request/:requestid/contact')
    .post(Create.createContact);
  router.route('/:adminid/vet/:vetid/vetcontact')
    .post(Create.createVetContact);
  router.route('/:adminid/request/:requestid/pdf')
    .post(Create.createPdf);
  router.route('/:adminid/request/:requestid/vaccine')
    .post(Create.createVaccine)
    .put(Put.putVaccine);
  router.route('/:adminid/request/:requestid/contact/:contactid')
    .put(Put.putContact);
};

// PUT /admin/:adminid/request/:requestid/contact/:id  update contact log  {contactID: {contact type: xxx, admin: xxx, ...}}
// PUT /admin/:adminid/request/:requestid/vaccines update vaccine entries [array]  {vaccineID: {vaccine: xxx, date administered:xxx, ... }}
// PUT /admin/:adminid/vet/:vetid/vetcontact/:id update vet contact  {vaccineID: {name: xxx, vetID:xxx, ...}}
