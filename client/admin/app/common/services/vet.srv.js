'use strict';

angular.module('admin.common.services')
  .service('vetService', function (Restangular, reqIDFactory) {

  function getVetInfo(adminID, vetID) {
    return Restangular.one('admin', adminID).one('vets', vetID).get();
  }

  function editVetInfo(adminID, vetID, data) {
    return Restangular.one('admin', adminID).one('vets', vetID).put(data);
  }

  this.getVetInfo = getVetInfo;
  this.editVetInfo = editVetInfo;
     
});