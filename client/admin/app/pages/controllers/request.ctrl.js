'use strict';

angular.module('admin.pages.controllers')
  .controller('RequestCtrl', function ($scope, reqIDFactory) {

    $scope.reqID = reqIDFactory.getRequestID();

    $scope.vaccines = [
      'Rabies',
      'Feline Leukemia',
      'Parvovirus',
      'Rabbit anti-depressant'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function (open) {
      console.log('Dropdown is now: ', open);
    };

  });
  