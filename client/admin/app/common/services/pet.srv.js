'use strict';

angular.module('admin.common.services')
  .service('petService', function (Restangular, reqIDFactory) {

    this.getVetInfo = function (variety, message) {
      var alerts = this.alerts;
      alerts.push({type: variety, msg: message});
      setTimeout(function () {alerts.splice(0, 1); }, 5000);
    };
     
  });