'use strict';

angular.module('admin.common.services')
  .service('petService', function (Restangular, reqIDFactory) {

  function getPetInfo(adminID, petID) {
    return Restangular.one('admin', adminID).one('pets', petID).get();
  }

  function editPetInfo(adminID, vetID, data) {
    return Restangular.one('admin', adminID).one('pets', petID).put(data);
  }

  this.getPetInfo = getPetInfo;
  this.editPetInfo = editPetInfo;
     
});