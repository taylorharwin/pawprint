'use strict';

angular.module('admin.common.services')
  .service('vaccineService', function (Restangular, reqIDFactory) {

  function getAllVaccines(adminID) {
    return Restangular.one('admin', adminID).all('vaccines').getList();
  }

  function addNewVaccine(adminID, data) {
    return Restangular.one('admin', adminID).all('vaccines').post(data);
  }

  function getAllVaccinationRecords(adminID, reqID) {
    return Restangular.one('admin', adminID).one('requests', reqID).all('vaccines').getList();
  }

  this.getAllVaccines = getAllVaccines;
  this.addNewVaccine = addNewVaccine;
  this.getAllVaccinationRecords = getAllVaccinationRecords;
     
});