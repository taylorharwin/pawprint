'use strict';

angular.module('admin.pages.controllers')
  .controller('RequestCtrl', function ($scope, reqIDFactory, statusCodeConst) {

    $scope.reqID = reqIDFactory.getRequestID();
    $scope.reqStatus = reqIDFactory.getRequestStatus();

    $scope.vaccines = [
      'Rabies',
      'Feline Leukemia',
      'Parvovirus',
      'Rabbit anti-depressant'
    ];

    $scope.statusCodes = statusCodeConst;

    $scope.status = {
      isopen: false
    };

  });
  