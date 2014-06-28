'use strict';

angular.module('admin.common.services')
  .service('vetService', function (Restangular, reqIDFactory, $modal) {

  function getVetInfo(adminID, vetID) {
    return Restangular.one('admin', adminID).one('vets', vetID).get();
  }

  function getPDFRecords(adminID, reqID) {
    return Restangular.one('admin', adminID).one('requests', reqID).all('pdfs').getList();
  }

  function editVetInfo(adminID, vetID, data) {
    return Restangular.one('admin', adminID).one('vets', vetID).put(data);
  }

  function openModal(size) {

    var modalInstance = $modal.open({
      templateUrl: 'app/each_request/templates/upload.tpl.html',
      controller: 'EachRequestCtrl',
      size: size,
      resolve: {
        file: function () {
          console.log('hello');
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  this.getVetInfo = getVetInfo;
  this.editVetInfo = editVetInfo;
  this.openModal = openModal;
  this.getPDFRecords = getPDFRecords;
     
});



