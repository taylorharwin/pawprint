angular.module('admin.common.services')

  .service('CurrentAdminService', function () {

    var currentAdmin = null;

    function setAdminId (adminId) {
      currentAdmin = adminId;
    }

    function getAdminId () {
      return currentAdmin;
    }

    this.setAdminId = setAdminId;
    this.getAdminId = getAdminId;

  });