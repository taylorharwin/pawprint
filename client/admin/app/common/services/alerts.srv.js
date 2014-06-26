'use strict';
/*global angular*/

angular.module('admin.common.services')
  .service('alertsService', function () {

    this.alerts = [{type: 'success', msg: 'BLAAAAA'}];

    this.add = function (variety, message) {
      var alerts = this.alerts;
      if (alerts.length) {
        alerts.shift();
      }
      alerts.push({type: variety, msg: message});
    };

    this.close = function () {
      this.alerts.shift();
    };
    

     
  });